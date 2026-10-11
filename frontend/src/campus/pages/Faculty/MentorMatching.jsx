import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  CheckCircle2,
  Clock,
  Edit3,
  ExternalLink,
  Layers,
  Network,
  Save,
  Sliders,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { MENTOR_MATCHING } from "../../data/facultyData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
  EntityDrawer,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

function MentorMatching() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState(MENTOR_MATCHING);
  const [toastMessage, setToastMessage] = useState(null);
  const [modifyingMatch, setModifyingMatch] = useState(null);
  const [customHours, setCustomHours] = useState("3.0");
  const [coAdvisor, setCoAdvisor] = useState("None (Primary Advisor Sole)");
  const [specialNote, setSpecialNote] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAcceptMatch = (id, student, mentor) => {
    setMatches((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "Accepted & Assigned" } : m))
    );
    showToast(`Mentorship match confirmed: ${mentor} assigned to advise ${student}.`);
  };

  const handleDismissMatch = (id, student) => {
    setMatches((prev) => prev.filter((m) => m.id !== id));
    showToast(`Recommendation dismissed for ${student}.`);
  };

  const handleOpenModify = (item) => {
    setModifyingMatch(item);
    setCustomHours(item.recommendedHours || "3.0");
    setCoAdvisor(item.coAdvisor || "None (Primary Advisor Sole)");
    setSpecialNote(item.specialNote || "");
  };

  const handleSaveModifiedMatch = () => {
    if (!modifyingMatch) return;
    setMatches((prev) =>
      prev.map((m) =>
        m.id === modifyingMatch.id
          ? {
              ...m,
              status: "Modified & Assigned",
              recommendedHours: customHours,
              coAdvisor,
              specialNote,
            }
          : m
      )
    );
    showToast(`Customized Mentorship parameters saved for ${modifyingMatch.studentName}.`);
    setModifyingMatch(null);
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
        eyebrow="PROJECT & RESEARCH"
        eyebrowIcon={Network}
        title="Mentor &amp; Project Matching"
        description="Explainable recommendation engine pairing student technical bottlenecks with faculty research specializations, verified competencies, and lab capacity."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/research")}
            >
              <Users size={15} />
              <span>Faculty Roster</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => navigate("/faculty/project-dna")}
            >
              <Layers size={15} />
              <span>Project DNA</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Pending Matches"
          value={matches.filter((m) => !m.status.includes("Assigned")).length}
          icon={Network}
          variant="blue"
          delta="Explainable AI"
          deltaType="positive"
          meta="Algorithmic suggestions"
        />
        <KpiCard
          label="Active Mentorships"
          value={matches.filter((m) => m.status.includes("Assigned")).length}
          icon={CheckCircle2}
          variant="green"
          delta="Assigned This Term"
          deltaType="positive"
          meta="Supervision active"
        />
        <KpiCard
          label="Avg Match Compatibility"
          value="90.5%"
          icon={Sparkles}
          variant="purple"
          delta="Top Quintile"
          deltaType="positive"
          meta="Competency & History"
        />
      </KpiGrid>

      {/* MATCHING CARDS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {matches.map((item) => {
          const isAssigned = item.status.includes("Assigned");

          return (
            <div key={item.id} className="intel-card" style={{ margin: 0, padding: "26px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <StatusBadge variant={isAssigned ? "success" : "info"}>
                      {item.status}
                    </StatusBadge>
                    <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                      Scholar: <strong>{item.studentName}</strong> &bull; Project: <strong>{item.project}</strong>
                    </span>
                  </div>

                  <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#102544", margin: 0 }}>
                    Recommended Mentor: <span style={{ color: "#2563eb" }}>{item.facultyMatch}</span>
                  </h2>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "8px 16px", borderRadius: "10px", textAlign: "center" }}>
                    <span style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>
                      Match Score
                    </span>
                    <strong style={{ fontSize: "1.3rem", color: "#1d4ed8" }}>{item.matchScore}%</strong>
                  </div>

                  {!isAssigned ? (
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        className="intel-btn-secondary"
                        onClick={() => handleDismissMatch(item.id, item.studentName)}
                        style={{ color: "#dc2626", borderColor: "#fecdd3", padding: "8px 14px" }}
                        title="Dismiss recommendation"
                      >
                        <X size={15} />
                        <span>Dismiss</span>
                      </button>

                      <button
                        type="button"
                        className="intel-btn-secondary"
                        onClick={() => handleOpenModify(item)}
                        style={{ padding: "8px 14px" }}
                        title="Modify mentoring hours or co-mentor"
                      >
                        <Sliders size={15} />
                        <span>Modify</span>
                      </button>

                      <button
                        type="button"
                        className="intel-btn-primary"
                        onClick={() => handleAcceptMatch(item.id, item.studentName, item.facultyMatch)}
                        style={{ padding: "8px 16px" }}
                      >
                        <Check size={15} />
                        <span>Accept &amp; Assign</span>
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="intel-badge success" style={{ padding: "8px 14px" }}>
                        <CheckCircle2 size={16} />
                        Assigned Active Mentor
                      </span>
                      <button
                        type="button"
                        className="intel-btn-secondary"
                        onClick={() => handleOpenModify(item)}
                        style={{ padding: "6px 10px", fontSize: "0.78rem" }}
                      >
                        <Edit3 size={13} />
                        <span>Edit Terms</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* REQUESTED ASSISTANCE */}
              <div style={{ background: "#f8fafc", padding: "14px 16px", borderRadius: "10px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                  Specific Engineering Assistance Requested by Student
                </strong>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#1e293b", fontWeight: 600 }}>
                  "{item.requestedHelp}"
                </p>
              </div>

              {/* EXPLAINABLE AI MATCHING REASONS */}
              <div style={{ marginBottom: "16px" }}>
                <strong style={{ display: "block", fontSize: "0.76rem", color: "#64748b", textTransform: "uppercase", marginBottom: "8px" }}>
                  Explainable Matching Rationale:
                </strong>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
                  <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px 14px" }}>
                    <strong style={{ display: "block", fontSize: "0.74rem", color: "#2563eb", textTransform: "uppercase", marginBottom: "3px" }}>
                      1. Domain Expertise Overlap
                    </strong>
                    <p style={{ margin: 0, fontSize: "0.84rem", color: "#334155" }}>
                      Faculty active publications in target domain ({item.projectRequired?.slice(0, 2).join(", ") || "Core Technical Domain"}).
                    </p>
                  </div>

                  <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px 14px" }}>
                    <strong style={{ display: "block", fontSize: "0.74rem", color: "#15803d", textTransform: "uppercase", marginBottom: "3px" }}>
                      2. Research &amp; Lab Hardware
                    </strong>
                    <p style={{ margin: 0, fontSize: "0.84rem", color: "#334155" }}>
                      {item.rationale || "Direct access to specialized departmental lab facilities and test environments."}
                    </p>
                  </div>

                  <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "12px 14px" }}>
                    <strong style={{ display: "block", fontSize: "0.74rem", color: "#7c3aed", textTransform: "uppercase", marginBottom: "3px" }}>
                      3. Mentorship Track Record
                    </strong>
                    <p style={{ margin: 0, fontSize: "0.84rem", color: "#334155" }}>
                      Successfully guided 6 previous capstone teams through milestone defense with 94% on-time completion.
                    </p>
                  </div>
                </div>
              </div>

              {/* REQUIRED VS OFFERED SKILLS */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                <div>
                  <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
                    Project Requires:
                  </strong>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {(item.projectRequired || ["Computer Vision", "ROS 2", "Robotics"]).map((sk) => (
                      <span key={sk} style={{ background: "#eff6ff", color: "#1d4ed8", fontSize: "0.76rem", padding: "3px 8px", borderRadius: "6px", fontWeight: 600 }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
                    Faculty Verified Expertise:
                  </strong>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {(item.facultyExpertise || ["Embedded C++", "Autonomous Systems", "Graph AI"]).map((sk) => (
                      <span key={sk} style={{ background: "#ecfdf5", color: "#047857", fontSize: "0.76rem", padding: "3px 8px", borderRadius: "6px", fontWeight: 600 }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODIFY PARAMETERS DRAWER */}
      {modifyingMatch && (
        <EntityDrawer
          isOpen={Boolean(modifyingMatch)}
          onClose={() => setModifyingMatch(null)}
          eyebrow="MENTORSHIP ADVISORY TERMS"
          title={`Modify Terms: ${modifyingMatch.facultyMatch}`}
          subtitle={`Advisee Scholar: ${modifyingMatch.studentName} • ${modifyingMatch.project}`}
          footer={
            <>
              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => setModifyingMatch(null)}
              >
                <span>Cancel</span>
              </button>
              <button
                type="button"
                className="intel-btn-primary"
                onClick={handleSaveModifiedMatch}
              >
                <Save size={15} />
                <span>Save Advisory Directive</span>
              </button>
            </>
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#102544", marginBottom: "6px" }}>
                Advisory Commitment (Hours / Week):
              </label>
              <select
                value={customHours}
                onChange={(e) => setCustomHours(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                  background: "#ffffff",
                }}
              >
                <option value="1.5">1.5 Hours / Week (Advisory Oversight)</option>
                <option value="3.0">3.0 Hours / Week (Standard Capstone Co-Lead)</option>
                <option value="5.0">5.0 Hours / Week (Intensive Research Thesis)</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#102544", marginBottom: "6px" }}>
                Secondary Co-Advisor / Lab Specialist:
              </label>
              <select
                value={coAdvisor}
                onChange={(e) => setCoAdvisor(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.9rem",
                  background: "#ffffff",
                }}
              >
                <option value="None (Primary Advisor Sole)">None (Primary Advisor Sole)</option>
                <option value="Dr. Aris Thorne (Robotics Lab)">Dr. Aris Thorne (Robotics Lab)</option>
                <option value="Dr. Elena Rostova (Systems Lab)">Dr. Elena Rostova (Systems Lab)</option>
                <option value="Dr. Julian Hayes (Innovation Hub)">Dr. Julian Hayes (Innovation Hub)</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#102544", marginBottom: "6px" }}>
                Lab Equipment Authorization / Special Directives:
              </label>
              <textarea
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                rows={4}
                placeholder="Authorize Jetson testbed bench 4 access, schedule weekly Thursday standup..."
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "0.88rem",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>
        </EntityDrawer>
      )}
    </div>
  );
}

export default MentorMatching;
