import { ReactNode, ElementType, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'small'
  as?: ElementType
  children: ReactNode
}

export function Typography({ variant = 'body', as, className, children, ...props }: TypographyProps) {
  const Component: any = as || (variant === 'body' ? 'p' : variant === 'small' ? 'span' : variant)
  
  const variants = {
    h1: "text-[3.5rem] md:text-[4rem] leading-[1.1] font-bold text-zinc-900 dark:text-primary tracking-tight transition-colors",
    h2: "text-[2.25rem] leading-[1.3] font-semibold text-zinc-900 dark:text-primary tracking-tight transition-colors",
    h3: "text-[1.5rem] leading-[1.4] font-medium text-zinc-900 dark:text-primary transition-colors",
    body: "text-[1rem] leading-[1.75] font-normal text-zinc-700 dark:text-secondary transition-colors",
    small: "text-[0.875rem] leading-[1.6] font-normal text-zinc-500 dark:text-secondary transition-colors",
  }

  return (
    <Component className={cn(variants[variant], className)} {...props}>
      {children}
    </Component>
  )
}
