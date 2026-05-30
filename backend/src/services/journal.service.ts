import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';
import type { JournalEntryInput } from '../validators/journal.validator.js';

function toDateOnly(date: string) {
  return new Date(`${date}T00:00:00.000Z`);
}

function toEndOfDate(date: string) {
  return new Date(`${date}T23:59:59.999Z`);
}

function serializeEntry(entry: Awaited<ReturnType<typeof prisma.journalEntry.findFirst>>) {
  if (!entry) return entry;
  return {
    ...entry,
    workDate: entry.workDate.toISOString().slice(0, 10),
    volume: Number(entry.volume),
  };
}

export async function getJournalEntries(params: { dateFrom?: string; dateTo?: string; sort: 'asc' | 'desc' }) {
  const where: Prisma.JournalEntryWhereInput = {};

  if (params.dateFrom || params.dateTo) {
    where.workDate = {
      ...(params.dateFrom ? { gte: toDateOnly(params.dateFrom) } : {}),
      ...(params.dateTo ? { lte: toEndOfDate(params.dateTo) } : {}),
    };
  }

  const entries = await prisma.journalEntry.findMany({
    where,
    include: { workType: true },
    orderBy: { workDate: params.sort },
  });

  return entries.map((entry) => ({
    ...entry,
    workDate: entry.workDate.toISOString().slice(0, 10),
    volume: Number(entry.volume),
  }));
}

export async function createJournalEntry(input: JournalEntryInput) {
  const entry = await prisma.journalEntry.create({
    data: {
      workDate: toDateOnly(input.workDate),
      workTypeId: input.workTypeId,
      volume: input.volume,
      unit: input.unit,
      executorName: input.executorName,
      comment: input.comment || null,
    },
    include: { workType: true },
  });

  return serializeEntry(entry);
}

export async function updateJournalEntry(id: number, input: JournalEntryInput) {
  const entry = await prisma.journalEntry.update({
    where: { id },
    data: {
      workDate: toDateOnly(input.workDate),
      workTypeId: input.workTypeId,
      volume: input.volume,
      unit: input.unit,
      executorName: input.executorName,
      comment: input.comment || null,
    },
    include: { workType: true },
  });

  return serializeEntry(entry);
}

export async function deleteJournalEntry(id: number) {
  await prisma.journalEntry.delete({ where: { id } });
}
