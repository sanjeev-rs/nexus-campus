import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiDatabase,
  FiExternalLink,
  FiFileText,
  FiGithub,
  FiLayers,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import "./KnowledgeDetail.css";

/* =========================================================
   KNOWLEDGE DATABASE

   Every card on the Knowledge page has one matching slug.
   ========================================================= */

const knowledgeItems = {

  /* -------------------------------------------------------
     PROJECT
     ------------------------------------------------------- */

  "smart-campus-analytics": {
    type: "PROJECT",
    title: "Smart Campus Analytics",

    subtitle:
      "Predictive analytics for understanding campus activity and student engagement.",

    category: "Artificial Intelligence",

    accent: "blue",

    icon: FiBriefcase,

    status: "Active",

    updated: "Updated 2 days ago",

    owner: "AI & Data Science Student Team",

    description:
      "Smart Campus Analytics is a student-built intelligence project designed to understand patterns across campus activity and student engagement. The project brings together data analysis, machine learning and visualization to help identify meaningful trends across the institution.",

    overview:
      "The system analyzes campus activity data and transforms it into useful insights. Instead of looking at individual datasets in isolation, the project attempts to identify relationships between engagement, academic activity, participation and other measurable campus signals.",

    objectives: [
      "Understand patterns in student engagement.",
      "Identify meaningful campus activity trends.",
      "Build predictive models from historical data.",
      "Present complex campus information through accessible dashboards.",
    ],

    technologies: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "React",
      "PostgreSQL",
    ],

    outcomes: [
      "Predictive campus activity analysis",
      "Student engagement insights",
      "Interactive analytics dashboards",
      "Reusable data intelligence foundation",
    ],
  },


  /* -------------------------------------------------------
     RESEARCH
     ------------------------------------------------------- */

  "computer-vision-research-lab": {
    type: "RESEARCH",

    title: "Computer Vision Research Lab",

    subtitle:
      "Applied computer vision research conducted by students and faculty.",

    category: "Computer Vision",

    accent: "indigo",

    icon: FiDatabase,

    status: "Active",

    updated: "Updated 4 days ago",

    owner: "Computer Vision Research Group",

    description:
      "The Computer Vision Research Lab brings together student and faculty work focused on visual intelligence, image understanding and computer vision systems.",

    overview:
      "Research within the lab explores how machines can interpret visual information. Projects may include image classification, object detection, image analysis and intelligent visual systems.",

    objectives: [
      "Explore practical computer vision applications.",
      "Develop and evaluate visual intelligence models.",
      "Create opportunities for student research.",
      "Connect academic research with practical applications.",
    ],

    technologies: [
      "Python",
      "OpenCV",
      "PyTorch",
      "TensorFlow",
      "Computer Vision",
    ],

    outcomes: [
      "Computer vision experiments",
      "Image intelligence research",
      "Student research opportunities",
      "Reusable visual computing knowledge",
    ],
  },


  /* -------------------------------------------------------
     GUIDE
     ------------------------------------------------------- */

  "machine-learning-deployment": {
    type: "GUIDE",

    title: "Machine Learning Deployment",

    subtitle:
      "A practical guide created from previous student deployment experience.",

    category: "MLOps",

    accent: "green",

    icon: FiBookOpen,

    status: "Published",

    updated: "Updated 1 week ago",

    owner: "Technology Community",

    description:
      "A practical campus guide covering the important steps involved in taking a machine learning project from development to deployment.",

    overview:
      "The guide documents common deployment practices so that students can learn from previous project experience instead of starting from scratch every time.",

    objectives: [
      "Understand the machine learning deployment lifecycle.",
      "Prepare models for production environments.",
      "Connect machine learning models with applications.",
      "Document deployment practices for future students.",
    ],

    technologies: [
      "Python",
      "FastAPI",
      "Docker",
      "GitHub",
      "Cloud Deployment",
    ],

    outcomes: [
      "Reusable deployment knowledge",
      "Production-oriented project practices",
      "Faster student deployments",
      "Documented MLOps experience",
    ],
  },


  /* -------------------------------------------------------
     PROJECT
     ------------------------------------------------------- */

  "ai-campus-assistant": {
    type: "PROJECT",

    title: "AI Campus Assistant",

    subtitle:
      "A student-built intelligent assistant designed to help students navigate campus information.",

    category: "Generative AI",

    accent: "blue",

    icon: FiZap,

    status: "Active",

    updated: "Updated 2 days ago",

    owner: "Student Innovation Lab",

    description:
      "AI Campus Assistant is a generative AI project designed to help students discover and interact with campus information through a conversational interface.",

    overview:
      "The project aims to make campus information easier to discover by allowing students to interact with institutional knowledge using natural language. It can serve as an intelligent interface over campus resources, guides and services.",

    objectives: [
      "Make campus information easier to discover.",
      "Provide conversational access to institutional knowledge.",
      "Reduce the time required to find relevant information.",
      "Create an intelligent student-facing campus assistant.",
    ],

    technologies: [
      "Python",
      "FastAPI",
      "React",
      "LLM",
      "Vector Search",
    ],

    outcomes: [
      "Conversational campus information access",
      "AI-powered student assistance",
      "Knowledge discovery",
      "Natural language interaction",
    ],
  },


  /* -------------------------------------------------------
     RESEARCH
     ------------------------------------------------------- */

  "predictive-student-analytics": {
    type: "RESEARCH",

    title: "Predictive Student Analytics",

    subtitle:
      "Research focused on predicting student engagement and academic patterns.",

    category: "Machine Learning",

    accent: "indigo",

    icon: FiDatabase,

    status: "Ongoing",

    updated: "Updated 4 days ago",

    owner: "Data Intelligence Lab",

    description:
      "Predictive Student Analytics explores how historical student activity and academic signals can be used to understand patterns and generate useful predictive insights.",

    overview:
      "The research investigates relationships between student activity, engagement and academic patterns. The goal is to transform historical institutional data into insights that can support student development and institutional planning.",

    objectives: [
      "Identify patterns in student engagement.",
      "Explore predictive modelling techniques.",
      "Understand factors associated with academic activity.",
      "Develop responsible student intelligence systems.",
    ],

    technologies: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Machine Learning",
      "Data Visualization",
    ],

    outcomes: [
      "Student engagement insights",
      "Predictive modelling experiments",
      "Data-driven academic analysis",
      "Research knowledge for future projects",
    ],
  },


  /* -------------------------------------------------------
     GUIDE
     ------------------------------------------------------- */

  "building-with-supabase": {
    type: "GUIDE",

    title: "Building with Supabase",

    subtitle:
      "A practical guide for building campus applications with Supabase.",

    category: "Backend",

    accent: "green",

    icon: FiBookOpen,

    status: "Published",

    updated: "Updated 1 week ago",

    owner: "Technology Community",

    description:
      "A campus guide explaining practical patterns for using Supabase as the backend foundation for modern student applications.",

    overview:
      "The guide introduces database, authentication and backend concepts that students can use when building applications that require persistent data and user accounts.",

    objectives: [
      "Understand Supabase project structure.",
      "Work with PostgreSQL databases.",
      "Connect frontend applications with Supabase.",
      "Build secure authentication and data workflows.",
    ],

    technologies: [
      "Supabase",
      "PostgreSQL",
      "React",
      "Authentication",
      "REST APIs",
    ],

    outcomes: [
      "Reusable backend knowledge",
      "Database development experience",
      "Authentication implementation",
      "Modern application architecture",
    ],
  },


  /* -------------------------------------------------------
     PROJECT
     ------------------------------------------------------- */

  "campus-digital-twin": {
    type: "PROJECT",

    title: "Campus Digital Twin",

    subtitle:
      "A digital representation of campus systems designed for simulation and intelligence.",

    category: "Digital Twin",

    accent: "cyan",

    icon: FiLayers,

    status: "Ongoing",

    updated: "Updated 1 week ago",

    owner: "NEXUS Research Group",

    description:
      "Campus Digital Twin is a project exploring how a digital representation of campus systems can be used to understand relationships, simulate scenarios and support institutional intelligence.",

    overview:
      "The project models important campus entities and relationships in a connected digital environment. This creates a foundation for understanding how people, projects, departments, resources and activities interact across the institution.",

    objectives: [
      "Represent important campus entities digitally.",
      "Connect campus systems and relationships.",
      "Support simulation and scenario analysis.",
      "Create a foundation for campus intelligence.",
    ],

    technologies: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Neo4j",
      "Data Visualization",
    ],

    outcomes: [
      "Connected campus representation",
      "Institutional relationship mapping",
      "Simulation opportunities",
      "Foundation for campus intelligence",
    ],
  },
};


