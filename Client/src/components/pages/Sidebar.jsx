import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Mail,
  BarChart2
} from "lucide-react";

const Sidebar = () => {
  const links = [
    { label: "Dashboard", to: "/dashboard", icon: <Home size={20} /> },
    { label: "Contacts", to: "/contacts", icon: <Users size={20} /> },
    { label: "Campaigns", to: "/campaigns", icon: <Mail size={20} /> },
    { label: "Analytics", to: "/analytics", icon: <BarChart2 size={20} /> },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 h-screen fixed md:relative">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        MailCraft
      </div>
      <nav className="mt-6 flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 hover:bg-gray-800 rounded ${
                isActive ? "bg-gray-800 font-semibold" : ""
              }`
            }
          >
            {link.icon} {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
