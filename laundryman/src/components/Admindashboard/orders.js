import { useEffect, useState, useRef } from "react";
import "./admin.css";

import { v4 as uuidV4 } from "uuid";

import { TailSpin } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";

import { FaCalendarAlt } from "react-icons/fa";

import { LuImagePlus } from "react-icons/lu";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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

  const [subfilter, setSubfilter] = useState("");

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedData] = useState({ date: "", id: "" });

  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const [showDate, setShowDate] = useState(false);

  const [filterPresentOrders, setPresentOrders] = useState([]);

  /**To get all the order before mounting by an api call*/
  useEffect(() => {
    getAllOrders();
  }, []);

  /**getAllOrders is a function to get alltheorders that were booked by all users*/

  const getAllOrders = async () => {
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

          console.log(eachorder);

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

  /**Function used to Filter the items of the selected user to view the users order detials*/
  const filterCustomer = (e) => {
    const selectedCustomerOrder = allorders.filter(
      (each) => each._id === e.target.id
    );

    let itemsObtained = [];

    for (let each of selectedCustomerOrder[0].items) {
      for (let e of each.uniqueId) {
        itemsObtained.push({
          uniqueId: e,
          count: each.itemCount,
          id: each.itemId._id,
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
    }

    /**console.log(itemsObtained)*/

    console.log(selectedCustomerOrder);

    setItems(itemsObtained);
    setSelectedCustomer(selectedCustomerOrder);
  };

  const allorderFilter = allorders.filter((each) =>
    subfilter === "" ? each : each.progress === subfilter
  );

  /**Function used to filter all the orders based on the username enterd in the search box */
  const filterdSearch = allorderFilter.filter((each) =>
    each.name.toLowerCase().startsWith(searchedCustomer.toLowerCase())
  );

  const filterdAllOrders = filterdSearch.filter((each) =>
    selectedDate.date === ""
      ? each
      : String(each.date) === String(selectedDate.date) && each
  );

  /**Function used to set the progress of the particular order(active,inprogress,completed,cancel) */
  const settingProgress = async (e) => {
    try {
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

  /**Fuction to update progress in the sub section */
  const settingProgress2 = async (e) => {
    try {
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

  /**Fuction to update progress in the sub section and*/
  const filterCustomer2 = async (orderId) => {
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
          for (let e of each.uniqueId) {
            itemsObtained.push({
              uniqueId: e,
              count: each.itemCount,
              id: each.itemId._id,
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
        }

        setLoad(false);
        setItems(itemsObtained);
        setSelectedCustomer(selectedCustomerOrder);
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

  /**showAddVendor state is used to show the modalbox to assign a vendor */
  const [showAddVendor, setshowAddVendor] = useState(false);
  const [showAddDriver, setshowAddDriver] = useState(false);

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
          /**console.log(data);*/
          setLoad(false);
          setVendors(data);
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

    /**Function to assign an order to particular vendor */
    const assignVendor = async (e) => {
      try {
        setLoad(true);
        /*let userId = selectedCustomer[0].userId;*/
        let orderId = selectedCustomer[0]._id;
        let vendorId = e.target.id;

        const adminToken = Cookies.get("jwt_adminLogin");

        const url = `${
          process.env.REACT_APP_ROOT_URL
        }/api/admin/assignNewVendor/${Cookies.get("jwt_adminId")}`;

        const reqConfigure = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ vendorId, orderId }),
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
            setAllOrders([]);
            getAllOrders();
            filterCustomer2(orderId);
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
    };

    /**Function to change the assigned vendor */
    const changeVendor = async (e) => {
      try {
        setLoad(true);
        let orderId = selectedCustomer[0]._id;
        let vendorId = e.target.id;
        let previVendorId = selectedCustomer[0].vendorId._id;
        let previVendorOrderId = selectedCustomer[0]._id;

        const url = `${
          process.env.REACT_APP_ROOT_URL
        }/api/vendor/changeVendor/${Cookies.get("jwt_adminId")}`;

        const adminToken = Cookies.get("jwt_adminLogin");

        const reqConfigure = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
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
            setAllOrders([]);
            getAllOrders();
            filterCustomer2(orderId);
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
    };

    /*console.log(selectedCustomer[0].vendorName);*/

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
            {filteredVendors.length > 0 ? (
              filteredVendors.map((each) => (
                <div
                  key={`${each.id}${uuidV4()}`}
                  className="order-body-header2"
                >
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
                        padding: ".2rem .3rem",
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
                          padding: ".2rem .3rem",
                          backgroundColor: "#F50000",
                        }}
                      >
                        Change
                      </button>
                    )
                  )}
                </div>
              ))
            ) : (
              <div className="order-body-header4">
                <img src="/noresult.png" className="noresult" />
                <h1>No Such Venodor</h1>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  const ModalAssignDriver = () => {
    /**State to get all the vendors inthe modalbox component */
    const [load, setLoad] = useState(true);
    const [vendors, setVendors] = useState([]);

    /**state used to store  the search */
    const [searchedVendor, setSearchedVendor] = useState("");

    useEffect(() => {
      getAllDriver();
    }, []);

    const filteredVendors = vendors.filter((each) =>
      each.name.toLowerCase().startsWith(searchedVendor.toLowerCase())
    );

    /**Function to get all the vendors */
    const getAllDriver = async () => {
      try {
        const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllDrivers`;

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt_adminLogin")}`,
        };

        const response = await fetch(url, { headers });

        const data = await response.json();

        // console.log(data);

        if (response.ok) {
          setLoad(false);
          setVendors(data.data);
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

    /**Function to assign an order to particular vendor */
    const assignVendor = async (e) => {
      try {
        setLoad(true);
        let userId = selectedCustomer[0].userId;
        let orderId = selectedCustomer[0]._id;
        let driverId = e.target.id;

        const url = `${
          process.env.REACT_APP_ROOT_URL
        }/api/driver/assignOrderToDriver/${Cookies.get("jwt_adminId")}`;

        const reqConfigure = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt_adminLogin")}`,
          },
          body: JSON.stringify({ driverId, orderId, userId }),
        };

        const response = await fetch(url, reqConfigure);

        if (response.ok) {
          toast.success("Assigned Driver", {
            position: "top-center",
            autoClose: 1000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
          setTimeout(() => {
            setshowAddDriver(false);
            setAllOrders([]);
            getAllOrders();
            filterCustomer2(orderId);
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
    };

    /**Function to change the assigned vendor */
    const changeVendor = async (e) => {
      try {
        setLoad(true);
        let orderId = selectedCustomer[0]._id;
        let newDriverId = e.target.id;
        let prevDriverId =
          selectedCustomer[0].driverName2 === "empty"
            ? selectedCustomer[0].driverName1
            : selectedCustomer[0].driverName2;

        const url = `${
          process.env.REACT_APP_ROOT_URL
        }/api/driver/changeDriver/${Cookies.get("jwt_adminId")}`;

        const reqConfigure = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt_adminLogin")}`,
          },
          body: JSON.stringify({
            newDriverId,
            orderId,
            prevDriverId,
          }),
        };

        const response = await fetch(url, reqConfigure);

        if (response.ok) {
          toast.success("Changed Driver", {
            position: "top-center",
            autoClose: 1000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
          setTimeout(() => {
            setshowAddDriver(false);
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
                setshowAddDriver(false);
                setAllOrders([]);
                getAllOrders();
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
              <h6 style={{ margin: 0 }}>Drivers</h6>
              {/**Search box used to search the vendors in the modal box*/}
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
              <p style={{ width: "20%" }} className="order-body-para">
                Driver Name
              </p>
              <p style={{ width: "20%" }} className="order-body-para">
                Mobile Number
              </p>

              <p style={{ width: "20%" }} className="order-body-para">
                Address
              </p>

              <p style={{ width: "20%" }} className="order-body-para">
                Email
              </p>
              <p style={{ width: "20%" }} className="order-body-para">
                Assign
              </p>
            </div>
            {/**Available vendor's data*/}
            {filteredVendors.length > 0 ? (
              filteredVendors.map((each) => (
                <div
                  key={`${each.id}${uuidV4()}`}
                  className="order-body-header2"
                >
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
                    id={each._id}
                    className="order-body-para"
                  >
                    {each.address}
                  </p>
                  <p
                    style={{ width: "20%" }}
                    id={each.id}
                    className="order-body-para"
                  >
                    {each.email}
                  </p>
                  {/**buttons to assgin the vendor */}
                  {selectedCustomer[0].driverName1 === "empty" &&
                  selectedCustomer[0].driverName2 === "empty" &&
                  selectedCustomer[0].progress !== "Completed" ? (
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
                        padding: ".2rem .3rem",
                      }}
                    >
                      Assign Driver 1
                    </button>
                  ) : (
                    selectedCustomer[0].driverName1 !== "empty" &&
                    selectedCustomer[0].driverName2 === "empty" &&
                    selectedCustomer[0].progress !== "Completed" && (
                      <button
                        onClick={changeVendor}
                        id={each._id}
                        type="button"
                        style={
                          selectedCustomer[0].driverName1 === each._id
                            ? {
                                display: "none",
                              }
                            : {
                                width: "15%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                                borderWidth: "0px",
                                color: "#fff",
                                backgroundColor: "#F50000",
                                padding: ".2rem .3rem",
                              }
                        }
                      >
                        Change Driver 1
                      </button>
                    )
                  )}

                  {selectedCustomer[0].driverName1 !== "empty" &&
                  selectedCustomer[0].driverName2 === "empty" &&
                  selectedCustomer[0].progress === "Completed" ? (
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
                        padding: ".2rem .3rem",
                      }}
                    >
                      Assign Driver 2
                    </button>
                  ) : (
                    selectedCustomer[0].driverName1 !== "empty" &&
                    selectedCustomer[0].driverName2 !== "empty" &&
                    selectedCustomer[0].progress === "Completed" && (
                      <button
                        onClick={changeVendor}
                        id={each._id}
                        type="button"
                        style={
                          selectedCustomer[0].driverName2 === each._id
                            ? {
                                display: "none",
                              }
                            : {
                                width: "15%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "8px",
                                borderWidth: "0px",
                                color: "#fff",
                                backgroundColor: "#F50000",
                                padding: ".2rem .3rem",
                              }
                        }
                      >
                        Change Driver 2
                      </button>
                    )
                  )}
                </div>
              ))
            ) : (
              <div className="order-body-header4">
                <img src="/noresult.png" className="noresult" />
                <h1>No Such Driver</h1>
              </div>
            )}
          </div>
        </div>
      </>
    );
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

          // console.log(d);

          // Combine them in the desired format
          const formattedDate = `${d}-${m}-${yyyy}`;
          setSelectedData({ date: formattedDate, id: "cal" });
          setShowDate(false);
        }}
        value={date}
      />
    );
  };

  const [item, setItem] = useState("");
  const [unique, setUnique] = useState("");

  const fileInputRef = useRef("");

  const handleFileChange = async (event) => {
    try {
      setLoad(true);
      let orderId = selectedCustomer[0]._id;
      let element = document.getElementById("file-upload");
      let itemId = item;
      let uniqueId = unique;
      let img = event.target.files[0];

      let fd = new FormData();

      fd.append("orderId", orderId);
      fd.append("itemId", itemId);
      fd.append("uniqueId", uniqueId);
      fd.append("image", img);

      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/uploadItemImage`;

      console.log(Object.fromEntries(fd.entries()));

      const reqConfigure = {
        method: "POST",
        body: fd,
      };

      const response = await fetch(url, reqConfigure);

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        filterCustomer2(orderId);
      } else {
        setLoad(true);
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

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handelVendorDriverEmpty = (each) => {
    if (each.vendorName !== "empty") {
      if (
        each.driverName1 !== "empty" &&
        each.driverName2 === "empty" &&
        each.progress === "cancel"
      ) {
        return (
          <div
            style={{ position: "relative" }}
            key={`${each._id}${uuidV4()}`}
            className="order-body-header2"
          >
            {/**all orders booked by the user sorted based on the date */}
            <div
              style={{
                paddingBottom: "2%",
                background: "#fff",
                color: "red",
                fontWeight: "bold",
              }}
              className="vender-assigned-or-not"
            >
              🚫
            </div>

            <p className="vendor-assign-check">Order Cancled</p>

            <p
              style={{ textTransform: "capitalize", width: "14%" }}
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
              style={{ textTransform: "capitalize", width: "14%" }}
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
              className="order-body-para1"
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
                      textAlign: "start",
                    }
                  : each.progress === "Completed"
                  ? {
                      color: "#519C66",
                      backgroundColor: "#519C6625",
                      borderRadius: "10px",
                      textTransform: "capitalize",
                      textAlign: "start",
                    }
                  : each.progress === "cancel" && {
                      color: "#FF0000",
                      backgroundColor: "#FF000025",
                      borderRadius: "10px",
                      textTransform: "capitalize",
                      textAlign: "start",
                    }
              }
            >
              {each.progress}
            </p>
          </div>
        );
      } else if (
        each.driverName1 !== "empty" &&
        each.driverName2 === "empty" &&
        each.progress !== "Completed"
      ) {
        return (
          <div
            style={{ position: "relative" }}
            key={`${each._id}${uuidV4()}`}
            className="order-body-header2"
          >
            {/**all orders booked by the user sorted based on the date */}
            <div
              style={{
                paddingBottom: "2%",
                background: "#fff",
                color: "red",
                fontWeight: "bold",
              }}
              className="vender-assigned-or-not"
            >
              ✕
            </div>

            <p className="vendor-assign-check">Order In Process</p>

            <p
              style={{ textTransform: "capitalize", width: "14%" }}
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
              style={{ textTransform: "capitalize", width: "14%" }}
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
              className="order-body-para1"
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
                      textAlign: "start",
                    }
                  : each.progress === "Completed"
                  ? {
                      color: "#519C66",
                      backgroundColor: "#519C6625",
                      borderRadius: "10px",
                      textTransform: "capitalize",
                      textAlign: "start",
                    }
                  : each.progress === "cancel" && {
                      color: "#FF0000",
                      backgroundColor: "#FF000025",
                      borderRadius: "10px",
                      textTransform: "capitalize",
                      textAlign: "start",
                    }
              }
            >
              {each.progress}
            </p>
          </div>
        );
      }
    }

    if (
      each.vendorName !== "empty" &&
      each.driverName1 !== "empty" &&
      each.driverName2 !== "empty" &&
      each.progress === "Completed"
    ) {
      return (
        <div
          style={{ position: "relative" }}
          key={`${each._id}${uuidV4()}`}
          className="order-body-header2"
        >
          {/**all orders booked by the user sorted based on the date */}
          <div
            style={{
              paddingBottom: "2%",
              background: "#fff",
              color: "green",
              fontWeight: "bold",
            }}
            className="vender-assigned-or-not1"
          >
            ✓
          </div>

          <p className="vendor-assign-check1">Order Completed</p>

          <p
            style={{ textTransform: "capitalize", width: "14%" }}
            id={each._id}
            onClick={filterCustomer}
            className="order-body-para"
          >
            {each.name}
          </p>
          <p id={each._id} onClick={filterCustomer} className="order-body-para">
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
            className="order-body-para1"
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
                    textAlign: "start",
                  }
                : each.progress === "Completed"
                ? {
                    color: "#519C66",
                    backgroundColor: "#519C6625",
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "start",
                  }
                : each.progress === "cancel" && {
                    color: "#FF0000",
                    backgroundColor: "#FF000025",
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "start",
                  }
            }
          >
            {each.progress}
          </p>
        </div>
      );
    }

    if (each.progress === "In Progress") {
      return (
        <div
          style={{ position: "relative" }}
          key={`${each._id}${uuidV4()}`}
          className="order-body-header2"
        >
          {/**all orders booked by the user sorted based on the date */}
          <div
            style={{
              paddingBottom: "2%",
              background: "#fff",
              color: "red",
              fontWeight: "bold",
            }}
            className="vender-assigned-or-not"
          >
            ✕
          </div>

          <p className="vendor-assign-check">Order In Process</p>

          <p
            style={{ textTransform: "capitalize", width: "14%" }}
            id={each._id}
            onClick={filterCustomer}
            className="order-body-para"
          >
            {each.name}
          </p>
          <p id={each._id} onClick={filterCustomer} className="order-body-para">
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
            className="order-body-para1"
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
                    textAlign: "start",
                  }
                : each.progress === "Completed"
                ? {
                    color: "#519C66",
                    backgroundColor: "#519C6625",
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "start",
                  }
                : each.progress === "cancel" && {
                    color: "#FF0000",
                    backgroundColor: "#FF000025",
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "start",
                  }
            }
          >
            {each.progress}
          </p>
        </div>
      );
    }

    if (each.progress === "cancel") {
      return (
        <div
          style={{ position: "relative" }}
          key={`${each._id}${uuidV4()}`}
          className="order-body-header2"
        >
          {/**all orders booked by the user sorted based on the date */}
          <div
            style={{
              paddingBottom: "2%",
              background: "#fff",
              color: "red",
              fontWeight: "bold",
            }}
            className="vender-assigned-or-not"
          >
            🚫
          </div>

          <p className="vendor-assign-check">Order Canceled</p>

          <p
            style={{ textTransform: "capitalize", width: "14%" }}
            id={each._id}
            onClick={filterCustomer}
            className="order-body-para"
          >
            {each.name}
          </p>
          <p id={each._id} onClick={filterCustomer} className="order-body-para">
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
            className="order-body-para1"
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
                    textAlign: "start",
                  }
                : each.progress === "Completed"
                ? {
                    color: "#519C66",
                    backgroundColor: "#519C6625",
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "start",
                  }
                : each.progress === "cancel" && {
                    color: "#FF0000",
                    backgroundColor: "#FF000025",
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "start",
                  }
            }
          >
            {each.progress}
          </p>
        </div>
      );
    }
  };

  const handleNewRequests = (each) => {
    if (
      each.vendorName === "empty" &&
      each.driverName1 === "empty" &&
      each.driverName2 === "empty" &&
      each.progress !== "Completed"
    ) {
      return (
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-evenly",
            alignItem: "center",
          }}
          key={`${each._id}${uuidV4()}`}
          className="order-body-header2"
        >
          {/**all orders booked by the user sorted based on the date */}
          <div style={{ width: "2%" }} className="vender-assigned-or-not"></div>

          <p style={{ left: "4%" }} className="vendor-assign-check">
            Vendor Not Assigned
          </p>

          <p
            style={{ textTransform: "capitalize", width: "18%" }}
            id={each._id}
            onClick={filterCustomer}
            className="order-body-para"
          >
            {each.name}
          </p>
          <p
            id={each._id}
            onClick={filterCustomer}
            style={{ width: "25%" }}
            className="order-body-para"
          >
            {each.date} - {each.time}
          </p>

          <p
            id={each._id}
            onClick={filterCustomer}
            className="order-body-para"
            style={{ textTransform: "capitalize", width: "18%" }}
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

          <p
            className="order-body-para1"
            style={
              each.progress === "Active"
                ? {
                    width: "6.5vw",

                    color: "#FFA000",
                    borderRadius: "10px",
                    textTransform: "capitalize",
                  }
                : each.progress === "In Progress"
                ? {
                    width: "6.5vw",
                    color: "#6759FF",

                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "start",
                  }
                : each.progress === "Completed"
                ? {
                    width: "6.5vw",
                    color: "#519C66",

                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "start",
                  }
                : each.progress === "cancel" && {
                    width: "6.5vw",
                    color: "#FF0000",

                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "start",
                  }
            }
          >
            {each.progress}
          </p>
        </div>
      );
    }
    if (
      each.vendorName !== "empty" &&
      each.driverName1 === "empty" &&
      each.driverName2 === "empty" &&
      each.progress !== "Completed"
    ) {
      return (
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-evenly",
            alignItem: "center",
          }}
          key={`${each._id}${uuidV4()}`}
          className="order-body-header2"
        >
          {/**all orders booked by the user sorted based on the date */}
          <div
            style={{ background: "#fca311", width: "2%" }}
            className="vender-assigned-or-not"
          ></div>

          <p
            style={{ left: "4%", background: "#fca311" }}
            className="vendor-assign-check"
          >
            Driver1 Not Assigned
          </p>

          <p
            style={{ textTransform: "capitalize", width: "18%" }}
            id={each._id}
            onClick={filterCustomer}
            className="order-body-para"
          >
            {each.name}
          </p>
          <p
            id={each._id}
            onClick={filterCustomer}
            style={{ width: "25%" }}
            className="order-body-para"
          >
            {each.date} - {each.time}
          </p>

          <p
            id={each._id}
            onClick={filterCustomer}
            className="order-body-para"
            style={{ textTransform: "capitalize", width: "18%" }}
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

          <p
            className="order-body-para1"
            style={
              each.progress === "Active"
                ? {
                    width: "6.5vw",

                    color: "#FFA000",
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "end",
                  }
                : each.progress === "In Progress"
                ? {
                    width: "6.5vw",
                    color: "#6759FF",

                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "center",
                  }
                : each.progress === "Completed"
                ? {
                    width: "6.5vw",
                    color: "#519C66",

                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "center",
                  }
                : each.progress === "cancel" && {
                    width: "6.5vw",
                    color: "#FF0000",
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "center",
                  }
            }
          >
            {each.progress}
          </p>
        </div>
      );
    }

    if (
      each.vendorName !== "empty" &&
      each.driverName1 !== "empty" &&
      each.driverName2 === "empty" &&
      each.progress === "Completed"
    ) {
      return (
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-evenly",
            alignItem: "center",
          }}
          key={`${each._id}${uuidV4()}`}
          className="order-body-header2"
        >
          {/**all orders booked by the user sorted based on the date */}
          <div
            style={{ background: "green", width: "2%" }}
            className="vender-assigned-or-not"
          ></div>

          <p
            style={{ left: "4%", background: "green" }}
            className="vendor-assign-check"
          >
            Driver2 Not Assigned
          </p>

          <p
            style={{ textTransform: "capitalize", width: "18%" }}
            id={each._id}
            onClick={filterCustomer}
            className="order-body-para"
          >
            {each.name}
          </p>
          <p
            id={each._id}
            onClick={filterCustomer}
            style={{ width: "25%" }}
            className="order-body-para"
          >
            {each.date} - {each.time}
          </p>

          <p
            id={each._id}
            onClick={filterCustomer}
            className="order-body-para"
            style={{ textTransform: "capitalize", width: "18%" }}
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

          <p
            className="order-body-para1"
            style={
              each.progress === "Active"
                ? {
                    width: "6.5vw",

                    color: "#FFA000",
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : each.progress === "In Progress"
                ? {
                    width: "6.5vw",
                    color: "#6759FF",

                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "center",
                  }
                : each.progress === "Completed"
                ? {
                    color: "#519C66",
                    width: "6.5vw",

                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "center",
                  }
                : each.progress === "cancel" && {
                    width: "6.5vw",
                    color: "#FF0000",

                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "center",
                  }
            }
          >
            {each.progress}
          </p>
        </div>
      );
    }

    if (
      each.vendorName === "empty" &&
      each.driverName1 !== "empty" &&
      each.driverName2 === "empty" &&
      each.progress !== "Completed"
    ) {
      return (
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-evenly",
            alignItem: "center",
          }}
          key={`${each._id}${uuidV4()}`}
          className="order-body-header2"
        >
          {/**all orders booked by the user sorted based on the date */}
          <div style={{ width: "2%" }} className="vender-assigned-or-not"></div>

          <p style={{ left: "4%" }} className="vendor-assign-check">
            Vendor Not Assigned
          </p>

          <p
            style={{ textTransform: "capitalize", width: "18%" }}
            id={each._id}
            onClick={filterCustomer}
            className="order-body-para"
          >
            {each.name}
          </p>
          <p
            id={each._id}
            onClick={filterCustomer}
            style={{ width: "25%" }}
            className="order-body-para"
          >
            {each.date} - {each.time}
          </p>

          <p
            id={each._id}
            onClick={filterCustomer}
            className="order-body-para"
            style={{ textTransform: "capitalize", width: "18%" }}
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

          <p
            className="order-body-para1"
            style={
              each.progress === "Active"
                ? {
                    width: "6.5vw",

                    color: "#FFA000",
                    borderRadius: "10px",
                    textTransform: "capitalize",
                  }
                : each.progress === "In Progress"
                ? {
                    width: "6.5vw",
                    color: "#6759FF",

                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "start",
                  }
                : each.progress === "Completed"
                ? {
                    width: "6.5vw",
                    color: "#519C66",

                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "start",
                  }
                : each.progress === "cancel" && {
                    width: "6.5vw",
                    color: "#FF0000",

                    borderRadius: "10px",
                    textTransform: "capitalize",
                    textAlign: "start",
                  }
            }
          >
            {each.progress}
          </p>
        </div>
      );
    }
  };

  const handlePresentRequests = () => {
    let obtainedPresentRequests = allorders.filter((order) => {
      let orderDate = new Date(order.orderBookDate);
      let selectedDate = new Date();

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
      {showDate && <Caland />}
      {showAddVendor && <ModalAssginVendor />}
      {showAddDriver && <ModalAssignDriver />}
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
              <h6 style={{ color: "#53545c", fontSize: ".8rem" }}>
                Orders Id : {selectedCustomer[0]._id}
              </h6>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "20%",
                  marginLeft: "15%",
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
                          fontSize: "1vw",
                          padding: ".2rem .4rem",
                          backgroundColor: "#FFA00025",
                          color: "#FFA000",
                          borderRadius: "10px",
                          textTransform: "capitalize",
                        }
                      : selectedCustomer[0].progress === "In Progress"
                      ? {
                          padding: ".2rem .4rem",
                          fontSize: "1vw",

                          color: "#6759FF",
                          backgroundColor: "#6759FF25",
                          borderRadius: "10px",
                          textTransform: "capitalize",
                        }
                      : selectedCustomer[0].progress === "Completed"
                      ? {
                          padding: ".2rem .4rem",
                          fontSize: "1vw",
                          color: "#519C66",
                          backgroundColor: "#519C6625",
                          borderRadius: "10px",
                          textTransform: "capitalize",
                        }
                      : selectedCustomer[0].progress === "cancel" && {
                          padding: ".2rem .4rem",
                          fontSize: "1vw",
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
                  width: "35%",
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

                {selectedCustomer[0].driverName1 === "empty" &&
                selectedCustomer[0].driverName2 === "empty" &&
                selectedCustomer[0].progress !== "Completed"
                  ? selectedCustomer[0].vendorName !== "empty" && (
                      <button
                        onClick={() => {
                          setshowAddDriver(!showAddDriver);
                        }}
                        className="assign-vendor"
                        type="button"
                      >
                        Assign Driver 1
                      </button>
                    )
                  : selectedCustomer[0].vendorName !== "empty" &&
                    selectedCustomer[0].driverName1 !== "empty" &&
                    selectedCustomer[0].driverName2 === "empty" &&
                    selectedCustomer[0].progress !== "Completed" && (
                      <button
                        onClick={() => {
                          setshowAddDriver(!showAddDriver);
                        }}
                        className="assign-vendor"
                        style={{ backgroundColor: "#F50000" }}
                        type="button"
                      >
                        Change Driver 1
                      </button>
                    )}

                {selectedCustomer[0].driverName2 === "empty" &&
                selectedCustomer[0].progress === "Completed" &&
                selectedCustomer[0].driverName1 !== "empty"
                  ? selectedCustomer[0].vendorName !== "empty" && (
                      <button
                        onClick={() => {
                          setshowAddDriver(!showAddDriver);
                        }}
                        className="assign-vendor"
                        type="button"
                      >
                        Assign Driver 2
                      </button>
                    )
                  : selectedCustomer[0].vendorName !== "empty" &&
                    selectedCustomer[0].driverName1 !== "empty" &&
                    selectedCustomer[0].driverName2 !== "empty" &&
                    selectedCustomer[0].progress === "Completed" && (
                      <button
                        onClick={() => {
                          setshowAddDriver(!showAddDriver);
                        }}
                        className="assign-vendor"
                        style={{ backgroundColor: "#F50000" }}
                        type="button"
                      >
                        Change Driver 2
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
                    fontSize: "1rem",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          {selectedCustomer === "" ? (
            allorders.length > 0 && (
              <>
                <div className="order-summary-view">
                  {/**Count of active inprogress completed and cancel orders, booked by the users  */}
                  <div
                    style={{ position: "relative" }}
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
                          bottom: "40%",
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
                          bottom: "40%",
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
                          bottom: "40%",
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
                          bottom: "40%",
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
                        bottom: "23%",
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
                          bottom: "10%",
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
                          bottom: "10%",
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
                          bottom: "10%",
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
                          bottom: "10%",
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
                        bottom: "23%",
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
                          bottom: "10%",
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
                          bottom: "10%",
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
                          bottom: "10%",
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
                          bottom: "10%",
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
                        bottom: "23%",
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
                          bottom: "10%",
                          left: "52%",
                          color: "green",
                          fontSize: "1.2vw",
                        }}
                      >
                        {parseInt(count.completed) / 1000} K
                      </p>
                    ) : count.completed > 100000 &&
                      count.completed < 1000000 ? (
                      <p
                        style={{
                          position: "absolute",
                          bottom: "10%",
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
                          bottom: "10%",
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
                          bottom: "10%",
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
                        bottom: "23%",
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
                          bottom: "10%",
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
                          bottom: "10%",
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
                          bottom: "10%",
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
                          bottom: "10%",
                          left: "80%",
                          color: "#FF0000",
                          fontSize: "1.2vw",
                        }}
                      >
                        {count.cancel}
                      </p>
                    )}
                  </div>
                  <div
                    style={{ position: "relative" }}
                    className="summary-view1"
                  >
                    <p style={{ marginLeft: "2%", marginBottom: 0 }}>
                      New Orders
                    </p>
                    {selectedDate.id !== "Present" ? (
                      <div
                        style={{
                          height: "80%",
                          overflowY: "scroll",
                          overflowX: "hidden",
                        }}
                      >
                        {filterdAllOrders.length > 0 ? (
                          filterdAllOrders.map((each) =>
                            handleNewRequests(each)
                          )
                        ) : (
                          <div className="order-body-header4">
                            <img src="/noresult.png" className="noresult" />
                            <h1>No Orders</h1>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        style={{
                          height: "80%",
                          overflowY: "scroll",
                          overflowX: "hidden",
                        }}
                      >
                        <div className="order-body-header4">
                          <img src="/noresult.png" className="noresult" />
                          <h1>No Orders</h1>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
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
                    top: "52%",
                    left: "5%",
                    color: "#45464E",
                    fontSize: "0.9vw",
                    width: "90%",
                  }}
                >
                  {selectedCustomer[0].address.dono} -
                  {selectedCustomer[0].address.landmark}
                  {selectedCustomer[0].location}
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
                    bottom: "50%",
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
                    bottom: "35%",
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
                <div>
                  <input
                    value={searchedCustomer}
                    onChange={(e) => {
                      setSearchedCustomer(e.target.value);
                    }}
                    style={{
                      outline: "none",
                      fontSize: "1vw",
                    }}
                    type="search"
                    placeholder="Search Customer"
                  />
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
                  <strong>Filter :</strong>
                  <button
                    style={{
                      borderRadius: "5px",
                      marginLeft: "10px",
                      fontSize: "1vw",
                      padding: ".2rem .3rem",
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
                      padding: ".2rem .3rem",
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
                      padding: ".2rem .3rem",
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
                      padding: ".2rem .3rem",
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
                <p style={{ width: "14%" }} className="order-body-para">
                  Customer Name
                </p>
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
              {selectedDate.id !== "Present" ? (
                filterdAllOrders.length > 0 ? (
                  filterdAllOrders.map((each) => handelVendorDriverEmpty(each))
                ) : (
                  <div className="order-body-header4">
                    <img src="/noresult.png" className="noresult" />
                    <h1>No Such Customer</h1>
                  </div>
                )
              ) : (
                filterPresentOrders.length > 0 &&
                filterPresentOrders.map((each) => (
                  <div
                    style={{ position: "relative" }}
                    key={`${each._id}${uuidV4()}`}
                    className="order-body-header2"
                  >
                    {/**all orders booked by the user sorted based on the date */}
                    <div
                      style={{
                        paddingBottom: "2%",
                        background: "#fff",
                        color: "red",
                        fontWeight: "bold",
                      }}
                      className="vender-assigned-or-not"
                    ></div>

                    <p className="vendor-assign-check">Order Cancled</p>

                    <p
                      style={{ textTransform: "capitalize", width: "14%" }}
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
                      style={{ textTransform: "capitalize", width: "14%" }}
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
                      className="order-body-para1"
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
                              textAlign: "start",
                            }
                          : each.progress === "Completed"
                          ? {
                              color: "#519C66",
                              backgroundColor: "#519C6625",
                              borderRadius: "10px",
                              textTransform: "capitalize",
                              textAlign: "start",
                            }
                          : each.progress === "cancel" && {
                              color: "#FF0000",
                              backgroundColor: "#FF000025",
                              borderRadius: "10px",
                              textTransform: "capitalize",
                              textAlign: "start",
                            }
                      }
                    >
                      {each.progress}
                    </p>
                  </div>
                ))
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
                <p style={{ textTransform: "capitalize" }}>
                  Type Of Wash :
                  <span style={{ color: "#6759FF", marginLeft: ".5rem" }}>
                    {selectedCustomer[0].service}
                  </span>
                </p>
              </div>
              <div className="order-body-header1">
                <div className="order-body-para">Image</div>
                <p className="order-body-para">Item Type</p>
                <p className="order-body-para">Category</p>
                <p className="order-body-para">Unique Id</p>
                <p className="order-body-para">Upload Image</p>
                <p className="order-body-para">Unit Price</p>
              </div>
              {items.map((each) => (
                <div
                  key={`${each.id}${uuidV4()}`}
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
                  <p
                    style={{
                      textTransform: "capitalize",
                    }}
                    className="order-body-para"
                  >
                    {each.uniqueId.id.slice(0, 7)}
                  </p>
                  <div style={{ position: "relative" }} className="order-para2">
                    {each.uniqueId?.image === undefined ? (
                      <>
                        <LuImagePlus
                          style={{ fontSize: "1.35rem", marginRight: "20%" }}
                          id="file"
                          itemId={each.id}
                          uniqueId={each.uniqueId.id}
                          onClick={() => {
                            handleIconClick();
                            setItem(each.id);
                            setUnique(each.uniqueId.id);
                          }}
                          htmlFor="file-upload"
                        />
                        <input
                          itemId={each.id}
                          uniqueId={each.uniqueId.id}
                          type="file"
                          id="file-upload"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                          className="order-body-img"
                        />
                      </>
                    ) : (
                      <img className="user-img" src={each.uniqueId.image} />
                    )}
                  </div>

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
                    Total : ₹
                    {parseInt(selectedCustomer[0].totalAmount) / 100000} L
                  </h6>
                ) : selectedCustomer[0].totalAmount > 1000000 ? (
                  <h6 style={{ marginLeft: "82%" }}>
                    Total : ₹
                    {parseInt(selectedCustomer[0].totalAmount) / 1000000} M
                  </h6>
                ) : (
                  <h6 style={{ marginLeft: "81%", fontSize: ".9rem" }}>
                    Total : ₹ {selectedCustomer[0].totalAmount}
                  </h6>
                )}
              </div>
            </div>
          )}
        </section>
      )}
    </>
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
      <h2>No Orders Yet</h2>
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
  );
};
export default Orders;
