import { useCallback, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  Copy,
  Database,
  FileCheck,
  FileText,
  Flag,
  FolderKanban,
  GraduationCap,
  History,
  Home,
  Layers,
  Lightbulb,
  Milestone,
  Network,
  PlusCircle,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({
  isCollapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Determine current active role from pathname
  const currentRole = useMemo(() => {
    if (currentPath.startsWith("/faculty")) return "faculty";
    if (currentPath.startsWith("/management")) return "management";
    return "student";
  }, [currentPath]);

  /* =========================================================
     ROLE-BASED NAVIGATION CONFIGURATION
     All links map strictly to real, registered routes.
     ========================================================= */

  const navigationSections = useMemo(() => {
    if (currentRole === "faculty") {
      return [
        {
          id: "fac-intelligence",
          title: "FACULTY INTELLIGENCE",
          items: [
            { label: "Overview", icon: Home, path: "/faculty" },
          ],
        },
        {
          id: "fac-student-intel",
          title: "STUDENT INTELLIGENCE",
          items: [
            { label: "My Advisees", icon: Users, path: "/faculty/advisees" },
            { label: "Student Growth", icon: TrendingUp, path: "/faculty/growth" },
            { label: "Skill & Competency", icon: Award, path: "/faculty/skills" },
            { label: "At-Risk Students", icon: AlertCircle, path: "/faculty/at-risk" },
            { label: "Knowledge DNA", icon: Share2, path: "/faculty/knowledge-dna" },
          ],
        },
        {
          id: "fac-project-research",
          title: "PROJECT & RESEARCH",
          items: [
            { label: "Project Reviews", icon: FileCheck, path: "/faculty/reviews" },
            { label: "Project DNA", icon: Layers, path: "/faculty/project-dna" },
            { label: "Research & Expertise", icon: BookOpen, path: "/faculty/research" },
            { label: "Project Discovery", icon: Compass, path: "/faculty/project-discovery" },
            { label: "Mentor / Project Matching", icon: Network, path: "/faculty/matching" },
          ],
        },
        {
          id: "fac-mentoring",
          title: "MENTORING",
          items: [
            { label: "Interventions", icon: ShieldCheck, path: "/faculty/interventions" },
            { label: "Advising & Office Hours", icon: Calendar, path: "/faculty/advising" },
            { label: "Mentoring History", icon: History, path: "/faculty/mentoring-history" },
            { label: "Recommendations", icon: Sparkles, path: "/faculty/recommendations" },
          ],
        },
        {
          id: "fac-knowledge",
          title: "KNOWLEDGE",
          items: [
            { label: "Failure Memory", icon: AlertTriangle, path: "/faculty/failure-memory" },
            { label: "Campus Knowledge Graph", icon: Network, path: "/faculty/knowledge-graph" },
            { label: "Technical Problems", icon: Wrench, path: "/faculty/technical-problems" },
            { label: "Institutional Learning", icon: GraduationCap, path: "/faculty/institutional-learning" },
          ],
        },
        {
          id: "fac-workspace",
          title: "WORKSPACE",
          items: [
            { label: "Notifications", icon: Bell, path: "/faculty/notifications" },
            { label: "Faculty Profile", icon: User, path: "/faculty/profile" },
          ],
        },
      ];
    }

    if (currentRole === "management") {
      return [
        {
          id: "mgt-intelligence",
          title: "MANAGEMENT INTELLIGENCE",
          items: [
            { label: "Overview", icon: Home, path: "/management" },
          ],
        },
        {
          id: "mgt-campus-intel",
          title: "CAMPUS INTELLIGENCE",
          items: [
            { label: "Campus Skill Radar", icon: Target, path: "/management/skill-radar" },
            { label: "Student Growth", icon: TrendingUp, path: "/management/student-growth" },
            { label: "Institutional Activity", icon: Activity, path: "/management/activity" },
            { label: "Capability & Skill Gaps", icon: Award, path: "/management/skill-gaps" },
            { label: "Technology Trends", icon: Sparkles, path: "/management/technology-trends" },
          ],
        },
        {
          id: "mgt-academic-intel",
          title: "ACADEMIC INTELLIGENCE",
          items: [
            { label: "Department Performance", icon: Building2, path: "/management/departments" },
            { label: "Academic Outcomes", icon: GraduationCap, path: "/management/outcomes" },
            { label: "Program Effectiveness", icon: FileCheck, path: "/management/programs" },
            { label: "Intervention Analytics", icon: ShieldCheck, path: "/management/interventions" },
          ],
        },
        {
          id: "mgt-project-research",
          title: "PROJECT & RESEARCH",
          items: [
            { label: "Project Ecosystem", icon: FolderKanban, path: "/management/projects" },
            { label: "Project DNA", icon: Layers, path: "/management/project-dna" },
            { label: "Research Intelligence", icon: BookOpen, path: "/management/research" },
            { label: "Faculty Expertise", icon: Users, path: "/management/faculty-expertise" },
            { label: "IP & Innovation", icon: Lightbulb, path: "/management/ip" },
            { label: "Project Duplication", icon: Copy, path: "/management/duplication" },
          ],
        },
        {
          id: "mgt-strategic-intel",
          title: "STRATEGIC INTELLIGENCE",
          items: [
            { label: "Decision Support", icon: Compass, path: "/management/decision-support" },
            { label: "Campus Missions", icon: Flag, path: "/management/missions" },
            { label: "Opportunity Intelligence", icon: Briefcase, path: "/management/opportunities" },
            { label: "Workshop & Training Planning", icon: Calendar, path: "/management/training" },
            { label: "Resource Allocation", icon: BarChart3, path: "/management/resources" },
          ],
        },
        {
          id: "mgt-institutional-memory",
          title: "INSTITUTIONAL MEMORY",
          items: [
            { label: "Failure Memory", icon: AlertTriangle, path: "/management/failure-memory" },
            { label: "Knowledge Graph", icon: Network, path: "/management/knowledge-graph" },
            { label: "Institutional Learning", icon: Zap, path: "/management/institutional-learning" },
            { label: "Knowledge Retention", icon: Database, path: "/management/knowledge-retention" },
          ],
        },
        {
          id: "mgt-reporting",
          title: "REPORTING & OVERSIGHT",
          items: [
            { label: "Executive Reports", icon: FileText, path: "/management/reports" },
            { label: "Analytics", icon: BarChart3, path: "/management/analytics" },
            { label: "Alerts & Attention", icon: AlertCircle, path: "/management/alerts" },
          ],
        },
      ];
    }

    // Default: Student Portal (Exact existing structure preserved)
    return [
      {
        id: "stu-main",
        title: "MAIN",
        items: [
          { label: "Overview", icon: Home, path: "/student" },
          { label: "Intelligence", icon: Network, path: "/student/intelligence" },
          { label: "Projects", icon: FolderKanban, path: "/student/projects" },
          { label: "Knowledge", icon: BookOpen, path: "/student/knowledge" },
        ],
      },
      {
        id: "stu-dev",
        title: "DEVELOPMENT",
        items: [
          { label: "Progress", icon: TrendingUp, path: "/student/progress" },
          { label: "Roadmap", icon: Milestone, path: "/student/roadmap" },
          { label: "Routine", icon: Calendar, path: "/student/routine" },
          { label: "Goals", icon: Target, path: "/student/goals" },
          { label: "AI Mentor", icon: Bot, path: "/student/ai-mentor" },
        ],
      },
      {
        id: "stu-collab",
        title: "COLLABORATION",
        items: [
          { label: "Project Explorer", icon: Compass, path: "/student/projects/explore" },
          { label: "Mentor Network", icon: Users, path: "/student/projects/mentors" },
          { label: "Submit Project", icon: PlusCircle, path: "/student/projects/upload" },
          { label: "Community", icon: Users, path: "/student/community" },
        ],
      },
      {
        id: "stu-account",
        title: "ACCOUNT",
        items: [
          { label: "Profile", icon: User, path: "/student/profile" },
          { label: "Settings", icon: Settings, path: "/student/settings" },
        ],
      },
    ];
  }, [currentRole]);

  // Manual toggle overrides for section groups
  const [manualToggles, setManualToggles] = useState({});
  const [prevRole, setPrevRole] = useState(currentRole);

  if (prevRole !== currentRole) {
    setPrevRole(currentRole);
    setManualToggles({});
  }

  // Flattened items for precise longest-prefix active route matching
  const allNavItems = useMemo(() => {
    return navigationSections.flatMap((s) => s.items);
  }, [navigationSections]);

  /* =========================================================
     ACTIVE ROUTE MATCHING (NESTED AWARE)
     ========================================================= */

  const isItemActive = useCallback(
    (itemPath) => {
      // Exact dashboard root matches
      if (itemPath === "/student") {
        return currentPath === "/student" || currentPath === "/student/dashboard";
      }
      if (itemPath === "/faculty") {
        return currentPath === "/faculty" || currentPath === "/faculty/dashboard";
      }
      if (itemPath === "/management") {
        return currentPath === "/management" || currentPath === "/management/dashboard";
      }

      // Exact path match
      if (currentPath === itemPath) return true;

      // Subpath prefix match (e.g. /student/knowledge/research highlights Knowledge)
      if (currentPath.startsWith(itemPath + "/")) {
        const hasMoreSpecific = allNavItems.some(
          (other) =>
            other.path !== itemPath &&
            other.path.length > itemPath.length &&
            (currentPath === other.path || currentPath.startsWith(other.path + "/"))
        );
        return !hasMoreSpecific;
      }

      return false;
    },
    [currentPath, allNavItems]
  );

  // Identify the section containing the active route
  const activeSectionId = useMemo(() => {
    const activeSec = navigationSections.find((sec) =>
      sec.items.some((item) => isItemActive(item.path))
    );
    return activeSec ? activeSec.id : (navigationSections[0]?.id || "");
  }, [navigationSections, isItemActive]);

  const isSectionCollapsed = (sectionId) => {
    if (manualToggles[sectionId] !== undefined) {
      return manualToggles[sectionId];
    }
    // For Faculty and Management: auto-expand active group, collapse others by default
    if (currentRole === "faculty" || currentRole === "management") {
      return sectionId !== activeSectionId;
    }
    // Student portal default: all sections open
    return false;
  };

  const toggleSection = (sectionId) => {
    setManualToggles((prev) => {
      const currentCollapsed = isSectionCollapsed(sectionId);
      return {
        ...prev,
        [sectionId]: !currentCollapsed,
      };
    });
  };

  const handleNavigate = (path) => {
    // When navigating to a new route, clear manual toggles so the target group expands smoothly
    setManualToggles({});
    navigate(path);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* MOBILE BACKDROP OVERLAY */}
      <div
        className={`sidebar-backdrop ${mobileOpen ? "visible" : ""}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`nexus-sidebar ${isCollapsed ? "collapsed" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
        aria-label="Campus Navigation"
      >
        {/* BRAND HEADER */}
        <div className="sidebar-brand">
          <button
            type="button"
            className="sidebar-brand-btn"
            onClick={() => handleNavigate(`/${currentRole}`)}
            title="NEXUS Campus Intelligence"
          >
            <div className="sidebar-logo">N</div>

            {!isCollapsed && (
              <div className="sidebar-brand-text">
                <strong>NEXUS</strong>
                <span>
                  {currentRole === "faculty"
                    ? "FACULTY INTELLIGENCE"
                    : currentRole === "management"
                    ? "MANAGEMENT INTELLIGENCE"
                    : "CAMPUS INTELLIGENCE"}
                </span>
              </div>
            )}
          </button>

          {/* MOBILE CLOSE BUTTON */}
          <button
            type="button"
            className="sidebar-mobile-close"
            onClick={onCloseMobile}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* NAVIGATION CONTENT */}
        <div className="sidebar-content">
          {navigationSections.map((section) => {
            const isGroupCollapsed = isSectionCollapsed(section.id);
            const hasActiveChild = section.items.some((item) => isItemActive(item.path));

            return (
              <div className="sidebar-section" key={section.id || section.title}>
                {!isCollapsed ? (
                  <button
                    type="button"
                    className={`sidebar-section-header ${hasActiveChild ? "has-active" : ""}`}
                    onClick={() => toggleSection(section.id)}
                    title={`Toggle ${section.title}`}
                    aria-expanded={!isGroupCollapsed}
                  >
                    <span>{section.title}</span>
                    <ChevronDown
                      size={13}
                      className={`sidebar-section-chevron ${isGroupCollapsed ? "collapsed" : ""}`}
                    />
                  </button>
                ) : (
                  <div className="sidebar-section-divider" aria-hidden="true" />
                )}

                {(!isGroupCollapsed || isCollapsed) && (
                  <div className="sidebar-nav">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const active = isItemActive(item.path);

                      return (
                        <button
                          key={item.path}
                          type="button"
                          className={`sidebar-item ${active ? "active" : ""}`}
                          onClick={() => handleNavigate(item.path)}
                          aria-current={active ? "page" : undefined}
                          title={isCollapsed ? item.label : undefined}
                          aria-label={item.label}
                        >
                          <Icon size={18} strokeWidth={1.8} />
                          {!isCollapsed && <span>{item.label}</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM UTILITY / SYSTEM STATUS */}
        <div className="sidebar-bottom">
          <div className="sidebar-campus-status" title="NEXUS System Operational">
            <span className="status-indicator" aria-hidden="true" />

            {!isCollapsed && (
              <div>
                <strong>Campus Intelligence</strong>
                <span>System operational</span>
              </div>
            )}
          </div>

          {/* DESKTOP COLLAPSE TOGGLE */}
          {onToggleCollapse && (
            <button
              type="button"
              className="sidebar-collapse-btn"
              onClick={onToggleCollapse}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight size={16} />
              ) : (
                <>
                  <ChevronLeft size={16} />
                  <span>Collapse</span>
                </>
              )}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;