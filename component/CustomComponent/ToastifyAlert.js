import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastifyAlert = ({ type, message }) => {
  const toastFunction = toast[type]; // Get the correct toast function

  if (typeof toastFunction === "function") {
    toastFunction(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    console.error(`Toast type "${type}" is not valid.`);
  }

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default ToastifyAlert;
