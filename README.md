# SignalOps — Enterprise Security Operations Center (SOC) Platform

> **Next-Generation Cyber Threat Triage, Incident Response & Telemetry Simulation Platform**

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite 8](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-v5.0-4338CA?style=flat-square&logo=react&logoColor=white)](https://github.com/pmndrs/zustand)
[![Recharts](https://img.shields.io/badge/Recharts-v3.8-22C55E?style=flat-square&logo=d3.js&logoColor=white)](https://recharts.org/)
[![ESLint 10](https://img.shields.io/badge/ESLint-10.0-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gray?style=flat-square)](LICENSE)

---

## 1. Executive Overview

**SignalOps** is an advanced, high-performance Security Operations Center (SOC) management web platform engineered for Tier 1–3 security analysts, incident responders, and SecOps leadership. Built with modern web technologies (React 19, TypeScript 6, Vite 8, and Tailwind CSS v4), SignalOps delivers an enterprise-grade dark aesthetic optimized for high-density forensic analysis, rapid triage, and decisive threat containment.

The platform provides a unified operations interface bridging SIEM log exploration, detection rule tuning, alert queue triage, MITRE ATT&CK® tactical mapping, and multi-stage incident response workflows.

> **Simulation Disclaimer**: All telemetry, alerts, incidents, network flows, host identities, and CVE distributions within SignalOps are **100% synthetic**. The platform operates within a sandboxed simulation boundary designed for professional demonstration, workflow modeling, and cybersecurity interface research. No connection to live production infrastructure or real enterprise networks is established.

---

## 2. Core Feature Modules

SignalOps is structured into eight integrated capability domains:

### 1. Executive SOC Dashboard (`/dashboard`)
- **Key Performance Indicators**: Real-time telemetry cards tracking Active Threats, Endpoint Health, Open Incidents, and Mean Time to Acknowledge (MTTA).
- **24-Hour Telemetry Volume Ingestion**: Recharts Area chart visualizing hourly ingested security telemetry with peak threshold markers.
- **Severity Distribution Analysis**: Recharts donut chart detailing proportions of Critical, High, Medium, and Low severity indicators.
- **Priority Triage Stream**: Live preview table of newly detected anomalous activities with direct deep-linking to forensic dossiers.

### 2. Alert Management & Forensics (`/alerts`, `/alerts/:id`)
- **Multi-Attribute Queue**: Search across alert titles, IP addresses, affected hostnames, and MITRE ATT&CK techniques with real-time severity and status filtering.
- **Forensic Investigation Dossier**: Deep-dive alert inspect view providing source/destination network mapping, timeline context, and target host state.
- **Raw Event Payload Viewer**: Expandable, formatted JSON payload viewer with syntax highlighting and one-click clipboard copying.
- **Interactive Triage Actions**: Analyst-driven state transitions (`Open` → `Investigating` → `Resolved` / `False Positive`) with reactive state propagation.

### 3. Incident Response Command (`/incidents`, `/incidents/:id`)
- **Active Incident Queue**: Enterprise incident tracking featuring severity matrices, affected asset counts, assigned lead analysts, and lifecycle statuses.
- **Incident Creation Modal**: Rapid creation workflow allowing analysts to escalate alerts into structured incident dossiers.
- **Interactive Lifecycle Stepper**: Four-stage incident progression tracking (*Triage* → *Containment* → *Eradication* → *Resolved*) with timestamped phase verification.
- **Affected Assets & Quarantine**: Host inventory panel with instant one-click host isolation toggles to prevent lateral network movement.
- **Linked Alerts & Forensics**: Direct cross-referencing between overarching incidents and correlated trigger alerts.
- **Analyst Investigation Timeline**: Chronological, audit-trailed collaborative notes ledger with author attribution and real-time note injection.

### 4. Endpoint Fleet Inventory & Host Quarantine (`/endpoints`)
- **Fleet Health Overview**: Aggregate counts for Active Workstations, Domain Controllers, Linux Servers, and Isolated Nodes.
- **Endpoint State Management**: Host isolation and reinstatement capabilities with instant visual indicator updates across the platform.
- **Deep-Dive Inspection Modal**: Detailed modal showing OS build, agent version, assigned IP, MAC address, active CVEs, and assigned VLAN.

### 5. SIEM Event Explorer (`/events`)
- **Structured Log Analysis**: Real-time tabular stream of synthetic Windows Security Events (4624, 4625, 4688, 7040) and Sysmon telemetry (Event IDs 1, 3, 10).
- **Multi-Field Telemetry Filtering**: Filter by Event ID, source host, logging provider, or severity level.
- **Structured Event Inspection**: Side-by-side view comparing parsed key-value security pairs against raw JSON Syslog formatting.

### 6. Threat Analytics & ATT&CK Distribution (`/analytics`)
- **MITRE ATT&CK® Tactic Matrix**: Frequency distribution horizontal bar chart analyzing tactic incidence (Initial Access, Execution, Persistence, Lateral Movement, Exfiltration).
- **Analyst Velocity (MTTA vs MTTR)**: Dual-series line chart tracking team triage and response efficiency against a 15-minute SLA benchmark.
- **Fleet Vulnerability Breakdown**: Pie chart displaying enterprise CVE distributions across Critical, High, Medium, and Low vulnerability classifications.

### 7. Security Reports & Compliance Center (`/reports`)
- **Pre-Configured Audit Templates**: Out-of-the-box templates including *Executive Summary*, *24-Hour SOC Operations Brief*, *Incident Post-Mortem*, and *NIST SP 800-61 Compliance Audit*.
- **Report Preview Drawer**: Detailed executive summary view, telemetry tables, and mitigation recommendation matrices.
- **Multi-Format Export Simulator**: Realistic download triggers for JSON data packages, CSV metrics, and printable audit-ready PDF formats.

### 8. Platform Settings & Simulation Controls (`/settings`)
- **Sigma Detection Rule Catalog**: Enable, disable, and tune severity ratings for production detection rules (DCSync, PowerShell Obfuscation, Kerberoasting).
- **Simulation Harness Controls**: Adjust simulated Events Per Second (50 EPS, 250 EPS, 1,000 EPS) and trigger on-demand adversary replay scenarios (*Mimikatz DCSync*, *Process Hollowing*, *Ransomware Canary*).
- **SIEM & ChatOps Webhooks**: Manage webhook integrations (Slack, Microsoft Teams, PagerDuty, Splunk HEC) with live simulated ping connectivity tests.
- **Analyst Profile & Key Rotation**: Manage Tier 2 analyst identity, shift schedules, and simulated API token rotation with real-time feedback.

---

## 3. Technology Stack & Architecture

SignalOps follows a strict **Feature-Based Modular Architecture** prioritizing decoupled feature domains, granular state stores, and strict type safety:

```
src/
├── app/                  # Application root, Router configuration & providers
├── components/           # Cross-cutting UI primitives & application shell
│   ├── layout/           # AppShell, Sidebar, Header, Breadcrumbs, Global Search
│   ├── shared/           # Status badges, severity indicators, metrics cards
│   └── ui/               # Reusable atomic UI primitives
├── features/             # Domain-specific feature modules
│   ├── alerts/           # Alerts triage queue, forensics & Zustand store
│   ├── analytics/        # ATT&CK distribution & MTTA/MTTR visual analytics
│   ├── dashboard/        # Executive overview, KPI metrics & ingestion charts
│   ├── endpoints/        # Host inventory, quarantine controls & status store
│   ├── events/           # SIEM event explorer, Sysmon parser & filter store
│   ├── incidents/        # Incident response, lifecycle stepper & notes store
│   ├── reports/          # Audit templates, preview modal & export simulator
│   └── settings/         # Detection rules, replay harness & webhooks store
├── lib/                  # Shared utility functions (class merging, formatters)
├── stores/               # Global cross-cutting state (navigation, UI preferences)
├── styles/               # Tailwind CSS v4 design tokens and theme variables
└── types/                # Domain-wide TypeScript type contracts
```

### Core Technologies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime & UI** | React 19.2 | Concurrent rendering, modern hooks, functional component architecture |
| **Language** | TypeScript 6.0 | Strict type safety with `erasableSyntaxOnly` and union type definitions |
| **Build & Tooling** | Vite 8.3 & Rolldown | Sub-second HMR and optimized tree-shaken production bundles |
| **Styling** | Tailwind CSS v4 | CSS-first configuration, native OKLCH dark-navy theme variables |
| **State Management** | Zustand 5.0 | Lightweight, decoupled, reactive state stores with zero boilerplate |
| **Data Visualization** | Recharts 3.8 | Dark-theme responsive SVG Area, Bar, Line, and Donut visualizations |
| **Routing** | React Router v7 | Nested route definitions, parameter parsing, dynamic active links |
| **Icons** | Lucide React | Clean, consistent, lightweight SVG iconography |
| **Code Quality** | ESLint 10 (Flat Config) | Strict linting enforcement, zero-tolerance for unused variables |

---

## 4. Design System & Ergonomics

SignalOps employs a purpose-built **SOC Dark Enterprise** color palette engineered for long-shift operational ergonomics, high-contrast readability, and immediate tactical clarity:

- **Deep Navy Background**: Layered surfaces (`#060a12`, `#0a101f`, `#0f182e`) eliminate eye fatigue while providing depth.
- **Tactical Accents**: Electric Cyan (`#06b6d4`) and Tactical Blue (`#3b82f6`) provide focal hierarchy for interactive elements and primary telemetry streams.
- **Severity Color Tokens**:
  - `Critical`: Bright Crimson (`#ef4444` / `bg-red-500/10`)
  - `High`: Amber Orange (`#f97316` / `bg-orange-500/10`)
  - `Medium`: Warning Amber (`#f59e0b` / `bg-amber-500/10`)
  - `Low`: Information Sky (`#0ea5e9` / `bg-sky-500/10`)
- **Keyboard-Driven Workflow**: Global command palette accessible anywhere via <kbd>Ctrl</kbd> + <kbd>K</kbd> (or <kbd>⌘</kbd> + <kbd>K</kbd>) for instant navigation across alerts, incidents, endpoints, and system views.

---

## 5. Getting Started

### Prerequisites

- **Node.js**: `v20.19.0` or higher (tested on Node.js v22+)
- **npm**: `v10.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aanuoluwapo1/signalops.git
   cd signalops
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:5173` to explore the SignalOps dashboard.

4. **Verify TypeScript compilation & production build**:
   ```bash
   npm run build
   ```

5. **Execute ESLint code quality suite**:
   ```bash
   npm run lint
   ```

---

## 6. Technical Standards & Guidelines

- **Strict TypeScript 6 Rules**: The project enforces `erasableSyntaxOnly: true` and `verbatimModuleSyntax: true`. TypeScript `enum`s are strictly forbidden; string literal union types are utilized throughout.
- **Zero-Unused-Variables**: The project enforces `noUnusedLocals: true` and `noUnusedParameters: true` across all tsconfig targets.
- **Explicit Synthetic Labelling**: All synthetic mock services implement `{ isSynthetic: true }` markers to guarantee transparency.
- Detailed architecture and design standards are documented in [docs/architecture.md](docs/architecture.md).

---

## 7. License

Distributed under the MIT License. See `LICENSE` for more information.
