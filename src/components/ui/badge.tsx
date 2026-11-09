import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: 'default' | 'outline' | 'cyan' | 'danger' | 'warning' | 'info' | 'subtle'
  readonly children?: ReactNode
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const baseClasses =
    'inline-flex items-center gap-1 font-mono text-[11px] font-medium px-2 py-0.5 rounded border tracking-wide uppercase select-none'

  const variantClasses = {
    default: 'bg-[#15223a] text-slate-300 border-[#23375c]',
    outline: 'border-[#223558] text-slate-400 bg-transparent',
    cyan: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60',
    danger: 'bg-red-950/60 text-red-400 border-red-800/60',
    warning: 'bg-amber-950/60 text-amber-400 border-amber-800/60',
    info: 'bg-blue-950/60 text-blue-400 border-blue-800/60',
    subtle: 'bg-[#0f172a] text-slate-400 border-[#1e293b]',
  }

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      {children}
    </div>
  )
}
