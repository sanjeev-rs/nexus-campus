import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  FolderKanban,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
  IntelligenceFilterBar,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const ENRICHED_TECH_TRENDS = [
  {
    name: "Vector Databases & Dense RAG (pgvector / Qdrant)",
    category: "AI & Data Architecture",
    projectAdoption: "48 Capstone Repositories (34% of active projects)",
    studentInterest: "92% Student Research Interest Index",
    facultyExpertise: "Dr. Evelyn Vance & 12 AI Faculty Mentors",
    researchActivity: "18 Peer-Reviewed Publications & $450k Grant",
    growthTrend: "+42% YoY High Velocity",
    recommendation: "Establish official Campus Vector Store cluster & mandate vector indexing in all 3rd-year lab curricula.",
  },
  {
    name: "Robot Operating System 2 (ROS 2 Humble / Iron)",
    category: "Autonomous Systems & Robotics",
    projectAdoption: "28 Robotics Capstones (100% of autonomous vehicles)",
    studentInterest: "86% Student Research Interest Index",
    facultyExpertise: "Dr. Aris Thorne & 8 Robotics Faculty Mentors",
    researchActivity: "14 Publications & $680k Sponsored Grant",
    growthTrend: "+28% YoY Accelerating",
    recommendation: "Authorize hardware expansion of 16 Jetson Orin Nano testbenches to eliminate lab queues.",
  },
  {
    name: "Distributed Property Graphs (Neo4j & Cypher)",
    category: "Knowledge Systems",
    projectAdoption: "16 Data Science & Systems Projects",
    studentInterest: "74% Student Research Interest Index",
    facultyExpertise: "Dr. Evelyn Vance & 6 Systems Faculty",
    researchActivity: "8 Publications & National Data Grant",
    growthTrend: "+18% YoY Emerging",
    recommendation: "Provide specialized streaming ingestion workshops to resolve student memory heap bottlenecks.",
  },
  {
    name: "Edge Model Quantization (ONNX Runtime & TensorRT)",
    category: "Edge Hardware Optimization",
    projectAdoption: "22 Mobile & IoT perception deployments",
    studentInterest: "79% Student Research Interest Index",
    facultyExpertise: "Dr. Rajesh Iyer & 7 ECE Faculty",
    researchActivity: "11 Publications & Semiconductor MoU",
    growthTrend: "+35% YoY Rapid Growth",
    recommendation: "Run elective bootcamp on INT8 quantization and hardware-in-the-loop performance profiling.",
  },
];

function TechnologyTrends() {
  const navigate = useNavigate();
  const [techTrends] = useState(ENRICHED_TECH_TRENDS);
  const [search, setSearch] = useState("");

  const filtered = techTrends.filter((t) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.recommendation.toLowerCase().includes(q)
    );
  });

  return (
    <div className="intel-page">
      {/* HEADER */}
      <IntelligencePageHeader
        eyebrow="CAMPUS INTELLIGENCE"
        eyebrowIcon={Sparkles}
        title="Technology Trend Intelligence Observatory"
        description="Macro-level telemetry tracking emerging technical frameworks, project adoption rates, student research interest, faculty expertise capacity, and strategic institutional recommendations."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/projects")}
            >
              <FolderKanban size={15} />
              <span>Project Ecosystem</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => navigate("/management/training")}
            >
              <Calendar size={15} />
              <span>Plan Tech Training</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Tracked Technology Stacks"
          value={techTrends.length}
          icon={Sparkles}
          variant="blue"
          delta="Full Stack Radar"
          deltaType="positive"
          meta="Frameworks & Tools"
        />
        <KpiCard
          label="Fastest Growing Trend"
          value="+42% YoY"
          icon={TrendingUp}
          variant="green"
          delta="Vector DBs & RAG"
          deltaType="positive"
          meta="Surging student adoption"
        />
        <KpiCard
          label="Active Research Papers"
          value="51 Papers"
          icon={BookOpen}
          variant="purple"
          delta="Peer Reviewed"
          deltaType="positive"
          meta="Faculty publications in '25-26"
          onClick={() => navigate("/management/research")}
        />
      </KpiGrid>

      {/* SEARCH BAR */}
      <IntelligenceFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search emerging technologies, categories, or recommendations..."
        totalCount={techTrends.length}
        filteredCount={filtered.length}
      />

      {/* STRUCTURED TRENDS GRID */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {filtered.map((item) => (
          <div key={item.name} className="intel-card" style={{ margin: 0, padding: "26px" }}>
            
            {/* CARD TITLE & VELOCITY */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span className="intel-badge info">{item.category}</span>
                  <StatusBadge variant="success">{item.growthTrend}</StatusBadge>
                </div>
                <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#102544", margin: "2px 0" }}>
                  {item.name}
                </h2>
              </div>
            </div>

            {/* 6-STEP FLOW: TECHNOLOGY -> PROJECT ADOPTION -> STUDENT INTEREST -> FACULTY EXPERTISE -> RESEARCH -> RECOMMENDATION */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <strong style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", marginBottom: "2px" }}>
                    1. Campus Project Adoption
                  </strong>
                  <span style={{ fontSize: "0.88rem", color: "#102544", fontWeight: 600 }}>
                    {item.projectAdoption}
                  </span>
                </div>

                <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <strong style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", marginBottom: "2px" }}>
                    2. Student Research Interest
                  </strong>
                  <span style={{ fontSize: "0.88rem", color: "#059669", fontWeight: 700 }}>
                    {item.studentInterest}
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <strong style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", marginBottom: "2px" }}>
                    3. Faculty Expertise Capacity
                  </strong>
                  <span style={{ fontSize: "0.88rem", color: "#1e293b" }}>
                    {item.facultyExpertise}
                  </span>
                </div>

                <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  <strong style={{ display: "block", fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", marginBottom: "2px" }}>
                    4. Active Research Activity
                  </strong>
                  <span style={{ fontSize: "0.88rem", color: "#2563eb", fontWeight: 600 }}>
                    {item.researchActivity}
                  </span>
                </div>
              </div>

              {/* RECOMMENDATION */}
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "14px 16px", borderRadius: "8px", marginTop: "4px" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#15803d", textTransform: "uppercase", marginBottom: "3px" }}>
                  Institutional Strategic Recommendation:
                </strong>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#166534", fontWeight: 600 }}>
                  {item.recommendation}
                </p>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnologyTrends;
