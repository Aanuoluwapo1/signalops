import express from 'express';
import cors from 'cors';
import { alertsRouter } from './routes/alerts.routes.js';
import { incidentsRouter } from './routes/incidents.routes.js';
import { endpointsRouter } from './routes/endpoints.routes.js';
import { eventsRouter } from './routes/events.routes.js';
import { rulesRouter } from './routes/rules.routes.js';
import { kpiRouter } from './routes/kpi.routes.js';

export const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Request logger for auditability
app.use((req, _res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Health & System status
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'online',
    service: 'SignalOps SOC Backend API',
    version: '1.0.0',
    database: 'SQLite (node:sqlite WAL mode)',
    uptimeSeconds: Math.floor(process.uptime()),
    nodeVersion: process.version,
    memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    timestamp: new Date().toISOString(),
  });
});

// Mount modular feature routes
app.use('/api/alerts', alertsRouter);
app.use('/api/incidents', incidentsRouter);
app.use('/api/endpoints', endpointsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/rules', rulesRouter);
app.use('/api/kpi', kpiRouter);

// 404 Handler for undefined API routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Endpoint not found: ${req.method} ${req.url}` });
});

// Centralized error handler
app.use((err: Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  void next;
  console.error('Unhandled server error:', err);
  res.status(500).json({ success: false, error: 'Internal server error', details: err.message });
});
