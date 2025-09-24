import React from "react";

const TextAreaFields = ({ label, value, onHandleInputChange }) => {
  return (
    <div>
      <label>{label}</label>
      <textarea
        className=" w-full
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
        row={40}
        cols={12}
        value={value}
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  );
};

export default TextAreaFields;
