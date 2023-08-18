import React, { useState } from "react";

const CustomConfirm = ({ title, body, button, onConfirm, onClose }) => {
  const [openModal, setOpenModal] = useState(true);

  const closeModal = () => {
    setOpenModal(false);
    onClose(); // Call the provided onClose function
  };

  const confirmAction = () => {
    onConfirm(); // Call the provided onConfirm function
    closeModal(); // Close the modal after the action is confirmed
  };

  return (
    <div className="box">
      {openModal && (
        <div className="modal-container" id="modal">
          <div className="modal">
            <h1 className="modal__title">{title}</h1>
            <p className="modal__text">{body}</p>
            <button className="modal__btn" onClick={closeModal}>
              Cancel &rarr;
            </button>
            <button className="modal__btn" onClick={confirmAction}>
              {button} &rarr;
            </button>
            <a href="#modal" className="link-2"></a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomConfirm;
