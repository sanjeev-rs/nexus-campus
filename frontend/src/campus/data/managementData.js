/* =========================================================
   NEXUS MANAGEMENT INTELLIGENCE DATASET
   Deterministic, grounded campus data for Management Workspace.
   ========================================================= */

export const MANAGEMENT_USER = {
  name: "Provost Alistair Sterling",
  email: "management@nexus.edu",
  roleTitle: "Vice-Chancellor & Provost of Academic Affairs",
  office: "Administration Tower • Floor 7",
  avatar: "AS",
  institution: "NEXUS Institute of Technology",
  term: "Academic Year 2025 – 2026",
  accreditationGrade: "A++ Institutional Tier-1",
};

export const CAMPUS_EXECUTIVE_METRICS = {
  studentCount: 2840,
  facultyCount: 142,
  departmentCount: 6,
  projectCount: 428,
  skillCount: 186,
  failureCount: 34,
  opportunityCount: 68,
  activeOpportunityCount: 42,
  activityScore: 88.4,
  accreditationGrade: "A++ Institutional Tier-1",
  activeGrants: "$4.25M",
  retentionRate: "95.2%",
  avgPlacementIndex: "90.8%",
  patentsFiled: 19,
  publicationsCount: 142,
};

export const DEPARTMENTS_DATA = [
  {
    id: "dept-aids",
    name: "AI & Data Science",
    code: "AIDS",
    hod: "Dr. Marcus Vance",
    students: 540,
    faculty: 28,
    ratio: "1:19",
    projects: 112,
    activityScore: 92.4,
    topSkill: "Python, PyTorch, Vector Search",
    budgetUtilized: "89%",
    placementRate: "93.4%",
    researchGrants: "$1.45M",
    status: "Exemplary",
    description: "Focuses on deep learning, generative AI, knowledge representation, and campus telemetry."
  },
  {
    id: "dept-cse",
    name: "Computer Science & Engineering",
    code: "CSE",
    hod: "Dr. Elena Rostova",
    students: 720,
    faculty: 36,
    ratio: "1:20",
    projects: 148,
    activityScore: 90.1,
    topSkill: "Distributed Systems, React, Go",
    budgetUtilized: "92%",
    placementRate: "91.8%",
    researchGrants: "$1.20M",
    status: "Exemplary",
    description: "Specializes in scalable cloud architectures, systems engineering, cybersecurity, and algorithms."
  },
  {
    id: "dept-robotics",
    name: "Robotics & Automation",
    code: "ROBO",
    hod: "Dr. Aris Thorne",
    students: 380,
    faculty: 20,
    ratio: "1:19",
    projects: 54,
    activityScore: 86.8,
    topSkill: "ROS 2, Computer Vision, C++",
    budgetUtilized: "84%",
    placementRate: "88.2%",
    researchGrants: "$680K",
    status: "Good",
    description: "Centering on autonomous ground vehicles, aerial robotics, and edge visual perception."
  },
  {
    id: "dept-ece",
    name: "Electronics & Communication",
    code: "ECE",
    hod: "Dr. Rajesh Iyer",
    students: 460,
    faculty: 24,
    ratio: "1:19",
    projects: 52,
    activityScore: 83.5,
    topSkill: "Embedded C, Signal Processing, IoT",
    budgetUtilized: "78%",
    placementRate: "86.5%",
    researchGrants: "$420K",
    status: "Good",
    description: "Dedicated to cyber-physical systems, FPGA signal processing, and low-power IoT telemetry."
  },
  {
    id: "dept-it",
    name: "Information Technology",
    code: "IT",
    hod: "Dr. Sarah Jenkins",
    students: 420,
    faculty: 20,
    ratio: "1:21",
    projects: 44,
    activityScore: 84.9,
    topSkill: "Cloud Architecture, DevOps, SQL",
    budgetUtilized: "82%",
    placementRate: "89.0%",
    researchGrants: "$310K",
    status: "Good",
    description: "Enterprise software systems, database reliability, web platform infrastructure, and containerization."
  },
  {
    id: "dept-inter",
    name: "Interdisciplinary Innovation Hub",
    code: "HUB",
    hod: "Dr. Julian Hayes",
    students: 320,
    faculty: 14,
    ratio: "1:23",
    projects: 18,
    activityScore: 94.2,
    topSkill: "Bioinformatics, MedTech AI, Clean Energy",
    budgetUtilized: "95%",
    placementRate: "96.1%",
    researchGrants: "$190K",
    status: "Exemplary",
    description: "Cross-disciplinary incubator uniting medical sensors, sustainable power grids, and applied AI."
  },
];

