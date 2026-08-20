'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowUpRight,
  CakeSlice,
  Cookie,
  CookingPot,
  CupSoda,
  Soup,
  Utensils,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Category } from '@/types';

const categoryArtwork = [
  {
    keywords: ['snack', 'roll', 'pastr', 'small chop'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['soup', 'stew', 'sauce'],
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['drink', 'juice', 'beverage'],
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['dessert', 'cake', 'sweet'],
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop',
  },
  {
    keywords: ['meal', 'rice', 'platter', 'main'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
  },
] as const;

const fallbackArtwork =
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop';

function getFallbackArtwork(name: string) {
  const normalizedName = name.toLowerCase();
  return (
    categoryArtwork.find(({ keywords }) =>
      keywords.some((keyword) => normalizedName.includes(keyword))
    )?.image ?? fallbackArtwork
  );
}

function getCategoryIcon(name: string) {
  const normalizedName = name.toLowerCase();

  if (['snack', 'roll', 'pastr', 'small chop'].some((word) => normalizedName.includes(word))) {
    return Cookie;
  }
  if (['soup', 'stew', 'sauce'].some((word) => normalizedName.includes(word))) return Soup;
  if (['drink', 'juice', 'beverage'].some((word) => normalizedName.includes(word))) return CupSoda;
  if (['dessert', 'cake', 'sweet'].some((word) => normalizedName.includes(word))) return CakeSlice;
  if (['meal', 'rice', 'platter', 'main'].some((word) => normalizedName.includes(word))) {
    return CookingPot;
  }

  return Utensils;
}

export default function CategorySlider({
  categories,
  imageByCategory,
}: {
  categories: Category[];
  imageByCategory: Record<string, string | null>;
}) {
  const reduceMotion = useReducedMotion();
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/menu');
  }, [router]);

  return (
    <div
      className="horizontal-scroller flex min-w-0 max-w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-4 after:block after:w-10 after:shrink-0 after:content-[''] sm:gap-5"
      aria-label="Food categories"
    >
      {categories.map((category, index) => {
        const CategoryIcon = getCategoryIcon(category.name);
        const categoryImage = imageByCategory[category.id] ?? getFallbackArtwork(category.name);
        const categoryHref = `/menu?category=${encodeURIComponent(category.name)}`;

        return (
          <motion.div
            key={category.id}
            className="w-[calc((100%-3rem)/2)] shrink-0 snap-start sm:w-[11.5rem] lg:w-[12.5rem]"
            initial={reduceMotion ? false : { opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : index * 0.055 }}
          >
            <Link
              href={categoryHref}
              prefetch
              onPointerEnter={() => router.prefetch(categoryHref)}
              onFocus={() => router.prefetch(categoryHref)}
              onTouchStart={() => router.prefetch(categoryHref)}
              aria-label={`Explore ${category.name}`}
              className="group block h-full overflow-hidden rounded-xl border border-white/15 bg-white/[0.035] text-left transition duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-gold/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span className="relative block aspect-[4/3] bg-charcoal-soft">
                <span className="absolute inset-0 overflow-hidden rounded-t-xl">
                  <Image
                    src={categoryImage}
                    alt={`Representative ${category.name} dish`}
                    fill
                    sizes="(max-width: 640px) 42vw, (max-width: 1024px) 184px, 200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                </span>
                <span className="absolute -bottom-4 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold/70 bg-charcoal text-gold shadow-lg">
                  <CategoryIcon className="h-4 w-4" aria-hidden="true" />
                </span>
              </span>
              <span className="block px-3 pb-3 pt-6">
                <span className="block font-display text-lg font-semibold leading-tight text-white transition-colors group-hover:text-gold">
                  {category.name}
                </span>
                <span className="mt-2 flex items-center gap-1 text-sm font-semibold text-gold">
                  Explore <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
