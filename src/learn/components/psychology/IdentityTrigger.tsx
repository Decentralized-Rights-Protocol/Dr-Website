/**
 * Identity Trigger Component (Level 3)
 * Psychology Goal: Create belonging and self-identification
 * 
 * Features:
 * - Learner titles/roles
 * - Progress visibility
 * - Collaborative tasks
 * - Visual badges
 */

import React from 'react'
import { UserGroupIcon, TrophyIcon } from '@heroicons/react/24/outline'

interface IdentityTriggerProps {
  learnerTitle: string
  progressPercentage: number
  level: number
}

export function IdentityTrigger({ learnerTitle, progressPercentage, level }: IdentityTriggerProps) {
  const getTitleForLevel = (level: number): string => {
    if (level >= 3) return 'DRP Contributor'
    if (level >= 2) return 'DRP Learner'
    return 'DRP Explorer'
  }

  return (
    <div className="mb-6 space-y-4">
      {/* Identity Badge */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg border border-purple-400/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/30 rounded-full p-2">
              <UserGroupIcon className="h-6 w-6 text-purple-300" />
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wide">Your Title</p>
              <p className="text-lg font-bold text-white">{learnerTitle || getTitleForLevel(level)}</p>
            </div>
          </div>
          <div className="text-right">
            <TrophyIcon className="h-8 w-8 text-yellow-400 mx-auto mb-1" />
            <p className="text-xs text-neutral-400">Level {level}</p>
          </div>
        </div>
      </div>

      {/* Progress Visibility */}
      <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-white">Your Progress</span>
          <span className="text-sm text-neutral-300">{progressPercentage.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-neutral-800 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-neutral-400 mt-2">
          Your progress is visible to the community. Keep learning to advance your status!
        </p>
      </div>
    </div>
  )
}

