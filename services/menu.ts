import { createClient } from '@/lib/supabase/server';
import type { MenuItem } from '@/types';

export async function getMenuItems(): Promise<MenuItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('menu_items')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getMenuItems error', error);
    return [];
  }
  return data as unknown as MenuItem[];
}

export async function getFeaturedMenuItems(limit = 6): Promise<MenuItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('menu_items')
    .select('*, category:categories(*)')
    .eq('available', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('getFeaturedMenuItems error', error);
    return [];
  }
  return data as unknown as MenuItem[];
}

export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('menu_items')
    .select('*, category:categories(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('getMenuItemById error', error);
    return null;
  }
  return data as unknown as MenuItem;
}
