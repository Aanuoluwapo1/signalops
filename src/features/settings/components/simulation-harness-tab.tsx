import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSettingsStore } from '../stores/use-settings-store'
import type { EpsRate } from '@/types/settings'
import {
  Activity,
  Zap,
  Play,
  ShieldAlert,
  Flame,
  Radio,
  Clock,
  Terminal,
} from 'lucide-react'

export function SimulationHarnessTab() {
  const { harness, setEpsRate, triggerScenarioReplay } = useSettingsStore()

  const epsOptions: readonly { readonly rate: EpsRate; readonly label: string; readonly desc: string }[] = [
    { rate: 50, label: '50 EPS', desc: 'Low noise baseline' },
    { rate: 250, label: '250 EPS', desc: 'Standard diurnal load' },
    { rate: 1000, label: '1,000 EPS', desc: 'Stress test & attack spike' },
  ]

  const attackScenarios = [
    {
      id: 'scen-dcsync',
      title: 'DCSync Active Directory Replication Attack',
      vector: 'T1003.006 &bull; DRSUAPI RPC',
      target: 'DC-01.corp.internal (10.0.1.15)',
      desc: 'Simulate replication sync requests to domain controller from rogue backup identity.',
      icon: ShieldAlert,
      color: 'text-red-400',
    },
    {
      id: 'scen-hollowing',
      title: 'Process Hollowing in svchost.exe',
      vector: 'T1055.012 &bull; Memory Payload Unmap',
      target: 'WKS-FIN-02.corp.internal (192.168.12.18)',
      desc: 'Inject memory allocation and unmapping sequence inside native Windows host service binary.',
      icon: Terminal,
      color: 'text-amber-400',
    },
    {
      id: 'scen-ransomware',
      title: 'Canary Honeypot File Encryption Hit',
      vector: 'T1486 / T1490 &bull; File Modification Burst',
      target: 'FILE-SRV-02.corp.internal (10.0.1.25)',
      desc: 'Trigger honeypot file renaming (.locked) and immediate Volume Shadow Copy deletion sequence.',
      icon: Flame,
      color: 'text-orange-400',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Rate Controller */}
      <Card className="bg-[#080d1a] border-[#16233b]">
        <CardHeader className="pb-3 border-b border-[#141f33]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              <CardTitle className="text-sm font-semibold text-white">
                SIEM Event Generation Rate (EPS)
              </CardTitle>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
              CURRENT: {harness.epsRate} EPS
            </span>
          </div>
          <CardDescription className="text-xs text-slate-400">
            Configure simulated synthetic ingestion throughput across endpoint sensors and network perimeter relays.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {epsOptions.map((opt) => {
              const isSelected = harness.epsRate === opt.rate
              return (
                <div
                  key={opt.rate}
                  onClick={() => setEpsRate(opt.rate)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 shadow-sm shadow-cyan-950'
                      : 'bg-[#0c1424] border-[#182744] text-slate-300 hover:bg-[#121c32]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-white">{opt.label}</span>
                    <Radio
                      className={`h-4 w-4 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">{opt.desc}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* On-Demand Attack Scenario Replay Triggers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Zap className="h-4 w-4 text-amber-400" />
            <span>Adversary Attack Replay Harness (On-Demand Injection)</span>
          </div>
          {harness.lastInjectedScenario && (
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-cyan-400" />
              <span>Last injected: {harness.lastInjectedScenario}</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {attackScenarios.map((scen) => {
            const Icon = scen.icon
            return (
              <Card
                key={scen.id}
                className="bg-[#080d1a] border-[#16233b] hover:border-cyan-500/40 transition-colors flex flex-col justify-between"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded bg-[#0b1222] border border-[#141f35]">
                      <Icon className={`h-4 w-4 ${scen.color}`} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      SIM-REPLAY
                    </span>
                  </div>
                  <CardTitle className="text-xs font-semibold text-white mt-2">
                    {scen.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400 leading-relaxed mt-1">
                    {scen.desc}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 border-t border-[#131f33] mt-2">
                  <div className="py-2 text-[10px] font-mono text-slate-400">
                    <div className="truncate">Target: {scen.target}</div>
                  </div>

                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => triggerScenarioReplay(scen.title)}
                    className="w-full text-xs h-7"
                  >
                    <Play className="h-3 w-3 mr-1.5" />
                    <span>Replay Scenario</span>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
