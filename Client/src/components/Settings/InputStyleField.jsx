import React from "react";

const InputStyleField = ({ onStyleChange, value, label , type='px'}) => {
  const formattedValue = (value) => {
    return Number(value.toString().replace(type,''));
  };
  return (
    <div>
      <label>{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={formattedValue(value)}
          onChange={(e) => onStyleChange(e.target.value + type)}
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
        />
        <h2 className="px-4 py-2 border border-gray-300
          rounded-md bg-gray-100 select-none">px</h2>
      </div>
    </div>
  );
};

export default InputStyleField;
