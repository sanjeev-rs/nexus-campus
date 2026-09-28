import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCode,
  FiSearch,
} from "react-icons/fi";

import "./KnowledgeSubPage.css";
import { getKnowledgeByCategory } from "./knowledgeData";

function KnowledgeTechnologies() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const allTechnologies = useMemo(
    () => getKnowledgeByCategory("technologies"),
    []
  );

  const availableCategories = useMemo(() => {
    const categories = new Set(
      allTechnologies.map((tech) => tech.category).filter(Boolean)
    );
    return ["All Categories", ...Array.from(categories)];
  }, [allTechnologies]);

  const filteredTechnologies = useMemo(() => {
    return allTechnologies.filter((tech) => {
      const matchesCategory =
        selectedCategory === "All Categories" ||
        tech.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        tech.title.toLowerCase().includes(q) ||
        tech.description.toLowerCase().includes(q) ||
        (tech.category && tech.category.toLowerCase().includes(q)) ||
        (tech.technologies &&
          tech.technologies.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [allTechnologies, searchQuery, selectedCategory]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
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
          <span className="current">Technologies</span>
        </nav>
      </div>

      {/* HERO */}
      <section className="knowledge-subhero">
        <div>
          <div className="knowledge-sub-eyebrow">
            <span />
            NEXUS KNOWLEDGE / TECHNOLOGIES
          </div>

          <h1>
            Technologies in
            <br />
            campus <em>use.</em>
          </h1>

          <p>
            Explore programming languages, frameworks, AI libraries and database
            systems actively leveraged across student capstones and departmental labs.
          </p>
        </div>

        <div className="knowledge-sub-icon orange" aria-hidden="true">
          <FiCode size={44} />
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="knowledge-sub-search">
        <FiSearch size={21} aria-hidden="true" />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search technologies, frameworks, datastores..."
          aria-label="Search technologies"
        />

        {searchQuery && (
          <button
            type="button"
            className="knowledge-sub-search-clear"
            onClick={() => setSearchQuery("")}
            aria-label="Clear technology search"
          >
            ×
          </button>
        )}
      </div>

      {/* FILTER CHIPS */}
      <div className="knowledge-filter-bar">
        {availableCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SECTION */}
      <section className="knowledge-subsection">
        <div className="knowledge-subsection-header">
          <div>
            <span>TECH STACK INDEX</span>
            <h2>Active campus tools</h2>
          </div>

          <strong>
            {filteredTechnologies.length}{" "}
            {filteredTechnologies.length === 1
              ? "technology found"
              : "technologies found"}
          </strong>
        </div>

        {filteredTechnologies.length > 0 ? (
          <div className="knowledge-item-grid">
            {filteredTechnologies.map((tech) => (
              <article className="knowledge-item-card" key={tech.slug}>
                <div className="knowledge-item-top">
                  <div className="knowledge-item-icon orange">
                    <FiCode size={21} />
                  </div>

                  <span className="technology-project-count">
                    {tech.projects}
                  </span>
                </div>

                <div className="knowledge-item-type">TECHNOLOGY</div>

                <h3>{tech.title}</h3>

                <p>{tech.description}</p>

                <div className="knowledge-item-meta">
                  <span>{tech.category}</span>
                  <span>{tech.owner}</span>
                </div>

                <button
                  className="knowledge-item-action"
                  type="button"
                  onClick={() => navigate(`/student/knowledge/item/${tech.slug}`)}
                >
                  Explore usage
                  <FiArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="knowledge-empty-state">
            <FiSearch size={32} />
            <h3>No technologies found</h3>
            <p>
              No technologies match your current search or category filter.
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

export default KnowledgeTechnologies;