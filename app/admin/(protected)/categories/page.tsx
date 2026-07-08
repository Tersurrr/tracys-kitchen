import { getCategories } from '@/services/categories';
import CategoryAdminClient from '@/components/admin/CategoryAdminClient';

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-w-0">
      <h1 className="mb-6 font-display text-2xl font-semibold sm:mb-8">Categories</h1>
      <CategoryAdminClient categories={categories} />
    </div>
  );
}
