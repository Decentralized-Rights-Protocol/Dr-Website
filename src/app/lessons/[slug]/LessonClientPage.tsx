'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Lesson, LessonSection } from '@/data/lessons-index';

function FlowDiagram({ data }: { data: any }) {
  const nodes = data.nodes || [];
  const edges = data.edges || [];
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex flex-wrap items-center justify-center gap-2 min-w-max mx-auto px-2">
        {nodes.map((node: any, i: number) => (
          <div key={node.id} className="flex items-center gap-2">
            <div className="rounded-xl px-4 py-3 text-center font-semibold text-white text-sm min-w-[110px] transition-transform hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${node.color}, ${node.color}cc)`, boxShadow: `0 4px 20px ${node.color}44` }}>
              <div className="whitespace-pre-line leading-tight text-sm">{node.label}</div>
              {node.sublabel && <div className="text-xs mt-1 opacity-70 whitespace-pre-line">{node.sublabel}</div>}
            </div>
            {i < nodes.length - 1 && (
              <div className="flex flex-col items-center gap-0.5 text-slate-500 text-xs shrink-0">
                <div className="text-base">→</div>
                {edges[i]?.label && <div className="text-[10px] opacity-60 max-w-[50px] text-center leading-tight">{edges[i].label}</div>}
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
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr className="bg-white/5">
              {data.columns.map((col: string, i: number) => (
                <th key={i} className="px-4 py-3 text-left text-slate-300 font-semibold border-b border-white/10">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row: string[], ri: number) => (
              <tr key={ri} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                {row.map((cell: string, ci: number) => (
                  <td key={ci} className={`px-4 py-3 ${ci === 0 ? 'font-semibold text-white' : 'text-slate-300'}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[data.left, data.right].filter(Boolean).map((side: any, i: number) => (
        <div key={i} className="rounded-2xl p-5 border transition-all hover:scale-[1.01]"
          style={{ borderColor: side.color + '44', background: `linear-gradient(135deg, ${side.color}18, ${side.color}08)` }}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{side.icon}</span>
            <h4 className="font-bold text-white text-sm">{side.title}</h4>
          </div>
          <ul className="space-y-2">
            {side.points.map((pt: string, pi: number) => (
              <li key={pi} className="flex items-start gap-2 text-xs text-slate-300 font-mono leading-relaxed">
                <span style={{ color: side.color }} className="mt-1 shrink-0">●</span>{pt}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function StackDiagram({ data }: { data: any }) {
  return (
    <div className="space-y-2">
      {[...data.layers].reverse().map((layer: any, i: number) => (
        <div key={i} className="rounded-2xl p-4 border transition-all hover:scale-[1.01]"
          style={{ borderColor: layer.color + '44', background: `linear-gradient(135deg, ${layer.color}18, ${layer.color}08)` }}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-lg">{layer.icon}</span>
            <div>
              <div className="font-bold text-white text-sm">{layer.name}</div>
              <div className="text-xs text-slate-400">{layer.description}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {layer.items.map((item: string, ii: number) => (
              <span key={ii} className="px-2 py-1 rounded-lg text-xs font-mono text-white" style={{ background: layer.color + '33' }}>{item}</span>
            ))}
          </div>
        </div>
      ))}
      <div className="text-center text-slate-600 text-xs py-1">▲ Higher Layers · Lower Layers ▼</div>
    </div>
  );
}

function TimelineDiagram({ data }: { data: any }) {
  const colors: Record<string, string> = { active: '#10b981', upcoming: '#0ea5e9', future: '#7c3aed' };
  const labels: Record<string, string> = { active: '● Live', upcoming: '◎ Next', future: '○ Planned' };
  return (
    <div className="relative pl-10">
      <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#10b981] via-[#0ea5e9] to-[#7c3aed] rounded-full" />
      <div className="space-y-4">
        {data.events.map((ev: any, i: number) => {
          const color = colors[ev.status] || '#64748b';
          return (
            <div key={i} className="relative">
              <div className="absolute -left-6 w-4 h-4 rounded-full border-2" style={{ borderColor: color, background: color + '33', top: '14px' }} />
              <div className="rounded-2xl p-4 border" style={{ borderColor: color + '33', background: `linear-gradient(135deg, ${color}12, ${color}06)` }}>
                <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                  <div>
                    <span className="text-xs text-slate-500 font-mono mr-2">{ev.phase}</span>
                    <span className="font-bold text-white">{ev.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{ev.date}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color, background: color + '22' }}>{labels[ev.status]}</span>
                  </div>
                </div>
                <ul className="space-y-1">
                  {ev.items.map((item: string, ii: number) => (
                    <li key={ii} className="text-sm text-slate-300 flex items-center gap-2">
                      <span style={{ color }} className="text-xs shrink-0">▸</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DiagramBlock({ section }: { section: LessonSection }) {
  const d = section.diagramData as any;
  return (
    <div className="my-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      {section.title && (
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#7c3aed] to-[#0ea5e9]" />
          <h3 className="text-base font-bold text-white">{section.title}</h3>
        </div>
      )}
      {section.content && <p className="text-slate-400 text-sm mb-4 leading-relaxed">{section.content}</p>}
      {section.diagramType === 'flow' && <FlowDiagram data={d} />}
      {section.diagramType === 'comparison' && <ComparisonDiagram data={d} />}
      {section.diagramType === 'stack' && <StackDiagram data={d} />}
      {section.diagramType === 'timeline' && <TimelineDiagram data={d} />}
    </div>
  );
}

function CodeBlock({ section }: { section: LessonSection }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(section.code || ''); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const langColor: Record<string, string> = { typescript: '#0ea5e9', javascript: '#f59e0b', solidity: '#7c3aed', python: '#10b981', bash: '#64748b', rust: '#f97316' };
  const lang = section.language || 'code';
  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">{['#ef4444','#f59e0b','#10b981'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}</div>
          {section.title && <span className="text-sm font-semibold text-white">{section.title}</span>}
          <span className="px-2 py-0.5 rounded text-xs font-mono font-bold" style={{ background: (langColor[lang]||'#64748b') + '33', color: langColor[lang]||'#94a3b8' }}>{lang}</span>
        </div>
        <button onClick={copy} className="text-xs px-3 py-1 rounded-lg transition-all font-mono border"
          style={{ background: copied ? '#10b98122' : 'transparent', color: copied ? '#10b981' : '#64748b', borderColor: copied ? '#10b98144' : '#ffffff11' }}>
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      {section.content && <p className="text-slate-400 text-sm px-5 pt-4 pb-2 leading-relaxed">{section.content}</p>}
      <pre className="px-5 py-4 overflow-x-auto bg-[#0a0f1a]">
        <code className="text-slate-200 font-mono text-xs leading-relaxed">{section.code}</code>
      </pre>
    </div>
  );
}

function CalloutBlock({ section }: { section: LessonSection }) {
  const styles: Record<string, { border: string; bg: string; icon: string }> = {
    drp:     { border: '#7c3aed', bg: 'linear-gradient(135deg,#7c3aed18,#4c1d9508)', icon: '⚡' },
    info:    { border: '#0ea5e9', bg: 'linear-gradient(135deg,#0ea5e918,#06407008)', icon: 'ℹ️' },
    warning: { border: '#f59e0b', bg: 'linear-gradient(135deg,#f59e0b18,#92400e08)', icon: '⚠️' },
    success: { border: '#10b981', bg: 'linear-gradient(135deg,#10b98118,#06503508)', icon: '✅' },
  };
  const s = styles[section.calloutType || 'info'];
  return (
    <div className="my-8 rounded-2xl p-5 border-l-4" style={{ borderLeftColor: s.border, background: s.bg }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{s.icon}</span>
        <span className="font-bold text-white text-sm">{section.title}</span>
      </div>
      <p className="text-slate-300 text-sm leading-relaxed">{section.content}</p>
    </div>
  );
}

function QuizBlock({ section, onComplete }: { section: LessonSection; onComplete?: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const correct = section.quizAnswer ?? 0;
  return (
    <div className="my-8 rounded-2xl border border-[#7c3aed33] overflow-hidden shadow-xl"
      style={{ background: 'linear-gradient(135deg,#7c3aed0d,#1e1b4b0d)' }}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#7c3aed22]"
        style={{ background: 'linear-gradient(90deg,#7c3aed18,transparent)' }}>
        <div className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <span className="font-bold text-white">{section.title || 'Knowledge Check'}</span>
        </div>
        <span className="px-3 py-1 rounded-full text-xs bg-[#7c3aed33] text-[#a78bfa] font-semibold border border-[#7c3aed44]">Quiz</span>
      </div>
      <div className="p-6">
        <p className="text-slate-200 font-medium mb-5 text-sm leading-relaxed">{section.content}</p>
        <div className="space-y-2.5">
          {(section.quizOptions || []).map((opt, i) => {
            let cls = 'border-white/10 bg-white/5 text-slate-300 hover:border-[#7c3aed66] hover:bg-[#7c3aed11] cursor-pointer';
            if (revealed) {
              if (i === correct) cls = 'border-[#10b981] bg-[#10b98115] text-[#6ee7b7] cursor-default';
              else if (i === selected) cls = 'border-[#ef4444] bg-[#ef444415] text-[#fca5a5] cursor-default';
              else cls = 'border-white/5 bg-white/[0.02] text-slate-500 cursor-default';
            } else if (selected === i) cls = 'border-[#7c3aed] bg-[#7c3aed22] text-white cursor-pointer';
            return (
              <button key={i} onClick={() => !revealed && setSelected(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm font-medium ${cls}`}>
                <span className="mr-3 font-mono text-xs opacity-50">{String.fromCharCode(65+i)}.</span>{opt}
                {revealed && i === correct && <span className="ml-2 text-xs">✓</span>}
              </button>
            );
          })}
        </div>
        {!revealed && selected !== null && (
          <button onClick={() => { setRevealed(true); if (selected === correct && onComplete) onComplete(); }}
            className="mt-5 w-full py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#6d28d9)' }}>
            Check Answer
          </button>
        )}
        {revealed && (
          <div className={`mt-5 p-4 rounded-xl border text-sm ${selected === correct ? 'bg-[#10b98112] border-[#10b98133] text-[#6ee7b7]' : 'bg-[#ef444412] border-[#ef444433] text-[#fca5a5]'}`}>
            <div className="font-bold mb-1.5">{selected === correct ? '🎉 Correct!' : "💡 Not quite — here's why:"}</div>
            <p className="text-slate-300 text-sm leading-relaxed">{section.quizExplanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function AITutor({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user'|'ai'; text: string }[]>([
    { role: 'ai', text: `Hey! I am your DRP AI Tutor for **${lesson.title}**. Ask me anything — concepts, diagrams, code, or how this connects to the real world. 🎓` },
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
      const res = await fetch('/api/ai-tutor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: q, lessonTitle: lesson.title, pathName: lesson.pathName }) });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.answer || 'Let me think about that...' }]);
    } catch { setMessages(prev => [...prev, { role: 'ai', text: 'Something went wrong — try again!' }]); }
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl font-semibold text-white text-sm transition-all hover:scale-105 active:scale-95 shadow-2xl" style={{ background: 'linear-gradient(135deg,#7c3aed,#0ea5e9)', boxShadow: '0 8px 32px #7c3aed55' }}>
        <span className="text-base">🤖</span><span className="hidden sm:inline">AI Tutor</span><span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full sm:w-[400px] h-[90vh] sm:h-[580px] rounded-t-3xl sm:rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(160deg,#0d1117,#1e1b4b)' }}>
            <div className="flex items-center gap-3 p-4 border-b border-white/10 shrink-0" style={{ background: 'linear-gradient(90deg,#7c3aed22,#0ea5e911)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: 'linear-gradient(135deg,#7c3aed,#0ea5e9)' }}>🤖</div>
              <div className="min-w-0">
                <div className="font-bold text-white text-sm">DRP AI Tutor</div>
                <div className="text-xs text-slate-400 truncate">{lesson.title}</div>
              </div>
              <div className="ml-auto flex items-center gap-2 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span className="text-xs text-[#6ee7b7] hidden sm:inline">Online</span>
                <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all ml-1">✕</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'ai' && <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 mr-2 mt-0.5" style={{ background: 'linear-gradient(135deg,#7c3aed,#0ea5e9)' }}>🤖</div>}
                  <div className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'rounded-br-sm text-white' : 'rounded-bl-sm text-slate-200 border border-white/10'}`}
                    style={m.role === 'user' ? { background: 'linear-gradient(135deg,#7c3aed,#6d28d9)' } : { background: 'rgba(255,255,255,0.05)' }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start items-end gap-2">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0" style={{ background: 'linear-gradient(135deg,#7c3aed,#0ea5e9)' }}>🤖</div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/5 border border-white/10">
                    <div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}</div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <div className="p-4 border-t border-white/10 shrink-0 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {['Explain simply','Real-world example?','How does DRP use this?','What next?'].map(h => (
                  <button key={h} onClick={() => setInput(h)} className="text-xs px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-[#7c3aed55] transition-all">{h}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()} placeholder="Ask anything about this lesson..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-[#7c3aed88] transition-colors" />
                <button onClick={send} disabled={loading || !input.trim()} className="px-4 py-2.5 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-30 hover:opacity-90" style={{ background: 'linear-gradient(135deg,#7c3aed,#0ea5e9)' }}>→</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function LessonClientPage({ lesson }: { lesson: Lesson }) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [xpGranted, setXpGranted] = useState(false);
  const total = lesson.sections.length;
  const progress = total > 0 ? (completed.size / total) * 100 : 0;
  const isComplete = completed.size >= Math.ceil(total * 0.8);
  const diffColor = { Beginner: '#10b981', Intermediate: '#f59e0b', Advanced: '#ef4444' }[lesson.difficulty];
  useEffect(() => { if (isComplete && !xpGranted) setXpGranted(true); }, [isComplete]);
  const mark = (i: number) => setCompleted(prev => new Set([...prev, i]));

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(160deg,#050d1a,#0d1117)' }}>
      <div className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl" style={{ background: 'linear-gradient(90deg,#050d1aee,#0d1117ee)' }}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/learn" className="text-slate-500 hover:text-white transition-colors text-sm shrink-0 flex items-center gap-1">← <span className="hidden sm:inline">Learn</span></Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1 text-xs text-slate-500">
              <span className="truncate">{lesson.pathIcon} {lesson.pathName} · Lesson {lesson.lessonNumber}</span>
              <span className="shrink-0 ml-2">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#7c3aed,#0ea5e9,#10b981)' }} />
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 text-xs font-bold">
            <span className="text-[#f59e0b]">⚡{xpGranted ? `+${lesson.xp}` : lesson.xp} XP</span>
            <span className="text-[#10b981] hidden sm:inline">+{lesson.deri} $DeRi</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: diffColor+'22', color: diffColor }}>{lesson.difficulty}</span>
            <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-slate-400 border border-white/10">⏱ {lesson.duration}</span>
            <span className="px-3 py-1 rounded-full text-xs bg-[#f59e0b22] text-[#f59e0b] border border-[#f59e0b33]">⚡ {lesson.xp} XP</span>
            <span className="px-3 py-1 rounded-full text-xs bg-[#10b98122] text-[#10b981] border border-[#10b98133]">+{lesson.deri} $DeRi</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight">{lesson.title}</h1>
          <p className="text-slate-400 text-lg leading-relaxed">{lesson.subtitle}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {lesson.tags.map(tag => <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-[#7c3aed22] text-[#a78bfa] border border-[#7c3aed22]">{tag}</span>)}
          </div>
        </div>

        <div className="mb-10 rounded-2xl p-6 border border-[#0ea5e933]" style={{ background: 'linear-gradient(135deg,#0ea5e912,#7c3aed08)' }}>
          <h2 className="font-bold text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
            <span className="w-5 h-5 rounded-lg bg-[#0ea5e933] flex items-center justify-center text-[#38bdf8]">🎯</span>
            What You Will Learn
          </h2>
          <ul className="space-y-2.5">
            {lesson.keyTakeaways.map((t, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: '#0ea5e922', color: '#38bdf8' }}>{i+1}</span>{t}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-1">
          {lesson.sections.map((section, i) => (
            <div key={i}>
              {section.type === 'intro' && (
                <div className="my-8 relative pl-6 py-1">
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-[#7c3aed] to-[#0ea5e9]" />
                  <p className="text-lg text-slate-300 leading-relaxed">{section.content}</p>
                  <button onClick={() => mark(i)} className="mt-2 text-xs text-slate-600 hover:text-[#10b981] transition-colors flex items-center gap-1">
                    {completed.has(i) ? '✓ Read' : '✓ Mark as read'}
                  </button>
                </div>
              )}
              {section.type === 'concept' && (
                <div className="my-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-colors">
                  {section.title && (
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0" style={{ background: 'linear-gradient(135deg,#7c3aed33,#0ea5e922)', color: '#a78bfa' }}>{i+1}</span>
                      {section.title}
                    </h3>
                  )}
                  <p className="text-slate-300 leading-relaxed">{section.content}</p>
                  <div className="mt-4 flex justify-end">
                    <button onClick={() => mark(i)} className="text-xs text-slate-600 hover:text-[#10b981] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#10b98110]">
                      {completed.has(i) ? '✓ Understood' : '✓ Got it'}
                    </button>
                  </div>
                </div>
              )}
              {section.type === 'diagram' && <DiagramBlock section={section} />}
              {section.type === 'code' && <CodeBlock section={section} />}
              {section.type === 'callout' && <CalloutBlock section={section} />}
              {section.type === 'quiz' && <QuizBlock section={section} onComplete={() => mark(i)} />}
            </div>
          ))}
        </div>

        {isComplete && (
          <div className="mt-14 rounded-3xl p-8 text-center border border-[#10b98133] shadow-2xl" style={{ background: 'linear-gradient(135deg,#10b98115,#0ea5e912,#7c3aed10)' }}>
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-extrabold text-white mb-1">Lesson Complete!</h2>
            <div className="flex justify-center gap-4 my-4">
              <span className="text-2xl font-extrabold text-[#f59e0b]">+{lesson.xp} XP</span>
              <span className="text-2xl font-extrabold text-[#10b981]">+{lesson.deri} $DeRi</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {lesson.nextLesson
                ? <Link href={`/lessons/${lesson.nextLesson}`} className="px-6 py-3 rounded-2xl font-bold text-white transition-all hover:scale-105 shadow-lg" style={{ background: 'linear-gradient(135deg,#7c3aed,#0ea5e9)', boxShadow: '0 8px 24px #7c3aed44' }}>Next Lesson →</Link>
                : <Link href="/learn" className="px-6 py-3 rounded-2xl font-bold text-white transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg,#7c3aed,#0ea5e9)' }}>🏆 All Lessons Complete!</Link>
              }
              <Link href="/learn" className="px-6 py-3 rounded-2xl font-semibold text-slate-300 border border-white/20 hover:border-white/40 transition-all">View All Paths</Link>
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
          {lesson.prevLesson
            ? <Link href={`/lessons/${lesson.prevLesson}`} className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 text-slate-300 hover:border-[#7c3aed66] hover:text-white transition-all text-sm font-semibold">← Previous</Link>
            : <Link href="/learn" className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/10 text-slate-300 hover:border-white/20 transition-all text-sm">← All Paths</Link>
          }
          {lesson.nextLesson && (
            <Link href={`/lessons/${lesson.nextLesson}`} className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white text-sm transition-all hover:scale-105 shadow-lg" style={{ background: 'linear-gradient(135deg,#7c3aed,#0ea5e9)', boxShadow: '0 4px 20px #7c3aed44' }}>
              Next Lesson →
            </Link>
          )}
        </div>
      </div>
      <AITutor lesson={lesson} />
    </div>
  );
}
