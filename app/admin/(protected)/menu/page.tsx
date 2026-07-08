import { getMenuItems } from '@/services/menu';
import { getCategories } from '@/services/categories';
import MenuAdminClient from '@/components/admin/MenuAdminClient';

export default async function AdminMenuPage() {
  const [items, categories] = await Promise.all([
    getMenuItems(),
    getCategories(),
  ]);

  return (
    <div className="min-w-0">
      <h1 className="mb-6 font-display text-2xl font-semibold sm:mb-8">Menu Items</h1>
      <MenuAdminClient items={items} categories={categories} />
    </div>
  );
}
