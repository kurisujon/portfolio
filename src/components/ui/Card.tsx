import { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-surface border border-zinc-200 dark:border-default rounded-md p-6 transition-all duration-500 ease-out",
        "hover:border-zinc-300 dark:hover:border-white/20 hover:-translate-y-[2px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
