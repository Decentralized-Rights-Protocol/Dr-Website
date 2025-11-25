'use client'

import { ReactNode } from 'react'
import { Zap, Link as LinkIcon, Award, Building2, Sparkles, Shield } from 'lucide-react'

interface TokenCardProps {
  name: string
  symbol: string
  description: string
  icon: ReactNode
  features: {
    icon: ReactNode
    label: string
  }[]
  variant: 'deri' | 'rights'
  glowColor: string
}

export function TokenCard({ name, symbol, description, icon, features, variant, glowColor }: TokenCardProps) {
  return (
    <div className="group relative">
      {/* Glowing ring effect */}
      <div 
        className={`
          absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
          transition-opacity duration-500 blur-xl
          ${variant === 'deri' ? 'bg-blue-500/50' : 'bg-amber-500/50'}
        `}
      />
      
      {/* Card */}
      <div className="relative bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] hover:border-primary-500/50">
        {/* Rotating ring for $DeRi */}
        {variant === 'deri' && (
          <div className="absolute -top-2 -right-2 w-32 h-32 opacity-30 group-hover:opacity-60 transition-opacity">
            <svg className="w-full h-full animate-spin-slow" viewBox="0 0 128 128">
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="text-blue-400"
              />
            </svg>
          </div>
        )}

        {/* Golden AI-governance circuit halo for $RIGHTS */}
        {variant === 'rights' && (
          <div className="absolute -top-4 -right-4 w-40 h-40 opacity-40 group-hover:opacity-70 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 160 160">
              <path
                d="M80 20 L100 40 L120 30 L130 50 L150 60 L140 80 L150 100 L130 110 L120 130 L100 120 L80 140 L60 120 L40 130 L30 110 L10 100 L20 80 L10 60 L30 50 L40 30 L60 40 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-amber-400"
              />
              <circle cx="80" cy="80" r="40" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-300" />
              <circle cx="80" cy="80" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-amber-400" />
            </svg>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center
              ${variant === 'deri' 
                ? 'bg-gradient-to-br from-blue-500 to-blue-700' 
                : 'bg-gradient-to-br from-amber-500 to-amber-700'
              }
              group-hover:scale-110 transition-transform duration-300
            `}>
              {icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{name}</h3>
              <p className="text-sm text-neutral-400">{symbol}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-neutral-300 mb-6 leading-relaxed">{description}</p>

          {/* Features */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-lg border border-neutral-700/50 group-hover:border-primary-500/30 transition-colors"
              >
                <div className="text-primary-400">{feature.icon}</div>
                <span className="text-neutral-300 text-sm">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

