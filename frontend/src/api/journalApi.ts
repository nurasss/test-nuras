import type { JournalEntry, JournalEntryPayload, JournalFilters, WorkType } from '../types/journal';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Ошибка запроса' }));
    throw new Error(error.message ?? 'Ошибка запроса');
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

export function getJournalEntries(filters: JournalFilters) {
  const params = new URLSearchParams();
  if (filters.dateFrom) params.set('dateFrom', filters.dateFrom);
  if (filters.dateTo) params.set('dateTo', filters.dateTo);
  params.set('sort', filters.sort);
  return request<JournalEntry[]>(`/journal?${params.toString()}`);
}

export function createJournalEntry(payload: JournalEntryPayload) {
  return request<JournalEntry>('/journal', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateJournalEntry(id: number, payload: JournalEntryPayload) {
  return request<JournalEntry>(`/journal/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteJournalEntry(id: number) {
  return request<void>(`/journal/${id}`, { method: 'DELETE' });
}

export function getWorkTypes() {
  return request<WorkType[]>('/work-types');
}
