import {
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiDatabase,
  FiUsers,
  FiZap,
} from "react-icons/fi";

/* =========================================================
   NEXUS KNOWLEDGE REPOSITORY
   Unified deterministic dataset for all Knowledge pages.
   ========================================================= */

export const KNOWLEDGE_ITEMS = {
  /* -------------------------------------------------------
     PROJECTS / STUDENT WORK
     ------------------------------------------------------- */

  "smart-campus-analytics": {
    slug: "smart-campus-analytics",
    type: "PROJECT",
    categoryType: "student-work",
    title: "Smart Campus Analytics",
    subtitle:
      "Predictive analytics for understanding campus activity and student engagement.",
    category: "Data Science",
    accent: "blue",
    icon: FiBriefcase,
    status: "Active",
    updated: "Updated 2 days ago",
    owner: "AI & Data Science Student Team",
    team: "AI & DS Students",
    department: "AI & Data Science",
    featured: true,
    curatedOrder: 1,
    description:
      "Smart Campus Analytics is a student-built intelligence project designed to understand patterns across campus activity and student engagement. The project brings together data analysis, machine learning and visualization to help identify meaningful trends across the institution.",
    overview:
      "The system analyzes campus activity data and transforms it into useful insights. Instead of looking at individual datasets in isolation, the project attempts to identify relationships between engagement, academic activity, participation and other measurable campus signals.",
    whyItMatters:
      "Campus systems generate vast operational data daily. Transforming distributed logs into unified analytics provides institutional visibility, surfaces at-risk milestones early, and equips department leads with empirical intelligence.",
    objectives: [
      "Understand patterns in student engagement across campus facilities.",
      "Identify meaningful academic and attendance activity trends.",
      "Build predictive models from historical semester datasets.",
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
      "Predictive campus activity models with validated precision",
      "Student engagement trend discovery dashboards",
      "Modular analytics pipeline reusable by campus departments",
      "Open data interchange schemas for institutional researchers",
    ],
  },

  "ai-campus-assistant": {
    slug: "ai-campus-assistant",
    type: "PROJECT",
    categoryType: "student-work",
    title: "AI Campus Assistant",
    subtitle:
      "A student-built intelligent assistant designed to help students navigate campus information.",
    category: "Generative AI",
    accent: "blue",
    icon: FiZap,
    status: "Active",
    updated: "Updated 2 days ago",
    owner: "Student Innovation Lab",
    team: "Student Innovation Lab",
    department: "Computer Science",
    featured: true,
    curatedOrder: 2,
    description:
      "AI Campus Assistant is a generative AI project designed to help students discover and interact with campus information through a conversational interface.",
    overview:
      "The project aims to make campus information easier to discover by allowing students to interact with institutional knowledge using natural language. It can serve as an intelligent interface over campus resources, guides and services.",
    whyItMatters:
      "Institutional handbooks and departmental web pages are often fragmented. A conversational interface with grounded knowledge retrieval significantly lowers discovery friction for both new and senior students.",
    objectives: [
      "Make complex campus information discoverable through natural language.",
      "Provide grounded conversational access to institutional knowledge.",
      "Reduce the time required to find relevant administrative procedures.",
      "Create an intelligent, privacy-preserving campus assistant.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "Vector Search",
      "PostgreSQL",
    ],
    outcomes: [
      "Conversational campus information access service",
      "Grounded RAG architecture for institutional documentation",
      "Semantic indexing of campus FAQs and regulations",
      "Multi-turn natural language interaction pipeline",
    ],
  },

  "campus-digital-twin": {
    slug: "campus-digital-twin",
    type: "PROJECT",
    categoryType: "student-work",
    title: "Campus Digital Twin",
    subtitle:
      "A digital representation of campus systems designed for simulation and spatial intelligence.",
    category: "Digital Twin",
    accent: "blue",
    icon: FiZap,
    status: "Ongoing",
    updated: "Updated 1 week ago",
    owner: "NEXUS Research Group",
    team: "NEXUS Research Group",
    department: "Artificial Intelligence",
    featured: false,
    curatedOrder: 6,
    description:
      "Campus Digital Twin is a research initiative exploring spatial representations and connected models of university facilities, resources and operational activity.",
    overview:
      "The project constructs high-fidelity relational graphs mapping campus physical infrastructure to real-time sensor streams and scheduling databases, serving as an institutional sandbox for facilities planning.",
    whyItMatters:
      "Modern universities function as micro-cities. Simulating spatial flows and resource utilization reduces energy waste, optimizes classroom allocations, and models emergency response strategies.",
    objectives: [
      "Map physical spaces to digital intelligence graphs.",
      "Simulate pedestrian and resource flows during peak academic hours.",
      "Integrate IoT sensor data with administrative scheduling systems.",
      "Create an extensible foundation for campus intelligence.",
    ],
    technologies: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Neo4j",
      "Data Visualization",
    ],
    outcomes: [
      "Connected institutional graph representation",
      "Spatial relationship mapping across university facilities",
      "Operational simulation models for peak scheduling",
      "Foundation for predictive campus resource management",
    ],
  },

  "student-skill-intelligence": {
    slug: "student-skill-intelligence",
    type: "STUDENT WORK",
    categoryType: "student-work",
    title: "Student Skill Intelligence",
    subtitle:
      "A student-designed intelligence engine mapping campus learning outcomes to industry capabilities.",
    category: "Artificial Intelligence",
    accent: "cyan",
    icon: FiZap,
    status: "Active",
    updated: "Updated 3 days ago",
    owner: "Student Innovation Lab",
    team: "Student Innovation Lab",
    department: "AI & Data Science",
    featured: true,
    curatedOrder: 4,
    description:
      "An intelligent capability mapping system connecting student project output, coursework, and detected technical proficiencies.",
    overview:
      "Developed by undergraduate students, this system analyzes project code repositories and coursework milestones to build personalized capability profiles that dynamically surface relevant mentors and opportunities.",
    whyItMatters:
      "Transcripts only report grades, not demonstrated technical competencies. Objective skill graphs derived from verified projects bridge the evaluation gap between academic coursework and career requirements.",
    objectives: [
      "Quantify skill development through verified project contributions.",
      "Generate personalized capability and growth recommendations.",
      "Match students with complementary peer collaborators.",
      "Provide transparent skill verification for campus mentors and recruiters.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Neo4j",
      "React",
      "Scikit-learn",
    ],
    outcomes: [
      "Dynamic student capability graphs",
      "Automated collaborator and mentor matching algorithm",
      "Curriculum alignment insights for departments",
      "Portfolio verification framework for capstone projects",
    ],
  },

  /* -------------------------------------------------------
     RESEARCH
     ------------------------------------------------------- */

  "computer-vision-research-lab": {
    slug: "computer-vision-research-lab",
    type: "RESEARCH",
    categoryType: "research",
    title: "Computer Vision Research Lab",
    subtitle:
      "Applied computer vision research conducted by students and faculty on visual intelligence.",
    category: "Computer Vision",
    area: "Computer Vision",
    accent: "indigo",
    icon: FiDatabase,
    status: "Active",
    updated: "Updated 4 days ago",
    owner: "Computer Vision Research Group",
    department: "Artificial Intelligence",
    featured: true,
    curatedOrder: 3,
    description:
      "The Computer Vision Research Lab brings together student and faculty work focused on visual intelligence, image understanding and perceptual computing systems.",
    overview:
      "Research within the lab explores how computational vision systems interpret complex physical imagery. Projects span image classification, automated inspection, spatial scene understanding, and edge model optimization.",
    whyItMatters:
      "Visual intelligence forms the sensory basis of autonomous robotics, automated biomedical diagnostics, and intelligent physical infrastructure. Lab research provides students with direct exposure to state-of-the-art vision architectures.",
    objectives: [
      "Explore practical computer vision and perceptual modeling techniques.",
      "Develop and benchmark deep visual intelligence architectures.",
      "Create high-impact opportunities for undergraduate and graduate research.",
      "Connect academic vision research with campus operational challenges.",
    ],
    technologies: [
      "Python",
      "OpenCV",
      "PyTorch",
      "YOLOv8",
      "Computer Vision",
    ],
    outcomes: [
      "Novel edge vision deployment benchmarks",
      "High-accuracy visual defect detection datasets",
      "Student co-authored conference proceedings",
      "Open-source visual inspection toolkits",
    ],
  },

  "predictive-student-analytics": {
    slug: "predictive-student-analytics",
    type: "RESEARCH",
    categoryType: "research",
    title: "Predictive Student Analytics",
    subtitle:
      "Research focused on predicting academic engagement patterns and skill trajectory models.",
    category: "Machine Learning",
    area: "Machine Learning",
    accent: "indigo",
    icon: FiDatabase,
    status: "Active",
    updated: "Updated 4 days ago",
    owner: "Data Intelligence Lab",
    department: "Data Science",
    featured: true,
    curatedOrder: 5,
    description:
      "A long-term departmental research project examining multi-modal learning data to model academic trajectories and identify support interventions.",
    overview:
      "The research models non-identifiable campus interaction metrics to discover early indicators of student difficulty, evaluating the effectiveness of peer mentoring and proactive academic guidance.",
    whyItMatters:
      "Early intervention is critical in rigorous university curricula. Predictive engagement modeling enables advisors to offer structured support before students fall behind critical milestones.",
    objectives: [
      "Investigate ethical, privacy-preserving predictive academic models.",
      "Model longitudinal engagement signals across multi-semester coursework.",
      "Evaluate statistical correlation between lab participation and mastery.",
      "Deliver actionable insight dashboards for academic program coordinators.",
    ],
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "FastAPI",
      "PostgreSQL",
    ],
    outcomes: [
      "Validated engagement risk prediction algorithms",
      "Longitudinal student capability modeling framework",
      "Privacy-first statistical aggregation protocols",
      "Peer-reviewed academic analytics publications",
    ],
  },

  "natural-language-processing-lab": {
    slug: "natural-language-processing-lab",
    type: "RESEARCH",
    categoryType: "research",
    title: "Natural Language Processing Lab",
    subtitle:
      "Applied NLP research investigating language models, semantic indexing, and institutional text intelligence.",
    category: "Artificial Intelligence",
    area: "NLP",
    accent: "indigo",
    icon: FiDatabase,
    status: "Active",
    updated: "Updated 3 days ago",
    owner: "NEXUS Language Intelligence Lab",
    department: "Artificial Intelligence",
    featured: false,
    curatedOrder: 7,
    description:
      "Research focused on natural language processing, semantic retrieval, and conversational campus models.",
    overview:
      "The Natural Language Processing Lab explores practical methods for indexing, querying, and reasoning across campus information using transformer models, embeddings, and context-aware agents.",
    whyItMatters:
      "Academic institutions produce enormous text archives—from syllabi and research theses to institutional policies. Semantic NLP enables structured intelligence extraction from unstructured textual corpora.",
    objectives: [
      "Develop campus-specific language understanding and retrieval models.",
      "Index institutional documentation for high-precision semantic search.",
      "Evaluate domain-specific instruction tuning on academic coursework.",
      "Provide accessible language APIs for student research teams.",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "FastAPI",
      "Vector Search",
      "Machine Learning",
    ],
    outcomes: [
      "Semantic campus search models",
      "Domain-specific text intelligence benchmarks",
      "Student thesis research papers",
      "Institutional text analysis toolkit",
    ],
  },

  /* -------------------------------------------------------
     GUIDES
     ------------------------------------------------------- */

  "machine-learning-deployment": {
    slug: "machine-learning-deployment",
    type: "GUIDE",
    categoryType: "guides",
    title: "Machine Learning Deployment",
    subtitle:
      "A practical guide created from previous student deployment experience covering MLOps and production serving.",
    category: "MLOps",
    level: "Advanced",
    accent: "green",
    icon: FiBookOpen,
    status: "Published",
    updated: "Updated 1 week ago",
    owner: "Technology Community",
    department: "Computer Science",
    featured: true,
    curatedOrder: 8,
    description:
      "A practical campus guide covering the critical steps involved in taking a machine learning model from a Jupyter Notebook to a production web service.",
    overview:
      "The guide documents containerization, inference latency optimization, model serialization, API design, and health monitoring so students avoid common pitfalls when showcasing capstone projects.",
    whyItMatters:
      "A high-performing model in a notebook creates no institutional value if users cannot interact with it. Bridging the gap from prototype to containerized service is a fundamental industry engineering skill.",
    objectives: [
      "Understand the end-to-end machine learning deployment lifecycle.",
      "Prepare and serialize models for stateless production environments.",
      "Connect inference services with frontend React client applications.",
      "Document battle-tested MLOps practices for future campus cohorts.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Docker",
      "GitHub",
      "Machine Learning",
    ],
    outcomes: [
      "Reusable Dockerized deployment templates",
      "Production-oriented API design standards",
      "Sub-50ms inference server configurations",
      "Documented MLOps reference architectures",
    ],
  },

  "building-with-supabase": {
    slug: "building-with-supabase",
    type: "GUIDE",
    categoryType: "guides",
    title: "Building with Supabase",
    subtitle:
      "A practical guide for building secure, scalable campus web applications with Supabase and PostgreSQL.",
    category: "Backend",
    level: "Intermediate",
    accent: "green",
    icon: FiBookOpen,
    status: "Published",
    updated: "Updated 1 week ago",
    owner: "Technology Community",
    department: "Information Technology",
    featured: false,
    curatedOrder: 9,
    description:
      "A step-by-step walkthrough covering database schema design, row-level security, and authentication integration for student-led web platforms.",
    overview:
      "This guide illustrates how to architect transactional data models, configure row-level access policies (RLS), and handle user authorization cleanly without writing repetitive backend boilerplate.",
    whyItMatters:
      "Student teams frequently build project prototypes with hardcoded credentials or insecure databases. Standardizing on managed PostgreSQL and Row-Level Security establishes professional data protection practices early.",
    objectives: [
      "Design normalized relational database schemas for project backends.",
      "Enforce rigorous Row-Level Security (RLS) policies for user data.",
      "Integrate JWT authentication tokens with frontend React clients.",
      "Configure automated database backups and migration scripts.",
    ],
    technologies: [
      "PostgreSQL",
      "React",
      "FastAPI",
      "GitHub",
      "Database",
    ],
    outcomes: [
      "Secure student application blueprint",
      "Row-level security policy cheat sheet",
      "Automated migration templates",
      "Production deployment checklist",
    ],
  },

  "getting-started-with-github": {
    slug: "getting-started-with-github",
    type: "GUIDE",
    categoryType: "guides",
    title: "Getting Started with GitHub",
    subtitle:
      "A practical guide for campus students managing projects, version control and collaborative team workflows.",
    category: "Development",
    level: "Beginner",
    accent: "green",
    icon: FiBookOpen,
    status: "Published",
    updated: "Updated 1 week ago",
    owner: "Open Source Campus Community",
    department: "Computer Science",
    featured: false,
    curatedOrder: 10,
    description:
      "A structured walkthrough on Git version control, branching strategies, commit cleanliness, and pull request reviews.",
    overview:
      "This guide covers fundamental version control concepts every student needs, from cloning repositories and creating feature branches to resolving merge conflicts and collaborating on multi-member semester projects.",
    whyItMatters:
      "Poor version control hygiene leads to lost code, broken builds, and friction in group assignments. Consistent Git habits prevent team bottlenecks and reflect professional software engineering standards.",
    objectives: [
      "Master core Git command-line operations and conceptual models.",
      "Understand feature-branching and safe pull-request workflows.",
      "Learn to write descriptive commit messages and conduct peer reviews.",
      "Manage campus open-source project repositories effectively.",
    ],
    technologies: [
      "GitHub",
      "CI/CD Actions",
      "Markdown",
      "Programming",
    ],
    outcomes: [
      "Standardized student collaboration workflow",
      "Reduced merge conflict disruptions across coursework",
      "Professional git history best practices",
      "Fast onboarding playbook for team projects",
    ],
  },

  "building-your-first-ai-project": {
    slug: "building-your-first-ai-project",
    type: "GUIDE",
    categoryType: "guides",
    title: "Building Your First AI Project",
    subtitle:
      "A step-by-step campus roadmap from problem framing to model evaluation and live demonstration.",
    category: "Artificial Intelligence",
    level: "Beginner",
    accent: "green",
    icon: FiBookOpen,
    status: "Published",
    updated: "Updated 5 days ago",
    owner: "AI & Data Science Student Team",
    department: "AI & Data Science",
    featured: true,
    curatedOrder: 11,
    description:
      "A foundational roadmap designed to help students conceptualize, train, validate, and present their initial AI projects.",
    overview:
      "Designed for students starting their AI journey, this resource covers dataset selection, exploratory analysis, baseline model benchmarking, metric evaluation, and simple web deployment for demonstration day.",
    whyItMatters:
      "Many students struggle to transition from theoretical machine learning coursework to building functional projects. A structured roadmap demystifies the workflow and builds practical engineering confidence.",
    objectives: [
      "Formulate viable, well-bounded machine learning problem statements.",
      "Source and preprocess clean academic datasets responsibly.",
      "Train baseline models and evaluate objective performance metrics.",
      "Deploy interactive prototypes for campus exhibitions and reviews.",
    ],
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "Machine Learning",
    ],
    outcomes: [
      "Step-by-step project lifecycle blueprint",
      "Reproducible starter repository template",
      "Dataset evaluation and cleaning checklist",
      "Live interactive demonstration guide",
    ],
  },

  /* -------------------------------------------------------
     TECHNOLOGIES
     ------------------------------------------------------- */

  "python": {
    slug: "python",
    type: "TECHNOLOGY",
    categoryType: "technologies",
    title: "Python",
    subtitle:
      "The core programming language powering AI, data science, research automation, and backend systems at NEXUS.",
    category: "Programming",
    projects: "428 projects",
    accent: "orange",
    icon: FiCode,
    status: "Documented",
    updated: "Updated this semester",
    owner: "Campus Technical Council",
    department: "Computer Science",
    featured: true,
    curatedOrder: 12,
    description:
      "Python is the primary language utilized across student computing labs, data science curricula, and intelligent campus tooling.",
    overview:
      "With extensive library ecosystems in scientific computing, machine learning, and web development, Python serves as the foundational language for undergraduate and research projects across campus.",
    whyItMatters:
      "Its clean syntax, rich mathematical ecosystem, and widespread industry adoption make Python the ideal common language for cross-departmental research, automation, and intelligent applications.",
    objectives: [
      "Standardize modern Python 3.12+ environments across departments.",
      "Promote virtual environments and dependency management.",
      "Encourage clean coding standards, docstrings, and typing conventions.",
      "Support high-performance data processing and AI pipelines.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Pandas",
      "Scikit-learn",
      "PyTorch",
    ],
    outcomes: [
      "Over 420 active campus project repositories",
      "Shared university package templates",
      "Automated lab testing environments",
      "Rich community support and peer mentoring",
    ],
  },

  "react": {
    slug: "react",
    type: "TECHNOLOGY",
    categoryType: "technologies",
    title: "React",
    subtitle:
      "Modern component-driven web framework utilized for student dashboards, campus portals, and interactive tools.",
    category: "Frontend",
    projects: "216 projects",
    accent: "orange",
    icon: FiCode,
    status: "Documented",
    updated: "Updated this semester",
    owner: "Campus Technical Council",
    department: "Information Technology",
    featured: true,
    curatedOrder: 13,
    description:
      "React provides the declarative component architecture underlying the NEXUS platform and numerous campus software systems.",
    overview:
      "Students and researchers leverage React along with Vite to develop high-performance user interfaces, administrative tools, and real-time visualization dashboards with clean state management.",
    whyItMatters:
      "Component architecture and unidirectional data flow make React projects maintainable, accessible, and easily modularized across multi-student development teams.",
    objectives: [
      "Foster modern component architecture and reusable design systems.",
      "Implement responsive, accessible interface standards across viewports.",
      "Integrate with REST and asynchronous institutional backend services.",
      "Accelerate student web application development through shared patterns.",
    ],
    technologies: [
      "React",
      "Vite",
      "JavaScript",
      "CSS",
    ],
    outcomes: [
      "Over 210 campus web applications built",
      "NEXUS unified design component library",
      "Accessible mobile-responsive interface patterns",
      "Reusable authentication and layout wrappers",
    ],
  },

  "fastapi": {
    slug: "fastapi",
    type: "TECHNOLOGY",
    categoryType: "technologies",
    title: "FastAPI",
    subtitle:
      "High-performance Python web framework for building institutional APIs and machine learning services.",
    category: "Backend",
    projects: "142 projects",
    accent: "orange",
    icon: FiCode,
    status: "Documented",
    updated: "Updated this semester",
    owner: "Campus Technical Council",
    department: "Computer Science",
    featured: true,
    curatedOrder: 14,
    description:
      "FastAPI is the standard backend framework for serving machine learning models, async database workflows, and campus intelligence endpoints.",
    overview:
      "Leveraging Python type hints and OpenAPI standards, FastAPI allows students to quickly generate self-documenting, asynchronous backend microservices with automatic validation.",
    whyItMatters:
      "Asynchronous I/O and automatic schema validation enable student services to achieve high throughput with minimal overhead, making it ideal for real-time model inference.",
    objectives: [
      "Standardize asynchronous backend API development across labs.",
      "Enable seamless model serving for student machine learning projects.",
      "Enforce strict Pydantic validation across request contracts.",
      "Ensure robust JWT authentication and role authorization.",
    ],
    technologies: [
      "FastAPI",
      "Python",
      "PostgreSQL",
    ],
    outcomes: [
      "Over 140 campus services and model endpoints",
      "Automated interactive Swagger documentation",
      "Standardized JWT authentication modules",
      "Sub-10ms response times for core campus APIs",
    ],
  },

  "postgresql": {
    slug: "postgresql",
    type: "TECHNOLOGY",
    categoryType: "technologies",
    title: "PostgreSQL",
    subtitle:
      "Enterprise relational database management system storing institutional records, project schemas, and analytics data.",
    category: "Database",
    projects: "187 projects",
    accent: "orange",
    icon: FiCode,
    status: "Documented",
    updated: "Updated this semester",
    owner: "Campus Technical Council",
    department: "Information Technology",
    featured: false,
    curatedOrder: 15,
    description:
      "PostgreSQL serves as the primary transactional and analytical datastore for NEXUS and campus research projects.",
    overview:
      "Renowned for reliability and robust ACID compliance, PostgreSQL powers relational data models, vector extensions, and institutional analytics queries across departments.",
    whyItMatters:
      "Robust relational integrity, flexible JSON columns, and pgvector extension support allow PostgreSQL to handle both structured institutional records and semantic AI embeddings reliably.",
    objectives: [
      "Maintain reliable, structured campus relational schemas.",
      "Support pgvector extensions for semantic AI search.",
      "Teach advanced SQL, indexing, and query optimization.",
      "Ensure data integrity and backup resilience across databases.",
    ],
    technologies: [
      "PostgreSQL",
      "SQL",
      "FastAPI",
      "Database",
    ],
    outcomes: [
      "Over 180 campus database instances",
      "Relational schemas for projects, users, and mentors",
      "Vector index support for institutional embeddings",
      "Automated migration and backup protocols",
    ],
  },

  "machine-learning": {
    slug: "machine-learning",
    type: "TECHNOLOGY",
    categoryType: "technologies",
    title: "Machine Learning",
    subtitle:
      "Applied statistical modeling, predictive analytics, and pattern recognition across engineering domains.",
    category: "Artificial Intelligence",
    projects: "326 projects",
    accent: "orange",
    icon: FiCode,
    status: "Documented",
    updated: "Updated this semester",
    owner: "AI & Data Science Department",
    department: "AI & Data Science",
    featured: true,
    curatedOrder: 16,
    description:
      "Machine learning workflows allow campus researchers to derive actionable insights from complex academic and operational datasets.",
    overview:
      "From supervised classification and regression to unsupervised clustering and anomaly detection, machine learning models drive key intelligence features within the campus ecosystem.",
    whyItMatters:
      "Empirical pattern recognition enables data-driven decision making, automated discovery, and adaptive student experiences that evolve with institutional activity.",
    objectives: [
      "Equip students with end-to-end model training expertise.",
      "Ensure reproducible experimentation and metric tracking.",
      "Address bias, interpretability, and ethical ML deployment.",
      "Bridge academic theory with practical campus challenges.",
    ],
    technologies: [
      "Python",
      "Scikit-learn",
      "Machine Learning",
      "Pandas",
    ],
    outcomes: [
      "Over 320 student projects with ML capabilities",
      "Campus predictive engagement models",
      "Cross-departmental collaborative datasets",
      "Published student research symposium papers",
    ],
  },

  "computer-vision": {
    slug: "computer-vision",
    type: "TECHNOLOGY",
    categoryType: "technologies",
    title: "Computer Vision",
    subtitle:
      "Image intelligence, spatial sensing, and visual pattern recognition for robotics and intelligent monitoring.",
    category: "Artificial Intelligence",
    projects: "154 projects",
    accent: "orange",
    icon: FiCode,
    status: "Documented",
    updated: "Updated this semester",
    owner: "Computer Vision Research Group",
    department: "Artificial Intelligence",
    featured: false,
    curatedOrder: 17,
    description:
      "Computer vision technologies empower students to extract high-level representations from digital imagery and video streams.",
    overview:
      "Utilized across drone navigation, lab safety monitoring, and automated document analysis, computer vision is one of the most active research areas on campus.",
    whyItMatters:
      "Visual sensing enables software systems to perceive and interact meaningfully with physical environments, unlocking robotic autonomy and intelligent campus infrastructure.",
    objectives: [
      "Provide lab access to GPU compute clusters for model training.",
      "Support edge inference on embedded devices like Jetson and Raspberry Pi.",
      "Train visual transformers and convolutional backbones.",
      "Build ethical visual sensing systems with rigorous privacy controls.",
    ],
    technologies: [
      "Python",
      "OpenCV",
      "PyTorch",
      "Computer Vision",
    ],
    outcomes: [
      "Over 150 vision-based student applications",
      "Campus autonomous navigation research testbeds",
      "Automated lab instrument monitoring systems",
      "Undergraduate computer vision symposium exhibits",
    ],
  },

  /* -------------------------------------------------------
     FACULTY EXPERTISE
     ------------------------------------------------------- */

  "faculty-ai-machine-learning": {
    slug: "faculty-ai-machine-learning",
    type: "FACULTY EXPERTISE",
    categoryType: "faculty",
    title: "Faculty Expertise: AI & Machine Learning",
    subtitle:
      "Faculty advisory network specializing in deep learning, probabilistic modeling, and intelligent software.",
    category: "Artificial Intelligence",
    projects: "42 projects",
    expertise: "AI • ML • NLP",
    accent: "purple",
    icon: FiUsers,
    status: "Active",
    updated: "Updated this semester",
    owner: "Department of AI & Data Science",
    department: "AI & Data Science",
    featured: true,
    curatedOrder: 18,
    description:
      "Distinguished campus faculty members available to mentor students on advanced AI and machine learning initiatives.",
    overview:
      "This expertise cluster connects students working on capstone projects and research papers with professors whose research domains include deep learning architectures, reinforcement learning, and AI ethics.",
    whyItMatters:
      "Direct mentorship from published faculty members accelerates student research velocity, elevates code rigor, and bridges academic projects with industry standards.",
    objectives: [
      "Provide academic mentorship for AI student projects.",
      "Supervise student research publications in peer-reviewed venues.",
      "Facilitate industry-sponsored capstone opportunities.",
      "Host departmental seminars on state-of-the-art AI advancements.",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "Machine Learning",
      "Natural Language Processing",
    ],
    outcomes: [
      "Over 40 mentored student project teams",
      "15+ co-authored journal publications",
      "Annual AI student research symposium",
      "Curriculum alignment with industry advancements",
    ],
  },

  "faculty-computer-vision": {
    slug: "faculty-computer-vision",
    type: "FACULTY EXPERTISE",
    categoryType: "faculty",
    title: "Faculty Expertise: Computer Vision",
    subtitle:
      "Faculty research group focused on visual intelligence, robotics, and image processing.",
    category: "Computer Vision",
    projects: "28 projects",
    expertise: "CV • Image AI • Robotics",
    accent: "purple",
    icon: FiUsers,
    status: "Active",
    updated: "Updated this semester",
    owner: "Department of Computer Science & Engineering",
    department: "Computer Science",
    featured: false,
    curatedOrder: 19,
    description:
      "Faculty specialists guiding research in robotic vision, 3D reconstruction, and multimodal visual intelligence.",
    overview:
      "Faculty in this group lead funded research labs where students work directly alongside professors on vision-based robotics, automated medical imaging, and aerial surveillance systems.",
    whyItMatters:
      "Specialized computer vision laboratories require expensive optics and compute equipment. Faculty guidance ensures safe, optimal utilization of shared research infrastructure.",
    objectives: [
      "Advise student teams on complex computer vision architectures.",
      "Maintain laboratory equipment including stereo cameras and drone rigs.",
      "Guide experimental methodology and ablation analysis.",
      "Connect students with robotics research grants.",
    ],
    technologies: [
      "Computer Vision",
      "OpenCV",
      "Python",
      "PyTorch",
    ],
    outcomes: [
      "28 supervised capstone projects",
      "Autonomous campus drone research initiative",
      "Open-source image segmentation benchmarks",
      "Funded student research internships",
    ],
  },

  "faculty-data-science": {
    slug: "faculty-data-science",
    type: "FACULTY EXPERTISE",
    categoryType: "faculty",
    title: "Faculty Expertise: Data Science",
    subtitle:
      "Faculty guidance across big data analytics, statistical learning, and institutional intelligence.",
    category: "Data Science",
    projects: "37 projects",
    expertise: "Analytics • Statistics • ML",
    accent: "purple",
    icon: FiUsers,
    status: "Active",
    updated: "Updated this semester",
    owner: "Department of AI & Data Science",
    department: "AI & Data Science",
    featured: false,
    curatedOrder: 20,
    description:
      "Faculty advisory body supporting data-intensive student inquiries, statistical modeling, and experimental design.",
    overview:
      "Faculty experts provide guidance on exploratory data analysis, causal inference, time-series forecasting, and big data engineering across campus disciplines.",
    whyItMatters:
      "Statistical validity prevents students from drawing spurious conclusions from noisy data. Expert faculty oversight guarantees methodological rigor in student analytics.",
    objectives: [
      "Support student data analytics and predictive modeling.",
      "Review experimental setups and statistical validity.",
      "Guide data visualization and institutional storytelling.",
      "Facilitate campus-wide data-driven decision tools.",
    ],
    technologies: [
      "Python",
      "Pandas",
      "PostgreSQL",
      "Data Science",
    ],
    outcomes: [
      "37 guided student analytics projects",
      "Predictive student engagement research",
      "Interdepartmental data science clinics",
      "Workshops on statistical rigor in engineering",
    ],
  },

  "faculty-iot-embedded-systems": {
    slug: "faculty-iot-embedded-systems",
    type: "FACULTY EXPERTISE",
    categoryType: "faculty",
    title: "Faculty Expertise: IoT & Embedded Systems",
    subtitle:
      "Faculty mentorship in microcontroller programming, sensor networks, and edge intelligence.",
    category: "IoT & Hardware",
    projects: "31 projects",
    expertise: "IoT • Embedded • Sensors",
    accent: "purple",
    icon: FiUsers,
    status: "Active",
    updated: "Updated this semester",
    owner: "Department of Electronics & Communication",
    department: "Electronics & Communication",
    featured: false,
    curatedOrder: 21,
    description:
      "Faculty advisors dedicated to helping students bridge software and hardware in embedded IoT systems.",
    overview:
      "Advisors provide laboratory support, PCB fabrication guidance, and firmware optimization strategies for students building connected physical devices.",
    whyItMatters:
      "Hardware development involves circuit constraints, power budgets, and firmware debugging that purely software frameworks do not capture. Faculty lab mentorship prevents costly hardware failures.",
    objectives: [
      "Mentor smart campus hardware and sensing initiatives.",
      "Provide hands-on laboratory testing protocols.",
      "Guide low-power edge compute and communication protocols.",
      "Support patent filings and hardware incubation.",
    ],
    technologies: [
      "IoT",
      "C++",
      "Python",
      "Hardware",
    ],
    outcomes: [
      "31 active smart campus hardware deployments",
      "Energy monitoring IoT testbed",
      "Student prototyping lab access",
      "Collaborative hardware patent applications",
    ],
  },
};

