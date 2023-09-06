import React, { useEffect, useState } from 'react'
import styles from '@/styles/form.module.css'
import { fetchMemberAsync, fetchPerMemberAsync } from '@/store/slices/MemberSlice';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryAsync } from '@/store/slices/CategorySlice';
import { addBorrowAsync } from '@/store/slices/BorrowSlice';
import ReactDOM from "react-dom";
import ToastifyAlert from '@/component/CustomComponent/ToastifyAlert';

const AddBorrow = ({ mid }) => {


    // Globel State Manegment
    const dispatch = useDispatch();
    const member = useSelector((state) => state.member.member);
    const permember = useSelector((state) => state.member.permember);
    const errormsg = useSelector((state) => state.error.error.msg);
    const errortype = useSelector((state) => state.error.error.type);



    // state 
    const [validationError, setValidationError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false); // Track form validity

    const [PaymentData, setPaymentData] = useState({
        amount: '',
        collectedby: '',
        mid: mid,
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

        if (PaymentData.mid == PaymentData.bailmid) {
            setValidationError(<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
                <span class="font-medium">Error !</span> Member Can Not Be Own Bail...
            </div>);
            return;
        }

        // Process form data here
        setValidationError('');


        try {
            dispatch(addBorrowAsync({ ...PaymentData, username }));
            ReactDOM.render(
                <ToastifyAlert
                    type={errortype}
                    message={errormsg}
                />,
                document.getElementById("CustomComponent")
            );
            setValidationError(<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 " role="alert">
                <span class="font-medium">Success !</span> Payment Added Successfully.
            </div>);
            setPaymentData({ amount : '', collectedby:"", bailmid: "", mid : mid });
            setBailInputValue("")
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


    // Auto Complete Field For Member

    const sortedNames = [...member].sort((a, b) => a.fname.localeCompare(b.fname))

    // Auto Complete Field For Bail 

    const [bailInputValue, setBailInputValue] = useState('');
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


    useEffect(() => {
        dispatch(fetchPerMemberAsync(mid))
        dispatch(fetchMemberAsync())
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
                                    value={`${permember.fname} ${permember.mname} ${permember.lname}`}
                                    autoComplete='off'
                                    required
                                    disabled
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

export default AddBorrow

