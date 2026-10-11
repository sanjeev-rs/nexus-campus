import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { CAMPUS_SKILL_RADAR } from "../../data/managementData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
  IntelligenceFilterBar,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const ENRICHED_RADAR = [
  {
    domain: "AI & Machine Learning",
    currentCapability: 88,
    industryDemand: 94,
    delta: "-6%",
    growth: "+22% YoY",
    trend: "HIGH_GROWTH",
    status: "Priority Expansion",
    departments: ["AI & Data Science", "Computer Science", "Innovation Hub"],
    recommendedAction: "Expand GPU cluster compute and introduce Model Quantization elective.",
  },
  {
    domain: "Cloud & Distributed Systems",
    currentCapability: 82,
    industryDemand: 89,
    delta: "-7%",
    growth: "+14% YoY",
    trend: "STABLE_HIGH",
    status: "Healthy",
    departments: ["Computer Science", "Information Technology"],
    recommendedAction: "Incorporate Kubernetes and microservice resilience testing into 3rd year labs.",
  },
  {
    domain: "Perception & Robotics (ROS 2)",
    currentCapability: 74,
    industryDemand: 86,
    delta: "-12%",
    growth: "+18% YoY",
    trend: "CRITICAL_GAP",
    status: "Intervention Needed",
    departments: ["Robotics & Automation", "AI & Data Science"],
    recommendedAction: "Authorize $65k hardware procurement for 16 edge Jetson testbenches.",
  },
  {
    domain: "Edge Hardware & Embedded C++",
    currentCapability: 71,
    industryDemand: 82,
    delta: "-11%",
    growth: "+9% YoY",
    trend: "MODERATE_GAP",
    status: "Workshop Recommended",
    departments: ["Electronics & Communication", "Robotics"],
    recommendedAction: "Host a 3-week hands-on workshop on firmware debugging and RTOS.",
  },
  {
    domain: "Modern Web & Mobile UI",
    currentCapability: 91,
    industryDemand: 85,
    delta: "+6%",
    growth: "+12% YoY",
    trend: "SURPLUS",
    status: "Self-Sustaining",
    departments: ["Information Technology", "Computer Science"],
    recommendedAction: "Channel student surplus into institutional campus tools development.",
  },
  {
    domain: "Cybersecurity & Cryptography",
    currentCapability: 64,
    industryDemand: 88,
    delta: "-24%",
    growth: "+4% YoY",
    trend: "CRITICAL_GAP",
    status: "Curriculum Intervention",
    departments: ["Computer Science", "Information Technology"],
    recommendedAction: "Launch mandatory Secure Software Architecture curriculum module in Fall 2026.",
  },
];

