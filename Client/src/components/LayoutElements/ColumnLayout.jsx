import React, { useContext, useState } from "react";
import { EmailTemplateContext } from "../../context/EmailTemplateContext";
import { DragDropLayoutElement } from "../../context/DragDropLayoutElement";
import { SelectedElement } from "../../context/SelectedElement";

import ButtonComponent from "../ElementComponent/ButtonComponent";
import TextComponent from "../ElementComponent/TextComponent";
import ImageComponent from "../ElementComponent/ImageComponent";
import LogoComponent from "../ElementComponent/LogoComponent";
import DividerComponent from "../ElementComponent/DividerComponent";
import SocialIconsComponent from "../ElementComponent/SocialIconsComponent";
import LogoHeaderComponent from "../ElementComponent/LogoHeaderComponent";

const ColumnLayout = ({
  layout,
  isNested = false,
  parentLayout = null,
  parentIndex = null,
}) => {
  const [dragOver, setDragOver] = useState(null);
  const { setEmailTemplate } = useContext(EmailTemplateContext);
  const { dragElement } = useContext(DragDropLayoutElement);
  const { selectedElement, setSelectedElement } = useContext(SelectedElement);

  // Initialize equal widths if not set
  const initializeColumnWidths = (numCols) => {
    if (!layout.columnWidths) {
      const equalWidth = 100 / numCols;
      return Array(numCols).fill(equalWidth);
    }
    return layout.columnWidths;
  };

  // Handle drag over for rows
  const onDragOverHandle = (event, columnIndex, rowIndex) => {
    event.preventDefault();
    setDragOver({
      columnIndex,
      rowIndex,
      columnId: layout?.id,
    });
  };

  // Handle drop into specific row
  const onDropHandle = (columnIndex, rowIndex) => {
    const droppedItem =
      dragElement?.dragElementLayout || dragElement?.dragLayout;
    if (!droppedItem) return;

    const elementKey = `col_${columnIndex}_row_${rowIndex}`;

    // Update emailTemplate
    setEmailTemplate((prevTemplate) =>
      prevTemplate?.map((col) =>
        col.id === layout?.id ? { ...col, [elementKey]: droppedItem } : col
      )
    );

    // Update selectedElement too
    setSelectedElement((prev) => ({
      ...prev,
      layout: {
        ...layout,
        [elementKey]: droppedItem,
      },
      index: elementKey,
    }));

    setDragOver(null);
  };

  // When clicking on column background
  const handleColumnClick = (e) => {
    e.stopPropagation();
    setSelectedElement({
      layout: layout,
      index: "column",
      isColumn: true,
    });
  };

  // Get number of rows inside a column
  const getRowsForColumn = (columnIndex) => {
    const keys = Object.keys(layout).filter((key) =>
      key.startsWith(`col_${columnIndex}_row_`)
    );
    return Math.max(1, keys.length); // Always at least 1 row
  };

  // Render element based on type
  const getElementComponent = (element) => {
    if (element?.type === "column") {
      return (
        <ColumnLayout
          layout={element}
          isNested={true}
          parentLayout={layout}
          parentIndex={parentIndex}
        />
      );
    }
    if (element?.type === "Button") return <ButtonComponent {...element} />;
    if (element?.type === "Text") return <TextComponent {...element} />;
    if (element?.type === "Image") return <ImageComponent {...element} />;
    if (element?.type === "Logo") return <LogoComponent {...element} />;
    if (element?.type === "Divider") return <DividerComponent {...element} />;
    if (element?.type === "SocialIcons")
      return <SocialIconsComponent {...element} />;
    if (element?.type === "LogoHeader")
      return <LogoHeaderComponent {...element} />;
    return element?.type;
  };

  const isColumnSelected =
    selectedElement?.layout?.id === layout?.id && selectedElement?.isColumn;
  const columnWidths = initializeColumnWidths(layout.numOfCol);

  return (
    <div
      className={`relative ${isNested ? "nested-column" : "main-column"}`}
      onClick={handleColumnClick}
      style={{
        // Remove any default margins/padding that might cause spacing
        margin: 0,
        padding: 0,
        lineHeight: 1,
      }}
    >
      <div
        className={`transition-all duration-200 ${
          isColumnSelected ? "border-2 border-blue-500 rounded" : ""
        }`}
        style={{
          display: "grid",
          gridTemplateColumns: columnWidths
            .map(
              (width) =>
                `calc(${width}% - ${
                  ((layout.gap || 0) * (layout.numOfCol - 1)) / layout.numOfCol
                }px)`
            )
            .join(" "),

          gap: layout.gap || "0px", // <-- Add a default gap
          minHeight: layout.minHeight || "auto",
          backgroundColor: layout.backgroundColor || "transparent",
          padding: layout.padding || "0px",
          borderRadius: layout.borderRadius || "0px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, columnIndex) => {
          const rowsInColumn = getRowsForColumn(columnIndex);

          return (
            <div
              key={columnIndex}
              className="flex flex-col"
              style={{
                gap: "0px",
                margin: 0,
                padding: 0,
                marginBottom: layout.verticalGap || "10px", // <-- vertical spacing
                height: "fit-content",
                boxSizing: "border-box",
              }}
            >
              {Array.from({ length: rowsInColumn }).map((_, rowIndex) => {
                const elementKey = `col_${columnIndex}_row_${rowIndex}`;
                const element = layout[elementKey];
                const isElementSelected =
                  selectedElement?.layout?.id === layout?.id &&
                  selectedElement?.index === elementKey;

                return (
                  <div
                    key={`${columnIndex}-${rowIndex}`}
                    onDragOver={(event) =>
                      onDragOverHandle(event, columnIndex, rowIndex)
                    }
                    onDrop={() => onDropHandle(columnIndex, rowIndex)}
                    className={`relative cursor-pointer transition-all duration-200 
              ${
                !element?.type
                  ? "border border-dashed border-gray-300 bg-gray-50 rounded"
                  : ""
              } 
              ${
                dragOver?.columnIndex === columnIndex &&
                dragOver?.rowIndex === rowIndex &&
                dragOver?.columnId === layout?.id
                  ? "border-2 border-green-400 bg-green-50 rounded"
                  : ""
              } 
              ${
                isElementSelected
                  ? "border-2 border-blue-500 bg-blue-50 rounded"
                  : ""
              }`}
                    style={{
                      minHeight: element?.type ? "auto" : "60px",
                      height: "fit-content",
                      margin: 0,
                      padding: 0,
                      width: "100%",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedElement({ layout: layout, index: elementKey });
                    }}
                  >
                    {element ? (
                      <div
                        style={{
                          width: "100%",
                          height: "fit-content",
                          margin: 0,
                          padding: 0,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {getElementComponent(element)}
                      </div>
                    ) : (
                      <div
                        className="flex items-center justify-center text-gray-400 text-sm"
                        style={{
                          height: "60px",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        Drop Element Here
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColumnLayout;
