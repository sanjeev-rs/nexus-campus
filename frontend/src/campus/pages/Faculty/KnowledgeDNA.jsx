import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Layers,
  Network,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";

import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const KNOWLEDGE_NODES = [
  {
    id: "kd-01",
    topic: "Transformer Attention & Dense Vector Embeddings",
    domain: "NLP & Semantic Retrieval",
    mastery: 92,
    status: "Mastered",
    students: ["Sophia Sterling", "Aiden Cross"],
    prerequisites: ["Matrix Factorization", "PyTorch Autograd", "Linear Algebra"],
    connectedProjects: ["Campus Knowledge RAG Retrieval", "Smart Campus Analytics"],
    relatedSkills: ["Vector Indexing (pgvector)", "HuggingFace Transformers", "Cosine Similarity"],
    guidance: "Core capability achieved. Students are ready to build multi-modal retrieval pipelines.",
    nextRecommendation: "Authorize Sophia Sterling for IEEE NLP student workshop paper submission.",
  },
  {
    id: "kd-02",
    topic: "Visual Inertial Odometry & Stereo SLAM",
    domain: "Perception & Robotics",
    mastery: 78,
    status: "Developing",
    students: ["Maya Lin"],
    prerequisites: ["Epipolar Geometry", "ROS 2 Transform Frames (tf2)", "Sensor Fusion"],
    connectedProjects: ["Autonomous Campus Drone Navigation", "Edge Vision Laboratory Monitor"],
    relatedSkills: ["OpenCV StereoBM", "Kalman Filtering", "Jetson C++", "LiDAR Odometry"],
    guidance: "Vibration dampening on drone airframes requires physical test validation before outdoors flight.",
    nextRecommendation: "Schedule Thursday field test in quadrangle canopy flight zone.",
  },
  {
    id: "kd-03",
    topic: "Heterogeneous Property Graph Schema",
    domain: "Knowledge Representation",
    mastery: 56,
    status: "Weak / Gap",
    students: ["Devon Reed"],
    prerequisites: ["Graph Theory Basics", "Relational Database Normalization", "Index Trees"],
    connectedProjects: ["Distributed Graph Intelligence Engine"],
    relatedSkills: ["Cypher Optimization", "Neo4j APOC Batching", "Graph Neural Networks"],
    guidance: "High bottleneck risk: Ingestion memory issues require faculty guidance on chunked periodic commits.",
    nextRecommendation: "Intervene with Devon Reed during today's 2:30 PM office hour on schema indexing.",
  },
  {
    id: "kd-04",
    topic: "TensorRT INT8 Model Quantization",
    domain: "Edge Systems Optimization",
    mastery: 48,
    status: "Emerging",
    students: ["Elena Rostova", "Liam Vance"],
    prerequisites: ["Deep Learning Layer Pruning", "Embedded Linux", "CUDA Toolchain"],
    connectedProjects: ["Edge Vision Laboratory Monitor"],
    relatedSkills: ["ONNX Runtime", "CUDA Toolchain", "FP16 vs INT8 Precision"],
    guidance: "Recommend running an elective hands-on workshop to uplift capability across 20+ department scholars.",
    nextRecommendation: "Coordinate with Department HOD to schedule a 2-day Edge AI Bootcamp.",
  },
];

