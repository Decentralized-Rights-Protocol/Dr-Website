'use client'

import * as React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { cn } from '@/lib/utils'

const performanceData = [
  {
    blockchain: 'Bitcoin',
    security: 95,
    speed: 20,
    energy: 30,
    governance: 40,
    sustainability: 25,
    ai: 0,
    social_impact: 30,
    interoperability: 20,
    quantum_resistance: 0,
    color: '#f97316'
  },
  {
    blockchain: 'Ethereum',
    security: 90,
    speed: 40,
    energy: 60,
    governance: 80,
    sustainability: 50,
    ai: 10,
    social_impact: 60,
    interoperability: 70,
    quantum_resistance: 30,
    color: '#3b82f6'
  },
  {
    blockchain: 'Polkadot',
    security: 85,
    speed: 80,
    energy: 75,
    governance: 85,
    sustainability: 60,
    ai: 15,
    social_impact: 50,
    interoperability: 95,
    quantum_resistance: 40,
    color: '#ec4899'
  },
  {
    blockchain: 'Solana',
    security: 80,
    speed: 95,
    energy: 40,
    governance: 50,
    sustainability: 35,
    ai: 20,
    social_impact: 40,
    interoperability: 30,
    quantum_resistance: 10,
    color: '#8b5cf6'
  },
  {
    blockchain: 'Cardano',
    security: 88,
    speed: 50,
    energy: 80,
    governance: 75,
    sustainability: 70,
    ai: 25,
    social_impact: 65,
    interoperability: 60,
    quantum_resistance: 50,
    color: '#2563eb'
  },
  {
    blockchain: 'DRP',
    security: 98,
    speed: 90,
    energy: 95,
    governance: 95,
    sustainability: 98,
    ai: 100,
    social_impact: 100,
    interoperability: 90,
    quantum_resistance: 100,
    color: '#10b981'
  }
]

const radarData = [
  {
    metric: 'Security',
    Bitcoin: 95,
    Ethereum: 90,
    Polkadot: 85,
    Solana: 80,
    Cardano: 88,
    DRP: 98
  },
  {
    metric: 'Speed',
    Bitcoin: 20,
    Ethereum: 40,
    Polkadot: 80,
    Solana: 95,
    Cardano: 50,
    DRP: 90
  },
  {
    metric: 'Energy',
    Bitcoin: 30,
    Ethereum: 60,
    Polkadot: 75,
    Solana: 40,
    Cardano: 80,
    DRP: 95
  },
  {
    metric: 'Governance',
    Bitcoin: 40,
    Ethereum: 80,
    Polkadot: 85,
    Solana: 50,
    Cardano: 75,
    DRP: 95
  },
  {
    metric: 'Sustainability',
    Bitcoin: 25,
    Ethereum: 50,
    Polkadot: 60,
    Solana: 35,
    Cardano: 70,
    DRP: 98
  },
  {
    metric: 'AI Integration',
    Bitcoin: 0,
    Ethereum: 10,
    Polkadot: 15,
    Solana: 20,
    Cardano: 25,
    DRP: 100
  },
  {
    metric: 'Social Impact',
    Bitcoin: 30,
    Ethereum: 60,
    Polkadot: 50,
    Solana: 40,
    Cardano: 65,
    DRP: 100
  },
  {
    metric: 'Interoperability',
    Bitcoin: 20,
    Ethereum: 70,
    Polkadot: 95,
    Solana: 30,
    Cardano: 60,
    DRP: 90
  },
  {
    metric: 'Quantum Resistance',
    Bitcoin: 0,
    Ethereum: 30,
    Polkadot: 40,
    Solana: 10,
    Cardano: 50,
    DRP: 100
  }
]

interface ComparisonChartProps {
  className?: string
  chartType?: 'bar' | 'radar'
}

export function ComparisonChart({ className, chartType = 'bar' }: ComparisonChartProps) {
  const [activeChart, setActiveChart] = React.useState<'bar' | 'radar'>(chartType)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-neutral-800 p-3 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
          <p className="font-semibold text-neutral-900 dark:text-white">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey}: {entry.value}%
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Chart Type Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
          <button
            onClick={() => setActiveChart('bar')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              activeChart === 'bar'
                ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            )}
          >
            Bar Chart
          </button>
          <button
            onClick={() => setActiveChart('radar')}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
              activeChart === 'radar'
                ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            )}
          >
            Radar Chart
          </button>
        </div>
      </div>

      {/* Bar Chart */}
      {activeChart === 'bar' && (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="blockchain" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
                label={{ value: 'Score (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="security" 
                name="Security"
                fill="#ef4444"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="speed" 
                name="Speed"
                fill="#3b82f6"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="energy" 
                name="Energy Efficiency"
                fill="#10b981"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="governance" 
                name="Governance"
                fill="#8b5cf6"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="sustainability" 
                name="Sustainability"
                fill="#06b6d4"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="ai" 
                name="AI Integration"
                fill="#f59e0b"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="social_impact" 
                name="Social Impact"
                fill="#ec4899"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Radar Chart */}
      {activeChart === 'radar' && (
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 10 }}
                tickCount={6}
              />
              <Radar
                name="Bitcoin"
                dataKey="Bitcoin"
                stroke="#f97316"
                fill="#f97316"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="Ethereum"
                dataKey="Ethereum"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="Polkadot"
                dataKey="Polkadot"
                stroke="#ec4899"
                fill="#ec4899"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="Solana"
                dataKey="Solana"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="Cardano"
                dataKey="Cardano"
                stroke="#2563eb"
                fill="#2563eb"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="DRP"
                dataKey="DRP"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.2}
                strokeWidth={3}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {performanceData.map((blockchain) => (
          <div key={blockchain.blockchain} className="flex items-center gap-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: blockchain.color }}
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {blockchain.blockchain}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
