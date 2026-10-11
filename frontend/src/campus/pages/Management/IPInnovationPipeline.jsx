import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  DollarSign,
  ExternalLink,
  Layers,
  Lightbulb,
  Search,
  Sparkles,
  Users,
  X,
} from "lucide-react";

import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
  IntelligenceFilterBar,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const COMPREHENSIVE_IP_PORTFOLIO = [
  {
    id: "ip-01",
    title: "Vibration-Isolated Optical SLAM Sensor Mount for Micro-UAVs",
    category: "Patent Candidate",
    type: "Utility Patent Application",
    inventors: "Dr. Aris Thorne, Maya Lin (Student)",
    department: "Robotics & Automation",
    stage: "Provisional Filing Submitted",
    commercialPotential: "$250k Valuation (High)",
    industryPartners: ["AeroTech Dynamics", "Autonomous Systems Inc."],
    technologyTransfer: "Exclusive licensing agreement under negotiation with AeroTech",
  },
  {
    id: "ip-02",
    title: "Layout-Aware Markdown Table Chunking Algorithm for Academic RAG",
    category: "Publication Candidate",
    type: "Top-Tier Conference Preprint",
    inventors: "Dr. Evelyn Vance, Sophia Sterling (Student)",
    department: "AI & Data Science",
    stage: "Under Peer Review at ACL 2026",
    commercialPotential: "Institutional Open Benchmark",
    industryPartners: ["NEXUS Campus Intelligence Consortium"],
    technologyTransfer: "Open-source campus standard adopted by 4 partner universities",
  },
  {
    id: "ip-03",
    title: "Dynamic Student Capability Indexing Algorithm",
    category: "Patent Candidate",
    type: "Algorithm Copyright & Trademark",
    inventors: "Provost Alistair Sterling, Dr. Marcus Vance",
    department: "AI & Data Science / Governance",
    stage: "Approved by Institutional IP Board",
    commercialPotential: "EdTech Enterprise Licensing",
    industryPartners: ["Academic Intelligence Networks"],
    technologyTransfer: "SaaS licensing framework for higher education consortiums",
  },
  {
    id: "ip-04",
    title: "Campus Micro-Grid Real-time Predictive Load Shedder",
    category: "Innovation Project",
    type: "CleanTech Commercial Prototype",
    inventors: "Dr. Julian Hayes, Dr. Rajesh Iyer, Aiden Cross (Student)",
    department: "Interdisciplinary Innovation Hub & ECE",
    stage: "Campus Field Deployment (TRL-7)",
    commercialPotential: "$400k Energy Offset Valuation",
    industryPartners: ["State Power Distribution Corp", "CleanEnergy Labs"],
    technologyTransfer: "Municipal smart grid pilot deployment scheduled for Q4 2026",
  },
  {
    id: "ip-05",
    title: "Zero-Knowledge Academic Credentials Verification Bridge",
    category: "Technology Transfer Opportunity",
    type: "Corporate Tech Transfer",
    inventors: "Dr. Elena Rostova, Devon Reed (Student)",
    department: "Computer Science & Engineering",
    stage: "Proof of Concept Complete",
    commercialPotential: "$180k Commercial Licensing",
    industryPartners: ["Veritas Identity Solutions", "Global Credential Exchange"],
    technologyTransfer: "Commercial tech transfer term sheet drafted with corporate incubator",
  },
];

