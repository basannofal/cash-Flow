import React, { useEffect, useState } from 'react'
import styles from '@/styles/form.module.css'
import { fetchPerMemberAsync } from '@/store/slices/MemberSlice';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryAsync } from '@/store/slices/CategorySlice';
import ReactDOM from "react-dom";
import ToastifyAlert from '@/component/CustomComponent/ToastifyAlert';
import { addReturnPaymentAsync, totalreturnpaymentAsync } from '@/store/slices/ReturnPaymentSlice';
import { totalpaymentAsync } from '@/store/slices/PaymentSlice';
import { useRouter } from 'next/router';
import CofirmAfterAdd from '@/component/CustomComponent/CofirmAfterAdd';


const AddReturnPayment = ({ mid }) => {


    // Globel State Manegment
    const router = useRouter()
    const dispatch = useDispatch();
    const permember = useSelector((state) => state.member.permember);
    const errormsg = useSelector((state) => state.error.error.msg);
    const errortype = useSelector((state) => state.error.error.type);
    const categories = useSelector((state) => state.category.category);
    const totalpayment = useSelector((state) => state.payment.totalpayment);
    const totalreturnpayment = useSelector((state) => state.returnpayment.totalreturnpayment);


    // state 
    const [validationError, setValidationError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // Track form validity

    const [PaymentData, setPaymentData] = useState({
        amount: '',
        returnby: '',
        widhrawername: 'Self',
        mobileno: '',
        date: new Date().toISOString().substr(0, 10),
        note: "",
        mid: mid,
        cid: ''
    });


    // handle change input value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...PaymentData, [name]: value })
    }


    // Form Validataion 
    useEffect(() => {
        // Check if all fields except altMobileNo are filled
        const { mobileno, note, ...fieldsToCheck } = PaymentData;
        const allFieldsFilled = Object.values(fieldsToCheck).every((value) => value !== '');
        setIsFormValid(allFieldsFilled);
    }, [PaymentData]);

    // Save DAta 
    const handleSubmit = (e) => {
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

        if ((parseInt(PaymentData.amount) + totalreturnpayment) > totalpayment) {
            setValidationError(<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                <span class="font-medium">Error !</span> You Have Not Sufficient Money...
            </div>);
            return;
        }

        // Process form data here
        setValidationError('');


        try {
            dispatch(addReturnPaymentAsync({ ...PaymentData, username }));

            ReactDOM.render(
                <CofirmAfterAdd
                    title="Payment Added Successfully"
                    body={`dou you want to add New Payment ?`}
                    btn1="No"
                    btn2="Yes"
                    onConfirm={() => {

                        setValidationError(<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
                            <span class="font-medium">Success !</span> Refund Payment Added Successfully.
                        </div>);
                        setPaymentData({
                            amount: '',
                            returnby: '',
                            widhrawername: 'Self',
                            mobileno: '',
                            date: new Date().toISOString().substr(0, 10),
                            note: "",
                            mid: mid,
                            cid: ''
                        })
                    }}
                    onback={async () => {
                        router.push(`/memberdashboard/allpayment/${mid}`)
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
            console.log(error);
            setValidationError(error)
        }
    }

    useEffect(() => {
        dispatch(fetchPerMemberAsync(mid));
        dispatch(fetchCategoryAsync())
        dispatch(totalreturnpaymentAsync(mid));
        dispatch(totalpaymentAsync(mid))
    }, [])



    return (
        <>
            {/* Add Data */}
            <div className="bottom-data">
                <div className="orders">
                    <div className="header">
                        <i className='bx bx-receipt'></i>
                        <h3>Return Payment</h3>
                        <h5> Member Id = {mid}</h5>

                    </div>
                    <section className={styles.container}>
                        {/* <header>Registration Form</header> */}
                        <form action="#" className={styles.form}>

                            <div className={styles.input_box}>
                                <label >Member Name <span className='text-red-500'>*</span></label>
                                <input type="text" className='cursor-not-allowed' value={`${permember.fname} ${permember.mname} ${permember.lname}`} disabled />
                            </div>

                            <div className={styles.column}>
                                <div className={styles.input_box}>
                                    <label htmlFor='amount'>Amount <span className='text-red-500'>*</span></label>
                                    <input type="text" placeholder="Enter Amount" name='amount' id='amount' value={PaymentData.amount} onChange={handleChange} required />
                                </div>
                                <div className={styles.input_box}>
                                    <label htmlFor='returnby'>Return By <span className='text-red-500'>*</span></label>
                                    <input type="text" placeholder="Enter Return By" name='returnby' id='returnby' value={PaymentData.returnby} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className={styles.column}>
                                <div className={styles.input_box}>
                                    <label htmlFor='widhrawername'>Withdrawer Name <span className='text-red-500'>*</span></label>
                                    <input type="text" placeholder="Enter Withdrawer Name" name='widhrawername' id='widhrawername' value={PaymentData.widhrawername} onChange={handleChange} required />
                                </div>
                                <div className={styles.input_box}>
                                    <label htmlFor='mobileno'>Mobile No</label>
                                    <input type="text" placeholder="Enter Mobile No" name='mobileno' id='mobileno' value={PaymentData.mobileno} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className={styles.column}>
                                <div className={styles.input_box}>
                                    <label htmlFor='date'>Date <span className='text-red-500'>*</span></label>
                                    <input type="date" placeholder="Enter Date" name='date' id='date' value={PaymentData.date} onChange={handleChange} required />
                                </div>
                                <div className={styles.input_box}>
                                    <label htmlFor='note'>Note </label>
                                    <input type="text" placeholder="Enter Note" name='note' id='note' value={PaymentData.note} onChange={handleChange} required />
                                </div>
                            </div>


                            <div className={styles.input_box} >
                                <label className='mt-10'>Select Category <span className='text-red-500'>*</span></label>
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

                            {validationError && <p className='text-red-600 mt-5' > {validationError}</p>}

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

export default AddReturnPayment