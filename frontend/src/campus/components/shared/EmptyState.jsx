import { Search } from "lucide-react";

export default function EmptyState({
  icon: Icon = Search,
  title = "No intelligence records found",
  description = "No matching records match your query or filter criteria. Try adjusting your parameters.",
  actionLabel,
  onAction,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        textAlign: "center",
        background: "#ffffff",
        border: "1px dashed #cbd5e1",
        borderRadius: "14px",
        margin: "16px 0",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "#f1f5f9",
          color: "#64748b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "14px",
        }}
      >
        <Icon size={22} />
      </div>
      <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#102544", margin: "0 0 6px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "0.86rem", color: "#64748b", maxWidth: "460px", margin: "0 0 16px", lineHeight: "1.5" }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button type="button" className="intel-btn-secondary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
