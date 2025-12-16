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

// Supply and Demand Diagram - Redesigned for clarity
function SupplyDemandDiagram() {
  return (
    <svg viewBox="0 0 700 500" className="w-full h-auto">
      <defs>
        <marker id="axisArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="currentColor" className="text-neutral-700 dark:text-neutral-300" />
        </marker>
      </defs>
      
      {/* Title */}
      <text x="350" y="30" textAnchor="middle" className="text-lg fill-neutral-900 dark:fill-white font-bold">
        DRP Supply-Demand Dynamics
      </text>
      
      {/* Axes with arrows */}
      <line x1="80" y1="400" x2="620" y2="400" stroke="currentColor" strokeWidth="2.5" className="text-neutral-700 dark:text-neutral-300" markerEnd="url(#axisArrow)" />
      <line x1="80" y1="400" x2="80" y2="80" stroke="currentColor" strokeWidth="2.5" className="text-neutral-700 dark:text-neutral-300" markerEnd="url(#axisArrow)" />
      
      {/* Axis Labels */}
      <text x="350" y="440" textAnchor="middle" className="text-sm fill-neutral-700 dark:fill-neutral-300 font-semibold">
        Quantity (Q) - Activity Units
      </text>
      <text x="20" y="240" textAnchor="middle" transform="rotate(-90, 20, 240)" className="text-sm fill-neutral-700 dark:fill-neutral-300 font-semibold">
        Price (P) - $DeRi per Unit
      </text>
      
      {/* Grid lines for reference */}
      <g stroke="#e5e7eb" strokeWidth="0.5" strokeDasharray="2,2" className="dark:stroke-neutral-700">
        <line x1="80" y1="350" x2="620" y2="350" />
        <line x1="80" y1="300" x2="620" y2="300" />
        <line x1="80" y1="250" x2="620" y2="250" />
        <line x1="80" y1="200" x2="620" y2="200" />
        <line x1="80" y1="150" x2="620" y2="150" />
        <line x1="150" y1="80" x2="150" y2="400" />
        <line x1="300" y1="80" x2="300" y2="400" />
        <line x1="450" y1="80" x2="450" y2="400" />
        <line x1="550" y1="80" x2="550" y2="400" />
      </g>
      
      {/* Supply Curve (Activity-driven, upward sloping) - More accurate curve */}
      <path
        d="M 150 350 Q 250 300, 350 250 Q 450 200, 550 150"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <text x="570" y="140" className="text-sm fill-blue-600 dark:fill-blue-400 font-semibold">
        S (Activity-Based)
      </text>
      
      {/* Supply curve label with equation */}
      <g transform="translate(200, 180)">
        <rect x="-5" y="-12" width="140" height="24" rx="4" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1" />
        <text x="65" y="5" textAnchor="middle" className="text-xs fill-blue-700 dark:fill-blue-300 font-medium">
          S = f(Activity, Verification)
        </text>
      </g>
      
      {/* Demand Curve (downward sloping) - More accurate curve */}
      <path
        d="M 150 150 Q 250 200, 350 250 Q 450 300, 550 350"
        fill="none"
        stroke="#10b981"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <text x="570" y="360" className="text-sm fill-green-600 dark:fill-green-400 font-semibold">
        D (Utility-Driven)
      </text>
      
      {/* Demand curve label */}
      <g transform="translate(200, 120)">
        <rect x="-5" y="-12" width="140" height="24" rx="4" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1" />
        <text x="65" y="5" textAnchor="middle" className="text-xs fill-green-700 dark:fill-green-300 font-medium">
          D = f(Utility, Network)
        </text>
      </g>
      
      {/* Equilibrium Point with coordinates */}
      <circle cx="350" cy="250" r="8" fill="#f59e0b" stroke="white" strokeWidth="2" />
      <circle cx="350" cy="250" r="6" fill="#f59e0b" />
      <text x="360" y="245" className="text-sm fill-amber-700 dark:fill-amber-300 font-bold">
        E*
      </text>
      <text x="360" y="260" className="text-xs fill-neutral-600 dark:fill-neutral-400">
        (Q*, P*)
      </text>
      
      {/* Equilibrium lines */}
      <line x1="80" y1="250" x2="350" y2="250" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
      <line x1="350" y1="250" x2="350" y2="400" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
      
      {/* Key Insight Box */}
      <g transform="translate(80, 50)">
        <rect x="0" y="0" width="540" height="40" rx="6" fill="#fef3c7" fillOpacity="0.8" stroke="#f59e0b" strokeWidth="2" className="dark:fill-amber-950/30 dark:stroke-amber-700" />
        <text x="270" y="15" textAnchor="middle" className="text-xs fill-amber-900 dark:fill-amber-200 font-semibold">
          Key Insight: Supply shifts with verified activity, not fixed like traditional markets
        </text>
        <text x="270" y="30" textAnchor="middle" className="text-xs fill-amber-800 dark:fill-amber-300">
          More activity → Supply curve shifts right → Lower equilibrium price (if demand constant)
        </text>
      </g>
    </svg>
  )
}

