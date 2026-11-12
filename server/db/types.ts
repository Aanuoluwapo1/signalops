export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type AlertLifecycleStatus = 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'FALSE_POSITIVE';
export type IncidentLifecycleStatus = 'TRIAGE' | 'CONTAINMENT' | 'ERADICATION' | 'RESOLVED';
export type EndpointAgentStatus = 'active' | 'disconnected' | 'isolated';

export interface DbAlert {
  id: string;
  title: string;
  severity: SeverityLevel;
  status: AlertLifecycleStatus;
  timestamp: string;
  category: string;
  source_ip: string;
  destination_ip: string;
  target_host: string;
  mitre_technique: string;
  raw_log: string;
  is_synthetic: number;
  created_at: string;
  updated_at: string;
}

export interface DbIncident {
  id: string;
  title: string;
  severity: SeverityLevel;
  status: IncidentLifecycleStatus;
  assigned_analyst: string;
  summary: string;
  created_timestamp: string;
  updated_timestamp: string;
  is_synthetic: number;
  created_at: string;
}

export interface DbIncidentAsset {
  incident_id: string;
  hostname: string;
  ip_address: string;
  is_isolated: number;
}

export interface DbIncidentLinkedAlert {
  incident_id: string;
  alert_id: string;
}

export interface DbIncidentNote {
  id: string;
  incident_id: string;
  author: string;
  timestamp: string;
  text: string;
}

export interface DbEndpoint {
  id: string;
  hostname: string;
  ip_address: string;
  operating_system: string;
  agent_status: EndpointAgentStatus;
  last_heartbeat: string;
  vlan: string;
  active_alerts_count: number;
  vuln_critical: number;
  vuln_high: number;
  vuln_medium: number;
  vuln_low: number;
  is_synthetic: number;
}

export interface DbEvent {
  id: string;
  event_id: number;
  timestamp: string;
  source_host: string;
  provider: string;
  level: SeverityLevel;
  message: string;
  raw_json: string;
  is_synthetic: number;
}

export interface DbDetectionRule {
  id: string;
  title: string;
  severity: SeverityLevel;
  enabled: number;
  category: string;
  description: string;
  query: string;
  false_positive_rate: string;
}
