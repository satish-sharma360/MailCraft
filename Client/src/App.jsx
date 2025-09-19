import React from "react";
import Auth from "./pages/Auth";
import LandingPage from "./pages/LandingPage ";
import { Route, Routes } from "react-router-dom";
import FeaturesPage from "./pages/loginuserpages/FeaturesPage.jsx.jsx";
import PerformancePage from "./pages/loginuserpages/PerformancePage.jsx.jsx";
import TargetingPage from "./pages/loginuserpages/TargetingPage.jsx.jsx";
import SendEmailPage from "./pages/loginuserpages/SendEmailPage.jsx.jsx";
import AnalyticsPage from "./pages/loginuserpages/AnalyticsPage.jsx.jsx";
import ContactsPage from "./pages/loginuserpages/ContactsPage.jsx.jsx";
import EditorPage from "./pages/loginuserpages/EditorPage.jsx.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/featurespage" element={<FeaturesPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/send-email" element={<SendEmailPage />} />
          <Route path="/targeting" element={<TargetingPage />} />
          <Route path="/performance" element={<PerformancePage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
