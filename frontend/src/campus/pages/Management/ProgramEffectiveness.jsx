import { useState } from "react";
import {
  Award,
  CheckCircle2,
  FileCheck,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import "../../components/shared/SharedIntelligence.css";

const PROGRAMS = [
  {
    name: "FastAPI & Microservices Architecture Sprint",
    type: "Technical Bootcamp",
    cohort: "Year 3 Computer Science",
    enrolled: 142,
    completionRate: "96%",
    skillGain: "+32% Ingestion Capability",
    roi: "Directly unblocked 18 Capstone Backends"
  },
  {
    name: "ROS 2 Autonomous Navigation & SLAM Lab",
    type: "Hardware Workshop",
    cohort: "Year 4 Robotics & ECE",
    enrolled: 68,
    completionRate: "91%",
    skillGain: "+28% Odometry Precision",
    roi: "Supported 3 Patent Disclosures"
  },
  {
    name: "Dense Vector Search & Academic RAG Workshop",
    type: "AI Intensive",
    cohort: "Year 3 & 4 AI & Data Science",
    enrolled: 180,
    completionRate: "98%",
    skillGain: "+42% RAG Benchmark Precision",
    roi: "Resulted in 4 Conference Papers"
  }
];

function ProgramEffectiveness() {
  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <FileCheck size={14} />
            ACADEMIC INTELLIGENCE
          </div>
          <h1 className="intel-title">Program Effectiveness Intelligence</h1>
          <p className="intel-desc">
            Empirical outcome evaluation of institutional bootcamps, hardware workshops, and faculty training initiatives.
          </p>
        </div>
      </div>

      {/* PROGRAMS LIST */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "20px" }}>
        {PROGRAMS.map((prog) => (
          <div key={prog.name} className="intel-card" style={{ padding: "24px", margin: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <span className="intel-badge info">{prog.type}</span>
              <span className="intel-badge success">{prog.completionRate} Completed</span>
            </div>

            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#102544", margin: "0 0 6px" }}>
              {prog.name}
            </h3>

            <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 14px" }}>
              Target Cohort: <strong>{prog.cohort}</strong> ({prog.enrolled} Scholars)
            </p>

            <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", marginBottom: "12px", fontSize: "0.84rem" }}>
              <span style={{ color: "#64748b" }}>Measured Competency Uplift:</span>
              <strong style={{ color: "#059669", display: "block", marginTop: "2px" }}>{prog.skillGain}</strong>
            </div>

            <div style={{ background: "#eff6ff", padding: "12px", borderRadius: "8px", fontSize: "0.82rem", color: "#1d4ed8", fontWeight: 600 }}>
              Institutional Return: {prog.roi}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgramEffectiveness;
