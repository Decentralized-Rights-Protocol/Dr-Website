"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BookOpenIcon, 
  TrophyIcon, 
  UserIcon, 
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  StarIcon
} from "@heroicons/react/24/outline";

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  completed: boolean;
  level: number;
  module: string;
  reward: number;
}

interface UserProgress {
  totalLessons: number;
  completedLessons: number;
  totalRewards: number;
  currentLevel: number;
  achievements: string[];
}

const curriculumLevels = [
  {
    id: 1,
    title: "Blockchain Foundations",
    description: "Master the basics of blockchain technology and decentralized systems",
    color: "bg-blue-500",
    lessons: [
      { id: "1-1", title: "What is Blockchain?", duration: 15, reward: 10 },
      { id: "1-2", title: "Cryptography & Hashing", duration: 20, reward: 15 },
      { id: "1-3", title: "Consensus Mechanisms", duration: 25, reward: 20 },
      { id: "1-4", title: "Smart Contracts 101", duration: 30, reward: 25 },
    ]
  },
  {
    id: 2,
    title: "DRP in Action",
    description: "Understand the Decentralized Rights Protocol and its applications",
    color: "bg-green-500",
    lessons: [
      { id: "2-1", title: "DRP Architecture", duration: 20, reward: 15 },
      { id: "2-2", title: "PoST & PoAT Consensus", duration: 25, reward: 20 },
      { id: "2-3", title: "Elder Quorum System", duration: 30, reward: 25 },
      { id: "2-4", title: "Activity Proofs", duration: 35, reward: 30 },
    ]
  },
  {
    id: 3,
    title: "Building & Contributing",
    description: "Learn to build on DRP and contribute to the ecosystem",
    color: "bg-purple-500",
    lessons: [
      { id: "3-1", title: "DRP Development Kit", duration: 30, reward: 25 },
      { id: "3-2", title: "Building DApps", duration: 40, reward: 35 },
      { id: "3-3", title: "Contributing to DRP", duration: 25, reward: 20 },
      { id: "3-4", title: "Testing & Deployment", duration: 35, reward: 30 },
    ]
  },
  {
    id: 4,
    title: "Real-World Integration",
    description: "Apply DRP in real-world scenarios and use cases",
    color: "bg-orange-500",
    lessons: [
      { id: "4-1", title: "Enterprise Integration", duration: 30, reward: 25 },
      { id: "4-2", title: "Supply Chain Applications", duration: 35, reward: 30 },
      { id: "4-3", title: "Identity & Access Management", duration: 40, reward: 35 },
      { id: "4-4", title: "Cross-Chain Interoperability", duration: 45, reward: 40 },
    ]
  },
  {
    id: 5,
    title: "Mastery & Governance",
    description: "Become a DRP expert and participate in governance",
    color: "bg-red-500",
    lessons: [
      { id: "5-1", title: "Advanced DRP Concepts", duration: 40, reward: 35 },
      { id: "5-2", title: "Governance Mechanisms", duration: 35, reward: 30 },
      { id: "5-3", title: "Economic Models", duration: 45, reward: 40 },
      { id: "5-4", title: "Future of DRP", duration: 30, reward: 25 },
    ]
  }
];

export default function LearnPage() {
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalLessons: 20,
    completedLessons: 0,
    totalRewards: 0,
    currentLevel: 1,
    achievements: []
  });

  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  useEffect(() => {
    // Load user progress from API
    const loadProgress = async () => {
      try {
        const response = await fetch('/api/learn/progress');
        if (response.ok) {
          const progress = await response.json();
          setUserProgress(progress);
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    };
    loadProgress();
  }, []);

  const progressPercentage = userProgress.totalLessons > 0 
    ? (userProgress.completedLessons / userProgress.totalLessons) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            DRP Learn-to-Earn
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Master blockchain, DRP, and AI governance while earning $DeRi rewards
          </p>
          
          {/* Progress Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <BookOpenIcon className="h-6 w-6 text-blue-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {userProgress.completedLessons}/{userProgress.totalLessons} Lessons
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrophyIcon className="h-6 w-6 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {userProgress.totalRewards} $DeRi
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  Level {userProgress.currentLevel}
                </div>
                <div className="text-sm text-gray-500">Current Level</div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-center mt-2 text-sm text-gray-500">
              {progressPercentage.toFixed(1)}% Complete
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link 
            href="/learn/dashboard" 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <UserIcon className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Dashboard</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">View your progress</p>
              </div>
            </div>
          </Link>
          
          <Link 
            href="/learn/leaderboard" 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <TrophyIcon className="h-8 w-8 text-yellow-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Leaderboard</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">See top learners</p>
              </div>
            </div>
          </Link>
          
          <Link 
            href="/learn/ai-tutor" 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <StarIcon className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">AI Tutor</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Get help & answers</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Curriculum Levels */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Curriculum Levels
          </h2>
          
          {curriculumLevels.map((level) => (
            <div 
              key={level.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${
                level.id <= userProgress.currentLevel ? 'opacity-100' : 'opacity-60'
              }`}
            >
              <div className={`${level.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Level {level.id}: {level.title}</h3>
                    <p className="text-lg opacity-90">{level.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{level.lessons.length}</div>
                    <div className="text-sm opacity-90">Lessons</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {level.lessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {lesson.title}
                        </h4>
                        {userProgress.completedLessons > 0 && (
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-3">
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="h-4 w-4" />
                          <span>{lesson.duration}min</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrophyIcon className="h-4 w-4" />
                          <span>{lesson.reward} $DeRi</span>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/learn/lesson/${lesson.id}`}
                        className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          level.id <= userProgress.currentLevel
                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <PlayIcon className="h-4 w-4" />
                        <span>
                          {userProgress.completedLessons > 0 ? 'Continue' : 'Start Learning'}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
                
                {level.id > userProgress.currentLevel && (
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      Complete Level {level.id - 1} to unlock this level
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
