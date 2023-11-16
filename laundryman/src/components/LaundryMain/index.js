import "./index.css";

import { useState } from "react";

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
    const navcontents = document.getElementById("contents");
    console.log(navcontents);
    navcontents.classList.toggle("donotshow");
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
                    Cookies.remove("jwt_userName");
                    Cookies.remove("jwt_mobileNumber");
                    Cookies.remove("jwt_adminLogin");
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
      <div className="content122">
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
      <img className="impink" src="./pinkcon.png" alt="pinkcon" />
      <div
        style={{ position: "absolute" }}
        class="elfsight-app-7c53dc20-f0e1-4689-a2cd-9ffc37dc68ff"
      ></div>
    </div>
  );
}

export default withRouter(LaundryNav);
