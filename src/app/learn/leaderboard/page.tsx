"use client";

import React, { useState, useEffect } from "react";
import { 
  Trophy, 
  User,
  Flame,
  Star,
  BarChart3,
  Medal,
  Crown,
  ChevronRight,
  TrendingUp,
  Award,
  BookOpen,
  Coins
} from "lucide-react";

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
          setLeaderboardData((prev) => ({
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
            currentUser: prev.currentUser
          }));
        }
      } catch (error) {
        console.error('Failed to load leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLeaderboard();
  }, []);

  const medals = ['🥇', '🥈', '🥉'];
  const medalColors = [
    'border-yellow-400/40 bg-yellow-400/5 shadow-yellow-900/10',
    'border-slate-400/30 bg-slate-400/5 shadow-slate-900/10',
    'border-amber-600/30 bg-amber-600/5 shadow-amber-900/10',
  ];

  const currentData = leaderboardData[activeTab];
  const top3 = currentData.slice(0, 3);
  const others = currentData.slice(3);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-slate-400 font-medium animate-pulse">Loading rankings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
          <Trophy className="w-3.5 h-3.5" />
          Rankings
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Learning Leaderboard
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Compete with the DRP community, earn XP, and climb the ranks to become a Protocol Elder.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex justify-center">
        <div className="flex gap-1 rounded-xl bg-slate-900/80 border border-slate-800 p-1 backdrop-blur-sm">
          {[
            { id: 'overall', label: 'Overall' },
            { id: 'weekly', label: 'This Week' },
            { id: 'monthly', label: 'This Month' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-lg px-6 py-2 text-sm font-bold transition-all
                ${activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {top3.map((user, i) => (
          <div key={user.username} className={`relative rounded-3xl border p-6 shadow-xl overflow-hidden transition-transform hover:-translate-y-1 ${medalColors[i]}`}>
            {/* Background Decorative Icon */}
            <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
              {i === 0 ? <Crown size={120} /> : <Trophy size={120} />}
            </div>
            
            <div className="relative flex flex-col items-center text-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-900/40">
                  {user.username[0].toUpperCase()}
                </div>
                <div className="absolute -top-3 -right-3 text-3xl">
                  {medals[i]}
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xl font-black text-white">{user.username}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Level {user.level}</span>
                  <div className="w-1 h-1 rounded-full bg-slate-700" />
                  <span className="text-xs font-bold text-indigo-400 uppercase">{user.totalRewards} DeRi</span>
                </div>
              </div>

              <div className="w-full h-px bg-slate-800 my-2" />

              <div className="grid grid-cols-2 w-full gap-4">
                <div className="text-center">
                  <p className="text-lg font-black text-white">{user.streak}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-black text-indigo-400">{user.lessonsCompleted}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Lessons</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Others Rankings Table */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-slate-950/50 border-b border-slate-800 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Learner</div>
              <div className="col-span-2 text-center">Level</div>
              <div className="col-span-2 text-center">Lessons</div>
              <div className="col-span-2 text-right">Rewards</div>
            </div>

            {/* List Items */}
            <div className="divide-y divide-slate-800">
              {others.map((user) => (
                <div key={user.username} className={`grid grid-cols-12 gap-4 px-8 py-5 items-center transition-colors
                  ${user.isCurrentUser ? 'bg-indigo-600/10' : 'hover:bg-slate-800/30'}`}>
                  <div className="col-span-1">
                    <span className="text-sm font-black text-slate-500">#{user.rank}</span>
                  </div>
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-sm font-black text-slate-300">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${user.isCurrentUser ? 'text-indigo-300' : 'text-slate-200'}`}>
                        {user.username}
                        {user.isCurrentUser && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400">YOU</span>}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">Verified Contributor</p>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-xs font-bold text-slate-400">Lv {user.level}</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="text-xs font-bold text-slate-400">{user.lessonsCompleted}</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-indigo-400 font-black">
                      <span className="text-sm">{user.totalRewards}</span>
                      <Coins size={14} className="text-indigo-500/50" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Status Sticky/Footer */}
      <div className="rounded-2xl border border-indigo-500/30 bg-indigo-600/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-indigo-900/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg">
            {leaderboardData.currentUser.username[0].toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-black text-white">Your Ranking</h3>
            <p className="text-sm text-indigo-400/80 font-medium">Rank #{leaderboardData.currentUser.rank} out of 1,000+ learners</p>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="text-center">
            <p className="text-xl font-black text-white">Level {leaderboardData.currentUser.level}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Current Tier</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-black text-indigo-400">{leaderboardData.currentUser.totalRewards}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total $DeRi</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-black text-white">{leaderboardData.currentUser.lessonsCompleted}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
