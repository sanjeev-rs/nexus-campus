import { useState } from "react";
import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
  User,
  Users,
} from "lucide-react";

import { FACULTY_USER } from "../../data/facultyData";
import "../../components/shared/SharedIntelligence.css";

function FacultyProfile() {
  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <User size={14} />
            WORKSPACE
          </div>
          <h1 className="intel-title">Faculty Academic Profile</h1>
          <p className="intel-desc">
            Academic credentials, faculty research appointments, current advisee quota, and institutional advising schedule.
          </p>
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="intel-card" style={{ padding: "32px", marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #1d4ed8, #2563eb)",
              color: "#fff",
              fontSize: "2rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(37,99,235,0.25)"
            }}
          >
            {FACULTY_USER.avatar}
          </div>

          <div style={{ flex: 1, minWidth: "260px" }}>
            <span className="intel-badge info" style={{ marginBottom: "6px" }}>Senior Research Faculty</span>
            <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#102544", margin: "4px 0" }}>
              {FACULTY_USER.name}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#475569", margin: "0 0 12px", fontWeight: 500 }}>
              {FACULTY_USER.designation} &bull; {FACULTY_USER.department}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "0.84rem", color: "#64748b" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Mail size={14} /> {FACULTY_USER.email}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <MapPin size={14} /> {FACULTY_USER.room}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={14} /> {FACULTY_USER.officeHours}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* THREE COLUMN GRID: RESEARCH DOMAINS, QUOTA, INSTITUTIONAL CREDENTIALS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "24px" }}>
        
        {/* RESEARCH FOCUS */}
        <div className="intel-card" style={{ margin: 0, padding: "24px" }}>
          <div className="intel-card-header">
            <div>
              <div className="intel-eyebrow">RESEARCH DOMAIN</div>
              <h3>Areas of Specialization</h3>
            </div>
          </div>
          <p style={{ fontSize: "0.9rem", color: "#334155", lineHeight: "1.6", margin: "0 0 16px" }}>
            {FACULTY_USER.specialization}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            <span className="intel-badge info">Graph Neural Networks</span>
            <span className="intel-badge info">Autonomous Systems</span>
            <span className="intel-badge info">Dense Vector Search</span>
            <span className="intel-badge info">RAG Architectures</span>
          </div>
        </div>

        {/* MENTORING QUOTA */}
        <div className="intel-card" style={{ margin: 0, padding: "24px" }}>
          <div className="intel-card-header">
            <div>
              <div className="intel-eyebrow">CAPACITY QUOTA</div>
              <h3>Advising Quota &amp; Load</h3>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "0.85rem", color: "#475569" }}>Active Scholars Advised</span>
            <strong style={{ fontSize: "1.2rem", color: "#102544" }}>48 / 50 Students</strong>
          </div>
          <div className="intel-progress-bar" style={{ height: "10px", marginBottom: "12px" }}>
            <div className="intel-progress-fill amber" style={{ width: "96%" }} />
          </div>
          <span style={{ fontSize: "0.78rem", color: "#64748b" }}>
            Faculty load is at 96% of maximum institutional advisement threshold.
          </span>
        </div>

        {/* INSTITUTIONAL STANDING */}
        <div className="intel-card" style={{ margin: 0, padding: "24px" }}>
          <div className="intel-card-header">
            <div>
              <div className="intel-eyebrow">INSTITUTIONAL METRICS</div>
              <h3>Academic Standing</h3>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.86rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Sponsored Grants</span>
              <strong style={{ color: "#059669" }}>$1.95M</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Peer-Reviewed Papers</span>
              <strong style={{ color: "#102544" }}>57 Publications</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Student Symposia Advised</span>
              <strong style={{ color: "#102544" }}>14 Teams</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b" }}>Accreditation Assessment</span>
              <strong style={{ color: "#2563eb" }}>Exemplary A++</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FacultyProfile;
