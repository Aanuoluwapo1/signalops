import { Menu, Search } from 'lucide-react'
import { Breadcrumbs } from './breadcrumbs'
import { NotificationsPopover } from './notifications-popover'
import { AnalystMenu } from './analyst-menu'
import { SyntheticBadge } from '@/components/shared/synthetic-badge'
import { BackendBadge } from '@/components/shared/backend-badge'
import { useUIStore } from '@/stores/use-ui-store'

export function Header() {
  const { setMobileNavOpen, setSearchOpen } = useUIStore()

  return (
    <header className="h-14 shrink-0 border-b border-[#141f33] bg-[#070c17]/90 backdrop-blur-xs px-4 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="md:hidden p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-[#121c32]"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Breadcrumbs />
      </div>

      {/* Center / Right: Badges, Search, Notifications, Analyst */}
      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
        {/* Backend Database Status Badge */}
        <BackendBadge />

        {/* Synthetic SOC Indicator */}
        <div className="hidden lg:block">
          <SyntheticBadge />
        </div>

        {/* Global Search Trigger */}
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 h-8 px-2.5 sm:px-3 rounded-md bg-[#0d1629] border border-[#1b2a47] text-slate-400 hover:text-slate-200 hover:border-cyan-500/40 text-xs transition-colors"
          aria-label="Search"
        >
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span className="hidden sm:inline text-slate-400">Search system...</span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-cyan-400/90 bg-[#121f38] border border-[#20345b] rounded">
            Ctrl+K
          </kbd>
        </button>

        <NotificationsPopover />

        <div className="h-4 w-[1px] bg-[#1a2944] hidden sm:block" />

        <AnalystMenu />
      </div>
    </header>
  )
}
