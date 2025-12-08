'use client'

import { motion } from 'framer-motion'

type DiagramType = 'supply-demand' | 'control-loop' | 'token-flow' | 'activity-pipeline'

interface EconomicsDiagramSVGProps {
  type: DiagramType
  className?: string
  delay?: number
}

export function EconomicsDiagramSVG({ type, className = '', delay = 0 }: EconomicsDiagramSVGProps) {
  const renderDiagram = () => {
    switch (type) {
      case 'supply-demand':
        return <SupplyDemandDiagram />
      case 'control-loop':
        return <ControlLoopDiagram />
      case 'token-flow':
        return <TokenFlowDiagram />
      case 'activity-pipeline':
        return <ActivityPipelineDiagram />
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`w-full ${className}`}
    >
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
        {renderDiagram()}
      </div>
    </motion.div>
  )
}

// Supply and Demand Diagram
function SupplyDemandDiagram() {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto">
      <defs>
        <linearGradient id="supplyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="demandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      
      {/* Axes */}
      <line x1="50" y1="350" x2="550" y2="350" stroke="currentColor" strokeWidth="2" className="text-neutral-700 dark:text-neutral-300" />
      <line x1="50" y1="350" x2="50" y2="50" stroke="currentColor" strokeWidth="2" className="text-neutral-700 dark:text-neutral-300" />
      
      {/* Axis Labels */}
      <text x="300" y="390" textAnchor="middle" className="text-sm fill-neutral-700 dark:fill-neutral-300 font-medium">
        Quantity (Activity Units)
      </text>
      <text x="15" y="200" textAnchor="middle" transform="rotate(-90, 15, 200)" className="text-sm fill-neutral-700 dark:fill-neutral-300 font-medium">
        Price (Token Units)
      </text>
      
      {/* Supply Curve (Activity-driven, upward sloping) */}
      <path
        d="M 100 320 Q 200 280, 300 240 T 500 180"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeDasharray="5,5"
      />
      <text x="520" y="175" className="text-sm fill-blue-600 dark:fill-blue-400 font-semibold">
        Supply (Activity-Based)
      </text>
      
      {/* Demand Curve (downward sloping) */}
      <path
        d="M 100 180 Q 200 220, 300 240 T 500 280"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
      />
      <text x="520" y="285" className="text-sm fill-green-600 dark:fill-green-400 font-semibold">
        Demand
      </text>
      
      {/* Equilibrium Point */}
      <circle cx="300" cy="240" r="6" fill="#f59e0b" />
      <text x="310" y="235" className="text-xs fill-amber-600 dark:fill-amber-400 font-semibold">
        E
      </text>
      <text x="310" y="250" className="text-xs fill-neutral-600 dark:fill-neutral-400">
        Equilibrium
      </text>
      
      {/* Activity Indicator */}
      <g transform="translate(100, 100)">
        <rect x="0" y="0" width="120" height="60" rx="4" fill="url(#supplyGrad)" stroke="#3b82f6" strokeWidth="2" />
        <text x="60" y="25" textAnchor="middle" className="text-xs fill-blue-700 dark:fill-blue-300 font-semibold">
          Activity → Issuance
        </text>
        <text x="60" y="45" textAnchor="middle" className="text-xs fill-blue-600 dark:fill-blue-400">
          Supply Driver
        </text>
      </g>
    </svg>
  )
}

