import { useState } from "react";
import "./typeOfWashing.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsArrowRight } from "react-icons/bs";

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
          className={
            selectedType === "dry Cleaning"
              ? "type-of-button1"
              : "type-of-button"
          }
        >
          <img className="type-of-image" src="/drycleaning.png" />
          Dry Cleaning
        </button>
        <button
          onClick={() => {
            setselectedType("wash & iron");
          }}
          className={
            selectedType === "wash & iron"
              ? "type-of-button1"
              : "type-of-button"
          }
        >
          <img className="type-of-image" src="/wash&iron.png" /> Wash & Iron
        </button>
        <button
          onClick={() => {
            setselectedType("wash & fold");
          }}
          className={
            selectedType === "wash & fold"
              ? "type-of-button1"
              : "type-of-button"
          }
        >
          <img className="type-of-image" src="/wash&fold.png" /> Wash & Fold
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
