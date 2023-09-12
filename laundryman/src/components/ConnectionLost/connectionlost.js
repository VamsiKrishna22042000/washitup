import "../LaundryMain/index.css";

const ConnectionLost = () => {
  return (
    <div className="error-con">
      <img
        className="connection-lost"
        src="/connectionlost.png"
        alt="404 Error Page"
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
