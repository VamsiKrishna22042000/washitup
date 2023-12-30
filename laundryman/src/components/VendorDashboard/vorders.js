import { useEffect, useState } from "react";
import "../Admindashboard/admin.css";

import { v4 as uuidV4 } from "uuid";

import { TailSpin } from "react-loader-spinner";

import { FaCalendarAlt } from "react-icons/fa";

import { LuTimerReset } from "react-icons/lu";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { MdLocalLaundryService } from "react-icons/md";

import Cookies from "js-cookie";

const VOrders = () => {
  /**allorders is the state used to get all the orders of all the user's */
  const [allorders, setAllOrders] = useState([]);

  /**selected Customer state is used to get the particular order detials(items which user selected)  array of a particular user*/
  const [selectedCustomer, setSelectedCustomer] = useState("");

  /**items is a state used to store the items that were selected by the particular user which was obtained from the particular selected user*/
  const [items, setItems] = useState([]);

  /**count is a state to store the count of active,inprogress,completed,canceled orders */
  const [count, setCount] = useState({
    active: "",
    inprogress: "",
    completed: "",
    cancel: "",
  });

  /**search customer is used to filter the allordes array based on the customer name which was searched in the search box */

  const [load, setLoad] = useState(false);

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedData] = useState({ date: "", id: "" });

  const [orderdate, setOrderDate] = useState(0);
  const [enddate, setEndDate] = useState(0);
  const [daysLeft, setDaysRemained] = useState(0);

  const [showDate, setShowDate] = useState(false);

  const [subfilter, setSubfilter] = useState("");

  const [mainLoad, setMainLoad] = useState(false);

  const [filterPresentOrders, setPresentOrders] = useState([]);

  /**To get all the order before mounting by an api call*/
  useEffect(() => {
    getAllOrders();
  }, []);

  /**getAllOrders is a function to get all the orders of the vendor*/

  const getAllOrders = async () => {
    setMainLoad(true);
    const url = `${
      process.env.REACT_APP_ROOT_URL
    }/api/admin/getVendorById/${Cookies.get("jwt_vendorId")}`;

    const vendorObtained = await fetch(url);

    const response = await vendorObtained.json();

    if (vendorObtained.ok) {
      /**This is an array to insert name,mobileNumber,userId of the user into the each order object which were in the array of orders */
      let eachObjInsertedWithNumberName = [];

      for (let eachorder of response.data.orders) {
        eachObjInsertedWithNumberName.push({
          ...eachorder.order,
          status: eachorder.status,
        });
      }

      /**Sorted the array of orders based onthe latest date */

      eachObjInsertedWithNumberName.sort(function (a, b) {
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

      setCount({
        active: response.activeCount,
        inprogress: response.inProgressCount,
        completed: response.completeCount,
        cancel: response.cancelCount,
      });

      console.log(eachObjInsertedWithNumberName);

      setAllOrders(eachObjInsertedWithNumberName);
      eachObjInsertedWithNumberName.length > 0
        ? setMainLoad(true)
        : setMainLoad(false);
    }
  };

  /**Function used to Filter the items of the selected user to view the users order detials*/
  const filterCustomer = (e) => {
    const selectedCustomerOrder = allorders.filter(
      (each) => each._id === e.target.id
    );

    let itemsObtained = [];

    setOrderDate(selectedCustomerOrder[0].date);

    function addDaysToDate(dateString, daysToAdd) {
      // Split the date string into day, month, and year
      const dateParts = dateString.split("-");
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // Months are 0-based
      const year = parseInt(dateParts[2], 10);

      // Create a Date object from the parsed parts
      const date = new Date(year, month, day);

      // Add the specified number of days
      date.setDate(date.getDate() + daysToAdd);

      // Format the result as dd-mm-yyyy
      const newDay = String(date.getDate()).padStart(2, "0");
      const newMonth = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const newYear = date.getFullYear();

      // Calculate the time difference in milliseconds
      const currentDate = new Date();
      console.log(newYear, newMonth, newDay);
      const endDate = new Date(newYear, newMonth - 1, newDay);
      console.log(endDate);
      const timeDifference = endDate - currentDate;

      // Convert the time difference to days
      const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // Return both the new date and days remaining
      return {
        newDate: `${newDay}-${newMonth}-${newYear}`,
        daysRemaining: daysRemaining,
      };
    }

    const daysToAdd = 7;
    const newDateObj = addDaysToDate(selectedCustomerOrder[0].date, daysToAdd);

    setEndDate(newDateObj.newDate);
    setDaysRemained(newDateObj.daysRemaining);

    for (let each of selectedCustomerOrder[0].items) {
      itemsObtained.push({
        count: each.itemCount,
        id: each._id,
        itemCategory: each.itemId.category,
        itemName: each.itemId.name,
        price:
          selectedCustomerOrder[0].service === "dry Cleaning"
            ? each.itemId.drycleaning
            : selectedCustomerOrder[0].service === "wash & fold"
            ? each.itemId.washfold
            : each.itemId.washiron,
        image: each.itemId.image,
      });
    }

    console.log(itemsObtained);

    setItems(itemsObtained);
    setSelectedCustomer(selectedCustomerOrder);
  };

  /**Function used to filter all the orders based on the username enterd in the search box */

  /**Function used to set the progress of the particular order(active,inprogress,completed,cancel) */
  const settingProgress = async (e) => {
    setAllOrders([]);
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/progressActive`;
    let userId = e.target.getAttribute("userId");
    let orderId = e.target.id;

    let progress = e.target.value === "Cancel" ? "cancel" : e.target.value;
    /**console.log(userId)*/

    const reqConfigure = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ userId, orderId, progress }),
    };

    const response = await fetch(url, reqConfigure);

    if (response.ok) {
      getAllOrders();
    }
  };

  /**Fuction to update progress in the sub section */
  const settingProgress2 = async (e) => {
    setLoad(true);
    let userId = e.target.getAttribute("userId");
    let orderId = e.target.id;

    let progress = e.target.value === "Cancel" ? "cancel" : e.target.value;

    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/progressActive`;

    const reqConfigure = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ userId, orderId, progress }),
    };

    const response = await fetch(url, reqConfigure);

    if (response.ok) {
      filterCustomer2(e.target.id);
    }
  };

  /**Fuction to update progress in the sub section and*/
  const filterCustomer2 = async (orderId) => {
    const url = `${
      process.env.REACT_APP_ROOT_URL
    }/api/admin/getVendorById/${Cookies.get("jwt_vendorId")}`;

    const vendorObtained = await fetch(url);

    const response = await vendorObtained.json();
    if (vendorObtained.ok) {
      let eachObjInsertedWithNumberName = [];

      for (let eachorder of response.data.orders) {
        eachObjInsertedWithNumberName.push({
          ...eachorder.order,
          status: eachorder.status,
        });
      }

      const selectedCustomerOrder = eachObjInsertedWithNumberName.filter(
        (each) => each._id === orderId
      );

      let itemsObtained = [];

      function addDaysToDate(dateString, daysToAdd) {
        // Split the date string into day, month, and year
        const dateParts = dateString.split("-");
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Months are 0-based
        const year = parseInt(dateParts[2], 10);

        // Create a Date object from the parsed parts
        const date = new Date(year, month, day);

        // Add the specified number of days
        date.setDate(date.getDate() + daysToAdd);

        // Format the result as dd-mm-yyyy
        const newDay = String(date.getDate()).padStart(2, "0");
        const newMonth = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const newYear = date.getFullYear();

        // Calculate the time difference in milliseconds
        const currentDate = new Date();
        console.log(newYear, newMonth, newDay);
        const endDate = new Date(newYear, newMonth - 1, newDay);
        console.log(endDate);
        const timeDifference = endDate - currentDate;

        // Convert the time difference to days
        const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        // Return both the new date and days remaining
        return {
          newDate: `${newDay}-${newMonth}-${newYear}`,
          daysRemaining: daysRemaining,
        };
      }
      const daysToAdd = 7;
      const newDateObj = addDaysToDate(
        selectedCustomerOrder[0].date,
        daysToAdd
      );

      setEndDate(newDateObj.newDate);
      setDaysRemained(newDateObj.daysRemaining);

      for (let each of selectedCustomerOrder[0].items) {
        itemsObtained.push({
          count: each.itemCount,
          id: each._id,
          itemCategory: each.itemId.category,
          itemName: each.itemId.name,
          price:
            selectedCustomerOrder[0].service === "dry Cleaning"
              ? each.itemId.drycleaning
              : selectedCustomerOrder[0].service === "wash & fold"
              ? each.itemId.washfold
              : each.itemId.washiron,
          image: each.itemId.image,
        });
      }
      setLoad(false);
      setItems(itemsObtained);
      setSelectedCustomer(selectedCustomerOrder);
    }
  };

  const Caland = () => {
    return (
      <Calendar
        className="calender3"
        onChange={(date) => {
          setDate(date);
          const dd = String(date.getDate()).padStart(2, "0");
          const mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
          const yyyy = date.getFullYear();

          const dateArr = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
          ];

          // console.log(dd);
          // console.log(mm);

          let d = dateArr.includes(dd) ? dd[1] : dd;
          let m = dateArr.includes(mm) ? mm[1] : mm;

          // let d = dd;

          // console.log(d);
          // console.log(m);

          // Combine them in the desired format
          const formattedDate = `${d}-${m}-${yyyy}`;
          setSelectedData({ date: formattedDate, id: "cal" });
          setShowDate(false);
        }}
        value={date}
      />
    );
  };

  const filterByProgress = allorders.filter((each) =>
    subfilter === ""
      ? each
      : each.progress === subfilter && each.status === "Accepted"
  );

  const filterByDate = filterByProgress.filter((each) =>
    selectedDate.date === ""
      ? each
      : String(each.date) === String(selectedDate.date) && each
  );

  // console.log(selectedDate);

  // console.log(filterByProgress);

  // console.log(filterByDate);

  const acceptOrReject = async (e) => {
    setAllOrders([]);
    const vendorId = Cookies.get("jwt_vendorId");
    const orderId = e.target.id;
    const status = e.target.getAttribute("status");

    const url = `${process.env.REACT_APP_ROOT_URL}/api/vendor/orderAccepRejectVendor`;

    const reqConfigure = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vendorId, orderId, status }),
    };

    const response = await fetch(url, reqConfigure);

    if (response.ok) {
      getAllOrders();
    }
  };

  const handlePresentRequests = () => {
    let obtainedPresentRequests = allorders.filter((order) => {
      let orderDate = new Date(order.orderBookDate);
      let selectedDate = new Date();

      console.log(order.status);

      if (orderDate.toDateString() === selectedDate.toDateString()) {
        return order;
      }
    });

    // console.log(allorders);
    console.log(obtainedPresentRequests);
    setPresentOrders(obtainedPresentRequests);
  };

  return allorders.length > 0 ? (
    <>
      {load ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="order-body"
        >
          <TailSpin color="#6759ff" height={50} width={50} />
        </div>
      ) : (
        <section className="order-body">
          {selectedCustomer === "" ? (
            <div className="order-summary-head">
              {/**Before selecting particular order */}
              <h6 style={{ color: "#53545c" }}>Orders Summary</h6>
            </div>
          ) : (
            <div className="order-summary-head">
              {/**After selecting particular order */}
              <h6 style={{ color: "#53545c", width: "45%" }}>
                Orders Id : {selectedCustomer[0]._id}
              </h6>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "25%",
                  marginLeft: "0%",
                  marginRight: "15%",
                }}
              >
                {selectedCustomer[0].progress === "Active" && (
                  <select
                    onChange={settingProgress2}
                    userId={selectedCustomer[0].userId}
                    id={selectedCustomer[0]._id}
                    value={selectedCustomer[0].progress}
                    style={{ textTransform: "capitalize", marginRight: "5%" }}
                  >
                    <option>Active</option>
                    <option>In Progress</option>
                  </select>
                )}

                {selectedCustomer[0].progress === "In Progress" && (
                  <select
                    onChange={settingProgress2}
                    userId={selectedCustomer[0].userId}
                    id={selectedCustomer[0]._id}
                    value={selectedCustomer[0].progress}
                    style={{ textTransform: "capitalize", marginRight: "5%" }}
                  >
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                )}

                {selectedCustomer[0].progress === "Completed" && (
                  <select
                    onChange={settingProgress2}
                    userId={selectedCustomer[0].userId}
                    id={selectedCustomer[0]._id}
                    value={selectedCustomer[0].progress}
                    style={{ textTransform: "capitalize", marginRight: "5%" }}
                  >
                    <option>Completed</option>
                  </select>
                )}

                <p
                  style={
                    selectedCustomer[0].progress === "Active"
                      ? {
                          fontSize: "1vw",
                          padding: ".2rem .4rem",
                          backgroundColor: "#FFA00025",
                          color: "#FFA000",
                          borderRadius: "8px",
                          textTransform: "capitalize",
                        }
                      : selectedCustomer[0].progress === "In Progress"
                      ? {
                          fontSize: "1vw",
                          padding: ".2rem .4rem",
                          color: "#6759FF",
                          backgroundColor: "#6759FF25",
                          borderRadius: "8px",
                          textTransform: "capitalize",
                        }
                      : selectedCustomer[0].progress === "Completed"
                      ? {
                          padding: ".2rem .4rem",
                          fontSize: "1vw",

                          color: "#519C66",
                          backgroundColor: "#519C6625",
                          borderRadius: "8px",
                          textTransform: "capitalize",
                        }
                      : selectedCustomer[0].progress === "cancel" && {
                          fontSize: "1vw",
                          padding: ".2rem .4rem",
                          color: "#FF0000",
                          backgroundColor: "#FF000025",
                          borderRadius: "8px",
                          textTransform: "capitalize",
                        }
                  }
                >
                  {selectedCustomer[0].progress}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  height: "100%",
                  width: "25%",
                }}
              >
                {/**Button use to notshow details of particular order*/}
                <button
                  onClick={() => {
                    setSelectedCustomer("");
                    setAllOrders([]);
                    getAllOrders();
                  }}
                  type="button"
                  style={{
                    backgroundColor: "transparent",
                    marginLeft: "1%",
                    borderWidth: 0,
                    color: "#6759FF",
                    fontWeight: "bold",
                    fontSize: "1.5vw",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          {selectedCustomer === "" ? (
            allorders.length > 0 && (
              <div className="order-summary-view">
                {/**Count of active inprogress completed and cancel orders, booked by the users  */}
                <div style={{ position: "relative" }} className="summary-view">
                  <div
                    style={{
                      height: "25%",
                      width: "12%",
                      backgroundColor: "#FFCC9169",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                    }}
                  >
                    <img
                      style={{ height: "70%", width: "70%" }}
                      src="/order2.png"
                      alt="Profile"
                    />
                  </div>
                  <p
                    style={{
                      position: "absolute",
                      bottom: "55%",
                      left: "5%",
                      color: "#8B8D97",
                      fontSize: "0.85vw",
                    }}
                  >
                    Total Orders
                  </p>

                  {allorders.length > 1000 && allorders.length < 100000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "42.5%",
                        left: "5%",
                        color: "#6759FF",
                        fontSize: "1.2vw",
                        fontWeight: "bold",
                      }}
                    >
                      {parseInt(allorders.length) / 1000} K
                    </p>
                  ) : allorders.length > 100000 &&
                    allorders.length < 1000000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "42.5%",
                        left: "5%",
                        color: "#6759FF",
                        fontSize: "1.2vw",
                        fontWeight: "bold",
                      }}
                    >
                      {parseInt(allorders.length) / 100000} L
                    </p>
                  ) : allorders.length > 1000000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "42.5%",
                        left: "5%",
                        color: "#6759FF",
                        fontSize: "1.2vw",
                        fontWeight: "bold",
                      }}
                    >
                      {parseInt(allorders.length) / 1000000} M
                    </p>
                  ) : (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "42.5%",
                        left: "5%",
                        color: "#6759FF",
                        fontSize: "1.2vw",
                        fontWeight: "bold",
                      }}
                    >
                      {allorders.length}
                    </p>
                  )}

                  <p
                    style={{
                      position: "absolute",
                      bottom: "30%",
                      left: "5%",
                      color: "#8B8D97",
                      fontSize: "0.85vw",
                    }}
                  >
                    Active
                  </p>

                  {count.active > 1000 && count.active < 100000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "5%",
                        color: "#FFA000",
                        fontSize: "1.2vw",
                      }}
                    >
                      {parseInt(count.active) / 1000} K
                    </p>
                  ) : count.active > 100000 && count.active < 1000000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "5%",
                        color: "#FFA000",
                        fontSize: "1.2vw",
                      }}
                    >
                      {parseInt(count.active) / 100000} L
                    </p>
                  ) : count.active > 1000000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "5%",
                        color: "#FFA000",
                        fontSize: "1.2vw",
                      }}
                    >
                      {parseInt(count.active) / 1000000} M
                    </p>
                  ) : (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "5%",
                        color: "#FFA000",
                        fontSize: "1.2vw",
                      }}
                    >
                      {count.active}
                    </p>
                  )}

                  <p
                    style={{
                      position: "absolute",
                      bottom: "30%",
                      left: "25%",
                      color: "#8B8D97",
                      fontSize: "0.85vw",
                    }}
                  >
                    In Progress
                  </p>
                  {count.inprogress > 1000 && count.inprogress < 100000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "25%",
                        color: "#6759FF",
                        fontSize: "1.2vw",
                      }}
                    >
                      {parseInt(count.inprogress) / 1000} K
                    </p>
                  ) : count.inprogress > 100000 &&
                    count.inprogress < 1000000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "25%",
                        color: "#6759FF",
                        fontSize: "1.2vw",
                      }}
                    >
                      {parseInt(count.inprogress) / 100000} L
                    </p>
                  ) : count.inprogress > 1000000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "25%",
                        color: "#6759FF",
                        fontSize: "1.2vw",
                      }}
                    >
                      {parseInt(count.inprogress) / 1000000} M
                    </p>
                  ) : (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "25%",
                        color: "#6759FF",
                        fontSize: "1.2vw",
                      }}
                    >
                      {count.inprogress}
                    </p>
                  )}
                  <p
                    style={{
                      position: "absolute",
                      bottom: "30%",
                      left: "52%",
                      color: "#8B8D97",
                      fontSize: "0.85vw",
                    }}
                  >
                    Completed
                  </p>

                  {count.completed > 1000 && count.completed < 100000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "52%",
                        color: "green",
                        fontSize: "1.2vw",
                      }}
                    >
                      {parseInt(count.completed) / 1000} K
                    </p>
                  ) : count.completed > 100000 && count.completed < 1000000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "52%",
                        color: "green",
                        fontSize: "1.2vw",
                      }}
                    >
                      {parseInt(count.completed) / 100000} L
                    </p>
                  ) : count.completed > 1000000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "52%",
                        color: "green",
                        fontSize: "1.2vw",
                      }}
                    >
                      {parseInt(count.completed) / 1000000} M
                    </p>
                  ) : (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "52%",
                        color: "green",
                        fontSize: "1.2vw",
                      }}
                    >
                      {count.completed}
                    </p>
                  )}

                  <p
                    style={{
                      position: "absolute",
                      bottom: "30%",
                      left: "80%",
                      color: "#8B8D97",
                      fontSize: "0.85vw",
                    }}
                  >
                    Cancel
                  </p>

                  {count.cancel > 1000 && count.cancel < 100000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "80%",
                        color: "#FF0000",
                        fontSize: "1.2vw",
                      }}
                    >
                      {parseInt(count.cancel) / 1000} K
                    </p>
                  ) : count.cancel > 100000 && count.cancel < 1000000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "80%",
                        color: "#FF0000",
                        fontSize: "1.2vw",
                      }}
                    >
                      {parseInt(count.cancel) / 100000} L
                    </p>
                  ) : count.cancel > 1000000 ? (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "80%",
                        color: "#FF0000",
                        fontSize: "1.2vw",
                      }}
                    >
                      {parseInt(count.cancel) / 1000000} M
                    </p>
                  ) : (
                    <p
                      style={{
                        position: "absolute",
                        bottom: "15%",
                        left: "80%",
                        color: "#FF0000",
                        fontSize: "1.2vw",
                      }}
                    >
                      {count.cancel}
                    </p>
                  )}
                </div>
                <div style={{ position: "relative" }} className="summary-view1">
                  <p style={{ marginLeft: "2%", marginBottom: 0 }}>
                    New Orders
                  </p>
                  <div
                    style={{
                      height: "80%",
                      overflowY: "scroll",
                      overflowX: "hidden",
                    }}
                  >
                    {filterByDate.map(
                      (each) =>
                        each.status === "in-active" && (
                          <div
                            style={{
                              position: "relative",
                            }}
                            key={`${each._id}${uuidV4()}`}
                            className="summary-view4"
                          >
                            {/**all orders booked by the user sorted based on the date */}
                            <p
                              style={{
                                textTransform: "capitalize",
                                width: "14%",
                                paddingLeft: "5%",
                              }}
                              id={each._id}
                              className="summary-view2"
                            >
                              <MdLocalLaundryService
                                fontSize="1.35rem"
                                color="#6759ff"
                              />
                            </p>
                            <p id={each._id} className="summary-view2">
                              {each.date} - {each.time}
                            </p>
                            <p
                              id={each._id}
                              className="summary-view2"
                              style={{
                                textTransform: "capitalize",
                                width: "14%",
                              }}
                            >
                              {each.service}
                            </p>
                            {each.totalAmount > 1000 &&
                            each.totalAmount < 100000 ? (
                              <p className="summary-view2">
                                ₹ {parseInt(each.totalAmount) / 1000} K
                              </p>
                            ) : each.totalAmount > 100000 &&
                              each.totalAmount < 1000000 ? (
                              <p className="summary-view2">
                                ₹ {parseInt(each.totalAmount) / 100000} L
                              </p>
                            ) : each.totalAmount > 1000000 ? (
                              <p className="summary-view2">
                                ₹ {parseInt(each.totalAmount) / 1000000} M
                              </p>
                            ) : (
                              <p className="summary-view2">
                                ₹ {each.totalAmount}
                              </p>
                            )}

                            <button
                              id={each._id}
                              className="summary-view5"
                              onClick={acceptOrReject}
                              style={{
                                textTransform: "capitalize",
                                width: "14%",
                                backgroundColor: "green",
                                color: "white",
                              }}
                              type="button"
                              status="Accepted"
                            >
                              Accept
                            </button>
                            <button
                              id={each._id}
                              className="summary-view5"
                              onClick={acceptOrReject}
                              style={{
                                textTransform: "capitalize",
                                width: "14%",
                                backgroundColor: "red",
                                color: "white",
                              }}
                              type="button"
                              status="Rejected"
                            >
                              Reject
                            </button>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="order-summary-view">
              <div style={{ position: "relative" }} className="summary-view">
                <div
                  style={{
                    height: "25%",
                    width: "12%",
                    backgroundColor: "#FFCC9169",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "8px",
                  }}
                >
                  <LuTimerReset style={{ fontSize: "1.5rem" }} />
                </div>
                <p
                  style={{
                    position: "absolute",
                    bottom: "50%",
                    left: "5%",
                    color: "#8B8D97",
                    fontSize: "0.85vw",
                  }}
                >
                  OrderBooked : {orderdate}
                </p>
                <p
                  style={{
                    position: "absolute",
                    bottom: "50%",
                    right: "5%",
                    color: "#45464E",
                    fontSize: "0.85vw",
                  }}
                >
                  EndDate : {enddate}
                </p>
                <p
                  style={{
                    position: "absolute",
                    bottom: "35%",
                    left: "5%",
                    color: "#45464E",
                    fontSize: "1.1vw",
                  }}
                >
                  Days Left
                </p>
                <p
                  style={{
                    position: "absolute",
                    bottom: "15%",
                    left: "5%",
                    color: daysLeft >= 4 ? "green" : "red",
                    fontSize: "1.5rem",
                    fontWeight: "Bold",
                  }}
                >
                  {daysLeft < 0 ? "Dead Line Ended" : daysLeft}
                </p>
              </div>
            </div>
          )}
          {selectedCustomer === "" ? (
            <div className="order-summary-body">
              {showDate && <Caland />}
              <div className="order-body-header">
                <h6 style={{ margin: 0 }}>Your Orders</h6>
                <div>
                  <strong style={{ fontSize: ".8rem" }}>Date Filter :</strong>
                  <button
                    id="Present"
                    className={
                      selectedDate.id === "Present"
                        ? "filterButton2"
                        : "filterButton"
                    }
                    type="button"
                    onClick={(e) => {
                      const today = new Date();
                      const dd = String(today.getDate()).padStart(2, "0");
                      const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
                      const yyyy = today.getFullYear();

                      const currentDate = `${dd}-${mm}-${yyyy}`;
                      setSelectedData({ date: currentDate, id: e.target.id });
                      handlePresentRequests();
                    }}
                  >
                    Present Bookings
                  </button>
                  <button
                    onClick={(e) => {
                      setSelectedData({ date: "", id: "" });
                      const dateArr = [
                        "01",
                        "02",
                        "03",
                        "04",
                        "05",
                        "06",
                        "07",
                        "08",
                        "09",
                      ];
                      const today = new Date();
                      const dd = String(today.getDate()).padStart(2, "0");
                      const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
                      const yyyy = today.getFullYear();

                      let d = dateArr.includes(dd) ? dd[1] : dd;

                      const currentDate = `${d}-${mm}-${yyyy}`;

                      setSelectedData({ date: currentDate, id: e.target.id });
                    }}
                    id="today"
                    className={
                      selectedDate.id === "today"
                        ? "filterButton2"
                        : "filterButton"
                    }
                    type="button"
                  >
                    Today
                  </button>
                  <button
                    onClick={(e) => {
                      setSelectedData({ date: "", id: "" });
                      // Get the current date
                      const today = new Date();

                      // Calculate tomorrow's date
                      const tomorrow = new Date(today);
                      tomorrow.setDate(today.getDate() + 1);

                      // Format the date as "dd-mm-yyyy"
                      const dd = String(tomorrow.getDate()).padStart(2, "0");
                      const mm = String(tomorrow.getMonth() + 1).padStart(
                        2,
                        "0"
                      ); // January is 0!
                      const yyyy = tomorrow.getFullYear();

                      const dateArr = [
                        "01",
                        "02",
                        "03",
                        "04",
                        "05",
                        "06",
                        "07",
                        "08",
                        "09",
                      ];

                      let d = dateArr.includes(dd) ? dd[1] : dd;

                      const tomorrowDate = `${d}-${mm}-${yyyy}`;
                      setSelectedData({ date: tomorrowDate, id: e.target.id });
                    }}
                    className={
                      selectedDate.id === "tomorrow"
                        ? "filterButton2"
                        : "filterButton"
                    }
                    id="tomorrow"
                    type="button"
                  >
                    Tomorrow
                  </button>
                  <button
                    id="cal"
                    onClick={(e) => {
                      setSelectedData({ date: "", id: "cal" });

                      setShowDate(true);
                    }}
                    className={
                      selectedDate.id === "cal"
                        ? "filterButton2"
                        : "filterButton"
                    }
                    type="button"
                  >
                    <FaCalendarAlt />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedData({ date: "", id: "" });
                    }}
                    className="filterButton"
                    type="button"
                  >
                    Clear
                  </button>
                </div>

                <div>
                  <strong style={{ fontSize: ".8rem" }}>Filter :</strong>
                  <button
                    style={{
                      borderRadius: "5px",
                      marginLeft: "10px",
                      fontSize: "1vw",
                      borderColor: "#ffa000",
                      borderWidth: 1,
                      backgroundColor:
                        subfilter === "Active" ? "#ffa000" : "#ffffff",
                      color: subfilter === "Active" ? "#ffffff" : "#ffa000",
                    }}
                    type="button"
                    onClick={() => {
                      setSubfilter("Active");
                    }}
                  >
                    Active
                  </button>
                  <button
                    style={{
                      borderRadius: "5px",
                      marginLeft: "10px",
                      fontSize: "1vw",
                      borderColor: "#6759ff",
                      borderWidth: 1,
                      backgroundColor:
                        subfilter === "In Progress" ? "#6759ff" : "#ffffff",
                      color:
                        subfilter === "In Progress" ? "#ffffff" : "#6759ff",
                    }}
                    type="button"
                    onClick={() => {
                      setSubfilter("In Progress");
                    }}
                  >
                    In Progress
                  </button>
                  <button
                    style={{
                      borderRadius: "5px",
                      marginLeft: "10px",
                      fontSize: "1vw",
                      borderColor: "#519c66",
                      borderWidth: 1,
                      backgroundColor:
                        subfilter === "Completed" ? "#519c66" : "#ffffff",
                      color: subfilter === "Completed" ? "#ffffff" : "#519c66",
                    }}
                    type="button"
                    onClick={() => {
                      setSubfilter("Completed");
                    }}
                  >
                    Completed
                  </button>
                  <button
                    style={{
                      borderRadius: "5px",
                      marginLeft: "10px",
                      fontSize: "1vw",
                      borderColor: "grey",
                      borderWidth: 1,
                      backgroundColor: "#ffffff",
                      color: "grey",
                      marginRight: "10px",
                    }}
                    type="button"
                    onClick={() => {
                      setSubfilter("");
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="order-body-header1">
                <p style={{ width: "1%" }}></p>
                <p style={{ width: "14%" }} className="order-body-para"></p>
                <p className="order-body-para">Order Date</p>
                <p style={{ width: "20%" }} className="order-body-para">
                  Order Id
                </p>
                <p style={{ width: "14%" }} className="order-body-para">
                  Type of Wash
                </p>
                <p className="order-body-para">Order Total</p>
                <p
                  style={{ backgroundColor: "white" }}
                  className="order-body-select"
                >
                  Action
                </p>
                <p
                  style={{ backgroundColor: "white" }}
                  className="order-body-para1"
                >
                  Status
                </p>
              </div>

              {selectedDate.id !== "Present"
                ? filterByDate.map((each) =>
                    each.status === "Rejected" ? (
                      <div
                        style={{
                          position: "relative",
                          backgroundColor: "#22222215",
                        }}
                        key={`${each._id}${uuidV4()}`}
                        className="order-body-header2"
                      >
                        {/**all orders booked by the user sorted based on the date */}

                        <p
                          style={{
                            textTransform: "capitalize",
                            width: "14%",
                            paddingLeft: "5%",
                          }}
                          id={each._id}
                          className="order-body-para"
                        >
                          <MdLocalLaundryService
                            fontSize="1.1rem"
                            color="#6759ff"
                          />
                        </p>
                        <p id={each._id} className="order-body-para">
                          {each.date} - {each.time}
                        </p>
                        <p
                          id={each._id}
                          style={{ width: "20%" }}
                          className="order-body-para"
                        >
                          {each._id}
                        </p>
                        <p
                          id={each._id}
                          className="order-body-para"
                          style={{ textTransform: "capitalize", width: "14%" }}
                        >
                          {each.service}
                        </p>

                        {each.totalAmount > 1000 &&
                        each.totalAmount < 100000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000} K
                          </p>
                        ) : each.totalAmount > 100000 &&
                          each.totalAmount < 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 100000} L
                          </p>
                        ) : each.totalAmount > 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000000} M
                          </p>
                        ) : (
                          <p className="order-body-para">
                            ₹ {each.totalAmount}
                          </p>
                        )}

                        <div
                          userId={each.userId}
                          id={each._id}
                          className="order-body-select"
                          style={{
                            textTransform: "capitalize",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "0",
                            color: "red",
                          }}
                        >
                          <p
                            style={{ width: "100%" }}
                            className="order-body-para1"
                          >
                            {each.status}
                          </p>
                        </div>
                        <p
                          style={{ color: "red" }}
                          className="order-body-para1"
                        >
                          {each.status}
                        </p>
                      </div>
                    ) : each.status === "Accepted" &&
                      each.driverName1 === "empty" ? (
                      <div
                        style={{ position: "relative" }}
                        key={`${each._id}${uuidV4()}`}
                        className="order-body-header2"
                      >
                        {/**all orders booked by the user sorted based on the date */}

                        <p
                          style={{
                            textTransform: "capitalize",
                            width: "14%",
                            paddingLeft: "5%",
                          }}
                          id={each._id}
                          className="order-body-para"
                        >
                          <MdLocalLaundryService
                            fontSize="1.1rem"
                            color="#6759ff"
                          />
                        </p>
                        <p id={each._id} className="order-body-para">
                          {each.date} - {each.time}
                        </p>
                        <p
                          id={each._id}
                          style={{ width: "20%" }}
                          className="order-body-para"
                        >
                          {each._id}
                        </p>
                        <p
                          id={each._id}
                          className="order-body-para"
                          style={{ textTransform: "capitalize", width: "14%" }}
                        >
                          {each.service}
                        </p>

                        {each.totalAmount > 1000 &&
                        each.totalAmount < 100000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000} K
                          </p>
                        ) : each.totalAmount > 100000 &&
                          each.totalAmount < 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 100000} L
                          </p>
                        ) : each.totalAmount > 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000000} M
                          </p>
                        ) : (
                          <p className="order-body-para">
                            ₹ {each.totalAmount}
                          </p>
                        )}

                        <select
                          userId={each.userId}
                          id={each._id}
                          className="order-body-select"
                          style={{ textTransform: "capitalize" }}
                        >
                          <option>{each.progress}</option>
                        </select>

                        <p
                          style={
                            each.progress === "Active"
                              ? {
                                  backgroundColor: "#FFA00025",
                                  color: "#FFA000",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                              : each.progress === "In Progress"
                              ? {
                                  color: "#6759FF",
                                  backgroundColor: "#6759FF25",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                              : each.progress === "Completed"
                              ? {
                                  color: "#519C66",
                                  backgroundColor: "#519C6625",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                              : each.progress === "cancel" && {
                                  color: "#FF0000",
                                  backgroundColor: "#FF000025",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                          }
                          className="order-body-para1"
                        >
                          {each.progress}
                        </p>
                      </div>
                    ) : each.status === "Accepted" &&
                      each.progress !== "cancel" ? (
                      <div
                        style={{ position: "relative" }}
                        key={`${each._id}${uuidV4()}`}
                        className="order-body-header2"
                      >
                        {/**all orders booked by the user sorted based on the date */}

                        <p
                          style={{
                            textTransform: "capitalize",
                            width: "14%",
                            paddingLeft: "5%",
                          }}
                          id={each._id}
                          onClick={filterCustomer}
                          className="order-body-para"
                        >
                          <MdLocalLaundryService
                            fontSize="1.1rem"
                            color="#6759ff"
                          />
                        </p>
                        <p
                          id={each._id}
                          onClick={filterCustomer}
                          className="order-body-para"
                        >
                          {each.date} - {each.time}
                        </p>
                        <p
                          id={each._id}
                          onClick={filterCustomer}
                          style={{ width: "20%" }}
                          className="order-body-para"
                        >
                          {each._id}
                        </p>
                        <p
                          id={each._id}
                          onClick={filterCustomer}
                          className="order-body-para"
                          style={{ textTransform: "capitalize", width: "14%" }}
                        >
                          {each.service}
                        </p>

                        {each.totalAmount > 1000 &&
                        each.totalAmount < 100000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000} K
                          </p>
                        ) : each.totalAmount > 100000 &&
                          each.totalAmount < 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 100000} L
                          </p>
                        ) : each.totalAmount > 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000000} M
                          </p>
                        ) : (
                          <p className="order-body-para">
                            ₹ {each.totalAmount}
                          </p>
                        )}

                        {each.progress === "Active" && (
                          <select
                            userId={each.userId}
                            id={each._id}
                            onChange={settingProgress}
                            className="order-body-select"
                            style={{ textTransform: "capitalize" }}
                          >
                            <option
                              style={{ textTransform: "capitalize" }}
                              selected={
                                each.progress === "Active" ? true : false
                              }
                            >
                              Active
                            </option>
                            <option
                              style={{ textTransform: "capitalize" }}
                              selected={
                                each.progress === "In Progress" ? true : false
                              }
                            >
                              In Progress
                            </option>
                            {/* <option
                          style={{ textTransform: "capitalize" }}
                          selected={each.progress === "cancle" ? true : false}
                        >
                          Cancel
                        </option> */}
                          </select>
                        )}

                        {each.progress === "In Progress" && (
                          <select
                            userId={each.userId}
                            id={each._id}
                            onChange={settingProgress}
                            className="order-body-select"
                            style={{ textTransform: "capitalize" }}
                          >
                            <option
                              style={{ textTransform: "capitalize" }}
                              selected={
                                each.progress === "In Progress" ? true : false
                              }
                            >
                              In Progress
                            </option>
                            <option
                              style={{ textTransform: "capitalize" }}
                              selected={
                                each.progress === "Completed" ? true : false
                              }
                            >
                              Completed
                            </option>
                          </select>
                        )}

                        {each.progress === "Completed" && (
                          <select
                            userId={each.userId}
                            id={each._id}
                            onChange={settingProgress}
                            className="order-body-select"
                            style={{ textTransform: "capitalize" }}
                          >
                            <option
                              style={{ textTransform: "capitalize" }}
                              selected={
                                each.progress === "Completed" ? true : false
                              }
                            >
                              Completed
                            </option>
                          </select>
                        )}

                        <p
                          style={
                            each.progress === "Active"
                              ? {
                                  backgroundColor: "#FFA00025",
                                  color: "#FFA000",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                              : each.progress === "In Progress"
                              ? {
                                  color: "#6759FF",
                                  backgroundColor: "#6759FF25",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                              : each.progress === "Completed"
                              ? {
                                  color: "#519C66",
                                  backgroundColor: "#519C6625",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                              : each.progress === "cancel" && {
                                  color: "#FF0000",
                                  backgroundColor: "#FF000025",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                          }
                          className="order-body-para1"
                        >
                          {each.progress}
                        </p>
                      </div>
                    ) : (
                      each.status === "Accepted" && (
                        <div
                          style={{ position: "relative" }}
                          key={`${each._id}${uuidV4()}`}
                          className="order-body-header2"
                        >
                          {/**all orders booked by the user sorted based on the date */}

                          <p
                            style={{
                              textTransform: "capitalize",
                              width: "14%",
                              paddingLeft: "5%",
                            }}
                            id={each._id}
                            className="order-body-para"
                          >
                            <MdLocalLaundryService
                              fontSize="1.1rem"
                              color="#6759ff"
                            />
                          </p>
                          <p id={each._id} className="order-body-para">
                            {each.date} - {each.time}
                          </p>
                          <p
                            id={each._id}
                            style={{ width: "20%" }}
                            className="order-body-para"
                          >
                            {each._id}
                          </p>
                          <p
                            id={each._id}
                            className="order-body-para"
                            style={{
                              textTransform: "capitalize",
                              width: "14%",
                            }}
                          >
                            {each.service}
                          </p>

                          {each.totalAmount > 1000 &&
                          each.totalAmount < 100000 ? (
                            <p className="order-body-para">
                              ₹ {parseInt(each.totalAmount) / 1000} K
                            </p>
                          ) : each.totalAmount > 100000 &&
                            each.totalAmount < 1000000 ? (
                            <p className="order-body-para">
                              ₹ {parseInt(each.totalAmount) / 100000} L
                            </p>
                          ) : each.totalAmount > 1000000 ? (
                            <p className="order-body-para">
                              ₹ {parseInt(each.totalAmount) / 1000000} M
                            </p>
                          ) : (
                            <p className="order-body-para">
                              ₹ {each.totalAmount}
                            </p>
                          )}

                          <select
                            userId={each.userId}
                            id={each._id}
                            className="order-body-select"
                            style={{ textTransform: "capitalize" }}
                          >
                            <option>{each.progress}</option>
                          </select>

                          <p
                            style={
                              each.progress === "Active"
                                ? {
                                    backgroundColor: "#FFA00025",
                                    color: "#FFA000",
                                    borderRadius: "10px",
                                    textTransform: "capitalize",
                                  }
                                : each.progress === "In Progress"
                                ? {
                                    color: "#6759FF",
                                    backgroundColor: "#6759FF25",
                                    borderRadius: "10px",
                                    textTransform: "capitalize",
                                  }
                                : each.progress === "Completed"
                                ? {
                                    color: "#519C66",
                                    backgroundColor: "#519C6625",
                                    borderRadius: "10px",
                                    textTransform: "capitalize",
                                  }
                                : each.progress === "cancel" && {
                                    color: "#FF0000",
                                    backgroundColor: "#FF000025",
                                    borderRadius: "10px",
                                    textTransform: "capitalize",
                                  }
                            }
                            className="order-body-para1"
                          >
                            {each.progress}
                          </p>
                        </div>
                      )
                    )
                  )
                : filterPresentOrders.length > 0 &&
                  filterPresentOrders.map((each) =>
                    each.status === "Rejected" ? (
                      <div
                        style={{
                          position: "relative",
                          backgroundColor: "#22222215",
                        }}
                        key={`${each._id}${uuidV4()}`}
                        className="order-body-header2"
                      >
                        {/**all orders booked by the user sorted based on the date */}

                        <p
                          style={{
                            textTransform: "capitalize",
                            width: "14%",
                            paddingLeft: "5%",
                          }}
                          id={each._id}
                          className="order-body-para"
                        >
                          <MdLocalLaundryService
                            fontSize="1.1rem"
                            color="#6759ff"
                          />
                        </p>
                        <p id={each._id} className="order-body-para">
                          {each.date} - {each.time}
                        </p>
                        <p
                          id={each._id}
                          style={{ width: "20%" }}
                          className="order-body-para"
                        >
                          {each._id}
                        </p>
                        <p
                          id={each._id}
                          className="order-body-para"
                          style={{ textTransform: "capitalize", width: "14%" }}
                        >
                          {each.service}
                        </p>

                        {each.totalAmount > 1000 &&
                        each.totalAmount < 100000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000} K
                          </p>
                        ) : each.totalAmount > 100000 &&
                          each.totalAmount < 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 100000} L
                          </p>
                        ) : each.totalAmount > 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000000} M
                          </p>
                        ) : (
                          <p className="order-body-para">
                            ₹ {each.totalAmount}
                          </p>
                        )}

                        <div
                          userId={each.userId}
                          id={each._id}
                          className="order-body-select"
                          style={{
                            textTransform: "capitalize",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "0",
                            color: "red",
                          }}
                        >
                          <p
                            style={{ width: "100%" }}
                            className="order-body-para1"
                          >
                            {each.status}
                          </p>
                        </div>
                        <p
                          style={{ color: "red" }}
                          className="order-body-para1"
                        >
                          {each.status}
                        </p>
                      </div>
                    ) : each.status === "Accepted" &&
                      each.driverName1 === "empty" ? (
                      <div
                        style={{ position: "relative" }}
                        key={`${each._id}${uuidV4()}`}
                        className="order-body-header2"
                      >
                        {/**all orders booked by the user sorted based on the date */}

                        <p
                          style={{
                            textTransform: "capitalize",
                            width: "14%",
                            paddingLeft: "5%",
                          }}
                          id={each._id}
                          className="order-body-para"
                        >
                          <MdLocalLaundryService
                            fontSize="1.1rem"
                            color="#6759ff"
                          />
                        </p>
                        <p id={each._id} className="order-body-para">
                          {each.date} - {each.time}
                        </p>
                        <p
                          id={each._id}
                          style={{ width: "20%" }}
                          className="order-body-para"
                        >
                          {each._id}
                        </p>
                        <p
                          id={each._id}
                          className="order-body-para"
                          style={{ textTransform: "capitalize", width: "14%" }}
                        >
                          {each.service}
                        </p>

                        {each.totalAmount > 1000 &&
                        each.totalAmount < 100000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000} K
                          </p>
                        ) : each.totalAmount > 100000 &&
                          each.totalAmount < 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 100000} L
                          </p>
                        ) : each.totalAmount > 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000000} M
                          </p>
                        ) : (
                          <p className="order-body-para">
                            ₹ {each.totalAmount}
                          </p>
                        )}

                        <select
                          userId={each.userId}
                          id={each._id}
                          className="order-body-select"
                          style={{ textTransform: "capitalize" }}
                        >
                          <option>{each.progress}</option>
                        </select>

                        <p
                          style={
                            each.progress === "Active"
                              ? {
                                  backgroundColor: "#FFA00025",
                                  color: "#FFA000",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                              : each.progress === "In Progress"
                              ? {
                                  color: "#6759FF",
                                  backgroundColor: "#6759FF25",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                              : each.progress === "Completed"
                              ? {
                                  color: "#519C66",
                                  backgroundColor: "#519C6625",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                              : each.progress === "cancel" && {
                                  color: "#FF0000",
                                  backgroundColor: "#FF000025",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                          }
                          className="order-body-para1"
                        >
                          {each.progress}
                        </p>
                      </div>
                    ) : each.status === "Accepted" &&
                      each.progress !== "cancel" ? (
                      <div
                        style={{ position: "relative" }}
                        key={`${each._id}${uuidV4()}`}
                        className="order-body-header2"
                      >
                        {/**all orders booked by the user sorted based on the date */}

                        <p
                          style={{
                            textTransform: "capitalize",
                            width: "14%",
                            paddingLeft: "5%",
                          }}
                          id={each._id}
                          onClick={filterCustomer}
                          className="order-body-para"
                        >
                          <MdLocalLaundryService
                            fontSize="1.1rem"
                            color="#6759ff"
                          />
                        </p>
                        <p
                          id={each._id}
                          onClick={filterCustomer}
                          className="order-body-para"
                        >
                          {each.date} - {each.time}
                        </p>
                        <p
                          id={each._id}
                          onClick={filterCustomer}
                          style={{ width: "20%" }}
                          className="order-body-para"
                        >
                          {each._id}
                        </p>
                        <p
                          id={each._id}
                          onClick={filterCustomer}
                          className="order-body-para"
                          style={{ textTransform: "capitalize", width: "14%" }}
                        >
                          {each.service}
                        </p>

                        {each.totalAmount > 1000 &&
                        each.totalAmount < 100000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000} K
                          </p>
                        ) : each.totalAmount > 100000 &&
                          each.totalAmount < 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 100000} L
                          </p>
                        ) : each.totalAmount > 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000000} M
                          </p>
                        ) : (
                          <p className="order-body-para">
                            ₹ {each.totalAmount}
                          </p>
                        )}

                        {each.progress === "Active" && (
                          <select
                            userId={each.userId}
                            id={each._id}
                            onChange={settingProgress}
                            className="order-body-select"
                            style={{ textTransform: "capitalize" }}
                          >
                            <option
                              style={{ textTransform: "capitalize" }}
                              selected={
                                each.progress === "Active" ? true : false
                              }
                            >
                              Active
                            </option>
                            <option
                              style={{ textTransform: "capitalize" }}
                              selected={
                                each.progress === "In Progress" ? true : false
                              }
                            >
                              In Progress
                            </option>
                            {/* <option
                          style={{ textTransform: "capitalize" }}
                          selected={each.progress === "cancle" ? true : false}
                        >
                          Cancel
                        </option> */}
                          </select>
                        )}

                        {each.progress === "In Progress" && (
                          <select
                            userId={each.userId}
                            id={each._id}
                            onChange={settingProgress}
                            className="order-body-select"
                            style={{ textTransform: "capitalize" }}
                          >
                            <option
                              style={{ textTransform: "capitalize" }}
                              selected={
                                each.progress === "In Progress" ? true : false
                              }
                            >
                              In Progress
                            </option>
                            <option
                              style={{ textTransform: "capitalize" }}
                              selected={
                                each.progress === "Completed" ? true : false
                              }
                            >
                              Completed
                            </option>
                          </select>
                        )}

                        {each.progress === "Completed" && (
                          <select
                            userId={each.userId}
                            id={each._id}
                            onChange={settingProgress}
                            className="order-body-select"
                            style={{ textTransform: "capitalize" }}
                          >
                            <option
                              style={{ textTransform: "capitalize" }}
                              selected={
                                each.progress === "Completed" ? true : false
                              }
                            >
                              Completed
                            </option>
                          </select>
                        )}

                        <p
                          style={
                            each.progress === "Active"
                              ? {
                                  backgroundColor: "#FFA00025",
                                  color: "#FFA000",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                              : each.progress === "In Progress"
                              ? {
                                  color: "#6759FF",
                                  backgroundColor: "#6759FF25",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                              : each.progress === "Completed"
                              ? {
                                  color: "#519C66",
                                  backgroundColor: "#519C6625",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                              : each.progress === "cancel" && {
                                  color: "#FF0000",
                                  backgroundColor: "#FF000025",
                                  borderRadius: "10px",
                                  textTransform: "capitalize",
                                }
                          }
                          className="order-body-para1"
                        >
                          {each.progress}
                        </p>
                      </div>
                    ) : each.status === "in-active" ? (
                      <div
                        style={{ position: "relative" }}
                        key={`${each._id}${uuidV4()}`}
                        className="order-body-header2"
                      >
                        {/**all orders booked by the user sorted based on the date */}

                        <p
                          style={{
                            textTransform: "capitalize",
                            width: "14%",
                            paddingLeft: "5%",
                          }}
                          id={each._id}
                          className="order-body-para"
                        >
                          <MdLocalLaundryService
                            fontSize="1.1rem"
                            color="#6759ff"
                          />
                        </p>
                        <p id={each._id} className="order-body-para">
                          {each.date} - {each.time}
                        </p>
                        <p
                          id={each._id}
                          style={{ width: "20%" }}
                          className="order-body-para"
                        >
                          {each._id}
                        </p>
                        <p
                          id={each._id}
                          className="order-body-para"
                          style={{
                            textTransform: "capitalize",
                            width: "14%",
                          }}
                        >
                          {each.service}
                        </p>

                        {each.totalAmount > 1000 &&
                        each.totalAmount < 100000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000} K
                          </p>
                        ) : each.totalAmount > 100000 &&
                          each.totalAmount < 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 100000} L
                          </p>
                        ) : each.totalAmount > 1000000 ? (
                          <p className="order-body-para">
                            ₹ {parseInt(each.totalAmount) / 1000000} M
                          </p>
                        ) : (
                          <p className="order-body-para">
                            ₹ {each.totalAmount}
                          </p>
                        )}

                        <button
                          id={each._id}
                          className="summary-view6"
                          onClick={acceptOrReject}
                          style={{
                            textTransform: "capitalize",
                            width: "8%!important",
                            backgroundColor: "green",
                            color: "white",
                          }}
                          type="button"
                          status="Accepted"
                        >
                          Accept
                        </button>

                        <button
                          id={each._id}
                          className="summary-view6"
                          onClick={acceptOrReject}
                          style={{
                            textTransform: "capitalize",
                            width: "8%!important",
                            backgroundColor: "red",
                            color: "white",
                          }}
                          type="button"
                          status="Rejected"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      each.status === "Accepted" && (
                        <div
                          style={{ position: "relative" }}
                          key={`${each._id}${uuidV4()}`}
                          className="order-body-header2"
                        >
                          {/**all orders booked by the user sorted based on the date */}

                          <p
                            style={{
                              textTransform: "capitalize",
                              width: "14%",
                              paddingLeft: "5%",
                            }}
                            id={each._id}
                            className="order-body-para"
                          >
                            <MdLocalLaundryService
                              fontSize="1.1rem"
                              color="#6759ff"
                            />
                          </p>
                          <p id={each._id} className="order-body-para">
                            {each.date} - {each.time}
                          </p>
                          <p
                            id={each._id}
                            style={{ width: "20%" }}
                            className="order-body-para"
                          >
                            {each._id}
                          </p>
                          <p
                            id={each._id}
                            className="order-body-para"
                            style={{
                              textTransform: "capitalize",
                              width: "14%",
                            }}
                          >
                            {each.service}
                          </p>

                          {each.totalAmount > 1000 &&
                          each.totalAmount < 100000 ? (
                            <p className="order-body-para">
                              ₹ {parseInt(each.totalAmount) / 1000} K
                            </p>
                          ) : each.totalAmount > 100000 &&
                            each.totalAmount < 1000000 ? (
                            <p className="order-body-para">
                              ₹ {parseInt(each.totalAmount) / 100000} L
                            </p>
                          ) : each.totalAmount > 1000000 ? (
                            <p className="order-body-para">
                              ₹ {parseInt(each.totalAmount) / 1000000} M
                            </p>
                          ) : (
                            <p className="order-body-para">
                              ₹ {each.totalAmount}
                            </p>
                          )}

                          <select
                            userId={each.userId}
                            id={each._id}
                            className="order-body-select"
                            style={{ textTransform: "capitalize" }}
                          >
                            <option>{each.progress}</option>
                          </select>

                          <p
                            style={
                              each.progress === "Active"
                                ? {
                                    backgroundColor: "#FFA00025",
                                    color: "#FFA000",
                                    borderRadius: "10px",
                                    textTransform: "capitalize",
                                  }
                                : each.progress === "In Progress"
                                ? {
                                    color: "#6759FF",
                                    backgroundColor: "#6759FF25",
                                    borderRadius: "10px",
                                    textTransform: "capitalize",
                                  }
                                : each.progress === "Completed"
                                ? {
                                    color: "#519C66",
                                    backgroundColor: "#519C6625",
                                    borderRadius: "10px",
                                    textTransform: "capitalize",
                                  }
                                : each.progress === "cancel" && {
                                    color: "#FF0000",
                                    backgroundColor: "#FF000025",
                                    borderRadius: "10px",
                                    textTransform: "capitalize",
                                  }
                            }
                            className="order-body-para1"
                          >
                            {each.progress}
                          </p>
                        </div>
                      )
                    )
                  )}
            </div>
          ) : (
            <div className="order-summary-body">
              <div className="order-body-header">
                <h6 style={{ margin: 0, fontSize: "1rem" }}>
                  Items
                  <span
                    style={{
                      color: "#6759FF",
                      fontWeight: "bold",
                      marginLeft: "8%",
                    }}
                  >
                    {items.length}
                  </span>
                </h6>
                <p style={{ textTransform: "capitalize", fontSize: "1rem" }}>
                  Type Of Wash :{"   "}
                  <span style={{ color: "#6759FF" }}>
                    {selectedCustomer[0].service}
                  </span>
                </p>
              </div>
              <div className="order-body-header1">
                <div className="order-body-para">Image</div>
                <p className="order-body-para">Item Type</p>
                <p className="order-body-para">Category</p>
                <p className="order-body-para">Unit Price</p>
                <p className="order-body-para">Quantity</p>
                <p className="order-body-para">Item Total</p>
              </div>
              {items.map((each) => (
                <div
                  key={`${each._id}${uuidV4()}`}
                  className="order-body-header2"
                >
                  <div className="order-body-para">
                    <img
                      style={{ height: "100%", width: "16%" }}
                      src={each.image}
                      alt={each.productName}
                    />
                  </div>

                  <p
                    style={{ textTransform: "capitalize" }}
                    className="order-body-para"
                  >
                    {each.itemName}
                  </p>
                  <p
                    style={{ textTransform: "capitalize" }}
                    className="order-body-para"
                  >
                    {each.itemCategory}
                  </p>
                  {each.price > 1000 && each.price < 100000 ? (
                    <p className="order-body-para">
                      ₹ {parseInt(each.price) / 1000} K
                    </p>
                  ) : each.price > 100000 && each.price < 1000000 ? (
                    <p className="order-body-para">
                      ₹ {parseInt(each.price) / 100000} L
                    </p>
                  ) : each.price > 1000000 ? (
                    <p className="order-body-para">
                      ₹ {parseInt(each.price) / 1000000} M
                    </p>
                  ) : (
                    <p className="order-body-para">₹ {each.price}</p>
                  )}

                  <p className="order-body-para">{each.count}</p>
                  {each.price * each.count > 1000 &&
                  each.price * each.count < 100000 ? (
                    <p className="order-body-para">
                      ₹ {parseInt(each.price * each.count) / 1000} K
                    </p>
                  ) : each.price * each.count > 100000 &&
                    each.price * each.count < 1000000 ? (
                    <p className="order-body-para">
                      ₹ {parseInt(each.price * each.count) / 100000} L
                    </p>
                  ) : each.price * each.count > 1000000 ? (
                    <p className="order-body-para">
                      ₹ {parseInt(each.price * each.count) / 1000000} M
                    </p>
                  ) : (
                    <p className="order-body-para">
                      ₹ {each.price * each.count}
                    </p>
                  )}
                </div>
              ))}
              <div className="order-body-header">
                {selectedCustomer[0].totalAmount > 1000 &&
                selectedCustomer[0].totalAmount < 100000 ? (
                  <h6 style={{ marginLeft: "82%" }}>
                    Total : ₹ {parseInt(selectedCustomer[0].totalAmount) / 1000}{" "}
                    K
                  </h6>
                ) : selectedCustomer[0].totalAmount > 100000 &&
                  selectedCustomer[0].totalAmount < 1000000 ? (
                  <h6 style={{ marginLeft: "82%" }}>
                    Total : ₹{" "}
                    {parseInt(selectedCustomer[0].totalAmount) / 100000} L
                  </h6>
                ) : selectedCustomer[0].totalAmount > 1000000 ? (
                  <h6 style={{ marginLeft: "82%" }}>
                    Total : ₹{" "}
                    {parseInt(selectedCustomer[0].totalAmount) / 1000000} M
                  </h6>
                ) : (
                  <h6 style={{ marginLeft: "82%" }}>
                    Total : ₹ {selectedCustomer[0].totalAmount}
                  </h6>
                )}
              </div>
            </div>
          )}
        </section>
      )}
    </>
  ) : mainLoad ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#F6FAFC",
      }}
      className="order-body"
    >
      <TailSpin color={"#6759ff"} height={50} width={50} />
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#F6FAFC",
      }}
      className="order-body"
    >
      <img style={{ width: "20rem" }} src="no-orders.gif" alt="No Orders" />
      <h3>You have No Orders Assigned Yet</h3>
    </div>
  );
};
export default VOrders;
