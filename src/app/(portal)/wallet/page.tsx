'use client';

import { useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { WalletPanel } from '@/components/wallet/WalletPanel';
import { 
  Award, 
  TrendingUp, 
  History, 
  Zap, 
  ShieldCheck,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function WalletPage() {
  const balance = useQuery(api.activities.getUserBalance);
  const activities = useQuery(api.activities.getActivities, { limit: 5 });

  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-neutral-200/80 bg-white/90 p-8 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <p className="text-sm font-semibold text-primary-600 dark:text-primary-300">Stewardship Assets</p>
        <h1 className="mt-3 text-3xl font-bold text-neutral-900 dark:text-neutral-50">Stewardship Wallet</h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          Manage your $DeRi utility credits and $RIGHTS governance weight earned through verified activities.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[0.6fr_0.4fr]">
        <div className="space-y-8">
          {/* Balance Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-3xl bg-gradient-to-br from-primary-600 to-indigo-700 p-8 text-white shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-white/20 p-2">
                  <Award className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">Utility Credit</span>
              </div>
              <p className="mt-8 text-4xl font-bold">{balance?.deri ?? '0'}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-lg font-medium opacity-90">$DeRi</p>
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-3xl bg-gradient-to-br from-neutral-800 to-neutral-950 p-8 text-white shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-white/10 p-2">
                  <ShieldCheck className="h-6 w-6 text-primary-400" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest opacity-70">Governance Weight</span>
              </div>
              <p className="mt-8 text-4xl font-bold">{balance?.rights ?? '0'}</p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-lg font-medium opacity-90">$RIGHTS</p>
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
            </motion.div>
          </div>

          <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <History className="h-5 w-5 text-primary-500" />
              Recent Rewards
            </h3>
            <div className="mt-6 space-y-4">
              {!activities ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800" />
                ))
              ) : activities.length === 0 ? (
                <p className="text-center py-8 text-sm text-neutral-500">No rewards earned yet. Submit an activity to start earning.</p>
              ) : (
                activities.filter((act: any) => act.status === 'approved').map((act: any) => (
                  <div key={act._id} className="flex items-center justify-between rounded-2xl border border-neutral-100 p-4 dark:border-neutral-800">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                        <ArrowDownLeft className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{(act.metadata as any).title}</p>
                        <p className="text-xs text-neutral-500">{new Date(act.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary-600">+{act.reward.deri} $DeRi</p>
                      <p className="text-[10px] text-neutral-400">+{act.reward.rights} $RIGHTS</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <WalletPanel />
          
          <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Asset Utility</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-lg bg-primary-500/10 p-1.5 text-primary-600">
                  <CreditCard className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold">$DeRi Credits</p>
                  <p className="text-xs text-neutral-500">Spend on protocol services, ecosystem tools, and partner humanitarian resources.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold">$RIGHTS Weight</p>
                  <p className="text-xs text-neutral-500">Directly influences your voting power in the DRP Cooperative governance proposals.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
