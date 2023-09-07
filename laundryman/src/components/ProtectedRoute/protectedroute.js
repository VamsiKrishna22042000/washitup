import { Route } from "react-router-dom";

import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  let obtainedData = Cookies.get("jwt_token");

  if (obtainedData === undefined) {
    return <Route {...props} />;
  } else if (obtainedData !== undefined) {
    return <Route {...props} />;
  }
};

export default ProtectedRoute;
