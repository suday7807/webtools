import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'WebTools - All-in-One Online Tools Platform',
    template: '%s | WebTools'
  },
  description: 'Free online tools for PDF conversion, Markdown, FAQ generation, AI naming, and more. Fast, secure, and easy to use.',
  keywords: ['online tools', 'pdf tools', 'markdown converter', 'faq generator', 'ai tools', 'free tools'],
  authors: [{ name: 'WebTools' }],
  creator: 'WebTools',
  metadataBase: new URL('https://webtools.com'),
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://webtools.com',
    siteName: 'WebTools',
    title: 'WebTools - All-in-One Online Tools Platform',
    description: 'Free online tools for PDF conversion, Markdown, FAQ generation, AI naming, and more.',
  },
  twitter: {
    card: 'summary',
    title: 'WebTools - All-in-One Online Tools Platform',
    description: 'Free online tools for PDF conversion, Markdown, FAQ generation, AI naming, and more.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}