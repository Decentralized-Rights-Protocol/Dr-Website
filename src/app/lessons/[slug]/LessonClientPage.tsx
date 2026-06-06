'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  BookOpen, 
  ArrowLeft, 
  ArrowRight, 
  Trophy, 
  Zap, 
  Shield,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Layers,
  Activity,
  Code
} from 'lucide-react';
import type { Lesson, LessonSection } from '@/data/lessons-index';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { diagramComponents } from '@/components/learn/AsciiDiagramReplacer';

// ─── Diagram Components ──────────────────────────────────────────────

function FlowDiagram({ data }: { data: any }) {
  const nodes = data.nodes || [];
  const edges = data.edges || [];
  return (
    <div className="overflow-x-auto pb-4 custom-scrollbar">
      <div className="flex flex-wrap items-center justify-center gap-4 min-w-max mx-auto px-4 py-6">
        {nodes.map((node: any, i: number) => (
          <div key={node.id} className="flex items-center gap-4">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl px-6 py-4 text-center border border-foreground/10 bg-foreground/5 backdrop-blur-md min-w-[140px] shadow-2xl"
              style={{ borderLeft: `4px solid ${node.color || '#00f2ff'}` }}
            >
              <div className="font-bold text-foreground text-sm whitespace-pre-line leading-tight">{node.label}</div>
              {node.sublabel && <div className="text-xs mt-1.5 text-drp-gray/80 whitespace-pre-line leading-relaxed font-mono">{node.sublabel}</div>}
            </motion.div>
            {i < nodes.length - 1 && (
              <div className="flex flex-col items-center gap-1 text-drp-cyan/40 shrink-0">
                <ChevronRight className="h-5 w-5" />
                {edges[i]?.label && <div className="text-[9px] font-cinematic uppercase tracking-widest max-w-[60px] text-center leading-tight">{edges[i].label}</div>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonDiagram({ data }: { data: any }) {
  if (data.columns && data.rows) {
    return (
      <div className="overflow-x-auto rounded-3xl border border-foreground/5 bg-black/20 my-6">
        <table className="w-full text-sm min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-foreground/5">
              {data.columns.map((col: string, i: number) => (
                <th key={i} className="px-6 py-4 text-left text-drp-gray font-bold uppercase tracking-widest text-xs border-b border-foreground/5">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row: string[], ri: number) => (
              <tr key={ri} className="border-b border-foreground/5 hover:bg-foreground/5 transition-colors">
                {row.map((cell: string, ci: number) => (
                  <td key={ci} className={cn("px-6 py-4", ci === 0 ? 'font-bold text-drp-cyan' : 'text-drp-gray/90')}>
                    {cell.includes('🟢') || cell.includes('🔴') ? (
                       <span className={cn("px-2 py-0.5 rounded-full text-xs font-bold uppercase", 
                        cell.includes('🟢') ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'
                       )}>{cell.replace(/[🟢🔴]/g, '')}</span>
                    ) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {[data.left, data.right].filter(Boolean).map((side: any, i: number) => (
        <motion.div 
          key={i} 
          whileHover={{ y: -4 }}
          className="rounded-3xl p-6 border border-foreground/5 bg-foreground/5 backdrop-blur-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="text-6xl">{side.icon}</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg bg-card/40 border border-foreground/10">{side.icon}</div>
            <h4 className="font-bold text-foreground text-base tracking-tight">{side.title}</h4>
          </div>
          <ul className="space-y-3">
            {side.points.map((pt: string, pi: number) => (
              <li key={pi} className="flex items-start gap-3 text-sm text-drp-gray/80 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: side.color }} />
                {pt}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}

function StackDiagram({ data }: { data: any }) {
  return (
    <div className="space-y-4 my-8 max-w-2xl mx-auto">
      {[...data.layers].reverse().map((layer: any, i: number) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-2xl p-5 border border-foreground/10 bg-foreground/5 backdrop-blur-md group hover:bg-white/10 transition-all"
          style={{ borderLeft: `6px solid ${layer.color}` }}
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-card/40 border border-foreground/10">{layer.icon}</div>
            <div>
              <div className="font-bold text-foreground text-sm tracking-tight">{layer.name}</div>
              <div className="text-xs text-drp-gray font-cinematic uppercase tracking-[0.2em]">{layer.description}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {layer.items.map((item: string, ii: number) => (
              <span key={ii} className="px-3 py-1 rounded-lg text-xs font-mono font-bold text-foreground/70 border border-foreground/5 bg-card/40" >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
      <div className="flex items-center justify-center gap-4 text-foreground/20 py-4 uppercase tracking-[0.5em] text-xs font-black">
        <div className="h-px flex-1 bg-foreground/5" />
        Application Interface Flow
        <div className="h-px flex-1 bg-foreground/5" />
      </div>
    </div>
  );
}

// ─── Block Components ──────────────────────────────────────────────

function CodeBlock({ section }: { section: LessonSection }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(section.code || ''); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  
  return (
    <div className="my-8 rounded-3xl overflow-hidden border border-foreground/10 bg-black/60 shadow-2xl group">
      <div className="flex items-center justify-between px-6 py-3 bg-foreground/5 border-b border-foreground/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
          </div>
          {section.title && <span className="text-xs font-bold text-drp-gray uppercase tracking-widest">{section.title}</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-drp-cyan font-bold uppercase px-2 py-0.5 rounded bg-drp-cyan/10 border border-drp-cyan/20">{section.language || 'code'}</span>
          <button onClick={copy} className="text-[9px] font-bold text-foreground/40 hover:text-drp-cyan transition-colors uppercase tracking-widest">
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
      </div>
      <pre className="p-6 overflow-x-auto text-[13px] font-mono leading-relaxed custom-scrollbar bg-card/40">
        <code className="text-drp-gray/90">
          {section.code?.split('\n').map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-foreground/10 select-none w-4 text-right">{i + 1}</span>
              <span>{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

function CalloutBlock({ section }: { section: LessonSection }) {
  const styles: Record<string, { accent: string; icon: any }> = {
    drp:     { accent: '#00f2ff', icon: Sparkles },
    info:    { accent: '#3b82f6', icon: BookOpen },
    warning: { accent: '#f59e0b', icon: Shield },
    success: { accent: '#10b981', icon: CheckCircle2 },
  };
  const s = styles[section.calloutType || 'info'];
  const Icon = s.icon;

  return (
    <div 
      className="my-8 rounded-[2rem] p-8 border border-foreground/5 bg-card/40 backdrop-blur-xl relative overflow-hidden group"
      style={{ borderLeft: `6px solid ${s.accent}` }}
    >
      <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
        <Icon className="w-24 h-24" />
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 rounded-xl bg-foreground/5 border border-foreground/10 shadow-lg">
          <Icon className="h-5 w-5" style={{ color: s.accent }} />
        </div>
        <h4 className="font-bold text-foreground text-lg tracking-tight">{section.title}</h4>
      </div>
      <p className="text-drp-gray leading-relaxed text-sm md:text-base">{section.content}</p>
    </div>
  );
}

function QuizBlock({ section, onComplete }: { section: LessonSection; onComplete?: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const correct = section.quizAnswer ?? 0;

  return (
    <div className="my-12 rounded-[2.5rem] border border-foreground/10 bg-foreground/5 backdrop-blur-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
      <div className="px-8 py-6 border-b border-foreground/10 bg-foreground/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-drp-cyan/20 border border-drp-cyan/30 flex items-center justify-center">
            <Zap className="h-5 w-5 text-drp-cyan" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-base leading-none mb-1">{section.title || 'Knowledge Check'}</h3>
            <p className="text-xs font-cinematic text-drp-cyan tracking-widest uppercase opacity-60">Verification Phase</p>
          </div>
        </div>
        <div className="hidden sm:block">
           <span className="px-3 py-1 rounded-full text-xs font-bold bg-foreground/5 text-foreground/40 uppercase tracking-widest border border-foreground/10">Quiz</span>
        </div>
      </div>
      <div className="p-8">
        <p className="text-foreground text-lg font-bold mb-8 leading-tight">{section.content}</p>
        <div className="grid gap-4">
          {(section.quizOptions || []).map((opt, i) => {
            let stateStyle = "border-foreground/5 bg-foreground/5 text-drp-gray hover:border-white/20 hover:bg-white/10";
            if (revealed) {
              if (i === correct) stateStyle = "border-emerald-500/50 bg-emerald-500/10 text-emerald-400";
              else if (i === selected) stateStyle = "border-rose-500/50 bg-rose-500/10 text-rose-400";
              else stateStyle = "opacity-40 border-foreground/5 bg-foreground/5 text-drp-gray";
            } else if (selected === i) {
              stateStyle = "border-drp-cyan bg-drp-cyan/10 text-drp-cyan";
            }

            return (
              <button 
                key={i} 
                onClick={() => !revealed && setSelected(i)}
                className={cn(
                  "w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300 font-medium text-sm flex items-center gap-4 group",
                  stateStyle
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold border transition-colors",
                  selected === i ? "border-current" : "border-foreground/10 bg-black/20"
                )}>
                  {String.fromCharCode(65+i)}
                </div>
                {opt}
                {revealed && i === correct && <CheckCircle2 className="h-5 w-5 ml-auto text-emerald-400" />}
              </button>
            );
          })}
        </div>
        
        <AnimatePresence>
          {!revealed && selected !== null && (
            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => { setRevealed(true); if (selected === correct && onComplete) onComplete(); }}
              className="mt-8 w-full py-5 rounded-2xl font-bold text-background bg-white hover:bg-drp-cyan transition-all shadow-xl shadow-white/5 uppercase tracking-widest text-xs"
            >
              Verify Response
            </motion.button>
          )}
        </AnimatePresence>

        {revealed && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={cn(
              "mt-8 p-6 rounded-2xl border backdrop-blur-md",
              selected === correct ? 'bg-emerald-400/5 border-emerald-400/20 text-emerald-400' : 'bg-rose-400/5 border-rose-400/20 text-rose-400'
            )}
          >
            <div className="flex items-center gap-2 font-bold mb-2">
              {selected === correct ? '🎉 EXCELLENT' : '💡 PROTOCOL INSIGHT'}
            </div>
            <p className="text-sm text-drp-gray leading-relaxed">{section.quizExplanation}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── AI Tutor Sidebar ──────────────────────────────────────────────

function AITutor({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user'|'ai'; text: string }[]>([
    { role: 'ai', text: `Greetings, Steward. I am the DRP Knowledge Core. How can I assist your study of **${lesson.title}**?` },
  ]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const q = input.trim(); setInput('');
    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setLoading(true);
    try {
      const res = await fetch('/api/ai-tutor', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ question: q, lessonTitle: lesson.title, pathName: lesson.pathName }) 
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.answer || 'Analyzing DRP datasets...' }]);
    } catch { 
      setMessages(prev => [...prev, { role: 'ai', text: 'Connection to Knowledge Core interrupted. Please retry.' }]); 
    }
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setOpen(true)} 
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-drp-cyan blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-background text-xs transition-all hover:scale-105 active:scale-95 shadow-2xl bg-white">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline uppercase tracking-widest">DRP Knowledge Core</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md" 
              onClick={() => setOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="relative w-full sm:w-[450px] h-[90vh] sm:h-[650px] rounded-t-[2.5rem] sm:rounded-[2.5rem] border border-foreground/10 flex flex-col overflow-hidden shadow-2xl bg-card"
            >
              <div className="p-6 border-b border-foreground/5 bg-foreground/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-drp-cyan/10 border border-drp-cyan/20 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-drp-cyan" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-base leading-tight">Knowledge Core</h4>
                    <p className="text-xs font-cinematic text-drp-cyan tracking-widest uppercase opacity-60">Session Active</p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-foreground/10 transition-colors">
                  <ArrowRight className="h-5 w-5 text-foreground/40 rotate-45" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={cn("flex", m.role === 'user' ? 'justify-end' : 'justify-start')}>
                    <div className={cn(
                      "max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed",
                      m.role === 'user' 
                        ? 'bg-drp-cyan text-background font-medium rounded-tr-sm' 
                        : 'bg-foreground/5 border border-foreground/10 text-drp-gray/90 rounded-tl-sm'
                    )}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="px-5 py-4 rounded-2xl rounded-tl-sm bg-foreground/5 border border-foreground/10 flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-drp-cyan animate-bounce" />
                      <div className="w-1.5 h-1.5 rounded-full bg-drp-cyan animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-drp-cyan animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <div className="p-6 border-t border-foreground/5 bg-foreground/5 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {['Explain simply','Use a metaphor','Historical context?'].map(h => (
                    <button key={h} onClick={() => setInput(h)} className="text-xs font-bold px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/40 hover:text-drp-cyan hover:border-drp-cyan/40 transition-all uppercase tracking-widest">{h}</button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <input 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()} 
                    placeholder="Ask about DRP protocol details..."
                    className="flex-1 bg-card/40 border border-foreground/10 rounded-2xl px-5 py-4 text-sm text-foreground placeholder-foreground/20 outline-none focus:border-drp-cyan/40 transition-colors" 
                  />
                  <button 
                    onClick={send} 
                    disabled={loading || !input.trim()} 
                    className="w-14 rounded-2xl flex items-center justify-center bg-foreground text-background transition-all disabled:opacity-30 hover:bg-drp-cyan shadow-xl shadow-foreground/5"
                  >
                    <ArrowUpIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function ArrowUpIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
  )
}

// ─── Main Component ──────────────────────────────────────────────

export default function LessonClientPage({ lesson }: { lesson: Lesson }) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [isFinished, setIsFinished] = useState(false);
  const total = lesson.sections.length;
  const progress = total > 0 ? (completed.size / total) * 100 : 0;
  
  const mark = (i: number) => {
    const next = new Set(completed);
    next.add(i);
    setCompleted(next);
    if (next.size >= Math.ceil(total * 0.8)) {
      setIsFinished(true);
    }
  };

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
                <span className="text-xl">{lesson.pathIcon}</span>
                <span className="text-xs font-cinematic text-drp-gray uppercase tracking-[0.3em] truncate">
                  {lesson.pathName} · Module {lesson.lessonNumber}
                </span>
              </div>
              <span className="text-xs font-bold text-drp-cyan uppercase tracking-widest">{Math.round(progress)}% Verified</span>
            </div>
            <div className="h-1 rounded-full bg-foreground/5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-drp-cyan via-blue-400 to-drp-cyan" 
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 shrink-0">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-amber-400">+{lesson.deri} $DeRi</span>
              <span className="text-xs font-cinematic text-amber-400/40 uppercase tracking-widest">Rewards</span>
            </div>
            <div className="w-px h-8 bg-foreground/10" />
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-drp-cyan">+{lesson.xp} XP</span>
              <span className="text-xs font-cinematic text-drp-cyan/40 uppercase tracking-widest">Experience</span>
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-xs font-bold text-drp-cyan uppercase tracking-widest mb-8">
            <Zap className="h-3 w-3" />
            {lesson.difficulty} Level Certification
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-foreground mb-6 tracking-tight leading-none">
            {lesson.title}
          </h1>
          <p className="text-lg md:text-xl text-drp-gray max-w-3xl mx-auto leading-relaxed font-medium">
            {lesson.subtitle}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {lesson.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-bold bg-foreground/5 text-foreground/40 border border-foreground/5 uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Key Takeaways Glass Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20 rounded-[2.5rem] border border-foreground/10 bg-gradient-to-br from-drp-cyan/5 to-blue-500/5 p-10 backdrop-blur-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Trophy className="w-48 h-48 text-drp-cyan" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-8 flex items-center gap-3 uppercase tracking-widest">
            <div className="w-2 h-6 rounded-full bg-drp-cyan" />
            Module Objectives
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {lesson.keyTakeaways.map((t, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-drp-cyan/20 flex items-center justify-center text-xs font-bold text-drp-cyan shrink-0 mt-0.5">
                  {i+1}
                </div>
                <p className="text-sm text-drp-gray leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Sections */}
        <div className="space-y-4">
          {lesson.sections.map((section, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              {section.type === 'intro' && (
                <div className="py-12 border-l-2 border-foreground/5 pl-8 md:pl-12 my-8">
                   <div className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-medium italic prose dark:prose-invert max-w-none">
                     <ReactMarkdown components={diagramComponents}>
                      {section.content}
                    </ReactMarkdown>
                  </div>
                  <button onClick={() => mark(i)} className="mt-8 flex items-center gap-2 text-xs font-bold text-drp-cyan uppercase tracking-widest group">
                    <div className={cn("w-5 h-5 rounded-full border border-drp-cyan/30 flex items-center justify-center group-hover:bg-drp-cyan/10", completed.has(i) && "bg-drp-cyan text-background border-drp-cyan")}>
                      {completed.has(i) && <CheckCircle2 className="h-3 w-3" />}
                    </div>
                    {completed.has(i) ? 'Verified' : 'Acknowledge Insight'}
                  </button>
                </div>
              )}

              {section.type === 'concept' && (
                <div className="my-10 p-10 rounded-[2.5rem] border border-foreground/5 bg-foreground/5 backdrop-blur-xl group hover:border-foreground/20 transition-all">
                  {section.title && (
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-4">
                        <span className="text-drp-cyan/20 font-black text-4xl">0{i+1}</span>
                        {section.title}
                      </h3>
                      <div className="w-10 h-10 rounded-2xl bg-card/40 border border-foreground/10 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-drp-gray" />
                      </div>
                    </div>
                  )}
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown components={diagramComponents} className="text-drp-gray leading-relaxed text-lg max-w-none">
                      {section.content}
                    </ReactMarkdown>
                  </div>
                  <div className="mt-10 pt-8 border-t border-foreground/5 flex justify-end">
                    <button 
                      onClick={() => mark(i)} 
                      className={cn(
                        "flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all",
                        completed.has(i) 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                          : "bg-foreground/5 text-foreground/40 border border-foreground/5 hover:bg-foreground/10 hover:text-foreground"
                      )}
                    >
                      {completed.has(i) ? <><CheckCircle2 className="h-4 w-4" /> Concept Mastered</> : 'Verify Understanding'}
                    </button>
                  </div>
                </div>
              )}

              {section.type === 'diagram' && (
                <div className="my-12">
                   {section.title && (
                     <div className="flex items-center gap-3 mb-6">
                       <Layers className="h-4 w-4 text-drp-cyan" />
                       <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">{section.title}</h3>
                     </div>
                   )}
                   <div className="rounded-[2.5rem] border border-foreground/5 bg-card/40 p-2 overflow-hidden shadow-2xl">
                     {section.diagramType === 'flow' && <FlowDiagram data={section.diagramData} />}
                     {section.diagramType === 'comparison' && <ComparisonDiagram data={section.diagramData} />}
                     {section.diagramType === 'stack' && <StackDiagram data={section.diagramData} />}
                   </div>
                   {section.content && <ReactMarkdown components={diagramComponents} className="mt-6 text-sm text-drp-gray/80 text-center max-w-2xl mx-auto leading-relaxed prose dark:prose-invert max-w-none">{section.content}</ReactMarkdown>}
                </div>
              )}

              {section.type === 'code' && <CodeBlock section={section} />}
              {section.type === 'callout' && <CalloutBlock section={section} />}
              {section.type === 'quiz' && <QuizBlock section={section} onComplete={() => mark(i)} />}
            </motion.div>
          ))}
        </div>

        {/* Completion Section */}
        <AnimatePresence>
          {isFinished && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-24 rounded-[3rem] p-12 text-center border border-drp-cyan/20 bg-gradient-to-b from-drp-cyan/10 to-transparent backdrop-blur-3xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-drp-cyan to-transparent" />
              <div className="text-7xl mb-8">🎖️</div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tighter">Lesson Certified</h2>
              <p className="text-drp-gray text-lg mb-10 max-w-xl mx-auto">
                You have successfully completed the protocol verification for this module. Your credentials have been updated.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-black text-amber-400">+{lesson.deri}</div>
                  <div className="text-xs font-cinematic text-amber-400/40 uppercase tracking-widest mt-1">$DeRi Tokens</div>
                </div>
                <div className="w-px h-12 bg-foreground/10" />
                <div className="text-center">
                  <div className="text-3xl font-black text-drp-cyan">+{lesson.xp}</div>
                  <div className="text-xs font-cinematic text-drp-cyan/40 uppercase tracking-widest mt-1">Steward XP</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {lesson.nextLesson ? (
                  <Link 
                    href={`/lessons/${lesson.nextLesson}`} 
                    className="px-10 py-5 rounded-2xl font-bold text-background bg-foreground hover:bg-drp-cyan transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-foreground/5"
                  >
                    Next Protocol Module <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <Link 
                    href="/learn" 
                    className="px-10 py-5 rounded-2xl font-bold text-background bg-foreground hover:bg-drp-cyan transition-all flex items-center justify-center gap-3 shadow-2xl shadow-foreground/5"
                  >
                    Academy Completed <Trophy className="h-5 w-5" />
                  </Link>
                )}
                <Link 
                  href="/learn" 
                  className="px-10 py-5 rounded-2xl font-bold text-foreground border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-all"
                >
                  Return to Hub
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Navigation */}
        {!isFinished && (
           <div className="mt-32 pt-12 border-t border-foreground/5 flex items-center justify-between">
              {lesson.prevLesson ? (
                <Link href={`/lessons/${lesson.prevLesson}`} className="flex items-center gap-3 text-drp-gray hover:text-foreground transition-colors group">
                  <div className="w-10 h-10 rounded-xl border border-foreground/10 flex items-center justify-center group-hover:border-foreground/30 transition-all">
                    <ArrowLeft className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-cinematic uppercase tracking-widest opacity-40">Previous</div>
                    <div className="text-sm font-bold">Back to Security</div>
                  </div>
                </Link>
              ) : <div />}

              {lesson.nextLesson && (
                <Link href={`/lessons/${lesson.nextLesson}`} className="flex items-center gap-3 text-drp-gray hover:text-foreground transition-colors group text-right">
                  <div className="text-right">
                    <div className="text-xs font-cinematic uppercase tracking-widest opacity-40">Next Module</div>
                    <div className="text-sm font-bold">Consensus Engines</div>
                  </div>
                  <div className="w-10 h-10 rounded-xl border border-foreground/10 flex items-center justify-center group-hover:border-drp-cyan/50 group-hover:text-drp-cyan transition-all">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              )}
           </div>
        )}
      </main>

      {/* Background Cinematic Effects */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-drp-cyan/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
      </div>

      <AITutor lesson={lesson} />
    </div>
  );
}
