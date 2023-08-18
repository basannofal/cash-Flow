import React from "react";

const CustomAlert = ({ type, message, icon, close, handleClose }) => {
  return (
    <div className={type}>
      <div className="alert-content">
        {icon}
        <p>{message}</p>
        <button
          className="close-button"
          style={{ paddingLeft: "10px" }}
          onClick={handleClose}
        >
          {close}
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
