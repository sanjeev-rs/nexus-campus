import "./MentorNetwork.css";

import {
  ArrowLeft,
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Code2,
  Search,
  UserRoundCheck,
  Users,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mentors = [
  {
    name: "Dr. Ananya Rao",
    role: "Faculty Mentor",
    department: "AI & Data Science",
    expertise: ["Machine Learning", "AI", "Research"],
    match: 94,
    initials: "AR",
  },
  {
    name: "Karthik Menon",
    role: "Senior Student Mentor",
    department: "Computer Science",
    expertise: ["React", "FastAPI", "System Design"],
    match: 91,
    initials: "KM",
  },
  {
    name: "Dr. Priya Nair",
    role: "Faculty Mentor",
    department: "Computer Science",
    expertise: ["Data Science", "Python", "Research"],
    match: 87,
    initials: "PN",
  },
  {
    name: "Rahul Krishnan",
    role: "Senior Student Mentor",
    department: "AI & Data Science",
    expertise: ["Python", "Deep Learning", "Computer Vision"],
    match: 84,
    initials: "RK",
  },
];

function MentorNetwork() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredMentors = mentors.filter((mentor) => {
    const value = search.toLowerCase();

    return (
      mentor.name.toLowerCase().includes(value) ||
      mentor.department.toLowerCase().includes(value) ||
      mentor.expertise.some((skill) =>
        skill.toLowerCase().includes(value)
      )
    );
  });

  return (
    <div className="mentor-network">

      <button
        className="mentor-back"
        onClick={() => navigate("/student/projects")}
      >
        <ArrowLeft size={17} />
        Back to Projects
      </button>


      <section className="mentor-header">

        <span>
          NEXUS / MENTOR NETWORK
        </span>

        <h1>
          Find someone who can
          <strong> move your project forward.</strong>
        </h1>

        <p>
          Tell NEXUS what you're building and discover faculty,
          senior students and approved mentors whose expertise
          aligns with your project.
        </p>

      </section>


      <section className="mentor-search-card">

        <div className="mentor-search">

          <Search size={21} />

          <input
            type="text"
            placeholder="Search mentors by skill, department or name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

        </div>

      </section>


      <section className="mentor-section">

        <div className="mentor-section-heading">

          <div>
            <span>
              RECOMMENDED FOR YOU
            </span>

            <h2>
              Mentors matching your profile
            </h2>
          </div>

          <div className="mentor-ai-label">
            <Brain size={16} />
            NEXUS matching
          </div>

        </div>


        <div className="mentor-grid">

          {filteredMentors.map((mentor) => (

            <article
              className="mentor-card"
              key={mentor.name}
            >

              <div className="mentor-card-top">

                <div className="mentor-avatar">
                  {mentor.initials}
                </div>

                <span className="mentor-match">
                  {mentor.match}% MATCH
                </span>

              </div>


              <span className="mentor-role">
                {mentor.role}
              </span>

              <h3>
                {mentor.name}
              </h3>

              <p className="mentor-department">
                {mentor.department}
              </p>


              <div className="mentor-expertise">

                {mentor.expertise.map((skill) => (

                  <span key={skill}>
                    {skill}
                  </span>

                ))}

              </div>


              <div className="mentor-card-footer">

                <div className="mentor-availability">
                  <span></span>
                  Available for requests
                </div>

                <button
                  className="request-mentor-button"
                  onClick={() =>
                    alert(
                      `Mentor request initiated for ${mentor.name}`
                    )
                  }
                >
                  Request
                  <ArrowUpRight size={15} />
                </button>

              </div>

            </article>

          ))}

        </div>

      </section>


      <section className="mentor-help-card">

        <div className="mentor-help-icon">
          <UserRoundCheck size={29} />
        </div>

        <div>

          <span>
            NEED A DIFFERENT KIND OF SUPPORT?
          </span>

          <h2>
            Let NEXUS understand where you're stuck.
          </h2>

          <p>
            Describe your project challenge and NEXUS can
            identify the type of expertise you need before
            recommending a mentor.
          </p>

        </div>

        <button
          onClick={() => navigate("/student/projects/upload")}
        >
          Tell us about your project
          <ArrowUpRight size={17} />
        </button>

      </section>

    </div>
  );
}

export default MentorNetwork;