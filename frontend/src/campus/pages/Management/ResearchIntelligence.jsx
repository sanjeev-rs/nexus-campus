import { useState } from "react";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  FileText,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import "../../components/shared/SharedIntelligence.css";

const RESEARCH_CLUSTERS = [
  { cluster: "Generative AI & Autonomous Language Models", lead: "Dr. Evelyn Vance & Dr. Marcus Vance", grants: "$1.45M", papers: 42, activeCapstones: 18, strength: "National Tier-1 Leader" },
  { cluster: "Autonomous Robotics & Edge Perception", lead: "Dr. Aris Thorne", grants: "$1.10M", papers: 28, activeCapstones: 12, strength: "High Industry Collaboration" },
  { cluster: "Sustainable Cyber-Physical Micro-Grids", lead: "Dr. Julian Hayes & Dr. Rajesh Iyer", grants: "$920k", papers: 24, activeCapstones: 9, strength: "Emerging Excellence" },
  { cluster: "Medical Device Telemetry & Bio-Informatics", lead: "Dr. Sarah Jenkins", grants: "$780k", papers: 19, activeCapstones: 7, strength: "High Grant Potential" },
];

function ResearchIntelligence() {
  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <BookOpen size={14} />
            PROJECT &amp; RESEARCH
          </div>
          <h1 className="intel-title">Institutional Research Intelligence</h1>
          <p className="intel-desc">
            Campus-wide research portfolio analytics, active sponsored grants ($4.25M), faculty citation metrics, and emerging academic research clusters.
          </p>
        </div>
      </div>

      {/* KPI METRICS */}
      <div className="intel-kpi-grid">
        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Active Research Funding</span>
            <div className="intel-kpi-icon green"><Award size={18} /></div>
          </div>
          <div className="intel-kpi-value">$4.25M</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">+24% YoY Growth</span>
            <span>External Grants</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Annual Peer-Reviewed Papers</span>
            <div className="intel-kpi-icon blue"><FileText size={18} /></div>
          </div>
          <div className="intel-kpi-value">142 Publications</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">Scopus / IEEE Indexed</span>
            <span>AY 2025-26</span>
          </div>
        </div>

        <div className="intel-kpi-card">
          <div className="intel-kpi-header">
            <span className="intel-kpi-label">Active Capstone Researches</span>
            <div className="intel-kpi-icon purple"><GraduationCap size={18} /></div>
          </div>
          <div className="intel-kpi-value">46 Theses</div>
          <div className="intel-kpi-meta">
            <span className="intel-kpi-delta positive">Co-authored with students</span>
            <span>100% Advised</span>
          </div>
        </div>
      </div>

      {/* RESEARCH CLUSTERS */}
      <div className="intel-card">
        <div className="intel-card-header">
          <div>
            <h2>Campus Research Clusters</h2>
            <div className="intel-card-subtitle">Strategic research thrusts driving institutional reputation and sponsored funding</div>
          </div>
        </div>

        <div className="intel-table-container" style={{ border: "none" }}>
          <table className="intel-table">
            <thead>
              <tr>
                <th>Research Cluster Focus</th>
                <th>Cluster Leadership</th>
                <th>Active Sponsored Grants</th>
                <th>Published Papers</th>
                <th>Capstones</th>
                <th>Institutional Standing</th>
              </tr>
            </thead>
            <tbody>
              {RESEARCH_CLUSTERS.map((rc) => (
                <tr key={rc.cluster}>
                  <td style={{ fontWeight: 700, color: "#102544" }}>{rc.cluster}</td>
                  <td style={{ color: "#334155" }}>{rc.lead}</td>
                  <td style={{ fontWeight: 700, color: "#059669" }}>{rc.grants}</td>
                  <td>{rc.papers} Papers</td>
                  <td>{rc.activeCapstones} Theses</td>
                  <td>
                    <span className="intel-badge success">{rc.strength}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResearchIntelligence;
