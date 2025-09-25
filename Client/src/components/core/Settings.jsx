import React, { useContext, useEffect, useState } from "react";
import { SelectedElement } from "../../context/SelectedElement";
import { EmailTemplateContext } from "../../context/EmailTemplateContext";
import InputFields from "../Settings/InputFields";
import ColorPickerFields from "../Settings/ColorPickerFields";
import InputStyleField from "../Settings/InputStyleField";
import SliderFields from "../Settings/SliderFields";
import TextAreaFields from "../Settings/TextAreaFields";
import SelectFields from "../Settings/SelectFields";

// Import helper functions
import {
  updateElementProperty,
  updateElementStyle,
  updateElementArray,
  deleteElement,
  deleteColumn,
  updateColumnProperty,
  updateColumnWidth,
  autoDistributeWidths,
  addRowToColumn,
  removeRowFromColumn,
  getRowsInColumn,
  textTransformOptions,
  textAlignOptions,
  columnOptions,
} from "./SettingsHelpers";
import TextToolbar from "../ElementComponent/TextToolbar ";

const Settings = () => {
  const { selectedElement, setSelectedElement } = useContext(SelectedElement);
  const { emailTemplate, setEmailTemplate } = useContext(EmailTemplateContext);
  const [element, setElement] = useState();
  const [isColumn, setIsColumn] = useState(false);

  useEffect(() => {
    setIsColumn(selectedElement?.isColumn || false);
    if (selectedElement?.index && selectedElement?.index !== "column") {
      setElement(selectedElement?.layout?.[selectedElement?.index]);
    } else {
      setElement(null);
    }
  }, [selectedElement]);

  // No Selection State
  if (!selectedElement) {
    return (
      <div className="p-5 text-center text-gray-500">
        <div className="text-lg font-medium mb-2">No Selection</div>
        <div className="text-sm">
          Click on an element or column to edit its settings
        </div>
      </div>
    );
  }

  // Column Settings
  if (isColumn) {
    const columnWidths =
      selectedElement.layout.columnWidths ||
      Array(selectedElement.layout.numOfCol).fill(
        100 / selectedElement.layout.numOfCol
      );

    return (
      <div className="p-5 flex flex-col gap-4">
        <h2 className="font-semibold text-xl">Column Settings</h2>

        {/* Column Configuration */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium mb-3">Configuration</h3>

          <SelectFields
            label="Number of Columns"
            value={selectedElement.layout.numOfCol}
            options={columnOptions}
            onHandleInputChange={(value) => {
              const newNumCols = parseInt(value);
              const equalWidth = 100 / newNumCols;
              const newWidths = Array(newNumCols).fill(equalWidth);
              updateColumnProperty(
                selectedElement,
                setSelectedElement,
                setEmailTemplate,
                "numOfCol",
                newNumCols
              );
              updateColumnProperty(
                selectedElement,
                setSelectedElement,
                setEmailTemplate,
                "columnWidths",
                newWidths
              );
            }}
          />
        </div>

        {/* Width Controls */}
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Column Widths</h3>
            <button
              onClick={() =>
                autoDistributeWidths(
                  selectedElement,
                  setSelectedElement,
                  setEmailTemplate
                )
              }
              className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
            >
              Auto Distribute
            </button>
          </div>

          {columnWidths.map((width, index) => (
            <div key={index} className="mb-3">
              <SliderFields
                label={`Column ${index + 1}`}
                value={`${Math.round(width)}%`}
                type="%"
                min={5}
                max={95}
                onStyleChange={(value) => {
                  const numericValue = parseInt(value.replace("%", ""));
                  updateColumnWidth(
                    selectedElement,
                    setSelectedElement,
                    setEmailTemplate,
                    index,
                    numericValue
                  );
                }}
              />
            </div>
          ))}

          <div className="text-xs text-green-600">
            Total:{" "}
            {Math.round(columnWidths.reduce((sum, width) => sum + width, 0))}%
          </div>
        </div>

        {/* Row Management */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-medium mb-3">Row Management</h3>

          {Array.from({ length: selectedElement.layout.numOfCol }).map(
            (_, columnIndex) => {
              const currentRows = getRowsInColumn(
                selectedElement.layout,
                columnIndex
              );

              return (
                <div key={columnIndex} className="bg-white p-3 rounded mb-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">
                      Column {columnIndex + 1}
                    </span>
                    <span className="text-xs text-gray-500">
                      {currentRows} rows
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        addRowToColumn(
                          selectedElement,
                          setEmailTemplate,
                          setSelectedElement,
                          columnIndex
                        )
                      }
                      className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                    >
                      Add Row
                    </button>

                    {currentRows > 1 && (
                      <button
                        onClick={() =>
                          removeRowFromColumn(
                            selectedElement,
                            setEmailTemplate,
                            setSelectedElement,
                            columnIndex,
                            currentRows - 1
                          )
                        }
                        className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                      >
                        Remove Row
                      </button>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Column Styling */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-3">Styling</h3>

          <ColorPickerFields
            label="Background Color"
            value={selectedElement.layout.backgroundColor || "#ffffff"}
            onStyleChange={(value) =>
              updateColumnProperty(
                selectedElement,
                setSelectedElement,
                setEmailTemplate,
                "backgroundColor",
                value
              )
            }
          />

          <InputStyleField
            label="Gap Between Columns"
            value={selectedElement.layout.gap || "2px"}
            onStyleChange={(value) =>
              updateColumnProperty(
                selectedElement,
                setSelectedElement,
                setEmailTemplate,
                "gap",
                value
              )
            }
          />

          <InputStyleField
            label="Padding"
            value={selectedElement.layout.padding || "0px"}
            onStyleChange={(value) =>
              updateColumnProperty(
                selectedElement,
                setSelectedElement,
                setEmailTemplate,
                "padding",
                value
              )
            }
          />
          <InputStyleField
            label="Vertical Gap Between Columns"
            value={selectedElement.layout.verticalGap || "10px"}
            onStyleChange={(value) =>
              updateColumnProperty(
                selectedElement,
                setSelectedElement,
                setEmailTemplate,
                "verticalGap",
                value
              )
            }
          />

          <SliderFields
            label="Border Radius"
            value={selectedElement.layout.borderRadius || "0px"}
            type="px"
            min={0}
            max={20}
            onStyleChange={(value) =>
              updateColumnProperty(
                selectedElement,
                setSelectedElement,
                setEmailTemplate,
                "borderRadius",
                value
              )
            }
          />
        </div>

        {/* Delete Column */}
        <button
          onClick={() =>
            deleteColumn(
              selectedElement,
              setEmailTemplate,
              setSelectedElement,
              setElement
            )
          }
          className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600"
        >
          Delete Column Layout
        </button>
      </div>
    );
  }

  // Empty Slot State
  if (!element) {
    return (
      <div className="p-5 text-center text-gray-500">
        <div className="text-lg font-medium mb-2">Empty Slot</div>
        <div className="text-sm">Drag an element here to start editing</div>
      </div>
    );
  }

  // Element Settings
  return (
    <div className="p-5 flex flex-col gap-4">
      <h2 className="font-semibold text-xl">{element.label} Settings</h2>

      {/* Content Fields */}
      {element.type === "Button" && element.content !== undefined && (
        <>
          <InputFields
            label="Button Text"
            value={element.content || ""}
            onHandleInputChange={(value) =>
              updateElementProperty(
                selectedElement,
                setSelectedElement,
                "content",
                value
              )
            }
          />

          {/* Button Position Dropdown */}
          <SelectFields
            label="Button Position"
            value={element?.outerStyle?.justifyContent || "center"}
            options={[
              { label: "Left", value: "left" },
              { label: "Right", value: "right" },
              { label: "Top", value: "top" },
              { label: "Bottom", value: "bottom" },
              { label: "Center", value: "center" },
            ]}
            onHandleInputChange={(value) => {
              const alignMap = {
                left: { justifyContent: "flex-start", alignItems: "center" },
                right: { justifyContent: "flex-end", alignItems: "center" },
                top: { justifyContent: "center", alignItems: "flex-start" },
                bottom: { justifyContent: "center", alignItems: "flex-end" },
                center: { justifyContent: "center", alignItems: "center" },
              };
              const newOuter = alignMap[value];

              setSelectedElement((prev) => {
                const updated = {
                  ...prev,
                  layout: {
                    ...prev.layout,
                    [prev.index]: {
                      ...prev.layout[prev.index],
                      outerStyle: {
                        ...prev.layout[prev.index]?.outerStyle,
                        ...newOuter,
                      },
                    },
                  },
                };
                setEmailTemplate((t) =>
                  t.map((col) =>
                    col.id === prev.layout.id ? updated.layout : col
                  )
                );
                return updated;
              });
            }}
          />
        </>
      )}

      {element.type === "Text" && element.textarea !== undefined && (
        <>
          <TextToolbar targetId={selectedElement.index} />

          <TextAreaFields
            label="Text Content"
            value={element.textarea || ""}
            onHandleInputChange={(value) =>
              updateElementProperty(
                selectedElement,
                setSelectedElement,
                "textarea",
                value
              )
            }
          />
        </>
      )}

      {element?.url !== undefined && (
        <InputFields
          label="Link URL"
          value={element.url || ""}
          onHandleInputChange={(value) =>
            updateElementProperty(
              selectedElement,
              setSelectedElement,
              "url",
              value
            )
          }
        />
      )}

      {/* Image Fields */}
      {(element.type === "Image" ||
        element.type === "Logo" ||
        element.type === "LogoHeader") &&
        element.imageUrl !== undefined && (
          <>
            <InputFields
              label="Image URL"
              value={element.imageUrl || ""}
              onHandleInputChange={(value) =>
                updateElementProperty(
                  selectedElement,
                  setSelectedElement,
                  "imageUrl",
                  value
                )
              }
            />
            <InputFields
              label="Alt Text"
              value={element.alt || ""}
              onHandleInputChange={(value) =>
                updateElementProperty(
                  selectedElement,
                  setSelectedElement,
                  "alt",
                  value
                )
              }
            />

            {/* Object Fit */}
            <SelectFields
              label="Object Fit"
              value={element?.style?.objectFit || "contain"}
              options={[
                { label: "Cover", value: "cover" },
                { label: "Contain", value: "contain" },
                { label: "Fill", value: "fill" },
                { label: "None", value: "none" },
                { label: "Scale Down", value: "scale-down" },
              ]}
              onHandleInputChange={(value) =>
                updateElementStyle(
                  selectedElement,
                  setSelectedElement,
                  "objectFit",
                  value
                )
              }
            />

            {/* Object Position */}
            <SelectFields
              label="Object Position"
              value={element?.style?.objectPosition || "center"}
              options={[
                { label: "Top", value: "top" },
                { label: "Center", value: "center" },
                { label: "Bottom", value: "bottom" },
                { label: "Left", value: "left" },
                { label: "Right", value: "right" },
              ]}
              onHandleInputChange={(value) =>
                updateElementStyle(
                  selectedElement,
                  setSelectedElement,
                  "objectPosition",
                  value
                )
              }
            />
            <SliderFields
              label="Height"
              value={element?.style?.height || "200px"}
              type="px"
              min={50}
              max={1000}
              onStyleChange={(value) =>
                updateElementStyle(
                  selectedElement,
                  setSelectedElement,
                  "height",
                  value
                )
              }
            />
          </>
        )}

      {/* Text Styling */}
      {element?.style?.fontWeight !== undefined && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Bold Text</label>
          <button
            className={`px-4 py-2 border rounded font-bold ${
              element.style.fontWeight === "bold"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() =>
              updateElementStyle(
                selectedElement,
                setSelectedElement,
                "fontWeight",
                element.style.fontWeight === "bold" ? "normal" : "bold"
              )
            }
          >
            B
          </button>
        </div>
      )}

      {element?.style?.textTransform !== undefined && (
        <SelectFields
          label="Text Transform"
          value={element?.style?.textTransform}
          options={textTransformOptions}
          onHandleInputChange={(value) =>
            updateElementStyle(
              selectedElement,
              setSelectedElement,
              "textTransform",
              value
            )
          }
        />
      )}

      {element?.style?.textAlign !== undefined && (
        <SelectFields
          label="Text Alignment"
          value={element?.style?.textAlign}
          options={textAlignOptions}
          onHandleInputChange={(value) =>
            updateElementStyle(
              selectedElement,
              setSelectedElement,
              "textAlign",
              value
            )
          }
        />
      )}

      {/* Colors */}
      {element?.style?.backgroundColor !== undefined && (
        <ColorPickerFields
          label="Background Color"
          value={element?.style?.backgroundColor}
          onStyleChange={(value) =>
            updateElementStyle(
              selectedElement,
              setSelectedElement,
              "backgroundColor",
              value
            )
          }
        />
      )}

      {element?.style?.color !== undefined && (
        <ColorPickerFields
          label="Text Color"
          value={element?.style?.color}
          onStyleChange={(value) =>
            updateElementStyle(
              selectedElement,
              setSelectedElement,
              "color",
              value
            )
          }
        />
      )}

      {/* Size & Spacing */}
      {element?.style?.fontSize !== undefined && (
        <InputStyleField
          label="Font Size"
          value={element?.style?.fontSize}
          onStyleChange={(value) =>
            updateElementStyle(
              selectedElement,
              setSelectedElement,
              "fontSize",
              value
            )
          }
        />
      )}

      {element?.style?.padding !== undefined && (
        <InputStyleField
          label="Padding"
          value={element?.style?.padding}
          onStyleChange={(value) =>
            updateElementStyle(
              selectedElement,
              setSelectedElement,
              "padding",
              value
            )
          }
        />
      )}

      {element?.style?.borderRadius !== undefined && (
        <SliderFields
          label="Border Radius"
          value={element?.style?.borderRadius}
          type="px"
          min={0}
          max={50}
          onStyleChange={(value) =>
            updateElementStyle(
              selectedElement,
              setSelectedElement,
              "borderRadius",
              value
            )
          }
        />
      )}

      {element?.style?.width !== undefined && (
        <SliderFields
          label="Width"
          value={element?.style?.width}
          type="%"
          min={0}
          max={100}
          onStyleChange={(value) =>
            updateElementStyle(
              selectedElement,
              setSelectedElement,
              "width",
              value
            )
          }
        />
      )}

      {/* Social Icons */}
      {element.type === "SocialIcons" && element.socialIcons && (
        <div>
          <label className="font-medium mb-2 block">Social Media Links</label>
          {element.socialIcons.map((social, index) => (
            <div key={index} className="border-b pb-3 mb-3">
              <InputFields
                label={`Icon ${index + 1} URL`}
                value={social.icon}
                onHandleInputChange={(value) => {
                  const newIcons = [...element.socialIcons];
                  newIcons[index].icon = value;
                  updateElementArray(
                    selectedElement,
                    setSelectedElement,
                    "socialIcons",
                    newIcons
                  );
                }}
              />
              <InputFields
                label={`Link ${index + 1} URL`}
                value={social.url}
                onHandleInputChange={(value) => {
                  const newIcons = [...element.socialIcons];
                  newIcons[index].url = value;
                  updateElementArray(
                    selectedElement,
                    setSelectedElement,
                    "socialIcons",
                    newIcons
                  );
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Delete Element */}
      <button
        onClick={() =>
          deleteElement(selectedElement, setSelectedElement, setElement)
        }
        className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600"
      >
        Delete {element.label}
      </button>
    </div>
  );
};

export default Settings;
