// server.js — entry point
// Loads env vars, connects to MongoDB, mounts routes, starts the HTTP server.
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import { errorHandler } from './src/middleware/errorHandler.js';

import marketRoutes from './src/routes/markets.js';
import buyerRoutes from './src/routes/buyers.js';
import storageRoutes from './src/routes/storage.js';
import logisticsRoutes from './src/routes/logistics.js';
import recommendationRoutes from './src/routes/recommendation.js';
import qualityRoutes from './src/routes/quality.js';
import lotRoutes from './src/routes/lots.js';
import transactionRoutes from './src/routes/transactions.js';
import disputeRoutes from './src/routes/disputes.js';
import aiRoutes from './src/routes/ai.js';
import farmerRoutes from './src/routes/farmers.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); // 10mb to allow base64 crop images

// --- Routes ---
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'AgriSphere AI backend' }));

app.use('/api/farmers', farmerRoutes);
app.use('/api/markets', marketRoutes);
app.use('/api/buyers', buyerRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/logistics', logisticsRoutes);
app.use('/api/recommendation', recommendationRoutes);
app.use('/api/quality', qualityRoutes);
app.use('/api/lots', lotRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/disputes', disputeRoutes);
app.use('/api/ai', aiRoutes);

// 404 fallback
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// Centralized error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().finally(() => {
  // Even if MongoDB fails to connect, we still start the server so the
  // frontend demo does not completely die — routes that need DB will
  // return a clear fallback error instead of crashing the process.
  app.listen(PORT, () => {
    console.log(`AgriSphere AI backend running on http://localhost:${PORT}`);
  });
});
