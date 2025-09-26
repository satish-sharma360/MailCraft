import Sidebar from "../common/Sidebar";
import api from "../../api/api";
import { useEffect, useState } from "react";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    api.get("/contact/all")
      .then((res) => setContacts(res.data.data || []))
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/contact/${id}`);
    setContacts(contacts.filter((c) => c._id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">👥 Contacts</h1>
        <ul>
          {contacts.map((c) => (
            <li key={c._id} className="flex justify-between border p-3 mb-2">
              <span>{c.email}</span>
              <button
                onClick={() => handleDelete(c._id)}
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

export default ContactsPage;
