'use client'

import { useEffect, useState } from 'react'
import { getGamificationEngine, type Badge } from '@/lib/gamification'
import { XPProgressBar } from '@/components/learn/XPProgressBar'
import { LevelBadge } from '@/components/learn/LevelBadge'
import { BadgeDisplay } from '@/components/learn/BadgeDisplay'
import { 
  TrophyIcon, 
  FireIcon, 
  BookOpenIcon, 
  ChartBarIcon
} from '@heroicons/react/24/solid'
import Link from 'next/link'

interface LeaderboardEntry {
  rank: number
  name: string
  xp: number
  level: number
  isCurrentUser?: boolean
}

export default function LearnDashboardPage() {
  const [xp, setXP] = useState(0)
  const [level, setLevel] = useState(1)
  const [streak, setStreak] = useState(0)
  const [modulesCompleted, setModulesCompleted] = useState<string[]>([])
  const [badges, setBadges] = useState<Badge[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const engine = getGamificationEngine()
    const state = engine.getState()
    
    setXP(state.xp)
    setLevel(state.level)
    setStreak(state.streak)
    setModulesCompleted(state.modulesCompleted)
    setBadges(engine.getBadges().filter(b => b.unlocked))
    
    // Generate mock leaderboard
    const mockLeaderboard: LeaderboardEntry[] = [
      { rank: 1, name: 'DRP Champion', xp: 15000, level: 15 },
      { rank: 2, name: 'Blockchain Master', xp: 12000, level: 12 },
      { rank: 3, name: 'Rights Guardian', xp: 10000, level: 10 },
      { rank: 4, name: 'You', xp: state.xp, level: state.level, isCurrentUser: true },
      { rank: 5, name: 'Learner123', xp: 8000, level: 8 },
      { rank: 6, name: 'Student456', xp: 6000, level: 6 },
      { rank: 7, name: 'Newcomer789', xp: 4000, level: 4 },
    ].sort((a, b) => b.xp - a.xp)
      .map((entry, index) => ({ ...entry, rank: index + 1 }))
    
    setLeaderboard(mockLeaderboard)
    
    // Listen for updates
    const handleUpdate = () => {
      const newState = engine.getState()
      setXP(newState.xp)
      setLevel(newState.level)
      setStreak(newState.streak)
      setModulesCompleted(newState.modulesCompleted)
      setBadges(engine.getBadges().filter(b => b.unlocked))
    }
    
    window.addEventListener('xp-updated', handleUpdate)
    window.addEventListener('badge-unlocked', handleUpdate)
    
    return () => {
      window.removeEventListener('xp-updated', handleUpdate)
      window.removeEventListener('badge-unlocked', handleUpdate)
    }
  }, [])

  return (
    <div className="min-h-screen style={{ background: "linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)" }} p-4">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Your Learning Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your progress and achievements on your DRP learning journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* XP Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <ChartBarIcon className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {xp.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total XP</p>
          </div>

          {/* Level Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <TrophyIcon className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Level {level}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Level</p>
          </div>

          {/* Streak Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <FireIcon className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {streak}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Day Streak</p>
          </div>

          {/* Modules Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <BookOpenIcon className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {modulesCompleted.length}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Modules Completed</p>
          </div>
        </div>

        {/* XP Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            XP Progress
                </h2>
          <XPProgressBar />
              </div>
              
        {/* Level Badge */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Level
                </h2>
          <div className="flex justify-center">
            <LevelBadge size="lg" />
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Badges ({badges.length})
            </h2>
          {badges.length > 0 ? (
            <BadgeDisplay showUnlockedOnly={true} />
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              Complete modules to unlock badges!
            </p>
                    )}
                  </div>
                  
        {/* Leaderboard */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Leaderboard
          </h2>
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  entry.isCurrentUser
                    ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-gray-700 dark:text-gray-300 w-8">
                    #{entry.rank}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {entry.name}
                  </span>
                  {entry.isCurrentUser && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                      You
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Level {entry.level}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {entry.xp.toLocaleString()} XP
                  </span>
                </div>
                </div>
              ))}
            </div>
          </div>

        {/* Back to Learn */}
        <div className="text-center">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <BookOpenIcon className="w-5 h-5" />
            Continue Learning
          </Link>
        </div>
      </div>
    </div>
  )
}
