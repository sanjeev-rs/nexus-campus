import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Bot,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Compass,
  FolderKanban,
  Home,
  Milestone,
  Network,
  PlusCircle,
  Settings,
  Target,
  TrendingUp,
  User,
  Users,
  X,
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
          title: "FACULTY PORTAL",
          items: [
            {
              label: "Overview",
              icon: Home,
              path: "/faculty",
            },
          ],
        },
      ];
    }

    if (currentRole === "management") {
      return [
        {
          title: "MANAGEMENT PORTAL",
          items: [
            {
              label: "Overview",
              icon: Home,
              path: "/management",
            },
          ],
        },
      ];
    }

    // Default: Student Portal
    return [
      {
        title: "MAIN",
        items: [
          {
            label: "Overview",
            icon: Home,
            path: "/student",
          },
          {
            label: "Intelligence",
            icon: Network,
            path: "/student/intelligence",
          },
          {
            label: "Projects",
            icon: FolderKanban,
            path: "/student/projects",
          },
          {
            label: "Knowledge",
            icon: BookOpen,
            path: "/student/knowledge",
          },
        ],
      },
      {
        title: "DEVELOPMENT",
        items: [
          {
            label: "Progress",
            icon: TrendingUp,
            path: "/student/progress",
          },
          {
            label: "Roadmap",
            icon: Milestone,
            path: "/student/roadmap",
          },
          {
            label: "Routine",
            icon: Calendar,
            path: "/student/routine",
          },
          {
            label: "Goals",
            icon: Target,
            path: "/student/goals",
          },
          {
            label: "AI Mentor",
            icon: Bot,
            path: "/student/ai-mentor",
          },
        ],
      },
      {
        title: "COLLABORATION",
        items: [
          {
            label: "Project Explorer",
            icon: Compass,
            path: "/student/projects/explore",
          },
          {
            label: "Mentor Network",
            icon: Users,
            path: "/student/projects/mentors",
          },
          {
            label: "Submit Project",
            icon: PlusCircle,
            path: "/student/projects/upload",
          },
          {
            label: "Community",
            icon: Users,
            path: "/student/community",
          },
        ],
      },
      {
        title: "ACCOUNT",
        items: [
          {
            label: "Profile",
            icon: User,
            path: "/student/profile",
          },
          {
            label: "Settings",
            icon: Settings,
            path: "/student/settings",
          },
        ],
      },
    ];
  }, [currentRole]);

  // Flattened items for precise longest-prefix active route matching
  const allNavItems = useMemo(() => {
    return navigationSections.flatMap((s) => s.items);
  }, [navigationSections]);

  /* =========================================================
     ACTIVE ROUTE MATCHING (NESTED AWARE)
     ========================================================= */

  const isItemActive = (itemPath) => {
    // Exact dashboard root matches
    if (itemPath === "/student") {
      return currentPath === "/student" || currentPath === "/student/dashboard";
    }
    if (itemPath === "/faculty") {
      return currentPath === "/faculty" || currentPath === "/faculty/dashboard";
    }
    if (itemPath === "/management") {
      return (
        currentPath === "/management" || currentPath === "/management/dashboard"
      );
    }

    // Exact path match
    if (currentPath === itemPath) return true;

    // Subpath prefix match (e.g. /student/knowledge/research highlights Knowledge)
    if (currentPath.startsWith(itemPath + "/")) {
      // If there is another navigation item with a longer, more specific matching path, prefer that
      const hasMoreSpecific = allNavItems.some(
        (other) =>
          other.path !== itemPath &&
          other.path.length > itemPath.length &&
          (currentPath === other.path ||
            currentPath.startsWith(other.path + "/"))
      );
      return !hasMoreSpecific;
    }

    return false;
  };

  const handleNavigate = (path) => {
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
          {navigationSections.map((section) => (
            <div className="sidebar-section" key={section.title}>
              {!isCollapsed ? (
                <span className="sidebar-section-title">{section.title}</span>
              ) : (
                <div className="sidebar-section-divider" aria-hidden="true" />
              )}

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
                      <Icon size={19} strokeWidth={1.8} />

                      {!isCollapsed && <span>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
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