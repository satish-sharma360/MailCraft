import React from "react";
import { useState } from "react";
import emailPhoto from "../../assets/email.png";

const EmailTemplateList = () => {
  const [emailList, setEmailList] = useState([]);
  return (
    <div>
      <h2 className="font-medium text-2xl text-blue-500">Workspace</h2>
      {emailList?.length == 0 && (
        <div className="flex items-center justify-center flex-col gap-8">
          <div className="h-[450px] w-full overflow-hidden">
            <img
              className="h-full w-full object-cover mt-7"
              src="https://plus.unsplash.com/premium_photo-1721910821661-e3cd6b53b61d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <button className=" mx-auto px-6 py-2 rounded-full bg-blue-500 text-white cursor-pointer transition-all duration-200 hover:scale-95">
            +Create New
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailTemplateList;
