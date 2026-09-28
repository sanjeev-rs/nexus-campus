import {
  FiArrowLeft,
  FiArrowRight,
  FiSearch,
  FiZap,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import "./KnowledgeSubPage.css";

const studentWork = [
  {
    title: "AI Campus Assistant",
    slug: "ai-campus-assistant",
    description:
      "A student-built intelligent assistant designed to help students navigate campus information.",
    category: "Generative AI",
    team: "Student Innovation Lab",
  },
  {
    title: "Smart Campus Analytics",
    slug: "smart-campus-analytics",
    description:
      "A predictive analytics system for understanding campus activity and student engagement.",
    category: "Data Science",
    team: "AI & DS Students",
  },
  {
    title: "Campus Digital Twin",
    slug: "campus-digital-twin",
    description:
      "A digital representation of campus systems designed for simulation and intelligence.",
    category: "Digital Twin",
    team: "NEXUS Research Group",
  },
  {
    title: "Student Skill Intelligence",
    slug: "student-skill-intelligence",
    description:
      "A system for mapping student skills to projects, opportunities and future roles.",
    category: "Artificial Intelligence",
    team: "Student Innovation Lab",
  },
];

function KnowledgeStudentWork() {
  const navigate = useNavigate();

  return (
    <main className="knowledge-subpage">

      <button
        className="knowledge-back-button"
        onClick={() => navigate("/student/knowledge")}
      >
        <FiArrowLeft size={17} />
        Back to Knowledge
      </button>

      <section className="knowledge-subhero">

        <div>
          <div className="knowledge-sub-eyebrow">
            <span />
            NEXUS KNOWLEDGE / STUDENT WORK
          </div>

          <h1>
            Learn from what
            <br />
            your peers have <em>built.</em>
          </h1>

          <p>
            Explore student projects, experiments
            and ideas created across the campus.
          </p>
        </div>

        <div className="knowledge-sub-icon cyan">
          <FiZap size={44} />
        </div>

      </section>

      <div className="knowledge-sub-search">
        <FiSearch size={21} />

        <input
          type="text"
          placeholder="Search student work..."
        />
      </div>

      <section className="knowledge-subsection">

        <div className="knowledge-subsection-header">
          <div>
            <span>STUDENT KNOWLEDGE</span>
            <h2>Student work</h2>
          </div>

          <strong>
            {studentWork.length} projects
          </strong>
        </div>

        <div className="knowledge-item-grid">

          {studentWork.map((item) => (
            <article
              className="knowledge-item-card"
              key={item.title}
            >

              <div className="knowledge-item-top">

                <div className="knowledge-item-icon cyan">
                  <FiZap size={21} />
                </div>

                <span className="technology-project-count">
                  STUDENT BUILT
                </span>

              </div>

              <div className="knowledge-item-type">
                STUDENT PROJECT
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

              <div className="knowledge-item-meta">
                <span>{item.category}</span>
                <span>{item.team}</span>
              </div>

              <button
                className="knowledge-item-action"
                type="button"
                onClick={() =>
                  navigate(`/student/knowledge/item/${item.slug}`)
                }
              >
                Explore project
                <FiArrowRight size={16} />
              </button>

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}

export default KnowledgeStudentWork;