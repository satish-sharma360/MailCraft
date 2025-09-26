import React, { useEffect, useState } from "react";
import DashboardLayout from "../pages/DashboardLayout";
import axios from "axios";
import { toast } from "react-hot-toast";

const CampaignPage = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [recipients, setRecipients] = useState("");
  const [campaigns, setCampaigns] = useState([]);

  // Fetch templates and existing campaigns
  useEffect(() => {
    fetchTemplates();
    fetchCampaigns();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/v1/template/all", { withCredentials: true });
      setTemplates(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch templates");
    }
  };

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get("http://localhost:5000/v1/campaign/all", { withCredentials: true });
      setCampaigns(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch campaigns");
    }
  };

  const handleSendCampaign = async () => {
    if (!selectedTemplate) return toast.error("Select a template");
    if (!recipients) return toast.error("Add at least one recipient");

    const recipientArray = recipients.split(",").map((r) => r.trim());

    try {
      await axios.post(
        "http://localhost:5000/v1/campaign/create",
        {
          template: selectedTemplate,
          subject: "Your Campaign Subject",
          recipients: recipientArray,
        },
        { withCredentials: true }
      );
      toast.success("Campaign sent!");
      setRecipients("");
      setSelectedTemplate("");
      fetchCampaigns();
    } catch (err) {
      toast.error("Failed to send campaign");
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Campaign</h2>
        <div className="flex flex-col gap-4 mb-6">
          <select
            className="border p-2 rounded"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="">Select Template</option>
            {templates.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name}
              </option>
            ))}
          </select>

          <textarea
            className="border p-2 rounded"
            placeholder="Add recipients separated by comma"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            rows={4}
          ></textarea>

          <button
            onClick={handleSendCampaign}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send Campaign
          </button>
        </div>

        {/* Campaign List */}
        <h3 className="text-xl font-semibold mb-2">Sent Campaigns</h3>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Subject</th>
              <th className="border px-2 py-1">Template</th>
              <th className="border px-2 py-1">Recipients</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c._id}>
                <td className="border px-2 py-1">{c.subject}</td>
                <td className="border px-2 py-1">{c.template?.name || "-"}</td>
                <td className="border px-2 py-1">{c.recipients.length}</td>
                <td className="border px-2 py-1">{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default CampaignPage;
