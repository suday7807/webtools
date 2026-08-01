import { MetadataRoute } from 'next'
import { toolsConfig } from '@/lib/tools/config'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  const staticPages = [
    '',
    '/tools',
    '/categories',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ]

  const toolPages = toolsConfig.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const staticSitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : 0.8,
  }))

  return [...staticSitemap, ...toolPages]
}