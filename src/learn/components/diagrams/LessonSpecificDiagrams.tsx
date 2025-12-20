'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface DiagramProps {
  title?: string
  caption?: string
  className?: string
}

/**
 * Lesson-specific diagram components
 * Each lesson gets its own unique visual representation
 */

// Blockchain Block Flow Diagram
export function BlockchainFlowDiagram({ title, caption, className = '' }: DiagramProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`my-8 ${className}`}
    >
      <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6">
        {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
        <svg viewBox="0 0 800 300" className="w-full h-auto max-w-4xl">
          <defs>
            <marker id="blockArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
            </marker>
          </defs>
          
          {/* Block 1 */}
          <rect x="50" y="100" width="120" height="80" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
          <text x="110" y="130" textAnchor="middle" className="text-xs fill-white font-semibold">Block 1</text>
          <text x="110" y="150" textAnchor="middle" className="text-xs fill-neutral-300">Hash: 0x1a2b</text>
          <text x="110" y="170" textAnchor="middle" className="text-xs fill-neutral-300">Prev: null</text>
          
          {/* Block 2 */}
          <rect x="250" y="100" width="120" height="80" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
          <text x="310" y="130" textAnchor="middle" className="text-xs fill-white font-semibold">Block 2</text>
          <text x="310" y="150" textAnchor="middle" className="text-xs fill-neutral-300">Hash: 0x3c4d</text>
          <text x="310" y="170" textAnchor="middle" className="text-xs fill-neutral-300">Prev: 0x1a2b</text>
          
          {/* Block 3 */}
          <rect x="450" y="100" width="120" height="80" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
          <text x="510" y="130" textAnchor="middle" className="text-xs fill-white font-semibold">Block 3</text>
          <text x="510" y="150" textAnchor="middle" className="text-xs fill-neutral-300">Hash: 0x5e6f</text>
          <text x="510" y="170" textAnchor="middle" className="text-xs fill-neutral-300">Prev: 0x3c4d</text>
          
          {/* Arrows */}
          <line x1="170" y1="140" x2="240" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#blockArrow)" />
          <line x1="370" y1="140" x2="440" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#blockArrow)" />
        </svg>
        {caption && (
          <p className="text-sm text-neutral-300 mt-4 text-center italic">{caption}</p>
        )}
      </div>
    </motion.div>
  )
}

// Cryptography Hashing Pipeline
export function HashingPipelineDiagram({ title, caption, className = '' }: DiagramProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`my-8 ${className}`}
    >
      <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6">
        {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
        <svg viewBox="0 0 700 200" className="w-full h-auto max-w-4xl">
          <defs>
            <marker id="hashArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
            </marker>
          </defs>
          
          {/* Input */}
          <rect x="50" y="70" width="100" height="60" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
          <text x="100" y="100" textAnchor="middle" className="text-sm fill-white font-medium">Input Data</text>
          
          {/* Hash Function */}
          <rect x="200" y="70" width="120" height="60" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
          <text x="260" y="100" textAnchor="middle" className="text-sm fill-white font-medium">SHA-256</text>
          
          {/* Output */}
          <rect x="380" y="70" width="200" height="60" rx="8" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
          <text x="480" y="100" textAnchor="middle" className="text-xs fill-white font-medium">Hash Output</text>
          <text x="480" y="115" textAnchor="middle" className="text-xs fill-neutral-300">(256 bits)</text>
          
          {/* Arrows */}
          <line x1="150" y1="100" x2="190" y2="100" stroke="#10b981" strokeWidth="2" markerEnd="url(#hashArrow)" />
          <line x1="320" y1="100" x2="370" y2="100" stroke="#10b981" strokeWidth="2" markerEnd="url(#hashArrow)" />
        </svg>
        {caption && (
          <p className="text-sm text-neutral-300 mt-4 text-center italic">{caption}</p>
        )}
      </div>
    </motion.div>
  )
}

