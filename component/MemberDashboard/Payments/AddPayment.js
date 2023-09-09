import React, { useEffect, useState } from 'react'
import styles from '@/styles/form.module.css'
import { fetchMemberAsync, fetchPerMemberAsync } from '@/store/slices/MemberSlice';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryAsync } from '@/store/slices/CategorySlice';
import { addPaymentAsync } from '@/store/slices/PaymentSlice';
import ReactDOM from "react-dom";
import ToastifyAlert from '@/component/CustomComponent/ToastifyAlert';
import CofirmAfterAdd from '@/component/CustomComponent/CofirmAfterAdd';
import { useRouter } from 'next/router';

const AddPayment = ({ mid }) => {


    // Globel State Manegment
    const router = useRouter();
    const dispatch = useDispatch();
    const member = useSelector((state) => state.member.permember);
    const categories = useSelector((state) => state.category.category);
    const errormsg = useSelector((state) => state.error.error.msg);
    const errortype = useSelector((state) => state.error.error.type);



    // state 
    const [validationError, setValidationError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // Track form validity

    const [PaymentData, setPaymentData] = useState({
        amount: '',
        collectedby: '',
        date: new Date().toISOString().substr(0, 10),
        note: "",
        mid: mid,
        cid: '',
    });


    // handle change input value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...PaymentData, [name]: value })
    }


    // Form Validataion 
    useEffect(() => {
        // Check if all fields except altMobileNo are filled
        const { note, ...fieldsToCheck } = PaymentData;
        const allFieldsFilled = Object.values(fieldsToCheck).every((value) => value !== '');
        setIsFormValid(allFieldsFilled);
    }, [PaymentData]);

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
            await dispatch(addPaymentAsync({ ...PaymentData, username }));

            ReactDOM.render(
                <CofirmAfterAdd
                    title="Payment Added Successfully"
                    body={`dou you want to add New Payment ?`}
                    btn1="No"
                    btn2="Yes"
                    onConfirm={() => {
                        setValidationError(<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
                            <span class="font-medium">Success !</span> Payment Added Successfully.
                        </div>);
                        setPaymentData({ amount: '', collectedby: "", date: new Date().toISOString().substr(0, 10), note: "", cid: 0, mid: mid })
                    }}
                    onback={async () => {
                        router.push(`/memberdashboard/payments/${mid}`)
                    }}
                    onClose={() => {
                        // if once click cancel button so, Close the modal
                        // Close the modal using ReactDOM.unmountComponentAtNode

                        ReactDOM.unmountComponentAtNode(
                            document.getElementById("CustomComponent")
                        );
                    }}
                />,
                document.getElementById("CustomComponent") // root element
            );

        } catch (error) {
            setValidationError(error)
        }
    }


    // Auto Complete Field




    useEffect(() => {
        dispatch(fetchPerMemberAsync(mid))
        dispatch(fetchCategoryAsync())
    }, [])



    return (
        <>
            {/* Add Data */}
            <div className="bottom-data">
                <div className="orders">
                    <div className="header">
                        <i className='bx bx-receipt'></i>
                        <h3>Add New Payment</h3>
                    </div>
                    <section className={styles.container}>
                        {/* <header>Registration Form</header> */}
                        <form action="#" className={styles.form}>
                            <div className={styles.input_box}>
                                <label htmlFor='fullName'>Select Member</label>
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    name='fullName'
                                    id='fullName'
                                    className='cursor-not-allowed'
                                    value={`${member.fname} ${member.mname} ${member.lname}`}
                                    autoComplete='off'
                                    disabled
                                    required
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

                                    <select name='cid' onChange={handleChange} >
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
            {/* End Add Data */}
        </>
    )
}

export default AddPayment
