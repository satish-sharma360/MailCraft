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

const ColumnLayout = ({ layout }) => {
  const [dragOver, setDragOver] = useState();
  const { emailTemplate, setEmailTemplate } = useContext(EmailTemplateContext);
  const { dragElement, setdragElement } = useContext(DragDropLayoutElement);

  const onDragOverHandle = (event, index) => {
    event.preventDefault();
    setDragOver({
      index: index,
      columnId: layout?.id,
    });
  };

  const onDropHandle = () => {
    const index = dragOver?.index;
    setEmailTemplate((prevItem) =>
      prevItem?.map((col) =>
        col.id === layout?.id
          ? { ...col, [index]: dragElement?.dragElementLayout }
          : col
      )
    );
    console.log("Email template", emailTemplate);
    setDragOver(null);
  };

  const getElementComponent = (element) => {
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
            className={`p-2 flex items-center justify-center
              ${!layout?.[index]?.type && 'border bg-gray-100 border-dashed border-gray-400'}
      ${
        index === dragOver?.index && dragOver?.columnId
          ? "bg-green-100"
          : ""
      } `}
          >
            {getElementComponent(layout?.[index]) ?? "Drag Element Here"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnLayout;
