import React from "react";

const Card = ({ children, className = "", hover = true }) => (
  <div
    className={`bg-white rounded-xl shadow-lg border border-gray-100 ${
      hover ? "hover:shadow-2xl transition-shadow duration-300" : ""
    } ${className}`}
  >
    {children}
  </div>
);

export default Card;
