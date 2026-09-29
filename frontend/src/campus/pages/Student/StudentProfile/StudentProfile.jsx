import "./StudentProfile.css";

import {
  ArrowUpRight,
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Code2,
  Edit3,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   READ AUTHENTICATED USER FROM LOCAL STORAGE
   Real profile data will eventually come from the backend.
   ========================================================= */
function getAuthUser() {
  try {
    const stored = localStorage.getItem("nexusAuth");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        name: parsed.name || "Campus Student",
        email: parsed.email || "student@nexus.edu",
        role: parsed.role || "student",
      };
    }
  } catch {
    // fallback
  }
  return { name: "Campus Student", email: "student@nexus.edu", role: "student" };
}

/* =========================================================
   STATIC DEMONSTRATION DATA
   This is placeholder data only — clearly identified.
   Replace each section with real API data when the
   student profile backend endpoint is available.
   ========================================================= */
const DEMO_PROFILE = {
  department: "AI & Data Science",
  year: "III Year",
  rollNumber: "AIDS2024001",
  batch: "2022–2026",
  cgpa: "8.7",
  location: "Main Campus",

  completeness: 72, // % profile completeness

  skills: [
    { name: "Python", level: 86, category: "Technical" },
    { name: "Data Analysis", level: 79, category: "Technical" },
    { name: "React", level: 72, category: "Technical" },
    { name: "Machine Learning", level: 64, category: "Technical" },
    { name: "FastAPI", level: 58, category: "Technical" },
    { name: "Communication", level: 71, category: "Soft" },
    { name: "Problem Solving", level: 82, category: "Cognitive" },
    { name: "Research", level: 69, category: "Academic" },
  ],

  interests: [
    "Artificial Intelligence",
    "Data Science",
    "Campus Technology",
    "Research",
    "Open Source",
  ],

  careerInterests: [
    "AI Research Engineer",
    "Data Scientist",
    "Full Stack Developer",
    "Product Engineer",
  ],

  strengths: [
    "Strong technical foundation in AI/data stack",
    "Consistent project delivery across multiple domains",
    "High analytical and problem-solving capability",
    "Cross-functional collaboration on team projects",
  ],

  developmentAreas: [
    "Deepen Machine Learning specialisation",
    "Build public-facing portfolio projects",
    "Improve technical communication",
    "Explore industry internship opportunities",
  ],

  projects: [
    {
      title: "NEXUS",
      category: "AI / Campus",
      status: "Active",
      progress: 72,
      id: "nexus",
    },
    {
      title: "AI Agent Accountability",
      category: "Research",
      status: "Active",
      progress: 48,
      id: "ai-agent-accountability",
    },
    {
      title: "Campus Intelligence Research",
      category: "Research",
      status: "Planning",
      progress: 24,
      id: "campus-intelligence",
    },
  ],

  activityFeed: [
    { text: "Intelligence score increased to 82", time: "Today" },
    { text: "NEXUS backend milestone completed", time: "Yesterday" },
    { text: "New collaboration request received", time: "2 days ago" },
    { text: "Profile completeness improved to 72%", time: "3 days ago" },
  ],
};

