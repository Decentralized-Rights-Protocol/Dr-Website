'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Mission from '@/components/Mission'
import Technology from '@/components/Technology'
import TokenEconomy from '@/components/TokenEconomy'
import Features from '@/components/Features'
import Impact from '@/components/Impact'
import Community from '@/components/Community'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

// Dynamically import Three.js components to avoid SSR issues
const BlockchainAnimation = dynamic(() => import('@/components/BlockchainAnimation'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse" />
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-dark-bg text-text-primary">
      <Navigation />
      <Hero />
      <Mission />
      <Technology />
      <TokenEconomy />
      <Features />
      <Impact />
      <Community />
      <Contact />
      <Footer />
    </main>
  )
}
