import express from 'express';
import cors from 'cors';
import { config } from './src/config';
import { apiRoutes } from './src/api/server';
import { errorHandler, notFoundHandler } from './src/middleware/errorHandler';
import { apiLimiter } from './src/middleware/rateLimiter';
import { prisma } from './src/lib/prisma';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting (apply to all API routes)
if (config.isProduction) {
  app.use('/api', apiLimiter);
}

// API Routes
app.use('/api', apiRoutes);

// Health check with DB verification
app.get('/health', async (_req, res) => {
  try {
    // Verify database connection
    await prisma.$queryRaw`SELECT 1`;
    
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: config.nodeEnv,
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'error', 
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('⚠️  SIGTERM received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('⚠️  SIGINT received, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(config.port, () => {
  console.log(`🚀 API server running at http://localhost:${config.port}`);
  console.log(`📊 Health check: http://localhost:${config.port}/health`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
});
