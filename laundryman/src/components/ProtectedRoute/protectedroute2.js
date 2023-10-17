import { Route } from "react-router-dom";

import Cookies from "js-cookie";

import UserLogin from "../LaundryBody/userlogin";

const ProtectedRoute2 = (props) => {
  const isUser = Cookies.get("jwt_userId");
  const isAdmin = Cookies.get("jwt_adminLogin");

  if (isUser !== undefined && isAdmin !== undefined) {
    return <Route {...props} />;
  } else {
    Cookies.remove("jwt_userId");
    Cookies.remove("jwt_adminLogin");
    return <UserLogin />;
  }
};

export default ProtectedRoute2;
