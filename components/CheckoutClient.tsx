'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Minus, Plus, Trash2, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/format';
import { buildWhatsAppLink, buildWhatsAppMessage } from '@/utils/whatsapp';
import { placeOrder } from '@/actions/order-actions';
import PolicyCard from '@/components/PolicyCard';
import type { DeliveryType } from '@/types';

const schema = z.object({
  customerName: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  deliveryType: z.enum(['pickup', 'delivery']),
  specialRequest: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutClient() {
  const { cart, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [whatsAppLink, setWhatsAppLink] = useState<string | null>(null);
  const submitLockRef = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { deliveryType: 'pickup' },
  });

  const deliveryType = watch('deliveryType');

  const continueToWhatsApp = () => {
    if (whatsAppLink) {
      window.location.assign(whatsAppLink);
    }
  };

  const onSubmit = async (values: FormValues) => {
    if (submitLockRef.current || submitting) return;

    if (cart.length === 0) {
      toast.error('Your order is empty. Add something from the menu first.');
      return;
    }

    submitLockRef.current = true;
    setSubmitting(true);
    setWhatsAppLink(null);

    try {
      const result = await placeOrder({
        customerName: values.customerName,
        phone: values.phone,
        deliveryType: values.deliveryType as DeliveryType,
        specialRequest: values.specialRequest,
        cart,
      });

      if (!result.success) {
        toast.error(result.error ?? 'Something went wrong saving your order. Please try again.');
        return;
      }

      const message = buildWhatsAppMessage({
        customerName: values.customerName,
        phone: values.phone,
        deliveryType: values.deliveryType as DeliveryType,
        cart,
        overallNote: values.specialRequest,
      });

      const link = buildWhatsAppLink(message);
      setWhatsAppLink(link);
      clearCart();
      toast.success('Order saved! Finish up on WhatsApp.');

      try {
        window.location.assign(link);
      } catch {
        toast.error('Order saved, but WhatsApp did not open. Tap Continue to WhatsApp.');
      }
    } catch (err) {
      console.error(err);
      toast.error('We could not save your order. Please try again.');
    } finally {
      submitLockRef.current = false;
      setSubmitting(false);
    }
  };

  if (cart.length === 0) {
    if (whatsAppLink) {
      return (
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="glass-card max-w-2xl p-8 text-center sm:p-10">
            <p className="section-eyebrow mb-3">Order Saved</p>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">
              Finish Up on WhatsApp
            </h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">
              Your order has been saved. If WhatsApp did not open automatically,
              continue with the same saved order here.
            </p>
            <button onClick={continueToWhatsApp} className="btn-primary mt-6 inline-flex">
              <MessageCircle className="h-4 w-4" />
              Continue to WhatsApp
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="section-eyebrow mb-3">Your Order</p>
          <h1 className="font-display text-4xl font-semibold md:text-5xl">
            Checkout
          </h1>
        </div>

        <div className="glass-card max-w-2xl p-8 text-center sm:p-10">
          <p className="mb-5 text-white/60">
            Your order is empty. Browse the menu to add meals and snacks.
          </p>
          <Link href="/menu" className="btn-primary inline-flex">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10">
        <p className="section-eyebrow mb-3">Your Order</p>
        <h1 className="font-display text-4xl font-semibold md:text-5xl">
          Checkout
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="space-y-4">
            {cart.map((line) => (
              <div key={line.menuItem.id} className="glass-card flex items-center gap-4 p-4">
                  <div className="flex-1">
                    <p className="font-display font-semibold">{line.menuItem.name}</p>
                    {line.specialRequest && (
                      <p className="mt-1 text-xs text-white/50">
                        Note: {line.specialRequest}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-gold">
                      {formatCurrency(line.menuItem.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 rounded-full border border-white/15 px-3 py-1.5">
                    <button
                      onClick={() => updateQuantity(line.menuItem.id, line.quantity - 1)}
                      aria-label="Decrease quantity"
                      className="text-white/70 hover:text-gold"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold">
                      {line.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(line.menuItem.id, line.quantity + 1)}
                      aria-label="Increase quantity"
                      className="text-white/70 hover:text-gold"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(line.menuItem.id)}
                    aria-label={`Remove ${line.menuItem.name}`}
                    className="text-white/40 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
              </div>
            ))}

            <div className="glass-card flex items-center justify-between p-5">
              <span className="text-white/70">Total</span>
              <span className="font-display text-xl font-semibold text-gold">
                {formatCurrency(total)}
              </span>
            </div>
          </div>

          <div className="mt-10">
            <PolicyCard compact />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="glass-card h-fit space-y-5 p-7">
          <h2 className="font-display text-lg font-semibold">Your Details</h2>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Full Name
            </label>
            <input
              {...register('customerName')}
              placeholder="John Doe"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm placeholder:text-white/40 focus:border-gold focus:outline-none"
            />
            {errors.customerName && (
              <p className="mt-1 text-xs text-red-400">{errors.customerName.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Phone Number
            </label>
            <input
              {...register('phone')}
              placeholder="301-000-0000"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm placeholder:text-white/40 focus:border-gold focus:outline-none"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Pickup or Delivery
            </label>
            <div className="grid grid-cols-2 gap-3">
              {(['pickup', 'delivery'] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setValue('deliveryType', type)}
                  className={`rounded-xl border py-3 text-sm font-medium capitalize transition-colors ${
                    deliveryType === type
                      ? 'border-gold bg-gold text-charcoal'
                      : 'border-white/15 text-white/70 hover:border-gold/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/80">
              Overall Special Request (optional)
            </label>
            <textarea
              {...register('specialRequest')}
              rows={3}
              placeholder="Anything else we should know?"
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm placeholder:text-white/40 focus:border-gold focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full disabled:opacity-60"
          >
            <MessageCircle className="h-4 w-4" />
            {submitting ? 'Placing Order...' : 'Place Order'}
          </button>

          <p className="text-center text-xs text-white/40">
            No online payment. We&apos;ll confirm your deposit over WhatsApp.
          </p>
        </form>
      </div>
    </div>
  );
}
