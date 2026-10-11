import { useState } from "react";
import {
  Award,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

import "../../components/shared/SharedIntelligence.css";

const OPPORTUNITIES = [
  {
    title: "Autonomous Vehicle Perception Fellowship (2026)",
    sponsor: "AeroTech Dynamics & Autonomous Systems",
    type: "Industry Fellowship",
    funding: "$45,000 / Scholar",
    matchedSkills: ["ROS 2", "Stereo SLAM", "Jetson C++", "Computer Vision"],
    eligibleStudents: 14,
    deadline: "Dec 15, 2026",
    status: "Open"
  },
  {
    title: "National Academic RAG & Language Model Challenge",
    sponsor: "Ministry of Science & Education",
    type: "National Grant",
    funding: "$120,000 Team Award",
    matchedSkills: ["Dense Vector Search", "PyTorch", "Table Extraction", "FastAPI"],
    eligibleStudents: 22,
    deadline: "Jan 10, 2027",
    status: "Open"
  },
  {
    title: "Campus Clean Micro-Grid Seed Accelerator",
    sponsor: "Clean Energy Transition Alliance",
    type: "Incubation Grant",
    funding: "$80,000 Seed Capital",
    matchedSkills: ["IoT Telemetry", "Embedded C", "Predictive Load Modeling"],
    eligibleStudents: 18,
    deadline: "Nov 30, 2026",
    status: "Closing Soon"
  }
];

function OpportunityIntelligence() {
  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <Briefcase size={14} />
            STRATEGIC INTELLIGENCE
          </div>
          <h1 className="intel-title">Opportunity Intelligence</h1>
          <p className="intel-desc">
            External corporate fellowships, national hackathons, research grants, and commercial incubators algorithmically paired with verified campus skill clusters.
          </p>
        </div>
      </div>

      {/* OPPORTUNITIES LIST */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "20px" }}>
        {OPPORTUNITIES.map((opp) => (
          <div key={opp.title} className="intel-card" style={{ padding: "24px", margin: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              <span className="intel-badge info">{opp.type}</span>
              <span className={`intel-badge ${opp.status === "Closing Soon" ? "warning" : "success"}`}>{opp.status}</span>
            </div>

            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#102544", margin: "0 0 4px" }}>
              {opp.title}
            </h3>
            <span style={{ fontSize: "0.82rem", color: "#64748b", display: "block", marginBottom: "12px" }}>
              Sponsor: <strong>{opp.sponsor}</strong>
            </span>

            <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", marginBottom: "14px", fontSize: "0.84rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ color: "#64748b" }}>Funding / Award:</span>
                <strong style={{ color: "#059669" }}>{opp.funding}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#64748b" }}>Matched Scholars:</span>
                <strong style={{ color: "#2563eb" }}>{opp.eligibleStudents} Qualified</strong>
              </div>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
                Target Verified Skills:
              </strong>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {opp.matchedSkills.map((sk) => (
                  <span key={sk} style={{ background: "#eff6ff", color: "#1d4ed8", fontSize: "0.76rem", padding: "3px 8px", borderRadius: "4px", fontWeight: 600 }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "12px", fontSize: "0.78rem" }}>
              <span style={{ color: "#64748b" }}>Deadline: <strong>{opp.deadline}</strong></span>
              <span style={{ color: "#2563eb", fontWeight: 600 }}>Nominate Scholars &rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OpportunityIntelligence;
