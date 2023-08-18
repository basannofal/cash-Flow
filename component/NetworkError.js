import React, { useState, useEffect } from "react";
import { FiAlertTriangle, FiGlobe, FiX } from "react-icons/fi";
import CustomAlert from "./CustomComponent/CustomAlert";

const NetworkError = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      localStorage.setItem("isOnline", "true");
    };
    const handleOffline = () => {
      setIsOnline(false);
      localStorage.setItem("isOnline", "false");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Get initial status from localStorage
    const initialStatus = localStorage.getItem("isOnline");
    if (initialStatus === "false") {
      setIsOnline(false);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleCloseClick = () => {
    setIsOnline(true);
    localStorage.setItem("isOnline", "true");
  };

  if (isOnline) {
    return null; // Don't render the component if online
  }

  return (
    <CustomAlert
      type="error" // type of message like : error, success, warning.
      message="No Internet, you are offline." // write the message.
      icon={<FiGlobe className="icon" />} // icon the alert.
      // close={<FiX />} // close button on alert.
      // handleClose={handleCloseClick} // onclick on alert.
    />
  );
};

export default NetworkError;
