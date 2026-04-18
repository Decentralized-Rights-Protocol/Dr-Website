'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Trophy,
  Play,
  Pause,
  BookOpen,
  ChevronRight,
  Coins,
  Brain,
  Sparkles
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { ThinkFirstQuestion } from '@/components/learn/ThinkFirstQuestion'
import { ConceptDiagram } from '@/components/learn/ConceptDiagram'
import { Checkpoint } from '@/components/learn/Checkpoint'
import { parseQuestionsFromContent, extractSections } from '@/lib/learn-content-parser'
import { diagramComponents } from '@/components/learn/AsciiDiagramReplacer'
import { ConceptCard, DidYouKnow, ChallengeMode, QuickRecap, EarnDeRi } from '@/learn/components/gamified'
import { getLessonDiagram } from '@/learn/components/diagrams/LessonSpecificDiagrams'
import { shuffleStringOptions } from '@/learn/utils/quiz-helpers'
import { 
  CuriosityTrigger, 
  UnderstandingTrigger, 
  IdentityTrigger, 
  AgencyTrigger, 
  StewardshipTrigger 
} from '@/learn/components/psychology'
import { Button } from '@/components/ui/button'

// Helper for time formatting
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Diagram Components (from the prompt's fixes)
function LayerDiagram({ layers }: { layers: string[] }) {
  const colors = ['from-indigo-700 to-indigo-600', 'from-violet-700 to-violet-600', 
                   'from-purple-700 to-purple-600', 'from-blue-700 to-blue-600'];
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 my-6">
      <div className="space-y-2">
        {layers.map((layer, i) => (
          <div key={i} 
            className={`rounded-lg bg-gradient-to-r ${colors[i % colors.length]} px-5 py-3 
                text-white text-sm font-semibold text-center shadow-md`}
            style={{ marginInline: `${i * 12}px` }}>
            {layer}
          </div>
        ))}
      </div>
    </div>
  );
}

