import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Laundry from "./components/Laundry/laundry";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import AdminDashboard from "./components/Admindashboard/admin.js";

import ProtectedRoute from "./components/ProtectedRoute/protectedroute";

import Notfound from "./components/Notfound/notfound";
import VendorDashboard from "./components/VendorDashboard/vendordashboard";
import UserLogin from "./components/LaundryBody/userlogin";
import ConnectionLost from "./components/ConnectionLost/connectionlost";

function App() {
  return navigator.onLine ? (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Laundry} />
        <Route exact path="/admindashboard" component={AdminDashboard} />
        <ProtectedRoute
          exact
          path="/vendordashboard"
          component={VendorDashboard}
        />
        <Route exact path="/userlogin" component={UserLogin} />
        <Route component={Notfound} />
      </Switch>
    </BrowserRouter>
  ) : (
    <ConnectionLost />
  );
}

export default App;
