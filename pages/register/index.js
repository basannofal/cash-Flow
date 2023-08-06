import React from 'react'
import styles from '@/pages/login/login.module.css'
import Link from 'next/link'

const index = () => {
    return (
        <>
            {/* <div class={`${styles.maincontainer}`}>
                <div class={`${styles.change}`}>
                    <div class={styles.forms_container}>
                        <div class={`${styles.form_control} ${styles.signin_form}`}>
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
                        </div>
                    </div>

                </div>
            </div> */}
            <div class={`${styles.maincontainer}`}>
                <div class={`${styles.container}`} style={{height:'520px'}}>
                    <div class={styles.forms_container}>
                        <div class={`${styles.form_control} ${styles.signin_form}`}>
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
                            <div class={styles.socials}>
                                <i class="fab fa-facebook-f"></i>
                                <i class="fab fa-google-plus-g"></i>
                                <i class="fab fa-linkedin-in"></i>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default index