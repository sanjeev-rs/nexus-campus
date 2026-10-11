import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Archive,
  BookOpen,
  CheckCircle2,
  Database,
  ExternalLink,
  FileCheck,
  GitBranch,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const RETENTION_METRICS_PER_DEPT = [
  { dept: "AI & Data Science", rate: 94.2, capturedArtifacts: 184, reusedCount: 152, orphanedProjects: 2, status: "EXEMPLARY" },
  { dept: "Computer Science & Engineering", rate: 91.5, capturedArtifacts: 218, reusedCount: 188, orphanedProjects: 4, status: "EXEMPLARY" },
  { dept: "Interdisciplinary Innovation Hub", rate: 96.0, capturedArtifacts: 48, reusedCount: 46, orphanedProjects: 0, status: "EXEMPLARY" },
  { dept: "Robotics & Automation", rate: 86.4, capturedArtifacts: 82, reusedCount: 64, orphanedProjects: 5, status: "GOOD" },
  { dept: "Information Technology", rate: 84.8, capturedArtifacts: 76, reusedCount: 58, orphanedProjects: 6, status: "GOOD" },
  { dept: "Electronics & Communication", rate: 81.2, capturedArtifacts: 70, reusedCount: 48, orphanedProjects: 8, status: "ATTENTION_NEEDED" },
];

const RECURRING_UNDOCUMENTED_PROBLEMS = [
  {
    id: "rup-01",
    symptom: "Jetson Orin Nano TensorRT C++ Compilation Cache Thrashing",
    frequency: "Encountered by 4 Robotics Capstone Teams",
    department: "Robotics & Automation",
    status: "Unresolved • Needs Lab Specialist Documentation",
    action: "Commission Post-Mortem",
  },
  {
    id: "rup-02",
    symptom: "PostgreSQL pgvector Connection Pool Exhaustion under Async FastAPI Load",
    frequency: "Encountered by 3 Data Science Teams",
    department: "AI & Data Science",
    status: "Drafting Workaround",
    action: "Publish Benchmark",
  },
];

