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
  const { book, time, getTime, items } = props;
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

  const [pincode, setPincode] = useState("");

  const availablePincodes = [
    524002, 531022, 531027, 531115, 531077, 531035, 531040, 531030, 531002,
    531117, 531055, 531002, 531035, 531001, 531022, 531118, 531111, 531084,
    531035, 531028, 531040, 531151, 531149, 531151, 531035, 531036, 531034,
    531151, 531035, 531031, 531011, 531040, 531077, 531118, 531029, 531035,
    531084, 531085, 531040, 531149, 531002, 531031, 531118, 531111, 531021,
    531113, 531082, 531023, 531117, 531081, 531035, 531149, 531029, 531149,
    531087, 531149, 531113, 531118, 531026, 531111, 531081, 531036, 531115,
    531081, 531118, 531028, 531087, 531020, 531117, 531118, 531036, 531026,
    531081, 531149, 531026, 531030, 531025, 531083, 531035, 531087, 531024,
    531111, 531084, 531032, 531011, 531036, 531084, 531149, 531111, 531034,
    531036, 531027, 531081, 531020, 531111, 531036, 531105, 531040, 531082,
    531021, 531027, 531133, 531030, 531115, 531061, 531118, 531026, 531026,
    531061, 531024, 531114, 531126, 531021, 531011, 531118, 531023, 531151,
    531105, 531011, 531115, 531055, 531082, 531126, 531029, 531118, 531027,
    531029, 531151, 531077, 531133, 531029, 531077, 531055, 531032, 531001,
    531087, 531149, 531151, 531075, 531083, 531113, 531126, 531036, 531061,
    531035, 531115, 531025, 531024, 531118, 531034, 531127, 531002, 531061,
    531151, 531023, 531061, 531036, 531077, 531133, 531083, 531025, 531034,
    531035, 531126, 531115, 531118, 531025, 531151, 531126, 531151, 531115,
    531011, 531118, 531077, 531061, 531077, 531127, 531024, 531149, 531149,
    531118, 531055, 531114, 531028, 531027, 531027, 531055, 531036, 531040,
    531019, 531111, 531117, 531084, 531040, 531023, 531034, 531084, 531034,
    531118, 531085, 531087, 531021, 531061, 531114, 531075, 531077, 531114,
    531036, 531036, 531127, 531028, 531151, 531114, 531031, 531084, 531040,
    531031, 531030, 531084, 531033, 531040, 531029, 531077, 531084, 531151,
    531024, 531034, 531027, 531151, 531118, 531030, 531028, 531085, 531002,
    531113, 531055, 531151, 531114, 531111, 531084, 531028, 531033, 531113,
    531026, 531002, 531084, 531114, 531077, 531151, 531151, 531111, 531083,
    531022, 531085, 531149, 531114, 531111, 531114, 531034, 531061, 531077,
    531114, 531087, 531118, 531127, 531032, 531029, 531032, 531118, 531075,
    531133, 531011, 531118, 531019, 531036, 531151, 531024, 531085, 531060,
    531029, 531026, 531149, 531111, 531111, 531029, 531115, 531117, 531118,
    531027, 531028, 531087, 531149, 531149, 531027, 531011, 531040, 531113,
    531036, 531113, 531035, 531075, 531032, 531087, 531028, 531126, 531115,
    531019, 531115, 531087, 531025, 531032, 531077, 531034, 531025, 531055,
    531024, 531111, 531023, 531033, 531040, 531061, 531022, 531084, 531030,
    531002, 531081, 531126, 531055, 531019, 531116, 531115, 531002, 531118,
    531020, 531020, 531029, 531084, 531115, 531117, 531113, 531024, 531118,
    531036, 531033, 531117, 531040, 531085, 531032, 531084, 531021, 531077,
    531084, 531033, 531151, 531021, 531126, 531081, 531149, 531040, 531077,
    531036, 531040, 531083, 531115, 531077, 531030, 531084, 531019, 531030,
    531055, 531127, 531081, 531083, 531133, 531118, 531127, 531055, 531055,
    531026, 531011, 531055, 531055, 531034, 531113, 531151, 531113, 531030,
    531061, 531036, 531081, 531118, 531085, 531022, 531061, 531151, 531151,
    531020, 531025, 531023, 531002, 531126, 531055, 531087, 531083, 531133,
    531114, 531034, 531040, 531133, 531060, 531133, 531151, 531027, 531024,
    531031, 531118, 531027, 531077, 531133, 531084, 531115, 531060, 531027,
    531127, 531040, 531025, 531105, 531034, 531029, 531149, 531028, 531077,
    531055, 531055, 531151, 531127, 531115, 531035, 531040, 531077, 531029,
    531085, 531149, 531115, 531032, 531077, 531118, 531031, 531114, 531011,
    531075, 531027, 531025, 531035, 531030, 531019, 531111, 531021, 531031,
    531033, 531002, 531025, 531084, 531032, 531083, 531055, 531026, 531055,
    531036, 531151, 531113, 531126, 531032, 531031, 531081, 531114, 531026,
    531118, 531075, 531033, 531113, 531060, 531075, 531019, 531040, 531040,
    531111, 531111, 531029, 531022, 531036, 531075, 531081, 531115, 531031,
    531028, 531026, 531055, 531081, 531117, 531127, 531020, 531060, 531085,
    531032, 531021, 531031, 531026, 531027, 531060, 531115, 531118, 531151,
    531055, 531117, 531033, 531030, 530003, 530053, 530016, 531162, 530052,
    531219, 530003, 531162, 530040, 530012, 530012, 530044, 531163, 531163,
    531162, 531163, 531163, 531173, 530003, 531219, 530047, 531173, 531162,
    531162, 530002, 530020, 531162, 530043, 530031, 530044, 530029, 530046,
    530016, 530001, 530026, 531219, 530005, 531173, 530044, 530048, 530003,
    531173, 530045, 530004, 530027, 531173, 531219, 530040, 531173, 531162,
    531173, 530022, 530007, 531163, 530008, 530022, 530031, 531163, 530012,
    530008, 531163, 530002, 530048, 531162, 531163, 531219, 530001, 531219,
    530017, 530004, 530017, 531219, 530048, 530002, 531162, 530011, 530048,
    530018, 530009, 530012, 531162, 531162, 530009, 530044, 531162, 531162,
    530027, 530005, 530014, 530014, 531163, 530016, 530027, 530013, 531219,
    530046, 531162, 531173, 530040, 530044, 530053, 531163, 531173, 531219,
    530003, 530047, 530041, 531219, 530027, 531219, 530029, 531173, 531162,
    531163, 531162, 530045, 530024, 531162, 531173, 530049, 530012, 530028,
    530028, 531162, 531219, 531173, 530040, 530051, 531219, 531162, 530052,
    531162, 530012, 530002, 530032, 531173, 530046, 530046, 531163, 531163,
    530029, 530047, 530003, 530009, 530001, 530035, 530031, 530043, 530012,
    530020, 530032, 530004, 530005, 530027, 530045, 530015, 535005, 535145,
    535145, 535250, 535145, 535273, 535145, 535145, 535145, 535145, 535145,
    535145, 535145, 535273, 535183, 535183, 535145, 535145, 535145, 535145,
  ];

  const bookNow = async () => {
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
    } else if (!availablePincodes.includes(parseInt(pincode))) {
      toast.error("Our Services are not yet available here", {
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

      if (removeTimeFromDate(date) < removeTimeFromDate(new Date())) {
        toast.error("Cannot select previous dates", {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          alignSelf: "center",
          theme: "colored",
        });
      } else {
        const itemsTobeSent = items.map((each) => ({
          itemId: each._id,
          itemCount: each.count,
        }));

        const dataTobeSent = {
          name: input.name,
          mobileNumber: input.number,
          location: geoLoc,
          address: userAddress,
          date: `${date.getDate()}-0${
            date.getMonth() + 1
          }-${date.getFullYear()}`,
          time: input.timeSelected,
          items: itemsTobeSent,
        };

        book(dataTobeSent);
      }
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
        setPincode(
          jsonData.results[0].address_components[
            jsonData.results[0].address_components.length - 1
          ].long_name
        );
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
