'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  Clock, 
  Award, 
  Trash2, 
  ChevronRight,
  Shield,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';
import LessonSkeleton from '@/components/learn/LessonSkeleton';
import ReactMarkdown from 'react-markdown';
import { diagramComponents } from '@/components/learn/AsciiDiagramReplacer';
import Link from 'next/link';

export default function LegacyLessonClientPage({ lessonId }: { lessonId: string }) {
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizState, setQuizState] = useState<any>({
    completed: false,
    score: 0,
    timeSpentSeconds: 0,
    answers: {},
    chainTxHash: null,
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastVerdict, setLastVerdict] = useState<any>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  useEffect(() => {
    const loadLesson = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/learn/lesson/${lessonId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const lessonData = await response.json();

        if (!lessonData.level) {
          lessonData.level = lessonId.startsWith('1-') ? 1 : lessonId.startsWith('2-') ? 2 : lessonId.startsWith('3-') ? 3 : 1;
        }
        setLesson(lessonData);
      } catch (error) {
        console.error('Failed to load lesson:', error);
        setLesson(null);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) loadLesson();
  }, [lessonId]);

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizState((prev: any) => ({ ...prev, answers: { ...prev.answers, [questionId]: answerIndex } }));
  };

  const submitQuiz = async () => {
    if (!lesson) return;

    let score = 0;
    lesson.quiz.questions.forEach((question: any) => {
      if (quizState.answers[question.id] === question.correct) score++;
    });

    const finalScore = (score / lesson.quiz.questions.length) * 100;
    const timeSpent = quizState.timeSpentSeconds;

    setIsSubmitting(true);

    try {
      const verificationResponse = await fetch('/api/submit-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: lesson.category || 'learning',
          type: lesson.type || 'reading',
          metadata: {
            lesson_id: lesson.slug,
            score: finalScore,
            time_spent_seconds: timeSpent,
          },
          proof: `Completed lesson ${lesson.slug} with score ${finalScore.toFixed(2)}%`,
        }),
      });

      if (!verificationResponse.ok) throw new Error('Verification failed');

      const verificationData = await verificationResponse.json();
      setQuizState((prev: any) => ({ ...prev, completed: true, score: finalScore, chainTxHash: verificationData.chain_tx_hash }));
      setVerificationResult(verificationData);
    } catch (error) {
      console.error('Error submitting lesson completion:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitActivity = useMutation(api.activities.submitActivity);
  const handleConvexSubmission = async () => {
    if (!lesson || !verificationResult) return;
    setIsSubmitting(true);
    try {
      const result = await submitActivity({
        type: lesson.type || 'reading',
        category: lesson.category || 'learning',
        metadata: { title: lesson.title, url: lesson.slug },
        proof: `Completed lesson ${lesson.slug} with score ${quizState.score.toFixed(2)}%`,
        hash: verificationResult.hash,
        signature: verificationResult.signature,
        status: verificationResult.status,
        score: verificationResult.score,
        reward: verificationResult.reward,
        chainTxHash: verificationResult.chain_tx_hash,
      });
      setLastVerdict(result);
    } catch (err) {
      console.error('Convex submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LessonSkeleton />;
  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
        <h1 className="text-3xl font-bold mb-4">Lesson Not Found</h1>
        <Link href="/learn" className="text-drp-cyan underline">Back to Curriculum</Link>
      </div>
    );
  }

  const progress = showQuiz ? 100 : 0;

  return (
    <div className="min-h-screen text-white bg-[#050d1a]">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl bg-black/40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/learn" className="text-slate-500 hover:text-white transition-colors text-sm">← Learn</Link>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1 text-xs text-slate-500">
              <span>{lesson.title}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-drp-cyan" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="text-xs font-bold text-drp-cyan">+{lesson.reward} DeRi</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {!showQuiz && !quizState.completed && (
          <div className="space-y-8">
            <div className="mb-10">
              <h1 className="text-4xl font-black mb-4">{lesson.title}</h1>
              <p className="text-slate-400 text-lg">{lesson.description}</p>
            </div>
            
            <div className="prose prose-invert max-w-none prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10">
              <ReactMarkdown components={diagramComponents}>
                {lesson.content}
              </ReactMarkdown>
            </div>

            <div className="flex justify-center pt-10 border-t border-white/10">
              <button
                onClick={() => setShowQuiz(true)}
                className="px-8 py-4 rounded-2xl bg-white text-black font-bold hover:bg-drp-cyan transition-all"
              >
                Start Knowledge Check
              </button>
            </div>
          </div>
        )}

        {showQuiz && !quizState.completed && (
          <div className="space-y-8 bg-black/40 p-8 rounded-3xl border border-white/10">
            <h2 className="text-2xl font-bold">Quiz: {lesson.title}</h2>
            {lesson.quiz.questions.map((q: any, i: number) => (
              <div key={q.id} className="space-y-4">
                <p className="text-lg font-medium">{i + 1}. {q.question}</p>
                <div className="grid gap-3">
                  {q.options.map((opt: string, oi: number) => (
                    <button
                      key={oi}
                      onClick={() => handleQuizAnswer(q.id, oi)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        quizState.answers[q.id] === oi 
                          ? 'border-drp-cyan bg-drp-cyan/10 text-drp-cyan' 
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={submitQuiz}
              disabled={isSubmitting || Object.keys(quizState.answers).length !== lesson.quiz.questions.length}
              className="w-full py-4 rounded-2xl bg-drp-cyan text-black font-bold disabled:opacity-50"
            >
              {isSubmitting ? 'Verifying...' : 'Submit Answers'}
            </button>
          </div>
        )}

        {quizState.completed && (
          <div className="text-center space-y-6 bg-black/40 p-12 rounded-[2.5rem] border border-white/10">
            <div className="text-6xl">🏆</div>
            <h2 className="text-3xl font-bold">Lesson Complete!</h2>
            <p className="text-slate-400">Score: {quizState.score}%</p>
            <div className="text-2xl font-bold text-drp-cyan">+{lesson.reward} $DeRi</div>
            <Link href="/learn" className="inline-block px-8 py-4 rounded-2xl bg-white text-black font-bold">
              Return to Hub
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
