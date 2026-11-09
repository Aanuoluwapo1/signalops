import type {
  TacticFrequency,
  PerformanceTrendPoint,
  VulnerabilitySeveritySpread,
  AnalyticsSummary,
} from '@/types/analytics'

export const SYNTHETIC_TACTIC_FREQUENCIES: readonly TacticFrequency[] = [
  { tactic: 'Credential Access', shortCode: 'TA0006', count: 24, criticalCount: 14 },
  { tactic: 'Defense Evasion', shortCode: 'TA0005', count: 18, criticalCount: 8 },
  { tactic: 'Execution', shortCode: 'TA0002', count: 15, criticalCount: 4 },
  { tactic: 'Command & Control', shortCode: 'TA0011', count: 14, criticalCount: 6 },
  { tactic: 'Impact', shortCode: 'TA0040', count: 11, criticalCount: 10 },
  { tactic: 'Initial Access', shortCode: 'TA0001', count: 9, criticalCount: 3 },
  { tactic: 'Lateral Movement', shortCode: 'TA0008', count: 8, criticalCount: 4 },
  { tactic: 'Persistence', shortCode: 'TA0003', count: 7, criticalCount: 2 },
  { tactic: 'Discovery', shortCode: 'TA0007', count: 6, criticalCount: 0 },
]

export const SYNTHETIC_PERFORMANCE_TREND: readonly PerformanceTrendPoint[] = [
  { period: 'Mon (D-6)', mttaMinutes: 6.8, mttrMinutes: 24.5, targetSla: 15.0 },
  { period: 'Tue (D-5)', mttaMinutes: 6.2, mttrMinutes: 22.0, targetSla: 15.0 },
  { period: 'Wed (D-4)', mttaMinutes: 5.5, mttrMinutes: 19.8, targetSla: 15.0 },
  { period: 'Thu (D-3)', mttaMinutes: 4.9, mttrMinutes: 18.2, targetSla: 15.0 },
  { period: 'Fri (D-2)', mttaMinutes: 4.5, mttrMinutes: 17.1, targetSla: 15.0 },
  { period: 'Sat (D-1)', mttaMinutes: 4.3, mttrMinutes: 16.8, targetSla: 15.0 },
  { period: 'Sun (Today)', mttaMinutes: 4.2, mttrMinutes: 16.4, targetSla: 15.0 },
]

export const SYNTHETIC_VULNERABILITY_SPREAD: readonly VulnerabilitySeveritySpread[] = [
  { severity: 'critical', count: 8, percentage: 8.2, color: '#ef4444' },
  { severity: 'high', count: 22, percentage: 22.7, color: '#f97316' },
  { severity: 'medium', count: 45, percentage: 46.4, color: '#f59e0b' },
  { severity: 'low', count: 22, percentage: 22.7, color: '#3b82f6' },
]

export const SYNTHETIC_ANALYTICS_SUMMARY: AnalyticsSummary = {
  mttaMinutes: 4.2,
  mttrMinutes: 16.4,
  activeTechniquesCount: 18,
  totalDetectionsCount: 112,
  isSynthetic: true,
}
