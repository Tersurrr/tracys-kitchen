import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getMenuItems } from '@/services/menu';
import { getCategories } from '@/services/categories';
import MenuBrowser from '@/components/MenuBrowser';
import { MenuGridSkeleton } from '@/components/Skeletons';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    "Browse Tracy's Kitchen's full menu of homemade rice dishes, soups, snacks, drinks, and desserts. Order by pickup or delivery.",
  alternates: { canonical: '/menu' },
};

async function MenuContent() {
  const [items, categories] = await Promise.all([
    getMenuItems(),
    getCategories(),
  ]);

  return <MenuBrowser items={items} categories={categories} />;
}

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8 text-center sm:mb-10">
        <p className="section-eyebrow mb-3">Our Menu</p>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl md:text-6xl">
          Fresh, Made-to-Order Favorites
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          Every dish is prepared after you order. Search, filter by category,
          and add your favorites to your preorder.
        </p>
      </div>

      <Suspense fallback={<MenuGridSkeleton count={9} />}>
        <MenuContent />
      </Suspense>
    </div>
  );
}
