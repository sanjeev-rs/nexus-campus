import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  MapPin,
  Plus,
  Users,
  X,
} from "lucide-react";

import "./StudentRoutine.css";

/* =========================================================
   DETERMINISTIC WEEKLY ROUTINE DATASET
   ========================================================= */

const WEEKLY_SCHEDULE = {
  Monday: [
    {
      id: "mon-1",
      time: "09:00 AM – 10:30 AM",
      title: "Natural Language Processing (AIDS302)",
      type: "Lecture",
      typeCode: "lecture",
      room: "Hall 3 • Rm 304",
      faculty: "Dr. Evelyn Vance",
      status: "COMPLETED",
    },
    {
      id: "mon-2",
      time: "11:00 AM – 01:00 PM",
      title: "Deep Learning & PyTorch Lab (AIDS301)",
      type: "Laboratory",
      typeCode: "lab",
      room: "Lab Block 4 • Rm 402",
      faculty: "Dr. Evelyn Vance & TAs",
      status: "COMPLETED",
    },
    {
      id: "mon-3",
      time: "02:30 PM – 04:00 PM",
      title: "Smart Campus Analytics Sprint Meeting",
      type: "Project Sprint",
      typeCode: "project",
      room: "Innovation Sandbox A",
      faculty: "Student Capstone Team",
      status: "UPCOMING",
    },
    {
      id: "mon-4",
      time: "04:30 PM – 05:30 PM",
      title: "Faculty Advising Office Hours",
      type: "Advising",
      typeCode: "advising",
      room: "Faculty Tower • Rm 302",
      faculty: "Dr. Evelyn Vance",
      status: "SCHEDULED",
    },
  ],
  Tuesday: [
    {
      id: "tue-1",
      time: "09:30 AM – 11:00 AM",
      title: "Distributed Systems & Cloud Computing (CSE301)",
      type: "Lecture",
      typeCode: "lecture",
      room: "Hall 2 • Rm 201",
      faculty: "Dr. Elena Rostova",
      status: "UPCOMING",
    },
    {
      id: "tue-2",
      time: "11:30 AM – 01:00 PM",
      title: "Probability & Statistical Inference (MAT202)",
      type: "Lecture",
      typeCode: "lecture",
      room: "Hall 1 • Rm 105",
      faculty: "Dr. K. Ramanathan",
      status: "UPCOMING",
    },
    {
      id: "tue-3",
      time: "02:00 PM – 04:30 PM",
      title: "Vector Search & Retrieval Workshop",
      type: "Workshop",
      typeCode: "lab",
      room: "Computing Hub 2",
      faculty: "Guest Industry Mentor",
      status: "UPCOMING",
    },
  ],
  Wednesday: [
    {
      id: "wed-1",
      time: "09:00 AM – 10:30 AM",
      title: "Natural Language Processing (AIDS302)",
      type: "Lecture",
      typeCode: "lecture",
      room: "Hall 3 • Rm 304",
      faculty: "Dr. Evelyn Vance",
      status: "UPCOMING",
    },
    {
      id: "wed-2",
      time: "11:00 AM – 01:00 PM",
      title: "Autonomous Systems & ROS 2 Session",
      type: "Elective Lab",
      typeCode: "lab",
      room: "Robotics Core Lab 1",
      faculty: "Dr. Aris Thorne",
      status: "UPCOMING",
    },
    {
      id: "wed-3",
      time: "03:00 PM – 04:30 PM",
      title: "Campus AI Research Symposium Prep",
      type: "Research",
      typeCode: "project",
      room: "Library Seminar Rm B",
      faculty: "Research Scholars Group",
      status: "UPCOMING",
    },
  ],
  Thursday: [
    {
      id: "thu-1",
      time: "10:00 AM – 11:30 AM",
      title: "Distributed Systems & Cloud Computing (CSE301)",
      type: "Lecture",
      typeCode: "lecture",
      room: "Hall 2 • Rm 201",
      faculty: "Dr. Elena Rostova",
      status: "UPCOMING",
    },
    {
      id: "thu-2",
      time: "01:30 PM – 04:00 PM",
      title: "Capstone Milestone 3 Testing & Verification",
      type: "Project Sprint",
      typeCode: "project",
      room: "Hardware-in-the-Loop Lab 204",
      faculty: "Self & Peer Review",
      status: "UPCOMING",
    },
  ],
  Friday: [
    {
      id: "fri-1",
      time: "09:00 AM – 10:30 AM",
      title: "AI Ethics & Model Accountability",
      type: "Seminar",
      typeCode: "lecture",
      room: "Main Auditorium",
      faculty: "Dr. Arun Prakash",
      status: "UPCOMING",
    },
    {
      id: "fri-2",
      time: "11:00 AM – 01:00 PM",
      title: "Weekly Code Freeze & Review Session",
      type: "Review",
      typeCode: "advising",
      room: "Lab Block 4 • Rm 302",
      faculty: "Dr. Evelyn Vance",
      status: "UPCOMING",
    },
    {
      id: "fri-3",
      time: "03:00 PM – 05:00 PM",
      title: "Campus Open Source Community Hack",
      type: "Community",
      typeCode: "project",
      room: "Student Activity Center",
      faculty: "Open Source Collective",
      status: "UPCOMING",
    },
  ],
  Saturday: [
    {
      id: "sat-1",
      time: "10:00 AM – 01:00 PM",
      title: "Self-Directed Research & Model Training",
      type: "Independent Study",
      typeCode: "project",
      room: "GPU Compute Cluster Access (Remote)",
      faculty: "Independent Sprint",
      status: "UPCOMING",
    },
  ],
};

