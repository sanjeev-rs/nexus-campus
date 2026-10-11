import { useState } from "react";
import {
  Award,
  CheckCircle2,
  FileCheck,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

import "../../components/shared/SharedIntelligence.css";

const OUTCOME_METRICS = [
  { indicator: "Four-Year Degree Completion Rate", value: "94.2%", benchmark: "90.0%", status: "Exemplary", trend: "+2.1% YoY" },
  { indicator: "Institutional Employability Index", value: "90.8%", benchmark: "85.0%", status: "Exemplary", trend: "+3.4% YoY" },
  { indicator: "Undergraduate Research Authorship", value: "24.6%", benchmark: "15.0%", status: "Exemplary", trend: "+8.2% YoY" },
  { indicator: "Patent Disclosures Filed (FY26)", value: "19 Filings", benchmark: "12 Filings", status: "Ahead of Target", trend: "+58% YoY" },
  { indicator: "Accredited Outcome-Based Score", value: "96.4 / 100", benchmark: "90.0 / 100", status: "A++ Tier-1", trend: "+1.2 pts" },
];

function AcademicOutcomes() {
  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <GraduationCap size={14} />
            ACADEMIC INTELLIGENCE
          </div>
          <h1 className="intel-title">Academic Outcomes &amp; Quality Metrics</h1>
          <p className="intel-desc">
            Accreditation indicators, graduation rates, graduate employability indices, and institutional scholarly productivity.
          </p>
        </div>
      </div>

      {/* OUTCOMES TABLE */}
      <div className="intel-card">
        <div className="intel-card-header">
          <div>
            <h2>Institutional Key Performance Indicators</h2>
            <div className="intel-card-subtitle">Audited metrics aligned with National Board of Accreditation Tier-1 standards</div>
          </div>
        </div>

        <div className="intel-table-container" style={{ border: "none" }}>
          <table className="intel-table">
            <thead>
              <tr>
                <th>Outcome Metric Indicator</th>
                <th>Institutional Result</th>
                <th>Accreditation Benchmark</th>
                <th>Evaluation Status</th>
                <th>Longitudinal Velocity</th>
              </tr>
            </thead>
            <tbody>
              {OUTCOME_METRICS.map((row) => (
                <tr key={row.indicator}>
                  <td style={{ fontWeight: 700, color: "#102544" }}>{row.indicator}</td>
                  <td style={{ fontSize: "1.05rem", fontWeight: 800, color: "#2563eb" }}>{row.value}</td>
                  <td style={{ color: "#64748b" }}>{row.benchmark}</td>
                  <td>
                    <span className="intel-badge success">{row.status}</span>
                  </td>
                  <td style={{ color: "#059669", fontWeight: 700 }}>{row.trend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AcademicOutcomes;
