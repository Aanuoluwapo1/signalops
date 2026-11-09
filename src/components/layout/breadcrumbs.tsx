import { useLocation, Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumbs() {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)

  if (pathSegments.length === 0) {
    return null
  }

  const segmentLabels: Record<string, string> = {
    dashboard: 'Dashboard',
    alerts: 'Alerts',
    incidents: 'Incidents',
    endpoints: 'Endpoints',
    events: 'Events',
    analytics: 'Analytics',
    reports: 'Reports',
    settings: 'Settings',
  }

  return (
    <nav aria-label="Breadcrumb" className="hidden sm:flex items-center space-x-1.5 text-xs text-slate-400">
      <Link
        to="/dashboard"
        className="flex items-center text-slate-400 hover:text-cyan-400 transition-colors"
        title="Dashboard"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>

      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1
        const to = `/${pathSegments.slice(0, index + 1).join('/')}`
        const label = segmentLabels[segment] ?? segment

        return (
          <div key={to} className="flex items-center space-x-1.5">
            <ChevronRight className="h-3 w-3 text-slate-600" />
            {isLast ? (
              <span className="font-medium text-slate-200 truncate max-w-[180px]">
                {label}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-cyan-400 transition-colors capitalize"
              >
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
