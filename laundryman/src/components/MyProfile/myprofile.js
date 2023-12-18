import "../LaundryMain/index.css";
import "./myprofile.css";

import Profile from "./profile.js";

import Lastsetion from "../LaundryBody/lastsection.js";

import Cookies from "js-cookie";

import { useState } from "react";

const tabsections = {
  profileDetails: "PROFILE DETAILS",
  myaddress: "MY ADDRESS",
  referfriend: "REFER A FRIEND",
};

const MyProfile = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  const [selected, selectedSection] = useState(tabsections.profileDetails);

  const navcontentshamberger = () => {
    setShowNavBar(!showNavBar);
  };

  return (
    <>
      <div className="my-profile-container">
        <div
          style={{ backgroundColor: "#ffffff" }}
          className="bar-nav"
          bg="#b8dde3"
          variant="light"
        >
          <div className="nav-bar-contents">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                window.location.href = "/";
              }}
              href="#logo"
              src="./washituplogo.png"
              alt="Main Logo"
            />
            <p
              onClick={() => {
                window.location.href = "/";
              }}
              className="home"
            >
              Home
            </p>
            <p href="#features">About Us</p>
            <p href="#pricing">Blog</p>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                Cookies.get("jwt_userId") !== undefined
                  ? (window.location.href = "/myorders")
                  : (window.location.href = "/userlogin");
              }}
              href="#myorders"
            >
              My Orders
            </p>
            {Cookies.get("jwt_userId") !== undefined ? (
              <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => {
                  Cookies.remove("jwt_userToken");
                  Cookies.remove("jwt_userId");
                  Cookies.remove("jwt_userName");
                  Cookies.remove("jwt_mobileNumber");
                  Cookies.remove("jwt_adminLogin");
                  Cookies.remove("jwt_dono");
                  Cookies.remove("jwt_landmark");
                  Cookies.remove("jwt_location");
                  window.location.href = "/";
                }}
              >
                Log Out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/userlogin";
                }}
              >
                Log In
              </button>
            )}
          </div>
          {showNavBar && (
            <div
              id="nav-bar-id"
              className={
                showNavBar
                  ? "nav-bar-contents-mobile"
                  : "nav-bar-contents-mobile1"
              }
            >
              <button
                onClick={navcontentshamberger}
                className="cross-mark-nav-bar"
              >
                ✖
              </button>
              <img
                onClick={() => {
                  window.location.href = "/";
                }}
                href="#logo"
                src="./washituplogo.png"
                alt="Main Logo"
              />
              <p
                onClick={() => {
                  window.location.href = "/";
                }}
                className="home"
              >
                Home
              </p>
              <p href="#features">About Us</p>
              <p href="#pricing">Blog</p>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  Cookies.get("jwt_userId") !== undefined
                    ? (window.location.href = "/myorders")
                    : (window.location.href = "/userlogin");
                }}
                href="#myorders"
              >
                My Orders
              </p>
              {Cookies.get("jwt_userId") !== undefined ? (
                <button
                  style={{ cursor: "pointer" }}
                  type="button"
                  onClick={() => {
                    Cookies.remove("jwt_userToken");
                    Cookies.remove("jwt_userId");
                    Cookies.remove("jwt_userName");
                    Cookies.remove("jwt_mobileNumber");
                    Cookies.remove("jwt_adminLogin");
                    Cookies.remove("jwt_dono");
                    Cookies.remove("jwt_landmark");
                    Cookies.remove("jwt_location");
                    window.location.href = "/";
                  }}
                >
                  Log Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/userlogin";
                  }}
                >
                  Log In
                </button>
              )}
            </div>
          )}
          <div className="hamburger-icon">
            <svg
              onClick={navcontentshamberger}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 11H3C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H21C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11ZM21 4H3C2.44772 4 2 4.44772 2 5C2 5.55228 2.44772 6 3 6H21C21.5523 6 22 5.55228 22 5C22 4.44772 21.5523 4 21 4ZM3 20H21C21.5523 20 22 19.5523 22 19C22 18.4477 21.5523 18 21 18H3C2.44772 18 2 18.4477 2 19C2 19.5523 2.44772 20 3 20Z"
                fill="#0F1621"
              />
            </svg>
          </div>
        </div>
        <h1>Profile</h1>
        <div className="profile-modal-box">
          <div className="profile-tabs">
            <div>
              <img src="/customer2.png" alt="profile" />
              <h2>Sravan</h2>
            </div>
            <div className="tabs">
              <p
                className={
                  selected === tabsections.profileDetails
                    ? "selected"
                    : "not-selected"
                }
                onClick={() => {
                  selectedSection(tabsections.profileDetails);
                }}
              >
                PROFILE DETAILS
              </p>
              <p
                className={
                  selected === tabsections.myaddress
                    ? "selected"
                    : "not-selected"
                }
                onClick={() => {
                  selectedSection(tabsections.myaddress);
                }}
              >
                MY ADDRESS
              </p>
              <p
                className={
                  selected === tabsections.referfriend
                    ? "selected"
                    : "not-selected"
                }
                onClick={() => {
                  selectedSection(tabsections.referfriend);
                }}
              >
                REFER A FRIEND
              </p>
              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="log-out"
              >
                LOGOUT
              </button>
            </div>
          </div>
          <div className="profile-details">
            {selected === tabsections.profileDetails && <Profile />}
          </div>
        </div>
        <img className="star1" src="Star 1.png" alt="star1" />
        <img className="star2" src="Star 2.png" alt="star1" />
      </div>

      <Lastsetion />
    </>
  );
};

export default MyProfile;
