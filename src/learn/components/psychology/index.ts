/**
 * Psychology Triggers Index
 * Exports all psychology trigger components for different learning levels
 */

export { CuriosityTrigger } from './CuriosityTrigger'
export { UnderstandingTrigger } from './UnderstandingTrigger'
export { IdentityTrigger } from './IdentityTrigger'
export { AgencyTrigger } from './AgencyTrigger'
export { StewardshipTrigger } from './StewardshipTrigger'

/**
 * Get the appropriate psychology trigger component for a level
 */
export function getPsychologyTriggerForLevel(level: number) {
  switch (level) {
    case 1:
      return 'CuriosityTrigger'
    case 2:
      return 'UnderstandingTrigger'
    case 3:
      return 'IdentityTrigger'
    case 4:
      return 'AgencyTrigger'
    case 5:
      return 'StewardshipTrigger'
    default:
      return null
  }
}

