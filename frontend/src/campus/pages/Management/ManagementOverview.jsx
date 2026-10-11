import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  Download,
  FileSpreadsheet,
  Flag,
  ShieldCheck,
  X,
} from "lucide-react";

import {
  CAMPUS_EXECUTIVE_METRICS,
  CAMPUS_MISSIONS,
  DECISION_SUPPORT_SIGNALS,
  DEPARTMENTS_DATA,
  MANAGEMENT_ALERTS,
  MANAGEMENT_USER,
} from "../../data/managementData";

import "../Management/ManagementDashboard.css";
import "../../components/shared/SharedIntelligence.css";

function ManagementOverview() {
  const navigate = useNavigate();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="management-dashboard">
      {/* TOAST */}
      {toastMessage && (
        <div className="management-toast" role="status" aria-live="polite">
          <CheckCircle2 size={18} className="mgt-toast-icon" />
          <span>{toastMessage}</span>
          <button type="button" className="mgt-toast-close" onClick={() => setToastMessage(null)}>
            <X size={15} />
          </button>
        </div>
      )}

      {/* EXECUTIVE WELCOME HERO */}
      <section className="mgt-welcome-hero">
        <div className="mgt-hero-glow" aria-hidden="true" />

        <div className="mgt-hero-content">
          <div className="mgt-eyebrow-row">
            <span className="mgt-eyebrow">
              NEXUS INSTITUTIONAL INTELLIGENCE • {MANAGEMENT_USER.office}
            </span>
            <span className="mgt-accreditation-pill">
              <ShieldCheck size={14} />
              {MANAGEMENT_USER.accreditationGrade}
            </span>
          </div>

          <h1>
            {greeting},{" "}
            <span className="mgt-name-highlight">{MANAGEMENT_USER.name}</span>
          </h1>

          <p className="mgt-welcome-desc">
            Observatory monitoring <strong>{CAMPUS_EXECUTIVE_METRICS.studentCount.toLocaleString()} active scholars</strong>,{" "}
            <strong>{CAMPUS_EXECUTIVE_METRICS.facultyCount} faculty advisors</strong> across{" "}
            <strong>{CAMPUS_EXECUTIVE_METRICS.departmentCount} academic departments</strong>. 
            Campus activity index is running at <strong>{CAMPUS_EXECUTIVE_METRICS.activityScore}%</strong> with{" "}
            <strong>{CAMPUS_EXECUTIVE_METRICS.activeGrants}</strong> in active research grant deployment.
          </p>

          <div className="mgt-metrics-ribbon">
            <div className="ribbon-metric">
              <span className="ribbon-label">Student Population</span>
              <strong className="ribbon-val">{CAMPUS_EXECUTIVE_METRICS.studentCount.toLocaleString()}</strong>
            </div>
            <div className="ribbon-metric">
              <span className="ribbon-label">Faculty Roster</span>
              <strong className="ribbon-val">{CAMPUS_EXECUTIVE_METRICS.facultyCount}</strong>
            </div>
            <div className="ribbon-metric">
              <span className="ribbon-label">Active Projects</span>
              <strong className="ribbon-val">{CAMPUS_EXECUTIVE_METRICS.projectCount}</strong>
            </div>
            <div className="ribbon-metric">
              <span className="ribbon-label">Placement Index</span>
              <strong className="ribbon-val highlight">{CAMPUS_EXECUTIVE_METRICS.avgPlacementIndex}</strong>
            </div>
          </div>
        </div>

        <div className="mgt-hero-actions">
          <button
            type="button"
            className="mgt-btn-primary"
            onClick={() => navigate("/management/reports")}
          >
            <FileSpreadsheet size={16} />
            <span>Executive Briefing</span>
          </button>
          <button
            type="button"
            className="mgt-btn-secondary"
            onClick={() => {
              showToast("Directing to Resource Allocation & Cap-Ex Simulator...");
              navigate("/management/resources");
            }}
          >
            <Download size={16} />
            <span>Resource Allocation</span>
          </button>
        </div>
      </section>

      {/* KPI GRID WITH ROUTE TARGETS */}
      <div className="mgt-kpi-grid">
        <div className="mgt-kpi-card" onClick={() => navigate("/management/departments")} style={{ cursor: "pointer" }}>
          <div className="mgt-kpi-head">
            <span>Department Matrix</span>
            <div className="mgt-icon-box blue"><Building2 size={18} /></div>
          </div>
          <div className="mgt-kpi-number">{DEPARTMENTS_DATA.length} Departments</div>
          <div className="mgt-kpi-foot">
            <span className="mgt-trend positive">1:19 Faculty Ratio</span>
            <span className="mgt-foot-desc">Inspect departments &rarr;</span>
          </div>
        </div>

        <div className="mgt-kpi-card" onClick={() => navigate("/management/missions")} style={{ cursor: "pointer" }}>
          <div className="mgt-kpi-head">
            <span>Campus Missions</span>
            <div className="mgt-icon-box green"><Flag size={18} /></div>
          </div>
          <div className="mgt-kpi-number">{CAMPUS_MISSIONS.length} Active</div>
          <div className="mgt-kpi-foot">
            <span className="mgt-trend positive">$240k Allocated</span>
            <span className="mgt-foot-desc">Open missions hub &rarr;</span>
          </div>
        </div>

        <div className="mgt-kpi-card" onClick={() => navigate("/management/decision-support")} style={{ cursor: "pointer" }}>
          <div className="mgt-kpi-head">
            <span>Decision Support</span>
            <div className="mgt-icon-box purple"><Compass size={18} /></div>
          </div>
          <div className="mgt-kpi-number">{DECISION_SUPPORT_SIGNALS.length} Signals</div>
          <div className="mgt-kpi-foot">
            <span className="mgt-trend positive">Actionable Evidence</span>
            <span className="mgt-foot-desc">Review decisions &rarr;</span>
          </div>
        </div>

        <div className="mgt-kpi-card" onClick={() => navigate("/management/alerts")} style={{ cursor: "pointer" }}>
          <div className="mgt-kpi-head">
            <span>Executive Attention</span>
            <div className="mgt-icon-box amber"><AlertTriangle size={18} /></div>
          </div>
          <div className="mgt-kpi-number">{MANAGEMENT_ALERTS.length} Alerts</div>
          <div className="mgt-kpi-foot">
            <span className="mgt-trend warning">Governance Action</span>
            <span className="mgt-foot-desc">Attention center &rarr;</span>
          </div>
        </div>
      </div>

      {/* STRATEGIC DECISION SIGNALS SPOTLIGHT */}
      <section className="mgt-panel" style={{ marginBottom: "28px" }}>
        <div className="mgt-panel-head">
          <div>
            <div className="intel-eyebrow">
              <Compass size={14} />
              EXECUTIVE INTELLIGENCE
            </div>
            <h2>Decision Support Signals</h2>
          </div>
          <button
            type="button"
            className="intel-btn-secondary"
            onClick={() => navigate("/management/decision-support")}
          >
            <span>View All Decisions</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "16px", marginTop: "16px" }}>
          {DECISION_SUPPORT_SIGNALS.map((sig) => (
            <div
              key={sig.id}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "12px"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span className="intel-badge info">{sig.category}</span>
                  <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 700 }}>{sig.confidence}</span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#102544", margin: "0 0 6px" }}>
                  {sig.title}
                </h3>
                <p style={{ fontSize: "0.86rem", color: "#475569", lineHeight: "1.5", margin: "0 0 10px" }}>
                  {sig.signal}
                </p>
                <div style={{ background: "#f8fafc", padding: "10px", borderRadius: "8px", borderLeft: "3px solid #2563eb", fontSize: "0.8rem", color: "#334155" }}>
                  <strong>Recommended Decision:</strong> {sig.recommendedAction}
                </div>
              </div>

              <button
                type="button"
                className="intel-btn-primary"
                style={{ alignSelf: "flex-start", padding: "8px 14px", fontSize: "0.82rem" }}
                onClick={() => navigate("/management/decision-support")}
              >
                <span>Inspect Signal Dossier</span>
                <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TWO COLUMN GRID: DEPARTMENT SUMMARY & CAMPUS MISSIONS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: "24px", marginBottom: "28px" }}>
        
        {/* DEPARTMENT MATRIX SUMMARY */}
        <section className="mgt-panel">
          <div className="mgt-panel-head">
            <div>
              <div className="intel-eyebrow">ACADEMIC INTELLIGENCE</div>
              <h2>Department Performance Roster</h2>
            </div>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/departments")}
            >
              <span>Full Matrix</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
            {DEPARTMENTS_DATA.slice(0, 4).map((d) => (
              <div
                key={d.id}
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/management/departments")}
              >
                <div>
                  <strong style={{ color: "#102544", display: "block", fontSize: "0.92rem" }}>
                    {d.name} ({d.code})
                  </strong>
                  <span style={{ fontSize: "0.76rem", color: "#64748b" }}>
                    HOD: {d.hod} • {d.students} Students
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={`intel-badge ${d.status === "Exemplary" ? "success" : "info"}`}>{d.status}</span>
                  <span style={{ display: "block", fontSize: "0.76rem", color: "#64748b", marginTop: "4px" }}>
                    Placement: {d.placementRate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CAMPUS MISSIONS SUMMARY */}
        <section className="mgt-panel">
          <div className="mgt-panel-head">
            <div>
              <div className="intel-eyebrow">STRATEGIC MISSIONS</div>
              <h2>Active Institutional Missions</h2>
            </div>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/missions")}
            >
              <span>Missions Hub</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
            {CAMPUS_MISSIONS.map((m) => (
              <div
                key={m.id}
                style={{
                  padding: "16px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  background: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="intel-badge success">{m.status}</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#059669" }}>{m.budget}</span>
                </div>
                <strong style={{ fontSize: "0.96rem", color: "#102544" }}>{m.title}</strong>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Lead: {m.lead}</span>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "3px" }}>
                    <span>Mission Milestone Progress</span>
                    <strong>{m.progress}%</strong>
                  </div>
                  <div className="intel-progress-bar">
                    <div className="intel-progress-fill green" style={{ width: `${m.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default ManagementOverview;
