import React from "react";
import EditorHeader from "../core/EditorHeader";
import ElementSidebar from "../core/ElementSidebar";
import Canvas from "../core/Canvas";
import Settings from "../core/Settings";
import { useState } from "react";

const EditorPage = () => {
    const [screenSize , setScreenSize] = useState('')
  return (
    <div className="">
      <EditorHeader value={screenSize} setValue={setScreenSize}/>
      <div className="grid grid-cols-5 gap-4">
        {/* Left sidebar */}
        <div className="col-span-1">
          <ElementSidebar />
        </div>

        {/* Center canvas (3x space) */}
        <div className="col-span-3 bg-gray-100">
          <Canvas headerValue={screenSize}/>
        </div>

        {/* Right settings */}
        <div className="col-span-1">
          <Settings />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
