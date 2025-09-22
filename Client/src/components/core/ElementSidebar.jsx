import React from "react";
import Layout from "../../Data/Layout";
import ElementLayoutCart from "./ElementLayoutCart";
import ElementList from "../../Data/ElementList";
import { useContext } from "react";
import { DragDropLayoutElement } from "../../context/DragDropLayoutElement";

const ElementSidebar = () => {

    const {dragElement,setdragElement} = useContext(DragDropLayoutElement)
    const onDragLayoutStart = (elem) =>{
        console.log(elem)
        setdragElement({
            dragLayout:{
                ...elem,
                id:Date.now()
            }
        })
    }


  return (
    <div className="p-5 h-full shadow-md">
      <h2 className="font-semibold text-2xl">Layouts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
        {Layout.map((elem, index) => (
          <div key={index} draggable onDragStart={()=>onDragLayoutStart(elem)}>
            <ElementLayoutCart elem={elem} />
          </div>
        ))}
      </div>

      <h2 className="font-semibold text-2xl mt-6">Elements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
        {ElementList.map((element, index) => (
          <div key={index} draggable>
            <ElementLayoutCart elem={element} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElementSidebar;
