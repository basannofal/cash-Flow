import React, { useEffect, useState } from 'react'
import styles from '@/styles/form.module.css'
import { editMemberAsync, fetchPerMemberAsync } from '@/store/slices/MemberSlice';
import { useDispatch, useSelector } from 'react-redux';
import { editPaymentAsync, fetchPerPaymentAsync } from '@/store/slices/PaymentSlice';
import { fetchCategoryAsync } from '@/store/slices/CategorySlice';
import ReactDOM from "react-dom";
import ToastifyAlert from '@/component/CustomComponent/ToastifyAlert';
import SkeletonForm from '@/component/skeleton/SkeletonForm';

const UpdatePayment = ({ id }) => {

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.category);
    const errormsg = useSelector((state) => state.error.error.msg);
    const errortype = useSelector((state) => state.error.error.type);


    // state 
    const [validationError, setValidationError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // Track form validity
    const [isDataFetch, setIsDataFetch] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [PaymentData, setPaymentData] = useState({
        amount: '',
        collectedby: '',
        date: '',
        note: "",
        mid: '',
        cid: '',
    });




    // Form Validataion 
    useEffect(() => {
        // Check if all fields except altMobileNo are filled
        const { note, ...fieldsToCheck } = PaymentData;
        const allFieldsFilled = Object.values(fieldsToCheck).every((value) => value !== '');
        setIsFormValid(allFieldsFilled);
    }, [PaymentData, id]);





    // handle change input value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...PaymentData, [name]: value })
    }



    // Save DAta 
    const handleSubmit = async (e) => {
        e.preventDefault();
        let username = localStorage.getItem("user");
        // Validate all fields

        if (isNaN(PaymentData.amount)) {
            setValidationError(<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                <span class="font-medium">Error !</span> Amount Accept Only Digit Number...
            </div>);
            return;
        }

        if (PaymentData.amount <= 0) {
            setValidationError(<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                <span class="font-medium">Error !</span> Amount Should be Grether Than 0...
            </div>);
            return;
        }
        
        if (PaymentData.cid == 0) {
            setValidationError(<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                <span class="font-medium">Error !</span> Select Category...
            </div>);
            return;
        }

        // Process form data here
        setValidationError('');
        // setPaymentData({ ...PaymentData, username })

        try {
            await dispatch(editPaymentAsync(id, { ...PaymentData, username }));
            ReactDOM.render(
                <ToastifyAlert
                    type={errortype}
                    message={errormsg}
                />,
                document.getElementById("CustomComponent")
            )
            setValidationError(<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
                <span class="font-medium">Success !</span> Payment Updated Successfully.
            </div>);
        } catch (error) {
            ReactDOM.render(
                <ToastifyAlert
                    type={errortype}
                    message={errormsg}
                />,
                document.getElementById("CustomComponent")
            )
        }
    }


    // Fetch Data
    useEffect(() => {
        dispatch(fetchCategoryAsync())
        dispatch(fetchPerPaymentAsync(id)).then((data) => {
            const parsedDate = new Date(data.date);

            setPaymentData({ amount: data.amount, collectedby: data.collected_by, date: parsedDate.toISOString().slice(0, 10), note: data.note, mid: data.m_id, cid: data.c_id })

            dispatch(fetchPerMemberAsync(data.m_id)).then((data) => {
                console.log(data);
                setInputValue(data.fname + " " + data.mname + " " + data.lname)
                setIsDataFetch(true)
            }).catch((err) => {
                console.log(err);
            })

        }).catch((err) => {
            console.log(err);
        })
    }, [id]);

    return (
        <>
            {/* Update Data */}
            {!isDataFetch ?
                <SkeletonForm /> :
                <div className="bottom-data">
                    <div className="orders">
                        <div className="header">
                            <i className='bx bx-receipt'></i>
                            <h3>Edit Payment</h3>
                        </div>
                        <section className={styles.container}>
                            {/* <header>Registration Form</header> */}
                            <form action="#" className={styles.form}>
                                <div className={styles.input_box}>
                                    <label htmlFor='fullName'>Member Info</label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name"
                                        name='fullName'
                                        id='fullName'
                                        value={inputValue}
                                        autoComplete='off'
                                        disabled
                                        required
                                        style={{ opacity: .8, cursor: 'not-allowed' }}
                                    />
                                </div>


                                <div className={styles.column}>
                                    <div className={styles.input_box}>
                                        <label htmlFor='amount'>Amount</label>
                                        <input type="text" placeholder="Enter Amount" name='amount' id='amount' value={PaymentData.amount} onChange={handleChange} required />
                                    </div>
                                    <div className={styles.input_box}>
                                        <label htmlFor='collectedby'>Collected By</label>
                                        <input type="text" placeholder="Enter collectedby address" name='collectedby' id='collectedby' value={PaymentData.collectedby} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className={styles.column}>
                                    <div className={styles.input_box}>
                                        <label htmlFor='date'>Date</label>
                                        <input type="date" placeholder="Enter Date" name='date' id='date' value={PaymentData.date} onChange={handleChange} required />
                                    </div>
                                    <div className={styles.input_box}>
                                        <label htmlFor='note'>Note</label>
                                        <input type="text" placeholder="Enter Note" name='note' id='note' value={PaymentData.note} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className={styles.input_box} >
                                    <label className='mt-10'>Select Category</label>
                                    <div className={styles.select_box}>

                                        <select name='cid' onChange={handleChange} value={PaymentData.cid} >
                                            <option value={0}>Null</option>
                                            {
                                                categories.map((e, i) => {
                                                    return (
                                                        <option key={e.id} value={e.id}>{e.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                {validationError && <p className='text-red-600 mt-5' >{validationError}</p>}

                                <button className={`${isFormValid ? '' : 'disable-btn'}`} disabled={!isFormValid} onClick={handleSubmit}>Submit</button>
                            </form>
                        </section>
                        <div id="CustomComponent"></div>

                    </div>
                </div>
            }
            {/* End Update Data */}
        </>
    )
}

export default UpdatePayment
