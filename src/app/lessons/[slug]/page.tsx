'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Youtube, Github, Globe, CheckCircle2, Database, Play, Youtube as YoutubeIcon, Link, Clock, User, Shield, TrendingUp, XCircle, Search, ExternalLink, Copy, Check, Sparkles, Verified } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import LessonSkeleton from '@/components/learn/LessonSkeleton';

// Mock data for lessons, replace with actual API calls if needed
const lessonsData = [
  { slug: '1-1', title: 'What is Blockchain?', duration: '25m', reward: '20', level: 1, category: 'learning', type: 'video', description: 'An introduction to blockchain technology.', content: '<p>Blockchain is a distributed, immutable ledger...</p>', quiz: { questions: [{ id: 'q1', text: 'What is a block?', options: ['A block in a chain', 'A type of transaction'], correct: 0 }] } },
  { slug: '1-2', title: 'Cryptography and Hashing', duration: '20m', reward: '15', level: 1, category: 'learning', type: 'reading', description: 'Understanding cryptographic principles.', content: '<p>Hashing is crucial for blockchain security...</p>', quiz: { questions: [{ id: 'q1', text: 'What does SHA-256 do?', options: ['Encrypts data', 'Creates a fixed-size hash'], correct: 1 }] } },
  { slug: '1-3', title: 'Consensus Basics', duration: '25m', reward: '20', level: 1, category: 'learning', type: 'reading', description: 'How networks agree on transaction validity.', content: '<p>Consensus mechanisms ensure network integrity...</p>', quiz: { questions: [{ id: 'q1', text: 'What is PoW?', options: ['Proof of Work', 'Proof of Stake'], correct: 0 }] } },
  { slug: '1-4', title: 'Smart Contracts 101', duration: '30m', reward: '25', level: 1, category: 'web3', type: 'course', description: 'Introduction to smart contracts.', content: '<p>Smart contracts automate agreements...</p>', quiz: { questions: [{ id: 'q1', text: 'What language is common for smart contracts?', options: ['Solidity', 'JavaScript'], correct: 0 }] } },
  { slug: '2-1', title: 'DRP Architecture', duration: '25m', reward: '20', level: 2, category: 'learning', type: 'reading', description: 'Understanding the DRP ecosystem.', content: '<p>The DRP architecture is designed for...</p>', quiz: { questions: [{ id: 'q1', text: 'What is a key component of DRP?', options: ['Blockchain', 'Elder Quorum'], correct: 1 }] } },
  { slug: '2-2', title: 'PoST and PoAT', duration: '25m', reward: '20', level: 2, category: 'learning', type: 'reading', description: 'Exploring Proof of Stake and Proof of Authority.', content: '<p>PoST and PoAT are consensus mechanisms...</p>', quiz: { questions: [{ id: 'q1', text: 'What does PoAT stand for?', options: ['Proof of Authority', 'Proof of Stake'], correct: 0 }] } },
  { slug: '2-3', title: 'Elder Quorum', duration: '30m', reward: '25', level: 2, category: 'learning', type: 'reading', description: 'The role of Elders in the DRP network.', content: '<p>Elders play a vital role...</p>', quiz: { questions: [{ id: 'q1', text: 'What do Elders do?', options: ['Validate transactions', 'Mine blocks'], correct: 0 }] } },
  { slug: '2-4', title: 'Activity Proofs', duration: '35m', reward: '30', level: 2, category: 'learning', type: 'reading', description: 'How activities are proven on DRP.', content: '<p>Activity proofs are essential...</p>', quiz: { questions: [{ id: 'q1', text: 'What is proof of activity?', options: ['A cryptographic proof', 'A digital signature'], correct: 0 }] } },
  { slug: '3-1', title: 'DRP Development Kit', duration: '30m', reward: '25', level: 3, category: 'developer', type: 'course', description: 'Using the DRP SDK for development.', content: '<p>The DRP SDK allows developers...</p>', quiz: { questions: [{ id: 'q1', text: 'What is the DRP SDK?', options: ['A software development kit', 'A blockchain explorer'], correct: 0 }] } },
  { slug: '3-2', title: 'Building DApps', duration: '40m', reward: '35', level: 3, category: 'developer', type: 'course', description: 'Creating decentralized applications on DRP.', content: '<p>Building DApps on DRP involves...</p>', quiz: { questions: [{ id: 'q1', text: 'What is a DApp?', options: ['Decentralized Application', 'Digital Asset Protocol'], correct: 0 }] } },
  { slug: '3-3', title: 'Contributing to DRP', duration: '25m', reward: '20', level: 3, category: 'developer', type: 'contribution', description: 'How to contribute to the DRP project.', content: '<p>Contributions are welcome...</p>', quiz: { questions: [{ id: 'q1', text: 'How can one contribute?', options: ['Code', 'Documentation', 'Community Support'], correct: 0 }] } },
  { slug: '3-4', title: 'Testing and Deployment', duration: '35m', reward: '30', level: 3, category: 'developer', type: 'course', description: 'Best practices for testing and deployment.', content: '<p>Testing and deployment are critical...</p>', quiz: { questions: [{ id: 'q1', text: 'What is CI/CD?', options: ['Continuous Integration/Continuous Deployment', 'Centralized Information Database'], correct: 0 }] } },
];

