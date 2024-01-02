import { useState } from "react";
import "./vendordashboard.css";

import Cookies from "js-cookie";

import { AiFillFacebook } from "react-icons/ai";

import { AiOutlineInstagram } from "react-icons/ai";

import { AiFillTwitterCircle } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const loadStatus = {
  get: "get",
  message: "message",
  got: "got",
};

const VendorLogin = () => {
  const [getotp, setgetotp] = useState(false);

  const [load, setLoad] = useState(loadStatus.get);

  const [mobileNumber, setMobileNumber] = useState(0);

  const [otp, setOtp] = useState(0);

  const getOtpRequest = async () => {
    if (mobileNumber !== 0) {
      setLoad(loadStatus.message);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/vendor/loginVendor`;

      const reqConfigure = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ mobileNumber: mobileNumber }),
      };

      const response = await fetch(url, reqConfigure);

      const data = await response.json();

      if (response.ok) {
        setgetotp(true);
        setTimeout(() => {
          setLoad(loadStatus.get);
        }, 2500);
      } else {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
        setLoad(loadStatus.get);
        setgetotp(false);
      }
    } else {
      toast.error(`Enter Valid Mobile Number`, {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    }
  };

  const VerifyOTPRequest = async () => {
    if (otp !== 0) {
      setLoad(loadStatus.got);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/vendor/verifyVendor`;

      const reqConfigure = {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          otp: parseInt(otp),
          mobileNumber: parseInt(mobileNumber),
        }),
      };

      const response = await fetch(url, reqConfigure);

      const data = await response.json();

      if (response.ok) {
        Cookies.set("jwt_vendorName", data.data[0].name, { expires: 30 });
        Cookies.set("jwt_vendorNumber", data.data[0].mobileNumber, {
          expires: 30,
        });
        Cookies.set("jwt_vendorId", data.data[0]._id, { expires: 30 });
        window.location.href = "/vendordashboard";
      } else {
        setLoad(loadStatus.get);
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      }
    } else {
      toast.error(`Enter Valid OTP`, {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    }
  };

  return load === loadStatus.got ? (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ToastContainer />
      <img
        className="washingloader"
        src="/machineloading.gif"
        alt="washingmachine"
      />
    </div>
  ) : (
    <div className="vendorlogincon">
      <div className="vendor-card1">
        <img className="vendorlogo" src="/vendorlogo.png" alt="vendorlogo" />
        <img className="washing-gif" src="/washingload.gif" alt="washingload" />
      </div>

      {load === loadStatus.message ? (
        <div className="vendor-card2">
          <img className="messageanimation" src="/messageanimation.gif" />
        </div>
      ) : (
        <div className="vendor-card2">
          <ToastContainer />
          <div className="vendor-login-logo-card">
            <img
              onClick={() => {
                window.location.href = "/";
              }}
              className="login-logo3"
              src="/washituplogo.png"
              alt="logo"
            />
            <h1 className="login-head">Login</h1>
            <div className="login-box">
              {getotp ? (
                <input
                  style={{
                    textAlign: "center",
                    borderColor: "transparent",
                    outline: "transparent",
                  }}
                  className="login-input2"
                  type="tel"
                  placeholder="Enter OTP"
                  maxLength={4}
                  autoFocus
                  inputMode="numeric"
                  onChange={(e) => {
                    const isValidInput = /^[0-9]*$/.test(e.target.value);
                    isValidInput === true && setOtp(e.target.value);
                  }}
                />
              ) : (
                <>
                  <p
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                    }}
                    className="logo-para"
                  >
                    Enter Phone Number
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      width: "100%",
                    }}
                  >
                    <span className="nine-one">+91</span> &nbsp;&nbsp;
                    <input
                      onChange={(e) => {
                        const isValidInput = /^[0-9]*$/.test(e.target.value);
                        isValidInput === true &&
                          setMobileNumber(e.target.value);
                      }}
                      className="login-input"
                      type="tel"
                      placeholder="Enter Mobile Number"
                      maxLength={10}
                    />
                  </div>
                </>
              )}
              {getotp ? (
                <button
                  onClick={VerifyOTPRequest}
                  className="button-login"
                  type="button"
                >
                  Verify
                </button>
              ) : (
                <button
                  onClick={getOtpRequest}
                  className="button-login"
                  type="button"
                >
                  Get otp
                </button>
              )}
              <div className="social-con">
                <AiFillFacebook
                  onClick={() => {
                    window.open(
                      "https://www.facebook.com/washitup.in",
                      "_blank"
                    );
                  }}
                  className="social-icons"
                />
                <AiOutlineInstagram
                  onClick={() => {
                    window.open(
                      "https://www.instagram.com/washitup.in/",
                      "_blank"
                    );
                  }}
                  className="social-icons"
                />
                <AiFillTwitterCircle
                  onClick={() => {
                    window.open("https://twitter.com/washitup_in", "_blank");
                  }}
                  className="social-icons"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorLogin;
