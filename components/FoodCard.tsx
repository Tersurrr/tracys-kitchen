'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/format';
import type { MenuItem } from '@/types';

export default function FoodCard({ item }: { item: MenuItem }) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(item.image) && !imageError;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group glass-card overflow-hidden"
    >
      <Link href={`/menu/${item.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal/40">
          {showImage && (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          )}
          {!item.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/70">
              <span className="rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide">
                Unavailable
              </span>
            </div>
          )}
          <div className="absolute right-3 top-3 rounded-full bg-charcoal/70 px-3 py-1 text-xs font-semibold text-gold backdrop-blur">
            {formatCurrency(item.price)}
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold">{item.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-white/60">
            {item.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
