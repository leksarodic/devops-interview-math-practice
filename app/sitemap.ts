import type { MetadataRoute } from 'next';
import { QUESTIONS } from '@/data/questions';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const staticRoutes = ['/', '/practice', '/questions', '/results', '/review', '/study', '/contact', '/privacy', '/terms'];
  const questionRoutes = QUESTIONS.map((q) => `/questions/${q.id}`);

  return [...staticRoutes, ...questionRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route.startsWith('/questions/') ? 0.8 : 0.7
  }));
}
