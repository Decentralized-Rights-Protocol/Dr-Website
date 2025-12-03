'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Globe, Shield, Sparkles } from 'lucide-react'

interface EconomicsHeroProps {
  title: string
  subtitle: string
  description?: string
}

export function EconomicsHero({ title, subtitle, description }: EconomicsHeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 py-24 sm:py-32">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
          >
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">DRP Economics</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
            {title}
          </h1>
          
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>

          {description && (
            <p className="text-lg text-blue-200/80 max-w-2xl mx-auto">
              {description}
            </p>
          )}

          {/* Icon Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-2xl mx-auto"
          >
            {[
              { Icon: TrendingUp, label: 'Sustainable Growth' },
              { Icon: Globe, label: 'Global Impact' },
              { Icon: Shield, label: 'Rights-Backed' },
              { Icon: Sparkles, label: 'AI-Verified' },
            ].map(({ Icon, label }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <Icon className="h-8 w-8 text-blue-400" />
                <span className="text-sm text-blue-200 text-center">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

