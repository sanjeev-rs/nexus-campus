import {
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import "../../components/shared/SharedIntelligence.css";

const COHORT_PROGRESSION = [
  { batch: "Class of 2026 (Seniors)", students: 680, retention: "96.4%", avgMilestones: "4.6 / 5", placementRate: "93.4%", velocity: "+18% YoY" },
  { batch: "Class of 2027 (Juniors)", students: 740, retention: "95.1%", avgMilestones: "3.2 / 4", placementRate: "N/A (Internships: 82%)", velocity: "+14% YoY" },
  { batch: "Class of 2028 (Sophomores)", students: 710, retention: "94.8%", avgMilestones: "2.1 / 3", placementRate: "N/A", velocity: "+16% YoY" },
  { batch: "Class of 2029 (Freshmen)", students: 710, retention: "94.6%", avgMilestones: "1.0 / 2", placementRate: "N/A", velocity: "+11% YoY" }
];

function ManagementStudentGrowth() {
  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <TrendingUp size={14} />
            CAMPUS INTELLIGENCE
          </div>
          <h1 className="intel-title">Institutional Student Growth</h1>
          <p className="intel-desc">
            Aggregated cohort progression, multi-year retention velocity, milestone attainment curves, and privacy-conscious scholar capability modeling.
          </p>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="intel-kpi-grid">
        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Institutional Retention</span>
            <div className="intel-kpi-icon green"><ShieldCheck size={18} /></div>
          </div>
          <div className="intel-kpi-value">95.2%</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">+4.2% Above Tier-1</span>
            <span>All 4 cohorts</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Capstone Completion Rate</span>
            <div className="intel-kpi-icon blue"><CheckCircle2 size={18} /></div>
          </div>
          <div className="intel-kpi-value">92.4%</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">On-time delivery</span>
            <span>428 active projects</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Graduate Placement Index</span>
            <div className="intel-kpi-icon purple"><GraduationCap size={18} /></div>
          </div>
          <div className="intel-kpi-value">90.8%</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">Enterprise offers</span>
            <span>Class of 2026</span>
          </div>
        </div>
      </div>

      {/* COHORT PROGRESSION TABLE */}
      <div className="intel-card">
        <div className="intel-card-header">
          <div>
            <h2>Longitudinal Cohort Milestones</h2>
            <div className="intel-card-subtitle">Aggregated academic progression, retention rates, and career readiness</div>
          </div>
        </div>

        <div className="intel-table-container" style={{ border: "none" }}>
          <table className="intel-table">
            <thead>
              <tr>
                <th>Academic Batch</th>
                <th>Enrolled Scholars</th>
                <th>Retention Rate</th>
                <th>Avg Milestone Progress</th>
                <th>Career Readiness</th>
                <th>Growth Velocity</th>
              </tr>
            </thead>
            <tbody>
              {COHORT_PROGRESSION.map((c) => (
                <tr key={c.batch}>
                  <td style={{ fontWeight: 700, color: "#102544" }}>{c.batch}</td>
                  <td>{c.students} Students</td>
                  <td>
                    <span className="intel-badge success">{c.retention}</span>
                  </td>
                  <td style={{ color: "#102544", fontWeight: 600 }}>{c.avgMilestones}</td>
                  <td style={{ color: "#2563eb", fontWeight: 600 }}>{c.placementRate}</td>
                  <td>
                    <span style={{ color: "#059669", fontWeight: 700 }}>{c.velocity}</span>
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

export default ManagementStudentGrowth;
