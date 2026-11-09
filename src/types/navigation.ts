export interface NavItem {
  readonly title: string
  readonly href: string
  readonly iconName: string
  readonly badge?: string
  readonly badgeVariant?: 'default' | 'cyan' | 'amber' | 'red'
  readonly matchPrefix?: boolean
}

export interface BreadcrumbItem {
  readonly label: string
  readonly href?: string
}

export interface NavSection {
  readonly label?: string
  readonly items: readonly NavItem[]
}
