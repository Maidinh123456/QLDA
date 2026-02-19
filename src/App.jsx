import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Customer
import CustomerDashboard from './pages/Customer/Dashboard';

// Director
import DirectorApprovePlan from './pages/Director/ApprovePlan';
import DirectorDashboard from './pages/Director/Dashboard';
import DirectorViewReport from './pages/Director/ViewReport';

// Manager
import ManagerApproveScript from './pages/Manager/ApproveScript';
import ManagerAssignTask from './pages/Manager/AssignTask';
import ManagerCreateEvent from './pages/Manager/CreateEvent';
import ManagerDashboard from './pages/Manager/Dashboard';
import ManagerProgress from './pages/Manager/Progress';
import ManagerViewReport from './pages/Manager/ViewReport';

// Marketing
import MarketingContent from './pages/Marketing/Content';
import MarketingDashboard from './pages/Marketing/Dashboard';

// Participant
import ParticipantDashboard from './pages/Participant/Dashboard';
import ParticipantPayment from './pages/Participant/Payment';
import ParticipantRegister from './pages/Participant/Register';
import ParticipantSearchEvent from './pages/Participant/SearchEvent';
import ParticipantViewEvent from './pages/Participant/ViewEvent';
import ParticipantCancelTicket from './pages/Participant/CancelTicket';
import ParticipantTransferTicket from './pages/Participant/TransferTicket';
import ParticipantSurvey from './pages/Participant/Survey';

// Staff
import StaffAttendance from './pages/Staff/Attendance';
import StaffCreateScript from './pages/Staff/CreateScript';
import StaffDashboard from './pages/Staff/Dashboard';
import StaffEquipment from './pages/Staff/Equipment';
import StaffParticipantList from './pages/Staff/ParticipantList';
import StaffReport from './pages/Staff/Report';
import StaffViewEvent from './pages/Staff/ViewEvent';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default */}
        <Route path="/" element={<Login />} />

        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Customer */}
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />

        {/* Director */}
        <Route path="/director/approve-plan" element={<DirectorApprovePlan />} />
        <Route path="/director/dashboard" element={<DirectorDashboard />} />
        <Route path="/director/view-report" element={<DirectorViewReport />} />

        {/* Manager */}
        <Route path="/manager/approve-script" element={<ManagerApproveScript />} />
        <Route path="/manager/assign-task" element={<ManagerAssignTask />} />
        <Route path="/manager/create-event" element={<ManagerCreateEvent />} />
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/manager/progress" element={<ManagerProgress />} />
        <Route path="/manager/view-report" element={<ManagerViewReport />} />

        {/* Marketing */}
        <Route path="/marketing/content" element={<MarketingContent />} />
        <Route path="/marketing/dashboard" element={<MarketingDashboard />} />

        {/* Participant */}
        <Route path="/participant/dashboard" element={<ParticipantDashboard />} />
        <Route path="/participant/payment" element={<ParticipantPayment />} />
        <Route path="/participant/register" element={<ParticipantRegister />} />
        <Route path="/participant/search-event" element={<ParticipantSearchEvent />} />
        <Route path="/participant/view-event" element={<ParticipantViewEvent />} />
        <Route path="/participant/cancel-ticket" element={<ParticipantCancelTicket />} />
        <Route path="/participant/transfer-ticket" element={<ParticipantTransferTicket />} />
        <Route path="/participant/survey" element={<ParticipantSurvey />} />

        {/* Staff */}
        <Route path="/staff/attendance" element={<StaffAttendance />} />
        <Route path="/staff/create-script" element={<StaffCreateScript />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/equipment" element={<StaffEquipment />} />
        <Route path="/staff/participant-list" element={<StaffParticipantList />} />
        <Route path="/staff/report" element={<StaffReport />} />
        <Route path="/staff/view-event" element={<StaffViewEvent />} />

        {/* Not found */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
