import type { AlertSeverity } from '@/types/alerts'
import { Badge } from '@/components/ui/badge'

interface SeverityBadgeProps {
  readonly severity: AlertSeverity
}

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  switch (severity) {
    case 'critical':
      return <Badge variant="danger">Critical</Badge>
    case 'high':
      return <Badge variant="warning">High</Badge>
    case 'medium':
      return <Badge variant="warning" className="text-amber-300 border-amber-700/50 bg-amber-950/40">Medium</Badge>
    case 'low':
      return <Badge variant="info">Low</Badge>
    case 'info':
    default:
      return <Badge variant="subtle">Info</Badge>
  }
}
