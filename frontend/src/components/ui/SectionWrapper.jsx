/**
 * SectionWrapper Component - Wrapper for scroll sections
 */
export function SectionWrapper({ 
  children, 
  className = '', 
  id,
  ariaLabel,
  ...props 
}) {
  return (
    <section 
      className={`scroll-section ${className}`.trim()}
      id={id}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </section>
  );
}

/**
 * AppContainer Component - Main app content container
 */
export function AppContainer({ children, className = '' }) {
  return (
    <div className={`app ${className}`.trim()}>
      {children}
    </div>
  );
}

export default SectionWrapper;
