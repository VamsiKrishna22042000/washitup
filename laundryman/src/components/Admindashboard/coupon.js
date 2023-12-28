import { useState, useEffect } from "react";
import "./admin.css";

import Cookies from "js-cookie";

import { TailSpin } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";

import { AiOutlinePlus } from "react-icons/ai";

import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

const Coupons = () => {
  const [availableCoupons, setCoupons] = useState([]);

  const [deleteCoupon, setDeleteCoupon] = useState("");

  const [searchWithDiscount, setSearchDiscount] = useState("");

  const [addCoupon, setAddCoupon] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCoupons();
  }, []);

  const getAllCoupons = async () => {
    try {
      const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/coupon/getAllCoupon`;

      const headers = {
        Authorization: `Bearer ${Cookies.get("jwt_adminLogin")}`,
      };

      const response = await fetch(url, { headers });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setCoupons(data.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error(`${error}`, {
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const ShowDeleteModalBox = () => {
    const [load, setLoad] = useState(true);

    const deleteCouponFun = async () => {
      try {
        setLoad(false);

        const url = `${
          process.env.REACT_APP_ROOT_URL
        }/api/admin/coupon/deleteCoupon?couponId=${deleteCoupon}/${Cookies.get(
          "jwt_adminId"
        )}`;

        const reqConfigure = {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt_adminLogin")}`,
          },
        };

        const respone = await fetch(url, reqConfigure);

        if (respone.ok) {
          toast.error("Coupon Deleted", {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });

          setTimeout(() => {
            setDeleteCoupon("");
            getAllCoupons();
          }, 1000);
        }
      } catch (error) {
        toast.error(`${error}`, {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          position: "top-center",
          theme: "colored",
        });
      }
    };

    console.log(deleteCoupon);

    return (
      <>
        <ToastContainer />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#53545c99",
            zIndex: 2,
          }}
        ></div>
        {load ? (
          <div
            style={{ left: "45%", width: "30%", height: "25%" }}
            className="add-customer-modal-box"
          >
            <h2>Are You Sure You Want To Delete Coupon ?</h2>
            <div
              style={{
                width: "100%",
                height: "25%",
                marginTop: "5%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <button
                onClick={() => {
                  setDeleteCoupon("");
                }}
                type="button"
                style={{
                  borderRadius: "5px",
                  borderColor: "#6759ff",
                  color: "#fff",
                  backgroundColor: "#6759ff",
                }}
              >
                Cancel
              </button>
              <button
                onClick={deleteCouponFun}
                style={{
                  borderRadius: "5px",
                  borderColor: "red",
                  color: "#fff",
                  backgroundColor: "red",
                }}
                type="button"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              left: "45%",
              width: "30%",
              height: "25%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="add-customer-modal-box"
          >
            <TailSpin color="#6759ff" height={50} width={50} />
          </div>
        )}
      </>
    );
  };

  const ShowAddCouponModalBox = () => {
    const [load, setLoad] = useState(true);

    const [coupondetails, setCouponDetails] = useState({
      couponCode: "",
      discount: "",
      minimumPrice: "",
    });

    const addCouponFun = async () => {
      try {
        setLoad(false);
        const url = `${
          process.env.REACT_APP_ROOT_URL
        }/api/admin/addCoupon/${Cookies.get("jwt_adminId")}`;

        const reqConfigure = {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt_adminLogin")}`,
          },

          body: JSON.stringify({
            ...coupondetails,
            couponCode: coupondetails.couponCode.toUpperCase(),
          }),
        };

        const respone = await fetch(url, reqConfigure);

        if (respone.ok) {
          toast.success("Coupon Added", {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });

          setTimeout(() => {
            setAddCoupon(false);
            getAllCoupons();
          }, 1000);
        }
      } catch (error) {
        toast.error(`${error}`, {
          autoClose: 2000,
          pauseOnHover: true,
          closeOnClick: true,
          position: "top-center",
          theme: "colored",
        });
      }
    };

    return (
      <>
        <ToastContainer />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#53545c99",
            zIndex: 2,
          }}
        ></div>
        {load ? (
          <div
            style={{
              left: "41.5%",
              width: "30%",

              height: "45%",
            }}
            className="coupon-modal-box"
          >
            <h6 style={{ fontSize: "1rem", marginBottom: "1%" }}>
              Add Coupon Details
            </h6>
            <p style={{ marginTop: 5, marginBottom: 3 }}>Enter Coupon Code</p>
            <input
              onChange={(e) => {
                setCouponDetails((prevDe) => ({
                  ...prevDe,
                  couponCode: e.target.value,
                }));
              }}
              style={{
                marginTop: 3,
                marginBottom: 5,
                textTransform: "uppercase",
              }}
              type="text"
              placeholder="Enter Coupon Code"
            />
            <p style={{ marginTop: "5%", marginBottom: 3 }}>Enter Discount</p>
            <input
              onChange={(e) => {
                setCouponDetails((prevDe) => ({
                  ...prevDe,
                  discount: e.target.value.toUpperCase(),
                }));
              }}
              style={{ marginTop: 3 }}
              type="number"
              placeholder="Enter Discount"
            />
            <p style={{ marginTop: "5%", marginBottom: 2 }}>
              Enter Minium Price
            </p>
            <input
              onChange={(e) => {
                setCouponDetails((prevDe) => ({
                  ...prevDe,
                  minimumPrice: e.target.value,
                }));
              }}
              style={{ marginTop: 3 }}
              type="number"
              placeholder="Enter Minimum Price"
            />
            <div
              style={{
                width: "100%",
                height: "25%",
                marginTop: "4%",
                marginBottom: "5%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <button
                onClick={() => {
                  setAddCoupon(false);
                }}
                type="button"
                style={{
                  borderRadius: "5px",
                  borderColor: "#6759ff",
                  color: "#fff",
                  backgroundColor: "#6759ff",
                }}
              >
                Cancel
              </button>
              <button
                onClick={addCouponFun}
                style={{
                  borderRadius: "5px",
                  borderColor: "green",
                  color: "#fff",
                  backgroundColor: "green",
                }}
                type="button"
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              left: "41.5%",
              width: "30%",
              height: "45%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="coupon-modal-box"
          >
            <TailSpin color="#6759ff" height={50} width={50} />
          </div>
        )}
      </>
    );
  };

  const filterdCoupons = availableCoupons.filter((each) =>
    each.discount.toString().startsWith(searchWithDiscount)
  );

  const settingProgress = async (e) => {
    try {
      setLoading(true);

      const url = `${
        process.env.REACT_APP_ROOT_URL
      }/api/admin/coupon/changeStatus/${Cookies.get("jwt_adminId")}`;

      const reqConfigure = {
        method: "PUT",

        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${Cookies.get("jwt_adminLogin")}`,
        },

        body: JSON.stringify({
          id: e.target.id,
          status: e.target.value,
        }),
      };

      const respone = await fetch(url, reqConfigure);

      if (respone.ok) {
        getAllCoupons();
        setLoading(false);
      }
    } catch (error) {
      toast.error(`${error}`, {
        autoClose: 2000,
        pauseOnHover: true,
        closeOnClick: true,
        position: "top-center",
        theme: "colored",
      });
    }
  };

  return loading ? (
    <section
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="order-body"
    >
      <TailSpin color="#6759ff" height={50} width={50} />
    </section>
  ) : (
    <>
      <section className="order-body">
        <div className="order-summary-head">
          <h6 style={{ color: "#53545c" }}>Coupons</h6>
          <button
            onClick={() => {
              setAddCoupon(true);
            }}
            className="assign-vendor"
            type="button"
          >
            <AiOutlinePlus />
            Add New Coupon
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
                src="/coupon2.png"
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
              Total No Of Coupons
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
              {availableCoupons.length}
            </p>
          </div>
        </div>
        <div className="order-summary-body">
          <div className="order-body-header">
            <h6 style={{ margin: 0 }}>List Of Coupons</h6>
            <input
              style={{ outline: "none", fontSize: "1vw" }}
              type="search"
              placeholder="Search With Discount"
              onChange={(e) => {
                setSearchDiscount(e.target.value);
              }}
            />
          </div>
          <div className="order-body-header1">
            <div className="order-body-para"></div>
            <p className="order-body-para">Coupon Code</p>
            <p className="order-body-para">Minimum Price</p>
            <p className="order-body-para">Discount</p>
            <p className="order-body-para">Coupon Id</p>
            <p className="order-body-para">Action</p>
            <p className="order-body-para">Status</p>
            <div className="order-body-para"></div>
          </div>
          {filterdCoupons.length > 0 ? (
            filterdCoupons.map((each) => (
              <div key={each._id} className="order-body-header2">
                <div className="order-body-para">
                  <img
                    style={{ height: "100%", width: "20%" }}
                    src="/coupon2.png"
                    alt="Profile"
                  />
                </div>
                <p className="order-body-para">{each.couponCode}</p>
                <p className="order-body-para">₹ {each.minimumPrice}</p>
                <p className="order-body-para">₹{each.discount}</p>
                <p className="order-body-para">{each._id}</p>
                <select
                  id={each._id}
                  onChange={settingProgress}
                  className="order-body-para"
                  style={{ textTransform: "capitalize", outline: "none" }}
                >
                  {each.active.map((e) => (
                    <option
                      style={{ textTransform: "capitalize" }}
                      selected={each.status === e ? true : false}
                    >
                      {e}
                    </option>
                  ))}
                </select>
                <p
                  style={{
                    textTransform: "capitalize",
                    color: each.status === "Inactive" ? "red" : "green",
                  }}
                  className="order-body-para"
                >
                  {each.status}
                </p>
                <div id={each._id} className="order-body-para">
                  <MdDelete
                    onClick={() => {
                      setDeleteCoupon(each._id);
                    }}
                    id={each._id}
                    style={{ fontSize: "1.5vw" }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="order-body-header4">
              <img src="/noresult.png" className="noresult" />
              <h1>No Such Coupon</h1>
            </div>
          )}
        </div>
      </section>
      {deleteCoupon !== "" && <ShowDeleteModalBox />}
      {addCoupon && <ShowAddCouponModalBox />}
    </>
  );
};

export default Coupons;
