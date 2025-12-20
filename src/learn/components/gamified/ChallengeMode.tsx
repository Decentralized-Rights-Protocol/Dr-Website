'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AcademicCapIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface ChallengeModeProps {
  challenge: string
  solution?: string
  className?: string
}

/**
 * ChallengeMode - Interactive challenge block
 * Encourages active thinking and problem-solving
 */
export function ChallengeMode({ challenge, solution, className = '' }: ChallengeModeProps) {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`my-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/40 rounded-lg p-5 ${className}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <AcademicCapIcon className="h-6 w-6 text-purple-400 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-semibold text-purple-300 mb-2">Challenge Mode</h4>
          <p className="text-neutral-200 leading-relaxed mb-4">{challenge}</p>
          
          {solution && (
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="text-sm text-purple-300 hover:text-purple-200 underline"
            >
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showSolution && solution && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-purple-400/30"
          >
            <div className="flex items-start gap-2">
              <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="font-semibold text-green-300 mb-1">Solution</h5>
                <p className="text-neutral-200 leading-relaxed">{solution}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

