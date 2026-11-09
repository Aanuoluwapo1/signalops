import { create } from 'zustand'
import type { SecurityEventRecord, EventLevel } from '@/types/events'
import { INITIAL_SYNTHETIC_EVENTS } from '../services/events-mock'

export type EventTimeRange = '15m' | '1h' | '6h' | '24h' | 'all'

interface EventsState {
  readonly events: readonly SecurityEventRecord[]
  readonly searchQuery: string
  readonly levelFilter: EventLevel | 'all'
  readonly providerFilter: string | 'all'
  readonly timeRange: EventTimeRange
  readonly selectedEventId: string | null

  readonly setSearchQuery: (query: string) => void
  readonly setLevelFilter: (level: EventLevel | 'all') => void
  readonly setProviderFilter: (provider: string | 'all') => void
  readonly setTimeRange: (range: EventTimeRange) => void
  readonly setSelectedEventId: (id: string | null) => void
  readonly getEventById: (id: string) => SecurityEventRecord | undefined
}

export const useEventsStore = create<EventsState>((set, get) => ({
  events: INITIAL_SYNTHETIC_EVENTS,
  searchQuery: '',
  levelFilter: 'all',
  providerFilter: 'all',
  timeRange: '24h',
  selectedEventId: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setLevelFilter: (level) => set({ levelFilter: level }),
  setProviderFilter: (provider) => set({ providerFilter: provider }),
  setTimeRange: (range) => set({ timeRange: range }),
  setSelectedEventId: (id) => set({ selectedEventId: id }),

  getEventById: (id) => {
    return get().events.find((evt) => evt.id.toLowerCase() === id.toLowerCase())
  },
}))

export function getFilteredEvents(
  events: readonly SecurityEventRecord[],
  query: string,
  level: EventLevel | 'all',
  provider: string | 'all',
): readonly SecurityEventRecord[] {
  return events.filter((evt) => {
    const q = query.trim().toLowerCase()
    if (q) {
      const matchesEventId = String(evt.eventId).includes(q)
      const matchesHost = evt.sourceHost.toLowerCase().includes(q)
      const matchesName = evt.eventName.toLowerCase().includes(q)
      const matchesProvider = evt.provider.toLowerCase().includes(q)
      const matchesId = evt.id.toLowerCase().includes(q)
      if (!matchesEventId && !matchesHost && !matchesName && !matchesProvider && !matchesId) {
        return false
      }
    }

    if (level !== 'all' && evt.level !== level) {
      return false
    }

    if (provider !== 'all' && !evt.provider.toLowerCase().includes(provider.toLowerCase())) {
      return false
    }

    return true
  })
}
