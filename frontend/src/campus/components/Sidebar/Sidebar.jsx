import "./Sidebar.css";

import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  FolderKanban,
  Home,
  Network,
  Users,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";


function Sidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;


  /* =========================================================
     MAIN NAVIGATION
     ========================================================= */

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


  /* =========================================================
     CAMPUS NAVIGATION
     ========================================================= */

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


  /* =========================================================
     ACTIVE ROUTE
     ========================================================= */

  const isActive = (path) => {

    /*
      Overview should only be active on /student.
      This prevents Overview from remaining active
      when visiting /student/intelligence.
    */

    if (path === "/student") {
      return currentPath === "/student";
    }

    /*
      Other pages use an exact route match.
    */

    return currentPath === path;
  };


  /* =========================================================
     NAVIGATION RENDERER
     ========================================================= */

  const renderNavigation = (items) => {

    return (

      <div className="sidebar-nav">

        {items.map((item) => {

          const Icon = item.icon;

          const active = isActive(item.path);


          return (

            <button
              key={item.label}
              type="button"
              className={`sidebar-item ${
                active ? "active" : ""
              }`}
              onClick={() => navigate(item.path)}
              aria-current={active ? "page" : undefined}
            >

              <Icon
                size={18}
                strokeWidth={1.8}
              />

              <span>
                {item.label}
              </span>

            </button>

          );

        })}

      </div>

    );

  };


  /* =========================================================
     SIDEBAR
     ========================================================= */

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


        {/* MAIN */}

        <div className="sidebar-section">

          <span className="sidebar-section-title">
            MAIN
          </span>

          {renderNavigation(mainNavigation)}

        </div>


        {/* CAMPUS */}

        <div className="sidebar-section">

          <span className="sidebar-section-title">
            CAMPUS
          </span>

          {renderNavigation(campusNavigation)}

        </div>

      </div>


      {/* =====================================================
          SYSTEM STATUS
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