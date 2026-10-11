import { useState } from "react";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers,
  Search,
  Sparkles,
  Users,
} from "lucide-react";

import "../../components/shared/SharedIntelligence.css";

const RESEARCH_DOMAINS = [
  {
    domain: "Distributed AI & Graph Neural Networks",
    lead: "Dr. Evelyn Vance",
    department: "AI & Data Science",
    grants: "$850,000 (NSF & Campus Grant)",
    publicationsCount: 24,
    activeCapstones: 6,
    mentoringCapacity: "3 of 5 seats open",
    keyProjects: ["Distributed Graph Intelligence Engine", "Campus Knowledge RAG Retrieval"],
    status: "Active Lab"
  },
  {
    domain: "Perception & Vision-Guided Autonomous Robotics",
    lead: "Dr. Aris Thorne",
    department: "Robotics & Automation",
    grants: "$680,000 (Industry Consortium)",
    publicationsCount: 18,
    activeCapstones: 4,
    mentoringCapacity: "Full (0 seats)",
    keyProjects: ["Autonomous Campus Drone Navigation", "Edge Vision Laboratory Monitor"],
    status: "Active Lab"
  },
  {
    domain: "Cyber-Physical Systems & Low-Power Telemetry",
    lead: "Dr. Rajesh Iyer",
    department: "Electronics & Communication",
    grants: "$420,000 (Departmental Grant)",
    publicationsCount: 15,
    activeCapstones: 3,
    mentoringCapacity: "2 of 4 seats open",
    keyProjects: ["Campus Micro-Grid Controller", "Lab Environmental Monitor"],
    status: "Active Lab"
  }
];

const RECENT_PUBLICATIONS = [
  {
    title: "Empirical Dense-Sparse Hybrid Retrieval over Heterogeneous Campus Knowledge Repositories",
    authors: "Dr. Evelyn Vance, Sophia Sterling",
    conference: "IEEE Transactions on Academic Intelligence (2025)",
    citations: 14,
    status: "Published"
  },
  {
    title: "Vibration-Resilient Optical Flow Odometry on Lightweight Jetson Micro-Aerial Vehicles",
    authors: "Dr. Aris Thorne, Maya Lin",
    conference: "ICRA Workshop on Micro-Robotics (2025)",
    citations: 8,
    status: "Published"
  },
  {
    title: "Dynamic Graph Partitioning for Student Competency Progression Modeling",
    authors: "Dr. Evelyn Vance, Devon Reed",
    conference: "ACM SIGKDD Student Research Symposium (2025)",
    citations: 6,
    status: "In Press"
  }
];

function ResearchExpertise() {
  const [search, setSearch] = useState("");

  const filteredDomains = RESEARCH_DOMAINS.filter((d) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      d.domain.toLowerCase().includes(q) ||
      d.lead.toLowerCase().includes(q) ||
      d.department.toLowerCase().includes(q)
    );
  });

  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <BookOpen size={14} />
            PROJECT &amp; RESEARCH
          </div>
          <h1 className="intel-title">Research &amp; Faculty Expertise</h1>
          <p className="intel-desc">
            Institutional research clusters, faculty publication dockets, active sponsored research grants, and lab mentoring capacities.
          </p>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="intel-kpi-grid">
        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Active Research Grants</span>
            <div className="intel-kpi-icon green"><Award size={18} /></div>
          </div>
          <div className="intel-kpi-value">$1.95M</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">3 Funded Grants</span>
            <span>Active FY 2025-26</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Peer-Reviewed Papers</span>
            <div className="intel-kpi-icon blue"><FileText size={18} /></div>
          </div>
          <div className="intel-kpi-value">57 Papers</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">Co-authored with students</span>
            <span>Scopus / IEEE</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Research Scholars</span>
            <div className="intel-kpi-icon purple"><Users size={18} /></div>
          </div>
          <div className="intel-kpi-value">13 Co-Authors</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">Advisee Cohort</span>
            <span>Actively publishing</span>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="intel-filter-bar">
        <div className="intel-search-box">
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search research domains, leads, or departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* RESEARCH DOMAINS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "20px", marginBottom: "28px" }}>
        {filteredDomains.map((dom) => (
          <div key={dom.domain} className="intel-card" style={{ padding: "24px", margin: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
              <span className="intel-badge info">{dom.status}</span>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#059669" }}>{dom.grants}</span>
            </div>

            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#102544", margin: "0 0 6px" }}>
              {dom.domain}
            </h3>

            <p style={{ fontSize: "0.84rem", color: "#64748b", margin: "0 0 14px" }}>
              Lead: <strong>{dom.lead}</strong> • {dom.department}
            </p>

            <div style={{ background: "#f8fafc", padding: "12px", borderRadius: "8px", marginBottom: "14px", fontSize: "0.82rem" }}>
              <strong style={{ color: "#334155", display: "block", marginBottom: "4px" }}>Key Lab Projects:</strong>
              {dom.keyProjects.map((kp) => (
                <div key={kp} style={{ color: "#2563eb" }}>&bull; {kp}</div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "12px", fontSize: "0.78rem", color: "#64748b" }}>
              <span>Publications: <strong>{dom.publicationsCount}</strong></span>
              <span style={{ color: "#2563eb", fontWeight: 600 }}>Capacity: {dom.mentoringCapacity}</span>
            </div>
          </div>
        ))}
      </div>

      {/* PUBLICATIONS DOSSIER */}
      <div className="intel-card">
        <div className="intel-card-header">
          <div>
            <h2>Recent Co-Authored Publications</h2>
            <div className="intel-card-subtitle">Peer-reviewed conference proceedings co-authored with undergraduate and graduate scholars</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {RECENT_PUBLICATIONS.map((pub) => (
            <div
              key={pub.title}
              style={{
                padding: "16px 18px",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                background: "#ffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <strong style={{ display: "block", color: "#102544", fontSize: "0.92rem", marginBottom: "3px" }}>
                  {pub.title}
                </strong>
                <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                  Authors: {pub.authors} &bull; <em>{pub.conference}</em>
                </span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span className="intel-badge success">{pub.status}</span>
                <span style={{ display: "block", fontSize: "0.74rem", color: "#64748b", marginTop: "4px" }}>
                  {pub.citations} Citations
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResearchExpertise;
