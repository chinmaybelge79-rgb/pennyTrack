import React, { useState } from 'react';

const STOCKS = [
  { name: 'Reliance Industries', returnPct: 25, risk: 'Medium Risk' },
  { name: 'TCS', returnPct: 12, risk: 'Low Risk' },
  { name: 'Adani Enterprises', returnPct: 60, risk: 'Very High Risk' },
  { name: 'Tata Motors', returnPct: 34, risk: 'High Risk' },
  { name: 'HDFC Bank', returnPct: 10, risk: 'Low Risk' },
  { name: 'Zomato', returnPct: 56, risk: 'Very High Risk' },
];

const getRiskColor = (risk) => {
  switch (risk) {
    case 'Low Risk': return { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6', border: 'rgba(59, 130, 246, 0.3)' }; // Blue
    case 'Medium Risk': return { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981', border: 'rgba(16, 185, 129, 0.3)' }; // Emerald
    case 'High Risk': return { bg: 'rgba(249, 115, 22, 0.15)', text: '#f97316', border: 'rgba(249, 115, 22, 0.3)' }; // Orange
    case 'Very High Risk': return { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' }; // Red
    default: return { bg: 'rgba(255, 255, 255, 0.1)', text: '#fff', border: 'rgba(255, 255, 255, 0.2)' };
  }
};

export default function InvestmentRecommendations() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(500);

  return (
    <div className="investment-recommendations" style={{ marginBottom: '40px' }}>
      <div className="form-header" style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
          Smart Investment Recommendations
        </h2>
        <p className="guide-subtitle" style={{ fontSize: '1.1rem', color: '#b3b3b3' }}>
          Higher return comes with higher risk
        </p>
      </div>

      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '16px 24px', display: 'inline-flex', alignItems: 'center', gap: '16px', borderRadius: '100px' }}>
          <span style={{ color: '#b3b3b3' }}>Monthly SIP Investment:</span>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#10b981', fontWeight: 'bold' }}>₹</span>
            <input 
              type="number" 
              value={monthlyInvestment} 
              onChange={(e) => setMonthlyInvestment(Number(e.target.value) || 0)}
              style={{ 
                background: 'rgba(0,0,0,0.5)', 
                border: '1px solid rgba(16, 185, 129, 0.3)', 
                borderRadius: '100px', 
                padding: '8px 16px 8px 28px', 
                color: '#fff', 
                outline: 'none',
                width: '120px',
                fontFamily: 'inherit',
                fontWeight: '600'
              }} 
            />
          </div>
        </div>
      </div>

      <style>{`
        .investment-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .stock-card {
          padding: 24px;
          border-radius: 20px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .stock-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.4);
        }
        @media (max-width: 900px) {
          .investment-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .investment-grid { grid-template-columns: 1fr; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .trend-line {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: drawLine 1.5s ease-out forwards;
        }
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      <div className="investment-grid">
        {STOCKS.map((stock, index) => {
          const colors = getRiskColor(stock.risk);
          const annualInvestment = monthlyInvestment * 12;
          const estimatedReturn = annualInvestment * (stock.returnPct / 100);
          const totalValue = annualInvestment + estimatedReturn;

          return (
            <div 
              key={stock.name} 
              className="glass-panel stock-card" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>{stock.name}</h3>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '4px 10px', 
                    borderRadius: '100px', 
                    fontSize: '0.75rem', 
                    fontWeight: '600', 
                    background: colors.bg, 
                    color: colors.text,
                    border: `1px solid ${colors.border}`
                  }}>
                    {stock.risk}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#10b981', fontWeight: '700', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                    {stock.returnPct}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#737373' }}>Expected Return</div>
                </div>
              </div>

              <div style={{ marginBottom: '20px', height: '40px', display: 'flex', alignItems: 'center' }}>
                <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 40">
                  <path 
                    d={stock.returnPct < 0 
                        ? "M0,10 Q25,15 50,25 T100,40" 
                        : stock.returnPct > 30 
                          ? "M0,40 Q20,30 40,35 T80,15 T100,5" 
                          : "M0,40 Q25,35 50,25 T100,10"} 
                    fill="none" 
                    stroke={stock.returnPct < 0 ? "rgba(239, 68, 68, 0.5)" : "rgba(16, 185, 129, 0.5)"} 
                    strokeWidth="3" 
                    className="trend-line"
                  />
                  <path 
                    d={stock.returnPct < 0 
                        ? "M0,10 Q25,15 50,25 T100,40 L100,40 L0,40 Z" 
                        : stock.returnPct > 30 
                          ? "M0,40 Q20,30 40,35 T80,15 T100,5 L100,40 L0,40 Z" 
                          : "M0,40 Q25,35 50,25 T100,10 L100,40 L0,40 Z"} 
                    fill={stock.returnPct < 0 ? "url(#gradientRed)" : "url(#gradientGreen)"} 
                    stroke="none"
                    style={{ animation: 'fadeIn 1s ease-out 0.5s forwards', opacity: 0 }}
                  />
                  <defs>
                    <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(16, 185, 129, 0.2)" />
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                    </linearGradient>
                    <linearGradient id="gradientRed" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(239, 68, 68, 0.2)" />
                      <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#a3a3a3' }}>Invested in 1 yr:</span>
                  <span style={{ color: '#fff', fontWeight: '500' }}>₹{annualInvestment.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: '600' }}>
                  <span style={{ color: stock.returnPct < 0 ? '#ef4444' : '#10b981' }}>Est. Return:</span>
                  <span style={{ color: stock.returnPct < 0 ? '#ef4444' : '#10b981', textShadow: stock.returnPct < 0 ? '0 0 10px rgba(239, 68, 68, 0.3)' : '0 0 10px rgba(16, 185, 129, 0.3)' }}>
                    {stock.returnPct < 0 ? '-' : '+'}₹{Math.abs(estimatedReturn).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
