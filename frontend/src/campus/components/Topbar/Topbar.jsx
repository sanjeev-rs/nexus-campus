import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  User,
} from "lucide-react";

import "./Topbar.css";

function getStoredUser() {
  try {
    const stored = localStorage.getItem("nexusAuth");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        name: parsed.name || "Campus User",
        role: parsed.role || "student",
        email: parsed.email || "",
        picture: parsed.picture || null,
      };
    }
  } catch {
    // Fallback on corrupt JSON
  }
  return {
    name: "Campus User",
    role: "student",
    email: "",
    picture: null,
  };
}

function Topbar({
  isCollapsed = false,
  onToggleCollapse,
  onToggleMobile,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(currentPath);
  const dropdownRef = useRef(null);

  // Reset dropdown when route changes
  if (prevPath !== currentPath) {
    setPrevPath(currentPath);
    setDropdownOpen(false);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownOpen]);

  /* =========================================================
     CONTEXTUAL HEADER TITLE & EYEBROW MAPPING
     ========================================================= */

  const pageMeta = useMemo(() => {
    if (currentPath.startsWith("/management")) {
      return { eyebrow: "NEXUS / MANAGEMENT", title: "Institutional Intelligence" };
    }

    if (currentPath.startsWith("/faculty")) {
      return { eyebrow: "NEXUS / FACULTY", title: "Academic Intelligence" };
    }

    if (currentPath.startsWith("/student/knowledge")) {
      if (currentPath.startsWith("/student/knowledge/research")) return { eyebrow: "NEXUS / KNOWLEDGE", title: "Research Network" };
      if (currentPath.startsWith("/student/knowledge/guides")) return { eyebrow: "NEXUS / KNOWLEDGE", title: "Campus Guides" };
      if (currentPath.startsWith("/student/knowledge/technologies")) return { eyebrow: "NEXUS / KNOWLEDGE", title: "Technologies" };
      if (currentPath.startsWith("/student/knowledge/faculty")) return { eyebrow: "NEXUS / KNOWLEDGE", title: "Faculty Expertise" };
      if (currentPath.startsWith("/student/knowledge/student-work")) return { eyebrow: "NEXUS / KNOWLEDGE", title: "Student Work" };
      if (currentPath.startsWith("/student/knowledge/item")) return { eyebrow: "NEXUS / KNOWLEDGE", title: "Knowledge Repository" };
      return { eyebrow: "NEXUS / KNOWLEDGE", title: "Campus Knowledge" };
    }

    if (currentPath.startsWith("/student/projects")) {
      if (currentPath.startsWith("/student/projects/explore/")) return { eyebrow: "NEXUS / PROJECTS", title: "Project Details" };
      if (currentPath.startsWith("/student/projects/explore")) return { eyebrow: "NEXUS / PROJECTS", title: "Project Explorer" };
      if (currentPath.startsWith("/student/projects/upload")) return { eyebrow: "NEXUS / PROJECTS", title: "Project Submission" };
      if (currentPath.startsWith("/student/projects/mentors")) return { eyebrow: "NEXUS / PROJECTS", title: "Mentor Network" };
      // Dynamic project detail: /student/projects/:id
      const projectPathParts = currentPath.split("/").filter(Boolean);
      if (projectPathParts.length === 3 && projectPathParts[1] === "projects") {
        return { eyebrow: "NEXUS / PROJECTS", title: "Project Details" };
      }
      return { eyebrow: "NEXUS / PROJECTS", title: "Campus Projects" };
    }

    if (currentPath.startsWith("/student/intelligence")) return { eyebrow: "NEXUS / INTELLIGENCE", title: "Student Intelligence" };
    if (currentPath.startsWith("/student/profile")) return { eyebrow: "NEXUS / STUDENT", title: "Your Profile" };
    if (currentPath.startsWith("/student/goals")) return { eyebrow: "NEXUS / DEVELOPMENT", title: "Development Path" };
    if (currentPath.startsWith("/student/progress")) return { eyebrow: "NEXUS / DEVELOPMENT", title: "Your Progress" };
    if (currentPath.startsWith("/student/roadmap")) return { eyebrow: "NEXUS / DEVELOPMENT", title: "Academic & Career Roadmap" };
    if (currentPath.startsWith("/student/routine")) return { eyebrow: "NEXUS / DEVELOPMENT", title: "Campus Routine & Schedule" };
    if (currentPath.startsWith("/student/ai-mentor")) return { eyebrow: "NEXUS / AI MENTOR", title: "Your AI Mentor" };
    if (currentPath.startsWith("/student/community")) return { eyebrow: "NEXUS / STUDENT", title: "Campus Community" };
    if (currentPath.startsWith("/student/settings")) return { eyebrow: "NEXUS / STUDENT", title: "Settings" };

    return { eyebrow: "NEXUS / STUDENT", title: "Campus Intelligence" };
  }, [currentPath]);

  /* =========================================================
     SESSION / AUTH CONTEXT
     ========================================================= */

  const user = getStoredUser();

  const formatRole = (role) => {
    if (role === "faculty") return "Faculty";
    if (role === "management") return "Management";
    return "Student";
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("nexusAuth");
    } catch {
      // Ignore
    }
    navigate("/login", { replace: true });
  };

  const avatarInitial = user.name.charAt(0).toUpperCase() || "U";

  return (
    <header className="nexus-topbar" role="banner">
      {/* LEFT: MOBILE TOGGLE, DESKTOP COLLAPSE & TITLE */}
      <div className="topbar-left">
        {/* Mobile drawer trigger */}
        <button
          type="button"
          className="topbar-mobile-trigger"
          onClick={onToggleMobile}
          aria-label="Open navigation menu"
        >
          <Menu size={21} />
        </button>

        {/* Desktop sidebar collapse trigger */}
        {onToggleCollapse && (
          <button
            type="button"
            className="topbar-desktop-collapse"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeftOpen size={19} />
            ) : (
              <PanelLeftClose size={19} />
            )}
          </button>
        )}

        <div className="topbar-title">
          <span>{pageMeta.eyebrow}</span>
          <h1>{pageMeta.title}</h1>
        </div>
      </div>

      {/* RIGHT: COMMAND / SEARCH & USER PROFILE */}
      <div className="topbar-actions">
        {/* Quick Search Shortcut */}
        <button
          type="button"
          className="topbar-command"
          onClick={() => navigate("/student/knowledge")}
          aria-label="Search campus knowledge"
          title="Search campus knowledge (Press /)"
        >
          <Search size={16} />
          <span className="topbar-command-label">Search</span>
          <kbd className="topbar-shortcut">/</kbd>
        </button>

        {/* User Account / Profile Dropdown */}
        <div className="topbar-user-wrapper" ref={dropdownRef}>
          <button
            type="button"
            className={`topbar-user ${dropdownOpen ? "active" : ""}`}
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            aria-label="User account menu"
          >
            <div className="topbar-avatar" aria-hidden="true">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="topbar-avatar-img"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span>{avatarInitial}</span>
              )}
            </div>

            <div className="topbar-user-info">
              <strong>{user.name}</strong>
              <span>{formatRole(user.role)}</span>
            </div>

            <ChevronDown
              size={15}
              className={`topbar-chevron ${dropdownOpen ? "open" : ""}`}
            />
          </button>

          {/* DROPDOWN MENU */}
          {dropdownOpen && (
            <div className="topbar-dropdown" role="menu">
              <div className="topbar-dropdown-header">
                <strong>{user.name}</strong>
                <span>{user.email || `${user.role}@nexus.edu`}</span>
                <div className="topbar-role-pill">
                  {formatRole(user.role)} Account
                </div>
              </div>

              <div className="topbar-dropdown-divider" />

              <div className="topbar-dropdown-links">
                <button
                  type="button"
                  role="menuitem"
                  className="topbar-dropdown-item"
                  onClick={() => {
                    navigate(`/${user.role}`);
                    setDropdownOpen(false);
                  }}
                >
                  <User size={15} />
                  <span>Dashboard</span>
                </button>

                {user.role === "student" && (
                  <>
                    <button
                      type="button"
                      role="menuitem"
                      className="topbar-dropdown-item"
                      onClick={() => {
                        navigate("/student/profile");
                        setDropdownOpen(false);
                      }}
                    >
                      <User size={15} />
                      <span>My Profile</span>
                    </button>

                    <button
                      type="button"
                      role="menuitem"
                      className="topbar-dropdown-item"
                      onClick={() => {
                        navigate("/student/settings");
                        setDropdownOpen(false);
                      }}
                    >
                      <Settings size={15} />
                      <span>Settings</span>
                    </button>
                  </>
                )}
              </div>

              <div className="topbar-dropdown-divider" />

              <button
                type="button"
                role="menuitem"
                className="topbar-dropdown-item logout"
                onClick={handleLogout}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;