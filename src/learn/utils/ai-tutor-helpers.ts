/**
 * AI Tutor Helper Functions
 * Implements structured teaching methodology with variants, pattern mode, and guided learning
 */

export interface TutorResponse {
  content: string
  suggestions?: string[]
  mode?: 'standard' | 'pattern' | 'guided'
  patternStep?: number
}

export interface TutorContext {
  currentLevel: number
  currentLesson?: string
  recentTopics: string[]
  learningStyle: 'visual' | 'textual' | 'interactive'
  complexityLevel?: 'simple' | 'medium' | 'complex'
}

/**
 * Format response using the mandatory structure:
 * 1. Core Explanation
 * 2. Variant Explanations (2-4 variants)
 * 3. Key Takeaway
 * 4. Check Your Understanding
 */
export function formatStructuredResponse(
  coreExplanation: string,
  variants: Array<{ label: string; content: string }>,
  keyTakeaway: string,
  checkQuestion: string
): string {
  let response = `🔹 **Core Explanation**\n\n${coreExplanation}\n\n`
  
  response += `🔹 **Related Views**\n\n`
  variants.forEach((variant, index) => {
    response += `**Variant ${String.fromCharCode(65 + index)} (${variant.label}):**\n${variant.content}\n\n`
  })
  
  response += `🔹 **Key Takeaway**\n\n${keyTakeaway}\n\n`
  response += `🔹 **Check Your Understanding**\n\n${checkQuestion}`
  
  return response
}

/**
 * Generate Pattern Mode response for complex topics
 * Progressive word expansion to guide the learner step by step
 */
export function generatePatternMode(
  topic: string,
  steps: Array<{ word: string; question: string; explanation: string }>,
  finalCombination: string
): string {
  let response = `Let's build the answer step by step.\n\n`
  
  steps.forEach((step, index) => {
    response += `**Step ${index + 1} → Key word: ${step.word}**\n`
    response += `${step.question}\n\n`
    response += `${step.explanation}\n\n`
  })
  
  response += `**Step ${steps.length + 1} → Combine:**\n${finalCombination}\n\n`
  response += `Would you like to continue exploring this concept?`
  
  return response
}

/**
 * Generate Guided Guessing question
 */
export function generateGuidedQuestion(
  question: string,
  options: string[],
  hint?: string
): string {
  let response = `Think about this:\n${question}\n\n`
  
  options.forEach((option, index) => {
    response += `${String.fromCharCode(65 + index)}) ${option}\n`
  })
  
  response += `\nPick one, then we'll analyze it together.`
  
  if (hint) {
    response += `\n\n💡 *Hint: ${hint}*`
  }
  
  return response
}

/**
 * Determine if topic is complex enough for Pattern Mode
 */
export function shouldUsePatternMode(topic: string, message: string): boolean {
  const complexKeywords = [
    'consensus', 'cryptography', 'architecture', 'governance',
    'economic', 'interoperability', 'verification', 'protocol'
  ]
  
  const messageLower = message.toLowerCase()
  return complexKeywords.some(keyword => messageLower.includes(keyword))
}

/**
 * Generate gamification elements
 */
export function addGamificationElements(
  response: string,
  unlocked?: string,
  available?: string
): string {
  let enhanced = response
  
  if (unlocked) {
    enhanced += `\n\n✅ **You unlocked:** ${unlocked}`
  }
  
  if (available) {
    enhanced += `\n\n🔓 **Advanced explanation available** - Ask for more detail!`
  }
  
  return enhanced
}

/**
 * Adapt complexity based on learner level
 */
export function adaptComplexity(
  baseExplanation: string,
  level: number,
  isAdvanced: boolean = false
): string {
  if (level <= 2 && !isAdvanced) {
    // Simplify for beginners
    return baseExplanation
      .replace(/protocol/gi, 'system of rules')
      .replace(/cryptographic/gi, 'secure')
      .replace(/decentralized/gi, 'distributed across many computers')
      .replace(/consensus/gi, 'agreement')
  }
  
  return baseExplanation
}

