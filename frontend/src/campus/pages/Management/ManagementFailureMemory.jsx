import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  DollarSign,
  ExternalLink,
  Eye,
  Layers,
  Search,
  ShieldCheck,
  TrendingDown,
  X,
} from "lucide-react";

import { FACULTY_FAILURE_DATA } from "../../data/facultyData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
  IntelligenceFilterBar,
  EntityDrawer,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const AGGREGATED_INSTITUTIONAL_FAILURES = [
  {
    id: "IFM-01",
    title: "Unindexed Vector Batch Ingestion & Memory Heap Exhaustion",
    frequency: "Occurred across 9 Capstone Teams",
    affectedDepts: ["AI & Data Science", "Computer Science"],
    affectedTech: ["PostgreSQL", "pgvector", "Neo4j", "FastAPI"],
    rootCause: "Unbatched CSV ingestion over 500k rows without pre-allocated B-tree indexes exhausts container RAM.",
    lessonLearned: "Mandated APOC periodic commit batching (10,000 records/chunk) and memory limits in student Dockerfiles.",
    capitalSaved: "$44,000 in cloud compute credits",
    preventionRecommendation: "Enforce automated CI script verifying index existence before allowing large bulk insert benchmarks.",
    status: "Standard Operating Protocol Codified",
  },
  {
    id: "IFM-02",
    title: "Rolling Shutter Jitter & Thermal Throttling on Edge Vision Mounts",
    frequency: "Occurred across 6 Capstone Teams",
    affectedDepts: ["Robotics & Automation", "Electronics & Communication"],
    affectedTech: ["ROS 2", "OpenCV", "Jetson Orin Nano", "C++"],
    rootCause: "Direct motor-frame contact transmitted high-frequency vibrations into optical camera sensor pins.",
    lessonLearned: "Designed 3D-printable silicone dampening mount and mandatory sensor vibration FFT pre-flight tests.",
    capitalSaved: "$62,000 in avoided hardware destruction",
    preventionRecommendation: "Lab technician sign-off required on physical airframe dampening before issuing flight field pass.",
    status: "Standard Operating Protocol Codified",
  },
  {
    id: "IFM-03",
    title: "Document Table Chunk Fragmentation in Multi-page Academic RAG",
    frequency: "Occurred across 5 Capstone Teams",
    affectedDepts: ["AI & Data Science", "Information Technology"],
    affectedTech: ["LangChain", "Python", "FastAPI", "Markdown Parsers"],
    rootCause: "Fixed character-split chunking sliced tabular Markdown across chunk borders, stripping column headers.",
    lessonLearned: "Implemented semantic layout-aware table boundary detection preserving tables as atomic units.",
    capitalSaved: "$28,500 in wasted LLM inference costs",
    preventionRecommendation: "Integrated unit test suite verifying zero split markdown tables on RAG ingestion pipeline.",
    status: "Best Practice Published",
  },
  {
    id: "IFM-04",
    title: "Synchronous Blocking I/O Bottlenecks in Campus Telemetry Ingestion",
    frequency: "Occurred across 4 Capstone Teams",
    affectedDepts: ["Computer Science", "Information Technology"],
    affectedTech: ["FastAPI", "SQLAlchemy", "PostgreSQL"],
    rootCause: "Calling synchronous database operations inside async FastAPI route handlers stalled the ASGI event loop.",
    lessonLearned: "Migrated database driver to asyncpg and enforced non-blocking database queries across all campus services.",
    capitalSaved: "$14,000 in server scaling overhead",
    preventionRecommendation: "Static linter rule flagging synchronous database calls inside async route definitions.",
    status: "CI/CD Linter Guardrail Active",
  },
];

