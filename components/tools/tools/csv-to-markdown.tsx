'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Code, Copy, Download, FileSpreadsheet, Upload, X } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import Papa from 'papaparse'

export function CSVToMarkdownTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setFileName(file.name)
      Papa.parse(file, {
        complete: (results) => {
          const markdown = convertToMarkdown(results.data as string[][])
          setInput(JSON.stringify(results.data))
          setOutput(markdown)
          setError('')
          toast.success('CSV converted to Markdown!')
        },
        error: () => {
          setError('Failed to parse CSV file')
          toast.error('Failed to parse CSV')
        }
      })
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  })

  const convertCSVtoMarkdown = () => {
    setError('')
    if (!input.trim()) {
      setError('Please enter CSV data')
      return
    }

    try {
      const result = Papa.parse(input)
      const markdown = convertToMarkdown(result.data as string[][])
      setOutput(markdown)
      toast.success('Converted to Markdown!')
    } catch (e) {
      setError('Invalid CSV format. Please check your input.')
      toast.error('Invalid CSV')
    }
  }

  const convertToMarkdown = (data: string[][]): string => {
    if (data.length === 0) return ''

    const rows = data.filter(row => row.some(cell => cell.trim()))
    if (rows.length === 0) return ''

    const maxCols = Math.max(...rows.map(row => row.length))

    const paddedRows = rows.map(row => {
      const padded = [...row]
      while (padded.length < maxCols) padded.push('')
      return padded
    })

    const header = paddedRows[0]
    const body = paddedRows.slice(1)

    let markdown = '| ' + header.map(h => h || ' ').join(' | ') + ' |\n'
    markdown += '| ' + header.map(() => '---').join(' | ') + ' |\n'

    body.forEach(row => {
      markdown += '| ' + row.map(cell => cell || ' ').join(' | ') + ' |\n'
    })

    return markdown
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
    link.download = `${fileName.replace('.csv', '')}.md`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded!')
  }

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300',
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-primary/50 hover:bg-muted/50'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
            <Upload className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="font-medium">Drop CSV file here</p>
            <p className="text-sm text-muted-foreground">or click to select</p>
          </div>
        </div>
      </div>

      {/* Or separator */}
      <div className="relative flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-sm text-muted-foreground">or paste CSV below</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Manual Input */}
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Name,Age,City&#10;John,30,NYC&#10;Jane,25,LA"
          className="w-full h-40 p-4 rounded-xl bg-card border border-border font-mono text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>

      {/* Convert Button */}
      <div className="flex justify-center">
        <button
          onClick={convertCSVtoMarkdown}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          <FileSpreadsheet className="w-5 h-5" />
          Convert to Markdown
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Code className="w-4 h-4" />
              Markdown Output
            </label>
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={downloadMarkdown}
                className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <pre className="w-full p-4 rounded-xl bg-muted border border-border font-mono text-sm overflow-x-auto whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}
    </div>
  )
}