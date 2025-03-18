import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import Dashboard from "./pages/DashboardPage";
import CreateRegistration from "./pages/Registration Management/CreateRegistration";
import ViewRegistration from "./pages/Registration Management/ViewRegistration";
import ViewRegistrationReport from "./pages/Registration Management/ViewRegistrationReport";
import CreateVoting from "./pages/Voting Management/CreateVoting";
import ViewVotingDashboard from "./pages/Voting Management/ViewVotingDashboard";
import ViewVotingReport from "./pages/Voting Management/ViewVotingReport";
import CreateTicket from "./pages/Ticket Management/CreateTicket";
import ViewTicketDashboard from "./pages/Ticket Management/ViewTicketDashboard";
import ViewTicketReport from "./pages/Ticket Management/ViewTicketReport";
import LoginPage from "./pages/LoginPage";
import EventDescription from "./pages/EventDescription";
import SignupPage from "./pages/SignupPage";
import OTP from "./components/OTP";
import KycVerification from "./pages/KycVerification";
import ProfilePage from "./pages/ProfilePage";
import { TokenProvider } from "../src/context/TokenContext";
import IndividualEventPage from "./pages/IndividualEventPage.js";
import IndividualView from "./pages/Registration Management/IndividualView.js";
import IndividualReportPage from "./pages/IndividualReportPage.js";
import IndividualReport from "./pages/Registration Management/IndividualReport.js";
// import ScrollButtons from "./components/ScrollButtons.js";

function App() {
  return (

    <Router>
      <TokenProvider>
        <div>
          <Routes>
            {/* Unprotected Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/otp-verification" element={<OTP />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/event-description"
              element={
                <ProtectedRoute>
                  <EventDescription />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-registration-event"
              element={
                <ProtectedRoute>
                  <CreateRegistration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-registration"
              element={
                <ProtectedRoute>
                  <ViewRegistration />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-registration-reports"
              element={
                <ProtectedRoute>
                  <ViewRegistrationReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-voting-event"
              element={
                <ProtectedRoute>
                  <CreateVoting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-voting-dashboard"
              element={
                <ProtectedRoute>
                  <ViewVotingDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-voting-report"
              element={
                <ProtectedRoute>
                  <ViewVotingReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-ticket-event"
              element={
                <ProtectedRoute>
                  <CreateTicket />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-ticket-dashboard"
              element={
                <ProtectedRoute>
                  <ViewTicketDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-ticket-report"
              element={
                <ProtectedRoute>
                  <ViewTicketReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/kyc-verification"
              element={
                <ProtectedRoute>
                  <KycVerification />
                </ProtectedRoute>
              }
            />
              <Route
              path="/event/:event_id"
              element={
                <ProtectedRoute>
                  <IndividualEventPage />
                </ProtectedRoute>
              }
            />
              <Route
              path="/viewregistration/:form_id"
              element={
                <ProtectedRoute>
                  <IndividualView />
                </ProtectedRoute>
              }
            />

            <Route
              path="/viewreport/:form_id"
              element={
                <ProtectedRoute>
                  <IndividualReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/eventreport/:event_id"
              element={
                <ProtectedRoute>
                  <IndividualReportPage/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
          {/* <ScrollButtons/> */}
        </div>
      </TokenProvider>
    </Router>
  );
}

export default App;
