import React from "react";
import { useContext } from "react";
import { DragDropLayoutElement } from "../../context/DragDropLayoutElement";
import { EmailTemplateContext } from "../../context/EmailTemplateContext";
import { useState } from "react";
import ColumnLayout from "../LayoutElements/ColumnLayout";

const Canvas = ({ headerValue }) => {
  const { dragElement, setdragElement } = useContext(DragDropLayoutElement);
  const { emailTemplate, setEmailTemplate } = useContext(EmailTemplateContext);
  const [dragOver, setDragOver] = useState(false);

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
    console.log("Over...");
  };

  const onDropHandle = () => {
    console.log("object");
    console.log(dragElement?.dragLayout);
    console.log("Drop");
    setDragOver(false);
    if (dragElement?.dragLayout) {
      setEmailTemplate((prev) => [...prev, dragElement?.dragLayout]);
      console.log("Email", emailTemplate);
    }
  };

  const getLayoutComponent = (layout) =>{
    if (layout?.type ==='column') {
        return <ColumnLayout layout={layout}/>
    }
  }

  return (
    <div className="mt-20 flex justify-center">
      <div
        className={` shadow-xl p-6 w-full 
      ${headerValue === "desktop" ? "max-w-2xl" : "max-w-md"} 
      ${dragOver ? "bg-purple-200 p-4" : "bg-white"}
      `}
        onDragOver={onDragOver}
        onDrop={() => onDropHandle()}
      >
        {emailTemplate && emailTemplate.length > 0 ? (
          emailTemplate.map((layout, index) => (
            <div key={index}>
                {getLayoutComponent(layout)}
            </div>
          ))
        ) : (
          <p className="p-4 text-center bg-gray-100 border border-dashed border-gray-400 select-none cursor-pointer">Add layout Here</p>
        )}
      </div>
    </div>
  );
};

export default Canvas;
