import { Router } from 'express';
import { dbQueries } from '../db/database.js';

export const kpiRouter = Router();

// GET /api/kpi
kpiRouter.get('/', (_req, res) => {
  try {
    const kpi = dbQueries.getKpiMetrics();
    res.json({ success: true, data: kpi });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});
