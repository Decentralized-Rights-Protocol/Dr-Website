'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Globe2, Heart, Shield, Users, Zap, Award, TrendingUp, Smartphone, Lock, Sparkles } from 'lucide-react'
import { useWallet } from '@/hooks/useWallet'

export default function HomePage() {
  const { address, connect, isConnecting } = useWallet()
  const [featureHover, setFeatureHover] = useState<string | null>(null)

  const features = [
    {
      id: 'rights',
      icon: <Heart className="h-6 w-6" />,
      title: 'Protect Human Rights',
      description: 'Document and verify activities that advance human rights, democracy, and social justice.',
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50 dark:bg-rose-950/20'
    },
    {
      id: 'verify',
      icon: <Shield className="h-6 w-6" />,
      title: 'AI-Powered Verification',
      description: 'Get instant verification of your contributions with our advanced AI assessment system.',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      id: 'reward',
      icon: <Award className="h-6 w-6" />,
      title: 'Earn Rewards',
      description: 'Receive $DeRi tokens for verified activities and $RIGHTS for verified status.',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20'
    },
    {
      id: 'impact',
      icon: <Globe2 className="h-6 w-6" />,
      title: 'Track Impact',
      description: 'See your real-world impact through verified activities and community contributions.',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20'
    }
  ]

  const stats = [
    { label: 'Verified Activities', value: '182K+', trend: '+12%' },
    { label: 'Active Users', value: '38K+', trend: '+24%' },
    { label: 'Tokens Rewarded', value: '4.2M', trend: '+18%' },
    { label: 'Countries', value: '156', trend: '+8' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 px-4 pb-20 pt-12 text-white sm:px-6 lg:px-8 lg:pt-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Empowering Human Rights Through Blockchain</span>
            </div>

            {/* Main Headline */}
            <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your Rights, Your Proof,
              <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
                Your Impact
              </span>
            </h1>

            <p className="mb-8 text-lg leading-relaxed text-primary-100 sm:text-xl lg:text-2xl">
              Document and verify activities that advance human rights. Earn rewards for your contributions.
              Build a decentralized future where every voice matters.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {address ? (
              <Link
                href="/proofs/activities"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-2xl transition-all hover:scale-105 hover:shadow-3xl sm:px-8 sm:py-4 sm:text-base"
              >
                Submit Your Proof
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <button
                onClick={async () => {
                  try {
                    await connect()
                  } catch (error) {
                    console.error('Failed to connect wallet:', error)
                    alert('Please install a Web3 wallet like MetaMask to continue')
                  }
                }}
                disabled={isConnecting}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-2xl transition-all hover:scale-105 hover:shadow-3xl disabled:opacity-50 sm:px-8 sm:py-4 sm:text-base"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet to Start'}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            )}
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Learn How It Works
              </Link>
            </div>

            {/* Mobile Notice */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-primary-200 sm:hidden">
              <Smartphone className="h-4 w-4" />
              <span>Optimized for mobile experience</span>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-20">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <div className="text-2xl font-bold sm:text-3xl lg:text-4xl">{stat.value}</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-primary-200 sm:text-sm">
                  <span>{stat.label}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-200">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-16 dark:bg-neutral-950 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl lg:text-5xl">
              How DRP Empowers You
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              A platform built for activists, organizers, and changemakers
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                onMouseEnter={() => setFeatureHover(feature.id)}
                onMouseLeave={() => setFeatureHover(null)}
                className={`group relative overflow-hidden rounded-2xl border-2 border-neutral-200 p-6 transition-all hover:scale-105 hover:shadow-xl dark:border-neutral-800 ${featureHover === feature.id ? 'border-primary-500 dark:border-primary-500' : ''}`}
              >
                <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} p-3 text-white shadow-lg transition-transform group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity group-hover:opacity-5`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-neutral-50 to-primary-50/30 px-4 py-16 dark:from-neutral-900 dark:to-primary-950/20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              Three simple steps to start making an impact
            </p>
          </div>

          <div className="mt-12 space-y-8">
            {[
              {
                step: '1',
                title: 'Submit Your Activity',
                description: 'Document your human rights work, community service, or advocacy activities with photos, videos, or documents.',
                icon: <Zap className="h-6 w-6" />,
                color: 'from-blue-500 to-indigo-600'
              },
              {
                step: '2',
                title: 'AI Verification',
                description: 'Our AI system verifies your submission and assesses its impact on human rights and social justice.',
                icon: <Shield className="h-6 w-6" />,
                color: 'from-emerald-500 to-teal-600'
              },
              {
                step: '3',
                title: 'Earn & Impact',
                description: 'Receive $DeRi tokens as rewards and $RIGHTS for verified status. Track your impact on the leaderboard.',
                icon: <Award className="h-6 w-6" />,
                color: 'from-amber-500 to-orange-600'
              }
            ].map((item, idx) => (
              <div
                key={item.step}
                className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-lg dark:bg-neutral-900 sm:flex-row sm:items-center sm:gap-8 sm:p-8"
              >
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-lg`}>
                  <span className="text-2xl font-bold">{item.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </div>
                {idx < 2 && (
                  <ArrowRight className="hidden h-6 w-6 text-neutral-400 sm:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy */}
      <section className="bg-white px-4 py-16 dark:bg-neutral-950 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border-2 border-primary-200 bg-gradient-to-br from-primary-50 to-purple-50 p-8 dark:border-primary-800 dark:from-primary-950/30 dark:to-purple-950/30 sm:p-12">
            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
              <div className={`mb-6 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-xl sm:mb-0 sm:mr-8`}>
                <Lock className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
                  Privacy-First Design
                </h3>
                <p className="mt-3 text-neutral-700 dark:text-neutral-300">
                  Your data is encrypted and stored on IPFS. Only you control access. Built on decentralized infrastructure for maximum security and privacy.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span>End-to-end encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span>Decentralized storage</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <span>You own your data</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-600 to-purple-700 px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Ready to Make an Impact?
          </h2>
          <p className="mt-4 text-lg text-primary-100 sm:text-xl">
            Join thousands of activists and changemakers building a decentralized future for human rights.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {address ? (
              <Link
                href="/proofs/activities"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-2xl transition-all hover:scale-105 sm:px-8 sm:py-4 sm:text-base"
              >
                Submit Your First Proof
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <button
                onClick={async () => {
                  try {
                    await connect()
                  } catch (error) {
                    console.error('Failed to connect wallet:', error)
                    alert('Please install a Web3 wallet like MetaMask to continue')
                  }
                }}
                disabled={isConnecting}
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-primary-700 shadow-2xl transition-all hover:scale-105 disabled:opacity-50 sm:px-8 sm:py-4 sm:text-base"
              >
                {isConnecting ? 'Connecting...' : 'Get Started Now'}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            )}
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Users className="h-5 w-5" />
              View Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
