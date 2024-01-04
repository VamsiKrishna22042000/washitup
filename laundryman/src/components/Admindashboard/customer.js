import "./admin.css";

import { useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";

/**Modal Box for Adding Customer */
const AddCustomerModel = (props) => {
  /** */
  const { setAddCustomer, getAllCustomers } = props;

  /**State which stores the user name entered */
  const [newUser, setNewUser] = useState("");

  /**State which stores the mobile number entered*/
  const [val, setValue] = useState();
  const [load, setLoad] = useState(false);

  /**Function to make api call to add a new user*/
  const addUser = async () => {
    if (newUser === "") {
      toast.error("Please Enter Customer Name", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else if (val === "") {
      toast.error("Please Enter Customer Number", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else if (val.length < 13 || val.length > 13) {
      toast.error("Mobile number should be of 10 digits", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else {
      try {
        setLoad(true);
        const url = `${
          process.env.REACT_APP_ROOT_URL
        }/api/admin/createNewUser${Cookies.get("jwt_adminId")}`;

        const reqConfigure = {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt_adminLogin")}`,
          },

          body: JSON.stringify({ name: newUser, mobileNumber: val }),
        };

        const res = await fetch(url, reqConfigure);

        if (res.ok) {
          toast.success("Added", {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
          setTimeout(() => {
            setLoad(false);
            setAddCustomer(false);
            getAllCustomers();
          }, 1000);
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

  return !load ? (
    <>
      <ToastContainer />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#53545c99",
          zIndex: 2,
        }}
      ></div>
      <div style={{ left: "40%" }} className="add-customer-modal">
        <h6 style={{ fontSize: "1rem", marginBottom: "1%" }}>
          Add a New Customer
        </h6>
        {/**Button to close the modal box by setting false to setAddCustomer() */}
        <button
          type="button"
          onClick={() => {
            setAddCustomer(false);
          }}
          style={{
            position: "absolute",
            top: "5%",
            right: "5%",
            color: "#5570F1",
            fontWeight: "bold",
            borderWidth: 0,
            backgroundColor: "transparent",
          }}
        >
          ✕
        </button>
        <p className="add-customer-titles">Customer Name</p>
        {/**Input to take new customer number*/}
        <input
          onChange={(e) => {
            setNewUser(e.target.value);
          }}
          className="add-customer-input-box"
          type="text"
          placeholder="Enter Customer Name"
        />
        <p className="add-customer-titles">Customer Mobile number</p>
        {/**In put to take phone number*/}
        <PhoneInput
          className="add-customer-input-box"
          placeholder="Enter Phone number"
          defaultCountry="IN"
          value={val}
          onChange={setValue}
          limitMaxLength
          error={
            val
              ? isValidPhoneNumber(val)
                ? undefined
                : "Invalid phone number"
              : "Phone number required"
          }
        />
        {/**Button call's add user function to make an api call and add a new customer*/}
        <button onClick={addUser} className="add-cutomer-button" type="button">
          Add
        </button>
      </div>
    </>
  ) : (
    <>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#53545c99",
          zIndex: 2,
        }}
      ></div>
      <div
        style={{
          left: "40%",
          height: "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="add-customer-modal-box"
      >
        <TailSpin color="#6759ff" height={50} width={50} />
      </div>
    </>
  );
};

/**Customer component only show's the customer who made atleast one order*/
const Customers = () => {
  /**showAddCustomer state used to show modal box to add customer */
  const [showAddCustomer, setAddCustomer] = useState(false);

  /**selectedCustomer state to show allorders made by a particual customer*/
  const [selectedCustomer, setSelectedCustomer] = useState("");

  /**allcustomers state used to store all the customers along with each individual order details*/
  const [allCustomers, setAllCustomers] = useState([]);

  const [selectedOrders, setSelectedOrders] = useState([]);

  /**state used to search a particular customer out of all the customers*/
  const [searchedCustomer, setSearchedCustomer] = useState("");

  const [userId, setUserId] = useState("");

  const [total, setTotal] = useState("");

  const [loadingSpinner, setLoadingSpinner] = useState(false);

  /**Making api call before mounting to show all the customers*/
  useEffect(() => {
    getAllCustomers();
  }, []);

  /**Function which makes an api call to get all the orders and convertes the ordes as an array of customer objects and each customer object has array of order objects which were orders by the user*/
  const getAllCustomers = async () => {
    try {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllOrders`;

      const adminToken = Cookies.get("jwt_adminLogin");

      const reqConfigure = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      };

      const response = await fetch(url, reqConfigure);
      const data = await response.json();

      {
        /**if condition used to convert the obtained data to array of customer object where each customer object has their array of orderobjects*/
      }
      if (response.ok) {
        const userArray = [];
        const userIdArray = [];

        {
          /**Loop which filters the customers and their id's and pushes the objects to userArray and id's(type-number) to userIdArray*/
        }
        for (let each of data) {
          if (userArray.length > 0) {
            if (!userIdArray.includes(each.userId._id)) {
              userIdArray.push(each.userId._id);
              userArray.push({
                name: each.userId.name,
                mobileNumber: each.userId.mobileNumber,
                address: each.address,
                location: each.location,
                _id: each.userId._id,
                orders: [],
              });
            }
          } else {
            userIdArray.push(each.userId._id);
            userArray.push({
              name: each.userId.name,
              mobileNumber: each.userId.mobileNumber,
              address: each.address,
              location: each.location,
              _id: each.userId._id,
              orders: [],
            });
          }
        }

        {
          /**for loop to push the orders as a object into the field named orders(which is an array) present inthe each customerobject in the userArray */
        }
        for (let e2 of userArray) {
          for (let each2 of data) {
            if (e2._id === each2.userId._id) {
              e2.orders.push(each2);
            }
          }
        }

        setAllCustomers(userArray);
        setLoadingSpinner(true);
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
  };

  {
    /**Function which filtes the particular customer to show thier orders (basically to navigate form the customers section mainpage to subsection) */
  }
  const filterCustomer = (e) => {
    let totalOrdersAmount = 0;
    const selectedCustomerOrder = allCustomers.filter(
      (each) => each._id === e.target.id
    );
    setSelectedCustomer(selectedCustomerOrder);
    selectedCustomerOrder[0].orders.map((each) => {
      each.progress === "Completed" &&
        (totalOrdersAmount = totalOrdersAmount + each.totalAmount);
    });

    console.log(totalOrdersAmount);

    if (
      parseInt(totalOrdersAmount) > 1000 &&
      parseInt(totalOrdersAmount) < 100000
    ) {
      setTotal(`${parseInt(totalOrdersAmount) / 1000} K`);
    } else if (
      parseInt(totalOrdersAmount) > 100000 &&
      parseInt(totalOrdersAmount) < 1000000
    ) {
      setTotal(`${parseInt(totalOrdersAmount) / 100000} L`);
    } else if (parseInt(totalOrdersAmount) > 1000000) {
      setTotal(`${parseInt(totalOrdersAmount) / 1000000} M`);
    } else {
      setTotal(totalOrdersAmount);
    }

    setUserId(selectedCustomerOrder[0]._id);
    console.log(selectedCustomerOrder);
    setSelectedOrders(selectedCustomerOrder[0].orders);
  };

  /**Same as filter Customer but is used to rerender the subsection while changing the action of an order*/
  const filterCustomer2 = async (id) => {
    try {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllOrders`;

      const adminToken = Cookies.get("jwt_adminLogin");

      const reqConfigure = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      };

      const response = await fetch(url, reqConfigure);
      const data = await response.json();

      if (response.ok) {
        const userArray = [];
        const userIdArray = [];

        for (let each of data) {
          if (userArray.length > 0) {
            if (!userIdArray.includes(each.userId._id)) {
              userIdArray.push(each.userId._id);
              userArray.push({
                name: each.userId.name,
                mobileNumber: each.userId.mobileNumber,
                address: each.address,
                location: each.location,
                _id: each.userId._id,
                orders: [],
              });
            }
          } else {
            userIdArray.push(each.userId._id);
            userArray.push({
              name: each.userId.name,
              mobileNumber: each.userId.mobileNumber,
              address: each.address,
              location: each.location,
              _id: each.userId._id,
              orders: [],
            });
          }
        }

        for (let e2 of userArray) {
          for (let each2 of data) {
            if (e2._id === each2.userId._id) {
              e2.orders.push(each2);
            }
          }
        }

        let totalOrdersAmount = 0;
        const selectedCustomerOrder = userArray.filter(
          (each) => each._id === id
        );
        setSelectedCustomer(selectedCustomerOrder);
        selectedCustomerOrder[0].orders.map(
          (each) =>
            each.progress === "Completed" &&
            (totalOrdersAmount = totalOrdersAmount + each.totalAmount)
        );
        setUserId(selectedCustomerOrder[0]._id);
        if (
          parseInt(totalOrdersAmount) > 1000 &&
          parseInt(totalOrdersAmount) < 100000
        ) {
          setTotal(`${parseInt(totalOrdersAmount) / 1000} K`);
        } else if (
          parseInt(totalOrdersAmount) > 100000 &&
          parseInt(totalOrdersAmount) < 1000000
        ) {
          setTotal(`${parseInt(totalOrdersAmount) / 100000} L`);
        } else if (parseInt(totalOrdersAmount) > 1000000) {
          setTotal(`${parseInt(totalOrdersAmount) / 1000000} M`);
        } else {
          setTotal(totalOrdersAmount);
        }
        console.log(selectedCustomerOrder);
        setSelectedOrders(selectedCustomerOrder[0].orders);
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
  };

  /**Funtion to search the customers*/
  const filterdAllCustomer = allCustomers.filter((each) =>
    each.name.toLowerCase().startsWith(searchedCustomer.toLowerCase())
  );

  /**Function to change the action a order(only one order at a time) */
  const settingProgress = async (e) => {
    try {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/progressActive`;

      let orderId = e.target.id;
      let progress = e.target.value;

      const reqConfigure = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ userId, orderId, progress }),
      };

      const response = await fetch(url, reqConfigure);

      if (response.ok) {
        setAllCustomers([]);
        setSelectedCustomer([]);
        setSelectedOrders([]);
        getAllCustomers();
        setTimeout(() => {
          filterCustomer2(userId);
        }, 1000);
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
  };

  return (
    <>
      {/**Terinary operater to show the addcustomer modal box*/}
      {showAddCustomer && (
        <AddCustomerModel
          setAddCustomer={setAddCustomer}
          getAllCustomers={getAllCustomers}
        />
      )}
      {/**Ternary operator to switch between main and subsection*/}
      {selectedCustomer === "" ? (
        allCustomers.length > 0 ? (
          <section className="order-body">
            <div className="order-summary-head">
              <h6 style={{ color: "#53545c" }}>Customers Summary</h6>
              {/* <button
                onClick={() => {
                  setAddCustomer(!showAddCustomer);
                }}
                className="assign-vendor"
                type="button"
              >
                <AiOutlinePlus />
                Add a New Customer
              </button> */}
            </div>
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
                  <img
                    style={{ height: "70%", width: "70%" }}
                    src="/profile2.png"
                    alt="Profile"
                  />
                </div>
                <p
                  style={{
                    position: "absolute",
                    bottom: "40%",
                    left: "5%",
                    color: "#8B8D97",
                    fontSize: "0.85vw",
                  }}
                >
                  Total Customers With Atleast One Order
                </p>
                <p
                  style={{
                    position: "absolute",
                    bottom: "25%",
                    left: "5%",
                    color: "#6759FF",
                    fontSize: "1.2vw",
                    fontWeight: "bold",
                  }}
                >
                  {allCustomers.length}
                </p>
              </div>
            </div>
            <div className="order-summary-body">
              <div className="order-body-header">
                <h6 style={{ margin: 0 }}>Customers With Atleast One Order</h6>
                <input
                  onChange={(e) => {
                    setSearchedCustomer(e.target.value);
                  }}
                  style={{ outline: "none", fontSize: "1vw" }}
                  type="search"
                  placeholder="Search Customer"
                />
              </div>
              <div className="order-body-header1">
                <div className="order-body-para"></div>
                <p className="order-body-para">Customer Name</p>
                <p className="order-body-para">Mobile Number</p>
                <p className="order-body-para">Address</p>
                <p className="order-body-para">Location</p>
              </div>
              {filterdAllCustomer.length > 0 ? (
                filterdAllCustomer.map((each) =>
                  each.orders.length > 0 ? (
                    <div key={each._id} className="order-body-header2">
                      <div
                        id={each._id}
                        onClick={filterCustomer}
                        style={{ position: "relative" }}
                        className="order-body-para"
                      >
                        <img
                          id={each._id}
                          onClick={filterCustomer}
                          style={{
                            height: "100%",
                            width: "15%",
                            position: "relative",
                            left: "35%",
                          }}
                          src="/profile2.png"
                          alt={each.name}
                        />
                      </div>
                      <p
                        id={each._id}
                        onClick={filterCustomer}
                        className="order-body-para"
                        style={{ textTransform: "capitalize" }}
                      >
                        {each.name}
                      </p>
                      <p
                        id={each._id}
                        onClick={filterCustomer}
                        className="order-body-para"
                      >
                        {each.mobileNumber}
                      </p>
                      <p
                        id={each._id}
                        onClick={filterCustomer}
                        className="order-body-para"
                        style={{ textTransform: "capitalize" }}
                      >
                        {each.orders[each.orders.length - 1].address.dono} -
                        {each.orders[each.orders.length - 1].address.landmark}
                      </p>
                      <p
                        id={each._id}
                        onClick={filterCustomer}
                        className="order-body-para"
                        style={{ textTransform: "capitalize" }}
                      >
                        {each.orders[each.orders.length - 1].location}
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{ backgroundColor: "#80808030" }}
                      key={each._id}
                      className="order-body-header2"
                    >
                      <div
                        id={each._id}
                        style={{ position: "relative" }}
                        className="order-body-para"
                      >
                        <img
                          id={each._id}
                          style={{
                            height: "100%",
                            width: "15%",
                            position: "absolute",
                            left: "35%",
                          }}
                          src="/profile2.png"
                          alt={each.name}
                        />
                      </div>
                      <p
                        id={each._id}
                        className="order-body-para"
                        style={{ textTransform: "capitalize" }}
                      >
                        {each.name}
                      </p>
                      <p id={each._id} className="order-body-para">
                        {each.mobileNumber}
                      </p>
                      <p
                        id={each._id}
                        className="order-body-para"
                        style={{ textTransform: "capitalize" }}
                      ></p>
                      <p
                        id={each._id}
                        className="order-body-para"
                        style={{ textTransform: "capitalize" }}
                      >
                        No Orders Yet
                      </p>
                    </div>
                  )
                )
              ) : (
                <div className="order-body-header4">
                  <img src="/noresult.png" className="noresult" />
                  <h1>No Such Customer</h1>
                </div>
              )}
            </div>
          </section>
        ) : loadingSpinner ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F8F9FC",
            }}
            className="order-body"
          >
            <img src="/no-orders.gif" width={250} />
            <h2>No Customers</h2>
          </div>
        ) : (
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
        )
      ) : selectedOrders.length > 0 ? (
        <section className="order-body">
          <div className="order-summary-head">
            <h6 style={{ color: "#53545c", textTransform: "capitalize" }}>
              {selectedCustomer[0].name} Order Details
            </h6>
            <button
              onClick={() => {
                setSelectedCustomer("");
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
                  borderRadius: "10px",
                }}
              >
                <img
                  style={{ height: "70%", width: "70%" }}
                  src="/profile2.png"
                  alt="Profile"
                />
              </div>
              <p
                style={{
                  position: "absolute",
                  top: "10%",
                  left: "18%",
                  color: "#8B8D97",
                  textTransform: "capitalize",
                }}
              >
                {selectedCustomer[0].name}
              </p>
              <p
                style={{
                  position: "absolute",
                  bottom: "50%",
                  left: "5%",
                  color: "#8B8D97",
                  fontSize: "0.85vw",
                }}
              >
                Mobile Number
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
                {selectedCustomer[0].mobileNumber}
              </p>
            </div>
            <div
              style={{ position: "relative", overflow: "hidden" }}
              className="summary-view"
            >
              <div
                style={{
                  height: "25%",
                  width: "12%",
                  backgroundColor: "#FFCC9169",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                }}
              >
                <img
                  style={{ height: "70%", width: "70%" }}
                  src="/location2.png"
                  alt="Profile"
                />
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
                Address
              </p>
              <p
                style={{
                  position: "absolute",
                  top: "55%",
                  left: "5%",
                  color: "#45464E",
                  fontSize: "0.9vw",
                  width: "90%",
                  textTransform: "capitalize",
                }}
              >
                {
                  selectedCustomer[0].orders[
                    selectedCustomer[0].orders.length - 1
                  ].address.dono
                }
                -
                {
                  selectedCustomer[0].orders[
                    selectedCustomer[0].orders.length - 1
                  ].address.landmark
                }
              </p>
            </div>
            <div style={{ position: "relative" }} className="summary-view">
              <div
                style={{
                  height: "25%",
                  width: "12%",
                  backgroundColor: "#6759FF40",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "8px",
                }}
              >
                <img
                  style={{
                    height: "70%",
                    width: "70%",
                  }}
                  src="/totalorders.png"
                  alt="Profile"
                />
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
                All Orders
              </p>
              <p
                style={{
                  position: "absolute",
                  bottom: "35%",
                  left: "5%",
                  color: "#6759FF",
                  fontSize: "1.1vw",
                }}
              >
                {selectedCustomer[0].orders.length}
              </p>
              <p
                style={{
                  position: "absolute",
                  bottom: "50%",
                  right: "5%",
                  color: "#8B8D97",
                  fontSize: "0.85vw",
                }}
              >
                Total Amount
              </p>
              <p
                style={{
                  position: "absolute",
                  bottom: "35%",
                  right: "5%",
                  color: "#6759FF",
                  fontSize: "1.1vw",
                }}
              >
                ₹ {total}
              </p>
            </div>
          </div>
          <div className="order-summary-body">
            <div className="order-body-header">
              <h6 style={{ margin: 0, textTransform: "capitalize" }}>
                {selectedCustomer[0].name} Order's
              </h6>
            </div>
            <div className="order-body-header1">
              <p style={{ width: "14%" }} className="order-body-para">
                Customer Name
              </p>
              <p className="order-body-para">Order Date</p>
              <p style={{ width: "20%" }} className="order-body-para">
                Order Id
              </p>
              <p style={{ width: "14%" }} className="order-body-para">
                Type Of Washing
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
            {selectedOrders.map((each) => (
              <div className="order-body-header2">
                <p
                  style={{ textTransform: "capitalize", width: "14%" }}
                  className="order-body-para"
                >
                  {selectedCustomer[0].name}
                </p>
                <p className="order-body-para">
                  {each.date} - {each.time}
                </p>
                <p style={{ width: "20%" }} className="order-body-para">
                  {each._id}
                </p>
                <p
                  style={{ textTransform: "capitalize", width: "14%" }}
                  className="order-body-para"
                >
                  {each.service}
                </p>
                {each.totalAmount > 1000 && each.totalAmount < 100000 ? (
                  <p className="order-body-para">
                    ₹ {parseInt(each.totalAmount) / 1000} K
                  </p>
                ) : each.totalAmount > 100000 && each.totalAmount < 1000000 ? (
                  <p className="order-body-para">
                    ₹ {parseInt(each.totalAmount) / 100000} L
                  </p>
                ) : each.totalAmount > 1000000 ? (
                  <p className="order-body-para">
                    ₹ {parseInt(each.totalAmount) / 1000000} M
                  </p>
                ) : (
                  <p className="order-body-para">₹ {each.totalAmount}</p>
                )}
                <select
                  id={each._id}
                  style={{ textTransform: "capitalize" }}
                  onChange={settingProgress}
                  className="order-body-select"
                >
                  {each.action.map((e) => (
                    <option selected={each.progress === e ? true : false}>
                      {e}
                    </option>
                  ))}
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
                          backgroundColor: "#FF000025",
                          color: "#FF0000",
                          borderRadius: "10px",
                          textTransform: "capitalize",
                        }
                  }
                  className="order-body-para1"
                >
                  {each.progress}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : (
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
      )}
    </>
  );
};

export default Customers;
