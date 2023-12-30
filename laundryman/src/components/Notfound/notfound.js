import "../LaundryMain/index.css";

import { useEffect } from "react";

const Notfound = () => {
  return (
    <div className="error-con">
      <img
        className="image-error"
        src="/404errorpage.png"
        alt="404 Error Page"
      />
      <p>
        Sorry! this page your looking for doesn't exist, your URL maybe
        incorrect or does not exist!
      </p>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className="error-button"
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

export default Notfound;
