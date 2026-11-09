import type { AlertSeverity } from '@/types/alerts'

export interface KpiMetric {
  readonly id: string
  readonly title: string
  readonly value: string
  readonly delta: string
  readonly isPositiveTrend: boolean
  readonly subtitle: string
  readonly icon: 'threats' | 'health' | 'incidents' | 'mtta'
}

export interface VolumeTrendPoint {
  readonly time: string
  readonly critical: number
  readonly high: number
  readonly medium: number
  readonly low: number
  readonly total: number
}

export interface SeverityCount {
  readonly name: string
  readonly severity: AlertSeverity
  readonly count: number
  readonly percentage: number
  readonly color: string
}

export interface SimulatedAlertSummary {
  readonly id: string
  readonly title: string
  readonly severity: AlertSeverity
  readonly targetHost: string
  readonly targetIp: string
  readonly mitreTactic: string
  readonly mitreTechnique: string
  readonly timestamp: string
  readonly isSynthetic: true
}

export interface DashboardTelemetry {
  readonly isSynthetic: true
  readonly environment: string
  readonly generatedAt: string
  readonly kpis: readonly KpiMetric[]
  readonly volumeTrend: readonly VolumeTrendPoint[]
  readonly severityBreakdown: readonly SeverityCount[]
  readonly recentAlerts: readonly SimulatedAlertSummary[]
}
