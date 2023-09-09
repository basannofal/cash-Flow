import React, { useEffect, useState } from 'react'
import styles from '@/styles/form.module.css'
import { fetchPerMemberAsync } from '@/store/slices/MemberSlice';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryAsync } from '@/store/slices/CategorySlice';
import ReactDOM from "react-dom";
import ToastifyAlert from '@/component/CustomComponent/ToastifyAlert';
import { addReturnPaymentAsync, editReturnPaymentAsync, fetchPerReturnedPaymentAsync } from '@/store/slices/ReturnPaymentSlice';
import SkeletonForm from '@/component/skeleton/SkeletonForm';


const EditReturnPayment = ({ mid, id }) => {


    // Globel State Manegment
    const dispatch = useDispatch();
    const permember = useSelector((state) => state.member.permember);
    const perreturnedpayment = useSelector((state) => state.returnpayment.perreturnedpayment);
    const errormsg = useSelector((state) => state.error.error.msg);
    const errortype = useSelector((state) => state.error.error.type);
    const categories = useSelector((state) => state.category.category);



    // state 
    const [validationError, setValidationError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // Track form validity
    const [fullname, setfullname] = useState('');
    const [isDataFetch, setIsDataFetch] = useState(false);


    const [PaymentData, setPaymentData] = useState({
        amount: '',
        returnby: '',
        widhrawername: '',
        mobileno: '',
        date: '',
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
        // Process form data here
        setValidationError('');


        try {
            dispatch(editReturnPaymentAsync(id, { ...PaymentData, username }));
            ReactDOM.render(
                <ToastifyAlert
                    type={errortype}
                    message={errormsg}
                />,
                document.getElementById("CustomComponent")
            );
            setValidationError(<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
                <span class="font-medium">Success !</span> Refund Payment Updated Successfully.
            </div>);
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
        const getdata = async () => {
            await dispatch(fetchPerMemberAsync(mid));
            await dispatch(fetchCategoryAsync())
            await dispatch(fetchPerReturnedPaymentAsync(id)).then((data) => {
            const parsedDate = new Date(data.date);
                setPaymentData({
                    amount: data.amount,
                    returnby: data.return_by,
                    widhrawername: data.withdrawer_name,
                    mobileno: data.mobile_no,
                    date: parsedDate.toISOString().slice(0, 10), 
                    note: data.note,
                    mid: mid,
                    cid: data.c_id
                })
            }).catch((err) => {
                console.log(err);
            })
            setfullname(`${permember.fname} ${permember.mname} ${permember.lname}`)
            setIsDataFetch(true)
        }
        getdata()
    }, [])



    return (
        <>
            {/* Add Data */}
            {!isDataFetch ?
                <SkeletonForm /> :
                <div className="bottom-data">
                    <div className="orders">
                        <div className="header">
                            <i className='bx bx-receipt'></i>
                            <h3>Return Payment</h3>
                        </div>
                        <section className={styles.container}>
                            {/* <header>Registration Form</header> */}
                            <form action="#" className={styles.form}>

                                <div className={styles.input_box}>
                                    <label >Member Name</label>
                                    <input type="text" className='cursor-not-allowed' value={fullname} disabled />
                                </div>

                                <div className={styles.column}>
                                    <div className={styles.input_box}>
                                        <label htmlFor='amount'>Amount</label>
                                        <input type="text" placeholder="Enter Amount" name='amount' id='amount' value={PaymentData.amount} onChange={handleChange} required />
                                    </div>
                                    <div className={styles.input_box}>
                                        <label htmlFor='returnby'>Return By</label>
                                        <input type="text" placeholder="Enter Return By" name='returnby' id='returnby' value={PaymentData.returnby} onChange={handleChange} required />
                                    </div>
                                </div>

                                <div className={styles.column}>
                                    <div className={styles.input_box}>
                                        <label htmlFor='widhrawername'>Withdrawer Name</label>
                                        <input type="text" placeholder="Enter Withdrawer Name" name='widhrawername' id='widhrawername' value={PaymentData.widhrawername} onChange={handleChange} required />
                                    </div>
                                    <div className={styles.input_box}>
                                        <label htmlFor='mobileno'>Mobile No</label>
                                        <input type="text" placeholder="Enter Mobile No" name='mobileno' id='mobileno' value={PaymentData.mobileno} onChange={handleChange} required />
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
                                                    if (e.id === PaymentData.cid) {
                                                        return (
                                                            <option selected key={e.id} value={e.id}>{e.name}</option>
                                                        )
                                                    } else {
                                                        return (
                                                            <option key={e.id} value={e.id}>{e.name}</option>
                                                        )
                                                    }
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
            }
            {/* End Add Data */}
        </>
    )
}

export default EditReturnPayment
