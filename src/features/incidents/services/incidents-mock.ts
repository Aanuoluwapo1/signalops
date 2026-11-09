import type { SecurityIncident } from '@/types/incidents'

export const INITIAL_SYNTHETIC_INCIDENTS: readonly SecurityIncident[] = [
  {
    id: 'INC-401',
    title: 'Suspected Lateral Movement & Active Directory Replica Compromise',
    severity: 'critical',
    status: 'containment',
    assignedAnalyst: 'Analyst Reynolds',
    createdTimestamp: '2026-11-07T11:20:00Z',
    updatedTimestamp: '2026-11-07T13:45:00Z',
    affectedAssetsCount: 4,
    affectedAssets: [
      { name: 'DC-01.corp.internal', type: 'host', ip: '10.0.1.15', status: 'isolated' },
      { name: 'FS-02.corp.internal', type: 'host', ip: '10.0.1.20', status: 'active' },
      { name: 'WKS-FIN-02.corp.internal', type: 'host', ip: '192.168.12.18', status: 'isolated' },
      { name: 'CORP\\svc_backup', type: 'identity', status: 'remediated' },
    ],
    linkedAlertIds: ['ALT-1042', 'ALT-1048', 'ALT-1056'],
    summary:
      'Adversary leveraged compromised backup service account credentials to execute Pass-the-Hash from a finance workstation against DC-01, subsequently issuing DCSync replication requests.',
    investigationNotes: [
      {
        id: 'note-101',
        author: 'Analyst Reynolds',
        timestamp: '2026-11-07T11:25:00Z',
        text: 'Incident initiated following correlation between ALT-1042 (LSASS memory dump) and ALT-1048 (DCSync replication).',
      },
      {
        id: 'note-102',
        author: 'Analyst Reynolds',
        timestamp: '2026-11-07T12:05:00Z',
        text: 'Primary network interface on DC-01 isolated from user VLAN. EDR host containment confirmed on WKS-FIN-02.',
      },
      {
        id: 'note-103',
        author: 'Analyst Chen',
        timestamp: '2026-11-07T13:40:00Z',
        text: 'Kerberos krbtgt account password rotation initiated. Active Directory replica integrity verification in progress.',
      },
    ],
    isSynthetic: true,
  },
  {
    id: 'INC-402',
    title: 'Executive Account Compromise via Adversary-in-the-Middle (AiTM)',
    severity: 'high',
    status: 'eradication',
    assignedAnalyst: 'Analyst Chen',
    createdTimestamp: '2026-11-07T10:15:00Z',
    updatedTimestamp: '2026-11-07T13:10:00Z',
    affectedAssetsCount: 3,
    affectedAssets: [
      { name: 'c.exec@corp.internal', type: 'identity', status: 'remediated' },
      { name: 'EXEC-LAPTOP-01.corp.internal', type: 'host', ip: '192.168.15.60', status: 'isolated' },
      { name: 'M365 Tenant Gateway', type: 'cloud', status: 'active' },
    ],
    linkedAlertIds: ['ALT-1043', 'ALT-1051'],
    summary:
      'C-Suite executive session cookies hijacked via reverse-proxy phishing site. Rogue mailbox forwarding rule created and suspicious Rundll32 process spawned from attached macro spreadsheet.',
    investigationNotes: [
      {
        id: 'note-201',
        author: 'Analyst Chen',
        timestamp: '2026-11-07T10:20:00Z',
        text: 'Executive mailbox session revoked via Azure Entra ID PowerShell. Forwarding rules to external domain removed.',
      },
      {
        id: 'note-202',
        author: 'Analyst Reynolds',
        timestamp: '2026-11-07T12:15:00Z',
        text: 'EXEC-LAPTOP-01 quarantined via EDR sensor. Forensic disk image acquisition completed.',
      },
    ],
    isSynthetic: true,
  },
  {
    id: 'INC-403',
    title: 'Production Cloud AWS Root Credential Leak on Public Repository',
    severity: 'high',
    status: 'resolved',
    assignedAnalyst: 'Analyst Reynolds',
    createdTimestamp: '2026-11-07T08:30:00Z',
    updatedTimestamp: '2026-11-07T11:45:00Z',
    affectedAssetsCount: 2,
    affectedAssets: [
      { name: 'arn:aws:iam::123456789012:root', type: 'cloud', status: 'remediated' },
      { name: 'AWS Production VPC', type: 'cloud', status: 'active' },
    ],
    linkedAlertIds: ['ALT-1050'],
    summary:
      'Developer mistakenly pushed terraform configuration containing active AWS root access key to public repository. Alert ALT-1050 flagged console login from unindexed external ASN.',
    investigationNotes: [
      {
        id: 'note-301',
        author: 'Analyst Reynolds',
        timestamp: '2026-11-07T08:35:00Z',
        text: 'Root credentials deactivated in AWS IAM. Hardware FIDO2 MFA token bound to root user.',
      },
      {
        id: 'note-302',
        author: 'Analyst Reynolds',
        timestamp: '2026-11-07T11:40:00Z',
        text: 'CloudTrail audit verified no EC2 or S3 resource modifications occurred during the exposure window. Marked resolved.',
      },
    ],
    isSynthetic: true,
  },
  {
    id: 'INC-404',
    title: 'Multi-Host Cobalt Strike C2 Beaconing via Encrypted DNS Tunnel',
    severity: 'critical',
    status: 'triage',
    assignedAnalyst: 'Analyst Reynolds',
    createdTimestamp: '2026-11-07T12:45:00Z',
    updatedTimestamp: '2026-11-07T13:30:00Z',
    affectedAssetsCount: 3,
    affectedAssets: [
      { name: 'DEV-SRV-04.corp.internal', type: 'host', ip: '172.16.5.92', status: 'active' },
      { name: 'DEV-SRV-09.corp.internal', type: 'host', ip: '192.168.18.90', status: 'active' },
      { name: 'tunnel.c2domain.net', type: 'network', status: 'isolated' },
    ],
    linkedAlertIds: ['ALT-1044', 'ALT-1054'],
    summary:
      'High-entropy DNS TXT queries and recurring 60s jittered outbound TCP traffic detected across multiple development staging servers communicating with external adversary infrastructure.',
    investigationNotes: [
      {
        id: 'note-401',
        author: 'Analyst Rodriguez',
        timestamp: '2026-11-07T12:50:00Z',
        text: 'Perimeter firewall block rule applied for domain tunnel.c2domain.net and IP 198.51.100.24.',
      },
    ],
    isSynthetic: true,
  },
  {
    id: 'INC-405',
    title: 'Canary Honeypot Trigger & Ransomware Staging on File Servers',
    severity: 'critical',
    status: 'containment',
    assignedAnalyst: 'Analyst Reynolds',
    createdTimestamp: '2026-11-07T07:15:00Z',
    updatedTimestamp: '2026-11-07T12:00:00Z',
    affectedAssetsCount: 2,
    affectedAssets: [
      { name: 'FILE-SRV-02.corp.internal', type: 'host', ip: '10.0.1.25', status: 'isolated' },
      { name: 'D:\\Shares\\Finance', type: 'host', status: 'isolated' },
    ],
    linkedAlertIds: ['ALT-1056', 'ALT-1058'],
    summary:
      'Mass file renaming with extension .locked accompanied by Volume Shadow Copy deletion on primary financial file server. Automated EDR quarantine engaged.',
    investigationNotes: [
      {
        id: 'note-501',
        author: 'Analyst Reynolds',
        timestamp: '2026-11-07T07:18:00Z',
        text: 'SMB shares unmounted across network. EDR network quarantine confirmed on FILE-SRV-02.',
      },
      {
        id: 'note-502',
        author: 'Analyst Reynolds',
        timestamp: '2026-11-07T09:30:00Z',
        text: 'Shadow copy backup snapshots verified on immutable offline storage.',
      },
    ],
    isSynthetic: true,
  },
  {
    id: 'INC-406',
    title: 'Unauthorized Local Administrator Provisioning Across Workstations',
    severity: 'medium',
    status: 'triage',
    assignedAnalyst: 'Analyst Kowalski',
    createdTimestamp: '2026-11-07T06:35:00Z',
    updatedTimestamp: '2026-11-07T08:15:00Z',
    affectedAssetsCount: 2,
    affectedAssets: [
      { name: 'WKS-FIN-02.corp.internal', type: 'host', ip: '192.168.12.18', status: 'active' },
      { name: 'HR-PC-18.corp.internal', type: 'host', ip: '192.168.14.102', status: 'active' },
    ],
    linkedAlertIds: ['ALT-1057', 'ALT-1046'],
    summary:
      'Rogue local administrator account "backup_admin" added via command line on two endpoints outside standard IT change management window.',
    investigationNotes: [
      {
        id: 'note-601',
        author: 'Analyst Kowalski',
        timestamp: '2026-11-07T06:40:00Z',
        text: 'Reaching out to desktop operations lead to verify if scheduled maintenance task was authorized.',
      },
    ],
    isSynthetic: true,
  },
  {
    id: 'INC-407',
    title: 'Distributed Kerberos Password Spray & Internal SMB Sweep',
    severity: 'medium',
    status: 'resolved',
    assignedAnalyst: 'Analyst Chen',
    createdTimestamp: '2026-11-07T09:25:00Z',
    updatedTimestamp: '2026-11-07T12:30:00Z',
    affectedAssetsCount: 2,
    affectedAssets: [
      { name: 'AUTH-GW-02.corp.internal', type: 'host', ip: '10.0.2.8', status: 'remediated' },
      { name: '10.0.2.8 (Internal Gateway)', type: 'network', status: 'active' },
    ],
    linkedAlertIds: ['ALT-1045', 'ALT-1052'],
    summary:
      'Sequential SMB probes and repeated failed Kerberos pre-authentications from compromised internal gateway endpoint. Gateway isolated and credentials cycled.',
    investigationNotes: [
      {
        id: 'note-701',
        author: 'Analyst Chen',
        timestamp: '2026-11-07T09:30:00Z',
        text: 'Account lockout threshold engaged on Active Directory. Gateway IP blocked at internal switch core.',
      },
      {
        id: 'note-702',
        author: 'Analyst Chen',
        timestamp: '2026-11-07T12:25:00Z',
        text: 'Firmware on AUTH-GW-02 re-flashed and root credentials regenerated. All lockouts cleared.',
      },
    ],
    isSynthetic: true,
  },
]
