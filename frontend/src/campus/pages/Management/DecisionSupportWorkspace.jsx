import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  Compass,
  DollarSign,
  ExternalLink,
  Flag,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

import { DECISION_SUPPORT_SIGNALS } from "../../data/managementData";
import {
  IntelligencePageHeader,
  KpiCard,
  KpiGrid,
  StatusBadge,
} from "../../components/shared";
import "../../components/shared/SharedIntelligence.css";

function DecisionSupportWorkspace() {
  const navigate = useNavigate();
  const [signals, setSignals] = useState(DECISION_SUPPORT_SIGNALS);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAuthorize = (sig) => {
    setSignals((prev) =>
      prev.map((s) => (s.id === sig.id ? { ...s, adopted: true } : s))
    );
    showToast(`Executive Resolution Adopted: "${sig.recommendedAction}"`);
  };

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
        eyebrow="STRATEGIC INTELLIGENCE"
        eyebrowIcon={Compass}
        title="Executive Decision Support Workspace"
        description="Data-grounded institutional recommendations synthesizing telemetry anomalies, student skill bottlenecks, and external market shifts into actionable governing resolutions."
        actions={
          <>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/missions")}
            >
              <Flag size={15} />
              <span>Campus Missions</span>
            </button>
            <button
              type="button"
              className="intel-btn-secondary"
              onClick={() => navigate("/management/resources")}
            >
              <DollarSign size={15} />
              <span>CapEx Resources</span>
            </button>
            <button
              type="button"
              className="intel-btn-primary"
              onClick={() => showToast("Exporting Executive Governance Briefing (Signed PDF)...")}
            >
              <CheckCircle2 size={15} />
              <span>Export Resolutions Docket</span>
            </button>
          </>
        }
      />

      {/* KPI METRICS */}
      <KpiGrid>
        <KpiCard
          label="Active Decision Signals"
          value={signals.length}
          icon={Compass}
          variant="blue"
          delta="Empirically Grounded"
          deltaType="positive"
          meta="Provost observatory"
        />
        <KpiCard
          label="Adopted Resolutions"
          value={signals.filter((s) => s.adopted).length}
          icon={CheckCircle2}
          variant="green"
          delta="Enacted by Governance"
          deltaType="positive"
          meta="Spring 2026 term"
        />
        <KpiCard
          label="Avg Signal Confidence"
          value="92.7%"
          icon={Sparkles}
          variant="purple"
          delta="Telemetry Cross-Validated"
          deltaType="positive"
          meta="LMS, Git, Lab logs"
        />
      </KpiGrid>

      {/* 5-STAGE DECISION SUPPORT SIGNALS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {signals.map((sig) => (
          <div key={sig.id} className="intel-card" style={{ margin: 0, padding: "28px" }}>
            
            {/* SIGNAL TOP BAR */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <StatusBadge variant={sig.adopted ? "success" : "info"}>
                    {sig.adopted ? "RESOLUTION ADOPTED" : sig.category}
                  </StatusBadge>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#059669" }}>
                    {sig.confidence}
                  </span>
                </div>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#102544", margin: "2px 0 4px" }}>
                  {sig.title}
                </h2>
                <span style={{ fontSize: "0.84rem", color: "#64748b" }}>
                  Institutional Scope: <strong>{sig.affectedArea}</strong>
                </span>
              </div>

              {!sig.adopted ? (
                <button
                  type="button"
                  className="intel-btn-primary"
                  onClick={() => handleAuthorize(sig)}
                  style={{ padding: "10px 18px" }}
                >
                  <CheckCircle2 size={16} />
                  <span>Adopt Governing Resolution</span>
                </button>
              ) : (
                <span className="intel-badge success" style={{ padding: "8px 14px", fontSize: "0.85rem" }}>
                  <CheckCircle2 size={16} />
                  Resolution Enacted
                </span>
              )}
            </div>

            {/* 5-STAGE WORKFLOW CHAIN */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              
              {/* STAGE 1: SIGNAL */}
              <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "4px" }}>
                  Stage 1: Observed Institutional Signal
                </strong>
                <p style={{ margin: 0, fontSize: "0.92rem", color: "#1e293b", lineHeight: "1.5" }}>
                  {sig.signal}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={16} color="#94a3b8" /></div>

              {/* STAGE 2: EVIDENCE */}
              <div style={{ background: "#eff6ff", padding: "16px", borderRadius: "10px", border: "1px solid #bfdbfe" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#1d4ed8", textTransform: "uppercase", marginBottom: "4px" }}>
                  Stage 2: Empirical Supporting Evidence
                </strong>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "#1e3a8a", lineHeight: "1.5" }}>
                  {sig.evidence}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={16} color="#94a3b8" /></div>

              {/* STAGE 3: IMPACT */}
              <div style={{ background: "#f0fdf4", padding: "16px", borderRadius: "10px", border: "1px solid #bbf7d0" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#15803d", textTransform: "uppercase", marginBottom: "4px" }}>
                  Stage 3: Projected Institutional Impact
                </strong>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#14532d", lineHeight: "1.5", fontWeight: 600 }}>
                  {sig.expectedImpact}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={16} color="#94a3b8" /></div>

              {/* STAGE 4: RECOMMENDATION */}
              <div style={{ background: "#fefce8", padding: "16px", borderRadius: "10px", border: "1px solid #fef08a" }}>
                <strong style={{ display: "block", fontSize: "0.74rem", color: "#a16207", textTransform: "uppercase", marginBottom: "4px" }}>
                  Stage 4: Strategic Executive Recommendation
                </strong>
                <p style={{ margin: 0, fontSize: "0.92rem", color: "#854d0e", fontWeight: 700, lineHeight: "1.5" }}>
                  {sig.recommendedAction}
                </p>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}><ArrowDown size={16} color="#94a3b8" /></div>

              {/* STAGE 5: DIRECT GOVERNANCE ACTIONS */}
              <div style={{ background: "#ffffff", border: "1.5px solid #2563eb", borderRadius: "12px", padding: "16px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "#2563eb", textTransform: "uppercase" }}>
                      Stage 5: Operationalize Resolution
                    </span>
                    <div style={{ fontSize: "0.84rem", color: "#64748b", marginTop: "2px" }}>
                      Execute across connected NEXUS institutional modules:
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button
                      type="button"
                      className="intel-btn-secondary"
                      onClick={() => navigate("/management/missions")}
                      style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                    >
                      <Flag size={13} />
                      <span>Create Campus Mission</span>
                    </button>
                    <button
                      type="button"
                      className="intel-btn-secondary"
                      onClick={() => navigate("/management/training")}
                      style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                    >
                      <Calendar size={13} />
                      <span>Schedule Training</span>
                    </button>
                    <button
                      type="button"
                      className="intel-btn-secondary"
                      onClick={() => navigate("/management/resources")}
                      style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                    >
                      <DollarSign size={13} />
                      <span>Allocate Budget</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default DecisionSupportWorkspace;
