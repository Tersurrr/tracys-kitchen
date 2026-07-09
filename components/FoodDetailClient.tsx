'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/format';
import type { MenuItem } from '@/types';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop';

export default function FoodDetailClient({ item }: { item: MenuItem }) {
  const [quantity, setQuantity] = useState(1);
  const [request, setRequest] = useState('');
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAdd = () => {
    addToCart(item, quantity, request || undefined);
    setQuantity(1);
    setRequest('');
  };

  const handleAddAndCheckout = () => {
    addToCart(item, quantity, request || undefined);
    router.push('/checkout');
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative aspect-square max-h-[560px] overflow-hidden rounded-xl2 bg-white/5">
          <Image
            src={item.image || FALLBACK_IMAGE}
            alt={item.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          {item.category && (
            <p className="section-eyebrow mb-3">{item.category.name}</p>
          )}
          <h1 className="mb-3 font-display text-3xl font-semibold md:text-4xl">
            {item.name}
          </h1>
          <p className="mb-6 text-2xl font-semibold text-gold">
            {formatCurrency(item.price)}
          </p>
          <p className="mb-8 leading-relaxed text-white/70">
            {item.description}
          </p>

          {!item.available ? (
            <div className="glass-card p-6 text-white/60">
              This item is currently unavailable. Please check back soon.
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-white/80">
                  Quantity
                </label>
                <div className="flex w-fit items-center gap-4 rounded-full border border-white/15 px-4 py-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="text-white/70 hover:text-gold"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="text-white/70 hover:text-gold"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="special-request"
                  className="mb-2 block text-sm font-medium text-white/80"
                >
                  Special Request
                </label>
                <textarea
                  id="special-request"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  placeholder="e.g. Less pepper, no onions..."
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-sm placeholder:text-white/40 focus:border-gold focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={handleAdd} className="btn-outline">
                  <ShoppingBag className="h-4 w-4" /> Add to Order
                </button>
                <button onClick={handleAddAndCheckout} className="btn-primary">
                  Add &amp; Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