/* =========================================================
   COMPONENT
   ========================================================= */

function KnowledgeDetail() {

  const navigate = useNavigate();

  const { slug } = useParams();

  const item = knowledgeItems[slug];

  /* =======================================================
     NOT FOUND
     ======================================================= */

  if (!item) {

    return (
      <main className="knowledge-detail-page">

        <section className="knowledge-detail-not-found">

          <div className="knowledge-detail-not-found-icon">
            <FiFileText size={38} />
          </div>

          <div className="knowledge-detail-eyebrow">
            NEXUS KNOWLEDGE NETWORK
          </div>

          <h1>
            Knowledge not found
          </h1>

          <p>
            The knowledge item you are looking for
            does not exist in the NEXUS knowledge
            network.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/student/knowledge")
            }
          >
            <FiArrowLeft size={17} />
            Back to Knowledge
          </button>

        </section>

      </main>
    );
  }


  const Icon = item.icon;


  /* =======================================================
     DETAIL PAGE
     ======================================================= */

  return (
    <main className="knowledge-detail-page">

      {/* ===================================================
          BACK
          =================================================== */}

      <button
        type="button"
        className="knowledge-detail-back"
        onClick={() =>
          navigate("/student/knowledge")
        }
      >
        <FiArrowLeft size={18} />
        Back to Knowledge
      </button>


      {/* ===================================================
          HERO
          =================================================== */}

      <section
        className={`knowledge-detail-hero ${item.accent}`}
      >

        <div className="knowledge-detail-hero-content">

          <div className="knowledge-detail-type-row">

            <span className="knowledge-detail-type">
              {item.type}
            </span>

            <span className="knowledge-detail-status">
              <span />
              {item.status}
            </span>

          </div>


          <h1>
            {item.title}
          </h1>


          <p className="knowledge-detail-subtitle">
            {item.subtitle}
          </p>


          <div className="knowledge-detail-meta">

            <div>
              <span>DOMAIN</span>
              <strong>
                {item.category}
              </strong>
            </div>

            <div>
              <span>CREATED BY</span>
              <strong>
                {item.owner}
              </strong>
            </div>

            <div>
              <span>UPDATED</span>
              <strong>
                {item.updated}
              </strong>
            </div>

          </div>

        </div>


        <div className="knowledge-detail-hero-icon">
          <Icon size={54} />
        </div>

      </section>


      {/* ===================================================
          MAIN CONTENT
          =================================================== */}

      <section className="knowledge-detail-content">

        {/* -------------------------------------------------
            LEFT
            ------------------------------------------------- */}

        <div className="knowledge-detail-main">

          <div className="knowledge-detail-section">

            <div className="knowledge-detail-section-label">
              OVERVIEW
            </div>

            <h2>
              About this knowledge
            </h2>

            <p>
              {item.description}
            </p>

            <p>
              {item.overview}
            </p>

          </div>


          {/* ------------------------------------------------
              OBJECTIVES
              ------------------------------------------------ */}

          <div className="knowledge-detail-section">

            <div className="knowledge-detail-section-label">
              OBJECTIVES
            </div>

            <h2>
              What this work focuses on
            </h2>

            <div className="knowledge-detail-list">

              {item.objectives.map(
                (objective, index) => (

                  <div
                    className="knowledge-detail-list-item"
                    key={index}
                  >

                    <FiCheckCircle size={19} />

                    <span>
                      {objective}
                    </span>

                  </div>

                )
              )}

            </div>

          </div>


          {/* ------------------------------------------------
              OUTCOMES
              ------------------------------------------------ */}

          <div className="knowledge-detail-section">

            <div className="knowledge-detail-section-label">
              OUTCOMES
            </div>

            <h2>
              What has been documented
            </h2>

            <div className="knowledge-outcome-grid">

              {item.outcomes.map(
                (outcome, index) => (

                  <div
                    className="knowledge-outcome-card"
                    key={index}
                  >

                    <div className="knowledge-outcome-number">
                      0{index + 1}
                    </div>

                    <p>
                      {outcome}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>


        {/* -------------------------------------------------
            RIGHT SIDEBAR
            ------------------------------------------------- */}

        <aside className="knowledge-detail-sidebar">

          {/* TECHNOLOGIES */}

          <div className="knowledge-detail-side-card">

            <div className="knowledge-detail-side-label">
              TECHNOLOGIES
            </div>

            <h3>
              Built with
            </h3>

            <div className="knowledge-technology-list">

              {item.technologies.map(
                (technology) => (

                  <div
                    key={technology}
                    className="knowledge-technology"
                  >

                    <FiCode size={16} />

                    <span>
                      {technology}
                    </span>

                  </div>

                )
              )}

            </div>

          </div>


          {/* CONNECTIONS */}

          <div className="knowledge-detail-side-card">

            <div className="knowledge-detail-side-label">
              CAMPUS CONNECTIONS
            </div>

            <h3>
              Connected knowledge
            </h3>

            <div className="knowledge-connection-list">

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/student/knowledge/technologies"
                  )
                }
              >
                <FiCode size={17} />

                <span>
                  Technologies
                </span>

                <FiChevronRight
                  size={16}
                />
              </button>


              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/student/knowledge/research"
                  )
                }
              >
                <FiDatabase size={17} />

                <span>
                  Research
                </span>

                <FiChevronRight
                  size={16}
                />
              </button>


              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/student/knowledge/faculty"
                  )
                }
              >
                <FiUsers size={17} />

                <span>
                  Faculty Expertise
                </span>

                <FiChevronRight
                  size={16}
                />
              </button>

            </div>

          </div>


          {/* STATUS */}

          <div className="knowledge-detail-side-card knowledge-detail-status-card">

            <div className="knowledge-detail-side-status-icon">
              <FiClock size={19} />
            </div>

            <div>

              <span>
                KNOWLEDGE STATUS
              </span>

              <strong>
                {item.status}
              </strong>

            </div>

          </div>

        </aside>

      </section>


      {/* ===================================================
          FOOTER NAVIGATION
          =================================================== */}

      <section className="knowledge-detail-footer">

        <div>

          <span>
            NEXUS KNOWLEDGE NETWORK
          </span>

          <h2>
            Continue exploring campus intelligence.
          </h2>

        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/student/knowledge")
          }
        >
          Explore Knowledge
          <FiArrowRight size={18} />
        </button>

      </section>

    </main>
  );
}

export default KnowledgeDetail;