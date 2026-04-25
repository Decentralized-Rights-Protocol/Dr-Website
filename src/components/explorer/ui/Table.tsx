import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TableProps {
  children: ReactNode
  className?: string
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={cn('overflow-x-auto rounded-xl', className)}>
      <table className="w-full border-collapse rounded-xl overflow-hidden">{children}</table>
    </div>
  )
}

export function TableHead({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <thead className={cn('border-b border-purple-500/20', className)}>
      {children}
    </thead>
  )
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>
}

export function TableRow({ children, hover = true, className }: { children: ReactNode; hover?: boolean; className?: string }) {
  return (
    <tr
      className={cn(
        'border-b border-purple-500/10 transition-all duration-200',
        hover && 'hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/5',
        className
      )}
    >
      {children}
    </tr>
  )
}

export function TableHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400',
        className
      )}
    >
      {children}
    </th>
  )
}

export function TableCell({ children, className, colSpan }: { children: ReactNode; className?: string; colSpan?: number }) {
  return (
    <td className={cn('px-4 py-3 text-sm text-gray-300', className)} colSpan={colSpan}>
      {children}
    </td>
  )
}







