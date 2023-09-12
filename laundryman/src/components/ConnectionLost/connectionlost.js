import { useState } from "react";
import "../LaundryMain/index.css";

import connectionlostimage from "./connectionlost.png";

import fallbackImage from "./connectionlost.png";

const ConnectionLost = () => {
  return (
    <div className="error-con">
      <img
        id="connectionlost"
        className="connection-lost"
        src={connectionlostimage}
        alt="Connectionlost"
        onError={(e) => {
          e.target.src = fallbackImage;
        }}
      />
      <h1>Connection Lost !</h1>
      <p>
        Oops! Looks like our connection got lost. Sorry, it looks like you're
        offline.
      </p>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className="error-button"
        type="button"
      >
        Go To HomePage
      </button>
    </div>
  );
};

export default ConnectionLost;
