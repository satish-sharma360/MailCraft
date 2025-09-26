import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="w-full bg-white shadow px-6 py-3 flex justify-between items-center">
      <h1
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate(user ? "/dashboard" : "/")}
      >
        MailCraft
      </h1>

      {!user ? (
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Register
          </button>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <p className="font-medium">
            {user.firstName} {user.lastName}
          </p>
          <button
            onClick={() => logout()}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
