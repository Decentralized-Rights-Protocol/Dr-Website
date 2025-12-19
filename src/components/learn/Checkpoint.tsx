'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircleIcon, FlagIcon } from '@heroicons/react/24/outline'

interface CheckpointProps {
  title: string
  description?: string
  completed?: boolean
  position?: 'start' | 'middle' | 'end'
  className?: string
}

/**
 * Checkpoint - Progress checkpoint component
 * Provides visual milestones in the learning journey
 * Subtle gamification without trivializing content
 */
export function Checkpoint({
  title,
  description,
  completed = false,
  position = 'middle',
  className = ''
}: CheckpointProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`my-8 ${className}`}
    >
      <div className={`relative bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border-2 ${
        completed ? 'border-green-400' : 'border-white/20'
      } p-6`}>
        {/* Checkpoint Icon */}
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
            completed 
              ? 'bg-green-500/20 border-2 border-green-400' 
              : 'bg-blue-500/20 border-2 border-blue-400'
          }`}>
            {completed ? (
              <CheckCircleIcon className="h-6 w-6 text-green-400" />
            ) : (
              <FlagIcon className="h-6 w-6 text-blue-400" />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className={`text-lg font-semibold ${
                completed ? 'text-green-400' : 'text-white'
              }`}>
                {title}
              </h3>
              {completed && (
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                  Completed
                </span>
              )}
            </div>
            
            {description && (
              <p className="text-neutral-300 leading-relaxed">{description}</p>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        {!completed && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '0%' }}
                  viewport={{ once: true }}
                  className="h-full bg-blue-400 rounded-full"
                />
              </div>
              <span className="text-xs text-neutral-400">Checkpoint</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

