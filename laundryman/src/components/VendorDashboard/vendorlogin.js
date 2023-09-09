import { useState } from "react";
import "./vendordashboard.js";

import { AiFillFacebook } from "react-icons/ai";

import { AiOutlineInstagram } from "react-icons/ai";

import { AiFillTwitterCircle } from "react-icons/ai";

const loadStatus = {
  get: "get",
  message: "message",
  got: "got",
};

const VendorLogin = () => {
  const [getotp, setgetotp] = useState(false);

  const [verifyOtp, setOTP] = useState(false);

  const [load, setLoad] = useState(loadStatus.get);

  const [mobileNumber, setMobileNumber] = useState(0);

  const [otp, setOtp] = useState(0);

  const getOtpRequest = () => {
    setLoad(loadStatus.message);
    setgetotp(true);
    setTimeout(() => {
      setLoad(loadStatus.get);
    }, 2500);
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
          <div className="vendor-login-logo-card">
            <img className="login-logo" src="/logosymbol.png" alt="logo" />
            <img className="login-logo3" src="/washituplogo.png" alt="logo" />
            <h1 className="login-head">Login</h1>
            <p className="login-text">to get access to you dashboard</p>
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
                  autoFocus
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={(e) => {
                    setOtp(e.target.value);
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
                  <input
                    className="login-input"
                    type="number"
                    placeholder="Enter Mobile number"
                  />
                </>
              )}
              {getotp ? (
                <button
                  onClick={() => {
                    setLoad(loadStatus.got);
                  }}
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
                  Get Otp
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
