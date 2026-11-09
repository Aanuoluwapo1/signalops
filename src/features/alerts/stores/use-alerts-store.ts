import { create } from 'zustand'
import type { AlertSeverity, AlertStatus, SecurityAlert } from '@/types/alerts'
import { INITIAL_SYNTHETIC_ALERTS } from '../services/alerts-mock'

export type SortOption = 'timestamp_desc' | 'timestamp_asc' | 'severity_desc' | 'severity_asc'

interface AlertsState {
  readonly alerts: readonly SecurityAlert[]
  readonly searchQuery: string
  readonly severityFilter: AlertSeverity | 'all'
  readonly statusFilter: AlertStatus | 'all'
  readonly sortBy: SortOption
  readonly currentPage: number
  readonly pageSize: number

  readonly setSearchQuery: (query: string) => void
  readonly setSeverityFilter: (severity: AlertSeverity | 'all') => void
  readonly setStatusFilter: (status: AlertStatus | 'all') => void
  readonly setSortBy: (sort: SortOption) => void
  readonly setCurrentPage: (page: number) => void
  readonly updateAlertStatus: (id: string, status: AlertStatus) => void
  readonly assignAlert: (id: string, analyst: string) => void
  readonly getAlertById: (id: string) => SecurityAlert | undefined
}

const SEVERITY_WEIGHTS: Record<AlertSeverity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
  info: 0,
}

export const useAlertsStore = create<AlertsState>((set, get) => ({
  alerts: INITIAL_SYNTHETIC_ALERTS,
  searchQuery: '',
  severityFilter: 'all',
  statusFilter: 'all',
  sortBy: 'timestamp_desc',
  currentPage: 1,
  pageSize: 8,

  setSearchQuery: (query: string) => set({ searchQuery: query, currentPage: 1 }),
  setSeverityFilter: (severity) => set({ severityFilter: severity, currentPage: 1 }),
  setStatusFilter: (status) => set({ statusFilter: status, currentPage: 1 }),
  setSortBy: (sort: SortOption) => set({ sortBy: sort, currentPage: 1 }),
  setCurrentPage: (page: number) => set({ currentPage: page }),

  updateAlertStatus: (id: string, status: AlertStatus) => {
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === id ? { ...alert, status } : alert,
      ),
    }))
  },

  assignAlert: (id: string, analyst: string) => {
    set((state) => ({
      alerts: state.alerts.map((alert) =>
        alert.id === id ? { ...alert, assignedAnalyst: analyst } : alert,
      ),
    }))
  },

  getAlertById: (id: string) => {
    return get().alerts.find((alert) => alert.id.toLowerCase() === id.toLowerCase())
  },
}))

export function getFilteredAlerts(
  alerts: readonly SecurityAlert[],
  query: string,
  severity: AlertSeverity | 'all',
  status: AlertStatus | 'all',
  sortBy: SortOption,
): readonly SecurityAlert[] {
  let result = alerts.filter((alert) => {
    const q = query.trim().toLowerCase()
    if (q) {
      const matchesId = alert.id.toLowerCase().includes(q)
      const matchesTitle = alert.title.toLowerCase().includes(q)
      const matchesHost = alert.targetHost.toLowerCase().includes(q)
      const matchesSrcIp = alert.sourceIp.toLowerCase().includes(q)
      const matchesDstIp = alert.destinationIp.toLowerCase().includes(q)
      const matchesTactic = alert.mitreTactic.toLowerCase().includes(q)
      if (!matchesId && !matchesTitle && !matchesHost && !matchesSrcIp && !matchesDstIp && !matchesTactic) {
        return false
      }
    }

    if (severity !== 'all' && alert.severity !== severity) {
      return false
    }

    if (status !== 'all' && alert.status !== status) {
      return false
    }

    return true
  })

  result = [...result].sort((a, b) => {
    if (sortBy === 'timestamp_desc') {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    }
    if (sortBy === 'timestamp_asc') {
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    }
    if (sortBy === 'severity_desc') {
      return SEVERITY_WEIGHTS[b.severity] - SEVERITY_WEIGHTS[a.severity]
    }
    if (sortBy === 'severity_asc') {
      return SEVERITY_WEIGHTS[a.severity] - SEVERITY_WEIGHTS[b.severity]
    }
    return 0
  })

  return result
}
