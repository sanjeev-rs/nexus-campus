import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Award,
  Bell,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  Eye,
  FileCheck,
  FileText,
  FolderKanban,
  GraduationCap,
  Layers,
  MessageSquare,
  Plus,
  Search,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import "./FacultyDashboard.css";

/* =========================================================
   DETERMINISTIC FACULTY DATASET (FRONTEND GROUNDED)
   Aligned with NEXUS academic structure and knowledgeData.
   ========================================================= */

const INITIAL_ADVISEES = [
  {
    id: "stu-101",
    name: "Aiden Cross",
    regNumber: "RA2311003010042",
    year: "Year 3",
    department: "AI & Data Science",
    project: "Smart Campus Analytics",
    projectSlug: "smart-campus-analytics",
    projectType: "Capstone",
    progress: 88,
    primarySkill: "Python • Machine Learning",
    status: "On Schedule",
    statusType: "success",
    lastActive: "2 hours ago",
    milestone: "Sprint 4: Predictive model validation",
    avatar: "AC",
    email: "aiden.cross@nexus.edu",
    gpa: "3.92",
    pendingAction: null,
  },
  {
    id: "stu-102",
    name: "Maya Lin",
    regNumber: "RA2311003010087",
    year: "Year 4",
    department: "AI & Data Science",
    project: "Autonomous Campus Drone Navigation",
    projectSlug: "autonomous-navigation",
    projectType: "Research Capstone",
    progress: 64,
    primarySkill: "Computer Vision • ROS 2",
    status: "Review Pending",
    statusType: "warning",
    lastActive: "5 hours ago",
    milestone: "Deliverable 3: Stereo-vision obstacle avoidance report",
    avatar: "ML",
    email: "maya.lin@nexus.edu",
    gpa: "3.85",
    pendingAction: "Review Deliverable",
  },
  {
    id: "stu-103",
    name: "Devon Reed",
    regNumber: "RA2311003010115",
    year: "Year 3",
    department: "Computer Science",
    project: "Distributed Graph Intelligence Engine",
    projectSlug: "graph-intelligence",
    projectType: "Research",
    progress: 42,
    primarySkill: "Neo4j • Python • FastAPI",
    status: "Delayed Milestone",
    statusType: "danger",
    lastActive: "4 days ago",
    milestone: "Deliverable 2: Graph schema benchmark and ingestion pipeline",
    avatar: "DR",
    email: "devon.reed@nexus.edu",
    gpa: "3.48",
    pendingAction: "Milestone Intervention",
  },
  {
    id: "stu-104",
    name: "Sophia Sterling",
    regNumber: "RA2311003010019",
    year: "Year 4",
    department: "AI & Data Science",
    project: "Campus Knowledge RAG Retrieval",
    projectSlug: "rag-context",
    projectType: "Thesis",
    progress: 94,
    primarySkill: "NLP • Vector Search • PyTorch",
    status: "Ready for Defense",
    statusType: "success",
    lastActive: "1 day ago",
    milestone: "Final Thesis: Empirical RAG precision on academic corpus",
    avatar: "SS",
    email: "sophia.s@nexus.edu",
    gpa: "3.96",
    pendingAction: "Schedule Defense",
  },
  {
    id: "stu-105",
    name: "Karan Patel",
    regNumber: "RA2311003010204",
    year: "Year 2",
    department: "Data Science",
    project: "Curriculum Skill Analytics",
    projectSlug: "curriculum-skills",
    projectType: "Mini Project",
    progress: 75,
    primarySkill: "Data Analytics • Pandas • React",
    status: "On Schedule",
    statusType: "success",
    lastActive: "Yesterday",
    milestone: "Sprint 2: Student capability index visualization",
    avatar: "KP",
    email: "karan.patel@nexus.edu",
    gpa: "3.71",
    pendingAction: null,
  },
  {
    id: "stu-106",
    name: "Elena Rostova",
    regNumber: "RA2311003010144",
    year: "Year 3",
    department: "Computer Science",
    project: "Edge Vision Laboratory Monitor",
    projectSlug: "edge-vision",
    projectType: "Capstone",
    progress: 58,
    primarySkill: "OpenCV • PyTorch • C++",
    status: "Review Pending",
    statusType: "warning",
    lastActive: "3 hours ago",
    milestone: "Deliverable 3: Camera calibration on Raspberry Pi 5",
    avatar: "ER",
    email: "elena.r@nexus.edu",
    gpa: "3.78",
    pendingAction: "Review Deliverable",
  },
  {
    id: "stu-107",
    name: "Marcus Vance Jr.",
    regNumber: "RA2311003010310",
    year: "Year 3",
    department: "AI & Data Science",
    project: "Failure Memory Classification",
    projectSlug: "failure-memory",
    projectType: "Research",
    progress: 30,
    primarySkill: "NLP • Python",
    status: "Needs Intervention",
    statusType: "danger",
    lastActive: "8 days ago",
    milestone: "Deliverable 1: Taxonomical labeling of post-mortems",
    avatar: "MV",
    email: "marcus.jr@nexus.edu",
    gpa: "3.22",
    pendingAction: "Urgent Check-in",
  },
  {
    id: "stu-108",
    name: "Tara Nair",
    regNumber: "RA2311003010065",
    year: "Year 4",
    department: "AI & Data Science",
    project: "Intelligent Student Twin Simulator",
    projectSlug: "student-twin",
    projectType: "Capstone",
    progress: 82,
    primarySkill: "Python • Scikit-learn • FastAPI",
    status: "On Schedule",
    statusType: "success",
    lastActive: "6 hours ago",
    milestone: "Sprint 4: Multi-variable trajectory simulation",
    avatar: "TN",
    email: "tara.nair@nexus.edu",
    gpa: "3.89",
    pendingAction: null,
  },
];

