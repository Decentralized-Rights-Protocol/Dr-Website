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
import { ParticleBackground } from '@/components/particle-background';

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

interface CurriculumTier {
  id: number;
  tier: string;
  title: string;
  description: string;
  learningGoal: string;
  prerequisites: string[];
  keyOutcomes: string[];
  estimatedDuration: string;
  color: string;
  lessons: Array<{ id: string; title: string; duration: number; reward: number }>;
}

const curriculumLevels: CurriculumTier[] = [
  {
    id: 1,
    tier: "Foundation",
    title: "Blockchain Foundations",
    description: "Master the fundamentals of blockchain technology, cryptography, and decentralized systems. Build a solid understanding of the technologies that power DRP.",
    learningGoal: "Understand core blockchain concepts, cryptographic principles, consensus mechanisms, and smart contract fundamentals to establish a strong technical foundation for DRP.",
    prerequisites: ["Basic computer literacy", "Interest in decentralized systems"],
    keyOutcomes: [
      "Explain blockchain architecture and immutability",
      "Understand cryptographic hashing and digital signatures",
      "Compare different consensus mechanisms",
      "Describe smart contract functionality and use cases"
    ],
    estimatedDuration: "90 minutes",
    color: "bg-blue-500",
    lessons: [
      { id: "1-1", title: "What is Blockchain?", duration: 25, reward: 20 },
      { id: "1-2", title: "Cryptography & Hashing", duration: 20, reward: 15 },
      { id: "1-3", title: "Consensus Mechanisms", duration: 25, reward: 20 },
      { id: "1-4", title: "Smart Contracts 101", duration: 30, reward: 25 },
    ]
  },
  {
    id: 2,
    tier: "Intermediate",
    title: "DRP Architecture & Consensus",
    description: "Deep dive into DRP's layered architecture, hybrid consensus mechanisms (PoST & PoAT), and the Elder Quorum governance system.",
    learningGoal: "Master DRP's technical architecture, understand how Proof of Status and Proof of Activities work together, and learn how governance decisions are made through the Elder Quorum.",
    prerequisites: ["Foundation tier completed", "Understanding of blockchain basics", "Familiarity with consensus mechanisms"],
    keyOutcomes: [
      "Map DRP's four-layer architecture (Application, Protocol, Consensus, Network)",
      "Explain PoST (Proof of Stake + Time) validator selection",
      "Describe PoAT (Proof of Activity) verification process",
      "Understand Elder Quorum governance and decision-making",
      "Analyze activity proof generation and verification"
    ],
    estimatedDuration: "110 minutes",
    color: "bg-green-500",
    lessons: [
      { id: "2-1", title: "DRP Architecture", duration: 25, reward: 20 },
      { id: "2-2", title: "PoST & PoAT Consensus", duration: 25, reward: 20 },
      { id: "2-3", title: "Elder Quorum System", duration: 30, reward: 25 },
      { id: "2-4", title: "Activity Proofs", duration: 35, reward: 30 },
    ]
  },
  {
    id: 3,
    tier: "Advanced",
    title: "Building on DRP",
    description: "Learn to develop decentralized applications (DApps) on DRP, contribute to the ecosystem, and deploy production-ready solutions.",
    learningGoal: "Acquire practical development skills to build, test, and deploy DRP applications. Understand the DRP Development Kit (SDK) and contribute meaningfully to the ecosystem.",
    prerequisites: ["Intermediate tier completed", "Basic programming knowledge (JavaScript/TypeScript recommended)", "Understanding of DRP architecture"],
    keyOutcomes: [
      "Set up DRP development environment and SDK",
      "Build functional DApps using DRP smart contracts",
      "Implement activity proof verification in applications",
      "Write and run tests for DRP applications",
      "Deploy applications to DRP network",
      "Contribute code and documentation to DRP ecosystem"
    ],
    estimatedDuration: "130 minutes",
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
    tier: "Advanced",
    title: "Enterprise & Integration",
    description: "Explore real-world DRP implementations, enterprise integration patterns, supply chain applications, and cross-chain interoperability.",
    learningGoal: "Understand how DRP integrates with existing enterprise systems, supply chains, and identity management. Learn cross-chain interoperability and advanced integration patterns.",
    prerequisites: ["Advanced tier (Building on DRP) completed", "Understanding of enterprise architecture", "Familiarity with API integration"],
    keyOutcomes: [
      "Design DRP integration for enterprise systems",
      "Implement supply chain tracking using DRP",
      "Build identity and access management solutions",
      "Configure cross-chain bridges and interoperability",
      "Evaluate DRP use cases for specific industries"
    ],
    estimatedDuration: "150 minutes",
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
    tier: "Research / Governance",
    title: "Governance & Economic Models",
    description: "Master DRP's governance mechanisms, economic models (SRE, ABE), and explore future research directions. Prepare for active participation in protocol governance.",
    learningGoal: "Understand DRP's governance structures, economic models (Sustainable Rights Economy, Activity-Based Economy), and research frontiers. Develop expertise to participate in protocol decisions and contribute to DRP's evolution.",
    prerequisites: ["All previous tiers completed", "Understanding of economics basics", "Interest in governance and research"],
    keyOutcomes: [
      "Participate effectively in DRP governance processes",
      "Understand Sustainable Rights Economy (SRE) principles",
      "Analyze Activity-Based Economy (ABE) mechanisms",
      "Evaluate economic models and their implications",
      "Contribute to DRP research and future development",
      "Make informed governance decisions as $RIGHTS holder"
    ],
    estimatedDuration: "150 minutes",
    color: "bg-indigo-500",
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
  const [availableLessons, setAvailableLessons] = useState<Array<{ id: string; slug: string; level: number; title: string; description: string }>>([]);

  useEffect(() => {
    // Load user progress from API
    const loadProgress = async () => {
      try {
        const response = await fetch('/api/learn/progress');
        if (response.ok) {
          const progress = await response.json();
          setUserProgress(progress);
        } else {
          console.error('Failed to load progress:', {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
          });
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    };
    
    // Load available lessons from API
    const loadLessons = async () => {
      try {
        const response = await fetch('/api/learn/lessons');
        if (response.ok) {
          const data = await response.json();
          const lessonsList = data.lessons || [];
          setAvailableLessons(lessonsList);
        } else {
          console.error('Failed to load lessons:', {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
          });
        }
      } catch (error) {
        console.error('Failed to load lessons:', error);
      }
    };
    
    loadProgress();
    loadLessons();
  }, []);

  const progressPercentage = userProgress.totalLessons > 0 
    ? (userProgress.completedLessons / userProgress.totalLessons) * 100 
    : 0;

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>
      
      <div className="relative z-10 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/20">
              🎓 Learn • Earn • Contribute
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl mb-4 animate-fade-in-up delay-200">
            DRP Learn-to-Earn
          </h1>
          <p className="text-xl text-neutral-300 mb-8 animate-fade-in-up delay-300">
            Master blockchain, DRP, and AI governance while earning $DeRi rewards
          </p>
          
          {/* Progress Overview */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20 p-6 max-w-2xl mx-auto animate-fade-in-up delay-400">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <BookOpenIcon className="h-6 w-6 text-primary-400" />
                  <span className="text-sm font-medium text-neutral-300">
                    {userProgress.completedLessons}/{userProgress.totalLessons} Lessons
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrophyIcon className="h-6 w-6 text-yellow-400" />
                  <span className="text-sm font-medium text-neutral-300">
                    {userProgress.totalRewards} $DeRi
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  Level {userProgress.currentLevel}
                </div>
                <div className="text-sm text-neutral-400">Current Level</div>
              </div>
            </div>
            
            <div className="w-full bg-neutral-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-center mt-2 text-sm text-neutral-400">
              {progressPercentage.toFixed(1)}% Complete
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link 
            href="/learn/dashboard" 
            className="group bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up delay-500"
          >
            <div className="flex items-center space-x-4">
              <UserIcon className="h-8 w-8 text-primary-400" />
              <div>
                <h3 className="font-semibold text-white">Dashboard</h3>
                <p className="text-sm text-neutral-300">View your progress</p>
              </div>
            </div>
          </Link>
          
          <Link 
            href="/learn/leaderboard" 
            className="group bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up delay-600"
          >
            <div className="flex items-center space-x-4">
              <TrophyIcon className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="font-semibold text-white">Leaderboard</h3>
                <p className="text-sm text-neutral-300">See top learners</p>
              </div>
            </div>
          </Link>
          
          <Link 
            href="/learn/ai-tutor" 
            className="group bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up delay-700"
          >
            <div className="flex items-center space-x-4">
              <StarIcon className="h-8 w-8 text-secondary-400" />
              <div>
                <h3 className="font-semibold text-white">AI Tutor</h3>
                <p className="text-sm text-neutral-300">Get help & answers</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Curriculum Levels */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-white sm:text-4xl mb-4 animate-fade-in-up delay-800">
            Curriculum Levels
          </h2>
          
          {availableLessons.length === 0 && (
            <div className="mb-4 max-w-2xl mx-auto rounded-lg border border-yellow-400/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-100">
              <p>
                Dynamic lesson metadata is temporarily unavailable. You can still access all lessons through the curriculum
                cards below; links will fall back to the classic <span className="font-semibold">/learn/lesson/[id]</span>{' '}
                routes.
              </p>
            </div>
          )}
          
          {curriculumLevels.map((level, index) => (
            <div 
              key={level.id}
              className={`group bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fade-in-up ${
                level.id <= userProgress.currentLevel ? 'opacity-100' : 'opacity-60'
              }`}
              style={{ animationDelay: `${900 + index * 100}ms` }}
            >
              <div className={`${level.color} p-6 text-white`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wide">
                        {level.tier}
                      </span>
                      <span className="text-sm opacity-90">Level {level.id}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{level.title}</h3>
                    <p className="text-lg opacity-90 mb-3">{level.description}</p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                      <div>
                        <span className="font-semibold">Duration:</span> {level.estimatedDuration}
                      </div>
                      <div>
                        <span className="font-semibold">Lessons:</span> {level.lessons.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Expanded Metadata Section */}
              <div className="p-6 bg-white/5 backdrop-blur-sm border-t border-white/10">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Learning Goal */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary-400 mb-2 flex items-center gap-2">
                      <span>🎯</span> Learning Goal
                    </h4>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {level.learningGoal}
                    </p>
                  </div>
                  
                  {/* Prerequisites */}
                  <div>
                    <h4 className="text-sm font-semibold text-primary-400 mb-2 flex items-center gap-2">
                      <span>📋</span> Prerequisites
                    </h4>
                    <ul className="text-sm text-neutral-300 space-y-1">
                      {level.prerequisites.map((prereq, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary-400 mt-1">•</span>
                          <span>{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Key Outcomes */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <h4 className="text-sm font-semibold text-primary-400 mb-3 flex items-center gap-2">
                    <span>✅</span> Key Outcomes
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm text-neutral-300">
                    {level.keyOutcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  {level.lessons.map((lesson) => {
                    // Try to find lesson details from availableLessons
                    const lessonDetails = availableLessons.find(l => l.id === lesson.id) || null;
                    const isUnlocked = level.id <= userProgress.currentLevel;
                    
                    return (
                      <div 
                        key={lesson.id}
                        className="border border-white/20 rounded-lg p-3 md:p-4 hover:shadow-md transition-all hover:scale-105 bg-white/5 backdrop-blur-sm"
                      >
                        <div className="flex items-start justify-between mb-2 gap-2">
                          <h4 className="font-semibold text-white text-sm leading-tight flex-1">
                            {lesson.title}
                          </h4>
                          {userProgress.completedLessons > 0 && (
                            <CheckCircleIcon className="h-5 w-5 text-green-400 flex-shrink-0" />
                          )}
                        </div>
                        
                        {(lessonDetails?.description || lesson.title) && (
                          <p className="text-xs text-neutral-400 mb-3 line-clamp-2">
                            {lessonDetails?.description || ''}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between text-xs md:text-sm text-neutral-300 mb-3">
                          <div className="flex items-center space-x-1">
                            <ClockIcon className="h-3 w-3 md:h-4 md:w-4" />
                            <span>{lesson.duration}min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrophyIcon className="h-3 w-3 md:h-4 md:w-4" />
                            <span>{lesson.reward} $DeRi</span>
                          </div>
                        </div>
                        
                        <Link 
                          href={isUnlocked ? (lessonDetails?.slug ? `/learn/lessons/${lessonDetails.slug}` : `/learn/lesson/${lesson.id}`) : '#'}
                          className={`w-full flex items-center justify-center space-x-2 py-2 px-3 md:px-4 rounded-md text-xs md:text-sm font-medium transition-all ${
                            isUnlocked
                              ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md'
                              : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                          }`}
                          onClick={(e) => {
                            if (!isUnlocked) {
                              e.preventDefault();
                            }
                          }}
                        >
                          <PlayIcon className="h-3 w-3 md:h-4 md:w-4" />
                          <span>
                            {isUnlocked ? (userProgress.completedLessons > 0 ? 'Continue' : 'Start Learning') : 'Locked'}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
                
                {level.id > userProgress.currentLevel && (
                  <div className="mt-4 p-3 md:p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                    <p className="text-xs md:text-sm text-yellow-300 text-center">
                      🔒 Complete Level {level.id - 1} to unlock this level
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
