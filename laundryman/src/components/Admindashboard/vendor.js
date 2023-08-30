import "./admin.css";

import { AiOutlinePlus } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const Vendors = () => {
  const [showAddVendor, setAddVendor] = useState(false);

  const [vendors, setVendors] = useState([]);

  const [searchedVendor, setSearchedVendor] = useState("");

  const [load, setLoad] = useState(true);

  const [total, setTotal] = useState(0);

  const [showVendorOrders, setVendorOrders] = useState([]);

  const [subOrders, setSubOrders] = useState([]);

  useEffect(() => {
    getAllVendors();
  }, []);

  const getAllVendors = async () => {
    const url = "https://washitup.onrender.com/api/admin/getAllVendors";

    const response = await fetch(url);

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      setVendors(data);
      setLoad(false);
    }
  };

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
      } else if (vendorData.email === "") {
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
        setLoad(true);
        const dateTobeSent = {
          ...vendorData,
          mobileNumber: val.slice(3, val.length + 1),
          secondaryMobile: value2.slice(3, value2.length + 1),
        };

        const url = "https://washitup.onrender.com/api/vendor/addVendor";

        const reqConfigure = {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
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
            <h6>Add a New Vendor</h6>
            <p style={{ marginTop: "3vh" }} className="add-customer-titles2">
              Vendor Name
            </p>
            <input
              className="add-customer-input-box2"
              type="text"
              placeholder="Enter Vendor Name"
              value={vendorData.name}
              onChange={(e) => {
                setVendorData((prevDate) => ({
                  ...prevDate,
                  name: e.target.value,
                }));
              }}
            />
            <p className="add-customer-titles2">Vendor Mobile number</p>
            <PhoneInput
              className="add-customer-input-box2"
              placeholder="Enter Phone number"
              defaultCountry="IN"
              value={val}
              onChange={setValue}
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
                setVendorData((prevDate) => ({
                  ...prevDate,
                  shopName: e.target.value,
                }));
              }}
            />
            <p s className="add-customer-titles2">
              Shop Address
            </p>
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
              onChange={setValue2}
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
              type="text"
              placeholder="Enter Vendor PINCODE"
              value={vendorData.pinCode}
              onChange={(e) => {
                setVendorData((prevDate) => ({
                  ...prevDate,
                  pinCode: e.target.value,
                }));
              }}
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

  const filteredVendors = vendors.filter((each) =>
    each.name.toLowerCase().startsWith(searchedVendor.toLowerCase())
  );

  const filterVendorOrders = (e) => {
    const filterdOrder = vendors.filter((each) => each._id === e.target.id);

    const sub = filterdOrder[0].orders.map((each) => ({
      name: "Vamsi",
      userId: each.userId,
      orderId: each._id,
      date: each.date,
      time: each.time,
      totalAmount: each.totalAmount,
      action: each.action,
      progress: each.progress,
    }));

    let totalOrdersAmount = 0;

    sub.map(
      (each) => (totalOrdersAmount = totalOrdersAmount + each.totalAmount)
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
    }

    setSubOrders(sub);

    setVendorOrders(filterdOrder);
  };

  const filterVendorOrders2 = async (vendorId) => {
    const url = "https://washitup.onrender.com/api/admin/getAllVendors";

    const response = await fetch(url);

    const data = await response.json();

    if (response.ok) {
      const filterdOrder = data.filter((each) => each._id === vendorId);

      const sub = filterdOrder[0].orders.map((each) => ({
        name: "Vamsi",
        userId: each.userId,
        orderId: each._id,
        date: each.date,
        time: each.time,
        totalAmount: each.totalAmount,
        action: each.action,
        progress: each.progress,
      }));

      let totalOrdersAmount = 0;

      sub.map(
        (each) => (totalOrdersAmount = totalOrdersAmount + each.totalAmount)
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
      }

      setVendors(data);
      setLoad(false);

      setSubOrders(sub);

      setVendorOrders(filterdOrder);
    }
  };

  const settingProgress = async (e) => {
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
  };

  return !load ? (
    <>
      {showAddVendor && <AddVendorModel setAddVendor={setAddVendor} />}
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
                  {showVendorOrders[0].name}
                </p>
                <p
                  style={{
                    position: "absolute",
                    bottom: "40%",
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
                    bottom: "25%",
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
                    bottom: "13%",
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
                    bottom: "0%",
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
                    bottom: "40%",
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
                    top: "50%",
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
                    bottom: "40%",
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
                    bottom: "25%",
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
                    bottom: "40%",
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
                    bottom: "25%",
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
              <div className="order-body-header1">
                <p className="order-body-para">Customer Name</p>
                <p className="order-body-para">Order Date</p>
                <p style={{ width: "20%" }} className="order-body-para">
                  Order Id
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
              {subOrders.map((each) => (
                <div key={each.orderId} className="order-body-header2">
                  {/**all orders booked by the user sorted based on the date */}
                  <p
                    style={{ textTransform: "capitalize" }}
                    userId={each.userId}
                    id={each.orderId}
                    className="order-body-para"
                  >
                    {each.name}
                  </p>
                  <p
                    userId={each.userId}
                    id={each.orderId}
                    className="order-body-para"
                  >
                    {each.date} - {each.time}
                  </p>
                  <p
                    i
                    userId={each.userId}
                    id={each.orderId}
                    style={{ width: "20%" }}
                    className="order-body-para"
                  >
                    {each.orderId}
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
                  <select
                    userId={each.userId}
                    id={each.orderId}
                    onChange={settingProgress}
                    className="order-body-select"
                    style={{ textTransform: "capitalize" }}
                  >
                    {each.action.map((e) => (
                      <option
                        style={{ textTransform: "capitalize" }}
                        selected={each.progress === e ? true : false}
                      >
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
            {filteredVendors.map((each) => (
              <div key={each._id} className="order-body-header2">
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
            ))}
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
