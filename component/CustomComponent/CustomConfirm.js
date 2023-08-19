import React, { useState } from "react";
import styles from '@/styles/custome.module.css'

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
        <div className={styles.modal_container} id="modal">
          <div className={styles.modal}>
            <h1 className={styles.modal__title}>{title}</h1>
            <p className={styles.modal__text}>{body}</p>
            <button className={styles.modal__btn} onClick={closeModal}>
              Cancel &rarr;
            </button>
            <button className={styles.modal__btn} onClick={confirmAction}>
              {button} &rarr;
            </button>
            <a href="#modal" className={styles.link_2}></a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomConfirm;
