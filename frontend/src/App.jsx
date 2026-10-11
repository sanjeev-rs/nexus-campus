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
// FACULTY PAGES
// =========================================================

import FacultyDashboard from "./campus/pages/Faculty/FacultyDashboard";
import FacultyOverview from "./campus/pages/Faculty/FacultyOverview";
import AdviseeIntelligence from "./campus/pages/Faculty/AdviseeIntelligence";
import StudentGrowthAnalytics from "./campus/pages/Faculty/StudentGrowthAnalytics";
import FacultySkillIntelligence from "./campus/pages/Faculty/FacultySkillIntelligence";
import AtRiskIntelligence from "./campus/pages/Faculty/AtRiskIntelligence";
import KnowledgeDNA from "./campus/pages/Faculty/KnowledgeDNA";
import ProjectReviewPipeline from "./campus/pages/Faculty/ProjectReviewPipeline";
import FacultyProjectDNA from "./campus/pages/Faculty/FacultyProjectDNA";
import ResearchExpertise from "./campus/pages/Faculty/ResearchExpertise";
import SemanticProjectDiscovery from "./campus/pages/Faculty/SemanticProjectDiscovery";
import MentorMatching from "./campus/pages/Faculty/MentorMatching";
import InterventionManagement from "./campus/pages/Faculty/InterventionManagement";
import AdvisingSchedule from "./campus/pages/Faculty/AdvisingSchedule";
import MentoringHistory from "./campus/pages/Faculty/MentoringHistory";
import FacultyRecommendations from "./campus/pages/Faculty/FacultyRecommendations";
import FacultyFailureMemory from "./campus/pages/Faculty/FacultyFailureMemory";
import CampusKnowledgeGraphView from "./campus/pages/Faculty/CampusKnowledgeGraphView";
import TechnicalProblems from "./campus/pages/Faculty/TechnicalProblems";
import InstitutionalLearningView from "./campus/pages/Faculty/InstitutionalLearningView";
import FacultyNotifications from "./campus/pages/Faculty/FacultyNotifications";
import FacultyProfile from "./campus/pages/Faculty/FacultyProfile";

// =========================================================
// MANAGEMENT PAGES
// =========================================================

