import "./userlogin.css";

import { useEffect, useState } from "react";

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
  signup: "signup",
};

const UserLogin = () => {
  const [getotp, setgetotp] = useState(false);

  const [load, setLoad] = useState(loadStatus.get);

  const [name, setName] = useState("");

  const [mobileNumber, setMobileNumber] = useState(0);

  const [otp, setOtp] = useState(0);

  useEffect(() => {
    const loggedIn = Cookies.get("jwt_userId");
    if (loggedIn !== undefined) {
      window.location.href = "/";
    }
  }, []);

  const getOtpSignUpVerify = async () => {
    if (otp !== 0) {
      try {
        setLoad(loadStatus.got);

        const url = `${process.env.REACT_APP_ROOT_URL}/api/otp/verifySignup`;

        const reqConfigure = {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            mobileNumber: parseInt(mobileNumber),
            otp: parseInt(otp),
          }),
        };

        const respone = await fetch(url, reqConfigure);

        const data = await respone.json();

        if (respone.ok) {
          Cookies.set("jwt_userToken", data.token, { expires: 30 });
          Cookies.set("jwt_userId", data.data._id, { expires: 30 });
          // Cookies.set("jwt_adminLogin", data.data.isAdmin, {
          //   expires: 30,
          // });
          Cookies.set("jwt_userName", data.data.name, {
            expires: 30,
          });
          Cookies.set("jwt_mobileNumber", data.data.mobileNumber, {
            expires: 30,
          });
          window.location.href = "/";
        } else {
          setLoad(loadStatus.signup);
          setgetotp(true);
          toast.error(`${data.message}`, {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
        }
      } catch (error) {
        toast.error(`${error}`, {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          position: "top-center",
          theme: "colored",
        });
      }
    } else {
      toast.error(`${"Enter OTP"}`, {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    }
  };

  const getOtpRequestSignUp = async () => {
    if (mobileNumber !== 0 && name !== "") {
      try {
        setLoad(loadStatus.message);

        const url = `${process.env.REACT_APP_ROOT_URL}/api/otp/otpSignup`;

        const reqConfigure = {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobileNumber }),
        };

        const respone = await fetch(url, reqConfigure);

        const data = await respone.json();

        if (respone.ok) {
          setgetotp(true);
          setTimeout(() => {
            setLoad(loadStatus.signup);
          }, 2500);
        } else {
          setLoad(loadStatus.signup);
          toast.error(`${data.message}`, {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
        }
      } catch (error) {
        toast.error(`${error}`, {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          position: "top-center",
          theme: "colored",
        });
      }
    } else {
      if (name === "") {
        toast.error("Please Enter Name", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else {
        toast.error("Enter Valid Mobile Number", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      }
    }
  };

  const getOtpRequestLogin = async () => {
    if (mobileNumber !== 0) {
      try {
        setLoad(loadStatus.message);

        const url = `${process.env.REACT_APP_ROOT_URL}/api/otp/otpLogin`;

        const reqConfigure = {
          method: "POST",

          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({
            mobileNumber: parseInt(mobileNumber),
          }),
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
        }
      } catch (error) {
        toast.error(`${error}`, {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          position: "top-center",
          theme: "colored",
        });
      }
    } else {
      toast.error(`Please Enter Valid Mobile Number`, {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    }
  };

  const getOtpLoginVerify = async () => {
    if (otp !== 0 && mobileNumber !== 0) {
      try {
        setLoad(loadStatus.got);

        const url = `${process.env.REACT_APP_ROOT_URL}/api/otp/verifyLoginOTP`;

        const reqConfigure = {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            otp: parseInt(otp),
            mobileNumber: parseInt(mobileNumber),
          }),
        };

        const response = await fetch(url, reqConfigure);

        const data = await response.json();

        if (response.ok) {
          Cookies.set("jwt_userToken", data.token, { expires: 30 });
          Cookies.set("jwt_userId", data.data[0]._id, { expires: 30 });
          // Cookies.set("jwt_adminLogin", data.data[0].isAdmin, { expires: 30 });
          Cookies.set("jwt_userName", data.data[0].name, { expires: 30 });
          Cookies.set("jwt_mobileNumber", data.data[0].mobileNumber, {
            expires: 30,
          });
          data.data[0].location !== undefined &&
            Cookies.set("jwt_location", data.data[0].location, {
              expires: 30,
            });
          data.data[0].address !== undefined &&
            Cookies.set("jwt_dono", data.data[0].address.dono, {
              expires: 30,
            });
          data.data[0].address !== undefined &&
            Cookies.set("jwt_landmark", data.data[0].address.landmark, {
              expires: 30,
            });

          window.location.href = "/";
        } else {
          setgetotp(true);
          setLoad(loadStatus.get);
          toast.error(`${data.message}`, {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
        }
      } catch (error) {
        toast.error(`${error}`, {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          position: "top-center",
          theme: "colored",
        });
      }
    }
  };

  if (Cookies.get("jwt_userId") !== undefined) {
    window.location.href = "/";
  } else {
    return load === loadStatus.got ? (
      <>
        <ToastContainer />
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
      </>
    ) : load === loadStatus.signup ? (
      <div className="vendorlogincon">
        <ToastContainer />
        <div className="vendor-card1">
          <img className="vendorlogo" src="/vendorlogo.png" alt="vendorlogo" />
          <img
            className="washing-gif"
            src="/washingload.gif"
            alt="washingload"
          />
        </div>

        {load === loadStatus.message ? (
          <div className="vendor-card2">
            <img className="messageanimation" src="/messageanimation.gif" />
          </div>
        ) : (
          <div className="vendor-card2">
            <div className="vendor-login-logo-card">
              <img
                onClick={() => {
                  window.location.href = "/";
                }}
                className="login-logo3"
                src="/washituplogo.png"
                alt="logo"
              />
              <h1 className="login-head">Sign up</h1>
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
                    maxLength={4}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => {
                      const isValidInput = /^[0-9]*$/.test(e.target.value);
                      isValidInput === true && setOtp(e.target.value);
                    }}
                  />
                ) : (
                  <>
                    <p className="logo-para">Enter Name</p>
                    <input
                      className="login-input"
                      placeholder="Enter Name"
                      onChange={(e) => {
                        const validInput = /^[a-zA-Z ]*$/.test(e.target.value);
                        if (validInput) {
                          setName(e.target.value);
                        }
                      }}
                    />
                    <p className="logo-para">Enter Phone Number</p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        width: "100%",
                      }}
                    >
                      <span className="nine-one">+91 &nbsp; &nbsp;</span>
                      <input
                        onChange={(e) => {
                          const isValidInput = /^[0-9]*$/.test(e.target.value);
                          isValidInput === true &&
                            setMobileNumber(e.target.value);
                        }}
                        className="login-input"
                        type="number"
                        maxLength={10}
                        placeholder="Enter Mobile Number"
                      />
                    </div>
                  </>
                )}
                {getotp ? (
                  <button
                    onClick={getOtpSignUpVerify}
                    className="button-login"
                    type="button"
                  >
                    Verify
                  </button>
                ) : (
                  <button
                    onClick={getOtpRequestSignUp}
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
    ) : (
      <div className="vendorlogincon">
        <ToastContainer />
        <div className="vendor-card1">
          <img className="vendorlogo" src="/vendorlogo.png" alt="vendorlogo" />
          <img
            className="washing-gif"
            src="/washingload.gif"
            alt="washingload"
          />
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
                    autoFocus
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => {
                      const isValidInput = /^[0-9]*$/.test(e.target.value);
                      isValidInput === true && setOtp(e.target.value);
                      setOtp(e.target.value);
                    }}
                    maxLength={4}
                  />
                ) : (
                  <>
                    <p className="logo-para">Enter Phone Number</p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        width: "100%",
                      }}
                    >
                      <span className="nine-one">+91 &nbsp;&nbsp;</span>
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
                    onClick={getOtpLoginVerify}
                    className="button-login"
                    type="button"
                  >
                    Verify
                  </button>
                ) : (
                  <button
                    onClick={getOtpRequestLogin}
                    className="button-login"
                    type="button"
                  >
                    Get otp
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
                          setMobileNumber(0);
                          setOtp(0);
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
  }
};

export default UserLogin;
