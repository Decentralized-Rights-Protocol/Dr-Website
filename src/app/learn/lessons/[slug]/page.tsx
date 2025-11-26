import { notFound } from 'next/navigation'
import { getAllLessonSlugs, loadLessonBySlug } from '@/lib/learn-utils'
import LessonPageClient from './LessonPageClient'
import { generateQuizForLesson } from '@/app/api/learn/lessons/[slug]/route'

export async function generateStaticParams() {
  const slugs = getAllLessonSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
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
  
  // Generate quiz data
  const quiz = generateQuizForLesson(lesson)
  
  return <LessonPageClient lesson={{ ...lesson, quiz }} />
}

