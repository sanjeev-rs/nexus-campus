import { useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  FolderKanban,
  Search,
  Users,
} from "lucide-react";

import "../../components/shared/SharedIntelligence.css";

const FACULTY_EXPERTISE = [
  { name: "Dr. Evelyn Vance", dept: "AI & Data Science", specialization: "Graph Neural Networks & RAG Retrieval", advisees: "48 / 50", grants: "$850k", papers: 24, status: "Near Capacity" },
  { name: "Dr. Marcus Vance", dept: "AI & Data Science", specialization: "Large Language Models & Agentic AI", advisees: "44 / 50", grants: "$600k", papers: 18, status: "Available" },
  { name: "Dr. Aris Thorne", dept: "Robotics & Automation", specialization: "Visual SLAM & Drone Flight Systems", advisees: "40 / 40", grants: "$680k", papers: 18, status: "Full" },
  { name: "Dr. Elena Rostova", dept: "Computer Science", specialization: "Distributed Consensus & Cloud Systems", advisees: "36 / 45", grants: "$520k", papers: 16, status: "Available" },
  { name: "Dr. Rajesh Iyer", dept: "Electronics & Communication", specialization: "FPGA Signal Processing & IoT Telemetry", advisees: "32 / 40", grants: "$420k", papers: 15, status: "Available" },
  { name: "Dr. Julian Hayes", dept: "Innovation Hub", specialization: "Smart Energy Grids & CleanTech AI", advisees: "28 / 35", grants: "$380k", papers: 12, status: "Available" },
];

function FacultyExpertiseMap() {
  const [search, setSearch] = useState("");

  const filtered = FACULTY_EXPERTISE.filter((f) => {
    const q = search.toLowerCase().trim();
    return (
      !q ||
      f.name.toLowerCase().includes(q) ||
      f.dept.toLowerCase().includes(q) ||
      f.specialization.toLowerCase().includes(q)
    );
  });

  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <Users size={14} />
            PROJECT &amp; RESEARCH
          </div>
          <h1 className="intel-title">Faculty Expertise Map</h1>
          <p className="intel-desc">
            Campus-wide inventory of faculty research specializations, current advising quotas, active grant allocations, and interdisciplinary capacity.
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="intel-filter-bar">
        <div className="intel-search-box">
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search faculty by name, department, or research specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* FACULTY TABLE */}
      <div className="intel-table-container">
        <table className="intel-table">
          <thead>
            <tr>
              <th>Faculty Member</th>
              <th>Department</th>
              <th>Core Research Specialization</th>
              <th>Advising Load</th>
              <th>Research Grants</th>
              <th>Publications</th>
              <th>Mentoring Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f) => (
              <tr key={f.name}>
                <td>
                  <strong style={{ color: "#102544", display: "block" }}>{f.name}</strong>
                </td>
                <td style={{ color: "#334155" }}>{f.dept}</td>
                <td style={{ color: "#2563eb", fontWeight: 600 }}>{f.specialization}</td>
                <td>{f.advisees}</td>
                <td style={{ color: "#059669", fontWeight: 700 }}>{f.grants}</td>
                <td>{f.papers} Papers</td>
                <td>
                  <span className={`intel-badge ${f.status === "Full" ? "danger" : f.status === "Near Capacity" ? "warning" : "success"}`}>
                    {f.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FacultyExpertiseMap;
