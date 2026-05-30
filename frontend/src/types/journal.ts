export interface WorkType {
  id: number;
  name: string;
  createdAt: string;
}

export interface JournalEntry {
  id: number;
  workDate: string;
  workTypeId: number;
  workType: WorkType;
  volume: number;
  unit: string;
  executorName: string;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface JournalEntryPayload {
  workDate: string;
  workTypeId: number;
  volume: number;
  unit: string;
  executorName: string;
  comment?: string;
}

export interface JournalFilters {
  dateFrom: string;
  dateTo: string;
  sort: 'asc' | 'desc';
}
