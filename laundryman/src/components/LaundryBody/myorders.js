import "./myorders.css";

import Cookies from "js-cookie";

import { useState, useEffect } from "react";

import { TailSpin } from "react-loader-spinner";

const MyOrders = () => {
  const [myorders, setMyOrders] = useState([]);

  const [load, setLoad] = useState(true);

  const [filterdItems, setfilterItems] = useState([]);

  const [totalamount, setTotalAmount] = useState(0);

  useEffect(() => {
    getMyOrders();
  }, []);

  const ModalBoxItems = () => {
    return (
      <>
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#33333350",
          }}
        ></div>
        <div className="modal">
          <div className="items-modalbox-con">
            <button
              onClick={() => {
                setfilterItems([]);
              }}
              type="button"
              style={{
                position: "absolute",
                color: "#6759ff",
                fontWeight: "bold",
                right: "2rem",
                borderWidth: 0,
                backgroundColor: "transparent",
              }}
            >
              ✕
            </button>
            <div className="myorder-body-header">
              <h6 style={{ margin: 0 }}>
                Items
                <span
                  style={{
                    color: "#6759FF",
                    fontWeight: "bold",
                    marginLeft: "8%",
                  }}
                >
                  {filterdItems.length}
                </span>
              </h6>
              <h6 className="header-6">
                Total :
                <span
                  style={{
                    color: "#6759FF",
                    fontWeight: "bold",
                    marginLeft: "8%",
                  }}
                >
                  {totalamount}
                </span>
              </h6>
            </div>
            <div className="myorder-body-header1">
              <div className="myorder-body-para">Image</div>
              <p className="myorder-body-para">Item Type</p>
              <p className="myorder-body-para">Category</p>
              <p className="myorder-body-para">Unit Price</p>
              <p className="myorder-body-para">Quantity</p>
              <p className="myorder-body-para">Item Total</p>
            </div>
            {filterdItems.map((each) => (
              <div key={each.id} className="myorder-body-header2">
                <div className="myorder-body-para">
                  <img src={each.itemId.image} alt={each.itemId.name} />
                </div>

                <p
                  style={{ textTransform: "capitalize" }}
                  className="myorder-body-para"
                >
                  {each.itemId.name}
                </p>
                <p
                  style={{ textTransform: "capitalize" }}
                  className="myorder-body-para"
                >
                  {each.itemId.category}
                </p>
                {each.price > 1000 && each.price < 100000 ? (
                  <p className="myorder-body-para">
                    ₹ {parseInt(each.price) / 1000} K
                  </p>
                ) : each.price > 100000 && each.price < 1000000 ? (
                  <p className="myorder-body-para">
                    ₹ {parseInt(each.price) / 100000} L
                  </p>
                ) : each.price > 1000000 ? (
                  <p className="myorder-body-para">
                    ₹ {parseInt(each.price) / 1000000} M
                  </p>
                ) : (
                  <p className="myorder-body-para">₹ {each.price}</p>
                )}

                <p className="myorder-body-para">{each.itemCount}</p>
                {each.price * each.itemCount > 1000 &&
                each.price * each.itemCount < 100000 ? (
                  <p className="myorder-body-para">
                    ₹ {parseInt(each.price * each.itemCount) / 1000} K
                  </p>
                ) : each.price * each.itemCount > 100000 &&
                  each.price * each.itemCount < 1000000 ? (
                  <p className="myorder-body-para">
                    ₹ {parseInt(each.price * each.itemCount) / 100000} L
                  </p>
                ) : each.price * each.itemCount > 1000000 ? (
                  <p className="myorder-body-para">
                    ₹ {parseInt(each.price * each.itemCount) / 1000000} M
                  </p>
                ) : (
                  <p className="myorder-body-para">
                    ₹ {each.price * each.itemCount}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const getMyOrders = async () => {
    const url = `${
      process.env.REACT_APP_ROOT_URL
    }/api/user/getMyOrders/${Cookies.get("jwt_userId")}`;

    const response = await fetch(url);

    const data = await response.json();

    if (response.ok) {
      setLoad(false);
      let orders = data.Orders.orders.sort(function (a, b) {
        var datePartsA = a.date.split("-").map(Number); // Convert date strings to arrays of numbers
        var datePartsB = b.date.split("-").map(Number);

        // Compare the date parts (year, month, day) in descending order
        if (datePartsA[2] < datePartsB[2]) return 1; // Compare years
        if (datePartsA[2] > datePartsB[2]) return -1;
        if (datePartsA[1] < datePartsB[1]) return 1; // Compare months
        if (datePartsA[1] > datePartsB[1]) return -1;
        if (datePartsA[0] < datePartsB[0]) return 1; // Compare days
        if (datePartsA[0] > datePartsB[0]) return -1;
        return 0;
      });

      setMyOrders(orders);
    } else {
      setLoad(false);
      window.location.href = "/myorders";
    }
  };

  const seperateItems = (e) => {
    let seperatedOrder = myorders.filter((each) => each._id === e.target.id);

    let service = seperatedOrder[0].service;
    setTotalAmount(seperatedOrder[0].totalAmount);

    let sep = seperatedOrder[0].items.map((each) => ({
      ...each,
      price:
        service === "dry Cleaning"
          ? each.itemId.drycleaning
          : service === "wash & fold"
          ? each.itemId.washfold
          : each.itemId.washiron,
    }));
    setfilterItems(sep);
  };

  const navcontentshamberger = () => {
    const navcontents = document.getElementById("contents");
    console.log(navcontents);
    navcontents.classList.toggle("donotshow");
  };

  if (Cookies.get("jwt_userId") === undefined) {
    window.location.href = "/";
  } else {
    return load ? (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TailSpin color="#6759ff" />
      </div>
    ) : (
      <>
        {filterdItems.length > 0 && <ModalBoxItems />}
        <div className="bar" bg="#b8dde3" variant="light">
          <div style={{ marginBottom: "-5rem" }} className="navbarcontainer">
            <img
              href="#logo"
              className="main-head"
              src="./washituplogo.png"
              alt="Main Logo"
            />
            <div
              style={{ cursor: "pointer" }}
              id="contents"
              className="navbar-nav donotshow"
            >
              <div className="home">Home</div>
              <div href="#features">About us</div>
              <div href="#pricing">Blog</div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  Cookies.get("jwt_userId") !== undefined
                    ? (window.location.href = "/myorders")
                    : (window.location.href = "/userlogin");
                }}
                href="#myorders"
              >
                My Orders
              </div>
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
            </div>
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
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "1.3rem",
            margin: 0,
          }}
        >
          <div className="myorder-con">
            {myorders.map((each) => (
              <div
                id={each._id}
                onClick={seperateItems}
                key={each._id}
                className="subcon-myorders"
              >
                {each.progress === "Active" ? (
                  <div
                    style={{
                      width: "105%",
                      height: "2.5%",
                      backgroundColor: "green",
                      position: "absolute",
                      left: "-2.5%",
                      top: 0,
                      borderRadius: "1rem",
                    }}
                  ></div>
                ) : each.progress === "Completed" ? (
                  <div
                    style={{
                      width: "105%",
                      height: "2.5%",
                      backgroundColor: "orange",
                      position: "absolute",
                      left: "-2.5%",
                      top: 0,
                      borderRadius: "1rem",
                    }}
                  ></div>
                ) : each.progress === "cancel" ? (
                  <div
                    style={{
                      width: "105%",
                      height: "2.5%",
                      backgroundColor: "red",
                      position: "absolute",
                      left: "-2.5%",
                      top: 0,
                      borderRadius: "1rem",
                    }}
                  ></div>
                ) : (
                  <div
                    style={{
                      width: "105%",
                      height: "2.5%",
                      backgroundColor: "#6759ff",
                      position: "absolute",
                      left: "-2.5%",
                      top: 0,
                      borderRadius: "1rem",
                    }}
                  ></div>
                )}
                <p id={each._id} onClick={seperateItems}>
                  Id : {each._id}
                </p>
                {each.progress === "Active" ? (
                  <p
                    id={each._id}
                    onClick={seperateItems}
                    className="status"
                    style={{ color: "green" }}
                  >
                    Order Placed
                  </p>
                ) : each.progress === "Completed" ? (
                  <p
                    id={each._id}
                    onClick={seperateItems}
                    className="status"
                    style={{ color: "orange" }}
                  >
                    Washing Completed
                  </p>
                ) : each.progress === "cancel" ? (
                  <p
                    id={each._id}
                    onClick={seperateItems}
                    className="status"
                    style={{ color: "red" }}
                  >
                    Order Canceled
                  </p>
                ) : (
                  <p
                    id={each._id}
                    onClick={seperateItems}
                    className="status"
                    style={{ color: "#6759ff" }}
                  >
                    Washing In Progress
                  </p>
                )}
                <p id={each._id} onClick={seperateItems}>
                  Items :{" "}
                  <span
                    id={each._id}
                    onClick={seperateItems}
                    className="span-el"
                  >
                    {each.items.length}
                  </span>
                </p>
                <p id={each._id} onClick={seperateItems}>
                  Date & Time :{" "}
                  <span
                    id={each._id}
                    onClick={seperateItems}
                    className="span-el"
                  >
                    {each.date} - {each.time}
                  </span>
                </p>
                <p id={each._id} onClick={seperateItems}>
                  Service Type :{" "}
                  <span
                    id={each._id}
                    onClick={seperateItems}
                    className="span-el"
                  >
                    {each.service}
                  </span>
                </p>
                {each.service === "dry Cleaning" ? (
                  <img
                    className="service-image"
                    src="/drycleaning.png"
                    alt="Dry Cleaning"
                  />
                ) : each.service === "wash & iron" ? (
                  <img
                    className="service-image"
                    src="/wash&iron.png"
                    alt="wash & iron"
                  />
                ) : (
                  <img
                    className="service-image"
                    src="/wash&fold.png"
                    alt="wash&fold"
                  />
                )}
                <p id={each._id} onClick={seperateItems} className="amount">
                  Total :
                  <span
                    id={each._id}
                    onClick={seperateItems}
                    style={{ color: "green" }}
                  >
                    {each.totalAmount}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default MyOrders;
