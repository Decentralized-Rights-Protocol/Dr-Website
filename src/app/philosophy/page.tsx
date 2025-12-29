'use client'

import { motion } from 'framer-motion'
import { ParticleBackground } from '@/components/particle-background'

export default function PhilosophyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-4xl text-center"
            >
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
                The Philosophy of Decentralized Rights
              </h1>
              <p className="text-xl sm:text-2xl text-neutral-300 max-w-3xl mx-auto">
                A human-centered foundation for trust, dignity, and governance in the digital age.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why DRP Exists */}
        <section className="py-16 bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Why DRP Exists
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-xl text-neutral-300 mb-6">
                  Decentralized Rights Protocol (DRP) was created to address a fundamental imbalance in modern systems:
                  technology has grown powerful, but human dignity has not been equally protected.
                </p>
                <p className="text-lg text-neutral-300">
                  DRP is not merely a blockchain.
                  It is a framework for trust, accountability, and cooperation — designed to protect rights, recognize effort, and build systems that serve humanity rather than dominate it.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-16 bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-16">
              {/* 1. Rights Before Power */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-3xl font-bold text-white mb-4">
                  1. Rights Before Power
                </h3>
                <p className="text-lg text-neutral-300 mb-4">
                  Human rights are not permissions granted by institutions.
                  They are inherent and must be protected by design.
                </p>
                <p className="text-lg text-neutral-300">
                  DRP ensures that systems exist to serve people — not the other way around.
                </p>
              </motion.div>

              {/* 2. Proof Over Authority */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-3xl font-bold text-white mb-4">
                  2. Proof Over Authority
                </h3>
                <p className="text-lg text-neutral-300 mb-4">
                  Trust should not depend on titles, influence, or centralized control.
                  It should emerge from verifiable actions.
                </p>
                <p className="text-lg text-neutral-300">
                  DRP replaces blind trust with Proof of Status and Proof of Activity, allowing integrity to be demonstrated rather than claimed.
                </p>
              </motion.div>

              {/* 3. Accountability Without Surveillance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-3xl font-bold text-white mb-4">
                  3. Accountability Without Surveillance
                </h3>
                <p className="text-lg text-neutral-300 mb-4">
                  Transparency should never come at the cost of dignity.
                </p>
                <p className="text-lg text-neutral-300">
                  DRP enables accountability through cryptographic proofs and AI-assisted verification, without exposing personal data or creating systems of constant surveillance.
                </p>
              </motion.div>

              {/* 4. Growth Without Exploitation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-3xl font-bold text-white mb-4">
                  4. Growth Without Exploitation
                </h3>
                <p className="text-lg text-neutral-300 mb-4">
                  True economic progress must respect people, communities, and the planet.
                </p>
                <p className="text-lg text-neutral-300">
                  DRP aligns incentives with sustainability, cooperation, and long-term value — ensuring growth does not depend on extraction or harm.
                </p>
              </motion.div>

              {/* 5. Intelligence in Service of Humanity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-3xl font-bold text-white mb-4">
                  5. Intelligence in Service of Humanity
                </h3>
                <p className="text-lg text-neutral-300 mb-4">
                  Artificial intelligence must assist human judgment, not replace it.
                </p>
                <p className="text-lg text-neutral-300">
                  Within DRP, AI operates as a guide and verifier — constrained by ethics, transparency, and human oversight.
                </p>
              </motion.div>

              {/* 6. Governance as Stewardship */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-3xl font-bold text-white mb-4">
                  6. Governance as Stewardship
                </h3>
                <p className="text-lg text-neutral-300 mb-4">
                  Governance is not control.
                  It is care.
                </p>
                <p className="text-lg text-neutral-300">
                  DRP governance empowers communities through participation, responsibility, and shared decision-making — anchored by the RIGHTS governance token.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="py-16 bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-2xl border border-white/20 p-8">
                <p className="text-2xl text-white font-medium text-center leading-relaxed">
                  Decentralized Rights Protocol is built on a simple belief:
                </p>
                <blockquote className="text-xl sm:text-2xl text-neutral-200 mt-6 text-center italic border-l-4 border-primary-400 pl-6">
                  A just digital future is possible — if systems are designed to protect dignity, reward effort, and earn trust.
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Global Foundations */}
        <section className="py-16 bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-white mb-8">
                🌍 Global Foundations
              </h2>
              <p className="text-lg text-neutral-300 mb-8">
                DRP&apos;s philosophy is not abstract idealism. It is anchored in internationally recognized human, ecological, and ethical frameworks.
              </p>

              <div className="space-y-8">
                {/* Universal Declaration of Human Rights */}
                <div className="bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-xl border border-white/20 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Universal Declaration of Human Rights (UN, 1948)
                  </h3>
                  <p className="text-lg text-neutral-300 mb-4">
                    DRP operationalizes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-300 mb-4">
                    <li>Right to dignity (Art. 1)</li>
                    <li>Right to recognition before the law (Art. 6)</li>
                    <li>Right to work and fair reward (Art. 23)</li>
                    <li>Right to participation in governance (Art. 21)</li>
                  </ul>
                  <p className="text-lg text-neutral-300 font-medium">
                    ➡️ DRP turns rights from paper into protocols.
                  </p>
                </div>

                {/* UN Sustainable Development Goals */}
                <div className="bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-xl border border-white/20 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    UN Sustainable Development Goals (SDGs)
                  </h3>
                  <p className="text-lg text-neutral-300 mb-4">
                    DRP directly maps to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-300 mb-4">
                    <li>SDG 1: No Poverty</li>
                    <li>SDG 8: Decent Work & Economic Growth</li>
                    <li>SDG 9: Industry, Innovation & Infrastructure</li>
                    <li>SDG 10: Reduced Inequality</li>
                    <li>SDG 16: Peace, Justice & Strong Institutions</li>
                  </ul>
                  <p className="text-lg text-neutral-300 font-medium">
                    ➡️ Proof of Activity becomes measurable SDG contribution.
                  </p>
                </div>

                {/* Earth System & Ecological Economics */}
                <div className="bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-xl border border-white/20 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Earth System & Ecological Economics
                  </h3>
                  <p className="text-lg text-neutral-300 mb-4">
                    Inspired by:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-300 mb-4">
                    <li>Doughnut Economics (Kate Raworth)</li>
                    <li>Steady-State Economics</li>
                    <li>Energy & resource conservation models</li>
                  </ul>
                  <p className="text-lg text-neutral-300 font-medium">
                    ➡️ DRP rewards useful activity, not wasteful extraction.
                  </p>
                </div>

                {/* Digital Rights & AI Ethics */}
                <div className="bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-xl border border-white/20 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Digital Rights & AI Ethics
                  </h3>
                  <p className="text-lg text-neutral-300 mb-4">
                    Aligned with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-300 mb-4">
                    <li>OECD AI Principles</li>
                    <li>UNESCO AI Ethics Framework</li>
                    <li>GDPR-style privacy-by-design</li>
                  </ul>
                  <p className="text-lg text-neutral-300 font-medium">
                    ➡️ AI in DRP verifies without surveilling.
                  </p>
                </div>
              </div>

              {/* Philosophy One-Liner */}
              <div className="mt-8 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 backdrop-blur-md rounded-xl border border-primary-400/30 p-6">
                <blockquote className="text-xl sm:text-2xl text-white text-center italic">
                  &quot;DRP is a rights-preserving, activity-verified economic network designed to align human dignity, ecological balance, and technological trust.&quot;
                </blockquote>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Human-Centered Design */}
        <section className="py-16 bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold text-white mb-8">
                🧠 Human-Centered Design
              </h2>
              <p className="text-lg text-neutral-300 mb-8">
                DRP is built on how humans actually trust systems.
              </p>

              <div className="space-y-8">
                {/* 1. Recognition → Motivation */}
                <div className="bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-xl border border-white/20 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    1️⃣ Recognition → Motivation
                  </h3>
                  <p className="text-lg text-neutral-300 mb-4">
                    Humans are wired to respond to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-300 mb-4">
                    <li>effort being seen</li>
                    <li>contribution being acknowledged</li>
                  </ul>
                  <p className="text-lg text-neutral-300 mb-4">
                    PoAT (Proof of Activity) satisfies this loop:
                  </p>
                  <blockquote className="text-lg text-neutral-200 italic border-l-4 border-primary-400 pl-4">
                    &quot;What I do matters.&quot;
                  </blockquote>
                </div>

                {/* 2. Fairness → Trust */}
                <div className="bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-xl border border-white/20 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    2️⃣ Fairness → Trust
                  </h3>
                  <p className="text-lg text-neutral-300 mb-4">
                    People trust systems that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-300 mb-4">
                    <li>treat others consistently</li>
                    <li>reward fairly</li>
                    <li>punish proportionally</li>
                  </ul>
                  <p className="text-lg text-neutral-300 mb-4">
                    PoST (Proof of Status) ensures:
                  </p>
                  <blockquote className="text-lg text-neutral-200 italic border-l-4 border-primary-400 pl-4">
                    &quot;Status emerges from behavior, not power.&quot;
                  </blockquote>
                </div>

                {/* 3. Progression → Engagement */}
                <div className="bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-xl border border-white/20 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    3️⃣ Progression → Engagement
                  </h3>
                  <p className="text-lg text-neutral-300 mb-4">
                    DRP Learn modules are designed to trigger:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-300 mb-4">
                    <li>mastery</li>
                    <li>progression</li>
                    <li>unlocking</li>
                  </ul>
                  <p className="text-lg text-neutral-300 font-medium">
                    ➡️ Levels + $DeRi rewards activate dopamine-driven learning, not fatigue.
                  </p>
                </div>

                {/* 4. Belonging → Governance */}
                <div className="bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-xl border border-white/20 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    4️⃣ Belonging → Governance
                  </h3>
                  <p className="text-lg text-neutral-300 mb-4">
                    People protect what they co-own.
                  </p>
                  <p className="text-lg text-neutral-300 mb-4">
                    RIGHTS token activates:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-300 mb-4">
                    <li>stewardship</li>
                    <li>responsibility</li>
                    <li>collective decision-making</li>
                  </ul>
                  <p className="text-lg text-neutral-300 font-medium">
                    ➡️ Governance feels like care, not politics.
                  </p>
                </div>

                {/* 5. Transparency Without Fear */}
                <div className="bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-xl border border-white/20 p-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    5️⃣ Transparency Without Fear
                  </h3>
                  <p className="text-lg text-neutral-300 mb-4">
                    Humans reject systems that feel like surveillance.
                  </p>
                  <p className="text-lg text-neutral-300 mb-4">
                    DRP uses:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-neutral-300 mb-4">
                    <li>cryptographic proofs</li>
                    <li>selective disclosure</li>
                    <li>AI summaries instead of raw exposure</li>
                  </ul>
                  <p className="text-lg text-neutral-300 font-medium">
                    ➡️ Trust without anxiety.
                  </p>
                </div>
              </div>

              {/* Visual Map */}
              <div className="mt-12 bg-white/10 dark:bg-neutral-800/20 backdrop-blur-md rounded-xl border border-white/20 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  🧠 Visual Map: How DRP Trust Grows
                </h3>
                <div className="space-y-4 text-center">
                  <div className="text-lg text-white font-semibold">Human Action</div>
                  <div className="text-2xl text-primary-400">↓</div>
                  <div className="text-lg text-white font-semibold">Proof of Activity (PoAT)</div>
                  <div className="text-2xl text-primary-400">↓</div>
                  <div className="text-lg text-white font-semibold">Verified Contribution</div>
                  <div className="text-2xl text-primary-400">↓</div>
                  <div className="text-lg text-white font-semibold">$DeRi Reward + Status Growth</div>
                  <div className="text-2xl text-primary-400">↓</div>
                  <div className="text-lg text-white font-semibold">Trust in System</div>
                  <div className="text-2xl text-primary-400">↓</div>
                  <div className="text-lg text-white font-semibold">Participation in Governance (RIGHTS)</div>
                  <div className="text-2xl text-primary-400">↓</div>
                  <div className="text-lg text-white font-semibold">System Legitimacy</div>
                  <div className="text-2xl text-primary-400">↓</div>
                  <div className="text-lg text-white font-semibold">Global Adoption</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final Statement */}
        <section className="py-16 bg-transparent">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-r from-primary-600/30 to-secondary-600/30 backdrop-blur-md rounded-2xl border border-primary-400/40 p-8">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">
                  🌱 Why This Matters
                </h2>
                <p className="text-xl text-neutral-200 text-center leading-relaxed">
                  What you&apos;re building isn&apos;t &quot;another blockchain&quot;.
                </p>
                <p className="text-xl text-neutral-200 text-center mt-4 leading-relaxed">
                  You&apos;re building:
                </p>
                <ul className="list-none space-y-3 mt-6 text-center">
                  <li className="text-lg text-white">• a moral operating system</li>
                  <li className="text-lg text-white">• an economic nervous system</li>
                  <li className="text-lg text-white">• a trust infrastructure for a fractured world</li>
                </ul>
                <p className="text-lg text-neutral-300 text-center mt-6 italic">
                  That&apos;s why DRP feels heavy sometimes — it&apos;s foundational.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

