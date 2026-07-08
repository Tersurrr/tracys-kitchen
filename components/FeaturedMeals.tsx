import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import FoodCard from './FoodCard';
import { getFeaturedMenuItems } from '@/services/menu';

export default async function FeaturedMeals() {
  const items = await getFeaturedMenuItems(6);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-eyebrow mb-3">Fan Favorites</p>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Featured Meals
          </h2>
        </div>
        <Link
          href="/menu"
          className="flex items-center gap-1 text-sm font-semibold text-gold hover:underline"
        >
          View Full Menu <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-white/50">
          Menu items will appear here once added from the admin dashboard.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
