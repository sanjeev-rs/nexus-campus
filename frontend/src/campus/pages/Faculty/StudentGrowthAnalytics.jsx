import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { ADVISEES } from "../../data/facultyData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
  TimelineView,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const COHORT_SIGNALS = [
  { cohort: "Year 4 (Class of 2026)", avgProgress: 88, velocity: "+18%", activeCapstones: 18, riskCount: 1, milestoneStatus: "Defense Stage" },
  { cohort: "Year 3 (Class of 2027)", avgProgress: 64, velocity: "+12%", activeCapstones: 22, riskCount: 2, milestoneStatus: "Mid-Term Sprint 4" },
  { cohort: "Year 2 (Class of 2028)", avgProgress: 42, velocity: "+15%", activeCapstones: 8, riskCount: 0, milestoneStatus: "Core Prototype" },
];

const SKILL_VELOCITY = [
  { skill: "Vector Databases & Dense RAG", velocity: "+28% YoY", mastery: "89% of Capstones", status: "Accelerating" },
  { skill: "PyTorch & Deep Learning", velocity: "+22% YoY", mastery: "84% of Capstones", status: "Accelerating" },
  { skill: "ROS 2 Autonomous Navigation", velocity: "+16% YoY", mastery: "68% of Capstones", status: "Normal" },
  { skill: "Graph DBs & Cypher Schema", velocity: "+8% YoY", mastery: "52% of Capstones", status: "Bottleneck" },
];

const GROWTH_TIMELINE = [
  {
    id: "tl-01",
    title: "Sprint 4: Thesis & Capstone Defense Clearances",
    date: "Current Academic Term",
    description: "Year 4 scholars concluding experimental evaluations and drafting manuscripts for thesis defense panel review.",
    status: "in_progress",
    current: true,
    meta: "18 Active Defenses Scheduled",
  },
  {
    id: "tl-02",
    title: "Sprint 3: Prototype Integration & Telemetry Validation",
    date: "4 Weeks Ago",
    description: "Advisees completed hardware-in-the-loop tests, latency benchmarks, and dataset schema normalization.",
    status: "completed",
    completed: true,
    meta: "35 Milestones Passed (92% pass rate)",
  },
  {
    id: "tl-03",
    title: "Sprint 2: Architecture Review & Failure Memory Pre-Checks",
    date: "8 Weeks Ago",
    description: "Cross-checked all repository designs against documented historical failure memories to avoid duplicate bottlenecks.",
    status: "completed",
    completed: true,
    meta: "Zero repeat architectural errors",
  },
];

