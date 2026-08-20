'use client';

import {
  BadgeCheck,
  CookingPot,
  ListChecks,
  MessageSquarePlus,
  Send,
  Smartphone,
  Truck,
  UtensilsCrossed,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const STEPS = [
  {
    icon: UtensilsCrossed,
    label: 'Browse the Menu',
    description: 'Explore the meals and snacks currently available to preorder.',
  },
  {
    icon: ListChecks,
    label: 'Select Your Meals',
    description: 'Choose the dishes and quantities you would like us to prepare.',
  },
  {
    icon: MessageSquarePlus,
    label: 'Add Special Requests',
    description: 'Include any cooking notes or dietary requests with your selections.',
  },
  {
    icon: Truck,
    label: 'Choose Pickup or Delivery',
    description: 'Select the option that works best for receiving your order.',
  },
  {
    icon: Send,
    label: 'Submit Your Preorder',
    description: 'Review your details and send your completed preorder.',
  },
  {
    icon: Smartphone,
    label: 'WhatsApp Opens Automatically',
    description: 'Your order details are prepared for confirmation in WhatsApp.',
  },
  {
    icon: BadgeCheck,
    label: 'We Confirm Your Order',
    description: 'We confirm availability, timing and the required deposit with you.',
  },
  {
    icon: CookingPot,
    label: 'Preparation Begins After Deposit',
    description: 'Your fresh order is prepared once the required deposit is confirmed.',
  },
];

export default function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="bg-charcoal-light/40 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="section-eyebrow mb-3">The Process</p>
        <h2 className="mb-8 font-display text-3xl font-semibold md:text-4xl">
          How Ordering Works
        </h2>

        <div className="relative max-w-4xl space-y-3">
          <div className="absolute bottom-6 left-[1.45rem] top-6 w-px bg-gold/20" aria-hidden="true" />
          {STEPS.map((step, index) => (
            <motion.div
              key={step.label}
              className="glass-card relative flex items-center gap-4 px-4 py-3.5 sm:px-5"
              initial={reduceMotion ? false : { opacity: 0, x: 34 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: reduceMotion ? 0 : 0.38,
                delay: reduceMotion ? 0 : index * 0.055,
              }}
            >
              <div className="z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/45 bg-charcoal text-gold">
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-5">
                <div className="flex min-w-0 items-baseline gap-3 sm:w-72 sm:shrink-0">
                  <span className="font-display text-sm font-semibold text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-base font-semibold sm:text-lg">{step.label}</h3>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-white/60 sm:mt-0">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
