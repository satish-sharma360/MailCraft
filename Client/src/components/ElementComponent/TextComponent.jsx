import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Palette,
  Minus,
} from "lucide-react";

export default function TextComponent(props, ref) {
  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [activeFormats, setActiveFormats] = useState({});
  const [padding, setPadding] = useState("16px");

  const exec = (cmd, val = null) => {
    document.execCommand(cmd, false, val);
    updateActiveFormats();
    editorRef.current.focus();
  };

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      justifyLeft: document.queryCommandState("justifyLeft"),
      justifyCenter: document.queryCommandState("justifyCenter"),
      justifyRight: document.queryCommandState("justifyRight"),
      justifyFull: document.queryCommandState("justifyFull"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
    });
  };

  useImperativeHandle(ref, () => ({
    getHTML: () => editorRef.current.innerHTML,
  }));

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);

    const handleClickOutside = (e) => {
      if (
        editorRef.current &&
        !editorRef.current.contains(e.target) &&
        toolbarRef.current &&
        !toolbarRef.current.contains(e.target)
      ) {
        setShowToolbar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("selectionchange", updateActiveFormats);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const insertTable = () => {
    const table = `
      <table border="1" style="border-collapse:collapse;width:100%">
        <tr><td>Row 1 Col 1</td><td>Row 1 Col 2</td></tr>
        <tr><td>Row 2 Col 1</td><td>Row 2 Col 2</td></tr>
      </table>`;
    exec("insertHTML", table);
  };

  const handleInput = () => {
    const el = editorRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-100 rounded">
      {/* Toolbar */}
      {showToolbar && (
        <div
          ref={toolbarRef}
          className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-t bg-gray-50 mb-1"
        >
          {/* Formatting */}
          <button
            onClick={() => exec("bold")}
            className={activeFormats.bold ? "bg-purple-100" : ""}
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => exec("italic")}
            className={activeFormats.italic ? "bg-purple-100" : ""}
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => exec("underline")}
            className={activeFormats.underline ? "bg-purple-100" : ""}
          >
            <Underline size={16} />
          </button>
          <button
            onClick={() => exec("strikeThrough")}
            className={activeFormats.strikeThrough ? "bg-purple-100" : ""}
          >
            <Strikethrough size={16} />
          </button>

          {/* Alignment */}
          <button
            onClick={() => exec("justifyLeft")}
            className={activeFormats.justifyLeft ? "bg-purple-100" : ""}
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => exec("justifyCenter")}
            className={activeFormats.justifyCenter ? "bg-purple-100" : ""}
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => exec("justifyRight")}
            className={activeFormats.justifyRight ? "bg-purple-100" : ""}
          >
            <AlignRight size={16} />
          </button>
          <button
            onClick={() => exec("justifyFull")}
            className={activeFormats.justifyFull ? "bg-purple-100" : ""}
          >
            <AlignJustify size={16} />
          </button>

          {/* Lists */}
          <button
            onClick={() => exec("insertUnorderedList")}
            className={activeFormats.insertUnorderedList ? "bg-purple-100" : ""}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => exec("insertOrderedList")}
            className={activeFormats.insertOrderedList ? "bg-purple-100" : ""}
          >
            <ListOrdered size={16} />
          </button>

          {/* Links, Images, Tables */}
          <button
            onClick={() => {
              const url = prompt("Enter URL");
              if (url) exec("createLink", url);
            }}
          >
            <LinkIcon size={16} />
          </button>
          <button
            onClick={() => {
              const url = prompt("Enter Image URL");
              if (url) exec("insertImage", url);
            }}
          >
            <ImageIcon size={16} />
          </button>
          <button onClick={insertTable}>
            <TableIcon size={16} />
          </button>

          {/* Font Size & Font Family */}
          <select
            onChange={(e) => exec("fontSize", e.target.value)}
            defaultValue="3"
          >
            <option value="1">8pt</option>
            <option value="2">10pt</option>
            <option value="3">12pt</option>
            <option value="4">14pt</option>
            <option value="5">18pt</option>
            <option value="6">24pt</option>
            <option value="7">36pt</option>
          </select>

          <select
            onChange={(e) => exec("fontName", e.target.value)}
            defaultValue="Arial"
          >
            <option>Arial</option>
            <option>Times New Roman</option>
            <option>Courier New</option>
            <option>Georgia</option>
            <option>Verdana</option>
          </select>

          {/* Text Color */}
          <label className="flex items-center gap-1">
            <Palette size={16} />
            <input
              type="color"
              onChange={(e) => exec("foreColor", e.target.value)}
              className="w-6 h-6 border rounded"
              title="Text Color"
            />
          </label>

          {/* Background Color */}
          <label className="flex items-center gap-1">
            <Palette size={16} />
            <input
              type="color"
              onChange={(e) => exec("backColor", e.target.value)}
              className="w-6 h-6 border rounded"
              title="Background Color"
            />
          </label>

          {/* Padding Control */}
          <select
            onChange={(e) => setPadding(e.target.value)}
            defaultValue="16px"
            title="Padding"
          >
            <option value="8px">Small Padding</option>
            <option value="16px">Medium Padding</option>
            <option value="24px">Large Padding</option>
            <option value="32px">Extra Large</option>
          </select>

          {/* Clear Formatting */}
          <button onClick={() => exec("removeFormat")}>
            <Minus size={16} />
          </button>
        </div>
      )}

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onFocus={() => setShowToolbar(true)}
        onInput={handleInput}
        style={{
          minHeight: "0px",
          lineHeight: "",
          backgroundColor: "transparent",
          color: "#333",
          padding: padding,
        }}
      >
        Start typing here...
      </div>
    </div>
  );
}
