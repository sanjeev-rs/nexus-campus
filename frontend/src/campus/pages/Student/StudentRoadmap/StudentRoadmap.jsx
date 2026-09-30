import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ChevronRight,
  Circle,
  Download,
  GraduationCap,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

import "./StudentRoadmap.css";

/* =========================================================
   DETERMINISTIC ROADMAP DATASET
   Aligned with 4-year B.Tech / Academic Curriculum
   ========================================================= */

const ROADMAP_TRACKS = [
  {
    id: "ai-eng",
    name: "AI Systems & Machine Learning",
    description: "Deep learning models, vector retrieval, scalable model inference and distributed training.",
    targetRole: "Machine Learning Engineer / Applied AI Researcher",
    status: "Active Track",
  },
  {
    id: "data-eng",
    name: "Data Science & Analytics",
    description: "Big data pipelines, statistical modeling, institutional intelligence and analytics engineering.",
    targetRole: "Data Scientist / Analytics Engineer",
    status: "Elective Option",
  },
  {
    id: "robotics",
    name: "Autonomous Systems & Vision",
    description: "ROS 2, stereo-vision navigation, embedded robotics, and edge hardware accelerators.",
    targetRole: "Robotics Software Engineer / Computer Vision Specialist",
    status: "Elective Option",
  },
];

const SEMESTERS_DATA = [
  {
    semester: 1,
    year: "Year 1",
    term: "Autumn 2023",
    status: "COMPLETED",
    gpa: "3.85",
    credits: 22,
    title: "Foundations of Computing & Mathematics",
    milestones: [
      { name: "Calculus & Linear Algebra", code: "MAT101", completed: true },
      { name: "Programming in Python & C++", code: "CSE101", completed: true },
      { name: "Digital Logic & Systems", code: "ECE101", completed: true },
      { name: "Engineering Physics & Lab", code: "PHY101", completed: true },
    ],
  },
  {
    semester: 2,
    year: "Year 1",
    term: "Spring 2024",
    status: "COMPLETED",
    gpa: "3.90",
    credits: 24,
    title: "Data Structures & Computational Thinking",
    milestones: [
      { name: "Data Structures & Algorithms", code: "CSE102", completed: true },
      { name: "Discrete Mathematics & Graph Theory", code: "MAT102", completed: true },
      { name: "Computer Organization & Architecture", code: "CSE104", completed: true },
      { name: "First Mini-Project Uploaded", code: "NEXUS-01", completed: true },
    ],
  },
  {
    semester: 3,
    year: "Year 2",
    term: "Autumn 2024",
    status: "COMPLETED",
    gpa: "3.88",
    credits: 23,
    title: "Database Engineering & Web Systems",
    milestones: [
      { name: "Relational Database Management (PostgreSQL)", code: "CSE201", completed: true },
      { name: "Object Oriented Design & Software Patterns", code: "CSE203", completed: true },
      { name: "Operating Systems & Concurrency", code: "CSE205", completed: true },
      { name: "Full-Stack Web Engineering with React", code: "SWE201", completed: true },
    ],
  },
  {
    semester: 4,
    year: "Year 2",
    term: "Spring 2025",
    status: "COMPLETED",
    gpa: "3.94",
    credits: 24,
    title: "Machine Learning & Scientific Computing",
    milestones: [
      { name: "Foundations of Machine Learning", code: "AIDS202", completed: true },
      { name: "Probability & Statistical Inference", code: "MAT202", completed: true },
      { name: "RESTful Microservices with FastAPI", code: "SWE204", completed: true },
      { name: "Smart Campus Analytics Prototype Initiated", code: "NEXUS-02", completed: true },
    ],
  },
  {
    semester: 5,
    year: "Year 3",
    term: "Autumn 2025",
    status: "COMPLETED",
    gpa: "3.92",
    credits: 25,
    title: "Deep Learning & Applied Computer Vision",
    milestones: [
      { name: "Deep Neural Networks with PyTorch", code: "AIDS301", completed: true },
      { name: "Computer Vision & Visual Pattern Recognition", code: "AIDS303", completed: true },
      { name: "Distributed Systems & Cloud Computing", code: "CSE301", completed: true },
      { name: "Faculty Research Advisor Assigned (Dr. Vance)", code: "ADV-01", completed: true },
    ],
  },
  {
    semester: 6,
    year: "Year 3",
    term: "Spring 2026",
    status: "ACTIVE",
    gpa: "In Progress (3.92 Target)",
    credits: 24,
    title: "Capstone Development & Vector Intelligence",
    milestones: [
      { name: "Natural Language Processing & Vector Search", code: "AIDS302", completed: false, inProgress: true },
      { name: "Smart Campus Analytics: Milestone 3 Verification", code: "PRJ-01", completed: false, inProgress: true },
      { name: "National Campus AI Symposium Submission", code: "RES-01", completed: false, inProgress: true },
      { name: "Industry Internship Placement Screening", code: "INT-01", completed: true },
    ],
  },
  {
    semester: 7,
    year: "Year 4",
    term: "Autumn 2026",
    status: "UPCOMING",
    gpa: "Projected",
    credits: 20,
    title: "Advanced AI Specialization & Industry Co-op",
    milestones: [
      { name: "Generative AI & Large Language Architectures", code: "AIDS401", completed: false },
      { name: "Autonomous Systems & Edge AI Deployment", code: "AIDS403", completed: false },
      { name: "Industry Co-op / Internship Semester", code: "INT-02", completed: false },
      { name: "Capstone Thesis Pre-Defense", code: "PRJ-02", completed: false },
    ],
  },
  {
    semester: 8,
    year: "Year 4",
    term: "Spring 2027",
    status: "UPCOMING",
    gpa: "Projected",
    credits: 18,
    title: "Final Capstone Defense & Graduation",
    milestones: [
      { name: "Final Capstone Defense & Public Demonstration", code: "PRJ-03", completed: false },
      { name: "Research Publication & Patent Filing", code: "RES-02", completed: false },
      { name: "Campus Open-Source Portfolio Handoff", code: "OSS-01", completed: false },
      { name: "Conferral of Degree with Honors", code: "GRAD", completed: false },
    ],
  },
];

