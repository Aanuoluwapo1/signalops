import { Search, X, Filter, ArrowUpDown } from 'lucide-react'
import type { AlertSeverity, AlertStatus } from '@/types/alerts'
import type { SortOption } from '../stores/use-alerts-store'
import { Button } from '@/components/ui/button'

interface AlertFiltersProps {
  readonly searchQuery: string
  readonly severityFilter: AlertSeverity | 'all'
  readonly statusFilter: AlertStatus | 'all'
  readonly sortBy: SortOption
  readonly onSearchChange: (query: string) => void
  readonly onSeverityChange: (severity: AlertSeverity | 'all') => void
  readonly onStatusChange: (status: AlertStatus | 'all') => void
  readonly onSortChange: (sort: SortOption) => void
  readonly onResetFilters: () => void
  readonly totalMatches: number
}

export function AlertFilters({
  searchQuery,
  severityFilter,
  statusFilter,
  sortBy,
  onSearchChange,
  onSeverityChange,
  onStatusChange,
  onSortChange,
  onResetFilters,
  totalMatches,
}: AlertFiltersProps) {
  const isFiltered = searchQuery !== '' || severityFilter !== 'all' || statusFilter !== 'all'

  return (
    <div className="p-4 rounded-lg bg-[#080d1a] border border-[#16233b] space-y-3">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search alerts by title, IP address, target host, or MITRE tactic..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-8 pl-9 pr-8 text-xs rounded-md bg-[#0c1424] border border-[#1e2e4f] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/80 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Severity Filter */}
          <div className="flex items-center gap-1.5 bg-[#0c1424] border border-[#1e2e4f] rounded-md px-2.5 py-1">
            <Filter className="h-3 w-3 text-cyan-400 shrink-0" />
            <span className="text-[11px] font-mono text-slate-400">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => onSeverityChange(e.target.value as AlertSeverity | 'all')}
              className="bg-transparent text-xs text-slate-200 focus:outline-none font-medium cursor-pointer"
            >
              <option value="all" className="bg-[#0c1424] text-slate-200">All Severities</option>
              <option value="critical" className="bg-[#0c1424] text-red-400">Critical</option>
              <option value="high" className="bg-[#0c1424] text-orange-400">High</option>
              <option value="medium" className="bg-[#0c1424] text-amber-400">Medium</option>
              <option value="low" className="bg-[#0c1424] text-blue-400">Low</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-[#0c1424] border border-[#1e2e4f] rounded-md px-2.5 py-1">
            <span className="text-[11px] font-mono text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value as AlertStatus | 'all')}
              className="bg-transparent text-xs text-slate-200 focus:outline-none font-medium cursor-pointer"
            >
              <option value="all" className="bg-[#0c1424] text-slate-200">All Statuses</option>
              <option value="open" className="bg-[#0c1424] text-cyan-400">Open</option>
              <option value="investigating" className="bg-[#0c1424] text-amber-400">Investigating</option>
              <option value="resolved" className="bg-[#0c1424] text-emerald-400">Resolved</option>
              <option value="false_positive" className="bg-[#0c1424] text-slate-400">False Positive</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-1.5 bg-[#0c1424] border border-[#1e2e4f] rounded-md px-2.5 py-1">
            <ArrowUpDown className="h-3 w-3 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none font-mono cursor-pointer"
            >
              <option value="timestamp_desc" className="bg-[#0c1424] text-slate-200">Newest First</option>
              <option value="timestamp_asc" className="bg-[#0c1424] text-slate-200">Oldest First</option>
              <option value="severity_desc" className="bg-[#0c1424] text-slate-200">Highest Severity</option>
              <option value="severity_asc" className="bg-[#0c1424] text-slate-200">Lowest Severity</option>
            </select>
          </div>

          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="h-7 text-xs text-slate-400 hover:text-white"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-1 border-t border-[#121c30]">
        <span>Showing {totalMatches} simulated alert records</span>
        <span className="text-cyan-400/80">QUEUE SYNCHRONIZED</span>
      </div>
    </div>
  )
}
