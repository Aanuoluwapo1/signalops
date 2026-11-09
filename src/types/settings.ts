import type { AlertSeverity } from './alerts'

export type EpsRate = 50 | 250 | 1000

export interface DetectionRule {
  readonly id: string
  readonly name: string
  readonly category: string
  readonly mitreTechnique: string
  readonly severity: AlertSeverity
  readonly enabled: boolean
  readonly querySignature: string
  readonly suppressionCount: number
}

export interface SimulationHarnessConfig {
  readonly epsRate: EpsRate
  readonly isReplayRunning: boolean
  readonly lastInjectedScenario: string | null
  readonly lastInjectedTimestamp: string | null
}

export interface WebhookConnector {
  readonly id: string
  readonly name: string
  readonly service: 'slack' | 'teams' | 'pagerduty' | 'splunk'
  readonly targetUrl: string
  readonly enabled: boolean
  readonly lastPingStatus: 'healthy' | 'untested' | 'failed'
  readonly lastPingTimestamp: string | null
}

export interface AnalystProfile {
  readonly name: string
  readonly role: string
  readonly tier: string
  readonly email: string
  readonly shift: string
  readonly apiKey: string
  readonly apiKeyLastRotated: string
}
