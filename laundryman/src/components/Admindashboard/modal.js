import React from "react";
import "./modal.css";

import { useEffect } from "react";

function CustomModal({ show, handleClose, children }) {
  const modalStyle = show ? { display: "block" } : { display: "none" };

  return (
    <div className="custom-modal" style={modalStyle}>
      <div className="custom-modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}

export default CustomModal;
