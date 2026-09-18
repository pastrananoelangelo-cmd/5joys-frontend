import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/website/Navbar";
import Footer from "./components/website/Footer";

import AboutPage from "./pages/website/About";
import CareersPage from "./pages/website/Careers";
import CorporatePage from "./pages/website/Corporate";
import HomePage from "./pages/website/Home";
import LocationsPage from "./pages/website/Locations";
import VisionPage from "./pages/website/Vision";

import LoginPage from "./pages/lms/LoginPage";
import DashboardPage from "./pages/lms/DashboardPage";
import HRLeaveRequestsPage from "./pages/lms/HRLeaveRequestsPage";
import MyLeavesPage from "./pages/lms/MyLeavesPage";
import ProfilePage from "./pages/lms/ProfilePage";
import EmployeesPage from "./pages/lms/EmployeesPage";
import LeaveRecordsPage from "./pages/lms/LeaveRecordsPage";
import ReportsPage from "./pages/lms/ReportsPage";
import CareerManagementPage from "./pages/lms/CareerManagementPage";

import DashboardLayout from "./components/lms/DashboardLayout";

function WebsiteLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function LmsLayout({ children }) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>

        {/* ==================== */}
        {/* PUBLIC WEBSITE        */}
        {/* ==================== */}

        <Route
          path="/"
          element={
            <WebsiteLayout>
              <HomePage />
            </WebsiteLayout>
          }
        />

        <Route
          path="/about"
          element={
            <WebsiteLayout>
              <AboutPage />
            </WebsiteLayout>
          }
        />

        <Route
          path="/careers"
          element={
            <WebsiteLayout>
              <CareersPage />
            </WebsiteLayout>
          }
        />

        <Route
          path="/corporate"
          element={
            <WebsiteLayout>
              <CorporatePage />
            </WebsiteLayout>
          }
        />

        <Route
          path="/locations"
          element={
            <WebsiteLayout>
              <LocationsPage />
            </WebsiteLayout>
          }
        />

        <Route
          path="/vision"
          element={
            <WebsiteLayout>
              <VisionPage />
            </WebsiteLayout>
          }
        />

        {/* ==================== */}
        {/* LMS LOGIN             */}
        {/* ==================== */}

        <Route
          path="/lms/login"
          element={
            <WebsiteLayout>
              <LoginPage />
            </WebsiteLayout>
          }
        />

        {/* ==================== */}
        {/* LMS                   */}
        {/* ==================== */}

        <Route
          path="/lms/dashboard"
          element={
            <LmsLayout>
              <DashboardPage />
            </LmsLayout>
          }
        />

        <Route
          path="/lms/leave-requests"
          element={
            <LmsLayout>
              <HRLeaveRequestsPage />
            </LmsLayout>
          }
        />

        <Route
          path="/lms/my-leaves"
          element={
            <LmsLayout>
              <MyLeavesPage />
            </LmsLayout>
          }
        />

        <Route
          path="/lms/profile"
          element={
            <LmsLayout>
              <ProfilePage />
            </LmsLayout>
          }
        />

        <Route
          path="/lms/employees"
          element={
            <LmsLayout>
              <EmployeesPage />
            </LmsLayout>
          }
        />

        <Route
          path="/lms/leave-records"
          element={
            <LmsLayout>
              <LeaveRecordsPage />
            </LmsLayout>
          }
        />

        <Route
          path="/lms/reports"
          element={
            <LmsLayout>
              <ReportsPage />
            </LmsLayout>
          }
        />

        <Route
          path="/lms/careers"
          element={
            <LmsLayout>
              <CareerManagementPage />
            </LmsLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;