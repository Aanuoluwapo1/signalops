import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SeverityBadge } from '@/components/shared/severity-badge'
import { AlertStatusBadge } from '../components/alert-status-badge'
import { AlertFilters } from '../components/alert-filters'
import { useAlertsStore, getFilteredAlerts } from '../stores/use-alerts-store'
import { ArrowRight, ChevronLeft, ChevronRight, ShieldAlert } from 'lucide-react'

export function AlertsPage() {
  const {
    alerts,
    searchQuery,
    severityFilter,
    statusFilter,
    sortBy,
    currentPage,
    pageSize,
    setSearchQuery,
    setSeverityFilter,
    setStatusFilter,
    setSortBy,
    setCurrentPage,
  } = useAlertsStore()

  const filteredAlerts = getFilteredAlerts(
    alerts,
    searchQuery,
    severityFilter,
    statusFilter,
    sortBy,
  )

  const totalPages = Math.max(1, Math.ceil(filteredAlerts.length / pageSize))
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )

  const openCount = alerts.filter((a) => a.status === 'open').length
  const investigatingCount = alerts.filter((a) => a.status === 'investigating').length
  const criticalCount = alerts.filter((a) => a.severity === 'critical').length

  const handleResetFilters = () => {
    setSearchQuery('')
    setSeverityFilter('all')
    setStatusFilter('all')
    setSortBy('timestamp_desc')
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Alerts Triage Queue"
        description="Comprehensive synthetic security detection stream with multi-vector forensic indicators."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2.5 py-1 rounded">
              TOTAL ALERTS: {alerts.length}
            </span>
          </div>
        }
      />

      {/* Summary metric counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg bg-[#080d1a] border border-[#16233b]">
          <span className="text-[10px] uppercase font-mono text-slate-500 block">Open for Triage</span>
          <span className="text-xl font-bold font-mono text-cyan-400">{openCount}</span>
        </div>
        <div className="p-3 rounded-lg bg-[#080d1a] border border-[#16233b]">
          <span className="text-[10px] uppercase font-mono text-slate-500 block">Under Investigation</span>
          <span className="text-xl font-bold font-mono text-amber-400">{investigatingCount}</span>
        </div>
        <div className="p-3 rounded-lg bg-[#080d1a] border border-[#16233b]">
          <span className="text-[10px] uppercase font-mono text-slate-500 block">Critical Threats</span>
          <span className="text-xl font-bold font-mono text-red-400">{criticalCount}</span>
        </div>
        <div className="p-3 rounded-lg bg-[#080d1a] border border-[#16233b]">
          <span className="text-[10px] uppercase font-mono text-slate-500 block">Queue Health</span>
          <span className="text-xl font-bold font-mono text-emerald-400">100% SLA</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <AlertFilters
        searchQuery={searchQuery}
        severityFilter={severityFilter}
        statusFilter={statusFilter}
        sortBy={sortBy}
        onSearchChange={setSearchQuery}
        onSeverityChange={setSeverityFilter}
        onStatusChange={setStatusFilter}
        onSortChange={setSortBy}
        onResetFilters={handleResetFilters}
        totalMatches={filteredAlerts.length}
      />

      {/* Data-Dense Triage Table */}
      <Card className="bg-[#080d1a] border-[#16233b] overflow-hidden">
        <CardContent className="p-0">
          {paginatedAlerts.length === 0 ? (
            <div className="p-12 text-center text-slate-400 space-y-3">
              <ShieldAlert className="h-8 w-8 text-slate-500 mx-auto" />
              <p className="text-sm font-medium text-slate-200">No matching alerts found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No simulated alerts match your search and filter criteria. Try resetting your query or clearing filters.
              </p>
              <Button variant="secondary" size="sm" onClick={handleResetFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#152035] bg-[#060a14] text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-4 font-semibold">Severity</th>
                    <th className="py-2.5 px-4 font-semibold">Status</th>
                    <th className="py-2.5 px-4 font-semibold">Alert ID & Name</th>
                    <th className="py-2.5 px-4 font-semibold">Target Host & IPs</th>
                    <th className="py-2.5 px-4 font-semibold">MITRE ATT&CK</th>
                    <th className="py-2.5 px-4 font-semibold">Timestamp</th>
                    <th className="py-2.5 px-4 font-semibold">Assignee</th>
                    <th className="py-2.5 px-4 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#131e33]">
                  {paginatedAlerts.map((alert) => (
                    <tr
                      key={alert.id}
                      className="hover:bg-[#0c1424] transition-colors group"
                    >
                      <td className="py-3 px-4 whitespace-nowrap">
                        <SeverityBadge severity={alert.severity} />
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <AlertStatusBadge status={alert.status} />
                      </td>
                      <td className="py-3 px-4 min-w-[240px]">
                        <Link
                          to={`/alerts/${alert.id}`}
                          className="font-medium text-slate-200 hover:text-cyan-400 transition-colors block"
                        >
                          {alert.title}
                        </Link>
                        <span className="text-[11px] font-mono text-slate-500">
                          {alert.id} &bull; {alert.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap font-mono text-xs text-slate-300">
                        <div className="font-semibold text-slate-200">{alert.targetHost}</div>
                        <div className="text-[11px] text-slate-500">
                          {alert.sourceIp} &rarr; {alert.destinationIp}
                        </div>
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
                        {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-xs font-mono">
                        {alert.assignedAnalyst ? (
                          <span className="text-cyan-300">{alert.assignedAnalyst}</span>
                        ) : (
                          <span className="text-slate-600">Unassigned</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <Link to={`/alerts/${alert.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs text-slate-400 hover:text-cyan-300 group-hover:bg-[#121c32]"
                          >
                            <span>Investigate</span>
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-3 border-t border-[#141f33] bg-[#070c17] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">
                Page <span className="text-white font-semibold">{currentPage}</span> of{' '}
                <span className="text-white font-semibold">{totalPages}</span>
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-7 px-2 text-xs"
                >
                  <ChevronLeft className="h-3.5 w-3.5 mr-1" />
                  <span>Previous</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="h-7 px-2 text-xs"
                >
                  <span>Next</span>
                  <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
