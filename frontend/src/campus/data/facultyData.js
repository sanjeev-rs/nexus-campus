/* =========================================================
   NEXUS FACULTY INTELLIGENCE DATASET
   Deterministic, grounded campus data for Faculty Workspace.
   ========================================================= */

export const FACULTY_USER = {
  name: "Dr. Evelyn Vance",
  email: "faculty@nexus.edu",
  designation: "Professor & Senior Research Advisor",
  department: "Department of AI & Data Science",
  room: "Lab Block 4 • Rm 302",
  avatar: "EV",
  specialization: "Distributed AI, Graph Neural Networks, Autonomous Systems",
  advisedCount: 48,
  activeProjectsCount: 14,
  pendingReviewsCount: 3,
  interventionAlertsCount: 4,
  officeHours: "Mon/Wed 2:00 PM – 4:30 PM",
};

export const ADVISEES = [
  {
    id: "stu-101",
    name: "Aiden Cross",
    regNumber: "RA2311003010042",
    year: "Year 3",
    department: "AI & Data Science",
    project: "Smart Campus Analytics",
    projectSlug: "smart-campus-analytics",
    projectType: "Capstone",
    progress: 88,
    primarySkill: "Python • Machine Learning",
    status: "On Schedule",
    statusType: "success",
    lastActive: "2 hours ago",
    milestone: "Sprint 4: Predictive model validation",
    avatar: "AC",
    email: "aiden.cross@nexus.edu",
    gpa: "3.92",
    pendingAction: null,
    riskLevel: "Low",
    growthVelocity: "+18% this month",
    completedMilestones: 4,
    totalMilestones: 5,
    competencies: [
      { name: "Predictive Modeling", score: 92 },
      { name: "Feature Engineering", score: 88 },
      { name: "System Architecture", score: 78 },
      { name: "Model Explainability", score: 85 }
    ],
    skillGaps: ["Distributed Serving", "Model Quantization"],
    recentActivity: "Validated gradient boosting benchmark against 2025 campus telemetry dataset.",
    interventionsHistory: [
      { date: "Oct 12, 2025", type: "Advisory", note: "Suggested exploring SHAP values for model transparency." }
    ],
    recommendedAction: "Endorse for Student AI Symposium paper submission."
  },
  {
    id: "stu-102",
    name: "Maya Lin",
    regNumber: "RA2311003010087",
    year: "Year 4",
    department: "AI & Data Science",
    project: "Autonomous Campus Drone Navigation",
    projectSlug: "autonomous-navigation",
    projectType: "Research Capstone",
    progress: 64,
    primarySkill: "Computer Vision • ROS 2",
    status: "Review Pending",
    statusType: "warning",
    lastActive: "5 hours ago",
    milestone: "Deliverable 3: Stereo-vision obstacle avoidance report",
    avatar: "ML",
    email: "maya.lin@nexus.edu",
    gpa: "3.85",
    pendingAction: "Review Deliverable",
    riskLevel: "Moderate",
    growthVelocity: "+9% this month",
    completedMilestones: 3,
    totalMilestones: 5,
    competencies: [
      { name: "Stereo-vision SLAM", score: 84 },
      { name: "ROS 2 Navigation", score: 80 },
      { name: "Edge C++", score: 72 },
      { name: "Latency Profiling", score: 68 }
    ],
    skillGaps: ["Hardware-in-the-loop Testing", "Kalman Filtering"],
    recentActivity: "Uploaded ROS 2 telemetry benchmark logs from Jetson Orin Nano test runs.",
    interventionsHistory: [
      { date: "Nov 04, 2025", type: "Hardware Check", note: "Procured supplementary dual-camera mount from Robotics Lab." }
    ],
    recommendedAction: "Review Milestone 3 deliverable before Thursday flight window."
  },
  {
    id: "stu-103",
    name: "Devon Reed",
    regNumber: "RA2311003010115",
    year: "Year 3",
    department: "Computer Science",
    project: "Distributed Graph Intelligence Engine",
    projectSlug: "graph-intelligence",
    projectType: "Research",
    progress: 42,
    primarySkill: "Neo4j • Python • FastAPI",
    status: "Delayed Milestone",
    statusType: "danger",
    lastActive: "4 days ago",
    milestone: "Deliverable 2: Graph schema benchmark and ingestion pipeline",
    avatar: "DR",
    email: "devon.reed@nexus.edu",
    gpa: "3.48",
    pendingAction: "Milestone Intervention",
    riskLevel: "High",
    growthVelocity: "-4% (Stalled)",
    completedMilestones: 1,
    totalMilestones: 4,
    competencies: [
      { name: "Cypher Query Language", score: 76 },
      { name: "FastAPI REST API", score: 82 },
      { name: "Distributed Indexing", score: 48 },
      { name: "Batch ETL Pipelines", score: 55 }
    ],
    skillGaps: ["Graph Partitioning", "Memory Optimization", "Neo4j Cluster Config"],
    recentActivity: "Encountered out-of-memory crash when indexing 100k node institutional graph.",
    interventionsHistory: [
      { date: "Nov 15, 2025", type: "Technical Guidance", note: "Referred student to Failure Memory entry FM-02 (Graph DB Memory Exhaustion)." }
    ],
    recommendedAction: "Schedule mandatory office hour check-in regarding batch pipeline ingestion."
  },
  {
    id: "stu-104",
    name: "Sophia Sterling",
    regNumber: "RA2311003010019",
    year: "Year 4",
    department: "AI & Data Science",
    project: "Campus Knowledge RAG Retrieval",
    projectSlug: "rag-context",
    projectType: "Thesis",
    progress: 94,
    primarySkill: "NLP • Vector Search • PyTorch",
    status: "Ready for Defense",
    statusType: "success",
    lastActive: "1 day ago",
    milestone: "Final Thesis: Empirical RAG precision on academic corpus",
    avatar: "SS",
    email: "sophia.s@nexus.edu",
    gpa: "3.96",
    pendingAction: "Schedule Defense",
    riskLevel: "Low",
    growthVelocity: "+22% this month",
    completedMilestones: 5,
    totalMilestones: 5,
    competencies: [
      { name: "Dense Vector Search", score: 98 },
      { name: "RAG Chunking Strategies", score: 95 },
      { name: "PyTorch Deep Learning", score: 91 },
      { name: "Academic Writing", score: 94 }
    ],
    skillGaps: ["Production Cache Invalidation"],
    recentActivity: "Completed final defense rehearsal with faculty co-advisors.",
    interventionsHistory: [],
    recommendedAction: "Sign off on Defense Committee Authorization docket."
  },
  {
    id: "stu-105",
    name: "Karan Patel",
    regNumber: "RA2311003010204",
    year: "Year 2",
    department: "Data Science",
    project: "Curriculum Skill Analytics",
    projectSlug: "curriculum-skills",
    projectType: "Mini Project",
    progress: 75,
    primarySkill: "Data Analytics • Pandas • React",
    status: "On Schedule",
    statusType: "success",
    lastActive: "Yesterday",
    milestone: "Sprint 2: Student capability index visualization",
    avatar: "KP",
    email: "karan.patel@nexus.edu",
    gpa: "3.71",
    pendingAction: null,
    riskLevel: "Low",
    growthVelocity: "+14% this month",
    completedMilestones: 2,
    totalMilestones: 3,
    competencies: [
      { name: "Exploratory Data Analysis", score: 86 },
      { name: "Pandas & NumPy", score: 84 },
      { name: "React Frontend UI", score: 79 },
      { name: "Chart.js Visualization", score: 82 }
    ],
    skillGaps: ["Statistical Significance Testing"],
    recentActivity: "Finished radar chart generation for department capability distributions.",
    interventionsHistory: [],
    recommendedAction: "Introduce to Department of CSE faculty lead for cross-validation data."
  },
  {
    id: "stu-106",
    name: "Elena Rostova",
    regNumber: "RA2311003010144",
    year: "Year 3",
    department: "Computer Science",
    project: "Edge Vision Laboratory Monitor",
    projectSlug: "edge-vision",
    projectType: "Capstone",
    progress: 58,
    primarySkill: "OpenCV • PyTorch • C++",
    status: "Review Pending",
    statusType: "warning",
    lastActive: "3 hours ago",
    milestone: "Deliverable 3: Camera calibration on Raspberry Pi 5",
    avatar: "ER",
    email: "elena.r@nexus.edu",
    gpa: "3.78",
    pendingAction: "Review Deliverable",
    riskLevel: "Moderate",
    growthVelocity: "+11% this month",
    completedMilestones: 2,
    totalMilestones: 4,
    competencies: [
      { name: "Edge Vision Inference", score: 82 },
      { name: "OpenCV Calibration", score: 78 },
      { name: "Embedded Linux", score: 75 },
      { name: "C++ Systems", score: 79 }
    ],
    skillGaps: ["ONNX Runtime Optimization", "TensorRT Acceleration"],
    recentActivity: "Committed camera calibration matrix scripts with lens distortion compensation.",
    interventionsHistory: [],
    recommendedAction: "Review edge benchmark results for Hardware Lab 204 monitor."
  },
  {
    id: "stu-107",
    name: "Marcus Vance Jr.",
    regNumber: "RA2311003010310",
    year: "Year 3",
    department: "AI & Data Science",
    project: "Failure Memory Classification",
    projectSlug: "failure-memory",
    projectType: "Research",
    progress: 30,
    primarySkill: "NLP • Python",
    status: "Needs Intervention",
    statusType: "danger",
    lastActive: "8 days ago",
    milestone: "Deliverable 1: Taxonomical labeling of post-mortems",
    avatar: "MV",
    email: "marcus.jr@nexus.edu",
    gpa: "3.22",
    pendingAction: "Urgent Check-in",
    riskLevel: "Critical",
    growthVelocity: "-12% (Inactivity)",
    completedMilestones: 0,
    totalMilestones: 4,
    competencies: [
      { name: "Text Categorization", score: 62 },
      { name: "Python Scripting", score: 68 },
      { name: "Research Methodology", score: 54 },
      { name: "Academic Citation", score: 48 }
    ],
    skillGaps: ["Unsupervised Clustering", "Active Learning", "Data Pipeline Hygiene"],
    recentActivity: "No commits detected since Nov 12. Missed bi-weekly advising check-in.",
    interventionsHistory: [
      { date: "Oct 28, 2025", type: "Attendance Warning", note: "Sent notification regarding missed milestone draft." }
    ],
    recommendedAction: "Issue urgent formal advising intervention and connect with academic counselor."
  },
  {
    id: "stu-108",
    name: "Tara Nair",
    regNumber: "RA2311003010065",
    year: "Year 4",
    department: "AI & Data Science",
    project: "Intelligent Student Twin Simulator",
    projectSlug: "student-twin",
    projectType: "Capstone",
    progress: 82,
    primarySkill: "Python • Scikit-learn • FastAPI",
    status: "On Schedule",
    statusType: "success",
    lastActive: "6 hours ago",
    milestone: "Sprint 4: Multi-variable trajectory simulation",
    avatar: "TN",
    email: "tara.nair@nexus.edu",
    gpa: "3.89",
    pendingAction: null,
    riskLevel: "Low",
    growthVelocity: "+16% this month",
    completedMilestones: 4,
    totalMilestones: 5,
    competencies: [
      { name: "Multi-agent Simulation", score: 89 },
      { name: "Scikit-learn Regressors", score: 86 },
      { name: "FastAPI Telemetry Endpoints", score: 85 },
      { name: "Dynamic Profiling", score: 82 }
    ],
    skillGaps: ["Monte Carlo Convergence Testing"],
    recentActivity: "Integrated student habit signals into academic performance simulator.",
    interventionsHistory: [],
    recommendedAction: "Nominate for Best Capstone Prototype award."
  }
];

