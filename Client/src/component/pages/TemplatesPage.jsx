import Sidebar from "../common/Sidebar";
import api from "../../api/api";
import { useEffect, useState } from "react";

const TemplatesPage = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    api.get("/template/get-all")
      .then((res) => setTemplates(res.data.data || []))
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/template/delet/${id}`);
    setTemplates(templates.filter((t) => t._id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">📧 Templates</h1>
        <ul>
          {templates.map((t) => (
            <li key={t._id} className="flex justify-between border p-3 mb-2">
              <span>{t.name}</span>
              <button
                onClick={() => handleDelete(t._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TemplatesPage;
