import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { SeverityBadge } from '@/components/shared/severity-badge'
import { useSettingsStore } from '../stores/use-settings-store'
import type { AlertSeverity } from '@/types/alerts'
import { ToggleLeft, ToggleRight, Terminal } from 'lucide-react'

export function DetectionRulesTab() {
  const { rules, toggleRule, updateRuleSeverity } = useSettingsStore()

  const activeCount = rules.filter((r) => r.enabled).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#141f33]">
        <div>
          <h2 className="text-sm font-semibold text-white">Sigma & YARA Detection Rules Catalog</h2>
          <p className="text-xs text-slate-400">
            Configure correlation thresholds, rule trigger severities, and false-positive suppression regexes.
          </p>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded">
          {activeCount} of {rules.length} Rules Active
        </span>
      </div>

      <div className="space-y-3">
        {rules.map((rule) => (
          <Card
            key={rule.id}
            className={`transition-colors border ${
              rule.enabled
                ? 'bg-[#080d1a] border-[#16233b]'
                : 'bg-[#060912] border-[#101726] opacity-75'
            }`}
          >
            <CardHeader className="py-3 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#131f33]">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleRule(rule.id)}
                  className="text-cyan-400 hover:text-cyan-300 focus:outline-none"
                  aria-label={rule.enabled ? 'Disable rule' : 'Enable rule'}
                >
                  {rule.enabled ? (
                    <ToggleRight className="h-6 w-6 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-slate-600" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-white">{rule.name}</span>
                    <SeverityBadge severity={rule.severity} />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {rule.id} &bull; MITRE: {rule.mitreTechnique} ({rule.category})
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Severity Selector */}
                <div className="flex items-center gap-1.5 text-xs font-mono bg-[#0c1424] border border-[#1e2e4f] rounded px-2 py-0.5">
                  <span className="text-slate-400 text-[10px]">Severity:</span>
                  <select
                    value={rule.severity}
                    onChange={(e) => updateRuleSeverity(rule.id, e.target.value as AlertSeverity)}
                    className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="critical" className="bg-[#0c1424]">Critical</option>
                    <option value="high" className="bg-[#0c1424]">High</option>
                    <option value="medium" className="bg-[#0c1424]">Medium</option>
                    <option value="low" className="bg-[#0c1424]">Low</option>
                  </select>
                </div>

                <span className="text-[10px] font-mono text-slate-400 bg-[#0e1628] border border-[#172540] px-2 py-1 rounded">
                  {rule.suppressionCount} Suppressed
                </span>
              </div>
            </CardHeader>

            <CardContent className="py-2.5 px-4 bg-[#050811]">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Terminal className="h-3 w-3 text-cyan-500 shrink-0" />
                <span className="text-slate-500 text-[10px] uppercase shrink-0">Signature:</span>
                <code className="text-cyan-300 text-[11px] truncate flex-1 select-text">
                  {rule.querySignature}
                </code>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
