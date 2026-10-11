import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  Cpu,
  DollarSign,
  HardDrive,
  PieChart,
  RefreshCw,
  Server,
  Sliders,
  TrendingUp,
  Zap,
} from "lucide-react";

import { DEPARTMENTS_DATA } from "../../data/managementData";
import "../../components/shared/SharedIntelligence.css";

const RESOURCE_POOLS = [
  {
    id: "gpu-cluster",
    name: "Tier-1 DGX H100 AI Compute Cluster",
    totalCapacity: "10,000 GPU-Hours / Mo",
    allocated: "9,240 GPU-Hours",
    utilizationRate: 92.4,
    status: "CRITICAL LOAD",
    primaryUsers: ["AI & Data Science (5,200 hrs)", "Robotics & Automation (2,800 hrs)", "CSE (1,240 hrs)"],
    bottleneck: "Capstones experiencing peak queue delays during evening simulation hours."
  },
  {
    id: "embedded-lab",
    name: "Edge Hardware & Embedded Testbenches",
    totalCapacity: "32 Dedicated Lab Benches",
    allocated: "28 Active Benches",
    utilizationRate: 87.5,
    status: "HEALTHY",
    primaryUsers: ["Robotics (16 benches)", "ECE (8 benches)", "Hub (4 benches)"],
    bottleneck: "Additional Jetson Orin Nano testbeds needed for Spring 2026 capstone cohorts."
  },
  {
    id: "cloud-vouchers",
    name: "Institutional AWS & GCP Cloud Credits",
    totalCapacity: "$120,000 Annual Pool",
    allocated: "$88,400 Utilized",
    utilizationRate: 73.6,
    status: "OPTIMAL",
    primaryUsers: ["Computer Science ($42k)", "Information Technology ($28k)", "Hub ($18.4k)"],
    bottleneck: "Stable credit burn across microservices, serverless backends, and database storage."
  }
];

