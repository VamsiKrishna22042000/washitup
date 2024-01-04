import "./myorders.css";

import Cookies from "js-cookie";

import axios from "axios";

import { useState, useEffect } from "react";

import { IoMdAlert } from "react-icons/io";

import { IoStarOutline } from "react-icons/io5";
import { IoStar } from "react-icons/io5";

import { VscCheckAll } from "react-icons/vsc";

import { TailSpin } from "react-loader-spinner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOrders = () => {
  const [myorders, setMyOrders] = useState([]);

  const [load, setLoad] = useState(true);

  const [filterdItems, setfilterItems] = useState([]);

  const [totalamount, setTotalAmount] = useState(0);

  const [showSupport, setShowSupport] = useState(false);

  const [showChangePickUpDate, setChangePickUpDate] = useState(true);
  const [showNavBar, setShowNavBar] = useState(false);

  const [showDate, setShowDate] = useState(false);

  const [orderId, setOrderId] = useState("");

  const [status, setStatus] = useState("");
  const [ratingBox, setRatingBox] = useState({
    orderId: "",
    qualityrating: 0,
    packrating: 0,
    deliveryboyrating: 0,
    deliveryspeedrating: 0,
  });

  useEffect(() => {
    getMyOrders();
  }, []);

  const timeArray = [
    {
      id: 1,
      time: "10 am",
    },
    {
      id: 2,
      time: "12 pm",
    },
    {
      id: 3,
      time: "2 pm",
    },
    {
      id: 4,
      time: "4 pm",
    },
    {
      id: 5,
      time: "6 pm",
    },
  ];

  const [selectedData, setSelectedData] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const [loadingFilter, setfilterloadingItems] = useState(true);

  useEffect(() => {
    const min = new Date();
    min.setDate(min.getDate() + 1);

    const max = new Date();
    max.setDate(max.getDate() + 7);

    const minFormatted =
      min.getFullYear() +
      "-" +
      (min.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      min.getDate().toString().padStart(2, "0");

    const maxFormatted =
      max.getFullYear() +
      "-" +
      (max.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      max.getDate().toString().padStart(2, "0");

    setMin(minFormatted);
    setMax(maxFormatted);
    setSelectedData(minFormatted);
  }, []);

  const ModalBoxItems = () => {
    const handlePickUpChange = async () => {
      if (selectedData === "") {
        toast.error("Select Date", {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (selectedTime === "") {
        toast.error("Select Time", {
          position: "top-center",
          autoClose: 1000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else {
        try {
          setfilterloadingItems(false);
          setChangePickUpDate(false);

          let dateArray = selectedData.split("-");
          let dateString = dateArray.reverse().join("-");

          let date = new Date(dateString);

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
          const formattedDate = `${m}-${d}-${yyyy}`;

          const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/user/changeOrderDate`;

          const user_JWT = Cookies.get("jwt_userToken");
          const reqConfigure = {
            method: "PUT",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user_JWT}`,
            },
            body: JSON.stringify({
              orderId,
              date: formattedDate,
              time: selectedTime,
            }),
          };

          console.log(formattedDate);

          const res = await fetch(url, reqConfigure);

          if (res.ok) {
            toast.success(`Changed Pick Up Date`, {
              position: "top-center",
              autoClose: 2000,
              closeOnClick: true,
              pauseOnHover: true,
              theme: "colored",
            });
            setTimeout(() => {
              setSelectedTime("");
              setChangePickUpDate(true);
              setfilterItems([]);
              window.location.reload();
            }, 2000);
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

    return (
      <>
        <ToastContainer />
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#33333350",
            zIndex: 20,
          }}
        ></div>
        <div style={{ zIndex: 20 }} className="modal">
          <div className="items-modalbox-con">
            {!showDate && (
              <button
                onClick={() => {
                  setShowSupport(true);
                  setfilterItems([]);
                }}
                className="support-button"
                type="button"
              >
                Customer Support
              </button>
            )}
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
              <h4 style={{ margin: 0 }}>
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
              </h4>

              {showChangePickUpDate &&
                status === "Active" &&
                (!showDate ? (
                  <button
                    onClick={() => {
                      setShowDate(true);
                    }}
                    className="pick-up-time"
                    type="button"
                  >
                    Change Pick Up
                  </button>
                ) : (
                  <div className="date-time-pickup">
                    <input
                      value={selectedData}
                      onChange={(e) => {
                        setSelectedData(e.target.value);
                      }}
                      type="date"
                      min={min}
                      max={max}
                    />
                    <select
                      value={selectedTime}
                      onChange={(e) => {
                        setSelectedTime(e.target.value);
                      }}
                    >
                      <option>Select</option>
                      {timeArray.map((each) => (
                        <option id={each.id}>{each.time}</option>
                      ))}
                    </select>
                    <button onClick={handlePickUpChange} type="button">
                      Conform
                    </button>
                  </div>
                ))}

              <h4 className="header-6">
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
              </h4>
            </div>
            <div className="myorder-body-header1">
              <div className="myorder-body-para">Image</div>
              <p className="myorder-body-para">Item Type</p>
              <p className="myorder-body-para">Category</p>
              <p className="myorder-body-para">Unit Price</p>
              <p className="myorder-body-para">Quantity</p>
              <p className="myorder-body-para">Item Total</p>
            </div>
            {loadingFilter ? (
              filterdItems.map((each) => (
                <li key={each.id} className="myorder-body-header2">
                  <div className="myorder-body-para">
                    <img
                      id="orderimg"
                      src={each.itemId.image}
                      alt={each.itemId.name}
                    />
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
                </li>
              ))
            ) : (
              <div
                style={{
                  height: "55%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TailSpin height={50} width={50} color={"#6759ff"} />
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  const SupportBox = () => {
    const [load, setLoad] = useState(false);

    const [issues, setIssues] = useState(() => {
      return [];
    });

    const [issueCreate, setIssueCreate] = useState({
      selectedIssue: "",
      describedIssue: "",
    });

    useEffect(() => {
      getIssues();
    }, []);

    const getIssues = async () => {
      const userToken = Cookies.get("jwt_userToken");
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getIssueByOrderId/${orderId}`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      };

      const res = await axios.get(url, { headers });

      if (res.status === 200) {
        /*console.log(JSON.stringify(res.data.data));*/

        if (JSON.stringify(res.data.data) === "null") {
          setIssues([]);
        } else {
          setIssues(res.data.data.issue);
        }
      }
      setLoad(true);
    };

    const createIssuesUpload = async () => {
      if (issueCreate.selectedIssue === "") {
        toast.error(`Select Issue`, {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else if (issueCreate.describedIssue === "") {
        toast.error(`Describe Issue`, {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      } else {
        try {
          setLoad(false);
          const userToken = Cookies.get("jwt_userToken");
          const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/orderIssue`;

          const reqConfigure = {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
              orderId: orderId,
              issue: {
                issueType: issueCreate.selectedIssue,
                describeIssue: issueCreate.describedIssue,
              },
            }),
          };
          const res = await fetch(url, reqConfigure);

          if (res.ok) {
            toast.success("Issue Created", {
              position: "top-center",
              autoClose: 2000,
              closeOnClick: true,
              pauseOnHover: true,
              theme: "colored",
            });
            setIssueCreate({
              selectedIssue: "",
              describedIssue: "",
            });
            setTimeout(() => {
              setShowSupport(false);
              setLoad(true);
              getMyOrders();
            }, 1000);
          }
        } catch (error) {
          toast.error(`${error}`, {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
        }
      }
    };

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
            zIndex: "20",
          }}
        ></div>
        <div className="modal">
          <ToastContainer />
          {load ? (
            <>
              <div style={{ zIndex: "20" }} className="support-modalbox-con">
                {issues.length === 0 ? (
                  <div>
                    <img src="./no-orders.gif" />
                    <h3>No Issues Yet</h3>
                  </div>
                ) : (
                  <div id="issues">
                    {issues.length > 0 &&
                      issues.map((each) => (
                        <div className="issue-box">
                          {each.status === "Active" ? (
                            <IoMdAlert color="red" />
                          ) : (
                            <VscCheckAll color="green" />
                          )}
                          <p>Issue Type : {each.issueType}</p>
                          <p>Described Issue : {each.describeIssue}</p>
                        </div>
                      ))}
                  </div>
                )}
                <div>
                  <h4>Customer Support </h4>
                  <p>Select Issue</p>
                  <select
                    onChange={(e) => {
                      if (e.target.value === "Select") {
                        setIssueCreate({
                          ...issueCreate,
                          selectedIssue: "",
                        });
                      } else {
                        setIssueCreate({
                          ...issueCreate,
                          selectedIssue: e.target.value,
                        });
                      }
                    }}
                    value={issueCreate.selectedIssue}
                  >
                    <option>Select</option>
                    <option>Cancel Order</option>
                    <option>Issue Related To Order</option>
                    <option>Other</option>
                  </select>
                  <p>Please describe about the issue</p>
                  <textarea
                    onChange={(e) => {
                      setIssueCreate({
                        ...issueCreate,
                        describedIssue: e.target.value,
                      });
                    }}
                    value={issueCreate.describedIssue}
                  ></textarea>
                  <div>
                    <button
                      style={{ backgroundColor: "#22222250" }}
                      onClick={() => {
                        setShowSupport(false);
                      }}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={createIssuesUpload}
                      style={{ backgroundColor: "green" }}
                      type="button"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
              }}
            >
              <TailSpin height={50} width={50} color="#6759ff" />
            </div>
          )}
        </div>
      </>
    );
  };

  const ShowRatingBox = () => {
    const [loadRate, setLoadRate] = useState(false);

    const postRating = async () => {
      if (ratingBox.qualityrating === 0) {
        toast.error("Please Add Rating for order quality", {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          position: "top-center",
          theme: "colored",
        });
      } else if (ratingBox.deliveryspeedrating === 0) {
        toast.error("Please Add Rating for delivery speed", {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          position: "top-center",
          theme: "colored",
        });
      } else if (ratingBox.packrating === 0) {
        toast.error("Please Add Rating for packing", {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          position: "top-center",
          theme: "colored",
        });
      } else if (ratingBox.deliveryboyrating === 0) {
        toast.error("Please Add Rating for delivery boy", {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          position: "top-center",
          theme: "colored",
        });
      } else {
        setLoadRate(true);
        const userToken = Cookies.get("jwt_userToken");
        const url = `${
          process.env.REACT_APP_ROOT_URL
        }/api/user/addRating/${Cookies.get("jwt_adminId")}`;

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        };

        const body = {
          orderId: ratingBox.orderId,
          qualityRating: ratingBox.qualityrating,
          packageRating: ratingBox.packrating,
          deliveryboyRating: ratingBox.deliveryboyrating,
          deliveryspeedRating: ratingBox.deliveryspeedrating,
        };

        const res = await axios.post(url, body, headers);

        if (res.status === 200) {
          toast.success("Rating Added Successfully", {
            autoClose: 2000,
            pauseOnHover: true,
            closeOnClick: true,
            position: "top-center",
            theme: "colored",
          });
          setRatingBox({ ...ratingBox, orderId: "" });
          window.location.reload();
        }
      }
    };

    return (
      <>
        <ToastContainer style={{ width: "auto" }} />
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#33333350",
            zIndex: 20,
          }}
        ></div>
        {loadRate ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="rating-box"
          >
            <TailSpin color="#6759ff" height={50} width={50} />
          </div>
        ) : (
          <div className="rating-box">
            <button
              id="cancle-button"
              onClick={() => {
                setRatingBox({ ...ratingBox, orderId: "" });
              }}
              type="button"
            >
              ×
            </button>
            <h3>Review Service</h3>
            <div className="review-service">
              <h3>How was the order quality ?</h3>
              {ratingBox.qualityrating === 0 ? (
                <>
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 1 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 2 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.qualityrating === 1 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 1 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 2 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.qualityrating === 2 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 1 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 2 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.qualityrating === 3 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 1 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 2 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.qualityrating === 4 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 1 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 2 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 3 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, qualityrating: 5 });
                    }}
                  />
                </>
              ) : (
                ratingBox.qualityrating === 5 && (
                  <>
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, qualityrating: 1 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, qualityrating: 2 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, qualityrating: 3 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, qualityrating: 4 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, qualityrating: 5 });
                      }}
                    />
                  </>
                )
              )}
            </div>
            <div className="review-service">
              <h3>How was the delivery speed ?</h3>
              {ratingBox.deliveryspeedrating === 0 ? (
                <>
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 1 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 2 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.deliveryspeedrating === 1 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 1 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 2 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.deliveryspeedrating === 2 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 1 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 2 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.deliveryspeedrating === 3 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 1 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 2 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.deliveryspeedrating === 4 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 1 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 2 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 3 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryspeedrating: 5 });
                    }}
                  />
                </>
              ) : (
                ratingBox.deliveryspeedrating === 5 && (
                  <>
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, deliveryspeedrating: 1 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, deliveryspeedrating: 2 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, deliveryspeedrating: 3 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, deliveryspeedrating: 4 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, deliveryspeedrating: 5 });
                      }}
                    />
                  </>
                )
              )}
            </div>
            <div className="review-service">
              <h3>How was the packing ?</h3>

              {ratingBox.packrating === 0 ? (
                <>
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 1 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 2 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.packrating === 1 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 1 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 2 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.packrating === 2 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 1 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 2 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.packrating === 3 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 1 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 2 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.packrating === 4 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 1 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 2 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 3 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, packrating: 5 });
                    }}
                  />
                </>
              ) : (
                ratingBox.packrating === 5 && (
                  <>
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, packrating: 1 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, packrating: 2 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, packrating: 3 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, packrating: 4 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, packrating: 5 });
                      }}
                    />
                  </>
                )
              )}
            </div>
            <div className="review-service">
              <h3>Rate the delivery boy!</h3>

              {ratingBox.deliveryboyrating === 0 ? (
                <>
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 1 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 2 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.deliveryboyrating === 1 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 1 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 2 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.deliveryboyrating === 2 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 1 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 2 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.deliveryboyrating === 3 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 1 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 2 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 3 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 5 });
                    }}
                  />
                </>
              ) : ratingBox.deliveryboyrating === 4 ? (
                <>
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 1 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 2 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 3 });
                    }}
                  />
                  <IoStar
                    style={{
                      color: "yellow",
                    }}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 4 });
                    }}
                  />
                  <IoStarOutline
                    onClick={() => {
                      setRatingBox({ ...ratingBox, deliveryboyrating: 5 });
                    }}
                  />
                </>
              ) : (
                ratingBox.deliveryboyrating === 5 && (
                  <>
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, deliveryboyrating: 1 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, deliveryboyrating: 2 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, deliveryboyrating: 3 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, deliveryboyrating: 4 });
                      }}
                    />
                    <IoStar
                      style={{
                        color: "yellow",
                      }}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, deliveryboyrating: 5 });
                      }}
                    />
                  </>
                )
              )}
            </div>
            <button onClick={postRating} id="review-button" type="button">
              Submit
            </button>
          </div>
        )}
      </>
    );
  };

  const getMyOrders = async () => {
    try {
      const userId = Cookies.get("jwt_userId");
      const userToken = Cookies.get("jwt_userToken");

      const url = `${process.env.REACT_APP_ROOT_URL}/api/user/getMyOrders/${userId}`;

      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${userToken}` },
      };

      const response = await fetch(url, options);

      const data = await response.json();

      if (response.ok) {
        /*console.log(data.Orders.orders);*/
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

  const seperateItems = (e) => {
    let seperatedOrder = myorders.filter((each) => each._id === e.target.id);

    let service = seperatedOrder[0].service;
    setTotalAmount(seperatedOrder[0].totalAmount);

    setOrderId(seperatedOrder[0]._id);

    setStatus(seperatedOrder[0].progress);

    let sep = seperatedOrder[0].items.map((each) => ({
      ...each,
      price:
        service === "dry Cleaning"
          ? each.itemId.drycleaning
          : service === "wash & fold"
          ? each.itemId.washfold
          : each.itemId.washiron,
    }));

    const today = new Date();

    const orderData = new Date(
      seperatedOrder[0].date.split("-").reverse().join("-")
    );

    const time =
      seperatedOrder[0].time === "10 am"
        ? 10
        : seperatedOrder[0].time === "12 pm"
        ? 12
        : seperatedOrder[0].time === "2 pm"
        ? 14
        : seperatedOrder[0].time === "4 pm"
        ? 16
        : seperatedOrder[0].time === "6 pm" && 18;

    const todayhour = today.getHours();

    today <= orderData
      ? today < orderData
        ? setChangePickUpDate(true)
        : todayhour > time
        ? setChangePickUpDate(false)
        : setChangePickUpDate(true)
      : setChangePickUpDate(false);

    setfilterItems(sep);
    setShowDate(false);
  };

  const [mainStarAnimation, setAnimation] = useState(0);

  useEffect(() => {
    if (
      ratingBox.orderId === "" &&
      filterdItems.length === 0 &&
      showSupport === false
    ) {
      setTimeout(() => {
        if (mainStarAnimation === 0) {
          setAnimation(mainStarAnimation + 1);
        } else if (mainStarAnimation === 1) {
          setAnimation(mainStarAnimation + 1);
        } else if (mainStarAnimation === 2) {
          setAnimation(mainStarAnimation + 1);
        } else if (mainStarAnimation === 3) {
          setAnimation(mainStarAnimation + 1);
        } else if (mainStarAnimation === 4) {
          setAnimation(mainStarAnimation + 1);
        } else if (mainStarAnimation === 5) {
          setAnimation(0);
        }
      }, 1000);
    }
  }, [mainStarAnimation]);

  const navcontentshamberger = () => {
    setShowNavBar(!showNavBar);
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
        {showSupport && <SupportBox />}
        {ratingBox.orderId !== "" && <ShowRatingBox />}
        <div
          style={{
            position: "fixed",
            backgroundColor: "#ffffff",
            zIndex: "10",
          }}
          className="bar-nav naving"
          bg="#b8dde3"
          variant="light"
        >
          <div className="nav-bar-contents">
            <img
              style={{
                cursor: "pointer",
                marginRight: "28%",
              }}
              onClick={() => {
                window.location.href = "/";
              }}
              href="#logo"
              src="./washituplogo.png"
              alt="Main Logo"
            />
            <p
              onClick={() => {
                window.location.href = "/";
              }}
              className="home"
            >
              Home
            </p>
            <p
              onClick={() => {
                window.location.href = "/about";
              }}
            >
              About Us
            </p>
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
              <button
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => {
                  Cookies.remove("jwt_userToken");
                  Cookies.remove("jwt_userId");
                  Cookies.remove("jwt_userName");
                  Cookies.remove("jwt_mobileNumber");
                  // Cookies.remove("jwt_adminLogin");
                  Cookies.remove("jwt_dono");
                  Cookies.remove("jwt_landmark");
                  Cookies.remove("jwt_location");
                  window.location.href = "/";
                }}
              >
                Log Out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/userlogin";
                }}
              >
                Log In
              </button>
            )}
          </div>
          {showNavBar && (
            <div
              style={{ backgroundColor: "white" }}
              id="nav-bar-id"
              className={
                showNavBar
                  ? "nav-bar-contents-mobile"
                  : "nav-bar-contents-mobile1"
              }
            >
              <button
                onClick={navcontentshamberger}
                className="cross-mark-nav-bar"
              >
                ✖
              </button>
              <img
                style={{ visibility: "hidden" }}
                onClick={() => {
                  window.location.href = "/";
                }}
                href="#logo"
                src="./washituplogo.png"
                alt="Main Logo"
              />
              <p
                onClick={() => {
                  window.location.href = "/";
                }}
                className="home"
              >
                Home
              </p>
              <p
                onClick={() => {
                  window.location.href = "/about";
                }}
              >
                About Us
              </p>
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
                <button
                  style={{ cursor: "pointer" }}
                  type="button"
                  onClick={() => {
                    Cookies.remove("jwt_userToken");
                    Cookies.remove("jwt_userId");
                    Cookies.remove("jwt_userName");
                    Cookies.remove("jwt_mobileNumber");
                    // Cookies.remove("jwt_adminLogin");
                    Cookies.remove("jwt_dono");
                    Cookies.remove("jwt_landmark");
                    Cookies.remove("jwt_location");
                    window.location.href = "/";
                  }}
                >
                  Log Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/userlogin";
                  }}
                >
                  Log In
                </button>
              )}
            </div>
          )}
          {showNavBar && (
            <div
              onClick={navcontentshamberger}
              style={{
                position: "fixed",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "#22222250",
                zIndex: 4,
              }}
            ></div>
          )}
          <div className="hamburger-icon">
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
        {myorders.length > 0 ? (
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
              {myorders.map((each) =>
                each.progress !== "Completed" ? (
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
                      Delivery Date :{" "}
                      <span
                        id={each._id}
                        onClick={seperateItems}
                        style={{ textTransform: "capitalize" }}
                        className="span-el"
                      >
                        {each.deliveryDate}
                      </span>
                    </p>
                    <p id={each._id} onClick={seperateItems}>
                      Service Type :{" "}
                      <span
                        id={each._id}
                        onClick={seperateItems}
                        style={{ textTransform: "capitalize" }}
                        className="span-el"
                      >
                        {each.service}
                      </span>
                    </p>
                    {each.service === "dry Cleaning" ? (
                      <img
                        id={each._id}
                        onClick={seperateItems}
                        className="service-image"
                        src="/drycleaning.png"
                        alt="Dry Cleaning"
                      />
                    ) : each.service === "wash & iron" ? (
                      <img
                        id={each._id}
                        onClick={seperateItems}
                        className="service-image"
                        src="/wash&iron.png"
                        alt="wash & iron"
                      />
                    ) : (
                      <img
                        id={each._id}
                        onClick={seperateItems}
                        className="service-image"
                        src="/wash&fold.png"
                        alt="wash&fold"
                      />
                    )}
                    <p id={each._id} onClick={seperateItems} className="amount">
                      Total - {"  "}
                      <span
                        id={each._id}
                        onClick={seperateItems}
                        style={{ color: "green" }}
                      >
                        ₹ {each.totalAmount}
                      </span>
                    </p>
                  </div>
                ) : each?.packageRating !== undefined &&
                  each?.qualityRating !== undefined &&
                  each.deliveryboyRating !== undefined &&
                  each.deliveryspeedRating !== undefined ? (
                  <div
                    onClick={seperateItems}
                    id={each._id}
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
                        onClick={seperateItems}
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
                        onClick={seperateItems}
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
                        onClick={seperateItems}
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
                        onClick={seperateItems}
                      ></div>
                    )}
                    <p id={each._id}>Id : {each._id}</p>
                    {each.progress === "Active" ? (
                      <p
                        id={each._id}
                        className="status"
                        style={{ color: "green" }}
                        onClick={seperateItems}
                      >
                        Order Placed
                      </p>
                    ) : each.progress === "Completed" ? (
                      <p
                        id={each._id}
                        className="status"
                        style={{ color: "orange" }}
                        onClick={seperateItems}
                      >
                        Washing Completed
                      </p>
                    ) : each.progress === "cancel" ? (
                      <p
                        id={each._id}
                        className="status"
                        style={{ color: "red" }}
                        onClick={seperateItems}
                      >
                        Order Canceled
                      </p>
                    ) : (
                      <p
                        id={each._id}
                        className="status"
                        style={{ color: "#6759ff" }}
                        onClick={seperateItems}
                      >
                        Washing In Progress
                      </p>
                    )}
                    <p onClick={seperateItems} id={each._id}>
                      Items :{" "}
                      <span id={each._id} className="span-el">
                        {each.items.length}
                      </span>
                    </p>
                    <p onClick={seperateItems} id={each._id}>
                      Date & Time :{" "}
                      <span id={each._id} className="span-el">
                        {each.date} - {each.time}
                      </span>
                    </p>
                    <p onClick={seperateItems} id={each._id}>
                      Delivery Date :{" "}
                      <span
                        id={each._id}
                        style={{ textTransform: "capitalize" }}
                        className="span-el"
                      >
                        {each.deliveryDate}
                      </span>
                    </p>
                    <p onClick={seperateItems} id={each._id}>
                      Service Type :{" "}
                      <span
                        id={each._id}
                        style={{ textTransform: "capitalize" }}
                        className="span-el"
                      >
                        {each.service}
                      </span>
                    </p>
                    {each.service === "dry Cleaning" ? (
                      <img
                        onClick={seperateItems}
                        id={each._id}
                        className="service-image"
                        src="/drycleaning.png"
                        alt="Dry Cleaning"
                      />
                    ) : each.service === "wash & iron" ? (
                      <img
                        onClick={seperateItems}
                        id={each._id}
                        className="service-image"
                        src="/wash&iron.png"
                        alt="wash & iron"
                      />
                    ) : (
                      <img
                        onClick={seperateItems}
                        id={each._id}
                        className="service-image"
                        src="/wash&fold.png"
                        alt="wash&fold"
                      />
                    )}
                    <p onClick={seperateItems} id={each._id} className="amount">
                      Total -
                      <span id={each._id} style={{ color: "green" }}>
                        ₹ {each.totalAmount}
                      </span>
                    </p>
                    <div
                      onClick={seperateItems}
                      id={each._id}
                      className="rating-main"
                    >
                      {Math.ceil(
                        (each?.packageRating +
                          each?.qualityRating +
                          each.deliveryboyRating +
                          each.deliveryspeedRating) /
                          4
                      ) === 0 ? (
                        <div className="rating-order-1">
                          <p onClick={seperateItems} id={each._id}>
                            Your Rating
                          </p>
                          <IoStarOutline
                            onClick={seperateItems}
                            id={each._id}
                          />
                          <IoStarOutline
                            onClick={seperateItems}
                            id={each._id}
                          />
                          <IoStarOutline
                            onClick={seperateItems}
                            id={each._id}
                          />
                          <IoStarOutline
                            onClick={seperateItems}
                            id={each._id}
                          />
                          <IoStarOutline
                            onClick={seperateItems}
                            id={each._id}
                          />
                        </div>
                      ) : Math.ceil(
                          (each?.packageRating +
                            each?.qualityRating +
                            each.deliveryboyRating +
                            each.deliveryspeedRating) /
                            4
                        ) === 1 ? (
                        <div className="rating-order-1">
                          <p onClick={seperateItems} id={each._id}>
                            Your Rating
                          </p>
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                            onClick={seperateItems}
                            id={each._id}
                          />
                          <IoStarOutline
                            onClick={seperateItems}
                            id={each._id}
                          />
                          <IoStarOutline
                            onClick={seperateItems}
                            id={each._id}
                          />
                          <IoStarOutline
                            onClick={seperateItems}
                            id={each._id}
                          />
                          <IoStarOutline
                            onClick={seperateItems}
                            id={each._id}
                          />
                        </div>
                      ) : Math.ceil(
                          (each?.packageRating +
                            each?.qualityRating +
                            each.deliveryboyRating +
                            each.deliveryspeedRating) /
                            4
                        ) === 2 ? (
                        <div className="rating-order-1">
                          <p onClick={seperateItems} id={each._id}>
                            Your Rating
                          </p>
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                            onClick={seperateItems}
                            id={each._id}
                          />
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStarOutline />
                          <IoStarOutline />
                          <IoStarOutline />
                        </div>
                      ) : Math.ceil(
                          (each?.packageRating +
                            each?.qualityRating +
                            each.deliveryboyRating +
                            each.deliveryspeedRating) /
                            4
                        ) === 3 ? (
                        <div className="rating-order-1">
                          <p>Your Rating</p>
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStarOutline />
                          <IoStarOutline />
                        </div>
                      ) : Math.ceil(
                          (each?.packageRating +
                            each?.qualityRating +
                            each.deliveryboyRating +
                            each.deliveryspeedRating) /
                            4
                        ) === 4 ? (
                        <div className="rating-order-1">
                          <p>Your Rating</p>
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStarOutline />
                        </div>
                      ) : (
                        Math.ceil(
                          (each?.packageRating +
                            each?.qualityRating +
                            each.deliveryboyRating +
                            each.deliveryspeedRating) /
                            4
                        ) === 5 && (
                          <div className="rating-order-1">
                            <p>Your Rating</p>
                            <IoStar
                              style={{
                                color: "yellow",
                              }}
                            />
                            <IoStar
                              style={{
                                color: "yellow",
                              }}
                            />
                            <IoStar
                              style={{
                                color: "yellow",
                              }}
                            />
                            <IoStar
                              style={{
                                color: "yellow",
                              }}
                            />
                            <IoStar
                              style={{
                                color: "yellow",
                              }}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    id={each._id}
                    onClick={() => {
                      setRatingBox({ ...ratingBox, orderId: each._id });
                    }}
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
                    <p
                      id={each._id}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, orderId: each._id });
                      }}
                    >
                      Id : {each._id}
                    </p>
                    {each.progress === "Active" ? (
                      <p
                        id={each._id}
                        onClick={() => {
                          setRatingBox({ ...ratingBox, orderId: each._id });
                        }}
                        className="status"
                        style={{ color: "green" }}
                      >
                        Order Placed
                      </p>
                    ) : each.progress === "Completed" ? (
                      <p
                        id={each._id}
                        onClick={() => {
                          setRatingBox({ ...ratingBox, orderId: each._id });
                        }}
                        className="status"
                        style={{ color: "orange" }}
                      >
                        Washing Completed
                      </p>
                    ) : each.progress === "cancel" ? (
                      <p
                        id={each._id}
                        onClick={() => {
                          setRatingBox({ ...ratingBox, orderId: each._id });
                        }}
                        className="status"
                        style={{ color: "red" }}
                      >
                        Order Canceled
                      </p>
                    ) : (
                      <p
                        id={each._id}
                        onClick={() => {
                          setRatingBox({ ...ratingBox, orderId: each._id });
                        }}
                        className="status"
                        style={{ color: "#6759ff" }}
                      >
                        Washing In Progress
                      </p>
                    )}
                    <p
                      id={each._id}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, orderId: each._id });
                      }}
                    >
                      Items :{" "}
                      <span
                        id={each._id}
                        onClick={() => {
                          setRatingBox({ ...ratingBox, orderId: each._id });
                        }}
                        className="span-el"
                      >
                        {each.items.length}
                      </span>
                    </p>
                    <p
                      id={each._id}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, orderId: each._id });
                      }}
                    >
                      Date & Time :{" "}
                      <span
                        id={each._id}
                        onClick={() => {
                          setRatingBox({ ...ratingBox, orderId: each._id });
                        }}
                        className="span-el"
                      >
                        {each.date} - {each.time}
                      </span>
                    </p>
                    <p
                      id={each._id}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, orderId: each._id });
                      }}
                    >
                      Delivery Date :{" "}
                      <span
                        id={each._id}
                        onClick={() => {
                          setRatingBox({ ...ratingBox, orderId: each._id });
                        }}
                        style={{ textTransform: "capitalize" }}
                        className="span-el"
                      >
                        {each.deliveryDate}
                      </span>
                    </p>
                    <p
                      id={each._id}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, orderId: each._id });
                      }}
                    >
                      Service Type :{" "}
                      <span
                        id={each._id}
                        onClick={() => {
                          setRatingBox({ ...ratingBox, orderId: each._id });
                        }}
                        style={{ textTransform: "capitalize" }}
                        className="span-el"
                      >
                        {each.service}
                      </span>
                    </p>
                    {each.service === "dry Cleaning" ? (
                      <img
                        id={each._id}
                        onClick={() => {
                          setRatingBox({ ...ratingBox, orderId: each._id });
                        }}
                        className="service-image"
                        src="/drycleaning.png"
                        alt="Dry Cleaning"
                      />
                    ) : each.service === "wash & iron" ? (
                      <img
                        id={each._id}
                        onClick={() => {
                          setRatingBox({ ...ratingBox, orderId: each._id });
                        }}
                        className="service-image"
                        src="/wash&iron.png"
                        alt="wash & iron"
                      />
                    ) : (
                      <img
                        id={each._id}
                        onClick={() => {
                          setRatingBox({ ...ratingBox, orderId: each._id });
                        }}
                        className="service-image"
                        src="/wash&fold.png"
                        alt="wash&fold"
                      />
                    )}
                    <p
                      id={each._id}
                      onClick={() => {
                        setRatingBox({ ...ratingBox, orderId: each._id });
                      }}
                      className="amount"
                    >
                      Total - {"  "}
                      <span
                        id={each._id}
                        onClick={() => {
                          setRatingBox({ ...ratingBox, orderId: each._id });
                        }}
                        style={{ color: "green" }}
                      >
                        ₹ {each.totalAmount}
                      </span>
                    </p>
                    <div
                      onClick={() => {
                        setRatingBox({ ...ratingBox, orderId: each._id });
                      }}
                      className="rating-main"
                    >
                      {mainStarAnimation === 0 ? (
                        <div className="rating-order-1">
                          <p>Please Rate Our Service</p>
                          <IoStarOutline />
                          <IoStarOutline />
                          <IoStarOutline />
                          <IoStarOutline />
                          <IoStarOutline />
                        </div>
                      ) : mainStarAnimation === 1 ? (
                        <div className="rating-order-1">
                          <p>Please Rate Our Service</p>
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStarOutline />
                          <IoStarOutline />
                          <IoStarOutline />
                          <IoStarOutline />
                        </div>
                      ) : mainStarAnimation === 2 ? (
                        <div className="rating-order-1">
                          <p>Please Rate Our Service</p>
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStarOutline />
                          <IoStarOutline />
                          <IoStarOutline />
                        </div>
                      ) : mainStarAnimation === 3 ? (
                        <div className="rating-order-1">
                          <p>Please Rate Our Service</p>
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStarOutline />
                          <IoStarOutline />
                        </div>
                      ) : mainStarAnimation === 4 ? (
                        <div className="rating-order-1">
                          <p>Please Rate Our Service</p>
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStar
                            style={{
                              color: "yellow",
                            }}
                          />
                          <IoStarOutline />
                        </div>
                      ) : (
                        mainStarAnimation === 5 && (
                          <div className="rating-order-1">
                            <p>Please Rate Our Service</p>
                            <IoStar
                              style={{
                                color: "yellow",
                              }}
                            />
                            <IoStar
                              style={{
                                color: "yellow",
                              }}
                            />
                            <IoStar
                              style={{
                                color: "yellow",
                              }}
                            />
                            <IoStar
                              style={{
                                color: "yellow",
                              }}
                            />
                            <IoStar
                              style={{
                                color: "yellow",
                              }}
                            />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="no-orders">
            <img src="./no-orders.gif" />
            <h3>No Orders Booked Yet</h3>
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              type="button"
            >
              Back To HomePage
            </button>
          </div>
        )}
      </>
    );
  }
};

export default MyOrders;
