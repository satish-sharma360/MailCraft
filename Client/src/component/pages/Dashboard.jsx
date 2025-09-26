import Sidebar from "../common/Sidebar";
import api from "../../api/api";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/analytics/dashboard");
        setStats(res.data.data || {});
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-white shadow rounded">Templates: {stats.templates || 0}</div>
          <div className="p-4 bg-white shadow rounded">Campaigns: {stats.campaigns || 0}</div>
          <div className="p-4 bg-white shadow rounded">Contacts: {stats.contacts || 0}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
