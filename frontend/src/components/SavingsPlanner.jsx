import React, { useState, useEffect } from 'react';

export default function SavingsPlanner() {
  const [goal, setGoal] = useState('');
  const [current, setCurrent] = useState('');
  const [months, setMonths] = useState('');
  
  const [monthlyRequired, setMonthlyRequired] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const goalVal = parseFloat(goal) || 0;
    const currentVal = parseFloat(current) || 0;
    const monthsVal = parseInt(months, 10) || 0;

    if (goalVal < 0 || currentVal < 0 || monthsVal < 0) {
      setError('Values cannot be negative');
      setMonthlyRequired(0);
      setProgress(0);
      return;
    }

    if (monthsVal > 0) {
      if (currentVal >= goalVal && goalVal > 0) {
        setError('');
        setMonthlyRequired(0);
        setProgress(100);
      } else {
        setError('');
        const required = (goalVal - currentVal) / monthsVal;
        setMonthlyRequired(required > 0 ? required : 0);
        setProgress(goalVal > 0 ? Math.min((currentVal / goalVal) * 100, 100) : 0);
      }
    } else if (months !== '') {
      setError('Months must be greater than 0');
      setMonthlyRequired(0);
      setProgress(0);
    } else {
      setError('');
      setMonthlyRequired(0);
      setProgress(goalVal > 0 ? Math.min((currentVal / goalVal) * 100, 100) : 0);
    }
  }, [goal, current, months]);

  return (
    <div className="glass-panel savings-planner-card" style={{ marginBottom: '32px', padding: '36px 32px', borderRadius: '24px' }}>
      <div className="form-header">
        <h2 style={{ background: 'linear-gradient(135deg, #10b981, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.8rem', marginBottom: '8px' }}>
          Savings Goal Planner
        </h2>
        <p className="guide-subtitle" style={{ marginBottom: '24px', fontSize: '1rem' }}>Plan your financial future with precision.</p>
      </div>

      <div className="form-row" style={{ gap: '24px' }}>
        <div className={`form-group ${error && (parseFloat(goal) < 0) ? 'has-error' : ''}`}>
          <input
            type="number"
            className={`input-field ${error && parseFloat(goal) < 0 ? 'input-error' : ''}`}
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
            placeholder="Savings Goal (₹)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <label className="input-label">Savings Goal (₹)</label>
        </div>
        
        <div className={`form-group ${error && (parseFloat(current) < 0) ? 'has-error' : ''}`}>
          <input
            type="number"
            className={`input-field ${error && parseFloat(current) < 0 ? 'input-error' : ''}`}
            placeholder="Current Savings (₹)"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
          />
          <label className="input-label">Current Savings (₹)</label>
        </div>

        <div className={`form-group ${error && (parseInt(months) <= 0 && months !== '') ? 'has-error' : ''}`}>
          <input
            type="number"
            className={`input-field ${error && parseInt(months) <= 0 && months !== '' ? 'input-error' : ''}`}
            placeholder="Target Time (months)"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
          <label className="input-label">Target Time (months)</label>
        </div>
      </div>

      {error && (
        <div style={{ color: '#ef4444', marginBottom: '20px', fontSize: '0.9rem', animation: 'fadeIn 0.3s ease-in-out' }}>
          {error}
        </div>
      )}

      <div className="calculation-result" style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '16px', padding: '24px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
          <div>
            <span style={{ color: '#b3b3b3', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Monthly Required</span>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', textShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}>
              ₹{monthlyRequired.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </div>
          </div>
          <div style={{ color: '#10b981', fontWeight: '600', fontSize: '1.2rem' }}>
            {progress.toFixed(1)}% Completed
          </div>
        </div>
        
        <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${progress}%`, 
              background: 'linear-gradient(90deg, #059669, #34d399)', 
              borderRadius: '100px',
              transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
            }} 
          />
        </div>
      </div>
    </div>
  );
}
