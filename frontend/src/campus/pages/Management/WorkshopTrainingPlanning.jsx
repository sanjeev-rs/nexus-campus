import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  GraduationCap,
  Layers,
  Plus,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { CAPABILITY_GAPS, DEPARTMENTS_DATA } from "../../data/managementData";
import "../../components/shared/SharedIntelligence.css";

const INITIAL_WORKSHOPS = [
  {
    id: "ws-01",
    title: "Edge Vision & Model Quantization with TensorRT",
    dept: "Robotics & Automation / AIDS",
    lead: "Dr. Aris Thorne",
    targetGap: "Edge Vision & Model Quantization (TensorRT/ONNX)",
    capacity: 60,
    enrolled: 48,
    status: "Confirmed",
    startDate: "Nov 12, 2026",
    duration: "4 Weeks (Bi-weekly labs)",
    budget: "$8,500",
    objective: "Equip 60 autonomous system capstone researchers with FP16/INT8 model quantization pipelines for NVIDIA Jetson Orin Nano hardware.",
    deliverables: ["Quantized ONNX model repo", "Jetson deployment benchmark rubric", "Hardware verification certificates"]
  },
  {
    id: "ws-02",
    title: "Institutional Red-Team / Blue-Team Cyber Range",
    dept: "Computer Science & Engineering / IT",
    lead: "Dr. Elena Rostova",
    targetGap: "Applied Cybersecurity & Threat Modeling",
    capacity: 80,
    enrolled: 74,
    status: "Confirmed",
    startDate: "Dec 02, 2026",
    duration: "3 Weeks Intensive",
    budget: "$12,000",
    objective: "Simulated penetration testing, packet analysis, and cloud threat mitigation across student infrastructure testbeds.",
    deliverables: ["Active defense scorecards", "Threat modeling audit templates", "Industry-recognized security micro-credentials"]
  },
  {
    id: "ws-03",
    title: "Heterogeneous Graph Databases & Cypher Optimization",
    dept: "AI & Data Science",
    lead: "Dr. Evelyn Vance",
    targetGap: "Heterogeneous Graph Databases (Neo4j/Cypher)",
    capacity: 45,
    enrolled: 42,
    status: "In Planning",
    startDate: "Jan 15, 2027",
    duration: "2 Weeks Hands-on",
    budget: "$6,200",
    objective: "Master knowledge graph schema construction, Cypher query profiling, and hybrid vector-graph indexing.",
    deliverables: ["Neo4j benchmark repository", "Hybrid retrieval documentation", "Interactive knowledge graph prototypes"]
  },
  {
    id: "ws-04",
    title: "RISC-V Architecture & FPGA Prototyping",
    dept: "Electronics & Communication",
    lead: "Dr. Rajesh Iyer",
    targetGap: "Hardware Acceleration & Embedded Firmware",
    capacity: 40,
    enrolled: 25,
    status: "In Planning",
    startDate: "Feb 05, 2027",
    duration: "3 Weeks",
    budget: "$9,800",
    objective: "Hardware description with Verilog and deployment of custom RISC-V soft cores on Xilinx Artix-7 development boards.",
    deliverables: ["Synthesized RTL modules", "FPGA timing analysis reports", "Hardware validation test benches"]
  }
];

