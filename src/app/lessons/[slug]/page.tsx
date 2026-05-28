import { notFound } from 'next/navigation';
import { getLessonBySlug, LESSONS } from '@/data/lessons-index';
import LessonClientPage from './LessonClientPage';

export async function generateStaticParams() {
  return Object.keys(LESSONS).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) return { title: 'Lesson Not Found | DRP Learn' };
  return { title: `${lesson.title} | DRP Learn`, description: lesson.subtitle };
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) notFound();
  return <LessonClientPage lesson={lesson} />;
}
