import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSettingsStore } from '../stores/use-settings-store'
import {
  Shield,
  Key,
  RotateCw,
  Copy,
  Check,
  CheckCircle2,
} from 'lucide-react'

export function AnalystProfileTab() {
  const { profile, rotateApiKey, updateShift } = useSettingsStore()
  const [copied, setCopied] = useState(false)

  const shiftOptions = [
    'Day Shift (08:00 - 16:00 UTC)',
    'Swing Shift (16:00 - 00:00 UTC)',
    'Night Shift (00:00 - 08:00 UTC)',
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.apiKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Overview Card */}
      <Card className="bg-[#080d1a] border-[#16233b]">
        <CardHeader className="pb-4 border-b border-[#141f33]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-300 font-mono text-base font-bold">
                AR
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white">{profile.name}</h2>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-800/80 px-2 py-0.5 rounded">
                    {profile.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Analyst Session: Active</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-[#0c1424] border border-[#16233b] space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Assigned Shift Schedule</span>
              <select
                value={profile.shift}
                onChange={(e) => updateShift(e.target.value)}
                className="w-full bg-[#070d18] border border-[#1b2b47] rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none cursor-pointer mt-1 font-semibold"
              >
                {shiftOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0c1424]">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 rounded-lg bg-[#0c1424] border border-[#16233b] space-y-1">
              <span className="text-[10px] text-slate-500 uppercase block">Role-Based Access Level</span>
              <div className="flex items-center gap-2 pt-1">
                <Shield className="h-4 w-4 text-cyan-400" />
                <span className="font-semibold text-white">Tier 2 Incident Commander (Full Containment Rights)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Access Token & Rotation */}
      <Card className="bg-[#080d1a] border-[#16233b]">
        <CardHeader className="pb-3 border-b border-[#141f33] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-cyan-400" />
              <CardTitle className="text-sm font-semibold text-white">
                Analyst CLI & API Token
              </CardTitle>
            </div>
            <CardDescription className="text-xs text-slate-400 mt-0.5">
              Bearer token for authenticating automated incident scripts and local analyst CLI tooling.
            </CardDescription>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={rotateApiKey}
            className="text-xs h-7 font-mono text-amber-300 border-amber-900/50 hover:bg-amber-950/40"
          >
            <RotateCw className="h-3 w-3 mr-1.5 text-amber-400" />
            <span>Rotate API Key</span>
          </Button>
        </CardHeader>

        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex-1 p-2.5 rounded bg-[#050811] border border-[#16233b] font-mono text-xs text-cyan-300 truncate select-all">
              {profile.apiKey}
            </div>

            <Button
              variant="default"
              size="sm"
              onClick={handleCopy}
              className="h-9 px-3 text-xs font-mono"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1.5 text-slate-300" />
                  <span>Copy Key</span>
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Last Token Rotation: {new Date(profile.apiKeyLastRotated).toLocaleString()} UTC</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>Token Active</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
