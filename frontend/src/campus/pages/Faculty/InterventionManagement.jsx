import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  Plus,
  ShieldAlert,
  ShieldCheck,
  X,
} from "lucide-react";

import { INTERVENTIONS } from "../../data/facultyData";
import "../../components/shared/SharedIntelligence.css";

function InterventionManagement() {
  const [interventions, setInterventions] = useState(INTERVENTIONS);
  const [filter, setFilter] = useState("ALL");
  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [interventionType, setInterventionType] = useState("Technical Bottleneck");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("HIGH");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    const newInt = {
      id: `int-${Date.now()}`,
      studentName: studentName.trim(),
      studentId: "stu-custom",
      department: "AI & Data Science",
      type: interventionType,
      priority: priority,
      openedDate: "Today",
      owner: "Dr. Evelyn Vance",
      status: "ACTIVE",
      notes: notes.trim(),
      outcome: "Scheduled for faculty intervention review."
    };

    setInterventions([newInt, ...interventions]);
    setShowModal(false);
    setStudentName("");
    setNotes("");
    showToast(`Intervention docket created for ${newInt.studentName}.`);
  };

  const handleResolve = (id) => {
    setInterventions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "COMPLETED", outcome: "Resolution verified by faculty advisor." } : item
      )
    );
    showToast("Intervention marked as completed.");
  };

  const displayed = interventions.filter((item) => {
    if (filter === "ALL") return true;
    return item.status === filter;
  });

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
            <ShieldCheck size={14} />
            MENTORING WORKSPACE
          </div>
          <h1 className="intel-title">Intervention Management</h1>
          <p className="intel-desc">
            Formal tracking docket for academic warnings, hardware assistance, technical problem triage, and milestone recovery interventions.
          </p>
        </div>

        <div className="intel-actions">
          <button
            type="button"
            className="intel-btn-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} />
            <span>Open Intervention Docket</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="intel-kpi-grid">
        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Active Cases</span>
            <div className="intel-kpi-icon rose"><ShieldAlert size={18} /></div>
          </div>
          <div className="intel-kpi-value">
            {interventions.filter((i) => i.status === "ACTIVE").length}
          </div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta negative">In progress</span>
            <span>Requires check-in</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Resolved Term Cases</span>
            <div className="intel-kpi-icon green"><ShieldCheck size={18} /></div>
          </div>
          <div className="intel-kpi-value">
            {interventions.filter((i) => i.status === "COMPLETED").length}
          </div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">Successfully recovered</span>
            <span>Milestones signed off</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Average Time To Resolution</span>
            <div className="intel-kpi-icon blue"><Clock size={18} /></div>
          </div>
          <div className="intel-kpi-value">4.2 Days</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">Exceeds 7-day SLA</span>
            <span>Cohort velocity</span>
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="intel-pill-filters" style={{ marginBottom: "20px" }}>
        <button
          type="button"
          className={`intel-pill ${filter === "ALL" ? "active" : ""}`}
          onClick={() => setFilter("ALL")}
        >
          All Cases ({interventions.length})
        </button>
        <button
          type="button"
          className={`intel-pill ${filter === "ACTIVE" ? "active" : ""}`}
          onClick={() => setFilter("ACTIVE")}
        >
          Active Interventions ({interventions.filter((i) => i.status === "ACTIVE").length})
        </button>
        <button
          type="button"
          className={`intel-pill ${filter === "COMPLETED" ? "active" : ""}`}
          onClick={() => setFilter("COMPLETED")}
        >
          Completed Cases ({interventions.filter((i) => i.status === "COMPLETED").length})
        </button>
      </div>

      {/* INTERVENTIONS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {displayed.map((item) => (
          <div key={item.id} className="intel-card" style={{ margin: 0, padding: "22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span className={`intel-badge ${item.status === "ACTIVE" ? "danger" : "success"}`}>
                    {item.status}
                  </span>
                  <span className={`intel-badge ${item.priority === "CRITICAL" ? "danger" : "warning"}`}>
                    {item.priority} PRIORITY
                  </span>
                  <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                    Opened: {item.openedDate}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#102544", margin: "2px 0" }}>
                  {item.studentName} &bull; <span style={{ color: "#2563eb" }}>{item.type}</span>
                </h3>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Advisor / Case Owner: {item.owner}</span>
              </div>

              {item.status === "ACTIVE" && (
                <button
                  type="button"
                  className="intel-btn-primary"
                  onClick={() => handleResolve(item.id)}
                >
                  <CheckCircle2 size={15} />
                  <span>Verify Resolution</span>
                </button>
              )}
            </div>

            <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", marginBottom: "12px", border: "1px solid #e2e8f0" }}>
              <strong style={{ display: "block", fontSize: "0.76rem", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                Intervention Strategy Notes
              </strong>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "#1e293b", lineHeight: "1.45" }}>
                {item.notes}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", color: "#64748b" }}>
              <span>Outcome: <strong style={{ color: "#102544" }}>{item.outcome}</strong></span>
              <span>Case ID: #{item.id}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="intel-drawer-backdrop" onClick={() => setShowModal(false)}>
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "520px",
              width: "100%",
              margin: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, color: "#102544" }}>Open Intervention Docket</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Scholar Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Devon Reed"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Intervention Type
                  </label>
                  <select
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                    value={interventionType}
                    onChange={(e) => setInterventionType(e.target.value)}
                  >
                    <option value="Technical Bottleneck">Technical Bottleneck</option>
                    <option value="Academic Warning">Academic Warning</option>
                    <option value="Milestone Delay">Milestone Delay</option>
                    <option value="Hardware Procurement">Hardware Procurement</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Priority
                  </label>
                  <select
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="CRITICAL">Critical</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Action Notes &amp; Recovery Plan
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe agreed remediation actions, lab assistance, or target milestone dates..."
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontFamily: "inherit" }}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  className="intel-btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="intel-btn-primary">
                  Commit Docket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterventionManagement;
