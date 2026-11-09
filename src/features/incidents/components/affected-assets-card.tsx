import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Laptop, Shield, User, Cloud, Radio, WifiOff, Wifi } from 'lucide-react'
import type { AffectedAsset } from '@/types/incidents'
import { useIncidentsStore } from '../stores/use-incidents-store'

interface AffectedAssetsCardProps {
  readonly incidentId: string
  readonly assets: readonly AffectedAsset[]
}

export function AffectedAssetsCard({ incidentId, assets }: AffectedAssetsCardProps) {
  const { toggleAssetStatus } = useIncidentsStore()

  const getAssetIcon = (type: AffectedAsset['type']) => {
    switch (type) {
      case 'host':
        return <Laptop className="h-4 w-4 text-cyan-400" />
      case 'identity':
        return <User className="h-4 w-4 text-amber-400" />
      case 'cloud':
        return <Cloud className="h-4 w-4 text-blue-400" />
      case 'network':
      default:
        return <Radio className="h-4 w-4 text-purple-400" />
    }
  }

  return (
    <Card className="bg-[#080d1a] border-[#16233b]">
      <CardHeader className="pb-3 border-b border-[#141f33]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-cyan-400" />
            <CardTitle className="text-sm font-semibold text-slate-100">
              Affected Assets & Containment Controls
            </CardTitle>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {assets.length} entities tracked
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {assets.map((asset) => {
          const isIsolated = asset.status === 'isolated'

          return (
            <div
              key={asset.name}
              className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                isIsolated
                  ? 'bg-red-950/20 border-red-900/40 text-red-200'
                  : 'bg-[#0c1424] border-[#182744] text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded bg-[#070d18] border border-[#16233b] shrink-0">
                  {getAssetIcon(asset.type)}
                </div>
                <div className="truncate">
                  <span className="text-xs font-semibold text-white truncate block">
                    {asset.name}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    <span className="uppercase">{asset.type}</span>
                    {asset.ip && (
                      <>
                        <span>&bull;</span>
                        <span className="text-cyan-400">{asset.ip}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase border ${
                    isIsolated
                      ? 'bg-red-950 text-red-300 border-red-800'
                      : asset.status === 'remediated'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-cyan-950 text-cyan-300 border-cyan-800'
                  }`}
                >
                  {asset.status}
                </span>

                {asset.type === 'host' && (
                  <Button
                    variant={isIsolated ? 'default' : 'danger'}
                    size="sm"
                    onClick={() => toggleAssetStatus(incidentId, asset.name)}
                    className="h-7 text-xs"
                  >
                    {isIsolated ? (
                      <>
                        <Wifi className="h-3 w-3 mr-1" />
                        <span>Restore Host</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="h-3 w-3 mr-1" />
                        <span>Isolate Host</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
