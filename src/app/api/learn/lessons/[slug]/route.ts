import { NextRequest, NextResponse } from 'next/server';
import { loadLessonBySlug, generateQuizForLesson } from '@/lib/learn-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Lesson slug is required' },
        { status: 400 }
      );
    }
    
    const lesson = loadLessonBySlug(slug);
    
    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      );
    }
    
    // Generate quiz data
    const quiz = generateQuizForLesson(lesson);
    
    return NextResponse.json({
      ...lesson,
      quiz
    });
  } catch (error) {
    console.error('Error loading lesson:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