function StudentGrowthAnalytics() {
  const navigate = useNavigate();

  return (
    <div className="intel-page">
      {/* HEADER */}
      <IntelligencePageHeader
        eyebrow="STUDENT INTELLIGENCE"
        eyebrowIcon={TrendingUp}
        title="Student Growth &amp; Longitudinal Velocity"
        description="Competency progression, milestone velocity, and cohort-level progression metrics across all supervised advisees to evaluate developmental trajectory."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/skills")}
            >
              <Award size={15} />
              <span>Skill Matrix</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => navigate("/faculty/advisees")}
            >
              <Users size={15} />
              <span>Advisee Twins ({ADVISEES.length})</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Average Cohort Velocity"
          value="+15.4%"
          icon={TrendingUp}
          variant="green"
          delta="Month-over-Month"
          deltaType="positive"
          meta="Ahead of semester benchmark"
        />
        <KpiCard
          label="Milestone Completion Rate"
          value="72.8%"
          icon={CheckCircle2}
          variant="blue"
          delta="35 Milestones Passed"
          deltaType="positive"
          meta="This academic term"
        />
        <KpiCard
          label="Competency Breadth"
          value="4.2 Skills"
          icon={Award}
          variant="purple"
          delta="Per Advisee"
          deltaType="positive"
          meta="Verified in lab assessments"
        />
        <KpiCard
          label="Emerging Risks Flagged"
          value="3 Scholars"
          icon={AlertCircle}
          variant="rose"
          delta="Requires Intervention"
          deltaType="negative"
          meta="Milestone stalled"
          onClick={() => navigate("/faculty/at-risk")}
        />
      </KpiGrid>

      {/* COHORT PROGRESSION MATRIX */}
      <div className="intel-card" style={{ marginBottom: "24px" }}>
        <div className="intel-card-header">
          <div>
            <h2>Cohort Progression Matrix</h2>
            <div className="intel-card-subtitle">
              Comparative milestone velocity and capstone engagement across academic batches
            </div>
          </div>
        </div>

        <div className="intel-table-container" style={{ border: "none" }}>
          <table className="intel-table">
            <thead>
              <tr>
                <th>Academic Batch</th>
                <th>Avg Progress</th>
                <th>Monthly Velocity</th>
                <th>Active Capstones</th>
                <th>Milestone Stage</th>
                <th>At-Risk Signals</th>
                <th>Trajectory Evaluation</th>
              </tr>
            </thead>
            <tbody>
              {COHORT_SIGNALS.map((row) => (
                <tr key={row.cohort}>
                  <td>
                    <strong style={{ color: "#102544" }}>{row.cohort}</strong>
                  </td>
                  <td style={{ minWidth: "160px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "4px" }}>
                      <span>Completion</span>
                      <strong>{row.avgProgress}%</strong>
                    </div>
                    <div className="intel-progress-bar">
                      <div className="intel-progress-fill green" style={{ width: `${row.avgProgress}%` }} />
                    </div>
                  </td>
                  <td>
                    <StatusBadge variant="success">{row.velocity}</StatusBadge>
                  </td>
                  <td style={{ color: "#334155", fontWeight: 600 }}>{row.activeCapstones} Projects</td>
                  <td style={{ fontSize: "0.84rem", color: "#64748b" }}>{row.milestoneStatus}</td>
                  <td>
                    {row.riskCount > 0 ? (
                      <button
                        type="button"
                        onClick={() => navigate("/faculty/at-risk")}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                      >
                        <StatusBadge variant="warning">{row.riskCount} In Review &rarr;</StatusBadge>
                      </button>
                    ) : (
                      <StatusBadge variant="success">Zero Alerts</StatusBadge>
                    )}
                  </td>
                  <td>
                    <span style={{ fontSize: "0.82rem", color: "#059669", fontWeight: 700 }}>
                      Exceeding Benchmark
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SKILL VELOCITY & GROWTH TIMELINE */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        
        {/* SKILL VELOCITY BREAKDOWN */}
        <div className="intel-card" style={{ margin: 0, padding: "24px" }}>
          <div className="intel-card-header">
            <div>
              <h2>Skill Acquisition Velocity</h2>
              <div className="intel-card-subtitle">Fastest accelerating vs bottleneck competencies</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {SKILL_VELOCITY.map((sv) => (
              <div
                key={sv.skill}
                style={{
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid #e2e8f0",
                  background: "#f8fafc",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <strong style={{ fontSize: "0.92rem", color: "#102544" }}>{sv.skill}</strong>
                  <StatusBadge variant={sv.status === "Accelerating" ? "success" : sv.status === "Normal" ? "info" : "warning"}>
                    {sv.velocity}
                  </StatusBadge>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#64748b" }}>
                  <span>{sv.mastery}</span>
                  <span style={{ fontWeight: 600, color: sv.status === "Bottleneck" ? "#d97706" : "#059669" }}>
                    {sv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GROWTH TIMELINE VIEW */}
        <div className="intel-card" style={{ margin: 0, padding: "24px" }}>
          <div className="intel-card-header">
            <div>
              <h2>Milestone Growth Trajectory</h2>
              <div className="intel-card-subtitle">Term sprint checkpoints and cohort reviews</div>
            </div>
          </div>

          <TimelineView items={GROWTH_TIMELINE} />
        </div>

      </div>
    </div>
  );
}

export default StudentGrowthAnalytics;
