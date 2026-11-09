import { ShieldAlert, Laptop, Flame, Clock, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { KpiMetric } from '../types/dashboard'
import { cn } from '@/lib/utils'

interface KpiCardProps {
  readonly metric: KpiMetric
}

export function KpiCard({ metric }: KpiCardProps) {
  const getIcon = () => {
    switch (metric.icon) {
      case 'threats':
        return <ShieldAlert className="h-4 w-4 text-amber-400" />
      case 'health':
        return <Laptop className="h-4 w-4 text-cyan-400" />
      case 'incidents':
        return <Flame className="h-4 w-4 text-red-400" />
      case 'mtta':
        return <Clock className="h-4 w-4 text-blue-400" />
      default:
        return <ShieldAlert className="h-4 w-4 text-slate-400" />
    }
  }

  const isUp = metric.delta.startsWith('+')
  const TrendIcon = isUp ? TrendingUp : TrendingDown

  return (
    <Card className="hover:border-cyan-500/40 transition-colors bg-[#080d1a]">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium text-slate-300">{metric.title}</span>
          <div className="p-1.5 rounded bg-[#0d162a] border border-[#172540]">
            {getIcon()}
          </div>
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold tracking-tight text-white font-mono">
            {metric.value}
          </span>
          <div
            className={cn(
              'inline-flex items-center gap-1 text-[11px] font-mono px-1.5 py-0.5 rounded border',
              metric.isPositiveTrend
                ? 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40'
                : 'text-amber-400 bg-amber-950/40 border-amber-800/40',
            )}
          >
            <TrendIcon className="h-3 w-3" />
            <span>{metric.delta}</span>
          </div>
        </div>

        <p className="mt-2 text-[11px] text-slate-500 truncate font-mono">
          {metric.subtitle}
        </p>
      </CardContent>
    </Card>
  )
}
