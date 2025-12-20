'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ConceptCardProps {
  icon?: React.ReactNode
  title: string
  description: string
  color?: 'blue' | 'green' | 'purple' | 'amber' | 'pink'
  className?: string
}

const colorClasses = {
  blue: 'bg-blue-500/20 border-blue-400/30 text-blue-300',
  green: 'bg-green-500/20 border-green-400/30 text-green-300',
  purple: 'bg-purple-500/20 border-purple-400/30 text-purple-300',
  amber: 'bg-amber-500/20 border-amber-400/30 text-amber-300',
  pink: 'bg-pink-500/20 border-pink-400/30 text-pink-300'
}

/**
 * ConceptCard - Rounded rectangle card with icon and text
 * Used to highlight key concepts in lessons
 */
export function ConceptCard({
  icon,
  title,
  description,
  color = 'blue',
  className = ''
}: ConceptCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl border-2 p-4 ${colorClasses[color]} ${className}`}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="flex-shrink-0 mt-1">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-1">{title}</h4>
          <p className="text-sm text-neutral-200 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

