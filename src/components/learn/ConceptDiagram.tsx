'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

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
 * Redesigned for DRP Cinematic v2 aesthetic.
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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("my-12 group", className)}
    >
      <div className="relative rounded-[2.5rem] border border-white/10 bg-black/40 p-10 backdrop-blur-3xl overflow-hidden shadow-2xl">
        {/* Cinematic background accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-drp-cyan/5 rounded-full blur-[100px] pointer-events-none" />
        
        {title && (
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-6 rounded-full bg-drp-cyan shadow-[0_0_12px_rgba(0,242,255,0.5)]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-[0.2em]">{title}</h3>
          </div>
        )}
        
        <div className="flex justify-center items-center py-4">
          {renderDiagram()}
        </div>
        
        {caption && (
          <p className="text-[11px] text-drp-gray mt-8 text-center font-cinematic uppercase tracking-widest opacity-60">
            {caption}
          </p>
        )}
      </div>
    </motion.div>
  )
}

const COLORS = {
  primary: '#00f2ff',
  secondary: '#3b82f6',
  accent: '#a855f7',
  success: '#00ff88',
  warning: '#ffd700',
  error: '#ff4040',
  gray: '#94a3b8',
  void: '#030308'
}

// Flow Diagram
function FlowDiagram({ data }: { data?: Record<string, unknown> }) {
  const steps = (data?.steps as string[]) || ['Observation', 'Verification', 'Consensus', 'Commitment']
  
  return (
    <svg viewBox="0 0 800 240" className="w-full h-auto max-w-4xl">
      <defs>
        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.2" />
          <stop offset="100%" stopColor={COLORS.secondary} stopOpacity="0.2" />
        </linearGradient>
        <marker id="flowArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={COLORS.primary} />
        </marker>
      </defs>
      
      {steps.map((step, index) => {
        const x = 120 + (index * 180)
        const isLast = index === steps.length - 1
        
        return (
          <g key={index} className="group/node">
            <rect
              x={x - 70}
              y={80}
              width="140"
              height="80"
              rx="20"
              fill="url(#flowGrad)"
              stroke={COLORS.primary}
              strokeWidth="1.5"
              strokeOpacity="0.3"
            />
            <text
              x={x}
              y={120}
              textAnchor="middle"
              className="text-[12px] fill-white font-bold"
            >
              {step}
            </text>
            <text
              x={x}
              y={140}
              textAnchor="middle"
              className="text-[8px] fill-drp-gray font-cinematic uppercase tracking-widest opacity-60"
            >
              Phase {index + 1}
            </text>
            
            {!isLast && (
              <line
                x1={x + 70}
                y1={120}
                x2={x + 110}
                y2={120}
                stroke={COLORS.primary}
                strokeWidth="1.5"
                strokeOpacity="0.4"
                markerEnd="url(#flowArrow)"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

// Layers Diagram
function LayersDiagram({ data }: { data?: Record<string, unknown> }) {
  const layers = (data?.layers as string[]) || ['Governance Quorum', 'Application Logic', 'DRP Consensus', 'Network Ledger']
  
  return (
    <svg viewBox="0 0 600 420" className="w-full h-auto max-w-2xl">
      {layers.map((layer, index) => {
        const y = 40 + (index * 90)
        const width = 520 - (index * 40)
        const x = (600 - width) / 2
        
        return (
          <g key={index}>
            <rect
              x={x}
              y={y}
              width={width}
              height="70"
              rx="16"
              fill="rgba(255,255,255,0.03)"
              stroke={index === 0 ? COLORS.primary : COLORS.gray}
              strokeWidth="1.5"
              strokeOpacity={index === 0 ? 0.8 : 0.2}
            />
            <text
              x={x + 30}
              y={y + 35}
              className="text-[10px] fill-drp-gray font-bold uppercase tracking-widest opacity-40"
            >
              L{layers.length - index}
            </text>
            <text
              x={x + width / 2}
              y={y + 42}
              textAnchor="middle"
              className="text-[14px] fill-white font-bold"
            >
              {layer}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// Loop Diagram
function LoopDiagram({ data }: { data?: Record<string, unknown> }) {
  return (
    <svg viewBox="0 0 500 500" className="w-full h-auto max-w-sm">
      <defs>
        <linearGradient id="loopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.3" />
          <stop offset="100%" stopColor={COLORS.accent} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      {/* Background ring */}
      <circle cx="250" cy="250" r="180" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="40" />
      
      {/* Central node */}
      <circle cx="250" cy="250" r="80" fill={COLORS.void} stroke={COLORS.primary} strokeWidth="2" strokeOpacity="0.5" />
      <text x="250" y="245" textAnchor="middle" className="text-[14px] fill-white font-bold">Protocol</text>
      <text x="250" y="265" textAnchor="middle" className="text-[10px] fill-drp-cyan font-cinematic uppercase tracking-widest">Core</text>
      
      {/* Animated Orbitals */}
      <motion.path
        d="M 250,70 A 180,180 0 1,1 249.9,70"
        fill="none"
        stroke={COLORS.primary}
        strokeWidth="2"
        strokeDasharray="10,200"
        strokeLinecap="round"
        animate={{ strokeDashoffset: [0, -1000] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <g>
         <rect x="210" y="30" width="80" height="30" rx="15" fill={COLORS.void} stroke={COLORS.primary} strokeWidth="1" />
         <text x="250" y="50" textAnchor="middle" className="text-[9px] fill-white font-bold uppercase">Activity</text>
      </g>
      <g>
         <rect x="410" y="235" width="80" height="30" rx="15" fill={COLORS.void} stroke={COLORS.warning} strokeWidth="1" />
         <text x="450" y="255" textAnchor="middle" className="text-[9px] fill-white font-bold uppercase">Proof</text>
      </g>
      <g>
         <rect x="210" y="440" width="80" height="30" rx="15" fill={COLORS.void} stroke={COLORS.success} strokeWidth="1" />
         <text x="250" y="460" textAnchor="middle" className="text-[9px] fill-white font-bold uppercase">Reward</text>
      </g>
      <g>
         <rect x="10" y="235" width="80" height="30" rx="15" fill={COLORS.void} stroke={COLORS.accent} strokeWidth="1" />
         <text x="50" y="255" textAnchor="middle" className="text-[9px] fill-white font-bold uppercase">Status</text>
      </g>
    </svg>
  )
}

