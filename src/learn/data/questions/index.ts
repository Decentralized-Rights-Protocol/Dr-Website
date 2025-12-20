/**
 * Questions Index - Centralized export of all lesson questions
 * Ensures no duplicates and easy access
 */

import { level1Questions } from './level-1-questions'
import { level2Questions } from './level-2-questions'
import { level3Questions } from './level-3-questions'
import { level4Questions } from './level-4-questions'
import { level5Questions } from './level-5-questions'
import { LessonQuestions, Question } from './question-schema'

export const allQuestions: LessonQuestions[] = [
  ...level1Questions,
  ...level2Questions,
  ...level3Questions,
  ...level4Questions,
  ...level5Questions
]

/**
 * Get questions for a specific lesson by slug
 */
export function getQuestionsForLesson(lessonSlug: string): Question[] {
  const lessonQuestions = allQuestions.find(q => q.lessonSlug === lessonSlug)
  return lessonQuestions?.questions || []
}

/**
 * Get questions for a specific lesson by ID
 */
export function getQuestionsForLessonById(lessonId: string): Question[] {
  const lessonQuestions = allQuestions.find(q => q.lessonId === lessonId)
  return lessonQuestions?.questions || []
}

/**
 * Verify no duplicate question IDs across all lessons
 */
export function verifyNoDuplicates(): { valid: boolean; duplicates: string[] } {
  const questionIds = new Set<string>()
  const duplicates: string[] = []

  allQuestions.forEach(lesson => {
    lesson.questions.forEach(question => {
      if (questionIds.has(question.id)) {
        duplicates.push(question.id)
      } else {
        questionIds.add(question.id)
      }
    })
  })

  return {
    valid: duplicates.length === 0,
    duplicates
  }
}

/**
 * Get all question IDs for a level
 */
export function getQuestionIdsForLevel(level: number): string[] {
  const levelQuestions = allQuestions.filter(q => q.level === level)
  return levelQuestions.flatMap(lq => lq.questions.map(q => q.id))
}

export {
  level1Questions,
  level2Questions,
  level3Questions,
  level4Questions,
  level5Questions
}

