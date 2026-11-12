export interface ApiHealthResponse {
  status: string;
  service: string;
  version: string;
  database: string;
  uptimeSeconds: number;
  nodeVersion: string;
  memoryUsageMb: number;
  timestamp: string;
}

export const apiClient = {
  async checkHealth(): Promise<ApiHealthResponse | null> {
    try {
      const res = await fetch('/api/health');
      if (!res.ok) return null;
      return (await res.json()) as ApiHealthResponse;
    } catch {
      return null;
    }
  },

  async getAlerts(params?: { severity?: string; status?: string; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.severity) searchParams.set('severity', params.severity);
    if (params?.status) searchParams.set('status', params.status);
    if (params?.search) searchParams.set('search', params.search);

    const res = await fetch(`/api/alerts?${searchParams.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return res.json();
  },

  async updateAlertStatus(id: string, status: string) {
    const res = await fetch(`/api/alerts/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update alert status');
    return res.json();
  },

  async getIncidents() {
    const res = await fetch('/api/incidents');
    if (!res.ok) throw new Error('Failed to fetch incidents');
    return res.json();
  },

  async updateIncidentStatus(id: string, status: string) {
    const res = await fetch(`/api/incidents/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to advance incident lifecycle');
    return res.json();
  },

  async addIncidentNote(incidentId: string, author: string, text: string) {
    const res = await fetch(`/api/incidents/${incidentId}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, text }),
    });
    if (!res.ok) throw new Error('Failed to add incident note');
    return res.json();
  },

  async toggleAssetIsolation(incidentId: string, hostname: string) {
    const res = await fetch(`/api/incidents/${incidentId}/assets/${hostname}/isolate`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to toggle asset isolation');
    return res.json();
  },

  async getEndpoints() {
    const res = await fetch('/api/endpoints');
    if (!res.ok) throw new Error('Failed to fetch endpoints');
    return res.json();
  },

  async getEvents() {
    const res = await fetch('/api/events');
    if (!res.ok) throw new Error('Failed to fetch SIEM events');
    return res.json();
  },

  async getKpi() {
    const res = await fetch('/api/kpi');
    if (!res.ok) throw new Error('Failed to fetch KPI metrics');
    return res.json();
  },
};
