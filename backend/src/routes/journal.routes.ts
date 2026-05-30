import { Router } from 'express';
import { createEntry, deleteEntry, listJournalEntries, updateEntry } from '../controllers/journal.controller.js';

export const journalRouter = Router();

journalRouter.get('/', listJournalEntries);
journalRouter.post('/', createEntry);
journalRouter.put('/:id', updateEntry);
journalRouter.delete('/:id', deleteEntry);
