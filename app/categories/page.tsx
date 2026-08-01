import { Metadata } from 'next'
import { CategoriesBrowser } from '@/components/categories/categories-browser'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse WebTools tools by category — PDF tools, Markdown converters, AI name generators, and utilities.',
  alternates: {
    canonical: `${SITE_URL}/categories`,
  },
  openGraph: {
    title: 'Categories | WebTools',
    description: 'Browse WebTools tools by category.',
    url: `${SITE_URL}/categories`,
    type: 'website',
    siteName: 'WebTools',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'WebTools - Free Online Tools' }],
  },
}

export default function CategoriesPage() {
  return <CategoriesBrowser />
}
