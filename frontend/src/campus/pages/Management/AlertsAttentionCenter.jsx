import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  Info,
  ShieldAlert,
  Sparkles,
  Zap,
} from "lucide-react";

import { MANAGEMENT_ALERTS } from "../../data/managementData";
import "../../components/shared/SharedIntelligence.css";

export default function AlertsAttentionCenter() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState(MANAGEMENT_ALERTS);
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResolve = (alertId) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
    showToast("Alert resolved and executive action logged in institutional audit registry.");
    if (selectedAlert?.id === alertId) {
      setSelectedAlert(null);
    }
  };

  const filteredAlerts = alerts.filter((a) => {
    if (filterPriority !== "all" && a.priority !== filterPriority) return false;
    return true;
  });

  return (
    <div className="intel-page">
      {/* TOAST */}
      {toastMessage && (
        <div className="intel-toast">
          <CheckCircle2 size={18} color="#059669" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <Bell size={14} />
            REPORTING &amp; OVERSIGHT
          </div>
          <h1 className="intel-title">Executive Alerts &amp; Institutional Attention Center</h1>
          <p className="intel-desc">
            Prioritized operational alerts, departmental resource bottlenecks, and compliance anomalies requiring Provost or Board intervention.
          </p>
        </div>

        <div className="intel-actions">
          <button
            type="button"
            className="intel-btn-secondary"
            onClick={() => {
              setAlerts(MANAGEMENT_ALERTS);
              showToast("Alert stream refreshed from campus telemetry engines.");
            }}
          >
            <Clock size={16} />
            <span>Refresh Telemetry</span>
          </button>
          <button
            type="button"
            className="intel-btn-primary"
            onClick={() => showToast("Emergency institutional advisory dispatched to all Department Heads.")}
          >
            <Zap size={16} />
            <span>Dispatch Advisory</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="intel-kpi-grid">
        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Active Escalations</div>
          <div className="intel-kpi-value">{alerts.length}</div>
          <div className="intel-kpi-delta warning">
            <AlertCircle size={13} />
            {alerts.filter((a) => a.priority === "CRITICAL").length} Critical immediate attention items
          </div>
        </div>

        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Mean Resolution Time</div>
          <div className="intel-kpi-value">4.2 Hrs</div>
          <div className="intel-kpi-delta positive">Institutional response time reduced by 62%</div>
        </div>

        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Automated Triage Rate</div>
          <div className="intel-kpi-value">91.8%</div>
          <div className="intel-kpi-delta positive">Prescreened by NEXUS campus anomaly engine</div>
        </div>

        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Compliance Defect Score</div>
          <div className="intel-kpi-value">0 Defects</div>
          <div className="intel-kpi-delta positive">Accreditation status fully protected</div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="intel-filter-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#475569", fontSize: "0.85rem", fontWeight: 600 }}>
            <Filter size={16} /> Filter by Severity:
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            {["all", "CRITICAL", "HIGH", "NORMAL"].map((p) => (
              <button
                key={p}
                type="button"
                className={filterPriority === p ? "intel-btn-primary" : "intel-btn-secondary"}
                style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                onClick={() => setFilterPriority(p)}
              >
                {p === "all" ? "All Severities" : p}
              </button>
            ))}
          </div>
        </div>

        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
          Showing {filteredAlerts.length} active alerts
        </div>
      </div>

      {/* ALERTS STREAM */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredAlerts.length === 0 ? (
          <div className="intel-card" style={{ padding: "40px", textAlign: "center" }}>
            <CheckCircle2 size={40} color="#059669" style={{ margin: "0 auto 12px auto" }} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#102544" }}>All Operational Signals Clear</h3>
            <p style={{ fontSize: "0.88rem", color: "#64748b" }}>
              No active escalations match the selected filter. Institutional systems operating normally.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alt) => (
            <div
              key={alt.id}
              className="intel-card"
              style={{
                margin: 0,
                padding: "22px",
                borderLeft: `5px solid ${alt.priority === "CRITICAL" ? "#dc2626" : alt.priority === "HIGH" ? "#d97706" : "#2563eb"}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span className={`intel-badge ${alt.priority === "CRITICAL" ? "danger" : alt.priority === "HIGH" ? "warning" : "neutral"}`}>
                      {alt.priority} PRIORITY
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      Dept: <strong style={{ color: "#1e293b" }}>{alt.dept}</strong>
                    </span>
                  </div>
                  <h2 style={{ fontSize: "1.18rem", fontWeight: 700, color: "#102544", margin: 0 }}>
                    {alt.title}
                  </h2>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    className="intel-btn-primary"
                    style={{ fontSize: "0.82rem", padding: "6px 14px" }}
                    onClick={() => handleResolve(alt.id)}
                  >
                    <CheckCircle2 size={14} />
                    <span>{alt.action}</span>
                  </button>
                </div>
              </div>

              <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.5, margin: "0 0 12px 0" }}>
                {alt.description}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", color: "#64748b", borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                <span>Event Stream ID: {alt.id}</span>
                <span style={{ color: "#2563eb", fontWeight: 600 }}>Campus Telemetry Snapshot</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
