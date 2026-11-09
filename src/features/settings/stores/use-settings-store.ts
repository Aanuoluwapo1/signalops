import { create } from 'zustand'
import type { AlertSeverity } from '@/types/alerts'
import type {
  DetectionRule,
  SimulationHarnessConfig,
  WebhookConnector,
  AnalystProfile,
  EpsRate,
} from '@/types/settings'
import {
  INITIAL_DETECTION_RULES,
  INITIAL_HARNESS_CONFIG,
  INITIAL_WEBHOOKS,
  INITIAL_ANALYST_PROFILE,
} from '../services/settings-mock'

export type SettingsTab = 'rules' | 'harness' | 'webhooks' | 'profile'

interface SettingsState {
  readonly activeTab: SettingsTab
  readonly rules: readonly DetectionRule[]
  readonly harness: SimulationHarnessConfig
  readonly webhooks: readonly WebhookConnector[]
  readonly profile: AnalystProfile
  readonly toastMessage: string | null

  readonly setActiveTab: (tab: SettingsTab) => void
  readonly toggleRule: (id: string) => void
  readonly updateRuleSeverity: (id: string, severity: AlertSeverity) => void
  readonly setEpsRate: (rate: EpsRate) => void
  readonly triggerScenarioReplay: (scenarioName: string) => void
  readonly toggleWebhook: (id: string) => void
  readonly testWebhook: (id: string) => void
  readonly rotateApiKey: () => void
  readonly updateShift: (shift: string) => void
  readonly clearToast: () => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  activeTab: 'rules',
  rules: INITIAL_DETECTION_RULES,
  harness: INITIAL_HARNESS_CONFIG,
  webhooks: INITIAL_WEBHOOKS,
  profile: INITIAL_ANALYST_PROFILE,
  toastMessage: null,

  setActiveTab: (tab) => set({ activeTab: tab }),

  toggleRule: (id) => {
    set((state) => {
      const targetRule = state.rules.find((r) => r.id === id)
      const nextState = !targetRule?.enabled
      return {
        rules: state.rules.map((r) => (r.id === id ? { ...r, enabled: nextState } : r)),
        toastMessage: `Rule ${id} ${nextState ? 'ENABLED' : 'DISABLED'}`,
      }
    })
  },

  updateRuleSeverity: (id, severity) => {
    set((state) => ({
      rules: state.rules.map((r) => (r.id === id ? { ...r, severity } : r)),
      toastMessage: `Severity for ${id} adjusted to: ${severity.toUpperCase()}`,
    }))
  },

  setEpsRate: (rate) => {
    set((state) => ({
      harness: { ...state.harness, epsRate: rate },
      toastMessage: `Simulation event generator set to: ${rate} EPS`,
    }))
  },

  triggerScenarioReplay: (scenarioName) => {
    const now = new Date().toISOString()
    set((state) => ({
      harness: {
        ...state.harness,
        lastInjectedScenario: scenarioName,
        lastInjectedTimestamp: now,
      },
      toastMessage: `Simulation scenario injected: "${scenarioName}"`,
    }))
  },

  toggleWebhook: (id) => {
    set((state) => ({
      webhooks: state.webhooks.map((w) =>
        w.id === id ? { ...w, enabled: !w.enabled } : w,
      ),
      toastMessage: `Webhook connector status updated`,
    }))
  },

  testWebhook: (id) => {
    const now = new Date().toISOString()
    set((state) => {
      const wh = state.webhooks.find((w) => w.id === id)
      return {
        webhooks: state.webhooks.map((w) =>
          w.id === id
            ? {
                ...w,
                lastPingStatus: 'healthy',
                lastPingTimestamp: now,
              }
            : w,
        ),
        toastMessage: `Ping successful: ${wh?.name ?? id} responded in 42ms (HTTP 200 OK)`,
      }
    })
  },

  rotateApiKey: () => {
    const randomHex = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10)
    const newKey = `sig_live_${randomHex}`
    const now = new Date().toISOString()

    set((state) => ({
      profile: {
        ...state.profile,
        apiKey: newKey,
        apiKeyLastRotated: now,
      },
      toastMessage: `New synthetic API key generated and rotated successfully`,
    }))
  },

  updateShift: (shift) => {
    set((state) => ({
      profile: {
        ...state.profile,
        shift,
      },
      toastMessage: `Analyst shift assignment updated to: ${shift}`,
    }))
  },

  clearToast: () => set({ toastMessage: null }),
}))
