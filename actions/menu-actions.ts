'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath, revalidateTag } from 'next/cache';

type MenuItemPayload = {
  name: string;
  description: string;
  price: number;
  category_id: string;
  available: boolean;
  image?: string | null;
};

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { supabase, error: 'Admin session required. Please sign in again.' };
  }

  return { supabase, error: null };
}

function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, ' ');
}

export async function createMenuItem(payload: MenuItemPayload) {
  const { supabase, error: authError } = await requireAdmin();
  if (authError) return { success: false, error: authError };

  const name = normalizeName(payload.name);
  const price = Number(payload.price);

  if (!name || !payload.category_id || !Number.isFinite(price) || price < 0) {
    return { success: false, error: 'Name, category, and a valid price are required.' };
  }

  const { data: category } = await supabase
    .from('categories')
    .select('id')
    .eq('id', payload.category_id)
    .maybeSingle();

  if (!category) return { success: false, error: 'Choose an existing category.' };

  const { error } = await supabase.from('menu_items').insert({
    ...payload,
    name,
    description: payload.description.trim(),
    price,
  });
  if (error) return { success: false, error: error.message };
  revalidateTag('menu');
  revalidatePath('/admin/menu');
  revalidatePath('/menu');
  revalidatePath('/');
  return { success: true };
}

export async function updateMenuItem(id: string, payload: Partial<MenuItemPayload>) {
  const { supabase, error: authError } = await requireAdmin();
  if (authError) return { success: false, error: authError };

  const nextPayload = {
    ...payload,
    ...(payload.name !== undefined ? { name: normalizeName(payload.name) } : {}),
    ...(payload.description !== undefined ? { description: payload.description.trim() } : {}),
    ...(payload.price !== undefined ? { price: Number(payload.price) } : {}),
  };

  if (nextPayload.name !== undefined && !nextPayload.name) {
    return { success: false, error: 'Name is required.' };
  }

  if (
    nextPayload.price !== undefined &&
    (!Number.isFinite(nextPayload.price) || nextPayload.price < 0)
  ) {
    return { success: false, error: 'Enter a valid price.' };
  }

  if (nextPayload.category_id) {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('id', nextPayload.category_id)
      .maybeSingle();

    if (!category) return { success: false, error: 'Choose an existing category.' };
  }

  const { error } = await supabase.from('menu_items').update(nextPayload).eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidateTag('menu');
  revalidatePath('/admin/menu');
  revalidatePath('/menu');
  revalidatePath('/');
  return { success: true };
}

export async function deleteMenuItem(id: string) {
  const { supabase, error: authError } = await requireAdmin();
  if (authError) return { success: false, error: authError };

  const { error } = await supabase.from('menu_items').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidateTag('menu');
  revalidatePath('/admin/menu');
  revalidatePath('/menu');
  revalidatePath('/');
  return { success: true };
}

export async function toggleMenuItemAvailability(id: string, available: boolean) {
  return updateMenuItem(id, { available });
}

export async function uploadMenuItemImage(formData: FormData) {
  const { supabase, error: authError } = await requireAdmin();
  if (authError) return { success: false, error: authError };

  const file = formData.get('file') as File;
  if (!file) return { success: false, error: 'No file provided' };
  if (!file.type.startsWith('image/')) {
    return { success: false, error: 'Only image files can be uploaded.' };
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const fileName = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from('foods')
    .upload(fileName, file, { cacheControl: '31536000', upsert: false });

  if (error) return { success: false, error: error.message };

  const { data } = supabase.storage.from('foods').getPublicUrl(fileName);
  return { success: true, url: data.publicUrl };
}

export async function createCategory(name: string) {
  const { supabase, error: authError } = await requireAdmin();
  if (authError) return { success: false, error: authError };

  const normalizedName = normalizeName(name);
  if (!normalizedName) return { success: false, error: 'Category name is required.' };

  const { error } = await supabase.from('categories').insert({ name: normalizedName });
  if (error) return { success: false, error: error.message };
  revalidateTag('categories');
  revalidateTag('menu');
  revalidatePath('/admin/categories');
  revalidatePath('/admin/menu');
  revalidatePath('/menu');
  revalidatePath('/');
  return { success: true };
}

export async function updateCategory(id: string, name: string) {
  const { supabase, error: authError } = await requireAdmin();
  if (authError) return { success: false, error: authError };

  const normalizedName = normalizeName(name);
  if (!normalizedName) return { success: false, error: 'Category name is required.' };

  const { error } = await supabase.from('categories').update({ name: normalizedName }).eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidateTag('categories');
  revalidateTag('menu');
  revalidatePath('/admin/categories');
  revalidatePath('/admin/menu');
  revalidatePath('/menu');
  revalidatePath('/');
  return { success: true };
}

export async function deleteCategory(id: string) {
  const { supabase, error: authError } = await requireAdmin();
  if (authError) return { success: false, error: authError };

  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidateTag('categories');
  revalidateTag('menu');
  revalidatePath('/admin/categories');
  revalidatePath('/admin/menu');
  revalidatePath('/menu');
  revalidatePath('/');
  return { success: true };
}
