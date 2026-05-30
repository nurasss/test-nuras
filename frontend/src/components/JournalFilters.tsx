import type { JournalFilters as Filters } from '../types/journal';

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function JournalFilters({ filters, onChange }: Props) {
  return (
    <section className="filters-card">
      <div className="field compact">
        <label htmlFor="dateFrom">Дата с</label>
        <input
          id="dateFrom"
          type="date"
          value={filters.dateFrom}
          onChange={(event) => onChange({ ...filters, dateFrom: event.target.value })}
        />
      </div>
      <div className="field compact">
        <label htmlFor="dateTo">Дата по</label>
        <input
          id="dateTo"
          type="date"
          value={filters.dateTo}
          onChange={(event) => onChange({ ...filters, dateTo: event.target.value })}
        />
      </div>
      <div className="field compact">
        <label htmlFor="sort">Сортировка</label>
        <select
          id="sort"
          value={filters.sort}
          onChange={(event) => onChange({ ...filters, sort: event.target.value as Filters['sort'] })}
        >
          <option value="desc">Сначала новые</option>
          <option value="asc">Сначала старые</option>
        </select>
      </div>
      <button className="secondary-button" type="button" onClick={() => onChange({ dateFrom: '', dateTo: '', sort: 'desc' })}>
        Сбросить
      </button>
    </section>
  );
}
