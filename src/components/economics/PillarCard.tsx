'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface PillarCardProps {
  icon: LucideIcon
  title: string
  description: string
  index: number
}

export function PillarCard({ icon: Icon, title, description, index }: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-xl"
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
      
      <div className="relative">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          {title}
        </h3>
        
        <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

