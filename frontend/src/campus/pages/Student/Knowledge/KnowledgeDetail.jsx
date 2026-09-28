import { useMemo } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiCode,
  FiDatabase,
  FiFileText,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

import "./KnowledgeDetail.css";
import { getKnowledgeItem, getRelatedKnowledge } from "./knowledgeData";

const categoryMap = {
  research: { name: "Research", route: "/student/knowledge/research" },
  guides: { name: "Guides", route: "/student/knowledge/guides" },
  technologies: { name: "Technologies", route: "/student/knowledge/technologies" },
  faculty: { name: "Faculty Expertise", route: "/student/knowledge/faculty" },
  "student-work": { name: "Student Work", route: "/student/knowledge/student-work" },
};

function KnowledgeDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const item = useMemo(() => getKnowledgeItem(slug), [slug]);
  const relatedItems = useMemo(() => getRelatedKnowledge(slug, 3), [slug]);

  /* =======================================================
     NOT FOUND STATE
     ======================================================= */
  if (!item) {
    return (
      <main className="knowledge-detail-page">
        <div className="knowledge-detail-nav">
          <button
            type="button"
            className="knowledge-detail-back"
            onClick={() => navigate("/student/knowledge")}
          >
            <FiArrowLeft size={18} />
            Back to Knowledge
          </button>
        </div>

        <section className="knowledge-detail-not-found">
          <div className="knowledge-detail-not-found-icon">
            <FiFileText size={38} />
          </div>

          <div className="knowledge-detail-eyebrow">
            NEXUS KNOWLEDGE NETWORK
          </div>

          <h1>Knowledge not found</h1>

          <p>
            The knowledge item you are looking for does not exist in the NEXUS
            knowledge network or has been relocated.
          </p>

          <button
            type="button"
            onClick={() => navigate("/student/knowledge")}
          >
            <FiArrowLeft size={17} />
            Back to Knowledge
          </button>
        </section>
      </main>
    );
  }

  const Icon = item.icon || FiFileText;
  const categoryInfo = categoryMap[item.categoryType] || {
    name: item.type || "Knowledge",
    route: "/student/knowledge",
  };

  const handleNavigateRelated = (targetSlug) => {
    navigate(`/student/knowledge/item/${targetSlug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="knowledge-detail-page">
      {/* ===================================================
          BREADCRUMB & BACK NAVIGATION
          =================================================== */}
      <div className="knowledge-detail-nav">
        <button
          type="button"
          className="knowledge-detail-back"
          onClick={() => navigate(categoryInfo.route)}
        >
          <FiArrowLeft size={18} />
          Back to {categoryInfo.name}
        </button>

        <nav className="knowledge-detail-breadcrumb" aria-label="Breadcrumb">
          <button type="button" onClick={() => navigate("/student/knowledge")}>
            Knowledge
          </button>
          <span className="sep">/</span>
          <button type="button" onClick={() => navigate(categoryInfo.route)}>
            {categoryInfo.name}
          </button>
          <span className="sep">/</span>
          <span className="current">{item.title}</span>
        </nav>
      </div>

      {/* ===================================================
          HERO
          =================================================== */}
      <section className={`knowledge-detail-hero ${item.accent || "blue"}`}>
        <div className="knowledge-detail-hero-content">
          <div className="knowledge-detail-type-row">
            <span className="knowledge-detail-type">
              {item.type}
            </span>

            <span className="knowledge-detail-status">
              <span />
              {item.status || "Active"}
            </span>
          </div>

          <h1>{item.title}</h1>

          <p className="knowledge-detail-subtitle">
            {item.subtitle || item.description}
          </p>

          <div className="knowledge-detail-meta">
            <div>
              <span>DOMAIN</span>
              <strong>{item.category}</strong>
            </div>

            <div>
              <span>CREATED BY</span>
              <strong>{item.owner || item.team || "Campus Intelligence"}</strong>
            </div>

            {item.department && (
              <div>
                <span>DEPARTMENT</span>
                <strong>{item.department}</strong>
              </div>
            )}

            <div>
              <span>UPDATED</span>
              <strong>{item.updated}</strong>
            </div>
          </div>
        </div>

        <div className="knowledge-detail-hero-icon" aria-hidden="true">
          <Icon size={54} />
        </div>
      </section>

      {/* ===================================================
          MAIN CONTENT & SIDEBAR
          =================================================== */}
      <section className="knowledge-detail-content">
        {/* -------------------------------------------------
            LEFT: DETAILED BODY
            ------------------------------------------------- */}
        <div className="knowledge-detail-main">
          {/* OVERVIEW */}
          <div className="knowledge-detail-section">
            <div className="knowledge-detail-section-label">OVERVIEW</div>
            <h2>About this knowledge</h2>
            <p>{item.description}</p>
            {item.overview && <p>{item.overview}</p>}
          </div>

          {/* WHY IT MATTERS */}
          {item.whyItMatters && (
            <div className="knowledge-detail-section">
              <div className="knowledge-detail-section-label">SIGNIFICANCE</div>
              <h2>Why it matters</h2>
              <p>{item.whyItMatters}</p>
            </div>
          )}

          {/* OBJECTIVES */}
          {item.objectives && item.objectives.length > 0 && (
            <div className="knowledge-detail-section">
              <div className="knowledge-detail-section-label">OBJECTIVES</div>
              <h2>What this work focuses on</h2>

              <div className="knowledge-detail-list">
                {item.objectives.map((objective, index) => (
                  <div className="knowledge-detail-list-item" key={index}>
                    <FiCheckCircle size={19} />
                    <span>{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OUTCOMES */}
          {item.outcomes && item.outcomes.length > 0 && (
            <div className="knowledge-detail-section">
              <div className="knowledge-detail-section-label">OUTCOMES</div>
              <h2>What has been documented</h2>

              <div className="knowledge-outcome-grid">
                {item.outcomes.map((outcome, index) => (
                  <div className="knowledge-outcome-card" key={index}>
                    <div className="knowledge-outcome-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p>{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* -------------------------------------------------
            RIGHT SIDEBAR
            ------------------------------------------------- */}
        <aside className="knowledge-detail-sidebar">
          {/* TECHNOLOGIES */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="knowledge-detail-side-card">
              <div className="knowledge-detail-side-label">TECHNOLOGIES</div>
              <h3>Built with</h3>

              <div className="knowledge-technology-list">
                {item.technologies.map((tech) => (
                  <div key={tech} className="knowledge-technology">
                    <FiCode size={16} />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CAMPUS CONNECTIONS */}
          <div className="knowledge-detail-side-card">
            <div className="knowledge-detail-side-label">CAMPUS CONNECTIONS</div>
            <h3>Connected knowledge</h3>

            <div className="knowledge-connection-list">
              <button
                type="button"
                onClick={() => navigate("/student/knowledge/technologies")}
              >
                <FiCode size={17} />
                <span>Technologies</span>
                <FiChevronRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/student/knowledge/research")}
              >
                <FiDatabase size={17} />
                <span>Research</span>
                <FiChevronRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/student/knowledge/guides")}
              >
                <FiBookOpen size={17} />
                <span>Guides</span>
                <FiChevronRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/student/knowledge/faculty")}
              >
                <FiUsers size={17} />
                <span>Faculty Expertise</span>
                <FiChevronRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/student/knowledge/student-work")}
              >
                <FiZap size={17} />
                <span>Student Work</span>
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* STATUS CARD */}
          <div className="knowledge-detail-side-card knowledge-detail-status-card">
            <div className="knowledge-detail-side-status-icon">
              <FiClock size={19} />
            </div>
            <div>
              <span>KNOWLEDGE STATUS</span>
              <strong>{item.status || "Active"}</strong>
            </div>
          </div>
        </aside>
      </section>

      {/* ===================================================
          RELATED KNOWLEDGE
          =================================================== */}
      {relatedItems.length > 0 && (
        <section className="knowledge-detail-related">
          <div className="knowledge-detail-related-header">
            <div>
              <span className="knowledge-detail-section-label">
                CONNECTED INTELLIGENCE
              </span>
              <h2>Related knowledge</h2>
            </div>
            <p>
              Explore complementary research, peer initiatives, and technical
              guides within this knowledge domain.
            </p>
          </div>

          <div className="knowledge-related-grid">
            {relatedItems.map((rel) => {
              const RelIcon = rel.icon || FiFileText;
              return (
                <article key={rel.slug} className="knowledge-related-card">
                  <div className="knowledge-related-card-top">
                    <span className="knowledge-related-card-type">
                      <RelIcon size={13} style={{ marginRight: 6, verticalAlign: "-2px" }} />
                      {rel.type}
                    </span>
                    <span className="knowledge-related-card-cat">
                      {rel.category}
                    </span>
                  </div>

                  <h3>{rel.title}</h3>

                  <p>{rel.subtitle || rel.description}</p>

                  <button
                    type="button"
                    className="knowledge-related-card-btn"
                    onClick={() => handleNavigateRelated(rel.slug)}
                  >
                    <span>Explore knowledge</span>
                    <FiArrowRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* ===================================================
          FOOTER NAVIGATION
          =================================================== */}
      <section className="knowledge-detail-footer">
        <div>
          <span>NEXUS KNOWLEDGE NETWORK</span>
          <h2>Continue exploring campus intelligence.</h2>
        </div>

        <button
          type="button"
          onClick={() => navigate("/student/knowledge")}
        >
          Explore Knowledge
          <FiArrowRight size={18} />
        </button>
      </section>
    </main>
  );
}

export default KnowledgeDetail;