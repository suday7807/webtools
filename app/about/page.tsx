import { Metadata } from 'next'
import { Sparkles, Users, Zap, Shield, Cpu, CheckCircle } from 'lucide-react'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about WebTools - a collection of fast, free, and privacy-first online tools for everyday tasks.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
}

const values = [
  {
    icon: Zap,
    title: 'Speed',
    description: 'Tools should be fast. Every conversion and generation is designed to finish in seconds.',
  },
  {
    icon: Users,
    title: 'Accessibility',
    description: 'Powerful tools should be available to everyone, not just developers or businesses.',
  },
  {
    icon: Sparkles,
    title: 'Simplicity',
    description: 'No complicated setups, no sign-ups, no paywalls. Just open a tool and use it.',
  },
  {
    icon: Shield,
    title: 'Privacy',
    description: 'Your files and data stay yours. Most processing happens in your browser, and we do not store your files.',
  },
]

const trustPoints = [
  'Most tools run entirely in your browser, so your files never leave your device.',
  'No account, sign-up, or personal information is required to use any tool.',
  'Files are processed in memory and are not retained or stored on our servers.',
  'Our tools are free for both personal and commercial use.',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>About Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Powerful Tools, Free for Everyone
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            WebTools is a growing collection of fast, free, and privacy-first online tools
            that solve everyday problems — no sign-ups, no downloads, no paywalls.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            We believe that professional-grade tools should not require a paid subscription,
            a sign-up form, or handing over your files. Our mission is to build a library of
            tools that anyone can open in a browser and use immediately.
          </p>
          <p className="text-muted-foreground">
            Every tool we ship exists because it solves a real, everyday problem — converting
            an image to PDF, merging documents, formatting data as Markdown, or naming a
            product or chatbot. We keep each one focused, fast, and simple.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">How Our Tools Work</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Most of our file-based tools run entirely in your browser. When you upload an image
            or document, the processing happens locally on your device using JavaScript — your
            file is never uploaded to our servers.
          </p>
          <p className="text-muted-foreground">
            The AI name generators are the exception: they send only the short keyword you
            enter to a server-side endpoint to generate suggestions. Text you type is never
            stored or shared beyond generating your results.
          </p>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Trust Us */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why You Can Trust WebTools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trustPoints.map((point) => (
              <div key={point} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-6 text-center">
            The site is served over HTTPS, and our full data-handling practices are documented
            in our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Ready to try our tools?
          </p>
          <a
            href="/tools"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Explore All Tools
          </a>
        </div>
      </div>
    </div>
  )
}
