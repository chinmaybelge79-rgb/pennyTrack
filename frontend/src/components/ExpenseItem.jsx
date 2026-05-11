import { useState, useCallback, useMemo } from 'react';

const CATEGORY_COLORS = {
  Food: '#ef4444',
  Travel: '#3b82f6',
  Coffee: '#d4d4d4',
  Books: '#8b5cf6',
  Other: '#6b7280',
};

/**
 * ExpenseItem Component - Individual expense display with delete action
 * Refactored with improved accessibility and UX
 */
export default function ExpenseItem({ expense, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = useCallback(async () => {
    if (!window.confirm(`Delete "${expense.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await onDelete(expense._id);
    } catch {
      setDeleting(false);
    }
  }, [expense._id, expense.title, onDelete]);

  // Memoize formatted date
  const formattedDate = useMemo(() => {
    return new Date(expense.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, [expense.date]);

  // Memoize category styles
  const categoryStyle = useMemo(() => ({
    borderColor: CATEGORY_COLORS[expense.category] + '80',
    color: CATEGORY_COLORS[expense.category]
  }), [expense.category]);

  return (
    <div
      className={`expense-item ${deleting ? 'deleting' : ''}`}
      role="listitem"
      aria-busy={deleting}
    >
      <div className="expense-item-left">
        <div
          className="category-badge"
          style={categoryStyle}
          aria-label={`Category: ${expense.category}`}
        >
          {expense.category}
        </div>
        <div className="expense-info">
          <h3 className="expense-title">{expense.title}</h3>
          {expense.description && (
            <p className="expense-description">{expense.description}</p>
          )}
          <time className="expense-date" dateTime={expense.date}>
            {formattedDate}
          </time>
        </div>
      </div>
      <div className="expense-item-right">
        <span className="expense-amount" aria-label={`Amount: ${expense.amount.toFixed(2)} rupees`}>
          ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <button
          className="btn-delete"
          onClick={handleDelete}
          disabled={deleting}
          aria-label={`Delete expense "${expense.title}"`}
          title="Delete expense"
          type="button"
        >
          {deleting ? (
            <span className="delete-spinner" aria-hidden="true" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
