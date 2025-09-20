import React, { useState, useRef, useCallback } from 'react';

const EmailBuilder = () => {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [draggedComponent, setDraggedComponent] = useState(null);
  const [showGrid, setShowGrid] = useState(false);
  const canvasRef = useRef(null);
  const componentIdCounter = useRef(0);

  // Available components to drag
  const availableComponents = [
    {
      type: 'text',
      label: '📝 Text Box',
      icon: '📝',
      defaultProps: {
        content: 'Click here to type...',
        fontSize: 16,
        color: '#333333',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'normal',
        textAlign: 'left',
        backgroundColor: 'transparent',
        padding: 10,
        width: 300,
        height: 50
      }
    },
    {
      type: 'heading',
      label: '📰 Heading',
      icon: '📰',
      defaultProps: {
        content: 'Your Heading Here',
        fontSize: 28,
        color: '#1a1a1a',
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        textAlign: 'left',
        backgroundColor: 'transparent',
        padding: 10,
        width: 400,
        height: 60
      }
    },
    {
      type: 'button',
      label: '🔘 Button',
      icon: '🔘',
      defaultProps: {
        content: 'Click Me',
        fontSize: 16,
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: '#4F46E5',
        padding: 15,
        borderRadius: 8,
        width: 150,
        height: 50,
        link: '#'
      }
    },
    {
      type: 'image',
      label: '🖼️ Image',
      icon: '🖼️',
      defaultProps: {
        src: 'https://via.placeholder.com/300x200/E5E7EB/6B7280?text=Your+Image',
        width: 300,
        height: 200,
        borderRadius: 8
      }
    }
  ];

  // Generate unique ID for components
  const generateId = () => `component_${++componentIdCounter.current}`;

  // Handle drag start from component palette
  const handleDragStart = (e, componentType) => {
    setDraggedComponent(componentType);
    e.dataTransfer.effectAllowed = 'copy';
  };

  // Handle drop on canvas
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    if (!draggedComponent) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    const newComponent = {
      id: generateId(),
      type: draggedComponent.type,
      x: Math.max(0, x - (draggedComponent.defaultProps.width / 2)),
      y: Math.max(0, y - (draggedComponent.defaultProps.height / 2)),
      ...draggedComponent.defaultProps
    };

    setComponents(prev => [...prev, newComponent]);
    setSelectedComponent(newComponent.id);
    setDraggedComponent(null);

    // Auto-focus text elements for immediate typing
    if (draggedComponent.type === 'text' || draggedComponent.type === 'heading') {
      setTimeout(() => {
        const element = document.getElementById(newComponent.id);
        if (element) {
          element.focus();
          element.select();
        }
      }, 50);
    }
  }, [draggedComponent]);

  // Handle drag over canvas
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // Handle component selection
  const handleComponentClick = (e, componentId) => {
    e.stopPropagation();
    setSelectedComponent(componentId);
  };

  // Handle content change for text elements
  const handleContentChange = (componentId, newContent) => {
    setComponents(prev => 
      prev.map(comp => 
        comp.id === componentId 
          ? { ...comp, content: newContent }
          : comp
      )
    );
  };

  // Handle style changes
  const handleStyleChange = (property, value) => {
    if (!selectedComponent) return;
    
    setComponents(prev =>
      prev.map(comp =>
        comp.id === selectedComponent
          ? { ...comp, [property]: value }
          : comp
      )
    );
  };

  // Handle position changes (dragging components)
  const handleComponentDrag = (componentId, newX, newY) => {
    setComponents(prev =>
      prev.map(comp =>
        comp.id === componentId
          ? { ...comp, x: newX, y: newY }
          : comp
      )
    );
  };

  // Delete component
  const deleteComponent = () => {
    if (!selectedComponent) return;
    setComponents(prev => prev.filter(comp => comp.id !== selectedComponent));
    setSelectedComponent(null);
  };

  // Get selected component data
  const selectedComp = components.find(comp => comp.id === selectedComponent);

  // Export template
  const exportTemplate = () => {
    const html = components.map(comp => {
      const style = `
        position: absolute;
        left: ${comp.x}px;
        top: ${comp.y}px;
        width: ${comp.width}px;
        height: ${comp.height}px;
        font-size: ${comp.fontSize}px;
        color: ${comp.color};
        font-family: ${comp.fontFamily};
        font-weight: ${comp.fontWeight};
        text-align: ${comp.textAlign};
        background-color: ${comp.backgroundColor};
        padding: ${comp.padding}px;
        border-radius: ${comp.borderRadius || 0}px;
        border: none;
        outline: none;
      `;

      if (comp.type === 'image') {
        return `<img src="${comp.src}" style="${style}" alt="Email Image" />`;
      } else if (comp.type === 'button') {
        return `<a href="${comp.link}" style="${style} display: flex; align-items: center; justify-content: center; text-decoration: none; cursor: pointer;">${comp.content}</a>`;
      } else {
        return `<div style="${style}">${comp.content}</div>`;
      }
    }).join('\n');

    const fullTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif;">
  <div style="position: relative; width: 600px; margin: 0 auto; background: white;">
    ${html}
  </div>
</body>
</html>`;

    console.log('HTML Template:', fullTemplate);
    alert('✅ Template exported! Check browser console.');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Email Builder</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                showGrid 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🎯 Grid {showGrid ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={() => setComponents([])}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              🗑️ Clear All
            </button>
            <button
              onClick={exportTemplate}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
            >
              💾 Export HTML
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Components */}
        <div className="w-64 bg-white border-r shadow-sm">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-900 mb-2">📦 Components</h3>
            <p className="text-sm text-gray-600">Drag to canvas to add</p>
          </div>
          <div className="p-4 space-y-3">
            {availableComponents.map((comp) => (
              <div
                key={comp.type}
                draggable
                onDragStart={(e) => handleDragStart(e, comp)}
                className="flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-lg cursor-grab hover:border-blue-400 hover:shadow-md transition-all duration-200 active:cursor-grabbing"
              >
                <span className="text-2xl">{comp.icon}</span>
                <span className="font-medium text-gray-700">{comp.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center - Canvas */}
        <div className="flex-1 overflow-auto bg-gray-100 p-8">
          <div className="max-w-4xl mx-auto">
            <div
              ref={canvasRef}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => setSelectedComponent(null)}
              className={`relative w-full min-h-[600px] bg-white shadow-lg rounded-lg border-2 border-dashed border-gray-300 ${
                showGrid ? 'bg-grid' : ''
              }`}
              style={{
                backgroundImage: showGrid 
                  ? 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)'
                  : 'none',
                backgroundSize: showGrid ? '20px 20px' : 'auto'
              }}
            >
              {components.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📧</div>
                    <p className="text-xl font-medium">Drag components here to start building</p>
                    <p className="text-sm mt-2">Click and type to edit text • Drag to reposition</p>
                  </div>
                </div>
              )}

              {/* Render Components */}
              {components.map((comp) => (
                <ComponentRenderer
                  key={comp.id}
                  component={comp}
                  isSelected={selectedComponent === comp.id}
                  onSelect={(e) => handleComponentClick(e, comp.id)}
                  onContentChange={(content) => handleContentChange(comp.id, content)}
                  onPositionChange={(x, y) => handleComponentDrag(comp.id, x, y)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className="w-80 bg-white border-l shadow-sm">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-900">🎨 Properties</h3>
            {selectedComp ? (
              <p className="text-sm text-gray-600 mt-1">Editing {selectedComp.type}</p>
            ) : (
              <p className="text-sm text-gray-600 mt-1">Select a component to edit</p>
            )}
          </div>

          <div className="p-4 space-y-4 overflow-y-auto max-h-full">
            {selectedComp ? (
              <PropertiesPanel 
                component={selectedComp}
                onChange={handleStyleChange}
                onDelete={deleteComponent}
              />
            ) : (
              <div className="text-center text-gray-400 mt-12">
                <div className="text-4xl mb-4">👆</div>
                <p>Select any component on the canvas to edit its properties</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Component Renderer
const ComponentRenderer = ({ component, isSelected, onSelect, onContentChange, onPositionChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.contentEditable === 'true') return;
    
    setIsDragging(true);
    const rect = elementRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const canvas = elementRef.current.parentElement;
    const canvasRect = canvas.getBoundingClientRect();
    const newX = Math.max(0, e.clientX - canvasRect.left - dragOffset.x);
    const newY = Math.max(0, e.clientY - canvasRect.top - dragOffset.y);
    
    onPositionChange(newX, newY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const baseStyle = {
    position: 'absolute',
    left: component.x,
    top: component.y,
    width: component.width,
    height: component.height,
    fontSize: component.fontSize,
    color: component.color,
    fontFamily: component.fontFamily,
    fontWeight: component.fontWeight,
    textAlign: component.textAlign,
    backgroundColor: component.backgroundColor,
    padding: component.padding,
    borderRadius: component.borderRadius || 0,
    border: isSelected ? '2px solid #3B82F6' : '2px solid transparent',
    outline: 'none',
    cursor: isDragging ? 'grabbing' : 'grab',
    userSelect: component.type === 'text' || component.type === 'heading' ? 'text' : 'none'
  };

  if (component.type === 'image') {
    return (
      <img
        ref={elementRef}
        src={component.src}
        alt="Email Image"
        style={baseStyle}
        onClick={onSelect}
        onMouseDown={handleMouseDown}
        className={`transition-all ${isSelected ? 'shadow-lg' : 'hover:shadow-md'}`}
      />
    );
  }

  if (component.type === 'button') {
    return (
      <div
        ref={elementRef}
        style={{
          ...baseStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          cursor: 'pointer'
        }}
        onClick={onSelect}
        onMouseDown={handleMouseDown}
        className={`transition-all ${isSelected ? 'shadow-lg' : 'hover:shadow-md'}`}
      >
        <span
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onContentChange(e.target.textContent)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.target.blur();
            }
          }}
          style={{ outline: 'none', cursor: 'text' }}
        >
          {component.content}
        </span>
      </div>
    );
  }

  // Text or Heading
  return (
    <div
      ref={elementRef}
      id={component.id}
      contentEditable
      suppressContentEditableWarning
      style={{
        ...baseStyle,
        cursor: 'text',
        minHeight: component.height,
        height: 'auto'
      }}
      onClick={onSelect}
      onMouseDown={handleMouseDown}
      onBlur={(e) => onContentChange(e.target.textContent)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && component.type !== 'text') {
          e.preventDefault();
        }
      }}
      className={`transition-all ${isSelected ? 'shadow-lg' : 'hover:shadow-md'}`}
    >
      {component.content}
    </div>
  );
};

// Properties Panel
const PropertiesPanel = ({ component, onChange, onDelete }) => {
  if (!component) return null;

  return (
    <div className="space-y-6">
      {/* Content */}
      {(component.type === 'text' || component.type === 'heading' || component.type === 'button') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <input
            type="text"
            value={component.content}
            onChange={(e) => onChange('content', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Image Source */}
      {component.type === 'image' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
          <input
            type="url"
            value={component.src}
            onChange={(e) => onChange('src', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Typography */}
      {component.type !== 'image' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
            <input
              type="range"
              min="10"
              max="72"
              value={component.fontSize}
              onChange={(e) => onChange('fontSize', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-center text-sm text-gray-600">{component.fontSize}px</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
            <select
              value={component.fontFamily}
              onChange={(e) => onChange('fontFamily', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Times New Roman, serif">Times New Roman</option>
              <option value="Courier New, monospace">Courier New</option>
              <option value="Verdana, sans-serif">Verdana</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Weight</label>
            <select
              value={component.fontWeight}
              onChange={(e) => onChange('fontWeight', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="600">Semi Bold</option>
              <option value="300">Light</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
            <input
              type="color"
              value={component.color}
              onChange={(e) => onChange('color', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
            <input
              type="color"
              value={component.backgroundColor === 'transparent' ? '#ffffff' : component.backgroundColor}
              onChange={(e) => onChange('backgroundColor', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        </>
      )}

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
          <input
            type="number"
            value={component.width}
            onChange={(e) => onChange('width', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
          <input
            type="number"
            value={component.height}
            onChange={(e) => onChange('height', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Button Link */}
      {component.type === 'button' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
          <input
            type="url"
            value={component.link}
            onChange={(e) => onChange('link', e.target.value)}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}

      {/* Delete Button */}
      <div className="pt-4 border-t">
        <button
          onClick={onDelete}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
        >
          🗑️ Delete Component
        </button>
      </div>
    </div>
  );
};

export default EmailBuilder;