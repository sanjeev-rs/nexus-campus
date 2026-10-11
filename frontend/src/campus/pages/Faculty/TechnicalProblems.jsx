import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Layers,
  Search,
  Wrench,
} from "lucide-react";

import { TECHNICAL_PROBLEMS } from "../../data/facultyData";
import "../../components/shared/SharedIntelligence.css";

function TechnicalProblems() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredProblems = TECHNICAL_PROBLEMS.filter((p) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.knownSolution.toLowerCase().includes(q) ||
      p.affectedProjects.some((proj) => proj.toLowerCase().includes(q))
    );
  });

  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <Wrench size={14} />
            INSTITUTIONAL KNOWLEDGE
          </div>
          <h1 className="intel-title">Recurring Technical Problems</h1>
          <p className="intel-desc">
            Aggregated technical roadblocks, repeated hardware/software stumbling blocks, and documented lab workarounds to unblock student developers.
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="intel-filter-bar">
        <div className="intel-search-box">
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search recurring technical bugs or lab workarounds..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* TECHNICAL PROBLEMS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {filteredProblems.map((prob) => (
          <div key={prob.id} className="intel-card" style={{ margin: 0, padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span className="intel-badge warning">{prob.frequency}</span>
                  <span className="intel-badge success">{prob.status}</span>
                </div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#102544", margin: "2px 0" }}>
                  {prob.title}
                </h2>
              </div>

              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => navigate("/faculty/failure-memory")}
              >
                <span>Inspect {prob.relatedFailureMemory} Post-Mortem</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div style={{ background: "#f0fdf4", padding: "14px 16px", borderRadius: "10px", border: "1px solid #bbf7d0", marginBottom: "14px" }}>
              <strong style={{ display: "block", fontSize: "0.76rem", color: "#15803d", textTransform: "uppercase", marginBottom: "4px" }}>
                Established Institutional Solution
              </strong>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "#166534", fontWeight: 600 }}>
                {prob.knownSolution}
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", fontSize: "0.8rem", color: "#64748b" }}>
              <div>
                <strong style={{ display: "block", color: "#334155", marginBottom: "2px" }}>Affected Departments:</strong>
                <span>{prob.affectedDepts.join(" • ")}</span>
              </div>
              <div>
                <strong style={{ display: "block", color: "#334155", marginBottom: "2px" }}>Affected Projects:</strong>
                <span>{prob.affectedProjects.join(" • ")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnicalProblems;
