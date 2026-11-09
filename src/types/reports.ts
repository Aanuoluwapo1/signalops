export type ReportTemplateId =
  | 'executive-summary'
  | 'soc-24h-brief'
  | 'incident-post-mortem'
  | 'compliance-audit'

export type ReportFormat = 'json' | 'csv' | 'pdf'

export interface ReportSection {
  readonly title: string
  readonly content: string
  readonly keyMetrics?: readonly { readonly label: string; readonly value: string }[]
}

export interface ReportTelemetryTable {
  readonly title: string
  readonly headers: readonly string[]
  readonly rows: readonly (readonly string[])[]
}

export interface SecurityReport {
  readonly id: string
  readonly templateId: ReportTemplateId
  readonly title: string
  readonly description: string
  readonly category: string
  readonly generatedAt: string
  readonly classification: string
  readonly author: string
  readonly periodCovered: string
  readonly sections: readonly ReportSection[]
  readonly telemetryTable: ReportTelemetryTable
  readonly isSynthetic: true
}
