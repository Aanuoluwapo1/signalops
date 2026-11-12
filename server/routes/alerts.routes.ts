import { Router } from 'express';
import { dbQueries } from '../db/database.js';
import type { AlertLifecycleStatus } from '../db/types.js';

export const alertsRouter = Router();

// GET /api/alerts
alertsRouter.get('/', (req, res) => {
  try {
    const { severity, status, search } = req.query as { severity?: string; status?: string; search?: string };
    const alerts = dbQueries.getAlerts({ severity, status, search });
    res.json({ success: true, count: alerts.length, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// GET /api/alerts/:id
alertsRouter.get('/:id', (req, res) => {
  try {
    const alert = dbQueries.getAlertById(req.params.id);
    if (!alert) {
      return res.status(404).json({ success: false, error: 'Alert not found' });
    }
    res.json({ success: true, data: alert });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// PATCH /api/alerts/:id/status
alertsRouter.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body as { status: AlertLifecycleStatus };
    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required' });
    }

    const updated = dbQueries.updateAlertStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Alert not found' });
    }

    res.json({ success: true, message: `Alert status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});
