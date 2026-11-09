export type EventLevel = 'information' | 'warning' | 'error' | 'critical'

export interface SecurityEventRecord {
  readonly id: string
  readonly eventId: string | number
  readonly timestamp: string
  readonly sourceHost: string
  readonly provider: string
  readonly level: EventLevel
  readonly eventName: string
  readonly rawFields: Record<string, string | number | boolean>
  readonly isSynthetic: true
}
