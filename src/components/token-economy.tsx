"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Coins, Shield, Users, TrendingUp, Lock, Globe } from "lucide-react"

const tokenFeatures = [
  {
    icon: Coins,
    title: "$RIGHTS Token",
    description: "Governance and utility token for platform access, staking rewards, and voting rights.",
    features: ["1B Total Supply", "40% Community Allocation", "Staking Rewards", "Governance Rights"]
  },
  {
    icon: Shield,
    title: "$DeRi Token",
    description: "Human rights impact token earned through meaningful actions and contributions.",
    features: ["Impact Rewards", "Community Incentives", "Platform Benefits", "Recognition System"]
  }
]

const tokenMechanics = [
  {
    icon: Lock,
    title: "Staking & Rewards",
    description: "Stake $RIGHTS tokens to earn rewards and participate in governance decisions."
  },
  {
    icon: Users,
    title: "Community Governance",
    description: "Vote on protocol upgrades, funding proposals, and strategic decisions."
  },
  {
    icon: TrendingUp,
    title: "Impact Tracking",
    description: "Earn $DeRi tokens by contributing to human rights initiatives and verifiable impact."
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Access platform features and participate regardless of geographic location."
  }
]

export function TokenEconomy() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Dual Token Economy
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our innovative dual-token system creates a sustainable economy that rewards both 
            governance participation and human rights impact.
          </p>
        </motion.div>

        {/* Token Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {tokenFeatures.map((token, index) => (
            <motion.div
              key={token.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-card rounded-2xl p-8 border border-border hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <token.icon className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-2xl font-bold">{token.title}</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {token.description}
              </p>
              
              <div className="space-y-3">
                {token.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 mr-3" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Token Mechanics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How It Works
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tokenMechanics.map((mechanic, index) => (
              <motion.div
                key={mechanic.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-teal-500/10 border border-purple-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <mechanic.icon className="h-8 w-8 text-purple-500" />
                </div>
                <h4 className="text-lg font-semibold mb-3">{mechanic.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {mechanic.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Token Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-card rounded-2xl p-8 border border-border"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            $RIGHTS Token Distribution
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Community", percentage: "40%", color: "from-purple-500 to-purple-600" },
              { label: "Development", percentage: "25%", color: "from-teal-500 to-teal-600" },
              { label: "Ecosystem", percentage: "20%", color: "from-blue-500 to-blue-600" },
              { label: "Team", percentage: "15%", color: "from-gray-500 to-gray-600" }
            ].map((item, index) => (
              <div key={item.label} className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-muted"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeDasharray={`${parseInt(item.percentage) * 2.51} 251`}
                      strokeDashoffset={index * -62.75}
                      className="transition-all duration-1000"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className={`stop-color-${item.color.split(' ')[0].split('-')[1]}-500`} />
                        <stop offset="100%" className={`stop-color-${item.color.split(' ')[2].split('-')[1]}-600`} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">{item.percentage}</span>
                  </div>
                </div>
                <h4 className="font-semibold">{item.label}</h4>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
