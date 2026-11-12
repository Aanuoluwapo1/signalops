# SignalOps — Enterprise Security Operations Center (SOC) Platform

> **Next-Generation Full-Stack Cyber Threat Triage, Incident Response & Telemetry Platform**

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js 26](https://img.shields.io/badge/Node.js-26.13-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express 5](https://img.shields.io/badge/Express-5.3-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![SQLite WAL](https://img.shields.io/badge/SQLite-node:sqlite_WAL-003B57?style=flat-square&logo=sqlite&logoColor=white)](https://sqlite.org/)
[![Vite 8](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-v5.1-4338CA?style=flat-square&logo=react&logoColor=white)](https://github.com/pmndrs/zustand)
[![Recharts](https://img.shields.io/badge/Recharts-v3.10-22C55E?style=flat-square&logo=d3.js&logoColor=white)](https://recharts.org/)
[![ESLint 10](https://img.shields.io/badge/ESLint-10.1-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gray?style=flat-square)](LICENSE)

---

## 1. Executive Overview

**SignalOps** is a production-grade, full-stack Security Operations Center (SOC) management platform engineered for Tier 1–3 security analysts, incident responders, and SecOps leadership. Built with **React 19, TypeScript 6, Node.js 26, Express 5, and SQLite (WAL mode)**, SignalOps delivers an enterprise-grade dark aesthetic optimized for high-density forensic analysis, rapid triage, decisive threat containment, and persistent audit logging.

The platform provides a unified operations interface bridging SIEM log exploration, detection rule tuning, alert queue triage, MITRE ATT&CK® tactical mapping, and multi-stage incident response workflows backed by a persistent relational database.

> **Simulation Disclaimer**: All telemetry, alerts, incidents, network flows, host identities, and CVE distributions within SignalOps are **100% synthetic**. The platform operates within a sandboxed simulation boundary designed for professional demonstration, workflow modeling, and cybersecurity interface research. No connection to live production infrastructure or real enterprise networks is established.

---

## 2. Core Feature Modules

SignalOps is structured into eight integrated capability domains:

### 1. Executive SOC Dashboard (`/dashboard`)
- **Key Performance Indicators**: Real-time telemetry cards tracking Active Threats, Endpoint Health, Open Incidents, and Mean Time to Acknowledge (MTTA) calculated live from database state.
- **24-Hour Telemetry Volume Ingestion**: Recharts Area chart visualizing hourly ingested security telemetry with peak threshold markers.
- **Severity Distribution Analysis**: Recharts donut chart detailing proportions of Critical, High, Medium, and Low severity indicators.
- **Priority Triage Stream**: Live preview table of newly detected anomalous activities with direct deep-linking to forensic dossiers.

### 2. Alert Management & Forensics (`/alerts`, `/alerts/:id`)
- **Multi-Attribute Queue**: Search across alert titles, IP addresses, affected hostnames, and MITRE ATT&CK techniques with real-time severity and status filtering.
- **Forensic Investigation Dossier**: Deep-dive alert inspect view providing source/destination network mapping, timeline context, and target host state.
- **Raw Event Payload Viewer**: Expandable, formatted JSON payload viewer with syntax highlighting and one-click clipboard copying.
- **Persistent Triage Actions**: Analyst-driven state transitions (`OPEN` → `INVESTIGATING` → `RESOLVED` / `FALSE_POSITIVE`) committed directly to SQLite database.

### 3. Incident Response Command (`/incidents`, `/incidents/:id`)
- **Active Incident Queue**: Enterprise incident tracking featuring severity matrices, affected asset counts, assigned lead analysts, and lifecycle statuses.
- **Incident Creation Modal**: Rapid creation workflow allowing analysts to escalate alerts into structured incident dossiers persisted to database.
- **Interactive Lifecycle Stepper**: Four-stage incident progression tracking (*Triage* → *Containment* → *Eradication* → *Resolved*) with timestamped phase verification.
- **Affected Assets & Quarantine**: Host inventory panel with instant one-click host isolation toggles synchronized across endpoints.
- **Linked Alerts & Forensics**: Direct cross-referencing between overarching incidents and correlated trigger alerts.
- **Analyst Investigation Timeline**: Chronological, audit-trailed collaborative notes ledger with author attribution and real-time database insertion.

### 4. Endpoint Fleet Inventory & Host Quarantine (`/endpoints`)
- **Fleet Health Overview**: Aggregate counts for Active Workstations, Domain Controllers, Linux Servers, and Isolated Nodes.
- **Endpoint State Management**: Host isolation and reinstatement capabilities with instant visual indicator updates across the platform.
- **Deep-Dive Inspection Modal**: Detailed modal showing OS build, agent version, assigned IP, MAC address, active CVEs, and assigned VLAN.

### 5. SIEM Event Explorer (`/events`)
- **Structured Log Analysis**: Real-time tabular stream of Windows Security Events (4624, 4625, 4688, 7040) and Sysmon telemetry (Event IDs 1, 3, 10).
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
- **Sigma Detection Rule Catalog**: Enable, disable, and tune severity ratings for production detection rules (DCSync, PowerShell Obfuscation, Kerberoasting) stored in SQLite.
- **Simulation Harness Controls**: Adjust simulated Events Per Second (50 EPS, 250 EPS, 1,000 EPS) and trigger on-demand adversary replay scenarios.
- **SIEM & ChatOps Webhooks**: Manage webhook integrations (Slack, Microsoft Teams, PagerDuty, Splunk HEC) with live simulated ping connectivity tests.
- **Analyst Profile & Key Rotation**: Manage Tier 2 analyst identity, shift schedules, and simulated API token rotation with real-time feedback.

---

## 3. Full-Stack Architecture & REST API

SignalOps combines a modern React 19 client with an Express 5 REST API and an embedded SQLite database using Node's native `node:sqlite` driver in Write-Ahead Logging (WAL) mode:

```
┌──────────────────────────────────────────────────────────┐
│             SignalOps React 19 Frontend (Port 5173)      │
│  Zustand Stores │ TanStack Query │ Vite Reverse Proxy     │
└─────────────────────────────┬────────────────────────────┘
                              │ HTTP / JSON (Proxy /api)
                              ▼
┌──────────────────────────────────────────────────────────┐
│           Express 5 TypeScript REST API (Port 3001)       │
│  - Request Logging & CORS                                │
│  - Centralized Error Handling                            │
│  - Parameter Validation & Sanitization                   │
└─────────────────────────────┬────────────────────────────┘
                              │ Native Synchronous SQL Queries
                              ▼
┌──────────────────────────────────────────────────────────┐
│       Embedded SQLite Database (data/signalops.db)        │
│  - PRAGMA journal_mode = WAL                             │
│  - Relational Foreign Keys & Cascades                    │
│  - Seed Fixtures & Auto-Migrations                       │
└──────────────────────────────────────────────────────────┘
```

### REST API Endpoints Specification

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service status, database engine, uptime, memory, node version |
| `GET` | `/api/kpi` | Real-time computed KPIs (active threats, host health %, open incidents, MTTA) |
| `GET` | `/api/alerts` | Query alerts with `severity`, `status`, and `search` filters |
| `GET` | `/api/alerts/:id` | Retrieve forensic details for a specific alert |
| `PATCH` | `/api/alerts/:id/status` | Update alert triage status (`OPEN`, `INVESTIGATING`, `RESOLVED`, `FALSE_POSITIVE`) |
| `GET` | `/api/incidents` | List all incidents with joined affected assets, notes count, and linked alerts |
| `GET` | `/api/incidents/:id` | Full incident dossier with chronological notes timeline |
| `POST` | `/api/incidents` | Create a new security incident record |
| `PATCH` | `/api/incidents/:id/status` | Advance incident lifecycle (*Triage* &rarr; *Containment* &rarr; *Eradication* &rarr; *Resolved*) |
| `POST` | `/api/incidents/:id/notes` | Add timestamped analyst investigation note |
| `POST` | `/api/incidents/:id/assets/:host/isolate` | Toggle host network quarantine status |
| `GET` | `/api/endpoints` | Fleet inventory with active alerts and vulnerability counts |
| `PATCH` | `/api/endpoints/:id/status` | Update endpoint agent status (`active` ↔ `isolated`) |
| `GET` | `/api/events` | Structured SIEM event log stream |
| `GET` | `/api/rules` | Detection rules catalog |
| `PATCH` | `/api/rules/:id/toggle` | Enable or disable a detection rule |

---

## 4. Technology Stack & Structure

```
signalops/
├── data/                 # SQLite database storage (signalops.db, WAL files)
├── docs/                 # Architecture guides & engineering documentation
├── server/               # Full-Stack Backend API (Express + TypeScript + SQLite)
│   ├── db/               # Database connection, schemas, types & seed data
│   │   ├── database.ts   # node:sqlite connection & prepared queries
│   │   ├── seed-data.ts  # Initial enterprise seed fixtures
│   │   └── types.ts      # Database entity contracts
│   ├── routes/           # Modular REST route handlers
│   │   ├── alerts.routes.ts
│   │   ├── endpoints.routes.ts
│   │   ├── events.routes.ts
│   │   ├── incidents.routes.ts
│   │   ├── kpi.routes.ts
│   │   └── rules.routes.ts
│   ├── app.ts            # Express application configuration & middleware
│   ├── index.ts          # Server listener on port 3001
│   └── tsconfig.json     # NodeNext TypeScript compiler configuration
└── src/                  # React 19 Frontend Application
    ├── app/              # Router & providers
    ├── components/       # Layout, shell & shared UI primitives
    ├── features/         # Domain-sliced features (alerts, incidents, etc.)
    ├── lib/              # API client & utility helpers
    └── styles/           # Tailwind CSS v4 design tokens
```

---

## 5. Getting Started

### Prerequisites

- **Node.js**: `v20.19.0` or higher (tested on Node.js `v26.13.0`)
- **npm**: `v10.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aanuoluwapo1/signalops.git
   cd signalops
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Start the Full-Stack Application**:

   **Terminal 1 (Backend API + SQLite Database)**:
   ```bash
   npm run server
   ```
   *The backend will automatically create `data/signalops.db`, apply schema tables, seed initial security telemetry, and listen on `http://localhost:3001`.*

   **Terminal 2 (Frontend Client)**:
   ```bash
   npm run dev
   ```
   *The Vite frontend starts on `http://localhost:5173` with automatic reverse proxy routing `/api` requests to the backend.*

4. **Verify TypeScript compilation & production build**:
   ```bash
   npm run build
   ```
   *(Executes `tsc -b` across frontend and backend references, followed by Vite production bundling).*

5. **Execute ESLint code quality suite**:
   ```bash
   npm run lint
   ```

---

## 6. Technical Standards & Guidelines

- **Strict TypeScript 6 Rules**: The project enforces `erasableSyntaxOnly: true` and `verbatimModuleSyntax: true`. TypeScript `enum`s are strictly forbidden; string literal union types are utilized throughout.
- **Zero-Unused-Variables**: The project enforces `noUnusedLocals: true` and `noUnusedParameters: true` across all tsconfig targets.
- **Native Embedded Database**: Zero external database server dependencies; leverages Node.js standard library `node:sqlite` in WAL mode for microsecond query latency.
- Detailed architecture and design standards are documented in [docs/architecture.md](docs/architecture.md).

---

## 7. License

Distributed under the MIT License. See `LICENSE` for more information.