/* =========================================================
   CATEGORY DEFINITIONS
   Used on Knowledge Overview for category navigation.
   ========================================================= */

export const KNOWLEDGE_CATEGORIES = [
  {
    key: "projects",
    title: "Projects",
    description: "Explore projects built across the campus.",
    icon: FiBriefcase,
    count: "1,284",
    accent: "blue",
    route: "/student/projects",
  },
  {
    key: "research",
    title: "Research",
    description: "Discover research papers, experiments and lab work.",
    icon: FiDatabase,
    count: "426",
    accent: "indigo",
    route: "/student/knowledge/research",
  },
  {
    key: "guides",
    title: "Guides",
    description: "Learn from structured campus deployment experience.",
    icon: FiBookOpen,
    count: "312",
    accent: "green",
    route: "/student/knowledge/guides",
  },
  {
    key: "technologies",
    title: "Technologies",
    description: "Find programming tools, frameworks and datastores.",
    icon: FiCode,
    count: "184",
    accent: "orange",
    route: "/student/knowledge/technologies",
  },
  {
    key: "faculty",
    title: "Faculty Expertise",
    description: "Discover professors and specialists with relevant skills.",
    icon: FiUsers,
    count: "96",
    accent: "purple",
    route: "/student/knowledge/faculty",
  },
  {
    key: "student-work",
    title: "Student Work",
    description: "Learn from projects and models created by your peers.",
    icon: FiZap,
    count: "2,941",
    accent: "cyan",
    route: "/student/knowledge/student-work",
  },
];

