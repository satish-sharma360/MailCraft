const PerformanceTracking = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Performance Tracking</h1>
      <p className="text-gray-600">Monitor and track your email campaign performance metrics.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { metric: 'Delivery Rate', value: '98.5%', change: '+2.3%', positive: true },
        { metric: 'Open Rate', value: '24.8%', change: '-1.2%', positive: false },
        { metric: 'Click Rate', value: '4.2%', change: '+0.8%', positive: true },
        { metric: 'Unsubscribe Rate', value: '0.3%', change: '+0.1%', positive: false },
        { metric: 'Bounce Rate', value: '1.2%', change: '-0.5%', positive: true },
        { metric: 'Spam Rate', value: '0.1%', change: '0%', positive: true }
      ].map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">{item.metric}</p>
            <span className={`text-xs px-2 py-1 rounded ${
              item.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {item.change}
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          <div className="mt-2 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${item.positive ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ width: `${parseFloat(item.value)}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


export default PerformanceTracking
