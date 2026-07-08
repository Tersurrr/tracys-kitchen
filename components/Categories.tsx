import Link from 'next/link';
import { getCategories } from '@/services/categories';

export default async function Categories() {
  const categories = await getCategories();

  return (
    <section className="bg-charcoal-light/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="section-eyebrow mb-3">Explore</p>
        <h2 className="mb-12 font-display text-3xl font-semibold md:text-4xl">
          Shop by Category
        </h2>

        {categories.length === 0 ? (
          <p className="max-w-2xl text-white/50">
            Categories will appear here once they are added from the admin dashboard.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/menu?category=${encodeURIComponent(category.name)}`}
              className="group flex min-h-32 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] p-5 text-center transition-colors hover:border-gold/60 hover:bg-gold/10"
            >
              <span className="font-display text-lg font-semibold text-white transition-colors group-hover:text-gold">
                {category.name}
              </span>
            </Link>
          ))}
          </div>
        )}
      </div>
    </section>
  );
}
