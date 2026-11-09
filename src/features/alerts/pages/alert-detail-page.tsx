import { useParams, Link } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SeverityBadge } from '@/components/shared/severity-badge'
import { AlertStatusBadge } from '../components/alert-status-badge'
import { AlertStatusActions } from '../components/alert-status-actions'
import { RawLogViewer } from '../components/raw-log-viewer'
import { useAlertsStore } from '../stores/use-alerts-store'
import {
  ArrowLeft,
  Shield,
  Laptop,
  Clock,
  Layers,
  Flame,
  ExternalLink,
} from 'lucide-react'

export function AlertDetailPage() {
  const { id } = useParams<{ readonly id: string }>()
  const alertId = id ?? 'ALT-1042'
  const { getAlertById } = useAlertsStore()

  // Retrieve alert from store, or create clean fallback if directly navigating to custom ID
  const storeAlert = getAlertById(alertId)
  const alert = storeAlert ?? {
    id: alertId,
    title: `Simulated Security Incident Detection (${alertId})`,
    severity: 'critical' as const,
    status: 'open' as const,
    timestamp: new Date().toISOString(),
    category: 'System Anomaly',
    sourceIp: '192.168.10.84',
    destinationIp: '10.0.1.15',
    targetHost: 'DC-01.corp.internal',
    mitreTechnique: 'T1003.001',
    mitreTactic: 'Credential Access',
    description: 'Dynamic synthetic security event payload registered for evaluation.',
    rawLog: JSON.stringify(
      {
        AlertId: alertId,
        Timestamp: new Date().toISOString(),
        Environment: 'SIGNALOPS_SYNTHETIC_LAB',
        Status: 'Active',
        isSynthetic: true,
      },
      null,
      2,
    ),
    isSynthetic: true as const,
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb back navigation */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Link to="/alerts">
          <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            <span>Back to Alerts Queue</span>
          </Button>
        </Link>
        <span className="text-xs font-mono text-cyan-400/90 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
          SYNTHETIC FORENSIC DOSSIER
        </span>
      </div>

      {/* Main Alert Header */}
      <PageHeader
        title={`${alert.id}: ${alert.title}`}
        description={`Category: ${alert.category} • Detected at ${new Date(alert.timestamp).toUTCString()}`}
        actions={
          <div className="flex items-center gap-2">
            <Link to="/incidents/INC-401">
              <Button variant="danger" size="sm" className="text-xs">
                <Flame className="h-3.5 w-3.5 mr-1.5" />
                <span>Escalate to Incident</span>
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </div>
        }
      />

      {/* Analyst Status & Transition Action Bar */}
      <Card className="bg-[#080d1a] border-cyan-900/40">
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Current Status:</span>
            <AlertStatusBadge status={alert.status} />
            <SeverityBadge severity={alert.severity} />
            {alert.assignedAnalyst && (
              <span className="text-xs font-mono text-slate-300 bg-[#121c32] px-2 py-0.5 rounded border border-[#1b2b4d]">
                Assigned: {alert.assignedAnalyst}
              </span>
            )}
          </div>

          <AlertStatusActions
            alertId={alert.id}
            currentStatus={alert.status}
            assignedAnalyst={alert.assignedAnalyst}
          />
        </CardContent>
      </Card>

      {/* Detailed Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Event Breakdown & Raw Log */}
        <div className="lg:col-span-2 space-y-6">
          {/* Forensic Breakdown */}
          <Card className="bg-[#080d1a] border-[#16233b]">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-cyan-400" />
                <CardTitle className="text-sm font-semibold text-slate-100">
                  Forensic Telemetry Breakdown
                </CardTitle>
              </div>
              <CardDescription className="text-xs text-slate-400">
                Detailed contextual parameters captured by synthetic endpoint and perimeter sensors.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alert.description && (
                <div className="p-3 rounded bg-[#0b1222] border border-[#141f35] text-xs text-slate-300 leading-relaxed">
                  <span className="text-slate-400 font-semibold block mb-0.5">Analyst Summary:</span>
                  {alert.description}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded bg-[#070d18] border border-[#141f33]">
                  <span className="text-slate-500 text-[10px] uppercase block">Target Hostname</span>
                  <span className="text-slate-100 font-semibold">{alert.targetHost}</span>
                </div>
                <div className="p-3 rounded bg-[#070d18] border border-[#141f33]">
                  <span className="text-slate-500 text-[10px] uppercase block">Network Vectors</span>
                  <span className="text-cyan-400">{alert.sourceIp} &rarr; {alert.destinationIp}</span>
                </div>
                <div className="p-3 rounded bg-[#070d18] border border-[#141f33]">
                  <span className="text-slate-500 text-[10px] uppercase block">Detection Category</span>
                  <span className="text-slate-200">{alert.category}</span>
                </div>
                <div className="p-3 rounded bg-[#070d18] border border-[#141f33]">
                  <span className="text-slate-500 text-[10px] uppercase block">Detection Rule Origin</span>
                  <span className="text-slate-200">SIGMA-RULE-{alert.mitreTechnique.replace('.', '-')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Collapsible Raw Log Inspector */}
          <RawLogViewer rawLog={alert.rawLog} alertId={alert.id} />
        </div>

        {/* Right Column (1 Col): ATT&CK Mapping & Asset Dossier */}
        <div className="space-y-6">
          {/* MITRE ATT&CK Mapping Card */}
          <Card className="bg-[#080d1a] border-[#16233b]">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-cyan-400" />
                <CardTitle className="text-sm font-semibold text-slate-100">
                  MITRE ATT&CK Mapping
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded bg-[#0b1222] border border-[#141f35] space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Tactic</span>
                <span className="font-semibold text-white">{alert.mitreTactic}</span>
              </div>
              <div className="p-3 rounded bg-[#0b1222] border border-[#141f35] space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Technique</span>
                <span className="font-semibold text-cyan-300 font-mono">{alert.mitreTechnique}</span>
              </div>
              <div className="p-3 rounded bg-[#0b1222] border border-[#141f35] space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Simulation Environment</span>
                <span className="text-emerald-400 font-mono text-[11px]">Sandboxed &bull; No Production Impact</span>
              </div>
            </CardContent>
          </Card>

          {/* Affected Endpoint Dossier */}
          <Card className="bg-[#080d1a] border-[#16233b]">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Laptop className="h-4 w-4 text-cyan-400" />
                <CardTitle className="text-sm font-semibold text-slate-100">
                  Target Endpoint Profile
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#131f33]">
                <span className="text-slate-500">Asset:</span>
                <span className="text-slate-200">{alert.targetHost}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#131f33]">
                <span className="text-slate-500">IP Address:</span>
                <span className="text-cyan-400">{alert.destinationIp}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#131f33]">
                <span className="text-slate-500">Operating System:</span>
                <span className="text-slate-300">Windows Server 2022 Datacenter</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#131f33]">
                <span className="text-slate-500">Agent Version:</span>
                <span className="text-slate-300">SignalOps-Sensor v2.4.1</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Sensor Status:</span>
                <span className="text-emerald-400 font-semibold">ONLINE &bull; HEALTHY</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Investigation Timeline */}
          <Card className="bg-[#080d1a] border-[#16233b]">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" />
                <CardTitle className="text-xs uppercase font-mono text-slate-400">
                  Investigation Audit Log
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="border-l-2 border-cyan-500 pl-3 py-0.5 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 block">System Detection</span>
                <span className="text-slate-200 font-medium block">Rule matched telemetry signature</span>
              </div>
              <div className="border-l-2 border-amber-500 pl-3 py-0.5 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 block">Queue Ingestion</span>
                <span className="text-slate-200 font-medium block">Prioritized for Tier 2 analyst evaluation</span>
              </div>
              <div className="border-l-2 border-emerald-500 pl-3 py-0.5 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 block">Current State</span>
                <span className="text-emerald-400 font-medium font-mono block uppercase">
                  {alert.status.replace('_', ' ')}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
