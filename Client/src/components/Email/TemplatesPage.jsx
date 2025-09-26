import React, { useEffect, useState } from "react";
import DashboardLayout from "../pages/DashboardLayout";
import axios from "axios";
import { toast } from "react-hot-toast";

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [templateName, setTemplateName] = useState("");
  const [previewHtml, setPreviewHtml] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const res = await axios.get("http://localhost:5000/v1/template/all", { withCredentials: true });
      setTemplates(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch templates");
    }
  };

  // Save or update template
  const handleSaveTemplate = async (html) => {
    try {
      if (!templateName) return toast.error("Template name required");

      if (selectedTemplate) {
        // Update existing
        const res = await axios.put(
          `http://localhost:5000/v1/template/update/${selectedTemplate._id}`,
          { name: templateName, html },
          { withCredentials: true }
        );
        toast.success("Template updated!");
      } else {
        // Create new
        const res = await axios.post(
          "http://localhost:5000/v1/template/create",
          { name: templateName, html },
          { withCredentials: true }
        );
        toast.success("Template created!");
      }

      setSelectedTemplate(null);
      setTemplateName("");
      fetchTemplates();
    } catch (err) {
      toast.error("Failed to save template");
    }
  };

  // Delete template
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/v1/template/delete/${id}`, { withCredentials: true });
      toast.success("Template deleted!");
      fetchTemplates();
    } catch (err) {
      toast.error("Failed to delete template");
    }
  };

  // Preview modal
  const handlePreview = (html) => {
    setPreviewHtml(html);
    setShowPreview(true);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Email Templates</h2>
        <input
          type="text"
          placeholder="Template Name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="px-2 py-1 border rounded"
        />
      </div>

      {/* Template List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {templates.map((t) => (
          <div key={t._id} className="border p-3 rounded shadow relative">
            <h3 className="font-semibold mb-2">{t.name}</h3>
            <div className="flex gap-2">
              <button
                className="px-2 py-1 bg-green-500 text-white rounded"
                onClick={() => {
                  setSelectedTemplate(t);
                  setTemplateName(t.name);
                  handlePreview(t.html);
                }}
              >
                Preview
              </button>
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => {
                  setSelectedTemplate(t);
                  setTemplateName(t.name);
                }}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleDelete(t._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="border p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Drag & Drop Email Editor</h3>
        <div
          id="editor-container"
          style={{ height: "500px", minHeight: "400px" }}
        ></div>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            window.unlayer.exportHtml(({ html }) => handleSaveTemplate(html));
          }}
        >
          Save Template
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] w-full flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Preview HTML</h3>
              <button onClick={() => setShowPreview(false)}>×</button>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-gray-100">
              <iframe
                srcDoc={previewHtml}
                title="Preview"
                className="w-full h-96 border rounded"
              />
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default TemplatesPage;
