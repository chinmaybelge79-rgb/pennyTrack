import { useState, useCallback, useMemo } from 'react';

/**
 * IncomeAllocator Component - Ankur Warikoo's income division principles
 * Implements 50:30:20 (Beginner) and 20:30:50 (Advanced) allocation rules
 */

const MODES = {
  BEGINNER: {
    key: 'beginner',
    label: 'Beginner Mode',
    needs: 50,
    wants: 30,
    investments: 20,
  },
  ADVANCED: {
    key: 'advanced',
    label: 'Advanced Mode',
    needs: 20,
    wants: 30,
    investments: 50,
  },
};

const CATEGORIES = {
  needs: {
    label: 'Needs',
    color: '#10b981', // Emerald
    description: 'Rent, EMI, food, utilities',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    ),
  },
  wants: {
    label: 'Wants',
    color: '#f59e0b', // Amber
    description: 'Entertainment, dining, shopping',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
      </svg>
    ),
  },
  investments: {
    label: 'Investments',
    color: '#3b82f6', // Blue
    description: 'Stocks, mutual funds, savings',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    ),
  },
};

const PHILOSOPHY_QUOTES = [
  'Invest first. Automate 20% on salary day.',
  'Higher income → increase investments, not lifestyle.',
  "If you can't buy it twice, don't buy it.",
];

export default function IncomeAllocator() {
  const [income, setIncome] = useState('');
  const [mode, setMode] = useState(MODES.BEGINNER);
  const [isAnimating, setIsAnimating] = useState(false);

  // Parse income as number
  const incomeValue = useMemo(() => {
    const val = parseFloat(income);
    return isNaN(val) || val < 0 ? 0 : val;
  }, [income]);

  // Calculate allocations
  const allocations = useMemo(() => ({
    needs: (incomeValue * mode.needs) / 100,
    wants: (incomeValue * mode.wants) / 100,
    investments: (incomeValue * mode.investments) / 100,
  }), [incomeValue, mode]);

  // Handle income input change
  const handleIncomeChange = useCallback((e) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setIncome(value);
    }
  }, []);

  // Handle mode toggle with animation
  const handleModeToggle = useCallback((newMode) => {
    if (newMode.key === mode.key) return;
    setIsAnimating(true);
    setMode(newMode);
    setTimeout(() => setIsAnimating(false), 300);
  }, [mode]);

  // Format currency
  const formatCurrency = useCallback((amount) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, []);

  return (
    <div className="income-allocator">
      {/* ── 1. Monthly Income Input ── */}
      <div className="income-input-section glass-panel">
        <label htmlFor="monthly-income" className="income-label">
          Monthly Income (₹)
        </label>
        <div className="income-input-wrapper">
          <span className="income-currency">₹</span>
          <input
            id="monthly-income"
            type="text"
            inputMode="decimal"
            placeholder="Enter your monthly income"
            value={income}
            onChange={handleIncomeChange}
            className="income-input"
            min="0"
          />
        </div>
        {incomeValue > 0 && (
          <p className="income-display">
            Allocating: <strong>{formatCurrency(incomeValue)}</strong>
          </p>
        )}
      </div>

      {/* ── 2. Mode Toggle ── */}
      <div className="mode-toggle-section">
        <div className="mode-toggle" role="radiogroup" aria-label="Select allocation mode">
          {Object.values(MODES).map((m) => (
            <button
              key={m.key}
              type="button"
              role="radio"
              aria-checked={mode.key === m.key}
              className={`mode-btn ${mode.key === m.key ? 'active' : ''}`}
              onClick={() => handleModeToggle(m)}
            >
              <span className="mode-label">{m.label}</span>
              <span className="mode-ratio">
                {m.needs}:{m.wants}:{m.investments}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. Allocation Cards ── */}
      <div className={`allocation-cards ${isAnimating ? 'animating' : ''}`}>
        {Object.entries(CATEGORIES).map(([key, category]) => {
          const percentage = mode[key];
          const amount = allocations[key];
          
          return (
            <div
              key={key}
              className="allocation-card glass-panel"
              style={{ '--category-color': category.color }}
            >
              <div className="allocation-header">
                <div
                  className="allocation-icon"
                  style={{
                    color: category.color,
                    background: `${category.color}15`,
                    boxShadow: `inset 0 0 20px ${category.color}10`,
                  }}
                >
                  {category.icon}
                </div>
                <div className="allocation-percentage">
                  {percentage}%
                </div>
              </div>
              
              <div className="allocation-body">
                <h3 className="allocation-label">{category.label}</h3>
                <p className="allocation-amount">
                  {incomeValue > 0 ? formatCurrency(amount) : '—'}
                </p>
                <p className="allocation-description">{category.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="allocation-progress">
                <div
                  className="allocation-progress-bar"
                  style={{
                    width: `${percentage}%`,
                    background: `linear-gradient(90deg, ${category.color}80, ${category.color})`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 4. Visual Progress Bars (Alternative to doughnut) ── */}
      <div className="allocation-visual glass-panel">
        <h4 className="visual-title">Income Distribution</h4>
        <div className="visual-bars">
          {Object.entries(CATEGORIES).map(([key, category]) => {
            const percentage = mode[key];
            return (
              <div key={key} className="visual-bar-row">
                <span className="visual-bar-label">{category.label}</span>
                <div className="visual-bar-track">
                  <div
                    className="visual-bar-fill"
                    style={{
                      width: `${percentage}%`,
                      background: category.color,
                    }}
                  />
                </div>
                <span className="visual-bar-value">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 5. Philosophy Section ── */}
      <div className="philosophy-section glass-panel">
        <h4 className="philosophy-title">Warikoo's Principles</h4>
        <ul className="philosophy-list">
          {PHILOSOPHY_QUOTES.map((quote, index) => (
            <li key={index} className="philosophy-item">
              <span className="philosophy-bullet" aria-hidden="true">◆</span>
              {quote}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
