import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  DollarSign,
  ExternalLink,
  Eye,
  FolderKanban,
  GraduationCap,
  Lightbulb,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import { DEPARTMENTS_DATA } from "../../data/managementData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
  IntelligenceFilterBar,
  EntityDrawer,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

const ENRICHED_DEPARTMENTS = DEPARTMENTS_DATA.map((d, idx) => ({
  ...d,
  skillDevelopmentScore: idx === 0 ? "94%" : idx === 1 ? "91%" : idx === 2 ? "86%" : idx === 3 ? "82%" : idx === 4 ? "85%" : "96%",
  patentsCount: idx === 0 ? 6 : idx === 1 ? 5 : idx === 2 ? 3 : idx === 3 ? 2 : idx === 4 ? 1 : 2,
  activeInterventions: idx === 0 ? 4 : idx === 1 ? 6 : idx === 2 ? 5 : idx === 3 ? 3 : idx === 4 ? 2 : 1,
}));

function DepartmentPerformance() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState(ENRICHED_DEPARTMENTS);
  const [selectedDept, setSelectedDept] = useState(null);
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filtered = departments.filter((d) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.code.toLowerCase().includes(q) ||
      d.hod.toLowerCase().includes(q) ||
      d.topSkill.toLowerCase().includes(q)
    );
  });

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
        eyebrow="ACADEMIC INTELLIGENCE"
        eyebrowIcon={Building2}
        title="Department Performance &amp; Capability Benchmark"
        description="Comprehensive comparative institutional evaluation across all 6 academic departments analyzing student population, active capstones, verified competency growth, research grants, patent disclosures, and career placement index."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/outcomes")}
            >
              <GraduationCap size={15} />
              <span>Academic Outcomes</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => showToast("Exporting Annual Institutional Quality Audit Dossier (PDF)...")}
            >
              <ShieldCheck size={15} />
              <span>Annual Quality Audit</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Academic Departments"
          value={departments.length}
          icon={Building2}
          variant="blue"
          delta="100% Accredited"
          deltaType="positive"
          meta="NBA Tier-1 Standard"
        />
        <KpiCard
          label="Total Student Body"
          value="2,840"
          icon={Users}
          variant="green"
          delta="1:19 Faculty Ratio"
          deltaType="positive"
          meta="142 Faculty Advisors"
        />
        <KpiCard
          label="Institutional Placement Index"
          value="90.8%"
          icon={Award}
          variant="purple"
          delta="+4.2% YoY Gain"
          deltaType="positive"
          meta="Tier-1 Campus Average"
        />
        <KpiCard
          label="Active Research Grants"
          value="$4.25M"
          icon={DollarSign}
          variant="green"
          delta="6 Departments"
          deltaType="positive"
          meta="External Sponsored Capital"
        />
      </KpiGrid>

      {/* SEARCH BAR */}
      <IntelligenceFilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search departments by name, code, HOD, or primary capability..."
        totalCount={departments.length}
        filteredCount={filtered.length}
      />

      {/* COMPREHENSIVE PERFORMANCE TABLE */}
      <div className="intel-table-container">
        <table className="intel-table">
          <thead>
            <tr>
              <th>Department / Code</th>
              <th>HOD &bull; Faculty Ratio</th>
              <th>Population</th>
              <th>Capstones</th>
              <th>Skill Dev</th>
              <th>Research Capital</th>
              <th>Patents</th>
              <th>Placement Index</th>
              <th>Interventions</th>
              <th style={{ textAlign: "right" }}>Dossier</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr
                key={d.id}
                onClick={() => setSelectedDept(d)}
                style={{ cursor: "pointer" }}
                className="interactive-row"
              >
                <td>
                  <strong style={{ display: "block", color: "#102544" }}>{d.name}</strong>
                  <span style={{ fontSize: "0.75rem", color: "#2563eb", fontWeight: 700 }}>{d.code}</span>
                </td>
                <td>
                  <span style={{ fontWeight: 600, color: "#1e293b", display: "block" }}>{d.hod}</span>
                  <span style={{ fontSize: "0.74rem", color: "#64748b" }}>Ratio: {d.ratio}</span>
                </td>
                <td>
                  <strong style={{ color: "#102544" }}>{d.students}</strong>
                  <span style={{ fontSize: "0.74rem", color: "#64748b", display: "block" }}>{d.faculty} Faculty</span>
                </td>
                <td style={{ fontWeight: 600, color: "#102544" }}>
                  {d.projects} Projects
                </td>
                <td>
                  <span className="intel-badge success">{d.skillDevelopmentScore}</span>
                </td>
                <td style={{ fontWeight: 700, color: "#2563eb" }}>
                  {d.researchGrants}
                </td>
                <td>
                  <span className="intel-badge info" style={{ fontWeight: 700 }}>
                    <Lightbulb size={11} style={{ marginRight: "3px" }} />
                    {d.patentsCount} Filed
                  </span>
                </td>
                <td style={{ fontWeight: 800, color: "#059669" }}>
                  {d.placementRate}
                </td>
                <td>
                  <span className="intel-badge warning">
                    {d.activeInterventions} Active
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    className="intel-btn-secondary"
                    style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDept(d);
                    }}
                  >
                    <Eye size={13} />
                    <span>Dossier</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DEPARTMENT DOSSIER DRAWER */}
      {selectedDept && (
        <EntityDrawer
          isOpen={Boolean(selectedDept)}
          onClose={() => setSelectedDept(null)}
          eyebrow="INSTITUTIONAL DEPARTMENT DOSSIER"
          title={`${selectedDept.name} (${selectedDept.code})`}
          subtitle={`Head of Department: ${selectedDept.hod} • Accreditation: Exemplary Tier-1`}
          footer={
            <>
              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => navigate("/management/projects")}
              >
                <FolderKanban size={14} />
                <span>View Department Projects</span>
              </button>
              <button
                type="button"
                className="intel-btn-secondary"
                onClick={() => navigate("/management/training")}
              >
                <Calendar size={14} />
                <span>Schedule Training</span>
              </button>
              <button
                type="button"
                className="intel-btn-primary"
                onClick={() => {
                  showToast(`Department Performance Report generated for ${selectedDept.code}`);
                  setSelectedDept(null);
                }}
              >
                <CheckCircle2 size={14} />
                <span>Export Dossier</span>
              </button>
            </>
          }
        >
          {/* DESCRIPTION */}
          <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
            <div className="intel-eyebrow">DEPARTMENT PROFILE &amp; CHARTER</div>
            <p style={{ margin: "4px 0 0", fontSize: "0.88rem", color: "#1e293b", lineHeight: "1.5" }}>
              {selectedDept.description}
            </p>
          </div>

          {/* METRICS GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
            <div style={{ background: "#ffffff", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Activity Index</span>
              <strong style={{ display: "block", fontSize: "1.2rem", color: "#059669", marginTop: "2px" }}>{selectedDept.activityScore}%</strong>
            </div>
            <div style={{ background: "#ffffff", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Budget Utilized</span>
              <strong style={{ display: "block", fontSize: "1.2rem", color: "#2563eb", marginTop: "2px" }}>{selectedDept.budgetUtilized}</strong>
            </div>
            <div style={{ background: "#ffffff", padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0", textAlign: "center" }}>
              <span style={{ fontSize: "0.72rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>Placement</span>
              <strong style={{ display: "block", fontSize: "1.2rem", color: "#102544", marginTop: "2px" }}>{selectedDept.placementRate}</strong>
            </div>
          </div>

          {/* PRIMARY COMPETENCIES */}
          <div>
            <div className="intel-eyebrow">CORE COMPETENCY STRENGTHS</div>
            <p style={{ margin: "6px 0 0", fontSize: "0.86rem", color: "#334155", fontWeight: 600 }}>
              {selectedDept.topSkill}
            </p>
          </div>

          {/* CROSS MODULE SHORTCUTS */}
          <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "14px" }}>
            <span style={{ fontSize: "0.74rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
              Cross-Module Institutional Navigation:
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <button
                type="button"
                className="intel-pill"
                onClick={() => navigate("/management/faculty-expertise")}
                style={{ fontSize: "0.76rem" }}
              >
                <Users size={12} />
                <span>Faculty Expertise Map</span>
              </button>
              <button
                type="button"
                className="intel-pill"
                onClick={() => navigate("/management/skill-radar")}
                style={{ fontSize: "0.76rem" }}
              >
                <Award size={12} />
                <span>Campus Skill Radar</span>
              </button>
              <button
                type="button"
                className="intel-pill"
                onClick={() => navigate("/management/interventions")}
                style={{ fontSize: "0.76rem" }}
              >
                <ShieldCheck size={12} />
                <span>Intervention Analytics</span>
              </button>
            </div>
          </div>
        </EntityDrawer>
      )}
    </div>
  );
}

export default DepartmentPerformance;
