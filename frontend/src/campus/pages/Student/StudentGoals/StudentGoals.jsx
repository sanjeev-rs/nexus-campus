import "./StudentGoals.css";

import {
  ArrowUpRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Code2,
  Compass,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   STATIC DEMONSTRATION DATA
   Structure is designed for future backend replacement.
   Each goal/action card clearly shows where API data slots in.
   ========================================================= */

const DEMO_GOALS = [
  {
    id: "ml-depth",
    title: "Deepen Machine Learning expertise",
    category: "Technical",
    priority: "high",
    progress: 38,
    dueLabel: "This semester",
    description:
      "Build a stronger ML foundation to increase project and opportunity matching.",
    actions: [
      "Complete a hands-on ML project using PyTorch or TensorFlow",
      "Document ML experiments in the Knowledge section",
      "Apply ML in the NEXUS intelligence module",
    ],
  },
  {
    id: "portfolio",
    title: "Build a public portfolio project",
    category: "Career",
    priority: "high",
    progress: 55,
    dueLabel: "Next 2 months",
    description:
      "A publicly deployed project strengthens your profile for opportunities.",
    actions: [
      "Select one existing project to deploy publicly",
      "Document the project in NEXUS and add a GitHub URL",
      "Write a clear project description and tech stack",
    ],
  },
  {
    id: "communication",
    title: "Improve technical communication",
    category: "Soft Skills",
    priority: "medium",
    progress: 20,
    dueLabel: "Ongoing",
    description:
      "Better communication significantly increases collaboration and leadership opportunities.",
    actions: [
      "Present one project to a peer group this semester",
      "Write a project retrospective or blog post",
      "Participate in a campus discussion or knowledge sharing session",
    ],
  },
  {
    id: "internship",
    title: "Explore internship opportunities",
    category: "Career",
    priority: "medium",
    progress: 10,
    dueLabel: "Next semester",
    description:
      "Your current profile is becoming opportunity-ready. Start engaging with the opportunity pipeline.",
    actions: [
      "Review matched opportunities in the Intelligence section",
      "Update your profile with current projects and skills",
      "Connect with faculty mentors for guidance",
    ],
  },
];

const NEXT_BEST_ACTIONS = [
  {
    id: "nba-ml",
    icon: Brain,
    accent: "blue",
    label: "HIGHEST IMPACT",
    title: "Start a Machine Learning mini-project",
    description:
      "A focused ML project in your existing Python skillset would most immediately strengthen your intelligence profile.",
    cta: "View development path",
    route: "/student/intelligence",
  },
  {
    id: "nba-portfolio",
    icon: Code2,
    accent: "purple",
    label: "CAREER READINESS",
    title: "Deploy one project publicly",
    description:
      "NEXUS has identified that adding a published URL to your NEXUS project would improve opportunity matching significantly.",
    cta: "Go to my projects",
    route: "/student/projects",
  },
  {
    id: "nba-mentor",
    icon: Users,
    accent: "green",
    label: "SUGGESTED",
    title: "Connect with a faculty mentor",
    description:
      "A faculty mentor aligned with your AI and data skillset can help you structure your next major development area.",
    cta: "Find a mentor",
    route: "/student/projects/mentors",
  },
];

const SKILL_TARGETS = [
  { skill: "Python", current: 86, target: 90 },
  { skill: "Machine Learning", current: 64, target: 80 },
  { skill: "React", current: 72, target: 80 },
  { skill: "Data Analysis", current: 79, target: 85 },
  { skill: "Communication", current: 71, target: 80 },
];

const PRIORITY_COLOR = {
  high: "goal-priority-high",
  medium: "goal-priority-medium",
  low: "goal-priority-low",
};

function StudentGoals() {
  const navigate = useNavigate();

  const [expandedGoal, setExpandedGoal] = useState(null);

  const toggleGoal = (id) => {
    setExpandedGoal((prev) => (prev === id ? null : id));
  };

  const completedGoals = DEMO_GOALS.filter((g) => g.progress >= 100).length;
  const activeGoals = DEMO_GOALS.filter((g) => g.progress < 100).length;

  return (
    <div className="student-goals">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <section className="goals-hero">

        <div className="goals-hero-content">

          <span className="goals-eyebrow">
            NEXUS / DEVELOPMENT PATH
          </span>

          <h1>
            Your development
            <span> path.</span>
          </h1>

          <p>
            Goals and next-best actions built from your intelligence
            profile. NEXUS identifies where your efforts will have
            the highest impact.
          </p>

        </div>

        <div className="goals-hero-visual">
          <div className="goals-orbit goals-orbit-one" />
          <div className="goals-orbit goals-orbit-two" />
          <div className="goals-core">
            <Target size={28} />
          </div>
        </div>

      </section>


      {/* =========================================================
          OVERVIEW STRIP
      ========================================================= */}

      <section className="goals-overview">

        <article className="goals-stat-card">
          <div className="goals-stat-icon blue">
            <Target size={19} />
          </div>
          <span>ACTIVE GOALS</span>
          <strong>{activeGoals}</strong>
        </article>

        <article className="goals-stat-card">
          <div className="goals-stat-icon green">
            <CheckCircle2 size={19} />
          </div>
          <span>COMPLETED</span>
          <strong>{completedGoals}</strong>
        </article>

        <article className="goals-stat-card">
          <div className="goals-stat-icon purple">
            <Zap size={19} />
          </div>
          <span>NEXT ACTIONS</span>
          <strong>{NEXT_BEST_ACTIONS.length}</strong>
        </article>

        <article className="goals-stat-card">
          <div className="goals-stat-icon orange">
            <TrendingUp size={19} />
          </div>
          <span>INTELLIGENCE SCORE</span>
          <strong>82</strong>
        </article>

      </section>


      {/* =========================================================
          NEXT BEST ACTIONS
      ========================================================= */}

      <section className="goals-section">

        <div className="goals-section-heading">

          <div>
            <span className="goals-eyebrow-sm">NEXUS INTELLIGENCE</span>
            <h2>Next best actions</h2>
          </div>

          <div className="goals-ai-badge">
            <Sparkles size={14} />
            AI-recommended
          </div>

        </div>

        <div className="nba-grid">

          {NEXT_BEST_ACTIONS.map((action) => {
            const Icon = action.icon;

            return (
              <article
                key={action.id}
                className={`nba-card nba-${action.accent}`}
              >

                <div className="nba-top">
                  <div className={`nba-icon nba-icon-${action.accent}`}>
                    <Icon size={20} />
                  </div>
                  <span className="nba-label">{action.label}</span>
                </div>

                <h3>{action.title}</h3>

                <p>{action.description}</p>

                <button
                  type="button"
                  className={`nba-action nba-action-${action.accent}`}
                  onClick={() => navigate(action.route)}
                >
                  {action.cta}
                  <ArrowUpRight size={15} />
                </button>

              </article>
            );
          })}

        </div>

      </section>


      {/* =========================================================
          GOALS LIST
      ========================================================= */}

      <section className="goals-section">

        <div className="goals-section-heading">
          <div>
            <span className="goals-eyebrow-sm">DEVELOPMENT GOALS</span>
            <h2>Current goals</h2>
          </div>
        </div>

        <div className="goals-list">

          {DEMO_GOALS.map((goal) => {
            const isOpen = expandedGoal === goal.id;

            return (
              <article key={goal.id} className="goal-card">

                <div className="goal-card-main">

                  <div className="goal-card-left">

                    <div className="goal-title-row">

                      <span className={`goal-priority-badge ${PRIORITY_COLOR[goal.priority]}`}>
                        {goal.priority === "high" ? "HIGH" : goal.priority === "medium" ? "MED" : "LOW"}
                      </span>

                      <span className="goal-category">{goal.category}</span>

                    </div>

                    <h3>{goal.title}</h3>

                    <p>{goal.description}</p>

                    <div className="goal-progress-row">

                      <div className="goal-progress-bar">
                        <span style={{ width: `${goal.progress}%` }} />
                      </div>

                      <span className="goal-progress-value">{goal.progress}%</span>

                    </div>

                    <div className="goal-meta">
                      <Clock size={14} />
                      <span>{goal.dueLabel}</span>
                    </div>

                  </div>

                  <button
                    type="button"
                    className={`goal-expand-btn ${isOpen ? "open" : ""}`}
                    onClick={() => toggleGoal(goal.id)}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? "Collapse goal" : "Expand goal"}
                  >
                    <ChevronRight size={18} />
                  </button>

                </div>

                {isOpen && (
                  <div className="goal-actions-panel">
                    <span className="goal-actions-label">RECOMMENDED ACTIONS</span>
                    <div className="goal-action-list">
                      {goal.actions.map((action, idx) => (
                        <div key={idx} className="goal-action-item">
                          <Circle size={10} />
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </article>
            );
          })}

        </div>

      </section>


      {/* =========================================================
          SKILL DEVELOPMENT TARGETS
      ========================================================= */}

      <section className="goals-section">

        <div className="goals-section-heading">

          <div>
            <span className="goals-eyebrow-sm">SKILL TARGETS</span>
            <h2>Development direction</h2>
          </div>

          <button
            type="button"
            className="goals-view-link"
            onClick={() => navigate("/student/progress")}
          >
            View full progress
            <ArrowUpRight size={16} />
          </button>

        </div>

        <div className="skill-targets-card">

          {SKILL_TARGETS.map((item) => (
            <div key={item.skill} className="skill-target-row">

              <div className="skill-target-info">
                <span>{item.skill}</span>
                <span className="skill-target-values">
                  <strong>{item.current}%</strong>
                  <span className="target-sep">→</span>
                  <span className="skill-target-goal">{item.target}%</span>
                </span>
              </div>

              <div className="skill-target-bar">
                {/* Current */}
                <span
                  className="skill-target-current"
                  style={{ width: `${item.current}%` }}
                />
                {/* Target marker */}
                <span
                  className="skill-target-marker"
                  style={{ left: `${item.target}%` }}
                />
              </div>

            </div>
          ))}

          <p className="skill-targets-note">
            Target levels are suggested by NEXUS based on your goals and career interests.
            Actual data will be driven by backend recommendations when connected.
          </p>

        </div>

      </section>


      {/* =========================================================
          CTA — INTELLIGENCE
      ========================================================= */}

      <section className="goals-intelligence-cta">

        <div className="goals-cta-icon">
          <Compass size={26} />
        </div>

        <div>
          <span>NEXUS INTELLIGENCE</span>
          <h2>Your intelligence profile shapes these recommendations.</h2>
          <p>
            The goals and actions on this page are derived from your current
            skill intelligence. As your profile grows, recommendations update.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/student/intelligence")}
        >
          View intelligence profile
          <ArrowUpRight size={17} />
        </button>

      </section>

    </div>
  );
}

export default StudentGoals;
