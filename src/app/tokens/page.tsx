'use client'

import { RightsAnimation } from '@/components/tokens/RightsAnimation'
import { TokenCard } from '@/components/tokens/TokenCard'
import { TokenComparisonTable } from '@/components/tokens/TokenComparisonTable'
import { QuantumSafeSection } from '@/components/tokens/QuantumSafeSection'
import { Zap, Link as LinkIcon, Award, Building2, Sparkles, Shield } from 'lucide-react'
import { ParticleBackground } from '@/components/particle-background'
import Link from 'next/link'

export default function TokensPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
        <ParticleBackground />
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-bounce delay-500"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in-up">
              DRP Token
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Ecosystem
              </span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-neutral-300 animate-fade-in-up delay-200">
              Powering Rights, Integrity, Governance, Humanity, Trust and Sustainability
            </p>

            {/* CTAs */}
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up delay-300">
              <Link
                href="/whitepaper"
                className="group rounded-md bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg hover:bg-neutral-50 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Read Whitepaper
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </Link>
              <Link
                href="/docs"
                className="group text-sm font-semibold leading-6 text-white hover:text-neutral-300 transition-colors duration-300"
              >
                Explore DRP <span className="group-hover:translate-x-1 transition-transform inline-block" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHTS Animation */}
        <div className="relative mt-16">
          <RightsAnimation />
        </div>
      </section>

      {/* Token Descriptions Section */}
      <section className="py-24 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Two Tokens, One Vision
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-400">
              A dual-token system designed to power the DRP ecosystem with utility and governance
            </p>
          </div>

          {/* Token Cards Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* $DeRi Card */}
            <TokenCard
              name="$DeRi"
              symbol="Utility Token"
              description="Powers on-chain actions, activity proofs, transaction validation fees, and participation in PoA/PoAT. Earned through verified work, clean energy usage, learning proofs, and community contributions. Used to access DRP Apps, services, and third-party integrations."
              icon={<Zap className="w-8 h-8 text-white" />}
              features={[
                { icon: <Zap className="w-5 h-5" />, label: 'Utility & Transactions' },
                { icon: <LinkIcon className="w-5 h-5" />, label: 'On-chain Actions' },
                { icon: <Award className="w-5 h-5" />, label: 'Activity Rewards' },
              ]}
              variant="deri"
              glowColor="blue"
            />

            {/* $RIGHTS Card */}
            <TokenCard
              name="$RIGHTS"
              symbol="Governance Token"
              description="Represents the six pillars: Rights, Integrity, Governance, Humanity, Trust, Sustainability. Enables voting and decision-making across the DRP ecosystem. Used by community panels, Elders, and the AI governance system to shape the protocol&apos;s future."
              icon={<Sparkles className="w-8 h-8 text-white" />}
              features={[
                { icon: <Building2 className="w-5 h-5" />, label: 'Governance & Voting' },
                { icon: <Sparkles className="w-5 h-5" />, label: 'AI Alignment' },
                { icon: <Shield className="w-5 h-5" />, label: 'Protocol Rules' },
              ]}
              variant="rights"
              glowColor="amber"
            />
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-24 bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Token Comparison
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-400">
              Understanding the distinct roles and features of each DRP token
            </p>
          </div>

          <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 lg:p-12">
            <TokenComparisonTable />
          </div>
        </div>
      </section>

      {/* Quantum-Safe Section */}
      <QuantumSafeSection />

      {/* Footer CTA */}
      <section className="py-24" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              Building the World&apos;s First
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Rights-Driven Decentralized Civilization
              </span>
            </h2>
            <p className="text-xl leading-8 text-neutral-300 mb-10">
              Join us in creating a future where human rights are protected, verified, and advanced through blockchain technology.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/roadmap"
                className="group rounded-md bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Join Testnet
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </Link>
              <Link
                href="/community"
                className="group rounded-md bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white border border-white/20 hover:bg-white/20 hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Follow Development
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </Link>
              <Link
                href="/docs"
                className="group rounded-md bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-semibold text-white border border-white/20 hover:bg-white/20 hover:border-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

