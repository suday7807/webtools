'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Copy, RefreshCw, Loader2, Wand2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export function AIChatbotNameGeneratorTool() {
  const [description, setDescription] = useState('')
  const [personality, setPersonality] = useState('helpful')
  const [names, setNames] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const personalities = [
    { value: 'helpful', label: 'Helpful', emoji: '🤝' },
    { value: 'friendly', label: 'Friendly', emoji: '😊' },
    { value: 'professional', label: 'Professional', emoji: '💼' },
    { value: 'creative', label: 'Creative', emoji: '🎨' },
    { value: 'fun', label: 'Fun', emoji: '🎉' },
    { value: 'wise', label: 'Wise', emoji: '🧙' },
  ]

  const generateNames = async () => {
    if (!description.trim()) {
      toast.error('Please describe your chatbot')
      return
    }

    setIsGenerating(true)
    setNames([])

    try {
      const response = await fetch('/api/ai/name', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: description,
          industry: personality,
          tool: 'chatbot'
        })
      })

      if (!response.ok) throw new Error('Failed to generate names')

      const data = await response.json()
      setNames(data.names)
      toast.success('Names generated successfully!')
    } catch (error) {
      toast.error('Failed to generate names. Please try again.')
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = (name: string, index: number) => {
    navigator.clipboard.writeText(name)
    setCopiedIndex(index)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-medium">Describe your chatbot</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., A chatbot that helps users with coding questions, provides technical support, and explains programming concepts"
            className="w-full h-32 p-4 rounded-xl bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Personality</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {personalities.map(p => (
              <button
                key={p.value}
                onClick={() => setPersonality(p.value)}
                className={`p-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  personality === p.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <span>{p.emoji}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateNames}
          disabled={isGenerating}
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-medium hover:opacity-90 transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Names...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Generate Chatbot Names
            </>
          )}
        </button>
      </div>

      {/* Results */}
      <AnimatePresence>
        {names.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">
                {names.length} Chatbot Names Generated
              </h3>
              <button
                onClick={generateNames}
                disabled={isGenerating}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <RefreshCw className="w-4 h-4" />
                Generate more
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {names.map((name, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bot className="w-5 h-5 text-violet-500" />
                      <span className="text-lg font-semibold">{name}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(name, index)}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      {copiedIndex === index ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}