import { create } from 'zustand'
import type { SecurityIncident, IncidentSeverity, IncidentStatus, InvestigationNote } from '@/types/incidents'
import { INITIAL_SYNTHETIC_INCIDENTS } from '../services/incidents-mock'

interface IncidentsState {
  readonly incidents: readonly SecurityIncident[]
  readonly searchQuery: string
  readonly severityFilter: IncidentSeverity | 'all'
  readonly statusFilter: IncidentStatus | 'all'

  readonly setSearchQuery: (query: string) => void
  readonly setSeverityFilter: (severity: IncidentSeverity | 'all') => void
  readonly setStatusFilter: (status: IncidentStatus | 'all') => void

  readonly updateIncidentStatus: (id: string, status: IncidentStatus) => void
  readonly addInvestigationNote: (incidentId: string, text: string, author?: string) => void
  readonly toggleAssetStatus: (incidentId: string, assetName: string) => void
  readonly createIncident: (
    data: {
      readonly title: string
      readonly severity: IncidentSeverity
      readonly summary: string
      readonly assignedAnalyst: string
      readonly affectedAssetsNames: readonly string[]
      readonly linkedAlertIds: readonly string[]
    },
  ) => string
  readonly getIncidentById: (id: string) => SecurityIncident | undefined
}

export const useIncidentsStore = create<IncidentsState>((set, get) => ({
  incidents: INITIAL_SYNTHETIC_INCIDENTS,
  searchQuery: '',
  severityFilter: 'all',
  statusFilter: 'all',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSeverityFilter: (severity) => set({ severityFilter: severity }),
  setStatusFilter: (status) => set({ statusFilter: status }),

  updateIncidentStatus: (id, status) => {
    set((state) => ({
      incidents: state.incidents.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              status,
              updatedTimestamp: new Date().toISOString(),
            }
          : inc,
      ),
    }))
  },

  addInvestigationNote: (incidentId, text, author = 'Analyst Reynolds') => {
    const newNote: InvestigationNote = {
      id: `note-${Date.now()}`,
      author,
      timestamp: new Date().toISOString(),
      text,
    }

    set((state) => ({
      incidents: state.incidents.map((inc) =>
        inc.id === incidentId
          ? {
              ...inc,
              investigationNotes: [newNote, ...inc.investigationNotes],
              updatedTimestamp: new Date().toISOString(),
            }
          : inc,
      ),
    }))
  },

  toggleAssetStatus: (incidentId, assetName) => {
    set((state) => ({
      incidents: state.incidents.map((inc) => {
        if (inc.id !== incidentId) return inc
        return {
          ...inc,
          affectedAssets: inc.affectedAssets.map((asset) => {
            if (asset.name !== assetName) return asset
            return {
              ...asset,
              status: asset.status === 'isolated' ? 'active' : 'isolated',
            }
          }),
          updatedTimestamp: new Date().toISOString(),
        }
      }),
    }))
  },

  createIncident: (data) => {
    const nextIndex = get().incidents.length + 401
    const newId = `INC-${nextIndex}`
    const now = new Date().toISOString()

    const newIncident: SecurityIncident = {
      id: newId,
      title: data.title,
      severity: data.severity,
      status: 'triage',
      assignedAnalyst: data.assignedAnalyst || 'Analyst Reynolds',
      createdTimestamp: now,
      updatedTimestamp: now,
      affectedAssetsCount: data.affectedAssetsNames.length || 1,
      affectedAssets: data.affectedAssetsNames.map((name) => ({
        name,
        type: name.includes('@') ? 'identity' : 'host',
        status: 'active',
      })),
      linkedAlertIds: data.linkedAlertIds,
      summary: data.summary,
      investigationNotes: [
        {
          id: `note-${Date.now()}`,
          author: data.assignedAnalyst || 'Analyst Reynolds',
          timestamp: now,
          text: `Incident ${newId} initialized in simulation queue.`,
        },
      ],
      isSynthetic: true,
    }

    set((state) => ({
      incidents: [newIncident, ...state.incidents],
    }))

    return newId
  },

  getIncidentById: (id) => {
    return get().incidents.find((inc) => inc.id.toLowerCase() === id.toLowerCase())
  },
}))

export function getFilteredIncidents(
  incidents: readonly SecurityIncident[],
  query: string,
  severity: IncidentSeverity | 'all',
  status: IncidentStatus | 'all',
): readonly SecurityIncident[] {
  return incidents.filter((inc) => {
    const q = query.trim().toLowerCase()
    if (q) {
      const matchesId = inc.id.toLowerCase().includes(q)
      const matchesTitle = inc.title.toLowerCase().includes(q)
      const matchesAnalyst = inc.assignedAnalyst.toLowerCase().includes(q)
      const matchesAsset = inc.affectedAssets.some((a) => a.name.toLowerCase().includes(q))
      if (!matchesId && !matchesTitle && !matchesAnalyst && !matchesAsset) {
        return false
      }
    }

    if (severity !== 'all' && inc.severity !== severity) {
      return false
    }

    if (status !== 'all' && inc.status !== status) {
      return false
    }

    return true
  })
}
