import Sidebar from "../common/Sidebar";
import api from "../../api/api";
import { useEffect, useState } from "react";

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    api.get("/analytics/all")
      .then((res) => setAnalytics(res.data.data || []))
      .catch(console.error);
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">📈 Analytics</h1>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Campaign</th>
              <th className="p-2">Opens</th>
              <th className="p-2">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {analytics.map((a) => (
              <tr key={a._id}>
                <td className="border p-2">{a.campaign.subject}</td>
                <td className="border p-2">{a.opens}</td>
                <td className="border p-2">{a.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsPage;
