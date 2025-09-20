import { Activity, BarChart3 } from "lucide-react";

const AdvancedAnalytics = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
      <p className="text-gray-600">Deep insights into your email campaign performance.</p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
        <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="mx-auto text-blue-600 mb-2" size={48} />
            <p className="text-blue-700 font-medium">Campaign Performance Chart</p>
            <p className="text-sm text-blue-600">Interactive chart would display here</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h3>
        <div className="h-64 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Activity className="mx-auto text-purple-600 mb-2" size={48} />
            <p className="text-purple-700 font-medium">Engagement Analytics</p>
            <p className="text-sm text-purple-600">Real-time engagement data</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default AdvancedAnalytics
