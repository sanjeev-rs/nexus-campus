import {
  FiArrowLeft,
  FiArrowRight,
  FiCode,
  FiSearch,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import "./KnowledgeSubPage.css";

const technologies = [
  {
    title: "Python",
    slug: "python",
    description:
      "Widely used across AI, data science, automation and backend projects.",
    projects: "428 projects",
    category: "Programming",
  },
  {
    title: "React",
    slug: "react",
    description:
      "Used to build interactive campus applications and student projects.",
    projects: "216 projects",
    category: "Frontend",
  },
  {
    title: "FastAPI",
    slug: "fastapi",
    description:
      "A popular backend framework used for AI and data-driven applications.",
    projects: "142 projects",
    category: "Backend",
  },
  {
    title: "PostgreSQL",
    slug: "postgresql",
    description:
      "A major database technology used by campus applications and research.",
    projects: "187 projects",
    category: "Database",
  },
  {
    title: "Machine Learning",
    slug: "machine-learning",
    description:
      "Applied across prediction, classification and intelligence projects.",
    projects: "326 projects",
    category: "Artificial Intelligence",
  },
  {
    title: "Computer Vision",
    slug: "computer-vision",
    description:
      "Used for image understanding, recognition and intelligent systems.",
    projects: "154 projects",
    category: "Artificial Intelligence",
  },
];

function KnowledgeTechnologies() {
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
            NEXUS KNOWLEDGE / TECHNOLOGIES
          </div>

          <h1>
            Technologies being
            <br />
            used across <em>campus.</em>
          </h1>

          <p>
            Discover the technologies, frameworks
            and tools students and faculty are
            actively using.
          </p>
        </div>

        <div className="knowledge-sub-icon orange">
          <FiCode size={44} />
        </div>

      </section>

      <div className="knowledge-sub-search">
        <FiSearch size={21} />

        <input
          type="text"
          placeholder="Search technologies..."
        />
      </div>

      <section className="knowledge-subsection">

        <div className="knowledge-subsection-header">
          <div>
            <span>TECHNOLOGY NETWORK</span>
            <h2>Explore technologies</h2>
          </div>

          <strong>
            {technologies.length} technologies
          </strong>
        </div>

        <div className="knowledge-item-grid">

          {technologies.map((technology) => (
            <article
              className="knowledge-item-card"
              key={technology.title}
            >

              <div className="knowledge-item-top">

                <div className="knowledge-item-icon orange">
                  <FiCode size={21} />
                </div>

                <span className="technology-project-count">
                  {technology.projects}
                </span>

              </div>

              <div className="knowledge-item-type">
                TECHNOLOGY
              </div>

              <h3>
                {technology.title}
              </h3>

              <p>
                {technology.description}
              </p>

              <div className="knowledge-item-meta">
                <span>{technology.category}</span>
              </div>

              <button
                className="knowledge-item-action"
                type="button"
                onClick={() =>
                  navigate(`/student/knowledge/item/${technology.slug}`)
                }
              >
                Explore usage
                <FiArrowRight size={16} />
              </button>

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}

export default KnowledgeTechnologies;