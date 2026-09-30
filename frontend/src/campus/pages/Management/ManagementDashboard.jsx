import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Award,
  BarChart3,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  Download,
  FileSpreadsheet,
  FolderKanban,
  GraduationCap,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";

import "./ManagementDashboard.css";

/* =========================================================
   DETERMINISTIC INSTITUTIONAL DATASET
   Aligned with NEXUS campus_intelligence_engine models.
   ========================================================= */

const CAMPUS_METRICS = {
  studentCount: 2840,
  facultyCount: 142,
  departmentCount: 6,
  projectCount: 428,
  skillCount: 186,
  failureCount: 34,
  opportunityCount: 68,
  activeOpportunityCount: 42,
  activityScore: 88.4,
  accreditationGrade: "A++ Institutional Tier-1",
  activeGrants: "$4.25M",
  retentionRate: "95.2%",
  avgPlacementIndex: "90.8%",
};

const DEPARTMENTS_DATA = [
  {
    id: "dept-aids",
    name: "AI & Data Science",
    code: "AIDS",
    hod: "Dr. Marcus Vance",
    students: 540,
    faculty: 28,
    ratio: "1:19",
    projects: 112,
    activityScore: 92.4,
    topSkill: "Python, PyTorch, Vector Search",
    budgetUtilized: "89%",
    placementRate: "93.4%",
    status: "Exemplary",
  },
  {
    id: "dept-cse",
    name: "Computer Science & Engineering",
    code: "CSE",
    hod: "Dr. Elena Rostova",
    students: 720,
    faculty: 36,
    ratio: "1:20",
    projects: 148,
    activityScore: 90.1,
    topSkill: "Distributed Systems, React, Go",
    budgetUtilized: "92%",
    placementRate: "91.8%",
    status: "Exemplary",
  },
  {
    id: "dept-robotics",
    name: "Robotics & Automation",
    code: "ROBO",
    hod: "Dr. Aris Thorne",
    students: 380,
    faculty: 20,
    ratio: "1:19",
    projects: 54,
    activityScore: 86.8,
    topSkill: "ROS 2, Computer Vision, C++",
    budgetUtilized: "84%",
    placementRate: "88.2%",
    status: "Good",
  },
  {
    id: "dept-ece",
    name: "Electronics & Communication",
    code: "ECE",
    hod: "Dr. Rajesh Iyer",
    students: 460,
    faculty: 24,
    ratio: "1:19",
    projects: 52,
    activityScore: 83.5,
    topSkill: "Embedded C, Signal Processing, IoT",
    budgetUtilized: "78%",
    placementRate: "86.5%",
    status: "Good",
  },
  {
    id: "dept-it",
    name: "Information Technology",
    code: "IT",
    hod: "Dr. Sarah Jenkins",
    students: 420,
    faculty: 20,
    ratio: "1:21",
    projects: 44,
    activityScore: 84.9,
    topSkill: "Cloud Architecture, DevOps, SQL",
    budgetUtilized: "82%",
    placementRate: "89.0%",
    status: "Good",
  },
  {
    id: "dept-inter",
    name: "Interdisciplinary Innovation Hub",
    code: "HUB",
    hod: "Dr. Julian Hayes",
    students: 320,
    faculty: 14,
    ratio: "1:23",
    projects: 18,
    activityScore: 94.2,
    topSkill: "Bioinformatics, MedTech AI, Clean Energy",
    budgetUtilized: "95%",
    placementRate: "96.1%",
    status: "Exemplary",
  },
];

const STRATEGIC_INSIGHTS = [
  {
    id: "ins-01",
    category: "RESEARCH ACCELERATION",
    title: "Interdisciplinary Research Surge",
    description:
      "Cross-departmental collaboration between AI & Data Science and Robotics has doubled project output. Capstone joint submissions rose 38% this academic year.",
    impact: "+38% Capstone Velocity",
    level: "HIGH_IMPACT",
  },
  {
    id: "ins-02",
    category: "FAILURE MEMORY LEARNING",
    title: "Preventative Architecture Gains",
    description:
      "34 documented project failure post-mortems in the Failure Memory database prevented an estimated 420 development hours of recurring deployment issues.",
    impact: "420 hrs saved across teams",
    level: "POSITIVE",
  },
  {
    id: "ins-03",
    category: "INFRASTRUCTURE DEMAND",
    title: "High Compute & GPU Utilization",
    description:
      "Laboratory GPU cluster utilization reached 92% sustained peak during evening capstone sprints. Recommend provisioning supplementary cloud burst compute.",
    impact: "Actionable Budget Requirement",
    level: "WARNING",
  },
  {
    id: "ins-04",
    category: "INDUSTRY OPPORTUNITY MATCH",
    title: "Enterprise Sponsorship Readiness",
    description:
      "42 active opportunities currently match 86% of graduating seniors' validated skill profiles. Tech hiring partner intake is on pace to exceed 2025 records.",
    impact: "91% placement target exceeded",
    level: "POSITIVE",
  },
];

