import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'cyan'
  readonly size?: 'sm' | 'md' | 'lg' | 'icon'
  readonly children?: ReactNode
}

export function Button({
  className,
  variant = 'default',
  size = 'md',
  type = 'button',
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50 select-none'

  const variantClasses = {
    default: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 hover:text-cyan-200',
    secondary: 'bg-[#121c32] text-slate-300 border border-[#1e2e4f] hover:bg-[#182644] hover:text-white',
    outline: 'border border-[#203152] text-slate-300 hover:bg-[#121e36] hover:text-white bg-transparent',
    ghost: 'text-slate-400 hover:bg-[#131f38] hover:text-slate-200 bg-transparent',
    danger: 'bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25',
    cyan: 'bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 shadow-sm shadow-cyan-950',
  }

  const sizeClasses = {
    sm: 'h-7 px-2.5 text-xs rounded',
    md: 'h-8 px-3.5 text-xs rounded-md',
    lg: 'h-10 px-4 text-sm rounded-md',
    icon: 'h-8 w-8 rounded-md',
  }

  return (
    <button
      type={type}
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
