"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Shield, Globe, Users, Heart } from "lucide-react"

const missionPoints = [
  {
    icon: Shield,
    title: "Quantum-Safe Security",
    description: "Advanced cryptographic protocols that protect against future quantum computing threats, ensuring long-term security for human rights data."
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Decentralized infrastructure that works anywhere in the world, even in regions with limited internet connectivity or restrictive governments."
  },
  {
    icon: Users,
    title: "Community-Driven",
    description: "Governed by the community through our dual-token system, ensuring decisions are made by those who understand the needs best."
  },
  {
    icon: Heart,
    title: "Human Rights Focus",
    description: "Every feature and decision is guided by our core mission to protect, verify, and advance human rights globally."
  }
]

export function Mission() {
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
            Our Mission:{" "}
            <span className="bg-gradient-to-r from-purple-500 to-teal-500 bg-clip-text text-transparent">
              Protecting Human Rights
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The Decentralized Rights Protocol is building the infrastructure for a more just and transparent world. 
            We believe that blockchain technology can be a powerful force for good when applied to protecting human rights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {missionPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-teal-500/10 border border-purple-500/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                <point.icon className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{point.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-teal-500/10 rounded-2xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold mb-4">
              Join the Movement for Human Rights
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Be part of the first blockchain protocol dedicated to protecting human rights. 
              Together, we can build a more just and transparent world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-teal-600 transition-all duration-300"
              >
                Join Waitlist
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-purple-500/30 text-purple-500 rounded-lg font-semibold hover:bg-purple-500/10 transition-all duration-300"
              >
                Read Whitepaper
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}