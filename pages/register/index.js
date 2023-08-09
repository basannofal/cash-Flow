import React from 'react'
import styles from '@/pages/login/login.module.css'
import Link from 'next/link'

const index = () => {
    return (
        <>
            {/* <div className={`${styles.maincontainer}`}>
                <div className={`${styles.change}`}>
                    <div className={styles.forms_container}>
                        <div className={`${styles.form_control} ${styles.signin_form}`}>
                            <form action="#">
                                <h2>Signup</h2>
                                <input type="text" placeholder="Username" required />
                                <input type="email" placeholder="Email" required />
                                <input type="password" placeholder="Password" required />
                                <input type="password" placeholder="Confirm password" required />
                                <button>Signup</button>
                            </form>
                            <span>or signup with</span>
                            <div className={styles.socials}>
                                <i className="fab fa-facebook-f"></i>
                                <i className="fab fa-google-plus-g"></i>
                                <i className="fab fa-linkedin-in"></i>
                            </div>
                        </div>
                    </div>

                </div>
            </div> */}
            <div className={`${styles.maincontainer}`}>
                <div className={`${styles.container}`} style={{height:'520px'}}>
                    <div className={styles.forms_container}>
                        <div className={`${styles.form_control} ${styles.signin_form}`}>
                            <form action="#">
                                <h2>Signup</h2>
                                <input type="text" placeholder="Username" required />
                                <input type="email" placeholder="Email" required />
                                <input type="password" placeholder="Password" required />
                                <input type="password" placeholder="Confirm password" required />
                                <button>Signup</button>
                            </form>
                            <span style={{marginTop:10}}> Already register ? <Link href='/login' >Login</Link></span>
                            {/* <span>or signup with</span>
                            <div className={styles.socials}>
                                <i className="fab fa-facebook-f"></i>
                                <i className="fab fa-google-plus-g"></i>
                                <i className="fab fa-linkedin-in"></i>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default index