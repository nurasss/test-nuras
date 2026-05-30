import { FormEvent, useEffect, useState } from 'react';
import type { JournalEntry, JournalEntryPayload, WorkType } from '../types/journal';

interface Props {
  workTypes: WorkType[];
  editingEntry: JournalEntry | null;
  onSubmit: (payload: JournalEntryPayload) => Promise<void>;
  onCancel: () => void;
}

type FormErrors = Partial<Record<keyof JournalEntryPayload, string>>;

const emptyForm: JournalEntryPayload = {
  workDate: new Date().toISOString().slice(0, 10),
  workTypeId: 0,
  volume: 0,
  unit: 'м²',
  executorName: '',
  comment: '',
};

function validateForm(form: JournalEntryPayload): FormErrors {
  const errors: FormErrors = {};
  if (!form.workDate) errors.workDate = 'Дата выполнения обязательна';
  if (!form.workTypeId) errors.workTypeId = 'Выберите вид работ';
  if (!form.volume || Number(form.volume) <= 0) errors.volume = 'Объём должен быть больше 0';
  if (!form.unit.trim()) errors.unit = 'Единица измерения обязательна';
  if (!form.executorName.trim()) errors.executorName = 'ФИО исполнителя обязательно';
  return errors;
}

export function JournalForm({ workTypes, editingEntry, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<JournalEntryPayload>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingEntry) {
      setForm({
        workDate: editingEntry.workDate,
        workTypeId: editingEntry.workTypeId,
        volume: editingEntry.volume,
        unit: editingEntry.unit,
        executorName: editingEntry.executorName,
        comment: editingEntry.comment ?? '',
      });
      setErrors({});
    } else {
      setForm(emptyForm);
      setErrors({});
    }
  }, [editingEntry]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit({ ...form, volume: Number(form.volume), comment: form.comment?.trim() || undefined });
      if (!editingEntry) setForm(emptyForm);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-heading">
        <h2>{editingEntry ? 'Редактировать запись' : 'Добавить запись'}</h2>
        {editingEntry && <button type="button" className="secondary-button" onClick={onCancel}>Отмена</button>}
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="workDate">Дата выполнения</label>
          <input id="workDate" type="date" value={form.workDate} onChange={(event) => setForm({ ...form, workDate: event.target.value })} />
          {errors.workDate && <span className="error-text">{errors.workDate}</span>}
        </div>

        <div className="field">
          <label htmlFor="workTypeId">Вид работ</label>
          <select id="workTypeId" value={form.workTypeId} onChange={(event) => setForm({ ...form, workTypeId: Number(event.target.value) })}>
            <option value={0}>Выберите вид работ</option>
            {workTypes.map((type) => <option key={type.id} value={type.id}>{type.name}</option>)}
          </select>
          {errors.workTypeId && <span className="error-text">{errors.workTypeId}</span>}
        </div>

        <div className="field">
          <label htmlFor="volume">Объём</label>
          <input id="volume" type="number" step="0.01" min="0" value={form.volume || ''} onChange={(event) => setForm({ ...form, volume: Number(event.target.value) })} />
          {errors.volume && <span className="error-text">{errors.volume}</span>}
        </div>

        <div className="field">
          <label htmlFor="unit">Единица</label>
          <input id="unit" value={form.unit} onChange={(event) => setForm({ ...form, unit: event.target.value })} placeholder="м², м³, шт." />
          {errors.unit && <span className="error-text">{errors.unit}</span>}
        </div>

        <div className="field wide">
          <label htmlFor="executorName">ФИО исполнителя</label>
          <input id="executorName" value={form.executorName} onChange={(event) => setForm({ ...form, executorName: event.target.value })} placeholder="Иванов Сергей Петрович" />
          {errors.executorName && <span className="error-text">{errors.executorName}</span>}
        </div>

        <div className="field wide">
          <label htmlFor="comment">Комментарий</label>
          <textarea id="comment" value={form.comment} onChange={(event) => setForm({ ...form, comment: event.target.value })} placeholder="Например: работы выполнены на 3 этаже" rows={3} />
        </div>
      </div>

      <button className="primary-button" type="submit" disabled={submitting}>
        {submitting ? 'Сохранение...' : 'Сохранить'}
      </button>
    </form>
  );
}
