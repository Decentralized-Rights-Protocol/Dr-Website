"use client";

import React, { useState, useEffect } from "react";
import { 
  TrophyIcon, 
  UserIcon,
  FireIcon,
  StarIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar?: string;
  level: number;
  lessonsCompleted: number;
  totalRewards: number;
  streak: number;
  isCurrentUser?: boolean;
}

interface LeaderboardData {
  overall: LeaderboardEntry[];
  weekly: LeaderboardEntry[];
  monthly: LeaderboardEntry[];
  currentUser: LeaderboardEntry;
}

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>({
    overall: [],
    weekly: [],
    monthly: [],
    currentUser: {
      rank: 15,
      username: 'You',
      level: 2,
      lessonsCompleted: 8,
      totalRewards: 150,
      streak: 5,
      isCurrentUser: true
    }
  });

  const [activeTab, setActiveTab] = useState<'overall' | 'weekly' | 'monthly'>('overall');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch('/api/learn/leaderboard');
        if (response.ok) {
          const data = await response.json();
          setLeaderboardData(data);
        } else {
          // Mock data for demonstration
          const mockData: LeaderboardData = {
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
            currentUser: leaderboardData.currentUser
          };
          setLeaderboardData(mockData);
        }
      } catch (error) {
        console.error('Failed to load leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <TrophyIcon className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <TrophyIcon className="h-6 w-6 text-gray-400" />;
      case 3:
        return <TrophyIcon className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600 dark:text-gray-300">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-700';
      default:
        return 'bg-white dark:bg-gray-800';
    }
  };

  const currentData = leaderboardData[activeTab];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Learning Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            See how you rank among DRP learners worldwide
          </p>
        </div>

        {/* Current User Stats */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                <UserIcon className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Your Ranking
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Rank #{leaderboardData.currentUser.rank} out of 1,000+ learners
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                Level {leaderboardData.currentUser.level}
              </div>
              <div className="text-sm text-gray-500">
                {leaderboardData.currentUser.lessonsCompleted} lessons completed
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('overall')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'overall'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Overall
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'weekly'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'monthly'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {activeTab === 'overall' && 'All-Time Leaders'}
                {activeTab === 'weekly' && 'Weekly Champions'}
                {activeTab === 'monthly' && 'Monthly Masters'}
              </h2>
              <ChartBarIcon className="h-6 w-6 text-gray-500" />
            </div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentData.map((entry, index) => (
              <div 
                key={entry.username}
                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  entry.isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {getRankIcon(entry.rank)}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {entry.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className={`font-semibold ${
                          entry.isCurrentUser 
                            ? 'text-blue-900 dark:text-blue-100' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {entry.username}
                          {entry.isCurrentUser && ' (You)'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Level {entry.level}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {entry.lessonsCompleted}
                      </div>
                      <div className="text-xs text-gray-500">Lessons</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center space-x-1">
                        <TrophyIcon className="h-4 w-4 text-yellow-500" />
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {entry.totalRewards}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">$DeRi</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center space-x-1">
                        <FireIcon className="h-4 w-4 text-red-500" />
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {entry.streak}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">Streak</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Keep Learning, Keep Earning!</h3>
            <p className="opacity-90">
              Every lesson brings you closer to becoming a DRP expert. 
              Your dedication to learning is building the future of decentralized systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
