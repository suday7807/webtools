'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Copy, Download, CheckCircle, FileJson } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function JSONToMarkdownTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convertJSONtoMarkdown = () => {
    setError('')
    if (!input.trim()) {
      setError('Please enter JSON data')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const markdown = jsonToMarkdown(parsed)
      setOutput(markdown)
      toast.success('Converted to Markdown!')
    } catch (e) {
      setError('Invalid JSON format. Please check your input.')
      toast.error('Invalid JSON')
    }
  }

  const jsonToMarkdown = (obj: unknown, indent: number = 0): string => {
    const spaces = '  '.repeat(indent)

    if (obj === null) return 'null'
    if (obj === undefined) return ''
    if (typeof obj === 'boolean') return obj ? 'true' : 'false'
    if (typeof obj === 'number') return String(obj)
    if (typeof obj === 'string') return `\`${obj}\``

    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]'
      const items = obj.map(item => `${spaces}- ${jsonToMarkdown(item, indent + 1)}`)
      return items.join('\n')
    }

    if (typeof obj === 'object') {
      const entries = Object.entries(obj as Record<string, unknown>)
      if (entries.length === 0) return '{}'

      const isSimple = entries.every(([_, value]) =>
        typeof value !== 'object' || value === null
      )

      if (isSimple) {
        const items = entries.map(([key, value]) =>
          `| **${key}** | ${jsonToMarkdown(value)} |`
        )
        return `| Key | Value |\n|---|---|\n${items.join('\n')}`
      }

      const items = entries.map(([key, value]) =>
        `${spaces}- **${key}**: ${jsonToMarkdown(value, indent + 1)}`
      )
      return items.join('\n')
    }

    return String(obj)
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-medium">
            <FileJson className="w-4 h-4" />
            JSON Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "John", "age": 30, "city": "NYC"}'
            className="w-full h-80 p-4 rounded-xl bg-card border border-border font-mono text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
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
          onClick={convertJSONtoMarkdown}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          <Code className="w-5 h-5" />
          Convert to Markdown
        </button>
      </div>
    </div>
  )
}