import { Route } from "react-router-dom";

import VendorLogin from "../VendorDashboard/vendorlogin";

const ProtectedRoute = (props) => {
  return <VendorLogin />;
};

export default ProtectedRoute;
