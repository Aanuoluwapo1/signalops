import { Router } from 'express';
import { dbQueries } from '../db/database.js';

export const rulesRouter = Router();

// GET /api/rules
rulesRouter.get('/', (_req, res) => {
  try {
    const rules = dbQueries.getDetectionRules();
    res.json({ success: true, count: rules.length, data: rules });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// PATCH /api/rules/:id/toggle
rulesRouter.patch('/:id/toggle', (req, res) => {
  try {
    const { enabled } = req.body as { enabled: boolean };
    const toggled = dbQueries.toggleDetectionRule(req.params.id, Boolean(enabled));
    if (!toggled) {
      return res.status(404).json({ success: false, error: 'Detection rule not found' });
    }
    res.json({ success: true, message: `Detection rule ${req.params.id} updated` });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});
