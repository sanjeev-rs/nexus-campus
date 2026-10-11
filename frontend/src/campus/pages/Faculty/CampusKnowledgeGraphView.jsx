import { useNavigate } from "react-router-dom";
import { BookOpen, Layers, Network, ShieldCheck, Sparkles, Users } from "lucide-react";

import { CAMPUS_KNOWLEDGE_GRAPH } from "../../data/facultyData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  RelationshipExplorer,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

function CampusKnowledgeGraphView() {
  const navigate = useNavigate();

  const handleNavigateEntity = (node) => {
    const t = (node.group || node.type || "").toLowerCase();
    if (t.includes("student")) navigate("/faculty/advisees");
    else if (t.includes("project")) navigate("/faculty/project-dna");
    else if (t.includes("failure")) navigate("/faculty/failure-memory");
    else if (t.includes("research")) navigate("/faculty/research");
    else if (t.includes("skill")) navigate("/faculty/skills");
    else navigate("/faculty/overview");
  };

  return (
    <div className="intel-page">
      {/* HEADER */}
      <IntelligencePageHeader
        eyebrow="INSTITUTIONAL KNOWLEDGE"
        eyebrowIcon={Network}
        title="Campus Knowledge Graph Explorer"
        description="Multi-relational campus semantic ontology connecting academic departments, faculty advisors, scholars, capstone repositories, required competencies, failure post-mortems, and research literature."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/faculty/knowledge-dna")}
            >
              <Sparkles size={15} />
              <span>Knowledge DNA</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => navigate("/faculty/failure-memory")}
            >
              <ShieldCheck size={15} />
              <span>Failure Post-Mortems</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Total Ontology Entities"
          value={CAMPUS_KNOWLEDGE_GRAPH.nodes.length}
          icon={Network}
          variant="blue"
          delta="9 Entity Types"
          deltaType="positive"
          meta="Department to Knowledge"
        />
        <KpiCard
          label="Semantic Relational Links"
          value={CAMPUS_KNOWLEDGE_GRAPH.edges.length}
          icon={Layers}
          variant="green"
          delta="Advising, Demands, Cites"
          deltaType="positive"
          meta="Verified cross-domain links"
        />
        <KpiCard
          label="Supervised Scholars"
          value={CAMPUS_KNOWLEDGE_GRAPH.nodes.filter((n) => n.group === "Student").length}
          icon={Users}
          variant="purple"
          delta="Cohort Class of 2026"
          deltaType="positive"
          meta="Connected to projects"
          onClick={() => navigate("/faculty/advisees")}
        />
        <KpiCard
          label="Documented Failures"
          value={CAMPUS_KNOWLEDGE_GRAPH.nodes.filter((n) => n.group === "Failure").length}
          icon={BookOpen}
          variant="rose"
          delta="Codified Guardrails"
          deltaType="warning"
          meta="Preventing repeated errors"
          onClick={() => navigate("/faculty/failure-memory")}
        />
      </KpiGrid>

      {/* INTERACTIVE GRAPH TOPOLOGY */}
      <RelationshipExplorer
        nodes={CAMPUS_KNOWLEDGE_GRAPH.nodes}
        edges={CAMPUS_KNOWLEDGE_GRAPH.edges}
        initialSelectedId="fac-vance"
        title="NEXUS Faculty Semantic Graph Topology"
        onNavigateEntity={handleNavigateEntity}
      />
    </div>
  );
}

export default CampusKnowledgeGraphView;
