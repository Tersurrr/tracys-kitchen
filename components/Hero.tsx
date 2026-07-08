'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle, ChevronRight } from 'lucide-react';
import { buildWhatsAppLink } from '@/utils/whatsapp';

export default function Hero() {
  const waLink = buildWhatsAppLink(
    "Hello Tracy's Kitchen, I'd like to place a preorder."
  );

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop"
          alt="Freshly prepared homemade meal from Tracy's Kitchen"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/80 to-charcoal" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/40 to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-6 py-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-eyebrow mb-5"
        >
          Homemade &middot; Pre-Order Only &middot; Laurel, MD
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl font-display text-5xl font-semibold leading-[1.05] md:text-7xl"
        >
          Fresh Homemade Meals &amp;{' '}
          <span className="gold-text">Snacks</span>, Made Just for You
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-white/70"
        >
          We prepare fresh meals and snacks exclusively by pre-order. Choose
          pickup or delivery, place your order in minutes, and let us take
          care of the rest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link href="/menu" className="btn-primary">
            Browse Menu <ChevronRight className="h-4 w-4" />
          </Link>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <MessageCircle className="h-4 w-4" /> Order on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
