import { KpiCard } from './kpi-card'
import type { KpiMetric } from '../types/dashboard'

interface DashboardKpiGridProps {
  readonly kpis: readonly KpiMetric[]
}

export function DashboardKpiGrid({ kpis }: DashboardKpiGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((metric) => (
        <KpiCard key={metric.id} metric={metric} />
      ))}
    </div>
  )
}
