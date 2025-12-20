'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpenIcon } from '@heroicons/react/24/outline'

interface QuickRecapProps {
  points: string[]
  className?: string
}

/**
 * QuickRecap - Summary block with key points
 * Helps reinforce learning before moving forward
 */
export function QuickRecap({ points, className = '' }: QuickRecapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`my-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-400/40 rounded-lg p-5 ${className}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <BookOpenIcon className="h-6 w-6 text-blue-400 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold text-blue-300 mb-3">Quick Recap</h4>
          <ul className="space-y-2">
            {points.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span className="text-neutral-200 leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

