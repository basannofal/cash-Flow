import React, { useEffect, useState } from 'react'
import styles from '@/styles/form.module.css'
import {  fetchMemberAsync, fetchPerMemberAsync } from '@/store/slices/MemberSlice';
import { useDispatch, useSelector } from 'react-redux';
import { editBorrowAsync, fetchPerBorrowAsync } from '@/store/slices/BorrowSlice';
import ReactDOM from "react-dom";
import ToastifyAlert from '@/component/CustomComponent/ToastifyAlert';
import SkeletonForm from '@/component/skeleton/SkeletonForm';

const UpdateBorrow = ({ mid, id, bid }) => {

    const dispatch = useDispatch();
    const member = useSelector((state) => state.member.member);
    const perborrow = useSelector((state) => state.borrow.perborrow);
    const errormsg = useSelector((state) => state.error.error.msg);
    const errortype = useSelector((state) => state.error.error.type);


    // state 
    const [validationError, setValidationError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // Track form validity
    const [isDataFetch, setIsDataFetch] = useState(false);

    const [PaymentData, setPaymentData] = useState({
        amount: '',
        collectedby: '',
        mid: '',
        bailmid: ''
    });


    // handle change input value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...PaymentData, [name]: value })
    }


    // Form Validataion 
    useEffect(() => {
        // Check if all fields except altMobileNo are filled
        const allFieldsFilled = Object.values(PaymentData).every((value) => value !== '');
        setIsFormValid(allFieldsFilled);
    }, [PaymentData, id]);




    // Save DAta 
    const handleSubmit = (e) => {
        e.preventDefault();
        let username = localStorage.getItem("user");
        // Validate all fields

        if (isNaN(PaymentData.amount)) {
            setValidationError(`Amount Accept Only Digit Number`);
            return;
        }

        // Process form data here
        setValidationError('');
        // setPaymentData({ ...PaymentData, username })

        try {
            dispatch(editBorrowAsync(id, { ...PaymentData, username }));
            ReactDOM.render(
                <ToastifyAlert
                    type={errortype}
                    message={errormsg}
                />,
                document.getElementById("CustomComponent")
            );

        } catch (error) {
            ReactDOM.render(
                <ToastifyAlert
                    type={errortype}
                    message={errormsg}
                />,
                document.getElementById("CustomComponent")
            );
        }
    }


    // Auto Complete Field For Member

    const sortedNames = [...member].sort((a, b) => a.fname.localeCompare(b.fname))



    // Auto Complete Field For Bail 

    const [bailInputValue, setBailInputValue] = useState('');
    const [InputValue, setInputValue] = useState('');
    const [suggestedBailNames, setSuggestedBailNames] = useState([]);

    const handleChangeBailAutoComplete = (event) => {
        const value = event.target.value;
        setBailInputValue(value);

        const bailSuggestions = sortedNames.filter(m => {
            const fullName = `${m.fname} ${m.mname} ${m.lname}`.toLowerCase();
            return fullName.includes(value.toLowerCase()) || m.id == value;
        }
        );
        setSuggestedBailNames(bailSuggestions);
        setPaymentData(prevData => ({ ...prevData, bailmid: '' }));
    };

    const handleBailNameClick = (name, value) => {
        setBailInputValue(name);
        setPaymentData(prevData => ({ ...prevData, bailmid: value }));
        setSuggestedBailNames([]);
    };




    // Fetch Data
    useEffect(() => {
        console.log(perborrow);
        dispatch(fetchMemberAsync())
        dispatch(fetchPerMemberAsync(bid)).then((data) => {
            console.log(data);
            setBailInputValue(data.fname + " " + data.mname + " " + data.lname)
        }).catch((err) => {
            console.log(err);
        })
        dispatch(fetchPerMemberAsync(mid)).then((data) => {
            console.log(data);
            setInputValue(data.fname + " " + data.mname + " " + data.lname)
        }).catch((err) => {
            console.log(err);
        })
        dispatch(fetchPerBorrowAsync(id)).then((data) => {
            setPaymentData({ amount: data.amount, collectedby: data.given_by, mid: mid, bailmid: data.bail_m_id })
            setIsDataFetch(true)
        }).catch((err) => {
            console.log(err);
        })
    }, []);

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
                                    <label htmlFor='fullName'>Select Member</label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name"
                                        name='fullName'
                                        id='fullName'
                                        value={InputValue}
                                        autoComplete='off'
                                        required
                                        disabled
                                        className='cursor-not-allowed'
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
                                <div className={styles.input_box}>
                                    <label htmlFor='bailname'>Select Bail Member</label>
                                    <input
                                        type="text"
                                        placeholder="Enter full name"
                                        name='bailname'
                                        id='bailname'
                                        value={bailInputValue}
                                        onChange={handleChangeBailAutoComplete}
                                        autoComplete='off'
                                        required
                                    />
                                    <ul className="autocompletelist">
                                        {suggestedBailNames.slice(0, 5).map((e, index) => (
                                            <li
                                                key={index}
                                                className="autocomplete-list-items"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => handleBailNameClick(e.fname + " " + e.mname + " " + e.lname, e.id)}
                                            >
                                                <b><span className='mr-2'>{e.id}</span>{`${e.fname} ${e.mname} ${e.lname}`}</b>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {validationError && <p className='text-red-600 mt-5' >* {validationError}</p>}

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

export default UpdateBorrow