// PoAT Activity → Verification → Reward Loop
export function PoATFlowDiagram({ title, caption, className = '' }: DiagramProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`my-8 ${className}`}
    >
      <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6">
        {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
        <svg viewBox="0 0 700 300" className="w-full h-auto max-w-4xl">
          <defs>
            <marker id="poatArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
            </marker>
          </defs>
          
          {/* Activity */}
          <circle cx="150" cy="150" r="50" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
          <text x="150" y="155" textAnchor="middle" className="text-sm fill-white font-medium">Activity</text>
          
          {/* Verification */}
          <circle cx="350" cy="150" r="50" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
          <text x="350" y="155" textAnchor="middle" className="text-sm fill-white font-medium">Verification</text>
          
          {/* Reward */}
          <circle cx="550" cy="150" r="50" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
          <text x="550" y="155" textAnchor="middle" className="text-sm fill-white font-medium">Reward</text>
          
          {/* Arrows */}
          <line x1="200" y1="150" x2="300" y2="150" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#poatArrow)" />
          <line x1="400" y1="150" x2="500" y2="150" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#poatArrow)" />
          
          {/* Feedback loop */}
          <path
            d="M 550 200 Q 600 250, 550 300 Q 500 350, 400 350 Q 300 350, 250 300 Q 200 250, 150 200"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="4,4"
            markerEnd="url(#poatArrow)"
          />
          <text x="350" y="320" textAnchor="middle" className="text-xs fill-amber-400">Incentive Loop</text>
        </svg>
        {caption && (
          <p className="text-sm text-neutral-300 mt-4 text-center italic">{caption}</p>
        )}
      </div>
    </motion.div>
  )
}

// Governance Proposal → Quorum → Execution
export function GovernanceFlowDiagram({ title, caption, className = '' }: DiagramProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`my-8 ${className}`}
    >
      <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6">
        {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
        <svg viewBox="0 0 700 250" className="w-full h-auto max-w-4xl">
          <defs>
            <marker id="govArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#8b5cf6" />
            </marker>
          </defs>
          
          {/* Proposal */}
          <rect x="50" y="100" width="120" height="60" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
          <text x="110" y="130" textAnchor="middle" className="text-sm fill-white font-medium">Proposal</text>
          
          {/* Quorum */}
          <rect x="250" y="100" width="120" height="60" rx="8" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
          <text x="310" y="130" textAnchor="middle" className="text-sm fill-white font-medium">Quorum</text>
          <text x="310" y="145" textAnchor="middle" className="text-xs fill-neutral-300">Voting</text>
          
          {/* Execution */}
          <rect x="450" y="100" width="120" height="60" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
          <text x="510" y="130" textAnchor="middle" className="text-sm fill-white font-medium">Execution</text>
          
          {/* Arrows */}
          <line x1="170" y1="130" x2="240" y2="130" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#govArrow)" />
          <line x1="370" y1="130" x2="440" y2="130" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#govArrow)" />
        </svg>
        {caption && (
          <p className="text-sm text-neutral-300 mt-4 text-center italic">{caption}</p>
        )}
      </div>
    </motion.div>
  )
}

// Economic Cycle Diagram
export function EconomicCycleDiagram({ title, caption, className = '' }: DiagramProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`my-8 ${className}`}
    >
      <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6">
        {title && <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>}
        <svg viewBox="0 0 600 400" className="w-full h-auto max-w-3xl">
          <defs>
            <marker id="econArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
            </marker>
          </defs>
          
          {/* Value Creation */}
          <circle cx="150" cy="150" r="50" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
          <text x="150" y="155" textAnchor="middle" className="text-sm fill-white font-medium">Value</text>
          <text x="150" y="170" textAnchor="middle" className="text-xs fill-neutral-300">Creation</text>
          
          {/* Token Distribution */}
          <circle cx="450" cy="150" r="50" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
          <text x="450" y="155" textAnchor="middle" className="text-sm fill-white font-medium">Token</text>
          <text x="450" y="170" textAnchor="middle" className="text-xs fill-neutral-300">Distribution</text>
          
          {/* Staking */}
          <circle cx="300" cy="300" r="50" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
          <text x="300" y="305" textAnchor="middle" className="text-sm fill-white font-medium">Staking</text>
          
          {/* Arrows */}
          <line x1="200" y1="150" x2="400" y2="150" stroke="#10b981" strokeWidth="2" markerEnd="url(#econArrow)" />
          <line x1="450" y1="200" x2="300" y2="250" stroke="#10b981" strokeWidth="2" markerEnd="url(#econArrow)" />
          <line x1="250" y1="300" x2="150" y2="200" stroke="#10b981" strokeWidth="2" markerEnd="url(#econArrow)" />
        </svg>
        {caption && (
          <p className="text-sm text-neutral-300 mt-4 text-center italic">{caption}</p>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Get the appropriate diagram component for a lesson
 */
export function getLessonDiagram(lessonSlug: string): React.ComponentType<DiagramProps> | null {
  const diagramMap: Record<string, React.ComponentType<DiagramProps>> = {
    'what-is-blockchain': BlockchainFlowDiagram,
    'cryptography-and-hashing': HashingPipelineDiagram,
    'activity-proofs': PoATFlowDiagram,
    'elder-quorum-system': GovernanceFlowDiagram,
    'governance-mechanisms': GovernanceFlowDiagram,
    'economic-models': EconomicCycleDiagram,
  }
  
  return diagramMap[lessonSlug] || null
}

