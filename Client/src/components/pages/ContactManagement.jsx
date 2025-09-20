import { Edit, Plus, Users } from "lucide-react";

const ContactManagement = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Contact Management</h1>
        <p className="text-gray-600">Manage your subscribers and contact lists.</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
        <Plus size={16} />
        New List
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: 'Newsletter Subscribers', count: 1247, growth: '+12%' },
        { name: 'VIP Customers', count: 342, growth: '+5%' },
        { name: 'Product Updates', count: 856, growth: '+8%' }
      ].map((list, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-blue-600" size={24} />
            <span className="text-green-600 text-sm font-medium">{list.growth}</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-1">{list.name}</h3>
          <p className="text-2xl font-bold text-gray-900 mb-4">{list.count.toLocaleString()}</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
              Manage
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

export default ContactManagement
