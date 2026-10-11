import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCircle2,
  Clock,
  FileCheck,
  ShieldAlert,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import "../../components/shared/SharedIntelligence.css";

const NOTIFICATIONS = [
  {
    id: "notif-01",
    category: "Review Pipeline",
    title: "New Deliverable Submission from Maya Lin",
    desc: "Milestone 3 report on stereo-vision obstacle avoidance was submitted for evaluation.",
    time: "Today at 09:30 AM",
    read: false,
    route: "/faculty/reviews"
  },
  {
    id: "notif-02",
    category: "At-Risk Alert",
    title: "Inactivity Warning: Marcus Vance Jr.",
    desc: "No code commits or milestone progress detected in 8 days. Course attendance dropped below 75%.",
    time: "Yesterday at 04:15 PM",
    read: false,
    route: "/faculty/at-risk"
  },
  {
    id: "notif-03",
    category: "Thesis Defense",
    title: "Committee Authorization Dossier Ready: Sophia Sterling",
    desc: "All 5 capstone milestones approved. Committee ready for scheduling.",
    time: "2 days ago",
    read: true,
    route: "/faculty/advisees"
  },
  {
    id: "notif-04",
    category: "Office Hours",
    title: "Upcoming Advising Session with Devon Reed",
    desc: "Scheduled for Today at 02:30 PM regarding Neo4j database memory bottlenecks.",
    time: "3 days ago",
    read: true,
    route: "/faculty/advising"
  }
];

function FacultyNotifications() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState(NOTIFICATIONS);

  const markAllRead = () => {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifs([]);
  };

  return (
    <div className="intel-page">
      {/* HEADER */}
      <div className="intel-header">
        <div className="intel-header-main">
          <div className="intel-eyebrow">
            <Bell size={14} />
            WORKSPACE
          </div>
          <h1 className="intel-title">Faculty Notifications &amp; Alerts</h1>
          <p className="intel-desc">
            System notifications, pending student deliverable triggers, symposium deadlines, and critical advising reminders.
          </p>
        </div>

        <div className="intel-actions">
          <button type="button" className="intel-btn-secondary" onClick={markAllRead}>
            Mark All Read
          </button>
          <button type="button" className="intel-btn-secondary" onClick={clearAll}>
            Clear Queue
          </button>
        </div>
      </div>

      {/* NOTIFICATIONS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {notifs.length > 0 ? (
          notifs.map((n) => (
            <div
              key={n.id}
              onClick={() => navigate(n.route)}
              style={{
                background: n.read ? "#ffffff" : "#f0f7ff",
                border: `1px solid ${n.read ? "#e2e8f0" : "#bfdbfe"}`,
                borderRadius: "12px",
                padding: "16px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span className={`intel-badge ${n.read ? "neutral" : "info"}`}>{n.category}</span>
                  <span style={{ fontSize: "0.76rem", color: "#64748b" }}>{n.time}</span>
                </div>
                <strong style={{ display: "block", fontSize: "0.95rem", color: "#102544", marginBottom: "2px" }}>
                  {n.title}
                </strong>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#475569" }}>{n.desc}</p>
              </div>

              <span style={{ fontSize: "0.8rem", color: "#2563eb", fontWeight: 600, whiteSpace: "nowrap", marginLeft: "16px" }}>
                Inspect &rarr;
              </span>
            </div>
          ))
        ) : (
          <div className="intel-card" style={{ textAlign: "center", padding: "48px" }}>
            <CheckCircle2 size={36} color="#059669" style={{ margin: "0 auto 12px" }} />
            <h3 style={{ color: "#102544", margin: 0 }}>Notification Queue Clear</h3>
            <p style={{ color: "#64748b", margin: "6px 0 0" }}>No pending unread alerts or advisories.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultyNotifications;
