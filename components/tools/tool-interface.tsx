'use client'

import { ToolConfig } from '@/lib/tools/config'
import { ImageToPDFTool } from './tools/image-to-pdf'
import { PDFMergeTool } from './tools/pdf-merge'
import { JSONToMarkdownTool } from './tools/json-to-markdown'
import { CSVToMarkdownTool } from './tools/csv-to-markdown'
import { PasteToMarkdownTool } from './tools/paste-to-markdown'
import { XMLToMarkdownTool } from './tools/xml-to-markdown'
import { AISaaSNameGeneratorTool } from './tools/ai-saas-name-generator'
import { AIChatbotNameGeneratorTool } from './tools/ai-chatbot-name-generator'
import { EmailSignatureTool } from './tools/email-signature-generator'
import { ComingSoonTool } from './tools/coming-soon'

interface ToolInterfaceProps {
  tool: ToolConfig
}

export function ToolInterface({ tool }: ToolInterfaceProps) {
  switch (tool.id) {
    case 'image-to-pdf':
      return <ImageToPDFTool />
    case 'pdf-merge':
      return <PDFMergeTool />
    case 'json-to-markdown':
      return <JSONToMarkdownTool />
    case 'csv-to-markdown':
      return <CSVToMarkdownTool />
    case 'paste-to-markdown':
      return <PasteToMarkdownTool />
    case 'xml-to-markdown':
      return <XMLToMarkdownTool />
    case 'ai-saas-name-generator':
      return <AISaaSNameGeneratorTool />
    case 'ai-chatbot-name-generator':
      return <AIChatbotNameGeneratorTool />
    case 'email-signature-generator':
      return <EmailSignatureTool />
    default:
      return <ComingSoonTool toolName={tool.name} />
  }
}