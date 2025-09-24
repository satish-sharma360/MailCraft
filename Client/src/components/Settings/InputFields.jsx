import React from "react";

const InputFields = ({ label, value, onHandleInputChange }) => {
   return (
    <div>
      <label>{label}</label>
      <input className=" w-full
          px-4 py-2
          bg-gray-100
          border border-gray-300
          rounded-md
          focus:outline-none
          focus:ring-1
          focus:ring-blue-400
          text-gray-900
          transition
          duration-200"
        value={value}
        onChange={(event) => onHandleInputChange(event.target.value)}
      />
    </div>
  );
};

export default InputFields;
