import "./indexb.css";

import { useState } from "react";

import BookServiceB from "../BookServiceB/bookserviceB.js";

import SuccessB from "../SuccessB/successB.js";

import WashingB from "../TypeOfWashingB/typeOfWashingb.js";

import WashingBC from "../WashingB/washingB.js";

import AddCouponB from "../AddCouponB/addCouponB.js";

import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

import Cookies from "js-cookie";

import Reorder from "../Reordercomponent/Rorder";

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
  const navcontentshamberger = () => {
    const navcontents = document.getElementById("contents");
    console.log(navcontents);
    navcontents.classList.toggle("donotshow");
  };

  const [section, setSection] = useState(changeComponents.success);

  const [typeofWash, setTypeofWashing] = useState("");

  const [itemsToWash, setItemToWash] = useState([]);

  const [time, setTime] = useState(0);

  const [selectedTime, setSelectedTime] = useState("");
  const [dataTobeSent, setDataTobeSent] = useState("");

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

  return (
    <div id="home" className="background1-con">
      <div className="bar" bg="#b8dde3" variant="light">
        <div className="navbarcontainer">
          <img
            onClick={() => {
              window.location.href = "/";
            }}
            href="#logo"
            className="main-head"
            src="./washituplogo.png"
            alt="Main Logo"
          />
          <button
            style={{ cursor: "pointer" }}
            id="contents"
            className="navbar-nav donotshow"
          >
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
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  Cookies.remove("jwt_userId");
                  window.location.href = "/";
                }}
                href="#pricing"
                className="blog"
              >
                <button
                  style={{ cursor: "pointer" }}
                  type="button"
                  onClick={() => {
                    Cookies.remove("jwt_userId");
                    window.location.href = "/";
                  }}
                  className="but"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div
                onClick={() => {
                  window.location.href = "/userlogin";
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/userlogin";
                  }}
                  className="but"
                >
                  Log In
                </button>
              </div>
            )}
          </button>
        </div>
        <div className="hamburger">
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
      <img className="cyancon" src="./cyan.png" alt="cyancon" />
      {/*<div className="content122">
        <img className="cyancon" src="./cyan.png" alt="cyancon" />
       
        <p className="head">
          Get The Best <br /> Laundry Service <br /> At Your
          <span
            style={{ fontFamily: "Arial", fontWeight: "900" }}
            className="sp"
          >
            {" "}
            Door Step
          </span>
        </p>
        <p className="para1123">
          Book laundry service with just few easy steps
        </p>
      </div>*/}

      {section === changeComponents.typeOfWash ? (
        <WashingB
          typing={typing}
          callBackForTypeOfWashing={callBackForTypeOfWashing}
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
      ) : (
        <WashingBC />
      )}

      <img className="impink" src="./pinkcon.png" alt="pinkcon" />
      <div
        style={{ position: "absolute" }}
        class="elfsight-app-7c53dc20-f0e1-4689-a2cd-9ffc37dc68ff"
      ></div>
    </div>
  );
}

export default withRouter(LaundryNavB);
