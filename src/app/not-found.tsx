'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

// Dynamically import Three.js to avoid SSR issues
const ErrorAnimation = dynamic(() => import('@/components/ErrorAnimation'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-orange-500/20 animate-pulse" />
})

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-bg via-darker-bg to-dark-bg relative overflow-hidden">
      <Navigation />
      
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <ErrorAnimation />
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-particle-float"
            style={{
              left: `${10 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl">
          {/* Error Code */}
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 animate-glitch">
            404
          </div>
          
          {/* Error Title */}
          <h1 className="text-3xl md:text-4xl font-semibold text-text-primary mb-6">
            Block Not Found
          </h1>
          
          {/* Error Description */}
          <p className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
            The block you're looking for doesn't exist in our blockchain network.<br />
            It might have been mined elsewhere or never existed in the first place.
          </p>

          {/* Blockchain Animation */}
          <div className="flex justify-center items-center gap-3 mb-12 flex-wrap">
            {['0x1', '0x2', '?', '0x4', '0x5'].map((block, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-sm animate-float"
                       style={{ animationDelay: `${index * 0.5}s` }}>
                    {block}
                  </div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg opacity-75 animate-border-glow -z-10"></div>
                </div>
                {index < 4 && (
                  <span className="text-accent font-mono text-sm">→</span>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-primary hover:-translate-y-1 transition-all duration-300"
            >
              <i className="fas fa-home"></i>
              Return to Main Network
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-border-color text-text-primary font-semibold rounded-full hover:border-primary hover:bg-card-bg hover:-translate-y-1 transition-all duration-300"
            >
              <i className="fas fa-bug"></i>
              Report Missing Block
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-text-secondary">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-text-secondary">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">∞</div>
              <div className="text-sm text-text-secondary">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
