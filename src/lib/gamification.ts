/**
 * DRP Learning Gamification Engine
 * Handles XP, levels, streaks, badges, and module completion
 */

export interface GamificationState {
  xp: number
  level: number
  streak: number
  badges: string[]
  modulesCompleted: string[]
  lastActivityDate: string
  weeklyQuests: WeeklyQuest[]
  timeBasedChallenges: TimeChallenge[]
}

export interface WeeklyQuest {
  id: string
  title: string
  description: string
  xpReward: number
  progress: number
  target: number
  completed: boolean
}

export interface TimeChallenge {
  id: string
  title: string
  description: string
  deadline: string
  xpReward: number
  completed: boolean
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
}

// Badge definitions
export const BADGES: Badge[] = [
  {
    id: 'explorer',
    name: 'Explorer Badge',
    description: 'Completed 3 modules',
    icon: '/badges/explorer.svg',
    unlocked: false
  },
  {
    id: 'rights-guardian',
    name: 'Rights Guardian',
    description: 'Mastered PoST',
    icon: '/badges/rights-guardian.svg',
    unlocked: false
  },
  {
    id: 'activity-hero',
    name: 'Activity Hero',
    description: 'Mastered PoAT',
    icon: '/badges/activity-hero.svg',
    unlocked: false
  },
  {
    id: 'ai-elder-apprentice',
    name: 'AI Elder Apprentice',
    description: 'Completed AI chapter',
    icon: '/badges/ai-elder.svg',
    unlocked: false
  },
  {
    id: 'sustainability-steward',
    name: 'Sustainability Steward',
    description: 'SDG module completed',
    icon: '/badges/sustainability.svg',
    unlocked: false
  },
  {
    id: 'quantum-defender',
    name: 'Quantum Defender',
    description: 'Post-quantum crypto module',
    icon: '/badges/quantum.svg',
    unlocked: false
  }
]

// XP Rules
export const XP_RULES = {
  COMPLETE_LESSON: 50,
  WATCH_VIDEO: 20,
  QUIZ_80_PLUS: 100,
  STREAK_DAY: 15,
  COMPLETE_MODULE: 200
}

// Level calculation: XP required = level * 1000
export function calculateLevel(xp: number): number {
  return Math.floor(xp / 1000) + 1
}

export function getXPForNextLevel(level: number): number {
  return level * 1000
}

export function getXPProgress(level: number, xp: number): number {
  const currentLevelXP = (level - 1) * 1000
  const nextLevelXP = level * 1000
  const progressXP = xp - currentLevelXP
  const neededXP = nextLevelXP - currentLevelXP
  return (progressXP / neededXP) * 100
}

class GamificationEngine {
  private state: GamificationState

  constructor() {
    this.state = this.loadState()
  }

  private loadState(): GamificationState {
    if (typeof window === 'undefined') {
      return this.getInitialState()
    }

    try {
      const stored = localStorage.getItem('drp_gamification')
      if (stored) {
        const parsed = JSON.parse(stored)
        return { ...this.getInitialState(), ...parsed }
      }
    } catch (error) {
      console.error('Error loading gamification state:', error)
    }

    return this.getInitialState()
  }

  private getInitialState(): GamificationState {
    return {
      xp: 0,
      level: 1,
      streak: 0,
      badges: [],
      modulesCompleted: [],
      lastActivityDate: '',
      weeklyQuests: [],
      timeBasedChallenges: []
    }
  }