export default function WorkshopTrainingPlanning() {
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState(INITIAL_WORKSHOPS);
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApprove = (id) => {
    setWorkshops((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: "Confirmed" } : w))
    );
    showToast("Workshop approved and budget authorized from institutional training pool.");
    if (selectedWorkshop?.id === id) {
      setSelectedWorkshop((prev) => ({ ...prev, status: "Confirmed" }));
    }
  };

  const filteredWorkshops = workshops.filter((w) => {
    if (filterDept !== "all" && !w.dept.includes(filterDept)) return false;
    if (filterStatus !== "all" && w.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="intel-page">
      {/* TOAST */}
      {toastMessage && (
        <div className="intel-toast">
          <CheckCircle2 size={18} color="#059669" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <GraduationCap size={14} />
            STRATEGIC INTELLIGENCE
          </div>
          <h1 className="intel-title">Workshop &amp; Training Planning</h1>
          <p className="intel-desc">
            Directly translate campus capability gaps and technological shifts into targeted faculty-led bootcamps, technical certifications, and lab intensives.
          </p>
        </div>

        <div className="intel-actions">
          <button
            type="button"
            className="intel-btn-secondary"
            onClick={() => navigate("/management/gaps")}
          >
            <TrendingUp size={16} />
            <span>View Skill Gaps</span>
          </button>
          <button
            type="button"
            className="intel-btn-primary"
            onClick={() => showToast("New institutional training initiative template opened.")}
          >
            <Plus size={16} />
            <span>Propose Initiative</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="intel-kpi-grid">
        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Active Training Initiatives</div>
          <div className="intel-kpi-value">{workshops.length}</div>
          <div className="intel-kpi-delta positive">
            <Sparkles size={13} />
            All aligned with verified industry gaps
          </div>
        </div>

        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Enrolled Student Cohort</div>
          <div className="intel-kpi-value">
            {workshops.reduce((acc, curr) => acc + curr.enrolled, 0)}
            <span style={{ fontSize: "1rem", color: "#64748b", fontWeight: 500 }}>
              {" "}
              / {workshops.reduce((acc, curr) => acc + curr.capacity, 0)} seats
            </span>
          </div>
          <div className="intel-kpi-delta positive">83.1% overall seat utilization</div>
        </div>

        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Committed Training Cap-Ex</div>
          <div className="intel-kpi-value">$36,500</div>
          <div className="intel-kpi-delta neutral">Within FY2026 Academic Development Reserve</div>
        </div>

        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Target Capability Closure</div>
          <div className="intel-kpi-value">+28 pts</div>
          <div className="intel-kpi-delta positive">Projected post-workshop radar increase</div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="intel-filter-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#475569", fontSize: "0.85rem", fontWeight: 600 }}>
            <Filter size={16} /> Filter by:
          </div>

          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="intel-input"
            style={{ width: "auto", minWidth: "180px", padding: "6px 12px" }}
          >
            <option value="all">All Departments</option>
            {DEPARTMENTS_DATA.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="intel-input"
            style={{ width: "auto", minWidth: "150px", padding: "6px 12px" }}
          >
            <option value="all">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="In Planning">In Planning</option>
          </select>
        </div>

        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
          Showing {filteredWorkshops.length} of {workshops.length} training programs
        </div>
      </div>

      {/* WORKSHOPS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(440px, 1fr))", gap: "20px" }}>
        {filteredWorkshops.map((ws) => (
          <div
            key={ws.id}
            className="intel-card"
            style={{
              margin: 0,
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
              transition: "transform 0.15s ease, box-shadow 0.15s ease",
            }}
            onClick={() => setSelectedWorkshop(ws)}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", gap: "10px" }}>
                <span className={`intel-badge ${ws.status === "Confirmed" ? "success" : "warning"}`}>
                  {ws.status.toUpperCase()}
                </span>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#1e3a8a" }}>{ws.budget}</span>
              </div>

              <h2 style={{ fontSize: "1.18rem", fontWeight: 700, color: "#102544", marginBottom: "6px", lineHeight: 1.35 }}>
                {ws.title}
              </h2>

              <p style={{ fontSize: "0.86rem", color: "#475569", marginBottom: "14px", lineHeight: 1.5 }}>
                {ws.objective}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.82rem", color: "#64748b", marginBottom: "16px", background: "#f8fafc", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <div>
                  <strong style={{ color: "#1e293b", display: "block" }}>Faculty Lead</strong>
                  {ws.lead}
                </div>
                <div>
                  <strong style={{ color: "#1e293b", display: "block" }}>Department Scope</strong>
                  {ws.dept}
                </div>
                <div>
                  <strong style={{ color: "#1e293b", display: "block" }}>Start Date &amp; Duration</strong>
                  {ws.startDate} ({ws.duration})
                </div>
                <div>
                  <strong style={{ color: "#1e293b", display: "block" }}>Target Skill Deficit</strong>
                  <span style={{ color: "#b45309" }}>{ws.targetGap}</span>
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 600, color: "#475569", marginBottom: "6px" }}>
                  <span>Cohort Enrollment</span>
                  <span>{ws.enrolled} / {ws.capacity} Students ({Math.round((ws.enrolled / ws.capacity) * 100)}%)</span>
                </div>
                <div className="intel-progress-bar">
                  <div
                    className="intel-progress-fill success"
                    style={{ width: `${(ws.enrolled / ws.capacity) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "18px", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
              {ws.status !== "Confirmed" && (
                <button
                  type="button"
                  className="intel-btn-secondary"
                  style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(ws.id);
                  }}
                >
                  <CheckCircle2 size={14} color="#059669" />
                  <span>Authorize Budget</span>
                </button>
              )}
              <button
                type="button"
                className="intel-btn-primary"
                style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWorkshop(ws);
                }}
              >
                <span>Inspect Syllabus &amp; Cohort</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL DRAWER */}
      {selectedWorkshop && (
        <div className="intel-drawer-overlay" onClick={() => setSelectedWorkshop(null)}>
          <div className="intel-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="intel-drawer-header">
              <div>
                <span className={`intel-badge ${selectedWorkshop.status === "Confirmed" ? "success" : "warning"}`} style={{ marginBottom: "6px" }}>
                  {selectedWorkshop.status.toUpperCase()}
                </span>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#102544", margin: 0 }}>
                  {selectedWorkshop.title}
                </h2>
                <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>
                  Program ID: {selectedWorkshop.id} • Directed by {selectedWorkshop.lead}
                </div>
              </div>
              <button
                type="button"
                className="intel-btn-secondary"
                style={{ padding: "6px 12px" }}
                onClick={() => setSelectedWorkshop(null)}
              >
                Close
              </button>
            </div>

            <div className="intel-drawer-body">
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e293b", marginBottom: "8px" }}>
                  Executive Curriculum Objective
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#475569", lineHeight: 1.6, background: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  {selectedWorkshop.objective}
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }}>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>Authorized Budget</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e3a8a", marginTop: "4px" }}>{selectedWorkshop.budget}</div>
                  <div style={{ fontSize: "0.78rem", color: "#059669", marginTop: "4px" }}>Faculty honorarium + cloud compute vouchers</div>
                </div>

                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>Cohort Capacity</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#102544", marginTop: "4px" }}>
                    {selectedWorkshop.enrolled} / {selectedWorkshop.capacity} Seats
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "4px" }}>{selectedWorkshop.capacity - selectedWorkshop.enrolled} open seats remaining</div>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e293b", marginBottom: "8px" }}>
                  Verified Program Deliverables
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selectedWorkshop.deliverables.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#334155" }}>
                      <CheckCircle2 size={15} color="#059669" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
                {selectedWorkshop.status !== "Confirmed" && (
                  <button
                    type="button"
                    className="intel-btn-primary"
                    style={{ flex: 1 }}
                    onClick={() => handleApprove(selectedWorkshop.id)}
                  >
                    <CheckCircle2 size={16} />
                    <span>Approve Workshop &amp; Issue Invitations</span>
                  </button>
                )}
                <button
                  type="button"
                  className="intel-btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => showToast("Enrolled student roster exported to registrar format.")}
                >
                  <Users size={16} />
                  <span>Export Scholar Roster</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
