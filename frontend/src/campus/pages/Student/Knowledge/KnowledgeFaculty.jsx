import {
  FiArrowLeft,
  FiArrowRight,
  FiSearch,
  FiUsers,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import "./KnowledgeSubPage.css";

const faculty = [
  {
    name: "AI & Machine Learning",
    slug: "faculty-ai-machine-learning",
    description:
      "Faculty expertise connected to artificial intelligence and machine learning.",
    expertise: "AI • ML • NLP",
    projects: "42 projects",
  },
  {
    name: "Computer Vision",
    slug: "faculty-computer-vision",
    description:
      "Faculty working across computer vision, image intelligence and visual computing.",
    expertise: "CV • Image AI • Robotics",
    projects: "28 projects",
  },
  {
    name: "Data Science",
    slug: "faculty-data-science",
    description:
      "Expertise covering analytics, statistical modelling and intelligent systems.",
    expertise: "Analytics • Statistics • ML",
    projects: "37 projects",
  },
  {
    name: "IoT & Embedded Systems",
    slug: "faculty-iot-embedded-systems",
    description:
      "Faculty expertise in connected systems, sensors and intelligent devices.",
    expertise: "IoT • Embedded • Sensors",
    projects: "31 projects",
  },
];

function KnowledgeFaculty() {
  const navigate = useNavigate();

  return (
    <main className="knowledge-subpage">

      <button
        className="knowledge-back-button"
        onClick={() => navigate("/student/knowledge")}
      >
        <FiArrowLeft size={17} />
        Back to Knowledge
      </button>

      <section className="knowledge-subhero">

        <div>
          <div className="knowledge-sub-eyebrow">
            <span />
            NEXUS KNOWLEDGE / FACULTY EXPERTISE
          </div>

          <h1>
            Find people who
            <br />
            know what you're <em>building.</em>
          </h1>

          <p>
            Discover faculty expertise connected
            to projects, research and technologies
            across your campus.
          </p>
        </div>

        <div className="knowledge-sub-icon purple">
          <FiUsers size={44} />
        </div>

      </section>

      <div className="knowledge-sub-search">
        <FiSearch size={21} />

        <input
          type="text"
          placeholder="Search faculty expertise..."
        />
      </div>

      <section className="knowledge-subsection">

        <div className="knowledge-subsection-header">
          <div>
            <span>EXPERTISE NETWORK</span>
            <h2>Faculty expertise</h2>
          </div>

          <strong>
            {faculty.length} areas
          </strong>
        </div>

        <div className="knowledge-item-grid">

          {faculty.map((item) => (
            <article
              className="knowledge-item-card"
              key={item.name}
            >

              <div className="knowledge-item-top">

                <div className="knowledge-item-icon purple">
                  <FiUsers size={21} />
                </div>

                <span className="technology-project-count">
                  {item.projects}
                </span>

              </div>

              <div className="knowledge-item-type">
                FACULTY EXPERTISE
              </div>

              <h3>
                {item.name}
              </h3>

              <p>
                {item.description}
              </p>

              <div className="knowledge-item-meta">
                <span>{item.expertise}</span>
              </div>

              <button
                className="knowledge-item-action"
                type="button"
                onClick={() =>
                  navigate(`/student/knowledge/item/${item.slug}`)
                }
              >
                Find faculty
                <FiArrowRight size={16} />
              </button>

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}

export default KnowledgeFaculty;