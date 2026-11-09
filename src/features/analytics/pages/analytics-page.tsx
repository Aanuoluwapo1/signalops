import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  SYNTHETIC_TACTIC_FREQUENCIES,
  SYNTHETIC_PERFORMANCE_TREND,
  SYNTHETIC_VULNERABILITY_SPREAD,
  SYNTHETIC_ANALYTICS_SUMMARY,
} from '../services/analytics-mock'
import {
  BarChart3,
  TrendingDown,
  Layers,
  Bug,
  Clock,
  Shield,
  Activity,
  Calendar,
} from 'lucide-react'

type AnalyticsDateRange = '24h' | '7d' | '30d' | '90d'

interface CustomBarTooltipProps {
  readonly active?: boolean
  readonly payload?: readonly {
    readonly value: number
    readonly name: string
  }[]
  readonly label?: string
}

function CustomBarTooltip({ active, payload, label }: CustomBarTooltipProps) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-lg border border-[#1e2e4d] bg-[#070d18] p-3 shadow-xl text-xs font-mono">
      <span className="text-white font-semibold block mb-1">{label}</span>
      <div className="flex items-center justify-between gap-4">
        <span className="text-slate-400">Total Detections:</span>
        <span className="text-cyan-400 font-bold">{payload[0]?.value}</span>
      </div>
    </div>
  )
}

interface CustomLineTooltipProps {
  readonly active?: boolean
  readonly payload?: readonly {
    readonly value: number
    readonly name: string
    readonly color: string
  }[]
  readonly label?: string
}

