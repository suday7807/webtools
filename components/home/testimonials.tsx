'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Globe, Clock } from 'lucide-react'

const highlights = [
  {
    icon: Zap,
    title: 'Fast by Design',
    description: 'Every tool is built to produce results in seconds, without installs or upload queues.',
  },
  {
    icon: Shield,
    title: 'Privacy-First Processing',
    description: 'Most tools run entirely in your browser. Your files stay on your device and are never uploaded to our servers.',
  },
  {
    icon: Globe,
    title: 'Works Anywhere',
    description: 'Access every tool from any device with a modern browser. No accounts, no downloads, no paywalls.',
  },
  {
    icon: Clock,
    title: 'Built for Real Tasks',
    description: 'Each tool solves a specific, everyday problem — from converting files to generating names for your next project.',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Makes WebTools Different
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practical tools built around speed, privacy, and simplicity.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <highlight.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
