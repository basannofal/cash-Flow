import React, { useState } from "react";
import styles from '@/styles/custome.module.css'


const CofirmAfterAdd = ({ title, body, btn1, btn2, onConfirm, onback, onClose }) => {
  const [openModal, setOpenModal] = useState(true);

  const closeModal = () => {
    setOpenModal(false);
    onClose(); // Call the provided onClose function
  };

  const confirmAction = () => {
    onConfirm(); // Call the provided onConfirm function
    closeModal(); // Close the modal after the action is confirmed
  };

  const backAction = () => {
    onback(); // Call the provided onConfirm function
    closeModal(); // Close the modal after the action is confirmed
  };

  return (
    <div className="box">
      {openModal && (
        <div className={styles.modal_container} id="modal">
          <div className={styles.modal}>

            <section >
              <h1 className={styles.modal__title}>{title}</h1>

              {/* <header>Registration Form</header> */}
              <p className={styles.modal__text}>{body}</p>


              <div className={styles.modal_btn_group}>
                <button className={styles.modal__btn} onClick={backAction}>
                  {btn1} 
                </button>
                <button className={styles.modal__btn} onClick={confirmAction}>
                  {btn2}
                </button>
              </div>
            </section>
            <a href="#modal" className={styles.link_2}></a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CofirmAfterAdd;

