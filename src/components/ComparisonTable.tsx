'use client'

import * as React from 'react'
import { Info } from 'lucide-react'
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
  details?: string
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
    isDrpAdvantage: true,
    details: 'DRP uses a dual consensus mechanism: Proof of Status verifies user identity and reputation, while Proof of Activity validates contributions. AI Elders monitor and verify all consensus activities, ensuring authenticity and preventing fraud. This hybrid approach combines human verification with AI oversight for maximum security and fairness.',
  },
  {
    feature: 'Energy Use',
    bitcoin: 'High',
    ethereum: 'Medium',
    polkadot: 'Low',
    solana: 'High',
    cardano: 'Low',
    drp: 'Ultra-Low (AI & Renewable Incentives)',
    isDrpAdvantage: true,
    details: 'DRP achieves ultra-low energy consumption through AI-optimized consensus algorithms that require minimal computational power. Additionally, the protocol incentivizes renewable energy usage by giving preference to nodes powered by clean energy sources. This results in 99% less energy consumption compared to traditional proof-of-work systems.',
  },
  {
    feature: 'Transaction Speed',
    bitcoin: '7 TPS',
    ethereum: '30 TPS',
    polkadot: '1,000 TPS',
    solana: '65,000 TPS',
    cardano: '250 TPS',
    drp: 'Adaptive TPS via AI Optimization',
    isDrpAdvantage: true,
    details: 'DRP features adaptive transaction throughput that scales dynamically based on network demand. AI systems analyze traffic patterns and optimize resource allocation in real-time, ensuring optimal performance without sacrificing security or decentralization. This allows DRP to handle peak loads efficiently while maintaining low latency.',
  },
  {
    feature: 'Governance',
    bitcoin: 'Core Devs',
    ethereum: 'DAO',
    polkadot: 'On-chain Voting',
    solana: 'Validator Council',
    cardano: 'Treasury Voting',
    drp: 'AI + Human Hybrid Governance',
    isDrpAdvantage: true,
    details: 'DRP implements a hybrid governance model where AI Elders analyze proposals for feasibility, security, and alignment with protocol values, while human participants vote on decisions. This creates a balanced system that leverages AI for analysis while maintaining human oversight and democratic participation. All governance decisions are transparent and recorded on-chain.',
  },
  {
    feature: 'Smart Contracts',
    bitcoin: 'No',
    ethereum: 'Yes',
    polkadot: 'Yes',
    solana: 'Yes',
    cardano: 'Yes',
    drp: 'AI-Verified Smart Logic',
    isDrpAdvantage: true,
    details: 'DRP supports smart contracts with AI verification capabilities. Before deployment, AI systems analyze smart contract code for vulnerabilities, gas optimization opportunities, and compliance with protocol standards. This proactive verification reduces the risk of exploits and ensures contracts operate efficiently and securely.',
  },
  {
    feature: 'AI Integration',
    bitcoin: 'None',
    ethereum: 'Minimal',
    polkadot: 'Minimal',
    solana: 'Minimal',
    cardano: 'Minimal',
    drp: 'Core Layer',
    isDrpAdvantage: true,
    details: 'AI is integrated at the core layer of DRP, not as an add-on feature. AI Elders are fundamental to consensus, verification, fraud detection, and network optimization. This deep integration enables capabilities like automated asset recovery (Project Lazarus), predictive scaling, and intelligent resource management that other blockchains cannot match.',
  },
  {
    feature: 'Focus',
    bitcoin: 'Currency',
    ethereum: 'dApps',
    polkadot: 'Interoperability',
    solana: 'Speed',
    cardano: 'Research',
    drp: 'Human Rights & Sustainability',
    isDrpAdvantage: true,
    details: 'DRP is specifically designed to advance human rights and promote sustainability. The protocol aligns with UN Sustainable Development Goals (SDGs) and prioritizes features that protect human dignity, promote economic fairness, and support environmental sustainability. This focus guides all protocol decisions and development priorities.',
  },
  {
    feature: 'Quantum Resistance',
    bitcoin: 'No',
    ethereum: 'Partial',
    polkadot: 'Partial',
    solana: 'No',
    cardano: 'Planned',
    drp: 'Yes (Post-Quantum Cryptography)',
    isDrpAdvantage: true,
    details: 'DRP uses NIST-approved post-quantum cryptographic algorithms (CRYSTALS-Kyber for key encapsulation and CRYSTALS-Dilithium for digital signatures) to protect against both classical and quantum computer attacks. This ensures long-term security even as quantum computing technology advances, future-proofing the protocol.',
  },
  {
    feature: 'Data Layer',
    bitcoin: 'Chain Only',
    ethereum: 'Layer 1 + 2',
    polkadot: 'Parachains',
    solana: 'Chain Only',
    cardano: 'Extended UTXO',
    drp: 'AI + ScyllaDB + IPFS Hybrid',
    isDrpAdvantage: true,
    details: 'DRP uses a hybrid data layer architecture combining AI for intelligent data management, ScyllaDB for high-performance distributed storage, and IPFS for decentralized content addressing. This combination provides fast access to frequently used data while maintaining decentralized storage for historical records and large files.',
  },
  {
    feature: 'Social Impact',
    bitcoin: 'Low',
    ethereum: 'Medium',
    polkadot: 'Medium',
    solana: 'Low',
    cardano: 'Medium',
    drp: 'High (SDG Aligned)',
    isDrpAdvantage: true,
    details: 'DRP is explicitly designed to support UN Sustainable Development Goals, particularly those related to human rights, economic growth, and environmental sustainability. The protocol enables transparent governance, fair economic participation, and sustainable practices that can scale globally to create positive social and environmental impact.',
  },
  {
    feature: 'Interoperability',
    bitcoin: 'Limited',
    ethereum: 'Bridges',
    polkadot: 'Parachains',
    solana: 'Limited',
    cardano: 'Planned',
    drp: 'AI-Automated Cross-Chain (Web3.js + MPC)',
    isDrpAdvantage: true,
    details: 'DRP features AI-automated cross-chain interoperability using Web3.js libraries and Multi-Party Computation (MPC) protocols. AI Elders facilitate seamless communication and asset transfers between DRP and other blockchains without requiring manual bridge setup. This enables true cross-chain DeFi and NFT interoperability.',
  }
]

interface ComparisonTableProps {
  className?: string
}

export function ComparisonTable({ className }: ComparisonTableProps) {
  const [hoveredFeature, setHoveredFeature] = React.useState<string | null>(null)
  const [expandedFeature, setExpandedFeature] = React.useState<string | null>(null)

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
              <React.Fragment key={row.feature}>
                <tr
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
                      {row.details && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setExpandedFeature(expandedFeature === row.feature ? null : row.feature)
                          }}
                          className="p-1 rounded-lg text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                          aria-label={`Show details for ${row.feature}`}
                        >
                          <Info className="h-4 w-4" />
                        </button>
                      )}
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
                {expandedFeature === row.feature && row.details && (
                  <tr>
                    <td colSpan={blockchains.length + 1} className="px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
                      <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {row.details}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
              {row.details && (
                <button
                  onClick={() => setExpandedFeature(expandedFeature === row.feature ? null : row.feature)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                  aria-label={`Show details for ${row.feature}`}
                >
                  <Info className="h-4 w-4" />
                </button>
              )}
            </h3>
            {expandedFeature === row.feature && row.details && (
              <div className="mb-3 p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg text-sm text-neutral-600 dark:text-neutral-400">
                {row.details}
              </div>
            )}
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
