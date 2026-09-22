import CampusLayout from "../../layouts/CampusLayout/CampusLayout";
import "./FacultyDashboard.css";

function FacultyDashboard() {
  return (
    <CampusLayout role="Faculty">

      <div className="dashboard-page faculty-dashboard">

        <div className="dashboard-welcome">
          <span className="dashboard-eyebrow">
            FACULTY INTELLIGENCE
          </span>

          <h1>
            Welcome back.
          </h1>

          <p>
            Access student insights, projects, academic intelligence
            and campus opportunities.
          </p>
        </div>

      </div>

    </CampusLayout>
  );
}

export default FacultyDashboard;