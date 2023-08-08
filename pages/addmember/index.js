import Container from '@/component/Container'
import Header from '@/component/Header'
import styles from '@/styles/form.module.css'

const index = () => {
    return (
        <Container>
            {/*  Heading */}
            <Header mainheading="Add Member" tag1='memberlist' tag2="addmember" icon='bx-plus' />
            {/* End Heading */}

            {/* Display Data */}
            <div className="bottom-data">
                <div className="orders">
                    <div className="header">
                        <i className='bx bx-receipt'></i>
                        <h3>Add New Member</h3>
                    </div>
                    <section className={styles.container}>
                        {/* <header>Registration Form</header> */}
                        <form action="#" className={styles.form}>
                            <div className={styles.input_box} >
                                <label>Full Name</label>
                                <input type="text" placeholder="Enter full name" required />
                            </div>
                            <div className={styles.input_box}>
                                <label>Email Address</label>
                                <input type="text" placeholder="Enter email address" required />
                            </div>
                            <div className={styles.column}>
                                <div className={styles.input_box}>
                                    <label>Phone Number</label>
                                    <input type="number" placeholder="Enter phone number" required />
                                </div>
                                <div className={styles.input_box}>
                                    <label>Birth Date</label>
                                    <input type="date" placeholder="Enter birth date" required />
                                </div>
                            </div>
                            <div className={styles.gender_box} >
                                <h3>Gender</h3>
                                <div className={styles.gender_option}>
                                    <div className={styles.gender}>
                                        <input type="radio" id="check-male" name="gender" checked />
                                        <label for="check-male">male</label>
                                    </div>
                                    <div className={styles.gender}>
                                        <input type="radio" id="check-female" name="gender" />
                                        <label for="check-female">Female</label>
                                    </div>
                                    <div className={styles.gender}>
                                        <input type="radio" id="check-other" name="gender" />
                                        <label for="check-other">prefer not to say</label>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.input_box} ${styles.address}`}>
                                <label>Address</label>
                                <input type="text" placeholder="Enter street address" required />
                                <input type="text" placeholder="Enter street address line 2" required />
                                <div className={styles.column}>
                                    <div className={styles.select_box}>
                                        <select>
                                            <option hidden>Country</option>
                                            <option>America</option>
                                            <option>Japan</option>
                                            <option>India</option>
                                            <option>Nepal</option>
                                        </select>
                                    </div>
                                    <input type="text" placeholder="Enter your city" required />
                                </div>
                                <div className={styles.column}>
                                    <input type="text" placeholder="Enter your region" required />
                                    <input type="number" placeholder="Enter postal code" required />
                                </div>
                            </div>
                            <button>Submit</button>
                        </form>
                    </section>
                </div>
            </div>
            {/* End Display Data */}
        </Container>
    )
}

export default index