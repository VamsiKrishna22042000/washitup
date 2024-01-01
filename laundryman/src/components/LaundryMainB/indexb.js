import "./indexb.css";

import { useState, useEffect } from "react";

import BookServiceB from "../BookServiceB/bookserviceB.js";

import SuccessB from "../SuccessB/successB.js";

import WashingB from "../TypeOfWashingB/typeOfWashingb.js";

import WashingBC from "../WashingB/washingB.js";

import AddCouponB from "../AddCouponB/addCouponB.js";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import Cookies from "js-cookie";

import ReorderB from "../ReordercomponentB/RorderB.js";

const changeComponents = {
  success: "SUCCESS",
  addCoupon: "COUPON",
  typeOfWash: "TYPEOFWASHING",
  bookService: "BOOK_SERVICE",
  washClothes: "WASH_CLOTHES",
  washing: "WASHING",
  reorder: "REORDER",
};

{
  /**Component which is the merge point of all the component's that which are displayed in the main page  and has the call back functions to pass from one component to another component*/
}
function LaundryNavB() {
  const [section, setSection] = useState(changeComponents.typeOfWash);

  const [typeofWash, setTypeofWashing] = useState("");

  const [itemsToWash, setItemToWash] = useState([]);

  const [time, setTime] = useState(0);

  const [selectedTime, setSelectedTime] = useState("");
  const [dataTobeSent, setDataTobeSent] = useState("");
  const [showNavBar, setShowNavBar] = useState(false);

  const callBackForTypeOfWashing = (typeAndItems) => {
    setTypeofWashing(typeAndItems.typeofWash);
    setItemToWash(typeAndItems.items);
    setSection(changeComponents.bookService);
  };

  const typing = (type) => {
    console.log(type);
    setTypeofWashing(type);
    setItemToWash([]);
  };

  const getTime = (e) => {
    setTime(e.id);
    setSelectedTime(e.time);
  };

  const bookService = (data) => {
    setSection(changeComponents.addCoupon);
    setDataTobeSent(data);
  };

  const setSuccess = () => {
    setSection(changeComponents.success);
  };

  const washing = () => {
    setSection(changeComponents.washing);
  };

  const toReorder = () => {
    setSection(changeComponents.reorder);
  };

  const fromReroder = () => {
    setSection(changeComponents.typeOfWash);
  };

  const getReorder = (reorderData) => {
    setTypeofWashing(reorderData.typeofWash);
    setItemToWash(reorderData.item);
    setDataTobeSent(reorderData.data);
    setSection(changeComponents.addCoupon);
  };

  const navcontentshamberger = () => {
    setShowNavBar(!showNavBar);
  };

  return (
    <div id="home" className="washitup-block1">
      <div className="bar-nav" bg="#b8dde3" variant="light">
        <div className="nav-bar-contents">
          <img
            onClick={() => {
              window.location.href = "/";
            }}
            style={{
              cursor: "pointer",
              marginRight: "28%",
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
          <p
            onClick={() => {
              window.location.href = "/about";
            }}
          >
            About Us
          </p>
          <p href="#pricing">Blog</p>
          <p
            style={{ cursor: "pointer" }}
            onClick={() => {
              Cookies.get("jwt_userToken") !== undefined
                ? (window.location.href = "/myorders")
                : (window.location.href = "/userlogin");
            }}
            href="#myorders"
          >
            My Orders
          </p>
          {Cookies.get("jwt_userToken") !== undefined ? (
            <button
              style={{ cursor: "pointer" }}
              type="button"
              onClick={() => {
                Cookies.remove("jwt_userToken");
                Cookies.remove("jwt_userId");
                Cookies.remove("jwt_userName");
                Cookies.remove("jwt_mobileNumber");
                // Cookies.remove("jwt_adminLogin");
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
              style={{ visibility: "hidden" }}
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
            <p
              onClick={() => {
                window.location.href = "/about";
              }}
            >
              About Us
            </p>
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
                  // Cookies.remove("jwt_adminLogin");
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
        {showNavBar && (
          <div
            onClick={navcontentshamberger}
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#22222250",
              zIndex: 4,
            }}
          ></div>
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

      <img className="cyan-image" src="./cyan.png" alt="cyancon" />
      <img className="pink-image" src="./pinkcon.png" alt="pinkcon" />
      {/* <div className="main-page-content">
        <h4>
          Get The Best <br /> Laundry Service <br /> At Your
          <span>Door Step</span>
        </h4>
        <p>Book laundry service with just few easy steps</p>
      </div> */}

      {section === changeComponents.typeOfWash ? (
        <WashingB
          typing={typing}
          callBackForTypeOfWashing={callBackForTypeOfWashing}
          toReorder={toReorder}
        />
      ) : section === changeComponents.bookService ? (
        <BookServiceB
          items={itemsToWash}
          book={bookService}
          time={time}
          getTime={getTime}
        />
      ) : section === changeComponents.addCoupon ? (
        <AddCouponB
          items={itemsToWash}
          dataTobeSent={dataTobeSent}
          success={setSuccess}
          typeOfWashing={typeofWash}
        />
      ) : section === changeComponents.success ? (
        <SuccessB washing={washing} />
      ) : section === changeComponents.washing ? (
        <WashingBC />
      ) : (
        <ReorderB fromReroder={fromReroder} getReorder={getReorder} />
      )}

      <div
        style={{ position: "absolute" }}
        class="elfsight-app-7c53dc20-f0e1-4689-a2cd-9ffc37dc68ff"
      ></div>
    </div>
  );
}

export default withRouter(LaundryNavB);
