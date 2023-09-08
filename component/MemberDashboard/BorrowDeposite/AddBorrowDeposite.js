import React, { useEffect, useState } from 'react'
import styles from '@/styles/form.module.css'
import { fetchMemberAsync, fetchPerMemberAsync } from '@/store/slices/MemberSlice';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryAsync } from '@/store/slices/CategorySlice';
import { addBorrowAsync, totalborrowpaymentAsync } from '@/store/slices/BorrowSlice';
import ReactDOM from "react-dom";
import ToastifyAlert from '@/component/CustomComponent/ToastifyAlert';
import { addBorrowDepositeAsync, totalborrowdepositeAsync } from '@/store/slices/MemberBorrowDepositeSlice';
import { useRouter } from 'next/router';


const AddBorrowDeposite = ({ mid }) => {


    // Globel State Manegment
    const dispatch = useDispatch();
    const router = useRouter()
    const permember = useSelector((state) => state.member.permember);
    const errormsg = useSelector((state) => state.error.error.msg);
    const errortype = useSelector((state) => state.error.error.type);

    let totalborrowdeposite = useSelector((state) => state.borrowdeposite.totalborrowdepositepayment);
    let totalborrow = useSelector((state) => state.borrow.totalborrowpayment);


    // state 
    const [validationError, setValidationError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // Track form validity

    const [PaymentData, setPaymentData] = useState({
        amount: '',
        collectedby: 'Self',
        dipositeby: '',
        mobileno:'',
        mid: mid,
    });


    // handle change input value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...PaymentData, [name]: value })
    }


    // Form Validataion 
    useEffect(() => {
        // Check if all fields except altMobileNo are filled
        const { mobileno, ...fieldsToCheck } = PaymentData;
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

        console.log(parseInt(PaymentData.amount) + totalborrowdeposite);
        console.log(totalborrow);
        if((parseInt(PaymentData.amount) + totalborrowdeposite ) > totalborrow){
            setValidationError(`You Have Left Only ${totalborrow - totalborrowdeposite} Rs`);
            return;
        }

        // Process form data here
        setValidationError('');


        try {
            dispatch(addBorrowDepositeAsync({ ...PaymentData, username }));
            ReactDOM.render(
                <ToastifyAlert
                    type={errortype}
                    message={errormsg}
                />,
                document.getElementById("CustomComponent")
            );
            router.push(`/memberdashboard/borrowpayment/${mid}`)

        } catch (error) {
            console.log(error);
            ReactDOM.render(
                <ToastifyAlert
                    type={errortype}
                    message={errormsg}
                />,
                document.getElementById("CustomComponent")
            );
        }
    }

    useEffect(() => {
        dispatch(fetchPerMemberAsync(mid));
        dispatch(totalborrowdepositeAsync(mid));
        dispatch(totalborrowpaymentAsync(mid))
    }, [])



    return (
        <>
            {/* Add Data */}
            <div className="bottom-data">
                <div className="orders">
                    <div className="header">
                        <i className='bx bx-receipt'></i>
                        <h3>Add Borrow Deposite</h3>
                    </div>
                    <section className={styles.container}>
                        {/* <header>Registration Form</header> */}
                        <form action="#" className={styles.form}>

                            <div className={styles.input_box}>
                                <label >Member Name</label>
                                <input type="text" className='cursor-not-allowed'  value={`${permember.fname} ${permember.mname} ${permember.lname}`} disabled />
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
                                    <label htmlFor='dipositeby'>Deposite By</label>
                                    <input type="text" placeholder="Enter Deposite By" name='dipositeby' id='dipositeby' value={PaymentData.dipositeby} onChange={handleChange} required />
                                </div>
                                <div className={styles.input_box}>
                                    <label htmlFor='mobileno'>Mobile No</label>
                                    <input type="text" placeholder="Enter Mobile No" name='mobileno' id='mobileno' value={PaymentData.mobileno} onChange={handleChange} required />
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

export default AddBorrowDeposite