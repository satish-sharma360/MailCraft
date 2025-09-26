import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/templates", label: "Templates" },
    { path: "/campaigns", label: "Campaigns" },
    { path: "/contacts", label: "Contacts" },
    { path: "/analytics", label: "Analytics" },
  ];

  return (
    <div className="w-60 bg-gray-100 h-screen p-6 space-y-4">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-blue-100 ${
              isActive ? "bg-blue-600 text-white" : "text-gray-800"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
