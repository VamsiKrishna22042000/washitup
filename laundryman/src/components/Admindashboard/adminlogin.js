import "./admin.css";

import { useState, useEffect } from "react";

import axios from "axios";
import Cookies from "js-cookie";

const AdminLogin = () => {
  useEffect(() => {
    const adminlogged = Cookies.get("jwt_adminLogin");
    if (adminlogged !== undefined) {
      window.location.href = "/admindashboard";
    }
  }, []);

  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  const verifyAdminLogin = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/login`;

    const body = {
      email: loginDetails.email,
      password: loginDetails.password,
    };

    const res = await axios.post(url, body);

    if (res.status === 200) {
      Cookies.set("jwt_adminLogin", res.data.token, { expires: 30 });
      Cookies.set("jwt_adminId", res.data.data._id, { expires: 30 });

      window.location.href = "/admindashboard";
    } else {
      Cookies.remove("jwt_adminLogin");
      window.location.href = "/adminlogin";
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <label>Email</label>
      <input
        onChange={(e) => {
          setLoginDetails({ ...loginDetails, email: e.target.value });
        }}
        type="text"
      />
      <label>Password</label>
      <input
        onChange={(e) => {
          setLoginDetails({ ...loginDetails, password: e.target.value });
        }}
        type="password"
      />
      <button onClick={verifyAdminLogin} type="button">
        Login
      </button>
    </div>
  );
};

export default AdminLogin;
