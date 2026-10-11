import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FolderKanban,
  GitBranch,
  Layers,
  Lightbulb,
  Network,
  Search,
  Share2,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";

import { PROJECT_DNA_CATALOG } from "../../data/facultyData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

function FacultyProjectDNA() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(PROJECT_DNA_CATALOG[0]);
  const [activeTab, setActiveTab] = useState("GENOME_FLOW"); // GENOME_FLOW, RELATIONSHIPS, TIMELINE

  const filteredProjects = PROJECT_DNA_CATALOG.filter((p) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.technologies.some((t) => t.toLowerCase().includes(q)) ||
      p.skills.some((s) => s.toLowerCase().includes(q)) ||
      p.advisor.toLowerCase().includes(q)
    );
  });

  return (
    <div className="intel-page">
      {/* HEADER */}
      <IntelligencePageHeader
        eyebrow="PROJECT & RESEARCH"
        eyebrowIcon={Layers}
        title="Project DNA Intelligence"
        description="Comprehensive genetic decomposition of institutional projects: tracing core problem statements, technology architectures, verified competencies, connected failure histories, research citations, and strategic campus opportunities."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/project-discovery")}
            >
              <Search size={15} />
              <span>Semantic Project Discovery</span>
            </button>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/failure-memory")}
            >
              <AlertTriangle size={15} />
              <span>Failure Memory</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => navigate(`/student/projects/${selectedProject.slug}`)}
            >
              <span>View Public Project</span>
              <ExternalLink size={14} />
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Cataloged Project DNA"
          value={PROJECT_DNA_CATALOG.length}
          icon={Layers}
          variant="blue"
          delta="100% Decomposed"
          deltaType="positive"
          meta="Capstone & Research"
        />
        <KpiCard
          label="Active Scholars Involved"
          value={selectedProject.students.length}
          icon={Users}
          variant="green"
          delta="Assigned Advisees"
          deltaType="positive"
          meta={`Advisor: ${selectedProject.advisor}`}
          onClick={() => navigate("/faculty/advisees")}
        />
        <KpiCard
          label="Connected Failure Memories"
          value={selectedProject.previousFailures.length}
          icon={AlertTriangle}
          variant="amber"
          delta="Documented Post-Mortems"
          deltaType="warning"
          meta="Avoidable anti-patterns"
          onClick={() => navigate("/faculty/failure-memory")}
        />
        <KpiCard
          label="Research Citations"
          value={selectedProject.researchKnowledge.length}
          icon={BookOpen}
          variant="purple"
          delta="Peer Knowledge Ties"
          deltaType="positive"
          meta="Faculty publications"
          onClick={() => navigate("/faculty/research")}
        />
      </KpiGrid>

      {/* PROJECT SELECTOR & FILTER */}
      <div className="intel-filter-bar">
        <div className="intel-search-box">
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search Project DNA catalog by title, stack, or skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="intel-pill-filters">
          <button
            type="button"
            className={`intel-pill ${activeTab === "GENOME_FLOW" ? "active" : ""}`}
            onClick={() => setActiveTab("GENOME_FLOW")}
          >
            <span>Full Genome Chain (11 Levels)</span>
          </button>
          <button
            type="button"
            className={`intel-pill ${activeTab === "RELATIONSHIPS" ? "active" : ""}`}
            onClick={() => setActiveTab("RELATIONSHIPS")}
          >
            <span>Ecosystem Node Network</span>
          </button>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "24px", alignItems: "flex-start" }}>
        
        {/* PROJECTS SIDEBAR LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredProjects.map((p) => {
            const isSelected = selectedProject.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                style={{
                  background: isSelected ? "#eff6ff" : "#ffffff",
                  border: `1.5px solid ${isSelected ? "#2563eb" : "#e2e8f0"}`,
                  borderRadius: "14px",
                  padding: "16px 18px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: isSelected ? "0 4px 14px rgba(37,99,235,0.12)" : "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>
                    {p.id.toUpperCase()} • DNA PROFILE
                  </span>
                  <span style={{ fontSize: "0.74rem", color: "#64748b" }}>{p.students.length} Scholars</span>
                </div>
                <h3 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#102544", margin: "0 0 6px" }}>
                  {p.title}
                </h3>
                <div style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "8px" }}>
                  Advisor: <strong>{p.advisor}</strong>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {p.technologies.slice(0, 3).map((t) => (
                    <span key={t} style={{ background: "#f1f5f9", color: "#475569", fontSize: "0.7rem", padding: "2px 6px", borderRadius: "4px" }}>
                      {t}
                    </span>
                  ))}
                  {p.technologies.length > 3 && (
                    <span style={{ color: "#94a3b8", fontSize: "0.7rem", alignSelf: "center" }}>
                      +{p.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* PROJECT DNA FULL CHAIN EXPLORER */}
        <div className="intel-card" style={{ padding: "28px", margin: 0 }}>
          
          {/* TOP CARD HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px", borderBottom: "1px solid #e2e8f0", paddingBottom: "18px" }}>
            <div>
              <div className="intel-eyebrow">DNA GENOME TRACE</div>
              <h2 style={{ fontSize: "1.45rem", color: "#102544", margin: "2px 0 4px" }}>
                {selectedProject.title}
              </h2>
              <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                Faculty Research Advisor: <strong style={{ color: "#1e293b" }}>{selectedProject.advisor}</strong>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => navigate("/faculty/advisees")}
                style={{ fontSize: "0.8rem", padding: "8px 12px" }}
              >
                <Users size={14} />
                <span>Advisee Team</span>
              </button>
              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => navigate("/faculty/knowledge-graph")}
                style={{ fontSize: "0.8rem", padding: "8px 12px" }}
              >
                <Network size={14} />
                <span>Graph View</span>
              </button>
            </div>
          </div>

          {activeTab === "GENOME_FLOW" ? (
            /* 11-LEVEL GENOME CHAIN */
            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              
              {/* LEVEL 1: PROJECT */}
              <div style={{ background: "#ffffff", border: "1.5px solid #2563eb", borderRadius: "12px", padding: "18px", boxShadow: "0 2px 8px rgba(37,99,235,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "#2563eb", textTransform: "uppercase" }}>
                    1. PROJECT CORE IDENTITY
                  </span>
                  <StatusBadge variant="info">Active Capstone</StatusBadge>
                </div>
                <h3 style={{ fontSize: "1.15rem", color: "#102544", margin: "2px 0 4px" }}>{selectedProject.title}</h3>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Slug: {selectedProject.slug} &bull; Principal Advisor: {selectedProject.advisor}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={18} color="#94a3b8" /></div>

              {/* LEVEL 2: PROBLEM */}
              <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "12px", borderLeft: "4px solid #2563eb", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#2563eb", textTransform: "uppercase", marginBottom: "6px" }}>
                  2. Core Engineering Problem Statement
                </strong>
                <p style={{ margin: 0, fontSize: "0.92rem", color: "#1e293b", lineHeight: "1.5" }}>
                  {selectedProject.problem}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={18} color="#94a3b8" /></div>

              {/* LEVEL 3 & 4: TECHNOLOGY & SKILLS */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ background: "#ffffff", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "8px" }}>
                    3. Technology Stack Architecture
                  </strong>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {selectedProject.technologies.map((t) => (
                      <span
                        key={t}
                        style={{
                          background: "#eff6ff",
                          color: "#1d4ed8",
                          fontSize: "0.78rem",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontWeight: 600,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#ffffff", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "8px" }}>
                    4. Verified Skills Required
                  </strong>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {selectedProject.skills.map((s) => (
                      <span
                        key={s}
                        style={{
                          background: "#ecfdf5",
                          color: "#047857",
                          fontSize: "0.78rem",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontWeight: 600,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={18} color="#94a3b8" /></div>

              {/* LEVEL 5 & 6: STUDENTS & FACULTY */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <strong style={{ fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase" }}>
                      5. Assigned Scholars
                    </strong>
                    <button
                      type="button"
                      className="intel-pill"
                      onClick={() => navigate("/faculty/advisees")}
                      style={{ fontSize: "0.72rem", padding: "2px 8px" }}
                    >
                      <span>Advisee Twins</span>
                      &rarr;
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {selectedProject.students.map((stu) => (
                      <div key={stu} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563eb" }} />
                        <strong style={{ fontSize: "0.88rem", color: "#1e293b" }}>{stu}</strong>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <strong style={{ fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase" }}>
                      6. Faculty Mentors
                    </strong>
                    <button
                      type="button"
                      className="intel-pill"
                      onClick={() => navigate("/faculty/research")}
                      style={{ fontSize: "0.72rem", padding: "2px 8px" }}
                    >
                      <span>Research Profile</span>
                      &rarr;
                    </button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7c3aed" }} />
                    <strong style={{ fontSize: "0.88rem", color: "#1e293b" }}>{selectedProject.advisor}</strong>
                  </div>
                  <span style={{ fontSize: "0.78rem", color: "#64748b", display: "block", marginTop: "4px" }}>
                    Senior Research Advisor &bull; Lab Block 4
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={18} color="#94a3b8" /></div>

              {/* LEVEL 7 & 8: SIMILAR PROJECTS & FAILURES */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ background: "#ffffff", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "8px" }}>
                    7. Similar Campus Projects
                  </strong>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {selectedProject.similarProjects.map((sim) => (
                      <button
                        key={sim}
                        type="button"
                        onClick={() => navigate("/faculty/project-discovery")}
                        style={{
                          background: "none",
                          border: "none",
                          padding: "4px 0",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: "0.86rem",
                          color: "#2563eb",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>&bull; {sim}</span>
                        <ChevronRight size={13} color="#94a3b8" />
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#fff1f2", padding: "16px", borderRadius: "12px", border: "1px solid #fecdd3" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <strong style={{ fontSize: "0.74rem", color: "#b91c1c", textTransform: "uppercase" }}>
                      8. Known Failure Memories
                    </strong>
                    <button
                      type="button"
                      className="intel-pill"
                      onClick={() => navigate("/faculty/failure-memory")}
                      style={{ fontSize: "0.72rem", padding: "2px 8px", background: "#fee2e2", color: "#991b1b" }}
                    >
                      <span>Post-Mortems</span>
                      &rarr;
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {selectedProject.previousFailures.map((fail) => (
                      <button
                        key={fail}
                        type="button"
                        onClick={() => navigate("/faculty/failure-memory")}
                        style={{
                          background: "none",
                          border: "none",
                          padding: "4px 0",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          color: "#991b1b",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>&bull; {fail}</span>
                        <ChevronRight size={13} color="#f87171" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={18} color="#94a3b8" /></div>

              {/* LEVEL 9 & 10: RESEARCH & OPPORTUNITIES */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ background: "#ffffff", padding: "16px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                  <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "8px" }}>
                    9. Research Knowledge Citations
                  </strong>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {selectedProject.researchKnowledge.map((rk) => (
                      <button
                        key={rk}
                        type="button"
                        onClick={() => navigate("/faculty/research")}
                        style={{
                          background: "none",
                          border: "none",
                          padding: "4px 0",
                          textAlign: "left",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          color: "#1e293b",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>&bull; {rk}</span>
                        <ChevronRight size={13} color="#94a3b8" />
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#f0fdf4", padding: "16px", borderRadius: "12px", border: "1px solid #bbf7d0" }}>
                  <strong style={{ display: "block", fontSize: "0.74rem", color: "#15803d", textTransform: "uppercase", marginBottom: "8px" }}>
                    10. Strategic Opportunities &amp; Missions
                  </strong>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {selectedProject.opportunities?.map((opp) => (
                      <div key={opp} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981" }} />
                        <strong style={{ fontSize: "0.86rem", color: "#166534" }}>{opp}</strong>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={18} color="#94a3b8" /></div>

              {/* LEVEL 11: RECOMMENDATIONS */}
              <div style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", padding: "18px 20px", borderRadius: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#1d4ed8", fontWeight: 700, fontSize: "0.82rem", marginBottom: "6px" }}>
                  <Sparkles size={16} />
                  <span>11. DNA-GUIDED NEXT BEST ACTION</span>
                </div>
                <p style={{ margin: 0, fontSize: "0.92rem", color: "#1e3a8a", fontWeight: 600, lineHeight: "1.5" }}>
                  {selectedProject.nextAction}
                </p>
              </div>

            </div>
          ) : (
            /* ECOSYSTEM NODE NETWORK OVERVIEW */
            <div style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <strong style={{ color: "#102544", fontSize: "1rem" }}>Relational Network Triples</strong>
                <button
                  type="button"
                  className="intel-btn-primary"
                  onClick={() => navigate("/faculty/knowledge-graph")}
                  style={{ fontSize: "0.78rem", padding: "6px 12px" }}
                >
                  <Network size={14} />
                  <span>Open Full Knowledge Graph</span>
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Advisor Link</span>
                  <p style={{ margin: "4px 0 0", color: "#102544", fontSize: "0.88rem", fontWeight: 600 }}>
                    {`[${selectedProject.title}] ──(advised_by)──▶ [${selectedProject.advisor}]`}
                  </p>
                </div>

                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Student Link</span>
                  <p style={{ margin: "4px 0 0", color: "#102544", fontSize: "0.88rem", fontWeight: 600 }}>
                    {`[${selectedProject.students.join(", ")}] ──(builds)──▶ [${selectedProject.title}]`}
                  </p>
                </div>

                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Skill Prerequisite</span>
                  <p style={{ margin: "4px 0 0", color: "#102544", fontSize: "0.88rem", fontWeight: 600 }}>
                    {`[${selectedProject.title}] ──(demands)──▶ [${selectedProject.skills.join(", ")}]`}
                  </p>
                </div>

                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Failure Guardrail</span>
                  <p style={{ margin: "4px 0 0", color: "#dc2626", fontSize: "0.88rem", fontWeight: 600 }}>
                    {`[${selectedProject.title}] ──(mitigates)──▶ [${selectedProject.previousFailures.join(", ")}]`}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default FacultyProjectDNA;