// Architecture Diagram
function ArchitectureDiagram({ data }: { data?: Record<string, unknown> }) {
  return (
    <svg viewBox="0 0 600 420" className="w-full h-auto max-w-3xl">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Application Layer */}
      <rect x="50" y="40" width="500" height="70" rx="20" fill="rgba(0,242,255,0.05)" stroke={COLORS.primary} strokeWidth="1.5" strokeOpacity="0.4" />
      <text x="300" y="82" textAnchor="middle" className="text-[16px] fill-white font-black uppercase tracking-[0.2em]">Application Layer</text>
      
      {/* Protocol Layer */}
      <rect x="70" y="130" width="460" height="70" rx="20" fill="rgba(59,130,246,0.05)" stroke={COLORS.secondary} strokeWidth="1.5" strokeOpacity="0.4" />
      <text x="300" y="172" textAnchor="middle" className="text-[16px] fill-white font-black uppercase tracking-[0.2em]">Protocol Layer</text>
      
      {/* Consensus Layer */}
      <rect x="90" y="220" width="420" height="70" rx="20" fill="rgba(168,85,247,0.05)" stroke={COLORS.accent} strokeWidth="1.5" strokeOpacity="0.4" />
      <text x="300" y="262" textAnchor="middle" className="text-[16px] fill-white font-black uppercase tracking-[0.2em]">Consensus Layer</text>
      
      {/* Network Layer */}
      <rect x="110" y="310" width="380" height="70" rx="20" fill="rgba(148,163,184,0.05)" stroke={COLORS.gray} strokeWidth="1.5" strokeOpacity="0.4" />
      <text x="300" y="352" textAnchor="middle" className="text-[16px] fill-white font-black uppercase tracking-[0.2em]">Network Layer</text>
      
      {/* Connecting vertical line */}
      <line x1="300" y1="110" x2="300" y2="130" stroke="white" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="4,4" />
      <line x1="300" y1="200" x2="300" y2="220" stroke="white" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="4,4" />
      <line x1="300" y1="290" x2="300" y2="310" stroke="white" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="4,4" />
    </svg>
  )
}

