import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { accessToken } = useContext(AuthContext);
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }
  return <Outlet/>;
};

export default ProtectedRoute;