export const PROJECT_REVIEWS = [
  {
    id: "rev-201",
    studentId: "stu-102",
    studentName: "Maya Lin",
    regNumber: "RA2311003010087",
    projectTitle: "Autonomous Campus Drone Navigation",
    projectSlug: "autonomous-navigation",
    deliverableTitle: "Milestone 3: Stereo-vision Obstacle Avoidance Benchmark",
    submittedAt: "Today at 09:30 AM",
    dueDate: "Yesterday",
    urgency: "HIGH",
    summary:
      "Includes ROS2 node benchmarks, latency logs from Jetson Orin Nano, and safety collision-avoidance test runs across North Campus quad.",
    attachments: [
      "Benchmark_Results_v3.pdf",
      "ROS2_Telemetry_logs.csv",
      "Simulation_Recording.mp4",
    ],
    status: "PENDING",
    feedback: "",
    verdict: null
  },
  {
    id: "rev-202",
    studentId: "stu-106",
    studentName: "Elena Rostova",
    regNumber: "RA2311003010144",
    projectTitle: "Edge Vision Laboratory Monitor",
    projectSlug: "edge-vision",
    deliverableTitle: "Milestone 3: Hardware In-the-Loop Edge Calibration",
    submittedAt: "Yesterday at 04:15 PM",
    dueDate: "Tomorrow",
    urgency: "NORMAL",
    summary:
      "Embedded camera calibration matrices and FPS analysis under fluctuating light conditions in Hardware Lab 204.",
    attachments: ["Calibration_Report.pdf", "Edge_Inference_Stats.json"],
    status: "PENDING",
    feedback: "",
    verdict: null
  },
  {
    id: "rev-203",
    studentId: "stu-104",
    studentName: "Sophia Sterling",
    regNumber: "RA2311003010019",
    projectTitle: "Campus Knowledge RAG Retrieval",
    projectSlug: "rag-context",
    deliverableTitle: "Final Thesis Manuscript & Defense Dossier",
    submittedAt: "2 days ago",
    dueDate: "Nov 30, 2026",
    urgency: "NORMAL",
    summary:
      "Comprehensive 62-page manuscript comparing dense retrieval versus graph-augmented RAG over institutional campus repositories.",
    attachments: [
      "Final_Thesis_Manuscript.pdf",
      "Defense_Presentation_Slides.pptx",
    ],
    status: "PENDING",
    feedback: "",
    verdict: null
  },
];

