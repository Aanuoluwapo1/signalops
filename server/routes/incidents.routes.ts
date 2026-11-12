import { Router } from 'express';
import { dbQueries } from '../db/database.js';
import type { IncidentLifecycleStatus } from '../db/types.js';

export const incidentsRouter = Router();

// GET /api/incidents
incidentsRouter.get('/', (_req, res) => {
  try {
    const incidents = dbQueries.getIncidents();
    res.json({ success: true, count: incidents.length, data: incidents });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// GET /api/incidents/:id
incidentsRouter.get('/:id', (req, res) => {
  try {
    const incident = dbQueries.getIncidentById(req.params.id);
    if (!incident) {
      return res.status(404).json({ success: false, error: 'Incident not found' });
    }
    res.json({ success: true, data: incident });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// POST /api/incidents
incidentsRouter.post('/', (req, res) => {
  try {
    const { title, severity, status, assigned_analyst, summary, affected_assets, linked_alert_ids } = req.body;
    if (!title || !severity) {
      return res.status(400).json({ success: false, error: 'Title and severity are required' });
    }

    const id = `INC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 900) + 100)}`;
    const createdId = dbQueries.createIncident({
      id,
      title,
      severity,
      status: status || 'TRIAGE',
      assigned_analyst: assigned_analyst || 'Analyst Reynolds',
      summary: summary || '',
      affected_assets: affected_assets || [],
      linked_alert_ids: linked_alert_ids || [],
    });

    res.status(201).json({ success: true, incidentId: createdId, message: 'Incident created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// PATCH /api/incidents/:id/status
incidentsRouter.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body as { status: IncidentLifecycleStatus };
    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required' });
    }

    const updated = dbQueries.updateIncidentStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Incident not found' });
    }

    res.json({ success: true, message: `Incident lifecycle status advanced to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// POST /api/incidents/:id/notes
incidentsRouter.post('/:id/notes', (req, res) => {
  try {
    const { author, text } = req.body as { author: string; text: string };
    if (!text) {
      return res.status(400).json({ success: false, error: 'Note text is required' });
    }

    const note = dbQueries.addIncidentNote(req.params.id, author || 'Analyst Reynolds', text);
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// POST /api/incidents/:id/assets/:hostname/isolate
incidentsRouter.post('/:id/assets/:hostname/isolate', (req, res) => {
  try {
    const toggled = dbQueries.toggleAssetIsolation(req.params.id, req.params.hostname);
    if (!toggled) {
      return res.status(404).json({ success: false, error: 'Asset or incident not found' });
    }
    res.json({ success: true, message: `Isolation status toggled for host ${req.params.hostname}` });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});
