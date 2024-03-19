import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "./features/authentication/loginSlice";

const PrivateRoute = () => {
  const isAuthenticated = useSelector(isLoggedIn);
  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
