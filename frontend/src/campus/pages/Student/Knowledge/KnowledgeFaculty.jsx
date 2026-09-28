import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiSearch,
  FiUsers,
} from "react-icons/fi";

import "./KnowledgeSubPage.css";
import { getKnowledgeByCategory } from "./knowledgeData";

function KnowledgeFaculty() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");

  const allFacultyItems = useMemo(
    () => getKnowledgeByCategory("faculty"),
    []
  );

  const availableDomains = useMemo(() => {
    const domains = new Set(
      allFacultyItems.map((f) => f.category).filter(Boolean)
    );
    return ["All Domains", ...Array.from(domains)];
  }, [allFacultyItems]);

  const filteredFaculty = useMemo(() => {
    return allFacultyItems.filter((item) => {
      const matchesDomain =
        selectedDomain === "All Domains" || item.category === selectedDomain;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.expertise && item.expertise.toLowerCase().includes(q)) ||
        (item.department && item.department.toLowerCase().includes(q)) ||
        (item.technologies &&
          item.technologies.some((t) => t.toLowerCase().includes(q)));

      return matchesDomain && matchesSearch;
    });
  }, [allFacultyItems, searchQuery, selectedDomain]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedDomain("All Domains");
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
          <span className="current">Faculty Expertise</span>
        </nav>
      </div>

      {/* HERO */}
      <section className="knowledge-subhero">
        <div>
          <div className="knowledge-sub-eyebrow">
            <span />
            NEXUS KNOWLEDGE / FACULTY EXPERTISE
          </div>

          <h1>
            Connect with campus
            <br />
            faculty <em>experts.</em>
          </h1>

          <p>
            Discover professors, lab leads and academic specialists who guide
            student research, advise capstone initiatives and conduct advanced studies.
          </p>
        </div>

        <div className="knowledge-sub-icon purple" aria-hidden="true">
          <FiUsers size={44} />
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="knowledge-sub-search">
        <FiSearch size={21} aria-hidden="true" />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search faculty domains, research topics, mentors..."
          aria-label="Search faculty expertise"
        />

        {searchQuery && (
          <button
            type="button"
            className="knowledge-sub-search-clear"
            onClick={() => setSearchQuery("")}
            aria-label="Clear faculty search"
          >
            ×
          </button>
        )}
      </div>

      {/* FILTER CHIPS */}
      <div className="knowledge-filter-bar">
        {availableDomains.map((domain) => (
          <button
            key={domain}
            type="button"
            className={`filter-chip ${selectedDomain === domain ? "active" : ""}`}
            onClick={() => setSelectedDomain(domain)}
          >
            {domain}
          </button>
        ))}
      </div>

      {/* SECTION */}
      <section className="knowledge-subsection">
        <div className="knowledge-subsection-header">
          <div>
            <span>FACULTY ADVISORY DIRECTORY</span>
            <h2>Expertise clusters</h2>
          </div>

          <strong>
            {filteredFaculty.length}{" "}
            {filteredFaculty.length === 1 ? "cluster found" : "clusters found"}
          </strong>
        </div>

        {filteredFaculty.length > 0 ? (
          <div className="knowledge-item-grid">
            {filteredFaculty.map((item) => (
              <article className="knowledge-item-card" key={item.slug}>
                <div className="knowledge-item-top">
                  <div className="knowledge-item-icon purple">
                    <FiUsers size={21} />
                  </div>

                  <span className="technology-project-count">
                    {item.projects}
                  </span>
                </div>

                <div className="knowledge-item-type">FACULTY EXPERTISE</div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="knowledge-item-meta">
                  {item.expertise && <span>{item.expertise}</span>}
                  {item.department && <span>{item.department}</span>}
                </div>

                <button
                  className="knowledge-item-action"
                  type="button"
                  onClick={() => navigate(`/student/knowledge/item/${item.slug}`)}
                >
                  View mentorship profile
                  <FiArrowRight size={16} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="knowledge-empty-state">
            <FiSearch size={32} />
            <h3>No faculty clusters found</h3>
            <p>
              No faculty expertise clusters match your current search or domain filter.
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

export default KnowledgeFaculty;