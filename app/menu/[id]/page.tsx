import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getMenuItemById } from '@/services/menu';
import FoodDetailClient from '@/components/FoodDetailClient';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = await getMenuItemById(id);
  if (!item) return { title: 'Item Not Found' };
  return {
    title: item.name,
    description: item.description,
  };
}

export default async function FoodDetailPage({ params }: Props) {
  const { id } = await params;
  const item = await getMenuItemById(id);

  if (!item) notFound();

  return <FoodDetailClient item={item} />;
}