function KnowledgeDNA() {
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState(KNOWLEDGE_NODES[0]);

  return (
    <div className="intel-page">
      {/* HEADER */}
      <IntelligencePageHeader
        eyebrow="STUDENT INTELLIGENCE"
        eyebrowIcon={Share2}
        title="Knowledge DNA Taxonomy &amp; Gene Maps"
        description="Prerequisite topic taxonomies, intellectual gene maps, and empirical student-to-project capability synthesis across departmental academic curricula."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/skills")}
            >
              <Award size={15} />
              <span>Skill &amp; Competency</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => navigate("/faculty/knowledge-graph")}
            >
              <Network size={15} />
              <span>Campus Knowledge Graph</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Cataloged DNA Domains"
          value={KNOWLEDGE_NODES.length}
          icon={Layers}
          variant="blue"
          delta="Core Topic Taxonomies"
          deltaType="positive"
          meta="Across 48 advisees"
        />
        <KpiCard
          label="Average Mastery Index"
          value="68.5%"
          icon={Award}
          variant="green"
          delta="+8% This Term"
          deltaType="positive"
          meta="Empirically verified"
        />
        <KpiCard
          label="Prerequisite Health"
          value="92%"
          icon={GitBranch}
          variant="purple"
          delta="Zero Orphan Gaps"
          deltaType="positive"
          meta="Curriculum aligned"
        />
      </KpiGrid>

      {/* 2-COLUMN INTERACTIVE EXPLORER */}
      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "24px", alignItems: "flex-start" }}>
        
        {/* NODES CLUSTERS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {KNOWLEDGE_NODES.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{
                  background: isSelected ? "#eff6ff" : "#ffffff",
                  border: `1.5px solid ${isSelected ? "#2563eb" : "#e2e8f0"}`,
                  borderRadius: "14px",
                  padding: "18px 20px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  boxShadow: isSelected ? "0 4px 14px rgba(37,99,235,0.12)" : "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#2563eb", textTransform: "uppercase" }}>
                    {node.domain}
                  </span>
                  <StatusBadge
                    variant={node.status === "Mastered" ? "success" : node.status === "Developing" ? "info" : "warning"}
                  >
                    {node.mastery}%
                  </StatusBadge>
                </div>

                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#102544", margin: "0 0 6px" }}>
                  {node.topic}
                </h3>

                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                  Linked Projects: <strong>{node.connectedProjects.length}</strong> &bull; Scholars: <strong>{node.students.length}</strong>
                </div>
              </div>
            );
          })}
        </div>

        {/* VISUAL GENOME CONNECTION CHAIN */}
        <div className="intel-card" style={{ padding: "28px", margin: 0 }}>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", borderBottom: "1px solid #e2e8f0", paddingBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <div className="intel-eyebrow">KNOWLEDGE GENOME TRACE</div>
              <h2 style={{ fontSize: "1.35rem", color: "#102544", margin: "2px 0 4px" }}>{selectedNode.topic}</h2>
              <span style={{ fontSize: "0.84rem", color: "#64748b" }}>Domain: <strong>{selectedNode.domain}</strong></span>
            </div>

            <StatusBadge variant={selectedNode.status === "Mastered" ? "success" : selectedNode.status === "Developing" ? "info" : "warning"}>
              {selectedNode.status} ({selectedNode.mastery}%)
            </StatusBadge>
          </div>

          {/* CONNECTED CHAIN: TOPIC -> PREREQUISITES -> SKILLS -> PROJECTS & STUDENTS -> RECOMMENDATION */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            
            {/* STAGE 1: PREREQUISITES */}
            <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                <GitBranch size={14} color="#64748b" />
                <strong style={{ fontSize: "0.76rem", color: "#64748b", textTransform: "uppercase" }}>
                  1. Foundational Prerequisites
                </strong>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {selectedNode.prerequisites.map((p) => (
                  <span key={p} style={{ background: "#ffffff", border: "1px solid #cbd5e1", color: "#334155", fontSize: "0.78rem", padding: "3px 10px", borderRadius: "6px", fontWeight: 600 }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={16} color="#94a3b8" /></div>

            {/* STAGE 2: SKILLS VERIFIED */}
            <div style={{ background: "#eff6ff", padding: "16px", borderRadius: "10px", border: "1px solid #bfdbfe" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                <Award size={14} color="#1d4ed8" />
                <strong style={{ fontSize: "0.76rem", color: "#1d4ed8", textTransform: "uppercase" }}>
                  2. Verified Technical Competencies
                </strong>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {selectedNode.relatedSkills.map((s) => (
                  <span key={s} style={{ background: "#ffffff", color: "#1d4ed8", fontSize: "0.78rem", padding: "3px 10px", borderRadius: "6px", fontWeight: 600, border: "1px solid #93c5fd" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={16} color="#94a3b8" /></div>

            {/* STAGE 3: SCHOLARS & PROJECTS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div style={{ background: "#ffffff", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <strong style={{ fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase" }}>
                    3. Capstone Projects
                  </strong>
                  <button
                    type="button"
                    className="intel-pill"
                    onClick={() => navigate("/faculty/project-dna")}
                    style={{ fontSize: "0.72rem", padding: "2px 8px" }}
                  >
                    <span>DNA</span>
                    &rarr;
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {selectedNode.connectedProjects.map((p) => (
                    <strong key={p} style={{ fontSize: "0.86rem", color: "#102544" }}>
                      &bull; {p}
                    </strong>
                  ))}
                </div>
              </div>

              <div style={{ background: "#ffffff", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <strong style={{ fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase" }}>
                    4. Active Scholars
                  </strong>
                  <button
                    type="button"
                    className="intel-pill"
                    onClick={() => navigate("/faculty/advisees")}
                    style={{ fontSize: "0.72rem", padding: "2px 8px" }}
                  >
                    <span>Advisees</span>
                    &rarr;
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {selectedNode.students.map((stu) => (
                    <strong key={stu} style={{ fontSize: "0.86rem", color: "#2563eb" }}>
                      &bull; {stu}
                    </strong>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={16} color="#94a3b8" /></div>

            {/* STAGE 4: FACULTY GUIDANCE & RECOMMENDATIONS */}
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "16px", borderRadius: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#15803d", fontWeight: 700, fontSize: "0.8rem", marginBottom: "4px" }}>
                <Sparkles size={15} />
                <span>5. FACULTY GUIDANCE &amp; NEXT ACTION</span>
              </div>
              <p style={{ margin: "0 0 6px", fontSize: "0.88rem", color: "#166534", lineHeight: "1.45" }}>
                {selectedNode.guidance}
              </p>
              <div style={{ background: "#ffffff", padding: "10px 12px", borderRadius: "8px", borderLeft: "3px solid #16a34a", fontSize: "0.84rem", color: "#14532d", fontWeight: 600 }}>
                Next Action: {selectedNode.nextRecommendation}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default KnowledgeDNA;
