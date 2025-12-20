/**
 * Understanding Trigger Component (Level 2)
 * Psychology Goal: Build confidence and mental models
 * 
 * Features:
 * - Sectioned cards instead of long text
 * - Cause → effect diagrams
 * - Scenario-based questions emphasis
 * - Lock progression messaging
 */

import React from 'react'
import { AcademicCapIcon, LockClosedIcon } from '@heroicons/react/24/outline'

interface UnderstandingTriggerProps {
  lessonTitle: string
  keyConcepts: string[]
  lockedUntilUnderstanding?: boolean
}

export function UnderstandingTrigger({ 
  lessonTitle, 
  keyConcepts,
  lockedUntilUnderstanding = false 
}: UnderstandingTriggerProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Key Concepts Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {keyConcepts.map((concept, index) => (
          <div 
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-start gap-2">
              <AcademicCapIcon className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-neutral-200">{concept}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mastery Feedback */}
      {lockedUntilUnderstanding && (
        <div className="bg-yellow-500/10 backdrop-blur-sm rounded-lg border border-yellow-400/30 p-3">
          <div className="flex items-center gap-2">
            <LockClosedIcon className="h-5 w-5 text-yellow-400" />
            <p className="text-sm text-neutral-200">
              <span className="font-semibold text-yellow-400">Mastery Required:</span> Complete this lesson 
              to unlock the next level. Understanding these concepts is essential for your progress.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

