import 'dotenv/config';

export const config = {
  // Server
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV !== 'production',
  isProduction: process.env.NODE_ENV === 'production',

  // API
  apiUrl: process.env.VITE_API_URL || 'http://localhost:3001/api',

  // Database
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',

  // Delays (для симуляції в development)
  delays: {
    randomUser: 1500,
    postById: 800,
    allPosts: 600,
  },

  // Pagination
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 хвилин
    maxRequests: 100, // максимум 100 запитів на IP
  },
} as const;