export const AT_RISK_STUDENTS = [
  {
    id: "stu-107",
    name: "Marcus Vance Jr.",
    regNumber: "RA2311003010310",
    project: "Failure Memory Classification",
    department: "AI & Data Science",
    severity: "CRITICAL",
    stalledDays: 8,
    reason: "Zero commits, missed milestone draft, attendance fell below 75%",
    evidence: "GitHub repo idle since Nov 12; missed 2 mandatory advising check-ins; mid-term project checkpoint unfulfilled.",
    recommendedIntervention: "Issue Formal Academic Warning and mandate in-person lab advising session.",
    contactEmail: "marcus.jr@nexus.edu"
  },
  {
    id: "stu-103",
    name: "Devon Reed",
    regNumber: "RA2311003010115",
    project: "Distributed Graph Intelligence Engine",
    department: "Computer Science",
    severity: "HIGH",
    stalledDays: 4,
    reason: "Deliverable 2 overdue by 4 days due to out-of-memory graph ingestion bottleneck",
    evidence: "Neo4j container crashing at 100k nodes; query execution latency spiking beyond 12s; no extension requested.",
    recommendedIntervention: "Pair with Systems Architecture lab assistant and review Neo4j batch configuration.",
    contactEmail: "devon.reed@nexus.edu"
  },
  {
    id: "stu-102",
    name: "Maya Lin",
    regNumber: "RA2311003010087",
    project: "Autonomous Campus Drone Navigation",
    department: "AI & Data Science",
    severity: "MODERATE",
    stalledDays: 1,
    reason: "Milestone submission was delayed by 24h due to Jetson hardware camera mount issues",
    evidence: "Submitted report 14 hours ago with notes indicating vibration artifacts on stereo-rig.",
    recommendedIntervention: "Review submitted report and clear for Thursday outdoor flight test.",
    contactEmail: "maya.lin@nexus.edu"
  }
];

