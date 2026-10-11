import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  DollarSign,
  ExternalLink,
  Eye,
  Flag,
  FolderKanban,
  Layers,
  Network,
  Plus,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import { CAMPUS_MISSIONS } from "../../data/managementData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
  EntityDrawer,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const DETAILED_MISSION_ROSTER = {
  "mission-01": {
    matchedScholars: [
      { name: "Aiden Cross", dept: "AI & Data Science", skillMatch: "94% (Load Forecasting)", gpa: "3.92" },
      { name: "Maya Lin", dept: "Robotics & Automation", skillMatch: "88% (Embedded Telemetry)", gpa: "3.85" },
      { name: "Karan Patel", dept: "Computer Science", skillMatch: "82% (FastAPI Services)", gpa: "3.78" },
    ],
    matchedFaculty: [
      { name: "Dr. Julian Hayes", role: "Mission Co-Director", dept: "Innovation Hub" },
      { name: "Dr. Rajesh Iyer", role: "Hardware Subsystems Lead", dept: "ECE" },
    ],
    linkedProjects: ["Smart Campus Analytics", "Edge Vision Laboratory Monitor"],
    knowledgeTies: ["RK-04: Behavioral Energy Clustering", "FM-01: Time-series lag mitigation"],
  },
  "mission-02": {
    matchedScholars: [
      { name: "Sophia Sterling", dept: "AI & Data Science", skillMatch: "98% (Vector Search)", gpa: "3.96" },
      { name: "Devon Reed", dept: "Computer Science", skillMatch: "91% (Graph Cypher)", gpa: "3.48" },
      { name: "Elena Rostova", dept: "Information Tech", skillMatch: "86% (Fullstack UX)", gpa: "3.82" },
    ],
    matchedFaculty: [
      { name: "Dr. Evelyn Vance", role: "Mission Principal Director", dept: "AI & Data Science" },
      { name: "Dr. Elena Rostova", role: "Distributed Architecture Lead", dept: "CSE" },
    ],
    linkedProjects: ["Campus Knowledge RAG Retrieval", "Distributed Graph Intelligence Engine"],
    knowledgeTies: ["RK-01: Dense Retrieval on Academic Corpora", "FM-04: Markdown Table Chunking"],
  },
  "mission-03": {
    matchedScholars: [
      { name: "Maya Lin", dept: "Robotics & Automation", skillMatch: "96% (ROS 2 & SLAM)", gpa: "3.85" },
      { name: "Liam Vance", dept: "Computer Science", skillMatch: "90% (Jetson C++ Inference)", gpa: "3.74" },
    ],
    matchedFaculty: [
      { name: "Dr. Aris Thorne", role: "Robotics Fleet Director", dept: "Robotics & Automation" },
    ],
    linkedProjects: ["Autonomous Campus Drone Navigation", "Edge Vision Laboratory Monitor"],
    knowledgeTies: ["RK-09: Micro-Aerial Vehicle Safety Standards", "FM-03: Sensor Mount Vibration Decoupling"],
  },
};

