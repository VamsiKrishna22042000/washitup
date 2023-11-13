import { useState } from "react";
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

  const userLogged = Cookies.get("jwt_userId");

  const getItems = (obtained) => {
    setItems(obtained.itemss);
    setTotal(obtained.total);
  };

  return (
    <div className="type-of-wash-continue-andAddItems">
      <ToastContainer />
      {userLogged !== undefined && (
        <img
          style={{ cursor: "pointer" }}
          onClick={() => {
            toReorder();
          }}
          className="reorder-button"
          src="/reorder.png"
          alt="reorder"
        />
      )}
      <Banners />
      <div className="addCloths-con">
        <div className="type-of-wash-con-addClothes">
          <button
            style={{ position: "relative" }}
            onClick={() => {
              setItems([]);
              setselectedType("wash & fold");
              typing("wash & fold");
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
                src="/selected2.gif"
                alt="seleceted"
              />
            )}
            Wash & Fold
          </button>
          <button
            style={{ position: "relative" }}
            onClick={() => {
              setItems([]);
              setselectedType("wash & iron");
              typing("wash & iron");
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
                src="/selected2.gif"
                alt="seleceted"
              />
            )}
            Wash & Iron
          </button>
          <button
            onClick={() => {
              setItems([]);
              setselectedType("dry Cleaning");
              typing("dry Cleaning");
            }}
            style={{ position: "relative" }}
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
                src="/selected2.gif"
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
                if (items.length <= 0) {
                  toast.error("Select Clothes To Wash", {
                    autoClose: 2000,
                    pauseOnHover: true,
                    closeOnClick: true,
                    position: "top-center",
                    theme: "colored",
                  });
                } else {
                  callBackForTypeOfWashing({ typeofWash: selectedType, items });
                }
              }}
              className="type-of-wash-continue-addClothes"
            >
              <span>
                {items.length} - Items | ₹ {total} - Total
              </span>
              &nbsp; Continue ➜
            </button>
          ) : (
            <button
              onClick={() => {
                if (items.length <= 0) {
                  toast.error("Select Clothes To Wash", {
                    autoClose: 2000,
                    pauseOnHover: true,
                    closeOnClick: true,
                    position: "top-center",
                    theme: "colored",
                  });
                } else {
                  callBackForTypeOfWashing({ typeofWash: selectedType, items });
                }
              }}
              className="type-of-wash-continue-addClothes"
            >
              Continue ➜
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WashingB;
