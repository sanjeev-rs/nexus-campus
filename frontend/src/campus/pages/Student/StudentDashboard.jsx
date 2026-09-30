import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Bot,
  Brain,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ChevronRight,
  CircleCheck,
  Compass,
  FolderKanban,
  GraduationCap,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import "./StudentDashboard.css";
import { getRecommendedKnowledge } from "./Knowledge/knowledgeData";

/* =========================================================
   USER SESSION HELPER
   ========================================================= */

function getStoredStudentUser() {
  try {
    const stored = localStorage.getItem("nexusAuth");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        name: parsed.name || "Alex Chen",
        email: parsed.email || "student@nexus.edu",
      };
    }
  } catch {
    // Fallback
  }
  return {
    name: "Alex Chen",
    email: "student@nexus.edu",
  };
}

function StudentDashboard() {
  const navigate = useNavigate();
  const studentUser = useMemo(() => getStoredStudentUser(), []);
  const recommendedKnowledge = useMemo(() => getRecommendedKnowledge(), []);

  // Dynamic time greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }, []);

  return (
    <div className="student-dashboard">
      {/* =========================================================
          WELCOME / STUDENT INTELLIGENCE HERO
      ========================================================= */}
      <section className="student-welcome">
        <div className="student-welcome-glow" />

        <div className="student-welcome-content">
          <span className="student-eyebrow">
            STUDENT INTELLIGENCE
          </span>

          <h1>
            {greeting},{" "}
            <span className="welcome-name">{studentUser.name}.</span>
          </h1>

          <p>
            Your skills, projects, opportunities and campus intelligence —
            connected in one place.
          </p>

          {/* QUICK SHORTCUTS STRIP */}
          <div className="student-quick-shortcuts">
            <button
              type="button"
              className="shortcut-chip"
              onClick={() => navigate("/student/goals")}
            >
              <Target size={14} />
              <span>Development Path</span>
            </button>
            <button
              type="button"
              className="shortcut-chip"
              onClick={() => navigate("/student/ai-mentor")}
            >
              <Bot size={14} />
              <span>AI Mentor</span>
            </button>
            <button
              type="button"
              className="shortcut-chip"
              onClick={() => navigate("/student/projects/explore")}
            >
              <Compass size={14} />
              <span>Project Explorer</span>
            </button>
            <button
              type="button"
              className="shortcut-chip"
              onClick={() => navigate("/student/community")}
            >
              <Users size={14} />
              <span>Community</span>
            </button>
          </div>
        </div>

        <div className="welcome-orbit">
          <div className="orbit-ring orbit-ring-one" />
          <div className="orbit-ring orbit-ring-two" />
          <div className="orbit-ring orbit-ring-three" />
          <div className="orbit-core">
            <Sparkles size={22} />
          </div>
        </div>
      </section>

      {/* =========================================================
          NEXT BEST ACTION
      ========================================================= */}
      <section className="student-nba-card">
        <div className="nba-card-content">
          <div className="nba-badge">
            <Sparkles size={14} />
            <span>NEXT BEST ACTION • AI INTELLIGENCE</span>
          </div>
          <h3>Sprint 4: Validate predictive models on North Campus sensor logs</h3>
          <p>
            Your team has pushed baseline neural network models for Smart Campus Analytics.
            Validating inference latency on the live testbed is required to complete
            Milestone 3 before Friday review.
          </p>
        </div>
        <div className="nba-card-actions">
          <button
            type="button"
            className="nx-btn-primary sm"
            onClick={() => navigate("/student/projects/explore/smart-campus-analytics")}
          >
            <span>Proceed to Project</span>
            <ChevronRight size={15} />
          </button>
          <button
            type="button"
            className="nx-btn-secondary sm"
            onClick={() => navigate("/student/goals")}
          >
            <Target size={14} />
            <span>Review Milestone</span>
          </button>
        </div>
      </section>

      {/* =========================================================
          INTELLIGENCE OVERVIEW (KPIS)
      ========================================================= */}
      <section className="student-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">YOUR INTELLIGENCE</span>
            <h2>At a glance</h2>
          </div>
          <span className="section-period">UPDATED JUST NOW</span>
        </div>

        <div className="student-kpis">
          {/* KPI 01: Intelligence Score */}
          <article
            className="student-kpi kpi-blue clickable"
            onClick={() => navigate("/student/intelligence")}
            style={{ cursor: "pointer" }}
            title="View Intelligence Details"
          >
            <div className="kpi-top">
              <div className="kpi-icon">
                <Brain size={20} />
              </div>
              <span className="kpi-trend positive">+12%</span>
            </div>
            <span className="kpi-label">Intelligence Score</span>
            <strong className="kpi-value">82</strong>
            <div className="kpi-progress">
              <span style={{ width: "82%" }} />
            </div>
            <span className="kpi-description">
              Your overall campus intelligence profile
            </span>
          </article>

          {/* KPI 02: Skill Growth */}
          <article
            className="student-kpi kpi-purple clickable"
            onClick={() => navigate("/student/progress")}
            style={{ cursor: "pointer" }}
            title="View Progress & Skills"
          >
            <div className="kpi-top">
              <div className="kpi-icon">
                <ChartNoAxesCombined size={20} />
              </div>
              <span className="kpi-trend positive">+8%</span>
            </div>
            <span className="kpi-label">Skill Growth</span>
            <strong className="kpi-value">74%</strong>
            <div className="kpi-progress">
              <span style={{ width: "74%" }} />
            </div>
            <span className="kpi-description">
              Progress across your tracked capabilities
            </span>
          </article>

          {/* KPI 03: Active Projects */}
          <article
            className="student-kpi kpi-green clickable"
            onClick={() => navigate("/student/projects")}
            style={{ cursor: "pointer" }}
            title="View All Projects"
          >
            <div className="kpi-top">
              <div className="kpi-icon">
                <FolderKanban size={20} />
              </div>
              <span className="kpi-neutral">ACTIVE</span>
            </div>
            <span className="kpi-label">Active Projects</span>
            <strong className="kpi-value">04</strong>
            <div className="kpi-mini-stats">
              <span>
                <CircleCheck size={14} /> 2 completed
              </span>
              <span>2 ongoing</span>
            </div>
            <span className="kpi-description">
              Projects contributing to your profile
            </span>
          </article>

          {/* KPI 04: Opportunities */}
          <article
            className="student-kpi kpi-orange clickable"
            onClick={() => navigate("/student/projects/mentors")}
            style={{ cursor: "pointer" }}
            title="Explore Mentor Network & Opportunities"
          >
            <div className="kpi-top">
              <div className="kpi-icon">
                <Target size={20} />
              </div>
              <span className="kpi-trend positive">03</span>
            </div>
            <span className="kpi-label">Opportunities</span>
            <strong className="kpi-value">12</strong>
            <div className="opportunity-indicator">
              <span />
              <span />
              <span />
              <span />
            </div>
            <span className="kpi-description">
              Opportunities matched to your profile
            </span>
          </article>
        </div>
      </section>

      {/* =========================================================
          MAIN INTELLIGENCE GRID
      ========================================================= */}
      <section className="student-main-grid">
        {/* SKILL INTELLIGENCE */}
        <article className="dashboard-card skill-card">
          <div className="card-top-glow" />

          <div className="dashboard-card-header">
            <div>
              <span className="card-eyebrow">SKILL INTELLIGENCE</span>
              <h3>Your capabilities</h3>
            </div>
            <button
              className="card-action"
              onClick={() => navigate("/student/profile")}
            >
              View profile
              <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="skill-list">
            <div className="skill-row">
              <div className="skill-info">
                <span>Python</span>
                <strong>86%</strong>
              </div>
              <div className="skill-bar">
                <span style={{ width: "86%" }} />
              </div>
            </div>

            <div className="skill-row">
              <div className="skill-info">
                <span>Data Analysis</span>
                <strong>79%</strong>
              </div>
              <div className="skill-bar">
                <span style={{ width: "79%" }} />
              </div>
            </div>

            <div className="skill-row">
              <div className="skill-info">
                <span>React</span>
                <strong>72%</strong>
              </div>
              <div className="skill-bar">
                <span style={{ width: "72%" }} />
              </div>
            </div>

            <div className="skill-row">
              <div className="skill-info">
                <span>Machine Learning</span>
                <strong>64%</strong>
              </div>
              <div className="skill-bar">
                <span style={{ width: "64%" }} />
              </div>
            </div>

            <div className="skill-row">
              <div className="skill-info">
                <span>Communication</span>
                <strong>61%</strong>
              </div>
              <div className="skill-bar">
                <span style={{ width: "61%" }} />
              </div>
            </div>
          </div>

          <div className="skill-insight">
            <div className="insight-icon">
              <TrendingUp size={18} />
            </div>
            <div>
              <strong>Growth opportunity</strong>
              <p>
                Machine Learning is currently your highest-impact development area.
              </p>
            </div>
          </div>
        </article>

        {/* PROJECT DNA */}
        <article className="dashboard-card projects-card">
          <div className="card-top-glow" />

          <div className="dashboard-card-header">
            <div>
              <span className="card-eyebrow">PROJECT DNA</span>
              <h3>Active projects</h3>
            </div>
            <button
              className="card-action"
              onClick={() => navigate("/student/projects")}
            >
              View all
              <ArrowUpRight size={17} />
            </button>
          </div>

          <div className="project-list">
            <button
              className="project-item"
              type="button"
              onClick={() => navigate("/student/projects/explore/smart-campus-analytics")}
            >
              <div className="project-symbol blue">
                <Brain size={19} />
              </div>
              <div className="project-content">
                <div className="project-title-row">
                  <strong>Smart Campus Analytics</strong>
                  <span className="project-status">ACTIVE</span>
                </div>
                <p>Campus Intelligence System</p>
                <div className="project-meta">
                  <span>AI / Data</span>
                  <span>78% complete</span>
                </div>
              </div>
              <ChevronRight size={18} />
            </button>

            <button
              className="project-item"
              type="button"
              onClick={() => navigate("/student/projects/explore/ai-research-lab")}
            >
              <div className="project-symbol purple">
                <ChartNoAxesCombined size={19} />
              </div>
              <div className="project-content">
                <div className="project-title-row">
                  <strong>Intelligence Engine</strong>
                  <span className="project-status">ACTIVE</span>
                </div>
                <p>Student skill intelligence module</p>
                <div className="project-meta">
                  <span>Research</span>
                  <span>54% complete</span>
                </div>
              </div>
              <ChevronRight size={18} />
            </button>

            <button
              className="project-item"
              type="button"
              onClick={() => navigate("/student/projects/explore/open-source-campus")}
            >
              <div className="project-symbol green">
                <Users size={19} />
              </div>
              <div className="project-content">
                <div className="project-title-row">
                  <strong>Campus Connect</strong>
                  <span className="project-status">ACTIVE</span>
                </div>
                <p>Student collaboration initiative</p>
                <div className="project-meta">
                  <span>Community</span>
                  <span>31% complete</span>
                </div>
              </div>
              <ChevronRight size={18} />
            </button>
          </div>
        </article>
      </section>

      {/* =========================================================
          OPPORTUNITIES
      ========================================================= */}
      <section className="student-section opportunities-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">INTELLIGENCE MATCH</span>
            <h2>Recommended for you</h2>
          </div>
          <button
            className="section-link"
            onClick={() => navigate("/student/projects/mentors")}
          >
            Explore opportunities
            <ArrowUpRight size={17} />
          </button>
        </div>

        <div className="opportunity-grid">
          <article
            className="opportunity-card clickable"
            onClick={() => navigate("/student/projects/mentors")}
            style={{ cursor: "pointer" }}
          >
            <div className="opportunity-top">
              <div className="opportunity-icon">
                <GraduationCap size={21} />
              </div>
              <span>94% MATCH</span>
            </div>
            <div className="opportunity-content">
              <span className="opportunity-type">INTERNSHIP</span>
              <h3>AI Research Intern</h3>
              <p>
                Research opportunity aligned with your AI, Python and data skills.
              </p>
            </div>
            <div className="opportunity-footer">
              <span>AI Research</span>
              <ArrowUpRight size={18} />
            </div>
          </article>

          <article
            className="opportunity-card clickable"
            onClick={() => navigate("/student/projects/explore/smart-campus-analytics")}
            style={{ cursor: "pointer" }}
          >
            <div className="opportunity-top">
              <div className="opportunity-icon">
                <BriefcaseBusiness size={21} />
              </div>
              <span>88% MATCH</span>
            </div>
            <div className="opportunity-content">
              <span className="opportunity-type">PROJECT</span>
              <h3>Smart Campus Initiative</h3>
              <p>
                Collaborate with students building intelligent campus solutions.
              </p>
            </div>
            <div className="opportunity-footer">
              <span>Campus Innovation</span>
              <ArrowUpRight size={18} />
            </div>
          </article>

          <article
            className="opportunity-card clickable"
            onClick={() => navigate("/student/community")}
            style={{ cursor: "pointer" }}
          >
            <div className="opportunity-top">
              <div className="opportunity-icon">
                <Users size={21} />
              </div>
              <span>81% MATCH</span>
            </div>
            <div className="opportunity-content">
              <span className="opportunity-type">COLLABORATION</span>
              <h3>Data Science Community</h3>
              <p>
                Connect with students working across data science and machine learning.
              </p>
            </div>
            <div className="opportunity-footer">
              <span>Student Network</span>
              <ArrowUpRight size={18} />
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================
          CAMPUS KNOWLEDGE FOR YOU (GROUNDED IN PHASE 2)
      ========================================================= */}
      <section className="student-section knowledge-feed-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">CAMPUS KNOWLEDGE REPOSITORY</span>
            <h2>Recommended knowledge assets</h2>
          </div>
          <button
            className="section-link"
            onClick={() => navigate("/student/knowledge")}
          >
            Explore repository
            <ArrowUpRight size={17} />
          </button>
        </div>

        <div className="dashboard-knowledge-grid">
          {recommendedKnowledge.map((item) => (
            <article
              className="dashboard-knowledge-card clickable"
              key={item.slug}
              onClick={() => navigate(`/student/knowledge/item/${item.slug}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="d-knowledge-top">
                <span className={`d-knowledge-type ${item.accent || "blue"}`}>
                  {item.type}
                </span>
                <span className="d-knowledge-dept">{item.department}</span>
              </div>
              <h4>{item.title}</h4>
              <p>{item.subtitle || item.description}</p>
              <div className="d-knowledge-footer">
                <div className="d-knowledge-techs">
                  {(item.technologies || []).slice(0, 3).map((tech) => (
                    <span key={tech} className="d-tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <ArrowUpRight size={16} className="d-arrow" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================================================
          CAMPUS PULSE
      ========================================================= */}
      <section className="student-section activity-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">CAMPUS PULSE</span>
            <h2>What's happening</h2>
          </div>
        </div>

        <div className="activity-card">
          <div className="activity-item">
            <div className="activity-dot blue-dot" />
            <div className="activity-text">
              <strong>24 students joined a new project</strong>
              <span>Campus Project Network</span>
            </div>
            <time>12 min</time>
          </div>

          <div className="activity-item">
            <div className="activity-dot purple-dot" />
            <div className="activity-text">
              <strong>New AI research opportunity available</strong>
              <span>Research & Innovation</span>
            </div>
            <time>34 min</time>
          </div>

          <div className="activity-item">
            <div className="activity-dot green-dot" />
            <div className="activity-text">
              <strong>Your project profile was updated</strong>
              <span>Project DNA</span>
            </div>
            <time>1 hr</time>
          </div>

          <div className="activity-item">
            <div className="activity-dot orange-dot" />
            <div className="activity-text">
              <strong>8 new opportunities matched your skills</strong>
              <span>Intelligence Match</span>
            </div>
            <time>2 hrs</time>
          </div>
        </div>
      </section>
    </div>
  );
}

export default StudentDashboard;