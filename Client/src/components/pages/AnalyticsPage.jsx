import React, { useEffect, useState } from "react";
import DashboardLayout from "../pages/DashboardLayout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsPage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get("http://localhost:5000/v1/campaign/all", { withCredentials: true });
      const data = res.data.data || [];

      // Fetch analytics for each campaign
      const analyticsData = await Promise.all(
        data.map(async (c) => {
          const resAnalytics = await axios.get(
            `http://localhost:5000/v1/analytics/campaign/${c._id}`,
            { withCredentials: true }
          );
          return {
            ...c,
            analytics: resAnalytics.data.data || [],
          };
        })
      );

      setCampaigns(analyticsData);
    } catch (err) {
      toast.error("Failed to fetch analytics");
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold mb-4">Campaign Analytics</h2>

      {campaigns.map((c) => {
        const sentCount = c.analytics.filter(a => a.status === "sent").length;
        const failedCount = c.analytics.filter(a => a.status === "failed").length;
        const openedCount = c.analytics.filter(a => a.opened).length;
        const clickedCount = c.analytics.reduce((acc, a) => acc + (a.clickedLinks?.length || 0), 0);

        const chartData = [
          { name: "Sent", value: sentCount },
          { name: "Failed", value: failedCount },
          { name: "Opened", value: openedCount },
          { name: "Clicked", value: clickedCount },
        ];

        return (
          <div key={c._id} className="mb-8 border p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">{c.subject}</h3>
            <p className="mb-2">Template: {c.template?.name}</p>
            <p className="mb-2">Recipients: {c.recipients.length}</p>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </DashboardLayout>
  );
};

export default AnalyticsPage;
