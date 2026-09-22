import CampusLayout from "../../layouts/CampusLayout/CampusLayout";
import "./ManagementDashboard.css";

function ManagementDashboard() {
  return (
    <CampusLayout role="Management">

      <div className="dashboard-page management-dashboard">

        <div className="dashboard-welcome">
          <span className="dashboard-eyebrow">
            MANAGEMENT INTELLIGENCE
          </span>

          <h1>
            Welcome back.
          </h1>

          <p>
            Understand the campus through institutional intelligence,
            analytics, projects and decision insights.
          </p>
        </div>

      </div>

    </CampusLayout>
  );
}

export default ManagementDashboard;