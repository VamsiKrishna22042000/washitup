import { useEffect, useState } from "react";
import "./addCoupon.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCoupon = (props) => {
  const { typeOfWashing, items, dataTobeSent, success } = props;

  const [total, setTotal] = useState("");
  {
    /**state to store total of all the items*/
  }

  const [discount, setDiscount] = useState(0);
  {
    /**state to store discount*/
  }

  const [couponCode, setCouponCode] = useState("");
  {
    /**state to store the coupon code */
  }

  const [loadCelebration, setCelebration] = useState(false);

  {
    /**Function used to book the laundry by passing the itemsSelected, typeofWash,userForm */
  }
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

  {
    /**Function used to apply the coupon and get the discount of the coupon and update the state of the discount */
  }
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

  {
    /**useEffect used to get the total price of all the items selected by the user before mounting */
  }
  useEffect(() => {
    let totalPrice = 0;
    items.map((each) => (totalPrice = totalPrice + each.price * each.count));
    setTotal(totalPrice);
  }, []);

  return (
    <div className="login-book-service-coupon">
      {/**Used to load the celebrate animation for 3s after applying coupon*/}
      {loadCelebration && (
        <img className="celebration" src="/celebration.gif" alt="Celebration" />
      )}
      {/**Discount box used to show that the discount is available or not */}{" "}
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
      {/**box used to show all the items selected but user for laundry along with count and price of each item */}
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
                textOverflow: "ellipsis",
                display: "-webkit-box", // Display as a flexible box
                WebkitLineClamp: 1, // Limit to 1 line
                WebkitBoxOrient: "vertical", // Display vertically
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
                textOverflow: "ellipsis",
                lineClamp: 1,
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
                textOverflow: "ellipsis",
                lineClamp: 1,
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
        {/**Total price before discount and after discount */}{" "}
        {discount === 0 ? (
          <>
            <p
              style={{
                margin: 0,
                height: "1vh",
                position: "absolute",
                fontWeight: "bold",
              }}
            >
              Total
            </p>
            <p
              style={{
                margin: 0,
                height: "1vh",
                position: "absolute",
                right: "10%",
                fontWeight: "bold",
              }}
            >
              ₹ {total}
            </p>
          </>
        ) : (
          <>
            <p
              style={{
                margin: 0,
                height: "1vh",
                position: "absolute",
                fontWeight: "bold",
              }}
            >
              Sub Total
            </p>
            <p
              style={{
                margin: 0,
                height: "1vh",
                position: "absolute",
                right: "10%",
                fontWeight: "bold",
              }}
            >
              ₹ {total}
            </p>
            <p
              style={{
                margin: 0,
                height: "1vh",
                position: "absolute",
                left: "0%",
                fontWeight: "bold",
                marginTop: "15%",
                color: "green",
              }}
            >
              Total
            </p>
            <p
              style={{
                margin: 0,
                height: "1vh",
                position: "absolute",
                right: "10%",
                fontWeight: "bold",
                marginTop: "15%",
                color: "green",
              }}
            >
              ₹ {total - discount}
            </p>
          </>
        )}
      </div>
      {/**Button used to book the laundry hits the setToWashing Function*/}
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
