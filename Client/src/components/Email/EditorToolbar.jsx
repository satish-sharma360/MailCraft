import { Code, Download, Eye, FileText, Monitor, Redo, Save, Settings, Smartphone, Tablet, Undo, Upload } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";

const EditorToolbar = ({ 
  onSave, 
  onExport, 
  onImport, 
  onPreview, 
  onUndo, 
  onRedo, 
  displayMode, 
  onDisplayModeChange,
  templateName,
  onTemplateNameChange,
  isLoading 
}) => {
  const [showViewOptions, setShowViewOptions] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImport(file);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Left Section - Template Name */}
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={templateName}
            onChange={(e) => onTemplateNameChange(e.target.value)}
            className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 min-w-[200px]"
            placeholder="Untitled Template"
          />
          <div className="text-sm text-gray-500">
            Email Template
          </div>
        </div>

        {/* Center Section - Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Undo/Redo */}
          <button
            onClick={onUndo}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            title="Undo"
          >
            <Undo size={18} />
          </button>
          <button
            onClick={onRedo}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            title="Redo"
          >
            <Redo size={18} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Display Mode */}
          <div className="relative">
            <button
              onClick={() => setShowViewOptions(!showViewOptions)}
              className={`p-2 rounded flex items-center space-x-1 ${
                showViewOptions ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Display Mode"
            >
              {displayMode === 'desktop' && <Monitor size={18} />}
              {displayMode === 'mobile' && <Smartphone size={18} />}
              {displayMode === 'tablet' && <Tablet size={18} />}
            </button>
            
            {showViewOptions && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20">
                <button
                  onClick={() => { onDisplayModeChange('desktop'); setShowViewOptions(false); }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Monitor size={16} />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => { onDisplayModeChange('tablet'); setShowViewOptions(false); }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Tablet size={16} />
                  <span>Tablet</span>
                </button>
                <button
                  onClick={() => { onDisplayModeChange('mobile'); setShowViewOptions(false); }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Smartphone size={16} />
                  <span>Mobile</span>
                </button>
              </div>
            )}
          </div>

          {/* Preview */}
          <button
            onClick={onPreview}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            title="Preview"
          >
            <Eye size={18} />
          </button>

          <div className="w-px h-6 bg-gray-300 mx-2"></div>

          {/* Import */}
          <button
            onClick={handleImportClick}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            title="Import Design"
          >
            <Upload size={18} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileImport}
            className="hidden"
          />

          {/* Save */}
          <button
            onClick={onSave}
            disabled={isLoading}
            className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={16} />
            <span>Save</span>
          </button>

          {/* Export */}
          <div className="relative">
            <button
              onClick={() => setShowExportOptions(!showExportOptions)}
              className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Download size={16} />
              <span>Export</span>
            </button>

            {showExportOptions && (
              <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20">
                <button
                  onClick={() => { onExport('html'); setShowExportOptions(false); }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <Code size={16} />
                  <span>Export HTML</span>
                </button>
                <button
                  onClick={() => { onExport('json'); setShowExportOptions(false); }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <FileText size={16} />
                  <span>Export JSON</span>
                </button>
                <button
                  onClick={() => { onExport('pdf'); setShowExportOptions(false); }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <FileText size={16} />
                  <span>Export PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Settings */}
        <div className="flex items-center space-x-2">
          <button
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
            title="Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar