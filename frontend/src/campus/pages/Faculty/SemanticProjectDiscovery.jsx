import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  Copy,
  ExternalLink,
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

const DISCOVERY_DOMAINS = ["All", "AI & Data Science", "Robotics & Hardware", "Systems & Cloud", "Healthcare & Biotech"];

const ALL_PROJECTS = [
  ...PROJECT_DNA_CATALOG.map((p) => ({
    ...p,
    department: p.title.includes("Drone") ? "Robotics & Automation" : "AI & Data Science",
    status: "Active Capstone",
    similaritySignal: p.title.includes("Analytics")
      ? "82% Data Schema Similarity with Curriculum Skill Analytics"
      : p.title.includes("RAG")
      ? "78% Semantic Vector Match with Distributed Graph Intelligence"
      : null,
  })),
  {
    id: "dna-05",
    title: "Curriculum Skill Analytics",
    slug: "curriculum-skills",
    problem: "Static syllabus schedules do not map to evolving industry skill expectations.",
    technologies: ["React", "Chart.js", "Pandas", "PostgreSQL"],
    skills: ["Data Visualization", "Curriculum Mapping", "SQL"],
    students: ["Karan Patel"],
    advisor: "Dr. Evelyn Vance",
    department: "AI & Data Science",
    status: "Active Capstone",
    similarProjects: ["Smart Campus Analytics"],
    domain: "Systems & Cloud",
    similaritySignal: "82% Schema Overlap with Smart Campus Analytics",
  },
  {
    id: "dna-06",
    title: "Edge Vision Laboratory Monitor",
    slug: "edge-vision",
    problem: "Real-time safety and occupancy tracking in chemistry and hardware labs without cloud latency.",
    technologies: ["C++", "OpenCV", "Raspberry Pi 5", "PyTorch"],
    skills: ["Edge Inference", "Embedded C++", "Camera Calibration"],
    students: ["Elena Rostova"],
    advisor: "Dr. Aris Thorne",
    department: "Robotics & Automation",
    status: "Active Capstone",
    similarProjects: ["Autonomous Campus Drone Navigation"],
    domain: "Robotics & Hardware",
    similaritySignal: "74% Perception Pipeline Overlap with Autonomous Campus Drone",
  },
];

