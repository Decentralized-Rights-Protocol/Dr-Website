"use client";

import React, { useState, useEffect } from "react";
import { 
  TrophyIcon, 
  BookOpenIcon, 
  ClockIcon, 
  StarIcon,
  ChartBarIcon,
  UserIcon,
  FireIcon,
  AcademicCapIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

interface UserStats {
  totalLessons: number;
  completedLessons: number;
  totalRewards: number;
  currentLevel: number;
  streak: number;
  achievements: Achievement[];
  recentActivity: Activity[];
  weeklyProgress: WeeklyProgress[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

interface Activity {
  id: string;
  type: 'lesson_completed' | 'quiz_passed' | 'achievement_earned';
  title: string;
  timestamp: string;
  reward?: number;
}

interface WeeklyProgress {
  day: string;
  lessonsCompleted: number;
  timeSpent: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<UserStats>({
    totalLessons: 20,
    completedLessons: 8,
    totalRewards: 150,
    currentLevel: 2,
    streak: 5,
    achievements: [],
    recentActivity: [],
    weeklyProgress: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetch('/api/learn/dashboard');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const progressPercentage = stats.totalLessons > 0 
    ? (stats.completedLessons / stats.totalLessons) * 100 
    : 0;

  const achievements = [
    {
      id: 'first_lesson',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      earned: stats.completedLessons > 0,
      earnedAt: stats.completedLessons > 0 ? '2024-01-15' : undefined
    },
    {
      id: 'week_streak',
      title: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      earned: stats.streak >= 7,
      earnedAt: stats.streak >= 7 ? '2024-01-20' : undefined
    },
    {
      id: 'level_2',
      title: 'Level Up',
      description: 'Reach Level 2',
      icon: '⭐',
      earned: stats.currentLevel >= 2,
      earnedAt: stats.currentLevel >= 2 ? '2024-01-18' : undefined
    },
    {
      id: 'quiz_master',
      title: 'Quiz Master',
      description: 'Score 100% on 5 quizzes',
      icon: '🧠',
      earned: false,
      earnedAt: undefined
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'lesson_completed' as const,
      title: 'Completed: DRP Architecture',
      timestamp: '2024-01-20T10:30:00Z',
      reward: 20
    },
    {
      id: '2',
      type: 'achievement_earned' as const,
      title: 'Earned: Level Up Achievement',
      timestamp: '2024-01-18T15:45:00Z'
    },
    {
      id: '3',
      type: 'quiz_passed' as const,
      title: 'Quiz Passed: Blockchain Foundations',
      timestamp: '2024-01-17T09:20:00Z',
      reward: 15
    }
  ];

  const weeklyProgress = [
    { day: 'Mon', lessonsCompleted: 1, timeSpent: 25 },
    { day: 'Tue', lessonsCompleted: 2, timeSpent: 45 },
    { day: 'Wed', lessonsCompleted: 0, timeSpent: 0 },
    { day: 'Thu', lessonsCompleted: 1, timeSpent: 30 },
    { day: 'Fri', lessonsCompleted: 3, timeSpent: 60 },
    { day: 'Sat', lessonsCompleted: 2, timeSpent: 40 },
    { day: 'Sun', lessonsCompleted: 1, timeSpent: 20 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Learning Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your progress and achievements in the DRP ecosystem
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <BookOpenIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Lessons</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.completedLessons}/{stats.totalLessons}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <TrophyIcon className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Rewards</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalRewards} $DeRi
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <StarIcon className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Level</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.currentLevel}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <FireIcon className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Streak</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.streak} days
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Weekly Progress
                </h2>
                <ChartBarIcon className="h-6 w-6 text-gray-500" />
              </div>
              
              <div className="space-y-4">
                {weeklyProgress.map((day, index) => (
                  <div key={day.day} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-300">
                          {day.lessonsCompleted} lessons
                        </span>
                        <span className="text-gray-500">
                          {day.timeSpent}min
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(day.timeSpent / 60) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Achievements
                </h2>
                <AcademicCapIcon className="h-6 w-6 text-gray-500" />
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg ${
                      achievement.earned 
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                        : 'bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        achievement.earned 
                          ? 'text-green-900 dark:text-green-100' 
                          : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className={`text-sm ${
                        achievement.earned 
                          ? 'text-green-700 dark:text-green-300' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                      {achievement.earnedAt && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          Earned on {new Date(achievement.earnedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {achievement.earned && (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex-shrink-0">
                    {activity.type === 'lesson_completed' && (
                      <BookOpenIcon className="h-6 w-6 text-blue-500" />
                    )}
                    {activity.type === 'quiz_passed' && (
                      <TrophyIcon className="h-6 w-6 text-yellow-500" />
                    )}
                    {activity.type === 'achievement_earned' && (
                      <StarIcon className="h-6 w-6 text-purple-500" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {new Date(activity.timestamp).toLocaleDateString()} at{' '}
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  
                  {activity.reward && (
                    <div className="flex items-center space-x-1 text-yellow-600 dark:text-yellow-400">
                      <TrophyIcon className="h-4 w-4" />
                      <span className="font-medium">+{activity.reward} $DeRi</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
