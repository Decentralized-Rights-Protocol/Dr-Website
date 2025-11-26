'use client'

import { Hash, Clock, Copy, Check, CheckCircle, Activity, ShieldCheck } from 'lucide-react'
import { Card } from './ui/Card'
import { useState } from 'react'
import { Transaction } from '@/lib/api'
import { cn } from '@/lib/utils'

interface TransactionCardProps {
  transaction: Transaction
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatHash = (hash: string, length: number = 8) => {
    if (hash.length <= length * 2) return hash
    return `${hash.slice(0, length)}...${hash.slice(-length)}`
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getStatusIcon = (type: string) => {
    if (type === 'activity') return <Activity className="h-4 w-4" />
    if (type === 'status') return <ShieldCheck className="h-4 w-4" />
    return <Hash className="h-4 w-4" />
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      failed: 'bg-red-500/20 text-red-300 border-red-500/40',
      pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
    }
    return styles[status as keyof typeof styles] || 'bg-gray-500/20 text-gray-300 border-gray-500/40'
  }

  return (
    <Card className="hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              {getStatusIcon(transaction.type)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Hash className="h-3 w-3 text-purple-400" />
                <code className="text-xs font-mono text-purple-300">{formatHash(transaction.tx_hash)}</code>
                <button
                  onClick={() => copyToClipboard(transaction.tx_hash)}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Block #{transaction.block_number}
              </p>
            </div>
          </div>
          <span className={cn('px-3 py-1 rounded-full text-xs font-semibold border', getStatusBadge(transaction.status))}>
            {transaction.status}
          </span>
        </div>

        {/* Type Badge */}
        <div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
            <Activity className="h-3 w-3" />
            {transaction.type}
          </span>
        </div>

        {/* From/To */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-purple-500/10">
          <div>
            <p className="text-xs text-gray-500 mb-1">From</p>
            <code className="text-xs font-mono text-gray-300">{formatAddress(transaction.from)}</code>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">To</p>
            <code className="text-xs font-mono text-gray-300">{formatAddress(transaction.to)}</code>
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-purple-500/10">
          <Clock className="h-3 w-3" />
          <span>{new Date(transaction.timestamp).toLocaleString()}</span>
        </div>
      </div>
    </Card>
  )
}

