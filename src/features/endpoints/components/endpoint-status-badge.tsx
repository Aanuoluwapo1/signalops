import type { AgentStatus } from '@/types/endpoints'
import { Badge } from '@/components/ui/badge'
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react'

interface EndpointStatusBadgeProps {
  readonly status: AgentStatus
}

export function EndpointStatusBadge({ status }: EndpointStatusBadgeProps) {
  switch (status) {
    case 'active':
      return (
        <Badge variant="default" className="bg-emerald-950/60 text-emerald-300 border-emerald-700/60 font-mono">
          <Wifi className="h-3 w-3 text-emerald-400" />
          <span>Active</span>
        </Badge>
      )
    case 'isolated':
      return (
        <Badge variant="danger" className="bg-red-950/60 text-red-300 border-red-700/60 font-mono">
          <WifiOff className="h-3 w-3 text-red-400" />
          <span>Isolated</span>
        </Badge>
      )
    case 'disconnected':
      return (
        <Badge variant="subtle" className="bg-slate-900/80 text-slate-400 border-slate-700/60 font-mono">
          <AlertTriangle className="h-3 w-3 text-slate-400" />
          <span>Disconnected</span>
        </Badge>
      )
    default:
      return <Badge variant="subtle">{status}</Badge>
  }
}
