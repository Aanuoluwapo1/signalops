import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { MobileNav } from './mobile-nav'
import { GlobalSearch } from './global-search'
import { Info } from 'lucide-react'

export function AppShell() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#060a12] text-slate-100">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Drawer */}
      <MobileNav />

      {/* Main Container */}
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        {/* Synthetic Platform Banner */}
        <div className="bg-[#091224] border-b border-[#142340] px-4 py-1 text-[11px] font-mono text-cyan-400/90 flex items-center justify-between">
          <div className="flex items-center gap-1.5 truncate">
            <Info className="h-3 w-3 text-cyan-400 shrink-0" />
            <span className="truncate">
              <strong>SIMULATION MODE:</strong> SignalOps is operating in an isolated training and simulation environment. Telemetry, alerts, and incident data are synthetic.
            </span>
          </div>
          <span className="hidden md:inline-block text-[10px] text-slate-500 uppercase tracking-widest pl-2 shrink-0">
            PHASE 1 FOUNDATION
          </span>
        </div>

        {/* Top Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Search Dialog (Ctrl+K) */}
      <GlobalSearch />
    </div>
  )
}
