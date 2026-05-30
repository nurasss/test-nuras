import type { JournalEntry } from '../types/journal';

interface Props {
  entries: JournalEntry[];
  loading: boolean;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (entry: JournalEntry) => void;
}

export function JournalTable({ entries, loading, onEdit, onDelete }: Props) {
  if (loading) {
    return <div className="empty-state">Загрузка записей...</div>;
  }

  if (entries.length === 0) {
    return <div className="empty-state">Записей пока нет. Добавьте первую выполненную работу.</div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Вид работ</th>
            <th>Объём</th>
            <th>Исполнитель</th>
            <th>Комментарий</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{new Date(entry.workDate).toLocaleDateString('ru-RU')}</td>
              <td>{entry.workType.name}</td>
              <td>{entry.volume} {entry.unit}</td>
              <td>{entry.executorName}</td>
              <td>{entry.comment || '—'}</td>
              <td className="actions-cell">
                <button className="small-button" type="button" onClick={() => onEdit(entry)}>Редактировать</button>
                <button className="small-danger-button" type="button" onClick={() => onDelete(entry)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
