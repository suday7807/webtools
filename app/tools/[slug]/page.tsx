import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getToolBySlug, getRelatedTools, toolsConfig } from '@/lib/tools/config'
import { ToolInterface } from '@/components/tools/tool-interface'
import { ToolFAQ } from '@/components/tools/tool-faq'
import { ToolCard } from '@/components/tools/tool-card'
import { ArrowLeft, ArrowRight, HelpCircle, CheckCircle, ListChecks, Target } from 'lucide-react'
import { SITE_URL } from '@/lib/site'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return toolsConfig.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    return {
      title: 'Tool Not Found',
    }
  }

  const canonicalUrl = `${SITE_URL}/tools/${tool.slug}`

  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.seoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${tool.name} | WebTools`,
      description: tool.description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'WebTools',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} - WebTools`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} | WebTools`,
      description: tool.description,
      images: [`${SITE_URL}/og-image.png`],
    },
  }
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params
  const tool = getToolBySlug(slug)

  if (!tool) {
    notFound()
  }

  const relatedTools = getRelatedTools(tool.slug)
  const canonicalUrl = `${SITE_URL}/tools/${tool.slug}`

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    url: canonicalUrl,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_URL}/tools` },
      { '@type': 'ListItem', position: 3, name: tool.name, item: canonicalUrl },
    ],
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {tool.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-foreground transition-colors">
            Tools
          </Link>
          <span>/</span>
          <span className="text-foreground">{tool.name}</span>
        </nav>
      </div>

      {/* Tool Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-start gap-6">
          <Link
            href="/tools"
            className="mt-2 p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{tool.name}</h1>
            <p className="text-muted-foreground text-lg">{tool.description}</p>
          </div>
        </div>
      </div>

      {/* Tool Interface */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <ToolInterface tool={tool} />
      </div>

      {/* How to Use */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <ListChecks className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">How to Use {tool.name}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.howToSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tool.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tool.benefits.map((benefit) => (
            <div key={benefit} className="p-6 rounded-2xl bg-card border border-border">
              <p className="text-muted-foreground">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Use Cases */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Common Use Cases</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tool.useCases.map((useCase) => (
              <li key={useCase} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedTools.map((relatedTool, index) => (
              <ToolCard key={relatedTool.id} tool={relatedTool} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {tool.faqs.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>
          <ToolFAQ faqs={tool.faqs} />
        </div>
      )}
    </div>
  )
}
