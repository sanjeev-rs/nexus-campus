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

// =========================================================
// PROJECT PAGES
// =========================================================

import ProjectDetails from "./campus/pages/Student/ProjectDetails/ProjectDetails";
import ProjectExplorer from "./campus/pages/Student/ProjectExplorer/ProjectExplorer";
import ProjectUpload from "./campus/pages/Student/ProjectUpload/ProjectUpload";
import MentorNetwork from "./campus/pages/Student/MentorNetwork/MentorNetwork";

// =========================================================
// KNOWLEDGE PAGES
// =========================================================

import Knowledge from "./campus/pages/Student/Knowledge/Knowledge";
import KnowledgeDetail from "./campus/pages/Student/Knowledge/KnowledgeDetail";
import KnowledgeResearch from "./campus/pages/Student/Knowledge/KnowledgeResearch";
import KnowledgeGuides from "./campus/pages/Student/Knowledge/KnowledgeGuides";
import KnowledgeTechnologies from "./campus/pages/Student/Knowledge/KnowledgeTechnologies";
import KnowledgeFaculty from "./campus/pages/Student/Knowledge/KnowledgeFaculty";
import KnowledgeStudentWork from "./campus/pages/Student/Knowledge/KnowledgeStudentWork";

// =========================================================
// FACULTY / MANAGEMENT
// =========================================================

import FacultyDashboard from "./campus/pages/Faculty/FacultyDashboard";
import ManagementDashboard from "./campus/pages/Management/ManagementDashboard";


// =========================================================
// APP
// =========================================================

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
            STUDENT
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


        {/* =================================================
            STUDENT INTELLIGENCE
            ================================================= */}

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


        {/* =================================================
            STUDENT PROJECTS
            ================================================= */}

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


        {/* =================================================
            PROJECT EXPLORER
            ================================================= */}

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


        {/* =================================================
            PROJECT UPLOAD
            ================================================= */}

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


        {/* =================================================
            MENTOR NETWORK
            ================================================= */}

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


        {/* =================================================
            PROJECT DETAILS
            ================================================= */}

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
            KNOWLEDGE HOME
            ================================================= */}

        <Route
          path="/student/knowledge"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <Knowledge />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            KNOWLEDGE — RESEARCH
            ================================================= */}

        <Route
          path="/student/knowledge/research"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <KnowledgeResearch />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            KNOWLEDGE — GUIDES
            ================================================= */}

        <Route
          path="/student/knowledge/guides"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <KnowledgeGuides />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            KNOWLEDGE — TECHNOLOGIES
            ================================================= */}

        <Route
          path="/student/knowledge/technologies"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <KnowledgeTechnologies />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            KNOWLEDGE — FACULTY EXPERTISE
            ================================================= */}

        <Route
          path="/student/knowledge/faculty"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <KnowledgeFaculty />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            KNOWLEDGE — STUDENT WORK
            ================================================= */}

        <Route
          path="/student/knowledge/student-work"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <KnowledgeStudentWork />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/knowledge/item/:slug"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <KnowledgeDetail />
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
