import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 h-16 fixed w-full left-0 md:ml-64 z-10">
      <div className="text-lg font-semibold">Welcome, {user?.firstName}</div>
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full overflow-hidden border border-blue-500">
          <img
            className="h-full w-full object-cover"
            src={user?.avatar}
            alt="avatar"
          />
        </div>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
