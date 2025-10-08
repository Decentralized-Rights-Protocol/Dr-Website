'use client'

import React, { useState, useEffect } from 'react'
import { Search, ExternalLink, Copy, Clock, Hash, Users, Activity, TrendingUp, Shield, Zap, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Block {
  number: number
  hash: string
  timestamp: number
  transactions: number
  elderSignatures: number
  consensusType: 'PoST' | 'PoAT' | 'Hybrid'
  status: 'verified' | 'pending' | 'failed'
}

interface Transaction {
  hash: string
  from: string
  to: string
  value: string
  gasUsed: string
  timestamp: number
  status: 'success' | 'pending' | 'failed'
  type: 'transfer' | 'governance' | 'reward' | 'verification'
}

interface Elder {
  address: string
  reputation: number
  status: 'active' | 'inactive'
  lastSeen: number
  verificationCount: number
}

export default function ExplorerPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'blocks' | 'transactions' | 'elders'>('blocks')
  const [blocks, setBlocks] = useState<Block[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [elders, setElders] = useState<Elder[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState({
    totalBlocks: 0,
    totalTransactions: 0,
    activeElders: 0,
    networkHashRate: '0 TH/s'
  })

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockBlocks: Block[] = [
      {
        number: 1234567,
        hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
        timestamp: Date.now() - 300000,
        transactions: 42,
        elderSignatures: 15,
        consensusType: 'Hybrid',
        status: 'verified'
      },
      {
        number: 1234566,
        hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
        timestamp: Date.now() - 600000,
        transactions: 38,
        elderSignatures: 14,
        consensusType: 'PoST',
        status: 'verified'
      },
      {
        number: 1234565,
        hash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
        timestamp: Date.now() - 900000,
        transactions: 51,
        elderSignatures: 16,
        consensusType: 'PoAT',
        status: 'verified'
      }
    ]

    const mockTransactions: Transaction[] = [
      {
        hash: '0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcde',
        from: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        to: '0x8ba1f109551bD432803012645Hac136c',
        value: '1.5 DRP',
        gasUsed: '21000',
        timestamp: Date.now() - 120000,
        status: 'success',
        type: 'transfer'
      },
      {
        hash: '0x5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        from: '0x8ba1f109551bD432803012645Hac136c',
        to: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        value: '0.8 DRP',
        gasUsed: '15000',
        timestamp: Date.now() - 180000,
        status: 'success',
        type: 'governance'
      }
    ]

    const mockElders: Elder[] = [
      {
        address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        reputation: 95,
        status: 'active',
        lastSeen: Date.now() - 30000,
        verificationCount: 1247
      },
      {
        address: '0x8ba1f109551bD432803012645Hac136c',
        reputation: 92,
        status: 'active',
        lastSeen: Date.now() - 60000,
        verificationCount: 1103
      }
    ]

    setBlocks(mockBlocks)
    setTransactions(mockTransactions)
    setElders(mockElders)
    setStats({
      totalBlocks: 1234567,
      totalTransactions: 9876543,
      activeElders: 15,
      networkHashRate: '2.4 TH/s'
    })
  }, [])

  const handleSearch = async (query: string) => {
    if (!query.trim()) return
    
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const getConsensusColor = (type: string) => {
    switch (type) {
      case 'PoST': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'PoAT': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'Hybrid': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'success':
      case 'active':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'failed':
      case 'inactive':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/30 dark:from-neutral-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                DRP Blockchain Explorer
              </h1>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                Explore the Decentralized Rights Protocol blockchain
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Network Online</span>
              </div>
              <a
                href="https://explorer.decentralizedrights.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Full Explorer</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Hash className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Blocks</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {stats.totalBlocks.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Transactions</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {stats.totalTransactions.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Active Elders</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.activeElders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Hash Rate</p>
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stats.networkHashRate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-neutral-200 dark:border-neutral-700 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by block hash, transaction hash, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => handleSearch(searchQuery)}
              disabled={isLoading}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700">
          <div className="border-b border-neutral-200 dark:border-neutral-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'blocks', label: 'Latest Blocks', count: blocks.length },
                { id: 'transactions', label: 'Recent Transactions', count: transactions.length },
                { id: 'elders', label: 'Elder Quorum', count: elders.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'
                  )}
                >
                  {tab.label}
                  <span className="ml-2 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Blocks Tab */}
            {activeTab === 'blocks' && (
              <div className="space-y-4">
                {blocks.map((block) => (
                  <div key={block.number} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Hash className="w-4 h-4 text-neutral-500" />
                          <span className="font-mono text-sm text-neutral-600 dark:text-neutral-400">
                            #{block.number}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-neutral-500" />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {formatTimestamp(block.timestamp)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getConsensusColor(block.consensusType))}>
                          {block.consensusType}
                        </span>
                        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getStatusColor(block.status))}>
                          {block.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Hash</p>
                        <p className="font-mono text-sm text-neutral-900 dark:text-white">
                          {formatAddress(block.hash)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Transactions</p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          {block.transactions}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Elder Signatures</p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          {block.elderSignatures}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.hash} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-neutral-500" />
                          <span className="font-mono text-sm text-neutral-600 dark:text-neutral-400">
                            {formatAddress(tx.hash)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-neutral-500" />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {formatTimestamp(tx.timestamp)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getStatusColor(tx.status))}>
                          {tx.status}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                          {tx.type}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">From</p>
                        <p className="font-mono text-sm text-neutral-900 dark:text-white">
                          {formatAddress(tx.from)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">To</p>
                        <p className="font-mono text-sm text-neutral-900 dark:text-white">
                          {formatAddress(tx.to)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Value</p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          {tx.value}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Gas Used</p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          {tx.gasUsed}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Elders Tab */}
            {activeTab === 'elders' && (
              <div className="space-y-4">
                {elders.map((elder) => (
                  <div key={elder.address} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-neutral-500" />
                          <span className="font-mono text-sm text-neutral-600 dark:text-neutral-400">
                            {formatAddress(elder.address)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-neutral-500" />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            Last seen: {formatTimestamp(elder.lastSeen)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getStatusColor(elder.status))}>
                          {elder.status}
                        </span>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                          {elder.reputation}% reputation
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Verification Count</p>
                        <p className="text-sm font-medium text-neutral-900 dark:text-white">
                          {elder.verificationCount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Reputation Score</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${elder.reputation}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-neutral-900 dark:text-white">
                            {elder.reputation}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-neutral-600 dark:text-neutral-400">
            Powered by the Decentralized Rights Protocol
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              GitHub Repository
            </a>
            <a href="https://docs.drp-protocol.org" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              Documentation
            </a>
            <a href="https://explorer.decentralizedrights.com" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              Full Explorer
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
