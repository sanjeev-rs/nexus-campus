import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  GraduationCap,
  Layers,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { CAMPUS_EXECUTIVE_METRICS } from "../../data/managementData";
import "../../components/shared/SharedIntelligence.css";

const LONGITUDINAL_COHORTS = [
  {
    year: "2025 – 2026 (Current Term)",
    students: 2840,
    capstones: 428,
    avgCompletionWeeks: 14.2,
    retentionRate: "95.2%",
    dominantTechStack: "Agentic AI, Vector DBs, ROS 2, FastAPI, PyTorch",
    reusedComponentsRate: "88.4%",
    keyMilestone: "Full institutional deployment of NEXUS Campus OS and unified Failure Memory Registry."
  },
  {
    year: "2024 – 2025",
    students: 2650,
    capstones: 395,
    avgCompletionWeeks: 16.8,
    retentionRate: "93.8%",
    dominantTechStack: "Transformers, Docker, Node.js, React, PostgreSQL",
    reusedComponentsRate: "72.1%",
    keyMilestone: "Launch of interdisciplinary Capstone Innovation Hub; 19 patents filed."
  },
  {
    year: "2023 – 2024",
    students: 2480,
    capstones: 360,
    avgCompletionWeeks: 18.4,
    retentionRate: "91.5%",
    dominantTechStack: "Classic ML, Flask, Android Java, AWS EC2, MySQL",
    reusedComponentsRate: "54.0%",
    keyMilestone: "Establishment of GPU compute cluster for Department of AI & Data Science."
  },
  {
    year: "2022 – 2023",
    students: 2300,
    capstones: 320,
    avgCompletionWeeks: 21.0,
    retentionRate: "89.2%",
    dominantTechStack: "Django, jQuery, PHP, Scikit-learn, SQLite",
    reusedComponentsRate: "34.5%",
    keyMilestone: "Transition to Outcome-Based Education (OBE) curriculum standard."
  }
];

export default function ManagementInstitutionalLearning() {
  const navigate = useNavigate();
  const [selectedCohort, setSelectedCohort] = useState(LONGITUDINAL_COHORTS[0]);

  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <Layers size={14} />
            INSTITUTIONAL MEMORY
          </div>
          <h1 className="intel-title">Longitudinal Institutional Learning (5-Year Cohorts)</h1>
          <p className="intel-desc">
            Track compounding knowledge velocity, cross-generational component reuse, and architectural evolution across graduating senior classes.
          </p>
        </div>

        <div className="intel-actions">
          <button
            type="button"
            className="intel-btn-secondary"
            onClick={() => navigate("/management/retention")}
          >
            <Clock size={16} />
            <span>Knowledge Retention</span>
          </button>
          <button
            type="button"
            className="intel-btn-primary"
            onClick={() => navigate("/management/reports")}
          >
            <Download size={16} />
            <span>Export Longitudinal Dossier</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="intel-kpi-grid">
        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Capstone Velocity Acceleration</div>
          <div className="intel-kpi-value">-6.8 Wks</div>
          <div className="intel-kpi-delta positive">Average completion time dropped from 21 to 14.2 weeks</div>
        </div>

        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Cross-Cohort Code Reuse</div>
          <div className="intel-kpi-value">88.4%</div>
          <div className="intel-kpi-delta positive">Up from 34.5% in 2022 via Knowledge DNA</div>
        </div>

        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Retention Compounding Rate</div>
          <div className="intel-kpi-value">95.2%</div>
          <div className="intel-kpi-delta positive">+6.0% gain across 4 academic cycles</div>
        </div>

        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Institutional Quality Rating</div>
          <div className="intel-kpi-value">A++ Tier-1</div>
          <div className="intel-kpi-delta positive">Highest accreditation tier renewed</div>
        </div>
      </div>

      {/* COHORTS TIMELINE */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "26px" }}>
        {LONGITUDINAL_COHORTS.map((cohort, index) => {
          const isSelected = selectedCohort.year === cohort.year;
          return (
            <div
              key={index}
              className="intel-card"
              style={{
                margin: 0,
                padding: "24px",
                borderLeft: isSelected ? "5px solid #2563eb" : "1px solid #e2e8f0",
                background: isSelected ? "#f8fafc" : "#ffffff",
                cursor: "pointer",
              }}
              onClick={() => setSelectedCohort(cohort)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span className="intel-badge success">{cohort.year}</span>
                    <span style={{ fontSize: "0.82rem", color: "#64748b" }}>{cohort.students} Enrolled Scholars • {cohort.capstones} Capstones</span>
                  </div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#102544", margin: 0 }}>
                    {cohort.keyMilestone}
                  </h3>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e3a8a" }}>{cohort.reusedComponentsRate} Reuse</div>
                  <div style={{ fontSize: "0.78rem", color: "#059669" }}>{cohort.avgCompletionWeeks} Wks Avg Velocity</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", background: "#ffffff", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Dominant Technology Stack</span>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#1e293b", marginTop: "2px" }}>{cohort.dominantTechStack}</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Student Retention Rate</span>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#059669", marginTop: "2px" }}>{cohort.retentionRate}</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Development Velocity</span>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#102544", marginTop: "2px" }}>{cohort.avgCompletionWeeks} Weeks / Project</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
