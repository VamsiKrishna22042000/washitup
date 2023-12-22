import "./admin.css";

import Cookies from "js-cookie";

import { AiOutlinePlus } from "react-icons/ai";

import { v4 as uuidV4 } from "uuid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { FaCalendarAlt } from "react-icons/fa";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const Driver = () => {
  /**State to show the addVendor Modal Box*/
  const [showAddVendor, setAddVendor] = useState(false);
  /**State to store the available vendors*/
  const [vendors, setVendors] = useState([]);

  /**State which get's updated by search vendor search box to filter vendor based on thier name*/
  const [searchedVendor, setSearchedVendor] = useState("");

  const [load, setLoad] = useState(true);

  /**state to store total cost of orders assigned to a particual vendor */
  const [total, setTotal] = useState(0);

  /**state to navigate from mainsection of vendor to subsection of vendor to show all the orders assigned to the vendor */
  const [showVendorOrders, setVendorOrders] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  /**state to store all the orders assigned to a particular vendor */
  const [subOrders, setSubOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedData] = useState({ date: "", id: "" });

  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    getAllDrivers();
  }, []);

  /**Function to get all the vendor and set vendor to allVendors state */
  const getAllDrivers = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllDrivers`;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("jwt_adminLogin")}`,
    };

    const response = await fetch(url, { headers });

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      setVendors(data.data);
      setLoad(false);
    }
  };

  /**Modal Box to add vendor */
  const AddCustomerModel = () => {
    /**State which stores the user name entered */
    const [newUser, setNewUser] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    /**State which stores the mobile number entered*/
    const [value, setValue] = useState();
    const [load, setLoad] = useState(false);

    /**Function to make api call to add a new user*/
    const addUser = async () => {
      if (newUser === "") {
        toast.error("Please Enter Driver Name", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (value === "") {
        toast.error("Please Enter Driver Number", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (email === "") {
        toast.error("Please Enter Driver Email", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (!email.endsWith("@gmail.com")) {
        toast.error("Please Enter Valid Email", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (address === "") {
        toast.error("Please Enter Address", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else {
        setLoad(true);
        const url = `${
          process.env.REACT_APP_ROOT_URL
        }/api/admin/addDriver/${Cookies.get("jwt_adminId")}`;

        const reqConfigure = {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt_adminLogin")}`,
          },

          body: JSON.stringify({
            name: newUser,
            mobileNumber: value.substring(3),
            email: email,
            address: address,
          }),
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
            setAddVendor(false);
            getAllDrivers();
          }, 1000);
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
        <div style={{ left: "40%" }} className="add-driver-modal">
          <h6 style={{ fontSize: "1rem", marginBottom: "1%" }}>
            Add a New Driver
          </h6>
          {/**Button to close the modal box by setting false to setAddCustomer() */}
          <button
            type="button"
            onClick={() => {
              setAddVendor(false);
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
          <p className="add-customer-titles">Driver Name</p>
          {/**Input to take new customer number*/}
          <input
            onChange={(e) => {
              setNewUser(e.target.value);
            }}
            className="add-customer-input-box"
            type="text"
            placeholder="Enter Driver Name"
          />
          <p className="add-customer-titles">Driver Mobile number</p>
          {/**In put to take phone number*/}
          <PhoneInput
            className="add-customer-input-box"
            placeholder="Enter Phone number"
            defaultCountry="IN"
            value={value}
            onChange={setValue}
          />
          <p className="add-customer-titles">Driver Email</p>
          <input
            type="email"
            className="add-customer-input-box"
            placeholder="Enter Driver Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <p className="add-customer-titles">Driver Address</p>
          <textarea
            type="email"
            className="add-driver-input-box"
            placeholder="Enter Driver Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></textarea>
          {/**Button call's add user function to make an api call and add a new customer*/}
          <button
            onClick={addUser}
            className="add-cutomer-button"
            type="button"
          >
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

  /**function which update's the search vendor*/
  const filteredVendors = vendors.filter((each) =>
    each.name.toLowerCase().startsWith(searchedVendor.toLowerCase())
  );

  /**Function to which helps to navigate to a particular vendor details(from main-section to subsection of a vendor) */
  const filterVendorOrders = (e) => {
    const filterdOrder = vendors.filter((each) => each._id === e.target.id);

    const sub = filterdOrder[0].orders.map((each) => ({
      userId: each.order.userId,
      orderId: each.order._id,
      date: each.order.date,
      time: each.order.time,
      totalAmount: each.order.totalAmount,
      action: each.order.action,
      status: each.order.progress,
      acceptorreject: each.status,
    }));

    let totalOrdersAmount = 0;

    sub.map(
      (each) =>
        each.status === "Completed" &&
        (totalOrdersAmount = totalOrdersAmount + each.totalAmount)
    );

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
      setTotal(parseInt(totalOrdersAmount));
    }

    console.log(filterdOrder);

    setSubOrders(sub);

    setVendorOrders(filterdOrder);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleVendorDetails = (id) => {
    setSelectedVendorId(id);
    setShowModal(true);
  };

  const suborderFiltered = subOrders.filter((each) =>
    selectedDate.date === ""
      ? each
      : String(each.date) === String(selectedDate.date) && each
  );

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

          let d = dateArr.includes(dd) ? dd[1] : dd;

          let m = dateArr.includes(mm) ? mm[1] : mm;

          // Combine them in the desired format
          const formattedDate = `${d}-${m}-${yyyy}`;
          setSelectedData({ date: formattedDate, id: "" });
          setShowDate(false);
        }}
        value={date}
      />
    );
  };

  return !load ? (
    <>
      {/**Terinary operator to show addvedor modal box or not */}
      {showAddVendor && <AddCustomerModel setAddVendor={setAddVendor} />}
      {/**Terinary operator to navigate between the main and subsection*/}
      {showVendorOrders.length > 0 ? (
        subOrders !== "" ? (
          <section className="order-body">
            <div className="order-summary-head">
              <h6 style={{ color: "#53545c", textTransform: "capitalize" }}>
                {showVendorOrders[0].name} Order Details
              </h6>
              <button
                onClick={() => {
                  setVendorOrders([]);
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
              <div
                style={{ position: "relative", cursor: "pointer" }}
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
                  {showVendorOrders[0].name}
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
                  {showVendorOrders[0].mobileNumber}
                </p>
                <p
                  style={{
                    position: "absolute",
                    bottom: "23%",
                    left: "5%",
                    color: "#8B8D97",
                    fontSize: "0.85vw",
                  }}
                >
                  Email
                </p>
                <p
                  style={{
                    position: "absolute",
                    bottom: "10%",
                    left: "5%",
                    color: "#45464E",
                    fontSize: "1.1vw",
                    textTransform: "capitalize",
                  }}
                >
                  {showVendorOrders[0].email}
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
                  {showVendorOrders[0].address}
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
                  {showVendorOrders[0].orders.length}
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
            {showDate && <Caland />}
            <div className="order-summary-body">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <button
                    onClick={(e) => {
                      setSelectedData({ date: "", id: "" });
                      const today = new Date();
                      const dd = String(today.getDate()).padStart(2, "0");
                      const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
                      const yyyy = today.getFullYear();

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
              </div>
              <div className="order-body-header1">
                <p className="order-body-para">Order Id</p>
                <p
                  style={{ width: "20%", paddingLeft: "4%" }}
                  className="order-body-para"
                >
                  Order Date
                </p>
                <p className="order-body-para">Order Total</p>
                <p
                  style={{ backgroundColor: "white", marginRight: "4%" }}
                  className="order-body-para1"
                >
                  Status
                </p>
                <p
                  style={{ backgroundColor: "white" }}
                  className="order-body-para"
                >
                  Accept / Reject
                </p>
              </div>
              {suborderFiltered.map((each) => (
                <div
                  key={`${each.orderId}${uuidV4()}`}
                  className="order-body-header2"
                >
                  {/**all orders booked by the user sorted based on the date */}

                  <p
                    userId={each.userId}
                    id={each.orderId}
                    style={{ width: "20%" }}
                    className="order-body-para"
                  >
                    {each.orderId}
                  </p>
                  <p
                    userId={each.userId}
                    id={each.orderId}
                    className="order-body-para"
                  >
                    {each.date} - {each.time}
                  </p>
                  {each.totalAmount > 1000 && each.totalAmount < 100000 ? (
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
                    <p className="order-body-para">₹ {each.totalAmount}</p>
                  )}
                  <p
                    style={
                      each.status === "Active"
                        ? {
                            backgroundColor: "#FFA00025",
                            color: "#FFA000",
                            borderRadius: "10px",
                            textTransform: "capitalize",
                            marginRight: "5%",
                          }
                        : each.status === "In Progress"
                        ? {
                            color: "#6759FF",
                            backgroundColor: "#6759FF25",
                            borderRadius: "10px",
                            textTransform: "capitalize",
                            marginRight: "5%",
                          }
                        : each.status === "Completed"
                        ? {
                            color: "#519C66",
                            backgroundColor: "#519C6625",
                            borderRadius: "10px",
                            textTransform: "capitalize",
                            marginRight: "5%",
                          }
                        : each.status === "cancel" && {
                            color: "#FF0000",
                            backgroundColor: "#FF000025",
                            borderRadius: "10px",
                            textTransform: "capitalize",
                            marginRight: "5%",
                          }
                    }
                    className="order-body-para1"
                  >
                    {each.status}
                  </p>
                  <p
                    style={{
                      backgroundColor: "white",
                      textTransform: "capitalize",
                      color:
                        each.acceptorreject !== "Rejected" ? "green" : "red",
                      width: "auto",
                    }}
                    className="order-body-para1"
                  >
                    {each.acceptorreject}
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
        )
      ) : (
        <section className="order-body">
          <div className="order-summary-head">
            <h6 style={{ color: "#53545c" }}>Driver Summary</h6>
            <button
              onClick={() => {
                setAddVendor(true);
              }}
              className="assign-vendor"
              type="button"
            >
              <AiOutlinePlus />
              Add a New Driver
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
                  borderRadius: "8px",
                }}
              >
                <img
                  style={{ height: "70%", width: "70%" }}
                  src="./driver2.png"
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
                Total Drivers
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
                {vendors.length}
              </p>
            </div>
          </div>
          <div className="order-summary-body">
            <div className="order-body-header">
              <h6 style={{ margin: 0 }}>Drivers</h6>
              <input
                onChange={(e) => {
                  setSearchedVendor(e.target.value);
                }}
                style={{ outline: "none", fontSize: "1vw" }}
                type="search"
                placeholder="Search Drivers"
              />
            </div>
            <div className="order-body-header1">
              <div className="order-body-para"></div>
              <p className="order-body-para">Driver Name</p>
              <p className="order-body-para">Mobile Number</p>
              <p className="order-body-para">Email</p>
              <p className="order-body-para">Address</p>
            </div>
            {filteredVendors.length > 0 ? (
              filteredVendors.map((each) => (
                <div
                  key={`${each.orderId}${uuidV4()}`}
                  className="order-body-header2"
                >
                  <div
                    onClick={filterVendorOrders}
                    id={each._id}
                    style={{ position: "relative" }}
                    className="order-body-para"
                  >
                    <img
                      style={{ height: "100%", width: "20%" }}
                      src="/driver2.png"
                      alt="Profile"
                    />
                  </div>
                  <p
                    onClick={filterVendorOrders}
                    id={each._id}
                    className="order-body-para"
                    style={{ textTransform: "capitalize" }}
                  >
                    {each.name}
                  </p>
                  <p
                    onClick={filterVendorOrders}
                    id={each._id}
                    className="order-body-para"
                  >
                    {each.mobileNumber}
                  </p>
                  <p
                    onClick={filterVendorOrders}
                    id={each._id}
                    className="order-body-para"
                  >
                    {each.email}
                  </p>
                  <p
                    onClick={filterVendorOrders}
                    id={each._id}
                    className="order-body-para"
                    style={{ textTransform: "capitalize" }}
                  >
                    {each.address}
                  </p>
                </div>
              ))
            ) : (
              <div className="order-body-header4">
                <img src="/noresult.png" className="noresult" />
                <h1>No Such Driver</h1>
              </div>
            )}
          </div>
        </section>
      )}
    </>
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
  );
};
export default Driver;