export const CAMPUS_SKILL_RADAR = [
  { domain: "AI & Machine Learning", currentCapability: 88, industryDemand: 94, delta: "-6%", trend: "HIGH_GROWTH", status: "Priority Expansion" },
  { domain: "Cloud & Distributed Systems", currentCapability: 82, industryDemand: 89, delta: "-7%", trend: "STABLE_HIGH", status: "Healthy" },
  { domain: "Perception & Robotics (ROS 2)", currentCapability: 74, industryDemand: 86, delta: "-12%", trend: "CRITICAL_GAP", status: "Intervention Needed" },
  { domain: "Edge Hardware & Embedded C++", currentCapability: 71, industryDemand: 82, delta: "-11%", trend: "MODERATE_GAP", status: "Workshop Recommended" },
  { domain: "Modern Web & Mobile UI", currentCapability: 91, industryDemand: 85, delta: "+6%", trend: "SURPLUS", status: "Self-Sustaining" },
  { domain: "Cybersecurity & Cryptography", currentCapability: 64, industryDemand: 88, delta: "-24%", trend: "CRITICAL_GAP", status: "Curriculum Intervention" }
];

export const CAPABILITY_GAPS = [
  {
    id: "gap-01",
    domain: "Edge Vision & Model Quantization (TensorRT/ONNX)",
    currentScore: 48,
    requiredScore: 82,
    gapDelta: 34,
    affectedDepartments: ["Robotics & Automation", "AI & Data Science"],
    affectedStudentsCount: 320,
    recommendedTraining: "Specialized 4-week Hands-on Lab on Jetson Orin Model Quantization & TensorRT.",
    impactSeverity: "HIGH",
    urgency: "Immediate Term"
  },
  {
    id: "gap-02",
    domain: "Applied Cybersecurity & Threat Modeling",
    currentScore: 52,
    requiredScore: 85,
    gapDelta: 33,
    affectedDepartments: ["Computer Science", "Information Technology"],
    affectedStudentsCount: 460,
    recommendedTraining: "Institutional Red-Team / Blue-Team Cyber Range Bootcamp.",
    impactSeverity: "HIGH",
    urgency: "Spring 2026 Term"
  },
  {
    id: "gap-03",
    domain: "Heterogeneous Graph Databases (Neo4j/Cypher)",
    currentScore: 54,
    requiredScore: 78,
    gapDelta: 24,
    affectedDepartments: ["AI & Data Science", "Computer Science"],
    affectedStudentsCount: 210,
    recommendedTraining: "Advanced Cypher Query Optimization and Distributed Ingestion Workshop.",
    impactSeverity: "MEDIUM",
    urgency: "Elective Module"
  }
];

export const TECHNOLOGY_TRENDS = [
  { name: "Agentic AI & Multi-Agent Workflows", category: "Artificial Intelligence", campusAdoption: "Surging (34 projects)", researchPapers: 12, industryDemand: "Tier-1 Critical", velocity: "+48% YoY" },
  { name: "ROS 2 Humble / Iron", category: "Robotics & Perception", campusAdoption: "Accelerating (19 projects)", researchPapers: 7, industryDemand: "High Demand", velocity: "+32% YoY" },
  { name: "Vector Databases & Dense Retrieval", category: "Data Systems", campusAdoption: "Standardized (42 projects)", researchPapers: 14, industryDemand: "Standard Tech", velocity: "+28% YoY" },
  { name: "RISC-V Architecture & FPGA", category: "Hardware Engineering", campusAdoption: "Emerging (8 projects)", researchPapers: 4, industryDemand: "High Growth", velocity: "+55% YoY" },
  { name: "Rust for Systems Programming", category: "Programming Languages", campusAdoption: "Growing (14 projects)", researchPapers: 3, industryDemand: "High Growth", velocity: "+41% YoY" }
];

