import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Mock dashboard data - in production, this would come from a database
  const dashboardData = {
    totalLessons: 20,
    completedLessons: 8,
    totalRewards: 150,
    currentLevel: 2,
    streak: 5,
    achievements: [
      {
        id: 'first_lesson',
        title: 'First Steps',
        description: 'Complete your first lesson',
        icon: '🎯',
        earned: true,
        earnedAt: '2024-01-15'
      },
      {
        id: 'week_streak',
        title: 'Week Warrior',
        description: 'Maintain a 7-day learning streak',
        icon: '🔥',
        earned: false,
        earnedAt: null
      },
      {
        id: 'level_2',
        title: 'Level Up',
        description: 'Reach Level 2',
        icon: '⭐',
        earned: true,
        earnedAt: '2024-01-18'
      },
      {
        id: 'quiz_master',
        title: 'Quiz Master',
        description: 'Score 100% on 5 quizzes',
        icon: '🧠',
        earned: false,
        earnedAt: null
      }
    ],
    recentActivity: [
      {
        id: '1',
        type: 'lesson_completed',
        title: 'Completed: DRP Architecture',
        timestamp: '2024-01-20T10:30:00Z',
        reward: 20
      },
      {
        id: '2',
        type: 'achievement_earned',
        title: 'Earned: Level Up Achievement',
        timestamp: '2024-01-18T15:45:00Z'
      },
      {
        id: '3',
        type: 'quiz_passed',
        title: 'Quiz Passed: Blockchain Foundations',
        timestamp: '2024-01-17T09:20:00Z',
        reward: 15
      }
    ],
    weeklyProgress: [
      { day: 'Mon', lessonsCompleted: 1, timeSpent: 25 },
      { day: 'Tue', lessonsCompleted: 2, timeSpent: 45 },
      { day: 'Wed', lessonsCompleted: 0, timeSpent: 0 },
      { day: 'Thu', lessonsCompleted: 1, timeSpent: 30 },
      { day: 'Fri', lessonsCompleted: 3, timeSpent: 60 },
      { day: 'Sat', lessonsCompleted: 2, timeSpent: 40 },
      { day: 'Sun', lessonsCompleted: 1, timeSpent: 20 }
    ]
  };
  
  return NextResponse.json(dashboardData);
}
