import type { MetadataRoute } from 'next';

import { getPortfolioRoutes } from '@/lib/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pranavthakwani.dev';

  return getPortfolioRoutes().map((route) => ({
    url: route === '/' ? siteUrl : `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