const MANAGEMENT_ALERTS = [
  {
    id: "mgt-alt-01",
    type: "warning",
    title: "Campus Compute Allocation Limit Approaching",
    description:
      "Department of AI & Data Science has utilized 91.4% of assigned semester GPU cluster hours with 6 weeks remaining.",
    dept: "AIDS",
    action: "Authorize Burst Allocation",
  },
  {
    id: "mgt-alt-02",
    type: "danger",
    title: "ECE Hardware Laboratory Renovation Delayed",
    description:
      "Contractor delivery of 12 oscilloscope benches is 10 days behind schedule. Temporary laboratory shifts required.",
    dept: "ECE",
    action: "Intervene with Procurement",
  },
  {
    id: "mgt-alt-03",
    type: "info",
    title: "NBA Tier-1 Accreditation Audit Approved",
    description:
      "National Board of Accreditation peer team concluded evaluation with exemplary marks across Faculty-to-Student Ratio & Outcomes.",
    dept: "All Departments",
    action: "Publish Formal Resolution",
  },
];

function getStoredManagementUser() {
  try {
    const stored = localStorage.getItem("nexusAuth");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        name: parsed.name || "Provost Alistair Sterling",
        email: parsed.email || "management@nexus.edu",
        roleTitle: "Vice-Chancellor & Provost of Academic Affairs",
        office: "Administration Tower • Floor 7",
      };
    }
  } catch {
    // Fallback
  }
  return {
    name: "Provost Alistair Sterling",
    email: "management@nexus.edu",
    roleTitle: "Vice-Chancellor & Provost of Academic Affairs",
    office: "Administration Tower • Floor 7",
  };
}

