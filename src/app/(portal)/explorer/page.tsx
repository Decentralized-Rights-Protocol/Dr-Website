'use client'

import { Activity, Globe, Hash, Search, Shield, Users, Zap, TrendingUp, Verified } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { ParticleBackground } from '@/components/explorer/ParticleBackground'
import { cn } from '@/lib/utils'

export default function ExplorerPage() {
  const [activeTab, setActiveTab] = useState<'blocks' | 'transactions' | 'activities' | 'proofs' | 'rankings' | 'elders'>('blocks')
  const [searchQuery, setSearchQuery] = useState('')

  const stats = {
    totalBlocks: 1248293,
    totalTransactions: 8429103,
    activeElders: 42,
    networkHashRate: '4.2 PH/s'
  }

  return (
    <div className="relative min-h-screen bg-drp-bg text-white">
      <ParticleBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <header className="mb-12">
          <p className="text-xs font-cinematic text-drp-cyan mb-4 tracking-[0.5em]">Real-Time Ledger</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Reality Explorer</h1>
          <p className="text-xl text-drp-gray max-w-2xl leading-relaxed">
            Transparently monitor every block, transaction, and verified activity across the Decentralized Rights Protocol.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {[
            { label: 'Total Blocks', value: stats.totalBlocks.toLocaleString(), icon: Shield },
            { label: 'Total Transactions', value: stats.totalTransactions.toLocaleString(), icon: Activity },
            { label: 'Active Elders', value: stats.activeElders, icon: Users },
            { label: 'Network Hash Rate', value: stats.networkHashRate, icon: Zap },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[2rem] border border-white/5 bg-black/40 p-8 backdrop-blur-md">
              <stat.icon className="w-8 h-8 text-drp-cyan mb-4 opacity-50" />
              <p className="text-xs font-cinematic text-drp-gray mb-2">{stat.label}</p>
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'blocks', label: 'Blocks', icon: Shield },
            { id: 'transactions', label: 'Transactions', icon: Zap },
            { id: 'activities', label: 'Activity Feed', icon: Activity },
            { id: 'proofs', label: 'Proofs', icon: Verified },
            { id: 'elders', label: 'Elders', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-cinematic transition-all border',
                activeTab === tab.id
                  ? 'bg-drp-cyan text-drp-bg border-drp-cyan'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* List Section */}
        <div className="rounded-[2.5rem] border border-white/5 bg-black/40 p-10 backdrop-blur-md">
           <div className="flex items-center justify-center h-64 border-2 border-dashed border-white/5 rounded-[2rem]">
              <p className="text-drp-gray font-cinematic text-xs tracking-widest opacity-40">
                Streaming Live Protocol Data...
              </p>
           </div>
        </div>
      </div>
    </div>
  )
}
