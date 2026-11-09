import type { EventLevel } from '@/types/events'
import { Badge } from '@/components/ui/badge'
import { ShieldAlert, AlertTriangle, Info, AlertCircle } from 'lucide-react'

interface EventLevelBadgeProps {
  readonly level: EventLevel
}

export function EventLevelBadge({ level }: EventLevelBadgeProps) {
  switch (level) {
    case 'critical':
      return (
        <Badge variant="danger" className="bg-red-950/60 text-red-300 border-red-700/60 font-mono">
          <ShieldAlert className="h-3 w-3 text-red-400" />
          <span>Critical</span>
        </Badge>
      )
    case 'error':
      return (
        <Badge variant="warning" className="bg-orange-950/60 text-orange-300 border-orange-700/60 font-mono">
          <AlertCircle className="h-3 w-3 text-orange-400" />
          <span>Error</span>
        </Badge>
      )
    case 'warning':
      return (
        <Badge variant="warning" className="bg-amber-950/60 text-amber-300 border-amber-700/60 font-mono">
          <AlertTriangle className="h-3 w-3 text-amber-400" />
          <span>Warning</span>
        </Badge>
      )
    case 'information':
    default:
      return (
        <Badge variant="cyan" className="bg-cyan-950/60 text-cyan-300 border-cyan-700/60 font-mono">
          <Info className="h-3 w-3 text-cyan-400" />
          <span>Information</span>
        </Badge>
      )
  }
}
