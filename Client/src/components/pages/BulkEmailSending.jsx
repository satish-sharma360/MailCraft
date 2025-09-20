import { Calendar, Send } from "lucide-react";

const BulkEmailSending = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bulk Email Sending</h1>
        <p className="text-gray-600">Send emails to multiple recipients at once.</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
        <Send size={16} />
        Create Campaign
      </button>
    </div>
    
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Campaign</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter campaign name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email subject"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Contact List</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Newsletter Subscribers (1,247 contacts)</option>
            <option>VIP Customers (342 contacts)</option>
            <option>Product Updates (856 contacts)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Content</label>
          <textarea 
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email content here..."
          ></textarea>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Send Now
          </button>
          <button className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            Save Draft
          </button>
          <button className="border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Calendar size={16} />
            Schedule
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default BulkEmailSending
