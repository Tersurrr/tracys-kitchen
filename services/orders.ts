import { createClient } from '@/lib/supabase/server';
import type { Order } from '@/types';

export async function getOrders(): Promise<Order[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, menu_item:menu_items(*))')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getOrders error', error);
    return [];
  }
  return data as unknown as Order[];
}

export async function getOrderStats() {
  const supabase = await createClient();

  const [{ count: total }, { count: pending }, { count: completed }, { count: menuItems }, { count: categories }] =
    await Promise.all([
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending'),
      supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'delivered'),
      supabase.from('menu_items').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
    ]);

  return {
    totalOrders: total ?? 0,
    pendingOrders: pending ?? 0,
    completedOrders: completed ?? 0,
    menuItemCount: menuItems ?? 0,
    categoryCount: categories ?? 0,
  };
}
