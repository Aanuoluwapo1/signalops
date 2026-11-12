# SignalOps — Technical Architecture & Engineering Guide

> **Enterprise Architecture, State Management, Design System & TypeScript 6 Engineering Standards**

---

## 1. Architectural Philosophy & Principles

SignalOps is architected to solve the usability and performance challenges typical of modern enterprise Security Operations Center (SOC) environments. The platform handles high-density, real-time security telemetry, multi-stage forensic analysis, and rapid remediation workflows.

### Core Architectural Tenets
1. **Domain-Driven Feature Slices**: Business logic, presentation components, mock data services, and state stores are grouped by operational domain (`src/features/*`), rather than technical layer.
2. **Deterministic Simulation Boundaries**: All security telemetry, log streams, vulnerability datasets, and endpoint states are synthetically generated and explicitly tagged (`{ isSynthetic: true }`).
3. **Zero-Overhead Reactive State**: Global and feature-level states are governed by decoupled Zustand stores with localized subscriptions to prevent cascade re-renders.
4. **Ergonomic SOC Design System**: Layered dark-navy surfaces, tactical cyan/blue accents, standardized severity indicators, and high data density.
5. **Strict TypeScript 6 Compliance**: Full adherence to modern compiler flags (`erasableSyntaxOnly`, `verbatimModuleSyntax`, `noUnusedLocals`).

```
+-------------------------------------------------------------------------+
|                        SignalOps Application Shell                      |
|      +-----------------------------------------------------------+      |
|      | Top Header (Breadcrumbs, Synthetic Banner, Profile Menu)   |      |
|      +-----------------------------------------------------------+      |
|      | Collapsible Sidebar  |  Main Content Workspace Area       |      |
|      | - Dashboard          |  - Fast Route Switching (Vite HMR) |      |
|      | - Alerts Queue       |  - Recharts Visualizations         |      |
|      | - Incidents Command  |  - High-Density Data Tables        |      |
|      | - Fleet Endpoints    |  - Forensic Modals & Drawers       |      |
|      | - Event Explorer     |  - Interactive Status Steppers     |      |
|      | - Threat Analytics   |                                    |      |
|      | - Reports Center     |                                    |      |
|      | - Platform Settings  |                                    |      |
+------+----------------------+------------------------------------+------+
|                  Decoupled Zustand State Stores                         |
|   useAlertsStore | useIncidentsStore | useEndpointsStore | useEventsStore|
+-------------------------------------------------------------------------+
|                     Synthetic Telemetry Services                        |
|  alerts-mock.ts | incidents-mock.ts | endpoints-mock.ts | events-mock.ts|
+-------------------------------------------------------------------------+
```

---

## 2. Directory Structure & Feature-Based Modular Pattern

The repository follows a clean **Feature-Sliced Architecture** designed to maximize code discoverability and eliminate circular dependencies.

