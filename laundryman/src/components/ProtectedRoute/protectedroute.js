import { Route } from "react-router-dom";

import Cookies from "js-cookie";

import VendorLogin from "../VendorDashboard/vendorlogin";

const ProtectedRoute = (props) => {
  const VendorName = Cookies.get("jwt_vendorName");
  const VendorNumber = Cookies.get("jwt_vendorNumber");
  const VendorId = Cookies.get("jwt_vendorId");

  if (
    VendorName !== undefined &&
    VendorNumber !== undefined &&
    VendorId !== undefined
  ) {
    return <Route {...props} />;
  } else {
    Cookies.remove("jwt_vendorName");
    Cookies.remove("jwt_vendorNumber");
    Cookies.remove("jwt_vendorId");
    return <VendorLogin />;
  }
};

export default ProtectedRoute;
