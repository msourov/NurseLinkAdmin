import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "./features/authentication/loginSlice";

const PrivateRoute = () => {
  const isAuthenticated = useSelector(isLoggedIn);
  // console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
