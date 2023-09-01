import { useEffect, useState } from "react";
import "./admin.css";

import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
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
  const [searchedCustomer, setSearchedCustomer] = useState("");

  const [load, setLoad] = useState(false);

  useEffect(() => {
    getAllOrders();
  }, []);

  /**getAllOrders is a function to get alltheorders that were booked by all users*/

  const getAllOrders = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllOrders`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      console.log(data);
      /**This is an array to insert name,mobileNumber,userId of the user into the each order object which were in the array of orders */
      let eachObjInsertedWithNumberName = [];

      let activeCount = 0;

      let inprogressCount = 0;

      let completedCount = 0;

      let cancelCount = 0;

      for (let eachorder of data) {
        if (eachorder.progress === "Active") {
          activeCount = activeCount + 1;
        }

        if (eachorder.progress === "In Progress") {
          inprogressCount = inprogressCount + 1;
        }

        if (eachorder.progress === "Completed") {
          completedCount = completedCount + 1;
        }

        if (eachorder.progress === "cancel") {
          cancelCount = cancelCount + 1;
        }

        eachObjInsertedWithNumberName.push({
          ...eachorder,
          mobileNumber:
            eachorder.userId
              .mobileNumber /**mobile number,name,userId were added into each order object which were not obtained out of the object from backend */,
          name: eachorder.userId.name,
          userId: eachorder.userId._id,
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
        active: activeCount,
        inprogress: inprogressCount,
        completed: completedCount,
        cancel: cancelCount,
      });

      console.log(eachObjInsertedWithNumberName);

      setAllOrders(eachObjInsertedWithNumberName);
    }
  };

  /**Function used to Filter the items of the selected user to view the users order detials*/
  const filterCustomer = (e) => {
    const selectedCustomerOrder = allorders.filter(
      (each) => each._id === e.target.id
    );

    let itemsObtained = [];

    for (let each of selectedCustomerOrder[0].items) {
      itemsObtained.push({
        count: each.itemCount,
        id: each._id,
        itemCategory: each.itemId.category,
        itemName: each.itemId.name,
        price: each.itemId.price,
        image: each.itemId.image,
      });
    }

    setItems(itemsObtained);
    setSelectedCustomer(selectedCustomerOrder);
  };

  /**Function used to filter all the orders based on the username enterd in the search box */
  const filterdAllOrders = allorders.filter((each) =>
    each.name.toLowerCase().startsWith(searchedCustomer.toLowerCase())
  );

  /**Function used to set the progress of the particular order(active,inprogress,completed,cancel) */
  const settingProgress = async (e) => {
    setAllOrders([]);
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
    let progress = e.target.value;

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
      filterCustomer2(orderId);
    }
  };

  /**Fuction to update progress in the sub section */
  const filterCustomer2 = async (orderId) => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllOrders`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      let eachObjInsertedWithNumberName = [];

      for (let eachorder of data) {
        eachObjInsertedWithNumberName.push({
          ...eachorder,
          mobileNumber:
            eachorder.userId
              .mobileNumber /**mobile number,name,userId were added into each order object which were not obtained out of the object from backend */,
          name: eachorder.userId.name,
          userId: eachorder.userId._id,
        });
      }

      const selectedCustomerOrder = eachObjInsertedWithNumberName.filter(
        (each) => each._id === orderId
      );

      let itemsObtained = [];

      for (let each of selectedCustomerOrder[0].items) {
        itemsObtained.push({
          count: each.itemCount,
          id: each._id,
          itemCategory: each.itemId.category,
          itemName: each.itemId.name,
          price: each.itemId.price,
          image: each.itemId.image,
        });
      }
      setLoad(false);
      setItems(itemsObtained);
      setSelectedCustomer(selectedCustomerOrder);
    }
  };

  /**showAddVendor state is used to show the modalbox to assign a vendor */
  const [showAddVendor, setshowAddVendor] = useState(false);

  /**Component to show the modalbox of after clicking assign vendor in the orders section of a particular order */
  const ModalAssginVendor = () => {
    /**State to get all the vendors inthe modalbox component */
    const [load, setLoad] = useState(true);
    const [vendors, setVendors] = useState([]);

    /**state used to store  the search */
    const [searchedVendor, setSearchedVendor] = useState("");

    useEffect(() => {
      getAllVendors();
    }, []);

    const filteredVendors = vendors.filter((each) =>
      each.name.toLowerCase().startsWith(searchedVendor.toLowerCase())
    );

    /**Function to get all the vendors */
    const getAllVendors = async () => {
      const url = "https://washitup.onrender.com/api/admin/getAllVendors";

      const response = await fetch(url);

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setLoad(false);
        setVendors(data);
      }
    };

    /**Function to assign an order to particular vendor */
    const assignVendor = async (e) => {
      setLoad(true);
      let userId = selectedCustomer[0].userId;
      let orderId = selectedCustomer[0]._id;
      let vendorId = e.target.id;

      const url = "https://washitup.onrender.com/api/admin/assignNewVendor";

      const reqConfigure = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vendorId, orderId, userId }),
      };

      const response = await fetch(url, reqConfigure);

      if (response.ok) {
        toast.success("Assigned Vendor", {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
        setTimeout(() => {
          setshowAddVendor(false);
          setSelectedCustomer("");
          setAllOrders([]);
          getAllOrders();
        }, 1500);
      }
    };

    const changeVendor = async (e) => {
      setLoad(true);
      let orderId = selectedCustomer[0]._id;
      let vendorId = e.target.id;
      let previVendorId = selectedCustomer[0].vendorId._id;
      let previVendorOrderId = selectedCustomer[0]._id;

      const url = "https://washitup.onrender.com/api/vendor/changeVendor";

      const reqConfigure = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendorId,
          orderId,
          previVendorId,
          previVendorOrderId,
        }),
      };

      const response = await fetch(url, reqConfigure);

      if (response.ok) {
        toast.success("Changed Vendor", {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
        setTimeout(() => {
          setshowAddVendor(false);
          setSelectedCustomer("");
          setAllOrders([]);
          getAllOrders();
        }, 1500);
      }
    };

    return load ? (
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="assign-vendor-modal-box"
        >
          <ToastContainer />
          <TailSpin color="#6759ff" height={50} width={50} />
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
        {/**Modal box of the assign vendor */}
        <div className="assign-vendor-modal-box">
          <div className="order-summary-body">
            {/**Button use to show the assign vendor modalbox */}
            <button
              onClick={() => {
                setshowAddVendor(false);
              }}
              type="button"
              style={{
                position: "absolute",
                backgroundColor: "transparent",
                borderWidth: 0,
                color: "#6759FF",
                fontWeight: "bold",
                fontSize: "1.5vw",
                right: 20,
                top: 10,
              }}
            >
              ✕
            </button>
            <div className="order-body-header">
              <h6 style={{ margin: 0 }}>Vendors</h6>
              {/**Search box used to search the vendors in the modal box*/}
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
              <p style={{ width: "20%" }} className="order-body-para">
                Vendor Name
              </p>
              <p style={{ width: "20%" }} className="order-body-para">
                Mobile Number
              </p>

              <p style={{ width: "20%" }} className="order-body-para">
                Address
              </p>

              <p style={{ width: "20%" }} className="order-body-para">
                Pincode
              </p>
              <p style={{ width: "20%" }} className="order-body-para">
                Assign
              </p>
            </div>
            {/**Available vendor's data*/}
            {filteredVendors.map((each) => (
              <div key={each.id} className="order-body-header2">
                <p
                  id={each._id}
                  className="order-body-para"
                  style={{ textTransform: "capitalize", width: "20%" }}
                >
                  {each.name}
                </p>
                <p
                  style={{ width: "20%" }}
                  id={each.id}
                  className="order-body-para"
                >
                  {each.mobileNumber}
                </p>

                <p
                  style={{ width: "20%" }}
                  id={each.id}
                  className="order-body-para"
                >
                  {each.location}
                </p>
                <p
                  style={{ width: "20%" }}
                  id={each.id}
                  className="order-body-para"
                >
                  {each.pinCode}
                </p>
                {/**buttons to assgin the vendor */}
                {selectedCustomer[0].vendorName === "empty" ? (
                  <button
                    id={each._id}
                    onClick={assignVendor}
                    type="button"
                    style={{
                      width: "15%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "8px",
                      borderWidth: "0px",
                      color: "#fff",
                      backgroundColor: "green",
                    }}
                  >
                    Assign
                  </button>
                ) : (
                  selectedCustomer[0].vendorName !== each.name && (
                    <button
                      id={each._id}
                      onClick={changeVendor}
                      type="button"
                      style={{
                        width: "15%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "8px",
                        borderWidth: "0px",
                        color: "#fff",
                        backgroundColor: "#F50000",
                      }}
                    >
                      Change
                    </button>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  console.log(selectedCustomer);

  return allorders.length > 0 ? (
    <>
      {showAddVendor && <ModalAssginVendor />}
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
              <h6 style={{ color: "#53545c" }}>
                Orders Id : {selectedCustomer[0]._id}
              </h6>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "20%",
                  marginLeft: "25%",
                }}
              >
                <select
                  onChange={settingProgress2}
                  userId={selectedCustomer[0].userId}
                  id={selectedCustomer[0]._id}
                  value={selectedCustomer[0].progress}
                  style={{ textTransform: "capitalize" }}
                >
                  {selectedCustomer[0].action.map((each) => (
                    <option>{each}</option>
                  ))}
                </select>
                <p
                  style={
                    selectedCustomer[0].progress === "Active"
                      ? {
                          marginTop: "8%",
                          paddingLeft: "5%",
                          fontSize: "1vw",
                          paddingRight: "5%",
                          backgroundColor: "#FFA00025",
                          color: "#FFA000",
                          borderRadius: "10px",
                          textTransform: "capitalize",
                        }
                      : selectedCustomer[0].progress === "In Progress"
                      ? {
                          paddingLeft: "5%",
                          paddingRight: "5%",
                          fontSize: "1vw",
                          marginTop: "8%",
                          color: "#6759FF",
                          backgroundColor: "#6759FF25",
                          borderRadius: "10px",
                          textTransform: "capitalize",
                        }
                      : selectedCustomer[0].progress === "Completed"
                      ? {
                          paddingLeft: "5%",
                          paddingRight: "5%",
                          fontSize: "1vw",
                          marginTop: "8%",
                          color: "#519C66",
                          backgroundColor: "#519C6625",
                          borderRadius: "10px",
                          textTransform: "capitalize",
                        }
                      : selectedCustomer[0].progress === "cancel" && {
                          paddingLeft: "5%",
                          paddingRight: "5%",
                          fontSize: "1vw",
                          marginTop: "8%",
                          color: "#FF0000",
                          backgroundColor: "#FF000025",
                          borderRadius: "10px",
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
                {/**Button use to show the assign vendor modalbox*/}
                {selectedCustomer[0].vendorName === "empty" ? (
                  <button
                    onClick={() => {
                      setshowAddVendor(!showAddVendor);
                    }}
                    className="assign-vendor"
                    type="button"
                  >
                    Assign Vendor
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setshowAddVendor(!showAddVendor);
                    }}
                    className="assign-vendor"
                    style={{ backgroundColor: "#F50000" }}
                    type="button"
                  >
                    Change Vendor
                  </button>
                )}
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
                      bottom: "40%",
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
                        bottom: "25%",
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
                        bottom: "25%",
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
                        bottom: "25%",
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
                        bottom: "25%",
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
                      bottom: "13%",
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
                        bottom: "0%",
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
                        bottom: "0%",
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
                        bottom: "0%",
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
                        bottom: "0%",
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
                      bottom: "13%",
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
                        bottom: "0%",
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
                        bottom: "0%",
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
                        bottom: "0%",
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
                        bottom: "0%",
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
                      bottom: "13%",
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
                        bottom: "0%",
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
                        bottom: "0%",
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
                        bottom: "0%",
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
                        bottom: "0%",
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
                      bottom: "13%",
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
                        bottom: "0%",
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
                        bottom: "0%",
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
                        bottom: "0%",
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
                        bottom: "0%",
                        left: "80%",
                        color: "#FF0000",
                        fontSize: "1.2vw",
                      }}
                    >
                      {count.cancel}
                    </p>
                  )}
                </div>
              </div>
            )
          ) : (
            <div className="order-summary-view">
              {/**Details of the user*/}
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
                  }}
                >
                  {selectedCustomer[0].address}
                </p>
              </div>
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
                    src="/creditcard.png"
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
                  Payment Method
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
                  Cash After Service
                </p>
              </div>
            </div>
          )}
          {selectedCustomer === "" ? (
            <div className="order-summary-body">
              <div className="order-body-header">
                <h6 style={{ margin: 0 }}>Customer Orders</h6>
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
                <p className="order-body-para">Customer Name</p>
                <p className="order-body-para">Order Date</p>
                <p style={{ width: "20%" }} className="order-body-para">
                  Order Id
                </p>
                <p className="order-body-para">Type of Wash</p>
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
              {filterdAllOrders.map((each) => (
                <div key={each._id} className="order-body-header2">
                  {/**all orders booked by the user sorted based on the date */}
                  <p
                    style={{ textTransform: "capitalize" }}
                    id={each._id}
                    onClick={filterCustomer}
                    className="order-body-para"
                  >
                    {each.name}
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
                    style={{ textTransform: "capitalize" }}
                  >
                    {each.service}
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
                    id={each._id}
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
          ) : (
            <div className="order-summary-body">
              <div className="order-body-header">
                <h6 style={{ margin: 0 }}>
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
                <p style={{ textTransform: "capitalize" }}>
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
                <p className="order-body-para">Order Total</p>
              </div>
              {items.map((each) => (
                <div key={each.id} className="order-body-header2">
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
                  <h6 style={{ marginLeft: "80%" }}>
                    Total : ₹ {parseInt(selectedCustomer[0].totalAmount) / 1000}{" "}
                    K
                  </h6>
                ) : selectedCustomer[0].totalAmount > 100000 &&
                  selectedCustomer[0].totalAmount < 1000000 ? (
                  <h6 style={{ marginLeft: "80%" }}>
                    Total : ₹{" "}
                    {parseInt(selectedCustomer[0].totalAmount) / 100000} L
                  </h6>
                ) : selectedCustomer[0].totalAmount > 1000000 ? (
                  <h6 style={{ marginLeft: "80%" }}>
                    Total : ₹{" "}
                    {parseInt(selectedCustomer[0].totalAmount) / 1000000} M
                  </h6>
                ) : (
                  <h6 style={{ marginLeft: "80%" }}>
                    Total : ₹ {selectedCustomer[0].totalAmount}
                  </h6>
                )}
              </div>
            </div>
          )}
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
export default Orders;
