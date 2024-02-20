import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { store } from "./store";
import { isLoggedIn } from "./features/authentication/loginSlice";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(isLoggedIn);
  console.log(isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return isAuthenticated ? children : null;
};

export default PrivateRoute;
