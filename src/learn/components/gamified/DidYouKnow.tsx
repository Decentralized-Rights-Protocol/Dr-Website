'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LightBulbIcon } from '@heroicons/react/24/outline'

interface DidYouKnowProps {
  fact: string
  className?: string
}

/**
 * DidYouKnow - Highlight box for interesting facts
 * Friendly, engaging way to share additional knowledge
 */
export function DidYouKnow({ fact, className = '' }: DidYouKnowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`my-6 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-2 border-amber-400/40 rounded-lg p-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <LightBulbIcon className="h-6 w-6 text-amber-400" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-amber-300 mb-2">Did You Know?</h4>
          <p className="text-neutral-200 leading-relaxed">{fact}</p>
        </div>
      </div>
    </motion.div>
  )
}

