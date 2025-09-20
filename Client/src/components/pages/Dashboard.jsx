import { Eye, Mail, Send, TrendingUp } from "lucide-react";

// { user }
const Dashboard = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600">Welcome back, John Doe! Here's your email campaign overview.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Total Campaigns', value: '24', icon: Mail, color: 'blue' },
        { label: 'Emails Sent', value: '12.5K', icon: Send, color: 'green' },
        { label: 'Open Rate', value: '24.8%', icon: Eye, color: 'purple' },
        { label: 'Click Rate', value: '4.2%', icon: TrendingUp, color: 'orange' }
      ].map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <Icon className={`text-${stat.color}-600`} size={32} />
            </div>
          </div>
        );
      })}
    </div>
    
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h2>
      <div className="space-y-4">
        {[
          { name: 'Summer Sale Newsletter', status: 'Sent', date: '2 hours ago' },
          { name: 'Product Launch Announcement', status: 'Draft', date: '1 day ago' },
          { name: 'Weekly Newsletter', status: 'Sent', date: '3 days ago' }
        ].map((campaign, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
            <div>
              <p className="font-medium text-gray-900">{campaign.name}</p>
              <p className="text-sm text-gray-600">{campaign.date}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              campaign.status === 'Sent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {campaign.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Dashboard