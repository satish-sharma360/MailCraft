import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { use } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <div className="w-full bg-[#ffffff] border border-gray-300 shadow">
      <div className="w-[90%] flex items-center justify-between mx-auto py-4">
        <div>
          <h1 className="text-3xl font-bold">
            Mail<span className="text-blue-500">Craft</span>
          </h1>
        </div>
        {!user && (
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 rounded-full bg-gray-200 text-black cursor-pointer transition-all duration-200 hover:scale-95"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 rounded-full bg-blue-500 text-white cursor-pointer transition-all duration-200 hover:scale-95"
            >
              Register
            </button>
          </div>
        )}
        {user && (
          <div className="flex items-center justify-center gap-4">
            <p>
              {user.firstName} {user.lastName}
            </p>
            <div className="h-10 w-10 rounded-full border border-blue-500 overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={user.avatar}
                alt=""
              />
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-full bg-blue-500 text-white cursor-pointer transition-all duration-200 hover:scale-95"
            >
              Dashboard
            </button>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
