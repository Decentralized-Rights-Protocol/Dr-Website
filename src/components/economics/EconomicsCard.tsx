'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface EconomicsCardProps {
  title: string
  description: string | ReactNode
  icon?: ReactNode
  className?: string
  delay?: number
}

export function EconomicsCard({ 
  title, 
  description, 
  icon, 
  className = '',
  delay = 0 
}: EconomicsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`p-6 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 ${className}`}
    >
      {icon && (
        <div className="mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
        {title}
      </h3>
      <div className="text-neutral-600 dark:text-neutral-300 prose prose-sm dark:prose-invert max-w-none">
        {typeof description === 'string' ? <p>{description}</p> : description}
      </div>
    </motion.div>
  )
}
