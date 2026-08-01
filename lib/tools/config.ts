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
  howToSteps: { title: string; description: string }[]
  features: string[]
  benefits: string[]
  useCases: string[]
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
    ],
    howToSteps: [
      { title: 'Upload your images', description: 'Click the upload area or drag and drop JPG, PNG, GIF, BMP, or WebP files. You can add multiple images at once.' },
      { title: 'Arrange the order', description: 'Reorder your images so they appear in the right sequence, and remove any you do not need.' },
      { title: 'Convert to PDF', description: 'Click the convert button. The PDF is built locally in your browser, so nothing is uploaded.' },
      { title: 'Download', description: 'Your PDF is ready instantly. Download it to your device and use it anywhere.' }
    ],
    features: [
      'Supports JPG, PNG, GIF, BMP, and WebP images',
      'Combine multiple images into a single PDF',
      'Runs entirely in your browser — files never leave your device',
      'Instant download with no account required'
    ],
    benefits: [
      'Turn a folder of images into one shareable document',
      'Keep scanned or photographed pages in a single file',
      'No software installation or sign-up needed',
      'Private by design — your images are never uploaded'
    ],
    useCases: [
      'Convert camera photos into a PDF photo album',
      'Combine scanned documents into one file',
      'Create a single PDF from screenshots for sharing',
      'Package product images for clients or portfolios'
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
    ],
    howToSteps: [
      { title: 'Upload your PDFs', description: 'Add up to 20 PDF files by clicking or dragging them into the drop zone.' },
      { title: 'Set the order', description: 'Arrange the files so the pages appear in the sequence you want.' },
      { title: 'Merge the files', description: 'Click merge and the PDFs are combined into one document in your browser.' },
      { title: 'Download the result', description: 'Save the merged document. Processing is local and files are not stored.' }
    ],
    features: [
      'Merge up to 20 PDF files at once',
      'Preserves original page quality and layout',
      'Browser-based processing with no upload',
      'Free to use with no account'
    ],
    benefits: [
      'Combine related documents into one easy-to-share file',
      'Keep complete control over page order',
      'Works from any device with a modern browser',
      'Private — your files are never uploaded'
    ],
    useCases: [
      'Combine multiple invoice PDFs into one file',
      'Merge several chapters into a single document',
      'Join signed forms and pages into a complete file',
      'Package multiple reports into one deliverable'
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
    faqs: [
      { question: 'What types of JSON can I convert?', answer: 'Objects and arrays of objects are converted into Markdown tables. Simple values are formatted as lists.' },
      { question: 'Is my JSON sent to a server?', answer: 'No. The conversion runs entirely in your browser and your data never leaves your device.' },
      { question: 'Can I convert a JSON file?', answer: 'Yes. Open your JSON file and paste its contents, or copy the text from any JSON file.' }
    ],
    howToSteps: [
      { title: 'Paste your JSON', description: 'Paste valid JSON into the input area. Objects and arrays of objects convert best.' },
      { title: 'Convert', description: 'Click convert and the tool transforms your data into a formatted Markdown table.' },
      { title: 'Copy the output', description: 'Copy the Markdown and paste it into a README, wiki, or any Markdown editor.' }
    ],
    features: [
      'Converts JSON objects and arrays to Markdown tables',
      'Formats nested data into readable output',
      'Instant, browser-based conversion',
      'Output ready to paste into documentation'
    ],
    benefits: [
      'Document API responses as readable tables',
      'No manual formatting of JSON into Markdown',
      'Works offline in your browser',
      'No data leaves your device'
    ],
    useCases: [
      'Document API data in README files',
      'Turn configuration data into documentation tables',
      'Prepare structured data for blog posts',
      'Convert test fixtures into readable specs'
    ]
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
    faqs: [
      { question: 'Can I use a file exported from Excel?', answer: 'Yes, standard .csv exports work, including fields with quoted commas.' },
      { question: 'Does the tool upload my file?', answer: 'No. CSV conversion happens entirely in your browser, so your data is not uploaded.' },
      { question: 'What about large files?', answer: 'Large files are fine. Processing happens locally, so performance depends on your device.' }
    ],
    howToSteps: [
      { title: 'Upload or paste CSV', description: 'Drag a .csv file into the drop zone, or paste CSV text directly into the input.' },
      { title: 'Convert', description: 'Click convert and your rows and columns become a formatted Markdown table.' },
      { title: 'Copy the table', description: 'Copy the output and paste it into documentation or anywhere Markdown is supported.' }
    ],
    features: [
      'Converts CSV files or pasted text to Markdown tables',
      'Preserves column headers',
      'Handles exports from Excel and Google Sheets',
      'Fully browser-based with no upload'
    ],
    benefits: [
      'Document spreadsheet data as tables',
      'Convert exports from Excel or Google Sheets instantly',
      'No formatting by hand',
      'Private — your data stays in your browser'
    ],
    useCases: [
      'Turn spreadsheet exports into README tables',
      'Document database exports as tables',
      'Create Markdown tables for wikis and docs',
      'Convert CSV data for content management systems'
    ]
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
    faqs: [
      { question: 'Is this a WYSIWYG editor?', answer: 'No, it converts pasted text into Markdown markup that you can copy and reuse.' },
      { question: 'Is my text stored?', answer: 'No. Conversion happens locally in your browser and nothing is stored.' },
      { question: 'Can I use the output on GitHub?', answer: 'Yes, the Markdown output works in GitHub, GitLab, Notion, and most documentation tools.' }
    ],
    howToSteps: [
      { title: 'Paste your text', description: 'Paste any plain or formatted text into the input area.' },
      { title: 'Convert', description: 'The tool applies Markdown formatting such as headings, lists, and emphasis.' },
      { title: 'Copy the Markdown', description: 'Copy the formatted output and use it in any Markdown-enabled platform.' }
    ],
    features: [
      'Converts plain text to Markdown syntax',
      'Adds headings, lists, and emphasis automatically',
      'Sample templates included for quick testing',
      'Fully browser-based'
    ],
    benefits: [
      'Learn Markdown by example',
      'Format text quickly without manual markup',
      'No account or installation needed',
      'Your text never leaves your browser'
    ],
    useCases: [
      'Draft blog posts in Markdown',
      'Prepare content for GitHub, Notion, or docs sites',
      'Learn Markdown formatting',
      'Reformat notes into structured documents'
    ]
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
    faqs: [
      { question: 'What XML can be converted?', answer: 'Well-formed XML with simple element structures converts best into headings and lists.' },
      { question: 'Is my data uploaded?', answer: 'No. Conversion runs entirely in your browser and nothing is sent to a server.' },
      { question: 'Can I convert large XML files?', answer: 'Yes. Since processing happens locally, large files are supported.' }
    ],
    howToSteps: [
      { title: 'Paste your XML', description: 'Paste valid, well-formed XML into the input area.' },
      { title: 'Convert', description: 'The tool converts XML elements into readable Markdown headings and lists.' },
      { title: 'Copy the output', description: 'Copy the Markdown and use it in your documentation or wiki.' }
    ],
    features: [
      'Converts XML elements to Markdown headings and lists',
      'Handles nested structures',
      'Instant browser-based conversion',
      'Output ready to paste into docs'
    ],
    benefits: [
      'Document XML data without manual work',
      'Make structured data human-readable',
      'No uploads — works entirely in your browser',
      'Free to use'
    ],
    useCases: [
      'Document API responses that use XML',
      'Turn configuration files into readable specs',
      'Prepare XML data for wikis',
      'Convert structured feeds into documentation'
    ]
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
      { question: 'How does the name generator work?', answer: 'It analyzes your keywords and generates unique, memorable business names.' },
      { question: 'Can I use these names commercially?', answer: 'Yes, the names generated are free to use for your projects.' },
      { question: 'How many names can I generate?', answer: 'You can generate up to 10 names per request.' }
    ],
    howToSteps: [
      { title: 'Enter your keywords', description: 'Type words that describe your product, audience, or niche.' },
      { title: 'Choose your niche', description: 'Select an industry so the suggestions match your style.' },
      { title: 'Generate names', description: 'Get a list of unique name suggestions instantly.' },
      { title: 'Pick and use', description: 'Copy your favourite names and check availability for your project.' }
    ],
    features: [
      'Generates up to 10 unique name ideas per request',
      'Industry-aware suggestions',
      'Instant results with no sign-up',
      'Free for commercial use'
    ],
    benefits: [
      'Skip hours of brainstorming',
      'Get name ideas tailored to your niche',
      'No account required',
      'Suggestions are free for commercial projects'
    ],
    useCases: [
      'Name a new SaaS product or startup',
      'Brainstorm a brand for a side project',
      'Generate names for a product line',
      'Find short, catchy names for apps'
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
      { question: 'Can I get names for different bot personalities?', answer: 'Yes, describe your bot personality and we will generate fitting names.' },
      { question: 'Are the generated names free to use?', answer: 'Yes, the names are free for personal and commercial projects.' },
      { question: 'Is my description stored?', answer: 'No. Your input is used only to generate names and is not stored.' }
    ],
    howToSteps: [
      { title: 'Describe your bot', description: 'Write a short description of your chatbot personality or purpose.' },
      { title: 'Generate', description: 'Get a list of name suggestions that fit your assistant.' },
      { title: 'Pick and use', description: 'Choose a name that fits and copy it into your project.' }
    ],
    features: [
      'Names tailored to your bot personality',
      'Generates multiple suggestions per request',
      'Free and no account required',
      'Names are free for commercial use'
    ],
    benefits: [
      'Find a name that matches your assistant character',
      'No manual brainstorming',
      'Quick, instant suggestions',
      'Free for any project'
    ],
    useCases: [
      'Name a customer support chatbot',
      'Brand a virtual assistant or bot',
      'Name an AI agent for a project',
      'Get ideas for a personal assistant app'
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
    ],
    howToSteps: [
      { title: 'Fill in your details', description: 'Enter your name, title, company, phone, and email address.' },
      { title: 'Customize the style', description: 'Adjust colors and style to match your brand.' },
      { title: 'Preview your signature', description: 'See a live preview as you make changes.' },
      { title: 'Copy and install', description: 'Copy the signature HTML and paste it into Gmail, Outlook, or other clients.' }
    ],
    features: [
      'Live preview as you type',
      'Customizable colors and styles',
      'One-click copy of signature HTML',
      'Works with Gmail, Outlook, and other clients'
    ],
    benefits: [
      'Create a professional signature in minutes',
      'Keep consistent branding across emails',
      'No design skills required',
      'Free with no sign-up'
    ],
    useCases: [
      'Add a professional signature to work emails',
      'Keep a consistent brand across a team',
      'Create a personal email signature with social links',
      'Rebuild an outdated signature quickly'
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

export function getToolsByCategory(category: string): ToolConfig[] {
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
