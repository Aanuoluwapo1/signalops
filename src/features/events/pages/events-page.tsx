import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EventLevelBadge } from '../components/event-level-badge'
import { EventDetailModal } from '../components/event-detail-modal'
import { useEventsStore, getFilteredEvents, type EventTimeRange } from '../stores/use-events-store'
import type { EventLevel, SecurityEventRecord } from '@/types/events'
import {
  Activity,
  Search,
  Filter,
  ArrowRight,
  Terminal,
  Clock,
  Layers,
  Pause,
  Play,
} from 'lucide-react'

export function EventsPage() {
  const {
    events,
    searchQuery,
    levelFilter,
    providerFilter,
    timeRange,
    setSearchQuery,
    setLevelFilter,
    setProviderFilter,
    setTimeRange,
  } = useEventsStore()

  const [inspectEvent, setInspectEvent] = useState<SecurityEventRecord | null>(null)
  const [isStreaming, setIsStreaming] = useState(true)

  const filteredEvents = getFilteredEvents(
    events,
    searchQuery,
    levelFilter,
    providerFilter,
  )

  const criticalCount = events.filter((e) => e.level === 'critical').length
  const warningCount = events.filter((e) => e.level === 'warning').length
  const infoCount = events.filter((e) => e.level === 'information').length

  const timePresets: readonly { readonly id: EventTimeRange; readonly label: string }[] = [
    { id: '15m', label: 'Last 15m' },
    { id: '1h', label: 'Last 1h' },
    { id: '6h', label: 'Last 6h' },
    { id: '24h', label: 'Last 24h' },
    { id: 'all', label: 'All Time' },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="SIEM Event Explorer"
        description="Normalized real-time security telemetry, Windows Security Auditing events, and Sysmon process streams."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsStreaming(!isStreaming)}
              className="text-xs"
            >
              {isStreaming ? (
                <>
                  <Pause className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
                  <span>Pause Stream</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 mr-1.5 text-emerald-400" />
                  <span>Resume Stream</span>
                </>
              )}
            </Button>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2.5 py-1 rounded flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${isStreaming ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span>{isStreaming ? 'STREAM ACTIVE' : 'STREAM PAUSED'}</span>
            </span>
          </div>
        }
      />

      {/* Summary Ingestion Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Ingested Records</span>
            <span className="text-2xl font-bold font-mono text-white mt-0.5 block">{events.length}</span>
          </div>
          <div className="p-2 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
            <Activity className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Critical Events</span>
            <span className="text-2xl font-bold font-mono text-red-400 mt-0.5 block">{criticalCount}</span>
          </div>
          <div className="p-2 rounded bg-red-950/60 border border-red-800/60 text-red-400">
            <Terminal className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Warnings Flagged</span>
            <span className="text-2xl font-bold font-mono text-amber-400 mt-0.5 block">{warningCount}</span>
          </div>
          <div className="p-2 rounded bg-amber-950/60 border border-amber-800/60 text-amber-400">
            <Layers className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Informational Logs</span>
            <span className="text-2xl font-bold font-mono text-cyan-400 mt-0.5 block">{infoCount}</span>
          </div>
          <div className="p-2 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
            <Clock className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Time Range Pills & Search Filters */}
      <div className="p-4 rounded-lg bg-[#080d1a] border border-[#16233b] space-y-3">
        {/* Row 1: Time Range Presets */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#141f33]">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>Telemetry Ingestion Window:</span>
          </span>

          <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-[#070d18] border border-[#16233b]">
            {timePresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setTimeRange(preset.id)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  timeRange === preset.id
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Search Input & Dropdown Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by Event ID (e.g. 4624, 10), source host, or event name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-9 pr-3 text-xs rounded-md bg-[#0c1424] border border-[#1e2e4f] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Level Filter */}
            <div className="flex items-center gap-1.5 bg-[#0c1424] border border-[#1e2e4f] rounded-md px-2.5 py-1">
              <Filter className="h-3 w-3 text-cyan-400 shrink-0" />
              <span className="text-[11px] font-mono text-slate-400">Level:</span>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value as EventLevel | 'all')}
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#0c1424]">All Levels</option>
                <option value="critical" className="bg-[#0c1424] text-red-400">Critical</option>
                <option value="warning" className="bg-[#0c1424] text-amber-400">Warning</option>
                <option value="information" className="bg-[#0c1424] text-cyan-400">Information</option>
              </select>
            </div>

            {/* Provider Filter */}
            <div className="flex items-center gap-1.5 bg-[#0c1424] border border-[#1e2e4f] rounded-md px-2.5 py-1">
              <span className="text-[11px] font-mono text-slate-400">Provider:</span>
              <select
                value={providerFilter}
                onChange={(e) => setProviderFilter(e.target.value)}
                className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#0c1424]">All Providers</option>
                <option value="Sysmon" className="bg-[#0c1424]">Microsoft-Sysmon</option>
                <option value="Security-Auditing" className="bg-[#0c1424]">Security-Auditing</option>
                <option value="Service Control" className="bg-[#0c1424]">Service Control Manager</option>
              </select>
            </div>

            {(searchQuery || levelFilter !== 'all' || providerFilter !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('')
                  setLevelFilter('all')
                  setProviderFilter('all')
                }}
                className="h-7 text-xs text-slate-400 hover:text-white"
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Events Table */}
      <Card className="bg-[#080d1a] border-[#16233b] overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#152035] bg-[#060a14] text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-4 font-semibold">Level</th>
                  <th className="py-2.5 px-4 font-semibold">Event ID & Name</th>
                  <th className="py-2.5 px-4 font-semibold">Source Host</th>
                  <th className="py-2.5 px-4 font-semibold">Provider Channel</th>
                  <th className="py-2.5 px-4 font-semibold">Timestamp</th>
                  <th className="py-2.5 px-4 text-right font-semibold">Inspect</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#131e33]">
                {filteredEvents.map((evt) => (
                  <tr
                    key={evt.id}
                    className="hover:bg-[#0c1424] transition-colors group cursor-pointer"
                    onClick={() => setInspectEvent(evt)}
                  >
                    <td className="py-3 px-4 whitespace-nowrap">
                      <EventLevelBadge level={evt.level} />
                    </td>
                    <td className="py-3 px-4 min-w-[260px]">
                      <span className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors block">
                        Event ID {evt.eventId}: {evt.eventName}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        Record ID: {evt.id} &bull; Synthetic SIEM Log
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-cyan-400">
                      {evt.sourceHost}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-300 font-mono text-[11px]">
                      {evt.provider}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-400 text-xs">
                      {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setInspectEvent(evt)}
                        className="h-7 text-xs text-slate-400 hover:text-cyan-300 group-hover:bg-[#121c32]"
                      >
                        <span>Inspect</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 border-t border-[#141f33] bg-[#070c17] flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Displaying {filteredEvents.length} of {events.length} security log entries</span>
            <span className="text-cyan-400">RAW TELEMETRY STREAM &bull; SYNTHETIC</span>
          </div>
        </CardContent>
      </Card>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={inspectEvent}
        onClose={() => setInspectEvent(null)}
      />
    </div>
  )
}
