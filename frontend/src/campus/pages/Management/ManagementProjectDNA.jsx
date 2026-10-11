import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FolderKanban,
  Layers,
  Lightbulb,
  Search,
  Sparkles,
} from "lucide-react";

import { PROJECT_DNA_CATALOG } from "../../data/facultyData";
import "../../components/shared/SharedIntelligence.css";

function ManagementProjectDNA() {
  const [selectedProject, setSelectedProject] = useState(PROJECT_DNA_CATALOG[0]);
  const [search, setSearch] = useState("");

  const filtered = PROJECT_DNA_CATALOG.filter((p) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.problem.toLowerCase().includes(q) ||
      p.technologies.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <Layers size={14} />
            PROJECT &amp; RESEARCH
          </div>
          <h1 className="intel-title">Executive Project DNA Explorer</h1>
          <p className="intel-desc">
            Institutional project relationship graph mapping core problems, student capability vectors, cross-lab faculty expertise, and patent opportunities.
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="intel-filter-bar">
        <div className="intel-search-box">
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search Project DNA by problem domain, tech stack, or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TWO COLUMN DNA BROWSER */}
      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "24px", alignItems: "flex-start" }}>
        
        {/* LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((p) => {
            const isSelected = selectedProject.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                style={{
                  background: isSelected ? "#eff6ff" : "#ffffff",
                  border: `1.5px solid ${isSelected ? "#2563eb" : "#e2e8f0"}`,
                  borderRadius: "12px",
                  padding: "16px 18px",
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#2563eb" }}>EXECUTIVE DNA</span>
                  <span style={{ fontSize: "0.74rem", color: "#64748b" }}>{p.students.length} Scholars</span>
                </div>
                <h3 style={{ fontSize: "0.96rem", fontWeight: 700, color: "#102544", margin: "0 0 4px" }}>
                  {p.title}
                </h3>
                <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Faculty Lead: {p.advisor}</span>
              </div>
            );
          })}
        </div>

        {/* DETAILS */}
        <div className="intel-card" style={{ padding: "28px" }}>
          <div className="intel-card-header">
            <div>
              <div className="intel-eyebrow">INSTITUTIONAL GENE TRACE</div>
              <h2 style={{ fontSize: "1.35rem" }}>{selectedProject.title}</h2>
              <span style={{ fontSize: "0.84rem", color: "#64748b" }}>Advisor: {selectedProject.advisor}</span>
            </div>
            <span className="intel-badge success">Active Capstone</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "10px", borderLeft: "4px solid #2563eb" }}>
              <strong style={{ display: "block", fontSize: "0.76rem", color: "#2563eb", textTransform: "uppercase", marginBottom: "4px" }}>
                Target Institutional Problem
              </strong>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#1e293b", lineHeight: "1.5" }}>
                {selectedProject.problem}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div style={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", fontSize: "0.76rem", color: "#64748b", textTransform: "uppercase", marginBottom: "8px" }}>
                  Technology Architecture
                </strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedProject.technologies.map((t) => (
                    <span key={t} style={{ background: "#eff6ff", color: "#1d4ed8", fontSize: "0.78rem", padding: "4px 10px", borderRadius: "6px", fontWeight: 600 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", fontSize: "0.76rem", color: "#64748b", textTransform: "uppercase", marginBottom: "8px" }}>
                  Commercial &amp; Research Opportunities
                </strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedProject.opportunities.map((opp) => (
                    <button
                      key={opp}
                      type="button"
                      onClick={() => navigate("/management/opportunities")}
                      style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#047857", fontSize: "0.78rem", padding: "4px 10px", borderRadius: "6px", fontWeight: 600, cursor: "pointer" }}
                      title="Drill-down into Opportunity Intelligence"
                    >
                      {opp} &rarr;
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: "#fff1f2", padding: "14px", borderRadius: "10px", border: "1px solid #fecdd3" }}>
              <strong style={{ display: "block", fontSize: "0.76rem", color: "#b91c1c", textTransform: "uppercase", marginBottom: "4px" }}>
                Connected Failure Memories
              </strong>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {selectedProject.previousFailures.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => navigate("/management/failure-memory")}
                    style={{ background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", fontSize: "0.85rem", color: "#991b1b", display: "flex", alignItems: "center", gap: "4px" }}
                    title="View Institutional Failure Memory post-mortem"
                  >
                    <span>&bull; {f}</span>
                    <ChevronRight size={13} />
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "16px", borderRadius: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#15803d", fontWeight: 700, fontSize: "0.82rem" }}>
                <Sparkles size={16} />
                EXECUTIVE STRATEGIC RECOMMENDATION
              </div>
              <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#166534", fontWeight: 600 }}>
                {selectedProject.nextAction}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ManagementProjectDNA;
