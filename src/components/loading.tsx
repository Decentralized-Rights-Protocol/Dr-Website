'use client'

import { useEffect, useState } from 'react'

export function Loading() {
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated DRP Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center animate-pulse-glow">
            <span className="text-white font-bold text-2xl">DRP</span>
          </div>
          {/* Orbiting elements */}
          <div className="absolute inset-0 animate-spin">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-accent-400 rounded-full transform -translate-x-1/2 -translate-y-1" />
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '3s' }}>
            <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-secondary-400 rounded-full transform -translate-x-1/2 translate-y-1" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-white text-xl font-semibold mb-2">
          Loading{dots}
        </div>
        <div className="text-neutral-300 text-sm">
          Initializing blockchain connection...
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-neutral-700 rounded-full mx-auto mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse" style={{
            width: '100%',
            animation: 'loading-bar 2s ease-in-out infinite'
          }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
