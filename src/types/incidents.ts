export type IncidentSeverity = 'critical' | 'high' | 'medium' | 'low'

export type IncidentStatus = 'triage' | 'containment' | 'eradication' | 'resolved'

export interface InvestigationNote {
  readonly id: string
  readonly author: string
  readonly timestamp: string
  readonly text: string
}

export interface AffectedAsset {
  readonly name: string
  readonly type: 'host' | 'identity' | 'network' | 'cloud'
  readonly ip?: string
  readonly status: 'active' | 'isolated' | 'remediated'
}

export interface SecurityIncident {
  readonly id: string
  readonly title: string
  readonly severity: IncidentSeverity
  readonly status: IncidentStatus
  readonly assignedAnalyst: string
  readonly createdTimestamp: string
  readonly updatedTimestamp: string
  readonly affectedAssetsCount: number
  readonly affectedAssets: readonly AffectedAsset[]
  readonly linkedAlertIds: readonly string[]
  readonly summary: string
  readonly investigationNotes: readonly InvestigationNote[]
  readonly isSynthetic: true
}
