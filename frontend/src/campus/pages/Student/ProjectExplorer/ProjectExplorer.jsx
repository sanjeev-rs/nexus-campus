import "./ProjectExplorer.css";

import {
  ArrowLeft,
  ArrowUpRight,
  Brain,
  Code2,
  Filter,
  FolderKanban,
  Search,
  Users,
  X,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const projects = [
  {
    id: "smart-campus-analytics",
    title: "Smart Campus Analytics",
    description:
      "A predictive analytics platform that discovers patterns in campus activity and student development.",
    department: "AI & Data Science",
    domain: "Artificial Intelligence",
    technologies: ["Python", "Machine Learning", "React"],
    members: 4,
    match: 92,
    status: "Active",
    author: "Arjun Kumar",
  },
  {
    id: "ai-research-lab",
    title: "AI Research Lab",
    description:
      "A collaborative student research project exploring practical applications of artificial intelligence.",
    department: "Computer Science",
    domain: "Research",
    technologies: ["Python", "AI", "FastAPI"],
    members: 6,
    match: 87,
    status: "Active",
    author: "Priya Nair",
  },
  {
    id: "open-source-campus",
    title: "Open Source Campus",
    description:
      "A student-led open source ecosystem for building useful tools for the campus community.",
    department: "Information Technology",
    domain: "Software",
    technologies: ["React", "Node.js", "GitHub"],
    members: 8,
    match: 81,
    status: "Looking for contributors",
    author: "Vishal R",
  },
  {
    id: "smart-agriculture-monitoring",
    title: "Smart Agriculture Monitoring",
    description:
      "An IoT and machine learning system for monitoring agricultural conditions and predicting crop needs.",
    department: "Electronics",
    domain: "IoT",
    technologies: ["Arduino", "Python", "Sensors"],
    members: 5,
    match: 79,
    status: "Active",
    author: "Rahul S",
  },
  {
    id: "student-wellness-platform",
    title: "Student Wellness Platform",
    description:
      "A digital platform designed to help students track routines, activities and campus resources.",
    department: "Design",
    domain: "Education",
    technologies: ["React", "UX", "Firebase"],
    members: 3,
    match: 76,
    status: "Planning",
    author: "Ananya I",
  },
  {
    id: "ai-cybercrime-investigation",
    title: "AI Cybercrime Investigation",
    description:
      "A multimodal investigation platform for organizing digital evidence and assisting forensic workflows.",
    department: "Cyber Security",
    domain: "Cybersecurity",
    technologies: ["Python", "AI", "Computer Vision"],
    members: 5,
    match: 74,
    status: "Active",
    author: "Sanjeev R",
  },
];

function ProjectExplorer() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [domain, setDomain] = useState("All Domains");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        project.title.toLowerCase().includes(searchText) ||
        project.description.toLowerCase().includes(searchText) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchText)
        );

      const matchesDepartment =
        department === "All Departments" ||
        project.department === department;

      const matchesDomain =
        domain === "All Domains" ||
        project.domain === domain;

      return matchesSearch && matchesDepartment && matchesDomain;
    });
  }, [search, department, domain]);

  return (
    <div className="project-explorer">

      <section className="explorer-header">

        <button
          className="explorer-back"
          onClick={() => navigate("/student/projects")}
        >
          <ArrowLeft size={17} />
          Back to Projects
        </button>

        <span className="explorer-eyebrow">
          NEXUS / PROJECT EXPLORER
        </span>

        <div className="explorer-header-row">

          <div>
            <h1>
              Discover what your
              <span> campus is building.</span>
            </h1>

            <p>
              Explore projects created by students across departments,
              technologies and domains. Find ideas, collaborators and
              projects where your skills can contribute.
            </p>
          </div>

          <div className="explorer-header-icon">
            <FolderKanban size={34} />
          </div>

        </div>

      </section>


      <section className="explorer-search-section">

        <div className="explorer-search">

          <Search size={22} />

          <input
            type="text"
            placeholder="Search projects, technologies, domains..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
            >
              <X size={17} />
            </button>
          )}

        </div>


        <div className="explorer-filters">

          <div className="filter-heading">
            <Filter size={16} />
            Filters
          </div>

          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option>All Departments</option>
            <option>AI & Data Science</option>
            <option>Computer Science</option>
            <option>Information Technology</option>
            <option>Electronics</option>
            <option>Design</option>
            <option>Cyber Security</option>
          </select>

          <select
            value={domain}
            onChange={(event) => setDomain(event.target.value)}
          >
            <option>All Domains</option>
            <option>Artificial Intelligence</option>
            <option>Research</option>
            <option>Software</option>
            <option>IoT</option>
            <option>Education</option>
            <option>Cybersecurity</option>
          </select>

          <span className="project-result-count">
            {filteredProjects.length} projects found
          </span>

        </div>

      </section>


      <section className="explorer-project-section">

        <div className="explorer-section-heading">

          <div>
            <span>PROJECT NETWORK</span>
            <h2>
              Explore campus projects
            </h2>
          </div>

          <div className="recommended-label">
            <Brain size={16} />
            NEXUS matching enabled
          </div>

        </div>


        <div className="explorer-grid">

          {filteredProjects.map((project) => (

            <article
              className="explorer-project-card"
              key={project.id}
            >

              <div className="explorer-card-top">

                <div className="explorer-project-icon">
                  <Code2 size={22} />
                </div>

                <span className="match-score">
                  {project.match}% MATCH
                </span>

              </div>


              <div className="explorer-card-content">

                <span className="project-domain">
                  {project.domain}
                </span>

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>

                <div className="explorer-tags">
                  {project.technologies.map((technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>

              </div>


              <div className="explorer-card-footer">

                <div className="project-author">

                  <div className="author-avatar">
                    {project.author.charAt(0)}
                  </div>

                  <div>
                    <strong>
                      {project.author}
                    </strong>

                    <span>
                      {project.members} members
                    </span>
                  </div>

                </div>


                <button
                    type="button"
                    className="explorer-open-button"
                    onClick={() =>
                        navigate(`/student/projects/explore/${project.id}`)
                    }
                >
                    View
                    <ArrowUpRight size={16} />
                </button>

              </div>

            </article>

          ))}

        </div>


        {filteredProjects.length === 0 && (

          <div className="no-projects">

            <Search size={32} />

            <h3>
              No projects found
            </h3>

            <p>
              Try another search term or change your filters.
            </p>

          </div>

        )}

      </section>

    </div>
  );
}

export default ProjectExplorer;