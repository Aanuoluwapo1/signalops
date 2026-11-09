export type AgentStatus = 'active' | 'disconnected' | 'isolated'

export interface VulnerabilitySummary {
  readonly critical: number
  readonly high: number
  readonly medium: number
}

export interface EndpointRecord {
  readonly id: string
  readonly hostname: string
  readonly ipAddress: string
  readonly operatingSystem: string
  readonly agentStatus: AgentStatus
  readonly lastHeartbeat: string
  readonly vlan: string
  readonly activeAlertsCount: number
  readonly vulnerabilitySummary: VulnerabilitySummary
  readonly isSynthetic: true
}