export const OFFICE_HOURS = [
  {
    id: "oh-01",
    time: "Today • 02:30 PM",
    student: "Devon Reed",
    studentId: "stu-103",
    topic: "Graph ingestion pipeline bottlenecks & database indexing",
    type: "Intervention Session",
    status: "Confirmed",
    location: "Lab Block 4 • Rm 302"
  },
  {
    id: "oh-02",
    time: "Today • 03:15 PM",
    student: "Maya Lin",
    studentId: "stu-102",
    topic: "Stereo-vision camera calibration feedback review",
    type: "Milestone Check-in",
    status: "Confirmed",
    location: "Lab Block 4 • Rm 302"
  },
  {
    id: "oh-03",
    time: "Tomorrow • 10:00 AM",
    student: "Aiden Cross",
    studentId: "stu-101",
    topic: "Paper submission to Campus Student AI Symposium",
    type: "Research Mentorship",
    status: "Scheduled",
    location: "Online (NEXUS Video)"
  },
  {
    id: "oh-04",
    time: "Tomorrow • 11:30 AM",
    student: "Sophia Sterling",
    studentId: "stu-104",
    topic: "Defense committee panel review and presentation rehearsal",
    type: "Thesis Defense Prep",
    status: "Scheduled",
    location: "Seminar Hall B"
  },
];

export const DEPARTMENT_SKILL_INDEX = [
  { name: "Python 3.12 & Ecosystem", category: "Core Programming", mastery: 92, count: "46 students", trend: "+8%", status: "Mastered" },
  { name: "PyTorch & Deep Learning", category: "AI & Machine Learning", mastery: 84, count: "38 students", trend: "+14%", status: "Mastered" },
  { name: "Computer Vision & OpenCV", category: "Perception Systems", mastery: 76, count: "29 students", trend: "+11%", status: "Developing" },
  { name: "FastAPI & Microservices", category: "Systems & Backend", mastery: 71, count: "27 students", trend: "+5%", status: "Developing" },
  { name: "PostgreSQL & Vector Store", category: "Data Architecture", mastery: 68, count: "24 students", trend: "+18%", status: "Developing" },
  { name: "Graph DB (Neo4j)", category: "Knowledge Systems", mastery: 54, count: "16 students", trend: "+22%", status: "Weak / Emerging" },
  { name: "ROS 2 (Robot Operating System)", category: "Robotics", mastery: 62, count: "19 students", trend: "+15%", status: "Developing" },
  { name: "ONNX & TensorRT Acceleration", category: "Edge Optimization", mastery: 48, count: "12 students", trend: "+25%", status: "Weak / Emerging" },
];

