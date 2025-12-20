import { NextRequest, NextResponse } from 'next/server';
import { loadLessonBySlug } from '@/lib/learn-utils';
import { getQuestionsForLesson } from '@/learn/data/questions';

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
    
    // Get unique questions for this lesson
    const questions = getQuestionsForLesson(slug);
    
    // Convert to quiz format expected by frontend
    const quiz = {
      questions: questions.map(q => ({
        id: q.id,
        question: q.questionText,
        options: q.options,
        correct: q.correctAnswer
      }))
    };
    
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
