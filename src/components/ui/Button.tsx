import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button 
      className={cn(
        "bg-elevated text-primary rounded-md px-6 py-3 transition-all duration-300 ease-out",
        "hover:bg-[#333333] hover:shadow-[0_0_15px_rgba(115,115,115,0.15)]",
        "active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "font-medium tracking-wide",
        className
      )}
      {...props} 
    />
  )
}
