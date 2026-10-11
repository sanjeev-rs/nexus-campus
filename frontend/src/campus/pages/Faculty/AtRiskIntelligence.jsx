import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Layers,
  Mail,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Users,
  X,
} from "lucide-react";

import { AT_RISK_STUDENTS } from "../../data/facultyData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
  EntityDrawer,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

function AtRiskIntelligence() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(AT_RISK_STUDENTS);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [interventionNote, setInterventionNote] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleResolveAlert = (id, studentName) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    showToast(`Intervention recorded for ${studentName}. Status moved to Monitored.`);
    setSelectedStudent(null);
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
        eyebrow="STUDENT INTELLIGENCE"
        eyebrowIcon={AlertCircle}
        title="At-Risk Student Identification &amp; Intervention"
        description="Early warning signals, stalled milestone trajectories, commit stagnation, and targeted faculty intervention directives for scholars needing immediate academic attention."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/advisees")}
            >
              <Users size={15} />
              <span>Cohort Advisees</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => navigate("/faculty/interventions")}
            >
              <ShieldCheck size={15} />
              <span>Intervention Management</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Active Attention Alerts"
          value={students.length}
          icon={ShieldAlert}
          variant="rose"
          delta="Requires Action"
          deltaType="negative"
          meta="Supervised scholars"
        />
        <KpiCard
          label="Critical Severity"
          value={students.filter((s) => s.severity === "CRITICAL").length}
          icon={AlertTriangle}
          variant="rose"
          delta=">7 Days Inactive"
          deltaType="negative"
          meta="Immediate warning"
        />
        <KpiCard
          label="Moderate / High Severity"
          value={students.filter((s) => s.severity !== "CRITICAL").length}
          icon={Clock}
          variant="amber"
          delta="Milestone Delays"
          deltaType="warning"
          meta="Technical blockers"
        />
        <KpiCard
          label="Intervention Resolution Rate"
          value="91%"
          icon={CheckCircle2}
          variant="green"
          delta="Spring 2026"
          deltaType="positive"
          meta="Resolved in <5 days"
        />
      </KpiGrid>

      {/* AT RISK CARDS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {students.length > 0 ? (
          students.map((stu) => {
            const isCritical = stu.severity === "CRITICAL";
            const isHigh = stu.severity === "HIGH";

            return (
              <div
                key={stu.id}
                className="intel-card"
                style={{
                  borderLeft: `5px solid ${isCritical ? "#dc2626" : isHigh ? "#ea580c" : "#d97706"}`,
                  margin: 0,
                  padding: "26px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <StatusBadge variant={isCritical ? "danger" : isHigh ? "warning" : "info"}>
                        {stu.severity} SEVERITY
                      </StatusBadge>
                      <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>
                        Stalled for {stu.stalledDays} days
                      </span>
                    </div>

                    <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#102544", margin: "2px 0 4px" }}>
                      {stu.name} <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "#64748b" }}>({stu.regNumber})</span>
                    </h2>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.84rem", color: "#2563eb", fontWeight: 600 }}>
                      <span>Capstone: {stu.project}</span>
                      <span style={{ color: "#cbd5e1" }}>&bull;</span>
                      <span style={{ color: "#64748b" }}>{stu.department}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="intel-btn-secondary"
                      onClick={() => {
                        showToast(`Formal advisory notice dispatched to ${stu.contactEmail}`);
                      }}
                      style={{ fontSize: "0.82rem", padding: "8px 14px" }}
                    >
                      <Mail size={14} />
                      <span>Send Direct Notice</span>
                    </button>

                    <button
                      type="button"
                      className="intel-btn-primary"
                      onClick={() => setSelectedStudent(stu)}
                      style={{ fontSize: "0.82rem", padding: "8px 16px" }}
                    >
                      <Calendar size={14} />
                      <span>Log Intervention Session</span>
                    </button>
                  </div>
                </div>

                {/* 3 STRUCTURED PANELS: REASON, EVIDENCE, RECOMMENDED ACTION */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px", marginTop: "14px" }}>
                  <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                    <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                      1. Stagnation Root Cause
                    </strong>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "#1e293b", lineHeight: "1.45" }}>
                      {stu.reason}
                    </p>
                  </div>

                  <div style={{ background: "#eff6ff", padding: "14px", borderRadius: "10px", border: "1px solid #bfdbfe" }}>
                    <strong style={{ display: "block", fontSize: "0.74rem", color: "#1d4ed8", textTransform: "uppercase", marginBottom: "4px" }}>
                      2. Telemetry Evidence
                    </strong>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "#1e3a8a", lineHeight: "1.45" }}>
                      {stu.evidence}
                    </p>
                  </div>

                  <div style={{ background: "#f0fdf4", padding: "14px", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
                    <strong style={{ display: "block", fontSize: "0.74rem", color: "#15803d", textTransform: "uppercase", marginBottom: "4px" }}>
                      3. Recommended Intervention Directive
                    </strong>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "#166534", lineHeight: "1.45", fontWeight: 600 }}>
                      {stu.recommendedIntervention}
                    </p>
                  </div>
                </div>

                {/* CROSS-MODULE SHORTCUTS */}
                <div style={{ display: "flex", gap: "8px", marginTop: "14px", borderTop: "1px solid #f1f5f9", paddingTop: "12px", alignItems: "center" }}>
                  <span style={{ fontSize: "0.74rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase" }}>Quick Traces:</span>
                  <button
                    type="button"
                    className="intel-pill"
                    onClick={() => navigate("/faculty/advisees")}
                    style={{ fontSize: "0.76rem" }}
                  >
                    <Users size={12} />
                    <span>View Digital Twin</span>
                  </button>
                  <button
                    type="button"
                    className="intel-pill"
                    onClick={() => navigate("/faculty/project-dna")}
                    style={{ fontSize: "0.76rem" }}
                  >
                    <Layers size={12} />
                    <span>Project DNA</span>
                  </button>
                  <button
                    type="button"
                    className="intel-pill"
                    onClick={() => navigate("/faculty/failure-memory")}
                    style={{ fontSize: "0.76rem" }}
                  >
                    <ShieldAlert size={12} />
                    <span>Failure Memory</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="intel-card" style={{ textAlign: "center", padding: "48px" }}>
            <CheckCircle2 size={36} color="#059669" style={{ margin: "0 auto 12px" }} />
            <h3 style={{ color: "#102544", margin: 0 }}>All Advisees Operating Within Safe Velocity</h3>
            <p style={{ color: "#64748b", margin: "6px 0 0" }}>Zero unresolved at-risk signals or critical milestone delays detected.</p>
          </div>
        )}
      </div>

      {/* LOG INTERVENTION DRAWER */}
      {selectedStudent && (
        <EntityDrawer
          isOpen={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
          eyebrow="FACULTY INTERVENTION DOCKET"
          title={`Intervene: ${selectedStudent.name}`}
          subtitle={`${selectedStudent.regNumber} • ${selectedStudent.project}`}
          footer={
            <>
              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => setSelectedStudent(null)}
              >
                <span>Cancel</span>
              </button>
              <button
                type="button"
                className="intel-btn-primary"
                onClick={() => handleResolveAlert(selectedStudent.id, selectedStudent.name)}
              >
                <CheckCircle2 size={15} />
                <span>Commit &amp; Mark Monitored</span>
              </button>
            </>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div className="intel-eyebrow">DIAGNOSTIC EVIDENCE</div>
              <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#1e293b", lineHeight: "1.45" }}>
                {selectedStudent.evidence}
              </p>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#102544", marginBottom: "6px" }}>
                Intervention Recovery Plan &amp; Milestone Adjustment:
              </label>
              <textarea
                rows={5}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontFamily: "inherit",
                  fontSize: "0.88rem",
                  boxSizing: "border-box",
                }}
                placeholder="Agreed technical remedy, revised deliverable deadline, mandatory office hours checkpoint..."
                value={interventionNote}
                onChange={(e) => setInterventionNote(e.target.value)}
              />
            </div>
          </div>
        </EntityDrawer>
      )}
    </div>
  );
}

export default AtRiskIntelligence;
