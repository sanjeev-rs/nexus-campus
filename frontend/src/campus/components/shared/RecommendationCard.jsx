import { ArrowRight, Sparkles } from "lucide-react";

export default function RecommendationCard({
  title,
  category = "RECOMMENDATION",
  signal,
  evidence,
  impact,
  actionLabel,
  onAction,
  badgeVariant = "info",
  confidence,
  crossLinks = [],
}) {
  return (
    <div className="intel-card recommendation-card" style={{ margin: 0, padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span className={`intel-badge ${badgeVariant}`}>
              <Sparkles size={12} style={{ marginRight: "4px" }} />
              {category}
            </span>
            {confidence && (
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#059669" }}>
                {confidence}
              </span>
            )}
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#102544", margin: "4px 0" }}>
            {title}
          </h3>
        </div>

        {actionLabel && onAction && (
          <button
            type="button"
            className="intel-btn-primary"
            onClick={onAction}
            style={{ fontSize: "0.84rem", padding: "8px 16px" }}
          >
            <span>{actionLabel}</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {signal && (
        <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "12px" }}>
          <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "3px" }}>
            Observed Signal
          </strong>
          <p style={{ margin: 0, fontSize: "0.88rem", color: "#1e293b", lineHeight: "1.45" }}>
            {signal}
          </p>
        </div>
      )}

      {(evidence || impact) && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
          {evidence && (
            <div style={{ background: "#eff6ff", padding: "12px 14px", borderRadius: "8px", border: "1px solid #bfdbfe" }}>
              <strong style={{ display: "block", fontSize: "0.74rem", color: "#1d4ed8", textTransform: "uppercase", marginBottom: "3px" }}>
                Empirical Evidence
              </strong>
              <p style={{ margin: 0, fontSize: "0.84rem", color: "#1e3a8a", lineHeight: "1.4" }}>
                {evidence}
              </p>
            </div>
          )}

          {impact && (
            <div style={{ background: "#f0fdf4", padding: "12px 14px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
              <strong style={{ display: "block", fontSize: "0.74rem", color: "#15803d", textTransform: "uppercase", marginBottom: "3px" }}>
                Projected Impact
              </strong>
              <p style={{ margin: 0, fontSize: "0.84rem", color: "#14532d", lineHeight: "1.4", fontWeight: 600 }}>
                {impact}
              </p>
            </div>
          )}
        </div>
      )}

      {crossLinks.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
          <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 700, alignSelf: "center", textTransform: "uppercase" }}>
            Cross-Module Traces:
          </span>
          {crossLinks.map((link, idx) => (
            <button
              key={idx}
              type="button"
              className="intel-pill"
              onClick={link.onClick}
              style={{ fontSize: "0.76rem", padding: "4px 10px" }}
            >
              <span>{link.label}</span>
              &rarr;
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
