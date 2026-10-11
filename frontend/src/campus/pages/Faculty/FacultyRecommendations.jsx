import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  CheckCircle2,
  ChevronRight,
  Filter,
  Sparkles,
  X,
} from "lucide-react";

import { NEXT_BEST_ACTIONS } from "../../data/facultyData";
import "../../components/shared/SharedIntelligence.css";

function FacultyRecommendations() {
  const navigate = useNavigate();
  const [actions, setActions] = useState(NEXT_BEST_ACTIONS);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAccept = (id, title, route) => {
    setActions((prev) => prev.filter((a) => a.id !== id));
    showToast(`Action accepted: Redirecting to complete "${title}"`);
    navigate(route);
  };

  const handleDismiss = (id, title) => {
    setActions((prev) => prev.filter((a) => a.id !== id));
    showToast(`Recommendation dismissed: "${title}".`);
  };

  return (
    <div className="intel-page">
      {/* TOAST */}
      {toastMessage && (
        <div className="intel-toast">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
          <button type="button" onClick={() => setToastMessage(null)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <Sparkles size={14} />
            MENTORING WORKSPACE
          </div>
          <h1 className="intel-title">Next-Best-Action Recommendations</h1>
          <p className="intel-desc">
            Algorithmic priority queue surfacing urgent milestone reviews, at-risk student signals, curriculum interventions, and mentor matching recommendations.
          </p>
        </div>
      </div>

      {/* RECOMMENDATIONS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {actions.length > 0 ? (
          actions.map((item) => (
            <div key={item.id} className="intel-card" style={{ margin: 0, padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span className={`intel-badge ${item.priority === "CRITICAL" ? "danger" : item.priority === "HIGH" ? "warning" : "info"}`}>
                      {item.priority} PRIORITY
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                      Category: {item.category}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#102544", margin: "2px 0" }}>
                    {item.title}
                  </h2>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    className="intel-btn-secondary"
                    style={{ color: "#64748b" }}
                    onClick={() => handleDismiss(item.id, item.title)}
                  >
                    <X size={14} />
                    <span>Dismiss</span>
                  </button>
                  <button
                    type="button"
                    className="intel-btn-primary"
                    onClick={() => handleAccept(item.id, item.title, item.targetRoute)}
                  >
                    <Check size={14} />
                    <span>{item.actionLabel}</span>
                  </button>
                </div>
              </div>

              <p style={{ fontSize: "0.92rem", color: "#334155", lineHeight: "1.5", margin: "0 0 14px" }}>
                {item.description}
              </p>

              <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "8px", borderLeft: "3px solid #2563eb", fontSize: "0.82rem", color: "#475569" }}>
                <strong style={{ color: "#102544" }}>Supporting Empirical Evidence:</strong> {item.evidence}
              </div>
            </div>
          ))
        ) : (
          <div className="intel-card" style={{ textAlign: "center", padding: "48px" }}>
            <CheckCircle2 size={36} color="#059669" style={{ margin: "0 auto 12px" }} />
            <h3 style={{ color: "#102544", margin: 0 }}>All Next-Best-Actions Resolved</h3>
            <p style={{ color: "#64748b", margin: "6px 0 0" }}>No pending algorithmic recommendations requiring faculty sign-off.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultyRecommendations;
