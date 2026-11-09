import { create } from 'zustand'
import type { EndpointRecord, AgentStatus } from '@/types/endpoints'
import { INITIAL_SYNTHETIC_ENDPOINTS } from '../services/endpoints-mock'

interface EndpointsState {
  readonly endpoints: readonly EndpointRecord[]
  readonly searchQuery: string
  readonly statusFilter: AgentStatus | 'all'
  readonly osFilter: string | 'all'
  readonly selectedEndpointId: string | null

  readonly setSearchQuery: (query: string) => void
  readonly setStatusFilter: (status: AgentStatus | 'all') => void
  readonly setOsFilter: (os: string | 'all') => void
  readonly setSelectedEndpointId: (id: string | null) => void
  readonly toggleEndpointIsolation: (id: string) => void
  readonly getEndpointById: (id: string) => EndpointRecord | undefined
}

export const useEndpointsStore = create<EndpointsState>((set, get) => ({
  endpoints: INITIAL_SYNTHETIC_ENDPOINTS,
  searchQuery: '',
  statusFilter: 'all',
  osFilter: 'all',
  selectedEndpointId: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setOsFilter: (os) => set({ osFilter: os }),
  setSelectedEndpointId: (id) => set({ selectedEndpointId: id }),

  toggleEndpointIsolation: (id) => {
    set((state) => ({
      endpoints: state.endpoints.map((ep) => {
        if (ep.id !== id) return ep
        const newStatus: AgentStatus = ep.agentStatus === 'isolated' ? 'active' : 'isolated'
        return {
          ...ep,
          agentStatus: newStatus,
        }
      }),
    }))
  },

  getEndpointById: (id) => {
    return get().endpoints.find((ep) => ep.id.toLowerCase() === id.toLowerCase())
  },
}))

export function getFilteredEndpoints(
  endpoints: readonly EndpointRecord[],
  query: string,
  status: AgentStatus | 'all',
  os: string | 'all',
): readonly EndpointRecord[] {
  return endpoints.filter((ep) => {
    const q = query.trim().toLowerCase()
    if (q) {
      const matchesHost = ep.hostname.toLowerCase().includes(q)
      const matchesIp = ep.ipAddress.toLowerCase().includes(q)
      const matchesVlan = ep.vlan.toLowerCase().includes(q)
      const matchesOs = ep.operatingSystem.toLowerCase().includes(q)
      if (!matchesHost && !matchesIp && !matchesVlan && !matchesOs) {
        return false
      }
    }

    if (status !== 'all' && ep.agentStatus !== status) {
      return false
    }

    if (os !== 'all') {
      if (!ep.operatingSystem.toLowerCase().includes(os.toLowerCase())) {
        return false
      }
    }

    return true
  })
}
