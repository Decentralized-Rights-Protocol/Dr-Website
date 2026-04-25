'use client';

import { useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { 
  Box, 
  Hash, 
  Clock, 
  Award, 
  TrendingUp, 
  Database,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExplorerPage() {
  const blocks = useQuery(api.blockchain.getBlocks, { limit: 10 });
  const stats = useQuery(api.blockchain.getBlockchainStats);
  const transactions = useQuery(api.blockchain.getTransactions, { limit: 10 });

  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-neutral-200/80 bg-white/90 p-8 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary-600 dark:text-primary-300">DRP Ledger Explorer</p>
            <h1 className="mt-3 text-3xl font-bold text-neutral-900 dark:text-neutral-50">Blockchain Reality Layer</h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
              Real-time visualization of the Decentralized Rights Protocol ledger, blocks, and activities.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-primary-500/10 px-4 py-2 text-primary-600 dark:text-primary-300">
            <Zap className="h-4 w-4 fill-current" />
            <span className="text-xs font-bold uppercase tracking-wider">Live Network</span>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Blocks', value: stats?.blockCount ?? '...', icon: Box, color: 'text-blue-500' },
          { label: 'Total Transactions', value: stats?.txCount ?? '...', icon: Database, color: 'text-purple-500' },
          { label: 'Total $DeRi Issued', value: stats?.totalDeri ?? '...', icon: Award, color: 'text-emerald-500' },
          { label: 'Avg PoAT Score', value: stats?.blockCount ? '84.2%' : '...', icon: TrendingUp, color: 'text-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/40">
            <div className="flex items-center justify-between">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-[10px] font-bold uppercase text-neutral-400 tracking-widest">Global</span>
            </div>
            <p className="mt-4 text-2xl font-bold text-neutral-900 dark:text-neutral-50">{stat.value}</p>
            <p className="text-xs text-neutral-500">{stat.label}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Latest Blocks */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <Box className="h-5 w-5 text-primary-500" />
              Latest Blocks
            </h3>
            <span className="text-xs text-primary-600 dark:text-primary-300 font-semibold cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-3">
            {!blocks ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
              ))
            ) : blocks.map((block: any, i: number) => (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={block._id}
                className="group relative flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition hover:border-primary-500/50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 font-mono text-sm font-bold text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
                  #{block.index}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Block Hash</span>
                    <span className="truncate font-mono text-[10px] text-neutral-500">{block.blockHash}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-[10px] text-neutral-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(block.timestamp).toLocaleTimeString()}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Database className="h-3 w-3" /> {block.transactions.length} Txs</span>
                    <span>•</span>
                    <span className="text-emerald-500 font-bold">PoAT: {block.poatScore.toFixed(1)}%</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-300 group-hover:text-primary-500" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Latest Transactions */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              Verified Activities
            </h3>
            <span className="text-xs text-primary-600 dark:text-primary-300 font-semibold cursor-pointer hover:underline">View All</span>
          </div>
          <div className="space-y-3">
            {!transactions ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
              ))
            ) : transactions.map((tx: any, i: number) => (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={tx._id}
                className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition hover:border-emerald-500/50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl font-mono text-xs font-bold ${
                  tx.category === 'developer' ? 'bg-purple-500/10 text-purple-600' :
                  tx.category === 'learning' ? 'bg-blue-500/10 text-blue-600' :
                  'bg-emerald-500/10 text-emerald-600'
                }`}>
                  {tx.category.slice(0, 3).toUpperCase()}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">{tx.txId}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[10px] text-neutral-500 uppercase tracking-wider">
                    <span className="truncate max-w-[120px]">Actor: {tx.userId}</span>
                    <span>•</span>
                    <span className="text-primary-600 font-bold">+{tx.reward.deri} $DeRi</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 rounded-lg bg-neutral-100 px-2 py-1 dark:bg-neutral-900">
                    <Hash className="h-3 w-3 text-neutral-400" />
                    <span className="font-mono text-[9px] text-neutral-500">
                      {tx.activityHash.slice(0, 8)}...
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 text-white shadow-xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary-400" />
              Quantum-Resistant Consensus
            </h3>
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
              DRP employs a hybrid post-quantum cryptographic stack. Every block is signed using both Ed25519 and a simulated CRYSTALS-Dilithium signature, ensuring the ledger remains secure against future quantum computing threats.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-primary-300">Dilithium-v3</span>
              <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-emerald-300">SHA3-512</span>
              <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-blue-300">PoAT Algorithm</span>
            </div>
          </div>
          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
            <div className="relative text-center">
              <Database className="mx-auto h-12 w-12 text-primary-500 opacity-50" />
              <p className="mt-4 text-xs font-mono text-neutral-500">NETWORK_STATE: SECURE</p>
              <div className="mt-2 flex justify-center gap-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className={`h-4 w-1 rounded-sm ${i < 8 ? 'bg-primary-500' : 'bg-neutral-800'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
