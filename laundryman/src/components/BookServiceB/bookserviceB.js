import "../LaundryMain/index.css";

import "./serviceB.css";

import Banners from "../Banners/banners";

import { MagnifyingGlass, TailSpin } from "react-loader-spinner";

import { useEffect, useState } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";

import MapB from "./googlemapB.js";

const timeArray = [
  {
    id: 1,
    time: "10 am",
  },
  {
    id: 2,
    time: "12 pm",
  },
  {
    id: 3,
    time: "2 pm",
  },
  {
    id: 4,
    time: "4 pm",
  },
  {
    id: 5,
    time: "6 pm",
  },
];

const BookServiceB = (props) => {
  const { book, time, getTime, items } = props;

  const userDono = Cookies.get("jwt_dono");
  const userLandmark = Cookies.get("jwt_landmark");
  const userLoaction = Cookies.get("jwt_location");

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [userAddress, setAddress] = useState({
    dono: userDono !== undefined ? userDono : "",
    landmark: userLandmark !== undefined ? userLandmark : "",
  });
  const [geoLoc, setGeoLoc] = useState(
    userLoaction !== undefined ? userLoaction : ""
  );

  const min = new Date();
  min.setDate(min.getDate() + 1);

  const max = new Date();
  max.setDate(max.getDate() + 7);

  const [date, setDate] = useState(min);

  const userName = Cookies.get("jwt_userName");
  const userMobileNumber = Cookies.get("jwt_mobileNumber");

  const [input, setInputs] = useState({
    name: userName !== undefined ? userName : "",
    number: userMobileNumber !== undefined ? userMobileNumber : "",
    timeSelected: "",
  });

  const [otp, setOtp] = useState(
    userName !== undefined && userMobileNumber !== undefined ? true : false
  );

  const [otpVerification, setOtpVerification] = useState({
    otpNumber: "",
    otpSent: false,
    otpLoad: false,
  });

  const [pincode, setPincode] = useState("");

  const [geoLoading, setLoading] = useState(false);

  const [showMap, setShowMap] = useState(false);

  /**Array to store the pincodes that which we provide service for those areas*/
  const availablePincodes = [
    174021, 530003, 110001, 524002, 531022, 531027, 531115, 531077, 531035,
    531040, 531030, 531002, 530018, 531117, 531055, 531002, 531035, 531001,
    531022, 531118, 531111, 531084, 531035, 531028, 531040, 531151, 531149,
    531151, 531035, 531036, 531034, 531151, 531035, 531031, 531011, 531040,
    531077, 531118, 531029, 531035, 531084, 531085, 531040, 531149, 531002,
    531031, 531118, 531111, 531021, 531113, 531082, 531023, 531117, 531081,
    531035, 531149, 531029, 531149, 531087, 531149, 531113, 531118, 531026,
    531111, 531081, 531036, 531115, 531081, 531118, 531028, 531087, 531020,
    531117, 531118, 531036, 531026, 531081, 531149, 531026, 531030, 531025,
    531083, 531035, 531087, 531024, 531111, 531084, 531032, 531011, 531036,
    531084, 531149, 531111, 531034, 531036, 531027, 531081, 531020, 531111,
    531036, 531105, 531040, 531082, 531021, 531027, 531133, 531030, 531115,
    531061, 531118, 531026, 531026, 531061, 531024, 531114, 531126, 531021,
    531011, 531118, 531023, 531151, 531105, 531011, 531115, 531055, 531082,
    531126, 531029, 531118, 531027, 531029, 531151, 531077, 531133, 531029,
    531077, 531055, 531032, 531001, 531087, 531149, 531151, 531075, 531083,
    531113, 531126, 531036, 531061, 531035, 531115, 531025, 531024, 531118,
    531034, 531127, 531002, 531061, 531151, 531023, 531061, 531036, 531077,
    531133, 531083, 531025, 531034, 531035, 531126, 531115, 531118, 531025,
    531151, 531126, 531151, 531115, 531011, 531118, 531077, 531061, 531077,
    531127, 531024, 531149, 531149, 531118, 531055, 531114, 531028, 531027,
    531027, 531055, 531036, 531040, 531019, 531111, 531117, 531084, 531040,
    531023, 531034, 531084, 531034, 531118, 531085, 531087, 531021, 531061,
    531114, 531075, 531077, 531114, 531036, 531036, 531127, 531028, 531151,
    531114, 531031, 531084, 531040, 531031, 531030, 531084, 531033, 531040,
    531029, 531077, 531084, 531151, 531024, 531034, 531027, 531151, 531118,
    531030, 531028, 531085, 531002, 531113, 531055, 531151, 531114, 531111,
    531084, 531028, 531033, 531113, 531026, 531002, 531084, 531114, 531077,
    531151, 531151, 531111, 531083, 531022, 531085, 531149, 531114, 531111,
    531114, 531034, 531061, 531077, 531114, 531087, 531118, 531127, 531032,
    531029, 531032, 531118, 531075, 531133, 531011, 531118, 531019, 531036,
    531151, 531024, 531085, 531060, 531029, 531026, 531149, 531111, 531111,
    531029, 531115, 531117, 531118, 531027, 531028, 531087, 531149, 531149,
    531027, 531011, 531040, 531113, 531036, 531113, 531035, 531075, 531032,
    531087, 531028, 531126, 531115, 531019, 531115, 531087, 531025, 531032,
    531077, 531034, 531025, 531055, 531024, 531111, 531023, 531033, 531040,
    531061, 531022, 531084, 531030, 531002, 531081, 531126, 531055, 531019,
    531116, 531115, 531002, 531118, 531020, 531020, 531029, 531084, 531115,
    531117, 531113, 531024, 531118, 531036, 531033, 531117, 531040, 531085,
    531032, 531084, 531021, 531077, 531084, 531033, 531151, 531021, 531126,
    531081, 531149, 531040, 531077, 531036, 531040, 531083, 531115, 531077,
    531030, 531084, 531019, 531030, 531055, 531127, 531081, 531083, 531133,
    531118, 531127, 531055, 531055, 531026, 531011, 531055, 531055, 531034,
    531113, 531151, 531113, 531030, 531061, 531036, 531081, 531118, 531085,
    531022, 531061, 531151, 531151, 531020, 531025, 531023, 531002, 531126,
    531055, 531087, 531083, 531133, 531114, 531034, 531040, 531133, 531060,
    531133, 531151, 531027, 531024, 531031, 531118, 531027, 531077, 531133,
    531084, 531115, 531060, 531027, 531127, 531040, 531025, 531105, 531034,
    531029, 531149, 531028, 531077, 531055, 531055, 531151, 531127, 531115,
    531035, 531040, 531077, 531029, 531085, 531149, 531115, 531032, 531077,
    531118, 531031, 531114, 531011, 531075, 531027, 531025, 531035, 531030,
    531019, 531111, 531021, 531031, 531033, 531002, 531025, 531084, 531032,
    531083, 531055, 531026, 531055, 531036, 531151, 531113, 531126, 531032,
    531031, 531081, 531114, 531026, 531118, 531075, 531033, 531113, 531060,
    531075, 531019, 531040, 531040, 531111, 531111, 531029, 531022, 531036,
    531075, 531081, 531115, 531031, 531028, 531026, 531055, 531081, 531117,
    531127, 531020, 531060, 531085, 531032, 531021, 531031, 531026, 531027,
    531060, 531115, 531118, 531151, 531055, 531117, 531033, 531030, 530003,
    530053, 530016, 531162, 530052, 531219, 530003, 531162, 530040, 530012,
    530012, 530044, 531163, 531163, 531162, 531163, 531163, 531173, 530003,
    531219, 530047, 531173, 531162, 531162, 530002, 530020, 531162, 530043,
    530031, 530044, 530029, 530046, 530016, 530001, 530026, 531219, 530005,
    531173, 530044, 530048, 530003, 531173, 530045, 530004, 530027, 531173,
    531219, 530040, 531173, 531162, 531173, 530022, 530007, 531163, 530008,
    530022, 530031, 531163, 530012, 530008, 531163, 530002, 530048, 531162,
    531163, 531219, 530001, 531219, 530017, 530004, 530017, 531219, 530048,
    530002, 531162, 530011, 530048, 530018, 530009, 530012, 531162, 531162,
    530009, 530044, 531162, 531162, 530027, 530005, 530014, 530014, 531163,
    530016, 530027, 530013, 531219, 530046, 531162, 531173, 530040, 530044,
    530053, 531163, 531173, 531219, 530003, 530047, 530041, 531219, 530027,
    531219, 530029, 531173, 531162, 531163, 531162, 530045, 530024, 531162,
    531173, 530049, 530012, 530028, 530028, 531162, 531219, 531173, 530040,
    530051, 531219, 531162, 530052, 531162, 530012, 530002, 530032, 531173,
    530046, 530046, 531163, 531163, 530029, 530047, 530003, 530009, 530001,
    530035, 530031, 530043, 530012, 530020, 530032, 530004, 530005, 530027,
    530045, 530015, 535005, 535145, 535145, 535250, 535145, 535273, 535145,
    535145, 535145, 535145, 535145, 535145, 535145, 535273, 535183, 535183,
    535145, 535145, 535145, 535145,
  ];

  /**Function to navigate from the where & who section to coupon section of the main component */
  const bookNow = async () => {
    if (input.number === "") {
      toast.error("Please Enter Number", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else if (input.number.length !== 10) {
      toast.error("Please Enter Valid Number", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else if (input.name === "") {
      toast.error("Please Enter Name", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else if (geoLoc === "") {
      toast.error("Please click on geo locater", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else if (userAddress.dono === "") {
      toast.error("Please Enter Do / Flat No", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else if (userAddress.landmark === "") {
      toast.error("Please Enter Landmark", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else if (input.timeSelected === "") {
      toast.error("Please Select Time", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else if (!availablePincodes.includes(parseInt(pincode))) {
      toast.error("Our Services are not yet available here", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        alignSelf: "center",
        theme: "colored",
      });
    } else if (otp !== true) {
      toast.error("Complete OTP Authentication", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        alignSelf: "center",
        theme: "colored",
      });
    } else {
      const removeTimeFromDate = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      };

      if (removeTimeFromDate(date) <= removeTimeFromDate(new Date())) {
        toast.error("Select From Tomorrow", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          alignSelf: "center",
          theme: "colored",
        });
      } else {
        let totalPrice = 0;
        items.map(
          (each) => (totalPrice = totalPrice + each.price * each.count)
        );

        const itemsTobeSent = items.map((each) => ({
          itemImage: each.image,
          itemId: each._id,
          itemCount: each.count,
        }));

        const dataTobeSent = {
          name: input.name,
          mobileNumber: input.number,
          location: geoLoc,
          address: userAddress,
          date: `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`,
          time: input.timeSelected,
          items: itemsTobeSent,
          total: totalPrice,
        };

        book(dataTobeSent);
      }
    }
  };

  /**Function to get the precise location of a use by converting latitude and logitude to address*/
  const reverseGeoCoding = async () => {
    console.log("reverseGeoCoding");
    if (latitude !== "" && longitude !== "") {
      console.log(latitude);
      console.log(longitude);
      const apiKey = `AIzaSyAm_75hdAbd0ukSKs2c-QG1IOkJcqgHEVQ`;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${apiKey}`;

      const response = await fetch(url);
      const jsonData = await response.json();
      if (response.ok === true) {
        setGeoLoc(jsonData.results[0].formatted_address);

        console.log(
          jsonData.results[0].address_components[
            jsonData.results[0].address_components.length - 1
          ].long_name
        );
        setPincode(
          jsonData.results[0].address_components[
            jsonData.results[0].address_components.length - 1
          ].long_name
        );
        setTimeout(() => {
          setLoading(false);
          setShowMap(true);
        }, 1000);
      } else {
        toast.error(`${jsonData.error_message}`, {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      }
    }
  };

  /**State to update time selected by the user */
  const selectedTime = (e) => {
    getTime(e);
    setInputs((prevValues) => ({
      ...prevValues,
      timeSelected: e.time,
    }));
  };

  /**Function to generate the coordinates(Latitude and longitude) for reversegeocoding*/
  function getLocation() {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  useEffect(() => {
    userLoaction === undefined && reverseGeoCoding();
  }, [latitude, longitude]);

  const geoCoding = async () => {
    console.log("geoCoding");
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          geoLoc
        )}&key=AIzaSyAm_75hdAbd0ukSKs2c-QG1IOkJcqgHEVQ`
      );

      if (!response.ok) {
        throw new Error("Geocoding failed");
      }

      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setLatitude(location.lat);
        setLongitude(location.lng);

        const pincodeMatch = geoLoc.match(/\b\d{6}\b/);

        if (pincodeMatch) {
          const pincode = pincodeMatch[0];

          console.log("Pin Code:", pincode);
          setPincode(pincode);
        } else {
          console.log("Pin Code not found in the address.");
        }

        setTimeout(() => {
          setLoading(false);
          setShowMap(true);
        }, 1000);
      } else {
        console.error(`Geocoding failed. Status: ${data.status}`);
      }
    } catch (error) {
      console.error("Error during geocoding:", error.message);
    }
  };

  const onAddressChange = (data) => {
    console.log(data.formattedAddress);
    console.log(data.pincodee);
    setGeoLoc(data.formattedAddress);
    setPincode(data.pincodee);
  };

  const handleOtp = async () => {
    if (input.number === "" || input.number.length !== 10) {
      toast.error("Enter Valid Mobile Number", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else {
      try {
        setOtpVerification({ ...otpVerification, otpLoad: true });
        const url = `${process.env.REACT_APP_ROOT_URL}/api/otp/otpSignup`;

        const reqConfigure = {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ mobileNumber: input.number }),
        };

        const response = await fetch(url, reqConfigure);

        const data = await response.json();
        if (response.ok) {
          setOtpVerification({
            ...otpVerification,
            otpSent: true,
            otpLoad: false,
          });
          toast.success("OTP Sent", {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
        } else {
          setOtpVerification({
            ...otpVerification,
            otpLoad: false,
          });

          if (data.message === "User already registered!") {
            toast.success(`Verified You are already registerd`, {
              position: "top-center",
              autoClose: 2000,
              closeOnClick: true,
              pauseOnHover: true,
              theme: "colored",
            });
            setOtp(true);
          } else {
            toast.error(`${data.message}`, {
              position: "top-center",
              autoClose: 2000,
              closeOnClick: true,
              pauseOnHover: true,
              theme: "colored",
            });
          }
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
    }
  };

  const verifyOtp = async () => {
    if (otpVerification.otpNumber === "") {
      toast.error("Enter Valid OTP", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else {
      try {
        setOtpVerification({ ...otpVerification, otpLoad: true });
        const url = `${process.env.REACT_APP_ROOT_URL}/api/otp/verifySignup`;

        const reqConfigure = {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            mobileNumber: parseInt(input.number),
            name: input.name,
            otp: parseInt(otpVerification.otpNumber),
          }),
        };

        const response = await fetch(url, reqConfigure);

        const data = await response.json();
        if (response.ok) {
          Cookies.set("jwt_userToken", data.token, { expires: 30 });
          Cookies.set("jwt_userId", data.data._id, { expires: 30 });
          // Cookies.set("jwt_adminLogin", data.data.isAdmin, {
          //   expires: 30,
          // });
          Cookies.set("jwt_userName", data.data.name, {
            expires: 30,
          });
          Cookies.set("jwt_mobileNumber", data.data.mobileNumber, {
            expires: 30,
          });
          data.data.location !== undefined &&
            Cookies.set("jwt_location", data.data.location, {
              expires: 30,
            });
          data.data.address !== undefined &&
            Cookies.set("jwt_dono", data.data.address.dono, {
              expires: 30,
            });
          data.data.address !== undefined &&
            Cookies.set("jwt_landmark", data.data.address.landmark, {
              expires: 30,
            });
          setOtpVerification({
            ...otpVerification,
            otpSent: false,
            otpLoad: false,
          });
          setOtp(true);
          toast.success("Verified", {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
        } else {
          setOtpVerification({
            ...otpVerification,
            otpNumber: "",
            otpLoad: false,
          });
          toast.error("Enter Valid OTP", {
            position: "top-center",
            autoClose: 2000,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
          });
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
    }
  };

  useEffect(() => {
    userLoaction === undefined ? getLocation() : geoCoding();
  }, []);

  const handleChangeAddress = () => {
    setGeoLoc("");
    setAddress({ dono: "", landmark: "" });
  };

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
      <ToastContainer />
      <div className="login-book-serviceB">
        <Banners />
        <div className="addService-con-B">
          <div className="input2-BA">
            <h1 className="where-head">When?</h1>
            <div className="calen-con">
              <Calendar
                minDate={min}
                maxDate={max}
                className="calender"
                onChange={(date) => {
                  setDate(date);
                }}
                value={date}
              />
            </div>
            <p style={{ alignSelf: "center" }} className="where-titles">
              Time
            </p>
            <div id="clothes" className="name2-B">
              {timeArray.map((each) => (
                <button
                  onClick={() => {
                    selectedTime(each);
                  }}
                  id={each.id}
                  className={
                    each.id === time ? "selected-time-B" : "bookservice-time-B"
                  }
                  key={each.id}
                >
                  {each.time}
                </button>
              ))}
            </div>
          </div>
          <div className="input1-BA">
            <h1 className="where-head">Where ?</h1>

            {otpVerification.otpSent ? (
              <p className="where-titles">Enter OTP</p>
            ) : (
              <p className="where-titles">Mobile Number</p>
            )}

            {otpVerification.otpSent ? (
              <div className="otp-box">
                {otpVerification.otpLoad ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TailSpin height={30} width={30} />
                  </div>
                ) : (
                  <>
                    <input
                      id="phone"
                      className="name"
                      type="number"
                      value={otpVerification.otpNumber}
                      placeholder="Enter OTP"
                      onChange={(e) => {
                        const isValidInput = /^[0-9]*$/.test(e.target.value);
                        isValidInput &&
                          setOtpVerification({
                            ...otpVerification,
                            otpNumber: e.target.value,
                          });
                      }}
                    />
                    <button
                      onClick={verifyOtp}
                      className="otp-button"
                      type="button"
                    >
                      Verify
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="otp-box">
                {otpVerification.otpLoad ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TailSpin height={30} width={30} />
                  </div>
                ) : (
                  <>
                    <input
                      id="phone"
                      className="name"
                      type="number"
                      value={input.number}
                      placeholder="Phone Number"
                      onChange={(e) => {
                        const isValidInput = /^[0-9]*$/.test(e.target.value);
                        isValidInput &&
                          setInputs((prevValues) => ({
                            ...prevValues,
                            number: e.target.value,
                          }));
                      }}
                    />
                    {userMobileNumber === undefined &&
                      input.number.length === 10 &&
                      input.name !== "" &&
                      geoLoc !== "" &&
                      userAddress.dono !== "" &&
                      userAddress.landmark !== "" &&
                      !otp && (
                        <button
                          onClick={handleOtp}
                          className="otp-button"
                          type="button"
                        >
                          Send OTP
                        </button>
                      )}
                  </>
                )}
              </div>
            )}

            <p className="where-titles" htmlFor="name">
              Name
            </p>
            <input
              onChange={(e) => {
                const isValidInput = /^[a-zA-Z ]*$/.test(e.target.value);
                isValidInput &&
                  setInputs((prevValues) => ({
                    ...prevValues,
                    name: e.target.value,
                  }));
              }}
              id="name"
              className="name"
              type="text"
              placeholder="Name"
              value={input.name}
            />
            <div style={{ position: "relative", width: "100%" }}>
              {userLoaction !== undefined && (
                <p
                  onClick={handleChangeAddress}
                  className="where-titles"
                  style={{
                    position: "absolute",
                    right: "5%",
                    top: 0,
                    color: "#6759ff",
                    fontWeight: "bolder",
                    fontSize: ".6rem",
                    cursor: "pointer",
                  }}
                >
                  Change Address
                </p>
              )}
              <p className="where-titles">Add Location</p>
              {geoLoading ? (
                <div
                  className="name3"
                  style={{
                    paddingLeft: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderColor: "transparent",
                  }}
                >
                  <MagnifyingGlass
                    visible={true}
                    height="18"
                    width="18"
                    ariaLabel="MagnifyingGlass-loading"
                    wrapperStyle={{}}
                    wrapperClass="MagnifyingGlass-wrapper"
                    glassColor="#c0efff"
                    color="#6759ff"
                  />
                </div>
              ) : (
                <input
                  readOnly
                  id="geoLoc"
                  value={geoLoc}
                  className="name3"
                  type="text"
                  placeholder="Change the Pin to your address"
                  onChange={(e) => {
                    setGeoLoc(e.target.value);
                  }}
                />
              )}
            </div>
            <p className="where-titles">Door / Flat No</p>
            <input
              id="addres"
              className="name"
              placeholder="Do / Flat No"
              value={userAddress.dono}
              onChange={(e) => {
                setAddress({ ...userAddress, dono: e.target.value });
              }}
            />

            <p className="where-titles">LandMark</p>
            <input
              id="addres"
              className="name"
              placeholder="LandMark"
              value={userAddress.landmark}
              onChange={(e) => {
                const isValidInput = /^[a-zA-Z ]*$/.test(e.target.value);
                isValidInput &&
                  setAddress({ ...userAddress, landmark: e.target.value });
              }}
            />
          </div>
          {showMap && !geoLoading && latitude !== "" && longitude !== "" ? (
            <>
              <MapB
                pincode={pincode}
                address={geoLoc}
                initialLat={latitude}
                initialLong={longitude}
                onAddressChange={onAddressChange}
              />
              <button
                id="bookService"
                onClick={bookNow}
                className="where-buttonB"
              >
                Book Service
              </button>
            </>
          ) : (
            <div
              style={{
                position: "relative",
                width: "30vw",
                height: "45vh",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "1%",
              }}
            >
              <MagnifyingGlass
                visible={true}
                height="50"
                width="50"
                ariaLabel="MagnifyingGlass-loading"
                wrapperStyle={{}}
                wrapperClass="MagnifyingGlass-wrapper"
                glassColor="#c0efff"
                color="#6759ff"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookServiceB;
