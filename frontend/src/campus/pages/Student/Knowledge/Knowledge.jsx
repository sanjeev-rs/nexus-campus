import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
  FiChevronRight,
  FiDatabase,
  FiFileText,
  FiSearch,
} from "react-icons/fi";

import "./Knowledge.css";
import {
  KNOWLEDGE_CATEGORIES,
  getRecommendedKnowledge,
  getCuratedRecentKnowledge,
  searchKnowledge,
} from "./knowledgeData";

function Knowledge() {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");

  const recommendedItems = useMemo(() => getRecommendedKnowledge(), []);
  const recentItems = useMemo(() => getCuratedRecentKnowledge(), []);

  // Keyboard shortcut to focus search with '/'
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* =======================================================
     LIVE REAL-TIME SEARCH
     ======================================================= */
  const searchResults = useMemo(() => {
    return searchKnowledge(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchResults.length > 0) {
      navigate(`/student/knowledge/item/${searchResults[0].slug}`);
    }
  };

  return (
    <main className="knowledge-page">
      {/* ===================================================
          INSTITUTIONAL HEADER
          =================================================== */}
      <section className="knowledge-hero">
        <div className="knowledge-hero-content">
          <div className="knowledge-eyebrow">
            <span />
            NEXUS KNOWLEDGE NETWORK
          </div>

          <h1>
            Campus Intelligence &amp; <em>Knowledge.</em>
          </h1>

          <p>
            Explore the knowledge, research, technologies and work shaping
            the NEXUS campus. Learn from documented projects, faculty expertise
            and peer developments across the institution.
          </p>
        </div>

        <div className="knowledge-hero-orbit" aria-hidden="true">
          <div className="knowledge-orbit orbit-one" />
          <div className="knowledge-orbit orbit-two" />
          <div className="knowledge-orbit orbit-three" />

          <div className="knowledge-core">
            <FiDatabase size={28} />
            <span>NEXUS</span>
            <small>KNOWLEDGE</small>
          </div>

          <div className="knowledge-node node-one">Projects</div>
          <div className="knowledge-node node-two">Research</div>
          <div className="knowledge-node node-three">Technologies</div>
          <div className="knowledge-node node-four">Faculty</div>
        </div>
      </section>

      {/* ===================================================
          LIVE REAL-TIME SEARCH BAR
          =================================================== */}
      <section className="knowledge-search-section">
        <form
          className="knowledge-search"
          role="search"
          onSubmit={handleSearchSubmit}
        >
          <FiSearch size={22} aria-hidden="true" />

          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campus research, guides, technologies, faculty, projects..."
            aria-label="Search campus knowledge"
          />

          {searchQuery && (
            <button
              type="button"
              className="knowledge-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

          <span className="search-shortcut" title="Press / to search">
            /
          </span>
        </form>
      </section>

      {/* ===================================================
          LIVE SEARCH RESULTS
          =================================================== */}
      {searchQuery.trim() && (
        <section
          className="knowledge-search-results"
          aria-live="polite"
        >
          <div className="knowledge-search-results-header">
            <div>
              <div className="section-eyebrow">SEARCH RESULTS</div>
              <h2>
                Results for &ldquo;{searchQuery}&rdquo;
              </h2>
            </div>

            <span className="search-count-badge">
              {searchResults.length}{" "}
              {searchResults.length === 1 ? "match found" : "matches found"}
            </span>
          </div>

          {searchResults.length > 0 ? (
            <div className="knowledge-search-results-list">
              {searchResults.map((item) => {
                const Icon = item.icon || FiFileText;

                return (
                  <button
                    key={item.slug}
                    type="button"
                    className={`knowledge-search-result ${item.accent || "blue"}`}
                    onClick={() =>
                      navigate(`/student/knowledge/item/${item.slug}`)
                    }
                  >
                    <div
                      className={`knowledge-search-result-icon ${item.accent || "blue"}`}
                    >
                      <Icon size={22} />
                    </div>

                    <div className="knowledge-search-result-main">
                      <div className="knowledge-search-result-top">
                        <span className="knowledge-search-result-type">
                          {item.type}
                        </span>

                        <span className="knowledge-search-result-meta">
                          {item.category}
                        </span>
                      </div>

                      <h3>{item.title}</h3>

                      <p>{item.description}</p>

                      {item.technologies && item.technologies.length > 0 && (
                        <div className="knowledge-tag-preview">
                          {item.technologies.slice(0, 4).map((tech) => (
                            <span key={tech} className="mini-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="knowledge-search-result-arrow">
                      <FiArrowRight size={20} />
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="knowledge-no-results">
              <FiSearch size={32} />
              <h3>No knowledge found</h3>
              <p>
                No campus items match &ldquo;{searchQuery}&rdquo;. Try searching for
                technologies (e.g. Python, React), domains (e.g. Computer Vision), or
                faculty expertise.
              </p>
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </button>
            </div>
          )}
        </section>
      )}

      {/* ===================================================
          CATEGORY CARDS
          =================================================== */}
      <section className="knowledge-section">
        <div className="knowledge-section-header">
          <div>
            <div className="section-eyebrow">EXPLORE</div>
            <h2>Knowledge across campus</h2>
          </div>

          <button
            type="button"
            className="text-action"
            onClick={() => navigate("/student/knowledge/research")}
          >
            View research
            <FiArrowRight size={17} />
          </button>
        </div>

        <div className="knowledge-category-grid">
          {KNOWLEDGE_CATEGORIES.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.title}
                className={`knowledge-category-card ${category.accent}`}
                type="button"
                onClick={() => navigate(category.route)}
              >
                <div className="category-card-top">
                  <div className="category-icon">
                    <Icon size={21} />
                  </div>

                  <FiChevronRight
                    className="category-arrow"
                    size={18}
                  />
                </div>

                <div className="category-count">{category.count} items</div>

                <h3>{category.title}</h3>

                <p>{category.description}</p>
              </button>
            );
          })}
        </div>
      </section>

      {/* ===================================================
          RECOMMENDED KNOWLEDGE
          =================================================== */}
      <section className="knowledge-section">
        <div className="knowledge-section-header">
          <div>
            <div className="section-eyebrow">CURATED</div>
            <h2>Recommended knowledge</h2>
            <p className="section-supporting">
              Key projects, research labs and deployment guides shaping current
              campus engineering.
            </p>
          </div>

          <button
            type="button"
            className="text-action"
            onClick={() => navigate("/student/knowledge/guides")}
          >
            Explore guides
            <FiArrowRight size={17} />
          </button>
        </div>

        <div className="recommended-grid">
          {recommendedItems.map((item) => {
            const Icon = item.icon || FiBriefcase;

            return (
              <button
                key={item.slug}
                className={`knowledge-result-card ${item.accent}`}
                type="button"
                onClick={() => navigate(`/student/knowledge/item/${item.slug}`)}
              >
                <div className="result-card-header">
                  <div className={`result-icon ${item.accent}`}>
                    <Icon size={21} />
                  </div>

                  <span className="result-type">{item.type}</span>
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                {item.technologies && item.technologies.length > 0 && (
                  <div className="recommended-card-tags">
                    {item.technologies.slice(0, 3).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                )}

                <div className="result-card-footer">
                  <span>{item.category}</span>
                  <FiArrowRight size={17} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ===================================================
          CAMPUS MEMORY / STATS
          =================================================== */}
      <section className="knowledge-stats">
        <div className="knowledge-stats-heading">
          <div className="section-eyebrow">CAMPUS MEMORY</div>
          <h2>A campus that remembers.</h2>
          <p>
            Every project, experiment, research outcome and documented
            experience becomes searchable intelligence for the next cohort.
          </p>
        </div>

        <div className="knowledge-stat-grid">
          <div>
            <strong>1,284</strong>
            <span>Projects</span>
          </div>

          <div>
            <strong>426</strong>
            <span>Research items</span>
          </div>

          <div>
            <strong>312</strong>
            <span>Guides</span>
          </div>

          <div>
            <strong>96</strong>
            <span>Expertise areas</span>
          </div>
        </div>
      </section>

      {/* ===================================================
          RECENT KNOWLEDGE
          =================================================== */}
      <section className="knowledge-section recent-section">
        <div className="knowledge-section-header">
          <div>
            <div className="section-eyebrow">RECENT ACTIVITY</div>
            <h2>Documented campus knowledge</h2>
          </div>
        </div>

        <div className="recent-knowledge-list">
          {recentItems.map((item) => (
            <button
              key={item.slug}
              className="recent-knowledge-item"
              type="button"
              onClick={() => navigate(`/student/knowledge/item/${item.slug}`)}
            >
              <div className="recent-item-icon">
                <FiFileText size={19} />
              </div>

              <div className="recent-item-main">
                <div className="recent-item-type">{item.type}</div>

                <h3>{item.title}</h3>

                <p>
                  {item.owner}
                  <span>•</span>
                  {item.category}
                </p>
              </div>

              <div className="recent-item-time">{item.updated}</div>

              <FiChevronRight size={18} className="recent-arrow" />
            </button>
          ))}
        </div>
      </section>

      {/* ===================================================
          FOOTER STATEMENT
          =================================================== */}
      <section className="knowledge-closing">
        <div className="closing-line" />
        <p>
          KNOWLEDGE CREATED TODAY
          <span>→</span>
          INTELLIGENCE FOR TOMORROW
        </p>
      </section>
    </main>
  );
}

export default Knowledge;