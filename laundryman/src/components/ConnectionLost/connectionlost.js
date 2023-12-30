import "../LaundryMain/index.css";

import "./connectionlost.css";

const ConnectionLost = ({ connectionLostImage }) => {
  return (
    <div className="error-con">
      <img
        id="connectionlost"
        className="connection-lost"
        src={connectionLostImage}
        alt="Connectionlost"
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
        className="error-button-2"
        type="button"
        style={{
          marginTop: "1%",
          borderRadius: ".25rem",
          padding: "1% 3%",
          cursor: "pointer",
        }}
      >
        Go To HomePage
      </button>
    </div>
  );
};

export default ConnectionLost;
