import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import {
  FaUserGraduate,
  FaChartLine,
  FaProjectDiagram,
  FaBrain,
  FaLightbulb
} from "react-icons/fa";

import { ArrowRight, ArrowDown } from "lucide-react";

import "./Landing.css";


function Landing() {

  const navigate = useNavigate();

  useEffect(() => {

    const elements = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up, .reveal-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "reveal-visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );


    elements.forEach((element) => {
      observer.observe(element);
    });


    return () => {
      observer.disconnect();
    };

  }, []);


  return (
    <div className="nexus-page">

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <header className="navbar">

          {/* =====================================================
              BRAND
          ===================================================== */}

          <a href="#home" className="brand">

            <div className="brand-icon">
              N
            </div>

            <div className="brand-details">

              <div className="brand-name">
                NEXUS
              </div>

              <div className="brand-subtitle">
                CAMPUS INTELLIGENCE SYSTEM
              </div>

            </div>

          </a>


          {/* =====================================================
              NAVIGATION LINKS
          ===================================================== */}

          <nav className="nav-links">

            <a href="#home" className="nav-link active">
              Home
            </a>

            <a href="#ecosystem" className="nav-link">
              Ecosystem
            </a>

            <a href="#about" className="nav-link">
              About
            </a>

          </nav>


          {/* =====================================================
              CAMPUS CTA
          ===================================================== */}

          <button
            className="campus-button"
            onClick={() => navigate("/login")}
          >
            Enter Campus
            <ArrowRight />
          </button>

        </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main id="home">


        {/* ===================================================
            HERO SECTION
        =================================================== */}

        <section className="hero">


          {/* HERO CONTENT */}

          <div className="hero-content">

            {/* EYEBROW */}

            <div className="eyebrow">
              LEARN BEYOND&nbsp; / &nbsp;CONNECTED MINDS&nbsp; / &nbsp;BRIGHTER TOMORROW
            </div>


            {/* MAIN HEADLINE */}

            <h1>

              <span>
                One Campus.
              </span>

              <span className="blue-text">
                Infinite Possibilities.
              </span>

            </h1>


            {/* HERO ACTIONS */}

            <div className="hero-actions">

              {/* PRIMARY CTA */}

              <button
                className="primary-button"
                onClick={() => navigate("/login")}
              >
                Enter Campus
                <ArrowRight />
              </button>


              {/* SECONDARY CTA */}

              <button className="explore-button">

                <span className="explore-icon">

                  <span className="play-triangle">
                    ▶
                  </span>

                </span>


                <span className="explore-label">
                  Explore NEXUS
                </span>


                <ArrowDown
                  className="explore-arrow"
                  size={19}
                />

              </button>

            </div>

          </div>


          {/* =================================================
              HERO STATISTICS
          ================================================= */}

          <div className="stats">

            <div className="stat-item">

              <strong>
                10K+
              </strong>

              <span>
                Students
              </span>

            </div>


            <div className="divider" />


            <div className="stat-item">

              <strong>
                500+
              </strong>

              <span>
                Faculty
              </span>

            </div>


            <div className="divider" />


            <div className="stat-item">

              <strong>
                1K+
              </strong>

              <span>
                Projects
              </span>

            </div>


            <div className="divider" />


            <div className="stat-item">

              <strong>
                50+
              </strong>

              <span>
                Departments
              </span>

            </div>

          </div>

        </section>


        {/* =====================================================
            NEXUS ECOSYSTEM
        ===================================================== */}

        <section
          id="ecosystem"
          className="ecosystem reveal"
        >

          {/* =================================================
              TOP INTRO
          ================================================= */}

          <div className="ecosystem-top">

            <div className="section-label">
              THE NEXUS ECOSYSTEM
            </div>


            <div className="ecosystem-intro">

              <h2 className="reveal-left">

                More Than a Campus.

                <span>
                  A Connected Future.
                </span>

              </h2>


              <div className="ecosystem-description reveal-right">

                <p>
                  NEXUS transforms a fragmented university into
                  one intelligent ecosystem — connecting people,
                  knowledge, projects, skills and opportunities.
                </p>


                <button
                  className="discover"
                  type="button"
                >

                  <span>
                    ↗
                  </span>

                  <div>
                    Discover
                    <br />
                    How It Works
                  </div>

                </button>

              </div>

            </div>

          </div>


          {/* =================================================
              CAPABILITIES
          ================================================= */}

          <div className="ecosystem-capabilities">


            {/* CARD 01 */}

            <article className="ecosystem-card reveal reveal-delay-1">

              <div className="card-number">
                01
              </div>

              <div className="card-icon">
                <FaUserGraduate />
              </div>

              <h3>
                Student
                <br />
                Digital Twin
              </h3>

              <p>
                A living intelligence profile that understands
                each student's skills, projects, interests and
                growth journey.
              </p>

              <div className="card-arrow">
                ↗
              </div>

            </article>


            {/* CARD 02 */}

            <article className="ecosystem-card reveal reveal-delay-2">

              <div className="card-number">
                02
              </div>

              <div className="card-icon">
                <FaChartLine />
              </div>

              <h3>
                Skill
                <br />
                Intelligence
              </h3>

              <p>
                Discover existing strengths, identify skill gaps
                and understand where each student can grow.
              </p>

              <div className="card-arrow">
                ↗
              </div>

            </article>


            {/* CARD 03 */}

            <article className="ecosystem-card reveal reveal-delay-3">

              <div className="card-number">
                03
              </div>

              <div className="card-icon">
                <FaProjectDiagram />
              </div>

              <h3>
                Project
                <br />
                DNA
              </h3>

              <p>
                Understand projects beyond titles — their
                technologies, domains, contributors and outcomes.
              </p>

              <div className="card-arrow">
                ↗
              </div>

            </article>


            {/* CARD 04 */}

            <article className="ecosystem-card reveal reveal-delay-4">

              <div className="card-number">
                04
              </div>

              <div className="card-icon">
                ↻
              </div>

              <h3>
                Failure
                <br />
                Memory
              </h3>

              <p>
                Preserve lessons from unsuccessful projects so
                future teams can learn instead of repeating mistakes.
              </p>

              <div className="card-arrow">
                ↗
              </div>

            </article>


            {/* CARD 05 */}

            <article className="ecosystem-card reveal reveal-delay-5">

              <div className="card-number">
                05
              </div>

              <div className="card-icon">
                <FaBrain />
              </div>

              <h3>
                Institutional
                <br />
                Knowledge Graph
              </h3>

              <p>
                Connect people, projects, research, departments
                and knowledge into one searchable intelligence layer.
              </p>

              <div className="card-arrow">
                ↗
              </div>

            </article>


            {/* CARD 06 */}

            <article className="ecosystem-card reveal reveal-delay-3">

              <div className="card-number">
                06
              </div>

              <div className="card-icon">
                ◫
              </div>

              <h3>
                Campus
                <br />
                Digital Twin
              </h3>

              <p>
                A continuously evolving view of the institution,
                revealing patterns, connections and opportunities.
              </p>

              <div className="card-arrow">
                ↗
              </div>

            </article>


            {/* CARD 07 */}

            <article className="ecosystem-card featured-card reveal reveal-delay-4">

              <div className="card-number">
                07
              </div>

              <div className="card-icon">
                <FaLightbulb />
              </div>

              <h3>
                Decision
                <br />
                Intelligence
              </h3>

              <p>
                Turn campus data into actionable insights for
                students, faculty and institutional leadership.
              </p>

              <div className="card-arrow">
                ↗
              </div>

            </article>


          </div>


          {/* =================================================
              BOTTOM STATEMENT
          ================================================= */}

          <div className="ecosystem-bottom">

            <span>
              ONE INTELLIGENCE LAYER
            </span>

            <p>
              From individual growth to institutional decisions,
              NEXUS connects every layer of campus life.
            </p>

          </div>

        </section>

        {/* =========================================================
              NEXUS — INTELLIGENCE LAYER
          ========================================================= */}

          <section className="intelligence-layer">

            {/* =======================================================
                BACKGROUND ATMOSPHERE
            ======================================================= */}

            <div className="intelligence-orb intelligence-orb-one"></div>
            <div className="intelligence-orb intelligence-orb-two"></div>
            <div className="intelligence-noise"></div>


            <div className="intelligence-container">

              {/* =====================================================
                  LEFT CONTENT
              ===================================================== */}

              <div className="intelligence-copy reveal-left">

                <div className="intelligence-label">
                  THE INTELLIGENCE LAYER
                </div>

                <h2 className="reveal-left">
                  Built Around
                  <br />
                  Your Campus.
                </h2>

                <p className="reveal-left">
                  NEXUS connects the people, knowledge, projects and
                  decisions that shape your campus into one intelligent
                  system.
                </p>

                <div className="intelligence-line"></div>

                <div className="intelligence-caption">
                  ONE INTELLIGENCE LAYER
                </div>

              </div>


              {/* =====================================================
                  RIGHT NETWORK
              ===================================================== */}

              <div className="intelligence-visual reveal-scale">


                {/* ===================================================
                    CONNECTION NETWORK

                    SVG is used instead of rotated divs so every
                    connection remains precisely aligned.
                =================================================== */}

                <svg
                  className="intelligence-network"
                  viewBox="0 0 760 600"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  {/* =====================================================
                      PREMIUM ORBIT
                  ===================================================== */}

                  <circle
                    className="network-orbit orbit-one"
                    cx="380"
                    cy="300"
                    r="150"
                  />

                  <circle
                    className="network-orbit orbit-two"
                    cx="380"
                    cy="300"
                    r="225"
                  />


                  {/* =====================================================
                      EQUAL 5-WAY CONNECTIONS

                      Center:
                      380 / 300

                      Pentagon points:
                      Student       244 / 114
                      Skill         516 / 114
                      Project       599 / 371
                      Decision      380 / 530
                      Knowledge     161 / 371
                  ===================================================== */}

                  <line
                    className="network-line"
                    x1="380"
                    y1="300"
                    x2="244"
                    y2="114"
                  />

                  <line
                    className="network-line"
                    x1="380"
                    y1="300"
                    x2="516"
                    y2="114"
                  />

                  <line
                    className="network-line"
                    x1="380"
                    y1="300"
                    x2="599"
                    y2="371"
                  />

                  <line
                    className="network-line"
                    x1="380"
                    y1="300"
                    x2="380"
                    y2="530"
                  />

                  <line
                    className="network-line"
                    x1="380"
                    y1="300"
                    x2="161"
                    y2="371"
                  />


                  {/* =====================================================
                      CONNECTION POINTS
                  ===================================================== */}

                  <circle
                    className="network-point"
                    cx="244"
                    cy="114"
                    r="3"
                  />

                  <circle
                    className="network-point"
                    cx="516"
                    cy="114"
                    r="3"
                  />

                  <circle
                    className="network-point"
                    cx="599"
                    cy="371"
                    r="3"
                  />

                  <circle
                    className="network-point"
                    cx="380"
                    cy="530"
                    r="3"
                  />

                  <circle
                    className="network-point"
                    cx="161"
                    cy="371"
                    r="3"
                  />

                </svg>


                {/* ===================================================
                    CENTRAL NEXUS
                =================================================== */}

                <div className="intelligence-center">

                  <div className="center-pulse"></div>

                  <div className="center-core">
                    N
                  </div>

                  <span className="center-label">
                    NEXUS
                  </span>

                </div>


                {/* ===================================================
                    NODE 01 — STUDENT
                =================================================== */}

                <div className="intelligence-node node-one">

                  <div className="node-icon">
                    <FaUserGraduate />
                  </div>

                  <div className="node-content">

                    <span>01</span>

                    <h3>
                      Student
                    </h3>

                    <p>
                      Digital Twin
                    </p>

                  </div>

                </div>


                {/* ===================================================
                    NODE 02 — SKILL
                =================================================== */}

                <div className="intelligence-node node-two">

                  <div className="node-icon">
                    <FaChartLine />
                  </div>

                  <div className="node-content">

                    <span>02</span>

                    <h3>
                      Skill
                    </h3>

                    <p>
                      Intelligence
                    </p>

                  </div>

                </div>


                {/* ===================================================
                    NODE 03 — PROJECT
                =================================================== */}

                <div className="intelligence-node node-three">

                  <div className="node-icon">
                    <FaProjectDiagram />
                  </div>

                  <div className="node-content">

                    <span>03</span>

                    <h3>
                      Project
                    </h3>

                    <p>
                      DNA
                    </p>

                  </div>

                </div>


                {/* ===================================================
                    NODE 04 — KNOWLEDGE
                =================================================== */}

                <div className="intelligence-node node-four">

                  <div className="node-icon">
                    <FaBrain />
                  </div>

                  <div className="node-content">

                    <span>04</span>

                    <h3>
                      Institutional
                    </h3>

                    <p>
                      Knowledge
                    </p>

                  </div>

                </div>


                {/* ===================================================
                    NODE 05 — DECISION
                =================================================== */}

                <div className="intelligence-node node-five">

                  <div className="node-icon">
                    <FaLightbulb />
                  </div>

                  <div className="node-content">

                    <span>05</span>

                    <h3>
                      Decision
                    </h3>

                    <p>
                      Intelligence
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =========================================================
              ABOUT NEXUS
          ========================================================= */}

          <section id="about" className="about-nexus reveal">

            {/* Background decorative elements */}

            <div className="about-glow about-glow-one"></div>
            <div className="about-glow about-glow-two"></div>


            <div className="about-container">


              {/* =====================================================
                  TOP LABEL
              ===================================================== */}

              <div className="about-top">

                <div className="about-label">
                  ABOUT NEXUS
                </div>

                <div className="about-index">
                  01 / NEXUS
                </div>

              </div>


              {/* =====================================================
                  MAIN CONTENT
              ===================================================== */}

              <div className="about-main">


                {/* LEFT — TITLE */}

                <div className="about-heading reveal-left">

                  <h2>
                    A Campus
                    <br />
                    <span>That Thinks.</span>
                  </h2>

                </div>


                {/* RIGHT — DESCRIPTION */}

                <div className="about-description reveal-right">

                  <p className="about-lead">
                    NEXUS is an intelligence layer designed to connect
                    the people, knowledge, projects and opportunities
                    that shape a campus.
                  </p>

                  <p className="about-secondary">
                    Instead of treating every part of the institution
                    as a separate system, NEXUS brings them together
                    into one continuously evolving campus intelligence.
                  </p>

                </div>

              </div>


              {/* =====================================================
                  DIVIDER
              ===================================================== */}

              <div className="about-divider"></div>


              {/* =====================================================
                  THREE PILLARS
              ===================================================== */}

              <div className="about-pillars reveal-up">


                {/* ===================================================
                    PEOPLE
                =================================================== */}

                <article className="about-pillar reveal-card">

                  <div className="pillar-number">
                    01
                  </div>

                  <div className="pillar-content">

                    <div className="pillar-title">
                      PEOPLE
                    </div>

                    <h3>
                      Connect
                      <br />
                      People.
                    </h3>

                    <p>
                      Bring students, faculty and campus communities
                      into one connected ecosystem.
                    </p>

                  </div>

                  <div className="pillar-arrow">
                    ↗
                  </div>

                </article>


                {/* ===================================================
                    KNOWLEDGE
                =================================================== */}

                <article className="about-pillar reveal-card reveal-delay-1">

                  <div className="pillar-number">
                    02
                  </div>

                  <div className="pillar-content">

                    <div className="pillar-title">
                      KNOWLEDGE
                    </div>

                    <h3>
                      Connect
                      <br />
                      Knowledge.
                    </h3>

                    <p>
                      Make skills, research, projects and institutional
                      experience discoverable and connected.
                    </p>

                  </div>

                  <div className="pillar-arrow">
                    ↗
                  </div>

                </article>


                {/* ===================================================
                    POSSIBILITY
                =================================================== */}

                <article className="about-pillar about-pillar-featured reveal-card reveal-delay-2">

                  <div className="pillar-number">
                    03
                  </div>

                  <div className="pillar-content">

                    <div className="pillar-title">
                      POSSIBILITY
                    </div>

                    <h3>
                      Create
                      <br />
                      Possibility.
                    </h3>

                    <p>
                      Turn connections into opportunities, collaborations
                      and outcomes that move the campus forward.
                    </p>

                  </div>

                  <div className="pillar-arrow">
                    ↗
                  </div>

                </article>


              </div>


              {/* =====================================================
                  CLOSING STATEMENT
              ===================================================== */}

              <div className="about-closing reveal-up reveal-delay-2">

                <div className="closing-mark">
                  N
                </div>

                <div className="closing-content">

                  <div className="closing-label">
                    THE NEXUS VISION
                  </div>

                  <h3>
                    One campus.
                    <span>
                      One intelligence layer.
                    </span>
                  </h3>

                </div>

                <div className="closing-side">

                  <span>
                    BUILT FOR THE
                  </span>

                  <strong>
                    FUTURE OF CAMPUS
                  </strong>

                </div>

              </div>


            </div>

          </section>

          {/* =========================================================
              NEXUS — PREMIUM FOOTER
          ========================================================= */}

          <footer className="nexus-footer">

            <div className="footer-glow"></div>
            <div className="footer-grid"></div>

            <div className="footer-container">

              {/* =====================================================
                  TOP
              ===================================================== */}

              <div className="footer-top">

                {/* BRAND */}

                <div className="footer-brand">

                  <div className="footer-logo">
                    N
                  </div>

                  <div className="footer-brand-name">
                    NEXUS
                  </div>

                  <div className="footer-brand-subtitle">
                    CAMPUS INTELLIGENCE SYSTEM
                  </div>

                  <p>
                    Connecting people, knowledge,
                    projects and possibilities.
                  </p>

                </div>


                {/* NAVIGATION */}

                <div className="footer-navigation">

                  <div className="footer-column">

                    <span className="footer-column-title">
                      EXPLORE
                    </span>

                    <a href="#home">
                      Home
                    </a>

                    <a href="#ecosystem">
                      Ecosystem
                    </a>

                    <a href="#about">
                      About
                    </a>

                  </div>


                  <div className="footer-column">

                    <span className="footer-column-title">
                      INTELLIGENCE
                    </span>

                    <a href="#ecosystem">
                      Capabilities
                    </a>

                    <a href="#ecosystem">
                      Digital Twin
                    </a>

                    <a href="#ecosystem">
                      Knowledge Graph
                    </a>

                  </div>


                  <div className="footer-column">

                    <span className="footer-column-title">
                      CONNECT
                    </span>

                    <a href="#">
                      Contact
                    </a>

                    <a href="#">
                      Documentation
                    </a>

                    <a href="#">
                      GitHub
                    </a>

                  </div>

                </div>

              </div>


              {/* =====================================================
                  LARGE STATEMENT
              ===================================================== */}

              <div className="footer-statement">

                <div className="footer-statement-line"></div>

                <div className="footer-statement-label">
                  THE FUTURE OF CAMPUS INTELLIGENCE
                </div>

                <h2>
                  One Campus.
                  <span>
                    One Intelligence Layer.
                  </span>
                </h2>

              </div>


              {/* =====================================================
                  BOTTOM BAR
              ===================================================== */}

              <div className="footer-bottom">

                <div className="footer-copyright">
                  © 2026 NEXUS. ALL RIGHTS RESERVED.
                </div>


                <div className="footer-status">

                  <span className="status-dot"></span>

                  CAMPUS INTELLIGENCE SYSTEM

                </div>


                <div className="footer-credit">
                  BUILT FOR THE FUTURE
                </div>

              </div>

            </div>

          </footer>

      </main>

    </div>
  );
}


export default Landing;