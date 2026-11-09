import { useState } from 'react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight, Copy, Check, Terminal } from 'lucide-react'

interface RawLogViewerProps {
  readonly rawLog: string
  readonly alertId: string
}

export function RawLogViewer({ rawLog, alertId }: RawLogViewerProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawLog)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card className="bg-[#070d18] border-[#16233b]">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b border-[#141f33]">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-xs font-semibold text-slate-200 hover:text-cyan-400 transition-colors focus:outline-none"
        >
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-cyan-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-slate-400" />
          )}
          <Terminal className="h-4 w-4 text-cyan-400" />
          <span>Raw Event Log Telemetry ({alertId})</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopy}
            className="h-7 text-xs font-mono"
            aria-label="Copy raw log to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 mr-1 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3 mr-1 text-slate-400" />
                <span>Copy JSON</span>
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="p-0">
          <pre className="p-4 text-xs font-mono text-cyan-300/90 bg-[#050811] overflow-x-auto max-h-96 leading-relaxed select-text">
            {rawLog}
          </pre>
        </CardContent>
      )}
    </Card>
  )
}
