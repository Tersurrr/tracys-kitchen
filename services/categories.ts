import { unstable_cache } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import type { Category } from '@/types';

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

export const getCategories = unstable_cache(async (): Promise<Category[]> => {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('getCategories error', error);
    return [];
  }
  return data as Category[];
}, ['categories'], { revalidate: 300, tags: ['categories'] });
