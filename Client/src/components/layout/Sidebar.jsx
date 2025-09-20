import { useContext, useState } from "react";
import { BarChart3, Mail, Send, Target, TrendingUp, User, ChevronLeft, ChevronRight, FileText, Calendar, Activity } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import { Mail as LogoIcon } from "lucide-react"; // Example icon for logo

const Sidebar = ({ currentPage, onPageChange, onUpgradeClick }) => {
  const { user } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems = [
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },                 // Campaign & analytics overview
    { id: "templates", icon: FileText, label: "Templates" },                  // Saved templates
    { id: "drag-drop-editor", icon: Mail, label: "Email Builder" },           // GrapesJS editor
    { id: "contacts", icon: User, label: "Contacts" },                         // Contact management
    { id: "bulk-email", icon: Send, label: "Bulk Email" },                     // Send campaign to multiple recipients
    { id: "scheduled-campaigns", icon: Calendar, label: "Scheduled Campaigns" }, // Scheduled campaigns
    { id: "analytics", icon: Activity, label: "Analytics" }, 
  ];

  return (
    <div className={`flex flex-col h-screen bg-gray-900 text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
      
      {/* Logo & Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            < LogoIcon size={24} className="h-5 w-5 text-white"/>
          </div>
          {!collapsed && <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MailCraft</h1>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-800 transition-colors"
        >
          {collapsed ? <ChevronRight size={2} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col justify-between space-y-2 p-2">
        {sidebarItems.map((item ,index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex items-center ${index === 0? 'mt-12' : 'mt-0'} ${index === sidebarItems.length - 1 ? "mb-12" : ""} space-x-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={24} className={`${isActive ? "text-white" : "text-gray-300"} font-bold `} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User info */}

      
      <div className='p-4 border-t border-gray-700 transition-all flex'>
        <div className="flex items-center space-x-3">
          <img
            src={
              user?.avatar ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName}${user?.lastName}`
            }
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
          />
          {
            !collapsed &&
            <>
            <div className="flex-1">
            <p className="text-[12px] font-medium">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-400 capitalize">{user?.plan || "free"}</p>
          </div>
          <button
            onClick={onUpgradeClick}
            className="px-3 py-1 bg-yellow-600 text-xs rounded font-medium hover:bg-yellow-700 transition-colors"
          >
            Upgrade
          </button>
          </>
          }
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
