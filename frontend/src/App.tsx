import { useEffect, useState } from 'react';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { JournalFilters } from './components/JournalFilters';
import { JournalForm } from './components/JournalForm';
import { JournalTable } from './components/JournalTable';
import { createJournalEntry, deleteJournalEntry, getJournalEntries, getWorkTypes, updateJournalEntry } from './api/journalApi';
import type { JournalEntry, JournalEntryPayload, JournalFilters as Filters, WorkType } from './types/journal';
import './styles.css';

const defaultFilters: Filters = { dateFrom: '', dateTo: '', sort: 'desc' };

function App() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [workTypes, setWorkTypes] = useState<WorkType[]>([]);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const [entryToDelete, setEntryToDelete] = useState<JournalEntry | null>(null);

  async function loadEntries(nextFilters = filters) {
    setLoading(true);
    setError('');
    try {
      const data = await getJournalEntries(nextFilters);
      setEntries(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Не удалось загрузить записи');
    } finally {
      setLoading(false);
    }
  }

  async function loadWorkTypes() {
    try {
      setWorkTypes(await getWorkTypes());
    } catch {
      setError('Не удалось загрузить справочник видов работ');
    }
  }

  useEffect(() => {
    void loadWorkTypes();
  }, []);

  useEffect(() => {
    void loadEntries(filters);
  }, [filters]);

  async function handleSubmit(payload: JournalEntryPayload) {
    if (editingEntry) {
      await updateJournalEntry(editingEntry.id, payload);
      setEditingEntry(null);
    } else {
      await createJournalEntry(payload);
    }
    await loadEntries();
  }

  async function handleConfirmDelete() {
    if (!entryToDelete) return;
    await deleteJournalEntry(entryToDelete.id);
    setEntryToDelete(null);
    await loadEntries();
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Construction Work Journal</p>
          <h1>Журнал работ на строительном объекте</h1>
          <p className="subtitle">Фиксация выполненных работ, объёмов, исполнителей и комментариев по датам.</p>
        </div>
      </header>

      {error && <div className="alert">{error}</div>}

      <JournalForm
        workTypes={workTypes}
        editingEntry={editingEntry}
        onSubmit={handleSubmit}
        onCancel={() => setEditingEntry(null)}
      />

      <section className="content-card">
        <div className="section-heading">
          <div>
            <h2>Записи журнала</h2>
            <p>Фильтруйте записи по дате и меняйте порядок сортировки.</p>
          </div>
        </div>

        <JournalFilters filters={filters} onChange={setFilters} />
        <JournalTable entries={entries} loading={loading} onEdit={setEditingEntry} onDelete={setEntryToDelete} />
      </section>

      {entryToDelete && (
        <ConfirmDeleteModal
          entryTitle={`${entryToDelete.workDate} — ${entryToDelete.workType.name}, ${entryToDelete.volume} ${entryToDelete.unit}`}
          onCancel={() => setEntryToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </main>
  );
}

export default App;
