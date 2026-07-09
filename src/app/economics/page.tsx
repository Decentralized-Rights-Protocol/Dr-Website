"use client";

import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Shield,
  Sparkles,
  Activity,
  Coins,
  Package,
  Users,
  BarChart,
  Network,
} from "lucide-react";
import {
  PremiumHero,
  PremiumSection,
  PremiumPage,
} from "@/components/site/PremiumPage";
import { MotionProps, motion, Variants } from "framer-motion";

const economicsPages = [
  {
    href: "/economics/sre",
    title: "Sustainable Rights Economy (SRE)",
    description: "Rights-backed distribution, AI scoring, and SDG integration",
    icon: Shield,
    color: "from-green-500 to-emerald-600",
  },
  {
    href: "/economics/abe",
    title: "Activity-Based Economy (ABE)",
    description: "Value = Verified Human Activity + Sustainable Contribution",
    icon: Activity,
    color: "from-blue-500 to-cyan-600",
  },
  {
    href: "/economics/tokenomics",
    title: "DRP Dual Token Model",
    description: "$RIGHTS governance + $DeRi utility rewards",
    icon: Coins,
    color: "from-purple-500 to-pink-600",
  },
  {
    href: "/economics/distribution",
    title: "Sustainable Supply & Distribution",
    description: "AI-driven fair allocation and quality goods network",
    icon: Package,
    color: "from-orange-500 to-red-600",
  },
  {
    href: "/economics/governance",
    title: "Human-Centric Governance",
    description: "AI Elders, Proof of Status, and rights-backed decisions",
    icon: Users,
    color: "from-indigo-500 to-blue-600",
  },
  {
    href: "/economics/global",
    title: "Global Economic Impact",
    description:
      "For governments, communities, businesses, and WEF stakeholders",
    icon: Globe,
    color: "from-cyan-500 to-teal-600",
  },
  {
    href: "/economics/micro",
    title: "Micro Economics",
    description: "Individual incentives, agent behavior, and market mechanisms",
    icon: BarChart,
    color: "from-violet-500 to-purple-600",
  },
  {
    href: "/economics/macro",
    title: "Macro Economics",
    description:
      "System-wide dynamics, monetary policy, and long-term stability",
    icon: Network,
    color: "from-rose-500 to-pink-600",
  },
];

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function EconomicsPage() {
  return (
    <PremiumPage>
      <>
        <PremiumHero
          badge="Economic Architecture"
          title="DRP Economics: Sustainable Rights Economy"
          description="A rights-centered system where verified contribution, sustainability, and transparent governance replace extraction economics."
        />

        {/* Framework Section */}
        <PremiumSection eyebrow="Framework" title="AI as Auditor, Not Ruler">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                variants={cardVariants}
                className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-black/30 p-8 backdrop-blur-sm hover:border-cyan-300/40 hover:bg-cyan-400/10 transition-all duration-500"
              >
                <h3 className="mb-3 text-lg font-semibold text-red-100">
                  Legacy Model
                </h3>
                <p className="text-sm text-red-50/90">
                  Opaque control, extraction incentives, centralized value
                  capture.
                </p>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-black/30 p-8 backdrop-blur-sm hover:border-cyan-300/40 hover:bg-cyan-400/10 transition-all duration-500"
              >
                <h3 className="mb-3 text-lg font-semibold text-emerald-100">
                  DRP Model
                </h3>
                <p className="text-sm text-emerald-50/90">
                  Transparent verification, rights alignment, distributed value
                  creation.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </PremiumSection>

        {/* Core Pillars Section */}
        <PremiumSection eyebrow="Core Pillars" title="What Powers the Economy">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Activity,
                  title: "Verified Activity",
                  body: "Contribution is measured through proofs, not speculation.",
                },
                {
                  icon: Shield,
                  title: "Rights-Backed Distribution",
                  body: "Economic rails prioritize dignity and fairness.",
                },
                {
                  icon: Sparkles,
                  title: "Sustainability Incentives",
                  body: "Environmental and social value are first-class metrics.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={cardVariants}
                  className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-black/30 p-8 backdrop-blur-sm hover:border-cyan-300/40 hover:bg-cyan-400/10 transition-all duration-500"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-cyan-400/10">
                    <item.icon className="h-5 w-5 text-cyan-200" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-300">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </PremiumSection>

        {/* Modules Section */}
        <PremiumSection
          eyebrow="Modules"
          title="Explore DRP Economics in Depth"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {economicsPages.map((page) => (
                <motion.div
                  key={page.href}
                  variants={cardVariants}
                  className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-black/30 p-8 backdrop-blur-sm hover:border-cyan-300/40 hover:bg-cyan-400/10 transition-all duration-500 cursor-pointer"
                >
                  <Link href={page.href} className="block h-full">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${page.color} group-hover:scale-105 transition-transform duration-300">
                      <page.icon className="h-8 w-8 text-foreground" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground group-hover:text-cyan-200 transition-colors duration-300">
                      {page.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm text-slate-300 line-clamp-3">
                      {page.description}
                    </p>
                    <div className="mt-4 flex items-center font-medium text-cyan-200 group-hover:text-cyan-100 transition-colors duration-300">
                      Open module
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </PremiumSection>

        {/* Call to Action Section */}
        <section className="pb-20 pt-8">
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
              <div className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/15 via-blue-300/10 to-indigo-300/10 p-8 text-center backdrop-blur-sm hover:border-cyan-300/40 hover:bg-cyan-400/10 transition-all duration-500">
                <h2 className="text-3xl font-semibold text-foreground mb-6">
                  Go from Theory to Governance
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-slate-300 leading-relaxed">
                  Continue with whitepaper details or inspect ecosystem activity
                  through explorer tooling.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/whitepaper"
                    className="flex items-center justify-center rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-cyan-200 hover:border-cyan-300/60"
                  >
                    Read Whitepaper
                  </Link>
                  <Link
                    href="/explorer"
                    className="flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-white/10 hover:border-white/25"
                  >
                    Open Explorer
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </>
    </PremiumPage>
  );
}
