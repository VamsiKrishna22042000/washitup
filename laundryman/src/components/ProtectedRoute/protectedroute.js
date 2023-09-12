import { Route } from "react-router-dom";

import VendorLogin from "../VendorDashboard/vendorlogin";

const ProtectedRoute = (props) => {
  return <Route {...props} />;
};

export default ProtectedRoute;
