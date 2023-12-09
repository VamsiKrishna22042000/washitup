import { useEffect, useState, useRef } from "react";

import "./addCoupon.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReCAPTCHA from "react-google-recaptcha";

import { TailSpin, ThreeDots } from "react-loader-spinner";

const AddCoupon = (props) => {
  const { typeOfWashing, items, dataTobeSent, success } = props;

  /**console.log(typeOfWashing);
  console.log(items);
  console.log(dataTobeSent);
  console.log(success);*/

  const [siteRecapKey, setSiteRecapKey] = useState(
    `${process.env.REACT_APP_SITE_KEY}`
  );

  const recapRef = useRef("");

  const [total, setTotal] = useState(dataTobeSent.total);
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
        couponCode: couponCode.toUpperCase(),
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

  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  useEffect(() => {
    // Check if the component has not scrolled into view yet
    if (!hasScrolledIntoView) {
      // Scroll into view
      const homeElement = document.getElementById("coupon1");
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: "smooth" });
        // Update state to indicate that scrolling has been performed
        setHasScrolledIntoView(true);
      }
    }
  }, [hasScrolledIntoView]);

  /**  for safari browser  zoom**/
  // Get all input and textarea elements
  var inputFields = document.querySelectorAll("input, textarea");

  // Add an event listener to each input field
  inputFields.forEach(function (inputField) {
    inputField.addEventListener("focus", function () {
      // Set the zoom level to 1
      document.body.style.zoom = 1;
    });
  });

  /**For safari browser zoom */

  return (
    <>
      <div style={{ position: "absolute", top: 0 }} id="coupon1"></div>
      <ReCAPTCHA ref={recapRef} size="invisible" sitekey={siteRecapKey} />

      <div className="login-book-service-coupon-A">
        {/**Used to load the celebrate animation for 3s after applying coupon*/}
        {loadCelebration && (
          <img
            className="celebration-A"
            src="/celebration.gif"
            alt="Celebration"
          />
        )}
        {/**Discount box used to show that the discount is available or not */}{" "}
        {discount === 0 ? (
          total > 0 ? (
            <div className="apply-coupon-box-A">
              <ToastContainer />
              <input
                className="apply-coupon-input1-A"
                type="text"
                style={{ textTransform: "uppercase" }}
                placeholder="Enter Coupon"
                onChange={(e) => {
                  setCouponCode(e.target.value.toUpperCase());
                }}
              />
              {loadapply ? (
                <button
                  onClick={applyCoupon}
                  className="apply-coupon-button-A"
                  type="button"
                  style={{ backgroundColor: "#ffffff", marginLeft: "1%" }}
                >
                  <ThreeDots color="#6759ff" height={"30%"} width={"30%"} />
                </button>
              ) : (
                <button
                  onClick={applyCoupon}
                  className="apply-coupon-button-A"
                  type="button"
                >
                  Apply
                </button>
              )}
            </div>
          ) : (
            <div className="apply-coupon-box-A">
              <ToastContainer />
              <div className="applied-box2-A">No Coupon available</div>
            </div>
          )
        ) : (
          <div className="apply-coupon-box-A">
            <ToastContainer />
            <div className="applied-box-A"> COUPON APPLIED</div>
            <img
              className="coupon-applied-A"
              src="/coupon.gif"
              alt="couponApplied"
            />
          </div>
        )}
        {/**box used to show all the items selected but user for laundry along with count and price of each item */}
        <div className="apply-coupon-box2-A">
          {items.map((each) => (
            <div className="items-con-coupon-A">
              <p>
                <img
                  className="images-addCoupon"
                  src={each.image}
                  alt={each.name}
                />
                {each.category} - {each.name}
              </p>
              <p className="items-quantity">
                {each.count} x {each.price}
              </p>
              <p className="items-price">₹ {each.price * each.count}</p>
            </div>
          ))}
        </div>
        {/**Total price before discount and after discount */}{" "}
        {discount === 0 ? (
          <div
            style={{ marginTop: "-5%", position: "relative" }}
            className="apply-coupon-box-Ab"
          >
            <p>Total</p>
            <p className="font-total-A">₹ {total}</p>
          </div>
        ) : (
          <>
            <div
              style={{ marginTop: "-5%", position: "relative" }}
              className="apply-coupon-box-Ab"
            >
              <p>Sub Total</p>
              <p className="font-total-A">₹ {total}</p>
            </div>
            <div
              style={{ marginTop: "-5%", position: "relative" }}
              className="apply-coupon-box-Ab"
            >
              <p style={{ display: "block" }}>Total</p>
              <p className="font-total-A">₹ {total - discount}</p>
            </div>
          </>
        )}
        {/**Button used to book the laundry hits the setToWashing Function*/}
        {loadbutton ? (
          <button
            onClick={setToWashing}
            className="apply-coupon-button2-A"
            type="button"
          >
            <TailSpin color="#ffffff" height={23} width={23} />
          </button>
        ) : (
          <button
            onClick={setToWashing}
            className="apply-coupon-button2-A"
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
