import { Metadata } from 'next'
import { MessageSquare } from 'lucide-react'
import { ContactForm } from '@/components/contact/contact-form'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with WebTools. Questions, feedback, partnership requests, and support inquiries are welcome.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact | WebTools',
    description: 'Get in touch with WebTools — questions, feedback, and support.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    siteName: 'WebTools',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'WebTools - Free Online Tools' }],
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            <span>Contact Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions, suggestions, or just want to say hello? We&apos;d love to hear from you.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
