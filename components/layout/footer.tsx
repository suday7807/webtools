'use client'

import Link from 'next/link'
import { Layers, Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { categories } from '@/lib/tools/config'

function CurrentYear() {
  return <span>{new Date().getFullYear()}</span>
}

const footerLinks = {
  tools: [
    { label: 'Image to PDF', href: '/tools/image-to-pdf' },
    { label: 'PDF Merge', href: '/tools/pdf-merge' },
    { label: 'AI Name Generator', href: '/tools/ai-saas-name-generator' },
    { label: 'Email Signature', href: '/tools/email-signature-generator' },
    { label: 'CSV to Markdown', href: '/tools/csv-to-markdown' },
  ],
  categories: categories.map(c => ({ label: c.name, href: `/categories?cat=${c.id}` })),
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Sitemap', href: '/sitemap.xml' },
  ],
}

const socialLinks = [
  { icon: Twitter, href: 'https://x.com/suday7807', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/uday-singh-baa578140', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:suday7807@gmail.com', label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">WebTools</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              All-in-one online tools platform for PDF, Markdown, FAQ generation, AI naming, and more.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Tools Column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Tools</h3>
            <ul className="space-y-3">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-3">
              {footerLinks.categories.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © <CurrentYear /> WebTools. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Made with ❤️ for the web</span>
          </div>
        </div>
      </div>
    </footer>
  )
}