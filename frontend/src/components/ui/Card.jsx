/**
 * Card Component - Reusable glassmorphism card container
 */
export function Card({ children, className = '', hover = true, ...props }) {
  const hoverClass = hover ? '' : 'no-hover';
  return (
    <div 
      className={`glass-panel ${hoverClass} ${className}`.trim()} 
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`card-header ${className}`.trim()}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`card-title ${className}`.trim()}>{children}</h3>;
}

export function CardContent({ children, className = '' }) {
  return <div className={`card-content ${className}`.trim()}>{children}</div>;
}

export default Card;
