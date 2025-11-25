'use client'

import { Shield, Lock, Zap } from 'lucide-react'

export function QuantumSafeSection() {
  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background lattice grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 animate-lattice-rotate" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Quantum shield visualization */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="relative w-96 h-96">
          {/* Rotating quantum lattice */}
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            
            {/* Outer hexagon lattice */}
            <g transform="translate(200, 200)">
              {[...Array(6)].map((_, i) => {
                const angle = (i * 60) * Math.PI / 180
                const x = 150 * Math.cos(angle)
                const y = 150 * Math.sin(angle)
                return (
                  <line
                    key={`outer-${i}`}
                    x1={0}
                    y1={0}
                    x2={x}
                    y2={y}
                    stroke="url(#quantumGradient)"
                    strokeWidth="2"
                    opacity="0.6"
                  />
                )
              })}
              
              {/* Inner hexagon */}
              <polygon
                points="-100,-57.74 100,-57.74 200,0 100,57.74 -100,57.74 -200,0"
                fill="none"
                stroke="url(#quantumGradient)"
                strokeWidth="3"
                opacity="0.8"
              />
              
              {/* Center core */}
              <circle
                cx={0}
                cy={0}
                r="40"
                fill="none"
                stroke="url(#quantumGradient)"
                strokeWidth="4"
                opacity="1"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-900/50 border border-primary-500/30 mb-6">
            <Shield className="w-5 h-5 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">Quantum-Resistant Security</span>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            Protected by{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Quantum-Resistant Signature Protocol
            </span>
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Both DRP tokens are secured with post-quantum cryptography, ensuring protection against future quantum computing threats.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 text-center hover:border-primary-500/50 transition-colors">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Post-Quantum Cryptography</h3>
            <p className="text-sm text-neutral-400">
              Advanced algorithms resistant to quantum attacks
            </p>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 text-center hover:border-primary-500/50 transition-colors">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Future-Proof Security</h3>
            <p className="text-sm text-neutral-400">
              Designed to withstand next-generation computing threats
            </p>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-6 text-center hover:border-primary-500/50 transition-colors">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">High Performance</h3>
            <p className="text-sm text-neutral-400">
              Efficient quantum-safe signatures without compromising speed
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

