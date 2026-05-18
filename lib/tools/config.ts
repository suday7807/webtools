import {
  FileImage,
  Files,
  FileCode,
  Sparkles,
  Mail,
  FileJson,
  FileSpreadsheet,
  Bot,
  Wand2,
} from 'lucide-react'

export type ToolType = 'frontend' | 'backend'
export type ToolCategory =
  | 'pdf'
  | 'markdown'
  | 'ai'
  | 'utility'

export interface ToolConfig {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  category: ToolCategory
  type: ToolType
  icon: string
  color: string
  featured: boolean
  popular: boolean
  inputType: 'file' | 'text' | 'both' | 'none'
  outputType: 'file' | 'text' | 'both' | 'none'
  supportsBatch: boolean
  requiresApi: boolean
  pricing: 'free' | 'premium'
  seoKeywords: string[]
  relatedTools: string[]
  faqs: { question: string; answer: string }[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileImage,
  Files,
  FileCode,
  Sparkles,
  Mail,
  FileJson,
  FileSpreadsheet,
  Bot,
  Wand2,
}

export const toolsConfig: ToolConfig[] = [
  // PDF Tools
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    slug: 'image-to-pdf',
    description: 'Convert images to PDF documents instantly. Supports JPG, PNG, and other image formats.',
    shortDescription: 'Convert images to PDF',
    category: 'pdf',
    type: 'frontend',
    icon: 'FileImage',
    color: 'from-red-500 to-orange-500',
    featured: true,
    popular: true,
    inputType: 'file',
    outputType: 'file',
    supportsBatch: true,
    requiresApi: false,
    pricing: 'free',
    seoKeywords: ['image to pdf', 'jpg to pdf', 'png to pdf', 'convert image to pdf'],
    relatedTools: ['pdf-merge'],
    faqs: [
      { question: 'What image formats are supported?', answer: 'We support JPG, PNG, GIF, BMP, and WebP formats.' },
      { question: 'Is there a limit on image size?', answer: 'Images up to 10MB are supported. For larger files, consider compressing first.' },
      { question: 'Can I convert multiple images at once?', answer: 'Yes, you can upload multiple images and they will be combined into a single PDF.' }
    ]
  },
  {
    id: 'pdf-merge',
    name: 'PDF Merge',
    slug: 'pdf-merge',
    description: 'Merge multiple PDF files into a single document. Combine pages from different sources.',
    shortDescription: 'Merge multiple PDFs',
    category: 'pdf',
    type: 'frontend',
    icon: 'Files',
    color: 'from-blue-500 to-indigo-500',
    featured: true,
    popular: true,
    inputType: 'file',
    outputType: 'file',
    supportsBatch: true,
    requiresApi: false,
    pricing: 'free',
    seoKeywords: ['merge pdf', 'combine pdf', 'join pdf files', 'merge pdf files'],
    relatedTools: ['image-to-pdf'],
    faqs: [
      { question: 'How many PDFs can I merge?', answer: 'You can merge up to 20 PDF files at once.' },
      { question: 'Will the quality be preserved?', answer: 'Yes, all content quality is preserved during merging.' }
    ]
  },

  // Markdown Tools
  {
    id: 'json-to-markdown',
    name: 'JSON to Markdown',
    slug: 'json-to-markdown',
    description: 'Convert JSON data to formatted Markdown tables and lists.',
    shortDescription: 'JSON to Markdown converter',
    category: 'markdown',
    type: 'frontend',
    icon: 'FileJson',
    color: 'from-rose-500 to-pink-500',
    featured: false,
    popular: true,
    inputType: 'text',
    outputType: 'text',
    supportsBatch: false,
    requiresApi: false,
    pricing: 'free',
    seoKeywords: ['json to markdown', 'convert json to md', 'json converter'],
    relatedTools: ['csv-to-markdown', 'xml-to-markdown'],
    faqs: []
  },
  {
    id: 'csv-to-markdown',
    name: 'CSV to Markdown',
    slug: 'csv-to-markdown',
    description: 'Convert CSV files to Markdown tables. Transform spreadsheet data to table format.',
    shortDescription: 'CSV to Markdown converter',
    category: 'markdown',
    type: 'frontend',
    icon: 'FileSpreadsheet',
    color: 'from-teal-500 to-cyan-500',
    featured: false,
    popular: true,
    inputType: 'file',
    outputType: 'text',
    supportsBatch: false,
    requiresApi: false,
    pricing: 'free',
    seoKeywords: ['csv to markdown', 'convert csv to md', 'spreadsheet to table'],
    relatedTools: ['json-to-markdown', 'xml-to-markdown'],
    faqs: []
  },
  {
    id: 'paste-to-markdown',
    name: 'Paste to Markdown',
    slug: 'paste-to-markdown',
    description: 'Convert plain text to Markdown. Format your text with Markdown syntax.',
    shortDescription: 'Text to Markdown converter',
    category: 'markdown',
    type: 'frontend',
    icon: 'FileCode',
    color: 'from-violet-500 to-purple-500',
    featured: true,
    popular: true,
    inputType: 'text',
    outputType: 'text',
    supportsBatch: false,
    requiresApi: false,
    pricing: 'free',
    seoKeywords: ['paste to markdown', 'text to markdown', 'format text to markdown'],
    relatedTools: ['json-to-markdown', 'csv-to-markdown'],
    faqs: []
  },
  {
    id: 'xml-to-markdown',
    name: 'XML to Markdown',
    slug: 'xml-to-markdown',
    description: 'Transform XML data to Markdown. Convert structured data to readable format.',
    shortDescription: 'XML to Markdown converter',
    category: 'markdown',
    type: 'frontend',
    icon: 'FileCode',
    color: 'from-amber-500 to-yellow-500',
    featured: false,
    popular: false,
    inputType: 'text',
    outputType: 'text',
    supportsBatch: false,
    requiresApi: false,
    pricing: 'free',
    seoKeywords: ['xml to markdown', 'convert xml to md', 'xml converter'],
    relatedTools: ['json-to-markdown', 'csv-to-markdown'],
    faqs: []
  },

