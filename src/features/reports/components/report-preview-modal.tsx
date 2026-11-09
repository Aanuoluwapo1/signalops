import { useState } from 'react'
import { X, FileText, Download, Check, Shield, Printer, Table } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SecurityReport, ReportFormat } from '@/types/reports'
import { exportReportAsJson, exportReportAsCsv } from '../services/reports-mock'

interface ReportPreviewModalProps {
  readonly report: SecurityReport | null
  readonly onClose: () => void
}

export function ReportPreviewModal({ report, onClose }: ReportPreviewModalProps) {
  const [exportFeedback, setExportFeedback] = useState<string | null>(null)

  if (!report) return null

  const handleExport = async (format: ReportFormat) => {
    if (format === 'json') {
      const json = exportReportAsJson(report)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${report.id}.json`
      a.click()
      URL.revokeObjectURL(url)
      setExportFeedback('Exported as JSON file')
    } else if (format === 'csv') {
      const csv = exportReportAsCsv(report)
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${report.id}-telemetry.csv`
      a.click()
      URL.revokeObjectURL(url)
      setExportFeedback('Exported Telemetry as CSV')
    } else if (format === 'pdf') {
      setExportFeedback('Simulated PDF Rendered: Ready for Executive Distribution')
    }

    setTimeout(() => setExportFeedback(null), 3000)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Security Report Preview: ${report.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-xl border border-[#203152] bg-[#090f1e] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#141f33] bg-[#070c17]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-cyan-950 border border-cyan-800 text-cyan-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                  {report.classification}
                </span>
                <span className="text-xs font-mono text-slate-400">{report.id}</span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">{report.title}</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-[#121c32]"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Action / Export Toolbar */}
        <div className="px-6 py-3 border-b border-[#141f33] bg-[#0a1020] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span>Author: <strong className="text-slate-200">{report.author}</strong></span>
            <span>&bull;</span>
            <span>Period: <strong className="text-slate-200">{report.periodCovered}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleExport('json')}
              className="text-xs h-7 font-mono"
            >
              <Download className="h-3 w-3 mr-1" />
              <span>JSON</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleExport('csv')}
              className="text-xs h-7 font-mono"
            >
              <Download className="h-3 w-3 mr-1" />
              <span>CSV</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => handleExport('pdf')}
              className="text-xs h-7 font-mono"
            >
              <Printer className="h-3 w-3 mr-1" />
              <span>PDF Preview</span>
            </Button>
          </div>
        </div>

        {exportFeedback && (
          <div className="px-6 py-2 bg-emerald-950/80 border-b border-emerald-800 text-xs font-mono text-emerald-300 flex items-center gap-2 animate-in fade-in duration-100">
            <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>{exportFeedback}</span>
          </div>
        )}

        {/* Scrollable Report Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* Report Sections */}
          {report.sections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-sm font-semibold text-cyan-300 border-b border-[#16233b] pb-1.5 flex items-center gap-2">
                <span className="text-slate-500 font-mono text-xs">0{idx + 1}.</span>
                <span>{section.title}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-[#0a1120] p-3.5 rounded-lg border border-[#141f35]">
                {section.content}
              </p>

              {/* Key Metrics if available */}
              {section.keyMetrics && section.keyMetrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {section.keyMetrics.map((km, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded bg-[#070d18] border border-[#141f33] text-center"
                    >
                      <span className="text-[10px] uppercase font-mono text-slate-500 block">
                        {km.label}
                      </span>
                      <span className="text-lg font-bold font-mono text-white mt-0.5 block">
                        {km.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Telemetry Table */}
          <div className="space-y-2 pt-2">
            <h3 className="text-sm font-semibold text-cyan-300 border-b border-[#16233b] pb-1.5 flex items-center gap-2">
              <Table className="h-4 w-4 text-cyan-400" />
              <span>{report.telemetryTable.title}</span>
            </h3>

            <div className="rounded-lg border border-[#16233b] overflow-hidden">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#070d18] border-b border-[#141f33] text-[10px] text-slate-500 uppercase tracking-wider">
                    {report.telemetryTable.headers.map((h, i) => (
                      <th key={i} className="py-2.5 px-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#131f33]">
                  {report.telemetryTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#0c1424]">
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-2 px-3 ${
                            cIdx === 0
                              ? 'text-cyan-400 font-semibold'
                              : 'text-slate-300'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#141f33] bg-[#070c17] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1.5">
            <Shield className="h-3 w-3 text-cyan-400" />
            <span>SYNTHETIC SECURITY REPORT COMPLIANCE ENGINE</span>
          </span>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-xs h-7">
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  )
}
