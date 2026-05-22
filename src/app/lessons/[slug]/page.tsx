'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock, Zap, Star,
  Brain, Trophy, ChevronDown, ChevronUp, Send, User, X,
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { LESSONS } from '@/lib/lesson-data'

const LEVEL_COLORS = ['#00e5cc', '#00bfff', '#a855f7', '#f59e0b', '#ffd700']

function QuizQuestion({ q, idx, onAnswer, answered, selected }: {
  q: { id: string; text: string; options: string[]; correct: number; explanation: string }
  idx: number; onAnswer: (qId: string, optIdx: number) => void; answered: boolean; selected: number | null
}) {
  const isCorrect = selected === q.correct
  return (
    <div className="mb-6">
      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        <span className="text-[#00e5cc] font-bold">{idx + 1}. </span>{q.text}
      </p>
      <div className="space-y-2">
        {q.options.map((opt, oIdx) => {
          let cls = 'border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0a0a14] text-gray-700 dark:text-white/60 hover:border-[#00e5cc]/40'
          if (answered) {
            if (oIdx === q.correct) cls = 'border-[#00e5cc] bg-[#00e5cc]/10 text-gray-900 dark:text-white font-semibold'
            else if (oIdx === selected) cls = 'border-red-400 bg-red-400/10 text-red-600 dark:text-red-400'
            else cls = 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#0a0a14] text-gray-400 dark:text-white/25 opacity-60'
          }
          return (
            <button key={oIdx} onClick={() => !answered && onAnswer(q.id, oIdx)} disabled={answered}
              className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 ${cls}`}>
              <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span>{opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`mt-3 p-3 text-xs leading-relaxed border ${
          isCorrect ? 'border-[#00e5cc]/30 bg-[#00e5cc]/5 text-[#00e5cc]' : 'border-red-400/30 bg-red-400/5 text-red-500 dark:text-red-400'
        }`}>
          <span className="font-bold">{isCorrect ? '\u2713 Correct! ' : '\u2717 Not quite. '}</span>{q.explanation}
        </div>
      )}
    </div>
  )
}

function AITutor({ lessonTitle }: { lessonTitle: string }) {
  const [msgs, setMsgs] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: `Hi! I'm your AI tutor for **${lessonTitle}**. Ask me anything about the content \u2014 concepts, diagrams, quiz hints, or DRP-specific questions.` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  async function send() {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMsgs(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are an expert AI tutor for the Decentralized Rights Protocol (DRP) learning platform. The student is studying: "${lessonTitle}". Explain blockchain, DRP, and Web3 concepts clearly. Keep responses concise (2-3 paragraphs). Be warm and encouraging. DRP context: PoAT (Proof of Activity), PoST (Proof of Status), Elder Quorum, $RIGHTS/$DeRi tokens, CRYSTALS post-quantum crypto, Project LAZARUS AI. Format in clean markdown.`,
          messages: [
            ...msgs.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content })),
            { role: 'user', content: userMsg }
          ]
        })
      })
      const data = await res.json()
      setMsgs(prev => [...prev, { role: 'ai', content: data?.content?.[0]?.text || 'Sorry, try again.' }])
    } catch {
      setMsgs(prev => [...prev, { role: 'ai', content: 'Connection error. Please try again.' }])
    } finally { setLoading(false) }
  }

  return (
    <div className="border border-gray-100 dark:border-white/8 bg-white dark:bg-[#0a0a14]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white hover:text-[#00e5cc] transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#00e5cc]/10 border border-[#00e5cc]/20 flex items-center justify-center">
            <Brain className="w-3.5 h-3.5 text-[#00e5cc]" />
          </div>
          <span>AI Tutor</span>
          <span className="text-[10px] px-2 py-0.5 bg-[#00e5cc]/10 text-[#00e5cc] font-bold tracking-widest uppercase border border-[#00e5cc]/20">Claude</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 opacity-40" /> : <ChevronDown className="w-4 h-4 opacity-40" />}
      </button>
      {open && (
        <div className="border-t border-gray-100 dark:border-white/5">
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {msgs.map((m, i) => (
              <div key={i} className={`flex gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${m.role === 'ai' ? 'bg-[#00e5cc]/10 border border-[#00e5cc]/20' : 'bg-gray-100 dark:bg-white/10'}`}>
                  {m.role === 'ai' ? <Brain className="w-3 h-3 text-[#00e5cc]" /> : <User className="w-3 h-3 text-gray-500 dark:text-white/40" />}
                </div>
                <div className={`max-w-[85%] text-xs leading-relaxed px-3 py-2 ${
                  m.role === 'ai' ? 'bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-white/60 border border-gray-100 dark:border-white/5' : 'bg-[#00e5cc]/10 text-gray-900 dark:text-white border border-[#00e5cc]/20'
                }`}>
                  <ReactMarkdown components={{
                    p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                    strong: ({ children }) => <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>,
                    code: ({ children }) => <code className="bg-black/10 dark:bg-white/10 px-1 rounded text-[10px] font-mono">{children}</code>,
                  }}>{m.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#00e5cc]/10 border border-[#00e5cc]/20 flex items-center justify-center shrink-0">
                  <Brain className="w-3 h-3 text-[#00e5cc]" />
                </div>
                <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 px-3 py-2 flex items-center gap-1">
                  {[0,150,300].map(d => <span key={d} className="w-1.5 h-1.5 bg-[#00e5cc] rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="border-t border-gray-100 dark:border-white/5 p-3 flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={`Ask about ${lessonTitle}...`}
              className="flex-1 text-xs px-3 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/25 focus:outline-none focus:border-[#00e5cc]/40" />
            <button onClick={send} disabled={loading || !input.trim()} className="px-3 py-2.5 bg-[#00e5cc] text-black hover:bg-[#00bfff] transition-colors disabled:opacity-40">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = LESSONS[params.slug]
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({})
  const [quizAnswered, setQuizAnswered] = useState<Record<string, boolean>>({})
  const [completed, setCompleted] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)

  if (!lesson) return (
    <div className="min-h-screen bg-white dark:bg-[#030308] pt-32 flex flex-col items-center justify-center text-center px-6">
      <BookOpen className="w-12 h-12 text-gray-300 dark:text-white/20 mb-6" />
      <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Lesson Not Found</h1>
      <p className="text-gray-500 dark:text-white/40 mb-8">This lesson doesn't exist yet.</p>
      <Link href="/learn" className="inline-flex items-center gap-2 px-6 py-3 bg-[#00e5cc] text-black font-bold text-sm hover:bg-[#00bfff] transition-all">
        <ArrowLeft className="w-4 h-4" /> Back to Learn
      </Link>
    </div>
  )

  const levelColor = LEVEL_COLORS[lesson.level - 1]
  const allAnswered = lesson.quiz.questions.every(q => quizAnswered[q.id])
  const correctCount = lesson.quiz.questions.filter(q => quizAnswers[q.id] === q.correct).length
  const score = lesson.quiz.questions.length > 0 ? Math.round((correctCount / lesson.quiz.questions.length) * 100) : 100

  return (
    <main className="min-h-screen bg-white dark:bg-[#030308] text-gray-900 dark:text-white pt-20">
      {showCompletion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white dark:bg-[#0a0a14] border border-gray-200 dark:border-white/10 p-8 max-w-md w-full text-center relative">
            <button onClick={() => setShowCompletion(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
            <Trophy className="w-12 h-12 text-[#ffd700] mx-auto mb-4" />
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Lesson Complete!</h2>
            <p className="text-gray-500 dark:text-white/40 text-sm mb-6">{lesson.title}</p>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[{l:'XP',v:lesson.xp,c:'#ffd700'},{l:'Score',v:`${score}%`,c:'#00e5cc'},{l:'$DeRi',v:`+${lesson.reward}`,c:'#00e5cc'}].map(s => (
                <div key={s.l} className="p-3 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <div className="text-lg font-black" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-[10px] text-gray-400 dark:text-white/30 uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>
            {lesson.nextSlug
              ? <Link href={`/lessons/${lesson.nextSlug}`} onClick={() => setShowCompletion(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00e5cc] text-black font-bold text-sm hover:bg-[#00bfff] transition-all">
                  Next Lesson <ArrowRight className="w-4 h-4" />
                </Link>
              : <Link href="/learn" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00e5cc] text-black font-bold text-sm hover:bg-[#00bfff] transition-all">
                  All Learning Paths
                </Link>
            }
            <button onClick={() => setShowCompletion(false)} className="block mt-3 mx-auto text-sm text-gray-400 hover:text-gray-600 transition-colors">Review lesson</button>
          </div>
        </div>
      )}

      <div className="border-b border-gray-100 dark:border-white/5 bg-white/95 dark:bg-[#030308]/95 backdrop-blur-md sticky top-[60px] z-40">
        <div className="max-w-6xl mx-auto px-6 h-12 flex items-center gap-3">
          <Link href="/learn" className="text-xs text-gray-400 dark:text-white/30 hover:text-[#00e5cc] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Learn
          </Link>
          <span className="text-gray-200 dark:text-white/10">/</span>
          <span className="text-xs font-semibold text-gray-600 dark:text-white/50 truncate">{lesson.title}</span>
          <div className="ml-auto flex items-center gap-3">
            <Clock className="w-3.5 h-3.5 text-gray-400 dark:text-white/25 hidden sm:block" />
            <span className="text-xs text-gray-400 dark:text-white/25 hidden sm:block">{lesson.duration}</span>
            <Zap className="w-3.5 h-3.5" style={{ color: levelColor }} />
            <span className="text-xs font-bold" style={{ color: levelColor }}>+{lesson.reward} $DeRi</span>
            <span className="px-2 py-1 text-[10px] font-bold tracking-widest uppercase border"
              style={{ color: levelColor, borderColor: `${levelColor}30`, backgroundColor: `${levelColor}10` }}>Lv {lesson.level}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
          <div>
            <div className="mb-8 pb-8 border-b border-gray-100 dark:border-white/5">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border text-[10px] font-bold tracking-widest uppercase"
                style={{ color: levelColor, borderColor: `${levelColor}30`, backgroundColor: `${levelColor}08` }}>
                <BookOpen className="w-3 h-3" /> Path 0{lesson.level} \u00b7 Lesson
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-3">{lesson.title}</h1>
              <p className="text-gray-500 dark:text-white/40 leading-relaxed">{lesson.description}</p>
            </div>

            <div className="prose prose-sm max-w-none
              prose-headings:font-black
              prose-h2:text-xl prose-h2:text-gray-900 prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-base prose-h3:text-gray-900 prose-h3:mt-6
              prose-p:text-gray-600 prose-p:leading-relaxed
              prose-li:text-gray-600
              prose-strong:text-gray-900 prose-strong:font-bold
              prose-code:before:content-none prose-code:after:content-none
              prose-code:bg-gray-100 prose-code:text-[#00c4af] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              dark:prose-headings:text-white dark:prose-h2:text-white dark:prose-h3:text-white
              dark:prose-p:text-white/50 dark:prose-li:text-white/50
              dark:prose-strong:text-white dark:prose-code:bg-white/8 dark:prose-code:text-[#00e5cc]
              prose-pre:bg-gray-50 dark:prose-pre:bg-[#0a0a14] prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-white/8 prose-pre:rounded-none
              prose-table:border-collapse
              prose-th:border prose-th:border-gray-200 dark:prose-th:border-white/10 prose-th:bg-gray-50 dark:prose-th:bg-white/5 prose-th:px-3 prose-th:py-2 prose-th:text-xs prose-th:font-bold prose-th:text-left
              prose-td:border prose-td:border-gray-100 dark:prose-td:border-white/5 prose-td:px-3 prose-td:py-2 prose-td:text-sm">
              <ReactMarkdown components={{
                pre: ({ children }) => (
                  <pre className="bg-gray-50 dark:bg-[#0a0a14] border border-gray-200 dark:border-white/8 p-5 overflow-x-auto text-sm font-mono leading-relaxed my-6">{children}</pre>
                ),
                code: ({ inline, children, ...props }: any) => inline
                  ? <code className="bg-gray-100 dark:bg-white/8 text-[#00c4af] dark:text-[#00e5cc] px-1.5 py-0.5 rounded text-[0.85em] font-mono" {...props}>{children}</code>
                  : <code className="block text-sm font-mono" {...props}>{children}</code>,
                h2: ({ children }) => <h2 className="text-xl font-black text-gray-900 dark:text-white mt-10 mb-4 pb-2 border-b border-gray-100 dark:border-white/5">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-bold text-gray-900 dark:text-white mt-6 mb-3">{children}</h3>,
              }}>{lesson.content}</ReactMarkdown>
            </div>

            <div className="mt-12 border-t border-gray-100 dark:border-white/5 pt-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#ffd700]/10 border border-[#ffd700]/20 flex items-center justify-center">
                  <Star className="w-4 h-4 text-[#ffd700]" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-gray-900 dark:text-white">Knowledge Check</h2>
                  <p className="text-xs text-gray-400 dark:text-white/30">{lesson.quiz.questions.length} question{lesson.quiz.questions.length !== 1 ? 's' : ''} \u00b7 Earn <span className="text-[#00e5cc] font-bold">+{lesson.reward} $DeRi</span></p>
                </div>
              </div>
              {lesson.quiz.questions.map((q, idx) => (
                <QuizQuestion key={q.id} q={q} idx={idx}
                  onAnswer={(qId, optIdx) => { setQuizAnswers(p => ({...p,[qId]:optIdx})); setQuizAnswered(p => ({...p,[qId]:true})) }}
                  answered={quizAnswered[q.id] ?? false} selected={quizAnswers[q.id] ?? null} />
              ))}
              {allAnswered && !completed && (
                <div className="mt-6">
                  <div className={`p-4 mb-4 border text-sm ${
                    score >= 60 ? 'border-[#00e5cc]/30 bg-[#00e5cc]/5 text-[#00e5cc]' : 'border-amber-400/30 bg-amber-400/5 text-amber-600 dark:text-amber-400'
                  }`}>
                    <span className="font-bold">Score: {score}%</span> \u2014 {correctCount}/{lesson.quiz.questions.length} correct
                  </div>
                  <button onClick={() => { setCompleted(true); setShowCompletion(true) }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#00e5cc] text-black font-bold text-sm hover:bg-[#00bfff] transition-all">
                    <Trophy className="w-4 h-4" /> Complete \u00b7 Claim {lesson.reward} $DeRi
                  </button>
                </div>
              )}
              {completed && (
                <div className="mt-6 p-5 border border-[#00e5cc]/30 bg-[#00e5cc]/5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00e5cc] shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Complete!</p>
                      <p className="text-xs text-gray-500 dark:text-white/40">+{lesson.xp} XP \u00b7 +{lesson.reward} $DeRi</p>
                    </div>
                  </div>
                  {lesson.nextSlug && (
                    <Link href={`/lessons/${lesson.nextSlug}`} className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00e5cc] hover:text-[#00bfff] whitespace-nowrap">
                      Next <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div className="mt-10 flex gap-4">
              {lesson.prevSlug
                ? <Link href={`/lessons/${lesson.prevSlug}`} className="flex-1 flex items-center gap-2 px-5 py-3.5 border border-gray-200 dark:border-white/10 text-sm text-gray-600 dark:text-white/40 hover:border-[#00e5cc]/40 hover:text-gray-900 dark:hover:text-white transition-all"><ArrowLeft className="w-4 h-4 shrink-0" /> Previous</Link>
                : <div className="flex-1" />}
              {lesson.nextSlug
                ? <Link href={`/lessons/${lesson.nextSlug}`} className="flex-1 flex items-center justify-end gap-2 px-5 py-3.5 border border-gray-200 dark:border-white/10 text-sm text-gray-600 dark:text-white/40 hover:border-[#00e5cc]/40 hover:text-gray-900 dark:hover:text-white transition-all">Next Lesson <ArrowRight className="w-4 h-4 shrink-0" /></Link>
                : <Link href="/learn" className="flex-1 flex items-center justify-end gap-2 px-5 py-3.5 bg-[#00e5cc] text-black font-bold text-sm hover:bg-[#00bfff] transition-all">All Paths <ArrowRight className="w-4 h-4" /></Link>}
            </div>
          </div>

          <div className="space-y-4 lg:sticky lg:top-[108px]">
            <div className="border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-[#0a0a14] p-5">
              <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-white/25 mb-4">Lesson Info</h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, label: 'Duration', value: lesson.duration },
                  { icon: Zap, label: '$DeRi', value: `+${lesson.reward}`, color: levelColor },
                  { icon: Star, label: 'XP', value: `+${lesson.xp}`, color: '#ffd700' },
                  { icon: BookOpen, label: 'Questions', value: String(lesson.quiz.questions.length) },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-gray-400 dark:text-white/25" />
                      <span className="text-xs text-gray-500 dark:text-white/35">{label}</span>
                    </div>
                    <span className={`text-xs font-bold ${color ? '' : 'text-gray-900 dark:text-white'}`} style={color ? { color } : {}}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <AITutor lessonTitle={lesson.title} />
            <Link href="/learn" className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-200 dark:border-white/10 text-xs text-gray-500 dark:text-white/35 hover:border-[#00e5cc]/30 hover:text-[#00e5cc] transition-all">
              <ArrowLeft className="w-3.5 h-3.5" /> Learning Hub
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
