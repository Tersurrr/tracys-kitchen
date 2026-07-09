'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemAvailability,
  uploadMenuItemImage,
} from '@/actions/menu-actions';
import { formatCurrency } from '@/utils/format';
import type { Category, MenuItem } from '@/types';

type FormState = {
  id?: string;
  name: string;
  description: string;
  price: string;
  category_id: string;
  available: boolean;
  image: string | null;
};

const EMPTY_FORM: FormState = {
  name: '',
  description: '',
  price: '',
  category_id: '',
  available: true,
  image: null,
};

const MAX_IMAGE_WIDTH = 1200;
const IMAGE_QUALITY = 0.72;

async function compressImage(file: File) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_WIDTH / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);

  const context = canvas.getContext('2d');
  if (!context) {
    bitmap.close();
    throw new Error('Image compression is not supported in this browser.');
  }

  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/jpeg', IMAGE_QUALITY);
  });

  if (!blob) {
    throw new Error('Could not compress this image.');
  }

  const originalName = file.name.replace(/\.[^/.]+$/, '') || 'food-image';
  return new File([blob], `${originalName}.jpg`, { type: 'image/jpeg' });
}

export default function MenuAdminClient({
  items,
  categories,
}: {
  items: MenuItem[];
  categories: Category[];
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (item: MenuItem) => {
    setForm({
      id: item.id,
      name: item.name,
      description: item.description,
      price: String(item.price),
      category_id: item.category_id ?? '',
      available: item.available,
      image: item.image,
    });
    setShowForm(true);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const compressedFile = await compressImage(file);
      const formData = new FormData();
      formData.append('file', compressedFile);
      const result = await uploadMenuItemImage(formData);

      if (!result.success) {
        toast.error(result.error ?? 'Upload failed');
        return;
      }
      setForm((f) => ({ ...f, image: result.url ?? null }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.category_id) {
      toast.error('Name, price, and category are required');
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category_id: form.category_id,
      available: form.available,
      image: form.image,
    };

    const result = form.id
      ? await updateMenuItem(form.id, payload)
      : await createMenuItem(payload);

    setSaving(false);

    if (!result.success) {
      toast.error(result.error ?? 'Something went wrong');
      return;
    }
    toast.success(form.id ? 'Item updated' : 'Item added');
    setShowForm(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this menu item?')) return;
    const result = await deleteMenuItem(id);
    if (!result.success) {
      toast.error(result.error ?? 'Delete failed');
      return;
    }
    toast.success('Item deleted');
    router.refresh();
  };

  const handleToggleAvailability = async (id: string, available: boolean) => {
    const result = await toggleMenuItemAvailability(id, !available);
    if (!result.success) {
      toast.error(result.error ?? 'Update failed');
      return;
    }
    router.refresh();
  };

  return (
    <div className="min-w-0">
      <div className="mb-6 flex justify-stretch sm:justify-end">
        <button onClick={openCreate} className="btn-primary w-full text-sm sm:w-auto">
          <Plus className="h-4 w-4" /> Add Food
        </button>
      </div>

      {showForm && (
        <div className="glass-card mb-8 max-h-[calc(100dvh-7rem)] overflow-y-auto p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">
              {form.id ? 'Edit Item' : 'New Item'}
            </h2>
            <button onClick={() => setShowForm(false)} aria-label="Close form">
              <X className="h-5 w-5 text-white/50 hover:text-white" />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Price (USD)</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-white/60">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Category</label>
              <select
                value={form.category_id}
                onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-sm focus:border-gold focus:outline-none"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/60">Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-sm" />
              {uploading && <p className="mt-1 text-xs text-white/40">Uploading...</p>}
              {form.image && (
                <div className="relative mt-2 h-20 w-20 overflow-hidden rounded-lg">
                  <Image src={form.image} alt="Preview" fill className="object-cover" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 md:col-span-2">
              <input
                type="checkbox"
                checked={form.available}
                onChange={(e) => setForm({ ...form, available: e.target.checked })}
                className="h-4 w-4 accent-gold"
              />
              <label className="text-sm text-white/70">Available</label>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary mt-6 w-full disabled:opacity-60 sm:w-auto"
          >
            {saving ? 'Saving...' : 'Save Item'}
          </button>
        </div>
      )}

      <div className="space-y-4 sm:hidden">
        {items.map((item) => (
          <article key={item.id} className="glass-card min-w-0 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="break-words font-display text-base font-semibold">{item.name}</h2>
                <p className="mt-1 text-xs text-white/50">{item.category?.name ?? '-'}</p>
              </div>
              <p className="shrink-0 text-sm font-semibold text-gold">{formatCurrency(item.price)}</p>
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-white/60">{item.description}</p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => handleToggleAvailability(item.id, item.available)}
                className={`min-h-10 rounded-full px-3 py-1 text-xs font-semibold ${
                  item.available
                    ? 'bg-green-500/15 text-green-400'
                    : 'bg-white/10 text-white/40'
                }`}
              >
                {item.available ? 'Available' : 'Unavailable'}
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(item)}
                  aria-label={`Edit ${item.name}`}
                  className="rounded-lg border border-white/10 p-3"
                >
                  <Pencil className="h-4 w-4 text-white/60" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Delete ${item.name}`}
                  className="rounded-lg border border-white/10 p-3"
                >
                  <Trash2 className="h-4 w-4 text-white/60" />
                </button>
              </div>
            </div>
          </article>
        ))}

        {items.length === 0 && (
          <p className="glass-card p-8 text-center text-sm text-white/40">
            No menu items yet. Click &quot;Add Food&quot; to create one.
          </p>
        )}
      </div>

      <div className="glass-card hidden overflow-x-auto sm:block">
        <table className="min-w-[42rem] w-full text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-white/40">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Available</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-white/5">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4 text-white/60">{item.category?.name ?? '—'}</td>
                <td className="p-4 text-gold">{formatCurrency(item.price)}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleToggleAvailability(item.id, item.available)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.available
                        ? 'bg-green-500/15 text-green-400'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {item.available ? 'Available' : 'Unavailable'}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(item)} aria-label={`Edit ${item.name}`} className="rounded-lg p-2">
                      <Pencil className="h-4 w-4 text-white/50 hover:text-gold" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} aria-label={`Delete ${item.name}`} className="rounded-lg p-2">
                      <Trash2 className="h-4 w-4 text-white/50 hover:text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/40">
                  No menu items yet. Click &quot;Add Food&quot; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
