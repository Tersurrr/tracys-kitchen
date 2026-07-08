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
  const [availableOnly, setAvailableOnly] = useState(false);

  const tabs = ['All', ...categories.map((c) => c.name)];

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery =
        query.trim() === '' ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase());

      const matchesCategory =
        activeCategory === 'All' || item.category?.name === activeCategory;

      const matchesAvailability = !availableOnly || item.available;

      return matchesQuery && matchesCategory && matchesAvailability;
    });
  }, [items, query, activeCategory, availableOnly]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search meals or snacks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm placeholder:text-white/40 focus:border-gold focus:outline-none"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(e) => setAvailableOnly(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 accent-gold"
          />
          Available only
        </label>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
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
        <p className="py-16 text-center text-white/50">
          No items match your search. Try a different keyword or category.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
