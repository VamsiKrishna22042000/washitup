import React, { useState, useEffect } from "react";

import "./serviceB.css";

import axios from "axios";

function MapB({
  address,
  pincode,
  initialLatitude,
  initialLongitude,
  onAddressChange,
}) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(address);
  const [currentPinCode, setCurrentPincode] = useState(pincode);
  const [searchedAddress, setSearchedAddress] = useState("");
  const [obtainedAddress, setObtainedAddress] = useState(() => {
    return [];
  });

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      const script = document.createElement("script");
      const Key = `AIzaSyAm_75hdAbd0ukSKs2c-QG1IOkJcqgHEVQ`;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${Key}&callback=initMap`;
      script.async = true;
      script.defer = true;

      window.initMap = function () {
        // JS API is loaded and available
        if (
          initialLatitude !== "" &&
          initialLongitude !== "" &&
          currentAddress !== ""
        ) {
          script.addEventListener("load", initializeMap);
        }
      };

      document.head.appendChild(script);
    };

    loadGoogleMapsApi();
  }, []);

  const initializeMap = () => {
    const initialCoordinates = {
      lat: initialLatitude,
      lng: initialLongitude,
    };
    const mapOptions = {
      center: initialCoordinates,
      zoom: 13,
    };
    const map = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );
    setMap(map);

    const marker = new window.google.maps.Marker({
      map: map,
      draggable: true,
      position: initialCoordinates,
    });
    setMarker(marker);

    window.google.maps.event.addListener(marker, "dragend", () => {
      geocodeLocation(marker.getPosition());
    });
  };

  const geocodeLocation = (location) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: location }, (results, status) => {
      if (status === "OK" && results[0]) {
        const formattedAddress = results[0].formatted_address;
        const pincode =
          results[0].address_components[
            results[0].address_components.length - 1
          ].long_name;

        setCurrentAddress(formattedAddress);

        setCurrentPincode(pincode);

        console.log(formattedAddress);

        console.log(pincode);

        onAddressChange({ formattedAddress, pincodee: pincode });
      }
    });
  };

  useEffect(() => {
    if (searchedAddress !== "") {
      getPlaces();
    }
  }, [searchedAddress]);

  const getPlaces = async () => {
    const apiKey = `AIzaSyAm_75hdAbd0ukSKs2c-QG1IOkJcqgHEVQ`;
    const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchedAddress}&key=${apiKey}`;

    try {
      const source = axios.CancelToken.source();
      const response = await axios.get(apiUrl, { cancelToken: source.token });
      const data = await response.json();

      if (response.status === 200) {
        console.log(response.data.results);
        setObtainedAddress(response.data.results);
      } else {
        console.error("Error:", data.status);
        return [];
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request was canceled
        console.log("Request Cancled");
      } else {
        // Handle other errors
        console.error("Error fetching data:", error);
      }
      return [];
    }
  };

  return (
    <>
      <div
        className="map-desktop"
        style={{
          position: "relative",
          width: "30vw",
          height: "45vh",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "1%",
        }}
      >
        <input
          onChange={(e) => {
            setSearchedAddress(e.target.value);
          }}
          className="search-box2"
          type="search"
          placeholder=" Search Location 🔍"
        />
        {searchedAddress.length >= 1 && (
          <div className="search-sug2">
            {obtainedAddress.map((each) => (
              <p>{each}</p>
            ))}
          </div>
        )}

        <p className="move-pin">Move Pin To Your Address</p>
        <div
          id="map"
          style={{
            position: "relative",
            width: "90%",
            height: "75%",
          }}
        ></div>
        <div className="address-boxB">
          <p>{currentAddress}</p>
        </div>
      </div>
    </>
  );
}

export default MapB;
