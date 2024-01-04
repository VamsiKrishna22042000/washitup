import "./admin.css";

import Cookies from "js-cookie";

import { v4 as uuidV4 } from "uuid";

import { AiOutlinePlus } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import { FaCalendarAlt } from "react-icons/fa";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import CustomModal from "./modal";
import VendorDetails from "./vendorDetails";

const Vendors = () => {
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

  const [subfilter, setSubfilter] = useState("");

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedData] = useState({ date: "", id: "" });

  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    getAllVendors();
  }, []);

  /**Function to get all the vendor and set vendor to allVendors state */
  const getAllVendors = async () => {
    try {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllVendors`;

      const adminToken = Cookies.get("jwt_adminLogin");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      };

      const response = await fetch(url, { headers });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setVendors(data);
        setLoad(false);
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

  /**Modal Box to add vendor */
  const AddVendorModel = (props) => {
    const { setAddVendor } = props;

    /** phonenumber state */

    const [val, setValue] = useState(0);
    const [value2, setValue2] = useState(0);

    const [vendorData, setVendorData] = useState({
      name: "",
      email: "",
      shopName: "",
      address: "",
      location: "",
      pinCode: "",
    });

    const [load, setLoad] = useState(false);

    const addUser = async () => {
      if (vendorData.name === "") {
        toast.error("Please Enter Vendor Name", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (val === 0) {
        toast.error("Please Enter Valid Number", {
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
      } else if (vendorData.email === "") {
        toast.error("Please Enter Vendor Email", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (!vendorData.email.endsWith("@gmail.com")) {
        toast.error("Please Enter Vendor Email", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (vendorData.shopName === "") {
        toast.error("Please Enter Vendor Shop Name", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (value2 === 0) {
        toast.error("Please Enter Valid Secondary Number", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (value2.length < 13 || value2.length > 13) {
        toast.error("Mobile number should be of 10 digits", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (vendorData.address === "") {
        toast.error("Please Enter Address", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (vendorData.location === "") {
        toast.error("Please Enter Location", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (vendorData.pinCode === "") {
        toast.error("Please Enter Pincode", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (val === value2) {
        toast.error("Both Numbers cannot be same", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else {
        try {
          setLoad(true);
          const dateTobeSent = {
            ...vendorData,
            mobileNumber: val.slice(3, val.length + 1),
            secondaryMobile: value2.slice(3, value2.length + 1),
          };

          const url = `${
            process.env.REACT_APP_ROOT_URL
          }/api/vendor/addVendor/${Cookies.get("jwt_adminId")}`;

          const reqConfigure = {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt_adminLogin")}`,
            },

            body: JSON.stringify(dateTobeSent),
          };

          const response = await fetch(url, reqConfigure);

          if (response.ok) {
            toast.success("Vendor Added", {
              position: "top-center",
              autoClose: 2000,
              closeOnClick: true,
              pauseOnHover: true,
              theme: "colored",
            });
            setTimeout(() => {
              setLoad(false);
              setAddVendor(false);
              getAllVendors();
            }, 1500);
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
        <div className="add-vendor-modal-box">
          <ToastContainer />
          <div style={{ width: "50%" }}>
            <h6 style={{ fontSize: "1rem", marginBottom: "1%" }}>
              Add a New Vendor
            </h6>
            <p style={{ marginTop: "3vh" }} className="add-customer-titles2">
              Vendor Name
            </p>
            <input
              className="add-customer-input-box2"
              type="text"
              placeholder="Enter Vendor Name"
              value={vendorData.name}
              onChange={(e) => {
                const inputValue = e.target.value;

                // Regular expression to check if the input contains only letters
                const isTextOnly = /^[a-zA-Z\s]*$/.test(inputValue);

                if (isTextOnly) {
                  setVendorData((prevDate) => ({
                    ...prevDate,
                    name: inputValue,
                  }));
                }
              }}
            />
            <p className="add-customer-titles2">Vendor Mobile number</p>
            <PhoneInput
              className="add-customer-input-box2"
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
            <p style={{ marginTop: "3vh" }} className="add-customer-titles2">
              Vendor Email
            </p>
            <input
              className="add-customer-input-box2"
              type="email"
              placeholder="Enter Vendor Email"
              value={vendorData.email}
              onChange={(e) => {
                setVendorData((prevDate) => ({
                  ...prevDate,
                  email: e.target.value,
                }));
              }}
            />
            <p className="add-customer-titles2">Shop Name</p>
            <input
              className="add-customer-input-box2"
              type="text"
              placeholder="Enter Shop Name"
              value={vendorData.shopName}
              onChange={(e) => {
                const inputValue = e.target.value;
                // Use a regular expression to match only letters and spaces
                const validInput = inputValue.replace(/[^a-zA-Z0-9\s]/g, "");

                setVendorData((prevData) => ({
                  ...prevData,
                  shopName: validInput,
                }));
              }}
            />
            <p className="add-customer-titles2">Shop Address</p>
            <textarea
              style={{ height: "20vh" }}
              className="add-customer-input-box2"
              type="text"
              placeholder="Enter Shop Address"
              value={vendorData.address}
              onChange={(e) => {
                setVendorData((prevDate) => ({
                  ...prevDate,
                  address: e.target.value,
                }));
              }}
            ></textarea>
          </div>
          <div style={{ width: "50%" }}>
            <h6 style={{ color: "transparent" }}>Add a New Vendor</h6>
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
            <p className="add-customer-titles2">Secondary Mobile number</p>
            <PhoneInput
              className="add-customer-input-box2"
              placeholder="Enter Secondary Phone number"
              defaultCountry="IN"
              value={value2}
              limitMaxLength
              onChange={setValue2}
              error={
                value2
                  ? isValidPhoneNumber(value2)
                    ? undefined
                    : "Invalid phone number"
                  : "Phone number required"
              }
            />
            <p className="add-customer-titles2">Location</p>
            <input
              className="add-customer-input-box2"
              type="text"
              placeholder="Enter Vendor Location"
              value={vendorData.location}
              onChange={(e) => {
                setVendorData((prevDate) => ({
                  ...prevDate,
                  location: e.target.value,
                }));
              }}
            />
            <p className="add-customer-titles2">Pin Code</p>
            <input
              className="add-customer-input-box2"
              type="tel"
              placeholder="Enter Vendor PINCODE"
              value={vendorData.pinCode}
              onChange={(e) => {
                const inputValue = e.target.value;
                // Use a regular expression to match only alphanumeric characters
                const validInput = inputValue.replace(/\D/g, "");

                setVendorData((prevData) => ({
                  ...prevData,
                  pinCode: validInput,
                }));
              }}
              maxLength={6}
            />

            <button
              onClick={addUser}
              className="add-cutomer-button"
              type="button"
            >
              Add
            </button>
          </div>
        </div>
      </>
    ) : (
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
        <div
          style={{
            height: "95vh",
            width: "70vw",
            top: "2.5%",
            left: "18%",
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
      progress: each.order.progress,
      activeorinactive: each.status,
    }));

    let totalOrdersAmount = 0;

    sub.map(
      (each) =>
        each.progress === "Completed" &&
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

    setSubOrders(sub);

    setVendorOrders(filterdOrder);
  };

  /**Same as filterVendorOrders2 but when we update the progress of a order in the subsection of the vendor*/
  const filterVendorOrders2 = async (vendorId) => {
    try {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllVendors`;

      const adminToken = Cookies.get("jwt_adminLogin");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      };

      const response = await fetch(url, { headers });

      const data = await response.json();

      if (response.ok) {
        const filterdOrder = data.filter((each) => each._id === vendorId);

        const sub = filterdOrder[0].orders.map((each) => ({
          userId: each.order.userId,
          orderId: each.order._id,
          date: each.order.date,
          time: each.order.time,
          totalAmount: each.order.totalAmount,
          action: each.order.action,
          progress: each.order.progress,
          activeorinactive: each.status,
        }));

        let totalOrdersAmount = 0;

        sub.map((each) => {
          each.progress === "Completed" &&
            (totalOrdersAmount = totalOrdersAmount + each.totalAmount);
        });

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

        setVendors(data);
        setLoad(false);

        setSubOrders(sub);

        setVendorOrders(filterdOrder);
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
          // let d = dd;

          // Combine them in the desired format
          const formattedDate = `${d}-${m}-${yyyy}`;
          setSelectedData({ date: formattedDate, id: "cal" });
          setShowDate(false);
        }}
        value={date}
      />
    );
  };

  /**Function to change the progress of the orders in the subsection of the vendor */
  const settingProgress = async (e) => {
    try {
      setLoad(true);
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/progressActive`;
      let userId = e.target.getAttribute("userId");
      let orderId = e.target.id;
      let progress = e.target.value;

      const reqConfigure = {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ userId, orderId, progress }),
      };

      console.log(reqConfigure);

      const response = await fetch(url, reqConfigure);

      if (response.ok) {
        filterVendorOrders2(showVendorOrders[0]._id);
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleVendorDetails = (id) => {
    setSelectedVendorId(id);
    setShowModal(true);
  };

  const filterdSuborder = subOrders.filter((each) =>
    subfilter === "" ? each : String(each.progress) === String(subfilter)
  );

  const suborderFiltered = filterdSuborder.filter((each) =>
    selectedDate.date === ""
      ? each
      : String(each.date) === String(selectedDate.date) && each
  );

  console.log(suborderFiltered);

  return !load ? (
    <>
      {/**Terinary operator to show addvedor modal box or not */}
      {showAddVendor && <AddVendorModel setAddVendor={setAddVendor} />}
      {/**Terinary operator to navigate between the main and subsection*/}
      {showVendorOrders.length > 0 ? (
        subOrders !== "" ? (
          <section className="order-body">
            <div className="order-summary-head">
              <h6 style={{ color: "#53545c", textTransform: "capitalize" }}>
                {showVendorOrders[0].name}'s Order Details
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
                onClick={() => handleVendorDetails(showVendorOrders[0]._id)}
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
            {showModal && (
              <CustomModal show={showModal} handleClose={handleCloseModal}>
                {selectedVendorId && (
                  <VendorDetails vendorId={selectedVendorId} />
                )}
              </CustomModal>
            )}
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
                <div>
                  <strong>Filter :</strong>
                  <button
                    style={{
                      padding: ".2rem .4rem",
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
                      padding: ".2rem .4rem",
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
                      padding: ".2rem .4rem",
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
                      padding: ".2rem .4rem",
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
                <p className="order-body-para">Order Id</p>
                <p
                  style={{ width: "20%", paddingLeft: "4%" }}
                  className="order-body-para"
                >
                  Order Date
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
                <p className="order-body-para">Accept / Reject</p>
              </div>
              {suborderFiltered.map((each) => (
                <div
                  style={
                    each.activeorinactive !== "in-active"
                      ? { display: "inline-flex" }
                      : { display: "none" }
                  }
                  key={`${each.orderId}${uuidV4()}`}
                  className="order-body-header2"
                >
                  {/**all orders booked by the user sorted based on the date */}

                  <p
                    key={`${each.orderId}${uuidV4()}`}
                    userId={each.userId}
                    id={each.orderId}
                    style={{ width: "20%" }}
                    className="order-body-para"
                  >
                    {each.orderId}
                  </p>
                  <p
                    key={`${each.orderId}${uuidV4()}`}
                    userId={each.userId}
                    id={each.orderId}
                    className="order-body-para"
                  >
                    {each.date} - {each.time}
                  </p>
                  {each.totalAmount > 1000 && each.totalAmount < 100000 ? (
                    <p
                      key={`${each.orderId}${uuidV4()}`}
                      className="order-body-para"
                    >
                      ₹ {parseInt(each.totalAmount) / 1000} K
                    </p>
                  ) : each.totalAmount > 100000 &&
                    each.totalAmount < 1000000 ? (
                    <p
                      key={`${each.orderId}${uuidV4()}`}
                      className="order-body-para"
                    >
                      ₹ {parseInt(each.totalAmount) / 100000} L
                    </p>
                  ) : each.totalAmount > 1000000 ? (
                    <p
                      key={`${each.orderId}${uuidV4()}`}
                      className="order-body-para"
                    >
                      ₹ {parseInt(each.totalAmount) / 1000000} M
                    </p>
                  ) : (
                    <p
                      key={`${each.orderId}${uuidV4()}`}
                      className="order-body-para"
                    >
                      ₹ {each.totalAmount}
                    </p>
                  )}
                  <select
                    key={`${each.orderId}${uuidV4()}`}
                    userId={each.userId}
                    id={each.orderId}
                    onChange={settingProgress}
                    className="order-body-select"
                    style={{ textTransform: "capitalize" }}
                  >
                    {each.action.map((e) => (
                      <option
                        key={`${each.orderId}${uuidV4()}`}
                        style={{ textTransform: "capitalize" }}
                        selected={each.progress === e ? true : false}
                      >
                        {e}
                      </option>
                    ))}
                  </select>
                  <p
                    key={`${each.orderId}${uuidV4()}`}
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
                  <p
                    key={`${each.orderId}${uuidV4()}`}
                    className="order-body-para"
                    style={
                      each.activeorinactive === "Rejected"
                        ? { color: "red", textTransform: "capitalize" }
                        : { color: "green", textTransform: "capitalize" }
                    }
                  >
                    {each.activeorinactive}
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
            <h6 style={{ color: "#53545c" }}>Vendors Summary</h6>
            <button
              onClick={() => {
                setAddVendor(true);
              }}
              className="assign-vendor"
              type="button"
            >
              <AiOutlinePlus />
              Add a New Vendor
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
                  src="/vendor2.png"
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
                Total Vendors
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
              <h6 style={{ margin: 0 }}>Vendors</h6>
              <input
                onChange={(e) => {
                  setSearchedVendor(e.target.value);
                }}
                style={{ outline: "none", fontSize: "1vw" }}
                type="search"
                placeholder="Search Vendors"
              />
            </div>
            <div className="order-body-header1">
              <div className="order-body-para"></div>
              <p className="order-body-para">Vendor Name</p>
              <p className="order-body-para">Mobile Number</p>
              <p className="order-body-para">Email</p>
              <p className="order-body-para">Address</p>
              <p className="order-body-para">Location</p>
              <p className="order-body-para">Pincode</p>
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
                      onClick={filterVendorOrders}
                      id={each.id}
                      style={{
                        height: "105%",
                        width: "15%",
                        position: "absolute",
                        left: "35%",
                      }}
                      src="/vendor2.png"
                      alt={each.name}
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
                  <p
                    onClick={filterVendorOrders}
                    id={each._id}
                    className="order-body-para"
                  >
                    {each.location}
                  </p>
                  <p
                    onClick={filterVendorOrders}
                    id={each._id}
                    className="order-body-para"
                  >
                    {each.pinCode}
                  </p>
                </div>
              ))
            ) : (
              <div className="order-body-header4">
                <img src="/noresult.png" className="noresult" />
                <h1>No Such Venodor</h1>
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
export default Vendors;
