import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Mock user progress data - in production, this would come from a database
  const progress = {
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
        earned: true,
        earnedAt: '2024-01-15'
      },
      {
        id: 'level_2',
        title: 'Level Up',
        description: 'Reach Level 2',
        earned: true,
        earnedAt: '2024-01-18'
      }
    ]
  };
  
  return NextResponse.json(progress);
}