function StudentProfile() {
  const navigate = useNavigate();
  const user = getAuthUser();
  const profile = DEMO_PROFILE;

  const avatarInitial = user.name.charAt(0).toUpperCase();

  const technicalSkills = useMemo(
    () => profile.skills.filter((s) => s.category === "Technical"),
    [profile.skills]
  );
  const otherSkills = useMemo(
    () => profile.skills.filter((s) => s.category !== "Technical"),
    [profile.skills]
  );

  return (
    <div className="student-profile">

      {/* =========================================================
          PROFILE HEADER
      ========================================================= */}

      <section className="profile-hero">

        <div className="profile-hero-content">

          <span className="profile-eyebrow">
            NEXUS / STUDENT PROFILE
          </span>

          <div className="profile-identity">

            <div className="profile-avatar-large">
              {avatarInitial}
            </div>

            <div className="profile-identity-info">

              <div className="profile-identity-top">

                <h1>{user.name}</h1>

                <button
                  type="button"
                  className="profile-edit-button"
                  aria-label="Edit profile"
                  title="Edit profile (coming soon)"
                  disabled
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>

              </div>

              <div className="profile-meta-row">

                <span>
                  <GraduationCap size={16} />
                  {profile.department}
                </span>

                <span>
                  <BookOpen size={16} />
                  {profile.year} · {profile.batch}
                </span>

                <span>
                  <Mail size={16} />
                  {user.email}
                </span>

                <span>
                  <MapPin size={16} />
                  {profile.location}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* PROFILE COMPLETENESS */}
        <div className="profile-completeness-card">

          <div className="completeness-top">
            <span>PROFILE COMPLETENESS</span>
            <strong>{profile.completeness}%</strong>
          </div>

          <div className="completeness-bar">
            <span style={{ width: `${profile.completeness}%` }} />
          </div>

          <p>
            Complete your profile to improve NEXUS opportunity matching.
          </p>

          <button
            type="button"
            className="completeness-action"
            disabled
            title="Coming soon — requires backend integration"
          >
            Complete profile
            <ArrowUpRight size={15} />
          </button>

        </div>

      </section>


      {/* =========================================================
          ACADEMIC OVERVIEW
      ========================================================= */}

      <section className="profile-section">

        <div className="profile-section-heading">
          <span className="profile-eyebrow-sm">ACADEMIC PROFILE</span>
          <h2>Academic information</h2>
        </div>

        <div className="academic-grid">

          <article className="academic-card">
            <span>DEPARTMENT</span>
            <strong>{profile.department}</strong>
          </article>

          <article className="academic-card">
            <span>YEAR</span>
            <strong>{profile.year}</strong>
          </article>

          <article className="academic-card">
            <span>BATCH</span>
            <strong>{profile.batch}</strong>
          </article>

          <article className="academic-card">
            <span>ROLL NUMBER</span>
            <strong>{profile.rollNumber}</strong>
          </article>

          <article className="academic-card highlight">
            <span>CGPA</span>
            <strong>{profile.cgpa}</strong>
          </article>

        </div>

      </section>


      {/* =========================================================
          SKILLS
      ========================================================= */}

      <section className="profile-section">

        <div className="profile-section-heading">

          <div>
            <span className="profile-eyebrow-sm">SKILL INTELLIGENCE</span>
            <h2>Your capabilities</h2>
          </div>

          <button
            type="button"
            className="profile-view-link"
            onClick={() => navigate("/student/intelligence")}
          >
            View full intelligence
            <ArrowUpRight size={16} />
          </button>

        </div>

        <div className="profile-skills-layout">

          {/* TECHNICAL */}
          <div className="profile-skill-group">

            <div className="skill-group-header">
              <Code2 size={17} />
              <span>Technical</span>
            </div>

            <div className="skill-list-profile">
              {technicalSkills.map((skill) => (
                <div className="skill-row-profile" key={skill.name}>
                  <div className="skill-row-info">
                    <span>{skill.name}</span>
                    <strong>{skill.level}%</strong>
                  </div>
                  <div className="skill-bar-profile">
                    <span style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* OTHER */}
          <div className="profile-skill-group">

            <div className="skill-group-header">
              <Brain size={17} />
              <span>Other capabilities</span>
            </div>

            <div className="skill-list-profile">
              {otherSkills.map((skill) => (
                <div className="skill-row-profile" key={skill.name}>
                  <div className="skill-row-info">
                    <span>{skill.name} <em className="skill-cat">({skill.category})</em></span>
                    <strong>{skill.level}%</strong>
                  </div>
                  <div className="skill-bar-profile">
                    <span style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          STRENGTHS + DEVELOPMENT AREAS
      ========================================================= */}

      <section className="profile-two-col">

        <article className="profile-info-card">

          <div className="profile-info-icon blue">
            <Zap size={20} />
          </div>

          <span className="profile-info-label">STRENGTHS</span>
          <h2>What you do well</h2>

          <div className="profile-checklist">
            {profile.strengths.map((item) => (
              <div className="profile-checklist-item" key={item}>
                <CheckCircle2 size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>

        </article>

        <article className="profile-info-card">

          <div className="profile-info-icon purple">
            <Target size={20} />
          </div>

          <span className="profile-info-label">DEVELOPMENT AREAS</span>
          <h2>Where to grow</h2>

          <div className="profile-checklist">
            {profile.developmentAreas.map((item) => (
              <div className="profile-checklist-item" key={item}>
                <ArrowUpRight size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="profile-cta-button"
            onClick={() => navigate("/student/goals")}
          >
            View development plan
            <ArrowUpRight size={16} />
          </button>

        </article>

      </section>


      {/* =========================================================
          INTERESTS + CAREER
      ========================================================= */}

      <section className="profile-two-col">

        <article className="profile-info-card">

          <div className="profile-info-icon green">
            <Sparkles size={20} />
          </div>

          <span className="profile-info-label">INTERESTS</span>
          <h2>Areas of interest</h2>

          <div className="profile-tags-group">
            {profile.interests.map((interest) => (
              <span key={interest} className="profile-tag">
                {interest}
              </span>
            ))}
          </div>

        </article>

        <article className="profile-info-card">

          <div className="profile-info-icon orange">
            <Briefcase size={20} />
          </div>

          <span className="profile-info-label">CAREER INTERESTS</span>
          <h2>Where you want to go</h2>

          <div className="profile-tags-group">
            {profile.careerInterests.map((career) => (
              <span key={career} className="profile-tag career">
                {career}
              </span>
            ))}
          </div>

        </article>

      </section>


      {/* =========================================================
          PROJECTS
      ========================================================= */}

      <section className="profile-section">

        <div className="profile-section-heading">

          <div>
            <span className="profile-eyebrow-sm">PROJECT DNA</span>
            <h2>Your projects</h2>
          </div>

          <button
            type="button"
            className="profile-view-link"
            onClick={() => navigate("/student/projects")}
          >
            View all projects
            <ArrowUpRight size={16} />
          </button>

        </div>

        <div className="profile-projects-grid">

          {profile.projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className="profile-project-card"
              onClick={() => navigate(`/student/projects/${project.id}`)}
            >

              <div className="pproject-top">
                <span className="pproject-category">{project.category}</span>
                <span className={`pproject-status ${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
              </div>

              <h3>{project.title}</h3>

              <div className="pproject-progress">
                <div className="pproject-progress-row">
                  <span>Progress</span>
                  <strong>{project.progress}%</strong>
                </div>
                <div className="pproject-progress-bar">
                  <span style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              <div className="pproject-open">
                Open project
                <ChevronRight size={16} />
              </div>

            </button>
          ))}

        </div>

      </section>


      {/* =========================================================
          RECENT ACTIVITY
      ========================================================= */}

      <section className="profile-section">

        <div className="profile-section-heading">
          <span className="profile-eyebrow-sm">ACTIVITY</span>
          <h2>Recent profile activity</h2>
        </div>

        <div className="profile-activity-card">
          {profile.activityFeed.map((item, idx) => (
            <div className="profile-activity-item" key={idx}>
              <div className="activity-dot-profile" />
              <span className="activity-text-profile">{item.text}</span>
              <time className="activity-time-profile">{item.time}</time>
            </div>
          ))}
        </div>

      </section>


      {/* =========================================================
          INTELLIGENCE CTA
      ========================================================= */}

      <section className="profile-intelligence-cta">

        <div className="pint-cta-icon">
          <Brain size={28} />
        </div>

        <div>
          <span>NEXUS INTELLIGENCE</span>
          <h2>See your full intelligence profile.</h2>
          <p>
            NEXUS continuously builds a picture of your skills,
            projects and campus activity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/student/intelligence")}
        >
          View intelligence
          <ArrowUpRight size={17} />
        </button>

      </section>

    </div>
  );
}

export default StudentProfile;
