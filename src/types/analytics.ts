export interface TacticFrequency {
  readonly tactic: string
  readonly shortCode: string
  readonly count: number
  readonly criticalCount: number
}

export interface PerformanceTrendPoint {
  readonly period: string
  readonly mttaMinutes: number
  readonly mttrMinutes: number
  readonly targetSla: number
}

export interface VulnerabilitySeveritySpread {
  readonly severity: 'critical' | 'high' | 'medium' | 'low'
  readonly count: number
  readonly percentage: number
  readonly color: string
}

export interface AnalyticsSummary {
  readonly mttaMinutes: number
  readonly mttrMinutes: number
  readonly activeTechniquesCount: number
  readonly totalDetectionsCount: number
  readonly isSynthetic: true
}
