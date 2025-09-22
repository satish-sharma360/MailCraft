import React from "react";

const ElementLayoutCart = ({ elem }) => {
  return (
    <div>
      <div
        className="flex flex-col items-center justify-center border border-dashed border-gray-400 cursor-pointer transition-all duration-200 group hover:bg-blue-100 hover:shadow-md rounded p-3"
      >
        {
          <elem.icon className="h-9 w-9 text-gray-800 bg-gray-200 p-2 rounded-full group-hover:bg-purple-100" />
        }
        <p className="text-sm">{elem.label}</p>
      </div>
    </div>
  );
};

export default ElementLayoutCart;
