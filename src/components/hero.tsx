'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, Download, Users, Shield, Globe } from 'lucide-react'

const stats = [
  { label: 'Active Users', value: '10K+', icon: Users },
  { label: 'Countries', value: '50+', icon: Globe },
  { label: 'Security Score', value: '99.9%', icon: Shield },
]

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Themed gradient layer */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 dark:from-primary/20 dark:via-accent/20 dark:to-secondary/20" />
      </div>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 dark:from-primary/20 dark:to-secondary/20" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground backdrop-blur-sm animate-bounce-in">
            <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Quantum-Safe Blockchain Protocol
          </div>

          {/* Main Heading */}
          <h1 className="animate-slide-up mb-6 text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-7xl">
            Protecting Human Rights
            <br />
            <span className="animate-gradient bg-gradient-to-r from-primary/70 to-accent/70 bg-clip-text text-transparent">
              Through Blockchain
            </span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-foreground/70 sm:text-2xl">
            The Decentralized Rights Protocol (DRP) is building a quantum-safe, 
            transparent platform to protect, verify, and advance human rights globally 
            using cutting-edge blockchain technology.
          </p>

          {/* CTA Buttons */}
          <div className="animate-slide-up mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href="/whitepaper"
              className="group inline-flex items-center rounded-2xl bg-primary px-10 py-4 text-lg font-bold text-primary-foreground shadow-2xl transition-all duration-300 hover:scale-105 hover:opacity-90"
            >
              Read Whitepaper
              <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="/whitepaper_v0.5.pdf"
              download="DRP_Whitepaper_v0.5.pdf"
              className="group inline-flex items-center rounded-2xl border-2 border-border bg-card px-10 py-4 text-lg font-semibold text-card-foreground transition-all duration-300 backdrop-blur-sm hover:scale-105 hover:bg-accent hover:text-accent-foreground"
            >
              <Download className="mr-3 h-5 w-5" />
              Download PDF
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-in mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`hover-lift animate-stagger-${index + 1} rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 backdrop-blur-sm hover:shadow-primary`}
              >
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm">
                  <stat.icon className="h-8 w-8 text-foreground" />
                </div>
                <div className="mb-2 text-4xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm font-medium text-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-foreground/30">
          <div className="mt-2 h-3 w-1 rounded-full bg-foreground/60" />
        </div>
      </div>
    </section>
  )
}