import { useParams, Link } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SeverityBadge } from '@/components/shared/severity-badge'
import { IncidentStatusBadge } from '../components/incident-status-badge'
import { AffectedAssetsCard } from '../components/affected-assets-card'
import { LinkedAlertsSection } from '../components/linked-alerts-section'
import { NotesTimeline } from '../components/notes-timeline'
import { useIncidentsStore } from '../stores/use-incidents-store'
import type { IncidentStatus } from '@/types/incidents'
import {
  ArrowLeft,
  Clock,
  Shield,
  Layers,
  CheckCircle2,
  AlertTriangle,
  History,
} from 'lucide-react'

const LIFECYCLE_STAGES: readonly IncidentStatus[] = [
  'triage',
  'containment',
  'eradication',
  'resolved',
]

export function IncidentDetailPage() {
  const { id } = useParams<{ readonly id: string }>()
  const incidentId = id ?? 'INC-401'
  const { getIncidentById, updateIncidentStatus } = useIncidentsStore()

  const storeIncident = getIncidentById(incidentId)
  const incident = storeIncident ?? {
    id: incidentId,
    title: `Simulated Major Security Escalation (${incidentId})`,
    severity: 'critical' as const,
    status: 'containment' as const,
    assignedAnalyst: 'Analyst Reynolds',
    createdTimestamp: new Date().toISOString(),
    updatedTimestamp: new Date().toISOString(),
    affectedAssetsCount: 2,
    affectedAssets: [
      { name: 'DC-01.corp.internal', type: 'host' as const, ip: '10.0.1.15', status: 'isolated' as const },
      { name: 'CORP\\svc_backup', type: 'identity' as const, status: 'remediated' as const },
    ],
    linkedAlertIds: ['ALT-1042', 'ALT-1048'],
    summary: 'Dynamic synthetic incident scenario created for platform validation.',
    investigationNotes: [
      {
        id: 'initial-note',
        author: 'Analyst Reynolds',
        timestamp: new Date().toISOString(),
        text: 'Incident case initialized in simulation environment.',
      },
    ],
    isSynthetic: true as const,
  }

  const handleStageChange = (newStatus: IncidentStatus) => {
    updateIncidentStatus(incident.id, newStatus)
  }

  return (
    <div className="space-y-6">
      {/* Back navigation */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <Link to="/incidents">
          <Button variant="ghost" size="sm" className="text-xs text-slate-400 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
            <span>Back to Incident Queue</span>
          </Button>
        </Link>
        <span className="text-xs font-mono text-cyan-400/90 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
          INCIDENT RESPONSE CASEFILE
        </span>
      </div>

      {/* Incident Header */}
      <PageHeader
        title={`${incident.id}: ${incident.title}`}
        description={`Commander: ${incident.assignedAnalyst} • Opened at ${new Date(incident.createdTimestamp).toUTCString()}`}
        actions={
          <div className="flex items-center gap-2">
            <SeverityBadge severity={incident.severity} />
            <IncidentStatusBadge status={incident.status} />
          </div>
        }
      />

      {/* Interactive Lifecycle Stage Transition Stepper */}
      <Card className="bg-[#080d1a] border-cyan-900/40">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              <span>Incident Response Lifecycle Stage:</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              Click any stage to transition case status
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {LIFECYCLE_STAGES.map((stage, idx) => {
              const isActive = incident.status === stage
              const stageLabels: Record<IncidentStatus, string> = {
                triage: '1. Triage',
                containment: '2. Containment',
                eradication: '3. Eradication',
                resolved: '4. Resolved',
              }

              return (
                <button
                  key={stage}
                  type="button"
                  onClick={() => handleStageChange(stage)}
                  className={`p-2.5 rounded-md border text-left text-xs font-mono transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-cyan-950/80 text-cyan-200 border-cyan-500 font-bold shadow-xs'
                      : 'bg-[#0c1424] text-slate-400 border-[#182744] hover:bg-[#121c32] hover:text-slate-200'
                  }`}
                >
                  <span>{stageLabels[stage]}</span>
                  {isActive ? (
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                  ) : (
                    <span className="text-[10px] text-slate-600">Stage {idx + 1}</span>
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout: Executive Brief & Forensic Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Summary, Assets & Notes Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Executive Summary */}
          <Card className="bg-[#080d1a] border-[#16233b]">
            <CardHeader className="pb-3 border-b border-[#141f33]">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-cyan-400" />
                <CardTitle className="text-sm font-semibold text-slate-100">
                  Executive Brief & Risk Scope
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <p className="text-xs text-slate-200 leading-relaxed bg-[#0b1222] p-3 rounded border border-[#141f35]">
                {incident.summary}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#070d18] border border-[#141f33]">
                  <span className="text-slate-500 text-[10px] uppercase block">Incident ID</span>
                  <span className="text-white font-semibold">{incident.id}</span>
                </div>
                <div className="p-2.5 rounded bg-[#070d18] border border-[#141f33]">
                  <span className="text-slate-500 text-[10px] uppercase block">Assigned Commander</span>
                  <span className="text-cyan-400">{incident.assignedAnalyst}</span>
                </div>
                <div className="p-2.5 rounded bg-[#070d18] border border-[#141f33]">
                  <span className="text-slate-500 text-[10px] uppercase block">Simulated Scope</span>
                  <span className="text-emerald-400">Isolated Test Bed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Affected Assets & Quarantine Controls */}
          <AffectedAssetsCard incidentId={incident.id} assets={incident.affectedAssets} />

          {/* Linked Security Alerts */}
          <LinkedAlertsSection linkedAlertIds={incident.linkedAlertIds} />

          {/* Investigation Notes Timeline */}
          <NotesTimeline incidentId={incident.id} notes={incident.investigationNotes} />
        </div>

        {/* Right 1 Col: Audit History & Response Metrics */}
        <div className="space-y-6">
          <Card className="bg-[#080d1a] border-[#16233b]">
            <CardHeader className="pb-3 border-b border-[#141f33]">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" />
                <CardTitle className="text-sm font-semibold text-slate-100">
                  Response SLA & Metrics
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#131f33]">
                <span className="text-slate-500">Detection Timestamp:</span>
                <span className="text-slate-300">
                  {new Date(incident.createdTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#131f33]">
                <span className="text-slate-500">Last Case Activity:</span>
                <span className="text-cyan-400">
                  {new Date(incident.updatedTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#131f33]">
                <span className="text-slate-500">Current Lifecycle:</span>
                <span className="text-amber-400 uppercase font-semibold">{incident.status}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Incident Severity:</span>
                <span className="text-red-400 uppercase font-semibold">{incident.severity}</span>
              </div>
            </CardContent>
          </Card>

          {/* Audit History Trail */}
          <Card className="bg-[#080d1a] border-[#16233b]">
            <CardHeader className="pb-3 border-b border-[#141f33]">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-slate-400" />
                <CardTitle className="text-xs uppercase font-mono text-slate-400">
                  Audit History Trail
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-xs">
              <div className="border-l-2 border-red-500 pl-3 py-0.5 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 block">Initial Escalation</span>
                <span className="text-slate-200 font-medium block">Correlated from 3 Phase 3 Alerts</span>
              </div>
              <div className="border-l-2 border-cyan-500 pl-3 py-0.5 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 block">Commander Assigned</span>
                <span className="text-slate-200 font-medium block">{incident.assignedAnalyst} took ownership</span>
              </div>
              <div className="border-l-2 border-amber-500 pl-3 py-0.5 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 block">Quarantine Command</span>
                <span className="text-slate-200 font-medium block">Endpoint sensors verified in isolation state</span>
              </div>
              <div className="border-l-2 border-emerald-500 pl-3 py-0.5 space-y-0.5">
                <span className="text-[10px] font-mono text-slate-500 block">Active Status</span>
                <span className="text-emerald-400 font-mono font-medium block uppercase">
                  Stage: {incident.status}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Simulation Disclaimer Box */}
          <div className="p-3 rounded-lg border border-[#16233b] bg-[#070d18] text-[11px] font-mono text-slate-500 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500/70 shrink-0 mt-0.5" />
            <span>
              All incident records, playbook steps, and host isolation controls are simulated inside SignalOps.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
