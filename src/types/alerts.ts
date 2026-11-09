export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info'

export type AlertStatus = 'open' | 'investigating' | 'resolved' | 'false_positive'

export interface SimulatedMetadata {
  readonly isSynthetic: true
  readonly simulationEnvironment: string
  readonly generatedTimestamp: string
}

export interface SecurityAlert {
  readonly id: string
  readonly title: string
  readonly severity: AlertSeverity
  readonly status: AlertStatus
  readonly timestamp: string
  readonly category: string
  readonly sourceIp: string
  readonly destinationIp: string
  readonly targetHost: string
  readonly mitreTechnique: string
  readonly mitreTactic: string
  readonly rawLog: string
  readonly isSynthetic: true
  readonly description?: string
  readonly assignedAnalyst?: string
}
