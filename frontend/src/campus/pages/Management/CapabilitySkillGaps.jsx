import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowDown,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  DollarSign,
  Flag,
  Sparkles,
  TrendingDown,
  Users,
} from "lucide-react";

import { CAPABILITY_GAPS } from "../../data/managementData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const ENRICHED_GAPS = CAPABILITY_GAPS.map((gap, idx) => ({
  ...gap,
  recommendedResource:
    idx === 0
      ? "$65,000 for 16 Edge Jetson Orin Nano Developer Testbenches"
      : idx === 1
      ? "$35,000 for Cloud Cyber Range & Red-Team Sandbox Subscription"
      : "$45,000 for High-Throughput NVMe Vector Storage Nodes",
}));

function CapabilitySkillGaps() {
  const navigate = useNavigate();
  const [gaps] = useState(ENRICHED_GAPS);

  return (
    <div className="intel-page">
      {/* HEADER */}
      <IntelligencePageHeader
        eyebrow="CAMPUS INTELLIGENCE"
        eyebrowIcon={Award}
        title="Capability &amp; Skill Gap Intelligence"
        description="Structured deficit analysis tracking current campus capabilities against emerging industry standards to direct curricular updates, faculty workshops, and capital equipment allocation."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/skill-radar")}
            >
              <Award size={15} />
              <span>Campus Skill Radar</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => navigate("/management/training")}
            >
              <Calendar size={15} />
              <span>Workshop Planning</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Identified Capability Deficits"
          value={gaps.length}
          icon={AlertTriangle}
          variant="amber"
          delta="High Severity"
          deltaType="warning"
          meta="Across 4 Departments"
        />
        <KpiCard
          label="Scholars Affected"
          value="640 Scholars"
          icon={Users}
          variant="blue"
          delta="Senior & Junior Cohorts"
          deltaType="positive"
          meta="Graduating in 2026-2027"
        />
        <KpiCard
          label="Required Remediation Budget"
          value="$145,000"
          icon={DollarSign}
          variant="purple"
          delta="100% Offset by Grants"
          deltaType="positive"
          meta="Resource allocation needed"
          onClick={() => navigate("/management/resources")}
        />
      </KpiGrid>

      {/* STRUCTURED GAPS CHAIN */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {gaps.map((gap) => (
          <div
            key={gap.id}
            className="intel-card"
            style={{
              margin: 0,
              padding: "26px",
              borderLeft: `5px solid ${gap.impactSeverity === "HIGH" ? "#dc2626" : "#d97706"}`,
            }}
          >
            {/* TOP HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <StatusBadge variant={gap.impactSeverity === "HIGH" ? "danger" : "warning"}>
                    {gap.impactSeverity} IMPACT DEFICIT
                  </StatusBadge>
                  <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Urgency: {gap.urgency}</span>
                </div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#102544", margin: 0 }}>
                  {gap.domain}
                </h2>
              </div>

              <div style={{ textAlign: "right", background: "#fff1f2", border: "1px solid #fecdd3", padding: "8px 16px", borderRadius: "10px" }}>
                <span style={{ fontSize: "0.72rem", color: "#b91c1c", textTransform: "uppercase", fontWeight: 700 }}>
                  Quantified Deficit
                </span>
                <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "#dc2626" }}>-{gap.gapDelta}%</div>
              </div>
            </div>

            {/* 6-STEP STRUCTURED FLOW: CAPABILITY -> STANDARD -> GAP -> DEPTS -> TRAINING -> RESOURCE */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              
              {/* LEVEL 1 & 2: CURRENT VS REQUIRED */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>1. Current Campus Capability</span>
                    <strong style={{ color: "#dc2626" }}>{gap.currentScore}%</strong>
                  </div>
                  <div className="intel-progress-bar">
                    <div className="intel-progress-fill rose" style={{ width: `${gap.currentScore}%` }} />
                  </div>
                </div>

                <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>2. Industry Required Standard</span>
                    <strong style={{ color: "#059669" }}>{gap.requiredScore}%</strong>
                  </div>
                  <div className="intel-progress-bar">
                    <div className="intel-progress-fill green" style={{ width: `${gap.requiredScore}%` }} />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={14} color="#94a3b8" /></div>

              {/* LEVEL 3 & 4: AFFECTED DEPTS & STUDENTS */}
              <div style={{ background: "#ffffff", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                  3 &bull; 4. Affected Departments &amp; Student Cohorts
                </strong>
                <p style={{ margin: 0, fontSize: "0.86rem", color: "#1e293b" }}>
                  Impacting <strong>{gap.affectedStudentsCount} Scholars</strong> across: {gap.affectedDepartments.join(" • ")}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={14} color="#94a3b8" /></div>

              {/* LEVEL 5: RECOMMENDED TRAINING */}
              <div style={{ background: "#f0fdf4", padding: "14px 16px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#15803d", textTransform: "uppercase", marginBottom: "4px" }}>
                  5. Recommended Training &amp; Curricular Action
                </strong>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#166534", fontWeight: 600 }}>
                  {gap.recommendedTraining}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={14} color="#94a3b8" /></div>

              {/* LEVEL 6: RECOMMENDED RESOURCE ALLOCATION */}
              <div style={{ background: "#eff6ff", padding: "14px 16px", borderRadius: "8px", border: "1px solid #bfdbfe", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <strong style={{ display: "block", fontSize: "0.74rem", color: "#1d4ed8", textTransform: "uppercase", marginBottom: "2px" }}>
                    6. Recommended Resource Allocation
                  </strong>
                  <span style={{ fontSize: "0.88rem", color: "#1e3a8a", fontWeight: 700 }}>
                    {gap.recommendedResource}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    className="intel-btn-secondary"
                    onClick={() => navigate("/management/resources")}
                    style={{ fontSize: "0.78rem", padding: "6px 12px" }}
                  >
                    <DollarSign size={13} />
                    <span>Authorize CapEx</span>
                  </button>
                  <button
                    type="button"
                    className="intel-btn-primary"
                    onClick={() => navigate("/management/training")}
                    style={{ fontSize: "0.78rem", padding: "6px 12px" }}
                  >
                    <Calendar size={13} />
                    <span>Schedule Workshop</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CapabilitySkillGaps;
