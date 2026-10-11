import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Download,
  Filter,
  Layers,
  LineChart,
  PieChart,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { CAMPUS_EXECUTIVE_METRICS, DEPARTMENTS_DATA } from "../../data/managementData";
import "../../components/shared/SharedIntelligence.css";

const ANALYTICS_SERIES = [
  { metric: "Active Student Engagement", aids: "94.2%", cse: "92.0%", robo: "88.5%", ece: "84.2%", it: "86.1%", hub: "96.4%" },
  { metric: "Capstone Sprint Completion Velocity", aids: "91.0%", cse: "89.4%", robo: "84.0%", ece: "82.5%", it: "85.0%", hub: "93.0%" },
  { metric: "Research Grant Burn Efficiency", aids: "89.0%", cse: "92.0%", robo: "84.0%", ece: "78.0%", it: "82.0%", hub: "95.0%" },
  { metric: "Corporate Placement Conversion", aids: "93.4%", cse: "91.8%", robo: "88.2%", ece: "86.5%", it: "89.0%", hub: "96.1%" },
  { metric: "Interdisciplinary Collaboration Index", aids: "86.0%", cse: "79.5%", robo: "84.2%", ece: "74.0%", it: "72.5%", hub: "98.0%" },
];

export default function ManagementAnalytics() {
  const navigate = useNavigate();
  const [selectedTerm, setSelectedTerm] = useState("Spring 2026");
  const [selectedView, setSelectedView] = useState("overview");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
            <BarChart3 size={14} />
            REPORTING &amp; OVERSIGHT
          </div>
          <h1 className="intel-title">Institutional Analytics &amp; Cross-Departmental Metrics</h1>
          <p className="intel-desc">
            High-granularity institutional benchmarking contrasting faculty output, student growth percentiles, grant utilization, and placement conversions.
          </p>
        </div>

        <div className="intel-actions">
          <button
            type="button"
            className="intel-btn-secondary"
            onClick={() => showToast("Exporting multi-dimensional metrics dataset to CSV...")}
          >
            <Download size={16} />
            <span>Export Analytics CSV</span>
          </button>
          <button
            type="button"
            className="intel-btn-primary"
            onClick={() => navigate("/management/reports")}
          >
            <Sparkles size={16} />
            <span>Executive Briefing</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="intel-kpi-grid">
        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Institutional Health Index</div>
          <div className="intel-kpi-value">{CAMPUS_EXECUTIVE_METRICS.activityScore} / 100</div>
          <div className="intel-kpi-delta positive">
            <TrendingUp size={13} />
            +4.2 pts above national top-tier percentile
          </div>
        </div>

        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Total Student Researchers</div>
          <div className="intel-kpi-value">{CAMPUS_EXECUTIVE_METRICS.studentCount}</div>
          <div className="intel-kpi-delta positive">Across 6 academic faculties</div>
        </div>

        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Deployed Research Grants</div>
          <div className="intel-kpi-value">{CAMPUS_EXECUTIVE_METRICS.activeGrants}</div>
          <div className="intel-kpi-delta positive">88.4% deployment efficiency</div>
        </div>

        <div className="intel-card intel-kpi-card">
          <div className="intel-kpi-label">Average Placement Index</div>
          <div className="intel-kpi-value">{CAMPUS_EXECUTIVE_METRICS.avgPlacementIndex}</div>
          <div className="intel-kpi-delta positive">Tier-1 engineering benchmarks exceeded</div>
        </div>
      </div>

      {/* COMPARATIVE MATRIX */}
      <div className="intel-card" style={{ padding: "26px", marginBottom: "26px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#102544", margin: 0 }}>
              Cross-Faculty Benchmark Matrix ({selectedTerm})
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "4px 0 0 0" }}>
              Normalized percentile distribution across core institutional performance vectors.
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {["Spring 2026", "Fall 2025", "AY 2024-25"].map((term) => (
              <button
                key={term}
                type="button"
                className={selectedTerm === term ? "intel-btn-primary" : "intel-btn-secondary"}
                style={{ padding: "6px 12px", fontSize: "0.82rem" }}
                onClick={() => setSelectedTerm(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="intel-table">
            <thead>
              <tr>
                <th>Performance Dimension</th>
                <th>AI &amp; Data Science</th>
                <th>Computer Science</th>
                <th>Robotics</th>
                <th>ECE</th>
                <th>IT</th>
                <th>Innovation Hub</th>
              </tr>
            </thead>
            <tbody>
              {ANALYTICS_SERIES.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: "#1e293b" }}>{row.metric}</td>
                  <td style={{ fontWeight: 600, color: "#1e3a8a" }}>{row.aids}</td>
                  <td style={{ fontWeight: 600, color: "#1e3a8a" }}>{row.cse}</td>
                  <td style={{ fontWeight: 600, color: "#334155" }}>{row.robo}</td>
                  <td style={{ fontWeight: 600, color: "#334155" }}>{row.ece}</td>
                  <td style={{ fontWeight: 600, color: "#334155" }}>{row.it}</td>
                  <td style={{ fontWeight: 700, color: "#059669" }}>{row.hub}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DEPARTMENTAL SUMMARY CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
        {DEPARTMENTS_DATA.map((dept) => (
          <div key={dept.id} className="intel-card" style={{ margin: 0, padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span className={`intel-badge ${dept.status === "Exemplary" ? "success" : "neutral"}`}>
                {dept.status.toUpperCase()}
              </span>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e3a8a" }}>
                Score: {dept.activityScore}
              </span>
            </div>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#102544", marginBottom: "4px" }}>
              {dept.name}
            </h3>
            <div style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "12px" }}>
              HOD: {dept.hod} • Ratio: {dept.ratio}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "0.82rem", background: "#f8fafc", padding: "10px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
              <div>
                <span style={{ color: "#64748b", display: "block" }}>Placement Rate</span>
                <strong style={{ color: "#059669" }}>{dept.placementRate}</strong>
              </div>
              <div>
                <span style={{ color: "#64748b", display: "block" }}>Budget Utilized</span>
                <strong style={{ color: "#1e293b" }}>{dept.budgetUtilized}</strong>
              </div>
              <div>
                <span style={{ color: "#64748b", display: "block" }}>Active Scholars</span>
                <strong style={{ color: "#1e293b" }}>{dept.students} Students</strong>
              </div>
              <div>
                <span style={{ color: "#64748b", display: "block" }}>Active Capstones</span>
                <strong style={{ color: "#1e293b" }}>{dept.projects} Projects</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
