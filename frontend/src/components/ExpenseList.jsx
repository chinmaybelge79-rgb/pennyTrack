import { useMemo } from 'react';
import ExpenseItem from './ExpenseItem';

/**
 * ExpenseList Component - Displays list of expenses with loading and empty states
 * Refactored with improved accessibility and performance
 */
export default function ExpenseList({ expenses, loading, onDelete }) {
  // Memoize sorted expenses (newest first)
  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses]);

  // Memoize expense total
  const totalAmount = useMemo(() => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  if (loading) {
    return (
      <div className="expense-list-card glass-panel" role="region" aria-label="Recent expenses">
        <div className="list-header">
          <h2>Recent Expenses</h2>
        </div>
        <div className="loading-state" role="status" aria-live="polite">
          <p>Loading expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list-card glass-panel" role="region" aria-label="Recent expenses">
      <div className="list-header">
        <h2>Recent Expenses</h2>
        <div className="list-header-meta">
          <span className="entry-count" aria-label={`${expenses.length} expense entries`}>
            {expenses.length} {expenses.length === 1 ? 'entry' : 'entries'}
          </span>
          {expenses.length > 0 && (
            <span className="total-amount" aria-label={`Total: ${totalAmount.toFixed(2)} rupees`}>
              Total: ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )}
        </div>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-state" role="status">
          <div className="empty-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
              <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
          </div>
          <h3>No expenses yet</h3>
          <p className="empty-description">Start tracking your spending by adding your first expense.</p>
        </div>
      ) : (
        <div className="expense-items" role="list" aria-label="Expense list">
          {sortedExpenses.map((expense) => (
            <ExpenseItem
              key={expense._id}
              expense={expense}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
