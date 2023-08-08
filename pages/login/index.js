import {  useState } from "react";
import styles from "./login.module.css"
import axios from "axios";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter()

  // state
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })


  // hadnle input value when it is change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value })

  }

  // save data
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: loginData.username,
      password: loginData.password
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/login`
    axios.post(url, data).then(function (response) {
      if (response.data.length > 0) {
        localStorage.setItem("is_login", response.data.length);
        localStorage.setItem("is_admin", response.data[0].is_admin)
        router.push("/")
      }else{
        window.alert("Password is In correct")
      }
    }).catch(function (error) {
      window.alert("Data base Error")
      console.log("This is ERoor " + error);
    });

  }

  return (
    <>
      <div className={`${styles.maincontainer}`}>
        <div className={`${styles.container}`}>
          <div className={styles.forms_container}>
            <div className={`${styles.form_control} ${styles.signin_form}`}>
              <form action="#">
                <h2>Signin</h2>
                <input type="text" name="username" value={loginData.username} placeholder="Username" onChange={handleInputChange} required />
                <input type="password" name="password" value={loginData.password} placeholder="Password" onChange={handleInputChange} required />
                {
                  loginData.username == '' || loginData.password == '' ?
                    <button disabled className="disable-btn">Signin</button>
                    :
                    <button onClick={handleSubmit}>Signin</button>
                }
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default index