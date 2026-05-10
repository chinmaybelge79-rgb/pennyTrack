const CATEGORIES = ['All', 'Food', 'Travel', 'Coffee', 'Books', 'Other'];

export default function Filters({ filters, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  const handleClear = () => {
    onChange({ category: 'All', startDate: '', endDate: '' });
  };

  const hasFilters = filters.category !== 'All' || filters.startDate || filters.endDate;

  return (
    <div className="filters-bar glass-panel">
      <div className="filters-left">
        <select name="category" value={filters.category} onChange={handleChange}>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          title="Start date"
        />

        <span style={{ color: 'rgba(255,255,255,0.3)' }}>—</span>

        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          title="End date"
        />
      </div>

      {hasFilters && (
        <button className="btn-clear" onClick={handleClear}>
          Clear Filters
        </button>
      )}
    </div>
  );
}
