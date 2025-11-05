'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Search, AlertCircle, Zap, Shield, Brain, Network, Code, Hash, CircuitBoard } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mathematical formulas for blockchain
  const formulas = [
    { label: 'Hash Function', formula: 'H(x) = SHA-256(x)' },
    { label: 'Merkle Root', formula: 'M = H(H(Tx₁) + H(Tx₂))' },
    { label: 'Block Hash', formula: 'B = H(Prev + M + Nonce)' },
    { label: 'Consensus', formula: 'V = Σ(Proof of Status)' },
  ]

  // Blockchain-themed icons
  const icons = [
    { icon: Hash, color: 'text-blue-500' },
    { icon: CircuitBoard, color: 'text-purple-500' },
    { icon: Network, color: 'text-green-500' },
    { icon: Code, color: 'text-orange-500' },
    { icon: Shield, color: 'text-cyan-500' },
    { icon: Brain, color: 'text-pink-500' },
  ]

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50 dark:from-neutral-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 dark:from-primary-400 dark:via-purple-400 dark:to-secondary-400 animate-pulse">
            404
          </h1>
          {/* Floating blockchain icons */}
          {mounted && icons.map((item, index) => {
            const Icon = item.icon
            const angle = (index * 60) * (Math.PI / 180)
            const radius = 120
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius
            return (
              <div
                key={index}
                className="absolute animate-float"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  animationDelay: `${index * 0.2}s`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Icon className={`h-8 w-8 ${item.color} opacity-60`} />
              </div>
            )
          })}
        </div>

        {/* Error message */}
        <div className="mb-8">
          <AlertCircle className="mx-auto h-16 w-16 text-primary-600 dark:text-primary-400 mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            Block Not Found
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            The page you're looking for doesn't exist in our blockchain. It may have been moved, deleted, or never existed.
          </p>
        </div>

        {/* Mathematical formulas - blockchain theme */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
          {formulas.map((formula, index) => (
            <div
              key={index}
              className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-2">
                {formula.label}
              </div>
              <div className="font-mono text-sm text-primary-600 dark:text-primary-400">
                {formula.formula}
              </div>
            </div>
          ))}
        </div>

        {/* Blockchain visualization */}
        <div className="mb-12 flex justify-center items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Search className="h-5 w-5" />
            Browse Docs
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Science/Engineering elements */}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto opacity-40">
          <div className="text-center">
            <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400">Energy</div>
          </div>
          <div className="text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400">Security</div>
          </div>
          <div className="text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400">AI</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}
