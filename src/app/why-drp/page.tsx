'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, BarChart3, Table, Star, Shield, Zap, Users, Globe, Brain, Leaf } from 'lucide-react'
import { ComparisonTable } from '@/components/ComparisonTable'
import { ComparisonChart } from '@/components/ComparisonChart'
import { cn } from '@/lib/utils'

const drpAdvantages = [
  {
    icon: Brain,
    title: 'AI-First Architecture',
    description: 'Built with artificial intelligence at its core, not as an afterthought',
    color: 'text-purple-500'
  },
  {
    icon: Shield,
    title: 'Quantum-Safe Security',
    description: 'Post-quantum cryptography protecting against future threats',
    color: 'text-blue-500'
  },
  {
    icon: Leaf,
    title: 'Ultra-Low Energy',
    description: 'AI-optimized consensus reducing energy consumption by 99%',
    color: 'text-green-500'
  },
  {
    icon: Users,
    title: 'Human Rights Focus',
    description: 'Designed specifically to protect and advance human rights globally',
    color: 'text-pink-500'
  },
  {
    icon: Globe,
    title: 'Global Interoperability',
    description: 'AI-automated cross-chain communication with any blockchain',
    color: 'text-cyan-500'
  },
  {
    icon: Zap,
    title: 'Adaptive Performance',
    description: 'Dynamic TPS scaling based on network demand and AI optimization',
    color: 'text-yellow-500'
  }
]

export default function WhyDRPPage() {
  const [viewMode, setViewMode] = React.useState<'table' | 'chart'>('table')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-green-700 dark:text-green-300 border border-green-200/50 dark:border-green-700/50">
              🌍 Why Choose DRP?
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up delay-200">
            A New Standard for
            <span className="block bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent animate-gradient-x">
              Trust, Fairness, and Sustainability
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up delay-300">
            DRP redefines what a blockchain can achieve — blending AI, ethics, and decentralization 
            to empower every human being with transparent, secure, and sustainable technology.
          </p>
        </div>

        {/* DRP Advantages */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 animate-fade-in-up delay-400">
            What Makes DRP Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drpAdvantages.map((advantage, index) => (
              <div
                key={advantage.title}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <div className="flex items-center gap-x-4 mb-4">
                  <div className={cn(
                    "p-3 rounded-lg bg-gradient-to-br from-white/20 to-white/10 group-hover:scale-110 transition-transform duration-300",
                    advantage.color
                  )}>
                    <advantage.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {advantage.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up delay-600">
              DRP vs. Other Blockchains
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up delay-700">
              See how DRP compares to major blockchain platforms across key metrics
            </p>
            
            {/* View Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-1 border border-white/20 dark:border-gray-700/50">
                <button
                  onClick={() => setViewMode('table')}
                  className={cn(
                    "flex items-center gap-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    viewMode === 'table'
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Table className="h-4 w-4" />
                  Table View
                </button>
                <button
                  onClick={() => setViewMode('chart')}
                  className={cn(
                    "flex items-center gap-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    viewMode === 'chart'
                      ? "bg-blue-500 text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <BarChart3 className="h-4 w-4" />
                  Chart View
                </button>
              </div>
            </div>
          </div>

          {/* Comparison Content */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8 animate-fade-in-up delay-800">
            {viewMode === 'table' ? (
              <ComparisonTable />
            ) : (
              <ComparisonChart />
            )}
          </div>
        </div>

        {/* Key Metrics Highlight */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white text-center animate-fade-in-up delay-900">
            <h3 className="text-2xl font-bold mb-4">DRP Performance Highlights</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold mb-2">99%</div>
                <div className="text-sm opacity-90">Less Energy Use</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-90">AI Integration</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">98%</div>
                <div className="text-sm opacity-90">Sustainability Score</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100%</div>
                <div className="text-sm opacity-90">Quantum Resistant</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up delay-1000">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Experience the Future of Blockchain?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the DRP ecosystem and be part of a blockchain revolution that prioritizes 
            human rights, sustainability, and artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/whitepaper"
              className="group inline-flex items-center gap-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Read the Full DRP Whitepaper
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold hover:bg-white dark:hover:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
            >
              Start Learning DRP
              <Star className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