const HABIT_METRICS = [
  { label: "Attendance Consistency", value: "94.6%", trend: "+2.1%", type: "positive" },
  { label: "Lab & Study Velocity", value: "28.5 hrs", trend: "On Target", type: "neutral" },
  { label: "Active Routine Streak", value: "18 Days", trend: "Record High", type: "positive" },
  { label: "Milestone Punctuality", value: "100%", trend: "Zero Delays", type: "positive" },
];

function StudentRoutine() {
  const navigate = useNavigate();

  const [activeDay, setActiveDay] = useState("Monday");
  const [scheduleData, setScheduleData] = useState(WEEKLY_SCHEDULE);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [newType, setNewType] = useState("Study Block");
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  const daySchedule = useMemo(() => {
    return scheduleData[activeDay] || [];
  }, [scheduleData, activeDay]);

  const handleAddBlock = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTime.trim()) return;

    const newSlot = {
      id: `slot-${Date.now()}`,
      time: newTime,
      title: newTitle,
      type: newType,
      typeCode: newType.toLowerCase().includes("lab") ? "lab" : "project",
      room: newRoom || "Campus Hub",
      faculty: "Personal Schedule",
      status: "SCHEDULED",
    };

    setScheduleData((prev) => ({
      ...prev,
      [activeDay]: [...prev[activeDay], newSlot],
    }));

    setShowAddModal(false);
    setNewTitle("");
    setNewTime("");
    setNewRoom("");
    showToast(`Added routine block to ${activeDay}: ${newTitle}`);
  };

  return (
    <div className="student-routine-page">
      {/* TOAST FEEDBACK */}
      {toastMessage && (
        <div className="routine-toast" role="status" aria-live="polite">
          <CheckCircle2 size={18} className="toast-icon" />
          <span>{toastMessage}</span>
          <button
            type="button"
            className="toast-close"
            onClick={() => setToastMessage(null)}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* TOP NAVIGATION */}
      <div className="routine-top-nav">
        <button
          type="button"
          className="routine-back-btn"
          onClick={() => navigate("/student")}
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>

        <div className="routine-breadcrumbs">
          <span className="crumb" onClick={() => navigate("/student")}>Dashboard</span>
          <span className="sep">/</span>
          <span className="crumb" onClick={() => navigate("/student/goals")}>Development</span>
          <span className="sep">/</span>
          <span className="crumb current">Routine & Schedule</span>
        </div>
      </div>

      {/* ROUTINE HERO BANNER */}
      <section className="routine-hero">
        <div className="routine-hero-glow" aria-hidden="true" />

        <div className="routine-hero-content">
          <div className="routine-eyebrow-row">
            <span className="routine-eyebrow">
              NEXUS ROUTINE ENGINE • WEEKLY CAMPUS SCHEDULE
            </span>
            <span className="routine-badge-live">
              <span className="live-dot" />
              Active Week: Week 8 (Spring 2026)
            </span>
          </div>

          <h1>
            Your day, <span>structured for achievement.</span>
          </h1>

          <p>
            Seamlessly coordinate lecture timetables, specialized laboratory sessions,
            faculty advising hours, and dedicated project team sprints.
          </p>

          <div className="routine-stat-chips">
            <div className="routine-chip">
              <Clock size={15} />
              <span>Next Block: 02:30 PM (Smart Campus Analytics Sprint)</span>
            </div>
            <div className="routine-chip highlight">
              <Flame size={15} />
              <span>Routine Streak: 18 Academic Days</span>
            </div>
          </div>
        </div>

        <div className="routine-hero-actions">
          <button
            type="button"
            className="nx-btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            <span>Add Routine Block</span>
          </button>
          <button
            type="button"
            className="nx-btn-secondary"
            onClick={() => showToast("Weekly schedule synced with campus calendar.")}
          >
            <Calendar size={15} />
            <span>Sync Calendar</span>
          </button>
        </div>
      </section>

      {/* HABIT & ATTENDANCE RADAR */}
      <section className="routine-habits-strip">
        {HABIT_METRICS.map((habit) => (
          <div className="habit-card" key={habit.label}>
            <div className="habit-top">
              <span className="habit-label">{habit.label}</span>
              <span className={`habit-trend ${habit.type}`}>{habit.trend}</span>
            </div>
            <strong className="habit-value">{habit.value}</strong>
          </div>
        ))}
      </section>

      {/* DAY SELECTOR TABS */}
      <nav className="day-tabs-nav" aria-label="Select Day of Week">
        {Object.keys(scheduleData).map((day) => {
          const count = scheduleData[day].length;
          return (
            <button
              type="button"
              className={`day-tab-btn ${activeDay === day ? "active" : ""}`}
              key={day}
              onClick={() => setActiveDay(day)}
            >
              <Calendar size={15} />
              <span>{day}</span>
              <span className="day-count">{count}</span>
            </button>
          );
        })}
      </nav>

      {/* SCHEDULE TIMELINE */}
      <section className="routine-schedule-section">
        <div className="schedule-header-row">
          <div>
            <h3>{activeDay}'s Schedule & Commitments</h3>
            <p>
              {daySchedule.length} academic and collaborative blocks scheduled for {activeDay}.
            </p>
          </div>
          <button
            type="button"
            className="nx-btn-secondary sm"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={14} />
            <span>Add to {activeDay}</span>
          </button>
        </div>

        <div className="schedule-timeline-wrapper">
          {daySchedule.map((slot) => (
            <article className={`schedule-slot-card ${slot.typeCode}`} key={slot.id}>
              <div className="slot-time-col">
                <Clock size={16} className="clock-ico" />
                <strong>{slot.time}</strong>
                <span className={`slot-type-badge ${slot.typeCode}`}>{slot.type}</span>
              </div>

              <div className="slot-details-col">
                <h4>{slot.title}</h4>
                <div className="slot-location-row">
                  <span>
                    <MapPin size={14} /> {slot.room}
                  </span>
                  <span>
                    <Users size={14} /> {slot.faculty}
                  </span>
                </div>
              </div>

              <div className="slot-action-col">
                <span className={`slot-status-pill ${slot.status.toLowerCase()}`}>
                  {slot.status}
                </span>
                {slot.typeCode === "project" && (
                  <button
                    type="button"
                    className="nx-btn-secondary sm"
                    onClick={() => navigate("/student/projects/explore/smart-campus-analytics")}
                  >
                    <span>Open Project</span>
                    <ChevronRight size={13} />
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ADD ROUTINE MODAL */}
      {showAddModal && (
        <div className="routine-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div
            className="routine-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Add Routine Block"
          >
            <div className="dialog-header">
              <h3>Schedule Routine Block for {activeDay}</h3>
              <button
                type="button"
                className="dialog-close-btn"
                onClick={() => setShowAddModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddBlock} className="routine-form">
              <div className="form-field">
                <label htmlFor="slot-title">Block Title / Subject</label>
                <input
                  id="slot-title"
                  type="text"
                  placeholder="e.g. Deep Learning Project Sprint"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="slot-time">Time Duration</label>
                <input
                  id="slot-time"
                  type="text"
                  placeholder="e.g. 02:00 PM – 03:30 PM"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="slot-room">Location / Lab</label>
                <input
                  id="slot-room"
                  type="text"
                  placeholder="e.g. Lab Block 4 • Rm 302"
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="slot-type">Block Category</label>
                <select
                  id="slot-type"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                >
                  <option value="Lecture">Lecture</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Project Sprint">Project Sprint</option>
                  <option value="Advising">Faculty Advising</option>
                  <option value="Study Block">Study Block</option>
                </select>
              </div>

              <div className="dialog-footer">
                <button
                  type="button"
                  className="nx-btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="nx-btn-primary">
                  <span>Add to Routine</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentRoutine;
