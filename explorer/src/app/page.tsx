'use client'

import { useState, useEffect } from 'react'
import { Activity, Award, CheckCircle2, Clock, Hash, Shield, TrendingUp, XCircle, Zap, Search, ExternalLink, Copy, Check, Sparkles, CheckCircle, Verified } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@/components/ui/Table'
import { getTransactions, getActivityFeed, getAISummary, getStatusRankings, type Transaction, type ActivityFeedItem, type AISummary, type StatusRanking } from '@/lib/api'
import { cn } from '@/lib/utils'
import { ParticleBackground } from '@/components/ParticleBackground'
import { TransactionCard } from '@/components/TransactionCard'

export default function ExplorerPage() {
  const [activeTab, setActiveTab] = useState<'transactions' | 'activities' | 'rankings'>('transactions')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [activities, setActivities] = useState<ActivityFeedItem[]>([])
  const [rankings, setRankings] = useState<StatusRanking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [aiSummary, setAiSummary] = useState<AISummary | null>(null)
  const [copiedHash, setCopiedHash] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [activeTab])

  const loadData = async () => {
    try {
      setLoading(true)
      if (activeTab === 'transactions') {
        const data = await getTransactions({ page: 1, page_size: 50 })
        setTransactions(data.transactions)
      } else if (activeTab === 'activities') {
        const data = await getActivityFeed({ page: 1, page_size: 50 })
        setActivities(data.activities)
      } else if (activeTab === 'rankings') {
        const data = await getStatusRankings({ limit: 100 })
        setRankings(data.rankings)
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleActivityClick = async (activityId: string) => {
    setSelectedActivity(activityId)
    try {
      const summary = await getAISummary(activityId)
      setAiSummary(summary)
    } catch (error) {
      console.error('Failed to load AI summary:', error)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedHash(text)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  const formatHash = (hash: string, length: number = 8) => {
    if (hash.length <= length * 2) return hash
    return `${hash.slice(0, length)}...${hash.slice(-length)}`
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      failed: 'bg-red-500/20 text-red-300 border-red-500/40',
      pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
      approved: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      rejected: 'bg-red-500/20 text-red-300 border-red-500/40',
      'requires-info': 'bg-blue-500/20 text-blue-300 border-blue-500/40'
    }
    return styles[status as keyof typeof styles] || 'bg-gray-500/20 text-gray-300 border-gray-500/40'
  }

  const filteredTransactions = transactions.filter((tx) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      tx.tx_hash.toLowerCase().includes(query) ||
      tx.from.toLowerCase().includes(query) ||
      tx.to.toLowerCase().includes(query) ||
      tx.type.toLowerCase().includes(query)
    )
  })

  const filteredActivities = activities.filter((activity) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      activity.id.toLowerCase().includes(query) ||
      activity.title.toLowerCase().includes(query) ||
      activity.actor_id.toLowerCase().includes(query) ||
      activity.hash.toLowerCase().includes(query)
    )
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030b17] via-[#041425] to-[#06172d] text-gray-100 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Header */}
      <header className="border-b border-purple-500/20 bg-[#030b17]/90 backdrop-blur-md sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                DRP Explorer
              </h1>
              <p className="text-sm text-gray-400 mt-1">Track blocks, transactions, and AI-verified activities in real time</p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by hash, address, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-[#06172d]/60 border border-purple-500/30 rounded-full text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm transition-all w-full md:w-80"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Tabs - Pill Style */}
        <div className="flex gap-3 mb-8">
          {[
            { id: 'transactions', label: 'Transactions', icon: Zap },
            { id: 'activities', label: 'Activity Feed', icon: Activity },
            { id: 'rankings', label: 'Status Rankings', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all rounded-full border',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500/50 text-purple-300 shadow-lg shadow-purple-500/20'
                  : 'bg-[#06172d]/40 border-purple-500/20 text-gray-400 hover:text-gray-300 hover:border-purple-500/40 hover:bg-[#06172d]/60'
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* Transaction Cards View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {loading ? (
                <div className="col-span-full text-center py-12 text-gray-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  Loading transactions...
                </div>
              ) : filteredTransactions.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-400">
                  <Hash className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  No transactions found
                </div>
              ) : (
                filteredTransactions.slice(0, 12).map((tx) => (
                  <TransactionCard key={tx.tx_hash} transaction={tx} />
                ))
              )}
            </div>

            {/* Table View */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHead>
                    <TableRow className="bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                      <TableHeader>Hash</TableHeader>
                      <TableHeader>Type</TableHeader>
                      <TableHeader>From</TableHeader>
                      <TableHeader>To</TableHeader>
                      <TableHeader>Status</TableHeader>
                      <TableHeader>Block</TableHeader>
                      <TableHeader>Timestamp</TableHeader>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                          Loading transactions...
                        </TableCell>
                      </TableRow>
                    ) : filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                          No transactions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((tx, index) => (
                        <TableRow 
                          key={tx.tx_hash} 
                          className={cn(
                            'cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-500/10',
                            index % 2 === 0 ? 'bg-[#06172d]/30' : 'bg-[#06172d]/10'
                          )}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Hash className="h-3 w-3 text-purple-400" />
                              <code className="text-xs font-mono text-purple-300">{formatHash(tx.tx_hash)}</code>
                              <button
                                onClick={() => copyToClipboard(tx.tx_hash)}
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                              >
                                {copiedHash === tx.tx_hash ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              </button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                              {tx.type}
                            </span>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs font-mono text-gray-400">{formatAddress(tx.from)}</code>
                          </TableCell>
                          <TableCell>
                            <code className="text-xs font-mono text-gray-400">{formatAddress(tx.to)}</code>
                          </TableCell>
                          <TableCell>
                            <span className={cn('px-2 py-1 rounded-full text-xs font-semibold border', getStatusBadge(tx.status))}>
                              {tx.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-gray-400">#{tx.block_number}</TableCell>
                          <TableCell className="text-gray-400 text-xs">
                            {new Date(tx.timestamp).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
            <div className="space-y-4">
              {loading ? (
                <Card>
                  <div className="text-center py-8 text-gray-400">Loading activities...</div>
                </Card>
              ) : filteredActivities.length === 0 ? (
                <Card>
                  <div className="text-center py-8 text-gray-400">No activities found</div>
                </Card>
              ) : (
                filteredActivities.map((activity) => (
                  <Card
                    key={activity.id}
                    className={cn(
                      'cursor-pointer transition-all',
                      selectedActivity === activity.id && 'ring-2 ring-purple-500/50'
                    )}
                    onClick={() => handleActivityClick(activity.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-gray-100">{activity.title}</h3>
                          <span className={cn('px-2 py-1 rounded text-xs font-semibold border', getStatusBadge(activity.verification_status))}>
                            {activity.verification_status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{activity.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Hash className="h-3 w-3" />
                            <span className="font-mono">{formatHash(activity.hash, 6)}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                copyToClipboard(activity.hash)
                              }}
                              className="ml-1 text-gray-400 hover:text-purple-400"
                            >
                              {copiedHash === activity.hash ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            </button>
                          </div>
                          {activity.orbitdb_cid && (
                            <div className="flex items-center gap-1">
                              <ExternalLink className="h-3 w-3" />
                              <span className="font-mono">CID: {formatHash(activity.orbitdb_cid, 6)}</span>
                            </div>
                          )}
                          {activity.location && (
                            <div className="flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              {activity.location}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>
                        {activity.rewards && (
                          <div className="mt-3 flex items-center gap-4">
                            <div className="flex items-center gap-1 text-emerald-400">
                              <Award className="h-4 w-4" />
                              <span className="text-sm font-semibold">{activity.rewards.deri} DeRi</span>
                            </div>
                            {activity.rewards.rights > 0 && (
                              <div className="flex items-center gap-1 text-purple-400">
                                <Shield className="h-4 w-4" />
                                <span className="text-sm font-semibold">{activity.rewards.rights} RIGHTS</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>

            {/* AI Summary Sidebar */}
            {selectedActivity && aiSummary && (
              <Card className="sticky top-24">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-lg">AI Verification Summary</h3>
                  <Verified className="h-4 w-4 text-cyan-400 ml-auto" />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Summary</p>
                    <p className="text-sm text-gray-300">{aiSummary.summary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Confidence Score</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                          style={{ width: `${aiSummary.confidence_score * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-purple-400">{(aiSummary.confidence_score * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  {aiSummary.key_points.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Key Points</p>
                      <ul className="space-y-1">
                        {aiSummary.key_points.map((point, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {aiSummary.elder_review && (
                    <div className="pt-4 border-t border-purple-500/20">
                      <p className="text-sm text-gray-400 mb-2">Elder Review</p>
                      <p className="text-sm text-gray-300 mb-1">
                        <span className="font-semibold">Decision:</span> {aiSummary.elder_review.decision}
                      </p>
                      <p className="text-sm text-gray-300">
                        <span className="font-semibold">Reasoning:</span> {aiSummary.elder_review.reasoning}
                      </p>
                    </div>
                  )}
                  <div className="pt-4 border-t border-purple-500/20">
                    <p className="text-xs text-gray-500">
                      Generated: {new Date(aiSummary.generated_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Rankings Tab */}
        {activeTab === 'rankings' && (
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Rank</TableHeader>
                    <TableHeader>User</TableHeader>
                    <TableHeader>PoST Score</TableHeader>
                    <TableHeader>Attestations</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Last Updated</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                        Loading rankings...
                      </TableCell>
                    </TableRow>
                  ) : rankings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                        No rankings available
                      </TableCell>
                    </TableRow>
                  ) : (
                    rankings.map((ranking) => (
                      <TableRow key={ranking.user_id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {ranking.rank <= 3 && (
                              <Award className={cn(
                                'h-5 w-5',
                                ranking.rank === 1 && 'text-yellow-400',
                                ranking.rank === 2 && 'text-gray-300',
                                ranking.rank === 3 && 'text-amber-600'
                              )} />
                            )}
                            <span className="font-bold text-lg">#{ranking.rank}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm font-mono text-gray-300">{formatAddress(ranking.user_id)}</code>
                          {ranking.display_name && (
                            <p className="text-xs text-gray-400 mt-1">{ranking.display_name}</p>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-purple-400" />
                            <span className="font-semibold text-purple-300">{ranking.post_score.toFixed(2)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{ranking.total_attestations}</TableCell>
                        <TableCell>
                          {ranking.verified_status ? (
                            <span className="px-2 py-1 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              Verified
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-500/20 text-gray-300 border border-gray-500/40">
                              Pending
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-400 text-xs">
                          {new Date(ranking.last_updated).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
    </main>
    </div>
  )
}
