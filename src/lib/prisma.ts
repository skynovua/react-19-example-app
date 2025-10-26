import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const logLevels = process.env.NODE_ENV === 'production' 
  ? ['error' as const]
  : ['query' as const, 'error' as const, 'warn' as const];

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: logLevels,
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