  private saveState(): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem('drp_gamification', JSON.stringify(this.state))
    } catch (error) {
      console.error('Error saving gamification state:', error)
    }
  }

  // Award XP
  awardXP(amount: number, reason: string): { xp: number; level: number; levelUp: boolean } {
    const oldLevel = this.state.level
    this.state.xp += amount
    const newLevel = calculateLevel(this.state.xp)
    const levelUp = newLevel > oldLevel

    this.updateStreak()
    this.checkBadges()
    this.saveState()

    return {
      xp: this.state.xp,
      level: newLevel,
      levelUp
    }
  }

  // Update streak
  private updateStreak(): void {
    const today = new Date().toDateString()
    const lastActivity = this.state.lastActivityDate

    if (lastActivity === today) {
      // Already updated today
      return
    }

    if (lastActivity === new Date(Date.now() - 86400000).toDateString()) {
      // Consecutive day
      this.state.streak += 1
      this.awardXP(XP_RULES.STREAK_DAY, 'Daily streak bonus')
    } else if (lastActivity !== today) {
      // Streak broken
      this.state.streak = 1
    }

    this.state.lastActivityDate = today
  }

  // Check badges
  private checkBadges(): void {
    const modulesCompleted = this.state.modulesCompleted.length

    // Explorer Badge - 3 modules
    if (modulesCompleted >= 3 && !this.state.badges.includes('explorer')) {
      this.unlockBadge('explorer')
    }

    // Check other badges based on modules completed
    this.state.modulesCompleted.forEach((module) => {
      if (module.includes('post') && !this.state.badges.includes('rights-guardian')) {
        this.unlockBadge('rights-guardian')
      }
      if (module.includes('poat') && !this.state.badges.includes('activity-hero')) {
        this.unlockBadge('activity-hero')
      }
      if (module.includes('ai') && !this.state.badges.includes('ai-elder-apprentice')) {
        this.unlockBadge('ai-elder-apprentice')
      }
      if (module.includes('sdg') && !this.state.badges.includes('sustainability-steward')) {
        this.unlockBadge('sustainability-steward')
      }
      if (module.includes('quantum') && !this.state.badges.includes('quantum-defender')) {
        this.unlockBadge('quantum-defender')
      }
    })
  }

  // Unlock badge
  unlockBadge(badgeId: string): void {
    if (!this.state.badges.includes(badgeId)) {
      this.state.badges.push(badgeId)
      this.saveState()
      
      // Trigger badge unlock animation/notification
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('badge-unlocked', { detail: { badgeId } }))
      }
    }
  }

  // Complete lesson
  completeLesson(lessonId: string, xp: number = XP_RULES.COMPLETE_LESSON): void {
    this.awardXP(xp, `Completed lesson: ${lessonId}`)
  }

  // Complete quiz with score
  completeQuiz(lessonId: string, score: number): void {
    if (score >= 80) {
      this.awardXP(XP_RULES.QUIZ_80_PLUS, `Quiz passed: ${lessonId}`)
    }
  }

  // Complete module
  completeModule(moduleId: string): void {
    if (!this.state.modulesCompleted.includes(moduleId)) {
      this.state.modulesCompleted.push(moduleId)
      const result = this.awardXP(XP_RULES.COMPLETE_MODULE, `Completed module: ${moduleId}`)
      
      // Unlock Explorer badge if applicable
      this.checkBadges()
      
      // Trigger module completion celebration
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('module-completed', { 
          detail: { moduleId, levelUp: result.levelUp } 
        }))
      }
    }
  }

  // Get current state
  getState(): GamificationState {
    return { ...this.state }
  }

  // Get badges
  getBadges(): Badge[] {
    return BADGES.map(badge => ({
      ...badge,
      unlocked: this.state.badges.includes(badge.id),
      unlockedAt: this.state.badges.includes(badge.id) 
        ? new Date().toISOString() 
        : undefined
    }))
  }

  // Get XP progress percentage
  getXPProgress(): number {
    return getXPProgress(this.state.level, this.state.xp)
  }

  // Sync with backend (future)
  async syncWithBackend(userId: string): Promise<void> {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.decentralizedrights.com'
      await fetch(`${apiUrl}/api/v1/users/${userId}/gamification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
      })
    } catch (error) {
      console.error('Error syncing gamification:', error)
    }
  }

  // Load from backend (future)
  async loadFromBackend(userId: string): Promise<void> {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.decentralizedrights.com'
      const response = await fetch(`${apiUrl}/api/v1/users/${userId}/gamification`)
      if (response.ok) {
        const data = await response.json()
        this.state = { ...this.state, ...data }
        this.saveState()
      }
    } catch (error) {
      console.error('Error loading gamification:', error)
    }
  }
}

// Singleton instance
let gamificationInstance: GamificationEngine | null = null

export function getGamificationEngine(): GamificationEngine {
  if (!gamificationInstance) {
    gamificationInstance = new GamificationEngine()
  }
  return gamificationInstance
}

