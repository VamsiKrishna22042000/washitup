import { useState } from "react";
import "./admin.css";

import { AiOutlinePlus } from "react-icons/ai";

const customers = [
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: ["Active", "In Progress", "Completed"],
    status: "Completed",
  },
];

const details = [
  {
    imgUrl: "/Men-shirt.png",
    productName: "shirt",
    category: "men",
    price: 90,
    quantity: 3,
    orderTotal: 500,
  },
  {
    imgUrl: "/Men-shirt.png",
    productName: "shirt",
    category: "men",
    price: 90,
    quantity: 3,
    orderTotal: 700,
  },
  {
    imgUrl: "/Men-shirt.png",
    productName: "shirt",
    category: "men",
    price: 50,
    quantity: 3,
    orderTotal: 200,
  },
  {
    imgUrl: "/Men-shirt.png",
    productName: "shirt",
    category: "men",
    price: 66,
    quantity: 3,
    orderTotal: 900,
  },
  {
    imgUrl: "/Men-shirt.png",
    productName: "shirt",
    category: "men",
    price: 70,
    quantity: 3,
    orderTotal: 600,
  },
  {
    imgUrl: "/Men-shirt.png",
    productName: "shirt",
    category: "men",
    price: 80,
    quantity: 3,
    orderTotal: "$2500",
  },
  {
    imgUrl: "/Men-shirt.png",
    productName: "shirt",
    category: "men",
    price: 40,
    quantity: 3,
    orderTotal: "$2500",
  },
];

const Orders = () => {
  const [progress, setProgress] = useState("Active");

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [total, setTotal] = useState("7000");

  return (
    <section className="order-body">
      {selectedCustomer === "" ? (
        <div className="order-summary-head">
          <h6 style={{ color: "#53545c" }}>Orders Summary</h6>
          <button className="create-new-order" type="button">
            <AiOutlinePlus />
            Create New Order
          </button>
        </div>
      ) : (
        <div className="order-summary-head">
          <h6 style={{ color: "#53545c" }}>
            Orders Id : #98as7df87as8d97fg8a9sg
          </h6>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              width: "25%",
            }}
          >
            <button className="assign-vendor" type="button">
              Assign Vendor
            </button>
            <button
              style={{ backgroundColor: "#CC5F5F" }}
              className="assign-vendor"
              type="button"
            >
              Cancel Order
            </button>
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
        </div>
      )}
      {selectedCustomer === "" ? (
        <div className="order-summary-view">
          <div className="summary-view">Vamsi</div>
          <div className="summary-view">Vamsi</div>
          <div className="summary-view">Vamsi</div>
        </div>
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
              }}
            >
              Vamsi Krishna
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
              +91-7013858623
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
              }}
            >
              H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra
              Nagar, Nacharam, Hyderabad. Sri Venkateswara Boys Hostel
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
              style={{ outline: "none", fontSize: "1vw" }}
              type="search"
              placeholder="Search Customer"
            />
          </div>
          <div className="order-body-header1">
            <p className="order-body-para">Customer Name</p>
            <p className="order-body-para">Order Date</p>
            <p className="order-body-para">Order Id</p>
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
          {customers.map((each) => (
            <div className="order-body-header2">
              <p
                onClick={() => {
                  setSelectedCustomer(".");
                }}
                className="order-body-para"
              >
                {each.name}
              </p>
              <p className="order-body-para">{each.date}</p>
              <p className="order-body-para">{each.id}</p>
              <p className="order-body-para">{each.price}</p>
              <select
                onChange={(e) => {
                  setProgress(e.target.value);
                }}
                className="order-body-select"
              >
                {each.action.map((e) => (
                  <option>{e}</option>
                ))}
              </select>
              <p
                style={
                  progress === "Active"
                    ? {
                        backgroundColor: "#FF000025",
                        color: "#FF0000",
                        borderRadius: "10px",
                      }
                    : progress === "In Progress"
                    ? {
                        color: "#6759FF",
                        backgroundColor: "#6759FF25",
                        borderRadius: "10px",
                      }
                    : progress === "Completed" && {
                        color: "#519C66",
                        backgroundColor: "#519C6625",
                        borderRadius: "10px",
                      }
                }
                className="order-body-para1"
              >
                {progress}
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
                {details.length}
              </span>
            </h6>
            <input
              style={{ outline: "none", fontSize: "1vw" }}
              type="search"
              placeholder="Search Item"
            />
          </div>
          <div className="order-body-header1">
            <div className="order-body-para">Image</div>
            <p className="order-body-para">Item Type</p>
            <p className="order-body-para">Category</p>
            <p className="order-body-para">Unit Price</p>
            <p className="order-body-para">Quantity</p>
            <p className="order-body-para">Order Total</p>
          </div>
          {details.map((each) => (
            <div className="order-body-header2">
              <div className="order-body-para">
                <img
                  style={{ height: "100%", width: "16%" }}
                  src={each.imgUrl}
                  alt={each.productName}
                />
              </div>

              <p
                style={{ textTransform: "capitalize" }}
                className="order-body-para"
              >
                {each.productName}
              </p>
              <p
                style={{ textTransform: "capitalize" }}
                className="order-body-para"
              >
                {each.category}
              </p>
              <p className="order-body-para">₹ {each.price}</p>
              <p className="order-body-para">{each.quantity}</p>
              <p className="order-body-para">{each.price * each.quantity}</p>
            </div>
          ))}
          <div className="order-body-header">
            <h6 style={{ marginLeft: "80%" }}>Total : ₹ {total}</h6>
          </div>
        </div>
      )}
    </section>
  );
};
export default Orders;
