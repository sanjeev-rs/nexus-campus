import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiArrowRight,
  FiBookOpen,
  FiBriefcase,
  FiChevronRight,
  FiCode,
  FiDatabase,
  FiFileText,
  FiSearch,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import "./Knowledge.css";

/* =========================================================
   KNOWLEDGE CATEGORIES
   ========================================================= */

const knowledgeCategories = [
  {
    title: "Projects",
    description:
      "Explore projects built across the campus.",
    icon: FiBriefcase,
    count: "1,284",
    accent: "blue",
    route: "/student/projects",
  },

  {
    title: "Research",
    description:
      "Discover research, papers and experiments.",
    icon: FiDatabase,
    count: "426",
    accent: "indigo",
    route: "/student/knowledge/research",
  },

  {
    title: "Guides",
    description:
      "Learn from documented campus experience.",
    icon: FiBookOpen,
    count: "312",
    accent: "green",
    route: "/student/knowledge/guides",
  },

  {
    title: "Technologies",
    description:
      "Find technologies being used across campus.",
    icon: FiCode,
    count: "184",
    accent: "orange",
    route: "/student/knowledge/technologies",
  },

  {
    title: "Faculty Expertise",
    description:
      "Discover people with relevant expertise.",
    icon: FiUsers,
    count: "96",
    accent: "purple",
    route: "/student/knowledge/faculty",
  },

  {
    title: "Student Work",
    description:
      "Learn from work created by your peers.",
    icon: FiZap,
    count: "2,941",
    accent: "cyan",
    route: "/student/knowledge/student-work",
  },
];

/* =========================================================
   RECOMMENDED KNOWLEDGE
   ========================================================= */

const recommendedKnowledge = [
  {
    type: "PROJECT",
    title: "Smart Campus Analytics",
    description:
      "Predictive analytics for understanding campus activity and student engagement.",
    category: "Artificial Intelligence",
    relevance: "92%",
    icon: FiBriefcase,
    accent: "blue",
    route:
      "/student/knowledge/item/smart-campus-analytics",
  },

  {
    type: "RESEARCH",
    title: "Computer Vision Research Lab",
    description:
      "Applied computer vision research conducted by students and faculty.",
    category: "Computer Vision",
    relevance: "86%",
    icon: FiDatabase,
    accent: "indigo",
    route:
      "/student/knowledge/item/computer-vision-research-lab",
  },

  {
    type: "GUIDE",
    title: "Machine Learning Deployment",
    description:
      "A practical guide created from previous student deployment experience.",
    category: "MLOps",
    relevance: "81%",
    icon: FiBookOpen,
    accent: "green",
    route:
      "/student/knowledge/item/machine-learning-deployment",
  },
];

/* =========================================================
   RECENT KNOWLEDGE
   ========================================================= */

const recentKnowledge = [
  {
    type: "PROJECT",
    title: "AI Campus Assistant",
    owner: "Student Innovation Lab",
    category: "Generative AI",
    time: "2 days ago",
    route:
      "/student/knowledge/item/ai-campus-assistant",
  },

  {
    type: "RESEARCH",
    title: "Predictive Student Analytics",
    owner: "Data Intelligence Lab",
    category: "Machine Learning",
    time: "4 days ago",
    route:
      "/student/knowledge/item/predictive-student-analytics",
  },

  {
    type: "GUIDE",
    title: "Building with Supabase",
    owner: "Technology Community",
    category: "Backend",
    time: "1 week ago",
    route:
      "/student/knowledge/item/building-with-supabase",
  },

  {
    type: "PROJECT",
    title: "Campus Digital Twin",
    owner: "NEXUS Research Group",
    category: "Digital Twin",
    time: "1 week ago",
    route:
      "/student/knowledge/item/campus-digital-twin",
  },
];

/* =========================================================
   KNOWLEDGE
   ========================================================= */

