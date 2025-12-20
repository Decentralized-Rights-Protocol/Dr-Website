import { NextRequest, NextResponse } from 'next/server';
import { loadLessonById, loadLessonBySlug } from '@/lib/learn-utils';
import { getQuestionsForLesson } from '@/learn/data/questions';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const lessonId = resolvedParams.id;
    
    if (!lessonId) {
      return NextResponse.json(
        { error: 'Lesson ID is required' },
        { status: 400 }
      );
    }
    
    // Try loading by ID first (for backward compatibility)
    let lesson = loadLessonById(lessonId);
    
    // If not found by ID, try loading by slug
    if (!lesson) {
      lesson = loadLessonBySlug(lessonId);
    }
    
    if (!lesson) {
      console.error(`[API] Lesson not found for ID/slug: ${lessonId}`);
      return NextResponse.json(
        { error: 'Lesson not found', lessonId },
        { status: 404 }
      );
    }
    
    // Get unique questions for this lesson
    const questions = getQuestionsForLesson(lesson.slug);
    
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
    console.error('[API] Error loading lesson:', error);
    if (error instanceof Error) {
      console.error('[API] Error details:', error.message);
      console.error('[API] Stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
