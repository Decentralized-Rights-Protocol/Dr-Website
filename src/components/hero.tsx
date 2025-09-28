'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, Download, Users, Shield, Globe } from 'lucide-react'
import { ParticleBackground } from './particle-background'

const stats = [
  { label: 'Active Users', value: '10K+', icon: Users },
  { label: 'Countries', value: '50+', icon: Globe },
  { label: 'Security Score', value: '99.9%', icon: Shield },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/50 via-transparent to-secondary-900/50" />
        <ParticleBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8 animate-bounce-in">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            Quantum-Safe Blockchain Protocol
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            Protecting Human Rights
            <br />
            <span className="bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent animate-gradient">
              Through Blockchain
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-neutral-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            The Decentralized Rights Protocol (DRP) is building a quantum-safe, 
            transparent platform to protect, verify, and advance human rights globally 
            using cutting-edge blockchain technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 animate-slide-up">
            <Link
              href="/whitepaper"
              className="group inline-flex items-center px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-secondary-600 to-accent-600 rounded-2xl hover:from-secondary-700 hover:to-accent-700 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl"
            >
              Read Whitepaper
              <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="/whitepaper_v0.5.pdf"
              download="DRP_Whitepaper_v0.5.pdf"
              className="group inline-flex items-center px-10 py-4 text-lg font-semibold text-white border-2 border-white/40 rounded-2xl hover:bg-white/20 hover:border-white/60 transition-all duration-300 backdrop-blur-sm hover:scale-105"
            >
              <Download className="mr-3 h-5 w-5" />
              Download PDF
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover-lift animate-stagger-${index + 1}`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-secondary-600/20 to-accent-600/20 backdrop-blur-sm border border-white/20 mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-neutral-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </div>
      </div>
    </section>
  )
}