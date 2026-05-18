'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles, Files, FileCode, MessageSquare, Wand2 } from 'lucide-react'
import { categories, toolsConfig, ToolCategory } from '@/lib/tools/config'
import { ToolCard } from '@/components/tools/tool-card'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Files,
  FileCode,
  MessageSquare,
  Sparkles,
  Wand2,
}

function CategoriesContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('cat') as ToolCategory | null
  const [activeCategory, setActiveCategory] = useState<ToolCategory | null>(initialCategory)

  const toolsInCategory = activeCategory
    ? toolsConfig.filter(tool => tool.category === activeCategory)
    : []

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Categories</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Browse by Category
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore tools organized by category. Find the perfect tool for your specific needs.
          </p>
        </motion.div>

        {/* Categories Grid */}
        {!activeCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon] || Sparkles
              const toolCount = toolsConfig.filter(t => t.category === category.id).length
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setActiveCategory(category.id as ToolCategory)}
                    className="group w-full text-left p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">
                        {toolCount} {toolCount === 1 ? 'tool' : 'tools'}
                      </span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Category Header when selected */}
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className="text-primary font-medium hover:underline mb-4 inline-flex items-center gap-1"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to all categories
            </button>
            <div className="flex items-center gap-4">
              {(() => {
                const category = categories.find(c => c.id === activeCategory)
                const Icon = category ? (iconMap[category.icon] || Sparkles) : Sparkles
                return (
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category?.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                )
              })()}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {categories.find(c => c.id === activeCategory)?.name}
                </h2>
                <p className="text-muted-foreground">
                  {toolsInCategory.length} {toolsInCategory.length === 1 ? 'tool' : 'tools'} available
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tools in Category */}
        {activeCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {toolsInCategory.map((tool, index) => (
              <ToolCard key={tool.id} tool={tool} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    }>
      <CategoriesContent />
    </Suspense>
  )
}