import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Activity } from 'lucide-react'
import type { VolumeTrendPoint } from '../types/dashboard'

interface AlertVolumeChartProps {
  readonly data: readonly VolumeTrendPoint[]
}

interface CustomTooltipProps {
  readonly active?: boolean
  readonly payload?: readonly {
    readonly value: number
    readonly name: string
    readonly color: string
  }[]
  readonly label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }

  const total = payload.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="rounded-lg border border-[#1e2e4d] bg-[#070d18] p-3 shadow-xl text-xs font-mono">
      <div className="flex items-center justify-between pb-1 mb-2 border-b border-[#141f33] text-slate-400">
        <span>Time: {label} UTC</span>
        <span className="text-cyan-400 font-semibold">Total: {total}</span>
      </div>
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="capitalize">{entry.name}:</span>
            </span>
            <span className="font-semibold text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AlertVolumeChart({ data }: AlertVolumeChartProps) {
  return (
    <Card className="bg-[#080d1a] border-[#16233b]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            <CardTitle className="text-sm font-semibold text-slate-100">
              24-Hour Ingestion & Alert Volume
            </CardTitle>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Critical
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              High
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Medium
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Low
            </span>
          </div>
        </div>
        <CardDescription className="text-xs text-slate-400">
          Simulated hourly telemetry ingest rates and anomaly distribution across all sensors.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[...data]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="criticalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="mediumGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="lowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#141f33" vertical={false} />
              <XAxis
                dataKey="time"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#152238' }}
              />
              <YAxis
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#152238' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="critical"
                stackId="1"
                stroke="#ef4444"
                fill="url(#criticalGrad)"
                strokeWidth={1.5}
              />
              <Area
                type="monotone"
                dataKey="high"
                stackId="1"
                stroke="#f97316"
                fill="url(#highGrad)"
                strokeWidth={1.5}
              />
              <Area
                type="monotone"
                dataKey="medium"
                stackId="1"
                stroke="#f59e0b"
                fill="url(#mediumGrad)"
                strokeWidth={1.5}
              />
              <Area
                type="monotone"
                dataKey="low"
                stackId="1"
                stroke="#3b82f6"
                fill="url(#lowGrad)"
                strokeWidth={1.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
