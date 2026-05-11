import { useCallback, useMemo } from 'react';

const CATEGORIES = ['All', 'Food', 'Travel', 'Coffee', 'Books', 'Other'];

/**
 * Filters Component - Date and category filtering for expenses
 * Refactored with improved accessibility and consistent styling
 */
export default function Filters({ filters, onChange }) {
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    onChange((prev) => ({ ...prev, [name]: value }));
  }, [onChange]);

  const handleClear = useCallback(() => {
    onChange({ category: 'All', startDate: '', endDate: '' });
  }, [onChange]);

  // Memoized derived state
  const hasFilters = useMemo(() => 
    filters.category !== 'All' || filters.startDate || filters.endDate,
    [filters]
  );

  return (
    <div className="filters-bar glass-panel" role="search" aria-label="Filter expenses">
      <div className="filters-left">
        <label htmlFor="category-filter" className="visually-hidden">
          Filter by category
        </label>
        <select 
          id="category-filter"
          name="category" 
          value={filters.category} 
          onChange={handleChange}
          className="filter-select"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <label htmlFor="start-date" className="visually-hidden">
          Start date
        </label>
        <input
          id="start-date"
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="filter-date"
          aria-label="Start date"
        />

        <span className="date-separator" aria-hidden="true">—</span>

        <label htmlFor="end-date" className="visually-hidden">
          End date
        </label>
        <input
          id="end-date"
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="filter-date"
          aria-label="End date"
        />
      </div>

      {hasFilters && (
        <button 
          type="button"
          className="btn-clear" 
          onClick={handleClear}
          aria-label="Clear all filters"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