```
src/
├── app/                              # Top-level application bootstrap
│   ├── app-router.tsx                # Centralized React Router route configuration
│   └── main.tsx                      # Vite React root entrypoint
├── components/                       # Shared across multiple feature domains
│   ├── layout/                       # Structural layout elements
│   │   ├── app-shell.tsx             # Responsive desktop/mobile application wrapper
│   │   ├── sidebar.tsx               # Collapsible desktop navigation bar
│   │   ├── mobile-nav.tsx            # Mobile slide-out drawer navigation
│   │   ├── header.tsx                # Top header bar with live breadcrumbs
│   │   ├── global-search.tsx         # Ctrl+K modal command palette
│   │   ├── analyst-menu.tsx          # Analyst profile dropdown
│   │   └── notifications-popover.tsx # Telemetry notification panel
│   ├── shared/                       # Domain-agnostic UI indicators
│   │   ├── severity-badge.tsx        # Critical/High/Medium/Low colored badges
│   │   ├── status-badge.tsx          # Lifecycle & alert status badges
│   │   └── page-header.tsx           # Standardized title & action bar
│   └── ui/                           # Primitive UI components (button, card, dialog)
├── features/                         # Autonomous feature slices
│   ├── alerts/                       # Alert queue, triage & forensic detail
│   │   ├── components/               # AlertStatusActions, RawLogViewer
│   │   ├── pages/                    # AlertsPage, AlertDetailPage
│   │   ├── services/                 # alerts-mock.ts (18 realistic synthetic alerts)
│   │   └── stores/                   # useAlertsStore (filtering, sorting, transitions)
│   ├── analytics/                    # Threat intelligence & performance metrics
│   │   ├── pages/                    # AnalyticsPage (ATT&CK, MTTA/MTTR, CVE spread)
│   │   └── services/                 # analytics-mock.ts
│   ├── dashboard/                    # SOC command landing interface
│   │   ├── components/               # KpiCard, AlertVolumeChart, SeverityChart
│   │   ├── pages/                    # DashboardPage
│   │   └── services/                 # dashboard-mock.ts
│   ├── endpoints/                    # Fleet management & quarantine
│   │   ├── components/               # EndpointDetailModal
│   │   ├── pages/                    # EndpointsPage
│   │   ├── services/                 # endpoints-mock.ts (16 synthetic endpoints)
│   │   └── stores/                   # useEndpointsStore (host isolation status)
│   ├── events/                       # SIEM event explorer
│   │   ├── components/               # EventDetailModal
│   │   ├── pages/                    # EventsPage
│   │   ├── services/                 # events-mock.ts (Windows Security & Sysmon)
│   │   └── stores/                   # useEventsStore
│   ├── incidents/                    # Multi-stage incident response
│   │   ├── components/               # LifecycleStepper, NotesTimeline, AssetsCard
│   │   ├── pages/                    # IncidentsPage, IncidentDetailPage
│   │   ├── services/                 # incidents-mock.ts (7 deep incident scenarios)
│   │   └── stores/                   # useIncidentsStore
│   ├── reports/                      # Compliance reporting & PDF/JSON export
│   │   ├── components/               # ReportPreviewModal
│   │   ├── pages/                    # ReportsPage
│   │   └── services/                 # reports-mock.ts
│   └── settings/                     # Platform configuration & simulation harness
│       ├── components/               # DetectionRules, SimulationHarness, Webhooks
│       ├── pages/                    # SettingsPage
│       ├── services/                 # settings-mock.ts
│       └── stores/                   # useSettingsStore
├── lib/                              # Shared utility helpers (cn class merger)
├── styles/                           # Global Tailwind CSS v4 stylesheets
└── types/                            # Domain type contracts (alert, incident, etc.)
```

### Feature Boundary Rules
1. **Self-Containment**: A feature must contain its own pages, UI components, mock services, and stores.
2. **One-Way Dependency Flow**: Feature components may import from `components/shared`, `components/ui`, `lib/`, and `types/`. Features must never directly import internal sub-components from another feature slice (cross-referencing occurs via route navigation or centralized stores).
3. **No Circular Imports**: Path aliases are configured as `@/*` -> `./src/*` to maintain clean, traceable import paths.

---

## 3. State Management & Telemetry Simulation Strategy

SignalOps implements a decentralized client-side state architecture using **Zustand 5**. Each major capability domain maintains its own isolated reactive store.

### Store Architecture & Responsibilities

| Store | Location | State & Actions |
| :--- | :--- | :--- |
| `useAlertsStore` | `src/features/alerts/stores/` | Manages 18 synthetic alerts, multi-attribute search, severity/status filters, sorting (timestamp, severity), pagination, and status transitions (`Open` → `Investigating` → `Resolved` / `False Positive`). |
| `useIncidentsStore` | `src/features/incidents/stores/` | Manages incident lifecycle progression (*Triage* → *Containment* → *Eradication* → *Resolved*), live analyst note insertion, affected asset quarantine toggling, and incident creation. |
| `useEndpointsStore` | `src/features/endpoints/stores/` | Fleet inventory tracking, search filtering, and one-click host isolation (`active` ↔ `isolated`). |
| `useEventsStore` | `src/features/events/stores/` | SIEM log stream pagination, filtering by Event ID / Host / Provider / Severity, and modal event inspection. |
| `useSettingsStore` | `src/features/settings/stores/` | Sigma detection rule enablement, EPS ingestion rates (50, 250, 1000 EPS), scenario replay injection, webhook test pings, and analyst credentials. |

### Store Implementation Pattern
Stores are authored as functional Zustand slices with explicit action signatures and immutable updates:

```typescript
// Example: src/features/incidents/stores/use-incidents-store.ts
export interface IncidentsState {
  incidents: IncidentRecord[];
  searchQuery: string;
  selectedSeverity: IncidentSeverity | 'ALL';
  selectedStatus: IncidentStatus | 'ALL';
  setSearchQuery: (query: string) => void;
  setSeverityFilter: (severity: IncidentSeverity | 'ALL') => void;
  setStatusFilter: (status: IncidentStatus | 'ALL') => void;
  advanceLifecycleStage: (incidentId: string, nextStatus: IncidentStatus) => void;
  addInvestigationNote: (incidentId: string, author: string, text: string) => void;
  toggleAssetQuarantine: (incidentId: string, assetHostname: string) => void;
  createIncident: (newIncident: Omit<IncidentRecord, 'id' | 'createdTimestamp' | 'updatedTimestamp' | 'isSynthetic'>) => string;
}
```

