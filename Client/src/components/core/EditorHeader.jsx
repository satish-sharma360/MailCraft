import React from "react";
import { Code, Monitor, Phone } from 'lucide-react';

const EditorHeader = ({value ,setValue}) => {
  return (
    <div className="w-full bg-[#ffffff] border border-gray-300 shadow">
      <div className="w-[90%] flex items-center justify-between mx-auto py-4">
        <div>
          <div className="h-14 w-56 overflow-hidden">
            <img className="h-full w-full" src="/logo.png" alt="" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">

            <button onClick={() => setValue('desktop')} className={`px-2 py-2 flex gap-1 text-sm items-center justify-center  rounded ${value === 'desktop'? 'bg-blue-100': 'bg-gray-200'} text-black cursor-pointer transition-all duration-200 hover:scale-95`}>
                <Monitor size={12}/> Desktop
            </button>
            <button onClick={() => setValue('mobile')} className={`px-2 py-2 flex gap-1 text-sm items-center justify-center  rounded ${value === 'mobile'? 'bg-blue-100': 'bg-gray-200'} text-black cursor-pointer transition-all duration-200 hover:scale-95`}>
                <Phone size={12}/> Mobile
            </button>

        </div>
        <div className="flex items-center justify-center gap-4">
            <button
              className="px-2 py-2 rounded bg-gray-200 text-black cursor-pointer transition-all duration-200 hover:scale-95 hover:bg-gray-300"
            >
              <Code />
            </button>
            <button
              className="px-6 py-2 rounded-full bg-gray-200 text-black cursor-pointer transition-all duration-200 hover:scale-95"
            >
              Send Email
            </button>
            <button
              className="px-6 py-2 rounded-full bg-blue-500 text-white cursor-pointer transition-all duration-200 hover:scale-95"
            >
              Save Template
            </button>
          </div>
      </div>
    </div>
  );
};

export default EditorHeader;
