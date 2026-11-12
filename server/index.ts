import { app } from './app.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🛡️  SignalOps Enterprise SOC Backend API is LIVE!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🗄️  Database: SQLite (data/signalops.db)`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