function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 my-6 overflow-x-auto custom-scrollbar">
      <div className="flex items-center gap-0 min-w-max">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="rounded-xl bg-slate-800 border border-indigo-500/30 
                px-4 py-3 text-sm text-slate-200 text-center max-w-[140px] 
                leading-snug shadow">
              {step}
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center px-1">
                <div className="h-0.5 w-6 bg-indigo-500/40"/>
                <ChevronRight className="w-4 h-4 text-indigo-500/60 -ml-1"/>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BlockchainDiagram() {
  const blocks = [
    { label: 'Block 1', hash: '0x1a2b', prev: 'null' },
    { label: 'Block 2', hash: '0x3c4d', prev: '0x1a2b' },
    { label: 'Block 3', hash: '0x5e6f', prev: '0x3c4d' },
  ];
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 my-6 overflow-x-auto custom-scrollbar">
      <div className="flex items-center gap-2 min-w-max">
        {blocks.map((block, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="rounded-lg border border-indigo-500/40 bg-slate-800 
                p-4 text-xs space-y-1 min-w-[120px] shadow-lg shadow-indigo-900/10">
              <div className="font-bold text-indigo-400">{block.label}</div>
              <div className="text-slate-400">Hash: <span className="text-slate-300 font-mono">{block.hash}</span></div>
              <div className="text-slate-400">Prev: <span className="text-slate-300 font-mono">{block.prev}</span></div>
            </div>
            {i < blocks.length - 1 && (
              <ChevronRight className="text-indigo-500 w-5 h-5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface LessonContent {
  id: string
  slug: string
  title: string
  content: string
  duration: number
  reward: number
  level?: number
  description?: string
  quiz: {
    questions: Array<{
      id: string
      question: string
      options: string[]
      correct: number
    }>
  }
}

interface QuizState {
  currentQuestion: number
  answers: { [key: string]: number }
  completed: boolean
  score: number
}

export default function LessonPageClient({ lesson }: { lesson: LessonContent }) {
  const router = useRouter()
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    completed: false,
    score: 0
  })
  const [timeSpent, setTimeSpent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [revealedQuestions, setRevealedQuestions] = useState<Set<string>>(new Set())
  // CRITICAL FIX: Track revealed state per quiz question ID to prevent state leakage
  const [revealedQuizQuestions, setRevealedQuizQuestions] = useState<Set<string>>(new Set())
  
  // Shuffle quiz options per question on mount/change
  // Store shuffled questions with new correct indices
  const shuffledQuiz = useMemo(() => {
    return lesson.quiz.questions.map(q => {
      const { shuffled, newCorrectIndex } = shuffleStringOptions(q.options, q.correct)
      return {
        ...q,
        options: shuffled,
        correct: newCorrectIndex
      }
    })
  }, [lesson.quiz.questions])

  // Parse questions and sections from content
  const { parsedQuestions, sections } = useMemo(() => {
    const questions = parseQuestionsFromContent(lesson.content)
    const contentSections = extractSections(lesson.content)
    return { parsedQuestions: questions, sections: contentSections }
  }, [lesson.content])

  // Determine diagram type based on lesson content
  const getDiagramType = (): 'architecture' | 'consensus' | 'governance' | 'economic' | 'flow' | 'layers' | null => {
    const content = lesson.content.toLowerCase()
    if (content.includes('architecture') || content.includes('layer')) return 'architecture'
    if (content.includes('consensus') || content.includes('post') || content.includes('poat')) return 'consensus'
    if (content.includes('governance') || content.includes('elder quorum')) return 'governance'
    if (content.includes('economic') || content.includes('token') || content.includes('reward')) return 'economic'
    if (content.includes('flow') || content.includes('process')) return 'flow'
    if (content.includes('layer')) return 'layers'
    return null
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answerIndex }
    }))
  }

  const submitQuiz = () => {
    if (!lesson) return
    
    let score = 0
    shuffledQuiz.forEach(question => {
      if (quizState.answers[question.id] === question.correct) {
        score++
      }
    })
    
    const finalScore = (score / shuffledQuiz.length) * 100
    setQuizState(prev => ({ ...prev, completed: true, score: finalScore }))
    
    // Submit completion to API with logging on failure
    void (async () => {
      try {
        await fetch('/api/learn/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lessonId: lesson.id,
            score: finalScore,
            timeSpent,
            answers: quizState.answers
          })
        })
      } catch (error) {
        console.error('Error submitting lesson completion:', error)
      }
    })()
  }

  const handleQuestionRevealed = (questionId: string) => {
    setRevealedQuestions(prev => new Set(prev).add(questionId))
  }

  // Calculate progress based on sections and questions
  const progressPercentage = useMemo(() => {
    const totalItems = sections.length + parsedQuestions.length
    const completedItems = completedSections.size + revealedQuestions.size
    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0
  }, [sections.length, parsedQuestions.length, completedSections.size, revealedQuestions.size])

  // Extract level from lesson ID (format: "1-1", "2-3", etc.) or use provided level
  const lessonLevel = lesson.level || (lesson.id ? parseInt(lesson.id.split('-')[0]) : 1)

  // Filter out question blocks from content for display
  const filteredContent = useMemo(() => {
    // Remove question blocks from content (they'll be displayed separately)
    return lesson.content.replace(/###\s+Question\s+\d+[\s\S]*?(?=###|##|$)/gi, '')
  }, [lesson.content])

  const progress = showQuiz ? 100 : Math.max(progressPercentage, Math.min(Math.floor((timeSpent / (lesson.duration * 60)) * 100), 95));

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Sticky Header Bar */}
      <div className="sticky top-0 z-30 -mx-4 px-4 py-3 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 mb-8">
        <div className="flex items-center justify-between gap-4">
          <button 
            onClick={() => router.push('/learn')}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back to Learn</span>
          </button>
          
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Timer */}
            <div className="flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 shadow-inner">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-sm font-mono font-bold text-white">{formatTime(timeSpent)}</span>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="ml-1 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
            </div>
            
            {/* Level badge */}
            <div className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
              Level {lessonLevel}
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Progress */}
      <div className="mb-10 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
          <span>Your Progress</span>
          <span className="text-indigo-400">{progress.toFixed(0)}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      {/* Lesson Title & Meta */}
      <div className="space-y-6 mb-12">
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {lesson.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs font-bold text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            {lesson.duration} minutes
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-black text-emerald-400 uppercase tracking-widest">
            <Coins className="w-3.5 h-3.5" />
            {lesson.reward} $DeRi reward
          </div>
        </div>
      </div>

      {/* Psychology Triggers */}
      <div className="mb-12 space-y-6">
        {lessonLevel === 1 && (
          <CuriosityTrigger
            lessonTitle={lesson.title}
            whyItMatters={lesson.description || `Understanding ${lesson.title} is fundamental to mastering blockchain technology and DRP.`}
            rewardAmount={lesson.reward}
          />
        )}
        {lessonLevel === 2 && (
          <UnderstandingTrigger
            lessonTitle={lesson.title}
            keyConcepts={['DRP architecture', 'Consensus mechanisms', 'Activity proofs']}
            lockedUntilUnderstanding={true}
          />
        )}
        {lessonLevel === 3 && (
          <IdentityTrigger learnerTitle="DRP Contributor" progressPercentage={progress} level={lessonLevel} />
        )}
      </div>

      {/* Lesson Content Area */}
      <article className="rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-10 shadow-2xl backdrop-blur-sm
          prose prose-invert prose-slate max-w-none
          prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-xl prose-h3:text-indigo-300 prose-h3:mt-8
          prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-lg
          prose-li:text-slate-300 prose-li:text-lg
          prose-strong:text-white prose-strong:font-bold
          prose-code:text-indigo-300 prose-code:bg-indigo-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-2xl prose-pre:shadow-inner">
        
        {/* Render main content */}
        <ReactMarkdown 
          components={{
            ...diagramComponents,
            code({node, className, children, ...props}) {
              const match = /language-diagram-(.+)/.exec(className || '')
              if (match) {
                const type = match[1];
                const data = String(children).replace(/\n$/, '').split('\n');
                if (type === 'layers') return <LayerDiagram layers={data} />;
                if (type === 'flow') return <FlowDiagram steps={data} />;
                if (type === 'blockchain') return <BlockchainDiagram />;
              }
              return <code className={className} {...props}>{children}</code>
            }
          }}
        >
          {filteredContent}
        </ReactMarkdown>

        {/* Render questions inline */}
        {parsedQuestions.length > 0 && (
          <div className="mt-12 not-prose space-y-8">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <Brain className="w-6 h-6 text-indigo-400" />
              Think First Questions
            </h3>
            <div className="space-y-6">
              {parsedQuestions.map((question) => (
                <ThinkFirstQuestion
                  key={question.id}
                  questionId={question.id}
                  question={question.question}
                  type={question.type}
                  options={question.options}
                  correctAnswer={question.correctAnswer}
                  explanation={question.explanation}
                  onAnswerRevealed={() => handleQuestionRevealed(question.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Checkpoint at the end */}
        <div className="not-prose mt-12">
          <Checkpoint
            title="Content Review Complete"
            description="You've finished reading this lesson. Review the key concepts before taking the final quiz."
            completed={progress >= 95}
            position="end"
          />
        </div>
      </article>

      {/* Quiz Section */}
      {!showQuiz && !quizState.completed && (
        <div className="mt-12 p-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-600 shadow-xl shadow-indigo-900/20">
          <button 
            onClick={() => { setShowQuiz(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="w-full bg-slate-950 rounded-[calc(1.5rem-4px)] py-8 px-6 text-center hover:bg-slate-900 transition-colors"
          >
            <Brain className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-2xl font-black text-white">Knowledge Check</h3>
            <p className="text-slate-400 mt-2 mb-6">Verify your understanding and earn {lesson.reward} $DeRi tokens.</p>
            <div className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-colors">
              Start Final Quiz
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

      {showQuiz && !quizState.completed && (
        <div className="mt-12 space-y-8 animate-fade-in-up">
          <div className="rounded-3xl border border-indigo-500/25 bg-indigo-500/5 p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/20">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Final Quiz</h3>
                  <p className="text-slate-500 text-sm">Question {quizState.currentQuestion + 1} of {shuffledQuiz.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5">
                <Coins className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-black text-emerald-400">+{lesson.reward} $DeRi</span>
              </div>
            </div>

            {shuffledQuiz[quizState.currentQuestion] && (
              <div className="space-y-8">
                <p className="text-xl font-bold text-white leading-relaxed">
                  {shuffledQuiz[quizState.currentQuestion].question}
                </p>
                
                <div className="grid gap-3">
                  {shuffledQuiz[quizState.currentQuestion].options.map((option, index) => {
                    const isSelected = quizState.answers[shuffledQuiz[quizState.currentQuestion].id] === index;
                    return (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(shuffledQuiz[quizState.currentQuestion].id, index)}
                        className={`group relative w-full text-left p-5 rounded-2xl border transition-all duration-200 
                          ${isSelected
                            ? 'border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-900/40'
                            : 'border-slate-700 bg-slate-800/40 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold pr-4">{option}</span>
                          <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                            ${isSelected ? 'border-white bg-white' : 'border-slate-600 group-hover:border-slate-500'}`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                  <button
                    onClick={() => setQuizState(prev => ({ ...prev, currentQuestion: Math.max(0, prev.currentQuestion - 1) }))}
                    disabled={quizState.currentQuestion === 0}
                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-white disabled:opacity-30 transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Previous
                  </button>
                  
                  {quizState.currentQuestion === shuffledQuiz.length - 1 ? (
                    <button
                      onClick={submitQuiz}
                      disabled={Object.keys(quizState.answers).length < shuffledQuiz.length}
                      className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-lg shadow-emerald-900/20 disabled:opacity-40 transition-all active:scale-95"
                    >
                      Complete Lesson
                    </button>
                  ) : (
                    <button
                      onClick={() => setQuizState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }))}
                      className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl shadow-lg shadow-indigo-900/20 transition-all active:scale-95"
                    >
                      Next Question
                      <ChevronRight size={18} />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {quizState.completed && (
        <div className="mt-12 animate-bounce-in">
          <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/5 p-10 text-center shadow-2xl backdrop-blur-sm">
            <div className="w-20 h-20 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/20 mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-black text-white mb-2">Lesson Completed!</h3>
            <p className="text-slate-400 mb-8 max-w-sm mx-auto">Great work! You&apos;ve mastered this module and earned your rewards.</p>
            
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-10">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <p className="text-2xl font-black text-emerald-400">{quizState.score.toFixed(0)}%</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Score</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <p className="text-2xl font-black text-indigo-400">+{lesson.reward}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">$DeRi Earned</p>
              </div>
            </div>

            <Link
              href="/learn"
              className="inline-flex items-center justify-center gap-2 w-full max-w-sm bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 px-8 rounded-xl shadow-lg shadow-indigo-900/20 transition-all active:scale-95"
            >
              Back to Learn Hub
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
