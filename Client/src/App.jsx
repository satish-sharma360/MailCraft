import { Route , Routes } from 'react-router-dom'
import LoginPage from './component/auth/LoginPage'
import RegisterPage from './component/auth/RegisterPage'
import ProtectedRoute from './routes/ProtectedRoute'
import Dashboard from './component/pages/Dashboard'
import TemplatesPage from './component/pages/TemplatesPage'
import CampaignsPage from './component/pages/CampaignsPage'
import ContactsPage from './component/pages/ContactsPage'
import AnalyticsPage from './component/pages/AnalyticsPage'
import Navbar from './component/common/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/templates"
          element={<ProtectedRoute><TemplatesPage /></ProtectedRoute>}
        />
        <Route
          path="/campaigns"
          element={<ProtectedRoute><CampaignsPage /></ProtectedRoute>}
        />
        <Route
          path="/contacts"
          element={<ProtectedRoute><ContactsPage /></ProtectedRoute>}
        />
        <Route
          path="/analytics"
          element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>}
        />
      </Routes>
    </div>
  );
};

export default App;

{
  /* <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />

        Protected Routes 
        <Route element={<ProtectedRoute />}>
          <Route path="/featurespage" element={<FeaturesPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/send-email" element={<SendEmailPage />} />
          <Route path="/targeting" element={<TargetingPage />} />
          <Route path="/performance" element={<PerformancePage />} />
        </Route> */
}
