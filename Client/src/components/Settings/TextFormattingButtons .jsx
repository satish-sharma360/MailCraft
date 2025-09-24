import { useContext } from "react";
import { SelectedElement } from "../../context/SelectedElement";

const TextFormattingButtons = () => {
    const { selectedElement, setSelectedElement } = useContext(SelectedElement);
    const textRef = useRef();

    const applyStyle = (style, value = null) => {
        document.execCommand(style, false, value);
    };

    const applyCustomStyle = (tag, style, value) => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        const range = selection.getRangeAt(0);

        if (range.collapsed) return;

        const container = document.createElement(tag);
        container.style[style] = value;
        range.surroundContents(container);
    };

    const handleStyleChange = (style, value) => {
        if (!selectedElement) return;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = selectedElement.layout[selectedElement.index].textarea;
        
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        
        if (range) {
            const span = document.createElement('span');
            span.style[style] = value;
            try {
                range.surroundContents(span);
                const newContent = textRef.current.innerHTML;
                const updatedData = { ...selectedElement };
                updatedData.layout[selectedElement.index].textarea = newContent;
                setSelectedElement(updatedData);
            } catch (error) {
                console.error("Error applying style:", error);
            }
        }
    };
    
    return (
        <div className="flex flex-wrap gap-2 p-2 border rounded-md">
            <button
                className="p-2 border rounded-md hover:bg-gray-200"
                onClick={() => applyStyle('bold')}
            >
                <Bold size={16} />
            </button>
            <button
                className="p-2 border rounded-md hover:bg-gray-200"
                onClick={() => applyStyle('italic')}
            >
                <Italic size={16} />
            </button>
            <button
                className="p-2 border rounded-md hover:bg-gray-200"
                onClick={() => applyStyle('underline')}
            >
                <Underline size={16} />
            </button>
            <input
                type="color"
                className="w-8 h-8 cursor-pointer"
                onChange={(e) => applyStyle('foreColor', e.target.value)}
            />
            <input
                type="color"
                className="w-8 h-8 cursor-pointer"
                onChange={(e) => applyStyle('backColor', e.target.value)}
            />
            <button
                className="p-2 border rounded-md hover:bg-gray-200"
                onClick={() => applyStyle('insertHTML', `<span style="background-color:yellow;">${window.getSelection().toString()}</span>`)}
            >
                <Highlighter size={16} />
            </button>
        </div>
    );
};
export default TextFormattingButtons