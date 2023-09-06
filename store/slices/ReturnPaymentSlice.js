import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./ErrorSlice";

const initialState = {
    returnpayment: [],
    permemberreturnpayment: [],
    perreturnedpayment : [],
    totalreturnpayment : 0
};

const ReturnPaymentSlice = createSlice({
    name: 'returnpayment',
    initialState,
    reducers: {
        addReturnPayment: (state, action) => {
            state.returnpayment.push(action.payload);
            console.log(action.payload);
        },
        editReturnPayment: (state, action) => {
            // Implement editing logic here
            const editedreturnPaymentIndex = state.returnpayment.findIndex(item => item.id === action.payload.id);
            if (editedreturnPaymentIndex !== -1) {
                state.returnpayment[editedreturnPaymentIndex] = action.payload;
                console.log(action.payload);
            }
        },
        deleteReturnPayment: (state, action) => {
            state.returnpayment = state.returnpayment.filter(item => item.id !== action.payload);
        },
        totalreturnpayments: (state, action) => {
            state.totalreturnpayment =  action.payload;
        },
        fetchReturnPayment: (state, action) => {
            state.returnpayment = action.payload;
        },
        fetchPerMemberReturnPayment: (state, action) => {
            state.permemberreturnpayment = action.payload;
        },
        fetchPerReturnedPayment: (state, action) => {
            state.perreturnedpayment = action.payload;
        },
         
    },
});

export const { addReturnPayment, editReturnPayment, deleteReturnPayment, fetchReturnPayment, fetchPerMemberReturnPayment, totalreturnpayments, fetchPerReturnedPayment } = ReturnPaymentSlice.actions;
export default ReturnPaymentSlice.reducer;

// Async action creator for fetch data
export const fetchReturnPaymentAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/returnpayment/routes`);
        const returnpaymentData = response.data;
        console.log(response.data);
        await dispatch(fetchReturnPayment(returnpaymentData));
        return returnpaymentData
    } catch (error) {
        dispatch(setError({ msg: "Error fetching returnpayments", type: "error" }));
        throw error;
    }
};

// Async action creator for fetch PER returnpayment data
export const fetchPerMemberReturnPaymentAsync = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/returnpayment/${id}`);
        const returnpaymentData = response.data;
        console.log(response.data[0]);
        await dispatch(fetchPerMemberReturnPayment(returnpaymentData));
        return returnpaymentData
    } catch (error) {
        dispatch(setError({ msg: "Error fetching returnpayment", type: "error" }));
        throw error;
    }
};

// Async action creator for post data
export const addReturnPaymentAsync = (returnpaymentData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/returnpayment/routes`, returnpaymentData);
        const addedreturnPayment = response.data;
        dispatch(addReturnPayment(addedreturnPayment));
        dispatch(setError({ msg: "returnPayment Added Successfully", type: "success" }));
    } catch (error) {
        dispatch(setError({ msg: "Error adding returnpayment", type: "error" }));
        throw error;
    }
};

// Async action creator for Edit data
export const editReturnPaymentAsync = (id, returnpaymentData) => async (dispatch) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/returnpayment/${id}`, returnpaymentData);
        const updatedreturnPayment = response.data;
        dispatch(editReturnPayment(updatedreturnPayment));
        dispatch(setError({ msg: "returnPayment Updated Successfully", type: "success" }));
    } catch (error) {
        dispatch(setError({ msg: "Error editing returnpayment", type: "error" }));
        throw error;
    }
};

// Delete returnpayments
export const deleteReturnPaymentAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/returnpayment/${id}`);
        dispatch(deleteReturnPayment(id));
        dispatch(setError({ msg: "returnPayment Deleted Successfully", type: "success" }));
    } catch (error) {
        dispatch(setError({ msg: "Error deleting returnpayment", type: "error" }));
        throw error;
    }
};

 
// sum of perretunpayment 
export const totalreturnpaymentAsync = (mid) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/returnpayment/${mid}`);
        const perReturnPayments = response.data
        console.log(response.data);
        const totalAmount = perReturnPayments.reduce((sum, payment) => sum + payment.amount, 0);
        dispatch(totalreturnpayments(totalAmount));
        return totalAmount;
    } catch (error) {
        dispatch(setError({ msg: "Error calculating total amount", type: "error" }));
        throw error;
    }
};



// Async action creator for fetch data
export const fetchPerReturnedPaymentAsync = (mid) => async (dispatch) => {
    try {
        console.log("******CALLED**********");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/returnpayment/routes`);
        const paymentData = response.data;
        const filteredPaymentData = paymentData.filter(item => item.id  == mid);
        console.log(filteredPaymentData[0]);

        await dispatch(fetchPerReturnedPayment(filteredPaymentData[0]));
        return filteredPaymentData[0]
    } catch (error) {
        dispatch(setError({ msg: "Error fetching payments", type: "error" }));
        throw error;
    }
};

