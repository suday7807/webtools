import { Metadata } from 'next'
import { Sparkles, Users, Zap, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about WebTools - our mission to make powerful tools accessible to everyone.',
}

const values = [
  {
    icon: Zap,
    title: 'Speed',
    description: 'We believe tools should be fast. Every conversion and generation happens in seconds.',
  },
  {
    icon: Users,
    title: 'Accessibility',
    description: 'Powerful tools should be available to everyone, not just developers or businesses.',
  },
  {
    icon: Sparkles,
    title: 'Simplicity',
    description: 'No complicated setups, no sign-ups, no paywalls. Just open and use.',
  },
  {
    icon: Heart,
    title: 'Trust',
    description: 'Your data is yours. We never store or share your files or information.',
  },
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
            Empowering Creators with Powerful Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We believe that everyone should have access to powerful, professional-grade tools
            without complexity or cost.
          </p>
        </div>

        {/* Story */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              WebTools started with a simple frustration: every time we needed to convert a file,
              merge PDFs, or generate content, we had to sign up for yet another service or
              download yet another app.
            </p>
            <p className="text-muted-foreground mb-4">
              We thought there must be a better way. So we built one.
            </p>
            <p className="text-muted-foreground">
              Today, thousands of creators, developers, marketers, and businesses use WebTools
              every day to get their work done faster. And we&apos;re just getting started.
            </p>
          </div>
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