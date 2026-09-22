import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Landing from "./campus/pages/Landing/Landing";
import Login from "./campus/pages/Auth/Login";

import CampusLayout from "./campus/layouts/CampusLayout/CampusLayout";

import StudentDashboard from "./campus/pages/Student/StudentDashboard";
import FacultyDashboard from "./campus/pages/Faculty/FacultyDashboard";
import ManagementDashboard from "./campus/pages/Management/ManagementDashboard";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* =========================
            PUBLIC PAGES
        ========================== */}

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />


        {/* =========================
            STUDENT
        ========================== */}
        <Route
          path="/student"
          element={
            <CampusLayout>
              <StudentDashboard />
            </CampusLayout>
          }
        />


        {/* =========================
            FACULTY
        ========================== */}

        <Route
          path="/faculty"
          element={
            <CampusLayout>
              <FacultyDashboard />
            </CampusLayout>
          }
        />


        {/* =========================
            MANAGEMENT
        ========================== */}

        <Route
          path="/management"
          element={
            <CampusLayout>
              <ManagementDashboard />
            </CampusLayout>
          }
        />


        {/* =========================
            UNKNOWN ROUTES
        ========================== */}

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