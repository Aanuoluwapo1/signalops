import { Router } from 'express';
import { dbQueries } from '../db/database.js';
import type { EndpointAgentStatus } from '../db/types.js';

export const endpointsRouter = Router();

// GET /api/endpoints
endpointsRouter.get('/', (_req, res) => {
  try {
    const endpoints = dbQueries.getEndpoints();
    res.json({ success: true, count: endpoints.length, data: endpoints });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});

// PATCH /api/endpoints/:id/status
endpointsRouter.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body as { status: EndpointAgentStatus };
    if (!status) {
      return res.status(400).json({ success: false, error: 'Agent status is required' });
    }

    const updated = dbQueries.updateEndpointStatus(req.params.id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Endpoint not found' });
    }

    res.json({ success: true, message: `Endpoint status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
});
