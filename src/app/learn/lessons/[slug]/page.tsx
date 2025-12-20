import { notFound } from 'next/navigation'
import { getAllLessonSlugs, loadLessonBySlug } from '@/lib/learn-utils'
import { getQuestionsForLesson } from '@/learn/data/questions'
import LessonPageClient from './LessonPageClient'

export async function generateStaticParams() {
  try {
    const slugs = getAllLessonSlugs()
    console.log(`[Static Generation] Found ${slugs.length} lesson slugs:`, slugs)
    return slugs.map((slug) => ({
      slug: slug,
    }))
  } catch (error) {
    console.error('[Static Generation] Error getting lesson slugs:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const lesson = loadLessonBySlug(resolvedParams.slug)
  
  if (!lesson) {
    return {
      title: 'Lesson Not Found',
    }
  }
  
  return {
    title: `${lesson.title} | DRP Learn`,
    description: lesson.description,
  }
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const lesson = loadLessonBySlug(resolvedParams.slug)
  
  if (!lesson) {
    notFound()
  }
  
  // Get unique questions for this lesson
  const questions = getQuestionsForLesson(lesson.slug)
  
  // Convert to quiz format expected by frontend
  const quiz = {
    questions: questions.map(q => ({
      id: q.id,
      question: q.questionText,
      options: q.options,
      correct: q.correctAnswer
    }))
  }
  
  return <LessonPageClient lesson={{ ...lesson, quiz }} />
}

