import { useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  FolderKanban,
  GraduationCap,
  Layers,
  Sparkles,
  Zap,
} from "lucide-react";

import "../../components/shared/SharedIntelligence.css";

const LEARNING_PILLARS = [
  {
    title: "Completed Projects Synthesis",
    count: "428 Projects",
    metric: "186 Reusable Modules",
    description: "Architectural schemas, telemetry APIs, and dataset scrapers from previous capstones indexed for student reuse.",
    impact: "Estimated 320 development hours saved per cohort."
  },
  {
    title: "Institutional Failure Taxonomy",
    count: "34 Post-Mortems",
    metric: "100% Documented",
    description: "Failure post-mortems capturing memory leaks, sensor distortion, and data leakage preventing recurring setbacks.",
    impact: "42% reduction in repeat technical stalls since 2024."
  },
  {
    title: "Research-to-Curriculum Pipeline",
    count: "57 Papers",
    metric: "14 Lab Toolkits",
    description: "Breakthrough algorithms developed in faculty labs distilled into hands-on lab assignments within 2 semesters.",
    impact: "94% student pass rate in advanced electives."
  },
  {
    title: "Cross-Department Mentorship Capital",
    count: "142 Faculty",
    metric: "48 Active Matchings",
    description: "Mentoring capacity mapped across interdisciplinary boundaries uniting AI, hardware, and medical sciences.",
    impact: "38% increase in inter-department capstone velocity."
  }
];

function InstitutionalLearningView() {
  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <GraduationCap size={14} />
            INSTITUTIONAL KNOWLEDGE
          </div>
          <h1 className="intel-title">Institutional Learning Ecosystem</h1>
          <p className="intel-desc">
            How academic knowledge accumulates, self-corrects, and accelerates across student generations through institutional memory and project synthesis.
          </p>
        </div>
      </div>

      {/* LEARNING PILLARS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px" }}>
        {LEARNING_PILLARS.map((p) => (
          <div key={p.title} className="intel-card" style={{ padding: "26px", margin: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>
                {p.count}
              </span>
              <span className="intel-badge success">{p.metric}</span>
            </div>

            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#102544", margin: "0 0 8px" }}>
              {p.title}
            </h2>

            <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: "1.55", margin: "0 0 16px" }}>
              {p.description}
            </p>

            <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "8px", borderLeft: "3px solid #059669", fontSize: "0.82rem", color: "#166534", fontWeight: 600 }}>
              Measurable Campus Impact: {p.impact}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstitutionalLearningView;
