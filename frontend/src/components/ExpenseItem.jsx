import { useState } from 'react';

const CATEGORY_COLORS = {
  Food: '#ef4444',
  Travel: '#3b82f6',
  Coffee: '#d4d4d4',
  Books: '#8b5cf6',
  Other: '#6b7280',
};

export default function ExpenseItem({ expense, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${expense.title}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await onDelete(expense._id);
    } catch {
      setDeleting(false);
    }
  };

  const formattedDate = new Date(expense.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className={`expense-item ${deleting ? 'deleting' : ''}`}>
      <div className="expense-item-left">
        <div
          className="category-badge"
          style={{ borderColor: CATEGORY_COLORS[expense.category] + '80', color: CATEGORY_COLORS[expense.category] }}
        >
          {expense.category}
        </div>
        <div className="expense-info">
          <h3 className="expense-title">{expense.title}</h3>
          {expense.description && (
            <p className="expense-description" style={{ fontSize: '0.85rem', color: '#737373', marginTop: '2px' }}>{expense.description}</p>
          )}
          <span className="expense-date">{formattedDate}</span>
        </div>
      </div>
      <div className="expense-item-right" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
        <button
          className="btn-delete"
          onClick={handleDelete}
          disabled={deleting}
          title="Delete expense"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </div>
    </div>
  );
}
