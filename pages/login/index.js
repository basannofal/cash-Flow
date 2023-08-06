import { useEffect, useState } from "react";
import styles from "./login.module.css"
import axios from "axios";

const index = () => {

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value })

  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    
    formdata.append("username", loginData.username);
    formdata.append("password", loginData.password);

    axios.get(`http://localhost:3000/api/login`,formdata).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log("This is ERoor " +error);
    });

  }

  return (
    <>
      <div class={`${styles.maincontainer}`}>
        <div class={`${styles.container}`}>
          <div class={styles.forms_container}>
            {/* <div class={`${styles.form_control} ${styles.signup_form}`}>
              <form action="#">
                <h2>Signup</h2>
                <input type="text" placeholder="Username" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <input type="password" placeholder="Confirm password" required />
                <button>Signup</button>
              </form>
              <span>or signup with</span>
              <div class={styles.socials}>
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-google-plus-g"></i>
                <i class="fab fa-linkedin-in"></i>
              </div>
            </div> */}
            <div class={`${styles.form_control} ${styles.signin_form}`}>
              <form action="#">
                <h2>Signin</h2>
                <input type="text" name="username" placeholder="Username" onChange={handleInputChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
                <button onClick={handleSubmit}>Signin</button>
              </form>

              {/* <span style={{marginTop:10}}>Create new account  <Link href='/register' >Signup</Link></span> */}
              {/* <span>or signin with</span>
              <div class={styles.socials}>
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-google-plus-g"></i>
                <i class="fab fa-linkedin-in"></i>
              </div> */}
            </div>
          </div>
          {/* <div class={styles.intros_container}>
          <div class={`${styles.intro_control} ${styles.signin_intro}`}>
            <div class="intro_control__inner">
              <h2>Welcome back!</h2>
              <p>
                Welcome back! We are so happy to have you here. It's great to see you again. We hope you had a safe and enjoyable time away.
              </p>
              <button id="signup_btn">No account yet? Signup.</button>
            </div>
          </div>
          <div class="intro_control signup_intro">
            <div class="intro_control__inner">
              <h2>Come join us!</h2>
              <p>
                We are so excited to have you here.If you haven't already, create an account to get access to exclusive offers, rewards, and discounts.
              </p>
              <button id="signin_btn">Already have an account? Signin.</button>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </>
  )
}

export default index