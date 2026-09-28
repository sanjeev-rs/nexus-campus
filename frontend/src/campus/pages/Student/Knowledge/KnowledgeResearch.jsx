import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiDatabase,
  FiSearch,
} from "react-icons/fi";

import "./KnowledgeSubPage.css";
import { getKnowledgeByCategory } from "./knowledgeData";

function KnowledgeResearch() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("All Topics");

  const allResearchItems = useMemo(() => getKnowledgeByCategory("research"), []);

  const availableAreas = useMemo(() => {
    const areas = new Set(allResearchItems.map((item) => item.area).filter(Boolean));
    return ["All Topics", ...Array.from(areas)];
  }, [allResearchItems]);

  const filteredItems = useMemo(() => {
    return allResearchItems.filter((item) => {
      const matchesArea =
        selectedArea === "All Topics" || item.area === selectedArea;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.area && item.area.toLowerCase().includes(q)) ||
        (item.department && item.department.toLowerCase().includes(q)) ||
        (item.technologies &&
          item.technologies.some((t) => t.toLowerCase().includes(q)));

      return matchesArea && matchesSearch;
    });
  }, [allResearchItems, searchQuery, selectedArea]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedArea("All Topics");
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
          <span className="current">Research</span>
        </nav>
      </div>

      {/* HERO */}
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
            Discover research, experimental labs and academic investigations
            being developed across departments and university computing clusters.
          </p>
        </div>

        <div className="knowledge-sub-icon indigo" aria-hidden="true">
          <FiDatabase size={44} />
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="knowledge-sub-search">
        <FiSearch size={21} aria-hidden="true" />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search research labs, models, algorithms..."
          aria-label="Search research"
        />

        {searchQuery && (
          <button
            type="button"
            className="knowledge-sub-search-clear"
            onClick={() => setSearchQuery("")}
            aria-label="Clear research search"
          >
            ×
          </button>
        )}
      </div>

      {/* FILTER CHIPS */}
      <div className="knowledge-filter-bar">
        {availableAreas.map((area) => (
          <button
            key={area}
            type="button"
            className={`filter-chip ${selectedArea === area ? "active" : ""}`}
            onClick={() => setSelectedArea(area)}
          >
            {area}
          </button>
        ))}
      </div>

      {/* SECTION */}
      <section className="knowledge-subsection">
        <div className="knowledge-subsection-header">
          <div>
            <span>RESEARCH NETWORK</span>
            <h2>Explore research</h2>
          </div>

          <strong>
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "item found" : "items found"}
          </strong>
        </div>

        {filteredItems.length > 0 ? (
          <div className="knowledge-item-grid">
            {filteredItems.map((item) => (
              <article className="knowledge-item-card" key={item.slug}>
                <div className="knowledge-item-top">
                  <div className="knowledge-item-icon indigo">
                    <FiDatabase size={21} />
                  </div>

                  <span className="knowledge-status">{item.status}</span>
                </div>

                <div className="knowledge-item-type">RESEARCH</div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="knowledge-item-meta">
                  {item.area && <span>{item.area}</span>}
                  {item.department && <span>{item.department}</span>}
                </div>

                <button
                  className="knowledge-item-action"
                  type="button"
                  onClick={() => navigate(`/student/knowledge/item/${item.slug}`)}
                >
                  Explore research
                  <FiArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="knowledge-empty-state">
            <FiSearch size={32} />
            <h3>No research found</h3>
            <p>
              No research items match your current search or area filter.
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

export default KnowledgeResearch;