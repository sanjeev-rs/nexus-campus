import {
  FiArrowLeft,
  FiArrowRight,
  FiDatabase,
  FiSearch,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import "./KnowledgeSubPage.css";

const researchItems = [
  {
    title: "Computer Vision Research Lab",
    description:
      "Applied computer vision research conducted by students and faculty.",
    area: "Computer Vision",
    department: "Artificial Intelligence",
    status: "Active",
  },
  {
    title: "Predictive Student Analytics",
    description:
      "Research focused on predicting student engagement and academic patterns.",
    area: "Machine Learning",
    department: "Data Science",
    status: "Active",
  },
  {
    title: "Campus Digital Twin",
    description:
      "Research exploring digital representations of campus systems and activity.",
    area: "Digital Twin",
    department: "Artificial Intelligence",
    status: "Ongoing",
  },
  {
    title: "Natural Language Processing Lab",
    description:
      "Research involving language models, text intelligence and conversational systems.",
    area: "NLP",
    department: "Artificial Intelligence",
    status: "Active",
  },
];

function KnowledgeResearch() {
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
            NEXUS KNOWLEDGE / RESEARCH
          </div>

          <h1>
            Research across
            <br />
            your <em>campus.</em>
          </h1>

          <p>
            Discover research, experiments and
            academic work being developed across
            the institution.
          </p>
        </div>

        <div className="knowledge-sub-icon">
          <FiDatabase size={44} />
        </div>

      </section>

      <div className="knowledge-sub-search">
        <FiSearch size={21} />

        <input
          type="text"
          placeholder="Search research..."
        />
      </div>

      <section className="knowledge-subsection">

        <div className="knowledge-subsection-header">
          <div>
            <span>RESEARCH NETWORK</span>
            <h2>Explore research</h2>
          </div>

          <strong>
            {researchItems.length} items
          </strong>
        </div>

        <div className="knowledge-item-grid">

          {researchItems.map((item) => (
            <article
              className="knowledge-item-card"
              key={item.title}
            >

              <div className="knowledge-item-top">

                <div className="knowledge-item-icon indigo">
                  <FiDatabase size={21} />
                </div>

                <span className="knowledge-status">
                  {item.status}
                </span>

              </div>

              <div className="knowledge-item-type">
                RESEARCH
              </div>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.description}
              </p>

              <div className="knowledge-item-meta">
                <span>{item.area}</span>
                <span>{item.department}</span>
              </div>

              <button
                className="knowledge-item-action"
                type="button"
                onClick={() =>
                    navigate(
                    `/student/knowledge/research/${item.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, "")}`
                    )
                }
                >
                Explore research
                <FiArrowRight size={16} />
                </button>

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}

export default KnowledgeResearch;