'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, Globe2, Shield, Users, Zap, Award, TrendingUp, Smartphone, Lock, Sparkles, Activity, Fingerprint } from 'lucide-react'
import { useQuery } from 'convex/react'
import { useWallet } from '@/hooks/useWallet'
import { api } from '../../convex/_generated/api'
import { motion } from 'framer-motion'

export default function HomePage() {
  const { address, connect, isConnecting } = useWallet()
  const [featureHover, setFeatureHover] = useState<string | null>(null)
  const snapshot = useQuery(api.metrics.getEcosystemSnapshot, {})

  const features = [
    {
      id: 'rights',
      icon: <Fingerprint className="h-6 w-6" />,
      title: 'Identity Protection',
      description: 'Securely document human rights activities with end-to-end encryption and decentralized storage.',
      color: 'from-drp-blue to-indigo-600',
      bgColor: 'bg-drp-blue/10'
    },
    {
      id: 'verify',
      icon: <Shield className="h-6 w-6" />,
      title: 'AI-Powered Proof',
      description: 'Our proprietary AI verifies the authenticity and impact of your contributions in real-time.',
      color: 'from-drp-green to-emerald-600',
      bgColor: 'bg-drp-green/10'
    },
    {
      id: 'reward',
      icon: <Award className="h-6 w-6" />,
      title: 'Tokenized Impact',
      description: 'Earn $DeRi tokens and $RIGHTS status for your verified commitment to social justice.',
      color: 'from-drp-orange to-red-600',
      bgColor: 'bg-drp-orange/10'
    },
    {
      id: 'impact',
      icon: <Activity className="h-6 w-6" />,
      title: 'Real-time Impact',
      description: 'Monitor global human rights improvements through our decentralized verification network.',
      color: 'from-drp-yellow to-drp-orange',
      bgColor: 'bg-drp-yellow/10'
    }
  ]

  const stats = [
    { label: 'Verified Activities', value: snapshot ? `${snapshot.verifiedActivities}` : '1,284', trend: '+12% this week' },
    { label: 'Active Guardians', value: snapshot ? `${snapshot.activeUsers}` : '852', trend: 'Live nodes' },
    { label: 'DeRi Distributed', value: snapshot ? `${snapshot.rewardedActions}` : '45.2k', trend: 'Community pool' },
    { label: 'Global Proposals', value: snapshot ? `${snapshot.activeProposals}` : '24', trend: 'Active voting' }
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 pb-20 pt-12 text-neutral-900 dark:text-white sm:px-6 lg:px-8 lg:pt-24">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-drp-blue/10 blur-[120px]" />
        <div className="absolute top-1/4 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-drp-green/5 blur-[100px]" />
        
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col items-center lg:flex-row lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-drp-blue/20 bg-drp-blue/5 px-4 py-2 text-sm font-medium text-drp-blue backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4" />
                <span>Next Generation Human Rights Protocol</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
              >
                Your Rights,
                <span className="block text-drp-blue">
                  Verified by Truth.
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-10 text-lg leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-xl lg:max-w-2xl"
              >
                DRP is the decentralized infrastructure for documenting, verifying, and rewarding human rights activities. Join the movement to build a more just and transparent world.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
              >
                {address ? (
                  <Link
                    href="/proofs/activities"
                    className="group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-drp-blue px-8 py-4 text-base font-bold text-white shadow-xl shadow-drp-blue/30 transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
                  >
                    <span className="relative z-10">Submit Your Proof</span>
                    <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Link>
                ) : (
                  <button
                    onClick={async () => {
                      try {
                        await connect()
                      } catch (error) {
                        console.error('Failed to connect wallet:', error)
                      }
                    }}
                    disabled={isConnecting}
                    className="group relative flex items-center gap-2 overflow-hidden rounded-2xl bg-drp-blue px-8 py-4 text-base font-bold text-white shadow-xl shadow-drp-blue/30 transition-all hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-50"
                  >
                    <span className="relative z-10">{isConnecting ? 'Connecting...' : 'Connect to Start'}</span>
                    <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </button>
                )}
                <Link
                  href="/learn"
                  className="inline-flex items-center gap-2 rounded-2xl border-2 border-neutral-200 bg-white/50 px-8 py-4 text-base font-bold text-neutral-900 backdrop-blur-md transition-all hover:border-drp-blue hover:bg-white dark:border-neutral-800 dark:bg-drp-dark/50 dark:text-white dark:hover:bg-drp-dark"
                >
                  Explore Protocol
                </Link>
              </motion.div>
            </div>

            {/* Hero Image/Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-16 relative flex-1 lg:mt-0"
            >
              <div className="relative mx-auto w-72 h-72 sm:w-96 sm:h-96">
                <div className="absolute inset-0 animate-pulse-slow rounded-full bg-drp-blue/20 blur-3xl" />
                <div className="relative z-10 flex h-full w-full items-center justify-center rounded-[2.5rem] bg-drp-dark shadow-2xl ring-1 ring-white/20 overflow-hidden">
                  <Image 
                    src="/logo.png" 
                    alt="DRP Protocol" 
                    width={400}
                    height={400}
                    className="object-cover opacity-90 transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-drp-dark/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="h-4 w-4 text-drp-green" />
                      <span className="text-xs font-bold uppercase tracking-widest text-drp-green">Live Network</span>
                    </div>
                    <p className="text-sm font-medium text-neutral-300">Decentralized Rights Protocol v1.2</p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 rounded-2xl bg-white p-4 shadow-xl dark:bg-neutral-800"
                >
                  <Shield className="h-8 w-8 text-drp-blue" />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-xl dark:bg-neutral-800"
                >
                  <Award className="h-8 w-8 text-drp-orange" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="group relative rounded-3xl border border-neutral-200 bg-white/50 p-6 backdrop-blur-sm transition-all hover:border-drp-blue/50 hover:bg-white dark:border-neutral-800 dark:bg-drp-dark/50 dark:hover:bg-drp-dark"
              >
                <div className="text-3xl font-black text-neutral-900 dark:text-white sm:text-4xl">{stat.value}</div>
                <div className="mt-2 flex flex-col gap-1">
                  <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">{stat.label}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-drp-green">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-neutral-50 px-4 py-24 dark:bg-neutral-950/50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-neutral-900 dark:text-white sm:text-5xl">
              Powering the Change.
            </h2>
            <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              A comprehensive suite of tools for activists, researchers, and human rights defenders.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onMouseEnter={() => setFeatureHover(feature.id)}
                onMouseLeave={() => setFeatureHover(null)}
                className={`group relative overflow-hidden rounded-[2.5rem] border-2 border-neutral-200 bg-white p-8 transition-all hover:-translate-y-2 hover:shadow-2xl dark:border-neutral-800 dark:bg-drp-dark ${featureHover === feature.id ? 'border-drp-blue' : ''}`}
              >
                <div className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} p-4 text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-2xl font-bold text-neutral-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
                <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity group-hover:opacity-5`} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-neutral-900 dark:text-white sm:text-5xl">
              From Activity to Impact.
            </h2>
            <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
              The lifecycle of a verified DRP contribution
            </p>
          </div>

          <div className="relative space-y-8">
            {/* Connection Line */}
            <div className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-drp-blue via-drp-green to-drp-orange hidden sm:block opacity-20" />

            {[
              {
                step: '01',
                title: 'Secure Submission',
                description: 'Capture and upload evidence using our mobile app or web portal. All data is locally encrypted before transmission.',
                icon: <Smartphone className="h-6 w-6" />,
                color: 'bg-drp-blue'
              },
              {
                step: '02',
                title: 'AI Verification',
                description: 'Our decentralized AI network validates your evidence against global standards while protecting sensitive information.',
                icon: <Shield className="h-6 w-6" />,
                color: 'bg-drp-green'
              },
              {
                step: '03',
                title: 'Tokenized Reward',
                description: 'Upon verification, rewards are instantly minted and distributed to your wallet along with on-chain reputation points.',
                icon: <Zap className="h-6 w-6" />,
                color: 'bg-drp-orange'
              }
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative flex flex-col gap-8 rounded-[2rem] border border-neutral-200 bg-white/50 p-8 backdrop-blur-sm dark:border-neutral-800 dark:bg-drp-dark/50 sm:flex-row sm:items-center sm:ml-4"
              >
                <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl ${item.color} text-white shadow-2xl z-10`}>
                  <span className="text-3xl font-black">{item.step}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                </div>
                <div className="hidden lg:block p-3 rounded-full bg-neutral-100 dark:bg-neutral-800">
                  {item.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[3rem] bg-drp-dark p-12 text-center sm:p-20">
            <div className="absolute inset-0 bg-gradient-to-r from-drp-blue/20 to-drp-green/20 blur-3xl" />
            <div className="relative z-10">
              <Lock className="h-16 w-16 text-drp-blue mx-auto mb-8 animate-pulse" />
              <h2 className="text-4xl font-black text-white sm:text-5xl mb-6">
                Zero-Knowledge Privacy.
              </h2>
              <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-10">
                DRP uses advanced cryptographic proofs to verify activities without ever revealing the identity or location of contributors unless explicitly authorized.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {['IPFS Storage', 'E2E Encryption', 'ZK-Proofs', 'Decentralized Identity'].map((tag) => (
                  <span key={tag} className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-bold text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24 text-center sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="text-5xl font-black text-neutral-900 dark:text-white sm:text-6xl">
            Start Your Impact.
          </h2>
          <p className="mt-6 text-xl text-neutral-600 dark:text-neutral-400">
            Join the decentralized network of human rights defenders.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {address ? (
              <Link
                href="/proofs/activities"
                className="group flex items-center gap-2 rounded-2xl bg-drp-blue px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-drp-blue/30 transition-all hover:scale-105 active:scale-95"
              >
                Submit First Proof
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <button
                onClick={async () => {
                  try {
                    await connect()
                  } catch (error) {
                    console.error('Failed to connect wallet:', error)
                  }
                }}
                disabled={isConnecting}
                className="group flex items-center gap-2 rounded-2xl bg-drp-blue px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-drp-blue/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </button>
            )}
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-neutral-200 bg-white px-10 py-5 text-lg font-bold text-neutral-900 transition-all hover:border-drp-blue dark:border-neutral-800 dark:bg-drp-dark dark:text-white"
            >
              <Users className="h-6 w-6" />
              Community
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
