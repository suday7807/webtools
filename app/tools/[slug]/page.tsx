import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getToolBySlug, getRelatedTools, toolsConfig } from '@/lib/tools/config'
import { ToolInterface } from '@/components/tools/tool-interface'
import { ToolFAQ } from '@/components/tools/tool-faq'
import { ToolCard } from '@/components/tools/tool-card'
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react'
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

  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.seoKeywords,
    openGraph: {
      title: `${tool.name} | WebTools`,
      description: tool.description,
      type: 'website',
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

  return (
    <div className="min-h-screen pt-24 pb-16">
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