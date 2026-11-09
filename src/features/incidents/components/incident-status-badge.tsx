import type { IncidentStatus } from '@/types/incidents'
import { Badge } from '@/components/ui/badge'
import { ShieldAlert, ShieldCheck, Flame, Wrench } from 'lucide-react'

interface IncidentStatusBadgeProps {
  readonly status: IncidentStatus
}

export function IncidentStatusBadge({ status }: IncidentStatusBadgeProps) {
  switch (status) {
    case 'triage':
      return (
        <Badge variant="cyan" className="bg-cyan-950/60 text-cyan-300 border-cyan-700/60 font-mono">
          <ShieldAlert className="h-3 w-3 text-cyan-400" />
          <span>Triage</span>
        </Badge>
      )
    case 'containment':
      return (
        <Badge variant="danger" className="bg-red-950/60 text-red-300 border-red-700/60 font-mono">
          <Flame className="h-3 w-3 text-red-400" />
          <span>Containment</span>
        </Badge>
      )
    case 'eradication':
      return (
        <Badge variant="warning" className="bg-amber-950/60 text-amber-300 border-amber-700/60 font-mono">
          <Wrench className="h-3 w-3 text-amber-400" />
          <span>Eradication</span>
        </Badge>
      )
    case 'resolved':
      return (
        <Badge variant="default" className="bg-emerald-950/60 text-emerald-300 border-emerald-700/60 font-mono">
          <ShieldCheck className="h-3 w-3 text-emerald-400" />
          <span>Resolved</span>
        </Badge>
      )
    default:
      return <Badge variant="subtle">{status}</Badge>
  }
}
