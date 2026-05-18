'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Copy, Download, Type, FileText } from 'lucide-react'
import { toast } from 'sonner'

export function PasteToMarkdownTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const convertToMarkdown = () => {
    if (!input.trim()) {
      toast.error('Please enter some text')
      return
    }

    const lines = input.split('\n')
    let markdown = ''
    let inList = false
    let inCodeBlock = false

    lines.forEach(line => {
      const trimmed = line.trim()

      if (!trimmed) {
        if (inList) {
          markdown += '\n'
          inList = false
        }
        return
      }

      if (trimmed.startsWith('#')) {
        if (inList) {
          inList = false
        }
        markdown += trimmed + '\n\n'
      } else if (trimmed.match(/^[-*]\s/)) {
        if (!inList) {
          markdown += '\n'
          inList = true
        }
        markdown += trimmed + '\n'
      } else if (trimmed.match(/^\d+\.\s/)) {
        if (!inList) {
          markdown += '\n'
          inList = true
        }
        markdown += trimmed + '\n'
      } else if (trimmed.startsWith('```')) {
        inCodeBlock = !inCodeBlock
        markdown += trimmed + '\n'
      } else if (inCodeBlock) {
        markdown += trimmed + '\n'
      } else if (trimmed.match(/^\*\*|__.*\*\*|__$/)) {
        if (inList) {
          inList = false
        }
        markdown += trimmed + '\n\n'
      } else {
        if (inList) {
          markdown += '\n'
          inList = false
        }
        markdown += trimmed + '\n\n'
      }
    })

    setOutput(markdown.trim())
    toast.success('Converted to Markdown!')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    toast.success('Copied to clipboard!')
  }

  const downloadMarkdown = () => {
    const blob = new Blob([output], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'output.md'
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded!')
  }

  const templates = [
    { label: 'Heading', text: '# Heading 1\n## Heading 2\n### Heading 3' },
    { label: 'Bold & Italic', text: '**Bold text**\n*Italic text*\n***Bold & Italic***' },
    { label: 'List', text: '- Item 1\n- Item 2\n- Item 3' },
    { label: 'Numbered', text: '1. First item\n2. Second item\n3. Third item' },
    { label: 'Link', text: '[Link text](https://example.com)' },
    { label: 'Code', text: '`inline code`\n\n```javascript\nconsole.log("Hello")\n```' },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Templates */}
      <div className="flex flex-wrap gap-2">
        {templates.map(template => (
          <button
            key={template.label}
            onClick={() => setInput(prev => prev + (prev ? '\n' : '') + template.text)}
            className="px-3 py-1.5 rounded-lg text-sm bg-muted hover:bg-muted/80 transition-colors"
          >
            {template.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Type className="w-4 h-4" />
            Plain Text Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here...&#10;&#10;Add headings with #&#10;Make lists with -&#10;Add links with [text](url)"
            className="w-full h-80 p-4 rounded-xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
        </div>

        {/* Output */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Code className="w-4 h-4" />
            Markdown Output
          </label>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              placeholder="Markdown output will appear here..."
              className="w-full h-80 p-4 rounded-xl bg-muted border border-border font-mono text-sm resize-none"
            />
            {output && (
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={downloadMarkdown}
                  className="p-2 rounded-lg bg-background border border-border hover:bg-muted transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Convert Button */}
      <div className="flex justify-center">
        <button
          onClick={convertToMarkdown}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          <FileText className="w-5 h-5" />
          Convert to Markdown
        </button>
      </div>
    </div>
  )
}