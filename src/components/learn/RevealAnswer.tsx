'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface RevealAnswerProps {
  answer: string | React.ReactNode
  explanation?: string
  label?: string
  className?: string
}

/**
 * RevealAnswer - Standalone component for hiding/revealing answers
 * Provides smooth animations and clear visual separation
 */
export function RevealAnswer({
  answer,
  explanation,
  label = 'Answer',
  className = ''
}: RevealAnswerProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <div className={`my-6 ${className}`}>
      <AnimatePresence>
        {!isRevealed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-t border-white/20 pt-4"
          >
            <button
              onClick={() => setIsRevealed(true)}
              className="w-full flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 border-2 border-blue-400 text-blue-300 px-6 py-3 rounded-md font-medium transition-all hover:scale-105"
              aria-label="Reveal answer"
            >
              <EyeIcon className="h-5 w-5" />
              <span>Reveal {label}</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/20 pt-4 mt-4"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-green-400 font-semibold">{label}:</h4>
                <button
                  onClick={() => setIsRevealed(false)}
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label="Hide answer"
                >
                  <EyeSlashIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="p-4 bg-green-500/10 border border-green-400/30 rounded-md">
                <div className="text-white leading-relaxed">
                  {typeof answer === 'string' ? (
                    <p>{answer}</p>
                  ) : (
                    answer
                  )}
                </div>
              </div>

              {explanation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-md"
                >
                  <h5 className="text-blue-400 font-semibold mb-2">Explanation:</h5>
                  <p className="text-neutral-200 leading-relaxed">{explanation}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

