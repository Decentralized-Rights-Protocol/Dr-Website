/**
 * Learn Content Parser
 * Parses MDX content to extract questions, answers, and structure
 * for enhanced learning experience
 */

export interface ParsedQuestion {
  id: string
  question: string
  type: 'multiple-choice' | 'reflection' | 'scenario'
  options?: string[]
  correctAnswer?: number | string
  explanation?: string
  rawText: string
}

export interface ContentSection {
  title: string
  content: string
  type: 'text' | 'diagram' | 'checkpoint'
  order: number
}

/**
 * Parse questions from MDX content
 * Extracts questions in the format:
 * ### Question N
 * Question text?
 * 
 * A) Option 1
 * B) Option 2
 * ...
 * 
 * **Correct Answer: X** - Explanation
 */
export function parseQuestionsFromContent(content: string): ParsedQuestion[] {
  const questions: ParsedQuestion[] = []
  
  // Match question blocks (### Question N or ## Quiz sections)
  const questionBlockRegex = /(?:###\s+Question\s+\d+|##\s+Quiz)[\s\S]*?(?=###|##|$)/gi
  const questionBlocks = content.match(questionBlockRegex) || []
  
  questionBlocks.forEach((block, blockIndex) => {
    // Extract individual questions - more flexible regex
    // Matches: Question header, question text, options, correct answer
    const questionRegex = /(?:###\s+Question\s+\d+)\s*\n([^A-Z]+?)\n\n([A-Z]\)[^\n]+(?:\n[A-Z]\)[^\n]+)*)\s*\n\n\*\*Correct\s+Answer:\s+([A-Z])\*\*(?:\s*-\s*([^\n]+(?:\n[^\n]+)*))?/gi
    
    let match
    while ((match = questionRegex.exec(block)) !== null) {
      const [, questionText, optionsText, correctLetter, explanation] = match
      
      if (!questionText || !optionsText || !correctLetter) continue
      
      // Parse options - handle various formats
      const options = optionsText
        .split(/\n/)
        .filter(line => /^[A-Z]\)/.test(line.trim()))
        .map(line => line.replace(/^[A-Z]\)\s*/, '').trim())
        .filter(opt => opt.length > 0)
      
      if (options.length === 0) continue
      
      // Convert letter to index
      const correctIndex = correctLetter.charCodeAt(0) - 65
      
      questions.push({
        id: `q-${blockIndex}-${questions.length}`,
        question: questionText.trim(),
        type: 'multiple-choice',
        options,
        correctAnswer: correctIndex >= 0 && correctIndex < options.length ? correctIndex : undefined,
        explanation: explanation?.trim(),
        rawText: match[0]
      })
    }
  })
  
  return questions
}

/**
 * Extract sections from content for progress tracking
 */
export function extractSections(content: string): ContentSection[] {
  const sections: ContentSection[] = []
  
  // Match markdown headers (## and ###)
  const headerRegex = /^(#{2,3})\s+(.+)$/gm
  let match
  let order = 0
  
  while ((match = headerRegex.exec(content)) !== null) {
    const [, hashes, title] = match
    const level = hashes.length
    
    // Skip quiz sections
    if (title.toLowerCase().includes('quiz') || title.toLowerCase().includes('question')) {
      continue
    }
    
    sections.push({
      title: title.trim(),
      content: '',
      type: level === 2 ? 'checkpoint' : 'text',
      order: order++
    })
  }
  
  return sections
}

/**
 * Replace question blocks in content with placeholders
 * This allows us to render questions using our custom components
 */
export function replaceQuestionsWithPlaceholders(content: string): string {
  // Replace question blocks with placeholders
  const questionBlockRegex = /(?:###\s+Question\s+\d+|##\s+Quiz)[\s\S]*?(?=###|##|$)/gi
  
  return content.replace(questionBlockRegex, (match) => {
    // Extract question number or identifier
    const questionMatch = match.match(/(?:Question\s+(\d+)|Quiz)/i)
    const questionId = questionMatch ? `question-${questionMatch[1]}` : 'question-block'
    
    return `\n\n<!-- ${questionId} -->\n\n`
  })
}

