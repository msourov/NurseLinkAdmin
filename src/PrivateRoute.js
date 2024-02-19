import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import store from "./store";
import { isLoggedIn } from "./features/authentication/loginSlice";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  console.log(store.getState());
  const isAuthenticated = useSelector(isLoggedIn);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);
  return children;
};

export default PrivateRoute;
