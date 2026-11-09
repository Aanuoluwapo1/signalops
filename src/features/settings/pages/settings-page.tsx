import { PageHeader } from '@/components/shared/page-header'
import { useSettingsStore, type SettingsTab } from '../stores/use-settings-store'
import { DetectionRulesTab } from '../components/detection-rules-tab'
import { SimulationHarnessTab } from '../components/simulation-harness-tab'
import { WebhooksTab } from '../components/webhooks-tab'
import { AnalystProfileTab } from '../components/analyst-profile-tab'
import {
  Shield,
  Activity,
  Bell,
  User,
  CheckCircle2,
  X,
  Sliders,
} from 'lucide-react'

export function SettingsPage() {
  const { activeTab, setActiveTab, toastMessage, clearToast } = useSettingsStore()

  const tabs: readonly { readonly id: SettingsTab; readonly label: string; readonly icon: typeof Shield }[] = [
    { id: 'rules', label: 'Detection Rules', icon: Shield },
    { id: 'harness', label: 'Simulation Harness', icon: Activity },
    { id: 'webhooks', label: 'Webhooks & Relays', icon: Bell },
    { id: 'profile', label: 'Analyst Profile', icon: User },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Settings & Simulation Controls"
        description="Detection rule tuning, synthetic telemetry generation rates, webhook relays, and analyst credentials."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2.5 py-1 rounded flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5 text-cyan-400" />
              <span>SIMULATION ENGINE ACTIVE</span>
            </span>
          </div>
        }
      />

      {/* Real-Time Toast Notification */}
      {toastMessage && (
        <div className="p-3 rounded-lg bg-cyan-950/80 border border-cyan-500/80 text-cyan-200 text-xs font-mono flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={clearToast}
            className="text-cyan-400 hover:text-white p-0.5 rounded"
            aria-label="Dismiss toast"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#080d1a] border border-[#16233b] overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/80 shadow-xs font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#0e1628]'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'rules' && <DetectionRulesTab />}
        {activeTab === 'harness' && <SimulationHarnessTab />}
        {activeTab === 'webhooks' && <WebhooksTab />}
        {activeTab === 'profile' && <AnalystProfileTab />}
      </div>
    </div>
  )
}
