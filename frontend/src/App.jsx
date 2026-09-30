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
// NEW STUDENT PAGES (Phase 4)
// =========================================================

import StudentProfile from "./campus/pages/Student/StudentProfile/StudentProfile";
import StudentGoals from "./campus/pages/Student/StudentGoals/StudentGoals";
import StudentProgress from "./campus/pages/Student/StudentProgress/StudentProgress";
import StudentRoadmap from "./campus/pages/Student/StudentRoadmap/StudentRoadmap";
import StudentRoutine from "./campus/pages/Student/StudentRoutine/StudentRoutine";
import AIMentor from "./campus/pages/Student/AIMentor/AIMentor";
import StudentCommunity from "./campus/pages/Student/StudentCommunity/StudentCommunity";
import StudentSettings from "./campus/pages/Student/StudentSettings/StudentSettings";

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

        <Route
          path="/student/dashboard"
          element={
            <Navigate
              to="/student"
              replace
            />
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

        <Route
          path="/student/projects/:projectId"
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
            STUDENT PROFILE
            ================================================= */}

        <Route
          path="/student/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <StudentProfile />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            STUDENT GOALS
            ================================================= */}

        <Route
          path="/student/goals"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <StudentGoals />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            STUDENT PROGRESS
            ================================================= */}

        <Route
          path="/student/progress"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <StudentProgress />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            STUDENT ROADMAP
            ================================================= */}

        <Route
          path="/student/roadmap"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <StudentRoadmap />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            STUDENT ROUTINE
            ================================================= */}

        <Route
          path="/student/routine"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <StudentRoutine />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            AI MENTOR
            ================================================= */}

        <Route
          path="/student/ai-mentor"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <AIMentor />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            COMMUNITY
            ================================================= */}

        <Route
          path="/student/community"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <StudentCommunity />
              </CampusLayout>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            SETTINGS
            ================================================= */}

        <Route
          path="/student/settings"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <CampusLayout>
                <StudentSettings />
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

        <Route
          path="/faculty/dashboard"
          element={
            <Navigate
              to="/faculty"
              replace
            />
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

        <Route
          path="/management/dashboard"
          element={
            <Navigate
              to="/management"
              replace
            />
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
