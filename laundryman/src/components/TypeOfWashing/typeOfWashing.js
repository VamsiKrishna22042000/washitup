import { useState } from "react";
import "./typeOfWashing.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsArrowRight } from "react-icons/bs";

{
  /**Second componet in the main box to select type of wash that a user want */
}

const TypeOfWashing = (props) => {
  const { type } = props;

  const [selectedType, setselectedType] = useState("");

  return (
    <div className="type-of-wash">
      <ToastContainer />
      <h1 className="type-of-head">Select Type of Wash</h1>
      <div className="type-of-wash-con">
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
              src="/selected2.gif"
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
              src="/selected2.gif"
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
              src="/selected2.gif"
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
        <span style={{ marginLeft: "3%" }}>
          <BsArrowRight />
        </span>
      </button>
    </div>
  );
};

export default TypeOfWashing;
