import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/auth/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import RegisterPage from "./components/auth/RegisterPage";
import Leanding from "./components/pages/Leanding";
import Dashboard from "./components/pages/Dashboard";
import EditorPage from "./components/Editor/EditorPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Leanding/>}/>
        <Route path="/test" element={<EditorPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

{/* <Route path="/" element={<LandingPage />} />
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
        </Route> */}
