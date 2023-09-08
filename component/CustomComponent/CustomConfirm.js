import React, { useState } from "react";
import styles from '@/styles/custome.module.css'
import Formstyles from '@/styles/form.module.css'


const CustomConfirm = ({ title, body, button, onConfirm, onClose }) => {
  const [openModal, setOpenModal] = useState(true);
  const [captcha, setCaptcha] = useState(""); // Captcha input value
  const [captchaError, setCaptchaError] = useState(false); // Captcha error flag

  const closeModal = () => {
    setOpenModal(false);
    onClose(); // Call the provided onClose function
  };

  const confirmAction = () => {
    if (captcha === "1234") {
      onConfirm(); // Call the provided onConfirm function if captcha is correct
      closeModal(); // Close the modal after the action is confirmed
    } else {
      // Set the captcha error flag
      setCaptchaError(true);
    }
  };

  return (
    <div className="box">
      {openModal && (
        <div className={styles.modal_container} id="modal">
          <div className={styles.modal}>

            <section >
              <h1 className={styles.modal__title}>{title}</h1>

              {/* <header>Registration Form</header> */}
              <form action="#" className={Formstyles.form}>
                <div className={Formstyles.input_box} >
                  <label>Type  1234 for {title}</label>
                  <input type="text" placeholder="Enter Captcha"
                    value={captcha}
                    onChange={(e) => {
                      setCaptcha(e.target.value);
                      // Reset the captcha error when the input changes
                      setCaptchaError(false);
                    }} />
                </div>
              </form>

              {captchaError && (
                <div class="mt-2 p-4 mb-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  <span class="font-medium">Incorrect Captcha !</span>
                </div>
              )}
              <div className={styles.modal_btn_group}>
                <button className={styles.modal__btn} onClick={closeModal}>
                  Cancel 
                </button>
                <button className={styles.modal__btn} onClick={confirmAction}>
                  {button}
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

export default CustomConfirm;
