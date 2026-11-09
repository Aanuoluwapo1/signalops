import type { SecurityReport } from '@/types/reports'

export const PRECONFIGURED_REPORTS: readonly SecurityReport[] = [
  {
    id: 'REP-2026-001',
    templateId: 'executive-summary',
    title: 'Executive Cybersecurity & Threat Landscape Brief',
    description: 'High-level synthesis of enterprise threat posture, active incidents, and response velocity for C-suite and Board.',
    category: 'Executive Leadership',
    generatedAt: '2026-11-07T14:30:00Z',
    classification: 'RESTRICTED // BOARD LEVEL',
    author: 'CISO Office & Lead SOC Analyst Reynolds',
    periodCovered: 'Q4 2026 Telemetry Period',
    sections: [
      {
        title: 'Executive Posture & Cyber Risk Overview',
        content:
          'During the observation period, the enterprise maintained a 99.8% fleet sensor operational rate across 1,842 endpoints. The Security Operations Center triaged 112 correlated security alerts, preventing multi-stage ransomware propagation and mitigating unauthorized Active Directory replication requests.',
        keyMetrics: [
          { label: 'Sensor Fleet Health', value: '99.8%' },
          { label: 'Mean Time to Acknowledge', value: '4.2m' },
          { label: 'Total Incidents Contained', value: '7' },
          { label: 'Critical Breaches Averted', value: '3' },
        ],
      },
      {
        title: 'Key Threat Vector Observations',
        content:
          'Adversary tactics concentrated predominantly in Credential Access (24 detections) and Defense Evasion (18 detections). Pass-the-Hash and process hollowing attempts were promptly detected by Sysmon rule signatures, enabling isolation of affected assets within an average of 16.4 minutes.',
      },
      {
        title: 'Strategic Recommendations',
        content:
          'Accelerate enforcement of hardware FIDO2 MFA tokens across all administrative and service accounts. Transition remaining unsegmented internal VLANs to zero-trust microsegmentation boundaries.',
      },
    ],
    telemetryTable: {
      title: 'Quarterly Critical Incident Breakdown',
      headers: ['Incident ID', 'Target Host / Asset', 'Vector', 'Resolution State', 'MTTR'],
      rows: [
        ['INC-401', 'DC-01.corp.internal', 'Credential Access (DCSync)', 'Contained', '18.5m'],
        ['INC-402', 'EXEC-LAPTOP-01.corp.internal', 'AiTM Phishing Token Replay', 'Eradicated', '14.2m'],
        ['INC-403', 'cloud-aws-prod-01', 'Exposed Cloud Root API Key', 'Resolved', '8.0m'],
        ['INC-405', 'FILE-SRV-02.corp.internal', 'Canary Ransomware Tripwire', 'Contained', '12.4m'],
      ],
    },
    isSynthetic: true,
  },
  {
    id: 'REP-2026-002',
    templateId: 'soc-24h-brief',
    title: 'Daily 24-Hour SOC Operations Operational Brief',
    description: 'Comprehensive operational telemetry report covering alert queue volume, triage SLAs, and shift transitions.',
    category: 'Daily Operations',
    generatedAt: '2026-11-07T15:00:00Z',
    classification: 'CONFIDENTIAL // SOC INTERNAL',
    author: 'Tier 2 SOC Shift Lead Reynolds',
    periodCovered: 'Past 24 Hours (00:00 - 24:00 UTC)',
    sections: [
      {
        title: 'Shift Handoff & Triage Performance',
        content:
          'Day Shift concluded with zero unassigned Critical alerts. Overall alert volume peaked at 14:00 UTC with 90 events per hour. Mean Time to Acknowledge averaged 4.2 minutes, beating our 15-minute operational SLA.',
        keyMetrics: [
          { label: '24h Ingested Alerts', value: '239' },
          { label: 'Open in Queue', value: '14' },
          { label: 'Active Incidents', value: '3' },
          { label: 'Sensors Quarantined', value: '4' },
        ],
      },
      {
        title: 'Ongoing Containment Operations',
        content:
          'Incident INC-401 remains under active containment on host DC-01.corp.internal with secondary isolation enabled on WKS-FIN-02. Network segmentation verified intact with no anomalous lateral RPC traffic observed in the last 2 hours.',
      },
    ],
    telemetryTable: {
      title: 'Priority Alerts Logged in Last 24 Hours',
      headers: ['Alert ID', 'Severity', 'Rule Name', 'Source Host', 'Status'],
      rows: [
        ['ALT-1042', 'Critical', 'Pass-the-Hash LSASS Memory Dump', 'DC-01.corp.internal', 'Investigating'],
        ['ALT-1043', 'High', 'Base64 Encoded PowerShell Cradle', 'FIN-WKS-09.corp.internal', 'Investigating'],
        ['ALT-1048', 'Critical', 'DCSync Replication DRSUAPI Request', 'DC-01.corp.internal', 'Open'],
        ['ALT-1056', 'Critical', 'Volume Shadow Copy Deletion (vssadmin)', 'FILE-SRV-02.corp.internal', 'Open'],
      ],
    },
    isSynthetic: true,
  },
  {
    id: 'REP-2026-003',
    templateId: 'incident-post-mortem',
    title: 'Incident Post-Mortem Report: Case INC-401',
    description: 'Detailed forensic root cause analysis, timeline breakdown, and remediation measures for Incident INC-401.',
    category: 'Forensic Case Study',
    generatedAt: '2026-11-07T13:50:00Z',
    classification: 'RESTRICTED // SOC RESPONSE',
    author: 'Incident Commander Reynolds & Forensic Lead Chen',
    periodCovered: 'Incident Lifecycle INC-401',
    sections: [
      {
        title: 'Incident Overview & Root Cause Analysis',
        content:
          'Adversary obtained backup operator credentials from an insecure developer script and initiated a Pass-the-Hash attack against DC-01.corp.internal. Automated Sigma rule detection flagged LSASS memory access, triggering immediate host network quarantine.',
        keyMetrics: [
          { label: 'Initial Intrusion', value: '11:15 UTC' },
          { label: 'Detection Latency', value: '3.2m' },
          { label: 'Time to Host Isolation', value: '5.1m' },
          { label: 'Data Exfiltrated', value: '0 Bytes' },
        ],
      },
      {
        title: 'Containment & Remediation Actions Completed',
        content:
          '1. Network adapter on DC-01 unmapped from user VLAN.\n2. Krbtgt account password cycled across the forest twice.\n3. Compromised identity CORP\\svc_backup revoked in Active Directory.\n4. Memory forensic snapshot verified clean of persistent kernel rootkits.',
      },
    ],
    telemetryTable: {
      title: 'Forensic Event Timeline Sequence',
      headers: ['Timestamp', 'Host', 'Artifact', 'Verdict'],
      rows: [
        ['11:15:20 UTC', 'DC-01.corp.internal', 'Event 4662: DRSUAPI RPC Sync', 'Blocked'],
        ['11:18:40 UTC', 'DC-01.corp.internal', 'Sysmon 10: LSASS Memory Read', 'Detected'],
        ['11:23:50 UTC', 'DC-01.corp.internal', 'EDR Network Adapter Severed', 'Contained'],
        ['12:05:00 UTC', 'WKS-FIN-02.corp.internal', 'Endpoint Isolated from VLAN', 'Remediated'],
      ],
    },
    isSynthetic: true,
  },
  {
    id: 'REP-2026-004',
    templateId: 'compliance-audit',
    title: 'SOC 2 & ISO 27001 Security Controls Audit Report',
    description: 'Technical compliance audit covering access controls, encryption, EDR coverage, and audit log integrity.',
    category: 'Audit & Compliance',
    generatedAt: '2026-11-07T12:00:00Z',
    classification: 'AUDIT CONFIDENTIAL',
    author: 'Compliance Officer & Senior SOC Analyst',
    periodCovered: 'Annual Assessment Period',
    sections: [
      {
        title: 'Trust Services Criteria Audit Summary',
        content:
          'Evaluation against Security, Confidentiality, and Availability criteria confirmed complete alignment with zero non-conformances identified in SIEM log collection, endpoint sensor density, and incident response SLAs.',
        keyMetrics: [
          { label: 'EDR Fleet Coverage', value: '99.8%' },
          { label: 'Log Retention Compliance', value: '365 Days' },
          { label: 'Audit Log Integrity', value: '100% WORM' },
          { label: 'Compliance Score', value: '98.5 / 100' },
        ],
      },
      {
        title: 'Vulnerability Management Assessment',
        content:
          'All identified critical CVEs on production domain servers were verified as patched or mitigated with compensating network isolation controls within standard 7-day compliance windows.',
      },
    ],
    telemetryTable: {
      title: 'Compliance Controls Verification Matrix',
      headers: ['Control ID', 'Standard', 'Control Requirement', 'Verification Result'],
      rows: [
        ['CC6.1', 'SOC 2 Type II', 'Logical access restriction to domain controllers', 'Compliant'],
        ['CC6.8', 'SOC 2 Type II', 'Anti-malware & EDR sensor enforcement', 'Compliant (99.8%)'],
        ['A.12.4.1', 'ISO 27001:2022', 'Event logging and timestamp synchronization', 'Compliant (NTP Sync)'],
        ['A.16.1.5', 'ISO 27001:2022', 'Response to information security incidents', 'Compliant (<15m SLA)'],
      ],
    },
    isSynthetic: true,
  },
]

export function exportReportAsJson(report: SecurityReport): string {
  return JSON.stringify(report, null, 2)
}

export function exportReportAsCsv(report: SecurityReport): string {
  const headerLine = report.telemetryTable.headers.join(',')
  const rowLines = report.telemetryTable.rows.map((row) =>
    row.map((val) => `"${val.replace(/"/g, '""')}"`).join(','),
  )
  return [headerLine, ...rowLines].join('\n')
}
