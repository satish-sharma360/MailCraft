import { Flame } from "lucide-react";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { EmailTemplateContext } from "../../context/EmailTemplateContext";
import { DragDropLayoutElement } from "../../context/DragDropLayoutElement";
import ButtonComponent from "../ElementComponent/ButtonComponent";
import TextComponent from "../ElementComponent/TextComponent";
import ImageComponent from "../ElementComponent/ImageComponent";
import LogoComponent from "../ElementComponent/LogoComponent";
import DividerComponent from "../ElementComponent/DividerComponent";
import SocialIconsComponent from "../ElementComponent/SocialIconsComponent";
import LogoHeaderComponent from "../ElementComponent/LogoHeaderComponent";
import { SelectedElement } from "../../context/SelectedElement";

const ColumnLayout = ({ layout }) => {
  const [dragOver, setDragOver] = useState();
  const { emailTemplate, setEmailTemplate } = useContext(EmailTemplateContext);
  const { dragElement, setdragElement } = useContext(DragDropLayoutElement);
  const {selectedElement , setSelectedElement} = useContext(SelectedElement)


  const onDragOverHandle = (event, index) => {
        event.preventDefault();
        setDragOver({
            index: index,
            columnId: layout?.id,
        });
    };

    const onDropHandle = () => {
        const index = dragOver?.index;
        
        // --- CRUCIAL CHANGE FOR NESTING ---
        // Determine the dropped item: an element (dragElementLayout) or a column (dragLayout)
        const droppedItem = dragElement?.dragElementLayout || dragElement?.dragLayout;
        // --- END CRUCIAL CHANGE ---

        // Find the top-level parent layout in emailTemplate and update it
        setEmailTemplate((prevItem) =>
            prevItem?.map((col) =>
                col.id === layout?.id
                    // If it's the top-level parent column, update its content slot
                    ? { ...col, [index]: droppedItem }
                    // Otherwise, return the original item
                    : col
            )
        );

        setDragOver(null);
    };

    const getElementComponent = (element) => {
        // 1. CHECK FOR NESTED COLUMN LAYOUT FIRST
        if (element?.type === 'column') {
            // Recursive call to render the nested column
            return <ColumnLayout layout={element} />;
        }

        // 2. CHECK FOR REGULAR ELEMENTS
        if (element?.type === "Button") {
            return <ButtonComponent {...element} />;
        } else if (element?.type === "Text") {
            return <TextComponent {...element} />;
        } else if (element?.type === "Image") {
            return <ImageComponent {...element} />;
        } else if (element?.type === "Logo") {
            return <LogoComponent {...element} />;
        } else if (element?.type === "Divider") {
            return <DividerComponent {...element} />;
        } else if (element?.type === "SocialIcons") {
            return <SocialIconsComponent {...element} />;
        } else if (element?.type === "LogoHeader") {
            return <LogoHeaderComponent {...element} />;
        }
        return element?.type;
    };

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
                        className={` flex items-center justify-center cursor-pointer
                         ${!layout?.[index]?.type && "border bg-gray-100 border-dashed border-gray-400"}
                         ${index === dragOver?.index && dragOver?.columnId ? "bg-green-100" : ""} 
                         ${(selectedElement?.layout?.id == layout?.id && selectedElement?.index == index) && 'border border-blue-500'}`}

                        onClick={() => setSelectedElement({ layout: layout, index: index })}
                    >
                        {getElementComponent(layout?.[index]) ?? "Drag Element Here"}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColumnLayout;
