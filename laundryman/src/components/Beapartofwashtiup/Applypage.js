import React, { useEffect, useReducer, useRef, useState } from "react";
import "./applypage.css";

import { useParams } from "react-router-dom";

const initialState = {
  name: "",
  mobileNumber: "",
  email: "",
};

const reducer = (state, action) => {
  return { ...state, [action.field]: action.value };
};

const ApplyPage = () => {
  const { id } = useParams();
  const applyid = id;

  const [state, dispatch] = useReducer(reducer, initialState);
  const [percentage, setPercentage] = useState(-5);

  useEffect(() => {
    if (state.name === "" && state.mobileNumber === "" && state.email === "") {
      setPercentage(-5);
    }

    if (state.name !== "" && state.mobileNumber === "") {
      setPercentage(15);
    }

    if (
      state.name !== "" &&
      state.mobileNumber !== "" &&
      state.mobileNumber > 4
    ) {
      setPercentage(23);
    }

    if (
      state.name !== "" &&
      state.mobileNumber !== "" &&
      state.mobileNumber > 9
    ) {
      setPercentage(33);
    }

    if (
      state.name !== "" &&
      state.mobileNumber !== "" &&
      state.mobileNumber.length > 9 &&
      state.email === ""
    ) {
      setPercentage(45);
    }

    if (
      state.name !== "" &&
      state.mobileNumber !== "" &&
      state.mobileNumber.length > 9 &&
      state.email !== ""
    ) {
      setPercentage(69);
    }

    if (
      state.name !== "" &&
      state.mobileNumber !== "" &&
      state.mobileNumber.length > 9 &&
      state.email !== "" &&
      state.email.endsWith("@gmail.com")
    ) {
      setPercentage(85);
      setTimeout(() => {
        setPercentage(100);
      }, 1000);
    }
  }, [state]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (event.target.id) {
      case "name":
        dispatch({ type: "name", field: name, value });
        break; // Don't forget to break after each case
      case "mobileNumber":
        dispatch({ type: "mobileNumber", field: name, value });
        break;
      case "email":
        dispatch({ type: "email", field: name, value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data, e.g., submit to a server
    console.log("Form submitted:", state);
  };

  return (
    <div className="apply-main-con">
      {applyid === "delivery" ? (
        <div className="driver-main-con">
          <div>
            <img src="/washituplogo.png" alt="Washit Up" />
          </div>

          <div>
            <h2>Drive for Us</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={state.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />

              <label htmlFor="mobileNumber">Mobile Number</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={state.mobileNumber}
                onChange={handleInputChange}
                placeholder="Enter your mobile number"
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={state.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />

              {percentage === 100 ? (
                <button type="submit">Submit</button>
              ) : (
                <button id="buttonAnimation" type="submit">
                  <img
                    style={{ left: `${percentage}%` }}
                    src="/deliveryboy.gif"
                    alt="deliveryanimation"
                  />
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      ) : (
        <div className="vendor-main-con"></div>
      )}
    </div>
  );
};

export default ApplyPage;
