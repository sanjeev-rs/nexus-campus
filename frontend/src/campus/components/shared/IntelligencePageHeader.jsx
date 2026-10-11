export default function IntelligencePageHeader({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  description,
  actions,
  children,
}) {
  return (
    <header className="intel-header">
      <div className="intel-header-main">
        {eyebrow && (
          <div className="intel-eyebrow">
            {EyebrowIcon && <EyebrowIcon size={14} />}
            <span>{eyebrow}</span>
          </div>
        )}
        <h1 className="intel-title">{title}</h1>
        {description && <p className="intel-desc">{description}</p>}
        {children}
      </div>

      {actions && <div className="intel-actions">{actions}</div>}
    </header>
  );
}
