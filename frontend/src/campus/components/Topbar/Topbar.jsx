import "./Topbar.css";

import {
  ChevronDown,
  Command,
} from "lucide-react";

function Topbar() {

  return (
    <header className="nexus-topbar">

      <div className="topbar-title">

        <span>
          NEXUS / STUDENT
        </span>

        <h1>
          Campus Intelligence
        </h1>

      </div>


      <div className="topbar-actions">

        <button className="topbar-command">
          <Command size={16} />
        </button>


        <button className="topbar-user">

          <div className="topbar-avatar">
            U
          </div>

          <div className="topbar-user-info">

            <strong>
              Campus User
            </strong>

            <span>
              Student
            </span>

          </div>

          <ChevronDown size={15} />

        </button>

      </div>

    </header>
  );
}

export default Topbar;