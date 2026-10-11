import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Compass,
  ExternalLink,
  Layers,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { DEPARTMENT_SKILL_INDEX } from "../../data/facultyData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
  IntelligenceFilterBar,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const SKILL_DOMAINS = ["All", "Core Programming", "AI & Machine Learning", "Perception Systems", "Systems & Backend", "Data Architecture", "Robotics", "Edge Optimization"];

const ENRICHED_SKILLS = DEPARTMENT_SKILL_INDEX.map((s, idx) => ({
  ...s,
  projectDemand: idx === 0 ? "14 Projects" : idx === 1 ? "12 Projects" : idx === 2 ? "8 Projects" : idx === 3 ? "9 Projects" : idx === 4 ? "7 Projects" : idx === 5 ? "5 Projects" : idx === 6 ? "6 Projects" : "4 Projects",
  gapLevel: idx === 5 || idx === 7 ? "High Deficit" : idx === 4 ? "Moderate Deficit" : "Surplus / On Track",
  recommendation: idx === 5 ? "Schedule Cypher Query batch optimization workshop" : idx === 7 ? "Authorize INT8 TensorRT bootcamp in Robotics Lab" : "Self-sustaining capability",
}));

function FacultySkillIntelligence() {
  const navigate = useNavigate();
  const [skills] = useState(ENRICHED_SKILLS);
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [search, setSearch] = useState("");

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesDomain = selectedDomain === "All" || skill.category === selectedDomain;
      const matchesSearch =
        !search ||
        skill.name.toLowerCase().includes(search.toLowerCase()) ||
        skill.category.toLowerCase().includes(search.toLowerCase());
      return matchesDomain && matchesSearch;
    });
  }, [skills, selectedDomain, search]);

  const filterPills = SKILL_DOMAINS.map((dom) => ({
    id: dom,
    label: dom,
    count: dom === "All" ? skills.length : skills.filter((s) => s.category === dom).length,
  }));

  return (
    <div className="intel-page">
      {/* HEADER */}
      <IntelligencePageHeader
        eyebrow="STUDENT INTELLIGENCE"
        eyebrowIcon={Award}
        title="Skill &amp; Competency Intelligence"
        description="Empirical departmental capability distribution, verified student competencies, project skill demands, and critical engineering skill gaps across the academic cohort."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/growth")}
            >
              <TrendingUp size={15} />
              <span>Growth Velocity</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => navigate("/faculty/project-dna")}
            >
              <Layers size={15} />
              <span>Project DNA Demand</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Mastered Competencies"
          value={skills.filter((s) => s.status === "Mastered").length}
          icon={CheckCircle2}
          variant="green"
          delta=">80% Proficiency"
          deltaType="positive"
          meta="Across 40+ students"
        />
        <KpiCard
          label="Developing Competencies"
          value={skills.filter((s) => s.status === "Developing").length}
          icon={TrendingUp}
          variant="blue"
          delta="Active Lab Practice"
          deltaType="positive"
          meta="60-80% Proficiency"
        />
        <KpiCard
          label="Identified Skill Gaps"
          value={skills.filter((s) => s.status.includes("Weak")).length}
          icon={AlertTriangle}
          variant="amber"
          delta="Mentoring Required"
          deltaType="negative"
          meta="<60% Proficiency"
        />
        <KpiCard
          label="Fastest Accelerating"
          value="+25% YoY"
          icon={Sparkles}
          variant="purple"
          delta="ONNX & TensorRT"
          deltaType="positive"
          meta="Edge Systems Optimization"
        />
      </KpiGrid>

      {/* FILTER BAR */}
      <IntelligenceFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search skills, tools, or domain categories..."
        pills={filterPills}
        activePill={selectedDomain}
        onPillSelect={setSelectedDomain}
        totalCount={skills.length}
        filteredCount={filteredSkills.length}
      />

      {/* SKILLS DISTRIBUTION TABLE */}
      <div className="intel-table-container">
        <table className="intel-table">
          <thead>
            <tr>
              <th>Competency Name</th>
              <th>Category Domain</th>
              <th>Student Mastery</th>
              <th>Assessed Students</th>
              <th>Capstones Demanding</th>
              <th>Gap Analysis</th>
              <th>Annual Trend</th>
              <th style={{ textAlign: "right" }}>Ecosystem Traces</th>
            </tr>
          </thead>
          <tbody>
            {filteredSkills.map((s) => (
              <tr key={s.name}>
                <td>
                  <strong style={{ color: "#102544", display: "block" }}>{s.name}</strong>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Verified via lab telemetry</span>
                </td>
                <td>
                  <span className="intel-badge info">{s.category}</span>
                </td>
                <td style={{ minWidth: "140px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "3px" }}>
                    <span>Proficiency</span>
                    <strong>{s.mastery}%</strong>
                  </div>
                  <div className="intel-progress-bar">
                    <div
                      className={`intel-progress-fill ${s.mastery >= 80 ? "green" : s.mastery >= 65 ? "blue" : "amber"}`}
                      style={{ width: `${s.mastery}%` }}
                    />
                  </div>
                </td>
                <td style={{ fontWeight: 600, color: "#1e293b" }}>{s.count}</td>
                <td style={{ fontWeight: 600, color: "#2563eb" }}>{s.projectDemand}</td>
                <td>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "6px",
                      background: s.gapLevel.includes("High") ? "#fff1f2" : s.gapLevel.includes("Moderate") ? "#fffbeb" : "#ecfdf5",
                      color: s.gapLevel.includes("High") ? "#b91c1c" : s.gapLevel.includes("Moderate") ? "#b45309" : "#047857",
                    }}
                  >
                    {s.gapLevel}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 800, color: "#059669", fontSize: "0.85rem" }}>{s.trend}</span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      className="intel-pill"
                      onClick={() => navigate("/faculty/advisees")}
                      title="Inspect Students with this skill"
                      style={{ fontSize: "0.74rem" }}
                    >
                      <Users size={12} />
                      <span>Students</span>
                    </button>
                    <button
                      type="button"
                      className="intel-pill"
                      onClick={() => navigate("/faculty/project-dna")}
                      title="Inspect Projects demanding this skill"
                      style={{ fontSize: "0.74rem" }}
                    >
                      <Layers size={12} />
                      <span>Projects</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FacultySkillIntelligence;
