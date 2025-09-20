import { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../layout/Navbar";
import { AuthContext } from "../../context/AuthContext";

// Import pages
import Dashboard from "../pages/Dashboard";
import DragDropEditor from "../pages/DragDropEditor";
import ContactManagement from "../pages/ContactManagement";
import AdvancedAnalytics from "../pages/AdvancedAnalytics";
import BulkEmailSending from "../pages/BulkEmailSending";
import SmartTargeting from "../pages/SmartTargeting";
import PerformanceTracking from "../pages/PerformanceTracking";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Upgrade from "../pages/Upgrade";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState("dashboard");

  const handlePageChange = (pageId) => {
    setCurrentPage(pageId);
  };

  const handleUpgradeClick = () => {
    setCurrentPage("upgrade");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard user={user} />;
      case "templates":
        return <DragDropEditor />;
      case "drag-drop-editor":
        return <ContactManagement />;
      case "advanced-analytics":
        return <AdvancedAnalytics />;
      case "contacts":
        return <BulkEmailSending />;
      case "bulk-email":
        return <SmartTargeting />;
      case "scheduled-campaigns":
        return <PerformanceTracking />;
      case "analytics":
        return <Profile user={user} />;
      case "settings":
        return <Settings />;
      case "upgrade":
        return <Upgrade />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onUpgradeClick={handleUpgradeClick}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar user={user} />
        <main className="flex-1 overflow-y-auto p-6">{renderPage()}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
