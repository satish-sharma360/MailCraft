import { Eye, LogOut, Settings } from "lucide-react";

const UserDropdown = () => {

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
      <button
        className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
      >
        <Eye size={16} />
        <span>View Profile</span>
      </button>
      <button
        className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
      >
        <Settings size={16} />
        <span>Settings</span>
      </button>
      <hr className="my-2" />
      <button

        className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-red-600"
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </div>
  );
};
export default UserDropdown