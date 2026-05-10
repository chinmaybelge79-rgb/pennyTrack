import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses, loading, onDelete }) {
  if (loading) {
    return (
      <div className="expense-list-card glass-panel">
        <div className="list-header">
          <h2>Recent Expenses</h2>
        </div>
        <div className="loading-state" style={{ padding: '40px', textAlign: 'center', color: '#737373' }}>
          <p>Loading expenses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-list-card glass-panel">
      <div className="list-header">
        <h2>Recent Expenses</h2>
        <span className="entry-count">{expenses.length} entries</span>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
          </div>
          <h3>No expenses yet</h3>
          <p style={{ color: '#737373' }}>Start tracking your spending by adding your first expense.</p>
        </div>
      ) : (
        <div className="expense-items">
          {expenses.map((expense) => (
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
