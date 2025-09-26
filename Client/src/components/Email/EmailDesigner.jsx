import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const EmailDesigner = () => {
  const editorRef = useRef(null);
  const [templateName, setTemplateName] = useState("Untitled Template");
  const [previewHtml, setPreviewHtml] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (editorRef.current) return;

    const script = document.createElement("script");
    script.src = "https://editor.unlayer.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.unlayer.init({
        id: "editor-container",
        displayMode: "email",
        features: {
          undoRedo: true,
          stockImages: true,
          imageEditor: true,
          preview: true,
        },
        mergeTags: [
          { name: "First Name", value: "{{first_name}}", sample: "John" },
          { name: "Last Name", value: "{{last_name}}", sample: "Doe" },
          { name: "Email", value: "{{email}}", sample: "john@example.com" },
        ],
      });
      editorRef.current = window.unlayer;
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Export HTML and send to API
  const handleSaveTemplate = async () => {
    if (!editorRef.current) return;

    editorRef.current.exportHtml(async ({ html }) => {
      // Remove MSO/Outlook conditional comments for cleaner HTML
      const cleanHtml = html.replace(/<!--\[if [\s\S]*?<!\[endif\]-->/gi, "");

      // Log cleaned HTML in console
      console.log("----- Clean HTML -----");
      console.log(cleanHtml);

      try {
        // Replace this URL with your backend endpoint
        const response = await axios.post(
          "http://localhost:5000/v1/template/create",
          {
            name: templateName,
            html: cleanHtml,
          }
        );

        alert("Template saved to backend successfully!");
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error saving template:", error);
        alert("Failed to save template!");
      }
    });
  };

  // Preview modal
  const handlePreview = () => {
    if (!editorRef.current) return;

    editorRef.current.exportHtml(({ html }) => {
      setPreviewHtml(html);
      setShowPreview(true);
    });
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="px-2 py-1 border rounded"
          placeholder="Template Name"
        />
        <div className="flex space-x-2">
          <button
            className="px-3 py-2 bg-blue-600 text-white rounded"
            onClick={handleSaveTemplate}
          >
            Save & Export
          </button>
          <button
            className="px-3 py-2 bg-green-600 text-white rounded"
            onClick={handlePreview}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Editor Canvas */}
      <div id="editor-container" style={{ flex: 1, minHeight: "600px" }}></div>

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
    </div>
  );
};

export default EmailDesigner;
