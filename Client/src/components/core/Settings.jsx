import React, { useContext, useEffect, useState } from "react";
import { SelectedElement } from "../../context/SelectedElement";
import InputFields from "../Settings/InputFields";
import ColorPickerFields from "../Settings/ColorPickerFields";
import InputStyleField from "../Settings/InputStyleField";
import SliderFields from "../Settings/SliderFields";
import TextAreaFields from "../Settings/TextAreaFields";
import SelectFields from "../Settings/SelectFields";

const Settings = () => {
    const { selectedElement, setSelectedElement } = useContext(SelectedElement);
    const [element, setElement] = useState();

    useEffect(() => {
        setElement(selectedElement?.layout?.[selectedElement?.index]);
    }, [selectedElement]);

    // Function for updating non-style properties
    const onHandleInputChange = (fieldName, value) => {
        const updatedData = { ...selectedElement };
        updatedData.layout[selectedElement.index] = {
            ...updatedData.layout[selectedElement.index],
            [fieldName]: value,
        };
        setSelectedElement(updatedData);
    };

    // Function for updating style properties
    const onStyleChange = (fieldName, value) => {
        const updatedData = {
            ...selectedElement,
            layout: {
                ...selectedElement?.layout,
                [selectedElement?.index]: {
                    ...selectedElement?.layout[selectedElement?.index],
                    style: {
                        ...selectedElement?.layout[selectedElement?.index]?.style,
                        [fieldName]: value,
                    },
                },
            },
        };
        setSelectedElement(updatedData);
    };

    // Function for updating nested arrays
    const onArrayChange = (arrayName, newArrayValue) => {
        const updatedData = {
            ...selectedElement,
            layout: {
                ...selectedElement?.layout,
                [selectedElement?.index]: {
                    ...selectedElement?.layout[selectedElement?.index],
                    [arrayName]: newArrayValue,
                },
            },
        };
        setSelectedElement(updatedData);
    };

    // Delete element function
    const onDeleteElement = () => {
        if (!selectedElement) return;
        const { layout, index } = selectedElement;
        const updatedLayout = { ...layout };
        delete updatedLayout[index];
        
        setSelectedElement({
            layout: updatedLayout,
            index: null,
        });
        setElement(null);
    };

    // Text transform options
    const textTransformOptions = [
        { value: "none", label: "None" },
        { value: "uppercase", label: "UPPERCASE" },
        { value: "lowercase", label: "lowercase" },
        { value: "capitalize", label: "Capitalize" },
        { value: "initial", label: "Initial" },
        { value: "inherit", label: "Inherit" }
    ];

    // Text align options
    const textAlignOptions = [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
        { value: "justify", label: "Justify" }
    ];

    if (!element) {
        return <div className="p-5">Select an element to edit its settings.</div>;
    }

    return (
        <div className="p-5 flex flex-col gap-5">
            <h2 className="font-semibold text-2xl">{element.label} Settings</h2>

            {/* CONTENT/TEXTAREA/URL FIELDS - User-Friendly Labels */}
            {element.type === "Button" && element.content !== undefined && (
                <InputFields
                    label={"📝 Button Text (what it says)"}
                    value={element.content || ""}
                    onHandleInputChange={(value) => onHandleInputChange("content", value)}
                />
            )}
            
            {element.type === "Text" && element.textarea !== undefined && (
                <TextAreaFields
                    label={"📝 Your Text Content"}
                    value={element.textarea || ""}
                    onHandleInputChange={(value) => onHandleInputChange("textarea", value)}
                />
            )}
            
            {element?.url !== undefined && (
                <InputFields
                    label={"🔗 Website Link (where it goes when clicked)"}
                    value={element.url || ""}
                    onHandleInputChange={(value) => onHandleInputChange("url", value)}
                />
            )}

            {/* IMAGE/LOGO/HEADER IMAGE FIELDS - User-Friendly Labels */}
            {(element.type === "Image" || element.type === "Logo" || element.type === "LogoHeader") && element.imageUrl !== undefined && (
                <>
                    <InputFields
                        label={"🖼️ Picture Web Address (image URL)"}
                        value={element.imageUrl || ""}
                        onHandleInputChange={(value) => onHandleInputChange("imageUrl", value)}
                    />
                    <InputFields
                        label={"📄 Picture Description (for accessibility)"}
                        value={element.alt || ""}
                        onHandleInputChange={(value) => onHandleInputChange("alt", value)}
                    />
                </>
            )}

            {/* TEXT STYLE FIELDS - User-Friendly Labels */}
            {element?.style?.fontWeight !== undefined && (
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">🔤 Make Text Bold</label>
                    <button
                        className={`px-4 py-2 border rounded-md font-bold text-lg transition ${
                            element.style.fontWeight === "bold"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() =>
                            onStyleChange(
                                "fontWeight",
                                element.style.fontWeight === "bold" ? "normal" : "bold"
                            )
                        }
                    >
                        B
                    </button>
                </div>
            )}

            {/* TEXT TRANSFORM SELECT FIELD */}
            {element?.style?.textTransform !== undefined && (
                <SelectFields
                    label={"📝 Text Case Style"}
                    value={element?.style?.textTransform}
                    options={textTransformOptions}
                    onHandleInputChange={(value) => onStyleChange("textTransform", value)}
                />
            )}

            {/* TEXT ALIGN SELECT FIELD */}
            {element?.style?.textAlign !== undefined && (
                <SelectFields
                    label={"📐 Text Position"}
                    value={element?.style?.textAlign}
                    options={textAlignOptions}
                    onHandleInputChange={(value) => onStyleChange("textAlign", value)}
                />
            )}

            {element?.style?.lineHeight !== undefined && (
                <InputStyleField
                    label={"📏 Line Spacing (between lines)"}
                    value={element?.style?.lineHeight}
                    onStyleChange={(value) => onStyleChange("lineHeight", value)}
                    type=""
                />
            )}
            
            {element?.style?.letterSpacing !== undefined && (
                <InputStyleField
                    label={"🔤 Letter Spacing (between letters)"}
                    value={element?.style?.letterSpacing}
                    onStyleChange={(value) => onStyleChange("letterSpacing", value)}
                />
            )}

            {/* COLOR FIELDS - User-Friendly Labels */}
            {element?.style?.backgroundColor !== undefined && (
                <ColorPickerFields
                    label={"🎨 Background Color"}
                    value={element?.style?.backgroundColor}
                    onStyleChange={(value) => onStyleChange("backgroundColor", value)}
                />
            )}
            
            {element?.style?.color !== undefined && (
                <ColorPickerFields
                    label={"✏️ Text Color"}
                    value={element?.style?.color}
                    onStyleChange={(value) => onStyleChange("color", value)}
                />
            )}

            {/* SIZE & SPACING FIELDS - User-Friendly Labels */}
            {element?.style?.fontSize !== undefined && (
                <InputStyleField
                    label={"📏 Text Size"}
                    value={element?.style?.fontSize}
                    onStyleChange={(value) => onStyleChange("fontSize", value)}
                />
            )}
            
            {element?.style?.padding !== undefined && (
                <InputStyleField
                    label={"📦 Inner Spacing (inside element)"}
                    value={element?.style?.padding}
                    onStyleChange={(value) => onStyleChange("padding", value)}
                />
            )}

            {/* ENHANCED MARGIN CONTROLS - User-Friendly Labels */}
            <div className="border rounded-lg p-4 bg-blue-50">
                <h3 className="font-medium text-gray-800 mb-3">📏 Spacing Around Element</h3>
                <p className="text-xs text-gray-600 mb-3">Add space around your element (higher numbers = more space)</p>
                
                {/* Overall Margin */}
                {element?.style?.margin !== undefined && (
                    <InputStyleField
                        label={"🔄 Space All Around"}
                        value={element?.style?.margin}
                        onStyleChange={(value) => onStyleChange("margin", value)}
                    />
                )}

                {/* Individual Margin Controls with User-Friendly Names */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                    {element?.style?.marginTop !== undefined && (
                        <InputStyleField
                            label={"⬆️ Space Above"}
                            value={element?.style?.marginTop}
                            onStyleChange={(value) => onStyleChange("marginTop", value)}
                        />
                    )}
                    
                    {element?.style?.marginRight !== undefined && (
                        <InputStyleField
                            label={"➡️ Space Right Side"}
                            value={element?.style?.marginRight}
                            onStyleChange={(value) => onStyleChange("marginRight", value)}
                        />
                    )}
                    
                    {element?.style?.marginBottom !== undefined && (
                        <InputStyleField
                            label={"⬇️ Space Below"}
                            value={element?.style?.marginBottom}
                            onStyleChange={(value) => onStyleChange("marginBottom", value)}
                        />
                    )}
                    
                    {element?.style?.marginLeft !== undefined && (
                        <InputStyleField
                            label={"⬅️ Space Left Side"}
                            value={element?.style?.marginLeft}
                            onStyleChange={(value) => onStyleChange("marginLeft", value)}
                        />
                    )}
                </div>
            </div>

            {element?.style?.border !== undefined && (
                <InputFields
                    label={"🖼️ Border (e.g., 1px solid #000)"}
                    value={element?.style?.border}
                    onHandleInputChange={(value) => onStyleChange("border", value)}
                />
            )}
            
            {element?.style?.height !== undefined && (
                <InputStyleField
                    label={"📐 Height (how tall)"}
                    value={element?.style?.height}
                    onStyleChange={(value) => onStyleChange("height", value)}
                />
            )}

            {/* SLIDER FIELDS - User-Friendly Labels */}
            {element?.style?.borderRadius !== undefined && (
                <SliderFields
                    label={"🔘 Corner Roundness"}
                    value={element?.style?.borderRadius}
                    type="px"
                    min={0}
                    max={100}
                    onStyleChange={(value) => onStyleChange("borderRadius", value)}
                />
            )}
            
            {element?.style?.width !== undefined && (
                <SliderFields
                    label={"📏 Width (how wide)"}
                    value={element?.style?.width}
                    type="%"
                    min={0}
                    max={100}
                    onStyleChange={(value) => onStyleChange("width", value)}
                />
            )}

            {/* SOCIAL ICONS - User-Friendly Labels */}
            {element.type === "SocialIcons" && element.socialIcons && (
                <div>
                    <label className="font-medium">🔗 Social Media Links</label>
                    <p className="text-xs text-gray-600 mb-2">Add your social media profile links</p>
                    {element.socialIcons.map((social, index) => (
                        <div key={index} className="flex gap-2 items-end mb-4 border-b pb-2">
                            <InputFields
                                label={`📱 Social Icon ${index + 1} Picture`}
                                value={social.icon}
                                onHandleInputChange={(value) => {
                                    const newIcons = [...element.socialIcons];
                                    newIcons[index].icon = value;
                                    onArrayChange("socialIcons", newIcons);
                                }}
                            />
                            <InputFields
                                label={`🔗 Social Link ${index + 1} Address`}
                                value={social.url}
                                onHandleInputChange={(value) => {
                                    const newIcons = [...element.socialIcons];
                                    newIcons[index].url = value;
                                    onArrayChange("socialIcons", newIcons);
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* DELETE BUTTON - User-Friendly Label */}
            <hr className="my-4"/>
            <button
                onClick={onDeleteElement}
                className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition duration-200"
            >
                🗑️ Remove This {element.label}
            </button>
        </div>
    );
};

export default Settings;