// Helper to get lesson data (simulating API or DB call)
function getLessonData(slug: string) {
  return lessonsData.find(lesson => lesson.slug === slug);
}

// Mock utility functions (replace with actual logic)
const mockVerifyActivity = async (activityData: any) => {
  console.log("Mock verifying activity:", activityData);
  // Simulate backend verification delay and response
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    chain_tx_hash: `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`, // Mock hash
    status: 'approved', // Mock status
    score: Math.random() * 100, // Mock score
    reward: {
      deri: Math.floor(Math.random() * 50) + 5, // Mock reward
      rights: Math.floor(Math.random() * 10),
    },
    hash: `mock_hash_${activityData.proof}`,
    signature: `mock_signature_${activityData.proof}`,
  };
};

export default function LessonPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const lessonId = params.slug; // Use slug from params

  const [lesson, setLesson] = useState<any>(null); // Use any for now, refine later
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizState, setQuizState] = useState<any>({ // Use any for now, refine later
    completed: false,
    score: 0,
    timeSpentSeconds: 0,
    answers: {},
    chainTxHash: null, // To store transaction hash
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastVerdict, setLastVerdict] = useState<any>(null); // Stores result from Convex mutation
  const [verificationResult, setVerificationResult] = useState<any>(null); // Stores result from API verification

  // Fetch lesson data
  useEffect(() => {
    const loadLesson = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/learn/lesson/${lessonId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const lessonData = await response.json();

        // Redirect if slug mismatch (useful for dynamic routes)
        if (lessonData.slug && lessonData.slug !== lessonId) {
          router.replace(`/learn/lessons/${lessonData.slug}`);
          return;
        }

        // Assign level based on slug structure
        if (!lessonData.level) {
          lessonData.level = lessonId.startsWith('1-') ? 1 : lessonId.startsWith('2-') ? 2 : lessonId.startsWith('3-') ? 3 : 1;
        }
        setLesson(lessonData);
      } catch (error) {
        console.error('Failed to load lesson:', error);
        setLesson(null); // Clear lesson if loading fails
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) loadLesson();
  }, [lessonId, router]);

  // Placeholder for quiz submission logic
  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    setQuizState(prev => ({ ...prev, answers: { ...prev.answers, [questionId]: answerIndex } }));
  };

  const submitQuiz = async () => {
    if (!lesson) return;

    let score = 0;
    lesson.quiz.questions.forEach(question => {
      if (quizState.answers[question.id] === question.correct) score++;
    });

    const finalScore = (score / lesson.quiz.questions.length) * 100;
    const timeSpent = quizState.timeSpentSeconds; // Assuming quizState tracks timeSpentSeconds

    setIsSubmitting(true); // Indicate submission is in progress

    try {
      // 1. Submit activity details to our backend API for verification
      const verificationResponse = await fetch('/api/submit-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: lesson.category, // Use category from lesson data
          type: lesson.type, // Use type from lesson data
          metadata: {
            lesson_id: lesson.slug,
            score: finalScore,
            time_spent_seconds: timeSpent,
          },
          proof: `Completed lesson ${lesson.slug} with score ${finalScore.toFixed(2)}%`, // Placeholder proof, could be more sophisticated
        }),
      });

      if (!verificationResponse.ok) {
        const errorText = await verificationResponse.text();
        throw new Error(`Verification failed: ${errorText}`);
      }

      const verificationData = await verificationResponse.json();
      // verificationData is expected to contain { chain_tx_hash, status, score, reward, hash, signature }

      setQuizState(prev => ({ ...prev, completed: true, score: finalScore, timeSpentSeconds: timeSpent, chainTxHash: verificationData.chain_tx_hash }));
      setVerificationResult(verificationData); // Store verification result for display
      console.log('Verification successful:', verificationData);

    } catch (error) {
      console.error('Error submitting lesson completion:', error);
      // Handle error display to user
    } finally {
      setIsSubmitting(false);
    }
  };

  // Placeholder for activity submission to Convex
  // This will be called after successful verification and when the user confirms/submits
  const handleConvexSubmission = async () => {
    if (!lesson || !verificationResult) return;

    setIsSubmitting(true);
    try {
      const result = await api.activities._createActivityRecord({
        userId: 'user_id_placeholder', // Needs actual user ID from context
        type: lesson.type,
        category: lesson.category,
        metadata: { title, url: lesson.slug }, // Use lesson slug as URL for now
        proof: `Completed lesson ${lesson.slug} with score ${quizState.score.toFixed(2)}%`,
        hash: verificationResult.hash,
        signature: verificationResult.signature,
        status: verificationResult.status,
        score: verificationResult.score,
        reward: verificationResult.reward,
        chainTxHash: verificationResult.chain_tx_hash,
      });

      setLastVerdict(result);
      setTimeout(() => setLastVerdict(null), 5000);
      console.log('Convex submission successful:', result);
    } catch (err) {
      console.error('Convex submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LessonSkeleton />;
  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-4">Lesson Not Found</h1>
        <p className="text-slate-400 max-w-sm text-center">
          The lesson you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <a
          href="/learn"
          className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all"
        >
          Browse Lessons
        </a>
      </div>
    );
  }

  const progress = showQuiz ? 100 : Math.min(Math.floor((quizState.timeSpentSeconds / (parseInt(lesson.duration) * 60)) * 100), 95);

  return (
    <div className="relative min-h-screen bg-neutral-900 text-white p-4 md:p-8">
      {/* Lesson Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary-400">Level {lesson.level}</p>
          <h1 className="text-3xl font-bold tracking-tight text-white">{lesson.title}</h1>
          <p className="text-sm text-slate-400 mt-2">{lesson.description}</p>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock className="h-4 w-4" />
            <span>{lesson.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-indigo-400" />
            <span className="text-indigo-400 font-medium">{lesson.reward} $DeRi reward</span>
          </div>
          <button
            onClick={() => router.push('/learn')}
            className="ml-4 px-4 py-2 rounded-xl border border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-colors"
          >
            ← Back to Lessons
          </button>
        </div>
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[0.6fr_0.4fr] lg:items-start">
        <div className="space-y-8">
          {/* Lesson Content Area */}
          {!showQuiz && !quizState.completed && (
            <div className="prose prose-invert max-w-none rounded-3xl border border-neutral-700 bg-neutral-900/60 p-6 md:p-8 shadow-xl">
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            </div>
          )}

          {/* Quiz Section */}
          {!showQuiz && !quizState.completed && (
            <div className="flex justify-center">
              <button
                onClick={() => { setShowQuiz(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all"
              >
                Start Quiz
              </button>
            </div>
          )}

          {showQuiz && !quizState.completed && lesson.quiz && (
            <div className="rounded-3xl border border-neutral-700 bg-neutral-900/60 p-6 md:p-8 shadow-xl space-y-6">
              <h3 className="text-2xl font-bold text-white">Quiz: {lesson.title}</h3>
              <p className="text-slate-400">Answer the following questions to complete the lesson.</p>
              {lesson.quiz.questions.map((question, index) => (
                <div key={question.id} className="space-y-3">
                  <p className="text-lg font-medium text-white">{index + 1}. {question.text}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleQuizAnswer(question.id, optionIndex)}
                        className={`px-4 py-3 rounded-xl border text-left transition ${
                          quizState.answers[question.id] === optionIndex
                            ? 'border-primary-500 bg-primary-500/20 text-primary-300'
                            : 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <button
                onClick={submitQuiz} // This will now trigger verification
                disabled={isSubmitting || Object.keys(quizState.answers).length !== lesson.quiz.questions.length}
                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {isSubmitting ? 'Verifying...' : 'Submit Quiz'}
              </button>
            </div>
          )}

          {quizState.completed && (
            <div className="rounded-3xl border border-neutral-700 bg-neutral-900/60 p-6 md:p-8 shadow-xl space-y-6 text-center">
              <h3 className="text-2xl font-bold text-white">Lesson Completed!</h3>
              <p className="text-slate-400">Your score: {quizState.score.toFixed(2)}%</p>
              <p className="text-lg font-medium text-primary-400">Reward: {lesson.reward} $DeRi</p>
              {quizState.chainTxHash && (
                <div className="mt-4">
                  <p className="text-sm text-slate-400 mb-2">Transaction Hash:</p>
                  <a
                    href={`/explorer/transactions/${quizState.chainTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-400 underline break-all"
                  >
                    {quizState.chainTxHash}
                  </a>
                </div>
              )}
              <button
                onClick={() => router.push('/learn')}
                className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 text-white font-bold text-lg shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all"
              >
                Continue Learning
              </button>
            </div>
          )}
        </div>

        {/* Sidebar for Progress/Details */}
        <div className="lg:sticky lg:top-8 space-y-8">
          <div className="rounded-3xl border border-neutral-700 bg-neutral-900/60 p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-neutral-100 mb-4">Lesson Progress</h4>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="w-full h-2 bg-neutral-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-primary-400">{progress}%</span>
            </div>
            <p className="text-xs text-neutral-500 mt-2">Completed {quizState.completed ? '✅' : '❌'}</p>
          </div>

          {!showQuiz && !quizState.completed && lesson.quiz && (
            <div className="rounded-3xl border border-neutral-700 bg-neutral-900/60 p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-neutral-100 mb-4">Quiz Details</h4>
              <p className="text-sm text-neutral-300 mb-2">Number of questions: <span className="font-medium">{lesson.quiz.questions.length}</span></p>
              <p className="text-sm text-neutral-300 mb-2">Time limit: <span className="font-medium">{lesson.duration}</span></p>
              <p className="text-sm text-neutral-300">Reward: <span className="font-medium text-primary-400">{lesson.reward} $DeRi</span></p>
            </div>
          )}

          {quizState.completed && lastVerdict && (
            <div className="rounded-3xl border border-neutral-700 bg-neutral-900/60 p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-neutral-100 mb-4">Submission Status</h4>
              <div className="flex items-center gap-2 font-semibold mb-3" style={{ color: lastVerdict.verdict === 'approved' ? '#10B981' : lastVerdict.verdict === 'rejected' ? '#EF4444' : '#F59E0B' }}>
                {lastVerdict.verdict === 'approved' && <CheckCircle2 className="h-5 w-5" />}
                {lastVerdict.verdict === 'rejected' && <Trash2 className="h-5 w-5" />}
                {lastVerdict.verdict === 'pending' && <Clock className="h-5 w-5" />}
                {lastVerdict.verdict.toUpperCase()}
              </div>
              {lastVerdict.verdict === 'approved' && (
                <div className="space-y-2 text-sm">
                  <p>Score: {lastVerdict.score.toFixed(2)}</p>
                  <p>Reward: {lastVerdict.reward.deri} DeRi, {lastVerdict.reward.rights} RIGHTS</p>
                  {lastVerdict.chainTxHash && (
                    <p className="text-xs text-gray-400 break-all">
                      Transaction Hash: <a href={`/explorer/transactions/${lastVerdict.chainTxHash}`} className="underline hover:text-primary-400" target="_blank" rel="noopener noreferrer">{lastVerdict.chainTxHash.slice(0, 10)}...{lastVerdict.chainTxHash.slice(-8)}</a>
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