### Synthetic Data Contracts
To guarantee that simulated telemetry mirrors real SOC environments without creating external liabilities:
- Every mock entity is explicitly stamped with `{ isSynthetic: true }`.
- Windows Event IDs match official Microsoft security auditing specifications (e.g., Event ID `4624` for Successful Logon, `4625` for Failed Logon, `4688` for Process Creation).
- Sysmon logs represent real-world attack vectors (Event ID `1` for Process Create with malicious command lines, Event ID `3` for Network Connection, Event ID `10` for ProcessAccess).
- Attack scenarios are mapped directly to MITRE ATT&CK® Tactics & Techniques (e.g., `T1003.006` DCSync, `T1055.012` Process Hollowing).

---

## 4. Styling & Design System Tokens

SignalOps utilizes **Tailwind CSS v4** with `@tailwindcss/vite` integration. The design tokens are declared directly in CSS variables to establish a consistent, low-fatigue dark operations aesthetic.

### Theme Palette Tokens (`src/styles/globals.css`)

```css
@theme {
  --color-background: #060a12;     /* Canvas: Ultra-deep navy */
  --color-card: #0a101f;           /* Surface 1: Primary card panels */
  --color-card-elevated: #0f182e;  /* Surface 2: Hover states & active rows */
  --color-border: #1e293b;         /* Borders: Subtle, low-contrast slate */
  
  --color-accent-cyan: #06b6d4;    /* Primary highlight & active indicators */
  --color-accent-blue: #3b82f6;    /* Secondary actions & interactive buttons */
  
  --color-severity-critical: #ef4444; /* Alert/Incident Critical */
  --color-severity-high: #f97316;     /* Alert/Incident High */
  --color-severity-medium: #f59e0b;   /* Alert/Incident Medium */
  --color-severity-low: #0ea5e9;      /* Alert/Incident Low */
}
```

### Severity Visual Matrix

| Severity Level | Border Class | Badge Background | Text Class | Indicator Dot |
| :--- | :--- | :--- | :--- | :--- |
| **Critical** | `border-red-500/30` | `bg-red-500/10` | `text-red-400` | `bg-red-500` |
| **High** | `border-orange-500/30` | `bg-orange-500/10` | `text-orange-400` | `bg-orange-500` |
| **Medium** | `border-amber-500/30` | `bg-amber-500/10` | `text-amber-400` | `bg-amber-500` |
| **Low** | `border-sky-500/30` | `bg-sky-500/10` | `text-sky-400` | `bg-sky-500` |

### User Interface Ergonomics
- **Data Density**: Compact padding (`py-2 px-3`), dense table rows, and monospaced typography (`font-mono`) for timestamps, IP addresses, hashes, and process IDs.
- **Visual Hierarchy**: Layered visual depth achieved through surface tiering rather than heavy drop shadows.
- **Accessibility**: High-contrast foreground text (`#f8fafc`, `#94a3b8`) meeting WCAG AA requirements on deep-navy backgrounds.

---

## 5. Strict TypeScript 6 & Compilation Compliance

SignalOps is configured to meet the strictest standards of modern TypeScript development under TypeScript 6.0:

### Compiler Configuration Highlights (`tsconfig.app.json`)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "erasableSyntaxOnly": true,
    "verbatimModuleSyntax": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Key Engineering Rules

#### 1. Erasable Syntax Only (`erasableSyntaxOnly: true`)
TypeScript 6 strictly flags non-standard JavaScript syntax extensions. 
- **Enums are strictly prohibited**: TypeScript `enum`s generate runtime code structures that fail erasable syntax compilation (error `TS5101`).
- **Union types are required**: All enumerations are defined as string literal union types:
  ```typescript
  // STRICTLY FORBIDDEN:
  // export enum AlertSeverity { Critical, High, Medium, Low }

  // REQUIRED STANDARD:
  export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  export type AlertStatus = 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'FALSE_POSITIVE';
  ```

#### 2. Clean Import Discipline (`verbatimModuleSyntax: true`)
Type-only imports must be explicitly denoted to ensure clean tree-shaking and zero runtime artifact generation:
```typescript
import type { AlertRecord, AlertSeverity } from '@/types/alert';
import { useAlertsStore } from '@/features/alerts/stores/use-alerts-store';
```

