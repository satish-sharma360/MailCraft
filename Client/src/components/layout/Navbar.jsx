import { ChevronDown } from "lucide-react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import UserDropdown from "./UserDropdown";



const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const {user} = useContext(AuthContext)
  console.log("nav" ,user)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-2">
      <div className="flex items-center justify-end">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors"
          >
            <span className="font-medium text-gray-900">
                {user.firstName} {user.lastName}
            </span>
            <div className=" bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
              <img
            src={
              user?.avatar ||
              `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName}${user?.lastName}`
            }
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
          />
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          
          {/* <UserDropdown */}
            {/* user={user} */}
            {/* show={showDropdown} */}
            {/* onClose={() => setShowDropdown(false)} */}
            {/* // onProfileClick={onProfileClick} */}
            {/* // onSettingsClick={onSettingsClick} */}
            {/* // onLogout={onLogout} */}
          {/* /> */}
        </div>
      </div>
    </header>
  );
};
export default Navbar