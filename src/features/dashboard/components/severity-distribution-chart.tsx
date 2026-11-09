import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { PieChart as PieIcon } from 'lucide-react'
import type { SeverityCount } from '../types/dashboard'

interface SeverityDistributionChartProps {
  readonly data: readonly SeverityCount[]
}

interface CustomPieTooltipProps {
  readonly active?: boolean
  readonly payload?: readonly {
    readonly payload: SeverityCount
  }[]
}

function CustomPieTooltip({ active, payload }: CustomPieTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const entry = payload[0].payload

  return (
    <div className="rounded-md border border-[#1e2e4d] bg-[#070d18] px-3 py-2 shadow-xl text-xs font-mono">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
        <span className="font-semibold text-white">{entry.name} Severity:</span>
        <span className="text-cyan-400 font-bold">{entry.count}</span>
        <span className="text-slate-400">({entry.percentage}%)</span>
      </div>
    </div>
  )
}

export function SeverityDistributionChart({ data }: SeverityDistributionChartProps) {
  const totalAlerts = data.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <Card className="bg-[#080d1a] border-[#16233b] flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <PieIcon className="h-4 w-4 text-cyan-400" />
          <CardTitle className="text-sm font-semibold text-slate-100">
            Severity Distribution
          </CardTitle>
        </div>
        <CardDescription className="text-xs text-slate-400">
          Normalized alert density across active SOC severity classifications.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between pt-0">
        {/* Donut Chart */}
        <div className="h-44 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomPieTooltip />} />
              <Pie
                data={[...data]}
                dataKey="count"
                nameKey="name"
                innerRadius={48}
                outerRadius={68}
                paddingAngle={3}
                stroke="#080d1a"
                strokeWidth={2}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold font-mono text-white leading-tight">
              {totalAlerts}
            </span>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              TOTAL ALERTS
            </span>
          </div>
        </div>

        {/* Legend Breakdown Grid */}
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-mono">
          {data.map((item) => (
            <div
              key={item.name}
              className="p-2 rounded bg-[#0b1222] border border-[#141f35] flex items-center justify-between"
            >
              <div className="flex items-center gap-1.5 truncate">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-1">
                <span className="font-semibold text-white">{item.count}</span>
                <span className="text-[10px] text-slate-500">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
