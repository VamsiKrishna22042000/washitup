import "./admin.css";

import { useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";

const customers = [
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
  {
    imgUrl: "/profile2.png",
    name: "Surendra Singh Chadra chatarjee Surendra Singh Chadra chatarjee",
    number: "7013858623",
    address:
      "H.No. 4-7-18/B, Besides Maruti Suzuki Show room New Raghavendra Nagar, Nacharam, Hyderabad,Sri Venkateswara Boys Hostel",
    location:
      "10-6-15, Ram Nagar Rd, Nehru Nagar, Ram Nagar, Visakhapatnam, Andhra Pradesh 530002, India",
  },
];

const Customers = () => {
  const [progress, setProgress] = useState("Active");

  return (
    <section className="order-body">
      <div className="order-summary-head">
        <h6 style={{ color: "#53545c" }}>Customers Summary</h6>
        <button className="assign-vendor" type="button">
          <AiOutlinePlus />
          Add a New Customer
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
          <div className="order-body-para"></div>
          <p className="order-body-para">Customer Name</p>
          <p className="order-body-para">Mobile Number</p>
          <p className="order-body-para">Address</p>
          <p className="order-body-para">Location</p>
        </div>
        {customers.map((each) => (
          <div className="order-body-header2">
            <div style={{ position: "relative" }} className="order-body-para">
              <img
                style={{
                  height: "100%",
                  width: "15%",
                  position: "absolute",
                  left: "35%",
                }}
                src={each.imgUrl}
                alt={each.productName}
              />
            </div>
            <p className="order-body-para">{each.name}</p>
            <p className="order-body-para">+91 - {each.number}</p>
            <p className="order-body-para">{each.address}</p>
            <p className="order-body-para">{each.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Customers;