#### 3. Path Aliasing Without Deprecated `baseUrl`
TypeScript 6 deprecates the `baseUrl` configuration option when using modern module resolution. Path resolution is achieved directly through the `paths` dictionary:
```json
"paths": {
  "@/*": ["./src/*"]
}
```
Matched seamlessly in `vite.config.ts` via:
```typescript
resolve: {
  alias: {
    '@': path.resolve(import.meta.dirname, './src'),
  },
}
```

---

## 6. Full-Stack Backend Architecture & Persistence Layer

SignalOps incorporates a dedicated, lightweight, high-performance REST API backend built on **Express 5** and **Node.js 26**, backed by an embedded **SQLite** database using Node's native `node:sqlite` standard library module.

```
+-----------------------------------------------------------------------------------+
|                        Client Layer (React 19 + TypeScript)                      |
|  - TanStack Query v5 & Zustand Stores                                             |
|  - BackendBadge (Active DB Health Monitoring at /api/health)                      |
|  - Vite Proxy: Transparent rewrite of /api requests to localhost:3001            |
+-----------------------------------------+-----------------------------------------+
                                          | HTTP / JSON REST Calls
                                          ▼
+-----------------------------------------------------------------------------------+
|                       Express 5 Server Layer (server/src)                         |
|  - Global CORS & JSON Body Parser                                                 |
|  - Timestamped Audit Request Logger                                               |
|  - Modular Routers: alerts, incidents, endpoints, events, rules, kpi              |
|  - Centralized Error Handling Middleware                                          |
+-----------------------------------------+-----------------------------------------+
                                          | Prepared Statements (DatabaseSync)
                                          ▼
+-----------------------------------------------------------------------------------+
|                   Embedded SQLite Database (data/signalops.db)                    |
|  - PRAGMA journal_mode = WAL (Write-Ahead Logging for concurrent throughput)      |
|  - PRAGMA foreign_keys = ON (Cascade deletes on incident notes & assets)          |
|  - Tables: alerts, incidents, incident_assets, incident_notes, endpoints, events  |
+-----------------------------------------------------------------------------------+
```

### Relational Database Schema & Entities

The relational database enforces data integrity through foreign keys and composite keys:

1. **`alerts` Table**: Primary operational telemetry store. Indexed on `severity`, `status`, and `timestamp` for sub-millisecond query performance.
2. **`incidents` Table**: Central incident response dossiers tracking `assigned_analyst`, `status` (*Triage* → *Containment* → *Eradication* → *Resolved*), and timestamps.
3. **`incident_assets` Table**: Maps affected hostnames and IPs to overarching incidents, with an `is_isolated` flag for active quarantine management.
4. **`incident_linked_alerts` Table**: Relational junction table linking multi-stage attack alerts directly into incident dossiers with `ON DELETE CASCADE`.
5. **`incident_notes` Table**: Audit-trailed chronological investigation notes with immutable author signatures.
6. **`endpoints` Table**: Inventory of enterprise workstations, servers, and domain controllers, tracking vulnerability counts and agent status.
7. **`events` Table**: High-volume SIEM log stream capturing Windows Event IDs (4624, 4625, 4688) and Sysmon logs (1, 3, 10).
8. **`detection_rules` Table**: Active Sigma detection rules with toggles and false-positive metrics.

### Dual-Mode Resilient Client Architecture

SignalOps implements a **graceful degradation architecture**:
- **Connected Mode**: When the backend server is running (`npm run server`), the React frontend automatically reads and writes persistent records directly to the SQLite database.
- **Standalone / Demo Mode**: If the backend is offline, the frontend seamlessly degrades to in-memory Zustand simulation stores, ensuring recruiters or reviewers can always test the UI without encountering broken pages.

---

## 7. Build, Lint & Verification Lifecycle

The platform enforces zero tolerance for build warnings, type errors, or lint discrepancies.

### Verification Commands
```bash
# Verify TypeScript strict type-checking across all project references
npm run build

# Run ESLint 10 with React 19 flat configuration rules
npm run lint

# Launch high-speed development server with Vite HMR
npm run dev

# Inspect production build preview
npm run preview
```

### CI/CD Quality Gates
Every contribution must pass two mandatory checkpoints:
1. `tsc -b` must exit with code `0` (zero compilation errors, zero unused variables).
2. `eslint .` must exit with code `0` (zero linting errors or formatting warnings).
