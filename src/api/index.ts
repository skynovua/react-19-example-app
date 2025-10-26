/**
 * API Module
 * 
 * Організація:
 * - client/  - Клієнтський код (для браузера)
 * - server/  - Серверний код (для Node.js/Express)
 * - types/   - Спільні типи та константи
 */

// Client API (для використання в React компонентах)
export * from './client';

// Server API (для використання в Express)
export * from './server';

// Shared types
export * from './types';
