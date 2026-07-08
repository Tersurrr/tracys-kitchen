import type { MetadataRoute } from 'next';
import { getMenuItems } from '@/services/menu';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tracyskitchen.netlify.app';

  const items = await getMenuItems().catch(() => []);

  const itemRoutes: MetadataRoute.Sitemap = items.map((item) => ({
    url: `${siteUrl}/menu/${item.id}`,
    lastModified: item.created_at,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/menu`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/checkout`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ...itemRoutes,
  ];
}
