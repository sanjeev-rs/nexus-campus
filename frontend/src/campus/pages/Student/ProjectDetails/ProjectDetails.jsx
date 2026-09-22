import "./ProjectDetails.css";

import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  CalendarDays,
  CheckCircle2,
  Code2,
  ExternalLink,
  FileText,
  GitBranch,
  GraduationCap,
  Mail,
  Network,
  Phone,
  Send,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";


/* =========================================================
   DEMO PROJECT DATA
   Later this will come from your backend/database.
   ========================================================= */

const projectData = {
  "smart-campus-analytics": {
    title: "Smart Campus Analytics",

    category: "Artificial Intelligence",

    status: "Completed",

    description:
      "A predictive analytics platform that discovers patterns in campus activity and student development.",

    department: "AI & Data Science",

    departmentId: "AIDS-01",

    projectType: "Academic + Research",

    academicYear: "2026",

    startDate: "January 2026",

    endDate: "August 2026",

    problem:
      "Campus data is distributed across multiple systems, making it difficult to identify student development patterns and generate actionable insights.",

    objective:
      "Build an intelligent analytics platform that transforms campus activity data into meaningful insights for students, faculty and management.",

    technologies: [
      "Python",
      "Machine Learning",
      "React",
      "FastAPI",
      "PostgreSQL",
      "Scikit-learn",
    ],

    githubUrl: null,

    publishedUrl: null,

    mentor: {
      name: "Dr. Priya Menon",
      designation: "Assistant Professor",
      department: "AI & Data Science",
      departmentId: "AIDS-01",
      email: "priya.menon@campus.edu",
    },

    members: [
      {
        name: "Arjun Kumar",
        role: "Project Lead",
        department: "AI & Data Science",
        year: "III Year",
        email: "arjun.kumar@campus.edu",
        phone: "+91 98765 43210",
      },

      {
        name: "Meera Krishnan",
        role: "ML Engineer",
        department: "AI & Data Science",
        year: "III Year",
        email: "meera.krishnan@campus.edu",
        phone: "+91 98765 43211",
      },

      {
        name: "Rahul S",
        role: "Backend Developer",
        department: "Computer Science",
        year: "III Year",
        email: "rahul.s@campus.edu",
        phone: "+91 98765 43212",
      },

      {
        name: "Nithya R",
        role: "Data Analyst",
        department: "AI & Data Science",
        year: "II Year",
        email: "nithya.r@campus.edu",
        phone: "+91 98765 43213",
      },
    ],

    documents: [
      {
        name: "Project Report",
        type: "PDF",
        url: null,
      },

      {
        name: "System Architecture",
        type: "PDF",
        url: null,
      },

      {
        name: "Research Documentation",
        type: "PDF",
        url: null,
      },

      {
        name: "Project Presentation",
        type: "PPTX",
        url: null,
      },
    ],

    milestones: [
      {
        title: "Problem definition",

        description:
          "Campus analytics problem identified and documented.",

        date: "Jan 2026",
      },

      {
        title: "Data pipeline",

        description:
          "Campus datasets cleaned and integrated.",

        date: "Mar 2026",
      },

      {
        title: "ML intelligence engine",

        description:
          "Predictive models trained and evaluated.",

        date: "May 2026",
      },

      {
        title: "Web platform",

        description:
          "Analytics dashboard developed and tested.",

        date: "Jul 2026",
      },

      {
        title: "Final deployment",

        description:
          "Production version completed.",

        date: "Aug 2026",
      },
    ],

    dna: [
      {
        label: "Technical depth",
        value: 88,
      },

      {
        label: "Problem solving",
        value: 91,
      },

      {
        label: "Collaboration",
        value: 82,
      },

      {
        label: "Research",
        value: 86,
      },

      {
        label: "Real-world impact",
        value: 84,
      },
    ],
  },


  "ai-research-lab": {
    title: "AI Research Lab",

    category: "Research",

    status: "In progress",

    description:
      "A collaborative student research project exploring practical applications of artificial intelligence.",

    department: "Computer Science",

    departmentId: "CSE-01",

    projectType: "Research",

    academicYear: "2026",

    startDate: "March 2026",

    endDate: "In progress",

    problem:
      "Students interested in AI research often lack a structured environment for collaborating, sharing experiments and discovering related research work.",

    objective:
      "Create a collaborative environment where students can explore AI research problems, experiments and practical implementations.",

    technologies: [
      "Python",
      "Artificial Intelligence",
      "FastAPI",
      "PyTorch",
      "Machine Learning",
    ],

    githubUrl: null,

    publishedUrl: null,

    mentor: {
      name: "Dr. Arun Prakash",
      designation: "Professor",
      department: "Computer Science",
      departmentId: "CSE-01",
      email: "arun.prakash@campus.edu",
    },

    members: [
      {
        name: "Priya Nair",
        role: "Research Lead",
        department: "Computer Science",
        year: "III Year",
        email: "priya.nair@campus.edu",
        phone: "+91 98765 44321",
      },

      {
        name: "Karthik M",
        role: "AI Researcher",
        department: "Computer Science",
        year: "III Year",
        email: "karthik.m@campus.edu",
        phone: "+91 98765 44322",
      },

      {
        name: "Ananya S",
        role: "ML Researcher",
        department: "AI & Data Science",
        year: "II Year",
        email: "ananya.s@campus.edu",
        phone: "+91 98765 44323",
      },
    ],

    documents: [
      {
        name: "Research Proposal",
        type: "PDF",
        url: null,
      },

      {
        name: "Experiment Notes",
        type: "PDF",
        url: null,
      },
    ],

    milestones: [
      {
        title: "Research problem selected",

        description:
          "Research direction and hypothesis established.",

        date: "Mar 2026",
      },

      {
        title: "Literature review",

        description:
          "Relevant research papers analyzed.",

        date: "Apr 2026",
      },

      {
        title: "Prototype experiments",

        description:
          "Initial models and experiments underway.",

        date: "Jun 2026",
      },

      {
        title: "Final evaluation",

        description:
          "Model evaluation is currently in progress.",

        date: "Oct 2026",
      },
    ],

    dna: [
      {
        label: "Technical depth",
        value: 86,
      },

      {
        label: "Problem solving",
        value: 82,
      },

      {
        label: "Collaboration",
        value: 76,
      },

      {
        label: "Research",
        value: 94,
      },

      {
        label: "Real-world impact",
        value: 73,
      },
    ],
  },
};


