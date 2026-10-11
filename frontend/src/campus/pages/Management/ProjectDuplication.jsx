import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  ExternalLink,
  GitMerge,
  Layers,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { PROJECT_DUPLICATION_ANALYSIS } from "../../data/managementData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
  IntelligenceFilterBar,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const ENRICHED_DUPLICATIONS = PROJECT_DUPLICATION_ANALYSIS.map((d, idx) => ({
  ...d,
  problemOverlap: idx === 0 ? "91%" : "84%",
  techOverlap: idx === 0 ? "84%" : "89%",
  skillsOverlap: idx === 0 ? "79%" : "72%",
}));

function ProjectDuplication() {
  const navigate = useNavigate();
  const [duplications, setDuplications] = useState(ENRICHED_DUPLICATIONS);
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleConsolidate = (id, title) => {
    setDuplications((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Consolidation In Progress" } : d))
    );
    showToast(`Consolidation directive issued for: ${title}. Department HODs notified.`);
  };

  const filtered = duplications.filter((d) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      d.projectA.toLowerCase().includes(q) ||
      d.projectB.toLowerCase().includes(q) ||
      d.overlappingTech.some((t) => t.toLowerCase().includes(q)) ||
      d.overlappingSkills.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="intel-page">
      {/* TOAST */}
      {toastMessage && (
        <div className="intel-toast" role="status">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", marginLeft: "6px" }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* HEADER */}
      <IntelligencePageHeader
        eyebrow="PROJECT & RESEARCH"
        eyebrowIcon={Copy}
        title="Project Duplication &amp; Similarity Intelligence"
        description="Automated semantic overlap detection identifying parallel student capstone teams with redundant problem objectives, enabling cross-department team mergers and preventing redundant GPU allocation."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/projects")}
            >
              <Layers size={15} />
              <span>Project Ecosystem</span>
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

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Identified Overlap Clusters"
          value={duplications.length}
          icon={Copy}
          variant="amber"
          delta="Cross-Department"
          deltaType="warning"
          meta="Redundant work detected"
        />
        <KpiCard
          label="Estimated Lab Compute Saved"
          value="1,420 Hours"
          icon={Sparkles}
          variant="green"
          delta="Via Team Consolidation"
          deltaType="positive"
          meta="Avoidable GPU costs"
        />
        <KpiCard
          label="Cross-Department Mergers"
          value="2 Directives"
          icon={GitMerge}
          variant="blue"
          delta="CSE + AIDS Teams"
          deltaType="positive"
          meta="Active consolidation"
        />
      </KpiGrid>

      {/* FILTER SEARCH */}
      <IntelligenceFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search duplicated projects by name, technology, or required skill..."
        totalCount={duplications.length}
        filteredCount={filtered.length}
      />

      {/* DUPLICATION CASES */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {filtered.map((d) => (
          <div
            key={d.id}
            className="intel-card"
            style={{
              margin: 0,
              padding: "26px",
              borderLeft: `5px solid ${d.status.includes("Progress") ? "#059669" : "#d97706"}`,
            }}
          >
            {/* CARD TITLE & SCORE */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <StatusBadge variant={d.status.includes("Progress") ? "success" : "warning"}>
                  {d.status}
                </StatusBadge>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#102544", margin: "6px 0 2px" }}>
                  {d.projectA} <span style={{ color: "#d97706", fontWeight: 600 }}>&harr;</span> {d.projectB}
                </h2>
              </div>

              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", padding: "8px 18px", borderRadius: "10px", textAlign: "center" }}>
                <span style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                  Cumulative Overlap
                </span>
                <strong style={{ fontSize: "1.35rem", color: "#b45309" }}>{d.similarityScore}</strong>
              </div>
            </div>

            {/* THREE OVERLAP BREAKDOWN METRICS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                <span style={{ fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Problem Overlap</span>
                <strong style={{ display: "block", fontSize: "1.15rem", color: "#b45309", marginTop: "2px" }}>{d.problemOverlap}</strong>
              </div>
              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                <span style={{ fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Technology Overlap</span>
                <strong style={{ display: "block", fontSize: "1.15rem", color: "#2563eb", marginTop: "2px" }}>{d.techOverlap}</strong>
              </div>
              <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", textAlign: "center" }}>
                <span style={{ fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Skills Overlap</span>
                <strong style={{ display: "block", fontSize: "1.15rem", color: "#059669", marginTop: "2px" }}>{d.skillsOverlap}</strong>
              </div>
            </div>

            {/* OVERLAPPING PROBLEM */}
            <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "14px" }}>
              <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                Identified Redundant Objective:
              </strong>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#1e293b", lineHeight: "1.45" }}>
                {d.overlappingProblem}
              </p>
            </div>

            {/* STACKS & SKILLS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
              <div style={{ background: "#ffffff", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
                  Overlapping Technology Stack:
                </strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {d.overlappingTech.map((t) => (
                    <span key={t} style={{ background: "#eff6ff", color: "#1d4ed8", fontSize: "0.76rem", padding: "3px 8px", borderRadius: "6px", fontWeight: 600 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ background: "#ffffff", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
                  Overlapping Student Skills:
                </strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {d.overlappingSkills.map((s) => (
                    <span key={s} style={{ background: "#ecfdf5", color: "#047857", fontSize: "0.76rem", padding: "3px 8px", borderRadius: "6px", fontWeight: 600 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RECOMMENDATION & CONSOLIDATION ACTION */}
            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "16px", borderRadius: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px" }}>
              <div style={{ flex: 1, minWidth: "260px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#1d4ed8", fontWeight: 700, fontSize: "0.8rem", marginBottom: "2px" }}>
                  <Sparkles size={14} />
                  <span>INSTITUTIONAL DIRECTIVE RECOMMENDATION</span>
                </div>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#1e3a8a", fontWeight: 600 }}>
                  {d.recommendation}
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  className="intel-btn-secondary"
                  onClick={() => navigate("/management/project-dna")}
                  style={{ fontSize: "0.8rem", padding: "8px 12px" }}
                >
                  <Layers size={14} />
                  <span>Compare DNA</span>
                </button>

                {!d.status.includes("Progress") ? (
                  <button
                    type="button"
                    className="intel-btn-primary"
                    onClick={() => handleConsolidate(d.id, `${d.projectA} + ${d.projectB}`)}
                    style={{ fontSize: "0.8rem", padding: "8px 14px" }}
                  >
                    <GitMerge size={14} />
                    <span>Issue Consolidation Directive</span>
                  </button>
                ) : (
                  <span className="intel-badge success" style={{ padding: "8px 12px" }}>
                    <CheckCircle2 size={15} />
                    Directive Issued
                  </span>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectDuplication;
