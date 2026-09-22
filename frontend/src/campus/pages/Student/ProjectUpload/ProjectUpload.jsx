import "./ProjectUpload.css";

import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  CircleDashed,
  FileText,
  GitBranch,
  Mail,
  Minus,
  Phone,
  Plus,
  Sparkles,
  Upload,
  UserRound,
  Users,
  X,
  AlertCircle,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";


function ProjectUpload() {
  const navigate = useNavigate();


  /* =========================================================
     BASIC PROJECT STATE
     ========================================================= */

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [problem, setProblem] = useState("");

  const [department, setDepartment] = useState("");
  const [domain, setDomain] = useState("");

  const [technologyInput, setTechnologyInput] = useState("");
  const [technologies, setTechnologies] = useState([]);


  /* =========================================================
     PROJECT TYPE
     ========================================================= */

  const [projectType, setProjectType] = useState("");


  /* =========================================================
     PROJECT STATUS
     ========================================================= */

  const [projectStatus, setProjectStatus] = useState("");

  const [failureReason, setFailureReason] = useState("");
  const [failurePoint, setFailurePoint] = useState("");


  /* =========================================================
     SOLO / TEAM
     ========================================================= */

  const [isSolo, setIsSolo] = useState("");


  const [teamCount, setTeamCount] = useState(0);


  const [teamMembers, setTeamMembers] = useState([]);


  /* =========================================================
     MENTOR
     ========================================================= */

  const [mentorIncluded, setMentorIncluded] = useState("");


  const [mentor, setMentor] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    departmentId: "",
  });


  /* =========================================================
     RESOURCES
     ========================================================= */

  const [githubUrl, setGithubUrl] = useState("");

  const [documentationUrl, setDocumentationUrl] =
    useState("");

  const [publishedUrl, setPublishedUrl] =
    useState("");


  /* =========================================================
     TECHNOLOGY
     ========================================================= */

  const addTechnology = () => {
    const value = technologyInput.trim();

    if (!value) return;

    if (
      technologies.some(
        (technology) =>
          technology.toLowerCase() === value.toLowerCase()
      )
    ) {
      return;
    }

    setTechnologies([
      ...technologies,
      value,
    ]);

    setTechnologyInput("");
  };


  const removeTechnology = (technologyToRemove) => {
    setTechnologies(
      technologies.filter(
        (technology) =>
          technology !== technologyToRemove
      )
    );
  };


  const handleTechnologyKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTechnology();
    }
  };


  /* =========================================================
     TEAM MEMBER GENERATION
     ========================================================= */

  const handleSoloChange = (value) => {
    setIsSolo(value);

    if (value === "yes") {
      setTeamCount(0);
      setTeamMembers([]);
    }
  };


  const handleTeamCountChange = (event) => {
    const value = Math.max(
      0,
      Number(event.target.value) || 0
    );

    setTeamCount(value);


    setTeamMembers((currentMembers) => {

      const updatedMembers = [];

      for (let i = 0; i < value; i++) {

        updatedMembers.push(
          currentMembers[i] || {
            name: "",
            phone: "",
            email: "",
          }
        );

      }

      return updatedMembers;
    });
  };


  const updateTeamMember = (
    index,
    field,
    value
  ) => {

    setTeamMembers((currentMembers) => {

      const updated = [
        ...currentMembers,
      ];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
  };


  /* =========================================================
     MENTOR
     ========================================================= */

  const updateMentor = (
    field,
    value
  ) => {

    setMentor((currentMentor) => ({
      ...currentMentor,
      [field]: value,
    }));
  };


  /* =========================================================
     FORM SUBMIT
     ========================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();


    /*
      The browser performs the normal HTML
      required validation first.

      Later this object can be sent directly
      to the FastAPI backend.
    */

    const projectData = {
      projectName,
      description,
      problem,

      department,
      domain,

      technologies,

      projectType,

      projectStatus,

      failureReason:
        projectStatus === "failed"
          ? failureReason
          : null,

      failurePoint:
        projectStatus === "failed"
          ? failurePoint
          : null,

      isSolo: isSolo === "yes",

      teamMembers:
        isSolo === "no"
          ? teamMembers
          : [],

      mentorIncluded:
        mentorIncluded === "yes",

      mentor:
        mentorIncluded === "yes"
          ? mentor
          : null,

      resources: {
        githubUrl,
        documentationUrl,
        publishedUrl,
      },
    };


    console.log(
      "NEXUS PROJECT DATA:",
      projectData
    );


    alert(
      "Project information validated successfully."
    );
  };


  return (
    <div className="project-upload">


      {/* =====================================================
          BACK
      ===================================================== */}

      <button
        type="button"
        className="upload-back-button"
        onClick={() =>
          navigate("/student/projects")
        }
      >
        <ArrowLeft size={18} />

        Back to Projects
      </button>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="upload-hero">

        <div className="upload-hero-content">

          <span className="upload-eyebrow">
            NEXUS / PROJECT CREATION
          </span>

          <h1>
            Turn your idea into
            <span> a campus project.</span>
          </h1>

          <p>
            Publish your project to the NEXUS network.
            Once submitted, NEXUS can analyze its Project
            DNA, identify required skills, suggest
            collaborators and recommend mentors.
          </p>

        </div>


        <div className="upload-hero-visual">

          <div className="upload-orbit orbit-a"></div>
          <div className="upload-orbit orbit-b"></div>
          <div className="upload-orbit orbit-c"></div>

          <div className="upload-core">
            <Sparkles size={32} />
          </div>

        </div>

      </section>


      {/* =====================================================
          FORM
      ===================================================== */}

      <form
        className="project-upload-form"
        onSubmit={handleSubmit}
      >


        {/* ===================================================
            PROJECT IDENTITY
            =================================================== */}

        <section className="upload-section">

          <div className="upload-section-heading">

            <span>
              PROJECT IDENTITY
            </span>

            <h2>
              Tell us about your project
            </h2>

            <p>
              These details help NEXUS understand the
              purpose and technical direction of your work.
            </p>

          </div>


          <div className="upload-field-grid">


            {/* PROJECT NAME */}

            <div className="upload-field full-width">

              <label>
                Project name
                <span className="required">*</span>
              </label>

              <input
                type="text"
                value={projectName}
                onChange={(event) =>
                  setProjectName(event.target.value)
                }
                placeholder="e.g. AI-powered campus assistant"
                required
              />

            </div>


            {/* DESCRIPTION */}

            <div className="upload-field">

              <label>
                Short description
                <span className="required">*</span>
              </label>

              <textarea
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Describe what your project does..."
                required
              />

            </div>


            {/* PROBLEM */}

            <div className="upload-field">

              <label>
                Problem you're solving
                <span className="required">*</span>
              </label>

              <textarea
                value={problem}
                onChange={(event) =>
                  setProblem(event.target.value)
                }
                placeholder="What problem does this project address?"
                required
              />

            </div>


            {/* DEPARTMENT */}

            <div className="upload-field">

              <label>
                Department
                <span className="required">*</span>
              </label>

              <select
                value={department}
                onChange={(event) =>
                  setDepartment(event.target.value)
                }
                required
              >

                <option value="">
                  Select department
                </option>

                <option>
                  AI & Data Science
                </option>

                <option>
                  Computer Science
                </option>

                <option>
                  Information Technology
                </option>

                <option>
                  Electronics
                </option>

                <option>
                  Cyber Security
                </option>

                <option>
                  Design
                </option>

                <option>
                  Mechanical
                </option>

              </select>

            </div>


            {/* DOMAIN */}

            <div className="upload-field">

              <label>
                Project domain
                <span className="required">*</span>
              </label>

              <select
                value={domain}
                onChange={(event) =>
                  setDomain(event.target.value)
                }
                required
              >

                <option value="">
                  Select domain
                </option>

                <option>
                  Artificial Intelligence
                </option>

                <option>
                  Data Science
                </option>

                <option>
                  Software
                </option>

                <option>
                  IoT
                </option>

                <option>
                  Cybersecurity
                </option>

                <option>
                  Education
                </option>

                <option>
                  Research
                </option>

                <option>
                  Sustainability
                </option>

              </select>

            </div>

          </div>

        </section>


        {/* ===================================================
            TECHNOLOGIES
            =================================================== */}

        <section className="upload-section">

          <div className="upload-section-heading">

            <span>
              TECHNOLOGY
            </span>

            <h2>
              What are you building with?
            </h2>

            <p>
              Add the main technologies, frameworks and
              tools used in your project.
            </p>

          </div>


          <div className="technology-input-row">

            <input
              type="text"
              value={technologyInput}
              onChange={(event) =>
                setTechnologyInput(
                  event.target.value
                )
              }
              onKeyDown={
                handleTechnologyKeyDown
              }
              placeholder="Add technology..."
            />

            <button
              type="button"
              onClick={addTechnology}
            >
              <Plus size={18} />

              Add
            </button>

          </div>


          <div className="technology-tags">

            {technologies.map(
              (technology) => (

                <span key={technology}>

                  {technology}

                  <button
                    type="button"
                    onClick={() =>
                      removeTechnology(
                        technology
                      )
                    }
                  >
                    <X size={14} />
                  </button>

                </span>

              )
            )}

          </div>


          {technologies.length === 0 && (
            <p className="field-hint">
              Add at least one technology used
              in the project.
            </p>
          )}

        </section>


        {/* ===================================================
            PROJECT TYPE
            =================================================== */}

        <section className="upload-section">

          <div className="upload-section-heading compact">

            <span>
              PROJECT TYPE
              <b className="required"> *</b>
            </span>

          </div>


          <div className="choice-grid four">

            {[
              "Academic",
              "Research",
              "Hackathon",
              "Startup",
            ].map((type) => (

              <label
                className={`choice-card ${
                  projectType === type
                    ? "selected"
                    : ""
                }`}
                key={type}
              >

                <input
                  type="radio"
                  name="projectType"
                  value={type}
                  checked={
                    projectType === type
                  }
                  onChange={(event) =>
                    setProjectType(
                      event.target.value
                    )
                  }
                  required
                />

                <span className="custom-radio"></span>

                <strong>
                  {type}
                </strong>

              </label>

            ))}

          </div>

        </section>


        {/* ===================================================
            SOLO / TEAM
            =================================================== */}

        <section className="upload-section">

          <div className="upload-section-heading">

            <span>
              PROJECT TEAM
            </span>

            <h2>
              Is this a solo project?
              <b className="required"> *</b>
            </h2>

            <p>
              Tell NEXUS whether you built this project
              independently or with other students.
            </p>

          </div>


          <div className="choice-grid two">

            <label
              className={`choice-card large ${
                isSolo === "yes"
                  ? "selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="isSolo"
                value="yes"
                checked={
                  isSolo === "yes"
                }
                onChange={(event) =>
                  handleSoloChange(
                    event.target.value
                  )
                }
                required
              />

              <div className="choice-icon blue">
                <UserRound size={21} />
              </div>

              <div>

                <strong>
                  Yes, it's a solo project
                </strong>

                <span>
                  I built this project independently.
                </span>

              </div>

            </label>


            <label
              className={`choice-card large ${
                isSolo === "no"
                  ? "selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="isSolo"
                value="no"
                checked={
                  isSolo === "no"
                }
                onChange={(event) =>
                  handleSoloChange(
                    event.target.value
                  )
                }
                required
              />

              <div className="choice-icon purple">
                <Users size={21} />
              </div>

              <div>

                <strong>
                  No, it's a team project
                </strong>

                <span>
                  Other students contributed to this project.
                </span>

              </div>

            </label>

          </div>


          {/* TEAM MEMBERS */}

          {isSolo === "no" && (

            <div className="conditional-panel">

              <div className="conditional-header">

                <div>

                  <span>
                    TEAM MEMBERS
                  </span>

                  <h3>
                    Who worked with you?
                  </h3>

                </div>


                <div className="team-count-control">

                  <label>
                    Number of teammates
                  </label>

                  <div className="number-control">

                    <button
                      type="button"
                      onClick={() =>
                        setTeamCount(
                          Math.max(
                            0,
                            teamCount - 1
                          )
                        )
                      }
                    >
                      <Minus size={16} />
                    </button>

                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={teamCount}
                      onChange={
                        handleTeamCountChange
                      }
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleTeamCountChange({
                          target: {
                            value:
                              teamCount + 1,
                          },
                        })
                      }
                    >
                      <Plus size={16} />
                    </button>

                  </div>

                </div>

              </div>


              {teamCount === 0 && (
                <div className="empty-team-state">
                  <Users size={24} />

                  <p>
                    Enter the number of teammates
                    to add their information.
                  </p>
                </div>
              )}


              <div className="team-members-grid">

                {teamMembers.map(
                  (member, index) => (

                    <article
                      className="team-member-form-card"
                      key={index}
                    >

                      <div className="member-form-number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>


                      <div className="member-form-title">

                        <Users size={18} />

                        <strong>
                          Team member{" "}
                          {index + 1}
                        </strong>

                      </div>


                      <div className="upload-field">

                        <label>
                          Full name
                          <span className="required">*</span>
                        </label>

                        <input
                          type="text"
                          value={member.name}
                          onChange={(event) =>
                            updateTeamMember(
                              index,
                              "name",
                              event.target.value
                            )
                          }
                          placeholder="Enter full name"
                          required
                        />

                      </div>


                      <div className="member-contact-grid">

                        <div className="upload-field">

                          <label>
                            Phone
                            <span className="required">*</span>
                          </label>

                          <div className="input-with-icon">

                            <Phone size={17} />

                            <input
                              type="tel"
                              value={member.phone}
                              onChange={(event) =>
                                updateTeamMember(
                                  index,
                                  "phone",
                                  event.target.value
                                )
                              }
                              placeholder="+91 XXXXX XXXXX"
                              required
                            />

                          </div>

                        </div>


                        <div className="upload-field">

                          <label>
                            Gmail
                            <span className="required">*</span>
                          </label>

                          <div className="input-with-icon">

                            <Mail size={17} />

                            <input
                              type="email"
                              value={member.email}
                              onChange={(event) =>
                                updateTeamMember(
                                  index,
                                  "email",
                                  event.target.value
                                )
                              }
                              placeholder="name@gmail.com"
                              required
                            />

                          </div>

                        </div>

                      </div>

                    </article>

                  )
                )}

              </div>

            </div>

          )}

        </section>


        {/* ===================================================
            MENTOR
            =================================================== */}

        <section className="upload-section">

          <div className="upload-section-heading">

            <span>
              FACULTY GUIDANCE
            </span>

            <h2>
              Is a mentor included?
              <b className="required"> *</b>
            </h2>

            <p>
              Add faculty guidance information if a
              mentor is involved in your project.
            </p>

          </div>


          <div className="choice-grid two">

            <label
              className={`choice-card large ${
                mentorIncluded === "yes"
                  ? "selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="mentorIncluded"
                value="yes"
                checked={
                  mentorIncluded === "yes"
                }
                onChange={(event) =>
                  setMentorIncluded(
                    event.target.value
                  )
                }
                required
              />

              <div className="choice-icon green">
                <GraduationCapIcon />
              </div>

              <div>

                <strong>
                  Yes, a mentor is included
                </strong>

                <span>
                  A faculty member guides this project.
                </span>

              </div>

            </label>


            <label
              className={`choice-card large ${
                mentorIncluded === "no"
                  ? "selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="mentorIncluded"
                value="no"
                checked={
                  mentorIncluded === "no"
                }
                onChange={(event) =>
                  setMentorIncluded(
                    event.target.value
                  )
                }
                required
              />

              <div className="choice-icon orange">
                <UserRound size={21} />
              </div>

              <div>

                <strong>
                  No mentor
                </strong>

                <span>
                  This project does not have faculty guidance.
                </span>

              </div>

            </label>

          </div>


          {/* MENTOR DETAILS */}

          {mentorIncluded === "yes" && (

            <div className="conditional-panel mentor-panel">

              <div className="conditional-header">

                <div>

                  <span>
                    MENTOR INFORMATION
                  </span>

                  <h3>
                    Tell us about your mentor
                  </h3>

                </div>

              </div>


              <div className="upload-field-grid">

                <div className="upload-field">

                  <label>
                    Mentor name
                    <span className="required">*</span>
                  </label>

                  <input
                    type="text"
                    value={mentor.name}
                    onChange={(event) =>
                      updateMentor(
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="Dr. / Prof. Full Name"
                    required
                  />

                </div>


                <div className="upload-field">

                  <label>
                    Mentor Gmail
                    <span className="required">*</span>
                  </label>

                  <div className="input-with-icon">

                    <Mail size={17} />

                    <input
                      type="email"
                      value={mentor.email}
                      onChange={(event) =>
                        updateMentor(
                          "email",
                          event.target.value
                        )
                      }
                      placeholder="mentor@gmail.com"
                      required
                    />

                  </div>

                </div>


                <div className="upload-field">

                  <label>
                    Mentor contact
                    <span className="required">*</span>
                  </label>

                  <div className="input-with-icon">

                    <Phone size={17} />

                    <input
                      type="tel"
                      value={mentor.phone}
                      onChange={(event) =>
                        updateMentor(
                          "phone",
                          event.target.value
                        )
                      }
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />

                  </div>

                </div>


                <div className="upload-field">

                  <label>
                    Mentor department
                    <span className="required">*</span>
                  </label>

                  <select
                    value={mentor.department}
                    onChange={(event) =>
                      updateMentor(
                        "department",
                        event.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      Select department
                    </option>

                    <option>
                      AI & Data Science
                    </option>

                    <option>
                      Computer Science
                    </option>

                    <option>
                      Information Technology
                    </option>

                    <option>
                      Electronics
                    </option>

                    <option>
                      Cyber Security
                    </option>

                    <option>
                      Design
                    </option>

                  </select>

                </div>


                <div className="upload-field">

                  <label>
                    Department ID
                    <span className="required">*</span>
                  </label>

                  <input
                    type="text"
                    value={mentor.departmentId}
                    onChange={(event) =>
                      updateMentor(
                        "departmentId",
                        event.target.value
                      )
                    }
                    placeholder="e.g. AIDS-01"
                    required
                  />

                </div>

              </div>

            </div>

          )}

        </section>


        {/* ===================================================
            PROJECT STATUS
            =================================================== */}

        <section className="upload-section">

          <div className="upload-section-heading">

            <span>
              PROJECT STATUS
            </span>

            <h2>
              What happened with this project?
              <b className="required"> *</b>
            </h2>

            <p>
              This information helps NEXUS build Project
              DNA and Failure Memory.
            </p>

          </div>


          <div className="status-choice-grid">


            {/* COMPLETED */}

            <label
              className={`status-card ${
                projectStatus === "completed"
                  ? "selected completed"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="projectStatus"
                value="completed"
                checked={
                  projectStatus === "completed"
                }
                onChange={(event) =>
                  setProjectStatus(
                    event.target.value
                  )
                }
                required
              />

              <div className="status-icon green">
                <CheckCircle2 size={22} />
              </div>

              <div>

                <strong>
                  Completed
                </strong>

                <span>
                  The project was successfully completed.
                </span>

              </div>

            </label>


            {/* IN PROGRESS */}

            <label
              className={`status-card ${
                projectStatus === "progress"
                  ? "selected progress"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="projectStatus"
                value="progress"
                checked={
                  projectStatus === "progress"
                }
                onChange={(event) =>
                  setProjectStatus(
                    event.target.value
                  )
                }
                required
              />

              <div className="status-icon blue">
                <CircleDashed size={22} />
              </div>

              <div>

                <strong>
                  In progress
                </strong>

                <span>
                  The project is still being developed.
                </span>

              </div>

            </label>


            {/* FAILED */}

            <label
              className={`status-card ${
                projectStatus === "failed"
                  ? "selected failed"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="projectStatus"
                value="failed"
                checked={
                  projectStatus === "failed"
                }
                onChange={(event) =>
                  setProjectStatus(
                    event.target.value
                  )
                }
                required
              />

              <div className="status-icon red">
                <AlertCircle size={22} />
              </div>

              <div>

                <strong>
                  Failed / stopped
                </strong>

                <span>
                  The project could not reach its intended outcome.
                </span>

              </div>

            </label>

          </div>


          {/* FAILURE MEMORY */}

          {projectStatus === "failed" && (

            <div className="failure-panel">

              <div className="failure-heading">

                <AlertCircle size={22} />

                <div>

                  <strong>
                    NEXUS Failure Memory
                  </strong>

                  <span>
                    Help future students learn from this project.
                  </span>

                </div>

              </div>


              <div className="upload-field-grid">

                <div className="upload-field">

                  <label>
                    Why did the project fail?
                    <span className="required">*</span>
                  </label>

                  <textarea
                    value={failureReason}
                    onChange={(event) =>
                      setFailureReason(
                        event.target.value
                      )
                    }
                    placeholder="Explain the main reason the project could not be completed..."
                    required
                  />

                </div>


                <div className="upload-field">

                  <label>
                    Where did the failure occur?
                    <span className="required">*</span>
                  </label>

                  <textarea
                    value={failurePoint}
                    onChange={(event) =>
                      setFailurePoint(
                        event.target.value
                      )
                    }
                    placeholder="e.g. Model training, database integration, hardware, deployment..."
                    required
                  />

                </div>

              </div>

            </div>

          )}

        </section>


        {/* ===================================================
            PROJECT RESOURCES
            =================================================== */}

        <section className="upload-section">

          <div className="upload-section-heading">

            <span>
              PROJECT RESOURCES
            </span>

            <h2>
              Make your work accessible
            </h2>

            <p>
              Add the resources other students, faculty
              and collaborators can use to understand your work.
            </p>

          </div>


          <div className="resource-grid">


            {/* GITHUB */}

            <div className="resource-field">

              <div className="resource-icon blue">
                <GitBranch size={21} />
              </div>

              <div className="resource-content">

                <label>
                  GitHub repository
                  <span className="required">*</span>
                </label>

                <p>
                  Paste the GitHub repository URL of your project.
                </p>

                <input
                  type="url"
                  value={githubUrl}
                  onChange={(event) =>
                    setGithubUrl(
                      event.target.value
                    )
                  }
                  placeholder="https://github.com/username/project"
                  required
                />

              </div>

            </div>


            {/* DOCUMENTATION */}

            <div className="resource-field">

              <div className="resource-icon purple">
                <FileText size={21} />
              </div>

              <div className="resource-content">

                <label>
                  Documentation
                  <span className="required">*</span>
                </label>

                <p>
                  Paste the link to your project documentation.
                </p>

                <input
                  type="url"
                  value={documentationUrl}
                  onChange={(event) =>
                    setDocumentationUrl(
                      event.target.value
                    )
                  }
                  placeholder="Google Drive / Docs / Notion / PDF URL"
                  required
                />

              </div>

            </div>


            {/* PUBLISHED URL */}

            <div className="resource-field published-resource">

              <div className="resource-icon green">
                <Upload size={21} />
              </div>

              <div className="resource-content">

                <label>

                  Published project URL

                  {projectStatus === "completed" ? (
                    <span className="required">
                      *
                    </span>
                  ) : (
                    <span className="optional">
                      Optional
                    </span>
                  )}

                </label>

                <p>
                  Link to the live or published final
                  product that other students can access.
                </p>

                <input
                  type="url"
                  value={publishedUrl}
                  onChange={(event) =>
                    setPublishedUrl(
                      event.target.value
                    )
                  }
                  placeholder="https://your-project.vercel.app"
                  required={
                    projectStatus ===
                    "completed"
                  }
                />

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            FINAL ACTION
            =================================================== */}

        <section className="upload-submit-section">

          <div className="submit-note">

            <Sparkles size={19} />

            <div>

              <strong>
                Ready for NEXUS?
              </strong>

              <span>
                Your project information will become part
                of the campus project intelligence network.
              </span>

            </div>

          </div>


          <div className="submit-actions">

            <button
              type="button"
              className="save-draft-button"
            >
              Save draft
            </button>


            <button
              type="submit"
              className="publish-project-button"
            >

              Publish Project

              <ArrowUpRight size={18} />

            </button>

          </div>

        </section>

      </form>

    </div>
  );
}


/* =========================================================
   SMALL ICON COMPONENT
   ========================================================= */

function GraduationCapIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 2 9 2 12 0v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}


export default ProjectUpload;