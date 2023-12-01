import { useState } from "react";
import "./typeOfWashing.css";

import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

{
  /**Second componet in the main box to select type of wash that a user want */
}

const TypeOfWashing = (props) => {
  const { type, toReorder } = props;

  const [selectedType, setselectedType] = useState("");

  const userLogged = Cookies.get("jwt_userId");

  return (
    <div className="type-of-wash">
      <ToastContainer />
      <h1 className="type-of-head1">Select Type of Wash</h1>

      {userLogged !== undefined && (
        <p className="reorder-animate">Repeat Previous Order ❯</p>
      )}

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

      <div className="type-of-wash-con1">
        <button
          onClick={() => {
            setselectedType("dry Cleaning");
          }}
          style={{ position: "relative" }}
          className={
            selectedType === "dry Cleaning"
              ? "type-of-button1"
              : "type-of-button"
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
        <button
          style={{ position: "relative" }}
          onClick={() => {
            setselectedType("wash & iron");
          }}
          className={
            selectedType === "wash & iron"
              ? "type-of-button1"
              : "type-of-button"
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
          style={{ position: "relative" }}
          onClick={() => {
            setselectedType("wash & fold");
          }}
          className={
            selectedType === "wash & fold"
              ? "type-of-button1"
              : "type-of-button"
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
      </div>
      <button
        onClick={() => {
          if (selectedType === "") {
            toast.error("Please Select Type of Wash", {
              autoClose: 2000,
              pauseOnHover: true,
              closeOnClick: true,
              position: "top-center",
              theme: "colored",
            });
          } else {
            type(selectedType);
          }
        }}
        className="type-of-wash-continue"
      >
        Click To Continue
      </button>
    </div>
  );
};

export default TypeOfWashing;
