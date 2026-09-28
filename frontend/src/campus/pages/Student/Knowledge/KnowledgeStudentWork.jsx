import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiSearch,
  FiZap,
} from "react-icons/fi";

import "./KnowledgeSubPage.css";
import { getKnowledgeByCategory } from "./knowledgeData";

function KnowledgeStudentWork() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const allStudentWork = useMemo(() => getKnowledgeByCategory("student-work"), []);

  const availableCategories = useMemo(() => {
    const cats = new Set(allStudentWork.map((item) => item.category).filter(Boolean));
    return ["All Categories", ...Array.from(cats)];
  }, [allStudentWork]);

  const filteredItems = useMemo(() => {
    return allStudentWork.filter((item) => {
      const matchesCategory =
        selectedCategory === "All Categories" || item.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q)) ||
        (item.team && item.team.toLowerCase().includes(q)) ||
        (item.department && item.department.toLowerCase().includes(q)) ||
        (item.technologies &&
          item.technologies.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [allStudentWork, searchQuery, selectedCategory]);

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
          <span className="current">Student Work</span>
        </nav>
      </div>

      {/* HERO */}
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
            Explore student projects, experiments, and applications created
            across campus labs, innovation incubators, and student teams.
          </p>
        </div>

        <div className="knowledge-sub-icon cyan" aria-hidden="true">
          <FiZap size={44} />
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="knowledge-sub-search">
        <FiSearch size={21} aria-hidden="true" />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search student projects, technologies, teams..."
          aria-label="Search student work"
        />

        {searchQuery && (
          <button
            type="button"
            className="knowledge-sub-search-clear"
            onClick={() => setSearchQuery("")}
            aria-label="Clear student work search"
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
            <span>STUDENT KNOWLEDGE</span>
            <h2>Student work</h2>
          </div>

          <strong>
            {filteredItems.length} {filteredItems.length === 1 ? "project" : "projects"}
          </strong>
        </div>

        {filteredItems.length === 0 ? (
          <div className="knowledge-empty-state">
            <FiZap size={36} className="empty-icon" />
            <h3>No student projects found</h3>
            <p>
              We couldn't find any student work matching &ldquo;
              {searchQuery || selectedCategory}&rdquo;. Try adjusting your search query or selecting a different category.
            </p>
            <button
              type="button"
              className="knowledge-empty-reset-btn"
              onClick={resetFilters}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="knowledge-item-grid">
            {filteredItems.map((item) => {
              const IconComponent = item.icon || FiZap;
              return (
                <article className="knowledge-item-card" key={item.slug}>
                  <div className="knowledge-item-top">
                    <div className="knowledge-item-icon cyan">
                      <IconComponent size={21} />
                    </div>

                    <span className="technology-project-count">
                      STUDENT BUILT
                    </span>
                  </div>

                  <div className="knowledge-item-type">
                    {item.type || "STUDENT PROJECT"}
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <div className="knowledge-item-meta">
                    <span>{item.category}</span>
                    <span>{item.team || item.department}</span>
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
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default KnowledgeStudentWork;