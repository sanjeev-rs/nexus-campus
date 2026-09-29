import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./CampusLayout.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

function CampusLayout({ children }) {
  const location = useLocation();

  // Desktop sidebar collapse preference
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem("nexus_sidebar_collapsed") === "true";
    } catch {
      return false;
    }
  });

  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  // Automatically reset mobile drawer when route changes during render
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileOpen(false);
  }

  // Lock body scroll on mobile viewports while drawer is active
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("nexus_sidebar_collapsed", String(next));
      } catch {
        // Ignore local storage error
      }
      return next;
    });
  };

  const handleToggleMobile = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleCloseMobile = () => {
    setMobileOpen(false);
  };

  return (
    <div
      className={`campus-layout ${isCollapsed ? "is-collapsed" : ""}`}
      style={{
        "--sidebar-width": isCollapsed ? "78px" : "272px",
      }}
    >
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        mobileOpen={mobileOpen}
        onCloseMobile={handleCloseMobile}
      />

      <div className="campus-main">
        <Topbar
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
          onToggleMobile={handleToggleMobile}
        />

        <main className="campus-content" id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default CampusLayout;