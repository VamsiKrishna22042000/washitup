import "./index.css";

import { useState, useEffect } from "react";

import BookService from "../BookService/bookservice.js";

import AddClothes from "../AddClothes/addClothes";

import Success from "../Success/success";

import Washing from "../Washing/washing";
import AddCoupon from "../AddCoupon/addCoupon";
import TypeOfWashing from "../TypeOfWashing/typeOfWashing";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import Cookies from "js-cookie";

import Reorder from "../Reordercomponent/Rorder";

const changeComponents = {
  success: "SUCCESS",
  addCoupon: "COUPON",
  typeOfWash: "TYPEOFWASHING ",
  bookService: "BOOK_SERVICE",
  washClothes: "WASH_CLOTHES",
  washing: "WASHING",
  reorder: "REORDER",
};

{
  /**Component which is the merge point of all the component's that which are displayed in the main page  and has the call back functions to pass from one component to another component*/
}
function LaundryNav() {
  const [service, setService] = useState(changeComponents.typeOfWash);

  const [time, setTime] = useState(0);

  const [typeOfWashing, setTypeofWashing] = useState("");

  const [selectedTime, setSelectedTime] = useState("");

  const [items, setItems] = useState([]);

  const [dataTobeSent, setDataTobeSent] = useState("");

  const [showNavBar, setShowNavBar] = useState(false);

  const bookService = (data) => {
    setService(changeComponents.addCoupon);
    setDataTobeSent(data);
  };

  const washClothes = (selectedtoWash) => {
    setService(changeComponents.bookService);
    setItems(selectedtoWash);
  };

  const callBackForTypeOfWashing = (type) => {
    console.log(type);
    setService(changeComponents.washClothes);
    setTypeofWashing(type);
  };

  const washing = () => {
    setService(changeComponents.washing);
  };

  const getTime = (e) => {
    setTime(e.id);
    setSelectedTime(e.time);
  };

  const setSuccess = () => {
    setService(changeComponents.success);
  };

  const navcontentshamberger = () => {
    setShowNavBar(!showNavBar);
  };

  const toReorder = () => {
    setService(changeComponents.reorder);
  };

  const fromReroder = () => {
    setService(changeComponents.typeOfWash);
  };

  const getReorder = (reorderData) => {
    setTypeofWashing(reorderData.typeofWash);
    setItems(reorderData.item);
    setDataTobeSent(reorderData.data);
    setService(changeComponents.addCoupon);
  };

  return (
    <div style={{ overflow: "hidden" }} id="home" className="washitup-block1">
      <div className="bar-nav" bg="#b8dde3" variant="light">
        <div className="nav-bar-contents">
          <img
            style={{
              cursor: "pointer",
              marginRight: "28%",
            }}
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
      <div className="main-page-content">
        <h4>
          Get The Best <br /> Laundry Service <br /> At Your
          <span>Door Step</span>
        </h4>
        <p>Book laundry service with just few easy steps</p>
      </div>
      {service === changeComponents.washClothes ? (
        <AddClothes typeOfWashing={typeOfWashing} wash={washClothes} />
      ) : service === changeComponents.typeOfWash ? (
        <TypeOfWashing type={callBackForTypeOfWashing} toReorder={toReorder} />
      ) : service === changeComponents.bookService ? (
        <BookService
          items={items}
          book={bookService}
          time={time}
          getTime={getTime}
        />
      ) : service === changeComponents.addCoupon ? (
        <AddCoupon
          items={items}
          dataTobeSent={dataTobeSent}
          success={setSuccess}
          typeOfWashing={typeOfWashing}
        />
      ) : service === changeComponents.success ? (
        <Success washing={washing} />
      ) : service === changeComponents.washing ? (
        <Washing selectedTime={selectedTime} />
      ) : (
        <Reorder fromReroder={fromReroder} getReorder={getReorder} />
      )}

      <div
        style={{ position: "absolute" }}
        class="elfsight-app-7c53dc20-f0e1-4689-a2cd-9ffc37dc68ff"
      ></div>
    </div>
  );
}

export default withRouter(LaundryNav);