import ManagementDashboard from "./campus/pages/Management/ManagementDashboard";
import ManagementOverview from "./campus/pages/Management/ManagementOverview";
import CampusSkillRadar from "./campus/pages/Management/CampusSkillRadar";
import ManagementStudentGrowth from "./campus/pages/Management/ManagementStudentGrowth";
import InstitutionalActivity from "./campus/pages/Management/InstitutionalActivity";
import CapabilitySkillGaps from "./campus/pages/Management/CapabilitySkillGaps";
import TechnologyTrends from "./campus/pages/Management/TechnologyTrends";
import DepartmentPerformance from "./campus/pages/Management/DepartmentPerformance";
import AcademicOutcomes from "./campus/pages/Management/AcademicOutcomes";
import ProgramEffectiveness from "./campus/pages/Management/ProgramEffectiveness";
import InterventionAnalytics from "./campus/pages/Management/InterventionAnalytics";
import ProjectEcosystem from "./campus/pages/Management/ProjectEcosystem";
import ManagementProjectDNA from "./campus/pages/Management/ManagementProjectDNA";
import ResearchIntelligence from "./campus/pages/Management/ResearchIntelligence";
import FacultyExpertiseMap from "./campus/pages/Management/FacultyExpertiseMap";
import IPInnovationPipeline from "./campus/pages/Management/IPInnovationPipeline";
import ProjectDuplication from "./campus/pages/Management/ProjectDuplication";
import DecisionSupportWorkspace from "./campus/pages/Management/DecisionSupportWorkspace";
import CampusMissions from "./campus/pages/Management/CampusMissions";
import OpportunityIntelligence from "./campus/pages/Management/OpportunityIntelligence";
import WorkshopTrainingPlanning from "./campus/pages/Management/WorkshopTrainingPlanning";
import ResourceAllocation from "./campus/pages/Management/ResourceAllocation";
import ManagementFailureMemory from "./campus/pages/Management/ManagementFailureMemory";
import ManagementKnowledgeGraph from "./campus/pages/Management/ManagementKnowledgeGraph";
import ManagementInstitutionalLearning from "./campus/pages/Management/ManagementInstitutionalLearning";
import KnowledgeRetention from "./campus/pages/Management/KnowledgeRetention";
import ExecutiveReports from "./campus/pages/Management/ExecutiveReports";
import ManagementAnalytics from "./campus/pages/Management/ManagementAnalytics";
import AlertsAttentionCenter from "./campus/pages/Management/AlertsAttentionCenter";


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
                <FacultyOverview />
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

        <Route
          path="/faculty/advisees"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <AdviseeIntelligence />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/growth"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <StudentGrowthAnalytics />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/skills"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <FacultySkillIntelligence />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/at-risk"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <AtRiskIntelligence />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/knowledge-dna"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <KnowledgeDNA />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/reviews"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <ProjectReviewPipeline />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/project-dna"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <FacultyProjectDNA />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/research"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <ResearchExpertise />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/project-discovery"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <SemanticProjectDiscovery />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/matching"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <MentorMatching />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/interventions"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <InterventionManagement />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/advising"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <AdvisingSchedule />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/mentoring-history"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <MentoringHistory />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/recommendations"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <FacultyRecommendations />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/failure-memory"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <FacultyFailureMemory />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/knowledge-graph"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <CampusKnowledgeGraphView />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/technical-problems"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <TechnicalProblems />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/institutional-learning"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <InstitutionalLearningView />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/notifications"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <FacultyNotifications />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/faculty/profile"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <CampusLayout>
                <FacultyProfile />
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
                <ManagementOverview />
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

        <Route
          path="/management/skill-radar"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <CampusSkillRadar />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/student-growth"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <ManagementStudentGrowth />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/activity"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <InstitutionalActivity />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/skill-gaps"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <CapabilitySkillGaps />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/gaps"
          element={
            <Navigate
              to="/management/skill-gaps"
              replace
            />
          }
        />

        <Route
          path="/management/technology-trends"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <TechnologyTrends />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/trends"
          element={
            <Navigate
              to="/management/technology-trends"
              replace
            />
          }
        />

        <Route
          path="/management/departments"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <DepartmentPerformance />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/outcomes"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <AcademicOutcomes />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/programs"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <ProgramEffectiveness />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/interventions"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <InterventionAnalytics />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/projects"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <ProjectEcosystem />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/project-dna"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <ManagementProjectDNA />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/research"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <ResearchIntelligence />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/faculty-expertise"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <FacultyExpertiseMap />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/expertise"
          element={
            <Navigate
              to="/management/faculty-expertise"
              replace
            />
          }
        />

        <Route
          path="/management/ip"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <IPInnovationPipeline />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/duplication"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <ProjectDuplication />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/decision-support"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <DecisionSupportWorkspace />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/support"
          element={
            <Navigate
              to="/management/decision-support"
              replace
            />
          }
        />

        <Route
          path="/management/missions"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <CampusMissions />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/opportunities"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <OpportunityIntelligence />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/training"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <WorkshopTrainingPlanning />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/resources"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <ResourceAllocation />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/failure-memory"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <ManagementFailureMemory />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/knowledge-graph"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <ManagementKnowledgeGraph />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/institutional-learning"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <ManagementInstitutionalLearning />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/learning"
          element={
            <Navigate
              to="/management/institutional-learning"
              replace
            />
          }
        />

        <Route
          path="/management/knowledge-retention"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <KnowledgeRetention />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/retention"
          element={
            <Navigate
              to="/management/knowledge-retention"
              replace
            />
          }
        />

        <Route
          path="/management/reports"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <ExecutiveReports />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/analytics"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <ManagementAnalytics />
              </CampusLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/management/alerts"
          element={
            <ProtectedRoute allowedRoles={["management"]}>
              <CampusLayout>
                <AlertsAttentionCenter />
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
