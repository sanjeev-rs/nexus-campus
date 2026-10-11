import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function TimelineView({ items = [], className = "" }) {
  if (!items.length) return null;

  return (
    <div className={`intel-timeline ${className}`} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {items.map((item, idx) => {
        const isDone = item.status === "completed" || item.completed;
        const isCurrent = item.status === "in_progress" || item.current;
        const isAlert = item.status === "delayed" || item.alert;

        return (
          <div
            key={item.id || idx}
            style={{
              display: "flex",
              gap: "16px",
              position: "relative",
            }}
          >
            {/* CONNECTOR LINE */}
            {idx < items.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "32px",
                  bottom: "-16px",
                  width: "2px",
                  background: isDone ? "#93c5fd" : "#e2e8f0",
                }}
              />
            )}

            {/* STATUS ICON */}
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: isDone
                  ? "#ecfdf5"
                  : isCurrent
                  ? "#eff6ff"
                  : isAlert
                  ? "#fff1f2"
                  : "#f8fafc",
                border: `2px solid ${
                  isDone
                    ? "#10b981"
                    : isCurrent
                    ? "#2563eb"
                    : isAlert
                    ? "#ef4444"
                    : "#cbd5e1"
                }`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                zIndex: 1,
              }}
            >
              {isDone ? (
                <CheckCircle2 size={16} color="#059669" />
              ) : isCurrent ? (
                <Clock size={16} color="#2563eb" />
              ) : isAlert ? (
                <AlertCircle size={16} color="#dc2626" />
              ) : (
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#94a3b8" }} />
              )}
            </div>

            {/* CONTENT */}
            <div
              style={{
                flex: 1,
                background: isCurrent ? "#f0f7ff" : "#ffffff",
                border: `1px solid ${isCurrent ? "#bfdbfe" : "#e2e8f0"}`,
                borderRadius: "10px",
                padding: "14px 16px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                <strong style={{ fontSize: "0.92rem", color: "#102544" }}>{item.title}</strong>
                {item.date && (
                  <span style={{ fontSize: "0.76rem", color: "#64748b", fontWeight: 600 }}>{item.date}</span>
                )}
              </div>
              {item.description && (
                <p style={{ margin: "4px 0 0", fontSize: "0.84rem", color: "#475569", lineHeight: "1.45" }}>
                  {item.description}
                </p>
              )}
              {item.meta && (
                <div style={{ marginTop: "8px", fontSize: "0.76rem", color: "#2563eb", fontWeight: 600 }}>
                  {item.meta}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