export default function ResourceAllocation() {
  const navigate = useNavigate();
  const [deptAllocations, setDeptAllocations] = useState(
    DEPARTMENTS_DATA.map((d) => ({
      id: d.id,
      name: d.name,
      code: d.code,
      budget: d.researchGrants,
      utilization: parseInt(d.budgetUtilized.replace("%", ""), 10),
      computeShare: d.code === "AIDS" ? 45 : d.code === "CSE" ? 25 : d.code === "ROBO" ? 18 : 4,
    }))
  );
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleComputeAdjustment = (deptId, delta) => {
    setDeptAllocations((prev) =>
      prev.map((d) => {
        if (d.id === deptId) {
          const updated = Math.min(60, Math.max(5, d.computeShare + delta));
          return { ...d, computeShare: updated };
        }
        return d;
      })
    );
    showToast("Compute cluster quota updated. Allocation schedules will rebalance at 00:00 UTC.");
  };

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
            <Cpu size={14} />
            STRATEGIC INTELLIGENCE
          </div>
          <h1 className="intel-title">Institutional Resource Allocation &amp; Cap-Ex</h1>
          <p className="intel-desc">
            Monitor and balance campus-wide GPU compute nodes, physical lab hardware testbenches, and departmental research capital deployment.
          </p>
        </div>

        <div className="intel-actions">
          <button
            type="button"
            className="intel-btn-secondary"
            onClick={() => navigate("/management/support")}
          >
            <Sliders size={16} />
            <span>Decision Support Signals</span>
          </button>
          <button
            type="button"
            className="intel-btn-primary"
            onClick={() => showToast("Emergency burst allocation of 2,000 GPU-Hours approved for AIDS cluster.")}
          >
            <Zap size={16} />
            <span>Authorize Burst Compute</span>
          </button>
        </div>
      </div>

      {/* RESOURCE CLUSTER CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "20px", marginBottom: "26px" }}>
        {RESOURCE_POOLS.map((pool) => (
          <div key={pool.id} className="intel-card" style={{ margin: 0, padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <span className={`intel-badge ${pool.utilizationRate > 90 ? "danger" : pool.utilizationRate > 80 ? "warning" : "success"}`}>
                {pool.status}
              </span>
              <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#102544" }}>{pool.utilizationRate}%</span>
            </div>

            <h2 style={{ fontSize: "1.12rem", fontWeight: 700, color: "#102544", marginBottom: "6px" }}>
              {pool.name}
            </h2>
            <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "14px" }}>
              Pool Capacity: {pool.totalCapacity} ({pool.allocated} active)
            </div>

            <div className="intel-progress-bar" style={{ marginBottom: "16px" }}>
              <div
                className={`intel-progress-fill ${pool.utilizationRate > 90 ? "danger" : pool.utilizationRate > 80 ? "warning" : "success"}`}
                style={{ width: `${pool.utilizationRate}%` }}
              />
            </div>

            <div style={{ fontSize: "0.8rem", color: "#475569", background: "#f8fafc", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0", marginBottom: "12px" }}>
              <strong style={{ color: "#1e293b", display: "block", marginBottom: "4px" }}>Primary Department Consumers</strong>
              {pool.primaryUsers.join(" • ")}
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", fontSize: "0.78rem", color: "#d97706" }}>
              <AlertCircle size={14} style={{ flexShrink: 0, marginTop: "2px" }} />
              <span>{pool.bottleneck}</span>
            </div>
          </div>
        ))}
      </div>

      {/* DEPARTMENT COMPUTE REBALANCING SIMULATOR */}
      <div className="intel-card" style={{ padding: "26px", marginBottom: "26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h2 style={{ fontSize: "1.18rem", fontWeight: 700, color: "#102544", margin: 0 }}>
              Departmental Compute Share &amp; Budget Optimization
            </h2>
            <p style={{ fontSize: "0.86rem", color: "#64748b", margin: "4px 0 0 0" }}>
              Dynamic cluster share allocation simulator. Adjust compute percentage per department based on sprint milestones.
            </p>
          </div>
          <button
            type="button"
            className="intel-btn-secondary"
            style={{ fontSize: "0.82rem" }}
            onClick={() => showToast("Rebalancing telemetry synchronized with campus HPC scheduler.")}
          >
            <RefreshCw size={14} />
            <span>Sync HPC Scheduler</span>
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="intel-table">
            <thead>
              <tr>
                <th>Department</th>
                <th>Research Capital</th>
                <th>Cap-Ex Utilization</th>
                <th>Current Compute Share</th>
                <th style={{ textAlign: "right" }}>Rebalance Action</th>
              </tr>
            </thead>
            <tbody>
              {deptAllocations.map((d) => (
                <tr key={d.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: "#1e293b" }}>{d.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Code: {d.code}</div>
                  </td>
                  <td style={{ fontWeight: 600, color: "#059669" }}>{d.budget}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div className="intel-progress-bar" style={{ width: "80px" }}>
                        <div
                          className="intel-progress-fill success"
                          style={{ width: `${d.utilization}%` }}
                        />
                      </div>
                      <span style={{ fontSize: "0.84rem", fontWeight: 600, color: "#334155" }}>{d.utilization}%</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e3a8a", minWidth: "40px" }}>
                        {d.computeShare}%
                      </span>
                      <div className="intel-progress-bar" style={{ width: "120px" }}>
                        <div
                          className="intel-progress-fill"
                          style={{ width: `${d.computeShare * 1.6}%`, backgroundColor: "#2563eb" }}
                        />
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "6px" }}>
                      <button
                        type="button"
                        className="intel-btn-secondary"
                        style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                        onClick={() => handleComputeAdjustment(d.id, -5)}
                      >
                        -5%
                      </button>
                      <button
                        type="button"
                        className="intel-btn-secondary"
                        style={{ padding: "4px 10px", fontSize: "0.8rem" }}
                        onClick={() => handleComputeAdjustment(d.id, +5)}
                      >
                        +5%
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
