import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { EndpointStatusBadge } from '../components/endpoint-status-badge'
import { EndpointDetailModal } from '../components/endpoint-detail-modal'
import { useEndpointsStore, getFilteredEndpoints } from '../stores/use-endpoints-store'
import type { AgentStatus, EndpointRecord } from '@/types/endpoints'
import {
  Laptop,
  Search,
  Filter,
  Wifi,
  WifiOff,
  AlertTriangle,
  ArrowRight,
  Shield,
  Layers,
  Bug,
} from 'lucide-react'

export function EndpointsPage() {
  const {
    endpoints,
    searchQuery,
    statusFilter,
    osFilter,
    setSearchQuery,
    setStatusFilter,
    setOsFilter,
  } = useEndpointsStore()

  const [inspectEndpoint, setInspectEndpoint] = useState<EndpointRecord | null>(null)

  const filteredEndpoints = getFilteredEndpoints(
    endpoints,
    searchQuery,
    statusFilter,
    osFilter,
  )

  const activeCount = endpoints.filter((e) => e.agentStatus === 'active').length
  const isolatedCount = endpoints.filter((e) => e.agentStatus === 'isolated').length
  const disconnectedCount = endpoints.filter((e) => e.agentStatus === 'disconnected').length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Endpoint Fleet Inventory"
        description="EDR agent telemetry, host isolation states, sensor heartbeats, and vulnerability profiles."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2.5 py-1 rounded">
              TOTAL ASSETS: {endpoints.length}
            </span>
          </div>
        }
      />

      {/* Fleet Health KPI Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Total Fleet</span>
            <span className="text-2xl font-bold font-mono text-white mt-0.5 block">{endpoints.length}</span>
          </div>
          <div className="p-2 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
            <Laptop className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Active Sensors</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-0.5 block">{activeCount}</span>
          </div>
          <div className="p-2 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
            <Wifi className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Quarantined Hosts</span>
            <span className="text-2xl font-bold font-mono text-red-400 mt-0.5 block">{isolatedCount}</span>
          </div>
          <div className="p-2 rounded bg-red-950/60 border border-red-800/60 text-red-400">
            <WifiOff className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Sensor Offline</span>
            <span className="text-2xl font-bold font-mono text-slate-400 mt-0.5 block">{disconnectedCount}</span>
          </div>
          <div className="p-2 rounded bg-slate-900 border border-slate-700 text-slate-400">
            <AlertTriangle className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-lg bg-[#080d1a] border border-[#16233b] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search endpoints by hostname, IP address, OS, or VLAN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 pl-9 pr-3 text-xs rounded-md bg-[#0c1424] border border-[#1e2e4f] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Agent Status Filter */}
          <div className="flex items-center gap-1.5 bg-[#0c1424] border border-[#1e2e4f] rounded-md px-2.5 py-1">
            <Filter className="h-3 w-3 text-cyan-400 shrink-0" />
            <span className="text-[11px] font-mono text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as AgentStatus | 'all')}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#0c1424]">All Statuses</option>
              <option value="active" className="bg-[#0c1424] text-emerald-400">Active</option>
              <option value="isolated" className="bg-[#0c1424] text-red-400">Isolated</option>
              <option value="disconnected" className="bg-[#0c1424] text-slate-400">Disconnected</option>
            </select>
          </div>

          {/* OS Filter */}
          <div className="flex items-center gap-1.5 bg-[#0c1424] border border-[#1e2e4f] rounded-md px-2.5 py-1">
            <Layers className="h-3 w-3 text-slate-400 shrink-0" />
            <span className="text-[11px] font-mono text-slate-400">OS:</span>
            <select
              value={osFilter}
              onChange={(e) => setOsFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#0c1424]">All Platforms</option>
              <option value="Windows Server" className="bg-[#0c1424]">Windows Server</option>
              <option value="Windows 11" className="bg-[#0c1424]">Windows 11</option>
              <option value="Ubuntu" className="bg-[#0c1424]">Ubuntu Linux</option>
              <option value="macOS" className="bg-[#0c1424]">macOS</option>
            </select>
          </div>

          {(searchQuery || statusFilter !== 'all' || osFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('all')
                setOsFilter('all')
              }}
              className="h-7 text-xs text-slate-400 hover:text-white"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Endpoint Table */}
      <Card className="bg-[#080d1a] border-[#16233b] overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#152035] bg-[#060a14] text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-4 font-semibold">EDR State</th>
                  <th className="py-2.5 px-4 font-semibold">Hostname & Asset ID</th>
                  <th className="py-2.5 px-4 font-semibold">IP Address</th>
                  <th className="py-2.5 px-4 font-semibold">Operating System</th>
                  <th className="py-2.5 px-4 font-semibold">VLAN Network</th>
                  <th className="py-2.5 px-4 font-semibold">Threats</th>
                  <th className="py-2.5 px-4 font-semibold">CVEs</th>
                  <th className="py-2.5 px-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#131e33]">
                {filteredEndpoints.map((ep) => (
                  <tr
                    key={ep.id}
                    className="hover:bg-[#0c1424] transition-colors group cursor-pointer"
                    onClick={() => setInspectEndpoint(ep)}
                  >
                    <td className="py-3 px-4 whitespace-nowrap">
                      <EndpointStatusBadge status={ep.agentStatus} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors block">
                        {ep.hostname}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {ep.id} &bull; Sensor Active
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-cyan-400">
                      {ep.ipAddress}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-300">
                      {ep.operatingSystem}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                      {ep.vlan}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-xs">
                      {ep.activeAlertsCount > 0 ? (
                        <span className="px-1.5 py-0.5 rounded bg-red-950/80 border border-red-800 text-red-400 font-bold">
                          {ep.activeAlertsCount} Active
                        </span>
                      ) : (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          <span>0</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-mono text-[11px]">
                      <span className="flex items-center gap-1.5">
                        <Bug className="h-3 w-3 text-amber-400" />
                        <span className="text-red-400">{ep.vulnerabilitySummary.critical}C</span>
                        <span className="text-amber-400">{ep.vulnerabilitySummary.high}H</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setInspectEndpoint(ep)}
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
            <span>Showing {filteredEndpoints.length} of {endpoints.length} fleet endpoints</span>
            <span className="text-cyan-400">SIMULATED ENDPOINT TELEMETRY</span>
          </div>
        </CardContent>
      </Card>

      {/* Endpoint Detail Modal */}
      <EndpointDetailModal
        endpoint={inspectEndpoint}
        onClose={() => setInspectEndpoint(null)}
      />
    </div>
  )
}
