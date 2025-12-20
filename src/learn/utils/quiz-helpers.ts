/**
 * Quiz Helper Utilities
 * Provides functions for shuffling options, validating questions, etc.
 */

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Shuffle answer options while preserving the correct answer index
 * Returns the shuffled options and the new index of the correct answer
 */
export function shuffleOptions<T extends { text: string; correct?: boolean }>(
  options: T[]
): { shuffled: T[]; correctIndex: number } {
  // Find the correct answer index
  const correctIndex = options.findIndex(opt => opt.correct === true)
  
  if (correctIndex === -1) {
    // If no correct flag, assume first option is correct (legacy support)
    const shuffled = shuffleArray(options)
    return { shuffled, correctIndex: shuffled.findIndex((_, i) => i === 0) }
  }
  
  // Extract correct answer
  const correctAnswer = options[correctIndex]
  const otherOptions = options.filter((_, i) => i !== correctIndex)
  
  // Shuffle other options
  const shuffledOthers = shuffleArray(otherOptions)
  
  // Insert correct answer at random position
  const insertIndex = Math.floor(Math.random() * (shuffledOthers.length + 1))
  const shuffled = [
    ...shuffledOthers.slice(0, insertIndex),
    correctAnswer,
    ...shuffledOthers.slice(insertIndex)
  ]
  
  return { shuffled, correctIndex: insertIndex }
}

/**
 * Shuffle string options array with correct answer index
 * This is the main function used for quiz questions
 */
export function shuffleStringOptions(
  options: string[],
  correctIndex: number
): { shuffled: string[]; newCorrectIndex: number } {
  if (correctIndex < 0 || correctIndex >= options.length) {
    console.warn('Invalid correct index, returning original options')
    return { shuffled: options, newCorrectIndex: correctIndex }
  }
  
  // Create array with indices
  const indexed = options.map((text, index) => ({ text, originalIndex: index }))
  
  // Shuffle
  const shuffled = shuffleArray(indexed)
  
  // Find new position of correct answer
  const newCorrectIndex = shuffled.findIndex(
    item => item.originalIndex === correctIndex
  )
  
  return {
    shuffled: shuffled.map(item => item.text),
    newCorrectIndex
  }
}

/**
 * Verify that all question IDs are unique across all lessons
 */
export function verifyUniqueQuestionIds(questions: Array<{ id: string }>): {
  valid: boolean
  duplicates: string[]
} {
  const seen = new Set<string>()
  const duplicates: string[] = []
  
  questions.forEach(q => {
    if (seen.has(q.id)) {
      duplicates.push(q.id)
    } else {
      seen.add(q.id)
    }
  })
  
  return {
    valid: duplicates.length === 0,
    duplicates
  }
}

