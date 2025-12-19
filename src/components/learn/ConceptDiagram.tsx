'use client'

import React from 'react'
import { motion } from 'framer-motion'

export type DiagramType = 
  | 'flow' 
  | 'layers' 
  | 'loop' 
  | 'pipeline' 
  | 'architecture'
  | 'consensus'
  | 'governance'
  | 'economic'

interface ConceptDiagramProps {
  type: DiagramType
  title?: string
  caption?: string
  className?: string
  data?: Record<string, unknown>
}

/**
 * ConceptDiagram - Reusable component for educational diagrams
 * Supports various diagram types: flow, layers, loops, pipelines, etc.
 * All diagrams are SVG/CSS-based for performance and scalability
 */
export function ConceptDiagram({ 
  type, 
  title, 
  caption, 
  className = '',
  data 
}: ConceptDiagramProps) {
  const renderDiagram = () => {
    switch (type) {
      case 'flow':
        return <FlowDiagram data={data} />
      case 'layers':
        return <LayersDiagram data={data} />
      case 'loop':
        return <LoopDiagram data={data} />
      case 'pipeline':
        return <PipelineDiagram data={data} />
      case 'architecture':
        return <ArchitectureDiagram data={data} />
      case 'consensus':
        return <ConsensusDiagram data={data} />
      case 'governance':
        return <GovernanceDiagram data={data} />
      case 'economic':
        return <EconomicDiagram data={data} />
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`my-8 ${className}`}
    >
      <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6">
        {title && (
          <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        )}
        <div className="flex justify-center items-center">
          {renderDiagram()}
        </div>
        {caption && (
          <p className="text-sm text-neutral-300 mt-4 text-center italic">
            {caption}
          </p>
        )}
      </div>
    </motion.div>
  )
}

