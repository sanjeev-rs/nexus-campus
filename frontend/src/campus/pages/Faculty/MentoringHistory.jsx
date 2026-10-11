import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  History,
  Search,
  User,
  Users,
} from "lucide-react";

import "../../components/shared/SharedIntelligence.css";

const MENTORING_LOGS = [
  {
    id: "log-01",
    student: "Sophia Sterling",
    date: "Nov 20, 2025",
    mentor: "Dr. Evelyn Vance",
    issue: "Thesis manuscript table chunking evaluation against ground truth",
    actionTaken: "Reviewed dense-sparse retrieval metrics; approved Chapter 4 and authorized defense docket.",
    outcome: "Defense dossier finalized with 98% precision score.",
    nextAction: "Convene examination committee in December."
  },
  {
    id: "log-02",
    student: "Maya Lin",
    date: "Nov 02, 2025",
    mentor: "Dr. Evelyn Vance & Dr. Aris Thorne",
    issue: "Jetson camera shutter micro-vibration during high-RPM quad flight",
    actionTaken: "Conducted vibration FFT in Robotics Lab; engineered silicone dampening grommets.",
    outcome: "Eliminated rolling shutter disparity distortion in stereo odometry.",
    nextAction: "Conduct full-speed outdoor GPS-denied trial."
  },
  {
    id: "log-03",
    student: "Aiden Cross",
    date: "Oct 12, 2025",
    mentor: "Dr. Evelyn Vance",
    issue: "Model explainability for administrative stakeholders on campus activity models",
    actionTaken: "Introduced SHAP (Shapley Additive exPlanations) values to predictive pipeline.",
    outcome: "Feature importance dashboard implemented; approved for symposium submission.",
    nextAction: "Draft 4-page student symposium paper."
  },
  {
    id: "log-04",
    student: "Karan Patel",
    date: "Sep 28, 2025",
    mentor: "Dr. Evelyn Vance",
    issue: "Department skill capability radar scaling artifacts on mobile screens",
    actionTaken: "Refactored Chart.js responsive container and added dynamic density scaling.",
    outcome: "Completed Sprint 2 milestone ahead of schedule.",
    nextAction: "Expand dataset to include Year 1 introductory courses."
  }
];

function MentoringHistory() {
  const [search, setSearch] = useState("");

  const filteredLogs = MENTORING_LOGS.filter((l) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      l.student.toLowerCase().includes(q) ||
      l.issue.toLowerCase().includes(q) ||
      l.actionTaken.toLowerCase().includes(q)
    );
  });

  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <History size={14} />
            MENTORING WORKSPACE
          </div>
          <h1 className="intel-title">Mentoring History &amp; Audit Logs</h1>
          <p className="intel-desc">
            Complete historical record of advisory consultations, technical interventions, remedial actions, and validated student outcomes.
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="intel-filter-bar">
        <div className="intel-search-box">
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search mentoring history by student or technical topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* LOGS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredLogs.map((log) => (
          <div key={log.id} className="intel-card" style={{ margin: 0, padding: "22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>
                  Consultation Record &bull; {log.date}
                </span>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#102544", margin: "2px 0" }}>
                  {log.student} &bull; <span style={{ color: "#475569", fontWeight: 500 }}>Advising Session</span>
                </h3>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Advisor: {log.mentor}</span>
              </div>
              <span className="intel-badge success">Verified Outcome</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px", marginTop: "12px" }}>
              <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                  Technical Issue Presented
                </strong>
                <p style={{ margin: 0, fontSize: "0.86rem", color: "#1e293b", lineHeight: "1.45" }}>
                  {log.issue}
                </p>
              </div>

              <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                  Faculty Action &amp; Remediation
                </strong>
                <p style={{ margin: 0, fontSize: "0.86rem", color: "#1e293b", lineHeight: "1.45" }}>
                  {log.actionTaken}
                </p>
              </div>

              <div style={{ background: "#f0fdf4", padding: "12px 14px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#15803d", textTransform: "uppercase", marginBottom: "4px" }}>
                  Measurable Outcome
                </strong>
                <p style={{ margin: 0, fontSize: "0.86rem", color: "#166534", lineHeight: "1.45" }}>
                  {log.outcome}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MentoringHistory;
