import { useState } from "react";
import {
  Activity,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FolderKanban,
  GraduationCap,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import "../../components/shared/SharedIntelligence.css";

const ACTIVITY_EVENTS = [
  { id: "act-01", type: "PROJECT_MILESTONE", title: "Smart Campus Analytics validated Sprint 4 predictive model", dept: "AI & Data Science", time: "2 hours ago", actor: "Aiden Cross" },
  { id: "act-02", type: "RESEARCH_SUBMISSION", title: "Paper submitted to IEEE Academic Intelligence Symposium", dept: "AI & Data Science", time: "5 hours ago", actor: "Dr. Evelyn Vance & Sophia Sterling" },
  { id: "act-03", type: "HARDWARE_BENCHMARK", title: "Autonomous Drone SLAM flight trial completed in North Quad", dept: "Robotics & Automation", time: "Yesterday", actor: "Maya Lin & Dr. Aris Thorne" },
  { id: "act-04", type: "INTERVENTION_RESOLVED", title: "Neo4j graph memory leak addressed via Failure Memory FM-02", dept: "Computer Science", time: "2 days ago", actor: "Devon Reed" },
  { id: "act-05", type: "INDUSTRY_SPONSORSHIP", title: "$120k MedTech AI Research Grant formalized", dept: "Innovation Hub", time: "3 days ago", actor: "Dr. Julian Hayes" }
];

function InstitutionalActivity() {
  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <Activity size={14} />
            CAMPUS INTELLIGENCE
          </div>
          <h1 className="intel-title">Institutional Activity Stream</h1>
          <p className="intel-desc">
            Unified institutional pulse capturing current capstone commits, research submissions, faculty advising interventions, and laboratory milestones.
          </p>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="intel-kpi-grid">
        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Campus Activity Score</span>
            <div className="intel-kpi-icon green"><Activity size={18} /></div>
          </div>
          <div className="intel-kpi-value">88.4 / 100</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">+4.2 pts</span>
            <span>Above baseline</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Weekly Telemetry Events</span>
            <div className="intel-kpi-icon blue"><Zap size={18} /></div>
          </div>
          <div className="intel-kpi-value">1,480 Events</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">Commits &amp; Reviews</span>
            <span>Active labs</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Milestone Sign-Offs</span>
            <div className="intel-kpi-icon purple"><CheckCircle2 size={18} /></div>
          </div>
          <div className="intel-kpi-value">46 This Week</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">Across 6 departments</span>
            <span>Faculty verified</span>
          </div>
        </div>
      </div>

      {/* ACTIVITY FEED */}
      <div className="intel-card">
        <div className="intel-card-header">
          <div>
            <h2>Verified Institutional Events Stream</h2>
            <div className="intel-card-subtitle">Institutional Dataset: academic signals logged across campus departments</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {ACTIVITY_EVENTS.map((e) => (
            <div
              key={e.id}
              style={{
                padding: "16px 18px",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                background: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span className="intel-badge info">{e.type.replace("_", " ")}</span>
                  <span style={{ fontSize: "0.78rem", color: "#64748b" }}>{e.time} &bull; {e.dept}</span>
                </div>
                <strong style={{ color: "#102544", fontSize: "0.92rem", display: "block" }}>
                  {e.title}
                </strong>
                <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Scholar/Lead: {e.actor}</span>
              </div>

              <span className="intel-badge success" style={{ alignSelf: "center" }}>
                Verified
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InstitutionalActivity;
