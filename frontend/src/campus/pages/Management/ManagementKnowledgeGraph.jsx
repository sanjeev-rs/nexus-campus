import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Database,
  Layers,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { CAMPUS_GRAPH_DATA } from "../../data/facultyData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  RelationshipExplorer,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const GRAPH_CLUSTERS = [
  { id: "all", name: "Whole Campus Ontology", nodesCount: 21, edgesCount: 19, hub: "Provost & Governance" },
  { id: "ai", name: "AI & Neural Perception Cluster", nodesCount: 8, edgesCount: 9, hub: "Dr. Evelyn Vance" },
  { id: "robotics", name: "Autonomous Systems & Robotics", nodesCount: 6, edgesCount: 6, hub: "Dr. Aris Thorne" },
  { id: "systems", name: "Cloud & Distributed Systems", nodesCount: 7, edgesCount: 4, hub: "Dr. Elena Rostova" },
];

export default function ManagementKnowledgeGraph() {
  const navigate = useNavigate();
  const [selectedCluster, setSelectedCluster] = useState("all");

  const filteredNodes = CAMPUS_GRAPH_DATA.nodes.filter((node) => {
    if (selectedCluster === "all") return true;
    if (selectedCluster === "ai") {
      return ["dept-aids", "fac-vance", "stu-aiden", "stu-sophia", "proj-analytics", "proj-rag", "skill-python", "skill-pytorch"].includes(node.id);
    }
    if (selectedCluster === "robotics") {
      return ["dept-cse", "fac-thorne", "stu-maya", "proj-drone", "skill-ros2", "tech-jetson", "fail-vibration"].includes(node.id);
    }
    if (selectedCluster === "systems") {
      return ["dept-cse", "stu-devon", "proj-graph", "skill-neo4j", "fail-graph-oom"].includes(node.id);
    }
    return true;
  });

  const filteredEdges = CAMPUS_GRAPH_DATA.edges.filter((e) => {
    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    return nodeIds.has(e.source) && nodeIds.has(e.target);
  });

  const handleNavigateEntity = (node) => {
    const t = (node.group || node.type || "").toLowerCase();
    if (t.includes("project")) navigate("/management/project-dna");
    else if (t.includes("department")) navigate("/management/departments");
    else if (t.includes("faculty")) navigate("/management/faculty-expertise");
    else if (t.includes("failure")) navigate("/management/failure-memory");
    else navigate("/management");
  };

  return (
    <div className="intel-page">
      {/* HEADER */}
      <IntelligencePageHeader
        eyebrow="INSTITUTIONAL MEMORY"
        eyebrowIcon={Network}
        title="Campus Knowledge Graph Topology"
        description="Macro-level semantic ontology mapping multidirectional relationships between student researchers, faculty advisors, technical projects, and enterprise capability clusters."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/learning")}
            >
              <Layers size={16} />
              <span>Institutional Learning</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => navigate("/management/retention")}
            >
              <Database size={16} />
              <span>Knowledge Retention</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Indexed Ontology Entities"
          value="3,610"
          icon={Network}
          variant="blue"
          delta="Scholars, Faculty, Repos"
          deltaType="positive"
          meta="All 6 Departments"
        />
        <KpiCard
          label="Cross-Domain Relationships"
          value="12,480"
          icon={Layers}
          variant="green"
          delta="3.4x density vs 2024"
          deltaType="positive"
          meta="Multi-relational graph"
        />
        <KpiCard
          label="Interdisciplinary Co-authorship"
          value="38.4%"
          icon={Sparkles}
          variant="purple"
          delta="+14.2% YoY cross-links"
          deltaType="positive"
          meta="Joint Capstones"
        />
        <KpiCard
          label="Semantic Freshness"
          value="100%"
          icon={ShieldCheck}
          variant="green"
          delta="Synchronized"
          deltaType="positive"
          meta="Campus Git & Telemetry"
        />
      </KpiGrid>

      {/* CLUSTERS OVERVIEW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {GRAPH_CLUSTERS.map((cluster) => {
          const isSelected = selectedCluster === cluster.id;
          return (
            <div
              key={cluster.id}
              className="intel-card"
              style={{
                margin: 0,
                padding: "18px",
                cursor: "pointer",
                border: isSelected ? "2px solid #2563eb" : "1px solid #e2e8f0",
                background: isSelected ? "#eff6ff" : "#ffffff",
                transition: "all 0.15s ease",
              }}
              onClick={() => setSelectedCluster(cluster.id)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span className={`intel-badge ${isSelected ? "success" : "info"}`}>{cluster.nodesCount} ENTITIES</span>
                <span style={{ fontSize: "0.78rem", color: "#64748b" }}>{cluster.edgesCount} Edges</span>
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#102544", margin: "0 0 6px 0" }}>
                {cluster.name}
              </h3>
              <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
                Academic Anchor: <strong style={{ color: "#1e293b" }}>{cluster.hub}</strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* RELATIONSHIP EXPLORER */}
      <RelationshipExplorer
        nodes={filteredNodes}
        edges={filteredEdges}
        initialSelectedId={filteredNodes[0]?.id || "fac-vance"}
        title="Executive Ontology Topology View"
        onNavigateEntity={handleNavigateEntity}
      />
    </div>
  );
}
