import "./userlogin.css";

import { useState } from "react";

import { AiFillFacebook } from "react-icons/ai";

import { AiOutlineInstagram } from "react-icons/ai";

import { AiFillTwitterCircle } from "react-icons/ai";

const loadStatus = {
  get: "get",
  message: "message",
  got: "got",
  signup: "signup",
};

const UserLogin = () => {
  const [getotp, setgetotp] = useState(false);

  const [verifyOtp, setOTP] = useState(false);

  const [load, setLoad] = useState(loadStatus.get);

  const [name, setName] = useState("");

  const [mobileNumber, setMobileNumber] = useState(0);

  const [otp, setOtp] = useState(0);

  const getOtpRequest = () => {
    setLoad(loadStatus.message);
    console.log(mobileNumber);
    console.log(name);
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
  ) : load === loadStatus.signup ? (
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
            <h1 className="login-head">Sign Up</h1>
            <p className="login-text">to create & access your account</p>
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
                  <p className="logo-para">Enter Name</p>
                  <input
                    className="login-input"
                    type="text"
                    placeholder="Enter Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <p className="logo-para">Enter Phone Number</p>
                  <input
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                    }}
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
            <p className="login-text">to access you account</p>
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
              {!getotp && (
                <p
                  style={{ marginTop: "5%", alignSelf: "center" }}
                  className="login-text"
                >
                  Don't have and account?
                  <span
                    onClick={() => {
                      setLoad(loadStatus.got);
                      setTimeout(() => {
                        setLoad(loadStatus.signup);
                      }, 500);
                    }}
                    style={{ color: "#6759ff", cursor: "pointer" }}
                  >
                    Sign up
                  </span>
                </p>
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

export default UserLogin;
