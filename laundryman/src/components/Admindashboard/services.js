import "./admin.css";

import { TailSpin } from "react-loader-spinner";

import { useState, useEffect } from "react";

import { AiOutlinePlus } from "react-icons/ai";

const Services = () => {
  const [items, setClothesStore] = useState([]);

  useEffect(() => {
    getTheCategories();
  }, []);

  /** Getting all the category of clothes */
  const getTheCategories = async () => {
    const url = `https://washitup.onrender.com/api/user/getAllCategories`;

    const response = await fetch(url);

    const data = await response.json();

    if (response.ok) {
      const obtainedData = data.data.map((each) => ({
        ...each,
        count: 0,
        imgUrl: "/Men-shirt.png",
      }));

      console.log(obtainedData);
      setClothesStore(obtainedData);
    }
  };

  return items.length > 0 ? (
    <section className="order-body">
      <div className="order-summary-head">
        <h6 style={{ color: "#53545c" }}>Services</h6>

        <button className="assign-vendor" type="button">
          <AiOutlinePlus />
          Add New Item
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
              src="/profile2.png"
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
            Total Customers
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
            {items.length}
          </p>
        </div>
      </div>

      <div className="order-summary-body">
        <div className="order-body-header">
          <h6 style={{ margin: 0 }}>List Of Items</h6>
        </div>
        <div className="order-body-header1">
          <div className="order-body-para">Image</div>
          <p className="order-body-para">Item Name</p>
          <p className="order-body-para">Category</p>
          <p className="order-body-para">Unit Price</p>
        </div>
        {items.map((each) => (
          <div key={each.id} className="order-body-header2">
            <div className="order-body-para">
              <img
                style={{ height: "100%", width: "16%" }}
                src="/Men-shirt.png"
                alt={each.name}
              />
            </div>

            <p
              style={{ textTransform: "capitalize" }}
              className="order-body-para"
            >
              {each.name}
            </p>
            <p
              style={{ textTransform: "capitalize" }}
              className="order-body-para"
            >
              {each.category}
            </p>
            <p className="order-body-para">₹ {each.price}</p>
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
  );
};

export default Services;
