import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiBriefcase,
  FiCheckCircle,
  FiChevronRight,
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


  /* -------------------------------------------------------
     RESEARCH
     ------------------------------------------------------- */

  "natural-language-processing-lab": {
    type: "RESEARCH",
    title: "Natural Language Processing Lab",
    subtitle:
      "Applied NLP research investigating large language models and institutional text intelligence.",
    category: "Artificial Intelligence",
    accent: "indigo",
    icon: FiDatabase,
    status: "Active",
    updated: "Updated 3 days ago",
    owner: "NEXUS Language Intelligence Lab",
    description:
      "Research focused on natural language processing, semantic retrieval, and conversational campus models.",
    overview:
      "The Natural Language Processing Lab explores practical methods for indexing, querying, and reasoning across campus information using transformer models, embeddings, and context-aware agents.",
    objectives: [
      "Develop campus-specific language understanding models.",
      "Index institutional documentation for semantic search.",
      "Evaluate instruction tuning for campus academic queries.",
      "Provide accessible language APIs for student research.",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "Hugging Face",
      "FastAPI",
      "Vector Search",
    ],
    outcomes: [
      "Semantic campus search models",
      "Open-source fine-tuned checkpoints",
      "Student thesis research papers",
      "Institutional text analysis toolkit",
    ],
  },


  /* -------------------------------------------------------
     GUIDES
     ------------------------------------------------------- */

  "getting-started-with-github": {
    type: "GUIDE",
    title: "Getting Started with GitHub",
    subtitle:
      "A practical guide for campus students managing projects, version control and collaborative workflows.",
    category: "Development",
    accent: "green",
    icon: FiBookOpen,
    status: "Published",
    updated: "Updated 1 week ago",
    owner: "Open Source Campus Community",
    description:
      "A structured walkthrough on Git version control, branching strategies, and collaboration practices.",
    overview:
      "This guide covers the fundamental version control concepts every student needs, from cloning repositories and creating feature branches to opening pull requests and collaborating on group coursework.",
    objectives: [
      "Master core Git CLI commands and concepts.",
      "Understand trunk-based and feature-branch workflows.",
      "Learn to create clear pull requests and perform code reviews.",
      "Manage campus open-source project repositories effectively.",
    ],
    technologies: [
      "Git",
      "GitHub",
      "Markdown",
      "CI/CD Actions",
    ],
    outcomes: [
      "Standardized student collaboration workflow",
      "Reduced merge conflict disruptions",
      "Professional git history practices",
      "Faster onboarding for team projects",
    ],
  },

  "building-your-first-ai-project": {
    type: "GUIDE",
    title: "Building Your First AI Project",
    subtitle:
      "A step-by-step campus roadmap from problem framing to model evaluation and interactive demonstration.",
    category: "Artificial Intelligence",
    accent: "green",
    icon: FiBookOpen,
    status: "Published",
    updated: "Updated 5 days ago",
    owner: "AI & Data Science Student Team",
    description:
      "A foundational guide designed to help students conceptualize, train, and present their initial AI projects.",
    overview:
      "Designed for beginners, this resource covers dataset selection, preprocessing pipelines, model selection, baseline benchmarking, and simple web deployment for demonstration day.",
    objectives: [
      "Formulate viable machine learning problem statements.",
      "Source and preprocess clean academic datasets.",
      "Train baseline models and evaluate performance metrics.",
      "Deploy interactive models for campus demonstrations.",
    ],
    technologies: [
      "Python",
      "Scikit-learn",
      "Streamlit",
      "Pandas",
      "Matplotlib",
    ],
    outcomes: [
      "Step-by-step project blueprint",
      "Reproducible starter template",
      "Dataset evaluation checklist",
      "Live interactive demonstration guide",
    ],
  },


  /* -------------------------------------------------------
     TECHNOLOGIES
     ------------------------------------------------------- */

  "python": {
    type: "TECHNOLOGY",
    title: "Python",
    subtitle:
      "The core programming language powering AI, data science, research automation, and backend systems at NEXUS.",
    category: "Programming",
    accent: "orange",
    icon: FiCode,
    status: "Documented",
    updated: "Updated this semester",
    owner: "Campus Technical Council",
    description:
      "Python is the primary language utilized across student computing labs, data science curricula, and intelligent campus tooling.",
    overview:
      "With extensive library ecosystems in scientific computing, machine learning, and web development, Python serves as the foundational language for undergraduate and research projects across campus.",
    objectives: [
      "Standardize modern Python 3.12+ environments across departments.",
      "Promote virtual environments and dependency management.",
      "Encourage clean coding standards and typing conventions.",
      "Support high-performance data processing and AI pipelines.",
    ],
    technologies: [
      "Python 3",
      "Poetry",
      "NumPy",
      "Pandas",
      "FastAPI",
    ],
    outcomes: [
      "Over 420 active campus project repositories",
      "Shared university package templates",
      "Automated lab testing environments",
      "Rich community support and peer mentoring",
    ],
  },

  "react": {
    type: "TECHNOLOGY",
    title: "React",
    subtitle:
      "Modern component-driven web framework utilized for student dashboards, campus portals, and interactive tools.",
    category: "Frontend",
    accent: "orange",
    icon: FiCode,
    status: "Documented",
    updated: "Updated this semester",
    owner: "Campus Technical Council",
    description:
      "React provides the declarative component architecture underlying the NEXUS platform and numerous campus software systems.",
    overview:
      "Students and researchers leverage React along with Vite to develop high-performance user interfaces, administrative tools, and real-time visualization dashboards with clean state management.",
    objectives: [
      "Foster modern component architecture and reusable design systems.",
      "Implement responsive, accessible interface standards.",
      "Integrate with REST and WebSocket institutional backend services.",
      "Accelerate student web application development.",
    ],
    technologies: [
      "React 19",
      "Vite",
      "JavaScript / JSX",
      "CSS Modules",
      "React Router",
    ],
    outcomes: [
      "Over 210 campus web applications built",
      "NEXUS unified design component library",
      "Accessible mobile-responsive interface patterns",
      "Reusable authentication and layout wrappers",
    ],
  },

  "fastapi": {
    type: "TECHNOLOGY",
    title: "FastAPI",
    subtitle:
      "High-performance Python web framework for building institutional APIs and machine learning services.",
    category: "Backend",
    accent: "orange",
    icon: FiCode,
    status: "Documented",
    updated: "Updated this semester",
    owner: "Campus Technical Council",
    description:
      "FastAPI is the standard backend framework for serving machine learning models, async database workflows, and campus intelligence endpoints.",
    overview:
      "Leveraging Python type hints and OpenAPI standards, FastAPI allows students to quickly generate self-documenting, asynchronous backend microservices with automatic validation.",
    objectives: [
      "Standardize asynchronous backend API development.",
      "Enable seamless model serving for machine learning projects.",
      "Enforce strict Pydantic validation across request contracts.",
      "Ensure robust JWT authentication and role authorization.",
    ],
    technologies: [
      "FastAPI",
      "Pydantic",
      "Uvicorn",
      "SQLAlchemy",
      "AsyncIO",
    ],
    outcomes: [
      "Over 140 campus services and model endpoints",
      "Automated interactive Swagger documentation",
      "Standardized JWT authentication modules",
      "Sub-10ms response times for core campus APIs",
    ],
  },

  "postgresql": {
    type: "TECHNOLOGY",
    title: "PostgreSQL",
    subtitle:
      "Enterprise relational database management system storing institutional records, project schemas, and analytics data.",
    category: "Database",
    accent: "orange",
    icon: FiCode,
    status: "Documented",
    updated: "Updated this semester",
    owner: "Campus Technical Council",
    description:
      "PostgreSQL serves as the primary transactional and analytical datastore for NEXUS and campus research projects.",
    overview:
      "Renowned for reliability and robust ACID compliance, PostgreSQL powers relational data models, vector extensions, and institutional analytics queries across departments.",
    objectives: [
      "Maintain reliable, structured campus relational schemas.",
      "Support pgvector extensions for semantic AI search.",
      "Teach advanced SQL, indexing, and query optimization.",
      "Ensure data integrity and backup resilience across databases.",
    ],
    technologies: [
      "PostgreSQL 16",
      "pgvector",
      "SQLAlchemy",
      "Alembic",
      "SQL",
    ],
    outcomes: [
      "Over 180 campus database instances",
      "Relational schemas for projects, users, and mentors",
      "Vector index support for institutional embeddings",
      "Automated migration and backup protocols",
    ],
  },

  "machine-learning": {
    type: "TECHNOLOGY",
    title: "Machine Learning",
    subtitle:
      "Applied statistical modeling, predictive analytics, and pattern recognition across engineering domains.",
    category: "Artificial Intelligence",
    accent: "orange",
    icon: FiCode,
    status: "Documented",
    updated: "Updated this semester",
    owner: "AI & Data Science Department",
    description:
      "Machine learning workflows allow campus researchers to derive actionable insights from complex academic and operational datasets.",
    overview:
      "From supervised classification and regression to unsupervised clustering and anomaly detection, machine learning models drive key intelligence features within the campus ecosystem.",
    objectives: [
      "Equip students with end-to-end model training expertise.",
      "Ensure reproducible experimentation and metric tracking.",
      "Address bias, interpretability, and ethical ML deployment.",
      "Bridge academic theory with practical campus challenges.",
    ],
    technologies: [
      "Scikit-learn",
      "XGBoost",
      "PyTorch",
      "Pandas",
      "MLflow",
    ],
    outcomes: [
      "Over 320 student projects with ML capabilities",
      "Campus predictive engagement models",
      "Cross-departmental collaborative datasets",
      "Published student research symposium papers",
    ],
  },

  "computer-vision": {
    type: "TECHNOLOGY",
    title: "Computer Vision",
    subtitle:
      "Image intelligence, spatial sensing, and visual pattern recognition for robotics and intelligent monitoring.",
    category: "Artificial Intelligence",
    accent: "orange",
    icon: FiCode,
    status: "Documented",
    updated: "Updated this semester",
    owner: "Computer Vision Research Group",
    description:
      "Computer vision technologies empower students to extract high-level representations from digital imagery and video streams.",
    overview:
      "Utilized across drone navigation, lab safety monitoring, and automated document analysis, computer vision is one of the most active research areas on campus.",
    objectives: [
      "Provide lab access to GPU compute clusters for model training.",
      "Support edge inference on embedded devices like Jetson and Raspberry Pi.",
      "Train visual transformers and convolutional backbones.",
      "Build ethical visual sensing systems.",
    ],
    technologies: [
      "OpenCV",
      "PyTorch",
      "YOLOv8",
      "TorchVision",
      "CUDA",
    ],
    outcomes: [
      "Over 150 vision-based student applications",
      "Campus autonomous navigation research",
      "Automated lab instrument monitoring",
      "Undergraduate computer vision symposium exhibits",
    ],
  },


  /* -------------------------------------------------------
     FACULTY EXPERTISE
     ------------------------------------------------------- */

  "faculty-ai-machine-learning": {
    type: "FACULTY EXPERTISE",
    title: "Faculty Expertise: AI & Machine Learning",
    subtitle:
      "Faculty advisory network specializing in deep learning, probabilistic modeling, and intelligent software.",
    category: "Artificial Intelligence",
    accent: "purple",
    icon: FiUsers,
    status: "Active",
    updated: "Updated this semester",
    owner: "Department of AI & Data Science",
    description:
      "Distinguished campus faculty members available to mentor students on advanced AI and machine learning initiatives.",
    overview:
      "This expertise cluster connects students working on capstone projects and research papers with professors whose research domains include deep learning architectures, reinforcement learning, and AI ethics.",
    objectives: [
      "Provide academic mentorship for AI student projects.",
      "Supervise student research publications in peer-reviewed venues.",
      "Facilitate industry-sponsored capstone opportunities.",
      "Host departmental seminars on state-of-the-art AI advancements.",
    ],
    technologies: [
      "Deep Learning",
      "Reinforcement Learning",
      "NLP",
      "PyTorch",
      "Research Methodologies",
    ],
    outcomes: [
      "Over 40 mentored student project teams",
      "15+ co-authored journal publications",
      "Annual AI student research symposium",
      "Curriculum alignment with industry advancements",
    ],
  },

  "faculty-computer-vision": {
    type: "FACULTY EXPERTISE",
    title: "Faculty Expertise: Computer Vision",
    subtitle:
      "Faculty research group focused on visual intelligence, robotics, and image processing.",
    category: "Computer Vision",
    accent: "purple",
    icon: FiUsers,
    status: "Active",
    updated: "Updated this semester",
    owner: "Department of Computer Science & Engineering",
    description:
      "Faculty specialists guiding research in robotic vision, 3D reconstruction, and multimodal visual intelligence.",
    overview:
      "Faculty in this group lead funded research labs where students work directly alongside professors on vision-based robotics, automated medical imaging, and aerial surveillance systems.",
    objectives: [
      "Advise student teams on complex computer vision architectures.",
      "Maintain laboratory equipment including stereo cameras and drone rigs.",
      "Guide experimental methodology and ablation analysis.",
      "Connect students with robotics research grants.",
    ],
    technologies: [
      "Robotics",
      "3D Vision",
      "Image Processing",
      "Embedded AI",
      "Sensor Fusion",
    ],
    outcomes: [
      "28 supervised capstone projects",
      "Autonomous campus drone research initiative",
      "Open-source image segmentation benchmarks",
      "Funded student research internships",
    ],
  },

  "faculty-data-science": {
    type: "FACULTY EXPERTISE",
    title: "Faculty Expertise: Data Science",
    subtitle:
      "Faculty guidance across big data analytics, statistical learning, and institutional intelligence.",
    category: "Data Science",
    accent: "purple",
    icon: FiUsers,
    status: "Active",
    updated: "Updated this semester",
    owner: "Department of AI & Data Science",
    description:
      "Faculty advisory body supporting data-intensive student inquiries, statistical modeling, and experimental design.",
    overview:
      "Faculty experts provide guidance on exploratory data analysis, causal inference, time-series forecasting, and big data engineering across campus disciplines.",
    objectives: [
      "Support student data analytics and predictive modeling.",
      "Review experimental setups and statistical validity.",
      "Guide data visualization and institutional storytelling.",
      "Facilitate campus-wide data-driven decision tools.",
    ],
    technologies: [
      "Statistical Modeling",
      "R",
      "Python",
      "SQL",
      "Time Series Analysis",
    ],
    outcomes: [
      "37 guided student analytics projects",
      "Predictive student engagement research",
      "Interdepartmental data science clinics",
      "Workshops on statistical rigor in engineering",
    ],
  },

  "faculty-iot-embedded-systems": {
    type: "FACULTY EXPERTISE",
    title: "Faculty Expertise: IoT & Embedded Systems",
    subtitle:
      "Faculty mentorship in microcontroller programming, sensor networks, and edge intelligence.",
    category: "IoT & Hardware",
    accent: "purple",
    icon: FiUsers,
    status: "Active",
    updated: "Updated this semester",
    owner: "Department of Electronics & Communication",
    description:
      "Faculty advisors dedicated to helping students bridge software and hardware in embedded IoT systems.",
    overview:
      "Advisors provide laboratory support, PCB fabrication guidance, and firmware optimization strategies for students building connected physical devices.",
    objectives: [
      "Mentor smart campus hardware and sensing initiatives.",
      "Provide hands-on laboratory testing protocols.",
      "Guide low-power edge compute and communication protocols.",
      "Support patent filings and hardware incubation.",
    ],
    technologies: [
      "Embedded C++",
      "ESP32",
      "LoRaWAN",
      "MQTT",
      "Edge AI",
    ],
    outcomes: [
      "31 active smart campus hardware deployments",
      "Energy monitoring IoT testbed",
      "Student prototyping lab access",
      "Collaborative hardware patent applications",
    ],
  },


  /* -------------------------------------------------------
     STUDENT WORK
     ------------------------------------------------------- */

  "student-skill-intelligence": {
    type: "STUDENT WORK",
    title: "Student Skill Intelligence",
    subtitle:
      "A student-designed intelligence engine mapping campus learning outcomes to industry skill demands.",
    category: "Artificial Intelligence",
    accent: "cyan",
    icon: FiZap,
    status: "Active",
    updated: "Updated 3 days ago",
    owner: "Student Innovation Lab",
    description:
      "An intelligent graph-based mapping system connecting student projects, coursework, and detected capabilities.",
    overview:
      "Developed by undergraduate students, this system analyzes student code repositories and coursework submissions to build personalized capability profiles that dynamically surface relevant mentors and opportunities.",
    objectives: [
      "Quantify skill development through practical project output.",
      "Generate personalized learning and growth recommendations.",
      "Match students with compatible peer collaborators.",
      "Provide transparent skill verification for campus recruiters.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Neo4j",
      "React",
      "Scikit-learn",
    ],
    outcomes: [
      "Live student skill graph mapping",
      "Automated collaborator matching algorithm",
      "Curriculum alignment feedback for departments",
      "Integrated portfolio generation",
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