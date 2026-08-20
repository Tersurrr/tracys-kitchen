import { getCategories } from '@/services/categories';
import { getMenuItems } from '@/services/menu';
import CategorySlider from '@/components/CategorySlider';

export default async function Categories() {
  const [categories, menuItems] = await Promise.all([getCategories(), getMenuItems()]);
  const visibleCategories = categories.filter(
    (category) => !/\b(?:soups?|stews?)\b/i.test(category.name)
  );

  const imageByCategory = Object.fromEntries(
    visibleCategories.map((category) => [
      category.id,
      menuItems.find((item) => item.category_id === category.id && item.image)?.image ?? null,
    ])
  );

  return (
    <section className="bg-charcoal-light/40 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-7 font-display text-3xl font-semibold md:mb-8 md:text-4xl">
          Shop by Category
        </h2>

        {visibleCategories.length === 0 ? (
          <p className="max-w-2xl text-white/50">
            Categories will appear here once they are added from the admin dashboard.
          </p>
        ) : (
          <CategorySlider categories={visibleCategories} imageByCategory={imageByCategory} />
        )}
      </div>
    </section>
  );
}
