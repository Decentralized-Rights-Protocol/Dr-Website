"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { WalletPanel } from "@/components/wallet/WalletPanel";
import {
  Award,
  TrendingUp,
  History,
  Zap,
  ShieldCheck,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/app-store";

export default function WalletPage() {
  const address = useAppStore((state) => state.address);
  const balance = useQuery(api.activities.getUserBalance, {
    walletAddress: address || undefined,
  });
  const activities = useQuery(api.activities.getActivities, {
    limit: 5,
    walletAddress: address || undefined,
  });

  return (
    <div className="space-y-10">
      <header className="border border-foreground/10 bg-background/90 p-8 shadow-sm">
        <p className="text-sm font-semibold text-[#00e5cc]">
          Stewardship Assets
        </p>
        <h1 className="mt-3 text-3xl font-bold text-foreground">
          Stewardship Wallet
        </h1>
        <p className="mt-2 text-sm text-foreground/50">
          Manage your $DeRi utility credits and $RIGHTS governance weight earned
          through verified activities.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[0.6fr_0.4fr]">
        <div className="space-y-8">
          {/* Balance Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-[#00e5cc] to-[#8b5cf6] p-8 text-foreground shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="bg-background/20 p-2">
                  <Award className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                  Utility Credit
                </span>
              </div>
              <p className="mt-8 text-4xl font-bold">{balance?.deri ?? "0"}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-lg font-medium opacity-90">$DeRi</p>
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-[#0a0a14] to-[#030308] p-8 text-foreground shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="bg-background/10 p-2">
                  <ShieldCheck className="h-6 w-6 text-[#00e5cc]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">
                  Governance Weight
                </span>
              </div>
              <p className="mt-8 text-4xl font-bold">
                {balance?.rights ?? "0"}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-lg font-medium opacity-90">$RIGHTS</p>
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
            </motion.div>
          </div>

          <section className="border border-foreground/10 bg-background/80 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <History className="h-5 w-5 text-[#00e5cc]" />
              Recent Rewards
            </h3>
            <div className="mt-6 space-y-4">
              {!activities ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 animate-pulse bg-foreground/[0.04]"
                  />
                ))
              ) : activities.length === 0 ? (
                <p className="text-center py-8 text-sm text-foreground/40">
                  No rewards earned yet. Submit an activity to start earning.
                </p>
              ) : (
                activities
                  .filter((act: any) => act.status === "approved")
                  .map((act: any) => (
                    <div
                      key={act._id}
                      className="flex items-center justify-between border border-foreground/5 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                          <ArrowDownLeft className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">
                            {(act.metadata as any).title}
                          </p>
                          <p className="text-xs text-foreground/40">
                            {new Date(act.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#00e5cc]">
                          +{act.reward.deri} $DeRi
                        </p>
                        <p className="text-[10px] text-foreground/30">
                          +{act.reward.rights} $RIGHTS
                        </p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <WalletPanel />

          <section className="border border-foreground/10 bg-background/80 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-foreground">
              Asset Utility
            </h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-[#00e5cc]/10 p-1.5 text-[#00e5cc]">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold">$DeRi Credits</p>
                  <p className="text-xs text-foreground/40">
                    Spend on protocol services, ecosystem tools, and partner
                    humanitarian resources.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-emerald-500/10 p-1.5 text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold">$RIGHTS Weight</p>
                  <p className="text-xs text-foreground/40">
                    Directly influences your voting power in the DRP Cooperative
                    governance proposals.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