function ManagementDashboard() {
  const navigate = useNavigate();
  const mgtUser = useMemo(() => getStoredManagementUser(), []);

  // Time greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  // Views / Tabs
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "departments" | "projects" | "insights" | "alerts"
  const [deptSearch, setDeptSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState(null);
  const [alerts, setAlerts] = useState(MANAGEMENT_ALERTS);

  // Modals & Feedback
  const [showBriefingModal, setShowBriefingModal] = useState(false);
  const [showAllocationModal, setShowAllocationModal] = useState(false);
  const [allocationDept, setAllocationDept] = useState("AI & Data Science");
  const [allocationAmount, setAllocationAmount] = useState("$50,000");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Filtered departments
  const filteredDepts = useMemo(() => {
    return DEPARTMENTS_DATA.filter((d) => {
      const q = deptSearch.trim().toLowerCase();
      return (
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.hod.toLowerCase().includes(q) ||
        d.topSkill.toLowerCase().includes(q)
      );
    });
  }, [deptSearch]);

  const handleResolveAlert = (id, title) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    showToast(`Executive action recorded: ${title}`);
  };

  const handleConfirmAllocation = (e) => {
    e.preventDefault();
    setShowAllocationModal(false);
    showToast(`Discretionary grant of ${allocationAmount} approved for ${allocationDept}.`);
  };

  return (
    <div className="management-dashboard">
      {/* =========================================================
          TOAST FEEDBACK
          ========================================================= */}
      {toastMessage && (
        <div className="mgt-toast" role="status" aria-live="polite">
          <CheckCircle2 size={18} className="toast-icon" />
          <span>{toastMessage}</span>
          <button
            type="button"
            className="toast-close"
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss message"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* =========================================================
          MANAGEMENT WELCOME HERO
          ========================================================= */}
      <section className="mgt-welcome">
        <div className="mgt-welcome-glow" aria-hidden="true" />

        <div className="mgt-welcome-content">
          <div className="mgt-eyebrow-row">
            <span className="mgt-eyebrow">
              NEXUS INSTITUTIONAL OBSERVATORY • MANAGEMENT PORTAL
            </span>
            <span className="mgt-badge-live">
              <span className="pulse-dot" />
              Institutional Score: {CAMPUS_METRICS.activityScore}/100
            </span>
          </div>

          <h1>
            {greeting},{" "}
            <span className="mgt-name-highlight">{mgtUser.name}</span>
          </h1>

          <p className="mgt-welcome-desc">
            Campus-wide intelligence across <strong>{CAMPUS_METRICS.departmentCount} academic departments</strong>,{" "}
            <strong>{CAMPUS_METRICS.studentCount.toLocaleString()} enrolled scholars</strong>, and{" "}
            <strong>{CAMPUS_METRICS.projectCount} active projects</strong>.
            Institutional retention is holding at <strong>{CAMPUS_METRICS.retentionRate}</strong> with{" "}
            <strong>{CAMPUS_METRICS.activeOpportunityCount} active industry placements</strong>.
          </p>

          <div className="mgt-status-strip">
            <div className="mgt-chip">
              <Building2 size={15} />
              <span>Office: {mgtUser.office}</span>
            </div>
            <div className="mgt-chip">
              <ShieldCheck size={15} />
              <span>Accreditation: {CAMPUS_METRICS.accreditationGrade}</span>
            </div>
            <div className="mgt-chip highlight">
              <Award size={15} />
              <span>Sponsored Research: {CAMPUS_METRICS.activeGrants} Active Grants</span>
            </div>
          </div>
        </div>

        <div className="mgt-hero-actions">
          <button
            type="button"
            className="nx-btn-primary"
            onClick={() => setShowBriefingModal(true)}
          >
            <FileSpreadsheet size={16} />
            <span>Generate Executive Brief</span>
          </button>
          <button
            type="button"
            className="nx-btn-secondary"
            onClick={() => setShowAllocationModal(true)}
          >
            <Zap size={15} />
            <span>Resource Allocation</span>
          </button>
        </div>
      </section>

      {/* =========================================================
          EXECUTIVE KPI GRID (5 CARDS)
          ========================================================= */}
      <section className="mgt-section">
        <div className="mgt-kpis">
          {/* Card 1: Student Body */}
          <article
            className="mgt-kpi kpi-blue clickable"
            onClick={() => setActiveTab("departments")}
          >
            <div className="kpi-top">
              <div className="kpi-icon">
                <GraduationCap size={20} />
              </div>
              <span className="kpi-trend positive">+6.2% YoY</span>
            </div>
            <span className="kpi-label">Total Student Population</span>
            <strong className="kpi-value">
              {CAMPUS_METRICS.studentCount.toLocaleString()}
            </strong>
            <div className="kpi-progress">
              <span style={{ width: "95%" }} />
            </div>
            <span className="kpi-description">
              95.2% Retention • 6 Academic Divisions
            </span>
          </article>

          {/* Card 2: Faculty & Mentorship */}
          <article
            className="mgt-kpi kpi-purple clickable"
            onClick={() => setActiveTab("departments")}
          >
            <div className="kpi-top">
              <div className="kpi-icon">
                <Users size={20} />
              </div>
              <span className="kpi-trend neutral">1:20 Ratio</span>
            </div>
            <span className="kpi-label">Full-time Faculty Body</span>
            <strong className="kpi-value">{CAMPUS_METRICS.facultyCount}</strong>
            <div className="kpi-progress">
              <span style={{ width: "88%" }} />
            </div>
            <span className="kpi-description">
              88% Ph.D. Holders • 14 Research Leads
            </span>
          </article>

          {/* Card 3: Project Ecosystem */}
          <article
            className="mgt-kpi kpi-green clickable"
            onClick={() => setActiveTab("projects")}
          >
            <div className="kpi-top">
              <div className="kpi-icon">
                <FolderKanban size={20} />
              </div>
              <span className="kpi-trend positive">+14% Velocity</span>
            </div>
            <span className="kpi-label">Registered Projects</span>
            <strong className="kpi-value">{CAMPUS_METRICS.projectCount}</strong>
            <div className="kpi-progress">
              <span style={{ width: "82%" }} />
            </div>
            <span className="kpi-description">
              62 Patent/Publication Candidates
            </span>
          </article>

          {/* Card 4: Campus Activity Score */}
          <article
            className="mgt-kpi kpi-teal clickable"
            onClick={() => setActiveTab("insights")}
          >
            <div className="kpi-top">
              <div className="kpi-icon">
                <BarChart3 size={20} />
              </div>
              <span className="kpi-trend positive">+4.2 pts</span>
            </div>
            <span className="kpi-label">Institutional Activity Index</span>
            <strong className="kpi-value">{CAMPUS_METRICS.activityScore}</strong>
            <div className="kpi-progress">
              <span style={{ width: "88.4%" }} />
            </div>
            <span className="kpi-description">
              Top Decile Institutional Engagement
            </span>
          </article>

          {/* Card 5: Industry Placement */}
          <article
            className="mgt-kpi kpi-orange clickable"
            onClick={() => setActiveTab("insights")}
          >
            <div className="kpi-top">
              <div className="kpi-icon">
                <Building2 size={20} />
              </div>
              <span className="kpi-trend alert">42 Active</span>
            </div>
            <span className="kpi-label">Industry Placement Pool</span>
            <strong className="kpi-value">
              {CAMPUS_METRICS.activeOpportunityCount}
            </strong>
            <div className="kpi-progress">
              <span style={{ width: "91%" }} />
            </div>
            <span className="kpi-description">
              90.8% Historical Placement Rate
            </span>
          </article>
        </div>
      </section>

      {/* =========================================================
          MANAGEMENT TABS
          ========================================================= */}
      <nav className="mgt-tabs-nav" aria-label="Management Dashboard Views">
        <button
          type="button"
          className={`mgt-tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <Layers size={16} />
          <span>Executive Overview</span>
        </button>

        <button
          type="button"
          className={`mgt-tab-btn ${activeTab === "departments" ? "active" : ""}`}
          onClick={() => setActiveTab("departments")}
        >
          <Building2 size={16} />
          <span>Department Performance ({DEPARTMENTS_DATA.length})</span>
        </button>

        <button
          type="button"
          className={`mgt-tab-btn ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          <FolderKanban size={16} />
          <span>Project Ecosystem & IP</span>
        </button>

        <button
          type="button"
          className={`mgt-tab-btn ${activeTab === "insights" ? "active" : ""}`}
          onClick={() => setActiveTab("insights")}
        >
          <Sparkles size={16} />
          <span>Strategic Decision Intelligence</span>
        </button>

        <button
          type="button"
          className={`mgt-tab-btn ${activeTab === "alerts" ? "active" : ""}`}
          onClick={() => setActiveTab("alerts")}
        >
          <AlertTriangle size={16} />
          <span>Executive Attention ({alerts.length})</span>
          {alerts.length > 0 && <span className="tab-pill">{alerts.length}</span>}
        </button>
      </nav>

      {/* =========================================================
          TAB 1: EXECUTIVE OVERVIEW
          ========================================================= */}
      {activeTab === "overview" && (
        <div className="mgt-tab-content">
          <div className="mgt-grid-two-col">
            {/* Left: Department Performance Table Preview */}
            <div className="mgt-col">
              <article className="mgt-card">
                <div className="card-header-row">
                  <div>
                    <span className="card-eyebrow">DEPARTMENTAL BENCHMARKS</span>
                    <h3>Academic Division Efficiency</h3>
                  </div>
                  <button
                    type="button"
                    className="card-text-link"
                    onClick={() => setActiveTab("departments")}
                  >
                    View detailed analytics
                    <ChevronRight size={15} />
                  </button>
                </div>

                <div className="mgt-table-responsive">
                  <table className="mgt-table">
                    <thead>
                      <tr>
                        <th>Department</th>
                        <th>Scholars</th>
                        <th>Projects</th>
                        <th>Activity Index</th>
                        <th>Placement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DEPARTMENTS_DATA.slice(0, 4).map((d) => (
                        <tr
                          key={d.id}
                          className="clickable-row"
                          onClick={() => {
                            setSelectedDept(d);
                            setActiveTab("departments");
                          }}
                        >
                          <td>
                            <strong>{d.name}</strong>
                            <span className="sub-text">HOD: {d.hod}</span>
                          </td>
                          <td>{d.students}</td>
                          <td>{d.projects}</td>
                          <td>
                            <div className="table-meter-group">
                              <span>{d.activityScore}%</span>
                              <div className="mini-meter">
                                <span style={{ width: `${d.activityScore}%` }} />
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge-success">{d.placementRate}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>

              {/* Strategic Insights Cards */}
              <article className="mgt-card">
                <div className="card-header-row">
                  <div>
                    <span className="card-eyebrow">CAMPUS DECISION SIGNALS</span>
                    <h3>Strategic Intelligence</h3>
                  </div>
                  <button
                    type="button"
                    className="card-text-link"
                    onClick={() => setActiveTab("insights")}
                  >
                    All 4 insights
                    <ChevronRight size={15} />
                  </button>
                </div>

                <div className="mgt-insights-list">
                  {STRATEGIC_INSIGHTS.slice(0, 2).map((ins) => (
                    <div className="mgt-insight-box" key={ins.id}>
                      <div className="insight-top">
                        <span className="insight-category">{ins.category}</span>
                        <span className="impact-pill">{ins.impact}</span>
                      </div>
                      <h4>{ins.title}</h4>
                      <p>{ins.description}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            {/* Right: Institutional Health & Failure Memory */}
            <div className="mgt-col">
              {/* Failure Memory Learning Metric (NEXUS distinctive model) */}
              <article className="mgt-card">
                <div className="card-header-row">
                  <div>
                    <span className="card-eyebrow">ORGANIZATIONAL LEARNING</span>
                    <h3>Failure Memory System</h3>
                  </div>
                  <span className="badge-pill green">
                    <ShieldCheck size={14} /> Active Ingestion
                  </span>
                </div>

                <div className="failure-memory-highlight">
                  <div className="memory-stat-row">
                    <div className="memory-stat">
                      <strong>34</strong>
                      <span>Documented Post-Mortems</span>
                    </div>
                    <div className="memory-stat">
                      <strong>420 hrs</strong>
                      <span>Saved Across Student Sprints</span>
                    </div>
                  </div>
                  <p className="memory-explanation">
                    NEXUS captures verified engineering post-mortems and architecture
                    failures across capstones. This institutional memory is fed back into
                    AI mentor prompts, preventing recurring dead-ends across new cohorts.
                  </p>
                </div>
              </article>

              {/* Executive Alerts Preview */}
              <article className="mgt-card">
                <div className="card-header-row">
                  <div>
                    <span className="card-eyebrow">GOVERNANCE & RISKS</span>
                    <h3>Executive Attention Items</h3>
                  </div>
                  <button
                    type="button"
                    className="card-text-link"
                    onClick={() => setActiveTab("alerts")}
                  >
                    Manage ({alerts.length})
                    <ChevronRight size={15} />
                  </button>
                </div>

                <div className="mgt-alerts-preview-list">
                  {alerts.map((alt) => (
                    <div className={`mgt-alert-card ${alt.type}`} key={alt.id}>
                      <div className="mgt-alert-head">
                        <AlertTriangle size={17} className="alert-ico" />
                        <strong>{alt.title}</strong>
                      </div>
                      <p>{alt.description}</p>
                      <div className="mgt-alert-footer">
                        <span className="dept-tag">{alt.dept}</span>
                        <button
                          type="button"
                          className="alert-btn"
                          onClick={() => handleResolveAlert(alt.id, alt.title)}
                        >
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              {/* Campus Knowledge Direct Connection */}
              <article className="mgt-card institutional-repo-card">
                <h3>Campus Knowledge Assets</h3>
                <p>
                  Explore student publications, verified technologies, and faculty expertise
                  records in the centralized knowledge graph.
                </p>
                <div className="repo-buttons">
                  <button
                    type="button"
                    className="nx-btn-secondary sm"
                    onClick={() => navigate("/student/knowledge/faculty")}
                  >
                    <BookOpen size={14} />
                    <span>Faculty Directory</span>
                  </button>
                  <button
                    type="button"
                    className="nx-btn-secondary sm"
                    onClick={() => navigate("/student/knowledge/research")}
                  >
                    <Compass size={14} />
                    <span>Research Papers</span>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: DEPARTMENT PERFORMANCE
          ========================================================= */}
      {activeTab === "departments" && (
        <div className="mgt-tab-content">
          <div className="mgt-table-toolbar">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search department, HOD, or capability domain..."
                value={deptSearch}
                onChange={(e) => setDeptSearch(e.target.value)}
                aria-label="Search departments"
              />
              {deptSearch && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setDeptSearch("")}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="toolbar-stats-summary">
              <span>
                Total Departments: <strong>{DEPARTMENTS_DATA.length}</strong>
              </span>
              <span>
                Average Ratio: <strong>1:20</strong>
              </span>
            </div>
          </div>

          <div className="mgt-depts-grid">
            {filteredDepts.map((d) => (
              <article className="mgt-dept-card" key={d.id}>
                <div className="dept-card-top">
                  <div>
                    <span className="dept-code-tag">{d.code}</span>
                    <h4>{d.name}</h4>
                    <span className="hod-label">HOD: {d.hod}</span>
                  </div>
                  <div className="activity-badge">
                    <strong>{d.activityScore}</strong>
                    <span>Index</span>
                  </div>
                </div>

                <div className="dept-metrics-row">
                  <div className="dept-metric">
                    <span className="m-label">Scholars</span>
                    <strong className="m-val">{d.students}</strong>
                  </div>
                  <div className="dept-metric">
                    <span className="m-label">Faculty</span>
                    <strong className="m-val">{d.faculty}</strong>
                  </div>
                  <div className="dept-metric">
                    <span className="m-label">Projects</span>
                    <strong className="m-val">{d.projects}</strong>
                  </div>
                  <div className="dept-metric">
                    <span className="m-label">Placement</span>
                    <strong className="m-val text-green">{d.placementRate}</strong>
                  </div>
                </div>

                <div className="dept-skills-section">
                  <span className="skills-label">Primary Academic Capabilities:</span>
                  <p className="skills-line">{d.topSkill}</p>
                </div>

                <div className="dept-budget-track">
                  <div className="budget-labels">
                    <span>Semester Budget Allocation</span>
                    <strong>{d.budgetUtilized} utilized</strong>
                  </div>
                  <div className="track-bar">
                    <span style={{ width: d.budgetUtilized }} />
                  </div>
                </div>

                <div className="dept-card-footer">
                  <button
                    type="button"
                    className="dept-alloc-btn"
                    onClick={() => {
                      setAllocationDept(d.name);
                      setShowAllocationModal(true);
                    }}
                  >
                    Adjust Budget
                  </button>
                  <button
                    type="button"
                    className="dept-inspect-btn"
                    onClick={() => setSelectedDept(d)}
                  >
                    <span>Full Analytics</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: PROJECT ECOSYSTEM & IP
          ========================================================= */}
      {activeTab === "projects" && (
        <div className="mgt-tab-content">
          <div className="mgt-hero-banner">
            <div>
              <span className="section-eyebrow">INSTITUTIONAL INNOVATION PIPELINE</span>
              <h2>Campus Project Ecosystem & Intellectual Property</h2>
              <p>
                Portfolio of 428 active undergraduate, graduate, and interdisciplinary
                research implementations tracked in the NEXUS project registry.
              </p>
            </div>
            <div className="hero-stat-badge">
              <strong>62</strong>
              <span>Patent & Publication Candidates</span>
            </div>
          </div>

          <div className="mgt-grid-two-col">
            <article className="mgt-card">
              <div className="card-header-row">
                <div>
                  <span className="card-eyebrow">PROJECT DISTRIBUTION</span>
                  <h3>Project Portfolio Breakdown</h3>
                </div>
              </div>

              <div className="portfolio-breakdown-list">
                <div className="breakdown-item">
                  <div className="breakdown-info">
                    <strong>Institutional Flagship Initiatives</strong>
                    <span>High-visibility campus intelligence & robotics</span>
                  </div>
                  <strong className="breakdown-count">12</strong>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-info">
                    <strong>Industry-Sponsored Capstones</strong>
                    <span>Direct partner mentoring & external evaluation</span>
                  </div>
                  <strong className="breakdown-count">48</strong>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-info">
                    <strong>Departmental Research Capstones</strong>
                    <span>Senior undergraduate thesis & graduate inquiry</span>
                  </div>
                  <strong className="breakdown-count">168</strong>
                </div>

                <div className="breakdown-item">
                  <div className="breakdown-info">
                    <strong>Open Source & Community Tooling</strong>
                    <span>Student-led clubs, open datasets & libraries</span>
                  </div>
                  <strong className="breakdown-count">200</strong>
                </div>
              </div>
            </article>

            <article className="mgt-card">
              <div className="card-header-row">
                <div>
                  <span className="card-eyebrow">FLAGSHIP SHOWCASE</span>
                  <h3>Exemplary Implementations</h3>
                </div>
              </div>

              <div className="flagship-list">
                <div className="flagship-item">
                  <div className="flagship-dot blue" />
                  <div className="flagship-content">
                    <h4>Smart Campus Analytics</h4>
                    <p>
                      Predictive attendance, facility density, and engagement telemetry.
                      Adopted across 4 campus facilities.
                    </p>
                    <span className="flagship-meta">Dept: AI & Data Science • 88% Milestones</span>
                  </div>
                </div>

                <div className="flagship-item">
                  <div className="flagship-dot purple" />
                  <div className="flagship-content">
                    <h4>Autonomous Campus Drone Navigation</h4>
                    <p>
                      Stereo-vision obstacle avoidance with ROS 2 and Jetson Orin.
                      Presented at National Robotics Forum.
                    </p>
                    <span className="flagship-meta">Dept: Robotics & AI • 64% Milestones</span>
                  </div>
                </div>

                <div className="flagship-item">
                  <div className="flagship-dot green" />
                  <div className="flagship-content">
                    <h4>Distributed Graph Intelligence Engine</h4>
                    <p>
                      Sub-millisecond knowledge graph traversal modeling institutional
                      student-skill relationships over Neo4j.
                    </p>
                    <span className="flagship-meta">Dept: Computer Science • Active Thesis</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 4: STRATEGIC DECISION INTELLIGENCE
          ========================================================= */}
      {activeTab === "insights" && (
        <div className="mgt-tab-content">
          <div className="mgt-insights-grid">
            {STRATEGIC_INSIGHTS.map((ins) => (
              <article className="mgt-strategic-card" key={ins.id}>
                <div className="strategic-card-top">
                  <span className="strategic-category">{ins.category}</span>
                  <span className={`strategic-impact-badge ${ins.level.toLowerCase()}`}>
                    {ins.impact}
                  </span>
                </div>
                <h3>{ins.title}</h3>
                <p>{ins.description}</p>
                <div className="strategic-footer">
                  <button
                    type="button"
                    className="nx-btn-secondary sm"
                    onClick={() => {
                      showToast(`Strategic recommendation adopted: ${ins.title}`);
                    }}
                  >
                    <span>Adopt Policy Recommendation</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: EXECUTIVE ATTENTION & ALERTS
          ========================================================= */}
      {activeTab === "alerts" && (
        <div className="mgt-tab-content">
          <div className="mgt-alerts-full">
            <div className="mgt-hero-banner warning">
              <div>
                <h3>Institutional Governance & Operational Flags</h3>
                <p>
                  High-priority interventions requiring Executive Committee review,
                  budget clearance, or interdepartmental arbitration.
                </p>
              </div>
              <span className="alerts-count-tag">
                <strong>{alerts.length}</strong> Pending Items
              </span>
            </div>

            {alerts.length === 0 ? (
              <div className="mgt-empty-state">
                <CheckCircle2 size={48} className="text-green mb-12" />
                <h3>All Governance Clear</h3>
                <p>No active operational or accreditation flags requiring action.</p>
              </div>
            ) : (
              <div className="alerts-stack">
                {alerts.map((alt) => (
                  <div className={`mgt-full-alert-item ${alt.type}`} key={alt.id}>
                    <div className="alert-body">
                      <div className="alert-meta-line">
                        <span className="alert-dept-badge">{alt.dept}</span>
                        <h4>{alt.title}</h4>
                      </div>
                      <p>{alt.description}</p>
                    </div>
                    <div className="alert-actions">
                      <button
                        type="button"
                        className="nx-btn-primary sm"
                        onClick={() => handleResolveAlert(alt.id, alt.title)}
                      >
                        <ShieldCheck size={15} />
                        <span>{alt.action}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          EXECUTIVE BRIEFING MODAL
          ========================================================= */}
      {showBriefingModal && (
        <div className="mgt-modal-overlay" onClick={() => setShowBriefingModal(false)}>
          <div
            className="mgt-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Executive Briefing Document"
          >
            <div className="dialog-header">
              <h3>Executive Campus Intelligence Brief</h3>
              <button
                type="button"
                className="dialog-close-btn"
                onClick={() => setShowBriefingModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="brief-content">
              <div className="brief-meta-box">
                <div>
                  <strong>NEXUS Institutional Observatory</strong>
                  <span>Term: Spring 2026 • Certified Report</span>
                </div>
                <span className="badge-pill green">Verified Valid</span>
              </div>

              <h4>Key Highlights:</h4>
              <ul className="brief-points">
                <li>
                  Total Student Body: <strong>2,840</strong> across 6 departments with{" "}
                  <strong>95.2%</strong> retention.
                </li>
                <li>
                  Total Active Faculty: <strong>142</strong> with an aggregate 1:20 advising ratio.
                </li>
                <li>
                  Active Project Deployments: <strong>428</strong> with 62 potential patent candidates.
                </li>
                <li>
                  Institutional Activity Score: <strong>88.4 / 100</strong> (Top Decile Tier-1).
                </li>
                <li>
                  Industry Opportunity Pipeline: <strong>42 active partner roles</strong> matching{" "}
                  <strong>90.8%</strong> of graduating cohort.
                </li>
              </ul>
            </div>

            <div className="dialog-footer">
              <button
                type="button"
                className="nx-btn-secondary"
                onClick={() => setShowBriefingModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="nx-btn-primary"
                onClick={() => {
                  setShowBriefingModal(false);
                  showToast("Executive Briefing downloaded to local session.");
                }}
              >
                <Download size={15} />
                <span>Export Official PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          RESOURCE ALLOCATION MODAL
          ========================================================= */}
      {showAllocationModal && (
        <div className="mgt-modal-overlay" onClick={() => setShowAllocationModal(false)}>
          <div
            className="mgt-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Department Resource Allocation"
          >
            <div className="dialog-header">
              <h3>Strategic Resource Allocation</h3>
              <button
                type="button"
                className="dialog-close-btn"
                onClick={() => setShowAllocationModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleConfirmAllocation} className="mgt-form">
              <p className="form-subtext">
                Authorize supplemental research grants, compute hours, or hardware
                procurement from the Provost discretionary innovation fund.
              </p>

              <div className="form-field">
                <label htmlFor="dept-alloc-select">Recipient Department</label>
                <select
                  id="dept-alloc-select"
                  value={allocationDept}
                  onChange={(e) => setAllocationDept(e.target.value)}
                  required
                >
                  {DEPARTMENTS_DATA.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.code}) — HOD: {d.hod}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="amount-alloc-select">Discretionary Grant Allocation</label>
                <select
                  id="amount-alloc-select"
                  value={allocationAmount}
                  onChange={(e) => setAllocationAmount(e.target.value)}
                  required
                >
                  <option value="$25,000">$25,000 — Lab Equipment & Sensors</option>
                  <option value="$50,000">$50,000 — GPU Cloud Compute Burst Tier</option>
                  <option value="$100,000">$100,000 — Capstone Venture Grant</option>
                  <option value="$250,000">$250,000 — Interdisciplinary Research Fellowship</option>
                </select>
              </div>

              <div className="dialog-footer">
                <button
                  type="button"
                  className="nx-btn-secondary"
                  onClick={() => setShowAllocationModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="nx-btn-primary">
                  <Zap size={15} />
                  <span>Authorize Allocation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          DEPARTMENT DETAIL DRAWER
          ========================================================= */}
      {selectedDept && (
        <div className="mgt-modal-overlay" onClick={() => setSelectedDept(null)}>
          <div
            className="mgt-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={`Department Profile: ${selectedDept.name}`}
          >
            <div className="drawer-header">
              <div>
                <span className="dept-code-tag">{selectedDept.code}</span>
                <h3>{selectedDept.name}</h3>
                <span className="hod-label">Head of Department: {selectedDept.hod}</span>
              </div>
              <button
                type="button"
                className="dialog-close-btn"
                onClick={() => setSelectedDept(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="drawer-body">
              <div className="drawer-metrics-grid">
                <div className="drawer-metric-box">
                  <span>Enrolled Scholars</span>
                  <strong>{selectedDept.students}</strong>
                </div>
                <div className="drawer-metric-box">
                  <span>Faculty Advisors</span>
                  <strong>{selectedDept.faculty}</strong>
                </div>
                <div className="drawer-metric-box">
                  <span>Advising Ratio</span>
                  <strong>{selectedDept.ratio}</strong>
                </div>
                <div className="drawer-metric-box">
                  <span>Placement Rate</span>
                  <strong className="text-green">{selectedDept.placementRate}</strong>
                </div>
              </div>

              <div className="drawer-section">
                <h4>Budget & Resource Utilization</h4>
                <div className="progress-labels">
                  <span>Semester Expenditure</span>
                  <strong>{selectedDept.budgetUtilized}</strong>
                </div>
                <div className="track-bar mt-4">
                  <span style={{ width: selectedDept.budgetUtilized }} />
                </div>
              </div>

              <div className="drawer-section">
                <h4>Core Technical Inventory</h4>
                <p className="skills-line">{selectedDept.topSkill}</p>
              </div>

              <div className="drawer-section">
                <h4>Executive Actions</h4>
                <div className="drawer-actions-row">
                  <button
                    type="button"
                    className="nx-btn-primary full-width"
                    onClick={() => {
                      setAllocationDept(selectedDept.name);
                      setSelectedDept(null);
                      setShowAllocationModal(true);
                    }}
                  >
                    Allocate Research Grant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagementDashboard;