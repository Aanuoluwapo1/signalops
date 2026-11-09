import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { readonly children?: ReactNode }) {
  return (
    <div
      className={cn(
        'rounded-lg border border-[#16233b] bg-[#090f1d] text-slate-100 shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { readonly children?: ReactNode }) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 p-4 sm:p-5 border-b border-[#131e33]', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { readonly children?: ReactNode }) {
  return (
    <h3
      className={cn('text-sm font-semibold tracking-tight text-slate-200 flex items-center gap-2', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardDescription({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { readonly children?: ReactNode }) {
  return (
    <p className={cn('text-xs text-slate-400', className)} {...props}>
      {children}
    </p>
  )
}

export function CardContent({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { readonly children?: ReactNode }) {
  return (
    <div className={cn('p-4 sm:p-5', className)} {...props}>
      {children}
    </div>
  )
}