// Control Loop Diagram
function ControlLoopDiagram() {
  return (
    <svg viewBox="0 0 700 500" className="w-full h-auto">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="currentColor" className="text-blue-600 dark:text-blue-400" />
        </marker>
      </defs>
      
      {/* Central Control Loop */}
      <g transform="translate(350, 250)">
        {/* Activity Box */}
        <rect x="-80" y="-100" width="160" height="60" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
        <text x="0" y="-70" textAnchor="middle" className="text-sm fill-blue-700 dark:fill-blue-300 font-semibold">
          Activity
        </text>
        
        {/* Arrow: Activity → Issuance */}
        <line x1="0" y1="-40" x2="0" y2="-20" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="20" y="-25" className="text-xs fill-blue-600 dark:fill-blue-400">
          →
        </text>
        
        {/* Issuance Box */}
        <rect x="-80" y="-20" width="160" height="60" rx="8" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
        <text x="0" y="10" textAnchor="middle" className="text-sm fill-purple-700 dark:fill-purple-300 font-semibold">
          Issuance
        </text>
        
        {/* Arrow: Issuance → Velocity */}
        <line x1="80" y1="10" x2="120" y2="10" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="100" y="5" className="text-xs fill-purple-600 dark:fill-purple-400">
          →
        </text>
        
        {/* Velocity Box */}
        <rect x="120" y="-20" width="160" height="60" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
        <text x="200" y="10" textAnchor="middle" className="text-sm fill-green-700 dark:fill-green-300 font-semibold">
          Velocity
        </text>
        
        {/* Arrow: Velocity → Friction */}
        <line x1="200" y1="40" x2="200" y2="80" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="210" y="65" className="text-xs fill-green-600 dark:fill-green-400">
          ↓
        </text>
        
        {/* Friction Box */}
        <rect x="120" y="80" width="160" height="60" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
        <text x="200" y="110" textAnchor="middle" className="text-sm fill-amber-700 dark:fill-amber-300 font-semibold">
          Friction (Quizzes)
        </text>
        
        {/* Arrow: Friction → Stabilized Price (back to start) */}
        <line x1="120" y1="110" x2="80" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <line x1="80" y1="110" x2="80" y2="40" stroke="#f59e0b" strokeWidth="2" />
        <line x1="80" y1="40" x2="0" y2="40" stroke="#f59e0b" strokeWidth="2" />
        <line x1="0" y1="40" x2="0" y2="-40" stroke="#f59e0b" strokeWidth="2" />
        <text x="-20" y="10" className="text-xs fill-amber-600 dark:fill-amber-400">
          ←
        </text>
        
        {/* Stabilized Price Box */}
        <rect x="-80" y="80" width="160" height="60" rx="8" fill="#06b6d4" fillOpacity="0.2" stroke="#06b6d4" strokeWidth="2" />
        <text x="0" y="110" textAnchor="middle" className="text-sm fill-cyan-700 dark:fill-cyan-300 font-semibold">
          Stabilized Price
        </text>
      </g>
      
      {/* Title */}
      <text x="350" y="30" textAnchor="middle" className="text-base fill-neutral-900 dark:fill-white font-bold">
        DRP Stabilization Control Loop
      </text>
    </svg>
  )
}

// Token Flow Diagram
function TokenFlowDiagram() {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto">
      <defs>
        <marker id="tokenArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="currentColor" className="text-blue-600 dark:text-blue-400" />
        </marker>
      </defs>
      
      {/* $DeRi Token Flow */}
      <g transform="translate(150, 100)">
        <circle cx="0" cy="0" r="50" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="3" />
        <text x="0" y="-5" textAnchor="middle" className="text-sm fill-blue-700 dark:fill-blue-300 font-bold">
          $DeRi
        </text>
        <text x="0" y="15" textAnchor="middle" className="text-xs fill-blue-600 dark:fill-blue-400">
          Utility Token
        </text>
      </g>
      
      {/* Arrow: $DeRi → Rewards */}
      <line x1="200" y1="100" x2="300" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#tokenArrow)" />
      <text x="250" y="90" textAnchor="middle" className="text-xs fill-blue-600 dark:fill-blue-400">
        Rewards
      </text>
      
      {/* Rewards Box */}
      <rect x="300" y="70" width="100" height="60" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
      <text x="350" y="95" textAnchor="middle" className="text-sm fill-green-700 dark:fill-green-300 font-semibold">
        Activity
      </text>
      <text x="350" y="115" textAnchor="middle" className="text-xs fill-green-600 dark:fill-green-400">
        Rewards
      </text>
      
      {/* $RIGHTS Token Flow */}
      <g transform="translate(450, 100)">
        <circle cx="0" cy="0" r="50" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="3" />
        <text x="0" y="-5" textAnchor="middle" className="text-sm fill-purple-700 dark:fill-purple-300 font-bold">
          $RIGHTS
        </text>
        <text x="0" y="15" textAnchor="middle" className="text-xs fill-purple-600 dark:fill-purple-400">
          Governance
        </text>
      </g>
      
      {/* Arrow: $RIGHTS → Governance */}
      <line x1="400" y1="100" x2="300" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#tokenArrow)" />
      <text x="350" y="60" textAnchor="middle" className="text-xs fill-purple-600 dark:fill-purple-400">
        Governance
      </text>
      
      {/* Activity Credits */}
      <g transform="translate(300, 250)">
        <rect x="-80" y="-30" width="160" height="60" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
        <text x="0" y="0" textAnchor="middle" className="text-sm fill-amber-700 dark:fill-amber-300 font-semibold">
          Activity Credits
        </text>
        <text x="0" y="15" textAnchor="middle" className="text-xs fill-amber-600 dark:fill-amber-400">
          (Non-transferable)
        </text>
      </g>
      
      {/* Arrows from tokens to Activity Credits */}
      <line x1="200" y1="150" x2="250" y2="220" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#tokenArrow)" />
      <line x1="400" y1="150" x2="350" y2="220" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#tokenArrow)" />
      
      {/* Title */}
      <text x="300" y="30" textAnchor="middle" className="text-base fill-neutral-900 dark:fill-white font-bold">
        DRP Token Flow Model
      </text>
    </svg>
  )
}