export const PROJECT_DNA_CATALOG = [
  {
    id: "dna-01",
    title: "Smart Campus Analytics",
    slug: "smart-campus-analytics",
    problem: "Campus telemetry data is siloed across separate departmental servers, making institutional bottleneck detection reactive rather than predictive.",
    technologies: ["Python 3.12", "Pandas", "Scikit-learn", "React", "PostgreSQL"],
    skills: ["Predictive Analytics", "Feature Engineering", "Data Pipelines", "Dashboard UX"],
    students: ["Aiden Cross", "Karan Patel"],
    advisor: "Dr. Evelyn Vance",
    similarProjects: ["Curriculum Skill Analytics", "Intelligent Student Twin Simulator"],
    previousFailures: ["FM-01: Time-series lag bias in attendance prediction"],
    researchKnowledge: ["RK-04: Student Behavioral Clustering Models"],
    opportunities: ["Institutional Operations Grant", "Campus Facilities Automation"],
    nextAction: "Validate cross-semester predictive accuracy on Spring 2026 ground truth."
  },
  {
    id: "dna-02",
    title: "Autonomous Campus Drone Navigation",
    slug: "autonomous-navigation",
    problem: "GPS-denied courtyard flight paths cause quadrotor localization drift and collision risks around canopy trees and building overhangs.",
    technologies: ["ROS 2 Humble", "C++17", "Jetson Orin Nano", "OpenCV", "Stereo-vision"],
    skills: ["Visual Inertial Odometry", "Path Planning", "Embedded Linux", "Safety Critical Systems"],
    students: ["Maya Lin"],
    advisor: "Dr. Aris Thorne",
    similarProjects: ["Edge Vision Laboratory Monitor"],
    previousFailures: ["FM-03: Rolling shutter distortion in stereo feature matching"],
    researchKnowledge: ["RK-09: Micro-Aerial Vehicle Obstacle Avoidance Standards"],
    opportunities: ["Department Robotics Fellowship", "Campus Security Delivery Mission"],
    nextAction: "Review stereo rig vibration dampening and execute outdoor trial."
  },
  {
    id: "dna-03",
    title: "Campus Knowledge RAG Retrieval",
    slug: "rag-context",
    problem: "Academic research papers, lab manuals, and syllabus updates are difficult for students to semantically query without hallucination.",
    technologies: ["Python", "PyTorch", "pgvector", "LangChain", "FastAPI"],
    skills: ["Vector Search", "Semantic Chunking", "RAG Precision Evaluation", "NLP"],
    students: ["Sophia Sterling"],
    advisor: "Dr. Evelyn Vance",
    similarProjects: ["Distributed Graph Intelligence Engine"],
    previousFailures: ["FM-04: Context window overflow on multi-page PDF tables"],
    researchKnowledge: ["RK-01: Hybrid Dense-Sparse Retrieval on Academic Corpora"],
    opportunities: ["NEXUS Core Integration", "Provost Academic Resource Grant"],
    nextAction: "Proceed to Thesis Defense Examination."
  },
  {
    id: "dna-04",
    title: "Distributed Graph Intelligence Engine",
    slug: "graph-intelligence",
    problem: "Modeling heterogeneous academic relationships (students, courses, prerequisite skills, lab projects) exhausts standard relational databases.",
    technologies: ["Neo4j", "Cypher", "Python", "FastAPI", "Docker"],
    skills: ["Graph Theory", "Knowledge Graph Construction", "Query Optimization", "Distributed Indexing"],
    students: ["Devon Reed"],
    advisor: "Dr. Evelyn Vance",
    similarProjects: ["Campus Knowledge RAG Retrieval"],
    previousFailures: ["FM-02: Graph database memory exhaustion on unindexed traversals"],
    researchKnowledge: ["RK-07: Prerequisite Skill Graphs in Higher Education"],
    opportunities: ["National Science Data Grant"],
    nextAction: "Implement chunked stream loading to resolve out-of-memory bottleneck."
  }
];

