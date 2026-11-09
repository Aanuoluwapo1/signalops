import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AppShell } from '@/components/layout/app-shell'
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page'
import { AlertsPage } from '@/features/alerts/pages/alerts-page'
import { AlertDetailPage } from '@/features/alerts/pages/alert-detail-page'
import { IncidentsPage } from '@/features/incidents/pages/incidents-page'
import { IncidentDetailPage } from '@/features/incidents/pages/incident-detail-page'
import { EndpointsPage } from '@/features/endpoints/pages/endpoints-page'
import { EventsPage } from '@/features/events/pages/events-page'
import { AnalyticsPage } from '@/features/analytics/pages/analytics-page'
import { ReportsPage } from '@/features/reports/pages/reports-page'
import { SettingsPage } from '@/features/settings/pages/settings-page'
import { NotFoundPage } from '@/features/not-found/not-found-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'alerts',
        element: <AlertsPage />,
      },
      {
        path: 'alerts/:id',
        element: <AlertDetailPage />,
      },
      {
        path: 'incidents',
        element: <IncidentsPage />,
      },
      {
        path: 'incidents/:id',
        element: <IncidentDetailPage />,
      },
      {
        path: 'endpoints',
        element: <EndpointsPage />,
      },
      {
        path: 'events',
        element: <EventsPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