function CampusMissions() {
  const navigate = useNavigate();
  const [missions, setMissions] = useState(CAMPUS_MISSIONS);
  const [selectedMission, setSelectedMission] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const activeRoster = selectedMission ? DETAILED_MISSION_ROSTER[selectedMission.id] : null;

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
        eyebrow="STRATEGIC INTELLIGENCE"
        eyebrowIcon={Flag}
        title="Campus Missions Hub"
        description="Grand institutional challenges uniting cross-department student teams, faculty research advisors, capital grant allocation, and enterprise partners to solve critical campus operations."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/decision-support")}
            >
              <Sparkles size={15} />
              <span>Decision Support</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => showToast("Opening Campus Mission Authoring Wizard...")}
            >
              <Plus size={16} />
              <span>Charter New Campus Mission</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Active Grand Missions"
          value={missions.length}
          icon={Flag}
          variant="blue"
          delta="Cross-Department"
          deltaType="positive"
          meta="Multi-disciplinary"
        />
        <KpiCard
          label="Staffed Student Researchers"
          value="44 Scholars"
          icon={Users}
          variant="green"
          delta="Top 5% Cohort"
          deltaType="positive"
          meta="Funded research fellows"
        />
        <KpiCard
          label="Committed Capital Budget"
          value="$240,000"
          icon={DollarSign}
          variant="purple"
          delta="100% Deployed"
          deltaType="positive"
          meta="Operations & Lab reserves"
          onClick={() => navigate("/management/resources")}
        />
      </KpiGrid>

      {/* MISSIONS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "24px" }}>
        {missions.map((m) => (
          <div
            key={m.id}
            className="intel-card"
            style={{
              margin: 0,
              padding: "26px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              {/* TOP STATUS */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <StatusBadge variant="success">{m.status}</StatusBadge>
                <strong style={{ fontSize: "0.85rem", color: "#059669" }}>{m.budget}</strong>
              </div>

              <div style={{ fontSize: "0.76rem", fontWeight: 800, color: "#2563eb", marginBottom: "2px", textTransform: "uppercase" }}>
                {m.code}
              </div>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#102544", margin: "0 0 6px" }}>
                {m.title}
              </h2>
              <span style={{ fontSize: "0.82rem", color: "#64748b", display: "block", marginBottom: "14px" }}>
                Mission Faculty Lead: <strong style={{ color: "#1e293b" }}>{m.lead}</strong>
              </span>

              {/* PROBLEM */}
              <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", marginBottom: "14px", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                  Institutional Problem Statement:
                </strong>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#1e293b", lineHeight: "1.45" }}>
                  {m.problem}
                </p>
              </div>

              {/* REQUIRED SKILLS */}
              <div style={{ marginBottom: "14px" }}>
                <strong style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
                  Required Competency Cluster:
                </strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {m.requiredSkills.map((sk) => (
                    <span
                      key={sk}
                      style={{
                        background: "#eff6ff",
                        color: "#1d4ed8",
                        fontSize: "0.76rem",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        fontWeight: 600,
                      }}
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* TARGET DELIVERABLE */}
              <div style={{ background: "#f0fdf4", padding: "12px 14px", borderRadius: "8px", border: "1px solid #bbf7d0", marginBottom: "16px", fontSize: "0.82rem" }}>
                <strong style={{ color: "#15803d", display: "block", marginBottom: "2px" }}>Target Institutional Deliverable:</strong>
                <span style={{ color: "#166534", fontWeight: 600 }}>{m.targetDeliverable}</span>
              </div>
            </div>

            {/* PROGRESS & ROSTER ACTION */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px", fontSize: "0.78rem" }}>
                <span style={{ color: "#64748b" }}>Execution Sprint Trajectory</span>
                <strong style={{ color: "#102544" }}>{m.progress}%</strong>
              </div>
              <div className="intel-progress-bar" style={{ height: "8px" }}>
                <div className="intel-progress-fill green" style={{ width: `${m.progress}%` }} />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  <strong>{m.matchedStudents} Scholars</strong> &bull; <strong>{m.matchedFaculty} Faculty</strong>
                </span>

                <button
                  type="button"
                  className="intel-btn-primary"
                  onClick={() => setSelectedMission(m)}
                  style={{ fontSize: "0.78rem", padding: "6px 14px" }}
                >
                  <Eye size={13} />
                  <span>Inspect Staffing &amp; Traces</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MISSION DEEP INSPECTION DRAWER */}
      {selectedMission && (
        <EntityDrawer
          isOpen={Boolean(selectedMission)}
          onClose={() => setSelectedMission(null)}
          eyebrow="GRAND MISSION CHARTER"
          title={selectedMission.title}
          subtitle={`Code: ${selectedMission.code} • Budget: ${selectedMission.budget}`}
          footer={
            <>
              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => navigate("/management/resources")}
              >
                <DollarSign size={14} />
                <span>Adjust Budget</span>
              </button>
              <button
                type="button"
                className="intel-btn-primary"
                onClick={() => {
                  showToast(`Sprint milestone verified for ${selectedMission.title}.`);
                  setSelectedMission(null);
                }}
              >
                <CheckCircle2 size={14} />
                <span>Approve Current Milestone</span>
              </button>
            </>
          }
        >
          {/* PROBLEM TO OUTCOME FLOW */}
          <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <div className="intel-eyebrow">INSTITUTIONAL PROBLEM &amp; EXPECTED OUTCOME</div>
            <p style={{ fontSize: "0.88rem", color: "#1e293b", margin: "6px 0 10px", lineHeight: "1.45" }}>
              {selectedMission.problem}
            </p>
            <div style={{ background: "#ffffff", padding: "10px 12px", borderRadius: "8px", borderLeft: "3px solid #10b981", fontSize: "0.84rem", color: "#166534", fontWeight: 600 }}>
              Expected Outcome: {selectedMission.targetDeliverable}
            </div>
          </div>

          {/* MATCHED SCHOLARS ROSTER */}
          {activeRoster?.matchedScholars && (
            <div>
              <div className="intel-eyebrow">MATCHED STUDENT RESEARCHERS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                {activeRoster.matchedScholars.map((stu) => (
                  <div
                    key={stu.name}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: "0.9rem", color: "#102544", display: "block" }}>{stu.name}</strong>
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{stu.dept} &bull; GPA {stu.gpa}</span>
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#059669", background: "#ecfdf5", padding: "3px 8px", borderRadius: "6px" }}>
                      {stu.skillMatch}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MATCHED FACULTY DIRECTORS */}
          {activeRoster?.matchedFaculty && (
            <div>
              <div className="intel-eyebrow">FACULTY ADVISORY DIRECTORS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
                {activeRoster.matchedFaculty.map((fac) => (
                  <div
                    key={fac.name}
                    style={{
                      padding: "12px",
                      borderRadius: "8px",
                      background: "#ffffff",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: "0.9rem", color: "#102544", display: "block" }}>{fac.name}</strong>
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{fac.dept}</span>
                    </div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#2563eb" }}>
                      {fac.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LINKED PROJECTS */}
          {activeRoster?.linkedProjects && (
            <div>
              <div className="intel-eyebrow">ASSOCIATED CAPSTONE REPOSITORIES</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                {activeRoster.linkedProjects.map((p) => (
                  <button
                    key={p}
                    type="button"
                    className="intel-pill"
                    onClick={() => navigate("/management/project-dna")}
                    style={{ fontSize: "0.78rem", padding: "4px 10px" }}
                  >
                    <FolderKanban size={13} />
                    <span>{p}</span>
                    <ExternalLink size={11} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* INSTITUTIONAL KNOWLEDGE TIES */}
          {activeRoster?.knowledgeTies && (
            <div>
              <div className="intel-eyebrow">INSTITUTIONAL KNOWLEDGE &amp; FAILURE TIES</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
                {activeRoster.knowledgeTies.map((k) => (
                  <span
                    key={k}
                    style={{
                      background: "#f1f5f9",
                      color: "#334155",
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </div>
          )}
        </EntityDrawer>
      )}
    </div>
  );
}

export default CampusMissions;
