import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Mock leaderboard data - in production, this would come from a database
  const leaderboardData = {
    overall: [
      { rank: 1, username: 'BlockchainMaster', level: 5, lessonsCompleted: 20, totalRewards: 500, streak: 15 },
      { rank: 2, username: 'DRPExpert', level: 4, lessonsCompleted: 18, totalRewards: 450, streak: 12 },
      { rank: 3, username: 'CryptoLearner', level: 4, lessonsCompleted: 16, totalRewards: 400, streak: 10 },
      { rank: 4, username: 'DeFiBuilder', level: 3, lessonsCompleted: 14, totalRewards: 350, streak: 8 },
      { rank: 5, username: 'Web3Dev', level: 3, lessonsCompleted: 12, totalRewards: 300, streak: 7 },
      { rank: 6, username: 'SmartContractor', level: 3, lessonsCompleted: 11, totalRewards: 275, streak: 6 },
      { rank: 7, username: 'ChainValidator', level: 2, lessonsCompleted: 10, totalRewards: 250, streak: 9 },
      { rank: 8, username: 'ProtocolBuilder', level: 2, lessonsCompleted: 9, totalRewards: 225, streak: 5 },
      { rank: 9, username: 'DecentralizedDev', level: 2, lessonsCompleted: 8, totalRewards: 200, streak: 4 },
      { rank: 10, username: 'BlockchainNewbie', level: 2, lessonsCompleted: 7, totalRewards: 175, streak: 3 }
    ],
    weekly: [
      { rank: 1, username: 'WeeklyChampion', level: 3, lessonsCompleted: 5, totalRewards: 100, streak: 7 },
      { rank: 2, username: 'FastLearner', level: 2, lessonsCompleted: 4, totalRewards: 80, streak: 6 },
      { rank: 3, username: 'QuickStudy', level: 2, lessonsCompleted: 3, totalRewards: 60, streak: 5 }
    ],
    monthly: [
      { rank: 1, username: 'MonthlyMaster', level: 4, lessonsCompleted: 15, totalRewards: 300, streak: 20 },
      { rank: 2, username: 'ConsistentLearner', level: 3, lessonsCompleted: 12, totalRewards: 240, streak: 18 },
      { rank: 3, username: 'DedicatedStudent', level: 3, lessonsCompleted: 10, totalRewards: 200, streak: 15 }
    ],
    currentUser: {
      rank: 15,
      username: 'You',
      level: 2,
      lessonsCompleted: 8,
      totalRewards: 150,
      streak: 5,
      isCurrentUser: true
    }
  };
  
  return NextResponse.json(leaderboardData);
}
