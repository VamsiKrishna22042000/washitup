import React, { useState, useEffect } from "react";

import "./serviceB.css";

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

  return (
    <div
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
  );
}

export default MapB;