// Control Loop Diagram - Redesigned for clarity
function ControlLoopDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="currentColor" className="text-blue-600 dark:text-blue-400" />
        </marker>
        <marker id="feedbackArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
        </marker>
      </defs>
      
      {/* Title */}
      <text x="400" y="30" textAnchor="middle" className="text-lg fill-neutral-900 dark:fill-white font-bold">
        DRP Stabilization Control Loop
      </text>
      
      {/* Main Flow (Top to Bottom) */}
      <g transform="translate(400, 100)">
        {/* 1. Activity Input */}
        <rect x="-100" y="-30" width="200" height="50" rx="6" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2.5" />
        <text x="0" y="0" textAnchor="middle" className="text-base fill-blue-700 dark:fill-blue-300 font-semibold">
          Verified Activity
        </text>
        <text x="0" y="15" textAnchor="middle" className="text-xs fill-blue-600 dark:fill-blue-400">
          A_i, w_i, v_i
        </text>
        
        {/* Arrow down */}
        <line x1="0" y1="20" x2="0" y2="50" stroke="#3b82f6" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
        <text x="15" y="38" className="text-xs fill-blue-600 dark:fill-blue-400 font-medium">
          Generates
        </text>
        
        {/* 2. Money Supply Issuance */}
        <rect x="-100" y="50" width="200" height="50" rx="6" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="2.5" />
        <text x="0" y="75" textAnchor="middle" className="text-base fill-purple-700 dark:fill-purple-300 font-semibold">
          Money Supply (M)
        </text>
        <text x="0" y="90" textAnchor="middle" className="text-xs fill-purple-600 dark:fill-purple-400">
          M(t) = M(t-1) + Σ(...)
        </text>
        
        {/* Arrow right */}
        <line x1="100" y1="75" x2="150" y2="75" stroke="#8b5cf6" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
        <text x="125" y="70" className="text-xs fill-purple-600 dark:fill-purple-400 font-medium">
          Increases
        </text>
        
        {/* 3. Velocity */}
        <rect x="150" y="50" width="200" height="50" rx="6" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2.5" />
        <text x="250" y="75" textAnchor="middle" className="text-base fill-green-700 dark:fill-green-300 font-semibold">
          Velocity (V)
        </text>
        <text x="250" y="90" textAnchor="middle" className="text-xs fill-green-600 dark:fill-green-400">
          Transactions per token
        </text>
        
        {/* Arrow down from velocity */}
        <line x1="250" y1="100" x2="250" y2="150" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#arrowhead)" />
        <text x="265" y="130" className="text-xs fill-green-600 dark:fill-green-400 font-medium">
          Measured
        </text>
        
        {/* 4. Price Level */}
        <rect x="150" y="150" width="200" height="50" rx="6" fill="#06b6d4" fillOpacity="0.15" stroke="#06b6d4" strokeWidth="2.5" />
        <text x="250" y="175" textAnchor="middle" className="text-base fill-cyan-700 dark:fill-cyan-300 font-semibold">
          Price Level (P)
        </text>
        <text x="250" y="190" textAnchor="middle" className="text-xs fill-cyan-600 dark:fill-cyan-400">
          M × V = P × Y
        </text>
        
        {/* Feedback Loop: Price → Friction */}
        <path
          d="M 150 175 Q 50 200, 0 250 Q -50 300, 0 350"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeDasharray="4,4"
          markerEnd="url(#feedbackArrow)"
        />
        <text x="-30" y="300" className="text-xs fill-amber-600 dark:fill-amber-400 font-medium">
          If P ↑
        </text>
        
        {/* 5. Friction Control */}
        <rect x="-100" y="350" width="200" height="50" rx="6" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2.5" />
        <text x="0" y="375" textAnchor="middle" className="text-base fill-amber-700 dark:fill-amber-300 font-semibold">
          Quiz Friction
        </text>
        <text x="0" y="390" textAnchor="middle" className="text-xs fill-amber-600 dark:fill-amber-400">
          Difficulty adjustment
        </text>
        
        {/* Feedback Arrow: Friction → Velocity */}
        <path
          d="M 0 350 Q 50 300, 100 250 Q 150 200, 200 100"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeDasharray="4,4"
          markerEnd="url(#feedbackArrow)"
        />
        <text x="50" y="200" className="text-xs fill-amber-600 dark:fill-amber-400 font-medium">
          Reduces V
        </text>
      </g>
      
      {/* Legend */}
      <g transform="translate(50, 500)">
        <text x="0" y="0" className="text-sm fill-neutral-700 dark:fill-neutral-300 font-semibold">
          Legend:
        </text>
        <line x1="0" y1="15" x2="30" y2="15" stroke="#3b82f6" strokeWidth="2.5" />
        <text x="35" y="18" className="text-xs fill-neutral-600 dark:fill-neutral-400">
          Forward flow
        </text>
        <line x1="120" y1="15" x2="150" y2="15" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4,4" />
        <text x="155" y="18" className="text-xs fill-neutral-600 dark:fill-neutral-400">
          Feedback control
        </text>
      </g>
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
