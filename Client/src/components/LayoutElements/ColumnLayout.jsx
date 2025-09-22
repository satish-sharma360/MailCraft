import { Flame } from "lucide-react";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { EmailTemplateContext } from "../../context/EmailTemplateContext";
import { DragDropLayoutElement } from "../../context/DragDropLayoutElement";

const ColumnLayout = ({ layout }) => {
  
  const [dragOver, setDragOver] = useState();
  const {emailTemplate , setEmailTemplate} = useContext(EmailTemplateContext)
const { dragElement, setdragElement } = useContext(DragDropLayoutElement);
  

  const onDragOverHandle = (event, index) => {
    event.preventDefault();
    setDragOver({
        index:index,
        columnId:layout?.id
    })
  };

  const onDropHandle = () =>{
    const index = dragOver?.index
    setEmailTemplate(prevItem=>
        prevItem?.map(col=>col.id === layout?.id?{...col ,[index]:dragElement?.dragElementLayout}:col)
    )
    setDragOver(null)
  }

  const getElementComponent = (element) =>{
    console.log(element)
    return element?.type
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol},1fr)`,
          gap: "0px",
        }}
      >
        {Array.from({ length: layout?.numOfCol }).map((__dirname, index) => (
          <div
            key={index}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDrop={onDropHandle}
            className={`p-2 flex items-center justify-center
            ${(index === dragOver?.index && dragOver?.columnId)?'bg-green-100' : 'bg-gray-100'}  border border-dashed border-gray-400`}
          >
            {getElementComponent(layout?.[index]) ?? 'Drag Element Here'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnLayout;
