import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SeverityBadge } from '@/components/shared/severity-badge'
import { ShieldAlert, ExternalLink } from 'lucide-react'
import { useAlertsStore } from '@/features/alerts/stores/use-alerts-store'

interface LinkedAlertsSectionProps {
  readonly linkedAlertIds: readonly string[]
}

export function LinkedAlertsSection({ linkedAlertIds }: LinkedAlertsSectionProps) {
  const { alerts } = useAlertsStore()

  // Match alert from Phase 3 alerts store
  const matchedAlerts = linkedAlertIds.map((id) => {
    const found = alerts.find((a) => a.id.toLowerCase() === id.toLowerCase())
    if (found) return found
    return {
      id,
      title: `Simulated Alert Correlated (${id})`,
      severity: 'high' as const,
      category: 'Attack Telemetry',
      targetHost: 'DC-01.corp.internal',
    }
  })

  return (
    <Card className="bg-[#080d1a] border-[#16233b]">
      <CardHeader className="pb-3 border-b border-[#141f33]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            <CardTitle className="text-sm font-semibold text-slate-100">
              Correlated Security Alerts ({linkedAlertIds.length})
            </CardTitle>
          </div>
          <span className="text-[11px] font-mono text-cyan-400">
            PHASE 3 CROSS-LINK ACTIVE
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0 divide-y divide-[#131f33]">
        {matchedAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-3.5 flex items-center justify-between gap-3 hover:bg-[#0c1424] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <SeverityBadge severity={alert.severity} />
              <div className="truncate">
                <Link
                  to={`/alerts/${alert.id}`}
                  className="text-xs font-medium text-slate-200 hover:text-cyan-400 transition-colors truncate block"
                >
                  {alert.title}
                </Link>
                <span className="text-[11px] font-mono text-slate-500">
                  {alert.id} &bull; Target: {alert.targetHost}
                </span>
              </div>
            </div>

            <Link to={`/alerts/${alert.id}`} className="shrink-0">
              <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-400 hover:text-cyan-300">
                <span>Inspect Alert</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