const INITIAL_PROJECT_REVIEWS = [
  {
    id: "rev-201",
    studentId: "stu-102",
    studentName: "Maya Lin",
    regNumber: "RA2311003010087",
    projectTitle: "Autonomous Campus Drone Navigation",
    deliverableTitle: "Milestone 3: Stereo-vision Obstacle Avoidance Benchmark",
    submittedAt: "Today at 09:30 AM",
    dueDate: "Yesterday",
    urgency: "HIGH",
    summary:
      "Includes ROS2 node benchmarks, latency logs from Jetson Orin Nano, and safety collision-avoidance test runs across North Campus quad.",
    attachments: [
      "Benchmark_Results_v3.pdf",
      "ROS2_Telemetry_logs.csv",
      "Simulation_Recording.mp4",
    ],
    status: "PENDING",
  },
  {
    id: "rev-202",
    studentId: "stu-106",
    studentName: "Elena Rostova",
    regNumber: "RA2311003010144",
    projectTitle: "Edge Vision Laboratory Monitor",
    deliverableTitle: "Milestone 3: Hardware In-the-Loop Edge Calibration",
    submittedAt: "Yesterday at 04:15 PM",
    dueDate: "Tomorrow",
    urgency: "NORMAL",
    summary:
      "Embedded camera calibration matrices and FPS analysis under fluctuating light conditions in Hardware Lab 204.",
    attachments: ["Calibration_Report.pdf", "Edge_Inference_Stats.json"],
    status: "PENDING",
  },
  {
    id: "rev-203",
    studentId: "stu-104",
    studentName: "Sophia Sterling",
    regNumber: "RA2311003010019",
    projectTitle: "Campus Knowledge RAG Retrieval",
    deliverableTitle: "Final Thesis Manuscript & Defense Dossier",
    submittedAt: "2 days ago",
    dueDate: "Nov 30, 2026",
    urgency: "NORMAL",
    summary:
      "Comprehensive 62-page manuscript comparing dense retrieval versus graph-augmented RAG over institutional campus repositories.",
    attachments: [
      "Final_Thesis_Manuscript.pdf",
      "Defense_Presentation_Slides.pptx",
    ],
    status: "PENDING",
  },
];

const INITIAL_ALERTS = [
  {
    id: "alt-01",
    type: "danger",
    title: "Extended Inactivity: Marcus Vance Jr.",
    description:
      "No commits, code submissions or milestone activity in 8 days. Course attendance fell below 75%.",
    student: "Marcus Vance Jr.",
    studentId: "stu-107",
    action: "Schedule Advising Call",
  },
  {
    id: "alt-02",
    type: "danger",
    title: "Milestone Overdue: Distributed Graph Intelligence",
    description:
      "Deliverable 2 was due 4 days ago. Devon Reed has not requested an extension.",
    student: "Devon Reed",
    studentId: "stu-103",
    action: "Issue Milestone Warning",
  },
  {
    id: "alt-03",
    type: "warning",
    title: "Review Required: Stereo-vision Obstacle Avoidance",
    description:
      "Submitted by Maya Lin 14 hours ago. Milestone deadline reached.",
    student: "Maya Lin",
    studentId: "stu-102",
    action: "Review Submission",
  },
  {
    id: "alt-04",
    type: "info",
    title: "Capstone Defense Ready: Sophia Sterling",
    description:
      "All 5 thesis milestones signed off with 94% cumulative milestone score. Committee ready for scheduling.",
    student: "Sophia Sterling",
    studentId: "stu-104",
    action: "Authorize Committee",
  },
];

const UPCOMING_OFFICE_HOURS = [
  {
    id: "oh-01",
    time: "Today • 02:30 PM",
    student: "Devon Reed",
    topic: "Graph ingestion pipeline bottlenecks & database indexing",
    type: "Intervention Session",
    status: "Confirmed",
  },
  {
    id: "oh-02",
    time: "Today • 03:15 PM",
    student: "Maya Lin",
    topic: "Stereo-vision camera calibration feedback review",
    type: "Milestone Check-in",
    status: "Confirmed",
  },
  {
    id: "oh-03",
    time: "Tomorrow • 10:00 AM",
    student: "Aiden Cross",
    topic: "Paper submission to Campus Student AI Symposium",
    type: "Research Mentorship",
    status: "Scheduled",
  },
  {
    id: "oh-04",
    time: "Tomorrow • 11:30 AM",
    student: "Sophia Sterling",
    topic: "Defense committee panel review and presentation rehearsal",
    type: "Thesis Defense Prep",
    status: "Scheduled",
  },
];

const DEPARTMENT_SKILL_INDEX = [
  { name: "Python 3.12 & Ecosystem", mastery: 92, count: "46 students", trend: "+8%" },
  { name: "PyTorch & Deep Learning", mastery: 84, count: "38 students", trend: "+14%" },
  { name: "Computer Vision & OpenCV", mastery: 76, count: "29 students", trend: "+11%" },
  { name: "FastAPI & Microservices", mastery: 71, count: "27 students", trend: "+5%" },
  { name: "PostgreSQL & Vector Store", mastery: 68, count: "24 students", trend: "+18%" },
  { name: "Graph DB (Neo4j)", mastery: 54, count: "16 students", trend: "+22%" },
];

function getStoredFacultyUser() {
  try {
    const stored = localStorage.getItem("nexusAuth");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        name: parsed.name || "Dr. Evelyn Vance",
        email: parsed.email || "faculty@nexus.edu",
        designation: "Professor & Senior Research Advisor",
        department: "Department of AI & Data Science",
        room: "Lab Block 4 • Rm 302",
      };
    }
  } catch {
    // Fallback
  }
  return {
    name: "Dr. Evelyn Vance",
    email: "faculty@nexus.edu",
    designation: "Professor & Senior Research Advisor",
    department: "Department of AI & Data Science",
    room: "Lab Block 4 • Rm 302",
  };
}

