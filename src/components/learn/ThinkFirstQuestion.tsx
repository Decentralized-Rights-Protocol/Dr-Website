'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LightBulbIcon, EyeIcon } from '@heroicons/react/24/outline'

interface ThinkFirstQuestionProps {
  question: string
  questionId?: string // CRITICAL: Unique ID for per-question state isolation
  type?: 'multiple-choice' | 'reflection' | 'scenario'
  options?: string[]
  correctAnswer?: number | string
  explanation?: string
  onAnswerRevealed?: () => void
  onAnswerSelected?: (index: number) => void
  selectedAnswer?: number | null
  showNavigation?: boolean
  isQuizMode?: boolean
  // External revealed state for quiz mode (per-question tracking)
  isRevealedExternal?: boolean
  onRevealToggle?: (revealed: boolean) => void
}

/**
 * ThinkFirstQuestion - Question component that hides answers by default
 * Encourages learners to think before revealing the answer
 * Supports multiple-choice, reflection prompts, and scenario-based questions
 */
export function ThinkFirstQuestion({
  question,
  questionId,
  type = 'multiple-choice',
  options = [],
  correctAnswer,
  explanation,
  onAnswerRevealed,
  onAnswerSelected,
  selectedAnswer: externalSelectedAnswer,
  showNavigation = false,
  isQuizMode = false,
  isRevealedExternal,
  onRevealToggle
}: ThinkFirstQuestionProps) {
  // CRITICAL FIX: Use external revealed state in quiz mode to prevent state leakage
  // In quiz mode, parent tracks revealed state per question ID
  // In non-quiz mode, use local state (each component instance is independent)
  const [internalRevealed, setInternalRevealed] = useState(false)
  const [internalSelectedOption, setInternalSelectedOption] = useState<number | null>(null)
  
  // Determine revealed state: external (quiz) or internal (standalone)
  const isRevealed = isQuizMode && isRevealedExternal !== undefined 
    ? isRevealedExternal 
    : internalRevealed
  
  // Use external selected answer if provided (for quiz mode), otherwise use internal state
  const selectedOption = externalSelectedAnswer !== undefined ? externalSelectedAnswer : internalSelectedOption

  const handleReveal = () => {
    if (isQuizMode && onRevealToggle) {
      // Quiz mode: notify parent to update per-question state
      onRevealToggle(true)
    } else {
      // Standalone mode: update local state
      setInternalRevealed(true)
    }
    onAnswerRevealed?.()
  }

  const handleOptionSelect = (index: number) => {
    if (!isRevealed || isQuizMode) {
      if (externalSelectedAnswer === undefined) {
        setInternalSelectedOption(index)
      }
      onAnswerSelected?.(index)
    }
  }

  return (
    <div className="my-8 bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6">
      {/* Question Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="flex-shrink-0 mt-1">
          <LightBulbIcon className="h-6 w-6 text-yellow-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">Think First</h3>
          <p className="text-neutral-200 leading-relaxed">{question}</p>
        </div>
      </div>

      {/* Multiple Choice Options */}
      {type === 'multiple-choice' && options.length > 0 && (
        <div className="space-y-3 mb-6">
          {options.map((option, index) => {
            const isCorrect = index === correctAnswer
            const isSelected = selectedOption === index
            const showFeedback = isRevealed && (isCorrect || isSelected)

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={isRevealed && !isQuizMode}
                className={`w-full text-left p-4 rounded-md border-2 transition-all ${
                  isRevealed
                    ? isCorrect
                      ? 'border-green-400 bg-green-500/20'
                      : isSelected && !isCorrect
                      ? 'border-red-400 bg-red-500/20'
                      : 'border-white/20 bg-white/5'
                    : isSelected
                    ? 'border-blue-400 bg-blue-500/20'
                    : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'
                } ${isRevealed && !isQuizMode ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold text-white">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-neutral-200 flex-1">{option}</span>
                  {showFeedback && (
                    <span className={`text-sm font-semibold ${
                      isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Reflection/Scenario Prompt */}
      {(type === 'reflection' || type === 'scenario') && (
        <div className="mb-6 p-4 bg-white/5 rounded-md border border-white/10">
          <p className="text-sm text-neutral-300 italic">
            Take a moment to think about this before revealing the answer...
          </p>
        </div>
      )}

      {/* Reveal Answer Section */}
      <AnimatePresence>
        {!isRevealed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border-t border-white/20 pt-4"
          >
            <button
              onClick={handleReveal}
              className="w-full flex items-center justify-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 border-2 border-blue-400 text-blue-300 px-6 py-3 rounded-md font-medium transition-all hover:scale-105"
            >
              <EyeIcon className="h-5 w-5" />
              <span>Reveal Answer</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/20 pt-4 mt-4"
          >
            <div className="space-y-4">
              {/* Answer Display */}
              {type === 'multiple-choice' && correctAnswer !== undefined && (
                <div className="p-4 bg-green-500/10 border border-green-400/30 rounded-md">
                  <div className="flex items-start gap-3">
                    <span className="text-green-400 font-semibold">Correct Answer:</span>
                    <span className="text-white">
                      {String.fromCharCode(65 + (correctAnswer as number))}: {options[correctAnswer as number]}
                    </span>
                  </div>
                </div>
              )}

              {/* Explanation */}
              {explanation && (
                <div className="p-4 bg-blue-500/10 border border-blue-400/30 rounded-md">
                  <h4 className="text-blue-400 font-semibold mb-2">Explanation:</h4>
                  <p className="text-neutral-200 leading-relaxed">{explanation}</p>
                </div>
              )}

              {/* Reflection/Scenario Answer */}
              {(type === 'reflection' || type === 'scenario') && correctAnswer && (
                <div className="p-4 bg-purple-500/10 border border-purple-400/30 rounded-md">
                  <h4 className="text-purple-400 font-semibold mb-2">Key Points:</h4>
                  <p className="text-neutral-200 leading-relaxed">{correctAnswer}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

