'use client'

import { useEffect, useState } from 'react'
import { getGamificationEngine } from '@/lib/gamification'
import { TrophyIcon } from '@heroicons/react/24/solid'

interface LevelBadgeProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LevelBadge({ size = 'md', className = '' }: LevelBadgeProps) {
  const [level, setLevel] = useState(1)

  useEffect(() => {
    const engine = getGamificationEngine()
    const state = engine.getState()
    setLevel(state.level)
    
    const handleUpdate = () => {
      const newState = engine.getState()
      setLevel(newState.level)
    }
    
    window.addEventListener('xp-updated', handleUpdate)
    return () => window.removeEventListener('xp-updated', handleUpdate)
  }, [])

  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 text-4xl'
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow-lg border-4 border-white dark:border-gray-800 transition-transform hover:scale-110`}
      >
        <span>{level}</span>
      </div>
      <TrophyIcon className="absolute -top-1 -right-1 w-6 h-6 text-yellow-400 animate-pulse" />
    </div>
  )
}

