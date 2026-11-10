// Pill filter button; `active` = selected (ink background)
export default function Chip({ active, className = '', ...props }) {
  return <button className={`chip ${active ? 'on' : ''} ${className}`} {...props} />;
}
