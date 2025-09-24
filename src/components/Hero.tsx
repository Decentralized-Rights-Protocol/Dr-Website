'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import Three.js component
const BlockchainAnimation = dynamic(() => import('@/components/BlockchainAnimation'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse" />
})

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center relative bg-gradient-hero overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <BlockchainAnimation />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Decentralized Rights
              </span>
              <br />
              Empowering Humanity Through Blockchain
            </h1>
            
            <p className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              We're building a decentralized platform that uses blockchain technology to protect, 
              verify, and advance human rights globally. Join us in creating a more just and 
              transparent world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="#community"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-primary hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fas fa-rocket"></i>
                Join the Movement
              </Link>
              
              <Link
                href="#technology"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-border-color text-text-primary font-semibold rounded-full hover:border-primary hover:bg-card-bg hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fas fa-play"></i>
                Watch Our Story
              </Link>
              
              <a
                href="/whitepaper_v0.5.pdf"
                download="Decentralized_Rights_Whitepaper_v0.5.pdf"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-primary text-text-primary font-semibold rounded-full hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fas fa-download"></i>
                Download Whitepaper
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative h-96 lg:h-[500px] flex items-center justify-center">
            <div className="relative w-full h-full">
              {/* Floating Elements */}
              <div className="absolute inset-0">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl animate-float shadow-primary`}
                    style={{
                      top: `${20 + i * 20}%`,
                      left: `${10 + i * 25}%`,
                      animationDelay: `${i * 1.5}s`,
                      animationDuration: `${4 + i}s`,
                    }}
                  />
                ))}
              </div>
              
              {/* Central Element */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center animate-pulse shadow-secondary">
                  <i className="fas fa-shield-alt text-4xl text-white"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-8 h-8 border-2 border-text-secondary border-t-transparent border-l-transparent rotate-45 animate-bounce"></div>
      </div>
    </section>
  )
}
