import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiSearch,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import "./KnowledgeSubPage.css";

const guides = [
  {
    title: "Building with Supabase",
    slug: "building-with-supabase",
    description:
      "A practical guide for building campus applications with Supabase.",
    category: "Backend",
    level: "Intermediate",
  },
  {
    title: "Machine Learning Deployment",
    slug: "machine-learning-deployment",
    description:
      "Lessons and practices for deploying machine learning applications.",
    category: "MLOps",
    level: "Advanced",
  },
  {
    title: "Getting Started with GitHub",
    slug: "getting-started-with-github",
    description:
      "A campus guide for managing projects, repositories and collaboration.",
    category: "Development",
    level: "Beginner",
  },
  {
    title: "Building Your First AI Project",
    slug: "building-your-first-ai-project",
    description:
      "A practical starting point for students beginning their AI journey.",
    category: "Artificial Intelligence",
    level: "Beginner",
  },
];

function KnowledgeGuides() {
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
            NEXUS KNOWLEDGE / GUIDES
          </div>

          <h1>
            Learn from what
            <br />
            others have <em>built.</em>
          </h1>

          <p>
            Practical knowledge, tutorials and
            documented campus experience created
            to help students move faster.
          </p>
        </div>

        <div className="knowledge-sub-icon green">
          <FiBookOpen size={44} />
        </div>

      </section>

      <div className="knowledge-sub-search">
        <FiSearch size={21} />

        <input
          type="text"
          placeholder="Search guides..."
        />
      </div>

      <section className="knowledge-subsection">

        <div className="knowledge-subsection-header">
          <div>
            <span>CAMPUS GUIDES</span>
            <h2>Learn from experience</h2>
          </div>

          <strong>
            {guides.length} guides
          </strong>
        </div>

        <div className="knowledge-item-grid">

          {guides.map((guide) => (
            <article
              className="knowledge-item-card"
              key={guide.title}
            >

              <div className="knowledge-item-top">

                <div className="knowledge-item-icon green">
                  <FiBookOpen size={21} />
                </div>

                <span className="knowledge-level">
                  {guide.level}
                </span>

              </div>

              <div className="knowledge-item-type">
                GUIDE
              </div>

              <h3>
                {guide.title}
              </h3>

              <p>
                {guide.description}
              </p>

              <div className="knowledge-item-meta">
                <span>{guide.category}</span>
              </div>

              <button
                className="knowledge-item-action"
                type="button"
                onClick={() =>
                  navigate(`/student/knowledge/item/${guide.slug}`)
                }
              >
                Read guide
                <FiArrowRight size={16} />
              </button>

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}

export default KnowledgeGuides;
