import { Edit, Target } from "lucide-react";

const SmartTargeting = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Smart Targeting</h1>
        <p className="text-gray-600">Target specific segments of your audience with precision.</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
        <Target size={16} />
        Create Segment
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: 'High Engagement Users', count: 2543, criteria: 'Opens > 80%', color: 'green' },
        { name: 'Recent Purchasers', count: 1234, criteria: 'Purchased in last 30 days', color: 'blue' },
        { name: 'Inactive Subscribers', count: 876, criteria: 'No activity in 90 days', color: 'red' }
      ].map((segment, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Target className={`text-${segment.color}-600`} size={24} />
            <div className="text-right">
              <p className="font-bold text-gray-900">{segment.count.toLocaleString()}</p>
              <p className="text-sm text-gray-600">contacts</p>
            </div>
          </div>
          <h4 className="font-medium text-gray-900 mb-2">{segment.name}</h4>
          <p className="text-sm text-gray-600 mb-4">{segment.criteria}</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
              Send Campaign
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
              <Edit size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SmartTargeting
