import { Router } from 'express';
import { dbQueries } from '../db/database.js';

export const eventsRouter = Router();

// GET /api/events
eventsRouter.get('/', (req, res) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 50;
    const events = dbQueries.getEvents(limit);
    res.json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});
