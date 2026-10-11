import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck,
  FileText,
  Layers,
  MessageSquare,
  Send,
  X,
} from "lucide-react";

import { PROJECT_REVIEWS } from "../../data/facultyData";
import "../../components/shared/SharedIntelligence.css";

function ProjectReviewPipeline() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState(PROJECT_REVIEWS);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [selectedReview, setSelectedReview] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprove = (rev) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === rev.id
          ? { ...r, status: "APPROVED", verdict: "Approved by Faculty Committee", feedback: feedbackText || "Deliverable meets all technical benchmark specifications." }
          : r
      )
    );
    showToast(`Approved milestone for ${rev.studentName}. Progress updated.`);
    setSelectedReview(null);
    setFeedbackText("");
  };

  const handleRequestRevision = (rev) => {
    if (!feedbackText.trim()) {
      showToast("Please provide constructive revision feedback notes.");
      return;
    }
    setReviews((prev) =>
      prev.map((r) =>
        r.id === rev.id
          ? { ...r, status: "REVISION_REQUESTED", verdict: "Revision Required", feedback: feedbackText }
          : r
      )
    );
    showToast(`Revision request dispatched to ${rev.studentName}.`);
    setSelectedReview(null);
    setFeedbackText("");
  };

  const displayedReviews = reviews.filter((r) => {
    if (activeTab === "ALL") return true;
    return r.status === activeTab;
  });

  return (
    <div className="intel-page">
      {/* TOAST */}
      {toastMessage && (
        <div className="intel-toast">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
          <button type="button" onClick={() => setToastMessage(null)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <FileCheck size={14} />
            PROJECT &amp; RESEARCH
          </div>
          <h1 className="intel-title">Project Review Pipeline</h1>
          <p className="intel-desc">
            Formal evaluation pipeline for capstone deliverables, research manuscripts, and hardware benchmarks submitted by supervised advisees.
          </p>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="intel-kpi-grid">
        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Pending Reviews</span>
            <div className="intel-kpi-icon amber"><Clock size={18} /></div>
          </div>
          <div className="intel-kpi-value">{reviews.filter((r) => r.status === "PENDING").length}</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta warning">Action required</span>
            <span>Awaiting grading</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Approved Milestones</span>
            <div className="intel-kpi-icon green"><CheckCircle2 size={18} /></div>
          </div>
          <div className="intel-kpi-value">{reviews.filter((r) => r.status === "APPROVED").length}</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">Signed Off</span>
            <span>Spring Term</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Revisions Requested</span>
            <div className="intel-kpi-icon rose"><AlertCircle size={18} /></div>
          </div>
          <div className="intel-kpi-value">{reviews.filter((r) => r.status === "REVISION_REQUESTED").length}</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta negative">Iterating</span>
            <span>Under review</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Avg Turnaround Time</span>
            <div className="intel-kpi-icon blue"><FileCheck size={18} /></div>
          </div>
          <div className="intel-kpi-value">18.4 hrs</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">Ahead of 48h SLA</span>
            <span>Institutional KPI</span>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="intel-pill-filters" style={{ marginBottom: "20px" }}>
        <button
          type="button"
          className={`intel-pill ${activeTab === "PENDING" ? "active" : ""}`}
          onClick={() => setActiveTab("PENDING")}
        >
          Pending Review ({reviews.filter((r) => r.status === "PENDING").length})
        </button>
        <button
          type="button"
          className={`intel-pill ${activeTab === "APPROVED" ? "active" : ""}`}
          onClick={() => setActiveTab("APPROVED")}
        >
          Approved Milestones ({reviews.filter((r) => r.status === "APPROVED").length})
        </button>
        <button
          type="button"
          className={`intel-pill ${activeTab === "REVISION_REQUESTED" ? "active" : ""}`}
          onClick={() => setActiveTab("REVISION_REQUESTED")}
        >
          Revisions ({reviews.filter((r) => r.status === "REVISION_REQUESTED").length})
        </button>
        <button
          type="button"
          className={`intel-pill ${activeTab === "ALL" ? "active" : ""}`}
          onClick={() => setActiveTab("ALL")}
        >
          All Deliverables ({reviews.length})
        </button>
      </div>

      {/* REVIEWS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {displayedReviews.length > 0 ? (
          displayedReviews.map((rev) => (
            <div key={rev.id} className="intel-card" style={{ margin: 0, padding: "22px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span className={`intel-badge ${rev.status === "APPROVED" ? "success" : rev.status === "PENDING" ? (rev.urgency === "HIGH" ? "danger" : "warning") : "rose"}`}>
                      {rev.status}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
                      Submitted: {rev.submittedAt}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#102544", margin: "0 0 2px" }}>
                    {rev.deliverableTitle}
                  </h2>
                  <span style={{ fontSize: "0.85rem", color: "#2563eb", fontWeight: 600 }}>
                    Project: {rev.projectTitle} • Scholar: {rev.studentName} ({rev.regNumber})
                  </span>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    className="intel-btn-secondary"
                    onClick={() => navigate("/faculty/project-dna")}
                  >
                    <Layers size={14} />
                    <span>Project DNA</span>
                  </button>
                  <button
                    type="button"
                    className="intel-btn-primary"
                    onClick={() => {
                      setSelectedReview(rev);
                      setFeedbackText(rev.feedback || "");
                    }}
                  >
                    <Eye size={14} />
                    <span>Evaluate Deliverable</span>
                  </button>
                </div>
              </div>

              <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: "1.5", margin: "0 0 14px" }}>
                {rev.summary}
              </p>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #f1f5f9", paddingTop: "12px", flexWrap: "wrap", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                    Attached Artifacts:
                  </span>
                  {rev.attachments.map((file) => (
                    <span
                      key={file}
                      style={{
                        background: "#f1f5f9",
                        color: "#334155",
                        fontSize: "0.78rem",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <FileText size={12} />
                      {file}
                    </span>
                  ))}
                </div>

                {rev.verdict && (
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: rev.status === "APPROVED" ? "#059669" : "#dc2626" }}>
                    &bull; {rev.verdict}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="intel-card" style={{ textAlign: "center", padding: "48px" }}>
            <CheckCircle2 size={36} color="#059669" style={{ margin: "0 auto 12px" }} />
            <h3 style={{ color: "#102544", margin: 0 }}>Review Queue Clear</h3>
            <p style={{ color: "#64748b", margin: "6px 0 0" }}>No submissions currently pending under this filter.</p>
          </div>
        )}
      </div>

      {/* EVALUATION MODAL */}
      {selectedReview && (
        <div className="intel-drawer-backdrop" onClick={() => setSelectedReview(null)}>
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "600px",
              width: "100%",
              margin: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div>
                <span className="intel-eyebrow">FACULTY EVALUATION DOCKET</span>
                <h2 style={{ fontSize: "1.15rem", margin: "4px 0 0", color: "#102544" }}>
                  {selectedReview.deliverableTitle}
                </h2>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  Scholar: {selectedReview.studentName} ({selectedReview.regNumber})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", marginBottom: "16px", fontSize: "0.86rem", color: "#334155" }}>
              <strong>Submission Summary:</strong>
              <p style={{ margin: "4px 0 0" }}>{selectedReview.summary}</p>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>
                Faculty Evaluation Comments / Revision Directives
              </label>
              <textarea
                rows={4}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontFamily: "inherit",
                  fontSize: "0.86rem",
                  boxSizing: "border-box"
                }}
                placeholder="Enter technical observations, methodology feedback, or milestone sign-off notes..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button
                type="button"
                className="intel-btn-secondary"
                style={{ color: "#dc2626", borderColor: "#fecdd3" }}
                onClick={() => handleRequestRevision(selectedReview)}
              >
                Request Revision
              </button>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  className="intel-btn-secondary"
                  onClick={() => setSelectedReview(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="intel-btn-primary"
                  onClick={() => handleApprove(selectedReview)}
                >
                  <CheckCircle2 size={16} />
                  <span>Approve Deliverable</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectReviewPipeline;
