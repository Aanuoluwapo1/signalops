import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSettingsStore } from '../stores/use-settings-store'
import {
  Bell,
  CheckCircle2,
  ToggleLeft,
  ToggleRight,
  Send,
} from 'lucide-react'

export function WebhooksTab() {
  const { webhooks, toggleWebhook, testWebhook } = useSettingsStore()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#141f33]">
        <div>
          <h2 className="text-sm font-semibold text-white">Notification Relays & Webhook Connectors</h2>
          <p className="text-xs text-slate-400">
            Outbound integration relays dispatching prioritized alerts to ChatOps channels, on-call paging, and external SIEM data lakes.
          </p>
        </div>
        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded">
          {webhooks.filter((w) => w.enabled).length} Connectors Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {webhooks.map((hook) => (
          <Card
            key={hook.id}
            className={`border transition-all flex flex-col justify-between ${
              hook.enabled
                ? 'bg-[#080d1a] border-[#16233b]'
                : 'bg-[#060912] border-[#101726] opacity-75'
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-[#0c1424] border border-[#16233b] text-cyan-400">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-xs font-semibold text-white">
                      {hook.name}
                    </CardTitle>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      Service: {hook.service}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleWebhook(hook.id)}
                  className="text-cyan-400 hover:text-cyan-300 focus:outline-none"
                  aria-label={hook.enabled ? 'Disable webhook' : 'Enable webhook'}
                >
                  {hook.enabled ? (
                    <ToggleRight className="h-6 w-6 text-emerald-400" />
                  ) : (
                    <ToggleLeft className="h-6 w-6 text-slate-600" />
                  )}
                </button>
              </div>

              <div className="mt-3 p-2 rounded bg-[#050811] border border-[#141f33] text-[11px] font-mono text-slate-400 truncate">
                <span className="text-slate-500 text-[10px] uppercase block mb-0.5">Destination URL:</span>
                <span className="text-cyan-300 truncate block select-text">{hook.targetUrl}</span>
              </div>
            </CardHeader>

            <CardContent className="pt-0 border-t border-[#131f33] mt-2">
              <div className="py-2.5 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Relay Health:</span>
                  {hook.lastPingStatus === 'healthy' ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Healthy</span>
                    </span>
                  ) : (
                    <span className="text-slate-400">Untested</span>
                  )}
                </div>

                {hook.lastPingTimestamp && (
                  <span className="text-slate-500 text-[10px]">
                    Pinged: {new Date(hook.lastPingTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC
                  </span>
                )}
              </div>

              <div className="pt-1">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!hook.enabled}
                  onClick={() => testWebhook(hook.id)}
                  className="w-full text-xs h-7 font-mono"
                >
                  <Send className="h-3 w-3 mr-1.5 text-cyan-400" />
                  <span>Test Relay (Simulate Ping)</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
