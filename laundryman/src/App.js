import React, { useState, useEffect } from "react";
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
import MyOrders from "./components/LaundryBody/myorders";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const [connectionLostImage, setConnectionLostImage] = useState(null);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    const img = new Image();
    img.src = "./connectionlost.png";

    img.onload = () => {
      setConnectionLostImage(img.src);
    };

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  return (
    <BrowserRouter>
      {isOnline ? (
        <Switch>
          <Route exact path="/" component={Laundry} />
          <Route exact path="/admindashboard" component={AdminDashboard} />
          <ProtectedRoute
            exact
            path="/vendordashboard"
            component={VendorDashboard}
          />
          <Route exact path="/userlogin" component={UserLogin} />
          <Route exact path="/myorders" component={MyOrders} />
          <Route component={Notfound} />
        </Switch>
      ) : (
        <ConnectionLost connectionLostImage={connectionLostImage} />
      )}
    </BrowserRouter>
  );
}

export default App;
