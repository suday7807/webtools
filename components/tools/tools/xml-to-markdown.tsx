'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Copy, Download, FileCode, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export function XMLToMarkdownTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convertXMLtoMarkdown = () => {
    setError('')
    if (!input.trim()) {
      setError('Please enter XML data')
      return
    }

    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(input, 'text/xml')

      const parseError = doc.querySelector('parsererror')
      if (parseError) {
        throw new Error('Invalid XML')
      }

      const markdown = xmlToMarkdown(doc.documentElement, 0)
      setOutput(markdown)
      toast.success('Converted to Markdown!')
    } catch (e) {
      setError('Invalid XML format. Please check your input.')
      toast.error('Invalid XML')
    }
  }

  const xmlToMarkdown = (node: Element, indent: number): string => {
    const spaces = '  '.repeat(indent)
    let md = ''

    const childElements = Array.from(node.children)

    if (childElements.length === 0) {
      const text = node.textContent?.trim()
      if (text) {
        return `${spaces}- ${text}\n`
      }
      return ''
    }

    const tagName = node.tagName.toLowerCase()

    if (['ul', 'ol'].includes(tagName)) {
      const listItems = childElements.filter(c => c.tagName.toLowerCase() === 'li')
      listItems.forEach(li => {
        md += xmlToMarkdown(li, indent)
      })
      return md
    }

    if (tagName === 'li') {
      const text = node.textContent?.trim()
      if (text) {
        return `${spaces}- ${text}\n`
      }

      childElements.forEach(child => {
        md += xmlToMarkdown(child, indent + 1)
      })
      return md
    }

    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
      const level = parseInt(tagName[1])
      const text = node.textContent?.trim()
      if (text) {
        return `${'#'.repeat(level)} ${text}\n\n`
      }
    }

    if (tagName === 'p') {
      const text = node.textContent?.trim()
      if (text) {
        return `${spaces}${text}\n\n`
      }
    }

    if (tagName === 'a') {
      const href = node.getAttribute('href') || ''
      const text = node.textContent?.trim() || ''
      if (text && href) {
        return `[${text}](${href})`
      }
    }

    if (tagName === 'code') {
      const text = node.textContent?.trim()
      if (text) {
        return `\`${text}\``
      }
    }

    if (tagName === 'pre') {
      const codeElement = node.querySelector('code')
      const text = codeElement?.textContent?.trim() || node.textContent?.trim() || ''
      if (text) {
        return `${spaces}\`\`\`\n${text}\n${spaces}\`\`\`\n\n`
      }
    }

    if (tagName === 'table') {
      const rows = node.querySelectorAll('tr')
      let tableMd = ''

      rows.forEach((row, rowIndex) => {
        const cells = row.querySelectorAll('td, th')
        const cellValues = Array.from(cells).map(c => c.textContent?.trim() || '')

        if (rowIndex === 0) {
          tableMd += '| ' + cellValues.join(' | ') + ' |\n'
          tableMd += '| ' + cellValues.map(() => '---').join(' | ') + ' |\n'
        } else {
          tableMd += '| ' + cellValues.join(' | ') + ' |\n'
        }
      })

      return tableMd + '\n'
    }

    childElements.forEach(child => {
      md += xmlToMarkdown(child, indent)
    })

    return md
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
            <FileCode className="w-4 h-4" />
            XML Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='<root><item>Value</item></root>'
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
          onClick={convertXMLtoMarkdown}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          <Code className="w-5 h-5" />
          Convert to Markdown
        </button>
      </div>
    </div>
  )
}