import { Mail } from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";

const EmailEditor = ({ onReady, onLoad, style, minHeight = '600px', options = {} }) => {
  const editorRef = useRef(null);
  
  useEffect(() => {
    // Simulate editor loading
    setTimeout(() => {
      if (onLoad) onLoad();
      if (onReady) {
        const mockEditor = {
          exportHtml: (callback) => {
            const sampleHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Email Template</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px; }
    .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .button { display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Our Newsletter</h1>
    </div>
    <div class="content">
      <h2>Hello {{name}}!</h2>
      <p>Thank you for subscribing to our newsletter. We're excited to share the latest updates with you.</p>
      <p>Here's what's new:</p>
      <ul>
        <li>New product features</li>
        <li>Upcoming events</li>
        <li>Special offers</li>
      </ul>
      <p style="text-align: center; margin: 30px 0;">
        <a href="#" class="button">View Full Newsletter</a>
      </p>
    </div>
    <div class="footer">
      <p>© 2024 Your Company Name. All rights reserved.</p>
      <p>123 Business Street, City, State 12345</p>
    </div>
  </div>
</body>
</html>`;
            callback({
              design: { body: { values: {} } },
              html: sampleHtml
            });
          },
          saveDesign: (callback) => {
            callback({ 
              body: { 
                values: {
                  backgroundColor: '#f4f4f4',
                  contentWidth: '600px',
                  fontFamily: 'Arial, sans-serif'
                }
              },
              counters: {},
              schemaVersion: 13
            });
          },
          loadDesign: (design) => {
            console.log('Loading design:', design);
          },
          setDisplayMode: (mode) => {
            console.log('Display mode:', mode);
          },
          undo: () => console.log('Undo'),
          redo: () => console.log('Redo'),
          addEventListener: (event, callback) => {
            console.log('Event listener added:', event);
          },
          setMergeTags: (tags) => {
            console.log('Merge tags set:', tags);
          }
        };
        onReady(mockEditor);
      }
    }, 1000);
  }, [onReady, onLoad]);

  return (
    <div 
      ref={editorRef}
      style={{ 
        ...style, 
        minHeight,
        border: '2px dashed #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: '8px'
      }}
    >
      <div className="text-center text-gray-500">
        <div className="mb-4">
          <Mail className="mx-auto mb-2 text-blue-500" size={64} />
        </div>
        <h3 className="text-lg font-semibold mb-2">Email Editor Loading...</h3>
        <p className="text-sm mb-4">Drag & Drop Email Designer</p>
        <div className="flex justify-center space-x-4 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded animate-pulse"></div>
          <div className="w-8 h-8 bg-green-500 rounded animate-pulse delay-100"></div>
          <div className="w-8 h-8 bg-purple-500 rounded animate-pulse delay-200"></div>
        </div>
        <p className="text-xs">Replace with actual react-email-editor component</p>
      </div>
    </div>
  );
};
export default EmailEditor