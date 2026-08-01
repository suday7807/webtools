import { Metadata } from 'next'
import { ToolsBrowser } from '@/components/tools/tools-browser'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'All Tools',
  description: 'Browse the complete collection of free online tools on WebTools — PDF converters, Markdown converters, AI name generators, and utilities.',
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
  openGraph: {
    title: 'All Tools | WebTools',
    description: 'Browse the complete collection of free online tools on WebTools.',
    url: `${SITE_URL}/tools`,
    type: 'website',
    siteName: 'WebTools',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'WebTools - Free Online Tools' }],
  },
}

export default function ToolsPage() {
  return <ToolsBrowser />
}
