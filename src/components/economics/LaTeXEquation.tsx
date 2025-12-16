'use client'

import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface LaTeXEquationProps {
  equation: string
  label?: string
  explanation?: string
  variables?: Array<{ symbol: string; description: string }>
  inline?: boolean
  className?: string
}

/**
 * LaTeX Equation Component
 * Renders mathematical equations using KaTeX with Overleaf-style formatting
 */
export function LaTeXEquation({ 
  equation, 
  label, 
  explanation, 
  variables, 
  inline = false,
  className = '' 
}: LaTeXEquationProps) {
  const MathComponent = inline ? InlineMath : BlockMath

  return (
    <div className={`my-6 ${className}`}>
      {label && (
        <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
        </div>
      )}
      
      <div className="bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-lg p-6 overflow-x-auto">
        <div className="flex flex-col items-center">
          {inline ? (
            <span className="text-lg">
              <MathComponent math={equation} />
            </span>
          ) : (
            <div className="text-xl">
              <MathComponent math={equation} />
            </div>
          )}
        </div>
      </div>

      {variables && variables.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
            Where:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
            {variables.map((variable, index) => (
              <li key={index}>
                <span className="font-mono font-semibold text-neutral-900 dark:text-white">
                  {variable.symbol}:
                </span>{' '}
                {variable.description}
              </li>
            ))}
          </ul>
        </div>
      )}

      {explanation && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 rounded-r">
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {explanation}
          </p>
        </div>
      )}
    </div>
  )
}

