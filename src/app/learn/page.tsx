'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LESSONS, PATHS } from '@/data/lessons-index';

const TOTAL_XP = Object.values(LESSONS).reduce((sum, l) => sum + l.xp, 0);
const TOTAL_DERI = Object.values(LESSONS).reduce((sum, l) => sum + l.deri, 0);
const TOTAL_LESSONS = Object.keys(LESSONS).length;

export default function LearnPage() {
  const [activePath, setActivePath] = useState<number | null>(null);
  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(160deg,#050d1a,#0d1117)' }}>
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(#7c3aed,transparent)' }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(#0ea5e9,transparent)' }} />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7c3aed44] bg-[#7c3aed11] text-[#a78bfa] text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />DRP Learn — Gamified Education
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
            <span className="text-white">Master </span>
            <span style={{ background: 'linear-gradient(135deg,#7c3aed,#0ea5e9,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Blockchain & DRP</span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            From blockchain basics to advanced DRP architecture — earn XP, $DeRi tokens, and on-chain credentials with every lesson.
          </p>
          <div className="flex flex-wrap justify-center gap-5 mb-10">
            {[{ icon: '📚', value: TOTAL_LESSONS, label: 'Lessons', color: '#0ea5e9' },{ icon: '⚡', value: TOTAL_XP.toLocaleString(), label: 'Total XP', color: '#f59e0b' },{ icon: '🪙', value: `${TOTAL_DERI} $DeRi`, label: 'Earnable', color: '#10b981' },{ icon: '🏆', value: '5', label: 'Certificates', color: '#7c3aed' }].map(s => (
              <div key={s.label} className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/5">
                <span className="text-2xl">{s.icon}</span>
                <div className="text-left">
                  <div className="font-extrabold text-lg" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/lessons/what-is-blockchain" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all hover:scale-105 active:scale-95 shadow-2xl" style={{ background: 'linear-gradient(135deg,#7c3aed,#0ea5e9)', boxShadow: '0 8px 32px #7c3aed55' }}>
            Start Learning → Begin Path 1
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">5 Learning Paths</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Progress through each path in order, or jump to what interests you. Every lesson earns XP and $DeRi tokens.</p>
        </div>
        <div className="space-y-5">
          {PATHS.map((path) => {
            const pathLessons = path.lessons.map(slug => LESSONS[slug]).filter(Boolean);
            const pathXP = pathLessons.reduce((sum, l) => sum + l.xp, 0);
            const pathDeri = pathLessons.reduce((sum, l) => sum + l.deri, 0);
            const isOpen = activePath === path.id;
            return (
              <div key={path.id} className="rounded-2xl border overflow-hidden transition-all" style={{ borderColor: path.color + (isOpen ? '66' : '22'), background: `linear-gradient(135deg,${path.color}0a,#0d111708)` }}>
                <button className="w-full p-6 text-left" onClick={() => setActivePath(isOpen ? null : path.id)}>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 border" style={{ background: path.color+'22', borderColor: path.color+'44' }}>{path.icon}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-slate-500">PATH {path.id}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: path.color+'22', color: path.color }}>{pathLessons[0]?.difficulty}</span>
                        </div>
                        <h3 className="font-extrabold text-white text-lg">{path.name}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                          <span>{path.lessons.length} lessons</span><span>·</span>
                          <span className="text-[#f59e0b]">⚡ {pathXP} XP</span><span>·</span>
                          <span className="text-[#10b981]">+{pathDeri} $DeRi</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link href={`/lessons/${path.lessons[0]}`} onClick={e => e.stopPropagation()} className="px-4 py-2 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105 shadow" style={{ background: `linear-gradient(135deg,${path.color},${path.color}cc)` }}>Start</Link>
                      <span className="text-slate-500 text-sm transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                    </div>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-white/5 pt-5">
                    {pathLessons.map((lesson, li) => (
                      <Link key={lesson.slug} href={`/lessons/${lesson.slug}`} className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 mt-0.5" style={{ background: path.color+'22', color: path.color }}>{li+1}</div>
                        <div className="min-w-0">
                          <div className="font-semibold text-white text-sm truncate">{lesson.title}</div>
                          <div className="text-xs text-slate-500 mt-0.5 line-clamp-2">{lesson.subtitle}</div>
                          <div className="flex items-center gap-2 mt-1.5 text-xs">
                            <span className="text-slate-500">⏱ {lesson.duration}</span>
                            <span className="text-[#f59e0b]">+{lesson.xp} XP</span>
                            <span className="text-[#10b981]">+{lesson.deri} $DeRi</span>
                          </div>
                        </div>
                        <span className="text-slate-600 group-hover:text-slate-300 transition-colors ml-auto shrink-0 mt-1">→</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl p-8 sm:p-10 border border-[#7c3aed33] text-center" style={{ background: 'linear-gradient(135deg,#7c3aed12,#0ea5e908,#10b98108)' }}>
          <h3 className="text-2xl font-extrabold text-white mb-3">Learn. Earn. Govern.</h3>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">Every completed lesson earns you XP and $DeRi tokens. Complete all 5 paths to receive an on-chain DRP Learning Certificate — which counts toward your Activity Score and Elder eligibility.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[{ icon: '🧠', title: 'Learn', desc: 'Complete lessons across 5 progressive paths' },{ icon: '⚡', title: 'Earn', desc: `${TOTAL_XP.toLocaleString()} XP and ${TOTAL_DERI} $DeRi tokens available` },{ icon: '👑', title: 'Govern', desc: 'On-chain certificate contributes to Elder eligibility' }].map(item => (
              <div key={item.title} className="rounded-2xl p-5 border border-white/10 bg-white/5">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-bold text-white mb-1">{item.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
