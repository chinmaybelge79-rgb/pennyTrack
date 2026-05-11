/**
 * StatCard Component - Reusable statistics display card
 */
export function StatCard({ label, value, icon, color = '#d4d4d4', accent }) {
  const displayColor = accent || color;
  
  return (
    <div 
      className="summary-card glass-panel" 
      style={{ '--accent': displayColor }}
      role="article"
      aria-label={`${label}: ${value}`}
      tabIndex={0}
    >
      <div 
        className="summary-card-icon" 
        style={{ 
          color: displayColor, 
          borderColor: displayColor, 
          background: `${displayColor}15`,
          boxShadow: `inset 0 0 20px ${displayColor}10`
        }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="summary-card-info">
        <span className="summary-label">{label}</span>
        <span className="summary-value">{value}</span>
      </div>
    </div>
  );
}

export default StatCard;
