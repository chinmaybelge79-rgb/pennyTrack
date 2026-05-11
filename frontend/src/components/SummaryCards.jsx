/**
 * SummaryCards Component - Displays expense statistics
 * Refactored with accessibility improvements
 */
export default function SummaryCards({ summary }) {
  // Robust check for summary data presence
  if (!summary || typeof summary.totalAll === 'undefined') {
    return (
      <div className="summary-cards" role="region" aria-label="Loading summary statistics">
        <div className="summary-card glass-panel loading-card" aria-busy="true">
          <span className="visually-hidden">Loading statistics...</span>
        </div>
        <div className="summary-card glass-panel loading-card" aria-busy="true">
          <span className="visually-hidden">Loading statistics...</span>
        </div>
        <div className="summary-card glass-panel loading-card" aria-busy="true">
          <span className="visually-hidden">Loading statistics...</span>
        </div>
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Expenses',
      value: `₹${(summary.totalAll || 0).toFixed(2)}`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12" />
          <path d="M6 8h12" />
          <path d="M6 13l8.5 8" />
          <path d="M6 13h3c3.5 0 6-2.5 6-5s-2.5-5-6-5" />
        </svg>
      ),
      color: '#d4d4d4',
    },
    {
      label: 'This Month',
      value: `₹${(summary.totalMonth || 0).toFixed(2)}`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
      color: '#10b981',
    },
    {
      label: 'Total Entries',
      value: summary.totalEntries || 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      ),
      color: '#d4d4d4',
    },
  ];

  return (
    <div className="summary-cards" role="region" aria-label="Expense summary statistics">
      {cards.map((card) => (
        <div 
          key={card.label} 
          className="summary-card glass-panel" 
          style={{ '--accent': card.color }}
          tabIndex={0}
          role="article"
          aria-label={`${card.label}: ${card.value}`}
        >
          <div 
            className="summary-card-icon" 
            style={{ 
              color: card.color, 
              borderColor: card.color, 
              background: `${card.color}15`,
              boxShadow: `inset 0 0 20px ${card.color}10`
            }}
            aria-hidden="true"
          >
            {card.icon}
          </div>
          <div className="summary-card-info">
            <span className="summary-label">{card.label}</span>
            <span className="summary-value">{card.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
