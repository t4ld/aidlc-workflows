import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { jouleTheme } from './theme/theme';
import { RoleProvider } from './context/RoleContext';
import AppBar from './components/AppBar';

// CPOR pages
import CPORDashboard from './pages/cpor/CPORDashboard';
import CreateRequest from './pages/cpor/CreateRequest';

// AC pages
import ACDashboard from './pages/ac/ACDashboard';
import ManageBookings from './pages/ac/ManageBookings';

// Participant pages
import ParticipantDashboard from './pages/participant/ParticipantDashboard';

// Evaluator pages
import EvaluatorDashboard from './pages/evaluator/EvaluatorDashboard';
import ConductAssessments from './pages/evaluator/ConductAssessments';

// Admin pages
import ResultsExport from './pages/admin/ResultsExport';

function App() {
  return (
    <ThemeProvider theme={jouleTheme}>
      <CssBaseline />
      <RoleProvider>
        <BrowserRouter>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar />
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
              <Routes>
                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/cpor/dashboard" replace />} />

                {/* CPOR routes */}
                <Route path="/cpor/dashboard" element={<CPORDashboard />} />
                <Route path="/cpor/request/new" element={<CreateRequest />} />
                <Route path="/cpor/request/:id" element={<CPORDashboard />} />

                {/* AC routes */}
                <Route path="/ac/dashboard" element={<ACDashboard />} />
                <Route path="/ac/request/:id" element={<ACDashboard />} />
                <Route path="/ac/visit/:id/bookings" element={<ManageBookings />} />

                {/* Participant routes */}
                <Route path="/participant/dashboard" element={<ParticipantDashboard />} />
                <Route path="/participant/visit/:id" element={<ParticipantDashboard />} />

                {/* Evaluator routes */}
                <Route path="/evaluator/dashboard" element={<EvaluatorDashboard />} />
                <Route path="/evaluator/visit/:id/conduct" element={<ConductAssessments />} />

                {/* Admin/Supervisor routes */}
                <Route path="/admin/export" element={<ResultsExport />} />
              </Routes>
            </Box>
          </Box>
        </BrowserRouter>
      </RoleProvider>
    </ThemeProvider>
  );
}

export default App;
