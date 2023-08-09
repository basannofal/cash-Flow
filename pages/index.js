import Container from "@/component/Container";
import { useRouter } from "next/router";
import { useEffect } from "react";



export default function Home() {
  const router = useRouter()

  useEffect(() => {
    let x = localStorage.getItem("is_login");
    if(!x){
      router.push('/login')
    }
  }, []);
  return (
    <>


      <Container>
        

          <div className="header">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li><a href="#">
                  Analytics
                </a></li>
                /
                <li><a href="#" className="active">Shop</a></li>
              </ul>
            </div>
            <a href="#" className="report">
              <i className='bx bx-cloud-download'></i>
              <span>Download CSV</span>
            </a>
          </div>

          {/* Insights  */}
          <ul className="insights">
            <li>
              <i className='bx bx-calendar-check'></i>
              <span className="info">
                <h3>
                  1,074
                </h3>
                <p>Paid Order</p>
              </span>
            </li>
            <li><i className='bx bx-show-alt'></i>
              <span className="info">
                <h3>
                  3,944
                </h3>
                <p>Site Visit</p>
              </span>
            </li>
            <li><i className='bx bx-line-chart'></i>
              <span className="info">
                <h3>
                  14,721
                </h3>
                <p>Searches</p>
              </span>
            </li>
            <li><i className='bx bx-dollar-circle'></i>
              <span className="info">
                <h3>
                  $6,742
                </h3>
                <p>Total Sales</p>
              </span>
            </li>
          </ul>
          {/* End of Insights  */}

          <div className="bottom-data">
            <div className="orders">
              <div className="header">
                <i className='bx bx-receipt'></i>
                <h3>Recent Orders</h3>
                <i className='bx bx-filter'></i>
                <i className='bx bx-search'></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Order Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img src="images/profile-1.jpg" />
                      <p>John Doe</p>
                    </td>
                    <td>14-08-2023</td>
                    <td><span className="status completed">Completed</span></td>
                  </tr>
                  <tr>
                    <td>
                      <img src="images/profile-1.jpg" />
                      <p>John Doe</p>
                    </td>
                    <td>14-08-2023</td>
                    <td><span className="status pending">Pending</span></td>
                  </tr>
                  <tr>
                    <td>
                      <img src="images/profile-1.jpg" />
                      <p>John Doe</p>
                    </td>
                    <td>14-08-2023</td>
                    <td><span className="status process">Processing</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Reminders  */}
            <div className="reminders">
              <div className="header">
                <i className='bx bx-note'></i>
                <h3>Remiders</h3>
                <i className='bx bx-filter'></i>
                <i className='bx bx-plus'></i>
              </div>
              <ul className="task-list">
                <li className="completed">
                  <div className="task-title">
                    <i className='bx bx-check-circle'></i>
                    <p>Start Our Meeting</p>
                  </div>
                  <i className='bx bx-dots-vertical-rounded'></i>
                </li>
                <li className="completed">
                  <div className="task-title">
                    <i className='bx bx-check-circle'></i>
                    <p>Analyse Our Site</p>
                  </div>
                  <i className='bx bx-dots-vertical-rounded'></i>
                </li>
                <li className="not-completed">
                  <div className="task-title">
                    <i className='bx bx-x-circle'></i>
                    <p>Play Footbal</p>
                  </div>
                  <i className='bx bx-dots-vertical-rounded'></i>
                </li>
              </ul>
            </div>

            {/* End of Reminders */}

          </div>

      </Container>

    </>
  )
}



            // {/* Add Data */}
            // <div className="bottom-data">
            //     <div className="orders">
            //         <div className="header">
            //             <i className='bx bx-receipt'></i>
            //             <h3>Add New Member</h3>
            //         </div>
            //         <section className={styles.container}>
            //             {/* <header>Registration Form</header> */}
            //             <form action="#" className={styles.form}>
            //                 <div className={styles.input_box} >
            //                     <label>Full Name</label>
            //                     <input type="text" placeholder="Enter full name" required />
            //                 </div>
            //                 <div className={styles.input_box}>
            //                     <label>Email Address</label>
            //                     <input type="text" placeholder="Enter email address" required />
            //                 </div>
            //                 <div className={styles.column}>
            //                     <div className={styles.input_box}>
            //                         <label>Phone Number</label>
            //                         <input type="number" placeholder="Enter phone number" required />
            //                     </div>
            //                     <div className={styles.input_box}>
            //                         <label>Birth Date</label>
            //                         <input type="date" placeholder="Enter birth date" required />
            //                     </div>
            //                 </div>
            //                 <div className={styles.gender_box} >
            //                     <h3>Gender</h3>
            //                     <div className={styles.gender_option}>
            //                         <div className={styles.gender}>
            //                             <input type="radio" id="check-male" name="gender" checked />
            //                             <label for="check-male">male</label>
            //                         </div>
            //                         <div className={styles.gender}>
            //                             <input type="radio" id="check-female" name="gender" />
            //                             <label for="check-female">Female</label>
            //                         </div>
            //                         <div className={styles.gender}>
            //                             <input type="radio" id="check-other" name="gender" />
            //                             <label for="check-other">prefer not to say</label>
            //                         </div>
            //                     </div>
            //                 </div>
            //                 <div className={`${styles.input_box} ${styles.address}`}>
            //                     <label>Address</label>
            //                     <input type="text" placeholder="Enter street address" required />
            //                     <input type="text" placeholder="Enter street address line 2" required />
            //                     <div className={styles.column}>
            //                         <div className={styles.select_box}>
            //                             <select>
            //                                 <option hidden>Country</option>
            //                                 <option>America</option>
            //                                 <option>Japan</option>
            //                                 <option>India</option>
            //                                 <option>Nepal</option>
            //                             </select>
            //                         </div>
            //                         <input type="text" placeholder="Enter your city" required />
            //                     </div>
            //                     <div className={styles.column}>
            //                         <input type="text" placeholder="Enter your region" required />
            //                         <input type="number" placeholder="Enter postal code" required />
            //                     </div>
            //                 </div>
            //                 <button>Submit</button>
            //             </form>
            //         </section>
            //     </div>
            // </div>
            // {/* End Add Data */}
       