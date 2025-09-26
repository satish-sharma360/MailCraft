import React from "react";
import Sidebar from "../pages/Sidebar";
import TopNavbar from "../TopNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 mt-16">
        <TopNavbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
