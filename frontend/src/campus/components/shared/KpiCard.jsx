export function KpiGrid({ children, columns, className = "" }) {
  const style = columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : undefined;
  return (
    <div className={`intel-kpi-grid ${className}`} style={style}>
      {children}
    </div>
  );
}

export function KpiCard({
  label,
  value,
  icon: Icon,
  variant = "blue",
  delta,
  deltaType = "positive",
  meta,
  onClick,
  style = {},
}) {
  const isClickable = Boolean(onClick);

  return (
    <div
      className={`intel-kpi-card ${isClickable ? "clickable" : ""}`}
      onClick={onClick}
      style={{
        ...style,
        ...(isClickable ? { cursor: "pointer" } : {}),
      }}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <div className="intel-kpi-header">
        <span className="intel-kpi-label">{label}</span>
        {Icon && (
          <div className={`intel-kpi-icon ${variant}`}>
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
      </div>

      <div className="intel-kpi-value">{value}</div>

      {(delta || meta) && (
        <div className="intel-kpi-meta">
          {delta && (
            <span className={`intel-kpi-delta ${deltaType}`}>{delta}</span>
          )}
          {meta && <span>{meta}</span>}
        </div>
      )}
    </div>
  );
}

export default KpiCard;
