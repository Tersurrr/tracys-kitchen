'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

const FALLBACK_HERO_IMAGE =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop';

type HeroProps = {
  backgroundImage?: string | null;
  backgroundAlt?: string | null;
};

export default function Hero({ backgroundImage, backgroundAlt }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const heroImage = backgroundImage || FALLBACK_HERO_IMAGE;

  return (
    <section className="dark-surface relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt={
            backgroundAlt
              ? `${backgroundAlt}, prepared by Tracy's Kitchen`
              : "Freshly prepared homemade meal from Tracy's Kitchen"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/35 via-charcoal/55 to-charcoal/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/55 to-charcoal/10" />
      </div>

      <div className="relative mx-auto flex min-h-[clamp(32rem,72svh,48rem)] max-w-7xl flex-col justify-center px-6 py-16 sm:py-20 md:py-24">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="section-eyebrow mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.75rem] leading-5 tracking-[0.18em] min-[390px]:text-[0.8rem] sm:flex-nowrap sm:text-sm sm:tracking-[0.25em]"
        >
          <span className="flex items-center gap-2 whitespace-nowrap">
            Homemade <span aria-hidden="true">&middot;</span>
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            Pre-Order Only <span aria-hidden="true">&middot;</span>
          </span>
          <span className="whitespace-nowrap">Laurel, MD</span>
        </motion.p>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.08 }}
          className="max-w-4xl font-display text-[clamp(2.55rem,11vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.025em] sm:leading-[1.02]"
        >
          <span className="block">Fresh Homemade</span>
          <span className="block">
            Meals &amp; <span className="gold-text">Snacks</span>,
          </span>
          <span className="block">Made Just for You</span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.16 }}
          className="mt-7 max-w-2xl border-l-2 border-gold/65 pl-4 text-[0.98rem] leading-7 text-white/85 sm:pl-5 sm:text-lg sm:leading-8"
        >
          We prepare fresh meals and snacks exclusively by pre-order. Choose pickup or delivery,
          place your order in minutes, and let us take care of the rest.
        </motion.p>
      </div>
    </section>
  );
}
