import "./StudentIntelligence.css";

import {
  Brain,
  Sparkles,
  TrendingUp,
  Target,
  Lightbulb,
  ArrowUpRight,
  ChevronRight,
  Activity,
  Network,
  BookOpen,
  Code2,
  Users,
  Award,
} from "lucide-react";

function StudentIntelligence() {
  return (
    <div className="student-intelligence">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <section className="intelligence-header">

        <div className="intelligence-header-content">

          <span className="intelligence-eyebrow">
            NEXUS / INTELLIGENCE
          </span>

          <h1>
            Your intelligence
            <span> profile.</span>
          </h1>

          <p>
            NEXUS continuously interprets your skills, projects,
            learning activity and campus interactions to build
            a living picture of your capabilities.
          </p>

        </div>

        <div className="intelligence-brain">

          <div className="brain-ring ring-one"></div>
          <div className="brain-ring ring-two"></div>
          <div className="brain-ring ring-three"></div>

          <div className="brain-core">
            <Brain size={30} />
          </div>

        </div>

      </section>


      {/* =========================================================
          INTELLIGENCE SCORE
      ========================================================= */}

      <section className="intelligence-score-section">

        <div className="section-heading">

          <div>
            <span className="section-eyebrow">
              INTELLIGENCE INDEX
            </span>

            <h2>
              Your current profile
            </h2>
          </div>

          <span className="section-period">
            ANALYZED JUST NOW
          </span>

        </div>


        <div className="intelligence-score-grid">

          {/* SCORE */}

          <article className="score-card">

            <div className="score-card-glow"></div>

            <div className="score-card-top">

              <span>
                CAMPUS INTELLIGENCE SCORE
              </span>

              <div className="score-icon">
                <Sparkles size={19} />
              </div>

            </div>

            <div className="score-main">

              <strong>
                82
              </strong>

              <span>
                / 100
              </span>

            </div>

            <div className="score-bar">

              <span style={{ width: "82%" }}></span>

            </div>

            <div className="score-footer">

              <span>
                +12% this semester
              </span>

              <TrendingUp size={16} />

            </div>

          </article>


          {/* PROFILE STATUS */}

          <article className="profile-status-card">

            <div className="status-card-top">

              <div className="status-icon">
                <Activity size={19} />
              </div>

              <span>
                PROFILE STATUS
              </span>

            </div>

            <h3>
              Developing strongly
            </h3>

            <p>
              Your profile is showing consistent growth across
              technical skills, projects and collaboration.
            </p>

            <div className="status-tags">

              <span>Technical</span>
              <span>Projects</span>
              <span>Collaboration</span>

            </div>

          </article>


          {/* NEXT OPPORTUNITY */}

          <article className="next-growth-card">

            <div className="next-growth-icon">
              <Target size={19} />
            </div>

            <span className="next-growth-label">
              HIGHEST IMPACT AREA
            </span>

            <h3>
              Machine Learning
            </h3>

            <p>
              Strengthening this capability could significantly
              increase your project and opportunity matches.
            </p>

            <button>
              View development path
              <ArrowUpRight size={16} />
            </button>

          </article>

        </div>

      </section>


      {/* =========================================================
          SKILL INTELLIGENCE
      ========================================================= */}

      <section className="intelligence-section">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              SKILL INTELLIGENCE
            </span>

            <h2>
              Capability map
            </h2>

          </div>

          <button className="section-action">
            View all skills
            <ArrowUpRight size={16} />
          </button>

        </div>


        <div className="capability-grid">

          {/* TECHNICAL */}

          <article className="capability-card capability-blue">

            <div className="capability-icon">
              <Code2 size={21} />
            </div>

            <div className="capability-top">

              <span>
                TECHNICAL
              </span>

              <strong>
                82%
              </strong>

            </div>

            <h3>
              Technical Intelligence
            </h3>

            <p>
              Programming, data and software development
              capabilities detected across your activity.
            </p>

            <div className="capability-bar">
              <span style={{ width: "82%" }}></span>
            </div>

            <div className="capability-skills">

              <span>Python</span>
              <span>React</span>
              <span>Data</span>

            </div>

          </article>


          {/* ANALYTICAL */}

          <article className="capability-card capability-purple">

            <div className="capability-icon">
              <Brain size={21} />
            </div>

            <div className="capability-top">

              <span>
                ANALYTICAL
              </span>

              <strong>
                76%
              </strong>

            </div>

            <h3>
              Analytical Intelligence
            </h3>

            <p>
              Your ability to reason through problems,
              interpret data and develop solutions.
            </p>

            <div className="capability-bar">
              <span style={{ width: "76%" }}></span>
            </div>

            <div className="capability-skills">

              <span>Analysis</span>
              <span>Research</span>
              <span>Problem Solving</span>

            </div>

          </article>


          {/* COLLABORATION */}

          <article className="capability-card capability-green">

            <div className="capability-icon">
              <Users size={21} />
            </div>

            <div className="capability-top">

              <span>
                COLLABORATION
              </span>

              <strong>
                68%
              </strong>

            </div>

            <h3>
              Collaboration Intelligence
            </h3>

            <p>
              Collaboration patterns detected through projects,
              communities and campus activity.
            </p>

            <div className="capability-bar">
              <span style={{ width: "68%" }}></span>
            </div>

            <div className="capability-skills">

              <span>Teamwork</span>
              <span>Communication</span>
              <span>Leadership</span>

            </div>

          </article>


          {/* LEARNING */}

          <article className="capability-card capability-orange">

            <div className="capability-icon">
              <BookOpen size={21} />
            </div>

            <div className="capability-top">

              <span>
                LEARNING
              </span>

              <strong>
                74%
              </strong>

            </div>

            <h3>
              Learning Intelligence
            </h3>

            <p>
              Learning consistency and knowledge development
              across your academic journey.
            </p>

            <div className="capability-bar">
              <span style={{ width: "74%" }}></span>
            </div>

            <div className="capability-skills">

              <span>Consistency</span>
              <span>Knowledge</span>
              <span>Growth</span>

            </div>

          </article>

        </div>

      </section>


      {/* =========================================================
          AI INSIGHTS
      ========================================================= */}

      <section className="intelligence-section">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              NEXUS INTELLIGENCE
            </span>

            <h2>
              What NEXUS sees
            </h2>

          </div>

        </div>


        <div className="insight-grid">

          <article className="ai-insight-card primary-insight">

            <div className="insight-header">

              <div className="insight-ai-icon">
                <Sparkles size={20} />
              </div>

              <span>
                AI INSIGHT
              </span>

            </div>

            <h3>
              Your strongest combination is AI + Data.
            </h3>

            <p>
              Your current skill profile suggests a strong
              intersection between Python, data analysis and
              machine learning. This combination is appearing
              consistently across your projects and activity.
            </p>

            <button>
              Explore insight
              <ArrowUpRight size={16} />
            </button>

          </article>


          <article className="ai-insight-card">

            <div className="insight-header">

              <div className="insight-small-icon">
                <Lightbulb size={19} />
              </div>

              <span>
                DEVELOPMENT SIGNAL
              </span>

            </div>

            <h3>
              Strengthen communication.
            </h3>

            <p>
              Improving communication alongside your technical
              capabilities could strengthen collaboration and
              leadership opportunities.
            </p>

          </article>


          <article className="ai-insight-card">

            <div className="insight-header">

              <div className="insight-small-icon">
                <Award size={19} />
              </div>

              <span>
                OPPORTUNITY SIGNAL
              </span>

            </div>

            <h3>
              Your profile is becoming opportunity-ready.
            </h3>

            <p>
              NEXUS has identified multiple opportunities that
              align with your current technical profile.
            </p>

          </article>

        </div>

      </section>


      {/* =========================================================
          INTELLIGENCE ACTIVITY
      ========================================================= */}

      <section className="intelligence-section intelligence-activity-section">

        <div className="section-heading">

          <div>

            <span className="section-eyebrow">
              INTELLIGENCE HISTORY
            </span>

            <h2>
              Recent signals
            </h2>

          </div>

        </div>


        <div className="signal-card">

          <div className="signal-item">

            <div className="signal-icon blue-signal">
              <TrendingUp size={17} />
            </div>

            <div className="signal-content">

              <strong>
                Skill growth detected
              </strong>

              <span>
                Python capability increased from 79% to 86%.
              </span>

            </div>

            <time>
              Today
            </time>

          </div>


          <div className="signal-item">

            <div className="signal-icon purple-signal">
              <Network size={17} />
            </div>

            <div className="signal-content">

              <strong>
                New project connection
              </strong>

              <span>
                NEXUS activity strengthened your project profile.
              </span>

            </div>

            <time>
              Yesterday
            </time>

          </div>


          <div className="signal-item">

            <div className="signal-icon green-signal">
              <Target size={17} />
            </div>

            <div className="signal-content">

              <strong>
                Opportunity match improved
              </strong>

              <span>
                Three new opportunities now match your profile.
              </span>

            </div>

            <time>
              2 days ago
            </time>

          </div>

        </div>

      </section>

    </div>
  );
}

export default StudentIntelligence;