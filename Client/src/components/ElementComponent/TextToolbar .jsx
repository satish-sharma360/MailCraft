import React from "react";

const TextToolbar = ({ targetId }) => {
  const applyStyle = (command, value = null) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.focus();
    document.execCommand(command, false, value);
  };

  return (
    <div className="flex gap-2 p-2 bg-gray-100 border-b">
      <button onClick={() => applyStyle("bold")}>B</button>
      <button onClick={() => applyStyle("italic")}>I</button>
      <button onClick={() => applyStyle("underline")}>U</button>
      <input
        type="color"
        onChange={(e) => applyStyle("foreColor", e.target.value)}
      />
      <select onChange={(e) => applyStyle("fontName", e.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
      </select>
    </div>
  );
};

export default TextToolbar;
