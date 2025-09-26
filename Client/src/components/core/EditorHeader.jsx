import React, { useContext, useState } from "react";
import { Code, Monitor, Phone, X } from "lucide-react";
import { EmailTemplateContext } from "../../context/EmailTemplateContext";
import {  generateEmailBoilerplate } from "../utils/generateHTML";
import axios from 'axios'

const EditorHeader = ({ value, setValue }) => {
  const { emailTemplate } = useContext(EmailTemplateContext);
  const [showHTMLModal, setShowHTMLModal] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState("");

  const handleShowHTML = () => {
    const html = generateEmailBoilerplate(emailTemplate); // generate HTML from canvas
    setGeneratedHTML(html);
    setShowHTMLModal(true);
    console.log(generatedHTML)
  };
  const Url = `${import.meta.env.VITE_BACKEND_URL}/template`

  const fetchdata = async (generatedHTML) =>{
    console.log("Fetch Function..")
    try {
      const {data} = await axios.post(`${Url}/create`,{generatedHTML},)
      console.log("Fetched data",data)
    } catch (error) {
      console.log(error)
      console.log("error while fetching data")
    }
  }

  return (
    <div className="w-full bg-white border border-gray-300 shadow">
      <div className="w-[90%] flex flex-wrap items-center justify-between mx-auto py-4 gap-4">
        {/* Logo */}
        <div className="h-14 w-56 overflow-hidden">
          <img className="h-full w-full" src="/logo.png" alt="Logo" />
        </div>

        {/* Device view buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setValue("desktop")}
            className={`px-2 py-2 flex gap-1 text-sm items-center justify-center rounded ${
              value === "desktop" ? "bg-blue-100" : "bg-gray-200"
            } text-black cursor-pointer hover:scale-95`}
          >
            <Monitor size={12} /> Desktop
          </button>
          <button
            onClick={() => setValue("mobile")}
            className={`px-2 py-2 flex gap-1 text-sm items-center justify-center rounded ${
              value === "mobile" ? "bg-blue-100" : "bg-gray-200"
            } text-black cursor-pointer hover:scale-95`}
          >
            <Phone size={12} /> Mobile
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <button onClick={handleShowHTML} className="px-2 py-2 rounded bg-gray-200 text-black cursor-pointer hover:scale-95">
            <Code />
          </button>
          <button  className="px-6 py-2 rounded-full bg-gray-200 text-black cursor-pointer hover:scale-95">
            Send Email
          </button>
          <button onClick={fetchdata} className="px-6 py-2 rounded-full bg-blue-500 text-white cursor-pointer hover:scale-95">
            Save Template
          </button>
          {/* <button
            onClick={handleShowHTML}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Show HTML
          </button> */}
        </div>
      </div>

      {/* HTML Modal */}
      {showHTMLModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white w-[80%] max-w-4xl p-4 rounded shadow-lg relative">
            <button
              onClick={() => setShowHTMLModal(false)}
              className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">Generated HTML</h2>
            <pre className="overflow-auto max-h-[70vh] p-2 bg-gray-100 border rounded text-sm">
              {generatedHTML}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorHeader;
