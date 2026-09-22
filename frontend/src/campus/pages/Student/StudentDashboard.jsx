import "./StudentDashboard.css";

import {
  ArrowUpRight,
  Brain,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ChevronRight,
  CircleCheck,
  FolderKanban,
  GraduationCap,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

function StudentDashboard() {
  return (
    <div className="student-dashboard">

      {/* =========================================================
          WELCOME / STUDENT INTELLIGENCE
      ========================================================= */}

      <section className="student-welcome">

        <div className="student-welcome-glow"></div>

        <div className="student-welcome-content">

          <span className="student-eyebrow">
            STUDENT INTELLIGENCE
          </span>

          <h1>
            Good evening.
            <span> Here's your campus.</span>
          </h1>

          <p>
            Your skills, projects, opportunities and campus intelligence —
            connected in one place.
          </p>

        </div>

        <div className="welcome-orbit">

          <div className="orbit-ring orbit-ring-one"></div>

          <div className="orbit-ring orbit-ring-two"></div>

          <div className="orbit-ring orbit-ring-three"></div>

          <div className="orbit-core">
            <Sparkles size={22} />
          </div>

        </div>

      </section>


      {/* =========================================================
          INTELLIGENCE OVERVIEW
      ========================================================= */}

      <section className="student-section">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              YOUR INTELLIGENCE
            </span>

            <h2>
              At a glance
            </h2>

          </div>

          <span className="section-period">
            UPDATED JUST NOW
          </span>

        </div>


        <div className="student-kpis">

          {/* KPI 01 */}

          <article className="student-kpi kpi-blue">

            <div className="kpi-top">

              <div className="kpi-icon">
                <Brain size={20} />
              </div>

              <span className="kpi-trend positive">
                +12%
              </span>

            </div>

            <span className="kpi-label">
              Intelligence Score
            </span>

            <strong className="kpi-value">
              82
            </strong>

            <div className="kpi-progress">
              <span style={{ width: "82%" }}></span>
            </div>

            <span className="kpi-description">
              Your overall campus intelligence profile
            </span>

          </article>


          {/* KPI 02 */}

          <article className="student-kpi kpi-purple">

            <div className="kpi-top">

              <div className="kpi-icon">
                <ChartNoAxesCombined size={20} />
              </div>

              <span className="kpi-trend positive">
                +8%
              </span>

            </div>

            <span className="kpi-label">
              Skill Growth
            </span>

            <strong className="kpi-value">
              74%
            </strong>

            <div className="kpi-progress">
              <span style={{ width: "74%" }}></span>
            </div>

            <span className="kpi-description">
              Progress across your tracked capabilities
            </span>

          </article>


          {/* KPI 03 */}

          <article className="student-kpi kpi-green">

            <div className="kpi-top">

              <div className="kpi-icon">
                <FolderKanban size={20} />
              </div>

              <span className="kpi-neutral">
                ACTIVE
              </span>

            </div>

            <span className="kpi-label">
              Active Projects
            </span>

            <strong className="kpi-value">
              04
            </strong>

            <div className="kpi-mini-stats">

              <span>
                <CircleCheck size={14} />
                2 completed
              </span>

              <span>
                2 ongoing
              </span>

            </div>

            <span className="kpi-description">
              Projects contributing to your profile
            </span>

          </article>


          {/* KPI 04 */}

          <article className="student-kpi kpi-orange">

            <div className="kpi-top">

              <div className="kpi-icon">
                <Target size={20} />
              </div>

              <span className="kpi-trend positive">
                03
              </span>

            </div>

            <span className="kpi-label">
              Opportunities
            </span>

            <strong className="kpi-value">
              12
            </strong>

            <div className="opportunity-indicator">

              <span></span>
              <span></span>
              <span></span>
              <span></span>

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


        {/* =====================================================
            SKILL INTELLIGENCE
        ===================================================== */}

        <article className="dashboard-card skill-card">

          <div className="card-top-glow"></div>

          <div className="dashboard-card-header">

            <div>

              <span className="card-eyebrow">
                SKILL INTELLIGENCE
              </span>

              <h3>
                Your capabilities
              </h3>

            </div>

            <button className="card-action">
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
                <span style={{ width: "86%" }}></span>
              </div>

            </div>


            <div className="skill-row">

              <div className="skill-info">
                <span>Data Analysis</span>
                <strong>79%</strong>
              </div>

              <div className="skill-bar">
                <span style={{ width: "79%" }}></span>
              </div>

            </div>


            <div className="skill-row">

              <div className="skill-info">
                <span>React</span>
                <strong>72%</strong>
              </div>

              <div className="skill-bar">
                <span style={{ width: "72%" }}></span>
              </div>

            </div>


            <div className="skill-row">

              <div className="skill-info">
                <span>Machine Learning</span>
                <strong>64%</strong>
              </div>

              <div className="skill-bar">
                <span style={{ width: "64%" }}></span>
              </div>

            </div>


            <div className="skill-row">

              <div className="skill-info">
                <span>Communication</span>
                <strong>61%</strong>
              </div>

              <div className="skill-bar">
                <span style={{ width: "61%" }}></span>
              </div>

            </div>

          </div>


          <div className="skill-insight">

            <div className="insight-icon">
              <TrendingUp size={18} />
            </div>

            <div>

              <strong>
                Growth opportunity
              </strong>

              <p>
                Machine Learning is currently your highest-impact
                development area.
              </p>

            </div>

          </div>

        </article>


        {/* =====================================================
            PROJECT DNA
        ===================================================== */}

        <article className="dashboard-card projects-card">

          <div className="card-top-glow"></div>

          <div className="dashboard-card-header">

            <div>

              <span className="card-eyebrow">
                PROJECT DNA
              </span>

              <h3>
                Active projects
              </h3>

            </div>

            <button className="card-action">
              View all
              <ArrowUpRight size={17} />
            </button>

          </div>


          <div className="project-list">


            <div className="project-item">

              <div className="project-symbol blue">
                <Brain size={19} />
              </div>

              <div className="project-content">

                <div className="project-title-row">

                  <strong>
                    NEXUS
                  </strong>

                  <span className="project-status">
                    ACTIVE
                  </span>

                </div>

                <p>
                  Campus Intelligence System
                </p>

                <div className="project-meta">

                  <span>
                    AI / Data
                  </span>

                  <span>
                    78% complete
                  </span>

                </div>

              </div>

              <ChevronRight size={18} />

            </div>


            <div className="project-item">

              <div className="project-symbol purple">
                <ChartNoAxesCombined size={19} />
              </div>

              <div className="project-content">

                <div className="project-title-row">

                  <strong>
                    Intelligence Engine
                  </strong>

                  <span className="project-status">
                    ACTIVE
                  </span>

                </div>

                <p>
                  Student skill intelligence module
                </p>

                <div className="project-meta">

                  <span>
                    Research
                  </span>

                  <span>
                    54% complete
                  </span>

                </div>

              </div>

              <ChevronRight size={18} />

            </div>


            <div className="project-item">

              <div className="project-symbol green">
                <Users size={19} />
              </div>

              <div className="project-content">

                <div className="project-title-row">

                  <strong>
                    Campus Connect
                  </strong>

                  <span className="project-status">
                    ACTIVE
                  </span>

                </div>

                <p>
                  Student collaboration initiative
                </p>

                <div className="project-meta">

                  <span>
                    Community
                  </span>

                  <span>
                    31% complete
                  </span>

                </div>

              </div>

              <ChevronRight size={18} />

            </div>

          </div>

        </article>

      </section>


      {/* =========================================================
          OPPORTUNITIES
      ========================================================= */}

      <section className="student-section opportunities-section">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              INTELLIGENCE MATCH
            </span>

            <h2>
              Recommended for you
            </h2>

          </div>

          <button className="section-link">
            Explore opportunities
            <ArrowUpRight size={17} />
          </button>

        </div>


        <div className="opportunity-grid">


          <article className="opportunity-card">

            <div className="opportunity-top">

              <div className="opportunity-icon">
                <GraduationCap size={21} />
              </div>

              <span>
                94% MATCH
              </span>

            </div>

            <div className="opportunity-content">

              <span className="opportunity-type">
                INTERNSHIP
              </span>

              <h3>
                AI Research Intern
              </h3>

              <p>
                Research opportunity aligned with your AI,
                Python and data skills.
              </p>

            </div>

            <div className="opportunity-footer">

              <span>
                AI Research
              </span>

              <ArrowUpRight size={18} />

            </div>

          </article>


          <article className="opportunity-card">

            <div className="opportunity-top">

              <div className="opportunity-icon">
                <BriefcaseBusiness size={21} />
              </div>

              <span>
                88% MATCH
              </span>

            </div>

            <div className="opportunity-content">

              <span className="opportunity-type">
                PROJECT
              </span>

              <h3>
                Smart Campus Initiative
              </h3>

              <p>
                Collaborate with students building
                intelligent campus solutions.
              </p>

            </div>

            <div className="opportunity-footer">

              <span>
                Campus Innovation
              </span>

              <ArrowUpRight size={18} />

            </div>

          </article>


          <article className="opportunity-card">

            <div className="opportunity-top">

              <div className="opportunity-icon">
                <Users size={21} />
              </div>

              <span>
                81% MATCH
              </span>

            </div>

            <div className="opportunity-content">

              <span className="opportunity-type">
                COLLABORATION
              </span>

              <h3>
                Data Science Community
              </h3>

              <p>
                Connect with students working across
                data science and machine learning.
              </p>

            </div>

            <div className="opportunity-footer">

              <span>
                Student Network
              </span>

              <ArrowUpRight size={18} />

            </div>

          </article>

        </div>

      </section>


      {/* =========================================================
          CAMPUS PULSE
      ========================================================= */}

      <section className="student-section activity-section">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              CAMPUS PULSE
            </span>

            <h2>
              What's happening
            </h2>

          </div>

        </div>


        <div className="activity-card">

          <div className="activity-item">

            <div className="activity-dot blue-dot"></div>

            <div className="activity-text">

              <strong>
                24 students joined a new project
              </strong>

              <span>
                Campus Project Network
              </span>

            </div>

            <time>
              12 min
            </time>

          </div>


          <div className="activity-item">

            <div className="activity-dot purple-dot"></div>

            <div className="activity-text">

              <strong>
                New AI research opportunity available
              </strong>

              <span>
                Research & Innovation
              </span>

            </div>

            <time>
              34 min
            </time>

          </div>


          <div className="activity-item">

            <div className="activity-dot green-dot"></div>

            <div className="activity-text">

              <strong>
                Your project profile was updated
              </strong>

              <span>
                Project DNA
              </span>

            </div>

            <time>
              1 hr
            </time>

          </div>


          <div className="activity-item">

            <div className="activity-dot orange-dot"></div>

            <div className="activity-text">

              <strong>
                8 new opportunities matched your skills
              </strong>

              <span>
                Intelligence Match
              </span>

            </div>

            <time>
              2 hrs
            </time>

          </div>

        </div>

      </section>

    </div>
  );
}

export default StudentDashboard;