import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SeverityBadge } from '@/components/shared/severity-badge'
import { IncidentStatusBadge } from '../components/incident-status-badge'
import { CreateIncidentModal } from '../components/create-incident-modal'
import { useIncidentsStore, getFilteredIncidents } from '../stores/use-incidents-store'
import type { IncidentSeverity, IncidentStatus } from '@/types/incidents'
import {
  Flame,
  Plus,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  Clock,
  Layers,
  CheckCircle2,
} from 'lucide-react'

export function IncidentsPage() {
  const {
    incidents,
    searchQuery,
    severityFilter,
    statusFilter,
    setSearchQuery,
    setSeverityFilter,
    setStatusFilter,
  } = useIncidentsStore()

  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const filteredIncidents = getFilteredIncidents(
    incidents,
    searchQuery,
    severityFilter,
    statusFilter,
  )

  const activeCount = incidents.filter((i) => i.status !== 'resolved').length
  const criticalCount = incidents.filter((i) => i.severity === 'critical' && i.status !== 'resolved').length
  const containmentCount = incidents.filter((i) => i.status === 'containment').length
  const resolvedCount = incidents.filter((i) => i.status === 'resolved').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Incident Response Command"
        description="Active threat scenario containment, eradication playbooks, and forensic case management."
        actions={
          <Button variant="cyan" size="sm" onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4 mr-1.5" />
            <span>Create Incident (Simulate)</span>
          </Button>
        }
      />

      {/* Summary KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Active Incidents</span>
            <span className="text-2xl font-bold font-mono text-white mt-0.5 block">{activeCount}</span>
          </div>
          <div className="p-2 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
            <Flame className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Critical Threats</span>
            <span className="text-2xl font-bold font-mono text-red-400 mt-0.5 block">{criticalCount}</span>
          </div>
          <div className="p-2 rounded bg-red-950/60 border border-red-800/60 text-red-400">
            <ShieldAlert className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Containment Active</span>
            <span className="text-2xl font-bold font-mono text-amber-400 mt-0.5 block">{containmentCount}</span>
          </div>
          <div className="p-2 rounded bg-amber-950/60 border border-amber-800/60 text-amber-400">
            <Layers className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Average MTTR</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-0.5 block">16.4m</span>
          </div>
          <div className="p-2 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
            <Clock className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-lg bg-[#080d1a] border border-[#16233b] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search incidents by ID, title, assigned analyst, or affected asset..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 pl-9 pr-3 text-xs rounded-md bg-[#0c1424] border border-[#1e2e4f] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Severity Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#0c1424] border border-[#1e2e4f] rounded-md px-2.5 py-1">
            <Filter className="h-3 w-3 text-cyan-400 shrink-0" />
            <span className="text-[11px] font-mono text-slate-400">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as IncidentSeverity | 'all')}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#0c1424]">All Severities</option>
              <option value="critical" className="bg-[#0c1424] text-red-400">Critical</option>
              <option value="high" className="bg-[#0c1424] text-orange-400">High</option>
              <option value="medium" className="bg-[#0c1424] text-amber-400">Medium</option>
              <option value="low" className="bg-[#0c1424] text-blue-400">Low</option>
            </select>
          </div>

          {/* Lifecycle Status Dropdown */}
          <div className="flex items-center gap-1.5 bg-[#0c1424] border border-[#1e2e4f] rounded-md px-2.5 py-1">
            <span className="text-[11px] font-mono text-slate-400">Lifecycle:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as IncidentStatus | 'all')}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#0c1424]">All Stages</option>
              <option value="triage" className="bg-[#0c1424]">Triage</option>
              <option value="containment" className="bg-[#0c1424]">Containment</option>
              <option value="eradication" className="bg-[#0c1424]">Eradication</option>
              <option value="resolved" className="bg-[#0c1424]">Resolved</option>
            </select>
          </div>

          {(searchQuery || severityFilter !== 'all' || statusFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setSeverityFilter('all')
                setStatusFilter('all')
              }}
              className="h-7 text-xs text-slate-400 hover:text-white"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Incident Data Table */}
      <Card className="bg-[#080d1a] border-[#16233b] overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#152035] bg-[#060a14] text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-4 font-semibold">Severity</th>
                  <th className="py-2.5 px-4 font-semibold">Lifecycle</th>
                  <th className="py-2.5 px-4 font-semibold">Incident Identifier & Scope</th>
                  <th className="py-2.5 px-4 font-semibold">Commander</th>
                  <th className="py-2.5 px-4 font-semibold">Affected Assets</th>
                  <th className="py-2.5 px-4 font-semibold">Linked Alerts</th>
                  <th className="py-2.5 px-4 font-semibold">Last Updated</th>
                  <th className="py-2.5 px-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#131e33]">
                {filteredIncidents.map((inc) => (
                  <tr
                    key={inc.id}
                    className="hover:bg-[#0c1424] transition-colors group"
                  >
                    <td className="py-3 px-4 whitespace-nowrap">
                      <SeverityBadge severity={inc.severity} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <IncidentStatusBadge status={inc.status} />
                    </td>
                    <td className="py-3 px-4 min-w-[260px]">
                      <Link
                        to={`/incidents/${inc.id}`}
                        className="font-medium text-slate-200 hover:text-cyan-400 transition-colors block"
                      >
                        {inc.title}
                      </Link>
                      <span className="text-[11px] font-mono text-slate-500">
                        {inc.id} &bull; Synthetic Incident Case
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-xs text-cyan-300">
                      {inc.assignedAnalyst}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-xs text-slate-300">
                      <span>{inc.affectedAssetsCount} Assets</span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-xs">
                      <span className="px-1.5 py-0.5 rounded bg-[#111c33] border border-[#1b2b4d] text-cyan-300 text-[10px]">
                        {inc.linkedAlertIds.length} Alerts
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-xs text-slate-400">
                      {new Date(inc.updatedTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Link to={`/incidents/${inc.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-slate-400 hover:text-cyan-300 group-hover:bg-[#121c32]"
                        >
                          <span>Manage</span>
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-[#141f33] bg-[#070c17] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Displaying {filteredIncidents.length} of {incidents.length} security incidents</span>
            <span className="text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{resolvedCount} Incidents Resolved</span>
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Create Incident Modal */}
      <CreateIncidentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  )
}