export const DECISION_SUPPORT_SIGNALS = [
  {
    id: "sig-01",
    category: "CURRICULUM UPGRADE",
    title: "Urgent Need for Embedded Hardware-in-the-Loop Lab Compute",
    signal: "Students building autonomous robotics projects report 24h queue delays for Jetson Orin Nano hardware testbenches.",
    evidence: "Lab log utilization at 92.4% peak; 3 capstones delayed in Sprint 3; student failure reports trace back to vibration & thermal throttling.",
    confidence: "94% Empirical Confidence",
    affectedArea: "Robotics & ECE Hardware Laboratories",
    recommendedAction: "Authorize $65,000 capital expenditure from Lab Infrastructure Reserve for 16 additional edge testbenches.",
    expectedImpact: "Eliminate hardware bottleneck for 72 senior capstone researchers and improve project velocity by 30%."
  },
  {
    id: "sig-02",
    category: "RESEARCH ACCELERATION",
    title: "Formation of Interdisciplinary AI + Healthcare Research Cluster",
    signal: "Spontaneous cross-department collaborations between AIDS, Hub, and BioTech produced 4 top-tier conference submissions this semester.",
    evidence: "Cross-department capstones increased 38%; joint citation index is 2.4x higher than single-department publications.",
    confidence: "88% Data Grounded",
    affectedArea: "Innovation Hub & Graduate Research School",
    recommendedAction: "Establish a formal Campus Research Mission with dedicated $120,000 seed grant and shared lab space.",
    expectedImpact: "Position campus for a $1.5M National Medical AI Grant proposal in Q3."
  },
  {
    id: "sig-03",
    category: "INDUSTRY PLACEMENT",
    title: "Enterprise Demand Shift Toward Vector Search & Distributed Ingestion",
    signal: "Tech hiring partners report highest starting offer packages ($140k+) for graduates with verified skills in Vector DBs & FastAPI microservices.",
    evidence: "90.8% overall campus placement; 100% of students with verified pgvector/Neo4j endorsements secured tier-1 offers.",
    confidence: "96% Verified Outcome",
    affectedArea: "Academic Placement Cell & Curriculum Board",
    recommendedAction: "Make 'Advanced Distributed Data Engineering' a core elective for all 3rd-year CS & AI students.",
    expectedImpact: "Increase average graduate starting salary band by 14% across 450 students."
  }
];

export const CAMPUS_MISSIONS = [
  {
    id: "mission-01",
    code: "MISSION-NETZERO",
    title: "Mission Zero-Net: Autonomous Campus Micro-Grid",
    lead: "Dr. Julian Hayes (Innovation Hub) & Dr. Rajesh Iyer (ECE)",
    problem: "Campus peak electricity expenditure exceeds $180,000 monthly due to uncoordinated HVAC and lab computing loads.",
    requiredSkills: ["IoT Telemetry", "Embedded C", "Predictive Load Forecasting", "FastAPI"],
    matchedStudents: 14,
    matchedFaculty: 4,
    targetDeliverable: "Self-balancing smart micro-grid controller reducing peak grid draw by 18% by Fall 2026.",
    status: "Active Execution",
    budget: "$85,000 allocated",
    progress: 68
  },
  {
    id: "mission-02",
    code: "MISSION-AIRAG",
    title: "Institutional Knowledge & Academic Guidance RAG Engine",
    lead: "Dr. Evelyn Vance (AI & Data Science)",
    problem: "Dispersed departmental documentation creates student advising friction and administrative repetition.",
    requiredSkills: ["Vector Search", "PyTorch", "NLP", "Graph Knowledge Construction", "React"],
    matchedStudents: 18,
    matchedFaculty: 5,
    targetDeliverable: "Full production campus intelligence conversational assistant serving 2,800 students.",
    status: "Active Execution",
    budget: "$60,000 allocated",
    progress: 84
  },
  {
    id: "mission-03",
    code: "MISSION-AUTONAV",
    title: "Campus Autonomous Security & Inspection Fleet",
    lead: "Dr. Aris Thorne (Robotics Dept)",
    problem: "Manual nocturnal safety monitoring across 120-acre campus is resource-intensive and leaves perimeter blindspots.",
    requiredSkills: ["ROS 2 Navigation", "Stereo SLAM", "Edge Vision", "LiDAR Ingestion"],
    matchedStudents: 12,
    matchedFaculty: 3,
    targetDeliverable: "Autonomous ground patrol rover with obstacle avoidance and safety telemetry.",
    status: "Phase 1 Prototype",
    budget: "$95,000 allocated",
    progress: 42
  }
];

export const PROJECT_DUPLICATION_ANALYSIS = [
  {
    id: "dup-01",
    projectA: "Smart Attendance Facial Scanner (CSE Dept)",
    projectB: "Automated Classroom Presence Detection (AIDS Dept)",
    similarityScore: "86% High Overlap",
    overlappingProblem: "Both projects seek to eliminate manual attendance roll-call using classroom camera feeds.",
    overlappingTech: ["OpenCV", "Python", "Flask/FastAPI", "FaceNet"],
    overlappingSkills: ["Face Detection", "Database Logging", "Real-time Video Processing"],
    recommendation: "Merge the teams into a single unified capstone: team A manages the edge camera capture, team B manages the central NEXUS telemetry backend.",
    status: "Consolidation Advised"
  },
  {
    id: "dup-02",
    projectA: "Autonomous Quadrotor Drone Navigator (Robotics)",
    projectB: "Micro-UAV Indoor Inspection Drone (ECE Dept)",
    similarityScore: "78% Significant Overlap",
    overlappingProblem: "Both teams are building indoor obstacle avoidance controllers on Jetson Orin Nano hardware.",
    overlappingTech: ["ROS 2", "Jetson Linux", "Optical Flow Sensors"],
    overlappingSkills: ["Visual Odometry", "PID Control", "Hardware In The Loop"],
    recommendation: "Establish shared sensor testing rig and co-author joint research conference publication.",
    status: "Collaboration Encouraged"
  }
];

