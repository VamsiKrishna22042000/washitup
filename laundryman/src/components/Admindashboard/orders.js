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

const Orders = () => {
  const [progress, setProgress] = useState("Active");

  return (
    <section className="order-body">
      <div className="order-summary-head">
        <h6 style={{ color: "#53545c" }}>Orders Summary</h6>
        <button className="create-new-order" type="button">
          <AiOutlinePlus />
          Create New Order
        </button>
      </div>
      <div className="order-summary-view">
        <div className="summary-view">Vamsi</div>
        <div className="summary-view">Vamsi</div>
        <div className="summary-view">Vamsi</div>
      </div>
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
          <p style={{ backgroundColor: "white" }} className="order-body-select">
            Action
          </p>
          <p style={{ backgroundColor: "white" }} className="order-body-para1">
            Status
          </p>
        </div>
        {customers.map((each) => (
          <div className="order-body-header2">
            <p className="order-body-para">{each.name}</p>
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
    </section>
  );
};
export default Orders;