function IPInnovationPipeline() {
  const navigate = useNavigate();
  const [ipList, setIpList] = useState(COMPREHENSIVE_IP_PORTFOLIO);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filtered = ipList.filter((item) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.inventors.toLowerCase().includes(q) ||
      item.department.toLowerCase().includes(q) ||
      item.industryPartners.some((p) => p.toLowerCase().includes(q));

    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const categoryPills = [
    { id: "All", label: "All IP Assets", count: ipList.length },
    { id: "Patent Candidate", label: "Patent Candidates", count: ipList.filter((i) => i.category === "Patent Candidate").length },
    { id: "Publication Candidate", label: "Publications", count: ipList.filter((i) => i.category === "Publication Candidate").length },
    { id: "Innovation Project", label: "Innovation Projects", count: ipList.filter((i) => i.category === "Innovation Project").length },
    { id: "Technology Transfer Opportunity", label: "Tech Transfers", count: ipList.filter((i) => i.category === "Technology Transfer Opportunity").length },
  ];

  return (
    <div className="intel-page">
      {/* TOAST */}
      {toastMessage && (
        <div className="intel-toast" role="status">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", marginLeft: "6px" }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* HEADER */}
      <IntelligencePageHeader
        eyebrow="PROJECT & RESEARCH"
        eyebrowIcon={Lightbulb}
        title="IP &amp; Innovation Pipeline Observatory"
        description="Institutional intellectual property portfolio tracking patent candidate disclosures, peer publication candidates, high-TRL innovation capstones, and commercial technology transfers."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/research")}
            >
              <BookOpen size={15} />
              <span>Research Intelligence</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => showToast("Opening Institutional Patent Disclosure Intake Docket...")}
            >
              <Lightbulb size={15} />
              <span>File Provisional Disclosure</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Patent Disclosures"
          value="19 Filings"
          icon={Lightbulb}
          variant="purple"
          delta="+58% YoY Growth"
          deltaType="positive"
          meta="Faculty & Student Inventors"
        />
        <KpiCard
          label="Enterprise Partners"
          value="14 Enterprises"
          icon={Award}
          variant="blue"
          delta="Active MoUs"
          deltaType="positive"
          meta="Commercial Technology Transfer"
        />
        <KpiCard
          label="Portfolio Asset Valuation"
          value="$825,000"
          icon={DollarSign}
          variant="green"
          delta="IP Board Certified"
          deltaType="positive"
          meta="Commercialization potential"
        />
      </KpiGrid>

      {/* FILTER BAR */}
      <IntelligenceFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search IP portfolio by title, inventor, department, or corporate partner..."
        pills={categoryPills}
        activePill={categoryFilter}
        onPillSelect={setCategoryFilter}
        totalCount={ipList.length}
        filteredCount={filtered.length}
      />

      {/* IP CARDS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        {filtered.map((ip) => (
          <div key={ip.id} className="intel-card" style={{ margin: 0, padding: "26px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <StatusBadge variant={ip.category.includes("Patent") ? "purple" : ip.category.includes("Publication") ? "info" : "success"}>
                    {ip.category}
                  </StatusBadge>
                  <StatusBadge variant="success">{ip.stage}</StatusBadge>
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#102544", margin: "2px 0 4px" }}>
                  {ip.title}
                </h3>
                <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                  Inventors: <strong>{ip.inventors}</strong> &bull; Dept: <strong>{ip.department}</strong>
                </span>
              </div>

              <div style={{ textAlign: "right", background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "8px 16px", borderRadius: "10px" }}>
                <span style={{ display: "block", fontSize: "0.72rem", color: "#15803d", textTransform: "uppercase", fontWeight: 700 }}>
                  Commercial Potential
                </span>
                <strong style={{ fontSize: "0.98rem", color: "#166534" }}>{ip.commercialPotential}</strong>
              </div>
            </div>

            {/* DETAILS GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
              <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                  Corporate / Industry Partners
                </strong>
                <span style={{ fontSize: "0.86rem", color: "#1e293b", fontWeight: 600 }}>
                  {ip.industryPartners.join(" • ")}
                </span>
              </div>

              <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                  Technology Transfer Pathway
                </strong>
                <span style={{ fontSize: "0.86rem", color: "#1e293b", fontWeight: 600 }}>
                  {ip.technologyTransfer}
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => navigate("/management/project-dna")}
                style={{ fontSize: "0.8rem", padding: "6px 12px" }}
              >
                <Layers size={13} />
                <span>Inspect Project DNA</span>
              </button>
              <button
                type="button"
                className="intel-btn-primary"
                onClick={() => showToast(`Initiated corporate liaison docket for "${ip.title}"`)}
                style={{ fontSize: "0.8rem", padding: "6px 14px" }}
              >
                <ExternalLink size={13} />
                <span>Corporate Liaison Transfer</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IPInnovationPipeline;
