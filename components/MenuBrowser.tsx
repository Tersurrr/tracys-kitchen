'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import FoodCard from '@/components/FoodCard';
import type { Category, MenuItem } from '@/types';

export default function MenuBrowser({
  items,
  categories,
}: {
  items: MenuItem[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') ?? 'All';

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const tabs = ['All', ...categories.map((c) => c.name)];

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery =
        query.trim() === '' ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());

      const matchesCategory =
        activeCategory === 'All' || item.category?.name === activeCategory;

      return matchesQuery && matchesCategory;
    });
  }, [items, query, activeCategory]);

  return (
    <div>
      <div className="mb-8">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/55" />
          <input
            type="text"
            aria-label="Search meals or snacks"
            placeholder="Search meals or snacks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="menu-search w-full rounded-full border border-white/15 bg-white/5 py-3.5 pl-12 pr-5 text-base font-medium placeholder:text-white/50 focus:border-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
          />
        </div>
      </div>

      <div className="horizontal-scroller mb-8 flex min-w-0 max-w-full snap-x gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveCategory(tab)}
            className={`shrink-0 snap-start rounded-full border px-5 py-2.5 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              activeCategory === tab
                ? 'border-gold bg-gold text-charcoal'
                : 'border-white/15 text-white/70 hover:border-gold/50 hover:text-gold'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-base text-white/60 sm:text-lg">
          No items match your search. Try a different keyword or category.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 min-[340px]:grid-cols-2 md:grid-cols-3 md:gap-5">
          {filtered.map((item) => (
            <FoodCard key={item.id} item={item} compact />
          ))}
        </div>
      )}
    </div>
  );
}
