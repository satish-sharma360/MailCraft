import React, { useState } from "react";
import EditorHeader from "../core/EditorHeader";
import ElementSidebar from "../core/ElementSidebar";
import Canvas from "../core/Canvas";
import Settings from "../core/Settings";

const EditorPage = () => {
  const [screenSize, setScreenSize] = useState("");

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <EditorHeader value={screenSize} setValue={setScreenSize} />

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-64 bg-white border-r border-gray-300 overflow-auto">
          <ElementSidebar />
        </div>

        {/* Center canvas */}
        <div className="flex-1 bg-gray-100 overflow-hidden">
          <Canvas headerValue={screenSize} />
        </div>

        {/* Right settings */}
        <div className="w-96 bg-white border-l border-gray-300 overflow-auto">
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
