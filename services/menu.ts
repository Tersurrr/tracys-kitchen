import { unstable_cache } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import type { MenuItem } from '@/types';

function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export const getMenuItems = unstable_cache(async (): Promise<MenuItem[]> => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('menu_items')
    .select('*, category:categories(*)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getMenuItems error', error);
    return [];
  }
  return data as unknown as MenuItem[];
}, ['menu-items'], { revalidate: 300, tags: ['menu'] });

export const getFeaturedMenuItems = unstable_cache(async (limit = 6): Promise<MenuItem[]> => {
  const supabase = createPublicClient();
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
}, ['featured-menu-items'], { revalidate: 300, tags: ['menu'] });

export const getMenuItemById = unstable_cache(async (id: string): Promise<MenuItem | null> => {
  const supabase = createPublicClient();
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
}, ['menu-item-by-id'], { revalidate: 300, tags: ['menu'] });
