import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";

const PreviewModal = ({ isOpen, onClose, htmlContent }) => {
  const [viewMode, setViewMode] = useState('desktop');
  
  if (!isOpen) return null;

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile': return '375px';
      case 'tablet': return '768px';
      default: return '100%';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] w-full flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Email Preview</h3>
          <div className="flex items-center space-x-4">
            {/* View Mode Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Monitor size={18} />
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`p-2 rounded ${viewMode === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Tablet size={18} />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Smartphone size={18} />
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-4 bg-gray-100 overflow-auto">
          <div className="flex justify-center">
            <div style={{ width: getPreviewWidth(), maxWidth: '100%' }}>
              <iframe
                srcDoc={htmlContent}
                className="w-full h-96 bg-white border border-gray-300 rounded"
                title="Email Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PreviewModal