// Economic Diagram
function EconomicDiagram({ data }: { data?: Record<string, unknown> }) {
  return (
    <svg viewBox="0 0 640 400" className="w-full h-auto max-w-3xl">
       <defs>
        <marker id="econArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={COLORS.success} />
        </marker>
      </defs>

      {/* Activity Node */}
      <circle cx="160" cy="200" r="70" fill="rgba(59,130,246,0.05)" stroke={COLORS.secondary} strokeWidth="2" />
      <text x="160" y="195" textAnchor="middle" className="text-[14px] fill-white font-bold">Active Stewards</text>
      <text x="160" y="215" textAnchor="middle" className="text-[10px] fill-drp-gray font-cinematic uppercase tracking-widest">Input</text>
      
      {/* Rewards Node */}
      <circle cx="480" cy="200" r="70" fill="rgba(0,255,136,0.05)" stroke={COLORS.success} strokeWidth="2" />
      <text x="480" y="195" textAnchor="middle" className="text-[14px] fill-white font-bold">$DeRi / $RIGHTS</text>
      <text x="480" y="215" textAnchor="middle" className="text-[10px] fill-emerald-400 font-cinematic uppercase tracking-widest">Outcome</text>
      
      {/* Primary Flow */}
      <line x1="235" y1="200" x2="400" y2="200" stroke={COLORS.success} strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#econArrow)" />
      <text x="320" y="185" textAnchor="middle" className="text-[11px] fill-emerald-400 font-bold uppercase tracking-widest">Protocol Value</text>
      
      {/* Re-investment loop */}
      <path
        d="M 480,270 Q 480,360 320,360 Q 160,360 160,270"
        fill="none"
        stroke={COLORS.warning}
        strokeWidth="2"
        strokeOpacity="0.3"
        strokeDasharray="6,6"
      />
      <text x="320" y="340" textAnchor="middle" className="text-[10px] fill-amber-400/60 font-cinematic uppercase tracking-widest">Staking & Governance</text>
    </svg>
  )
}

