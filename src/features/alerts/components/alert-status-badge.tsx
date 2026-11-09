import type { AlertStatus } from '@/types/alerts'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react'

interface AlertStatusBadgeProps {
  readonly status: AlertStatus
}

export function AlertStatusBadge({ status }: AlertStatusBadgeProps) {
  switch (status) {
    case 'open':
      return (
        <Badge variant="cyan" className="bg-cyan-950/60 text-cyan-300 border-cyan-700/60 font-mono">
          <AlertCircle className="h-3 w-3 text-cyan-400" />
          <span>Open</span>
        </Badge>
      )
    case 'investigating':
      return (
        <Badge variant="warning" className="bg-amber-950/60 text-amber-300 border-amber-700/60 font-mono">
          <Clock className="h-3 w-3 text-amber-400" />
          <span>Investigating</span>
        </Badge>
      )
    case 'resolved':
      return (
        <Badge variant="default" className="bg-emerald-950/60 text-emerald-300 border-emerald-700/60 font-mono">
          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
          <span>Resolved</span>
        </Badge>
      )
    case 'false_positive':
      return (
        <Badge variant="subtle" className="bg-slate-900/80 text-slate-400 border-slate-700/60 font-mono">
          <XCircle className="h-3 w-3 text-slate-400" />
          <span>False Positive</span>
        </Badge>
      )
    default:
      return <Badge variant="subtle">{status}</Badge>
  }
}