const GRADUATION_REQUIREMENTS = [
  { label: "Core Academic Credits", current: 142, required: 180, unit: "Credits" },
  { label: "Verified Capstone Projects", current: 4, required: 4, unit: "Projects" },
  { label: "Faculty Research Milestones", current: 3, required: 4, unit: "Deliverables" },
  { label: "Industry Placement Readiness", current: 88, required: 80, unit: "% Index" },
];

function StudentRoadmap() {
  const navigate = useNavigate();

  const [selectedTrack, setSelectedTrack] = useState("ai-eng");
  const [activeSemesterFilter, setActiveSemesterFilter] = useState("ALL"); // "ALL" | "ACTIVE" | "COMPLETED" | "UPCOMING"
  const [showExportModal, setShowExportModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const filteredSemesters = useMemo(() => {
    if (activeSemesterFilter === "ALL") return SEMESTERS_DATA;
    return SEMESTERS_DATA.filter((s) => s.status === activeSemesterFilter);
  }, [activeSemesterFilter]);

  const activeTrackObj = useMemo(() => {
    return ROADMAP_TRACKS.find((t) => t.id === selectedTrack) || ROADMAP_TRACKS[0];
  }, [selectedTrack]);

  return (
    <div className="student-roadmap-page">
      {/* TOAST FEEDBACK */}
      {toastMessage && (
        <div className="roadmap-toast" role="status" aria-live="polite">
          <CheckCircle2 size={18} className="toast-icon" />
          <span>{toastMessage}</span>
          <button
            type="button"
            className="toast-close"
            onClick={() => setToastMessage(null)}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* BACK NAVIGATION */}
      <div className="roadmap-top-nav">
        <button
          type="button"
          className="roadmap-back-btn"
          onClick={() => navigate("/student/goals")}
        >
          <ArrowLeft size={16} />
          <span>Back to Goals & Targets</span>
        </button>

        <div className="roadmap-breadcrumbs">
          <span className="crumb" onClick={() => navigate("/student")}>Dashboard</span>
          <span className="sep">/</span>
          <span className="crumb" onClick={() => navigate("/student/goals")}>Development</span>
          <span className="sep">/</span>
          <span className="crumb current">Academic Roadmap</span>
        </div>
      </div>

      {/* ROADMAP HERO BANNER */}
      <section className="roadmap-hero">
        <div className="roadmap-hero-glow" aria-hidden="true" />

        <div className="roadmap-hero-content">
          <div className="roadmap-eyebrow-row">
            <span className="roadmap-eyebrow">
              NEXUS ACADEMIC ROADMAP • 4-YEAR DEGREE BLUEPRINT
            </span>
            <span className="roadmap-badge-term">
              <span className="term-dot" />
              Active: Semester 6 of 8
            </span>
          </div>

          <h1>
            Your academic journey, <span>engineered for excellence.</span>
          </h1>

          <p>
            Track your graduation prerequisites, research deliverables, core technical
            competencies, and capstone milestones from matriculation to graduation.
          </p>

          <div className="roadmap-stat-chips">
            <div className="roadmap-chip">
              <GraduationCap size={15} />
              <span>Program: B.Tech AI & Data Science (Honors)</span>
            </div>
            <div className="roadmap-chip highlight">
              <Sparkles size={15} />
              <span>Current Progress: 74% Complete</span>
            </div>
            <div className="roadmap-chip">
              <Award size={15} />
              <span>Cumulative GPA: 3.92</span>
            </div>
          </div>
        </div>

        <div className="roadmap-hero-actions">
          <button
            type="button"
            className="nx-btn-primary"
            onClick={() => setShowExportModal(true)}
          >
            <Download size={16} />
            <span>Export Roadmap Plan</span>
          </button>
          <button
            type="button"
            className="nx-btn-secondary"
            onClick={() => navigate("/student/progress")}
          >
            <TrendingUp size={15} />
            <span>Capability Index</span>
          </button>
        </div>
      </section>

      {/* GRADUATION READINESS METRIC STRIP */}
      <section className="requirements-strip">
        <div className="requirements-heading">
          <h3>Degree Completion & Readiness Radar</h3>
          <span>Target Graduation: Spring 2027</span>
        </div>

        <div className="requirements-grid">
          {GRADUATION_REQUIREMENTS.map((req) => {
            const pct = Math.min(Math.round((req.current / req.required) * 100), 100);
            return (
              <div className="requirement-card" key={req.label}>
                <div className="req-top">
                  <span className="req-label">{req.label}</span>
                  <span className="req-pct">{pct}%</span>
                </div>
                <div className="req-val-row">
                  <strong>{req.current}</strong>
                  <span>/ {req.required} {req.unit}</span>
                </div>
                <div className="req-progress-bar">
                  <span style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TRACK SPECIALIZATION SELECTOR */}
      <section className="track-selector-section">
        <div className="section-title-row">
          <div>
            <span className="section-eyebrow">CAREER SPECIALIZATION TRACK</span>
            <h2>Curriculum Pathways</h2>
          </div>
          <span className="track-active-badge">
            Active: {activeTrackObj.name}
          </span>
        </div>

        <div className="track-cards-grid">
          {ROADMAP_TRACKS.map((track) => (
            <div
              className={`track-card ${selectedTrack === track.id ? "active" : ""}`}
              key={track.id}
              onClick={() => {
                setSelectedTrack(track.id);
                showToast(`Switched roadmap focus to: ${track.name}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="track-card-header">
                <h4>{track.name}</h4>
                <span className={`track-pill ${track.id === selectedTrack ? "primary" : ""}`}>
                  {track.id === selectedTrack ? "Selected" : "Available"}
                </span>
              </div>
              <p>{track.description}</p>
              <div className="track-target">
                <strong>Target Career Role:</strong>
                <span>{track.targetRole}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEMESTER-BY-SEMESTER TIMELINE */}
      <section className="timeline-section">
        <div className="timeline-toolbar">
          <div>
            <span className="section-eyebrow">CHRONOLOGICAL CURRICULUM</span>
            <h2>Semester Milestone Blueprint</h2>
          </div>

          <div className="filter-chips-row">
            <button
              type="button"
              className={`f-chip ${activeSemesterFilter === "ALL" ? "active" : ""}`}
              onClick={() => setActiveSemesterFilter("ALL")}
            >
              All Semesters (8)
            </button>
            <button
              type="button"
              className={`f-chip ${activeSemesterFilter === "ACTIVE" ? "active" : ""}`}
              onClick={() => setActiveSemesterFilter("ACTIVE")}
            >
              Current Active (Sem 6)
            </button>
            <button
              type="button"
              className={`f-chip ${activeSemesterFilter === "COMPLETED" ? "active" : ""}`}
              onClick={() => setActiveSemesterFilter("COMPLETED")}
            >
              Completed (5)
            </button>
            <button
              type="button"
              className={`f-chip ${activeSemesterFilter === "UPCOMING" ? "active" : ""}`}
              onClick={() => setActiveSemesterFilter("UPCOMING")}
            >
              Upcoming (2)
            </button>
          </div>
        </div>

        <div className="timeline-stack">
          {filteredSemesters.map((sem) => (
            <article
              className={`semester-block ${sem.status.toLowerCase()}`}
              key={sem.semester}
            >
              <div className="semester-header-bar">
                <div className="sem-id-group">
                  <div className="sem-number-badge">
                    <span>SEM</span>
                    <strong>0{sem.semester}</strong>
                  </div>
                  <div>
                    <span className="sem-term-tag">{sem.year} • {sem.term}</span>
                    <h3>{sem.title}</h3>
                  </div>
                </div>

                <div className="sem-status-group">
                  <div className="sem-stats-pair">
                    <span>Credits: <strong>{sem.credits}</strong></span>
                    <span>GPA: <strong>{sem.gpa}</strong></span>
                  </div>
                  <span className={`sem-badge ${sem.status.toLowerCase()}`}>
                    {sem.status === "ACTIVE" ? "CURRENT SEMESTER" : sem.status}
                  </span>
                </div>
              </div>

              <div className="semester-milestones-grid">
                {sem.milestones.map((milestone) => (
                  <div
                    className={`milestone-item ${milestone.completed ? "done" : ""} ${
                      milestone.inProgress ? "in-progress" : ""
                    }`}
                    key={milestone.code}
                  >
                    <div className="milestone-status-icon">
                      {milestone.completed ? (
                        <CheckCircle2 size={16} className="text-green" />
                      ) : milestone.inProgress ? (
                        <div className="pulse-mini-dot" />
                      ) : (
                        <Circle size={15} className="text-muted" />
                      )}
                    </div>
                    <div className="milestone-info">
                      <span className="m-code">{milestone.code}</span>
                      <strong>{milestone.name}</strong>
                    </div>
                  </div>
                ))}
              </div>

              {sem.status === "ACTIVE" && (
                <div className="sem-active-actions">
                  <div className="active-notice">
                    <Sparkles size={16} className="text-blue" />
                    <span>
                      Milestone 3 for Smart Campus Analytics is due in 12 days.
                    </span>
                  </div>
                  <button
                    type="button"
                    className="nx-btn-primary sm"
                    onClick={() => navigate("/student/projects/explore/smart-campus-analytics")}
                  >
                    <span>Proceed to Active Capstone</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* EXPORT ROADMAP MODAL */}
      {showExportModal && (
        <div className="roadmap-modal-overlay" onClick={() => setShowExportModal(false)}>
          <div
            className="roadmap-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Export Academic Roadmap"
          >
            <div className="dialog-header">
              <h3>Export Academic Roadmap Blueprint</h3>
              <button
                type="button"
                className="dialog-close-btn"
                onClick={() => setShowExportModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="dialog-body">
              <p className="dialog-intro">
                Generate an official PDF transcript plan and capstone progress dossier
                verified against the Department of AI & Data Science accreditation standard.
              </p>

              <div className="export-summary-box">
                <div>
                  <strong>Student: Alex Chen</strong>
                  <span>RA2311003010042 • B.Tech AI & Data Science</span>
                </div>
                <div className="summary-tags mt-8">
                  <span className="doc-pill">142 Completed Credits</span>
                  <span className="doc-pill">4 Certified Projects</span>
                  <span className="doc-pill">3.92 CGPA</span>
                </div>
              </div>

              <div className="dialog-footer">
                <button
                  type="button"
                  className="nx-btn-secondary"
                  onClick={() => setShowExportModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="nx-btn-primary"
                  onClick={() => {
                    setShowExportModal(false);
                    showToast("Academic Roadmap Blueprint exported to download queue.");
                  }}
                >
                  <Download size={15} />
                  <span>Download Roadmap PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentRoadmap;
