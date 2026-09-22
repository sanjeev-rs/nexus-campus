import "./Sidebar.css";

import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Home,
  Network,
  Users,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

function Sidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;


  const mainNavigation = [
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
  ];


  const campusNavigation = [
    {
      label: "People",
      icon: Users,
      path: "/student/people",
    },
    {
      label: "Opportunities",
      icon: BriefcaseBusiness,
      path: "/student/opportunities",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      path: "/student/analytics",
    },
  ];


  const renderNavigation = (items) => (
    <div className="sidebar-nav">

      {items.map((item) => {

        const Icon = item.icon;

        const active =
          currentPath === item.path;

        return (
          <button
            key={item.label}
            className={`sidebar-item ${
              active ? "active" : ""
            }`}
            onClick={() => navigate(item.path)}
          >

            <Icon size={18} />

            <span>
              {item.label}
            </span>

          </button>
        );

      })}

    </div>
  );


  return (
    <aside className="nexus-sidebar">

      {/* =====================================================
          BRAND
      ===================================================== */}

      <div className="sidebar-brand">

        <div className="sidebar-logo">
          N
        </div>

        <div className="sidebar-brand-text">

          <strong>
            NEXUS
          </strong>

          <span>
            CAMPUS INTELLIGENCE
          </span>

        </div>

      </div>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <div className="sidebar-content">

        <div className="sidebar-section">

          <span className="sidebar-section-title">
            MAIN
          </span>

          {renderNavigation(mainNavigation)}

        </div>


        <div className="sidebar-section">

          <span className="sidebar-section-title">
            CAMPUS
          </span>

          {renderNavigation(campusNavigation)}

        </div>

      </div>


      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <div className="sidebar-bottom">

        <div className="sidebar-campus-status">

          <span className="status-indicator"></span>

          <div>
            <strong>
              Campus Intelligence
            </strong>

            <span>
              System operational
            </span>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;