import "../LaundryMain/index.css";

import "./bookservice.css";

import { useState } from "react";

import { BiCurrentLocation } from "react-icons/bi";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const BookService = (props) => {
  const { book, time, getTime } = props;
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [userAddress, setAddress] = useState("");
  const [geoLoc, setGeoLoc] = useState("");
  const [date, setDate] = useState(new Date());
  const [input, setInputs] = useState({
    name: "",
    number: "",
    timeSelected: "",
  });

  const bookNow = () => {
    if (input.name === "") {
      toast.error("Please Enter Name", {
        position: "top-center",
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    } else if (input.number === "") {
      toast.error("Please Enter Number", {
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
    } else if (userAddress === "") {
      toast.error("Please Type Address", {
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
    } else {
      book();
    }
  };

  const reverseGeoCoding = async () => {
    if (latitude !== "" && longitude !== "") {
      console.log(latitude);
      console.log(longitude);
      const apikey = "AIzaSyAm_75hdAbd0ukSKs2c-QG1IOkJcqgHEVQ";
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=false&key=${apikey}`;

      const response = await fetch(url);
      const jsonData = await response.json();
      if (response.ok === true) {
        setGeoLoc(jsonData.results[0].formatted_address);
        console.log(jsonData.results[0].formatted_address);
      } else {
        alert(jsonData.error_message);
      }
    }
  };

  const selectedTime = (e) => {
    getTime(e);
    setInputs((prevValues) => ({
      ...prevValues,
      timeSelected: e.time,
    }));
  };

  function getLocation() {
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

  reverseGeoCoding();

  return (
    <>
      <ToastContainer />
      <div className="login-book-service">
        <div className="input2">
          <h1 className="where-head">When?</h1>
          <Calendar
            className="calender"
            onChange={(date) => {
              setDate(date);
            }}
            value={date}
          />
          <p style={{ alignSelf: "center" }} className="where-titles">
            Time
          </p>
          <div id="clothes" className="name2">
            {timeArray.map((each) => (
              <button
                onClick={() => {
                  selectedTime(each);
                }}
                id={each.id}
                className={
                  each.id === time ? "selected-time" : "bookservice-time"
                }
                key={each.id}
              >
                {each.time}
              </button>
            ))}
          </div>
        </div>
        <div className="input1">
          <h1 className="where-head">Where ?</h1>
          <p className="where-titles" htmlFor="name">
            Name
          </p>
          <input
            onChange={(e) => {
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

          <p className="where-titles">Mobile Number</p>
          <input
            id="phone"
            className="name"
            type="number"
            value={input.number}
            placeholder="Phone Number"
            onChange={(e) => {
              setInputs((prevValues) => ({
                ...prevValues,
                number: e.target.value,
              }));
            }}
          />

          <div style={{ position: "relative", width: "100%" }}>
            <p className="where-titles">Add Location</p>
            <input
              id="geoLoc"
              value={geoLoc}
              className="name3"
              type="text"
              placeholder="Click Here to add you location"
              style={{ paddingLeft: "10%" }}
              onChange={(e) => {
                setGeoLoc(e.target.value);
              }}
            />
            <BiCurrentLocation className="geoLocator" onClick={getLocation} />
          </div>
          <p className="where-titles">Address</p>
          <textarea
            id="addres"
            className="address"
            placeholder="Address"
            value={userAddress}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></textarea>

          <button id="bookService" onClick={bookNow} className="where-button">
            Book Service
          </button>
        </div>
      </div>
    </>
  );
};

export default BookService;
