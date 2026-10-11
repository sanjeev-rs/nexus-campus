import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Printer,
  Share2,
  Sparkles,
} from "lucide-react";

import { EXECUTIVE_REPORTS } from "../../data/managementData";
import "../../components/shared/SharedIntelligence.css";

export default function ExecutiveReports() {
  const navigate = useNavigate();
  const [reports, setReports] = useState(EXECUTIVE_REPORTS);
  const [selectedReport, setSelectedReport] = useState(EXECUTIVE_REPORTS[0]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleGenerateReport = () => {
    const newReport = {
      id: `rep-${Date.now().toString().slice(-4)}`,
      title: "Institutional Health & Innovation Snapshot",
      date: "Generated: Just now",
      author: "Office of the Provost & NEXUS Engine",
      summary: "Dynamic synthesis of current student retention (95.2%), research capital deployment, and academic velocity across 6 campus faculties.",
      highlights: [
        "100% faculty submission of midterm advisee milestones.",
        "Zero high-risk unmitigated failure patterns.",
        "Cluster compute utilization optimized at 88.4%."
      ],
      status: "Published • Actionable"
    };
    setReports([newReport, ...reports]);
    setSelectedReport(newReport);
    showToast("New Executive Report compiled and published to Chancellor's Portal.");
  };

  return (
    <div className="intel-page">
      {/* TOAST */}
      {toastMessage && (
        <div className="intel-toast">
          <CheckCircle2 size={18} color="#059669" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <FileText size={14} />
            REPORTING &amp; OVERSIGHT
          </div>
          <h1 className="intel-title">Executive Reports &amp; Institutional Governance</h1>
          <p className="intel-desc">
            Board-level intelligence syntheses, accreditation compliance dossiers, and automated institutional audits ready for governing councils and external evaluators.
          </p>
        </div>

        <div className="intel-actions">
          <button
            type="button"
            className="intel-btn-secondary"
            onClick={() => showToast("Exporting all published dossiers to PDF...")}
          >
            <Printer size={16} />
            <span>Print Dossier</span>
          </button>
          <button
            type="button"
            className="intel-btn-primary"
            onClick={handleGenerateReport}
          >
            <Sparkles size={16} />
            <span>Compile New Audit</span>
          </button>
        </div>
      </div>

      {/* REPORTS SPLIT VIEW */}
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.7fr", gap: "24px" }}>
        {/* REPORT LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {reports.map((rep) => {
            const isSelected = selectedReport?.id === rep.id;
            return (
              <div
                key={rep.id}
                className="intel-card"
                style={{
                  margin: 0,
                  padding: "20px",
                  cursor: "pointer",
                  borderLeft: isSelected ? "5px solid #2563eb" : "1px solid #e2e8f0",
                  background: isSelected ? "#f8fafc" : "#ffffff",
                }}
                onClick={() => setSelectedReport(rep)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <span className="intel-badge success">{rep.status}</span>
                  <span style={{ fontSize: "0.78rem", color: "#64748b" }}>{rep.id}</span>
                </div>
                <h3 style={{ fontSize: "1.08rem", fontWeight: 700, color: "#102544", margin: "0 0 6px 0" }}>
                  {rep.title}
                </h3>
                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  {rep.date} • {rep.author}
                </div>
              </div>
            );
          })}
        </div>

        {/* REPORT READER VIEW */}
        <div className="intel-card" style={{ margin: 0, padding: "30px", background: "#ffffff", border: "1px solid #cbd5e1" }}>
          {selectedReport && (
            <div>
              <div style={{ borderBottom: "2px solid #e2e8f0", paddingBottom: "18px", marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span className="intel-badge success">{selectedReport.status}</span>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      type="button"
                      className="intel-btn-secondary"
                      style={{ padding: "4px 8px", fontSize: "0.78rem" }}
                      onClick={() => showToast("Dossier sent to Academic Senate via encrypted dispatch.")}
                    >
                      <Share2 size={13} /> Dispatch
                    </button>
                    <button
                      type="button"
                      className="intel-btn-secondary"
                      style={{ padding: "4px 8px", fontSize: "0.78rem" }}
                      onClick={() => showToast("Downloading PDF dossier bundle...")}
                    >
                      <Download size={13} /> PDF
                    </button>
                  </div>
                </div>

                <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#102544", margin: "0 0 8px 0", lineHeight: 1.3 }}>
                  {selectedReport.title}
                </h2>
                <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  Authored by: <strong style={{ color: "#1e293b" }}>{selectedReport.author}</strong> • {selectedReport.date}
                </div>
              </div>

              <div style={{ marginBottom: "22px" }}>
                <h3 style={{ fontSize: "0.92rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", fontWeight: 700, marginBottom: "8px" }}>
                  Executive Summary
                </h3>
                <p style={{ fontSize: "0.95rem", color: "#334155", lineHeight: 1.6, background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
                  {selectedReport.summary}
                </p>
              </div>

              <div style={{ marginBottom: "22px" }}>
                <h3 style={{ fontSize: "0.92rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", fontWeight: 700, marginBottom: "12px" }}>
                  Critical Findings &amp; Governance Directives
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {selectedReport.highlights.map((h, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "#1e293b", background: "#f1f5f9", padding: "12px 14px", borderRadius: "6px" }}>
                      <CheckCircle2 size={18} color="#2563eb" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ lineHeight: 1.5 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "18px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", color: "#64748b" }}>
                <span>NEXUS Institutional Quality Assurance Seal</span>
                <span style={{ fontWeight: 700, color: "#059669" }}>VERIFIED AUTHENTIC</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