/* =========================================================
   HELPER UTILITIES
   Deterministic search, filtering and recommendation logic.
   ========================================================= */

export function getAllKnowledgeItems() {
  return Object.values(KNOWLEDGE_ITEMS);
}

export function getKnowledgeItem(slug) {
  return KNOWLEDGE_ITEMS[slug] || null;
}

export function getKnowledgeByCategory(categoryType) {
  return Object.values(KNOWLEDGE_ITEMS).filter(
    (item) => item.categoryType === categoryType
  );
}

export function getRecommendedKnowledge() {
  return Object.values(KNOWLEDGE_ITEMS)
    .filter((item) => item.featured)
    .slice(0, 4);
}

export function getCuratedRecentKnowledge() {
  return [...Object.values(KNOWLEDGE_ITEMS)]
    .sort((a, b) => (a.curatedOrder || 99) - (b.curatedOrder || 99))
    .slice(0, 5);
}

export function getRelatedKnowledge(currentSlug, limit = 3) {
  const current = KNOWLEDGE_ITEMS[currentSlug];
  if (!current) return [];

  const candidates = Object.values(KNOWLEDGE_ITEMS).filter(
    (item) => item.slug !== currentSlug
  );

  const scored = candidates.map((item) => {
    let score = 0;
    // Same category
    if (item.category === current.category) score += 4;
    // Same categoryType
    if (item.categoryType === current.categoryType) score += 2;
    // Shared technologies
    const currentTechs = new Set(
      (current.technologies || []).map((t) => t.toLowerCase())
    );
    const sharedTechs = (item.technologies || []).filter((t) =>
      currentTechs.has(t.toLowerCase())
    );
    score += sharedTechs.length * 2;
    // Same department
    if (item.department && item.department === current.department) score += 2;

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((entry) => entry.item);
}

export function searchKnowledge(query) {
  const trimmed = (query || "").trim().toLowerCase();
  if (!trimmed) return [];

  const items = Object.values(KNOWLEDGE_ITEMS);

  return items.filter((item) => {
    const haystack = [
      item.title,
      item.subtitle,
      item.description,
      item.overview,
      item.category,
      item.type,
      item.owner,
      item.team,
      item.department,
      ...(item.technologies || []),
      ...(item.objectives || []),
      ...(item.outcomes || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(trimmed);
  });
}
