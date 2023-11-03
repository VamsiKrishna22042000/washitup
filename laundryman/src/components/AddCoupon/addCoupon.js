import { useEffect, useState, useRef } from "react";

import "./addCoupon.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReCAPTCHA from "react-google-recaptcha";

import { TailSpin, ThreeDots } from "react-loader-spinner";

const AddCoupon = (props) => {
  const { typeOfWashing, items, dataTobeSent, success } = props;

  console.log(typeOfWashing);
  console.log(items);
  console.log(dataTobeSent);
  console.log(success);

  const [siteRecapKey, setSiteRecapKey] = useState(
    `${process.env.REACT_APP_SITE_KEY}`
  );

  const recapRef = useRef("");

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

  const [loadbutton, setLoadButton] = useState(false);

  const [loadapply, setApply] = useState(false);

  {
    /**Function used to book the laundry by passing the itemsSelected, typeofWash,userForm */
  }
  const setToWashing = async () => {
    setLoadButton(true);

    const token = await recapRef.current.executeAsync();

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
        token,
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
    setApply(true);
    const url = `${process.env.REACT_APP_ROOT_URL}/api/user/applyCoupon`;

    const reqConfigure = {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        couponCode: couponCode,
        amount: total,
        mobileNumber: parseInt(dataTobeSent.mobileNumber),
      }),
    };

    const respone = await fetch(url, reqConfigure);

    const data = await respone.json();

    if (respone.ok) {
      setCelebration(true);
      setApply(false);
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
      setApply(false);
      toast.error(`${data.message}`, {
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
    <>
      <ReCAPTCHA ref={recapRef} size="invisible" sitekey={siteRecapKey} />

      <div className="login-book-service-coupon">
        {/**Used to load the celebrate animation for 3s after applying coupon*/}
        {loadCelebration && (
          <img
            className="celebration"
            src="/celebration.gif"
            alt="Celebration"
          />
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
              {loadapply ? (
                <button
                  onClick={applyCoupon}
                  className="apply-coupon-button"
                  type="button"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <ThreeDots color="#6759ff" height={"50%"} width={"50%"} />
                </button>
              ) : (
                <button
                  onClick={applyCoupon}
                  className="apply-coupon-button"
                  type="button"
                >
                  Apply
                </button>
              )}
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
                  textAlign: "end",
                  textOverflow: "ellipsis",
                  lineClamp: 1,
                }}
              >
                {each.count} x {each.price}
              </p>
              <p
                style={{
                  width: "33%",
                  textTransform: "capitalize",
                  textAlign: "start",
                  paddingLeft: "19%",
                  textOverflow: "ellipsis",
                  lineClamp: 1,
                }}
              >
                ₹ {each.price * each.count}
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
                className="font-total"
                style={{
                  margin: 0,
                  height: "1vh",
                  position: "absolute",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  color: "green",
                }}
              >
                Total
              </p>
              <p
                className="font-total"
                style={{
                  margin: 0,
                  height: "1vh",
                  position: "absolute",
                  right: "5%",
                  fontWeight: "bold",
                  color: "green",
                  fontFamily: "Arial",
                }}
              >
                ₹ {total}
              </p>
            </>
          ) : (
            <>
              <p
                className="font-total"
                style={{
                  margin: 0,
                  height: "1vh",
                  position: "absolute",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                }}
              >
                Sub Total
              </p>
              <p
                className="font-total"
                style={{
                  margin: 0,
                  height: "1vh",
                  position: "absolute",
                  right: "5%",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                }}
              >
                ₹ {total}
              </p>
              <p
                className="font-total"
                style={{
                  margin: 0,
                  height: "1vh",
                  position: "absolute",
                  left: "0%",
                  fontWeight: "bold",
                  marginTop: "15%",
                  color: "green",
                  fontFamily: "monospace",
                }}
              >
                Total
              </p>
              <p
                className="font-total"
                style={{
                  margin: 0,
                  height: "1vh",
                  position: "absolute",
                  right: "5%",
                  fontWeight: "bold",
                  marginTop: "15%",
                  color: "green",
                  fontFamily: "Arial",
                }}
              >
                ₹ {total - discount}
              </p>
            </>
          )}
        </div>
        {/**Button used to book the laundry hits the setToWashing Function*/}
        {loadbutton ? (
          <button
            onClick={setToWashing}
            className="apply-coupon-button2"
            type="button"
          >
            <TailSpin color="#ffffff" height={23} width={23} />
          </button>
        ) : (
          <button
            onClick={setToWashing}
            className="apply-coupon-button2"
            type="button"
          >
            Book
          </button>
        )}
      </div>
    </>
  );
};

export default AddCoupon;