export const MENTOR_MATCHING = [
  {
    id: "match-01",
    studentName: "Devon Reed",
    studentId: "stu-103",
    project: "Distributed Graph Intelligence Engine",
    requestedHelp: "Graph Database Partitioning & Large-scale Cypher Ingestion",
    facultyMatch: "Dr. Evelyn Vance",
    matchScore: 94,
    matchingSkills: ["Knowledge Graphs", "Neo4j Schema Design", "FastAPI Pipelines"],
    missingExpertise: ["Distributed Raft Consensus"],
    rationale: "Dr. Vance published 3 papers on Academic Knowledge Graphs and successfully advised 6 graph architecture projects.",
    status: "Pending Action"
  },
  {
    id: "match-02",
    studentName: "Maya Lin",
    studentId: "stu-102",
    project: "Autonomous Campus Drone Navigation",
    requestedHelp: "Hardware vibration damping on Jetson stereo camera mount",
    facultyMatch: "Dr. Aris Thorne (Robotics Dept)",
    matchScore: 89,
    matchingSkills: ["ROS 2 Navigation", "Hardware In The Loop", "Stereo-vision SLAM"],
    missingExpertise: ["Drone Airframe Aerodynamics"],
    rationale: "Dr. Thorne directs the Autonomous Vehicle Laboratory and has access to high-speed optical tracking rigs.",
    status: "Recommended"
  },
  {
    id: "match-03",
    studentName: "Elena Rostova",
    studentId: "stu-106",
    project: "Edge Vision Laboratory Monitor",
    requestedHelp: "ONNX Model Quantization for Raspberry Pi 5",
    facultyMatch: "Prof. Rajesh Iyer (ECE Dept)",
    matchScore: 86,
    matchingSkills: ["Edge AI Inference", "Embedded C++", "Camera Calibration"],
    missingExpertise: ["React Web Dashboard"],
    rationale: "Prof. Iyer specializes in low-power edge accelerators and TensorRT deployment.",
    status: "Recommended"
  }
];

export const INTERVENTIONS = [
  {
    id: "int-01",
    studentName: "Marcus Vance Jr.",
    studentId: "stu-107",
    department: "AI & Data Science",
    type: "Academic & Project Stagnation",
    priority: "CRITICAL",
    openedDate: "Nov 14, 2025",
    owner: "Dr. Evelyn Vance",
    status: "ACTIVE",
    notes: "Student missed two milestones and 8 days of lab activity. Mandatory advising session scheduled.",
    outcome: "Pending in-person conference on Wednesday."
  },
  {
    id: "int-02",
    studentName: "Devon Reed",
    studentId: "stu-103",
    department: "Computer Science",
    type: "Technical Bottleneck Intervention",
    priority: "HIGH",
    openedDate: "Nov 16, 2025",
    owner: "Dr. Evelyn Vance",
    status: "ACTIVE",
    notes: "Graph ingestion OOM error halted project progress. Directed student to Failure Memory database and scheduled technical review.",
    outcome: "Investigating batch stream ingestion scripts."
  },
  {
    id: "int-03",
    studentName: "Maya Lin",
    studentId: "stu-102",
    department: "AI & Data Science",
    type: "Hardware Resource Procurement",
    priority: "MEDIUM",
    openedDate: "Nov 02, 2025",
    owner: "Dr. Evelyn Vance",
    status: "COMPLETED",
    notes: "Assisted student with inter-lab request for Jetson Orin Nano compute module.",
    outcome: "Hardware provisioned successfully; milestone 2 unblocked."
  }
];

