/**
 * Curiosity Trigger Component (Level 1)
 * Psychology Goal: Reduce fear, spark curiosity, build safety
 * 
 * Features:
 * - "Why this matters" micro-banner
 * - Interactive visual elements
 * - Low-risk quiz messaging
 * - Immediate micro-reward feedback
 */

import React from 'react'
import { LightBulbIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { EarnDeRi } from '../gamified'

interface CuriosityTriggerProps {
  lessonTitle: string
  whyItMatters: string
  rewardAmount: number
}

export function CuriosityTrigger({ lessonTitle, whyItMatters, rewardAmount }: CuriosityTriggerProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Why This Matters Banner */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg border border-blue-400/30 p-4">
        <div className="flex items-start gap-3">
          <LightBulbIcon className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-1">Why This Matters</h3>
            <p className="text-sm text-neutral-200 leading-relaxed">{whyItMatters}</p>
          </div>
        </div>
      </div>

      {/* Low-Risk Quiz Messaging */}
      <div className="bg-green-500/10 backdrop-blur-sm rounded-lg border border-green-400/30 p-3">
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-green-400" />
          <p className="text-sm text-neutral-200">
            <span className="font-semibold text-green-400">No pressure!</span> This quiz helps you learn. 
            You'll earn <EarnDeRi amount={rewardAmount} /> just for completing it.
          </p>
        </div>
      </div>
    </div>
  )
}

