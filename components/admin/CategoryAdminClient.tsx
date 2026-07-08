'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { createCategory, updateCategory, deleteCategory } from '@/actions/menu-actions';
import type { Category } from '@/types';

export default function CategoryAdminClient({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    const result = await createCategory(newName.trim());
    setSaving(false);
    if (!result.success) {
      toast.error(result.error ?? 'Failed to add category');
      return;
    }
    toast.success('Category added');
    setNewName('');
    router.refresh();
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const handleUpdate = async (id: string) => {
    if (!editName.trim()) return;
    const result = await updateCategory(id, editName.trim());
    if (!result.success) {
      toast.error(result.error ?? 'Update failed');
      return;
    }
    toast.success('Category updated');
    setEditingId(null);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category? Items in it will need reassigning.')) return;
    const result = await deleteCategory(id);
    if (!result.success) {
      toast.error(result.error ?? 'Delete failed');
      return;
    }
    toast.success('Category deleted');
    router.refresh();
  };

  return (
    <div className="min-w-0">
      <div className="glass-card mb-6 flex flex-col gap-3 p-4 sm:flex-row">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name"
          className="flex-1 rounded-lg border border-white/10 bg-white/5 p-3 text-sm focus:border-gold focus:outline-none"
        />
        <button onClick={handleCreate} disabled={saving} className="btn-primary w-full text-sm disabled:opacity-60 sm:w-auto">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      <div className="glass-card divide-y divide-white/5">
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            {editingId === cat.id ? (
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="min-h-11 flex-1 rounded-lg border border-white/10 bg-white/5 p-2 text-sm focus:border-gold focus:outline-none"
              />
            ) : (
              <span className="break-words text-sm font-medium">{cat.name}</span>
            )}

            <div className="flex justify-end gap-2">
              {editingId === cat.id ? (
                <>
                  <button onClick={() => handleUpdate(cat.id)} aria-label="Save" className="rounded-lg border border-white/10 p-3">
                    <Check className="h-4 w-4 text-green-400" />
                  </button>
                  <button onClick={() => setEditingId(null)} aria-label="Cancel" className="rounded-lg border border-white/10 p-3">
                    <X className="h-4 w-4 text-white/50" />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => startEdit(cat)} aria-label={`Edit ${cat.name}`} className="rounded-lg border border-white/10 p-3">
                    <Pencil className="h-4 w-4 text-white/50 hover:text-gold" />
                  </button>
                  <button onClick={() => handleDelete(cat.id)} aria-label={`Delete ${cat.name}`} className="rounded-lg border border-white/10 p-3">
                    <Trash2 className="h-4 w-4 text-white/50 hover:text-red-400" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="p-8 text-center text-sm text-white/40">No categories yet.</p>
        )}
      </div>
    </div>
  );
}