// Flow Diagram - Shows sequential processes
function FlowDiagram({ data }: { data?: Record<string, unknown> }) {
  const steps = (data?.steps as string[]) || ['Step 1', 'Step 2', 'Step 3', 'Step 4']
  
  return (
    <svg viewBox="0 0 800 200" className="w-full h-auto max-w-4xl">
      <defs>
        <marker id="flowArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
        </marker>
      </defs>
      
      {steps.map((step, index) => {
        const x = 100 + (index * 150)
        const isLast = index === steps.length - 1
        
        return (
          <g key={index}>
            <rect
              x={x - 60}
              y={80}
              width="120"
              height="60"
              rx="8"
              fill="#3b82f6"
              fillOpacity="0.2"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text
              x={x}
              y={110}
              textAnchor="middle"
              className="text-sm fill-white font-medium"
            >
              {step}
            </text>
            
            {!isLast && (
              <line
                x1={x + 60}
                y1={110}
                x2={x + 90}
                y2={110}
                stroke="#3b82f6"
                strokeWidth="2"
                markerEnd="url(#flowArrow)"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

// Layers Diagram - Shows hierarchical structure
function LayersDiagram({ data }: { data?: Record<string, unknown> }) {
  const layers = (data?.layers as string[]) || ['Layer 1', 'Layer 2', 'Layer 3', 'Layer 4']
  
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto max-w-3xl">
      {layers.map((layer, index) => {
        const y = 50 + (index * 80)
        const width = 500 - (index * 40)
        const x = (600 - width) / 2
        
        return (
          <g key={index}>
            <rect
              x={x}
              y={y}
              width={width}
              height="60"
              rx="6"
              fill={index === 0 ? '#3b82f6' : index === layers.length - 1 ? '#10b981' : '#8b5cf6'}
              fillOpacity="0.2"
              stroke={index === 0 ? '#3b82f6' : index === layers.length - 1 ? '#10b981' : '#8b5cf6'}
              strokeWidth="2"
            />
            <text
              x={x + width / 2}
              y={y + 35}
              textAnchor="middle"
              className="text-sm fill-white font-medium"
            >
              {layer}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// Loop Diagram - Shows feedback loops
function LoopDiagram({ data }: { data?: Record<string, unknown> }) {
  return (
    <svg viewBox="0 0 500 500" className="w-full h-auto max-w-md">
      <defs>
        <marker id="loopArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#f59e0b" />
        </marker>
      </defs>
      
      {/* Central node */}
      <circle cx="250" cy="250" r="60" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
      <text x="250" y="255" textAnchor="middle" className="text-sm fill-white font-medium">
        Core Process
      </text>
      
      {/* Feedback loop */}
      <path
        d="M 310 250 Q 400 200, 400 100 Q 400 50, 350 50 Q 300 50, 250 100 Q 200 50, 150 50 Q 100 50, 100 100 Q 100 200, 190 250"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeDasharray="4,4"
        markerEnd="url(#loopArrow)"
      />
      <text x="250" y="80" textAnchor="middle" className="text-xs fill-amber-400">
        Feedback Loop
      </text>
    </svg>
  )
}

// Pipeline Diagram - Shows processing pipeline
function PipelineDiagram({ data }: { data?: Record<string, unknown> }) {
  const stages = (data?.stages as string[]) || ['Input', 'Process', 'Verify', 'Output']
  
  return (
    <svg viewBox="0 0 700 200" className="w-full h-auto max-w-4xl">
      <defs>
        <marker id="pipelineArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
        </marker>
      </defs>
      
      {stages.map((stage, index) => {
        const x = 50 + (index * 150)
        const isLast = index === stages.length - 1
        
        return (
          <g key={index}>
            <rect
              x={x}
              y={70}
              width="100"
              height="60"
              rx="8"
              fill="#10b981"
              fillOpacity="0.2"
              stroke="#10b981"
              strokeWidth="2"
            />
            <text
              x={x + 50}
              y={100}
              textAnchor="middle"
              className="text-sm fill-white font-medium"
            >
              {stage}
            </text>
            
            {!isLast && (
              <line
                x1={x + 100}
                y1={100}
                x2={x + 150}
                y2={100}
                stroke="#10b981"
                strokeWidth="2"
                markerEnd="url(#pipelineArrow)"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

// Architecture Diagram - Shows system architecture
function ArchitectureDiagram({ data }: { data?: Record<string, unknown> }) {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto max-w-3xl">
      {/* Application Layer */}
      <rect x="50" y="50" width="500" height="60" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
      <text x="300" y="85" textAnchor="middle" className="text-sm fill-white font-semibold">Application Layer</text>
      
      {/* Protocol Layer */}
      <rect x="70" y="130" width="460" height="60" rx="6" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
      <text x="300" y="165" textAnchor="middle" className="text-sm fill-white font-semibold">Protocol Layer</text>
      
      {/* Consensus Layer */}
      <rect x="90" y="210" width="420" height="60" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
      <text x="300" y="245" textAnchor="middle" className="text-sm fill-white font-semibold">Consensus Layer</text>
      
      {/* Network Layer */}
      <rect x="110" y="290" width="380" height="60" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
      <text x="300" y="325" textAnchor="middle" className="text-sm fill-white font-semibold">Network Layer</text>
    </svg>
  )
}

// Consensus Diagram - Shows consensus mechanism
function ConsensusDiagram({ data }: { data?: Record<string, unknown> }) {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto max-w-3xl">
      <defs>
        <marker id="consensusArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
        </marker>
      </defs>
      
      {/* Validators */}
      {[150, 300, 450].map((x, index) => (
        <g key={index}>
          <circle cx={x} cy="150" r="40" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
          <text x={x} y="155" textAnchor="middle" className="text-xs fill-white font-medium">
            Validator {index + 1}
          </text>
        </g>
      ))}
      
      {/* Consensus point */}
      <circle cx="300" cy="280" r="50" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
      <text x="300" y="285" textAnchor="middle" className="text-sm fill-white font-semibold">Consensus</text>
      
      {/* Arrows */}
      <line x1="150" y1="190" x2="280" y2="250" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#consensusArrow)" />
      <line x1="300" y1="190" x2="300" y2="230" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#consensusArrow)" />
      <line x1="450" y1="190" x2="320" y2="250" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#consensusArrow)" />
    </svg>
  )
}

// Governance Diagram - Shows governance structure
function GovernanceDiagram({ data }: { data?: Record<string, unknown> }) {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto max-w-3xl">
      {/* Elder Quorum */}
      <rect x="200" y="50" width="200" height="80" rx="8" fill="#8b5cf6" fillOpacity="0.2" stroke="#8b5cf6" strokeWidth="2" />
      <text x="300" y="80" textAnchor="middle" className="text-sm fill-white font-semibold">Elder Quorum</text>
      <text x="300" y="100" textAnchor="middle" className="text-xs fill-neutral-300">Governance Council</text>
      
      {/* Proposals */}
      <rect x="50" y="180" width="150" height="60" rx="6" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
      <text x="125" y="210" textAnchor="middle" className="text-xs fill-white font-medium">Proposals</text>
      
      {/* Voting */}
      <rect x="225" y="180" width="150" height="60" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
      <text x="300" y="210" textAnchor="middle" className="text-xs fill-white font-medium">Voting</text>
      
      {/* Execution */}
      <rect x="400" y="180" width="150" height="60" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
      <text x="475" y="210" textAnchor="middle" className="text-xs fill-white font-medium">Execution</text>
      
      {/* Arrows */}
      <line x1="200" y1="130" x2="125" y2="180" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#governanceArrow)" />
      <line x1="300" y1="130" x2="300" y2="180" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#governanceArrow)" />
      <line x1="400" y1="130" x2="475" y2="180" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#governanceArrow)" />
      
      <defs>
        <marker id="governanceArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#8b5cf6" />
        </marker>
      </defs>
    </svg>
  )
}

// Economic Diagram - Shows economic flows
function EconomicDiagram({ data }: { data?: Record<string, unknown> }) {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto max-w-3xl">
      <defs>
        <marker id="economicArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#10b981" />
        </marker>
      </defs>
      
      {/* Activity */}
      <circle cx="150" cy="150" r="50" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
      <text x="150" y="155" textAnchor="middle" className="text-sm fill-white font-medium">Activity</text>
      
      {/* Rewards */}
      <circle cx="450" cy="150" r="50" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
      <text x="450" y="155" textAnchor="middle" className="text-sm fill-white font-medium">Rewards</text>
      
      {/* Flow */}
      <line x1="200" y1="150" x2="400" y2="150" stroke="#10b981" strokeWidth="3" markerEnd="url(#economicArrow)" />
      <text x="300" y="140" textAnchor="middle" className="text-xs fill-green-400 font-medium">Generates</text>
      
      {/* Feedback */}
      <path
        d="M 450 200 Q 500 250, 450 300 Q 400 350, 300 350 Q 200 350, 150 300 Q 100 250, 150 200"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeDasharray="4,4"
        markerEnd="url(#economicArrow)"
      />
      <text x="300" y="320" textAnchor="middle" className="text-xs fill-amber-400">Economic Loop</text>
    </svg>
  )
}

