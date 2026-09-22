import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


// =========================================================
// LANDING / AUTH
// =========================================================

import Landing from "./campus/pages/Landing/Landing";
import Login from "./campus/pages/Auth/Login";
import ProtectedRoute from "./campus/pages/Auth/ProtectedRoute";


// =========================================================
// CAMPUS LAYOUT
// =========================================================

import CampusLayout from "./campus/layouts/CampusLayout/CampusLayout";


// =========================================================
// STUDENT PAGES
// =========================================================

import StudentDashboard from "./campus/pages/Student/StudentDashboard";
import StudentIntelligence from "./campus/pages/Student/StudentIntelligence";
import StudentProjects from "./campus/pages/Student/StudentProjects";
import ProjectDetails from "./campus/pages/Student/ProjectDetails/ProjectDetails";

// =========================================================
// PROJECT SUB-PAGES
// =========================================================

import ProjectExplorer from "./campus/pages/Student/ProjectExplorer/ProjectExplorer";
import ProjectUpload from "./campus/pages/Student/ProjectUpload/ProjectUpload";
import MentorNetwork from "./campus/pages/Student/MentorNetwork/MentorNetwork";


// =========================================================
// FACULTY / MANAGEMENT
// =========================================================

import FacultyDashboard from "./campus/pages/Faculty/FacultyDashboard";
import ManagementDashboard from "./campus/pages/Management/ManagementDashboard";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =================================================
            LANDING
            ================================================= */}

        <Route
          path="/"
          element={<Landing />}
        />


        {/* =================================================
            LOGIN
            ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =================================================
            STUDENT DASHBOARD
            ================================================= */}

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <StudentDashboard />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/intelligence"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <StudentIntelligence />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/projects"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <StudentProjects />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/projects/explore"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <ProjectExplorer />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/projects/upload"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <ProjectUpload />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/projects/mentors"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <MentorNetwork />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/projects/explore/:projectId"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <ProjectDetails />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            FACULTY
            ================================================= */}

        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <FacultyDashboard />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            MANAGEMENT
            ================================================= */}

        <Route
          path="/management"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <ManagementDashboard />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            UNKNOWN ROUTES
            ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;