import React from "react";

const ButtonComponent = ({ outerStyle, style, content, url }) => {
  return (
    <div 
      style={{ 
        ...outerStyle, 
        width: "100%",
        // Remove default spacing and ensure tight fit
        margin: 0,
        padding: 0,
        lineHeight: 1,
        fontSize: 0, // Removes inline-block spacing
        display: "flex", // Better than default block display
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <a 
        href={url} 
        style={{ 
          ...style, 
          display: "inline-block",
          // Ensure no extra spacing
          verticalAlign: "top",
          lineHeight: style?.lineHeight || "1.2",
          textDecoration: "none", // Remove default link styling
          // Remove any default margins/padding
          margin: 0,
          boxSizing: "border-box"
        }}
      >
        {content || "Button"}
      </a>
    </div>
  );
};

export default ButtonComponent;