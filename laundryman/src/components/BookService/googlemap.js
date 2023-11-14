import React, { useState, useEffect } from "react";

import "./bookservice.css";

function Map({
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

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      const script = document.createElement("script");
      const Key = "AIzaSyAm_75hdAbd0ukSKs2c-QG1IOkJcqgHEVQ";
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
    console.log("hi");
    const initialCoordinates = {
      lat: initialLatitude,
      lng: initialLongitude,
    };
    const mapOptions = {
      center: initialCoordinates,
      zoom: 14,
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
      }
    });
  };

  const [hasScrolledIntoView, setHasScrolledIntoView] = useState(false);

  useEffect(() => {
    // Check if the component has not scrolled into view yet
    if (!hasScrolledIntoView) {
      // Scroll into view
      const homeElement = document.getElementById("home");
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: "smooth" });
        // Update state to indicate that scrolling has been performed
        setHasScrolledIntoView(true);
      }
    }
  }, [hasScrolledIntoView]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "60vh",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => {
          onAddressChange({ currentAddress, currentPinCode });
        }}
        type="button"
        style={{
          position: "absolute",
          padding: ".3rem .6rem",
          zIndex: 5,
          bottom: "20.8%",
          left: "7.8%",
          backgroundColor: "#6759ff",
          border: 0,
          color: "#fff",
          borderRadius: ".2rem",
          cursor: "pointer",
          bottom: "19%",
        }}
      >
        Go Back
      </button>
      <p className="move-pin">Move Pin To Your Address</p>
      <div
        id="map"
        style={{
          position: "relative",
          width: "90%",
          height: "80%",
        }}
      ></div>
      <div className="address-box">
        <p>{currentAddress}</p>
        <button
          onClick={() => {
            onAddressChange({ currentAddress, currentPinCode });
          }}
          type="button"
          style={{ padding: ".3rem .4rem", marginTop: "5%", cursor: "pointer" }}
        >
          Select
        </button>
      </div>
    </div>
  );
}

export default Map;