function CustomLineTooltip({ active, payload, label }: CustomLineTooltipProps) {
  if (!active || !payload || payload.length === 0) return null
  return (
    <div className="rounded-lg border border-[#1e2e4d] bg-[#070d18] p-3 shadow-xl text-xs font-mono">
      <span className="text-white font-semibold block mb-2">{label}</span>
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              <span>{entry.name}:</span>
            </span>
            <span className="font-bold text-white">{entry.value}m</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<AnalyticsDateRange>('7d')
  const [selectedTacticFilter, setSelectedTacticFilter] = useState<string>('all')

  const datePresets: readonly { readonly id: AnalyticsDateRange; readonly label: string }[] = [
    { id: '24h', label: 'Last 24h' },
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '90d', label: 'Last Quarter' },
  ]

  const filteredTactics =
    selectedTacticFilter === 'all'
      ? SYNTHETIC_TACTIC_FREQUENCIES
      : SYNTHETIC_TACTIC_FREQUENCIES.filter((t) => t.tactic === selectedTacticFilter)

  const totalVulns = SYNTHETIC_VULNERABILITY_SPREAD.reduce((acc, c) => acc + c.count, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#141f33]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Threat Intelligence & Analytics
            </h1>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2 py-0.5 rounded">
              MITRE ATT&CK v14
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tactical frequency matrices, MTTA/MTTR response velocity, and fleet vulnerability profiles.
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-[#070d18] border border-[#16233b]">
          <div className="hidden sm:flex items-center pl-2 pr-1 text-slate-500">
            <Calendar className="h-3.5 w-3.5" />
          </div>
          {datePresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setDateRange(preset.id)}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                dateRange === preset.id
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics KPI Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Mean Time to Acknowledge</span>
            <span className="text-2xl font-bold font-mono text-cyan-400 mt-0.5 block">
              {SYNTHETIC_ANALYTICS_SUMMARY.mttaMinutes}m
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
              <TrendingDown className="h-3 w-3" />
              <span>-18.4% faster</span>
            </span>
          </div>
          <div className="p-2 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
            <Clock className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Mean Time to Respond</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-0.5 block">
              {SYNTHETIC_ANALYTICS_SUMMARY.mttrMinutes}m
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
              <TrendingDown className="h-3 w-3" />
              <span>-12.0% SLA beat</span>
            </span>
          </div>
          <div className="p-2 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
            <Activity className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Active MITRE Techniques</span>
            <span className="text-2xl font-bold font-mono text-white mt-0.5 block">
              {SYNTHETIC_ANALYTICS_SUMMARY.activeTechniquesCount}
            </span>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">Across 9 Tactics</span>
          </div>
          <div className="p-2 rounded bg-[#0d162a] border border-[#172540] text-cyan-400">
            <Layers className="h-4 w-4" />
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#080d1a] border border-[#16233b] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Correlated Detections</span>
            <span className="text-2xl font-bold font-mono text-amber-400 mt-0.5 block">
              {SYNTHETIC_ANALYTICS_SUMMARY.totalDetectionsCount}
            </span>
            <span className="text-[10px] font-mono text-slate-400 mt-0.5 block">All Sensors Evaluated</span>
          </div>
          <div className="p-2 rounded bg-amber-950/60 border border-amber-800/60 text-amber-400">
            <Shield className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Row 1: MITRE ATT&CK Tactic Frequency & Endpoint Vulnerability Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Tactic Frequency Distribution BarChart */}
        <div className="lg:col-span-2">
          <Card className="bg-[#080d1a] border-[#16233b]">
            <CardHeader className="pb-3 border-b border-[#141f33] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-cyan-400" />
                  <CardTitle className="text-sm font-semibold text-slate-100">
                    MITRE ATT&CK Tactic Frequency Distribution
                  </CardTitle>
                </div>
                <CardDescription className="text-xs text-slate-400 mt-0.5">
                  Aggregate telemetry volume mapped across adversary kill-chain stages.
                </CardDescription>
              </div>

              {/* Tactic Filter Pill */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-slate-400">Filter:</span>
                <select
                  value={selectedTacticFilter}
                  onChange={(e) => setSelectedTacticFilter(e.target.value)}
                  className="bg-[#0c1424] border border-[#1e2e4f] rounded px-2 py-1 text-slate-200 text-xs focus:outline-none"
                >
                  <option value="all">All 9 Tactics</option>
                  {SYNTHETIC_TACTIC_FREQUENCIES.map((t) => (
                    <option key={t.tactic} value={t.tactic}>
                      {t.tactic}
                    </option>
                  ))}
                </select>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[...filteredTactics]}
                    margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#141f33" vertical={false} />
                    <XAxis
                      dataKey="tactic"
                      stroke="#64748b"
                      fontSize={10}
                      tickLine={false}
                      angle={-25}
                      textAnchor="end"
                      height={40}
                    />
                    <YAxis
                      stroke="#64748b"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#152238' }}
                    />
                    <Tooltip content={<CustomBarTooltip />} />
                    <Bar
                      dataKey="count"
                      name="Detections"
                      fill="#06b6d4"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: Endpoint Vulnerability Severity Spread */}
        <div className="lg:col-span-1">
          <Card className="bg-[#080d1a] border-[#16233b] h-full flex flex-col">
            <CardHeader className="pb-3 border-b border-[#141f33]">
              <div className="flex items-center gap-2">
                <Bug className="h-4 w-4 text-amber-400" />
                <CardTitle className="text-sm font-semibold text-slate-100">
                  Fleet Vulnerability Spread
                </CardTitle>
              </div>
              <CardDescription className="text-xs text-slate-400">
                Known CVE density across active fleet endpoints.
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4 flex-1 flex flex-col justify-between">
              <div className="h-44 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[...SYNTHETIC_VULNERABILITY_SPREAD]}
                      dataKey="count"
                      nameKey="severity"
                      innerRadius={46}
                      outerRadius={68}
                      paddingAngle={4}
                      stroke="#080d1a"
                      strokeWidth={2}
                    >
                      {SYNTHETIC_VULNERABILITY_SPREAD.map((entry) => (
                        <Cell key={entry.severity} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold font-mono text-white leading-tight">
                    {totalVulns}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Total CVEs
                  </span>
                </div>
              </div>

              {/* Legend Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono mt-4">
                {SYNTHETIC_VULNERABILITY_SPREAD.map((v) => (
                  <div
                    key={v.severity}
                    className="p-2 rounded bg-[#0b1222] border border-[#141f35] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-1.5 capitalize">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: v.color }} />
                      <span className="text-slate-300">{v.severity}</span>
                    </div>
                    <span className="font-bold text-white">{v.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Row 2: Alert Triage MTTA / MTTR Performance Over Time LineChart */}
      <Card className="bg-[#080d1a] border-[#16233b]">
        <CardHeader className="pb-3 border-b border-[#141f33] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-400" />
              <CardTitle className="text-sm font-semibold text-slate-100">
                SOC Triage Velocity: MTTA vs. MTTR Performance Over Time
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-400 mt-0.5">
              Mean Time to Acknowledge (MTTA) and Mean Time to Respond (MTTR) benchmarked against target SLA (15.0m).
            </CardDescription>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span>MTTA (Minutes)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span>MTTR (Minutes)</span>
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="h-0.5 w-3 bg-red-400 border border-dashed" />
              <span>SLA (15m)</span>
            </span>
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[...SYNTHETIC_PERFORMANCE_TREND]}
                margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#141f33" vertical={false} />
                <XAxis
                  dataKey="period"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#152238' }}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                  unit="m"
                  axisLine={{ stroke: '#152238' }}
                />
                <Tooltip content={<CustomLineTooltip />} />
                <ReferenceLine y={15} stroke="#ef4444" strokeDasharray="4 4" label="" />
                <Line
                  type="monotone"
                  dataKey="mttaMinutes"
                  name="MTTA"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: '#06b6d4', r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="mttrMinutes"
                  name="MTTR"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