  // AI Tools
  {
    id: 'ai-saas-name-generator',
    name: 'AI SaaS Brand Name Generator',
    slug: 'ai-saas-name-generator',
    description: 'Generate creative SaaS brand names using AI. Get unique and memorable business names.',
    shortDescription: 'Generate SaaS brand names',
    category: 'ai',
    type: 'backend',
    icon: 'Sparkles',
    color: 'from-cyan-500 to-blue-500',
    featured: true,
    popular: true,
    inputType: 'text',
    outputType: 'text',
    supportsBatch: false,
    requiresApi: true,
    pricing: 'free',
    seoKeywords: ['ai business name generator', 'saas name generator', 'brand name generator', 'ai naming tool'],
    relatedTools: ['ai-chatbot-name-generator'],
    faqs: [
      { question: 'How does the name generator work?', answer: 'Our AI analyzes your keywords and generates unique, memorable business names.' },
      { question: 'Can I use these names commercially?', answer: 'Yes, the names generated are free to use for your projects.' },
      { question: 'How many names can I generate?', answer: 'You can generate up to 20 names per request.' }
    ]
  },
  {
    id: 'ai-chatbot-name-generator',
    name: 'AI Chatbot Name Generator',
    slug: 'ai-chatbot-name-generator',
    description: 'Create unique names for your AI chatbot or virtual assistant. Get creative and fitting names.',
    shortDescription: 'Generate chatbot names',
    category: 'ai',
    type: 'backend',
    icon: 'Bot',
    color: 'from-violet-500 to-indigo-500',
    featured: true,
    popular: true,
    inputType: 'text',
    outputType: 'text',
    supportsBatch: false,
    requiresApi: true,
    pricing: 'free',
    seoKeywords: ['chatbot name generator', 'ai assistant name generator', 'bot name ideas'],
    relatedTools: ['ai-saas-name-generator'],
    faqs: [
      { question: 'Can I get names for different bot personalities?', answer: 'Yes, describe your bot personality and we will generate fitting names.' }
    ]
  },

  // Utility Tools
  {
    id: 'email-signature-generator',
    name: 'Email Signature Generator',
    slug: 'email-signature-generator',
    description: 'Create professional email signatures. Customize and export for your email client.',
    shortDescription: 'Create email signatures',
    category: 'utility',
    type: 'frontend',
    icon: 'Mail',
    color: 'from-blue-500 to-sky-500',
    featured: true,
    popular: true,
    inputType: 'both',
    outputType: 'both',
    supportsBatch: false,
    requiresApi: false,
    pricing: 'free',
    seoKeywords: ['email signature generator', 'create signature', 'professional email signature'],
    relatedTools: [],
    faqs: [
      { question: 'How do I use the generated signature?', answer: 'Copy the signature HTML and paste it into your email client settings.' },
      { question: 'Can I customize the colors?', answer: 'Yes, you can customize colors, fonts, and layout.' }
    ]
  }
]

export const categories = [
  {
    id: 'pdf',
    name: 'PDF Tools',
    description: 'Convert, merge, and edit PDF documents',
    icon: 'Files',
    color: 'from-red-500 to-orange-500',
    toolCount: 2
  },
  {
    id: 'markdown',
    name: 'Markdown',
    description: 'Convert documents to Markdown format',
    icon: 'FileCode',
    color: 'from-green-500 to-teal-500',
    toolCount: 4
  },
  {
    id: 'ai',
    name: 'AI Tools',
    description: 'AI-powered generation and naming tools',
    icon: 'Sparkles',
    color: 'from-purple-500 to-pink-500',
    toolCount: 2
  },
  {
    id: 'utility',
    name: 'Utilities',
    description: 'Helpful utility tools and generators',
    icon: 'Wand2',
    color: 'from-blue-500 to-indigo-500',
    toolCount: 1
  }
]

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return toolsConfig.find(tool => tool.slug === slug)
}

export function getToolsByCategory(category: ToolCategory): ToolConfig[] {
  return toolsConfig.filter(tool => tool.category === category)
}

export function getFeaturedTools(): ToolConfig[] {
  return toolsConfig.filter(tool => tool.featured)
}

export function getPopularTools(): ToolConfig[] {
  return toolsConfig.filter(tool => tool.popular)
}

export function getRelatedTools(toolId: string): ToolConfig[] {
  const tool = getToolBySlug(toolId)
  if (!tool) return []
  return tool.relatedTools
    .map(slug => getToolBySlug(slug))
    .filter((t): t is ToolConfig => t !== undefined)
}

export function getIconComponent(iconName: string) {
  return iconMap[iconName] || Sparkles
}

export function searchTools(query: string): ToolConfig[] {
  const lowerQuery = query.toLowerCase()
  return toolsConfig.filter(
    tool =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.seoKeywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))
  )
}