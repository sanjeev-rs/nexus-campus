import { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  Users,
} from "lucide-react";

import "../../components/shared/SharedIntelligence.css";

const INTERVENTION_COHORTS = [
  { department: "AI & Data Science", totalInterventions: 18, resolved: 16, pending: 2, resolutionRate: "88.9%", topTrigger: "Hardware Compute Deficit" },
  { department: "Computer Science", totalInterventions: 24, resolved: 22, pending: 2, resolutionRate: "91.7%", topTrigger: "Database Memory Bottlenecks" },
  { department: "Robotics & Automation", totalInterventions: 14, resolved: 13, pending: 1, resolutionRate: "92.8%", topTrigger: "Optical Sensor Vibration" },
  { department: "Electronics & Communication", totalInterventions: 12, resolved: 10, pending: 2, resolutionRate: "83.3%", topTrigger: "Lab Hardware Bench Delays" },
];

function InterventionAnalytics() {
  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <ShieldCheck size={14} />
            ACADEMIC INTELLIGENCE
          </div>
          <h1 className="intel-title">Intervention Analytics Center</h1>
          <p className="intel-desc">
            Campus-wide intervention volume tracking, department resolution rates, primary bottleneck triggers, and academic recovery timelines.
          </p>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="intel-kpi-grid">
        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Total Semester Interventions</span>
            <div className="intel-kpi-icon blue"><ShieldAlert size={18} /></div>
          </div>
          <div className="intel-kpi-value">68 Cases</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">-14% vs Fall 2025</span>
            <span>Early detection gains</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Overall Resolution Rate</span>
            <div className="intel-kpi-icon green"><CheckCircle2 size={18} /></div>
          </div>
          <div className="intel-kpi-value">89.7%</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">61 Resolved</span>
            <span>Within 5-day window</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Active Pending Review</span>
            <div className="intel-kpi-icon rose"><Clock size={18} /></div>
          </div>
          <div className="intel-kpi-value">7 Cases</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta warning">Under faculty triage</span>
            <span>Zero critical dropouts</span>
          </div>
        </div>
      </div>

      {/* INTERVENTION BREAKDOWN TABLE */}
      <div className="intel-card">
        <div className="intel-card-header">
          <div>
            <h2>Department Intervention Distribution</h2>
            <div className="intel-card-subtitle">Volume, resolution efficiency, and primary root-cause triggers across campus units</div>
          </div>
        </div>

        <div className="intel-table-container" style={{ border: "none" }}>
          <table className="intel-table">
            <thead>
              <tr>
                <th>Academic Department</th>
                <th>Total Cases</th>
                <th>Resolved</th>
                <th>Active Pending</th>
                <th>Resolution Rate</th>
                <th>Primary Root-Cause Trigger</th>
              </tr>
            </thead>
            <tbody>
              {INTERVENTION_COHORTS.map((row) => (
                <tr key={row.department}>
                  <td style={{ fontWeight: 700, color: "#102544" }}>{row.department}</td>
                  <td>{row.totalInterventions} Cases</td>
                  <td style={{ color: "#059669", fontWeight: 700 }}>{row.resolved}</td>
                  <td style={{ color: row.pending > 0 ? "#dc2626" : "#64748b", fontWeight: 700 }}>{row.pending}</td>
                  <td>
                    <span className="intel-badge success">{row.resolutionRate}</span>
                  </td>
                  <td style={{ color: "#475569" }}>{row.topTrigger}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InterventionAnalytics;
