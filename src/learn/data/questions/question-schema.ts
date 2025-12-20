/**
 * Question Schema for Learn Modules
 * Ensures unique, pedagogically rich questions for each lesson
 */

export type QuestionType = 
  | 'multiple-choice' 
  | 'scenario' 
  | 'concept-matching' 
  | 'what-if' 
  | 'reflection'

export interface Question {
  id: string
  lessonId: string
  lessonSlug: string
  questionType: QuestionType
  questionText: string
  options: string[]
  correctAnswer: number
  explanation: string
  rewardDeRi: number
  difficulty: 1 | 2 | 3 | 4 | 5 // 1 = easiest, 5 = hardest
  tags?: string[]
}

export interface LessonQuestions {
  lessonId: string
  lessonSlug: string
  level: number
  questions: Question[]
}

/**
 * Question difficulty progression by level:
 * Level 1: Difficulty 1-2 (Foundation)
 * Level 2: Difficulty 2-3 (Intermediate)
 * Level 3: Difficulty 3-4 (Advanced)
 * Level 4: Difficulty 4-5 (Expert)
 * Level 5: Difficulty 4-5 (Master)
 */
export function getDifficultyForLevel(level: number): { min: number; max: number } {
  switch (level) {
    case 1: return { min: 1, max: 2 }
    case 2: return { min: 2, max: 3 }
    case 3: return { min: 3, max: 4 }
    case 4: return { min: 4, max: 5 }
    case 5: return { min: 4, max: 5 }
    default: return { min: 1, max: 3 }
  }
}