function FacultyDashboard() {
  const navigate = useNavigate();

  // Load user session from localStorage
  const facultyUser = useMemo(() => getStoredFacultyUser(), []);

  // Dynamic time greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  // State management
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "advisees" | "reviews" | "skills" | "alerts"
  const [advisees, setAdvisees] = useState(INITIAL_ADVISEES);
  const [reviews, setReviews] = useState(INITIAL_PROJECT_REVIEWS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [officeHours, setOfficeHours] = useState(UPCOMING_OFFICE_HOURS);

  // Search & filter for advisee table
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL"); // "ALL" | "PENDING" | "DELAYED" | "SUCCESS"

  // Selected student drawer/modal
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Quick Action Modals
  const [showOfficeHourModal, setShowOfficeHourModal] = useState(false);
  const [newOfficeHourStudent, setNewOfficeHourStudent] = useState("");
  const [newOfficeHourTime, setNewOfficeHourTime] = useState("");
  const [newOfficeHourTopic, setNewOfficeHourTopic] = useState("");

  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Filtered Advisees
  const filteredAdvisees = useMemo(() => {
    return advisees.filter((student) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        student.name.toLowerCase().includes(q) ||
        student.regNumber.toLowerCase().includes(q) ||
        student.project.toLowerCase().includes(q) ||
        student.primarySkill.toLowerCase().includes(q);

      let matchesStatus = true;
      if (statusFilter === "PENDING") {
        matchesStatus = student.statusType === "warning";
      } else if (statusFilter === "DELAYED") {
        matchesStatus = student.statusType === "danger";
      } else if (statusFilter === "SUCCESS") {
        matchesStatus = student.statusType === "success";
      }

      return matchesSearch && matchesStatus;
    });
  }, [advisees, searchQuery, statusFilter]);

  // Review Actions
  const handleApproveReview = (reviewId, studentName) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    setAdvisees((prev) =>
      prev.map((s) =>
        s.name === studentName
          ? {
              ...s,
              status: "Milestone Approved",
              statusType: "success",
              progress: Math.min(s.progress + 12, 100),
              pendingAction: null,
            }
          : s
      )
    );
    showToast(`Approved milestone submission for ${studentName}. Grade record updated.`);
  };

  const handleRequestRevision = (reviewId, studentName) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    setAdvisees((prev) =>
      prev.map((s) =>
        s.name === studentName
          ? {
              ...s,
              status: "Revisions Requested",
              statusType: "warning",
              pendingAction: "Pending Revision",
            }
          : s
      )
    );
    showToast(`Feedback and revision request sent to ${studentName}.`);
  };

  // Dismiss / Resolve alert
  const handleResolveAlert = (alertId, title) => {
    setAlerts((prev) => prev.filter((a) => a.id !== alertId));
    showToast(`Intervention note logged. Alert resolved: ${title}`);
  };

  // Add Office Hour Session
  const handleAddOfficeHour = (e) => {
    e.preventDefault();
    if (!newOfficeHourStudent.trim() || !newOfficeHourTime.trim()) return;

    const newSession = {
      id: `oh-${Date.now()}`,
      time: newOfficeHourTime,
      student: newOfficeHourStudent,
      topic: newOfficeHourTopic || "General Academic & Capstone Advising",
      type: "Advising Session",
      status: "Confirmed",
    };

    setOfficeHours((prev) => [newSession, ...prev]);
    setShowOfficeHourModal(false);
    setNewOfficeHourStudent("");
    setNewOfficeHourTime("");
    setNewOfficeHourTopic("");
    showToast(`Advising session scheduled with ${newOfficeHourStudent}.`);
  };

  // Broadcast Message
  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    setShowBroadcastModal(false);
    setBroadcastMessage("");
    showToast("Broadcast announcement dispatched to all 48 advisees.");
  };

  // Endorse Skill for a Student
  const handleEndorseStudentSkill = (studentName, skill) => {
    showToast(`Faculty endorsement recorded: Verified ${studentName}'s proficiency in ${skill}.`);
    if (selectedStudent) {
      setSelectedStudent((prev) => ({
        ...prev,
        endorsed: true,
      }));
    }
  };

  return (
    <div className="faculty-dashboard">
      {/* =========================================================
          TOAST FEEDBACK
          ========================================================= */}
      {toastMessage && (
        <div className="faculty-toast" role="status" aria-live="polite">
          <CheckCircle2 size={18} className="toast-icon" />
          <span>{toastMessage}</span>
          <button
            type="button"
            className="toast-close"
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss toast"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* =========================================================
          FACULTY WELCOME HERO
          ========================================================= */}
      <section className="faculty-welcome">
        <div className="faculty-welcome-glow" aria-hidden="true" />

        <div className="faculty-welcome-content">
          <div className="faculty-eyebrow-row">
            <span className="faculty-eyebrow">
              NEXUS FACULTY PORTAL • {facultyUser.department}
            </span>
            <span className="faculty-badge-live">
              <span className="pulse-dot" />
              Active Term: Spring 2026
            </span>
          </div>

          <h1>
            {greeting},{" "}
            <span className="faculty-name-highlight">{facultyUser.name}</span>
          </h1>

          <p className="faculty-welcome-desc">
            Supervising <strong>48 students</strong> across <strong>14 active research & capstone projects</strong>.
            You have <strong>{reviews.length} pending submissions</strong> and{" "}
            <strong>{alerts.length} attention alerts</strong> requiring faculty review.
          </p>

          <div className="faculty-status-strip">
            <div className="status-chip">
              <Compass size={15} />
              <span>Office: {facultyUser.room}</span>
            </div>
            <div className="status-chip">
              <Clock size={15} />
              <span>Office Hours Today: 2:00 PM – 4:30 PM</span>
            </div>
            <div className="status-chip highlight">
              <Calendar size={15} />
              <span>Next Check-in: 02:30 PM (Devon Reed)</span>
            </div>
          </div>
        </div>

        {/* Action Button Row in Hero */}
        <div className="faculty-hero-actions">
          <button
            type="button"
            className="nx-btn-primary"
            onClick={() => setShowOfficeHourModal(true)}
          >
            <Plus size={16} />
            <span>Log Advising Session</span>
          </button>
          <button
            type="button"
            className="nx-btn-secondary"
            onClick={() => setShowBroadcastModal(true)}
          >
            <Send size={15} />
            <span>Advisee Broadcast</span>
          </button>
        </div>
      </section>

      {/* =========================================================
          KEY INTELLIGENCE METRICS (4 CARDS)
          ========================================================= */}
      <section className="faculty-section">
        <div className="faculty-kpis">
          {/* KPI 1 */}
          <article
            className="faculty-kpi kpi-blue clickable"
            onClick={() => setActiveTab("advisees")}
          >
            <div className="kpi-top">
              <div className="kpi-icon">
                <Users size={20} />
              </div>
              <span className="kpi-trend positive">+4 New</span>
            </div>
            <span className="kpi-label">Supervised Advisees</span>
            <strong className="kpi-value">{advisees.length}</strong>
            <div className="kpi-progress">
              <span style={{ width: "88%" }} />
            </div>
            <span className="kpi-description">
              32 Capstone teams • 16 Research fellows
            </span>
          </article>

          {/* KPI 2 */}
          <article
            className="faculty-kpi kpi-orange clickable"
            onClick={() => setActiveTab("reviews")}
          >
            <div className="kpi-top">
              <div className="kpi-icon">
                <FileCheck size={20} />
              </div>
              <span className="kpi-trend alert">
                {reviews.length} Pending
              </span>
            </div>
            <span className="kpi-label">Deliverable Review Queue</span>
            <strong className="kpi-value">
              {reviews.length < 10 ? `0${reviews.length}` : reviews.length}
            </strong>
            <div className="kpi-mini-stats">
              <span>
                <CheckCircle2 size={13} /> 11 approved this month
              </span>
            </div>
            <span className="kpi-description">
              Submissions requiring faculty sign-off
            </span>
          </article>

          {/* KPI 3 */}
          <article
            className="faculty-kpi kpi-red clickable"
            onClick={() => setActiveTab("alerts")}
          >
            <div className="kpi-top">
              <div className="kpi-icon">
                <AlertCircle size={20} />
              </div>
              <span className="kpi-trend danger">Action Needed</span>
            </div>
            <span className="kpi-label">Intervention Alerts</span>
            <strong className="kpi-value">
              {alerts.length < 10 ? `0${alerts.length}` : alerts.length}
            </strong>
            <div className="kpi-mini-stats">
              <span>2 milestone delays • 1 inactive</span>
            </div>
            <span className="kpi-description">
              Students falling behind expected velocity
            </span>
          </article>

          {/* KPI 4 */}
          <article
            className="faculty-kpi kpi-green clickable"
            onClick={() => setActiveTab("skills")}
          >
            <div className="kpi-top">
              <div className="kpi-icon">
                <TrendingUp size={20} />
              </div>
              <span className="kpi-trend positive">+9.4%</span>
            </div>
            <span className="kpi-label">Cohort Skill Velocity</span>
            <strong className="kpi-value">84%</strong>
            <div className="kpi-progress">
              <span style={{ width: "84%" }} />
            </div>
            <span className="kpi-description">
              Department mastery benchmark index
            </span>
          </article>
        </div>
      </section>

      {/* =========================================================
          TAB NAVIGATION CONTROLS
          ========================================================= */}
      <nav className="faculty-tabs-nav" aria-label="Faculty Dashboard Views">
        <button
          type="button"
          className={`faculty-tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <Layers size={16} />
          <span>Executive Overview</span>
        </button>

        <button
          type="button"
          className={`faculty-tab-btn ${activeTab === "advisees" ? "active" : ""}`}
          onClick={() => setActiveTab("advisees")}
        >
          <GraduationCap size={16} />
          <span>Advisee Roster ({advisees.length})</span>
        </button>

        <button
          type="button"
          className={`faculty-tab-btn ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          <FileCheck size={16} />
          <span>Review Pipeline</span>
          {reviews.length > 0 && (
            <span className="tab-counter">{reviews.length}</span>
          )}
        </button>

        <button
          type="button"
          className={`faculty-tab-btn ${activeTab === "skills" ? "active" : ""}`}
          onClick={() => setActiveTab("skills")}
        >
          <Sparkles size={16} />
          <span>Skill & Research Insights</span>
        </button>

        <button
          type="button"
          className={`faculty-tab-btn ${activeTab === "alerts" ? "active" : ""}`}
          onClick={() => setActiveTab("alerts")}
        >
          <Bell size={16} />
          <span>Attention Alerts</span>
          {alerts.length > 0 && (
            <span className="tab-counter alert">{alerts.length}</span>
          )}
        </button>
      </nav>

      {/* =========================================================
          TAB 1: OVERVIEW VIEW
          ========================================================= */}
      {activeTab === "overview" && (
        <div className="faculty-tab-content">
          <div className="faculty-grid-two-col">
            {/* LEFT COLUMN: PENDING REVIEWS & ALERTS */}
            <div className="faculty-col">
              {/* Review Queue Summary Card */}
              <article className="faculty-card">
                <div className="card-header-row">
                  <div>
                    <span className="card-eyebrow">PRIORITY ACTION</span>
                    <h3>Pending Project Reviews</h3>
                  </div>
                  <button
                    type="button"
                    className="card-text-link"
                    onClick={() => setActiveTab("reviews")}
                  >
                    View all {reviews.length}
                    <ChevronRight size={15} />
                  </button>
                </div>

                {reviews.length === 0 ? (
                  <div className="faculty-empty-state">
                    <CheckCircle2 size={32} className="empty-icon success" />
                    <h4>All Submissions Reviewed</h4>
                    <p>No project milestones are currently awaiting your approval.</p>
                  </div>
                ) : (
                  <div className="faculty-review-list">
                    {reviews.slice(0, 2).map((rev) => (
                      <div className="faculty-review-item" key={rev.id}>
                        <div className="review-meta-top">
                          <span className={`urgency-badge ${rev.urgency.toLowerCase()}`}>
                            {rev.urgency} PRIORITY
                          </span>
                          <span className="review-time">
                            <Clock size={13} /> {rev.submittedAt}
                          </span>
                        </div>

                        <h4 className="review-project-title">{rev.projectTitle}</h4>
                        <p className="review-deliverable">{rev.deliverableTitle}</p>

                        <div className="review-student-info">
                          <strong>{rev.studentName}</strong>
                          <span>{rev.regNumber}</span>
                        </div>

                        <p className="review-summary-snippet">{rev.summary}</p>

                        <div className="review-action-btns">
                          <button
                            type="button"
                            className="nx-btn-primary sm"
                            onClick={() => handleApproveReview(rev.id, rev.studentName)}
                          >
                            <Check size={14} />
                            <span>Approve Milestone</span>
                          </button>
                          <button
                            type="button"
                            className="nx-btn-secondary sm"
                            onClick={() => handleRequestRevision(rev.id, rev.studentName)}
                          >
                            <MessageSquare size={14} />
                            <span>Request Revision</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>

              {/* Intervention Alerts Card */}
              <article className="faculty-card">
                <div className="card-header-row">
                  <div>
                    <span className="card-eyebrow">ACADEMIC INTERVENTION</span>
                    <h3>Active Student Alerts</h3>
                  </div>
                  <button
                    type="button"
                    className="card-text-link"
                    onClick={() => setActiveTab("alerts")}
                  >
                    Manage alerts ({alerts.length})
                    <ChevronRight size={15} />
                  </button>
                </div>

                <div className="faculty-alert-list">
                  {alerts.slice(0, 3).map((alt) => (
                    <div className={`faculty-alert-item ${alt.type}`} key={alt.id}>
                      <div className="alert-item-header">
                        <AlertCircle size={17} className="alert-icon" />
                        <strong>{alt.title}</strong>
                      </div>
                      <p>{alt.description}</p>
                      <div className="alert-action-row">
                        <span className="alert-student-tag">{alt.student}</span>
                        <button
                          type="button"
                          className="alert-btn"
                          onClick={() => handleResolveAlert(alt.id, alt.title)}
                        >
                          Resolve Note
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            {/* RIGHT COLUMN: ADVISEE QUICK LIST & TODAY'S SCHEDULE */}
            <div className="faculty-col">
              {/* Today's Advising Schedule */}
              <article className="faculty-card">
                <div className="card-header-row">
                  <div>
                    <span className="card-eyebrow">TODAY & TOMORROW</span>
                    <h3>Advising & Office Hours</h3>
                  </div>
                  <button
                    type="button"
                    className="card-action-icon"
                    onClick={() => setShowOfficeHourModal(true)}
                    title="Book new session"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="office-hours-timeline">
                  {officeHours.map((slot) => (
                    <div className="timeline-slot" key={slot.id}>
                      <div className="slot-indicator">
                        <span className="slot-dot" />
                        <span className="slot-line" />
                      </div>
                      <div className="slot-content">
                        <div className="slot-time-row">
                          <span className="slot-time">{slot.time}</span>
                          <span className="slot-badge">{slot.type}</span>
                        </div>
                        <strong className="slot-student">{slot.student}</strong>
                        <p className="slot-topic">{slot.topic}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              {/* Department Skill Distribution Preview */}
              <article className="faculty-card">
                <div className="card-header-row">
                  <div>
                    <span className="card-eyebrow">CAPABILITY DISTRIBUTION</span>
                    <h3>Top Supervised Capabilities</h3>
                  </div>
                  <button
                    type="button"
                    className="card-text-link"
                    onClick={() => setActiveTab("skills")}
                  >
                    Explore skills
                    <ChevronRight size={15} />
                  </button>
                </div>

                <div className="faculty-skills-summary">
                  {DEPARTMENT_SKILL_INDEX.slice(0, 4).map((skill) => (
                    <div className="skill-meter-row" key={skill.name}>
                      <div className="skill-meter-labels">
                        <span className="skill-meter-title">{skill.name}</span>
                        <div className="skill-meter-val-group">
                          <span className="skill-trend-badge">{skill.trend}</span>
                          <strong>{skill.mastery}%</strong>
                        </div>
                      </div>
                      <div className="skill-meter-bar">
                        <span style={{ width: `${skill.mastery}%` }} />
                      </div>
                      <span className="skill-meter-sub">{skill.count} actively building</span>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 2: ADVISEE ROSTER
          ========================================================= */}
      {activeTab === "advisees" && (
        <div className="faculty-tab-content">
          <div className="faculty-table-toolbar">
            <div className="search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search advisee by name, register number, project, or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search advisee roster"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="filter-chips">
              <button
                type="button"
                className={`filter-chip ${statusFilter === "ALL" ? "active" : ""}`}
                onClick={() => setStatusFilter("ALL")}
              >
                All Advisees ({advisees.length})
              </button>
              <button
                type="button"
                className={`filter-chip ${statusFilter === "SUCCESS" ? "active" : ""}`}
                onClick={() => setStatusFilter("SUCCESS")}
              >
                On Schedule
              </button>
              <button
                type="button"
                className={`filter-chip ${statusFilter === "PENDING" ? "active" : ""}`}
                onClick={() => setStatusFilter("PENDING")}
              >
                Reviews Pending
              </button>
              <button
                type="button"
                className={`filter-chip ${statusFilter === "DELAYED" ? "active" : ""}`}
                onClick={() => setStatusFilter("DELAYED")}
              >
                Needs Intervention
              </button>
            </div>
          </div>

          {/* Advisee Grid / Table */}
          <div className="faculty-advisee-grid">
            {filteredAdvisees.length === 0 ? (
              <div className="faculty-empty-search">
                <Search size={32} />
                <h4>No matching students found</h4>
                <p>Try clearing your filter or searching for a different keyword.</p>
                <button
                  type="button"
                  className="nx-btn-secondary sm"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("ALL");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredAdvisees.map((student) => (
                <article className="faculty-student-card" key={student.id}>
                  <div className="student-card-top">
                    <div className="student-avatar-badge">{student.avatar}</div>
                    <div className="student-identity">
                      <h4>{student.name}</h4>
                      <span className="student-reg">{student.regNumber}</span>
                    </div>
                    <span className={`status-pill ${student.statusType}`}>
                      {student.status}
                    </span>
                  </div>

                  <div className="student-card-body">
                    <div className="student-meta-item">
                      <span className="meta-label">Assigned Project</span>
                      <strong className="meta-value">{student.project}</strong>
                      <span className="meta-tag">{student.projectType}</span>
                    </div>

                    <div className="student-progress-block">
                      <div className="progress-labels">
                        <span>Milestone Progress</span>
                        <strong>{student.progress}%</strong>
                      </div>
                      <div className="progress-track">
                        <span
                          className={`progress-fill ${student.statusType}`}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="student-meta-item">
                      <span className="meta-label">Primary Capabilities</span>
                      <span className="skill-pills-text">{student.primarySkill}</span>
                    </div>

                    <div className="student-meta-item">
                      <span className="meta-label">Current Milestone</span>
                      <p className="milestone-text">{student.milestone}</p>
                    </div>
                  </div>

                  <div className="student-card-footer">
                    <span className="last-active">Active {student.lastActive}</span>
                    <button
                      type="button"
                      className="student-inspect-btn"
                      onClick={() => setSelectedStudent(student)}
                    >
                      <span>Review Profile</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 3: REVIEW PIPELINE
          ========================================================= */}
      {activeTab === "reviews" && (
        <div className="faculty-tab-content">
          <div className="pipeline-header-banner">
            <div>
              <h3>Capstone & Research Deliverables Queue</h3>
              <p>
                Evaluate student work against institutional milestones, provide
                qualitative feedback, and certify progress for academic credit.
              </p>
            </div>
            <span className="pipeline-counter">
              <strong>{reviews.length}</strong> Deliverables Awaiting Action
            </span>
          </div>

          {reviews.length === 0 ? (
            <div className="faculty-empty-state big">
              <CheckCircle2 size={44} className="empty-icon success" />
              <h3>Review Queue Clear</h3>
              <p>You have inspected and certified all submitted student project deliverables.</p>
              <button
                type="button"
                className="nx-btn-secondary"
                onClick={() => setActiveTab("advisees")}
              >
                Inspect Advisee Roster
              </button>
            </div>
          ) : (
            <div className="pipeline-items-wrapper">
              {reviews.map((rev) => (
                <article className="pipeline-review-card" key={rev.id}>
                  <div className="pipeline-card-top">
                    <div className="pipeline-badge-group">
                      <span className={`urgency-badge ${rev.urgency.toLowerCase()}`}>
                        {rev.urgency} PRIORITY
                      </span>
                      <span className="due-date-pill">Due: {rev.dueDate}</span>
                    </div>
                    <span className="submitted-timestamp">
                      <Clock size={14} /> Submitted {rev.submittedAt}
                    </span>
                  </div>

                  <div className="pipeline-content-row">
                    <div className="pipeline-main-details">
                      <h3 className="pipeline-proj-title">{rev.projectTitle}</h3>
                      <h4 className="pipeline-deliverable-title">{rev.deliverableTitle}</h4>
                      <p className="pipeline-summary-text">{rev.summary}</p>

                      <div className="pipeline-attachments">
                        <span className="attachments-label">Attached Evidence & Artifacts:</span>
                        <div className="attachments-list">
                          {rev.attachments.map((file) => (
                            <span className="attachment-chip" key={file}>
                              <FileText size={14} />
                              {file}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pipeline-student-sidebar">
                      <div className="sidebar-student-card">
                        <span className="student-label">Author</span>
                        <strong>{rev.studentName}</strong>
                        <span>{rev.regNumber}</span>
                        <button
                          type="button"
                          className="view-student-quick-btn"
                          onClick={() => {
                            const found = advisees.find((a) => a.id === rev.studentId);
                            if (found) setSelectedStudent(found);
                          }}
                        >
                          <Eye size={13} />
                          <span>Student Profile</span>
                        </button>
                      </div>

                      <div className="pipeline-action-buttons">
                        <button
                          type="button"
                          className="nx-btn-primary full-width"
                          onClick={() => handleApproveReview(rev.id, rev.studentName)}
                        >
                          <Check size={16} />
                          <span>Certify & Approve</span>
                        </button>
                        <button
                          type="button"
                          className="nx-btn-secondary full-width"
                          onClick={() => handleRequestRevision(rev.id, rev.studentName)}
                        >
                          <MessageSquare size={15} />
                          <span>Request Revisions</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}

      {/* =========================================================
          TAB 4: SKILL & RESEARCH INSIGHTS
          ========================================================= */}
      {activeTab === "skills" && (
        <div className="faculty-tab-content">
          <div className="skills-overview-hero">
            <div className="skills-hero-text">
              <span className="section-eyebrow">DEPARTMENTAL INTELLIGENCE</span>
              <h2>Cohort Capability & Technical Readiness</h2>
              <p>
                Aggregated skill mastery metrics derived from student git commits,
                project evidence artifacts, and capstone implementations across the
                Department of AI & Data Science.
              </p>
            </div>
            <div className="skills-quick-stat">
              <strong>92.6%</strong>
              <span>Core Language Proficiency</span>
            </div>
          </div>

          <div className="faculty-grid-two-col">
            {/* Skill distribution bars */}
            <article className="faculty-card">
              <div className="card-header-row">
                <div>
                  <span className="card-eyebrow">CURRICULUM INVENTORY</span>
                  <h3>Primary Technical Capabilities</h3>
                </div>
                <span className="table-count-tag">6 Tracked Disciplines</span>
              </div>

              <div className="skill-detailed-list">
                {DEPARTMENT_SKILL_INDEX.map((skill) => (
                  <div className="skill-detail-row" key={skill.name}>
                    <div className="skill-detail-top">
                      <span className="skill-detail-name">{skill.name}</span>
                      <div className="skill-stats-pair">
                        <span className="trend-text positive">{skill.trend} velocity</span>
                        <strong className="mastery-percent">{skill.mastery}%</strong>
                      </div>
                    </div>
                    <div className="skill-track-large">
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${skill.mastery}%` }}
                      />
                    </div>
                    <div className="skill-detail-meta">
                      <span>{skill.count} actively demonstrating evidence</span>
                      <span>Target: 80%</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Strategic Research & Curriculum Recommendations */}
            <div className="faculty-col">
              <article className="faculty-card">
                <div className="card-header-row">
                  <div>
                    <span className="card-eyebrow">FACULTY ADVISORY</span>
                    <h3>Curriculum & Research Signals</h3>
                  </div>
                </div>

                <div className="advisory-recommendation-list">
                  <div className="advisory-item">
                    <div className="advisory-icon blue">
                      <Sparkles size={18} />
                    </div>
                    <div className="advisory-body">
                      <strong>Surge in Vector DB & Retrieval Architecture</strong>
                      <p>
                        24 students are actively adopting pgvector and ChromaDB in
                        capstone architectures. Recommended: Conduct special lab session
                        on hybrid dense-sparse search.
                      </p>
                    </div>
                  </div>

                  <div className="advisory-item">
                    <div className="advisory-icon purple">
                      <FolderKanban size={18} />
                    </div>
                    <div className="advisory-body">
                      <strong>Edge Inference Hardware Bottleneck</strong>
                      <p>
                        Vision projects report thermal throttling on laboratory Jetson
                        boards. Recommend requesting 4 additional cooled developer kits from
                        management budget.
                      </p>
                    </div>
                  </div>

                  <div className="advisory-item">
                    <div className="advisory-icon green">
                      <Award size={18} />
                    </div>
                    <div className="advisory-body">
                      <strong>Symposium Publication Readiness</strong>
                      <p>
                        Sophia Sterling and Aiden Cross have empirical results ready for
                        the upcoming National Campus Computing Conference.
                      </p>
                      <button
                        type="button"
                        className="card-text-link mt-8"
                        onClick={() => navigate("/student/knowledge/faculty")}
                      >
                        Explore Faculty Research Group
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              <article className="faculty-card quick-resource-card">
                <h3>Campus Knowledge Integration</h3>
                <p>
                  Access research guides, technical blueprints, and student work directly
                  from the verified NEXUS Knowledge Repository.
                </p>
                <div className="quick-resource-btns">
                  <button
                    type="button"
                    className="nx-btn-secondary"
                    onClick={() => navigate("/student/knowledge/technologies")}
                  >
                    <BookOpen size={15} />
                    <span>View Technologies</span>
                  </button>
                  <button
                    type="button"
                    className="nx-btn-secondary"
                    onClick={() => navigate("/student/knowledge/research")}
                  >
                    <Compass size={15} />
                    <span>Research Papers</span>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          TAB 5: ATTENTION ALERTS & INTERVENTIONS
          ========================================================= */}
      {activeTab === "alerts" && (
        <div className="faculty-tab-content">
          <div className="alerts-header-banner">
            <div>
              <h3>Student Interventions & Academic Early Warning</h3>
              <p>
                Proactive intelligence flags highlighting students encountering
                blockers, milestone delays, or unusual drops in velocity.
              </p>
            </div>
            <span className="alerts-count-badge">
              <strong>{alerts.length}</strong> Active Flags
            </span>
          </div>

          <div className="alerts-full-list">
            {alerts.length === 0 ? (
              <div className="faculty-empty-state big">
                <CheckCircle2 size={44} className="empty-icon success" />
                <h3>No Critical Flags Active</h3>
                <p>All student cohorts are making satisfactory progress toward their milestones.</p>
              </div>
            ) : (
              alerts.map((alt) => (
                <div className={`alert-management-card ${alt.type}`} key={alt.id}>
                  <div className="alert-card-left">
                    <div className="alert-type-icon">
                      <AlertCircle size={22} />
                    </div>
                    <div className="alert-content-block">
                      <div className="alert-header-row">
                        <h4>{alt.title}</h4>
                        <span className="alert-student-pill">{alt.student}</span>
                      </div>
                      <p>{alt.description}</p>
                    </div>
                  </div>

                  <div className="alert-card-right">
                    <button
                      type="button"
                      className="nx-btn-primary sm"
                      onClick={() => {
                        const found = advisees.find((a) => a.id === alt.studentId);
                        if (found) setSelectedStudent(found);
                      }}
                    >
                      <Eye size={14} />
                      <span>Inspect Student</span>
                    </button>
                    <button
                      type="button"
                      className="nx-btn-secondary sm"
                      onClick={() => handleResolveAlert(alt.id, alt.title)}
                    >
                      <Check size={14} />
                      <span>Acknowledge & Clear</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* =========================================================
          STUDENT DETAIL DRAWER / MODAL
          ========================================================= */}
      {selectedStudent && (
        <div className="faculty-modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div
            className="faculty-drawer"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={`Student Profile: ${selectedStudent.name}`}
          >
            <div className="drawer-header">
              <div className="drawer-student-identity">
                <div className="drawer-avatar">{selectedStudent.avatar}</div>
                <div>
                  <h3>{selectedStudent.name}</h3>
                  <span>{selectedStudent.regNumber} • {selectedStudent.year} • {selectedStudent.department}</span>
                </div>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setSelectedStudent(null)}
                aria-label="Close details"
              >
                <X size={19} />
              </button>
            </div>

            <div className="drawer-body">
              <div className="drawer-status-bar">
                <span className={`status-pill ${selectedStudent.statusType}`}>
                  {selectedStudent.status}
                </span>
                <span className="drawer-gpa">Cumulative GPA: <strong>{selectedStudent.gpa}</strong></span>
              </div>

              <div className="drawer-section">
                <h4>Project Assignment</h4>
                <div className="drawer-project-box">
                  <strong>{selectedStudent.project}</strong>
                  <span className="tag">{selectedStudent.projectType}</span>
                  <div className="progress-group mt-12">
                    <div className="progress-labels">
                      <span>Milestone Progress</span>
                      <strong>{selectedStudent.progress}%</strong>
                    </div>
                    <div className="progress-track">
                      <span
                        className={`progress-fill ${selectedStudent.statusType}`}
                        style={{ width: `${selectedStudent.progress}%` }}
                      />
                    </div>
                  </div>
                  <p className="mt-8">
                    <strong>Active Objective:</strong> {selectedStudent.milestone}
                  </p>
                </div>
              </div>

              <div className="drawer-section">
                <h4>Verified Capabilities</h4>
                <p className="skill-text-highlight">{selectedStudent.primarySkill}</p>
                <button
                  type="button"
                  className="nx-btn-secondary sm mt-8"
                  onClick={() =>
                    handleEndorseStudentSkill(
                      selectedStudent.name,
                      selectedStudent.primarySkill.split("•")[0].trim()
                    )
                  }
                >
                  <Award size={15} />
                  <span>Endorse Faculty Verification</span>
                </button>
              </div>

              <div className="drawer-section">
                <h4>Quick Faculty Actions</h4>
                <div className="drawer-actions-grid">
                  <button
                    type="button"
                    className="nx-btn-secondary"
                    onClick={() => {
                      setNewOfficeHourStudent(selectedStudent.name);
                      setNewOfficeHourTopic(`Advising check-in: ${selectedStudent.project}`);
                      setSelectedStudent(null);
                      setShowOfficeHourModal(true);
                    }}
                  >
                    <Calendar size={15} />
                    <span>Book Check-in</span>
                  </button>

                  <button
                    type="button"
                    className="nx-btn-secondary"
                    onClick={() => {
                      setSelectedStudent(null);
                      showToast(`Intervention note recorded for ${selectedStudent.name}.`);
                    }}
                  >
                    <FileText size={15} />
                    <span>Add Faculty Note</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          LOG OFFICE HOUR / ADVISING MODAL
          ========================================================= */}
      {showOfficeHourModal && (
        <div className="faculty-modal-overlay" onClick={() => setShowOfficeHourModal(false)}>
          <div
            className="faculty-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Schedule Advising Session"
          >
            <div className="dialog-header">
              <h3>Schedule Advising Session</h3>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setShowOfficeHourModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddOfficeHour} className="dialog-form">
              <div className="form-field">
                <label htmlFor="oh-student-select">Select Student Advisee</label>
                <select
                  id="oh-student-select"
                  value={newOfficeHourStudent}
                  onChange={(e) => setNewOfficeHourStudent(e.target.value)}
                  required
                >
                  <option value="">-- Choose advisee --</option>
                  {advisees.map((adv) => (
                    <option key={adv.id} value={adv.name}>
                      {adv.name} ({adv.regNumber}) — {adv.project}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="oh-time-input">Session Time & Date</label>
                <input
                  id="oh-time-input"
                  type="text"
                  placeholder="e.g. Tomorrow • 03:00 PM"
                  value={newOfficeHourTime}
                  onChange={(e) => setNewOfficeHourTime(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="oh-topic-input">Session Agenda / Topic</label>
                <input
                  id="oh-topic-input"
                  type="text"
                  placeholder="e.g. Capstone deliverable review and dataset schema"
                  value={newOfficeHourTopic}
                  onChange={(e) => setNewOfficeHourTopic(e.target.value)}
                />
              </div>

              <div className="dialog-footer">
                <button
                  type="button"
                  className="nx-btn-secondary"
                  onClick={() => setShowOfficeHourModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="nx-btn-primary">
                  Confirm Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          ADVISEE BROADCAST ANNOUNCEMENT MODAL
          ========================================================= */}
      {showBroadcastModal && (
        <div className="faculty-modal-overlay" onClick={() => setShowBroadcastModal(false)}>
          <div
            className="faculty-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Broadcast Announcement to Advisees"
          >
            <div className="dialog-header">
              <h3>Broadcast to All 48 Advisees</h3>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setShowBroadcastModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="dialog-form">
              <p className="dialog-subtext">
                This notice will appear instantly in the student portal dashboard
                and campus notification feed for all students under your supervision.
              </p>

              <div className="form-field">
                <label htmlFor="broadcast-msg-input">Announcement Content</label>
                <textarea
                  id="broadcast-msg-input"
                  rows={4}
                  placeholder="e.g. Reminder: Capstone Milestone 3 code freeze is this Friday at 5:00 PM. Please push final commits and verification benchmarks."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  required
                />
              </div>

              <div className="dialog-footer">
                <button
                  type="button"
                  className="nx-btn-secondary"
                  onClick={() => setShowBroadcastModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="nx-btn-primary">
                  <Send size={15} />
                  <span>Send Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyDashboard;