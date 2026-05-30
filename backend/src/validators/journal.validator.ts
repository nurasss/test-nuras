import { z } from 'zod';

export const journalEntrySchema = z.object({
  workDate: z.string().min(1, 'Дата выполнения обязательна'),
  workTypeId: z.coerce.number().int('Выберите вид работ').positive('Выберите вид работ'),
  volume: z.coerce.number().positive('Объём должен быть больше 0'),
  unit: z.string().trim().min(1, 'Единица измерения обязательна'),
  executorName: z.string().trim().min(2, 'ФИО исполнителя обязательно'),
  comment: z.string().trim().optional().or(z.literal('')),
});

export const journalQuerySchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  sort: z.enum(['asc', 'desc']).default('desc'),
});

export type JournalEntryInput = z.infer<typeof journalEntrySchema>;
