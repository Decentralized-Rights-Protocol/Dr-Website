'use client'

import * as React from 'react'
import { BarChart3, Table, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComparisonData {
  feature: string
  bitcoin: string
  ethereum: string
  polkadot: string
  solana: string
  cardano: string
  drp: string
  isDrpAdvantage?: boolean
}

const comparisonData: ComparisonData[] = [
  {
    feature: 'Consensus',
    bitcoin: 'Proof of Work',
    ethereum: 'Proof of Stake',
    polkadot: 'Nominated PoS',
    solana: 'Proof of History',
    cardano: 'Ouroboros PoS',
    drp: 'Proof of Status + Proof of Activity (AI-Verified)',
    isDrpAdvantage: true
  },
  {
    feature: 'Energy Use',
    bitcoin: 'High',
    ethereum: 'Medium',
    polkadot: 'Low',
    solana: 'High',
    cardano: 'Low',
    drp: 'Ultra-Low (AI & Renewable Incentives)',
    isDrpAdvantage: true
  },
  {
    feature: 'Transaction Speed',
    bitcoin: '7 TPS',
    ethereum: '30 TPS',
    polkadot: '1,000 TPS',
    solana: '65,000 TPS',
    cardano: '250 TPS',
    drp: 'Adaptive TPS via AI Optimization',
    isDrpAdvantage: true
  },
  {
    feature: 'Governance',
    bitcoin: 'Core Devs',
    ethereum: 'DAO',
    polkadot: 'On-chain Voting',
    solana: 'Validator Council',
    cardano: 'Treasury Voting',
    drp: 'AI + Human Hybrid Governance',
    isDrpAdvantage: true
  },
  {
    feature: 'Smart Contracts',
    bitcoin: 'No',
    ethereum: 'Yes',
    polkadot: 'Yes',
    solana: 'Yes',
    cardano: 'Yes',
    drp: 'AI-Verified Smart Logic',
    isDrpAdvantage: true
  },
  {
    feature: 'AI Integration',
    bitcoin: 'None',
    ethereum: 'Minimal',
    polkadot: 'Minimal',
    solana: 'Minimal',
    cardano: 'Minimal',
    drp: 'Core Layer',
    isDrpAdvantage: true
  },
  {
    feature: 'Focus',
    bitcoin: 'Currency',
    ethereum: 'dApps',
    polkadot: 'Interoperability',
    solana: 'Speed',
    cardano: 'Research',
    drp: 'Human Rights & Sustainability',
    isDrpAdvantage: true
  },
  {
    feature: 'Quantum Resistance',
    bitcoin: 'No',
    ethereum: 'Partial',
    polkadot: 'Partial',
    solana: 'No',
    cardano: 'Planned',
    drp: 'Yes (Post-Quantum Cryptography)',
    isDrpAdvantage: true
  },
  {
    feature: 'Data Layer',
    bitcoin: 'Chain Only',
    ethereum: 'Layer 1 + 2',
    polkadot: 'Parachains',
    solana: 'Chain Only',
    cardano: 'Extended UTXO',
    drp: 'AI + ScyllaDB + IPFS Hybrid',
    isDrpAdvantage: true
  },
  {
    feature: 'Social Impact',
    bitcoin: 'Low',
    ethereum: 'Medium',
    polkadot: 'Medium',
    solana: 'Low',
    cardano: 'Medium',
    drp: 'High (SDG Aligned)',
    isDrpAdvantage: true
  },
  {
    feature: 'Interoperability',
    bitcoin: 'Limited',
    ethereum: 'Bridges',
    polkadot: 'Parachains',
    solana: 'Limited',
    cardano: 'Planned',
    drp: 'AI-Automated Cross-Chain (Web3.js + MPC)',
    isDrpAdvantage: true
  }
]

interface ComparisonTableProps {
  className?: string
}

export function ComparisonTable({ className }: ComparisonTableProps) {
  const [hoveredFeature, setHoveredFeature] = React.useState<string | null>(null)

  const blockchains = [
    { key: 'bitcoin', name: 'Bitcoin', color: 'text-orange-500' },
    { key: 'ethereum', name: 'Ethereum', color: 'text-blue-500' },
    { key: 'polkadot', name: 'Polkadot', color: 'text-pink-500' },
    { key: 'solana', name: 'Solana', color: 'text-purple-500' },
    { key: 'cardano', name: 'Cardano', color: 'text-blue-600' },
    { key: 'drp', name: 'DRP', color: 'text-green-500' }
  ]

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-700">
              <th className="text-left py-4 px-6 font-semibold text-neutral-900 dark:text-white">
                Feature
              </th>
              {blockchains.map((blockchain) => (
                <th
                  key={blockchain.key}
                  className={cn(
                    "text-center py-4 px-4 font-semibold transition-colors",
                    blockchain.color,
                    blockchain.key === 'drp' && "bg-green-50 dark:bg-green-900/20"
                  )}
                >
                  {blockchain.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr
                key={row.feature}
                className={cn(
                  "border-b border-neutral-100 dark:border-neutral-800 transition-colors",
                  hoveredFeature === row.feature && "bg-neutral-50 dark:bg-neutral-800/50"
                )}
                onMouseEnter={() => setHoveredFeature(row.feature)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <td className="py-4 px-6 font-medium text-neutral-900 dark:text-white">
                  <div className="flex items-center gap-x-2">
                    {row.feature}
                    <Info className="h-4 w-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 cursor-help" />
                  </div>
                </td>
                {blockchains.map((blockchain) => (
                  <td
                    key={blockchain.key}
                    className={cn(
                      "text-center py-4 px-4 text-sm transition-all duration-200",
                      blockchain.key === 'drp' && row.isDrpAdvantage
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-medium"
                        : "text-neutral-600 dark:text-neutral-400",
                      blockchain.key === 'drp' && "border-l-2 border-green-500"
                    )}
                  >
                    <span className={cn(
                      "inline-block px-2 py-1 rounded-md text-xs",
                      blockchain.key === 'drp' && row.isDrpAdvantage
                        ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                        : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                    )}>
                      {row[blockchain.key as keyof ComparisonData]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {comparisonData.map((row) => (
          <div
            key={row.feature}
            className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-x-2">
              {row.feature}
              <Info className="h-4 w-4 text-neutral-400" />
            </h3>
            <div className="space-y-2">
              {blockchains.map((blockchain) => (
                <div
                  key={blockchain.key}
                  className={cn(
                    "flex justify-between items-center p-2 rounded-md transition-colors",
                    blockchain.key === 'drp' && row.isDrpAdvantage
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : "bg-neutral-50 dark:bg-neutral-700/50"
                  )}
                >
                  <span className={cn(
                    "font-medium text-sm",
                    blockchain.color
                  )}>
                    {blockchain.name}
                  </span>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded",
                    blockchain.key === 'drp' && row.isDrpAdvantage
                      ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200"
                      : "bg-neutral-100 dark:bg-neutral-600 text-neutral-700 dark:text-neutral-300"
                  )}>
                    {row[blockchain.key as keyof ComparisonData]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
