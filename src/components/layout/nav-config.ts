import {
  LayoutDashboard,
  ShieldAlert,
  Flame,
  Laptop,
  Activity,
  BarChart3,
  FileText,
  Settings,
} from 'lucide-react'

export interface NavigationLink {
  readonly title: string
  readonly href: string
  readonly icon: typeof LayoutDashboard
  readonly badge?: string
  readonly badgeColor?: 'cyan' | 'amber' | 'red' | 'default'
}

export const MAIN_NAV_ITEMS: readonly NavigationLink[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Alerts',
    href: '/alerts',
    icon: ShieldAlert,
    badge: '14',
    badgeColor: 'amber',
  },
  {
    title: 'Incidents',
    href: '/incidents',
    icon: Flame,
    badge: '3',
    badgeColor: 'red',
  },
  {
    title: 'Endpoints',
    href: '/endpoints',
    icon: Laptop,
  },
  {
    title: 'Events',
    href: '/events',
    icon: Activity,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]
