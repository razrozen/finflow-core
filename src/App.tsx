import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import AiAssistantPage from './pages/AiAssistantPage';
import StrategyPage from './pages/StrategyPage';
import SettingsPage from './pages/SettingsPage';
import FinancePage from './pages/FinancePage';
import ReportsPage from './pages/ReportsPage';
import { StrategicAIPage } from './pages/StrategicAIPage';
import SmartAdvisorPage from './pages/SmartAdvisorPage';
import AdminPage from './pages/AdminPage';
import BusinessManagementPage from './pages/BusinessManagementPage';
import PrivacyPolicyPage from './pages/Legal/PrivacyPolicyPage';
import TermsOfUsePage from './pages/Legal/TermsOfUsePage';
import Layout from './layouts/MainLayout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/ai-assistant" element={<AiAssistantPage />} />
          <Route path="/strategy" element={<StrategyPage />} />
          <Route path="/strategic-ai" element={<StrategicAIPage />} />
          <Route path="/advisor" element={<SmartAdvisorPage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/businesses" element={<BusinessManagementPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/legal/terms" element={<TermsOfUsePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
