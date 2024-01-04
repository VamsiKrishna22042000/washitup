import { useState, useEffect } from "react";
import "./washingB.css";

import Cookies from "js-cookie";

import Banners from "../Banners/banners";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddClothesBSec from "../AddClothesB/addClothesB.js";

{
  /**Second componet in the main box to select type of wash that a user want */
}

const WashingB = (props) => {
  const { callBackForTypeOfWashing, toReorder, typing } = props;

  const [total, setTotal] = useState(0);

  const [selectedType, setselectedType] = useState("wash & fold");

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([]);
  }, [selectedType]);

  const userLogged = Cookies.get("jwt_userId");

  const getItems = (obtained) => {
    setItems(obtained.itemss);
    setTotal(obtained.total);
  };

  const [showModalAlert, setModalAlert] = useState(false);
  const [modalWashingAlert, setAlertWashing] = useState("");
  const [modalAlert, setShowModalAlert] = useState(false);

  const ShowAlert = () => {
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#22222250",
            zIndex: 1,
            borderRadius: "1rem",
          }}
        ></div>
        <div className="alert">
          <p>
            Selected items will be deleted, only one type of wash can be used at
            a time.
          </p>
          <div>
            <button
              onClick={() => {
                setModalAlert(false);
              }}
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setModalAlert(false);
                setselectedType(modalWashingAlert);
                typing(modalWashingAlert);
              }}
              type="button"
            >
              Continue
            </button>
          </div>
        </div>
      </>
    );
  };

  const ShowModalAlert = () => {
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#22222250",
            borderRadius: "1rem",
            zIndex: 2,
          }}
        ></div>

        <div className="alertClassB">
          <p>Would You like to select more items !</p>
          <div>
            <button
              onClick={() => {
                setShowModalAlert(false);
              }}
              type="button"
            >
              Add
            </button>
            <button
              onClick={() => {
                setShowModalAlert(false);
                callBackForTypeOfWashing({ typeofWash: selectedType, items });
              }}
              type="button"
            >
              Continue to order
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      style={{ paddingTop: ".5%" }}
      className="type-of-wash-continue-andAddItems"
    >
      <ToastContainer />
      {userLogged !== undefined && (
        <p className="reorder-animate-B">Repeat Previous Order ❯</p>
      )}

      {userLogged !== undefined && (
        <img
          style={{ cursor: "pointer" }}
          onClick={() => {
            toReorder();
          }}
          className="reorder-button-B"
          src="/reorder.png"
          alt="reorder"
        />
      )}

      {showModalAlert && <ShowAlert />}
      {modalAlert && <ShowModalAlert />}

      <Banners />
      <div className="addCloths-con">
        <div className="type-of-wash-con-addClothes">
          <button
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => {
              if (total === 0) {
                setItems([]);
                setselectedType("wash & fold");
                typing("wash & fold");
              } else {
                setModalAlert(true);
                setAlertWashing("wash & fold");
              }
            }}
            className={
              selectedType === "wash & fold"
                ? "type-of-button-addClothes1"
                : "type-of-button-addClothes"
            }
          >
            <img className="type-of-image" src="/wash&fold.png" />
            {selectedType === "wash & fold" && (
              <img
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  height: "15%",
                  width: "15%",
                }}
                src="/selected.png"
                alt="seleceted"
              />
            )}
            Wash & Fold
          </button>
          <button
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => {
              if (total === 0) {
                setItems([]);
                setselectedType("wash & iron");
                typing("wash & iron");
              } else {
                setModalAlert(true);
                setAlertWashing("wash & iron");
              }
            }}
            className={
              selectedType === "wash & iron"
                ? "type-of-button-addClothes1"
                : "type-of-button-addClothes"
            }
          >
            <img className="type-of-image" src="/wash&iron.png" />{" "}
            {selectedType === "wash & iron" && (
              <img
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  height: "15%",
                  width: "15%",
                }}
                src="/selected.png"
                alt="seleceted"
              />
            )}
            Wash & Iron
          </button>
          <button
            onClick={() => {
              if (total === 0) {
                setItems([]);
                setselectedType("dry Cleaning");
                typing("dry Cleaning");
              } else {
                setModalAlert(true);
                setAlertWashing("dry Cleaning");
              }
            }}
            style={{ position: "relative", cursor: "pointer" }}
            className={
              selectedType === "dry Cleaning"
                ? "type-of-button-addClothes1"
                : "type-of-button-addClothes"
            }
          >
            <img className="type-of-image" src="/drycleaning.png" />{" "}
            {selectedType === "dry Cleaning" && (
              <img
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  height: "15%",
                  width: "15%",
                }}
                src="/selected.png"
                alt="seleceted"
              />
            )}
            Dry Cleaning
          </button>
        </div>
        <div className="typeof-clothes-toadd">
          <AddClothesBSec typeOfWashing={selectedType} getItems={getItems} />
          {items.length > 0 ? (
            <button
              onClick={() => {
                if (parseInt(total) <= 0) {
                  toast.error("Select Clothes To Wash", {
                    autoClose: 2000,
                    pauseOnHover: true,
                    closeOnClick: true,
                    position: "top-center",
                    theme: "colored",
                  });
                } else if (parseInt(total) < 270) {
                  toast.error("Please Order Above 270", {
                    autoClose: 2000,
                    pauseOnHover: true,
                    closeOnClick: true,
                    position: "top-center",
                    theme: "colored",
                  });
                } else if (parseInt(total) >= 270) {
                  setShowModalAlert(true);
                }
              }}
              className="type-of-wash-continue-addClothes2"
            >
              <span>
                {items.length} - Items | ₹ {total} - Total
              </span>
              &nbsp;&nbsp; Continue ❯
            </button>
          ) : (
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log(total);
                console.log(typeof total);

                if (parseInt(total) <= 0) {
                  console.log("hi");
                  toast.error("Select Clothes To Wash", {
                    autoClose: 2000,
                    pauseOnHover: true,
                    closeOnClick: true,
                    position: "top-center",
                    theme: "colored",
                  });
                } else if (parseInt(total) < 270) {
                  toast.error("Order value should be 270 or above", {
                    autoClose: 2000,
                    pauseOnHover: true,
                    closeOnClick: true,
                    position: "top-center",
                    theme: "colored",
                  });
                } else if (parseInt(total) >= 270) {
                  setShowModalAlert(true);
                }
              }}
              className="type-of-wash-continue-addClothes1"
            >
              Continue ❯
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WashingB;
