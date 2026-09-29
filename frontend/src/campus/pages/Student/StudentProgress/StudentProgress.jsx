import "./StudentProgress.css";

import {
  ArrowUpRight,
  CheckCircle2,
  FolderKanban,
  Target,
  TrendingUp,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

/* =========================================================
   STATIC DEMONSTRATION DATA
   All data is demo-only. Replace with API calls when the
   student progress backend endpoint is available.
   ========================================================= */

const CAPABILITY_GROWTH = [
  { label: "Technical", current: 82, prev: 70, color: "blue" },
  { label: "Analytical", current: 76, prev: 68, color: "purple" },
  { label: "Collaboration", current: 68, prev: 62, color: "green" },
  { label: "Learning", current: 74, prev: 66, color: "orange" },
];

const SKILLS = [
  { name: "Python", level: 86, growth: +7, category: "Technical" },
  { name: "Data Analysis", level: 79, growth: +4, category: "Technical" },
  { name: "React", level: 72, growth: +8, category: "Technical" },
  { name: "Machine Learning", level: 64, growth: +5, category: "Technical" },
  { name: "FastAPI", level: 58, growth: +3, category: "Technical" },
  { name: "Problem Solving", level: 82, growth: +2, category: "Cognitive" },
  { name: "Communication", level: 71, growth: +6, category: "Soft Skills" },
  { name: "Research", level: 69, growth: +4, category: "Academic" },
];

const PROJECTS_PROGRESS = [
  {
    title: "NEXUS",
    category: "AI / Campus",
    progress: 72,
    status: "Active",
    id: "nexus",
  },
  {
    title: "AI Agent Accountability",
    category: "Research",
    progress: 48,
    status: "Active",
    id: "ai-agent-accountability",
  },
  {
    title: "Campus Intelligence Research",
    category: "Research",
    progress: 24,
    status: "Planning",
    id: "campus-intelligence",
  },
  {
    title: "Smart Campus Analytics",
    category: "AI / Data",
    progress: 100,
    status: "Completed",
    id: "smart-campus-analytics",
  },
];

const MILESTONES = [
  {
    title: "First project submitted",
    description: "Initial project upload to the NEXUS campus network.",
    date: "Oct 2025",
    completed: true,
  },
  {
    title: "Intelligence score reached 70",
    description: "Crossed 70 on the campus intelligence index.",
    date: "Jan 2026",
    completed: true,
  },
  {
    title: "Joined a mentor network session",
    description: "Completed first mentor consultation with Dr. Ananya Rao.",
    date: "Mar 2026",
    completed: true,
  },
  {
    title: "4 active projects milestone",
    description: "Now managing 4 concurrent campus projects.",
    date: "May 2026",
    completed: true,
  },
  {
    title: "Intelligence score reaches 90",
    description: "Target: reach 90 on the campus intelligence index.",
    date: "Expected Dec 2026",
    completed: false,
  },
  {
    title: "First published portfolio project",
    description: "Deploy one project publicly and add it to your profile.",
    date: "Target: Nov 2026",
    completed: false,
  },
];

const ACTIVITY = [
  { label: "Python skill +7%", time: "Today", type: "skill" },
  { label: "NEXUS project milestone completed", time: "Yesterday", type: "project" },
  { label: "React skill +8%", time: "3 days ago", type: "skill" },
  { label: "New collaboration on AI Accountability", time: "1 week ago", type: "collab" },
  { label: "Intelligence score increased to 82", time: "2 weeks ago", type: "intelligence" },
];

const ACTIVITY_COLOR = {
  skill: "blue",
  project: "purple",
  collab: "green",
  intelligence: "orange",
};

function StudentProgress() {
  const navigate = useNavigate();

  const completedProjects = PROJECTS_PROGRESS.filter((p) => p.status === "Completed").length;
  const completedMilestones = MILESTONES.filter((m) => m.completed).length;

  return (
    <div className="student-progress">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <section className="progress-hero">

        <div className="progress-hero-content">

          <span className="progress-eyebrow">
            NEXUS / PROGRESS
          </span>

          <h1>
            Your development
            <span> progress.</span>
          </h1>

          <p>
            Track your skill growth, project progress and capability
            development across your entire campus journey.
          </p>

        </div>

        <div className="progress-kpis">

          <div className="progress-kpi">
            <TrendingUp size={18} />
            <div>
              <strong>+12%</strong>
              <span>Intelligence growth</span>
            </div>
          </div>

          <div className="progress-kpi">
            <FolderKanban size={18} />
            <div>
              <strong>{completedProjects} completed</strong>
              <span>of {PROJECTS_PROGRESS.length} projects</span>
            </div>
          </div>

          <div className="progress-kpi">
            <CheckCircle2 size={18} />
            <div>
              <strong>{completedMilestones} reached</strong>
              <span>development milestones</span>
            </div>
          </div>

        </div>

      </section>


      {/* =========================================================
          OVERALL PROGRESS
      ========================================================= */}

      <section className="progress-section">

        <div className="progress-section-heading">
          <span className="progress-eyebrow-sm">INTELLIGENCE INDEX</span>
          <h2>Overall progress</h2>
        </div>

        <div className="progress-overview-card">

          <div className="progress-score-block">

            <div className="progress-score-visual">
              <strong>82</strong>
              <span>/ 100</span>
            </div>

            <div>
              <span className="progress-score-label">CAMPUS INTELLIGENCE SCORE</span>
              <div className="progress-score-bar">
                <span style={{ width: "82%" }} />
              </div>
              <div className="progress-score-change">
                <TrendingUp size={15} />
                +12% this semester
              </div>
            </div>

          </div>

          <div className="progress-capability-strip">

            {CAPABILITY_GROWTH.map((cap) => (
              <div key={cap.label} className="progress-cap-item">

                <div className="progress-cap-header">
                  <span>{cap.label}</span>
                  <strong>{cap.current}%</strong>
                </div>

                <div className="progress-cap-bar">
                  <span
                    className={`progress-cap-fill progress-cap-${cap.color}`}
                    style={{ width: `${cap.current}%` }}
                  />
                </div>

                <div className="progress-cap-delta positive">
                  +{cap.current - cap.prev}% from last period
                </div>

              </div>
            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          SKILL DEVELOPMENT
      ========================================================= */}

      <section className="progress-section">

        <div className="progress-section-heading">

          <div>
            <span className="progress-eyebrow-sm">SKILL DEVELOPMENT</span>
            <h2>Skills this semester</h2>
          </div>

          <button
            type="button"
            className="progress-view-link"
            onClick={() => navigate("/student/profile")}
          >
            View full profile
            <ArrowUpRight size={16} />
          </button>

        </div>

        <div className="progress-skills-card">

          {SKILLS.map((skill) => (
            <div key={skill.name} className="progress-skill-row">

              <div className="progress-skill-info">
                <span className="progress-skill-name">{skill.name}</span>
                <span className="progress-skill-cat">{skill.category}</span>
              </div>

              <div className="progress-skill-bar">
                <span style={{ width: `${skill.level}%` }} />
              </div>

              <div className="progress-skill-right">
                <strong>{skill.level}%</strong>
                <span className="skill-growth-badge positive">
                  +{skill.growth}%
                </span>
              </div>

            </div>
          ))}

        </div>

      </section>


      {/* =========================================================
          PROJECT PROGRESS
      ========================================================= */}

      <section className="progress-section">

        <div className="progress-section-heading">

          <div>
            <span className="progress-eyebrow-sm">PROJECT PROGRESS</span>
            <h2>Projects in motion</h2>
          </div>

          <button
            type="button"
            className="progress-view-link"
            onClick={() => navigate("/student/projects")}
          >
            View all projects
            <ArrowUpRight size={16} />
          </button>

        </div>

        <div className="progress-projects-grid">

          {PROJECTS_PROGRESS.map((project) => (
            <button
              key={project.id}
              type="button"
              className="progress-project-card"
              onClick={() => navigate(`/student/projects/${project.id}`)}
            >

              <div className="pprog-top">
                <span className="pprog-category">{project.category}</span>
                <span className={`pprog-status ${project.status.toLowerCase().replace(" ", "-")}`}>
                  {project.status}
                </span>
              </div>

              <h3>{project.title}</h3>

              <div className="pprog-bar-row">
                <div className="pprog-bar">
                  <span style={{ width: `${project.progress}%` }} />
                </div>
                <strong>{project.progress}%</strong>
              </div>

            </button>
          ))}

        </div>

      </section>


      {/* =========================================================
          DEVELOPMENT MILESTONES
      ========================================================= */}

      <section className="progress-section">

        <div className="progress-section-heading">
          <div>
            <span className="progress-eyebrow-sm">JOURNEY</span>
            <h2>Development milestones</h2>
          </div>
          <div className="milestones-count">
            {completedMilestones} / {MILESTONES.length} completed
          </div>
        </div>

        <div className="progress-milestones-card">

          {MILESTONES.map((milestone, idx) => (
            <div
              key={milestone.title}
              className={`progress-milestone ${milestone.completed ? "completed" : "upcoming"}`}
            >

              <div className="pmilestone-line">
                <div className="pmilestone-dot">
                  {milestone.completed
                    ? <CheckCircle2 size={17} />
                    : <Target size={17} />
                  }
                </div>
                {idx < MILESTONES.length - 1 && (
                  <div className={`pmilestone-connector ${milestone.completed ? "done" : ""}`} />
                )}
              </div>

              <div className="pmilestone-content">
                <div className="pmilestone-title-row">
                  <h3>{milestone.title}</h3>
                  <span>{milestone.date}</span>
                </div>
                <p>{milestone.description}</p>
              </div>

            </div>
          ))}

        </div>

      </section>


      {/* =========================================================
          RECENT ACTIVITY
      ========================================================= */}

      <section className="progress-section">

        <div className="progress-section-heading">
          <div>
            <span className="progress-eyebrow-sm">ACTIVITY</span>
            <h2>Recent progress</h2>
          </div>
        </div>

        <div className="progress-activity-card">

          {ACTIVITY.map((item, idx) => (
            <div key={idx} className="progress-activity-item">
              <div className={`progress-activity-dot dot-${ACTIVITY_COLOR[item.type]}`} />
              <span className="progress-activity-label">{item.label}</span>
              <time>{item.time}</time>
            </div>
          ))}

        </div>

      </section>


      {/* =========================================================
          GOALS CTA
      ========================================================= */}

      <section className="progress-cta">

        <div className="progress-cta-icon">
          <Target size={26} />
        </div>

        <div>
          <span>DEVELOPMENT PATH</span>
          <h2>See your goals and next best actions.</h2>
          <p>
            NEXUS builds a personalised development plan from your progress data.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/student/goals")}
        >
          View development path
          <ArrowUpRight size={17} />
        </button>

      </section>

    </div>
  );
}

export default StudentProgress;
