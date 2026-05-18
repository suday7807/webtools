'use client'

import { motion } from 'framer-motion'
import { Clock, Sparkles } from 'lucide-react'

interface ComingSoonToolProps {
  toolName: string
}

export function ComingSoonTool({ toolName }: ComingSoonToolProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-4">{toolName}</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          This tool is coming soon! We&apos;re working hard to bring you the best experience.
          Stay tuned for updates.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
          <Clock className="w-4 h-4" />
          <span>Coming Soon</span>
        </div>
      </motion.div>
    </div>
  )
}