import { useEffect, useState, useRef } from "react";

import "./addCouponB.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Banners from "../Banners/banners.js";

import ReCAPTCHA from "react-google-recaptcha";

import { TailSpin, ThreeDots } from "react-loader-spinner";

const AddCouponB = (props) => {
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

  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  useEffect(() => {
    // Check if the component has not scrolled into view yet
    if (!hasScrolledIntoView) {
      // Scroll into view
      const homeElement = document.getElementById("home2");
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: "smooth" });
        // Update state to indicate that scrolling has been performed
        setHasScrolledIntoView(true);
      }
    }
  }, [hasScrolledIntoView]);

  return (
    <>
      <div style={{ position: "absolute", top: 0 }} id="home2"></div>
      <ReCAPTCHA ref={recapRef} size="invisible" sitekey={siteRecapKey} />

      <div className="login-book-service-coupon-B">
        <Banners />
        <div className="login-book-B">
          <div className="login-coupons-C">
            <p>
              <span>Name :</span> {dataTobeSent.name}
            </p>
            <p>
              <span>Mobile Number :</span> {dataTobeSent.mobileNumber}
            </p>
            <p>
              <span>Selected Date :</span> {dataTobeSent.date}
            </p>
            <p>
              <span>Selected Time :</span> {dataTobeSent.time}
            </p>
            <p>
              <span>Selected Location :</span> {dataTobeSent.location}
            </p>
            <p>
              <span>Selcted Do / Flat No & LandMark :</span>{" "}
              {dataTobeSent.address.dono} &nbsp; {dataTobeSent.address.landmark}
            </p>
          </div>
          <div className="login-coupons">
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
                <div className="apply-coupon-box-D">
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
                <div className="apply-coupon-box-D">
                  <ToastContainer />
                  <div className="applied-box2-D">No Coupon available</div>
                </div>
              )
            ) : (
              <div className="apply-coupon-box-D">
                <ToastContainer />
                <div className="applied-box-D"> COUPON APPLIED</div>
                <img
                  className="coupon-applied-D"
                  src="/coupon.gif"
                  alt="couponApplied"
                />
              </div>
            )}
            {/**box used to show all the items selected but user for laundry along with count and price of each item */}
            <div className="apply-coupon-box2-B">
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
                    <img
                      className="images-addCouponB"
                      src={each.image}
                      alt={each.name}
                    />
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
            <div className="apply-coupon-box-B">
              {/**Total price before discount and after discount */}
              {discount === 0 ? (
                <>
                  <p className="font-total-B">Total ₹ {total}</p>
                </>
              ) : (
                <>
                  <p className="font-total-B">Sub Total &nbsp;₹ {total}</p>
                  <p className="font-total-B">
                    Total &nbsp;₹ {total - discount}
                  </p>
                </>
              )}
            </div>
            {/**Button used to book the laundry hits the setToWashing Function*/}
            {loadbutton ? (
              <button className="apply-coupon-button2-B" type="button">
                <TailSpin color="#ffffff" height={20} width={20} />
              </button>
            ) : (
              <button
                onClick={setToWashing}
                className="apply-coupon-button2-B"
                type="button"
              >
                Book
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCouponB;
