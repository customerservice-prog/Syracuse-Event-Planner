import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const paths: { path: string; changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency']; priority: number }[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/pricing', changeFrequency: 'weekly', priority: 0.95 },
    { path: '/services', changeFrequency: 'weekly', priority: 0.95 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.85 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.85 },
  ];

  return paths.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
