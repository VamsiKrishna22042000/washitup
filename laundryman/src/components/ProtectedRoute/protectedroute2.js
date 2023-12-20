import { Route } from "react-router-dom";

import Cookies from "js-cookie";

const ProtectedRoute2 = (props) => {
  const isUser = Cookies.get("jwt_userId");
  const isAdmin = Cookies.get("jwt_adminLogin");

  if (props.path === "/admindashboard") {
    if (isAdmin !== undefined) {
      if (isAdmin !== undefined && isAdmin !== "") {
        return <Route {...props} />;
      } else {
        Cookies.remove("jwt_adminLogin");
        window.location.href = "/adminlogin";
      }
    } else {
      // Cookies.remove("jwt_userId");
      Cookies.remove("jwt_adminLogin");
      // Cookies.remove("jwt_userName");
      // Cookies.remove("jwt_mobileNumber");
      window.location.href = "/adminlogin";
    }
  } else {
    if (isUser !== undefined) {
      return <Route {...props} />;
    } else {
      Cookies.remove("jwt_userId");
      // Cookies.remove("jwt_adminLogin");
      Cookies.remove("jwt_userName");
      Cookies.remove("jwt_mobileNumber");
      window.location.href = "/userlogin";
    }
  }

  // if (isUser !== undefined && isAdmin !== undefined) {
  //   if (isAdmin === "true") {
  //     return <Route {...props} />;
  //   } else {
  //     window.location.href = "/";
  //   }
  // } else {
  //   Cookies.remove("jwt_userId");
  //   // Cookies.remove("jwt_adminLogin");
  //   Cookies.remove("jwt_userName");
  //   Cookies.remove("jwt_mobileNumber");
  //   return <UserLogin />;
  // }
};

export default ProtectedRoute2;
