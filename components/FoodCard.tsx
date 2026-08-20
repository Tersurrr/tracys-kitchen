'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/format';
import type { MenuItem } from '@/types';

export default function FoodCard({ item, compact = false }: { item: MenuItem; compact?: boolean }) {
  const [imageError, setImageError] = useState(false);
  const showImage = Boolean(item.image) && !imageError;

  return (
    <motion.div
      whileHover={{ y: compact ? -2 : -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group glass-card overflow-hidden"
    >
      <Link href={`/menu/${item.id}`} className="block h-full">
        <div className="dark-surface relative aspect-[4/3] overflow-hidden bg-charcoal/40">
          {showImage && item.image && (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes={
                compact
                  ? '(max-width: 339px) 100vw, (max-width: 767px) 50vw, 30vw'
                  : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
              }
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          )}
          {!item.available && (
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/70">
              <span className={`rounded-full border border-white/20 font-semibold uppercase tracking-wide ${compact ? 'px-2.5 py-1 text-xs' : 'px-4 py-1 text-xs'}`}>
                Unavailable
              </span>
            </div>
          )}
          <div className={`absolute rounded-full bg-charcoal/70 font-semibold text-gold backdrop-blur ${compact ? 'right-2 top-2 px-2.5 py-1 text-sm' : 'right-3 top-3 px-3 py-1 text-xs'}`}>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div className={compact ? 'p-3.5 sm:p-4' : 'p-5'}>
          <h3 className={`font-display font-semibold ${compact ? 'line-clamp-2 text-base leading-snug sm:text-lg' : 'text-lg'}`}>
            {item.name}
          </h3>
          <p className={`mt-1.5 text-white/65 ${compact ? 'line-clamp-2 text-sm leading-relaxed sm:text-base' : 'line-clamp-2 text-sm'}`}>
            {item.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
