export default function StatusBadge({ variant = "info", children, className = "", style = {} }) {
  const normalizedVariant = ["success", "warning", "danger", "rose", "amber", "green", "blue", "purple", "info"].includes(variant)
    ? variant
    : "info";

  return (
    <span className={`intel-badge ${normalizedVariant} ${className}`} style={style}>
      {children}
    </span>
  );
}
