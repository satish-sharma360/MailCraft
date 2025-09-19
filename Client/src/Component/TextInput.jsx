import React from "react";

const TextInput = (props) => {
  return (
    <div className="mb-4 px-6">
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-2">{props.label}</label>
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default TextInput;