function SemanticProjectDiscovery() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [techFilter, setTechFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.problem.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q)) ||
        p.skills.some((s) => s.toLowerCase().includes(q));

      const matchesDomain =
        selectedDomain === "All" ||
        (selectedDomain === "AI & Data Science" && (p.technologies.includes("Python") || p.technologies.includes("PyTorch"))) ||
        (selectedDomain === "Robotics & Hardware" && p.technologies.some((t) => t.includes("ROS") || t.includes("Jetson") || t.includes("Raspberry"))) ||
        (selectedDomain === "Systems & Cloud" && p.technologies.some((t) => t.includes("Neo4j") || t.includes("PostgreSQL")));

      const matchesTech =
        techFilter === "All" ||
        p.technologies.some((t) => t.toLowerCase().includes(techFilter.toLowerCase()));

      return matchesSearch && matchesDomain && matchesTech;
    });
  }, [search, selectedDomain, techFilter]);

  const domainPills = DISCOVERY_DOMAINS.map((dom) => ({
    id: dom,
    label: dom,
    count: dom === "All" ? ALL_PROJECTS.length : ALL_PROJECTS.filter((p) => {
      if (dom === "AI & Data Science") return p.technologies.includes("Python") || p.technologies.includes("PyTorch");
      if (dom === "Robotics & Hardware") return p.technologies.some((t) => t.includes("ROS") || t.includes("Jetson") || t.includes("Raspberry"));
      if (dom === "Systems & Cloud") return p.technologies.some((t) => t.includes("Neo4j") || t.includes("PostgreSQL"));
      return true;
    }).length,
  }));

  return (
    <div className="intel-page">
      {/* HEADER */}
      <IntelligencePageHeader
        eyebrow="PROJECT & RESEARCH"
        eyebrowIcon={Compass}
        title="Semantic Project Discovery"
        description="Cross-department semantic project search, intellectual property mapping, shared technology clustering, and duplicate objective warnings across active campus research repos."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/matching")}
            >
              <Users size={15} />
              <span>Mentor Matching</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => navigate("/faculty/project-dna")}
            >
              <Layers size={15} />
              <span>Project DNA Explorer</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Indexed Repositories"
          value={ALL_PROJECTS.length}
          icon={Compass}
          variant="blue"
          delta="Semantic Embedding"
          deltaType="positive"
          meta="All Capstones & Labs"
        />
        <KpiCard
          label="Detected Overlap Signals"
          value="3 Warnings"
          icon={AlertTriangle}
          variant="amber"
          delta="Duplicate Prevention"
          deltaType="warning"
          meta="Cross-department consolidation"
          onClick={() => navigate("/faculty/project-dna")}
        />
        <KpiCard
          label="Active Research Domains"
          value="4 Clusters"
          icon={Sparkles}
          variant="purple"
          delta="AI, Robotics, Cloud, Med"
          deltaType="positive"
          meta="Multi-disciplinary"
        />
      </KpiGrid>

      {/* FILTER & SEARCH */}
      <IntelligenceFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search projects by keyword, problem concept, framework, or algorithm..."
        pills={domainPills}
        activePill={selectedDomain}
        onPillSelect={setSelectedDomain}
        totalCount={ALL_PROJECTS.length}
        filteredCount={filteredProjects.length}
        actions={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Stack:</span>
            <select
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
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
              <option value="All">All Stacks</option>
              <option value="Python">Python / PyTorch</option>
              <option value="ROS">ROS 2 / C++</option>
              <option value="Neo4j">Neo4j / Cypher</option>
              <option value="React">React / Web</option>
            </select>
          </div>
        }
      />

      {/* SEMANTIC PROJECT CARDS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "20px" }}>
        {filteredProjects.map((p) => (
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
              {/* TOP HEADER */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <StatusBadge variant="info">{p.status}</StatusBadge>
                <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Advisor: <strong>{p.advisor}</strong></span>
              </div>

              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#102544", margin: "0 0 4px" }}>
                {p.title}
              </h3>
              <div style={{ fontSize: "0.78rem", color: "#2563eb", fontWeight: 600, marginBottom: "10px" }}>
                Department: {p.department} &bull; Scholars: {p.students.join(", ")}
              </div>

              {/* PROBLEM */}
              <p style={{ fontSize: "0.86rem", color: "#475569", lineHeight: "1.5", margin: "0 0 14px" }}>
                {p.problem}
              </p>

              {/* TECHNOLOGIES */}
              <div style={{ marginBottom: "14px" }}>
                <strong style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
                  Technology Architecture:
                </strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {p.technologies.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "#f1f5f9",
                        color: "#334155",
                        fontSize: "0.74rem",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontWeight: 600,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* SIMILARITY SIGNAL BANNER */}
              {p.similaritySignal && (
                <div style={{ background: "#fffbeb", border: "1px solid #fef3c7", padding: "10px 12px", borderRadius: "8px", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Copy size={14} color="#d97706" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "0.78rem", color: "#b45309", fontWeight: 600 }}>
                    {p.similaritySignal}
                  </span>
                </div>
              )}
            </div>

            {/* ACTION FOOTER */}
            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                type="button"
                className="intel-pill"
                onClick={() => navigate("/faculty/project-dna")}
                style={{ fontSize: "0.78rem" }}
              >
                <Layers size={13} />
                <span>View Full DNA</span>
              </button>

              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => navigate(`/student/projects/${p.slug}`)}
                style={{ fontSize: "0.78rem", padding: "6px 12px" }}
              >
                <span>Public Repository</span>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SemanticProjectDiscovery;