export default function KnowledgeRetention() {
  const navigate = useNavigate();
  const [retentionData, setRetentionData] = useState(RETENTION_METRICS_PER_DEPT);
  const [undocumentedProblems, setUndocumentedProblems] = useState(RECURRING_UNDOCUMENTED_PROBLEMS);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleArchiveRemediation = (deptName) => {
    setRetentionData((prev) =>
      prev.map((d) => (d.dept === deptName ? { ...d, orphanedProjects: 0, rate: Math.min(100, d.rate + 4) } : d))
    );
    showToast(`Orphaned project repositories in ${deptName} automatically cataloged into NEXUS Knowledge DNA.`);
  };

  const handleCommissionPostMortem = (id) => {
    setUndocumentedProblems((prev) => prev.filter((p) => p.id !== id));
    showToast(`Faculty investigation docket dispatched. Post-mortem assigned to lab specialist.`);
  };

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
        eyebrowIcon={Database}
        title="Knowledge Retention &amp; Institutional Preservation Index"
        description="Preserve research capital, prevent intellectual loss when senior cohorts graduate, catalog orphaned repositories, and codify solutions for recurring undocumented technical roadblocks."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/learning")}
            >
              <GitBranch size={16} />
              <span>Institutional Learning</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => showToast("Institutional Knowledge Preservation Harvest dispatched across all 6 departments.")}
            >
              <RefreshCw size={16} />
              <span>Trigger Campus Knowledge Harvest</span>
            </button>
          </>
        }
      />

      {/* 5-PILLAR RETENTION METRICS */}
      <KpiGrid>
        <KpiCard
          label="1. Knowledge Captured"
          value="678 Repos"
          icon={Database}
          variant="blue"
          delta="100% Codified"
          deltaType="positive"
          meta="Code, weights & tests preserved"
        />
        <KpiCard
          label="2. Knowledge Reused"
          value="84.6%"
          icon={CheckCircle2}
          variant="green"
          delta="Cross-Cohort Reuse"
          deltaType="positive"
          meta="554 Artifacts Reused in '26"
        />
        <KpiCard
          label="3. Knowledge Gaps"
          value="8 Gaps"
          icon={AlertCircle}
          variant="amber"
          delta="Deficit Tracked"
          deltaType="warning"
          meta="Targeted by elective bootcamps"
          onClick={() => navigate("/management/skill-gaps")}
        />
        <KpiCard
          label="4. Orphaned Knowledge"
          value="25 Projects"
          icon={ShieldAlert}
          variant="rose"
          delta="Requires Archiving"
          deltaType="negative"
          meta="Graduated uncataloged teams"
        />
      </KpiGrid>

      {/* DEPARTMENT RETENTION AUDIT TABLE */}
      <div className="intel-card" style={{ padding: "24px", marginBottom: "24px" }}>
        <div className="intel-card-header">
          <div>
            <h2>Departmental Knowledge Preservation &amp; Reuse Audit</h2>
            <div className="intel-card-subtitle">
              Tracking preserved intellectual assets, reusability index, and orphaned project remediation across departments
            </div>
          </div>
        </div>

        <div className="intel-table-container" style={{ border: "none" }}>
          <table className="intel-table">
            <thead>
              <tr>
                <th>Academic Department</th>
                <th>Preservation Score</th>
                <th>Captured Artifacts</th>
                <th>Active Cohort Reuse</th>
                <th>Orphaned Projects</th>
                <th>Accreditation Status</th>
                <th style={{ textAlign: "right" }}>Remediation</th>
              </tr>
            </thead>
            <tbody>
              {retentionData.map((d) => (
                <tr key={d.dept}>
                  <td>
                    <strong style={{ color: "#102544" }}>{d.dept}</strong>
                  </td>
                  <td style={{ minWidth: "150px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "3px" }}>
                      <span>Retention</span>
                      <strong>{d.rate}%</strong>
                    </div>
                    <div className="intel-progress-bar">
                      <div
                        className={`intel-progress-fill ${d.rate >= 90 ? "green" : d.rate >= 84 ? "blue" : "amber"}`}
                        style={{ width: `${d.rate}%` }}
                      />
                    </div>
                  </td>
                  <td style={{ fontWeight: 600, color: "#102544" }}>
                    {d.capturedArtifacts} Artifacts
                  </td>
                  <td style={{ fontWeight: 700, color: "#059669" }}>
                    {d.reusedCount} Reused
                  </td>
                  <td>
                    {d.orphanedProjects > 0 ? (
                      <span className="intel-badge warning">
                        {d.orphanedProjects} Orphaned
                      </span>
                    ) : (
                      <span className="intel-badge success">Zero Orphaned</span>
                    )}
                  </td>
                  <td>
                    <StatusBadge variant={d.status === "EXEMPLARY" ? "success" : d.status === "GOOD" ? "info" : "warning"}>
                      {d.status}
                    </StatusBadge>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {d.orphanedProjects > 0 ? (
                      <button
                        type="button"
                        className="intel-btn-secondary"
                        style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                        onClick={() => handleArchiveRemediation(d.dept)}
                      >
                        <Archive size={13} />
                        <span>Preserve Repos</span>
                      </button>
                    ) : (
                      <span style={{ fontSize: "0.8rem", color: "#059669", fontWeight: 700 }}>
                        &check; Preserved
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. RECURRING PROBLEMS WITH NO DOCUMENTED SOLUTION */}
      <div className="intel-card" style={{ padding: "24px" }}>
        <div className="intel-card-header">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertCircle size={18} color="#dc2626" />
              <h2>5. Recurring Problems with No Documented Solution</h2>
            </div>
            <div className="intel-card-subtitle">
              High-frequency student engineering bottlenecks awaiting formal post-mortem documentation in Failure Memory
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {undocumentedProblems.map((prob) => (
            <div
              key={prob.id}
              style={{
                padding: "18px 20px",
                borderRadius: "10px",
                border: "1px solid #fed7aa",
                background: "#fffaf0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span className="intel-badge warning">{prob.frequency}</span>
                  <span style={{ fontSize: "0.78rem", color: "#64748b" }}>Dept: {prob.department}</span>
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#102544", margin: "2px 0 4px" }}>
                  {prob.symptom}
                </h3>
                <span style={{ fontSize: "0.82rem", color: "#c2410c", fontWeight: 600 }}>
                  Status: {prob.status}
                </span>
              </div>

              <button
                type="button"
                className="intel-btn-primary"
                onClick={() => handleCommissionPostMortem(prob.id)}
                style={{ fontSize: "0.8rem", padding: "8px 16px" }}
              >
                <BookOpen size={14} />
                <span>Commission Post-Mortem</span>
              </button>
            </div>
          ))}

          {undocumentedProblems.length === 0 && (
            <div style={{ textAlign: "center", padding: "24px", color: "#059669", fontWeight: 600 }}>
              &check; All recurring engineering problems across departments have documented solutions in Institutional Failure Memory!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