/* =========================================================
   COMPONENT
   ========================================================= */

function ProjectDetails() {
  const navigate = useNavigate();

  const { projectId } = useParams();

  const project =
    projectData[projectId] ||
    projectData["smart-campus-analytics"];


  return (
    <div className="project-details">


      {/* =================================================
          BACK
          ================================================= */}

      <button
        type="button"
        className="project-details-back"
        onClick={() =>
          navigate("/student/projects/explore")
        }
      >
        <ArrowLeft size={19} />

        <span>
          Back to Explore Projects
        </span>
      </button>


      {/* =================================================
          HERO
          ================================================= */}

      <section className="project-details-hero">

        <div className="project-details-hero-content">

          <div className="project-details-eyebrow">
            NEXUS / PROJECT INTELLIGENCE
          </div>


          <div className="project-details-status-row">

            <span className="project-details-category">
              {project.category}
            </span>

            <span className="project-details-status">
              <CheckCircle2 size={16} />

              {project.status}
            </span>

          </div>


          <h1>
            {project.title}
          </h1>


          <p className="project-details-description">
            {project.description}
          </p>


          <div className="project-details-meta">

            <div>
              <GraduationCap size={19} />

              <span>
                {project.department}
              </span>
            </div>

            <div>
              <CalendarDays size={19} />

              <span>
                {project.academicYear}
              </span>
            </div>

            <div>
              <Users size={19} />

              <span>
                {project.members.length} members
              </span>
            </div>

          </div>


          <div className="project-details-actions">

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="details-primary-button"
              >
                <GitBranch size={19} />

                GitHub Repository

                <ExternalLink size={16} />
              </a>
            ) : (
              <button
                type="button"
                className="details-primary-button disabled"
                disabled
              >
                <GitBranch size={19} />

                GitHub Repository

                <span className="button-note">
                  Not added
                </span>
              </button>
            )}


            {project.publishedUrl ? (
              <a
                href={project.publishedUrl}
                target="_blank"
                rel="noreferrer"
                className="details-secondary-button"
              >
                <ExternalLink size={18} />

                Published Project
              </a>
            ) : (
              <button
                type="button"
                className="details-secondary-button disabled"
                disabled
              >
                <ExternalLink size={18} />

                Published Project

                <span className="button-note">
                  Not added
                </span>
              </button>
            )}

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="project-details-hero-visual">

          <div className="project-orbit orbit-one"></div>

          <div className="project-orbit orbit-two"></div>

          <div className="project-orbit orbit-three"></div>


          <div className="project-core">

            <Network size={38} />

          </div>


          <div className="project-floating-icon icon-one">
            <Code2 size={20} />
          </div>

          <div className="project-floating-icon icon-two">
            <Users size={20} />
          </div>

          <div className="project-floating-icon icon-three">
            <Sparkles size={20} />
          </div>

        </div>

      </section>


      {/* =================================================
          QUICK PROJECT INFORMATION
          ================================================= */}

      <section className="project-details-section">

        <div className="details-section-heading">

          <div>

            <span>
              PROJECT PROFILE
            </span>

            <h2>
              At a glance
            </h2>

          </div>

        </div>


        <div className="project-overview-grid">

          <article className="overview-card">

            <span>
              PROJECT TYPE
            </span>

            <strong>
              {project.projectType}
            </strong>

          </article>


          <article className="overview-card">

            <span>
              DEPARTMENT ID
            </span>

            <strong>
              {project.departmentId}
            </strong>

          </article>


          <article className="overview-card">

            <span>
              START DATE
            </span>

            <strong>
              {project.startDate}
            </strong>

          </article>


          <article className="overview-card">

            <span>
              COMPLETION
            </span>

            <strong>
              {project.endDate}
            </strong>

          </article>

        </div>

      </section>


      {/* =================================================
          PROBLEM + OBJECTIVE
          ================================================= */}

      <section className="project-details-two-column">

        <article className="details-information-card">

          <div className="information-icon blue">
            <Target size={22} />
          </div>

          <span className="information-label">
            PROBLEM STATEMENT
          </span>

          <h2>
            What problem does this project solve?
          </h2>

          <p>
            {project.problem}
          </p>

        </article>


        <article className="details-information-card">

          <div className="information-icon purple">
            <Sparkles size={22} />
          </div>

          <span className="information-label">
            PROJECT OBJECTIVE
          </span>

          <h2>
            What is the team trying to achieve?
          </h2>

          <p>
            {project.objective}
          </p>

        </article>

      </section>


      {/* =================================================
          PROJECT TEAM
          ================================================= */}

      <section className="project-details-section">

        <div className="details-section-heading">

          <div>

            <span>
              PROJECT TEAM
            </span>

            <h2>
              People building this project
            </h2>

          </div>

          <div className="section-count">
            {project.members.length} members
          </div>

        </div>


        <div className="project-members">

          {project.members.map((member) => (

            <article
              className="project-member-card"
              key={member.email}
            >

              <div className="member-avatar">
                {member.name.charAt(0)}
              </div>


              <div className="member-main">

                <h3>
                  {member.name}
                </h3>

                <span className="member-role">
                  {member.role}
                </span>


                <div className="member-meta">

                  <span>
                    <GraduationCap size={16} />

                    {member.department}
                  </span>

                  <span>
                    {member.year}
                  </span>

                </div>

              </div>


              <div className="member-contact">

                <a
                  href={`mailto:${member.email}`}
                >
                  <Mail size={17} />

                  {member.email}
                </a>


                <a
                  href={`tel:${member.phone}`}
                >
                  <Phone size={17} />

                  {member.phone}
                </a>

              </div>


              <a
                href={`mailto:${member.email}`}
                className="member-contact-button"
              >
                Contact

                <ArrowUpRight size={16} />
              </a>

            </article>

          ))}

        </div>

      </section>


      {/* =================================================
          MENTOR
          ================================================= */}

      <section className="project-details-section">

        <div className="details-section-heading">

          <div>

            <span>
              PROJECT MENTOR
            </span>

            <h2>
              Faculty guidance
            </h2>

          </div>

        </div>


        <article className="project-mentor-card">

          <div className="mentor-avatar">
            {project.mentor.name.charAt(0)}
          </div>


          <div className="mentor-main">

            <span>
              PROJECT MENTOR
            </span>

            <h3>
              {project.mentor.name}
            </h3>

            <p>
              {project.mentor.designation}
            </p>


            <div className="mentor-meta">

              <span>
                <GraduationCap size={17} />

                {project.mentor.department}
              </span>

              <span>
                Department ID:{" "}
                {project.mentor.departmentId}
              </span>

            </div>

          </div>


          <div className="mentor-contact">

            <span>
              CONTACT
            </span>

            <a
              href={`mailto:${project.mentor.email}`}
            >
              <Mail size={17} />

              {project.mentor.email}
            </a>

          </div>


          <a
            href={`mailto:${project.mentor.email}`}
            className="mentor-contact-button"
          >
            Contact Mentor

            <ArrowUpRight size={16} />
          </a>

        </article>

      </section>


      {/* =================================================
          TECHNOLOGY + SKILLS
          ================================================= */}

      <section className="project-details-two-column">

        <article className="details-information-card">

          <div className="information-icon blue">
            <Code2 size={22} />
          </div>

          <span className="information-label">
            TECHNOLOGY STACK
          </span>

          <h2>
            Built with
          </h2>


          <div className="details-tags">

            {project.technologies.map(
              (technology) => (

                <span key={technology}>
                  {technology}
                </span>

              )
            )}

          </div>

        </article>


        <article className="details-information-card">

          <div className="information-icon green">
            <Award size={22} />
          </div>

          <span className="information-label">
            PROJECT INTELLIGENCE
          </span>

          <h2>
            Skills demonstrated
          </h2>


          <div className="details-tags">

            <span>
              Problem Solving
            </span>

            <span>
              Research
            </span>

            <span>
              Development
            </span>

            <span>
              Collaboration
            </span>

            <span>
              Technical Design
            </span>

          </div>

        </article>

      </section>


      {/* =================================================
          DOCUMENTATION
          ================================================= */}

      <section className="project-details-section">

        <div className="details-section-heading">

          <div>

            <span>
              PROJECT DOCUMENTATION
            </span>

            <h2>
              Required project resources
            </h2>

          </div>

        </div>


        <div className="documentation-grid">

          {project.documents.map((document) => (

            <article
              className="documentation-card"
              key={document.name}
            >

              <div className="documentation-icon">
                <FileText size={23} />
              </div>


              <div className="documentation-info">

                <h3>
                  {document.name}
                </h3>

                <span>
                  {document.type}
                </span>

              </div>


              {document.url ? (
                <a
                  href={document.url}
                  target="_blank"
                  rel="noreferrer"
                  className="documentation-open"
                >
                  <ExternalLink size={18} />
                </a>
              ) : (
                <button
                  type="button"
                  className="documentation-open disabled"
                  disabled
                >
                  <ExternalLink size={18} />
                </button>
              )}

            </article>

          ))}

        </div>

      </section>


      {/* =================================================
          MILESTONES
          ================================================= */}

      <section className="project-details-section">

        <div className="details-section-heading">

          <div>

            <span>
              PROJECT JOURNEY
            </span>

            <h2>
              Development milestones
            </h2>

          </div>

        </div>


        <div className="milestones-card">

          {project.milestones.map(
            (milestone, index) => (

              <div
                className="milestone-item"
                key={milestone.title}
              >

                <div className="milestone-line">

                  <div className="milestone-marker">

                    <CheckCircle2 size={18} />

                  </div>

                  {index !==
                    project.milestones.length - 1 && (
                    <div className="milestone-connector"></div>
                  )}

                </div>


                <div className="milestone-content">

                  <div className="milestone-title-row">

                    <h3>
                      {milestone.title}
                    </h3>

                    <span>
                      {milestone.date}
                    </span>

                  </div>

                  <p>
                    {milestone.description}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </section>


      {/* =================================================
          PROJECT DNA
          ================================================= */}

      <section className="project-details-section">

        <div className="details-section-heading">

          <div>

            <span>
              NEXUS INTELLIGENCE
            </span>

            <h2>
              Project DNA
            </h2>

          </div>

          <div className="ai-analysis">
            <Sparkles size={16} />
            AI ANALYSIS
          </div>

        </div>


        <div className="project-dna-grid">

          {project.dna.map(
            (item) => (

              <article
                className="dna-card"
                key={item.label}
              >

                <div className="dna-header">

                  <span>
                    {item.label}
                  </span>

                  <strong>
                    {item.value}%
                  </strong>

                </div>


                <div className="dna-progress">

                  <span
                    style={{
                      width: `${item.value}%`,
                    }}
                  />

                </div>

              </article>

            )
          )}

        </div>

      </section>


      {/* =================================================
          COLLABORATION
          ================================================= */}

      <section className="project-collaboration">

        <div className="collaboration-content">

          <span>
            CAMPUS COLLABORATION
          </span>

          <h2>
            Interested in this project?
          </h2>

          <p>
            Connect with the project team, explore
            their work or request to collaborate.
          </p>

        </div>


        <div className="collaboration-actions">

          <a
            href={`mailto:${project.members[0].email}`}
            className="collaborate-button"
          >
            <Send size={18} />

            Contact Project Lead
          </a>


          <button
            type="button"
            className="request-collaboration-button"
          >
            Request to Collaborate

            <ArrowUpRight size={18} />
          </button>

        </div>

      </section>


      {/* =================================================
          BOTTOM NAVIGATION
          ================================================= */}

      <div className="project-details-bottom">

        <button
          type="button"
          onClick={() =>
            navigate("/student/projects/explore")
          }
        >
          <ArrowLeft size={18} />

          Explore More Projects
        </button>

      </div>

    </div>
  );
}

export default ProjectDetails;