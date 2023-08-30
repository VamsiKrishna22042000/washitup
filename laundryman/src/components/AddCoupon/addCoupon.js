import { useEffect, useState } from "react";
import "./addCoupon.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCoupon = (props) => {
  const { typeOfWashing, items, dataTobeSent, success } = props;

  const [total, setTotal] = useState("");

  const [discount, setDiscount] = useState(0);

  const [couponCode, setCouponCode] = useState("");

  const [loadCelebration, setCelebration] = useState(false);

  const setToWashing = async () => {
    let totalAmount = total - discount;
    const url = `${process.env.REACT_APP_ROOT_URL}/api/user/bookOrder`;

    const options = {
      method: "POST",

      headers: {
        "Content-Type": "Application/json",
      },

      body: JSON.stringify({
        ...dataTobeSent,
        totalAmount,
        service: typeOfWashing,
      }),
    };

    const response = await fetch(url, options);
    if (response.ok) {
      success();
    }
  };

  const applyCoupon = async () => {
    const url = "https://washitup.onrender.com/api/user/applyCoupon";

    const reqConfigure = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ couponCode: couponCode }),
    };

    const respone = await fetch(url, reqConfigure);

    const data = await respone.json();

    if (respone.ok) {
      setCelebration(true);
      toast.success("Coupon Applied", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
      setDiscount(data.data.discount);
      setTimeout(() => {
        setCelebration(false);
      }, 2000);
    } else {
      toast.error("Invalid Coupon Code", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    let totalPrice = 0;
    items.map((each) => (totalPrice = totalPrice + each.price * each.count));
    setTotal(totalPrice);
  }, []);

  return (
    <div className="login-book-service-coupon">
      {loadCelebration && (
        <img className="celebration" src="/celebration.gif" alt="Celebration" />
      )}
      {discount === 0 ? (
        total > 300 ? (
          <div className="apply-coupon-box">
            <ToastContainer />
            <input
              className="apply-coupon-input1"
              type="text"
              placeholder="Coupon Code"
              onChange={(e) => {
                setCouponCode(e.target.value);
              }}
            />
            <button
              onClick={applyCoupon}
              className="apply-coupon-button"
              type="button"
            >
              Apply
            </button>
          </div>
        ) : (
          <div className="apply-coupon-box">
            <ToastContainer />
            <div className="applied-box2">No Coupon available</div>
          </div>
        )
      ) : (
        <div className="apply-coupon-box">
          <ToastContainer />
          <div className="applied-box"> COUPON APPLIED</div>
          <img
            className="coupon-applied"
            src="/coupon.gif"
            alt="couponApplied"
          />
        </div>
      )}
      <div className="apply-coupon-box2">
        {items.map((each) => (
          <div className="items-con-coupon">
            <p
              style={{
                width: "33%",
                textTransform: "capitalize",
                textAlign: "start",
                padding: "0",
                overflow: "hidden",
              }}
            >
              {each.category} - {each.name}
            </p>
            <p
              style={{
                width: "33%",
                textTransform: "capitalize",
                textAlign: "center",
                padding: "0",
              }}
            >
              {each.count}
            </p>
            <p
              style={{
                width: "33%",
                textTransform: "capitalize",
                textAlign: "center",
                padding: "0",
              }}
            >
              ₹ {each.price}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "-5%", position: "relative" }}
        className="apply-coupon-box"
      >
        {discount === 0 ? (
          <p
            style={{
              margin: 0,
              height: "1vh",
              position: "absolute",
            }}
          >
            Total : ₹ {total}
          </p>
        ) : (
          <p
            style={{
              margin: 0,
              height: "1vh",
              position: "absolute",
              color: "green",
            }}
          >
            Total : ₹ {total - discount}
            <span
              style={{
                color: "#808080",
                textDecoration: "line-through",
                marginLeft: 8,
              }}
            >
              {total}
            </span>
          </p>
        )}
      </div>
      <button
        onClick={setToWashing}
        className="apply-coupon-button2"
        type="button"
      >
        Book
      </button>
    </div>
  );
};

export default AddCoupon;
