import { NextRequest, NextResponse } from 'next/server';
import { loadLessonBySlug } from '@/lib/learn-utils';

// Export quiz generator for use in page component
export function generateQuizForLesson(lesson: { title: string; level: number; module: string }): {
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correct: number;
  }>;
} {
  const title = lesson.title.toLowerCase();
  const questions: Array<{
    id: string;
    question: string;
    options: string[];
    correct: number;
  }> = [];
  
  // Quiz for blockchain basics
  if (title.includes('blockchain') || lesson.module.includes('blockchain')) {
    questions.push(
      {
        id: 'q1',
        question: 'What is the primary characteristic that makes blockchain different from traditional databases?',
        options: [
          'It stores more data',
          'It is decentralized and immutable',
          'It is faster',
          'It uses less storage'
        ],
        correct: 1
      },
      {
        id: 'q2',
        question: 'What does the term "immutable" mean in blockchain context?',
        options: [
          'Data can be easily changed',
          'Data cannot be changed once recorded',
          'Data is temporary',
          'Data is encrypted'
        ],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Which of the following is NOT a key characteristic of blockchain?',
        options: [
          'Decentralization',
          'Immutability',
          'Centralized control',
          'Transparency'
        ],
        correct: 2
      }
    );
  }
  // Quiz for DRP architecture
  else if (title.includes('architecture') || title.includes('drp')) {
    questions.push(
      {
        id: 'q1',
        question: 'What are the four layers of DRP architecture?',
        options: [
          'Application, Protocol, Consensus, Network',
          'Frontend, Backend, Database, API',
          'User, System, Hardware, Software',
          'Input, Process, Output, Storage'
        ],
        correct: 0
      },
      {
        id: 'q2',
        question: 'What is the primary purpose of the Elder Quorum?',
        options: [
          'To mine new blocks',
          'To provide governance and make protocol decisions',
          'To store user data',
          'To process transactions'
        ],
        correct: 1
      },
      {
        id: 'q3',
        question: 'What does PoAT stand for in DRP consensus?',
        options: [
          'Proof of Authority Time',
          'Proof of Activity',
          'Proof of Available Time',
          'Proof of Advanced Technology'
        ],
        correct: 1
      }
    );
  }
  // Default quiz for other lessons
  else {
    questions.push({
      id: 'q1',
      question: `What is the main topic covered in "${lesson.title}"?`,
      options: [
        'Understanding core concepts',
        'Advanced technical details',
        'Practical applications',
        'All of the above'
      ],
      correct: 0
    });
  }
  
  return { questions };
}

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
