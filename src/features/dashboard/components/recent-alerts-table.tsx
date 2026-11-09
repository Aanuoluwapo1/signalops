import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SeverityBadge } from '@/components/shared/severity-badge'
import { ShieldAlert, ArrowRight, ExternalLink } from 'lucide-react'
import type { SimulatedAlertSummary } from '../types/dashboard'

interface RecentAlertsTableProps {
  readonly alerts: readonly SimulatedAlertSummary[]
}

export function RecentAlertsTable({ alerts }: RecentAlertsTableProps) {
  return (
    <Card className="bg-[#080d1a] border-[#16233b]">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-amber-400" />
            <CardTitle className="text-sm font-semibold text-slate-100">
              Recent Simulated Alerts Triage
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-slate-400 mt-0.5">
            Real-time synthetic detections pending analyst review, containment, and playbooks.
          </CardDescription>
        </div>
        <Link to="/alerts">
          <Button variant="secondary" size="sm" className="text-xs">
            <span>View Full Queue (14)</span>
            <ExternalLink className="h-3 w-3 ml-1.5" />
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="p-0">
        {/* Desktop Data-Dense Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-y border-[#152035] bg-[#060a14] text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-4 font-semibold">Severity</th>
                <th className="py-2.5 px-4 font-semibold">Alert ID & Name</th>
                <th className="py-2.5 px-4 font-semibold">Target Host & IP</th>
                <th className="py-2.5 px-4 font-semibold">ATT&CK Mapping</th>
                <th className="py-2.5 px-4 font-semibold">Timestamp</th>
                <th className="py-2.5 px-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#131e33]">
              {alerts.map((alert) => (
                <tr
                  key={alert.id}
                  className="hover:bg-[#0c1424] transition-colors group"
                >
                  <td className="py-3 px-4 whitespace-nowrap">
                    <SeverityBadge severity={alert.severity} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <Link
                        to={`/alerts/${alert.id}`}
                        className="font-medium text-slate-200 hover:text-cyan-400 transition-colors"
                      >
                        {alert.title}
                      </Link>
                      <span className="text-[11px] font-mono text-slate-500">
                        {alert.id} &bull; Synthetic Telemetry
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-xs text-slate-300">
                    <div>{alert.targetHost}</div>
                    <div className="text-[11px] text-slate-500">{alert.targetIp}</div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-[#111c33] border border-[#1b2b4d] font-mono text-[10px] text-cyan-300">
                        {alert.mitreTactic}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {alert.mitreTechnique}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-mono text-xs text-slate-400">
                    {alert.timestamp}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <Link to={`/alerts/${alert.id}`}>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-400 hover:text-cyan-300">
                        <span>Inspect</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Dense Card Stack */}
        <div className="md:hidden divide-y divide-[#141f35]">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-3.5 space-y-2 hover:bg-[#0c1424]">
              <div className="flex items-center justify-between gap-2">
                <SeverityBadge severity={alert.severity} />
                <span className="text-[10px] font-mono text-slate-500">{alert.timestamp}</span>
              </div>
              <div>
                <Link
                  to={`/alerts/${alert.id}`}
                  className="text-xs font-medium text-slate-200 hover:text-cyan-400 block"
                >
                  {alert.title}
                </Link>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                  Host: {alert.targetHost} ({alert.targetIp})
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="px-1.5 py-0.5 rounded bg-[#111c33] border border-[#1b2b4d] font-mono text-[10px] text-cyan-300">
                  {alert.mitreTactic} ({alert.mitreTechnique})
                </span>
                <Link to={`/alerts/${alert.id}`}>
                  <Button variant="secondary" size="sm" className="h-6 text-[11px] px-2">
                    Inspect
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
