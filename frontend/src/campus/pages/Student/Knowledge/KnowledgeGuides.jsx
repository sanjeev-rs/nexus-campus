import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiSearch,
} from "react-icons/fi";

import "./KnowledgeSubPage.css";
import { getKnowledgeByCategory } from "./knowledgeData";

function KnowledgeGuides() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");

  const allGuides = useMemo(() => getKnowledgeByCategory("guides"), []);

  const availableLevels = useMemo(() => {
    const levels = new Set(allGuides.map((g) => g.level).filter(Boolean));
    return ["All Levels", ...Array.from(levels)];
  }, [allGuides]);

  const filteredGuides = useMemo(() => {
    return allGuides.filter((guide) => {
      const matchesLevel =
        selectedLevel === "All Levels" || guide.level === selectedLevel;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        guide.title.toLowerCase().includes(q) ||
        guide.description.toLowerCase().includes(q) ||
        (guide.category && guide.category.toLowerCase().includes(q)) ||
        (guide.technologies &&
          guide.technologies.some((t) => t.toLowerCase().includes(q)));

      return matchesLevel && matchesSearch;
    });
  }, [allGuides, searchQuery, selectedLevel]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLevel("All Levels");
  };

  return (
    <main className="knowledge-subpage">
      {/* BREADCRUMB & BACK */}
      <div className="knowledge-subpage-nav">
        <button
          className="knowledge-back-button"
          onClick={() => navigate("/student/knowledge")}
          type="button"
        >
          <FiArrowLeft size={17} />
          Back to Knowledge
        </button>

        <nav className="knowledge-breadcrumb" aria-label="Breadcrumb">
          <button type="button" onClick={() => navigate("/student/knowledge")}>
            Knowledge
          </button>
          <span className="sep">/</span>
          <span className="current">Guides</span>
        </nav>
      </div>

      {/* HERO */}
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
            Practical deployment patterns, tutorials and documented campus
            experience created to help student cohorts build faster and deploy
            reliably.
          </p>
        </div>

        <div className="knowledge-sub-icon green" aria-hidden="true">
          <FiBookOpen size={44} />
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="knowledge-sub-search">
        <FiSearch size={21} aria-hidden="true" />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search guides, tutorials, deployment steps..."
          aria-label="Search guides"
        />

        {searchQuery && (
          <button
            type="button"
            className="knowledge-sub-search-clear"
            onClick={() => setSearchQuery("")}
            aria-label="Clear guides search"
          >
            ×
          </button>
        )}
      </div>

      {/* FILTER CHIPS */}
      <div className="knowledge-filter-bar">
        {availableLevels.map((level) => (
          <button
            key={level}
            type="button"
            className={`filter-chip ${selectedLevel === level ? "active" : ""}`}
            onClick={() => setSelectedLevel(level)}
          >
            {level}
          </button>
        ))}
      </div>

      {/* SECTION */}
      <section className="knowledge-subsection">
        <div className="knowledge-subsection-header">
          <div>
            <span>CAMPUS GUIDES</span>
            <h2>Learn from experience</h2>
          </div>

          <strong>
            {filteredGuides.length}{" "}
            {filteredGuides.length === 1 ? "guide found" : "guides found"}
          </strong>
        </div>

        {filteredGuides.length > 0 ? (
          <div className="knowledge-item-grid">
            {filteredGuides.map((guide) => (
              <article className="knowledge-item-card" key={guide.slug}>
                <div className="knowledge-item-top">
                  <div className="knowledge-item-icon green">
                    <FiBookOpen size={21} />
                  </div>

                  <span className="knowledge-level">{guide.level}</span>
                </div>

                <div className="knowledge-item-type">GUIDE</div>

                <h3>{guide.title}</h3>

                <p>{guide.description}</p>

                <div className="knowledge-item-meta">
                  {guide.category && <span>{guide.category}</span>}
                  {guide.owner && <span>{guide.owner}</span>}
                </div>

                <button
                  className="knowledge-item-action"
                  type="button"
                  onClick={() => navigate(`/student/knowledge/item/${guide.slug}`)}
                >
                  Read guide
                  <FiArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="knowledge-empty-state">
            <FiSearch size={32} />
            <h3>No guides found</h3>
            <p>
              No campus guides match your current search or level filter.
            </p>
            <button
              type="button"
              className="knowledge-empty-reset-btn"
              onClick={resetFilters}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default KnowledgeGuides;
