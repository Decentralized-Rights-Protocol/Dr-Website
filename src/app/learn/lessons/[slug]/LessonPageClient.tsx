'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeftIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  TrophyIcon,
  PlayIcon,
  PauseIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import ReactMarkdown from 'react-markdown'
import { ParticleBackground } from '@/components/particle-background'

interface LessonContent {
  id: string
  slug: string
  title: string
  content: string
  duration: number
  reward: number
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
  const [isPlaying, setIsPlaying] = useState(false)

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
    lesson.quiz.questions.forEach(question => {
      if (quizState.answers[question.id] === question.correct) {
        score++
      }
    })
    
    const finalScore = (score / lesson.quiz.questions.length) * 100
    setQuizState(prev => ({ ...prev, completed: true, score: finalScore }))
    
    // Submit completion to API
    fetch('/api/learn/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lessonId: lesson.id,
        score: finalScore,
        timeSpent,
        answers: quizState.answers
      })
    })
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      <ParticleBackground />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => router.push('/learn')}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back to Learn</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {formatTime(timeSpent)}
                </span>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
              >
                {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                <span>{isPlaying ? 'Pause' : 'Start'}</span>
              </button>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            {lesson.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-sm text-neutral-300">
            <div className="flex items-center space-x-1">
              <ClockIcon className="h-4 w-4" />
              <span>{lesson.duration} minutes</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrophyIcon className="h-4 w-4" />
              <span>{lesson.reward} $DeRi reward</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lesson Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpenIcon className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Lesson Content</h2>
              </div>
              
              <div className="prose prose-lg prose-invert max-w-none text-neutral-200">
                <ReactMarkdown>{lesson.content}</ReactMarkdown>
              </div>
              
              {!showQuiz && !quizState.completed && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    Take Quiz to Complete Lesson
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quiz Sidebar */}
          <div className="lg:col-span-1">
            {showQuiz && !quizState.completed && (
              <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Quiz: Question {quizState.currentQuestion + 1} of {lesson.quiz.questions.length}
                </h3>
                
                {lesson.quiz.questions[quizState.currentQuestion] && (
                  <div>
                    <p className="text-neutral-200 mb-4">
                      {lesson.quiz.questions[quizState.currentQuestion].question}
                    </p>
                    
                    <div className="space-y-2">
                      {lesson.quiz.questions[quizState.currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(
                            lesson.quiz.questions[quizState.currentQuestion].id, 
                            index
                          )}
                          className={`w-full text-left p-3 rounded-md border transition-colors text-white ${
                            quizState.answers[lesson.quiz.questions[quizState.currentQuestion].id] === index
                              ? 'border-blue-400 bg-blue-500/20'
                              : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <button
                        onClick={() => setQuizState(prev => ({ 
                          ...prev, 
                          currentQuestion: Math.max(0, prev.currentQuestion - 1) 
                        }))}
                        disabled={quizState.currentQuestion === 0}
                        className="px-4 py-2 text-neutral-200 border border-white/20 bg-white/5 rounded-md disabled:opacity-50 hover:bg-white/10"
                      >
                        Previous
                      </button>
                      
                      {quizState.currentQuestion === lesson.quiz.questions.length - 1 ? (
                        <button
                          onClick={submitQuiz}
                          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
                        >
                          Submit Quiz
                        </button>
                      ) : (
                        <button
                          onClick={() => setQuizState(prev => ({ 
                            ...prev, 
                            currentQuestion: prev.currentQuestion + 1 
                          }))}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {quizState.completed && (
              <div className="bg-white/10 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg border border-white/20 p-6">
                <div className="text-center">
                  <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Quiz Completed!
                  </h3>
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {quizState.score.toFixed(0)}%
                  </div>
                  <p className="text-neutral-300 mb-4">
                    You earned {lesson.reward} $DeRi tokens!
                  </p>
                  <button
                    onClick={() => router.push('/learn')}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                  >
                    Continue Learning
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

