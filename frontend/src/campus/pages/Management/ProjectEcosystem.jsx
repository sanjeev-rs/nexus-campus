import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  ChevronRight,
  DollarSign,
  ExternalLink,
  Eye,
  Filter,
  FolderKanban,
  Layers,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

import { PROJECT_DNA_CATALOG } from "../../data/facultyData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
  IntelligenceFilterBar,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const EXPANDED_PROJECT_ECOSYSTEM = [
  ...PROJECT_DNA_CATALOG.map((p, idx) => ({
    ...p,
    type: idx === 0 ? "Senior Capstone" : idx === 1 ? "Industry Sponsored Lab" : idx === 2 ? "Faculty-Advised Research" : "Senior Capstone",
    status: idx === 2 ? "Completed / Defense" : "Active Execution",
    department: idx === 1 ? "Robotics & Automation" : "AI & Data Science",
    funding: idx === 0 ? "$18,000" : idx === 1 ? "$65,000" : idx === 2 ? "$45,000" : "$12,000",
  })),
  {
    id: "eco-05",
    title: "Autonomous Courtyard Clean Energy Patrol",
    slug: "clean-energy-patrol",
    type: "Innovation Hub",
    status: "Active Execution",
    department: "Interdisciplinary Innovation Hub",
    problem: "Real-time solar panel dust detection and micro-grid inverter efficiency telemetry.",
    technologies: ["IoT", "Embedded C", "FastAPI", "React", "Solar Inverter CAN-bus"],
    skills: ["CAN-bus Protocol", "Hardware Telemetry", "Power Inverters"],
    students: ["Aiden Cross", "Elena Rostova"],
    advisor: "Dr. Julian Hayes",
    funding: "$85,000",
    nextAction: "Complete Spring solar peak benchmark trial.",
  },
  {
    id: "eco-06",
    title: "Multi-Modal Biomedical Telemetry Engine",
    slug: "biomed-telemetry",
    type: "Faculty-Advised Research",
    status: "Completed / Defense",
    department: "AI & Data Science",
    problem: "ECG and pulse-oximetry anomaly detection running locally on wearable low-power edge chips.",
    technologies: ["PyTorch", "ONNX Runtime", "C++", "Bluetooth LE"],
    skills: ["Edge Deep Learning", "Bio-signal Filters", "Embedded Linux"],
    students: ["Chloe Bennett"],
    advisor: "Dr. Evelyn Vance",
    funding: "$110,000",
    nextAction: "Authorize journal manuscript defense.",
  },
];

const ECOSYSTEM_TYPES = ["All", "Active Execution", "Completed / Defense", "Senior Capstone", "Faculty-Advised Research", "Industry Sponsored Lab", "Innovation Hub"];

function ProjectEcosystem() {
  const navigate = useNavigate();
  const [projects] = useState(EXPANDED_PROJECT_ECOSYSTEM);
  const [typeFilter, setTypeFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.problem.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q)) ||
        p.skills.some((s) => s.toLowerCase().includes(q)) ||
        p.advisor.toLowerCase().includes(q);

      const matchesType =
        typeFilter === "All" ||
        p.status === typeFilter ||
        p.type === typeFilter;

      const matchesDept =
        deptFilter === "All" || p.department === deptFilter;

      return matchesSearch && matchesType && matchesDept;
    });
  }, [projects, search, typeFilter, deptFilter]);

  const typePills = ECOSYSTEM_TYPES.map((t) => ({
    id: t,
    label: t,
    count: t === "All" ? projects.length : projects.filter((p) => p.status === t || p.type === t).length,
  }));

  return (
    <div className="intel-page">
      {/* HEADER */}
      <IntelligencePageHeader
        eyebrow="PROJECT & RESEARCH"
        eyebrowIcon={FolderKanban}
        title="Campus Project Ecosystem Observatory"
        description="Macro-level repository oversight tracking 428 active projects, industry sponsored labs, innovation candidates, technology architectures, and capital funding allocation."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/duplication")}
            >
              <Layers size={15} />
              <span>Duplication Analysis</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => navigate("/management/project-dna")}
            >
              <ExternalLink size={15} />
              <span>Institutional Project DNA</span>
            </button>
          </>
        }
      />

      {/* KPI GRID */}
      <KpiGrid>
        <KpiCard
          label="Tracked Projects"
          value="428 Total"
          icon={FolderKanban}
          variant="blue"
          delta="+18% YoY Growth"
          deltaType="positive"
          meta="All 6 Departments"
        />
        <KpiCard
          label="Total Grant Deployment"
          value="$4.25M"
          icon={DollarSign}
          variant="green"
          delta="92% Utilized"
          deltaType="positive"
          meta="Lab Infrastructure & Benches"
        />
        <KpiCard
          label="Patent Candidates"
          value="19 Filings"
          icon={Sparkles}
          variant="purple"
          delta="Commercial Potential"
          deltaType="positive"
          meta="Disclosed in AY 2025-26"
          onClick={() => navigate("/management/ip")}
        />
      </KpiGrid>

      {/* FILTER BAR */}
      <IntelligenceFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search projects by title, stack, skill, or advisor..."
        pills={typePills}
        activePill={typeFilter}
        onPillSelect={setTypeFilter}
        totalCount={projects.length}
        filteredCount={filtered.length}
        actions={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Dept:</span>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              style={{
                fontSize: "0.82rem",
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                color: "#1e293b",
                fontWeight: 600,
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="All">All Departments</option>
              <option value="AI & Data Science">AI & Data Science</option>
              <option value="Robotics & Automation">Robotics & Automation</option>
              <option value="Interdisciplinary Innovation Hub">Innovation Hub</option>
            </select>
          </div>
        }
      />

      {/* PROJECTS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "20px" }}>
        {filtered.map((p) => (
          <div
            key={p.id}
            className="intel-card"
            style={{
              padding: "24px",
              margin: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <StatusBadge variant={p.status.includes("Completed") ? "success" : "info"}>
                    {p.status}
                  </StatusBadge>
                  <span style={{ fontSize: "0.76rem", color: "#64748b", fontWeight: 600 }}>
                    {p.type}
                  </span>
                </div>
                <strong style={{ fontSize: "0.84rem", color: "#059669" }}>{p.funding}</strong>
              </div>

              <h3 style={{ fontSize: "1.18rem", fontWeight: 700, color: "#102544", margin: "2px 0 4px" }}>
                {p.title}
              </h3>
              <div style={{ fontSize: "0.8rem", color: "#2563eb", fontWeight: 600, marginBottom: "10px" }}>
                {p.department} &bull; Advisor: {p.advisor}
              </div>

              <p style={{ fontSize: "0.86rem", color: "#475569", lineHeight: "1.5", margin: "0 0 14px" }}>
                {p.problem}
              </p>

              {/* TECHNOLOGIES */}
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                  Technology Architecture:
                </strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {p.technologies.map((t) => (
                    <span key={t} style={{ background: "#f1f5f9", color: "#334155", fontSize: "0.74rem", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* SCHOLARS */}
              <div style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "14px" }}>
                Scholars: <strong style={{ color: "#1e293b" }}>{p.students.join(", ")}</strong>
              </div>
            </div>

            {/* ACTION FOOTER */}
            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                type="button"
                className="intel-pill"
                onClick={() => navigate("/management/project-dna")}
                style={{ fontSize: "0.78rem" }}
              >
                <Layers size={13} />
                <span>Drill-down DNA</span>
              </button>

              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => navigate(`/student/projects/${p.slug}`)}
                style={{ fontSize: "0.78rem", padding: "6px 12px" }}
              >
                <span>View Public Project</span>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectEcosystem;
