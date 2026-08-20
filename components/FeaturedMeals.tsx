import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import FoodCard from './FoodCard';
import { getFeaturedMenuItems } from '@/services/menu';

export default async function FeaturedMeals() {
  const items = await getFeaturedMenuItems(6);

  return (
    <section className="mx-auto max-w-7xl overflow-x-clip px-6 py-16 sm:py-20">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Customer Favorites
          </h2>
        </div>
        <Link
          href="/menu"
          className="btn-outline ml-auto shrink-0 self-end px-5 py-2.5 text-sm"
        >
          View Full Menu <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-white/50">
          Menu items will appear here once added from the admin dashboard.
        </p>
      ) : (
        <div className="grid auto-rows-fr grid-cols-1 items-stretch gap-4 min-[360px]:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="h-full">
              <FoodCard item={item} emphasizeInView scrollableName />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
