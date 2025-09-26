import React, { useEffect, useImperativeHandle, useRef, useState, useContext, useCallback } from "react";
import { SelectedElement } from "../../context/SelectedElement";
import { EmailTemplateContext } from "../../context/EmailTemplateContext";
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
  Palette,
  Minus,
} from "lucide-react";

export default function TextComponent(props, ref) {
  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  const [showToolbar, setShowToolbar] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Get context to sync changes back to element
  const { selectedElement, setSelectedElement } = useContext(SelectedElement);
  const { setEmailTemplate } = useContext(EmailTemplateContext);

  // Debounced sync to prevent excessive updates
  const syncTimeoutRef = useRef(null);
  
  const syncContentToElement = useCallback(() => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    
    syncTimeoutRef.current = setTimeout(() => {
      if (editorRef.current && selectedElement && selectedElement.layout && selectedElement.index) {
        let htmlContent = editorRef.current.innerHTML;
        
        // Clean up HTML but preserve formatting
        htmlContent = htmlContent
          .replace(/&nbsp;/g, ' ')
          .replace(/<br\s*\/?>/g, '<br>')
          .replace(/<div><br><\/div>/g, '<br>')
          .trim();
        
        // Don't update if content hasn't really changed
        const currentElement = selectedElement.layout[selectedElement.index];
        if (currentElement && currentElement.textarea === htmlContent) {
          return;
        }
        
        setSelectedElement(prev => ({
          ...prev,
          layout: {
            ...prev.layout,
            [prev.index]: {
              ...prev.layout[prev.index],
              textarea: htmlContent
            }
          }
        }));

        setEmailTemplate(prevTemplate => 
          prevTemplate.map(column => {
            if (column.id === selectedElement.layout.id) {
              return {
                ...column,
                [selectedElement.index]: {
                  ...column[selectedElement.index],
                  textarea: htmlContent
                }
              };
            }
            return column;
          })
        );
      }
    }, 300); // 300ms debounce
  }, [selectedElement, setSelectedElement, setEmailTemplate]);

  // Format text using execCommand (most reliable method)
  const formatText = (command, value = null) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    
    try {
      document.execCommand(command, false, value);
      syncContentToElement();
    } catch (error) {
      console.warn(`Command ${command} failed:`, error);
    }
  };

  // Format handlers
  const toggleBold = () => formatText('bold');
  const toggleItalic = () => formatText('italic');
  const toggleUnderline = () => formatText('underline');
  const toggleStrikethrough = () => formatText('strikeThrough');
  
  const setTextAlign = (align) => {
    const commands = {
      left: 'justifyLeft',
      center: 'justifyCenter',
      right: 'justifyRight',
      justify: 'justifyFull'
    };
    formatText(commands[align]);
  };
  
  const setTextColor = (color) => formatText('foreColor', color);
  const setBackgroundColor = (color) => formatText('backColor', color);
  
  // Font size adjustment for selected text
  const setFontSize = (size) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      
      if (!range.collapsed) {
        const selectedText = range.toString();
        const span = document.createElement('span');
        span.style.fontSize = size;
        span.textContent = selectedText;
        
        range.deleteContents();
        range.insertNode(span);
        
        // Clear selection and place cursor after the span
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.setStartAfter(span);
        newRange.setEndAfter(span);
        selection.addRange(newRange);
        
        syncContentToElement();
      }
    }
  };

  // Font family adjustment for selected text
  const setFontFamily = (fontFamily) => {
    if (!editorRef.current) return;
    
    editorRef.current.focus();
    
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      
      if (!range.collapsed) {
        const selectedText = range.toString();
        const span = document.createElement('span');
        span.style.fontFamily = fontFamily;
        span.textContent = selectedText;
        
        range.deleteContents();
        range.insertNode(span);
        
        // Clear selection and place cursor after the span
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.setStartAfter(span);
        newRange.setEndAfter(span);
        selection.addRange(newRange);
        
        syncContentToElement();
      }
    }
  };
  
  const insertBulletList = () => formatText('insertUnorderedList');
  const insertNumberedList = () => formatText('insertOrderedList');
  
  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      formatText('createLink', url);
    }
  };
  
  const clearFormatting = () => formatText('removeFormat');

  useImperativeHandle(ref, () => ({
    getHTML: () => editorRef.current?.innerHTML || '',
  }));

  // Initialize editor with content
  useEffect(() => {
    if (editorRef.current && selectedElement && selectedElement.layout && selectedElement.index && !isInitialized) {
      const element = selectedElement.layout[selectedElement.index];
      
      if (element && element.textarea) {
        editorRef.current.innerHTML = element.textarea;
      } else {
        editorRef.current.innerHTML = '<p>Start typing here...</p>';
      }
      
      setIsInitialized(true);
    }
  }, [selectedElement, isInitialized]);

  // Reset initialization when element changes
  useEffect(() => {
    setIsInitialized(false);
  }, [selectedElement?.index]);

  // Handle clicks outside to hide toolbar
  useEffect(() => {
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Input handler
  const handleInput = () => {
    syncContentToElement();
  };

  // Focus handler
  const handleFocus = () => {
    setShowToolbar(true);
  };

  // Blur handler
  const handleBlur = () => {
    // Small delay to allow toolbar clicks
    setTimeout(() => {
      if (!toolbarRef.current?.contains(document.activeElement)) {
        setShowToolbar(false);
      }
    }, 150);
  };

  // Paste handler to clean pasted content
  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    syncContentToElement();
  };

  // Get container styles from element settings
  const getEditorStyles = () => {
    const baseStyles = {
      minHeight: '120px',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      outline: 'none',
      fontSize: '14px',
      lineHeight: '1.5',
      color: '#333',
      backgroundColor: '#fff',
      fontFamily: 'Arial, sans-serif',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
    };

    if (selectedElement && selectedElement.layout && selectedElement.index) {
      const element = selectedElement.layout[selectedElement.index];
      if (element?.style) {
        return {
          ...baseStyles,
          fontSize: element.style.fontSize || baseStyles.fontSize,
          color: element.style.color || baseStyles.color,
          backgroundColor: element.style.backgroundColor || baseStyles.backgroundColor,
          padding: element.style.padding || baseStyles.padding,
          textAlign: element.style.textAlign || 'left',
          fontWeight: element.style.fontWeight || 'normal',
          borderRadius: element.style.borderRadius || baseStyles.borderRadius,
        };
      }
    }
    
    return baseStyles;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Toolbar */}
      {showToolbar && (
        <div
          ref={toolbarRef}
          className="flex flex-wrap gap-1 p-2 bg-gray-50 border border-gray-300 rounded-t-md shadow-sm"
        >
          {/* Text Formatting */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleBold}
            className="p-2 hover:bg-blue-100 rounded border bg-white transition-colors"
            title="Bold (Ctrl+B)"
          >
            <Bold size={16} />
          </button>
          
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleItalic}
            className="p-2 hover:bg-blue-100 rounded border bg-white transition-colors"
            title="Italic (Ctrl+I)"
          >
            <Italic size={16} />
          </button>
          
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleUnderline}
            className="p-2 hover:bg-blue-100 rounded border bg-white transition-colors"
            title="Underline (Ctrl+U)"
          >
            <Underline size={16} />
          </button>
          
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleStrikethrough}
            className="p-2 hover:bg-blue-100 rounded border bg-white transition-colors"
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Font Size */}
          <div className="flex items-center">
            <select
              onChange={(e) => setFontSize(e.target.value)}
              className="px-2 py-1 border rounded bg-white text-sm hover:bg-blue-50 transition-colors"
              defaultValue=""
              title="Font Size"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <option value="" disabled>Size</option>
              <option value="8px">8px</option>
              <option value="10px">10px</option>
              <option value="12px">12px</option>
              <option value="14px">14px</option>
              <option value="16px">16px</option>
              <option value="18px">18px</option>
              <option value="20px">20px</option>
              <option value="24px">24px</option>
              <option value="28px">28px</option>
              <option value="32px">32px</option>
              <option value="36px">36px</option>
              <option value="48px">48px</option>
              <option value="72px">72px</option>
            </select>
          </div>

          {/* Font Family */}
          <div className="flex items-center">
            <select
              onChange={(e) => setFontFamily(e.target.value)}
              className="px-2 py-1 border rounded bg-white text-sm hover:bg-blue-50 transition-colors"
              defaultValue=""
              title="Font Family"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <option value="" disabled>Font</option>
              <option value="Arial, Helvetica, sans-serif">Arial</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
              <option value="Verdana, sans-serif">Verdana</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="Tahoma, sans-serif">Tahoma</option>
              <option value="'Trebuchet MS', sans-serif">Trebuchet MS</option>
              <option value="'Lucida Sans', sans-serif">Lucida Sans</option>
              <option value="Impact, sans-serif">Impact</option>
              <option value="'Comic Sans MS', cursive">Comic Sans MS</option>
            </select>
          </div>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Text Alignment */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setTextAlign('left')}
            className="p-2 hover:bg-blue-100 rounded border bg-white transition-colors"
            title="Align Left"
          >
            <AlignLeft size={16} />
          </button>
          
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setTextAlign('center')}
            className="p-2 hover:bg-blue-100 rounded border bg-white transition-colors"
            title="Align Center"
          >
            <AlignCenter size={16} />
          </button>
          
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setTextAlign('right')}
            className="p-2 hover:bg-blue-100 rounded border bg-white transition-colors"
            title="Align Right"
          >
            <AlignRight size={16} />
          </button>
          
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setTextAlign('justify')}
            className="p-2 hover:bg-blue-100 rounded border bg-white transition-colors"
            title="Justify"
          >
            <AlignJustify size={16} />
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Lists */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={insertBulletList}
            className="p-2 hover:bg-blue-100 rounded border bg-white transition-colors"
            title="Bullet List"
          >
            <List size={16} />
          </button>
          
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={insertNumberedList}
            className="p-2 hover:bg-blue-100 rounded border bg-white transition-colors"
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Link */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={insertLink}
            className="p-2 hover:bg-blue-100 rounded border bg-white transition-colors"
            title="Insert Link"
          >
            <LinkIcon size={16} />
          </button>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Colors */}
          <div className="flex gap-1">
            <div className="flex items-center">
              <label className="flex items-center gap-1 p-2 hover:bg-blue-100 rounded border bg-white cursor-pointer transition-colors">
                <Palette size={14} />
                <input
                  type="color"
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-4 h-4 border-0 rounded cursor-pointer"
                  title="Text Color"
                />
              </label>
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center gap-1 p-2 hover:bg-blue-100 rounded border bg-white cursor-pointer transition-colors">
                <span className="text-xs font-medium">BG</span>
                <input
                  type="color"
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-4 h-4 border-0 rounded cursor-pointer"
                  title="Background Color"
                />
              </label>
            </div>
          </div>

          <div className="w-px bg-gray-300 mx-1" />

          {/* Clear Formatting */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={clearFormatting}
            className="p-2 hover:bg-red-100 rounded border bg-white transition-colors"
            title="Clear Formatting"
          >
            <Minus size={16} />
          </button>
        </div>
      )}

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPaste={handlePaste}
        style={getEditorStyles()}
        className={`${showToolbar ? 'rounded-b-md' : 'rounded-md'} transition-all duration-200`}
      />
    </div>
  );
}