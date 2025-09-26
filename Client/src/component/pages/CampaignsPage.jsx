import Sidebar from "../common/Sidebar";
import api from "../../api/api";
import { useEffect, useState } from "react";

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    api.get("/campaign/all")
      .then((res) => setCampaigns(res.data.data || []))
      .catch(console.error);
  }, []);

  const handleSend = async (id) => {
    await api.post(`/campaign/${id}/send`);
    alert("Campaign sent!");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">📨 Campaigns</h1>
        <ul>
          {campaigns.map((c) => (
            <li key={c._id} className="flex justify-between border p-3 mb-2">
              <span>{c.subject}</span>
              <button
                onClick={() => handleSend(c._id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Send
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CampaignsPage;
