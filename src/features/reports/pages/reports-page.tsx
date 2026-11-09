import { useState } from 'react'
import { PageHeader } from '@/components/shared/page-header'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PRECONFIGURED_REPORTS } from '../services/reports-mock'
import { ReportPreviewModal } from '../components/report-preview-modal'
import type { SecurityReport } from '@/types/reports'
import {
  FileText,
  Eye,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'

export function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<SecurityReport | null>(null)
  const [reports] = useState<readonly SecurityReport[]>(PRECONFIGURED_REPORTS)

  return (
    <div className="space-y-6">
      <PageHeader
        title="SOC Compliance & Executive Reports"
        description="Automated technical reports, executive briefs, post-mortem incident documentation, and compliance audits."
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800/50 px-2.5 py-1 rounded">
              TEMPLATES: {reports.length} READY
            </span>
          </div>
        }
      />

      {/* Pre-configured Templates Grid */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Layers className="h-4 w-4 text-cyan-400" />
          <span>Pre-Configured Enterprise Report Templates</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => (
            <Card
              key={report.id}
              className="bg-[#080d1a] border-[#16233b] hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
                    {report.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {report.id}
                  </span>
                </div>
                <CardTitle className="text-sm font-semibold text-white mt-1">
                  {report.title}
                </CardTitle>
                <CardDescription className="text-xs text-slate-400 leading-relaxed">
                  {report.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 border-t border-[#131f33] mt-3">
                <div className="flex items-center justify-between py-2 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-slate-500" />
                    <span>{report.periodCovered}</span>
                  </span>
                  <span className="text-emerald-400 font-semibold">{report.classification}</span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="cyan"
                    size="sm"
                    onClick={() => setSelectedReport(report)}
                    className="flex-1 text-xs h-8"
                  >
                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                    <span>View & Export Dossier</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Generated Reports Archive Table */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <FileText className="h-4 w-4 text-cyan-400" />
            <span>Generated Reports Catalog & Archive</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Export formats: PDF, JSON, CSV
          </span>
        </div>

        <Card className="bg-[#080d1a] border-[#16233b] overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#152035] bg-[#060a14] text-[10px] text-slate-400 uppercase tracking-wider">
                    <th className="py-2.5 px-4 font-semibold">Report ID</th>
                    <th className="py-2.5 px-4 font-semibold">Title & Category</th>
                    <th className="py-2.5 px-4 font-semibold">Classification</th>
                    <th className="py-2.5 px-4 font-semibold">Generated Date</th>
                    <th className="py-2.5 px-4 font-semibold">Author</th>
                    <th className="py-2.5 px-4 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#131e33]">
                  {reports.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-[#0c1424] transition-colors group cursor-pointer"
                      onClick={() => setSelectedReport(report)}
                    >
                      <td className="py-3 px-4 font-bold text-cyan-400 whitespace-nowrap">
                        {report.id}
                      </td>
                      <td className="py-3 px-4 font-sans text-xs">
                        <span className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors block">
                          {report.title}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          Category: {report.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-[11px]">
                        <span className="px-1.5 py-0.5 rounded bg-[#111c33] border border-[#1b2b4d] text-slate-300">
                          {report.classification}
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-slate-400 text-xs">
                        {new Date(report.generatedAt).toLocaleDateString()} {new Date(report.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} UTC
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-slate-300 text-xs">
                        {report.author}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedReport(report)}
                          className="h-7 text-xs text-slate-400 hover:text-cyan-300 group-hover:bg-[#121c32]"
                        >
                          <span>Preview</span>
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 border-t border-[#141f33] bg-[#070c17] flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Audited Integrity: SOC Compliance Records Verified</span>
              </span>
              <span className="text-cyan-400">SYNTHETIC REPORT DATA</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Preview Modal with Export Capability */}
      <ReportPreviewModal
        report={selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </div>
  )
}
