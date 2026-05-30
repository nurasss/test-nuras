import { prisma } from '../lib/prisma.js';

export async function getWorkTypes() {
  return prisma.workType.findMany({ orderBy: { name: 'asc' } });
}