function Knowledge() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const normalizedSearch =
    searchQuery.trim().toLowerCase();

  /* =======================================================
     SEARCH RESULTS
     ======================================================= */

  const searchResults = useMemo(() => {
    if (!normalizedSearch) {
      return [];
    }

    /* -------------------------------------------------------
       CATEGORY RESULTS
       ------------------------------------------------------- */

    const categoryResults = knowledgeCategories
      .filter((item) =>
        [
          item.title,
          item.description,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch)
      )
      .map((item) => ({
        type: "CATEGORY",
        title: item.title,
        description: item.description,
        category: "Campus Knowledge",
        relevance: null,
        icon: item.icon,
        accent: item.accent,
        route: item.route,
      }));

    /* -------------------------------------------------------
       RECOMMENDED RESULTS
       ------------------------------------------------------- */

    const recommendedResults = recommendedKnowledge
      .filter((item) =>
        [
          item.title,
          item.description,
          item.category,
          item.type,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch)
      )
      .map((item) => ({
        type: item.type,
        title: item.title,
        description: item.description,
        category: item.category,
        relevance: item.relevance,
        icon: item.icon,
        accent: item.accent,
        route: item.route,
      }));

    /* -------------------------------------------------------
       RECENT RESULTS
       ------------------------------------------------------- */

    const recentResults = recentKnowledge
      .filter((item) =>
        [
          item.title,
          item.owner,
          item.category,
          item.type,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch)
      )
      .map((item) => ({
        type: item.type,
        title: item.title,
        description:
          `${item.owner} • ${item.category}`,
        category: item.category,
        relevance: null,
        icon: FiFileText,
        accent:
          item.type === "RESEARCH"
            ? "indigo"
            : item.type === "GUIDE"
              ? "green"
              : "blue",
        route: item.route,
      }));

    return [
      ...categoryResults,
      ...recommendedResults,
      ...recentResults,
    ];
  }, [normalizedSearch]);

  /* =======================================================
     SEARCH SUBMIT
     ======================================================= */

  const handleSearchSubmit = () => {
    if (searchResults.length > 0) {
      navigate(searchResults[0].route);
    }
  };

  return (
    <main className="knowledge-page">

      {/* ===================================================
          HERO
          =================================================== */}

      <section className="knowledge-hero">

        <div className="knowledge-hero-content">

          <div className="knowledge-eyebrow">
            <span />
            NEXUS KNOWLEDGE NETWORK
          </div>

          <h1>
            What does your
            <br />
            campus already <em>know?</em>
          </h1>

          <p>
            Discover projects, research, guides and
            expertise connected across your institution.
            Learn from what has already been built,
            tested and understood.
          </p>

        </div>

        <div className="knowledge-hero-orbit">

          <div className="knowledge-orbit orbit-one" />
          <div className="knowledge-orbit orbit-two" />
          <div className="knowledge-orbit orbit-three" />

          <div className="knowledge-core">
            <FiDatabase size={30} />

            <span>NEXUS</span>

            <small>KNOWLEDGE</small>
          </div>

          <div className="knowledge-node node-one">
            Projects
          </div>

          <div className="knowledge-node node-two">
            Research
          </div>

          <div className="knowledge-node node-three">
            Skills
          </div>

          <div className="knowledge-node node-four">
            People
          </div>

        </div>

      </section>

      {/* ===================================================
          SEARCH
          =================================================== */}

      <section className="knowledge-search-section">

        <div className="knowledge-search">

          <FiSearch size={22} />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
            placeholder="Search campus knowledge..."
            aria-label="Search campus knowledge"
          />

          {searchQuery && (
            <button
              type="button"
              className="knowledge-search-clear"
              onClick={() =>
                setSearchQuery("")
              }
              aria-label="Clear search"
            >
              ×
            </button>
          )}

          <span className="search-shortcut">
            /
          </span>

        </div>

      </section>

      {/* ===================================================
          SEARCH RESULTS
          =================================================== */}

      {normalizedSearch && (
        <section className="knowledge-search-results">

          <div className="knowledge-search-results-header">

            <div>

              <div className="section-eyebrow">
                SEARCH
              </div>

              <h2>
                Results for "{searchQuery}"
              </h2>

            </div>

            <span>
              {searchResults.length}{" "}
              {searchResults.length === 1
                ? "result"
                : "results"}
            </span>

          </div>

          {searchResults.length > 0 ? (

            <div className="knowledge-search-results-list">

              {searchResults.map(
                (result, index) => {

                  const Icon =
                    result.icon || FiFileText;

                  return (
                    <button
                      key={`${result.title}-${index}`}
                      type="button"
                      className={`knowledge-search-result ${result.accent || "blue"}`}
                      onClick={() =>
                        navigate(result.route)
                      }
                    >

                      {/* RESULT ICON */}

                      <div
                        className={`knowledge-search-result-icon ${result.accent || "blue"}`}
                      >
                        <Icon size={22} />
                      </div>

                      {/* RESULT CONTENT */}

                      <div className="knowledge-search-result-main">

                        <div className="knowledge-search-result-top">

                          <span className="knowledge-search-result-type">
                            {result.type}
                          </span>

                          {result.relevance && (
                            <span className="knowledge-search-result-match">
                              {result.relevance} MATCH
                            </span>
                          )}

                        </div>

                        <h3>
                          {result.title}
                        </h3>

                        <p>
                          {result.description}
                        </p>

                        {result.category && (
                          <div className="knowledge-search-result-meta">
                            {result.category}
                          </div>
                        )}

                      </div>

                      {/* ARROW */}

                      <div className="knowledge-search-result-arrow">
                        <FiArrowRight size={20} />
                      </div>

                    </button>
                  );
                }
              )}

            </div>

          ) : (

            <div className="knowledge-no-results">

              <FiSearch size={28} />

              <h3>
                No knowledge found
              </h3>

              <p>
                Try searching for projects,
                research, technologies, guides
                or faculty expertise.
              </p>

            </div>

          )}

        </section>
      )}

      {/* ===================================================
          CATEGORIES
          =================================================== */}

      <section className="knowledge-section">

        <div className="knowledge-section-header">

          <div>

            <div className="section-eyebrow">
              EXPLORE
            </div>

            <h2>
              Knowledge across campus
            </h2>

          </div>

          <button
            type="button"
            className="text-action"
            onClick={() =>
              navigate("/student/knowledge/research")
            }
          >
            View all
            <FiArrowRight size={17} />
          </button>

        </div>

        <div className="knowledge-category-grid">

          {knowledgeCategories.map(
            (category) => {

              const Icon = category.icon;

              return (
                <button
                  className={`knowledge-category-card ${category.accent}`}
                  key={category.title}
                  onClick={() =>
                    navigate(category.route)
                  }
                  type="button"
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

                  <div className="category-count">
                    {category.count}
                  </div>

                  <h3>
                    {category.title}
                  </h3>

                  <p>
                    {category.description}
                  </p>

                </button>
              );
            }
          )}

        </div>

      </section>

      {/* ===================================================
          RECOMMENDED
          =================================================== */}

      <section className="knowledge-section">

        <div className="knowledge-section-header">

          <div>

            <div className="section-eyebrow">
              INTELLIGENCE
            </div>

            <h2>
              Recommended for you
            </h2>

            <p className="section-supporting">
              Knowledge selected based on your
              interests, skills and projects.
            </p>

          </div>

          <button
            type="button"
            className="text-action"
            onClick={() =>
              navigate("/student/knowledge")
            }
          >
            Explore network
            <FiArrowRight size={17} />
          </button>

        </div>

        <div className="recommended-grid">

          {recommendedKnowledge.map(
            (item) => {

              const Icon = item.icon;

              return (
                <button
                  className={`knowledge-result-card ${item.accent}`}
                  key={item.title}
                  type="button"
                  onClick={() =>
                    navigate(item.route)
                  }
                >

                  <div className="result-card-header">

                    <div
                      className={`result-icon ${item.accent}`}
                    >
                      <Icon size={21} />
                    </div>

                    <span className="relevance">
                      {item.relevance} MATCH
                    </span>

                  </div>

                  <div className="result-type">
                    {item.type}
                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <div className="result-card-footer">

                    <span>
                      {item.category}
                    </span>

                    <FiArrowRight size={17} />

                  </div>

                </button>
              );
            }
          )}

        </div>

      </section>

      {/* ===================================================
          CAMPUS MEMORY
          =================================================== */}

      <section className="knowledge-stats">

        <div className="knowledge-stats-heading">

          <div className="section-eyebrow">
            CAMPUS MEMORY
          </div>

          <h2>
            A campus that remembers.
          </h2>

          <p>
            Every project, experiment, research
            outcome and documented experience can
            become knowledge for the next person.
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

            <div className="section-eyebrow">
              RECENTLY ADDED
            </div>

            <h2>
              Fresh campus knowledge
            </h2>

          </div>

          <button
            type="button"
            className="text-action"
            onClick={() =>
              navigate("/student/knowledge")
            }
          >
            View archive
            <FiArrowRight size={17} />
          </button>

        </div>

        <div className="recent-knowledge-list">

          {recentKnowledge.map(
            (item) => (

              <button
                className="recent-knowledge-item"
                key={item.title}
                type="button"
                onClick={() =>
                  navigate(item.route)
                }
              >

                <div className="recent-item-icon">
                  <FiFileText size={19} />
                </div>

                <div className="recent-item-main">

                  <div className="recent-item-type">
                    {item.type}
                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.owner}
                    <span>•</span>
                    {item.category}
                  </p>

                </div>

                <div className="recent-item-time">
                  {item.time}
                </div>

                <FiChevronRight
                  size={18}
                  className="recent-arrow"
                />

              </button>

            )
          )}

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