export const FAILURE_MEMORY = [
  {
    id: "FM-01",
    title: "Time-series Lag Bias in Campus Attendance Predictor",
    project: "Smart Campus Analytics",
    problem: "Model demonstrated 94% accuracy on training data but degraded to 61% when predicting Monday morning attendance patterns.",
    rootCause: "Data pipeline failed to account for holiday long-weekends and institutional timetable shifting between odd and even calendar weeks.",
    attemptedSolution: "Trained larger neural network; exacerbated overfitting.",
    lessonLearned: "Engineered cyclic calendar features and institutional calendar masks prior to feeding sequences into the estimator.",
    affectedTech: ["Python", "Pandas", "Scikit-learn"],
    preventionChecklist: [
      "Always verify temporal cross-validation fold boundaries.",
      "Incorporate academic holiday schedules as explicit one-hot features.",
      "Test model against consecutive multi-day absence outliers."
    ]
  },
  {
    id: "FM-02",
    title: "Graph Database Memory Exhaustion on Unindexed Traversals",
    project: "Distributed Graph Intelligence Engine",
    problem: "Neo4j container ran out of memory (heap exhaustion) during multi-hop student prerequisite skill queries on a 100k-node graph.",
    rootCause: "Cartesian product queries occurred due to missing composite schema indices on (Student)-[:MASTERED]->(Skill) relations.",
    attemptedSolution: "Increased Docker memory allocation from 4GB to 16GB; container still crashed on depth-4 traversals.",
    lessonLearned: "Created composite Cypher schema indexes and constrained recursive traversals with maximum path lengths and pagination.",
    affectedTech: ["Neo4j", "Docker", "Cypher"],
    preventionChecklist: [
      "Define composite schema indexes before batch ETL ingestion.",
      "Profile all graph queries using EXPLAIN and PROFILE Cypher commands.",
      "Set query memory transaction timeout limits in neo4j.conf."
    ]
  },
  {
    id: "FM-03",
    title: "Stereo-vision Disparity Corruption from Propeller Micro-Vibrations",
    project: "Autonomous Campus Drone Navigation",
    problem: "Obstacle detection point-cloud generated spurious ghost objects 1.5m ahead of drone during high-RPM flight acceleration.",
    rootCause: "Rigid 3D-printed PLA camera bracket transmitted motor vibration frequencies into the CMOS sensor shutter.",
    attemptedSolution: "Added software Gaussian blur filter; caused unacceptable 45ms latency increase.",
    lessonLearned: "Designed silicone rubber dampening grommets between camera PCB and carbon-fiber airframe, stabilizing disparity disparity map.",
    affectedTech: ["ROS 2", "OpenCV", "Jetson Orin"],
    preventionChecklist: [
      "Mechanically decouple optical sensors from active propulsion mounts.",
      "Run vibration FFT spectrum tests before tuning stereo block-matching algorithms.",
      "Validate stereo baseline calibration under variable motor throttle."
    ]
  },
  {
    id: "FM-04",
    title: "Context Window Overflow on Multi-page Academic Tables",
    project: "Campus Knowledge RAG Retrieval",
    problem: "RAG system truncated complex academic grading tables midway, causing the LLM to output fabricated prerequisite requirements.",
    rootCause: "Fixed-size character chunking sliced table HTML/Markdown across chunk boundaries, stripping table column headers.",
    attemptedSolution: "Doubled token window size; doubled retrieval latency and cost without solving split rows.",
    lessonLearned: "Implemented semantic layout-aware chunking that preserves markdown table structures as discrete document units.",
    affectedTech: ["LangChain", "pgvector", "FastAPI"],
    preventionChecklist: [
      "Never slice tables with raw character-count splitters.",
      "Attach parent document section metadata to child table chunks.",
      "Run automated table reconstruction verification tests on RAG ingestion."
    ]
  }
];

export const CAMPUS_KNOWLEDGE_GRAPH = {
  nodes: [
    { id: "dept-aids", label: "AI & Data Science", type: "department", group: "Department" },
    { id: "dept-cse", label: "Computer Science", type: "department", group: "Department" },
    { id: "fac-vance", label: "Dr. Evelyn Vance", type: "faculty", group: "Faculty" },
    { id: "fac-thorne", label: "Dr. Aris Thorne", type: "faculty", group: "Faculty" },
    { id: "stu-aiden", label: "Aiden Cross", type: "student", group: "Student" },
    { id: "stu-maya", label: "Maya Lin", type: "student", group: "Student" },
    { id: "stu-devon", label: "Devon Reed", type: "student", group: "Student" },
    { id: "stu-sophia", label: "Sophia Sterling", type: "student", group: "Student" },
    { id: "proj-analytics", label: "Smart Campus Analytics", type: "project", group: "Project" },
    { id: "proj-drone", label: "Autonomous Drone Nav", type: "project", group: "Project" },
    { id: "proj-rag", label: "Campus RAG Retrieval", type: "project", group: "Project" },
    { id: "proj-graph", label: "Graph Intelligence Engine", type: "project", group: "Project" },
    { id: "skill-python", label: "Python 3.12", type: "skill", group: "Skill" },
    { id: "skill-pytorch", label: "PyTorch", type: "skill", group: "Skill" },
    { id: "skill-ros2", label: "ROS 2", type: "skill", group: "Skill" },
    { id: "skill-neo4j", label: "Neo4j & Graphs", type: "skill", group: "Skill" },
    { id: "tech-jetson", label: "Jetson Orin Nano", type: "technology", group: "Technology" },
    { id: "res-rag-hybrid", label: "RK-01: Hybrid RAG", type: "research", group: "Research" },
    { id: "fail-graph-oom", label: "FM-02: Graph OOM", type: "failure", group: "Failure" },
    { id: "fail-vibration", label: "FM-03: Sensor Drift", type: "failure", group: "Failure" },
    { id: "know-slam-calib", label: "SLAM Calibration Protocol", type: "knowledge", group: "Knowledge" },
  ],
  edges: [
    { source: "dept-aids", target: "fac-vance", label: "employs" },
    { source: "dept-cse", target: "fac-thorne", label: "employs" },
    { source: "fac-vance", target: "stu-aiden", label: "advises" },
    { source: "fac-vance", target: "stu-sophia", label: "advises" },
    { source: "fac-vance", target: "stu-devon", label: "advises" },
    { source: "fac-thorne", target: "stu-maya", label: "advises" },
    { source: "stu-aiden", target: "proj-analytics", label: "builds" },
    { source: "stu-maya", target: "proj-drone", label: "builds" },
    { source: "stu-sophia", target: "proj-rag", label: "builds" },
    { source: "stu-devon", target: "proj-graph", label: "builds" },
    { source: "proj-analytics", target: "skill-python", label: "requires" },
    { source: "proj-rag", target: "skill-pytorch", label: "requires" },
    { source: "proj-drone", target: "skill-ros2", label: "requires" },
    { source: "proj-drone", target: "tech-jetson", label: "executes_on" },
    { source: "proj-drone", target: "fail-vibration", label: "mitigates" },
    { source: "proj-drone", target: "know-slam-calib", label: "follows" },
    { source: "proj-rag", target: "res-rag-hybrid", label: "cites" },
    { source: "proj-graph", target: "skill-neo4j", label: "requires" },
    { source: "proj-graph", target: "fail-graph-oom", label: "encountered" },
  ]
};

