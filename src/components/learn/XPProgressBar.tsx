'use client'

import { useEffect, useState } from 'react'
import { getGamificationEngine } from '@/lib/gamification'

interface XPProgressBarProps {
  className?: string
}

export function XPProgressBar({ className = '' }: XPProgressBarProps) {
  const [progress, setProgress] = useState(0)
  const [xp, setXP] = useState(0)
  const [level, setLevel] = useState(1)
  const [nextLevelXP, setNextLevelXP] = useState(1000)

  useEffect(() => {
    const engine = getGamificationEngine()
    const state = engine.getState()
    
    setXP(state.xp)
    setLevel(state.level)
    setProgress(engine.getXPProgress())
    setNextLevelXP(state.level * 1000)
    
    // Listen for XP updates
    const handleXPUpdate = () => {
      const newState = engine.getState()
      setXP(newState.xp)
      setLevel(newState.level)
      setProgress(engine.getXPProgress())
      setNextLevelXP(newState.level * 1000)
    }
    
    window.addEventListener('xp-updated', handleXPUpdate)
    return () => window.removeEventListener('xp-updated', handleXPUpdate)
  }, [])

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Level {level}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {xp.toLocaleString()} XP
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {nextLevelXP.toLocaleString()} XP to next level
        </span>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  )
}

