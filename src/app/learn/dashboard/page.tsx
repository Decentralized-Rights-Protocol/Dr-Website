'use client'

import { useEffect, useState } from 'react'
import { getGamificationEngine, type Badge } from '@/lib/gamification'
import { XPProgressBar } from '@/components/learn/XPProgressBar'
import { LevelBadge } from '@/components/learn/LevelBadge'
import { BadgeDisplay } from '@/components/learn/BadgeDisplay'
import { 
  Zap, 
  Star, 
  Flame, 
  CheckCircle, 
  Trophy, 
  BookOpen, 
  LayoutDashboard,
  ArrowRight
} from 'lucide-react'
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
  const nextLevelXp = level * 1000 // Simplified logic for UI

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

  const stats = [
    { label: 'Total XP', value: xp.toLocaleString(), icon: <Zap className="w-5 h-5"/>, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Current Level', value: `Level ${level}`, icon: <Star className="w-5 h-5"/>, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { label: 'Day Streak', value: streak.toString(), icon: <Flame className="w-5 h-5"/>, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'Modules Completed', value: modulesCompleted.length.toString(), icon: <CheckCircle className="w-5 h-5"/>, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Learning Dashboard
          </h1>
          <p className="text-slate-400 mt-1">
            Track your progress and achievements on your DRP learning journey
          </p>
        </div>
        <Link href="/learn" className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
          <BookOpen className="w-4 h-4" />
          Browse All Lessons
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-5 
              flex flex-col gap-2 shadow-md hover:border-slate-600 transition-colors">
            <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
              <span className={stat.color}>{stat.icon}</span>
            </div>
            <span className="text-2xl font-extrabold text-white">{stat.value}</span>
            <span className="text-xs text-slate-500 uppercase tracking-wide">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Progress */}
        <div className="lg:col-span-2 space-y-8">
          {/* XP Progress */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h2 className="text-xl font-bold text-white">XP Progress</h2>
                <p className="text-xs text-slate-500 mt-1">{nextLevelXp - xp} XP to next level</p>
              </div>
              <span className="text-indigo-400 font-bold">{xp} / {nextLevelXp} XP</span>
            </div>
            <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-500 
                    transition-all duration-700 ease-out"
                style={{ width: `${Math.min((xp / nextLevelXp) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Badges Section */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Your Badges</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
                {badges.length} Unlocked
              </span>
            </div>
            {badges.length > 0 ? (
              <BadgeDisplay showUnlockedOnly={true} />
            ) : (
              <div className="text-center py-12 bg-slate-800/30 rounded-xl border border-dashed border-slate-700">
                <Trophy className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-500">Complete modules to unlock badges!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Level & Leaderboard */}
        <div className="space-y-8">
          {/* Level Indicator */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-8 text-center">
            <h2 className="text-lg font-bold text-white mb-6">Your Level</h2>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgb(30,41,59)" strokeWidth="8"/>
                <circle cx="50" cy="50" r="44" fill="none" 
                  stroke="currentColor" strokeWidth="8"
                  strokeDasharray={`${(level / 20) * 276} 276`}
                  strokeLinecap="round"
                  className="text-indigo-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-white">{level}</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Level</span>
              </div>
            </div>
            <p className="mt-6 text-sm text-slate-400">Keep learning to increase your rank!</p>
          </div>

          {/* Leaderboard Preview */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Leaderboard</h2>
              <Link href="/learn/leaderboard" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                    entry.isCurrentUser
                      ? 'bg-indigo-600/20 border border-indigo-500/30'
                      : 'bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold w-5 ${entry.rank <= 3 ? 'text-yellow-400' : 'text-slate-500'}`}>
                      #{entry.rank}
                    </span>
                    <span className={`text-sm font-medium ${entry.isCurrentUser ? 'text-white' : 'text-slate-300'}`}>
                      {entry.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-indigo-400">
                    {entry.xp.toLocaleString()} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="pt-8">
        <Link
          href="/learn"
          className="group block rounded-2xl border border-indigo-500/30 bg-indigo-600/10 p-6 text-center hover:bg-indigo-600/20 transition-all duration-300"
        >
          <div className="flex flex-col items-center gap-2">
            <BookOpen className="w-8 h-8 text-indigo-400 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white">Continue Your Journey</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Ready to learn more? Jump back into your lessons and earn more DeRi tokens.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2 text-sm font-bold text-white hover:bg-indigo-500 transition-colors">
              Resume Learning
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
