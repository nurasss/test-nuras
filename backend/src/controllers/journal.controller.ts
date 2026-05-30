import type { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { journalEntrySchema, journalQuerySchema } from '../validators/journal.validator.js';
import { createJournalEntry, deleteJournalEntry, getJournalEntries, updateJournalEntry } from '../services/journal.service.js';

function sendZodError(error: unknown, res: Response) {
  const issues = error instanceof Error && 'issues' in error ? (error as any).issues : [];
  return res.status(400).json({ message: 'Ошибка валидации', errors: issues });
}

export async function listJournalEntries(req: Request, res: Response, next: NextFunction) {
  try {
    const query = journalQuerySchema.parse(req.query);
    const entries = await getJournalEntries(query);
    res.json(entries);
  } catch (error) {
    next(error);
  }
}

export async function createEntry(req: Request, res: Response, next: NextFunction) {
  try {
    const input = journalEntrySchema.parse(req.body);
    const entry = await createJournalEntry(input);
    res.status(201).json(entry);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') return sendZodError(error, res);
    next(error);
  }
}

export async function updateEntry(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'Некорректный id записи' });

    const input = journalEntrySchema.parse(req.body);
    const entry = await updateJournalEntry(id, input);
    res.json(entry);
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') return sendZodError(error, res);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Запись не найдена' });
    }
    next(error);
  }
}

export async function deleteEntry(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'Некорректный id записи' });

    await deleteJournalEntry(id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Запись не найдена' });
    }
    next(error);
  }
}
