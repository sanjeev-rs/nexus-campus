import "./CampusLayout.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";

function CampusLayout({ children }) {
  return (
    <div className="campus-layout">

      <Sidebar />

      <div className="campus-main">

        <Topbar />

        <main className="campus-content">
          {children}
        </main>

      </div>

    </div>
  );
}

export default CampusLayout;