import { useState } from "react";
import "../LaundryMain/index.css";

const ConnectionLost = () => {
  const [imgSrc, setImg] = useState("/connectionlost.png");

  const handelImg = () => {
    setImg("/connectionlost.png");
  };

  return (
    <div className="error-con">
      <img
        className="connection-lost"
        src={imgSrc}
        alt="404 Error Page"
        onError={handelImg}
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