export const NEXT_BEST_ACTIONS = [
  {
    id: "nba-01",
    priority: "HIGH",
    category: "Review Action",
    title: "Evaluate Maya Lin's Milestone 3 Deliverable",
    description: "Milestone report submitted 14 hours ago. Feedback required prior to Thursday quad test flight.",
    evidence: "ROS 2 latency metrics attached. Flight weather window opens Thursday morning.",
    actionLabel: "Open Review Pipeline",
    targetRoute: "/faculty/reviews",
    status: "Pending"
  },
  {
    id: "nba-02",
    priority: "CRITICAL",
    category: "Intervention",
    title: "Intervene on Marcus Vance Jr.'s Stalled Capstone",
    description: "No commit activity in 8 days. Mid-term checkpoint at risk of administrative failure.",
    evidence: "Course LMS attendance < 75%; repository commit log flatlined since Nov 12.",
    actionLabel: "Schedule Intervention",
    targetRoute: "/faculty/at-risk",
    status: "Urgent"
  },
  {
    id: "nba-03",
    priority: "MEDIUM",
    category: "Academic Defense",
    title: "Sign Defense Panel Docket for Sophia Sterling",
    description: "All 5 thesis milestones fulfilled with 94% cumulative faculty score.",
    evidence: "Manuscript review complete; committee reviewers confirmed availability.",
    actionLabel: "Authorize Defense",
    targetRoute: "/faculty/advisees",
    status: "Pending"
  },
  {
    id: "nba-04",
    priority: "MEDIUM",
    category: "Mentoring Match",
    title: "Connect Devon Reed with Neo4j Lab Specialist",
    description: "Graph ingestion memory bottlenecks can be mitigated via streaming chunk configuration.",
    evidence: "Failure Memory FM-02 provides direct solution blueprint.",
    actionLabel: "Inspect Match",
    targetRoute: "/faculty/matching",
    status: "Recommended"
  }
];

export const TECHNICAL_PROBLEMS = [
  {
    id: "tp-01",
    title: "CUDA Out-Of-Memory During Multi-Modal Batch Ingestion",
    frequency: "Occurred across 6 Capstone Teams",
    affectedDepts: ["AI & Data Science", "Computer Science"],
    affectedProjects: ["Smart Campus Analytics", "Campus Knowledge RAG Retrieval"],
    knownSolution: "Enable PyTorch gradient accumulation and mixed precision (torch.cuda.amp.autocast).",
    relatedFailureMemory: "FM-01",
    status: "Documented Workaround"
  },
  {
    id: "tp-02",
    title: "ROS 2 Multicast Packet Drop Over Campus Wi-Fi",
    frequency: "Occurred across 4 Robotics Teams",
    affectedDepts: ["Robotics & Automation", "AI & Data Science"],
    affectedProjects: ["Autonomous Campus Drone Navigation", "Edge Vision Laboratory Monitor"],
    knownSolution: "Switch from default CycloneDDS multicast to FastDDS with unicast discovery XML configuration.",
    relatedFailureMemory: "FM-03",
    status: "Standard Lab Protocol"
  },
  {
    id: "tp-03",
    title: "Graph Ingestion Heap Crash on Unindexed Edge Traversals",
    frequency: "Occurred across 3 Data Science Teams",
    affectedDepts: ["Computer Science", "AI & Data Science"],
    affectedProjects: ["Distributed Graph Intelligence Engine"],
    knownSolution: "Create schema indexes prior to importing CSV chunks and use APOC periodic iterate batching.",
    relatedFailureMemory: "FM-02",
    status: "Active Advisory"
  }
];

export const FACULTY_FAILURE_DATA = FAILURE_MEMORY;
export const CAMPUS_GRAPH_DATA = CAMPUS_KNOWLEDGE_GRAPH;

