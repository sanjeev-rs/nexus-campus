import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  Layers,
  Network,
  Search,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";

import { FAILURE_MEMORY } from "../../data/facultyData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
  IntelligenceFilterBar,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

function FacultyFailureMemory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedFailure, setSelectedFailure] = useState(FAILURE_MEMORY[0]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredFailures = FAILURE_MEMORY.filter((f) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      f.title.toLowerCase().includes(q) ||
      f.project.toLowerCase().includes(q) ||
      f.problem.toLowerCase().includes(q) ||
      f.rootCause.toLowerCase().includes(q) ||
      f.affectedTech.some((t) => t.toLowerCase().includes(q))
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
        eyebrow="INSTITUTIONAL KNOWLEDGE"
        eyebrowIcon={AlertTriangle}
        title="Institutional Failure Memory"
        description="Codified engineering post-mortems, root-cause analyses, failed solution attempts, and preventive checklists preventing repeat mistakes across student research cohorts."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/technical-problems")}
            >
              <Wrench size={15} />
              <span>Technical Problems Registry</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => showToast("Exporting Department Failure Prevention Guidebook (PDF)...")}
            >
              <BookOpen size={15} />
              <span>Export Guidebook</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Cataloged Post-Mortems"
          value={FAILURE_MEMORY.length}
          icon={AlertTriangle}
          variant="amber"
          delta="100% Codified"
          deltaType="positive"
          meta="Avoidable engineering pitfalls"
        />
        <KpiCard
          label="Prevented Repeat Incidents"
          value="18 Instances"
          icon={ShieldCheck}
          variant="green"
          delta="-74% Error Recurrence"
          deltaType="positive"
          meta="Spring 2026 term"
        />
        <KpiCard
          label="Pre-flight Checklists"
          value="12 Checklists"
          icon={CheckCircle2}
          variant="blue"
          delta="Automated CI/CD"
          deltaType="positive"
          meta="Enforced on student repos"
        />
      </KpiGrid>

      {/* SEARCH BAR */}
      <IntelligenceFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search post-mortems by error symptom, root cause, or technology..."
        totalCount={FAILURE_MEMORY.length}
        filteredCount={filteredFailures.length}
      />

      {/* TWO COLUMN FAILURE MEMORY BROWSER */}
      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "24px", alignItems: "flex-start" }}>
        
        {/* FAILURES LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filteredFailures.map((f) => {
            const isSelected = selectedFailure.id === f.id;
            return (
              <div
                key={f.id}
                onClick={() => setSelectedFailure(f)}
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
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#dc2626" }}>
                    {f.id} &bull; POST-MORTEM
                  </span>
                  <span style={{ fontSize: "0.74rem", color: "#64748b" }}>{f.project}</span>
                </div>
                <h3 style={{ fontSize: "0.96rem", fontWeight: 700, color: "#102544", margin: "0 0 6px" }}>
                  {f.title}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {f.affectedTech.map((t) => (
                    <span key={t} style={{ background: "#f1f5f9", color: "#475569", fontSize: "0.72rem", padding: "2px 6px", borderRadius: "4px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* DETAILED STRUCTURED POST-MORTEM DOSSIER */}
        <div className="intel-card" style={{ padding: "28px", margin: 0 }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", flexWrap: "wrap", gap: "10px", borderBottom: "1px solid #e2e8f0", paddingBottom: "16px" }}>
            <div>
              <div className="intel-eyebrow">POST-MORTEM DOSSIER: {selectedFailure.id}</div>
              <h2 style={{ fontSize: "1.35rem", color: "#102544", margin: "2px 0 4px" }}>{selectedFailure.title}</h2>
              <span style={{ fontSize: "0.84rem", color: "#64748b" }}>
                Originating Capstone: <strong>{selectedFailure.project}</strong>
              </span>
            </div>
            <StatusBadge variant="success">Verified Remedy</StatusBadge>
          </div>

          {/* 7-STAGE POST-MORTEM CHAIN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            
            {/* 1. PROBLEM */}
            <div style={{ background: "#fff1f2", padding: "16px", borderRadius: "10px", borderLeft: "4px solid #dc2626", border: "1px solid #fecdd3" }}>
              <strong style={{ display: "block", fontSize: "0.74rem", color: "#b91c1c", textTransform: "uppercase", marginBottom: "4px" }}>
                1. Observed Problem &amp; Engineering Symptom
              </strong>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#1e293b", lineHeight: "1.5" }}>
                {selectedFailure.problem}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={16} color="#94a3b8" /></div>

            {/* 2. ATTEMPTED SOLUTION (WHAT WAS ATTEMPTED) */}
            <div style={{ background: "#fffbeb", padding: "16px", borderRadius: "10px", border: "1px solid #fef3c7" }}>
              <strong style={{ display: "block", fontSize: "0.74rem", color: "#b45309", textTransform: "uppercase", marginBottom: "4px" }}>
                2. What Was Attempted (Initial Team Hypotheses)
              </strong>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "#92400e", lineHeight: "1.5" }}>
                {selectedFailure.attemptedSolution}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={16} color="#94a3b8" /></div>

            {/* 3. ROOT CAUSE */}
            <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <strong style={{ display: "block", fontSize: "0.74rem", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                3. Ground-Truth Root Cause Analysis
              </strong>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#1e293b", lineHeight: "1.5" }}>
                {selectedFailure.rootCause}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={16} color="#94a3b8" /></div>

            {/* 4. LESSON LEARNED */}
            <div style={{ background: "#f0fdf4", padding: "16px", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
              <strong style={{ display: "block", fontSize: "0.74rem", color: "#15803d", textTransform: "uppercase", marginBottom: "4px" }}>
                4. Permanent Institutional Lesson Learned
              </strong>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "#166534", lineHeight: "1.5", fontWeight: 600 }}>
                {selectedFailure.lessonLearned}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={16} color="#94a3b8" /></div>

            {/* 5. PREVENTIVE CHECKLIST */}
            <div style={{ background: "#ffffff", padding: "16px", borderRadius: "10px", border: "1.5px solid #2563eb" }}>
              <strong style={{ display: "block", fontSize: "0.76rem", color: "#2563eb", textTransform: "uppercase", marginBottom: "8px" }}>
                5. Recommended Prevention Checklist (Pre-Flight Protocol)
              </strong>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {selectedFailure.preventionChecklist?.map((step, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "0.85rem", color: "#1e293b" }}>
                    <CheckCircle2 size={15} color="#059669" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6 & 7: RELATED PROJECTS & TECHNOLOGIES */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
              <div>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
                  Related Projects In Ecosystem:
                </strong>
                <button
                  type="button"
                  className="intel-pill"
                  onClick={() => navigate("/faculty/project-dna")}
                  style={{ fontSize: "0.78rem" }}
                >
                  <Layers size={13} />
                  <span>{selectedFailure.project}</span>
                  &rarr;
                </button>
              </div>

              <div>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
                  Affected Technologies:
                </strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedFailure.affectedTech.map((t) => (
                    <span key={t} style={{ background: "#f1f5f9", color: "#334155", fontSize: "0.76rem", padding: "3px 8px", borderRadius: "6px", fontWeight: 600 }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default FacultyFailureMemory;
