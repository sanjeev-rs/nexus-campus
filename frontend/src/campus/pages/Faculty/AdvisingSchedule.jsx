import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  MapPin,
  Plus,
  Users,
  Video,
  X,
} from "lucide-react";

import { OFFICE_HOURS } from "../../data/facultyData";
import "../../components/shared/SharedIntelligence.css";

function AdvisingSchedule() {
  const [sessions, setSessions] = useState(OFFICE_HOURS);
  const [showModal, setShowModal] = useState(false);
  const [student, setStudent] = useState("");
  const [time, setTime] = useState("");
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("Milestone Check-in");
  const [location, setLocation] = useState("Lab Block 4 • Rm 302");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddSession = (e) => {
    e.preventDefault();
    if (!student.trim() || !time.trim()) return;

    const newSess = {
      id: `oh-${Date.now()}`,
      time: time.trim(),
      student: student.trim(),
      studentId: "stu-custom",
      topic: topic.trim() || "General Academic Advising",
      type: type,
      status: "Confirmed",
      location: location
    };

    setSessions([newSess, ...sessions]);
    setShowModal(false);
    setStudent("");
    setTime("");
    setTopic("");
    showToast(`Advising session booked for ${newSess.student}.`);
  };

  const handleComplete = (id, studentName) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Completed" } : s))
    );
    showToast(`Completed advising session for ${studentName}. Notes filed in student twin.`);
  };

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
            <Calendar size={14} />
            MENTORING WORKSPACE
          </div>
          <h1 className="intel-title">Advising &amp; Office Hours</h1>
          <p className="intel-desc">
            Manage scheduled advising consultations, one-on-one milestone reviews, research mentorship slots, and student conference logs.
          </p>
        </div>

        <div className="intel-actions">
          <button
            type="button"
            className="intel-btn-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} />
            <span>Book Advising Session</span>
          </button>
        </div>
      </div>

      {/* SESSIONS LIST */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {sessions.map((sess) => (
          <div key={sess.id} className="intel-card" style={{ margin: 0, padding: "22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span className={`intel-badge ${sess.status === "Completed" ? "success" : "info"}`}>
                    {sess.status}
                  </span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#2563eb" }}>
                    {sess.time}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#102544", margin: "2px 0" }}>
                  {sess.student} &bull; <span style={{ color: "#475569", fontWeight: 500 }}>{sess.type}</span>
                </h3>
                <span style={{ fontSize: "0.82rem", color: "#64748b", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
                  <MapPin size={13} />
                  {sess.location}
                </span>
              </div>

              {sess.status !== "Completed" && (
                <button
                  type="button"
                  className="intel-btn-primary"
                  onClick={() => handleComplete(sess.id, sess.student)}
                >
                  <CheckCircle2 size={15} />
                  <span>Log as Completed</span>
                </button>
              )}
            </div>

            <div style={{ background: "#f8fafc", padding: "12px 14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <strong style={{ display: "block", fontSize: "0.74rem", color: "#64748b", textTransform: "uppercase", marginBottom: "2px" }}>
                Session Agenda / Focus
              </strong>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "#1e293b" }}>
                {sess.topic}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* BOOK SESSION MODAL */}
      {showModal && (
        <div className="intel-drawer-backdrop" onClick={() => setShowModal(false)}>
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "500px",
              width: "100%",
              margin: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, color: "#102544" }}>Schedule Advising Session</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddSession}>
              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Scholar Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Devon Reed"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Time Slot
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tomorrow • 03:00 PM"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                    Consultation Type
                  </label>
                  <select
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Milestone Check-in">Milestone Check-in</option>
                    <option value="Intervention Session">Intervention Session</option>
                    <option value="Research Mentorship">Research Mentorship</option>
                    <option value="Thesis Defense Prep">Thesis Defense Prep</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Meeting Location / Mode
                </label>
                <input
                  type="text"
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#334155", marginBottom: "4px" }}>
                  Agenda Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline key topics to review..."
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontFamily: "inherit" }}
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  className="intel-btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="intel-btn-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdvisingSchedule;
