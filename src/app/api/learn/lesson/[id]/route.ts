import { NextRequest, NextResponse } from 'next/server';
import { loadLessonById, loadLessonBySlug } from '@/lib/learn-utils';
import { getQuestionsForLesson } from '@/learn/data/questions';
import { logError, logInfo } from '@/lib/logging';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const lessonId = resolvedParams.id;
    
    if (!lessonId) {
      return NextResponse.json(
        { code: 'BAD_REQUEST', message: 'Lesson ID is required' },
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
      logError('lesson_not_found', { lessonId });
      return NextResponse.json(
        { code: 'NOT_FOUND', message: 'Lesson not found', details: { lessonId } },
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
    
    logInfo('lesson_loaded', { lessonId: lesson.slug });
    return NextResponse.json({
      ...lesson,
      quiz
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    logError('lesson_load_error', { message });
    return NextResponse.json(
      { code: 'INTERNAL_ERROR', message: 'Internal server error', details: message },
      { status: 500 }
    );
  }
}
