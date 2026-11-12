import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import {
  SEED_ALERTS,
  SEED_INCIDENTS,
  SEED_INCIDENT_ASSETS,
  SEED_INCIDENT_ALERTS,
  SEED_INCIDENT_NOTES,
  SEED_ENDPOINTS,
  SEED_EVENTS,
  SEED_RULES,
} from './seed-data.js';
import type {
  DbAlert,
  DbIncident,
  DbIncidentAsset,
  DbIncidentNote,
  DbEndpoint,
  DbEvent,
  DbDetectionRule,
  AlertLifecycleStatus,
  IncidentLifecycleStatus,
  EndpointAgentStatus,
} from './types.js';

const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'signalops.db');
export const db = new DatabaseSync(DB_PATH);

// Initialize Tables and Indices
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS alerts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    severity TEXT NOT NULL,
    status TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    category TEXT NOT NULL,
    source_ip TEXT NOT NULL,
    destination_ip TEXT NOT NULL,
    target_host TEXT NOT NULL,
    mitre_technique TEXT NOT NULL,
    raw_log TEXT NOT NULL,
    is_synthetic INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
  CREATE INDEX IF NOT EXISTS idx_alerts_status ON alerts(status);
  CREATE INDEX IF NOT EXISTS idx_alerts_timestamp ON alerts(timestamp DESC);

  CREATE TABLE IF NOT EXISTS incidents (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    severity TEXT NOT NULL,
    status TEXT NOT NULL,
    assigned_analyst TEXT NOT NULL,
    summary TEXT NOT NULL,
    created_timestamp TEXT NOT NULL,
    updated_timestamp TEXT NOT NULL,
    is_synthetic INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS incident_assets (
    incident_id TEXT NOT NULL,
    hostname TEXT NOT NULL,
    ip_address TEXT NOT NULL,
    is_isolated INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (incident_id, hostname),
    FOREIGN KEY (incident_id) REFERENCES incidents(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS incident_linked_alerts (
    incident_id TEXT NOT NULL,
    alert_id TEXT NOT NULL,
    PRIMARY KEY (incident_id, alert_id),
    FOREIGN KEY (incident_id) REFERENCES incidents(id) ON DELETE CASCADE,
    FOREIGN KEY (alert_id) REFERENCES alerts(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS incident_notes (
    id TEXT PRIMARY KEY,
    incident_id TEXT NOT NULL,
    author TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    text TEXT NOT NULL,
    FOREIGN KEY (incident_id) REFERENCES incidents(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS endpoints (
    id TEXT PRIMARY KEY,
    hostname TEXT NOT NULL,
    ip_address TEXT NOT NULL,
    operating_system TEXT NOT NULL,
    agent_status TEXT NOT NULL,
    last_heartbeat TEXT NOT NULL,
    vlan TEXT NOT NULL,
    active_alerts_count INTEGER NOT NULL DEFAULT 0,
    vuln_critical INTEGER NOT NULL DEFAULT 0,
    vuln_high INTEGER NOT NULL DEFAULT 0,
    vuln_medium INTEGER NOT NULL DEFAULT 0,
    vuln_low INTEGER NOT NULL DEFAULT 0,
    is_synthetic INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY,
    event_id INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    source_host TEXT NOT NULL,
    provider TEXT NOT NULL,
    level TEXT NOT NULL,
    message TEXT NOT NULL,
    raw_json TEXT NOT NULL,
    is_synthetic INTEGER NOT NULL DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS detection_rules (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    severity TEXT NOT NULL,
    enabled INTEGER NOT NULL DEFAULT 1,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    query TEXT NOT NULL,
    false_positive_rate TEXT NOT NULL
  );
`);

// Auto-seed initial data if empty
const countStmt = db.prepare('SELECT COUNT(*) as count FROM alerts');
const row = countStmt.get() as { count: number };

if (row.count === 0) {
  // Seed Alerts
  const insertAlert = db.prepare(`
    INSERT INTO alerts (id, title, severity, status, timestamp, category, source_ip, destination_ip, target_host, mitre_technique, raw_log, is_synthetic, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const a of SEED_ALERTS) {
    insertAlert.run(
      a.id,
      a.title,
      a.severity,
      a.status,
      a.timestamp,
      a.category,
      a.source_ip,
      a.destination_ip,
      a.target_host,
      a.mitre_technique,
      a.raw_log,
      a.is_synthetic,
      a.created_at,
      a.updated_at,
    );
  }

  // Seed Incidents
  const insertIncident = db.prepare(`
    INSERT INTO incidents (id, title, severity, status, assigned_analyst, summary, created_timestamp, updated_timestamp, is_synthetic, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const inc of SEED_INCIDENTS) {
    insertIncident.run(
      inc.id,
      inc.title,
      inc.severity,
      inc.status,
      inc.assigned_analyst,
      inc.summary,
      inc.created_timestamp,
      inc.updated_timestamp,
      inc.is_synthetic,
      inc.created_at,
    );
  }

  // Seed Incident Assets
  const insertAsset = db.prepare(`
    INSERT INTO incident_assets (incident_id, hostname, ip_address, is_isolated)
    VALUES (?, ?, ?, ?)
  `);
  for (const asset of SEED_INCIDENT_ASSETS) {
    insertAsset.run(asset.incident_id, asset.hostname, asset.ip_address, asset.is_isolated);
  }

  // Seed Incident Alerts
  const insertIncidentAlert = db.prepare(`
    INSERT INTO incident_linked_alerts (incident_id, alert_id)
    VALUES (?, ?)
  `);
  for (const ia of SEED_INCIDENT_ALERTS) {
    insertIncidentAlert.run(ia.incident_id, ia.alert_id);
  }

  // Seed Notes
  const insertNote = db.prepare(`
    INSERT INTO incident_notes (id, incident_id, author, timestamp, text)
    VALUES (?, ?, ?, ?, ?)
  `);
  for (const note of SEED_INCIDENT_NOTES) {
    insertNote.run(note.id, note.incident_id, note.author, note.timestamp, note.text);
  }

  // Seed Endpoints
  const insertEndpoint = db.prepare(`
    INSERT INTO endpoints (id, hostname, ip_address, operating_system, agent_status, last_heartbeat, vlan, active_alerts_count, vuln_critical, vuln_high, vuln_medium, vuln_low, is_synthetic)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const ep of SEED_ENDPOINTS) {
    insertEndpoint.run(
      ep.id,
      ep.hostname,
      ep.ip_address,
      ep.operating_system,
      ep.agent_status,
      ep.last_heartbeat,
      ep.vlan,
      ep.active_alerts_count,
      ep.vuln_critical,
      ep.vuln_high,
      ep.vuln_medium,
      ep.vuln_low,
      ep.is_synthetic,
    );
  }

  // Seed Events
  const insertEvent = db.prepare(`
    INSERT INTO events (id, event_id, timestamp, source_host, provider, level, message, raw_json, is_synthetic)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const ev of SEED_EVENTS) {
    insertEvent.run(
      ev.id,
      ev.event_id,
      ev.timestamp,
      ev.source_host,
      ev.provider,
      ev.level,
      ev.message,
      ev.raw_json,
      ev.is_synthetic,
    );
  }

  // Seed Rules
  const insertRule = db.prepare(`
    INSERT INTO detection_rules (id, title, severity, enabled, category, description, query, false_positive_rate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const r of SEED_RULES) {
    insertRule.run(r.id, r.title, r.severity, r.enabled, r.category, r.description, r.query, r.false_positive_rate);
  }
}

// Database Query Helpers
export const dbQueries = {
  getAlerts(filters?: { severity?: string; status?: string; search?: string }): DbAlert[] {
    let query = 'SELECT * FROM alerts WHERE 1=1';
    const params: string[] = [];

    if (filters?.severity && filters.severity !== 'ALL') {
      query += ' AND severity = ?';
      params.push(filters.severity.toUpperCase());
    }
    if (filters?.status && filters.status !== 'ALL') {
      query += ' AND status = ?';
      params.push(filters.status.toUpperCase());
    }
    if (filters?.search) {
      query += ' AND (title LIKE ? OR target_host LIKE ? OR source_ip LIKE ?)';
      const term = `%${filters.search}%`;
      params.push(term, term, term);
    }
    query += ' ORDER BY timestamp DESC';

    const stmt = db.prepare(query);
    return stmt.all(...params) as unknown as DbAlert[];
  },

  getAlertById(id: string): DbAlert | undefined {
    const stmt = db.prepare('SELECT * FROM alerts WHERE id = ?');
    return stmt.get(id) as unknown as DbAlert | undefined;
  },

  updateAlertStatus(id: string, status: AlertLifecycleStatus): boolean {
    const stmt = db.prepare('UPDATE alerts SET status = ?, updated_at = ? WHERE id = ?');
    const result = stmt.run(status, new Date().toISOString(), id);
    return Number(result.changes) > 0;
  },

  getIncidents(): (DbIncident & { assets: DbIncidentAsset[]; notes: DbIncidentNote[]; linkedAlertIds: string[] })[] {
    const stmt = db.prepare('SELECT * FROM incidents ORDER BY created_timestamp DESC');
    const incidents = stmt.all() as unknown as DbIncident[];

    return incidents.map((inc) => {
      const assetStmt = db.prepare('SELECT * FROM incident_assets WHERE incident_id = ?');
      const assets = assetStmt.all(inc.id) as unknown as DbIncidentAsset[];

      const noteStmt = db.prepare('SELECT * FROM incident_notes WHERE incident_id = ? ORDER BY timestamp ASC');
      const notes = noteStmt.all(inc.id) as unknown as DbIncidentNote[];

      const alertStmt = db.prepare('SELECT alert_id FROM incident_linked_alerts WHERE incident_id = ?');
      const alertRows = alertStmt.all(inc.id) as unknown as { alert_id: string }[];

      return {
        ...inc,
        assets,
        notes,
        linkedAlertIds: alertRows.map((r) => r.alert_id),
      };
    });
  },

  getIncidentById(id: string) {
    const stmt = db.prepare('SELECT * FROM incidents WHERE id = ?');
    const inc = stmt.get(id) as unknown as DbIncident | undefined;
    if (!inc) return undefined;

    const assetStmt = db.prepare('SELECT * FROM incident_assets WHERE incident_id = ?');
    const assets = assetStmt.all(id) as unknown as DbIncidentAsset[];

    const noteStmt = db.prepare('SELECT * FROM incident_notes WHERE incident_id = ? ORDER BY timestamp ASC');
    const notes = noteStmt.all(id) as unknown as DbIncidentNote[];

    const alertStmt = db.prepare('SELECT alert_id FROM incident_linked_alerts WHERE incident_id = ?');
    const alertRows = alertStmt.all(id) as unknown as { alert_id: string }[];

    return {
      ...inc,
      assets,
      notes,
      linkedAlertIds: alertRows.map((r) => r.alert_id),
    };
  },

  createIncident(data: {
    id: string;
    title: string;
    severity: string;
    status: IncidentLifecycleStatus;
    assigned_analyst: string;
    summary: string;
    affected_assets: { hostname: string; ip_address: string; is_isolated?: boolean }[];
    linked_alert_ids: string[];
  }): string {
    const now = new Date().toISOString();
    const insertInc = db.prepare(`
      INSERT INTO incidents (id, title, severity, status, assigned_analyst, summary, created_timestamp, updated_timestamp, is_synthetic, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
    `);
    insertInc.run(data.id, data.title, data.severity, data.status, data.assigned_analyst, data.summary, now, now, now);

    const insertAsset = db.prepare('INSERT INTO incident_assets (incident_id, hostname, ip_address, is_isolated) VALUES (?, ?, ?, ?)');
    for (const a of data.affected_assets) {
      insertAsset.run(data.id, a.hostname, a.ip_address, a.is_isolated ? 1 : 0);
    }

    const insertLink = db.prepare('INSERT INTO incident_linked_alerts (incident_id, alert_id) VALUES (?, ?)');
    for (const alertId of data.linked_alert_ids) {
      insertLink.run(data.id, alertId);
    }

    return data.id;
  },

  updateIncidentStatus(id: string, status: IncidentLifecycleStatus): boolean {
    const stmt = db.prepare('UPDATE incidents SET status = ?, updated_timestamp = ? WHERE id = ?');
    const result = stmt.run(status, new Date().toISOString(), id);
    return Number(result.changes) > 0;
  },

  addIncidentNote(incidentId: string, author: string, text: string): DbIncidentNote {
    const id = `NOTE-${Date.now()}`;
    const timestamp = new Date().toISOString();
    const stmt = db.prepare('INSERT INTO incident_notes (id, incident_id, author, timestamp, text) VALUES (?, ?, ?, ?, ?)');
    stmt.run(id, incidentId, author, timestamp, text);
    return { id, incident_id: incidentId, author, timestamp, text };
  },

  toggleAssetIsolation(incidentId: string, hostname: string): boolean {
    const getStmt = db.prepare('SELECT is_isolated FROM incident_assets WHERE incident_id = ? AND hostname = ?');
    const current = getStmt.get(incidentId, hostname) as { is_isolated: number } | undefined;
    if (!current) return false;

    const nextState = current.is_isolated === 1 ? 0 : 1;
    const updateStmt = db.prepare('UPDATE incident_assets SET is_isolated = ? WHERE incident_id = ? AND hostname = ?');
    updateStmt.run(nextState, incidentId, hostname);

    // Also sync with global endpoints table if host exists
    const updateEp = db.prepare('UPDATE endpoints SET agent_status = ? WHERE hostname = ?');
    updateEp.run(nextState === 1 ? 'isolated' : 'active', hostname);

    return true;
  },

  getEndpoints(): DbEndpoint[] {
    const stmt = db.prepare('SELECT * FROM endpoints ORDER BY hostname ASC');
    return stmt.all() as unknown as DbEndpoint[];
  },

  updateEndpointStatus(id: string, status: EndpointAgentStatus): boolean {
    const stmt = db.prepare('UPDATE endpoints SET agent_status = ? WHERE id = ?');
    const result = stmt.run(status, id);
    return Number(result.changes) > 0;
  },

  getEvents(limit = 50): DbEvent[] {
    const stmt = db.prepare('SELECT * FROM events ORDER BY timestamp DESC LIMIT ?');
    return stmt.all(limit) as unknown as DbEvent[];
  },

  getDetectionRules(): DbDetectionRule[] {
    const stmt = db.prepare('SELECT * FROM detection_rules ORDER BY id ASC');
    return stmt.all() as unknown as DbDetectionRule[];
  },

  toggleDetectionRule(id: string, enabled: boolean): boolean {
    const stmt = db.prepare('UPDATE detection_rules SET enabled = ? WHERE id = ?');
    const result = stmt.run(enabled ? 1 : 0, id);
    return Number(result.changes) > 0;
  },

  getKpiMetrics() {
    const activeAlerts = (db.prepare("SELECT COUNT(*) as count FROM alerts WHERE status IN ('OPEN', 'INVESTIGATING')").get() as { count: number }).count;
    const totalEndpoints = (db.prepare('SELECT COUNT(*) as count FROM endpoints').get() as { count: number }).count;
    const activeEndpoints = (db.prepare("SELECT COUNT(*) as count FROM endpoints WHERE agent_status = 'active'").get() as { count: number }).count;
    const openIncidents = (db.prepare("SELECT COUNT(*) as count FROM incidents WHERE status != 'RESOLVED'").get() as { count: number }).count;

    const endpointHealth = totalEndpoints > 0 ? Math.round((activeEndpoints / totalEndpoints) * 100) : 100;

    return {
      activeThreats: activeAlerts,
      endpointHealth,
      openIncidents,
      mttaMinutes: 4.2,
      databaseSizeBytes: fs.existsSync(DB_PATH) ? fs.statSync(DB_PATH).size : 0,
      timestamp: new Date().toISOString(),
    };
  },
};