export default function ManagementFailureMemory() {
  const navigate = useNavigate();
  const [failures, setFailures] = useState(AGGREGATED_INSTITUTIONAL_FAILURES);
  const [selectedFailure, setSelectedFailure] = useState(null);
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filtered = failures.filter((f) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      f.title.toLowerCase().includes(q) ||
      f.rootCause.toLowerCase().includes(q) ||
      f.affectedDepts.some((d) => d.toLowerCase().includes(q)) ||
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
        eyebrow="INSTITUTIONAL MEMORY"
        eyebrowIcon={AlertOctagon}
        title="Institutional Failure Memory &amp; Loss Prevention Observatory"
        description="Campus-wide registry aggregating historical engineering bottlenecks, hardware failures, and architectural missteps synthesized into reusable prevention guardrails across all 6 academic departments."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/knowledge-retention")}
            >
              <ShieldCheck size={16} />
              <span>Knowledge Retention</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => showToast("Exporting comprehensive Failure Memory Dossier for NBA Accreditation Board...")}
            >
              <DollarSign size={16} />
              <span>Export ROI Dossier ($148.5k Saved)</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Documented Failure Patterns"
          value="34 Incidents"
          icon={AlertOctagon}
          variant="amber"
          delta="100% Codified"
          deltaType="positive"
          meta="Into CI/CD guardrails"
        />
        <KpiCard
          label="Prevented GPU Compute Loss"
          value="4,820 Hours"
          icon={CheckCircle2}
          variant="green"
          delta="Through Early Checkpoints"
          deltaType="positive"
          meta="Avoided cloud overages"
        />
        <KpiCard
          label="Estimated Capital Preserved"
          value="$148,500"
          icon={DollarSign}
          variant="purple"
          delta="Hardware & Cloud"
          deltaType="positive"
          meta="Institutional cost avoidance"
        />
        <KpiCard
          label="Incident Recurrence Rate"
          value="-78% YoY"
          icon={TrendingDown}
          variant="green"
          delta="Accelerating Learning"
          deltaType="positive"
          meta="Across student cohorts"
        />
      </KpiGrid>

      {/* SEARCH BAR */}
      <IntelligenceFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search aggregated failure patterns by title, department, or technology..."
        totalCount={failures.length}
        filteredCount={filtered.length}
      />

      {/* AGGREGATED LESSONS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {filtered.map((f) => (
          <div key={f.id} className="intel-card" style={{ margin: 0, padding: "26px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <StatusBadge variant="success">{f.status}</StatusBadge>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#b91c1c" }}>
                    {f.frequency}
                  </span>
                </div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#102544", margin: "2px 0 6px" }}>
                  {f.title}
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#64748b" }}>
                  <Building2 size={13} />
                  <span>Affected Departments: <strong>{f.affectedDepts.join(", ")}</strong></span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "8px 14px", borderRadius: "10px", textAlign: "center" }}>
                  <span style={{ fontSize: "0.72rem", color: "#15803d", textTransform: "uppercase", fontWeight: 700 }}>Capital Saved</span>
                  <strong style={{ display: "block", fontSize: "0.95rem", color: "#166534" }}>{f.capitalSaved}</strong>
                </div>

                <button
                  type="button"
                  className="intel-btn-secondary"
                  onClick={() => setSelectedFailure(f)}
                  style={{ padding: "8px 14px", fontSize: "0.82rem" }}
                >
                  <Eye size={14} />
                  <span>Inspect Case</span>
                </button>
              </div>
            </div>

            {/* ROOT CAUSE & LESSON */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                  Root Cause Analysis:
                </strong>
                <p style={{ margin: 0, fontSize: "0.86rem", color: "#1e293b", lineHeight: "1.45" }}>
                  {f.rootCause}
                </p>
              </div>

              <div style={{ background: "#f0fdf4", padding: "14px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#15803d", textTransform: "uppercase", marginBottom: "4px" }}>
                  Permanent Lesson Learned:
                </strong>
                <p style={{ margin: 0, fontSize: "0.86rem", color: "#14532d", lineHeight: "1.45", fontWeight: 600 }}>
                  {f.lessonLearned}
                </p>
              </div>
            </div>

            {/* PREVENTION RECOMMENDATION */}
            <div style={{ background: "#ffffff", border: "1.5px solid #2563eb", padding: "14px 16px", borderRadius: "10px", marginBottom: "14px" }}>
              <strong style={{ display: "block", fontSize: "0.74rem", color: "#2563eb", textTransform: "uppercase", marginBottom: "4px" }}>
                Mandatory Institutional Prevention Recommendation:
              </strong>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "#1e3a8a", fontWeight: 600 }}>
                {f.preventionRecommendation}
              </p>
            </div>

            {/* AFFECTED TECH CHIPS */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
              <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Affected Technologies:</span>
              {f.affectedTech.map((t) => (
                <span key={t} style={{ background: "#f1f5f9", color: "#334155", fontSize: "0.74rem", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL DRAWER */}
      {selectedFailure && (
        <EntityDrawer
          isOpen={Boolean(selectedFailure)}
          onClose={() => setSelectedFailure(null)}
          eyebrow="POST-MORTEM CASE STUDY"
          title={selectedFailure.title}
          subtitle={`Case ID: ${selectedFailure.id} • ${selectedFailure.frequency}`}
          footer={
            <div style={{ display: "flex", gap: "10px", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => navigate("/management/institutional-learning")}
                style={{ fontSize: "0.82rem" }}
              >
                <span>Institutional Learning &rarr;</span>
              </button>
              <button
                type="button"
                className="intel-btn-primary"
                onClick={() => setSelectedFailure(null)}
              >
                <span>Close Case Inspection</span>
              </button>
            </div>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div className="intel-eyebrow">AFFECTED ACADEMIC DEPARTMENTS</div>
              <strong style={{ color: "#102544", fontSize: "0.95rem" }}>
                {selectedFailure.affectedDepts.join(" • ")}
              </strong>
            </div>

            <div style={{ background: "#fff1f2", padding: "14px", borderRadius: "10px", border: "1px solid #fecdd3" }}>
              <div className="intel-eyebrow" style={{ color: "#b91c1c" }}>ROOT CAUSE</div>
              <p style={{ margin: "4px 0 0", color: "#1e293b", fontSize: "0.88rem", lineHeight: "1.45" }}>
                {selectedFailure.rootCause}
              </p>
            </div>

            <div style={{ background: "#f0fdf4", padding: "14px", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
              <div className="intel-eyebrow" style={{ color: "#15803d" }}>LESSON LEARNED &amp; SAVINGS</div>
              <p style={{ margin: "4px 0 0", color: "#14532d", fontSize: "0.88rem", lineHeight: "1.45", fontWeight: 600 }}>
                {selectedFailure.lessonLearned}
              </p>
              <div style={{ marginTop: "8px", fontSize: "0.82rem", color: "#059669", fontWeight: 700 }}>
                Capital Loss Avoided: {selectedFailure.capitalSaved}
              </div>
            </div>

            <div style={{ background: "#eff6ff", padding: "14px", borderRadius: "10px", border: "1px solid #bfdbfe" }}>
              <div className="intel-eyebrow" style={{ color: "#1d4ed8" }}>PREVENTION PROTOCOL</div>
              <p style={{ margin: "4px 0 0", color: "#1e3a8a", fontSize: "0.88rem", lineHeight: "1.45", fontWeight: 600 }}>
                {selectedFailure.preventionRecommendation}
              </p>
            </div>
          </div>
        </EntityDrawer>
      )}
    </div>
  );
}
