'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Zap,
  Sparkles,
  Trophy
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { diagramComponents } from '@/components/learn/AsciiDiagramReplacer';
import { cn } from '@/lib/utils';
import { IconRenderer } from '@/components/ui/IconRenderer';
import LessonSkeleton from '@/components/learn/LessonSkeleton';

export default function LegacyLessonClientPage({ lessonId }: { lessonId: string }) {
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadLesson = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/learn/lesson/${lessonId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setLesson(data);
      } catch (error) {
        console.error('Failed to load lesson:', error);
        setLesson(null);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) loadLesson();
  }, [lessonId]);

  if (loading) return <LessonSkeleton />;
  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8">
        <h1 className="text-4xl font-black mb-6">Protocol Fragment Not Found</h1>
        <p className="text-drp-gray mb-10 text-center max-w-md">The educational module you are seeking is either restricted or moved in the protocol hierarchy.</p>
        <Link href="/learn" className="px-8 py-4 rounded-2xl bg-foreground text-background font-bold hover:bg-drp-cyan transition-all">Return to Academy Hub</Link>
      </div>
    );
  }

  const lessonRewards = 20;
  const lessonXP = 100;

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-drp-cyan/30 selection:text-drp-cyan">
      {/* Cinematic Top Progress Nav */}
      <div className="sticky top-0 z-[100] border-b border-foreground/5 bg-background/60 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-6">
          <Link href="/learn" className="p-2 rounded-xl hover:bg-foreground/5 text-drp-gray hover:text-foreground transition-all">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <IconRenderer name="BookOpen" className="h-5 w-5 text-drp-gray" />
                <span className="text-[10px] font-cinematic text-drp-gray uppercase tracking-[0.3em] truncate">
                  Academy Module · {lessonId.replace(/-/g, ' ')}
                </span>
              </div>
              <span className="text-[10px] font-bold text-drp-cyan uppercase tracking-widest">{completed ? '100% Verified' : 'Reading Session'}</span>
            </div>
            <div className="h-1 rounded-full bg-foreground/5 overflow-hidden">
              <motion.div 
                animate={{ width: completed ? '100%' : '30%' }}
                className="h-full bg-gradient-to-r from-drp-cyan to-blue-400" 
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 shrink-0">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-amber-400">+{lessonRewards} $DeRi</span>
              <span className="text-[8px] font-cinematic text-amber-400/40 uppercase tracking-widest">Rewards</span>
            </div>
            <div className="w-px h-8 bg-foreground/10" />
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-drp-cyan">+{lessonXP} XP</span>
              <span className="text-[8px] font-cinematic text-drp-cyan/40 uppercase tracking-widest">Experience</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-[10px] font-bold text-drp-cyan uppercase tracking-widest mb-8">
            <Zap className="h-3 w-3" />
            Core Curriculum Module
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-foreground mb-6 tracking-tight leading-none">
            {lesson.title || lessonId.replace(/-/g, ' ')}
          </h1>
          <p className="text-lg md:text-xl text-drp-gray max-w-3xl mx-auto leading-relaxed font-medium">
            {lesson.description || 'Master this module to strengthen your protocol governance weight and understanding.'}
          </p>
        </motion.div>

        {/* Markdown Content Area */}
        <div className="prose dark:prose-invert max-w-none prose-p:text-drp-gray/90 prose-p:text-lg prose-p:leading-relaxed prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight prose-a:text-drp-cyan prose-strong:text-foreground prose-code:text-drp-cyan prose-code:bg-drp-cyan/10 prose-code:px-1 prose-code:rounded">
          <ReactMarkdown components={diagramComponents}>
            {lesson.content}
          </ReactMarkdown>
        </div>

        {/* Finish Button Section */}
        {!completed ? (
          <div className="mt-20 flex justify-center border-t border-foreground/5 pt-12">
            <button 
              onClick={() => setCompleted(true)}
              className="px-12 py-5 rounded-2xl font-bold text-background bg-foreground hover:bg-drp-cyan transition-all shadow-2xl shadow-foreground/5 uppercase tracking-widest text-xs"
            >
              Mark Module as Complete
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-24 rounded-[3rem] p-12 text-center border border-drp-cyan/20 bg-gradient-to-b from-drp-cyan/10 to-transparent backdrop-blur-3xl shadow-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-drp-cyan to-transparent" />
            <Medal className="w-24 h-24 mb-8 text-amber-400" />
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tighter">Module Certified</h2>
            <p className="text-drp-gray text-lg mb-10 max-w-xl mx-auto">
              You have completed the reading for this curriculum module. Rewards have been allocated to your profile.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-black text-amber-400">+{lessonRewards}</div>
                <div className="text-[10px] font-cinematic text-amber-400/40 uppercase tracking-widest mt-1">$DeRi Tokens</div>
              </div>
              <div className="w-px h-12 bg-foreground/10" />
              <div className="text-center">
                <div className="text-3xl font-black text-drp-cyan">+{lessonXP}</div>
                <div className="text-[10px] font-cinematic text-drp-cyan/40 uppercase tracking-widest mt-1">Steward XP</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/learn" 
                className="px-10 py-5 rounded-2xl font-bold text-background bg-foreground hover:bg-drp-cyan transition-all flex items-center justify-center gap-3 shadow-2xl shadow-foreground/5"
              >
                Continue Curriculum <Trophy className="h-5 w-5" />
              </Link>
              <Link 
                href="/learn" 
                className="px-10 py-5 rounded-2xl font-bold text-foreground border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-all"
              >
                Return to Hub
              </Link>
            </div>
          </motion.div>
        )}

        {/* Footer Navigation */}
        <div className="mt-32 pt-12 border-t border-foreground/5 flex items-center justify-between">
            <Link href="/learn" className="flex items-center gap-3 text-drp-gray hover:text-foreground transition-colors group">
                <div className="w-10 h-10 rounded-xl border border-foreground/10 flex items-center justify-center group-hover:border-foreground/30 transition-all">
                <ArrowLeft className="h-5 w-5" />
                </div>
                <div className="text-left">
                <div className="text-[8px] font-cinematic uppercase tracking-widest opacity-40">Academy</div>
                <div className="text-sm font-bold">Back to Hub</div>
                </div>
            </Link>
            
            <div className="text-right">
                <div className="text-[8px] font-cinematic uppercase tracking-widest opacity-40">Module Hash</div>
                <div className="text-[10px] font-mono text-drp-cyan/40">{lessonId.slice(0, 16)}...</div>
            </div>
        </div>
      </main>

      {/* Background Cinematic Effects */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-drp-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>
    </div>
  );
}