export const IP_INNOVATION_DATA = [
  {
    id: "ip-01",
    title: "Vibration-Isolated Optical SLAM Sensor Mount for Micro-UAVs",
    inventors: "Dr. Aris Thorne, Maya Lin (Student)",
    type: "Utility Patent Application",
    stage: "Provisional Filing Submitted",
    commercialPotential: "High ($250k IP Valuation)",
    industryPartners: ["AeroTech Dynamics", "Autonomous Systems Inc."]
  },
  {
    id: "ip-02",
    title: "Layout-Aware Markdown Table Chunking Algorithm for Academic RAG",
    inventors: "Dr. Evelyn Vance, Sophia Sterling (Student)",
    type: "Software Copyright & Open Benchmark",
    stage: "Drafting Claims & Preprint",
    commercialPotential: "Institutional Open Standard",
    industryPartners: ["NEXUS Campus Intelligence Consortium"]
  },
  {
    id: "ip-03",
    title: "Dynamic Student Capability Indexing Algorithm",
    inventors: "Provost Alistair Sterling, Dr. Marcus Vance",
    type: "Algorithm Copyright",
    stage: "Approved by Institutional IP Board",
    commercialPotential: "EdTech Enterprise Licensing",
    industryPartners: ["Academic Intelligence Networks"]
  }
];

export const MANAGEMENT_ALERTS = [
  {
    id: "mgt-alt-01",
    type: "warning",
    title: "Campus Compute Allocation Limit Approaching",
    description: "Department of AI & Data Science has utilized 91.4% of assigned semester GPU cluster hours with 6 weeks remaining.",
    dept: "AIDS",
    action: "Authorize Burst Allocation",
    priority: "HIGH"
  },
  {
    id: "mgt-alt-02",
    type: "danger",
    title: "ECE Hardware Laboratory Renovation Delayed",
    description: "Contractor delivery of 12 oscilloscope benches is 10 days behind schedule. Temporary laboratory shifts required.",
    dept: "ECE",
    action: "Intervene with Procurement",
    priority: "CRITICAL"
  },
  {
    id: "mgt-alt-03",
    type: "info",
    title: "NBA Tier-1 Accreditation Audit Approved",
    description: "National Board of Accreditation peer team concluded evaluation with exemplary marks across Faculty-to-Student Ratio & Outcomes.",
    dept: "All Departments",
    action: "Publish Formal Resolution",
    priority: "NORMAL"
  },
  {
    id: "mgt-alt-04",
    type: "warning",
    title: "Cybersecurity Curriculum Gap Detected in Graduate Exit Survey",
    description: "Employer feedback from 6 hiring partners indicates deficiency in cloud security and threat modeling.",
    dept: "CSE & IT",
    action: "Schedule Curriculum Board Review",
    priority: "HIGH"
  }
];

export const EXECUTIVE_REPORTS = [
  {
    id: "rep-01",
    title: "Spring 2026 Institutional Academic Intelligence Audit",
    date: "Generated: Today at 08:00 AM",
    author: "Provost Office & Institutional Intelligence Unit",
    summary: "Comprehensive synthesis of 2,840 active scholars, 428 capstone projects, 90.8% placement velocity, and $4.25M research grant deployment.",
    highlights: [
      "95.2% institutional student retention rate (exceeds Tier-1 benchmark by 4.2%).",
      "Interdisciplinary capstone velocity up 38% between AI and Robotics.",
      "Identified $65k hardware lab compute requirement to eliminate capstone queue bottlenecks."
    ],
    status: "Published • Actionable"
  },
  {
    id: "rep-02",
    title: "NBA Tier-1 Accreditation Defense Dossier",
    date: "Generated: Nov 15, 2025",
    author: "Academic Governance Committee",
    summary: "Complete empirical evidence binder validating 1:19 faculty-student ratio, outcome-based education metrics, and institutional research citations.",
    highlights: [
      "Zero compliance defects across 6 department inspections.",
      "Institutional Failure Memory commended as novel engineering best practice.",
      "142 peer-reviewed faculty publications cataloged."
    ],
    status: "Approved • Archived"
  }
];
