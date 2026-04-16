'use client';

import { useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/../convex/_generated/api';
import { 
  Activity, 
  Database, 
  Hash, 
  Clock, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  Link as LinkIcon,
  Github,
  Youtube,
  FileText,
  Code,
  Globe,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  { id: 'learning', label: 'Learning', icon: Youtube, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'developer', label: 'Developer', icon: Github, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 'content', label: 'Content', icon: Globe, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { id: 'productivity', label: 'Productivity', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
  { id: 'web3', label: 'Web3', icon: Database, color: 'text-orange-500', bg: 'bg-orange-500/10' },
];

const TYPES: Record<string, { id: string, label: string }[]> = {
  learning: [
    { id: 'reading', label: 'Reading Article' },
    { id: 'video', label: 'Watching Video' },
    { id: 'course', label: 'Course Completion' },
    { id: 'notes', label: 'Note-taking' },
  ],
  developer: [
    { id: 'commit', label: 'GitHub Commit' },
    { id: 'pr', label: 'Pull Request' },
    { id: 'repo', label: 'Repo Creation' },
    { id: 'contribution', label: 'Code Contribution' },
  ],
  content: [
    { id: 'blog', label: 'Blog Post' },
    { id: 'social', label: 'Social Post' },
    { id: 'video_upload', label: 'Video Upload' },
    { id: 'design', label: 'Design Upload' },
  ],
  productivity: [
    { id: 'task', label: 'Task Completed' },
    { id: 'document', label: 'Document Created' },
    { id: 'time_track', label: 'Time Tracked' },
  ],
  web3: [
    { id: 'wallet_tx', label: 'Wallet Interaction' },
    { id: 'contract_call', label: 'Smart Contract' },
  ],
};

export default function ActivitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState('learning');
  const [selectedType, setSelectedType] = useState('reading');
  const [title, setTitle] = useState('');
  const [proof, setProof] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastVerdict, setLastVerdict] = useState<any>(null);

  const submitActivity = useMutation(api.activities.submitActivity);
  const activities = useQuery(api.activities.getActivities, { limit: 10 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await submitActivity({
        category: selectedCategory,
        type: selectedType,
        metadata: { title, url },
        proof: proof || url,
      });
      setLastVerdict(result);
      setTitle('');
      setProof('');
      setUrl('');
      setTimeout(() => setLastVerdict(null), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-neutral-200/80 bg-white/90 p-8 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <p className="text-sm font-semibold text-primary-600 dark:text-primary-300">Activity Verification Engine</p>
        <h1 className="mt-3 text-3xl font-bold text-neutral-900 dark:text-neutral-50">Proof of Activity (PoAT)</h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          Submit your digital contributions to be verified by DRP Elders and earn $DeRi and $RIGHTS rewards.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[0.6fr_0.4fr]">
        <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Submit New Activity</h3>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedType(TYPES[cat.id][0].id);
                  }}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === cat.id 
                    ? 'border-primary-500 bg-primary-500/10 text-primary-600 dark:text-primary-300' 
                    : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400'
                  }`}
                >
                  <cat.icon className={`h-4 w-4 ${selectedCategory === cat.id ? cat.color : ''}`} />
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Activity Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-950"
                >
                  {TYPES[selectedCategory].map((t) => (
                    <option key={t.id} value={t.id}>{t.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Title</label>
                <input
                  type="text"
                  required
                  placeholder="What did you do?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-950"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">URL / Reference</label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="url"
                  placeholder="Link to your work (GitHub, YouTube, Blog...)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full rounded-xl border border-neutral-200 bg-white py-2 pl-10 pr-4 text-sm dark:border-neutral-800 dark:bg-neutral-950"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Proof Details / Narrative</label>
              <textarea
                placeholder="Describe your activity in detail for the DRP Elders..."
                value={proof}
                onChange={(e) => setProof(e.target.value)}
                className="h-32 w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm dark:border-neutral-800 dark:bg-neutral-950"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Verifying with Elders...' : 'Submit Activity Proof'}
            </button>
          </form>

          <AnimatePresence>
            {lastVerdict && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 rounded-2xl border p-4 ${
                  lastVerdict.verdict === 'approved' 
                  ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' 
                  : 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {lastVerdict.verdict === 'approved' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                  <div>
                    <p className="font-bold capitalize">Result: {lastVerdict.verdict}</p>
                    <p className="text-xs opacity-90">Score: {lastVerdict.score}/100</p>
                    {lastVerdict.verdict === 'approved' && (
                      <p className="mt-1 text-sm">
                        Rewarding <strong>{lastVerdict.reward.deri} $DeRi</strong> and <strong>{lastVerdict.reward.rights} $RIGHTS</strong>.
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Recent Activities</h3>
            <div className="mt-4 space-y-4">
              {!activities ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-800" />
                ))
              ) : activities.length === 0 ? (
                <p className="text-center py-8 text-sm text-neutral-500">No activities submitted yet.</p>
              ) : (
                activities.map((act: any) => (
                  <div key={act._id} className="group relative flex items-start gap-3 rounded-xl border border-neutral-100 p-3 transition hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-950">
                    <div className={`mt-1 h-2 w-2 rounded-full ${act.status === 'approved' ? 'bg-emerald-500' : act.status === 'rejected' ? 'bg-rose-500' : 'bg-amber-500'}`} />
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">{(act.metadata as any).title}</p>
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-500">
                        <span className="font-bold">{act.category}</span>
                        <span>•</span>
                        <span>{new Date(act.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {act.status === 'approved' && (
                      <div className="text-right">
                        <p className="text-xs font-bold text-primary-600">+{act.reward.deri}</p>
                        <p className="text-[10px] text-neutral-400">$DeRi</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-primary-600 to-indigo-700 p-6 text-white shadow-lg">
            <h4 className="font-bold">Elders Verification</h4>
            <p className="mt-2 text-sm opacity-90">
              Every activity is hashed using SHA3-512 and signed with a post-quantum resistant simulation (Dilithium).
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-xs">
                <Hash className="h-3 w-3" />
                SHA3-512
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 text-xs">
                <Shield className="h-3 w-3" />
                Dilithium
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
