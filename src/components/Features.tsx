"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { 
  Shield, 
  Globe, 
  Users, 
  Zap, 
  Lock, 
  Heart,
  Award,
  Target,
  CheckCircle
} from "lucide-react"

const keyFeatures = [
  {
    icon: Shield,
    title: "Quantum-Safe Cryptography",
    description: "Future-proof security using post-quantum cryptographic algorithms that protect against quantum computing threats.",
    benefits: ["Post-quantum algorithms", "Long-term security", "Future-proof protection"]
  },
  {
    icon: Heart,
    title: "Human Rights Focus",
    description: "Every feature is designed with human rights protection as the core mission, ensuring technology serves humanity.",
    benefits: ["Rights-based design", "Humanitarian focus", "Social impact"]
  },
  {
    icon: Target,
    title: "SDGs Alignment",
    description: "Aligned with United Nations Sustainable Development Goals to create measurable positive impact.",
    benefits: ["UN SDGs integration", "Measurable impact", "Global standards"]
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Designed to work worldwide, even in regions with limited connectivity or restrictive governments.",
    benefits: ["Offline capabilities", "Censorship resistant", "Global reach"]
  },
  {
    icon: Users,
    title: "Community Governance",
    description: "Decentralized decision-making through our dual-token system, ensuring community control.",
    benefits: ["Democratic governance", "Community ownership", "Transparent decisions"]
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Optimized for speed and efficiency, ensuring the platform works smoothly for all users.",
    benefits: ["Fast transactions", "Low fees", "Scalable infrastructure"]
  }
]

const impactHighlights = [
  {
    icon: Award,
    title: "Healthcare Access",
    description: "Securing medical records and ensuring healthcare access for vulnerable populations.",
    stat: "1M+ Records Protected"
  },
  {
    icon: Globe,
    title: "Education Rights",
    description: "Protecting educational records and ensuring access to quality education worldwide.",
    stat: "500K+ Students"
  },
  {
    icon: Heart,
    title: "Sustainability",
    description: "Tracking and verifying environmental impact and sustainable development initiatives.",
    stat: "100+ Projects"
  }
]

export function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Built with cutting-edge technology and human rights at the center, 
            DRP offers a comprehensive platform for protecting and advancing human rights globally.
          </p>
        </motion.div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {keyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Impact Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactHighlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/10 to-teal-500/10 border border-purple-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <highlight.icon className="h-10 w-10 text-purple-500" />
                </div>
                <h4 className="text-xl font-bold mb-3">{highlight.title}</h4>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {highlight.description}
                </p>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-teal-500 bg-clip-text text-transparent">
                  {highlight.stat}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-2xl p-8 border border-purple-500/20 text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <Lock className="h-12 w-12 text-purple-500 mr-4" />
            <h3 className="text-2xl font-bold">Enterprise-Grade Security</h3>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Built with the highest security standards, DRP ensures your data and rights are protected 
            with military-grade encryption and quantum-safe algorithms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Quantum-Safe", "End-to-End Encrypted", "Audit Ready", "Compliance Ready"].map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 bg-background/50 rounded-full text-sm font-medium border border-border"
              >
                {badge}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}