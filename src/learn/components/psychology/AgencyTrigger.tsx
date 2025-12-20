/**
 * Agency Trigger Component (Level 4)
 * Psychology Goal: Empower real-world action
 * 
 * Features:
 * - Mission-based framing
 * - Real-world use cases
 * - Verification checkpoints (PoAT)
 * - Effort-based rewards
 */

import React from 'react'
import { RocketLaunchIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'

interface AgencyTriggerProps {
  missionTitle: string
  missionDescription: string
  useCases: string[]
  poatCheckpoint?: boolean
}

export function AgencyTrigger({ 
  missionTitle, 
  missionDescription, 
  useCases,
  poatCheckpoint = false 
}: AgencyTriggerProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Mission Framing */}
      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-lg border border-orange-400/30 p-4">
        <div className="flex items-start gap-3">
          <RocketLaunchIcon className="h-6 w-6 text-orange-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-1">Your Mission</h3>
            <p className="text-sm text-neutral-200 leading-relaxed mb-2">{missionDescription}</p>
            {poatCheckpoint && (
              <div className="mt-3 flex items-center gap-2 bg-orange-500/20 rounded px-2 py-1">
                <CheckBadgeIcon className="h-4 w-4 text-orange-300" />
                <span className="text-xs text-orange-200 font-semibold">
                  PoAT Verification: Complete this mission to earn Proof of Activity
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Real-World Use Cases */}
      {useCases.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4">
          <h4 className="text-sm font-semibold text-white mb-3">Real-World Applications</h4>
          <ul className="space-y-2">
            {useCases.map((useCase, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-neutral-200">
                <span className="text-orange-400 mt-1">→</span>
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

