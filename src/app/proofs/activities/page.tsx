'use client'

import { useState, useEffect } from 'react';
import { Youtube, Github, Globe, CheckCircle2, Database, Trash2, Link } from 'lucide-react'; // Added Link for tx hash
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';

// Mock data for categories and types, assuming these will be relevant
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
  const [lastVerdict, setLastVerdict] = useState<any>(null); // Stores result from Convex mutation
  const [verificationResult, setVerificationResult] = useState<any>(null); // Stores result from API verification

  // Fetch existing activities
  const activities = useQuery(api.activities.getActivities, { limit: 10 });

  // Submit activity to our backend API for verification
  const verifyActivity = async () => {
    setIsSubmitting(true);
    try {
      const verificationResponse = await fetch('/api/submit-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: selectedCategory,
          type: selectedType,
          metadata: { title, url },
          proof: proof || url,
        }),
      });

      if (!verificationResponse.ok) {
        const errorText = await verificationResponse.text();
        throw new Error(`Verification failed: ${errorText}`);
      }

      const data = await verificationResponse.json();
      // data is expected to contain { chain_tx_hash, status, score, reward, hash, signature }
      setVerificationResult(data);
    } catch (err) {
      console.error('Verification error:', err);
      // Handle error display to user
    } finally {
      setIsSubmitting(false);
    }
  };

  // Call the internal Convex mutation with verified data
  const createActivityRecord = useMutation(api.activities._createActivityRecord);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If not verified yet, trigger verification first
    if (!verificationResult) {
      await verifyActivity();
      // If verification was successful, verificationResult will be populated
      if (!verificationResult) return; // Exit if verification failed
    }

    setIsSubmitting(true);
    try {
      // Ensure we have the verification data before proceeding
      if (!verificationResult) throw new Error("Verification data is missing.");

      const result = await createActivityRecord({
        // Pass data received from the backend API
        ...verificationResult,
        // Map frontend selections to backend expectations if necessary, or pass directly
        userId: 'user_id_placeholder', // This should be dynamically fetched from ctx.auth.getUserIdentity() in Convex
        type: selectedType,
        category: selectedCategory,
        metadata: { title, url },
        proof: proof || url,
      });

      setLastVerdict(result);
      // Clear form and states after successful submission
      setTitle('');
      setProof('');
      setUrl('');
      setVerificationResult(null); // Clear verification result after submission
      setTimeout(() => setLastVerdict(null), 5000);
    } catch (err) {
      console.error('Convex submission error:', err);
      // Handle error display to user
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
                    setSelectedType(TYPES[cat.id]?.[0]?.id || ''); // Safely access default type
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

            <div className="flex flex-wrap gap-4">
              {TYPES[selectedCategory]?.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    selectedType === type.id
                      ? 'bg-secondary-500 text-secondary-900 dark:bg-secondary-300 dark:text-secondary-900'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <label htmlFor="title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Activity Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Completed 'Introduction to Convex' course"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="proof" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Proof of Activity (Link or Description)
              </label>
              <input
                id="proof"
                type="text"
                value={proof}
                onChange={(e) => setProof(e.target.value)}
                placeholder="e.g., Link to completed course certificate or description of task"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="url" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Optional URL (e.g., GitHub repo, article link)
              </label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/your-activity"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
              />
            </div>

            <AnimatePresence>
              {isSubmitting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 p-4 rounded-xl border bg-neutral-900/40 border-neutral-700"
                >
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                  <span className="text-sm font-medium text-neutral-300">Verifying your activity...</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {lastVerdict && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-4 rounded-xl border text-sm"
                  style={{
                    borderColor: lastVerdict.verdict === 'approved' ? '#10B981' : lastVerdict.verdict === 'rejected' ? '#EF4444' : '#F59E0B',
                    backgroundColor: lastVerdict.verdict === 'approved' ? '#10B98110' : lastVerdict.verdict === 'rejected' ? '#EF444410' : '#F59E0B10',
                    color: lastVerdict.verdict === 'approved' ? '#10B981' : lastVerdict.verdict === 'rejected' ? '#EF4444' : '#F59E0B',
                  }}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    {lastVerdict.verdict === 'approved' && <CheckCircle2 className="h-5 w-5" />}
                    {lastVerdict.verdict === 'rejected' && <Trash2 className="h-5 w-5" />}
                    {lastVerdict.verdict === 'pending' && <Clock className="h-5 w-5" />}
                    {lastVerdict.verdict.toUpperCase()}
                  </div>
                  {lastVerdict.verdict === 'approved' && (
                    <div className="mt-3 space-y-2">
                      <p>Score: {lastVerdict.score.toFixed(2)}</p>
                      <p>Reward: {lastVerdict.reward.deri} DeRi, {lastVerdict.reward.rights} RIGHTS</p>
                      {lastVerdict.chainTxHash && (
                        <p className="text-xs text-gray-400">
                          Transaction Hash: <a href={`/explorer/transactions/${lastVerdict.chainTxHash}`} className="underline hover:text-primary-400">{lastVerdict.chainTxHash.slice(0, 10)}...{lastVerdict.chainTxHash.slice(-8)}</a>
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting || !proof} // Disable if submitting or proof is empty
              className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Recent Activities</h3>
          <div className="mt-4 space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
            {activities && activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="border-b border-neutral-700/50 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-base text-neutral-100">{activity.title}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-1">{activity.description}</p>
                    </div>
                    <span className={cn('px-2 py-1 rounded text-xs font-semibold border', getStatusBadge(activity.verification_status))}>
                      {activity.verification_status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
                    <div className="flex items-center gap-1">
                      <Hash className="h-3 w-3" />
                      <span className="font-mono">{activity.hash.slice(0, 6)}...{activity.hash.slice(-4)}</span>
                    </div>
                    {activity.chainTxHash && (
                      <div className="flex items-center gap-1">
                        <Link className="h-3 w-3" />
                        <a href={`/explorer/transactions/${activity.chainTxHash}`} className="font-mono underline hover:text-primary-400" target="_blank" rel="noopener noreferrer">
                          {activity.chainTxHash.slice(0, 6)}...{activity.chainTxHash.slice(-4)}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="font-mono">{new Date(activity.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-neutral-400 py-4">No recent activities found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
