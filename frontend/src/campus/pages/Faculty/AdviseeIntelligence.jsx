import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  GraduationCap,
  Layers,
  Mail,
  Network,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import { ADVISEES } from "../../data/facultyData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  IntelligenceFilterBar,
  StatusBadge,
  EntityDrawer,
  EmptyState,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";
import "./FacultyDashboard.css";

function AdviseeIntelligence() {
  const navigate = useNavigate();
  const [advisees, setAdvisees] = useState(ADVISEES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredAdvisees = useMemo(() => {
    return advisees.filter((stu) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        stu.name.toLowerCase().includes(q) ||
        stu.regNumber.toLowerCase().includes(q) ||
        stu.project.toLowerCase().includes(q) ||
        stu.primarySkill.toLowerCase().includes(q);

      let matchesStatus = true;
      if (statusFilter === "ON_SCHEDULE") matchesStatus = stu.statusType === "success";
      if (statusFilter === "REVIEW_PENDING") matchesStatus = stu.statusType === "warning";
      if (statusFilter === "AT_RISK") matchesStatus = stu.statusType === "danger";

      let matchesRisk = true;
      if (riskFilter === "LOW") matchesRisk = stu.riskLevel.toLowerCase() === "low";
      if (riskFilter === "MODERATE") matchesRisk = stu.riskLevel.toLowerCase() === "moderate";
      if (riskFilter === "HIGH") matchesRisk = stu.riskLevel.toLowerCase() === "high";

      return matchesSearch && matchesStatus && matchesRisk;
    });
  }, [advisees, search, statusFilter, riskFilter]);

  const handleEndorseSkill = (studentName, skill) => {
    setAdvisees((prev) =>
      prev.map((s) => (s.name === studentName ? { ...s, endorsed: true } : s))
    );
    showToast(`Faculty Endorsement Recorded: Verified ${studentName}'s proficiency in ${skill}.`);
    if (selectedStudent) {
      setSelectedStudent((prev) => ({ ...prev, endorsed: true }));
    }
  };

  const statusPills = [
    { id: "ALL", label: "All Advisees", count: advisees.length },
    { id: "ON_SCHEDULE", label: "On Schedule", count: advisees.filter((s) => s.statusType === "success").length },
    { id: "REVIEW_PENDING", label: "Review Pending", count: advisees.filter((s) => s.statusType === "warning").length },
    { id: "AT_RISK", label: "Needs Attention", count: advisees.filter((s) => s.statusType === "danger").length },
  ];

  return (
    <div className="intel-page">
      {/* TOAST FEEDBACK */}
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
        eyebrowIcon={Users}
        title="My Advisees"
        description="Continuous capability intelligence, digital twin monitoring, and milestone trajectories for supervised scholars in your academic cohort."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/at-risk")}
            >
              <AlertCircle size={15} />
              <span>At-Risk Alerts ({advisees.filter((s) => s.statusType === "danger").length})</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => showToast("Exporting Advisee Intelligence Cohort Dossier (PDF)...")}
            >
              <GraduationCap size={16} />
              <span>Export Cohort Dossier</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Total Advisees"
          value={advisees.length}
          icon={Users}
          variant="blue"
          delta="100% Assigned"
          deltaType="positive"
          meta="Cohort: Spring 2026"
        />
        <KpiCard
          label="On Schedule"
          value={advisees.filter((s) => s.statusType === "success").length}
          icon={CheckCircle2}
          variant="green"
          delta="Normal Velocity"
          deltaType="positive"
          meta="Passing milestones"
        />
        <KpiCard
          label="Reviews Pending"
          value={advisees.filter((s) => s.statusType === "warning").length}
          icon={Clock}
          variant="amber"
          delta="Submissions in Queue"
          deltaType="warning"
          meta="Awaiting feedback"
          onClick={() => navigate("/faculty/reviews")}
        />
        <KpiCard
          label="Attention Alerts"
          value={advisees.filter((s) => s.statusType === "danger").length}
          icon={AlertCircle}
          variant="rose"
          delta="Delayed / Stalled"
          deltaType="negative"
          meta="Intervention required"
          onClick={() => navigate("/faculty/at-risk")}
        />
      </KpiGrid>

      {/* FILTER & SEARCH BAR */}
      <IntelligenceFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search advisees by name, reg number, project, or primary skill..."
        pills={statusPills}
        activePill={statusFilter}
        onPillSelect={setStatusFilter}
        totalCount={advisees.length}
        filteredCount={filteredAdvisees.length}
        actions={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>Risk Filter:</span>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
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
              <option value="ALL">All Risk Levels</option>
              <option value="LOW">Low Risk Only</option>
              <option value="MODERATE">Moderate Risk</option>
              <option value="HIGH">High Risk</option>
            </select>
          </div>
        }
      />

      {/* ADVISEES DATA TABLE */}
      <div className="intel-table-container">
        <table className="intel-table">
          <thead>
            <tr>
              <th>Scholar Profile</th>
              <th>Department / Year</th>
              <th>Capstone / Project</th>
              <th>Milestone Trajectory</th>
              <th>Risk Level</th>
              <th>Status</th>
              <th>Last Active</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdvisees.length > 0 ? (
              filteredAdvisees.map((stu) => (
                <tr
                  key={stu.id}
                  onClick={() => setSelectedStudent(stu)}
                  style={{ cursor: "pointer" }}
                  className="interactive-row"
                >
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {stu.avatar}
                      </div>
                      <div>
                        <strong style={{ display: "block", color: "#102544" }}>{stu.name}</strong>
                        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{stu.regNumber}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: "#1e293b", display: "block" }}>{stu.department}</span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{stu.year} • GPA {stu.gpa}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: "#1e293b", display: "block" }}>{stu.project}</span>
                    <span style={{ fontSize: "0.75rem", color: "#2563eb" }}>{stu.primarySkill}</span>
                  </td>
                  <td style={{ minWidth: "150px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.76rem", marginBottom: "4px" }}>
                      <span>Milestones ({stu.completedMilestones}/{stu.totalMilestones})</span>
                      <strong>{stu.progress}%</strong>
                    </div>
                    <div className="intel-progress-bar">
                      <div
                        className={`intel-progress-fill ${
                          stu.progress >= 80 ? "green" : stu.progress >= 50 ? "amber" : "rose"
                        }`}
                        style={{ width: `${stu.progress}%` }}
                      />
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "6px",
                        background: stu.riskLevel === "Low" ? "#ecfdf5" : stu.riskLevel === "Moderate" ? "#fffbeb" : "#fff1f2",
                        color: stu.riskLevel === "Low" ? "#047857" : stu.riskLevel === "Moderate" ? "#b45309" : "#b91c1c",
                        border: `1px solid ${stu.riskLevel === "Low" ? "#a7f3d0" : stu.riskLevel === "Moderate" ? "#fde68a" : "#fecaca"}`,
                      }}
                    >
                      {stu.riskLevel}
                    </span>
                  </td>
                  <td>
                    <StatusBadge variant={stu.statusType}>{stu.status}</StatusBadge>
                  </td>
                  <td style={{ fontSize: "0.82rem", color: "#64748b" }}>
                    {stu.lastActive}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      type="button"
                      className="intel-btn-secondary"
                      style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStudent(stu);
                      }}
                    >
                      <Eye size={13} />
                      <span>Inspect Twin</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ padding: "24px" }}>
                  <EmptyState
                    title="No advisees match current filter"
                    description="No scholars found matching the selected search query, status filter, and risk category."
                    actionLabel="Reset Filters"
                    onAction={() => {
                      setSearch("");
                      setStatusFilter("ALL");
                      setRiskFilter("ALL");
                    }}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* STUDENT DIGITAL TWIN RICH DRAWER */}
      {selectedStudent && (
        <EntityDrawer
          isOpen={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
          eyebrow="STUDENT DIGITAL TWIN"
          title={selectedStudent.name}
          subtitle={`${selectedStudent.regNumber} • ${selectedStudent.department} • ${selectedStudent.year}`}
          avatar={selectedStudent.avatar}
          footer={
            <>
              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => handleEndorseSkill(selectedStudent.name, selectedStudent.primarySkill)}
              >
                <Award size={14} />
                <span>Endorse Primary Skill</span>
              </button>
              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => {
                  navigate(`/faculty/advising`);
                }}
              >
                <Calendar size={14} />
                <span>Office Hours</span>
              </button>
              <button
                type="button"
                className="intel-btn-primary"
                onClick={() => {
                  showToast(`Advising session invitation dispatched to ${selectedStudent.email}`);
                  setSelectedStudent(null);
                }}
              >
                <Mail size={14} />
                <span>Email Advisee</span>
              </button>
            </>
          }
        >
          {/* TOP ACADEMIC INDICATORS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
            <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "10px", textAlign: "center", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>GPA Index</span>
              <strong style={{ display: "block", fontSize: "1.25rem", color: "#102544", marginTop: "2px" }}>{selectedStudent.gpa}</strong>
            </div>
            <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "10px", textAlign: "center", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Risk State</span>
              <strong style={{ display: "block", fontSize: "1.25rem", color: selectedStudent.riskLevel === "Low" ? "#059669" : selectedStudent.riskLevel === "Moderate" ? "#d97706" : "#dc2626", marginTop: "2px" }}>
                {selectedStudent.riskLevel}
              </strong>
            </div>
            <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "10px", textAlign: "center", border: "1px solid #e2e8f0" }}>
              <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Velocity</span>
              <strong style={{ display: "block", fontSize: "0.95rem", color: "#2563eb", marginTop: "4px" }}>
                {selectedStudent.growthVelocity}
              </strong>
            </div>
          </div>

          {/* ASSIGNED PROJECT WITH CROSS-MODULE LINK */}
          <div className="intel-card" style={{ padding: "18px", margin: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <div className="intel-eyebrow">ASSIGNED CAPSTONE PROJECT</div>
              <button
                type="button"
                className="intel-pill"
                onClick={() => navigate("/faculty/project-dna")}
                style={{ fontSize: "0.74rem", padding: "3px 8px" }}
              >
                <Layers size={12} />
                <span>Inspect in Project DNA</span>
              </button>
            </div>
            <h3 style={{ margin: "2px 0 4px", fontSize: "1.05rem", color: "#102544", fontWeight: 700 }}>
              {selectedStudent.project}
            </h3>
            <span style={{ fontSize: "0.8rem", color: "#64748b", display: "block", marginBottom: "10px" }}>
              {selectedStudent.projectType} • Current Deliverable: <strong>{selectedStudent.milestone}</strong>
            </span>
            <div className="intel-progress-bar">
              <div
                className={`intel-progress-fill ${selectedStudent.progress >= 80 ? "green" : selectedStudent.progress >= 50 ? "amber" : "rose"}`}
                style={{ width: `${selectedStudent.progress}%` }}
              />
            </div>
          </div>

          {/* VERIFIED COMPETENCIES */}
          <div>
            <div className="intel-eyebrow">VERIFIED CAPABILITY RADAR</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
              {selectedStudent.competencies?.map((comp) => (
                <div key={comp.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", marginBottom: "3px" }}>
                    <span style={{ fontWeight: 600, color: "#1e293b" }}>{comp.name}</span>
                    <strong style={{ color: comp.score >= 80 ? "#059669" : comp.score >= 60 ? "#2563eb" : "#d97706" }}>
                      {comp.score}%
                    </strong>
                  </div>
                  <div className="intel-progress-bar" style={{ height: "6px" }}>
                    <div
                      className={`intel-progress-fill ${comp.score >= 80 ? "green" : comp.score >= 60 ? "blue" : "amber"}`}
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KNOWLEDGE DNA CONNECTIVITY */}
          <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Share2 size={14} color="#2563eb" />
                <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>
                  Knowledge DNA Taxonomy Mapping
                </span>
              </div>
              <button
                type="button"
                className="intel-pill"
                onClick={() => navigate("/faculty/knowledge-dna")}
                style={{ fontSize: "0.72rem", padding: "2px 8px" }}
              >
                <span>DNA Map</span>
                &rarr;
              </button>
            </div>
            <p style={{ margin: 0, fontSize: "0.82rem", color: "#475569", lineHeight: "1.4" }}>
              Mapped to <strong>{selectedStudent.primarySkill}</strong> with prerequisite verification satisfied across departmental foundational courses.
            </p>
          </div>

          {/* IDENTIFIED SKILL GAPS */}
          {selectedStudent.skillGaps?.length > 0 && (
            <div>
              <div className="intel-eyebrow">IDENTIFIED SKILL GAPS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                {selectedStudent.skillGaps.map((gap) => (
                  <span
                    key={gap}
                    style={{
                      background: "#fff1f2",
                      color: "#be123c",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "99px",
                      border: "1px solid #fecdd3",
                    }}
                  >
                    {gap}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* INTERVENTION HISTORY */}
          {selectedStudent.interventionsHistory?.length > 0 && (
            <div>
              <div className="intel-eyebrow">INTERVENTION &amp; ADVISORY LOG</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                {selectedStudent.interventionsHistory.map((inv, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "8px",
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      fontSize: "0.82rem",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                      <strong style={{ color: "#102544" }}>{inv.type}</strong>
                      <span style={{ color: "#64748b", fontSize: "0.74rem" }}>{inv.date}</span>
                    </div>
                    <span style={{ color: "#475569" }}>{inv.note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RECOMMENDED NEXT ACTION */}
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "14px", borderRadius: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#15803d", fontWeight: 700, fontSize: "0.8rem" }}>
              <Sparkles size={15} />
              RECOMMENDED NEXT ACTION
            </div>
            <p style={{ margin: "4px 0 0", fontSize: "0.86rem", color: "#166534", fontWeight: 600 }}>
              {selectedStudent.recommendedAction}
            </p>
          </div>

          {/* RECENT ACTIVITY TELEMETRY */}
          <div>
            <div className="intel-eyebrow">RECENT TELEMETRY SIGNAL</div>
            <p style={{ fontSize: "0.84rem", color: "#475569", margin: "4px 0 0", lineHeight: "1.45" }}>
              {selectedStudent.recentActivity}
            </p>
          </div>

          {/* CROSS MODULE ACTION SHORTCUTS */}
          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "14px" }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
              Ecosystem Navigation:
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <button
                type="button"
                className="intel-btn-secondary"
                style={{ fontSize: "0.76rem", padding: "6px 10px" }}
                onClick={() => navigate("/faculty/knowledge-graph")}
              >
                <Network size={13} />
                <span>Knowledge Graph</span>
              </button>
              <button
                type="button"
                className="intel-btn-secondary"
                style={{ fontSize: "0.76rem", padding: "6px 10px" }}
                onClick={() => navigate("/faculty/failure-memory")}
              >
                <ShieldCheck size={13} />
                <span>Failure Memory</span>
              </button>
              <button
                type="button"
                className="intel-btn-secondary"
                style={{ fontSize: "0.76rem", padding: "6px 10px" }}
                onClick={() => navigate("/faculty/growth")}
              >
                <TrendingUp size={13} />
                <span>Growth Trajectory</span>
              </button>
            </div>
          </div>
        </EntityDrawer>
      )}
    </div>
  );
}

export default AdviseeIntelligence;
