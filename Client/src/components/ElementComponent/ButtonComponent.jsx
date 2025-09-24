import React from "react";

const ButtonComponent = ({ outerStyle,style, content, url }) => {
  return (
    <div style={outerStyle}>
      <a href={url}>
        <button style={style}>{content}</button>
      </a>
    </div>
  );
};

export default ButtonComponent;
