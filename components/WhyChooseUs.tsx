'use client';

import { ChefHat, Clock, HeartHandshake, Truck } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const FEATURES = [
  {
    icon: ChefHat,
    title: 'Made Fresh, Always',
    desc: 'Every meal is prepared from scratch with quality ingredients after you order. Nothing sits under a heat lamp.',
  },
  {
    icon: Clock,
    title: 'Quick Turnaround',
    desc: 'Most orders are prepared and ready promptly after your deposit is confirmed.',
  },
  {
    icon: Truck,
    title: 'Pickup or Delivery',
    desc: 'Choose whichever works best for you. Swing by, or have it brought to your door.',
  },
  {
    icon: HeartHandshake,
    title: 'Made With Care',
    desc: 'Special requests and dietary notes are welcome. We cook it your way.',
  },
];

export default function WhyChooseUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="section-eyebrow mb-3">Why Tracy&apos;s Kitchen</p>
        <h2 className="mb-8 font-display text-3xl font-semibold md:text-4xl">
          Why Choose Us
        </h2>

        <div className="relative max-w-4xl space-y-3">
          <div
            className="absolute bottom-6 left-[1.45rem] top-6 w-px bg-gold/20"
            aria-hidden="true"
          />
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
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
                <feature.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-5">
                <div className="flex min-w-0 items-baseline gap-3 sm:w-72 sm:shrink-0">
                  <span className="font-display text-sm font-semibold text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-base font-semibold sm:text-lg">
                    {feature.title}
                  </h3>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-white/60 sm:mt-0">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
