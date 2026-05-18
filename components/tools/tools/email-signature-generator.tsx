'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Copy, Download, CheckCircle, User, Building, Globe, Phone } from 'lucide-react'
import { toast } from 'sonner'

export function EmailSignatureTool() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    avatar: '',
    color: '#6366f1'
  })

  const [copied, setCopied] = useState(false)

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const colorOptions = [
    '#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b',
    '#10b981', '#06b6d4', '#3b82f6', '#6b7280', '#1f2937'
  ]

  const generateSignature = () => {
    return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.6; color: #333;">
  <div style="display: flex; align-items: center; gap: 16px;">
    ${formData.avatar ? `<img src="${formData.avatar}" alt="${formData.name}" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover;">` : ''}
    <div>
      <div style="font-weight: 600; font-size: 16px; color: ${formData.color};">${formData.name || 'Your Name'}</div>
      <div style="color: #666;">${formData.title || 'Your Title'}${formData.company ? ` at ${formData.company}` : ''}</div>
      <div style="margin-top: 8px; font-size: 13px; color: #888;">
        ${formData.email ? `<a href="mailto:${formData.email}" style="color: ${formData.color}; text-decoration: none;">${formData.email}</a>` : ''}
        ${formData.phone ? ` | <a href="tel:${formData.phone}" style="color: ${formData.color}; text-decoration: none;">${formData.phone}</a>` : ''}
        ${formData.website ? ` | <a href="${formData.website}" style="color: ${formData.color}; text-decoration: none;">${formData.website}</a>` : ''}
      </div>
    </div>
  </div>
</div>
    `.trim()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSignature())
    setCopied(true)
    toast.success('Signature copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadHTML = () => {
    const blob = new Blob([generateSignature()], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'signature.html'
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Signature downloaded!')
  }

  return (
    <div className="space-y-8">
      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="John Doe"
              className="w-full p-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Building className="w-4 h-4" />
              Job Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Product Manager"
              className="w-full p-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Building className="w-4 h-4" />
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => updateField('company', e.target.value)}
              placeholder="Acme Inc."
              className="w-full p-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="john@example.com"
              className="w-full p-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="+1 234 567 8900"
              className="w-full p-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Website
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => updateField('website', e.target.value)}
              placeholder="https://example.com"
              className="w-full p-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">Accent Color</label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map(color => (
                <button
                  key={color}
                  onClick={() => updateField('color', color)}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    formData.color === color ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      {formData.name && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-sm font-medium mb-4">Preview</h3>
          <div className="p-6 rounded-xl bg-card border border-border">
            <div dangerouslySetInnerHTML={{ __html: generateSignature() }} />
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copied ? 'Copied!' : 'Copy Signature'}
        </button>
        <button
          onClick={downloadHTML}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download HTML
        </button>
      </div>
    </div>
  )
}