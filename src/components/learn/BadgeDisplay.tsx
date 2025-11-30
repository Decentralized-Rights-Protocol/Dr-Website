'use client'

import { useEffect, useState } from 'react'
import { getGamificationEngine, type Badge } from '@/lib/gamification'
import Image from 'next/image'

interface BadgeDisplayProps {
  className?: string
  showUnlockedOnly?: boolean
}

export function BadgeDisplay({ className = '', showUnlockedOnly = false }: BadgeDisplayProps) {
  const [badges, setBadges] = useState<Badge[]>([])

  useEffect(() => {
    const engine = getGamificationEngine()
    const allBadges = engine.getBadges()
    setBadges(showUnlockedOnly ? allBadges.filter(b => b.unlocked) : allBadges)
    
    const handleBadgeUnlock = () => {
      const updatedBadges = engine.getBadges()
      setBadges(showUnlockedOnly ? updatedBadges.filter(b => b.unlocked) : updatedBadges)
    }
    
    window.addEventListener('badge-unlocked', handleBadgeUnlock)
    return () => window.removeEventListener('badge-unlocked', handleBadgeUnlock)
  }, [showUnlockedOnly])

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
      {badges.map((badge) => (
        <div
          key={badge.id}
          className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
            badge.unlocked
              ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-300 dark:border-blue-700 shadow-lg hover:scale-105'
              : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-50'
          }`}
        >
          {badge.unlocked ? (
            <>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <Image
                src={badge.icon}
                alt={badge.name}
                width={80}
                height={80}
                className="mx-auto mb-2"
              />
            </>
          ) : (
            <div className="w-20 h-20 mx-auto mb-2 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-2xl">?</span>
            </div>
          )}
          <h4 className="text-sm font-semibold text-center text-gray-900 dark:text-white">
            {badge.name}
          </h4>
          <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-1">
            {badge.description}
          </p>
        </div>
      ))}
    </div>
  )
}

