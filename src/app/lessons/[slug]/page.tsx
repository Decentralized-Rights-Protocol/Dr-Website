import { notFound } from 'next/navigation';
import { getLessonBySlug, LESSONS } from '@/data/lessons-index';
import LessonClientPage from './LessonClientPage';
import LegacyLessonClientPage from './LegacyLessonClientPage';

export async function generateStaticParams() {
  return Object.keys(LESSONS).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const lesson = getLessonBySlug(params.slug);
  if (lesson) {
    return { title: `${lesson.title} | DRP Learn`, description: lesson.subtitle };
  }
  return { title: 'Learning Module | DRP Learn', description: 'Educational content for the Decentralized Rights Protocol' };
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // Try the new cinematic lesson system first
  const cinematicLesson = getLessonBySlug(slug);
  if (cinematicLesson) {
    return <LessonClientPage lesson={cinematicLesson} />;
  }

  // Fallback to the legacy MDX-based system for the other 20+ lessons
  // This ensures all existing educational content remains accessible
  return <LegacyLessonClientPage lessonId={slug} />;
}
