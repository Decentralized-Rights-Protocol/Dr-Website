"use client";

import { motion } from "framer-motion";
import { TrendingUp, Globe, Shield, Sparkles } from "lucide-react";

interface EconomicsHeroProps {
  title: string;
  subtitle: string;
  description?: string;
}

export function EconomicsHero({
  title,
  subtitle,
  description,
}: EconomicsHeroProps) {
  return (
    <div
      className="relative overflow-hidden py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(135deg, #050914 0%, #0a1b2b 52%, #06313a 100%)",
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00bfff]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#00e5cc]/15 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00e5cc]/10 border border-[#00e5cc]/25 mb-6"
          >
            <Sparkles className="h-4 w-4 text-[#00e5cc]" />
            <span className="text-sm font-medium text-[#00e5cc]">
              DRP Economics
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            {title}
          </h1>

          <p className="text-xl sm:text-2xl text-slate-100 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>

          {description && (
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              {description}
            </p>
          )}

          {/* Icon Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-2xl mx-auto"
          >
            {[
              { Icon: TrendingUp, label: "Sustainable Growth" },
              { Icon: Globe, label: "Global Impact" },
              { Icon: Shield, label: "Rights-Backed" },
              { Icon: Sparkles, label: "AI-Verified" },
            ].map(({ Icon, label }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-foreground/10"
              >
                <Icon className="h-8 w-8 text-blue-400" />
                <span className="text-sm text-slate-300 text-center">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
