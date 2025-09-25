// -------------------- Element Helpers --------------------

// Update non-style properties of an element
export const updateElementProperty = (selectedElement, setSelectedElement, fieldName, value) => {
    const updatedData = { ...selectedElement };
    updatedData.layout[selectedElement.index] = {
        ...updatedData.layout[selectedElement.index],
        [fieldName]: value,
    };
    setSelectedElement(updatedData);
};

// Update style properties of an element
export const updateElementStyle = (selectedElement, setSelectedElement, fieldName, value) => {
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

// Update nested arrays (like social icons)
export const updateElementArray = (selectedElement, setSelectedElement, arrayName, newArrayValue) => {
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

// Delete an element
export const deleteElement = (selectedElement, setSelectedElement, setElement) => {
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

// -------------------- Column Helpers --------------------

// Delete entire column layout
export const deleteColumn = (selectedElement, setEmailTemplate, setSelectedElement, setElement) => {
    if (!selectedElement) return;

    setEmailTemplate((prevTemplate) =>
        prevTemplate?.filter((col) => col.id !== selectedElement.layout.id)
    );

    setSelectedElement(null);
    setElement(null);
};

// Update column property (like gap, padding, background, etc.)
export const updateColumnProperty = (selectedElement, setSelectedElement, setEmailTemplate, property, value) => {
    setEmailTemplate((prevTemplate) =>
        prevTemplate?.map((col) =>
            col.id === selectedElement.layout.id
                ? { ...col, [property]: value }
                : col
        )
    );

    setSelectedElement({
        ...selectedElement,
        layout: {
            ...selectedElement.layout,
            [property]: value,
        },
    });
};

// Update individual column width
export const updateColumnWidth = (selectedElement, setSelectedElement, setEmailTemplate, columnIndex, newWidth) => {
    const currentWidths =
        selectedElement.layout.columnWidths ||
        Array(selectedElement.layout.numOfCol).fill(100 / selectedElement.layout.numOfCol);

    const updatedWidths = [...currentWidths];
    updatedWidths[columnIndex] = Math.max(5, Math.min(95, newWidth));

    updateColumnProperty(selectedElement, setSelectedElement, setEmailTemplate, "columnWidths", updatedWidths);
};

// Auto distribute column widths equally
export const autoDistributeWidths = (selectedElement, setSelectedElement, setEmailTemplate) => {
    const equalWidth = 100 / selectedElement.layout.numOfCol;
    const newWidths = Array(selectedElement.layout.numOfCol).fill(equalWidth);

    updateColumnProperty(selectedElement, setSelectedElement, setEmailTemplate, "columnWidths", newWidths);
};

// -------------------- Row Helpers --------------------

// Add row to column
export const addRowToColumn = (selectedElement, setEmailTemplate, setSelectedElement, columnIndex) => {
    const layout = selectedElement.layout;
    const currentRows = Object.keys(layout).filter((key) =>
        key.startsWith(`col_${columnIndex}_row_`)
    ).length;

    const newRowIndex = currentRows;

    // Update template
    setEmailTemplate((prevTemplate) =>
        prevTemplate?.map((col) =>
            col.id === selectedElement.layout.id
                ? { ...col, [`col_${columnIndex}_row_${newRowIndex}`]: null }
                : col
        )
    );

    // Update selected element
    setSelectedElement((prev) => ({
        ...prev,
        layout: {
            ...prev.layout,
            [`col_${columnIndex}_row_${newRowIndex}`]: null,
        },
    }));
};

// Remove row from column
export const removeRowFromColumn = (selectedElement, setEmailTemplate, setSelectedElement, columnIndex, rowIndex) => {
    // Update template
    setEmailTemplate((prevTemplate) =>
        prevTemplate?.map((col) => {
            if (col.id === selectedElement.layout.id) {
                const updatedCol = { ...col };
                delete updatedCol[`col_${columnIndex}_row_${rowIndex}`];
                return updatedCol;
            }
            return col;
        })
    );

    // Update selected element
    setSelectedElement((prev) => {
        const updatedLayout = { ...prev.layout };
        delete updatedLayout[`col_${columnIndex}_row_${rowIndex}`];
        return { ...prev, layout: updatedLayout };
    });
};

// Get number of rows in a column
export const getRowsInColumn = (layout, columnIndex) => {
    const keys = Object.keys(layout).filter((key) =>
        key.startsWith(`col_${columnIndex}_row_`)
    );
    return Math.max(1, keys.length);
};

// -------------------- Dropdown Options --------------------
export const textTransformOptions = [
    { value: "none", label: "None" },
    { value: "uppercase", label: "UPPERCASE" },
    { value: "lowercase", label: "lowercase" },
    { value: "capitalize", label: "Capitalize" },
    { value: "initial", label: "Initial" },
    { value: "inherit", label: "Inherit" },
];

export const textAlignOptions = [
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
    { value: "justify", label: "Justify" },
];

export const columnOptions = [
    { value: 1, label: "1 Column" },
    { value: 2, label: "2 Columns" },
    { value: 3, label: "3 Columns" },
    { value: 4, label: "4 Columns" },
];
