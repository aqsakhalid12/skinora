// Standard page wrapper: width, padding and entrance animation
export default function PageShell({ title, children, className = '', titleClass = 'mb-6' }) {
  return (
    <div className={`wrap sec fx pt-4 ${className}`}>
      {title && <h1 className={`text-[56px] ${titleClass}`}>{title}</h1>}
      {children}
    </div>
  );
}
