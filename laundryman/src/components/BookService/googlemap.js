import React, { useState, useEffect } from "react";

import "./bookservice.css";

function Map({ address, initialLatitude, initialLongitude, onAddressChange }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(address);

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_SITE_KEY}&callback=initMap`;
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
        setCurrentAddress(formattedAddress);
      }
    });
  };

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
            onAddressChange(currentAddress);
          }}
          type="button"
        >
          Select
        </button>
      </div>
    </div>
  );
}

export default Map;