// Governance Diagram
function GovernanceDiagram({ data }: { data?: Record<string, unknown> }) {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto max-w-3xl">
      {/* Elder Quorum Hub */}
      <rect x="200" y="40" width="200" height="100" rx="30" fill="rgba(168,85,247,0.05)" stroke={COLORS.accent} strokeWidth="2" />
      <text x="300" y="90" textAnchor="middle" className="text-[18px] fill-white font-black tracking-tight">ELDER QUORUM</text>
      <text x="300" y="115" textAnchor="middle" className="text-[9px] fill-drp-gray font-cinematic uppercase tracking-[0.3em]">Governance Hub</text>
      
      {/* Branches */}
      <g transform="translate(80, 240)">
        <rect x="0" y="0" width="120" height="80" rx="20" fill="rgba(255,255,255,0.03)" stroke={COLORS.gray} strokeWidth="1" strokeOpacity="0.2" />
        <text x="60" y="35" textAnchor="middle" className="text-[12px] fill-white font-bold">Proposals</text>
        <text x="60" y="55" textAnchor="middle" className="text-[9px] fill-drp-gray font-cinematic uppercase tracking-widest">Initiation</text>
      </g>
      
      <g transform="translate(240, 240)">
        <rect x="0" y="0" width="120" height="80" rx="20" fill="rgba(255,255,255,0.03)" stroke={COLORS.gray} strokeWidth="1" strokeOpacity="0.2" />
        <text x="60" y="35" textAnchor="middle" className="text-[12px] fill-white font-bold">Voting</text>
        <text x="60" y="55" textAnchor="middle" className="text-[9px] fill-drp-gray font-cinematic uppercase tracking-widest">Consensus</text>
      </g>
      
      <g transform="translate(400, 240)">
        <rect x="0" y="0" width="120" height="80" rx="20" fill="rgba(255,255,255,0.03)" stroke={COLORS.gray} strokeWidth="1" strokeOpacity="0.2" />
        <text x="60" y="35" textAnchor="middle" className="text-[12px] fill-white font-bold">Execution</text>
        <text x="60" y="55" textAnchor="middle" className="text-[9px] fill-drp-gray font-cinematic uppercase tracking-widest">Commitment</text>
      </g>

      {/* Connectors */}
      <path d="M 300,140 L 140,240" fill="none" stroke={COLORS.accent} strokeWidth="1" strokeOpacity="0.2" />
      <path d="M 300,140 L 300,240" fill="none" stroke={COLORS.accent} strokeWidth="1" strokeOpacity="0.2" />
      <path d="M 300,140 L 460,240" fill="none" stroke={COLORS.accent} strokeWidth="1" strokeOpacity="0.2" />
    </svg>
  )
}

// Consensus Diagram
function ConsensusDiagram({ data }: { data?: Record<string, unknown> }) {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-auto max-w-3xl">
      {/* Validators Circle */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x = 300 + Math.cos(rad) * 140
        const y = 200 + Math.sin(rad) * 140
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="30" fill="rgba(59,130,246,0.05)" stroke={COLORS.secondary} strokeWidth="1" strokeOpacity="0.3" />
            <circle cx={x} cy={y} r="4" fill={COLORS.primary} />
            <line x1="300" y1="200" x2={x} y2={y} stroke={COLORS.primary} strokeWidth="0.5" strokeOpacity="0.2" />
          </g>
        )
      })}
      
      {/* Center Agreement */}
      <circle cx="300" cy="200" r="60" fill="rgba(0,242,255,0.05)" stroke={COLORS.primary} strokeWidth="2" />
      <text x="300" y="195" textAnchor="middle" className="text-[14px] fill-white font-black tracking-widest uppercase">Consensus</text>
      <text x="300" y="215" textAnchor="middle" className="text-[9px] fill-drp-cyan font-cinematic uppercase tracking-widest">Verified</text>
      
      {/* Exterior Ring */}
      <circle cx="300" cy="200" r="170" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="10,10" />
    </svg>
  )
}

// Pipeline Diagram
function PipelineDiagram({ data }: { data?: Record<string, unknown> }) {
  const stages = (data?.stages as string[]) || ['Input', 'Anonymize', 'Hash', 'Mint', 'Output']
  
  return (
    <svg viewBox="0 0 800 240" className="w-full h-auto max-w-4xl">
       {stages.map((stage, index) => {
        const x = 80 + (index * 160)
        const isLast = index === stages.length - 1
        
        return (
          <g key={index}>
             <path 
              d={`M ${x-60},80 L ${x+40},80 L ${x+60},120 L ${x+40},160 L ${x-60},160 L ${x-40},120 Z`}
              fill="rgba(0,255,136,0.05)"
              stroke={COLORS.success}
              strokeWidth="1.5"
              strokeOpacity="0.3"
             />
             <text x={x} y={125} textAnchor="middle" className="text-[12px] fill-white font-bold">{stage}</text>
             
             {!isLast && (
               <line x1={x+60} y1={120} x2={x+100} y2={120} stroke={COLORS.success} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4,4" />
             )}
          </g>
        )
       })}
    </svg>
  )
}

function PipelineArrow() {
  return (
    <marker id="pipelineArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill={COLORS.success} />
    </marker>
  )
}