function CampusSkillRadar() {
  const navigate = useNavigate();
  const [radarData] = useState(ENRICHED_RADAR);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = radarData.filter((item) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.domain.toLowerCase().includes(q) ||
      item.departments.some((d) => d.toLowerCase().includes(q));

    if (!matchesSearch) return false;
    if (filter === "ALL") return true;
    if (filter === "GAPS") return item.delta.startsWith("-");
    if (filter === "SURPLUS") return item.delta.startsWith("+");
    return true;
  });

  const filterPills = [
    { id: "ALL", label: "All Competency Domains", count: radarData.length },
    { id: "GAPS", label: "Capability Deficits", count: radarData.filter((i) => i.delta.startsWith("-")).length },
    { id: "SURPLUS", label: "Competitive Surpluses", count: radarData.filter((i) => i.delta.startsWith("+")).length },
  ];

  return (
    <div className="intel-page">
      {/* HEADER */}
      <IntelligencePageHeader
        eyebrow="CAMPUS INTELLIGENCE"
        eyebrowIcon={Target}
        title="Campus Skill Radar"
        description="Macro-level campus capability radar comparing current verified student competencies against external enterprise demand and institutional benchmarks."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/skill-gaps")}
            >
              <Award size={15} />
              <span>Skill Gaps Analysis</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => navigate("/management/training")}
            >
              <Calendar size={15} />
              <span>Plan Training Workshop</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Assessed Domains"
          value={radarData.length}
          icon={Target}
          variant="blue"
          delta="Institutional Coverage"
          deltaType="positive"
          meta="2,840 Scholars"
        />
        <KpiCard
          label="Highest Mastery Domain"
          value="91%"
          icon={Award}
          variant="green"
          delta="Modern Web & UI"
          deltaType="positive"
          meta="Self-Sustaining Surplus"
        />
        <KpiCard
          label="Critical Capability Gap"
          value="-24%"
          icon={AlertTriangle}
          variant="rose"
          delta="Cybersecurity Deficit"
          deltaType="negative"
          meta="Curriculum intervention required"
          onClick={() => navigate("/management/skill-gaps")}
        />
      </KpiGrid>

      {/* FILTER & SEARCH BAR */}
      <IntelligenceFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search competency domains or departments..."
        pills={filterPills}
        activePill={filter}
        onPillSelect={setFilter}
        totalCount={radarData.length}
        filteredCount={filtered.length}
      />

      {/* SKILL RADAR COMPARATIVE MATRIX */}
      <div className="intel-card">
        <div className="intel-card-header">
          <div>
            <h2>Institutional Capability vs Industry Demand</h2>
            <div className="intel-card-subtitle">
              Differential analysis highlighting institutional training opportunities across all 6 departments
            </div>
          </div>
        </div>

        <div className="intel-table-container" style={{ border: "none" }}>
          <table className="intel-table">
            <thead>
              <tr>
                <th>Domain Category</th>
                <th>Current Capability</th>
                <th>Industry Benchmark</th>
                <th>Institutional Delta</th>
                <th>Growth Velocity</th>
                <th>Affected Departments</th>
                <th>Strategic Governance Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.domain}>
                  <td>
                    <strong style={{ display: "block", color: "#102544" }}>{item.domain}</strong>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      {item.trend === "HIGH_GROWTH"
                        ? "High Growth Velocity"
                        : item.trend === "CRITICAL_GAP"
                        ? "High Priority Deficit"
                        : "Stable Trajectory"}
                    </span>
                  </td>
                  <td style={{ minWidth: "140px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "3px" }}>
                      <span>Campus</span>
                      <strong>{item.currentCapability}%</strong>
                    </div>
                    <div className="intel-progress-bar">
                      <div
                        className={`intel-progress-fill ${item.currentCapability >= 80 ? "green" : item.currentCapability >= 70 ? "blue" : "rose"}`}
                        style={{ width: `${item.currentCapability}%` }}
                      />
                    </div>
                  </td>
                  <td style={{ minWidth: "140px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "3px" }}>
                      <span>Benchmark</span>
                      <strong style={{ color: "#475569" }}>{item.industryDemand}%</strong>
                    </div>
                    <div className="intel-progress-bar">
                      <div className="intel-progress-fill blue" style={{ width: `${item.industryDemand}%` }} />
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        color: item.delta.startsWith("+") ? "#059669" : item.delta.startsWith("-1") || item.delta.startsWith("-2") ? "#dc2626" : "#d97706",
                      }}
                    >
                      {item.delta}
                    </span>
                  </td>
                  <td>
                    <span className="intel-badge info" style={{ fontWeight: 700 }}>
                      <TrendingUp size={12} style={{ marginRight: "3px" }} />
                      {item.growth}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {item.departments.map((dept) => (
                        <span key={dept} style={{ background: "#f1f5f9", color: "#334155", fontSize: "0.72rem", padding: "2px 6px", borderRadius: "4px" }}>
                          {dept}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ maxWidth: "300px" }}>
                    <p style={{ margin: 0, fontSize: "0.82rem", color: "#1e293b", lineHeight: "1.4" }}>
                      {item.recommendedAction}
                    </p>
                    <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                      <button
                        type="button"
                        onClick={() => navigate("/management/training")}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "#2563eb", fontSize: "0.76rem", fontWeight: 700 }}
                      >
                        Plan Training &rarr;
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/management/missions")}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: "#059669", fontSize: "0.76rem", fontWeight: 700 }}
                      >
                        Create Mission &rarr;
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CampusSkillRadar;
