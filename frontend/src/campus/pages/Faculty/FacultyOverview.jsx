import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  FileCheck,
  Layers,
  Network,
  Plus,
  Share2,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import {
  ADVISEES,
  AT_RISK_STUDENTS,
  FACULTY_USER,
  NEXT_BEST_ACTIONS,
  OFFICE_HOURS,
  PROJECT_REVIEWS,
} from "../../data/facultyData";

import "../Faculty/FacultyDashboard.css";
import "../../components/shared/SharedIntelligence.css";

function FacultyOverview() {
  const navigate = useNavigate();

  // Dynamic time greeting
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
    <div className="faculty-dashboard">
      {/* TOAST FEEDBACK */}
      {toastMessage && (
        <div className="faculty-toast" role="status" aria-live="polite">
          <CheckCircle2 size={18} className="toast-icon" />
          <span>{toastMessage}</span>
          <button
            type="button"
            className="toast-close"
            onClick={() => setToastMessage(null)}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* FACULTY WELCOME HERO */}
      <section className="faculty-welcome">
        <div className="faculty-welcome-glow" aria-hidden="true" />

        <div className="faculty-welcome-content">
          <div className="faculty-eyebrow-row">
            <span className="faculty-eyebrow">
              NEXUS FACULTY PORTAL • {FACULTY_USER.department}
            </span>
            <span className="faculty-badge-live">
              <span className="pulse-dot" />
              Active Term: Spring 2026
            </span>
          </div>

          <h1>
            {greeting},{" "}
            <span className="faculty-name-highlight">{FACULTY_USER.name}</span>
          </h1>

          <p className="faculty-welcome-desc">
            Supervising <strong>48 students</strong> across <strong>14 active research &amp; capstone projects</strong>.
            You have <strong>{PROJECT_REVIEWS.length} pending submissions</strong> and{" "}
            <strong>{AT_RISK_STUDENTS.length} attention alerts</strong> requiring faculty review.
          </p>

          <div className="faculty-status-strip">
            <div className="status-chip">
              <Compass size={15} />
              <span>Office: {FACULTY_USER.room}</span>
            </div>
            <div className="status-chip">
              <Clock size={15} />
              <span>Office Hours Today: 2:00 PM – 4:30 PM</span>
            </div>
            <div className="status-chip highlight">
              <Calendar size={15} />
              <span>Next Check-in: 02:30 PM (Devon Reed)</span>
            </div>
          </div>
        </div>

        <div className="faculty-hero-actions">
          <button
            type="button"
            className="nx-btn-primary"
            onClick={() => {
              showToast("Directing to Faculty Advising & Office Hours schedule...");
              navigate("/faculty/advising");
            }}
          >
            <Plus size={16} />
            <span>Advising Schedule</span>
          </button>
          <button
            type="button"
            className="nx-btn-secondary"
            onClick={() => {
              showToast("Directing to Capstone & Deliverables Review Pipeline...");
              navigate("/faculty/reviews");
            }}
          >
            <FileCheck size={16} />
            <span>Review Queue ({PROJECT_REVIEWS.length})</span>
          </button>
        </div>
      </section>

      {/* QUICK WORKSPACE DIRECTORY BAR */}
      <div className="faculty-kpi-grid">
        <div className="nx-kpi-card" onClick={() => navigate("/faculty/advisees")} style={{ cursor: "pointer" }}>
          <div className="kpi-header">
            <span className="kpi-label">Supervised Advisees</span>
            <div className="kpi-icon-wrap blue">
              <Users size={18} />
            </div>
          </div>
          <div className="kpi-value">{ADVISEES.length}</div>
          <div className="kpi-footer">
            <span className="kpi-trend positive">Active Cohort</span>
            <span className="kpi-subtext">View advisee directory &rarr;</span>
          </div>
        </div>

        <div className="nx-kpi-card" onClick={() => navigate("/faculty/reviews")} style={{ cursor: "pointer" }}>
          <div className="kpi-header">
            <span className="kpi-label">Pending Reviews</span>
            <div className="kpi-icon-wrap amber">
              <FileCheck size={18} />
            </div>
          </div>
          <div className="kpi-value">{PROJECT_REVIEWS.length}</div>
          <div className="kpi-footer">
            <span className="kpi-trend warning">Action required</span>
            <span className="kpi-subtext">Open review queue &rarr;</span>
          </div>
        </div>

        <div className="nx-kpi-card" onClick={() => navigate("/faculty/at-risk")} style={{ cursor: "pointer" }}>
          <div className="kpi-header">
            <span className="kpi-label">At-Risk Interventions</span>
            <div className="kpi-icon-wrap red">
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="kpi-value">{AT_RISK_STUDENTS.length}</div>
          <div className="kpi-footer">
            <span className="kpi-trend negative">Requires guidance</span>
            <span className="kpi-subtext">Inspect student signals &rarr;</span>
          </div>
        </div>

        <div className="nx-kpi-card" onClick={() => navigate("/faculty/skills")} style={{ cursor: "pointer" }}>
          <div className="kpi-header">
            <span className="kpi-label">Department Skill Index</span>
            <div className="kpi-icon-wrap purple">
              <Award size={18} />
            </div>
          </div>
          <div className="kpi-value">92%</div>
          <div className="kpi-footer">
            <span className="kpi-trend positive">+14% Growth</span>
            <span className="kpi-subtext">Explore competency radar &rarr;</span>
          </div>
        </div>
      </div>

      {/* PRIORITY RECOMMENDATIONS (NEXT BEST ACTIONS) */}
      <section className="nx-panel" style={{ marginBottom: "28px" }}>
        <div className="nx-panel-header">
          <div>
            <div className="intel-eyebrow">
              <Sparkles size={14} />
              NEXUS RECOMMENDATION ENGINE
            </div>
            <h2>Next Best Actions</h2>
          </div>
          <button
            type="button"
            className="intel-btn-secondary"
            onClick={() => navigate("/faculty/recommendations")}
          >
            <span>View All Recommendations</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px", marginTop: "16px" }}>
          {NEXT_BEST_ACTIONS.slice(0, 3).map((nba) => (
            <div
              key={nba.id}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "18px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "12px",
                transition: "all 0.15s ease"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span className={`intel-badge ${nba.priority === "CRITICAL" ? "danger" : nba.priority === "HIGH" ? "warning" : "info"}`}>
                    {nba.priority}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{nba.category}</span>
                </div>
                <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#102544", margin: "0 0 6px" }}>
                  {nba.title}
                </h3>
                <p style={{ fontSize: "0.86rem", color: "#475569", margin: "0 0 8px", lineHeight: "1.5" }}>
                  {nba.description}
                </p>
                <div style={{ fontSize: "0.78rem", color: "#64748b", background: "#f8fafc", padding: "8px 10px", borderRadius: "8px", borderLeft: "3px solid #2563eb" }}>
                  <strong>Evidence:</strong> {nba.evidence}
                </div>
              </div>
              <button
                type="button"
                className="intel-btn-primary"
                style={{ alignSelf: "flex-start", padding: "8px 14px", fontSize: "0.82rem" }}
                onClick={() => navigate(nba.targetRoute)}
              >
                <span>{nba.actionLabel}</span>
                <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TWO COLUMN GRID: ADVISEE QUICK ROSTER & PENDING REVIEW PIPELINE */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: "24px", marginBottom: "28px" }}>
        
        {/* ADVISEES SUMMARY */}
        <section className="nx-panel">
          <div className="nx-panel-header">
            <div>
              <div className="intel-eyebrow">STUDENT INTELLIGENCE</div>
              <h2>Advisee Progress Monitor</h2>
            </div>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/advisees")}
            >
              <span>Advisee Workspace</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
            {ADVISEES.slice(0, 4).map((stu) => (
              <div
                key={stu.id}
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/faculty/advisees")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background: "#2563eb",
                    color: "#fff",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem"
                  }}>
                    {stu.avatar}
                  </div>
                  <div>
                    <strong style={{ display: "block", color: "#102544", fontSize: "0.9rem" }}>{stu.name}</strong>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>{stu.project}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span className={`intel-badge ${stu.statusType}`}>{stu.status}</span>
                  <span style={{ display: "block", fontSize: "0.76rem", color: "#64748b", marginTop: "4px" }}>
                    {stu.progress}% Complete
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PENDING REVIEWS SUMMARY */}
        <section className="nx-panel">
          <div className="nx-panel-header">
            <div>
              <div className="intel-eyebrow">PROJECT &amp; RESEARCH</div>
              <h2>Milestone Review Queue</h2>
            </div>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/reviews")}
            >
              <span>Full Pipeline</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
            {PROJECT_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                style={{
                  padding: "14px 16px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  background: "#ffffff",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "0.9rem", color: "#102544" }}>{rev.studentName}</strong>
                  <span className={`intel-badge ${rev.urgency === "HIGH" ? "danger" : "info"}`}>{rev.urgency} URGENCY</span>
                </div>
                <div style={{ fontSize: "0.84rem", color: "#475569" }}>
                  {rev.deliverableTitle}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Submitted: {rev.submittedAt}</span>
                  <button
                    type="button"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#2563eb",
                      fontWeight: 600,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px"
                    }}
                    onClick={() => navigate("/faculty/reviews")}
                  >
                    Evaluate Deliverable &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* ADVISING SCHEDULE & KNOWLEDGE DNA SHORTCUTS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
        
        {/* OFFICE HOURS */}
        <section className="nx-panel">
          <div className="nx-panel-header">
            <div>
              <div className="intel-eyebrow">MENTORING &amp; ADVISING</div>
              <h2>Office Hours Schedule</h2>
            </div>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/advising")}
            >
              <span>Manage Sessions</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "14px" }}>
            {OFFICE_HOURS.slice(0, 3).map((oh) => (
              <div
                key={oh.id}
                style={{
                  padding: "12px 14px",
                  borderRadius: "8px",
                  background: "#f8fafc",
                  borderLeft: "4px solid #2563eb",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <strong style={{ display: "block", fontSize: "0.88rem", color: "#102544" }}>{oh.student}</strong>
                  <span style={{ fontSize: "0.76rem", color: "#64748b" }}>{oh.topic}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#2563eb" }}>{oh.time}</span>
                  <span style={{ display: "block", fontSize: "0.72rem", color: "#64748b" }}>{oh.type}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPLORE KNOWLEDGE & FAILURE MEMORY */}
        <section className="nx-panel" style={{ background: "linear-gradient(135deg, #f8fafc, #eff6ff)" }}>
          <div className="nx-panel-header">
            <div>
              <div className="intel-eyebrow">INSTITUTIONAL MEMORY</div>
              <h2>Campus Knowledge Ecosystem</h2>
            </div>
          </div>

          <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: "1.55", margin: "0 0 16px" }}>
            NEXUS maintains longitudinal intelligence on project architecture, cross-department skill graphs, and documented technical failure memories to prevent students from repeating previous engineering mistakes.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <button
              type="button"
              className="intel-btn-secondary"
              style={{ justifyContent: "center", padding: "12px" }}
              onClick={() => navigate("/faculty/failure-memory")}
            >
              <AlertCircle size={16} />
              <span>Failure Memory</span>
            </button>

            <button
              type="button"
              className="intel-btn-secondary"
              style={{ justifyContent: "center", padding: "12px" }}
              onClick={() => navigate("/faculty/knowledge-graph")}
            >
              <Share2 size={16} />
              <span>Knowledge Graph</span>
            </button>

            <button
              type="button"
              className="intel-btn-secondary"
              style={{ justifyContent: "center", padding: "12px" }}
              onClick={() => navigate("/faculty/project-dna")}
            >
              <Layers size={16} />
              <span>Project DNA</span>
            </button>

            <button
              type="button"
              className="intel-btn-secondary"
              style={{ justifyContent: "center", padding: "12px" }}
              onClick={() => navigate("/faculty/matching")}
            >
              <Network size={16} />
              <span>Mentor Matching</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default FacultyOverview;
