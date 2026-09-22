import "./StudentProjects.css";

import {
  ArrowUpRight,
  Brain,
  CalendarDays,
  CheckCircle2,
  Code2,
  FolderKanban,
  GitBranch,
  Layers3,
  Network,
  Plus,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  UserRoundCheck,
  Users,
  Zap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function StudentProjects() {
  const navigate = useNavigate();

  return (
    <div className="student-projects">

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="projects-hero">

        <div className="projects-hero-content">

          <span className="projects-eyebrow">
            NEXUS / PROJECT INTELLIGENCE
          </span>

          <h1>
            Your work,
            <span> connected.</span>
          </h1>

          <p>
            Build, discover and collaborate on projects across
            your campus. NEXUS connects your work with skills,
            people, mentors and opportunities.
          </p>

          <div className="projects-hero-actions">

            <button
              className="projects-primary-button"
              onClick={() => navigate("/student/projects/upload")}
            >
              <Upload size={17} />
              Upload Project
            </button>

            <button
              className="projects-secondary-button"
              onClick={() => navigate("/student/projects/explore")}
            >
              <Search size={16} />
              Explore Projects
            </button>

            <button
              className="projects-mentor-button"
              onClick={() => navigate("/student/projects/mentors")}
            >
              <UserRoundCheck size={16} />
              Find a Mentor
            </button>

          </div>

        </div>


        <div className="projects-hero-visual">

          <div className="project-orbit orbit-large"></div>
          <div className="project-orbit orbit-medium"></div>
          <div className="project-orbit orbit-small"></div>

          <div className="project-orbit-core">
            <FolderKanban size={29} />
          </div>

          <div className="orbit-node node-one">
            <Code2 size={15} />
          </div>

          <div className="orbit-node node-two">
            <Users size={15} />
          </div>

          <div className="orbit-node node-three">
            <Brain size={15} />
          </div>

        </div>

      </section>


      {/* =========================================================
          PROJECT COMMAND CENTER
      ========================================================= */}

      <section className="projects-section">

        <div className="projects-section-heading">

          <div>
            <span className="projects-section-eyebrow">
              PROJECT COMMAND CENTER
            </span>

            <h2>
              What do you want to do?
            </h2>
          </div>

          <span className="projects-period">
            CAMPUS PROJECT NETWORK
          </span>

        </div>


        <div className="project-actions-grid">

          {/* MY PROJECTS */}

          <button
            className="project-action-card blue-action"
            onClick={() => navigate("/student/projects")}
          >

            <div className="project-action-icon">
              <FolderKanban size={22} />
            </div>

            <div className="project-action-content">

              <span>
                YOUR WORKSPACE
              </span>

              <h3>
                My Projects
              </h3>

              <p>
                Manage your active projects, progress,
                team members and project intelligence.
              </p>

            </div>

            <ArrowUpRight className="project-action-arrow" size={18} />

          </button>


          {/* EXPLORE */}

          <button
            className="project-action-card purple-action"
            onClick={() => navigate("/student/projects/explore")}
          >

            <div className="project-action-icon">
              <Search size={22} />
            </div>

            <div className="project-action-content">

              <span>
                CAMPUS DISCOVERY
              </span>

              <h3>
                Explore Projects
              </h3>

              <p>
                Discover projects created by students across
                departments, domains and technologies.
              </p>

            </div>

            <ArrowUpRight className="project-action-arrow" size={18} />

          </button>


          {/* MENTOR */}

          <button
            className="project-action-card green-action"
            onClick={() => navigate("/student/projects/mentors")}
          >

            <div className="project-action-icon">
              <UserRoundCheck size={22} />
            </div>

            <div className="project-action-content">

              <span>
                PROJECT SUPPORT
              </span>

              <h3>
                Find a Mentor
              </h3>

              <p>
                Request guidance from faculty, senior students
                and approved campus mentors.
              </p>

            </div>

            <ArrowUpRight className="project-action-arrow" size={18} />

          </button>


          {/* UPLOAD */}

          <button
            className="project-action-card orange-action"
            onClick={() => navigate("/student/projects/upload")}
          >

            <div className="project-action-icon">
              <Upload size={22} />
            </div>

            <div className="project-action-content">

              <span>
                CREATE
              </span>

              <h3>
                Upload Project
              </h3>

              <p>
                Publish your project, add your team and let NEXUS
                analyze its Project DNA.
              </p>

            </div>

            <ArrowUpRight className="project-action-arrow" size={18} />

          </button>

        </div>

      </section>


      {/* =========================================================
          PROJECT OVERVIEW
      ========================================================= */}

      <section className="projects-section">

        <div className="projects-section-heading">

          <div>
            <span className="projects-section-eyebrow">
              PROJECT OVERVIEW
            </span>

            <h2>
              Your project activity
            </h2>
          </div>

          <button
            className="projects-view-button"
            onClick={() => navigate("/student/projects")}
          >
            View workspace
            <ArrowUpRight size={16} />
          </button>

        </div>


        <div className="project-metrics-grid">

          <article className="project-metric-card">

            <div className="metric-icon blue">
              <FolderKanban size={19} />
            </div>

            <span className="metric-label">
              ACTIVE PROJECTS
            </span>

            <strong>
              04
            </strong>

            <div className="metric-footer positive">
              <TrendingUp size={14} />
              2 added this semester
            </div>

          </article>


          <article className="project-metric-card">

            <div className="metric-icon green">
              <CheckCircle2 size={19} />
            </div>

            <span className="metric-label">
              COMPLETED
            </span>

            <strong>
              07
            </strong>

            <div className="metric-footer positive">
              <CheckCircle2 size={14} />
              86% completion rate
            </div>

          </article>


          <article className="project-metric-card">

            <div className="metric-icon purple">
              <Layers3 size={19} />
            </div>

            <span className="metric-label">
              SKILLS DEMONSTRATED
            </span>

            <strong>
              18
            </strong>

            <div className="metric-footer">
              Across 7 capability areas
            </div>

          </article>


          <article className="project-metric-card">

            <div className="metric-icon orange">
              <Network size={19} />
            </div>

            <span className="metric-label">
              COLLABORATION
            </span>

            <strong>
              78%
            </strong>

            <div className="metric-footer positive">
              <TrendingUp size={14} />
              +9% this semester
            </div>

          </article>

        </div>

      </section>


      {/* =========================================================
          ACTIVE PROJECTS
      ========================================================= */}

      <section className="projects-section">

        <div className="projects-section-heading">

          <div>
            <span className="projects-section-eyebrow">
              ACTIVE PROJECTS
            </span>

            <h2>
              Projects in motion
            </h2>
          </div>

          <button
            className="projects-view-button"
            onClick={() => navigate("/student/projects")}
          >
            View all projects
            <ArrowUpRight size={16} />
          </button>

        </div>


        <div className="active-projects-grid">

          {/* NEXUS */}

          <article className="project-card project-card-featured">

            <div className="project-card-top">

              <div className="project-type">
                <Sparkles size={15} />
                AI / CAMPUS
              </div>

              <span className="project-status active">
                ACTIVE
              </span>

            </div>

            <div className="project-card-icon nexus">
              <Network size={24} />
            </div>

            <h3>
              NEXUS
            </h3>

            <p>
              AI-powered Campus Intelligence System connecting
              student development, skills, projects, knowledge
              and institutional intelligence.
            </p>

            <div className="project-progress">

              <div className="project-progress-heading">
                <span>
                  PROJECT PROGRESS
                </span>

                <strong>
                  72%
                </strong>
              </div>

              <div className="project-progress-bar">
                <span style={{ width: "72%" }}></span>
              </div>

            </div>

            <div className="project-tags">
              <span>React</span>
              <span>FastAPI</span>
              <span>AI</span>
              <span>PostgreSQL</span>
            </div>

            <div className="project-card-footer">

              <div className="project-team">

                <div className="team-avatar">
                  S
                </div>

                <div className="team-avatar second">
                  V
                </div>

                <span>
                  4 members
                </span>

              </div>

              <button
                className="project-open-button"
                onClick={() => navigate("/student/projects/nexus")}
              >
                Open
                <ArrowUpRight size={15} />
              </button>

            </div>

          </article>


          {/* AI ACCOUNTABILITY */}

          <article className="project-card">

            <div className="project-card-top">

              <div className="project-type">
                <Brain size={15} />
                AI / TRUST
              </div>

              <span className="project-status active">
                ACTIVE
              </span>

            </div>

            <div className="project-card-icon purple">
              <Brain size={24} />
            </div>

            <h3>
              AI Agent Accountability
            </h3>

            <p>
              Trust infrastructure for tracking AI agent
              decisions, actions and accountability through
              verifiable records.
            </p>

            <div className="project-progress">

              <div className="project-progress-heading">
                <span>
                  PROJECT PROGRESS
                </span>

                <strong>
                  48%
                </strong>
              </div>

              <div className="project-progress-bar purple-bar">
                <span style={{ width: "48%" }}></span>
              </div>

            </div>

            <div className="project-tags">
              <span>FastAPI</span>
              <span>SQLite</span>
              <span>Trust Engine</span>
            </div>

            <div className="project-card-footer">

              <div className="project-team">

                <div className="team-avatar">
                  S
                </div>

                <span>
                  3 members
                </span>

              </div>

              <button
                className="project-open-button"
                onClick={() =>
                  navigate("/student/projects/ai-agent-accountability")
                }
              >
                Open
                <ArrowUpRight size={15} />
              </button>

            </div>

          </article>


          {/* CAMPUS RESEARCH */}

          <article className="project-card">

            <div className="project-card-top">

              <div className="project-type">
                <Target size={15} />
                DATA / RESEARCH
              </div>

              <span className="project-status planning">
                PLANNING
              </span>

            </div>

            <div className="project-card-icon green">
              <Target size={24} />
            </div>

            <h3>
              Campus Intelligence Research
            </h3>

            <p>
              Exploring how campus data can reveal patterns
              in student development, collaboration and
              institutional knowledge.
            </p>

            <div className="project-progress">

              <div className="project-progress-heading">
                <span>
                  PROJECT PROGRESS
                </span>

                <strong>
                  24%
                </strong>
              </div>

              <div className="project-progress-bar green-bar">
                <span style={{ width: "24%" }}></span>
              </div>

            </div>

            <div className="project-tags">
              <span>Research</span>
              <span>Data</span>
              <span>Analytics</span>
            </div>

            <div className="project-card-footer">

              <div className="project-team">

                <div className="team-avatar">
                  S
                </div>

                <span>
                  Solo project
                </span>

              </div>

              <button
                className="project-open-button"
                onClick={() =>
                  navigate("/student/projects/campus-intelligence")
                }
              >
                Open
                <ArrowUpRight size={15} />
              </button>

            </div>

          </article>

        </div>

      </section>


      {/* =========================================================
          MENTOR ASSISTANCE
      ========================================================= */}

      <section className="projects-section">

        <div className="projects-section-heading">

          <div>
            <span className="projects-section-eyebrow">
              PROJECT SUPPORT
            </span>

            <h2>
              Need help moving a project forward?
            </h2>
          </div>

          <button
            className="projects-view-button"
            onClick={() => navigate("/student/projects/mentors")}
          >
            Explore mentors
            <ArrowUpRight size={16} />
          </button>

        </div>


        <div className="mentor-support-card">

          <div className="mentor-support-visual">

            <div className="mentor-main-icon">
              <UserRoundCheck size={28} />
            </div>

            <div className="mentor-floating-icon mentor-one">
              <Brain size={15} />
            </div>

            <div className="mentor-floating-icon mentor-two">
              <Code2 size={15} />
            </div>

            <div className="mentor-floating-icon mentor-three">
              <Users size={15} />
            </div>

          </div>


          <div className="mentor-support-content">

            <span>
              NEXUS MENTOR NETWORK
            </span>

            <h3>
              Get the right guidance at the right stage.
            </h3>

            <p>
              Tell NEXUS what you're building and where you're
              stuck. It can identify relevant faculty, senior
              students and approved mentors who may be able to
              assist your project.
            </p>

            <div className="mentor-support-tags">

              <span>
                Faculty mentors
              </span>

              <span>
                Senior students
              </span>

              <span>
                Technical guidance
              </span>

              <span>
                Research support
              </span>

            </div>

            <button
              className="mentor-request-button"
              onClick={() => navigate("/student/projects/mentors")}
            >
              Request a mentor
              <ArrowUpRight size={16} />
            </button>

          </div>

        </div>

      </section>


      {/* =========================================================
          PROJECT DNA
      ========================================================= */}

      <section className="projects-section">

        <div className="projects-section-heading">

          <div>

            <span className="projects-section-eyebrow">
              PROJECT DNA
            </span>

            <h2>
              What your projects say about you
            </h2>

          </div>

          <span className="projects-period">
            AI ANALYSIS
          </span>

        </div>


        <div className="project-dna-layout">

          <article className="dna-summary-card">

            <div className="dna-icon">
              <Zap size={21} />
            </div>

            <span className="dna-label">
              PROJECT INTELLIGENCE
            </span>

            <h3>
              Builder profile
            </h3>

            <p>
              Your projects show a strong tendency toward
              building practical technology systems that
              combine AI, data and real-world problems.
            </p>

            <div className="dna-score">

              <strong>
                84
              </strong>

              <span>
                / 100
              </span>

            </div>

            <div className="dna-score-bar">
              <span></span>
            </div>

          </article>


          <div className="dna-capabilities">

            <div className="dna-capability">

              <div className="dna-capability-icon blue">
                <Code2 size={18} />
              </div>

              <div className="dna-capability-content">

                <div>
                  <strong>
                    Technical depth
                  </strong>

                  <span>
                    86%
                  </span>
                </div>

                <div className="dna-bar">
                  <span style={{ width: "86%" }}></span>
                </div>

              </div>

            </div>


            <div className="dna-capability">

              <div className="dna-capability-icon purple">
                <Brain size={18} />
              </div>

              <div className="dna-capability-content">

                <div>
                  <strong>
                    Problem solving
                  </strong>

                  <span>
                    82%
                  </span>
                </div>

                <div className="dna-bar">
                  <span style={{ width: "82%" }}></span>
                </div>

              </div>

            </div>


            <div className="dna-capability">

              <div className="dna-capability-icon green">
                <Users size={18} />
              </div>

              <div className="dna-capability-content">

                <div>
                  <strong>
                    Collaboration
                  </strong>

                  <span>
                    76%
                  </span>
                </div>

                <div className="dna-bar">
                  <span style={{ width: "76%" }}></span>
                </div>

              </div>

            </div>


            <div className="dna-capability">

              <div className="dna-capability-icon orange">
                <Target size={18} />
              </div>

              <div className="dna-capability-content">

                <div>
                  <strong>
                    Real-world impact
                  </strong>

                  <span>
                    79%
                  </span>
                </div>

                <div className="dna-bar">
                  <span style={{ width: "79%" }}></span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          RECENT ACTIVITY
      ========================================================= */}

      <section className="projects-section">

        <div className="projects-section-heading">

          <div>

            <span className="projects-section-eyebrow">
              PROJECT ACTIVITY
            </span>

            <h2>
              Recent work
            </h2>

          </div>

        </div>


        <div className="project-activity-card">

          <div className="activity-row">

            <div className="activity-icon blue">
              <GitBranch size={17} />
            </div>

            <div className="activity-content">

              <strong>
                NEXUS backend milestone completed
              </strong>

              <span>
                Database connection and migration workflow completed.
              </span>

            </div>

            <time>
              Today
            </time>

          </div>


          <div className="activity-row">

            <div className="activity-icon purple">
              <Code2 size={17} />
            </div>

            <div className="activity-content">

              <strong>
                Intelligence interface updated
              </strong>

              <span>
                Student Intelligence capability map redesigned.
              </span>

            </div>

            <time>
              Yesterday
            </time>

          </div>


          <div className="activity-row">

            <div className="activity-icon green">
              <Users size={17} />
            </div>

            <div className="activity-content">

              <strong>
                New collaborator added
              </strong>

              <span>
                A new team member joined the NEXUS project.
              </span>

            </div>

            <time>
              2 days ago
            </time>

          </div>


          <div className="activity-row">

            <div className="activity-icon orange">
              <CalendarDays size={17} />
            </div>

            <div className="activity-content">

              <strong>
                Project review scheduled
              </strong>

              <span>
                NEXUS project review is scheduled for this week.
              </span>

            </div>

            <time>
              3 days ago
            </time>

          </div>

        </div>

      </section>


      {/* =========================================================
          DISCOVER PROJECTS
      ========================================================= */}

      <section className="projects-section projects-final-section">

        <div className="projects-section-heading">

          <div>

            <span className="projects-section-eyebrow">
              NEXUS DISCOVERY
            </span>

            <h2>
              Projects worth exploring
            </h2>

          </div>

          <button
            className="projects-view-button"
            onClick={() => navigate("/student/projects/explore")}
          >
            Explore campus projects
            <ArrowUpRight size={16} />
          </button>

        </div>


        <div className="recommended-projects-grid">

          <article
            className="recommended-project"
            onClick={() => navigate("/student/projects/explore")}
          >

            <div className="recommended-icon blue">
              <Network size={20} />
            </div>

            <div>

              <span>
                92% MATCH
              </span>

              <h3>
                Smart Campus Analytics
              </h3>

              <p>
                Build predictive insights from campus activity data.
              </p>

            </div>

            <ArrowUpRight size={17} />

          </article>


          <article
            className="recommended-project"
            onClick={() => navigate("/student/projects/explore")}
          >

            <div className="recommended-icon purple">
              <Brain size={20} />
            </div>

            <div>

              <span>
                87% MATCH
              </span>

              <h3>
                AI Research Lab
              </h3>

              <p>
                Collaborate on applied AI research projects.
              </p>

            </div>

            <ArrowUpRight size={17} />

          </article>


          <article
            className="recommended-project"
            onClick={() => navigate("/student/projects/explore")}
          >

            <div className="recommended-icon green">
              <Users size={20} />
            </div>

            <div>

              <span>
                81% MATCH
              </span>

              <h3>
                Open Source Campus
              </h3>

              <p>
                Contribute to student-built technology projects.
              </p>

            </div>

            <ArrowUpRight size={17} />

          </article>

        </div>

      </section>

    </div>
  );
}

export default StudentProjects;


