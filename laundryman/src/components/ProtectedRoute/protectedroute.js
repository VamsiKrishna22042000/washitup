import { Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  return <Route {...props} />;
};

export default ProtectedRoute;
