import "./admin.css";

import { AiOutlinePlus } from "react-icons/ai";

const customers = [
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
  {
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    date: "31 Aug 2023 - 01:35 pm",
    id: "31 Aug 2023 - 01:35 pm",
    price: "₹2,220.00",
    action: "Completed",
    status: "Completed",
  },
];

const Orders = () => {
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
          <p className="order-body-para">Action</p>
          <p className="order-body-para">Status</p>
        </div>
        {customers.map((each) => (
          <div className="order-body-header2">
            <p className="order-body-para">{each.name}</p>
            <p className="order-body-para">{each.date}</p>
            <p className="order-body-para">{each.id}</p>
            <p className="order-body-para">{each.price}</p>
            <p className="order-body-para">{each.action}</p>
            <p className="order-body-para">{each.status}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Orders;
