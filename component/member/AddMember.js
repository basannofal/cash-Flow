import React, { useEffect, useState } from 'react'
import styles from '@/styles/form.module.css'
import { addMemberAsync } from '@/store/slices/MemberSlice';
import { useSelector, useDispatch } from 'react-redux';


const AddMember = () => {

    
    // Globel State Manegment
    const dispatch = useDispatch();
    const member = useSelector((state) => state.member.member);


    // state 
    const [validationError, setValidationError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // Track form validity
    const [memberData, setMemberData] = useState({
        fullName: '',
        mobileNo: '',
        altMobileNo: '',
        email: '',
        address: '',
        aadharNo: '',
        backAcNo: '',
        ifsc: ''
    });

    // Form Validataion 
    useEffect(() => {
        // Check if all fields are filled
        const allFieldsFilled = Object.values(memberData).every((value) => value !== '');
        setIsFormValid(allFieldsFilled);
    }, [memberData]);


    // handle change input value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMemberData({ ...memberData, [name]: value })
    }

    // Save DAta 
    const handleSubmit = (e) => {
        e.preventDefault();
        let username = localStorage.getItem("user");
        // Validate all fields
        if (!isFormValid) {
            setValidationError(`Please fill in all fields.`);
            return;
        }

        // Process form data here
        setValidationError('');
        setMemberData({...memberData, [username]:username})

        dispatch(addMemberAsync(memberData));
    }

    return (
        <>
            {/* Add Data */}
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
                                <label htmlFor='fullName'>Full Name</label>
                                <input type="text" placeholder="Enter full name" name='fullName' id='fullName' value={memberData.fullName} onChange={handleChange} required />
                            </div>

                            <div className={styles.column}>
                                <div className={styles.input_box}>
                                    <label htmlFor='mobileNo'>Phone Number</label>
                                    <input type="text" placeholder="Enter phone number" name='mobileNo' id='mobileNo' value={memberData.mobileNo} onChange={handleChange} required />
                                </div>
                                <div className={styles.input_box}>
                                    <label htmlFor='altMobileNo'>Alter Phone Number</label>
                                    <input type="text" max={10} placeholder="Enter phone number" name='altMobileNo' id='altMobileNo' value={memberData.altMobileNo} onChange={handleChange} required />
                                </div>
                                <div className={styles.input_box}>
                                    <label htmlFor='email'>Email Address</label>
                                    <input type="text" placeholder="Enter email address" name='email' id='email' value={memberData.email} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className={`${styles.input_box} ${styles.address}`}>
                                <label htmlFor='address'>Address</label>
                                <input type="text" placeholder="Enter street address" name='address' id='address' value={memberData.address} onChange={handleChange} required />
                            </div>
                            <div className={`${styles.input_box} ${styles.address}`}>
                                <label htmlFor='aadharNo'>Aadhar Card Number</label>
                                <input type="text" placeholder="Enter aadhar card number" name='aadharNo' id='aadharNo' value={memberData.aadharNo} onChange={handleChange} required />
                            </div>

                            <div className={styles.column}>
                                <div className={styles.input_box}>
                                    <label htmlFor='backAcNo'>Bank Account Number</label>
                                    <input type="text" placeholder="Enter Bank Account Number" name='backAcNo' id='backAcNo' value={memberData.backAcNo} onChange={handleChange} required />
                                </div>
                                <div className={styles.input_box}>
                                    <label htmlFor='ifsc'>IFSC Code</label>
                                    <input type="text" id='ifsc' placeholder="Enter IFSC Code" name='ifsc' value={memberData.ifsc} onChange={handleChange} required />
                                </div>
                            </div>
                            {validationError && <p className='text-red-600 mt-5' >* {validationError}</p>}

                            <button className={`${isFormValid ? '' : 'disable-btn'}`} onClick={handleSubmit} disabled={!isFormValid}>Submit</button>
                        </form>
                    </section>
                </div>
            </div>
            {/* End Add Data */}
        </>
    )
}

export default AddMember