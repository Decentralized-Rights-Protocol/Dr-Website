/**
 * Stewardship Trigger Component (Level 5)
 * Psychology Goal: Foster responsibility and ethical governance
 * 
 * Features:
 * - Governance simulations
 * - Ethical dilemma scenarios
 * - Peer-review emphasis
 * - RIGHTS token eligibility
 */

import React from 'react'
import { ScaleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

interface StewardshipTriggerProps {
  governanceRole: string
  ethicalScenarios: string[]
  rightsEligible?: boolean
}

export function StewardshipTrigger({ 
  governanceRole, 
  ethicalScenarios,
  rightsEligible = false 
}: StewardshipTriggerProps) {
  return (
    <div className="mb-6 space-y-4">
      {/* Governance Role */}
      <div className="bg-gradient-to-r from-indigo-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg border border-indigo-400/30 p-4">
        <div className="flex items-start gap-3">
          <ScaleIcon className="h-6 w-6 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-1">Your Governance Role</h3>
            <p className="text-sm text-neutral-200 leading-relaxed">{governanceRole}</p>
            {rightsEligible && (
              <div className="mt-3 flex items-center gap-2 bg-indigo-500/20 rounded px-2 py-1">
                <ShieldCheckIcon className="h-4 w-4 text-indigo-300" />
                <span className="text-xs text-indigo-200 font-semibold">
                  $RIGHTS Token Eligible: You can now participate in protocol governance
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ethical Scenarios */}
      {ethicalScenarios.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4">
          <h4 className="text-sm font-semibold text-white mb-3">Ethical Considerations</h4>
          <ul className="space-y-3">
            {ethicalScenarios.map((scenario, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-neutral-200">
                <span className="text-indigo-400 mt-1">⚖️</span>
                <span>{scenario}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-neutral-400 mt-3 italic">
            As a steward of DRP, your decisions impact the entire ecosystem. Consider the long-term implications.
          </p>
        </div>
      )}
    </div>
  )
}