// Activity Pipeline Diagram
function ActivityPipelineDiagram() {
  return (
    <svg viewBox="0 0 700 300" className="w-full h-auto">
      <defs>
        <marker id="pipelineArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="currentColor" className="text-blue-600 dark:text-blue-400" />
        </marker>
      </defs>
      
      {/* Activity Stage */}
      <g transform="translate(100, 150)">
        <rect x="-60" y="-40" width="120" height="80" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
        <text x="0" y="-10" textAnchor="middle" className="text-sm fill-blue-700 dark:fill-blue-300 font-semibold">
          Activity
        </text>
        <text x="0" y="10" textAnchor="middle" className="text-xs fill-blue-600 dark:fill-blue-400">
          User Action
        </text>
      </g>
      
      {/* Arrow */}
      <line x1="160" y1="150" x2="200" y2="150" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#pipelineArrow)" />
      
      {/* Verification Stage */}
      <g transform="translate(300, 150)">
        <rect x="-60" y="-40" width="120" height="80" rx="8" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
        <text x="0" y="-10" textAnchor="middle" className="text-sm fill-green-700 dark:fill-green-300 font-semibold">
          Verification
        </text>
        <text x="0" y="10" textAnchor="middle" className="text-xs fill-green-600 dark:fill-green-400">
          AI + Elders
        </text>
      </g>
      
      {/* Arrow */}
      <line x1="360" y1="150" x2="400" y2="150" stroke="#10b981" strokeWidth="2" markerEnd="url(#pipelineArrow)" />
      
      {/* Reward Stage */}
      <g transform="translate(500, 150)">
        <rect x="-60" y="-40" width="120" height="80" rx="8" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
        <text x="0" y="-10" textAnchor="middle" className="text-sm fill-amber-700 dark:fill-amber-300 font-semibold">
          Reward
        </text>
        <text x="0" y="10" textAnchor="middle" className="text-xs fill-amber-600 dark:fill-amber-400">
          Token Issuance
        </text>
      </g>
      
      {/* Title */}
      <text x="350" y="30" textAnchor="middle" className="text-base fill-neutral-900 dark:fill-white font-bold">
        Activity → Verification → Reward Pipeline
      </text>
      
      {/* Feedback Loop (dashed) */}
      <path
        d="M 500 190 Q 550 220, 500 250 Q 350 280, 100 250 Q 50 220, 100 190"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2"
        strokeDasharray="5,5"
        markerEnd="url(#pipelineArrow)"
      />
      <text x="300" y="280" textAnchor="middle" className="text-xs fill-purple-600 dark:fill-purple-400">
        Status Accrual
      </text>
    </svg>
  )
}
