import React, { useState, useEffect } from "react";

import "./serviceB.css";

import axios from "axios";

function MapB({ address, pincode, initialLat, initialLong, onAddressChange }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [initialLatitude, setInitialLatitude] = useState(initialLat);
  const [initialLongitude, setInitialLongitude] = useState(initialLong);
  const [currentAddress, setCurrentAddress] = useState(address);
  const [currentPinCode, setCurrentPincode] = useState(pincode);
  const [searchedAddress, setSearchedAddress] = useState("");
  const [obtainedAddress, setObtainedAddress] = useState(() => {
    return [];
  });

  useEffect(() => {
    loadGoogleMapsApi();
  }, []);
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

  const initializeMap = () => {
    const initialCoordinates = {
      lat: initialLatitude,
      lng: initialLongitude,
    };
    const mapOptions = {
      center: initialCoordinates,
      zoom: 16,
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

  const initializeMap2 = (latt, longg) => {
    const initialCoordinates = {
      lat: latt,
      lng: longg,
    };
    const mapOptions = {
      center: initialCoordinates,
      zoom: 16,
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
    // const apiKey = `AIzaSyAm_75hdAbd0ukSKs2c-QG1IOkJcqgHEVQ`;
    const apiUrl = `${process.env.REACT_APP_ROOT_URL}/api/user/googleSearch/${searchedAddress}`;

    try {
      const source = axios.CancelToken.source();
      const response = await axios.get(apiUrl, { cancelToken: source.token });

      if (response.status === 200) {
        const addressBox = response.data.data.results.map(
          (each) => each.formatted_address
        );

        setObtainedAddress(addressBox);
      } else {
        console.error("Error:", response.status);
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

  const geoCoding = async (addressObtained) => {
    // console.log("geoCoding");
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          addressObtained
        )}&key=AIzaSyAm_75hdAbd0ukSKs2c-QG1IOkJcqgHEVQ`
      );

      if (!response.ok) {
        throw new Error("Geocoding failed");
      }

      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setInitialLatitude(location.lat);
        setInitialLongitude(location.lng);
        initializeMap2(location.lat, location.lng);
      } else {
        console.error(`Geocoding failed. Status: ${data.status}`);
      }
    } catch (error) {
      console.error("Error during geocoding:", error.message);
    }
  };

  // console.log(initialLatitude);
  // console.log(initialLongitude);

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
          value={searchedAddress}
          onChange={(e) => {
            setSearchedAddress(e.target.value);
          }}
          className="search-box2"
          type="search"
          placeholder="  Search Location 🔍"
        />
        {searchedAddress.length >= 1 && (
          <div className="search-sug2">
            {obtainedAddress.map((each) => (
              <p
                onClick={() => {
                  const pincodeRegex = /\b\d{6}\b/;
                  const pincodeMatch = each.match(pincodeRegex);
                  if (pincodeMatch) {
                    const pincode = pincodeMatch[0];
                    setCurrentAddress(each);
                    setCurrentPincode(pincode);
                    setSearchedAddress("");
                    setObtainedAddress([]);
                    geoCoding(each);
                    onAddressChange({
                      formattedAddress: each,
                      pincodee: pincode,
                    });
                  } else {
                    console.log("PIN code not found in the address.");
                  }
                  // onAddressChange({ currentAddress, currentPinCode });
                }}
              >
                {each}
              </p>
            ))}
          </div>
        )}
        {searchedAddress.length >= 1 && obtainedAddress.length === 0 && (
          <div className="search-sug2">
            <p style={{ textAlign: "center" }}>Address Not Found!</p>
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
