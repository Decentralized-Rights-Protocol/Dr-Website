'use client'

import * as React from 'react'
import { Shield, Brain, Zap, Users, Globe, Lock, Cpu, Network } from 'lucide-react'

const features = [
  {
    name: 'Quantum-Safe Security',
    description: 'Built with NIST-approved CRYSTALS-Kyber and CRYSTALS-Dilithium algorithms for future-proof security against quantum attacks.',
    icon: Shield,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'AI-Verified Consensus',
    description: 'Proof of Status & Proof of Activities ensure trust by verifying real human effort with advanced AI systems.',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Sustainability-First',
    description: 'Rewards participants for using clean energy and sustainable resources, promoting environmental responsibility.',
    icon: Zap,
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Human Rights Centered',
    description: 'Dual-token model with $RIGHTS for governance and $DeRi for utility, prioritizing human dignity and fairness.',
    icon: Users,
    color: 'from-orange-500 to-red-500',
  },
  {
    name: 'Global Impact',
    description: 'Designed to accelerate UN Sustainable Development Goals and protect human rights worldwide.',
    icon: Globe,
    color: 'from-indigo-500 to-blue-500',
  },
  {
    name: 'Transparent Governance',
    description: 'Decentralized decision-making with community-driven governance and transparent voting mechanisms.',
    icon: Lock,
    color: 'from-gray-500 to-slate-500',
  },
  {
    name: 'AI Elders (Project Lazarus)',
    description: 'Cross-chain AI agents that ethically recover lost or abandoned digital assets with advanced machine learning.',
    icon: Cpu,
    color: 'from-violet-500 to-purple-500',
  },
  {
    name: 'Modular Architecture',
    description: 'High-performance C++ core with modular blockchain architecture for scalability and flexibility.',
    icon: Network,
    color: 'from-teal-500 to-cyan-500',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Revolutionary Features
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
            DRP combines cutting-edge blockchain technology with AI verification to create a platform that truly serves humanity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={`group relative bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-neutral-200/50 dark:border-neutral-700/50 animate-fade-in-up hover-lift`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {feature.name}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
              
              {/* Animated background gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
        
        {/* Enhanced call to action */}
        <div className="mt-16 text-center animate-fade-in-up delay-1000">
          <div className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl text-white font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Explore the Technology
              <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
