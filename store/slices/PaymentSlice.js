import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    payment: [],
    perpayment : [],
};

const PaymentSlices = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        addPayment: (state, action) => {
            state.payment.push(action.payload);
            console.log(action.payload);
            return { payment };
        },
        editPayment: (state, action) => {
            // Implement editing logic
            state.payment.push(action.payload);
            console.log(action.payload);
            return { payment };
        },
        deletePayment: (state, action) => {
            return { payment };
        },
        fetchPayment: (state, action) => {
            return { ...state, payment: action.payload }; // Replace the state with new data
        },
        fetchPerPayment : (state, action) => {
            return {...state, perpayment: action.payload }; // Replace the state with new data
        },
    },
})


export const { addPayment, editPayment, deletePayment, fetchPayment, fetchPerPayment } = PaymentSlices.actions;
export default PaymentSlices.reducer;



// Async action creator for fetch data
export const fetchPaymentAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/routes`);
        const paymentData = response.data;
        console.log(response.data);
        dispatch(fetchPayment(paymentData)); // Dispatch the action with the fetched data
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};




// Async action creator for fetch PER payment data
export const fetchPerPaymentAsync = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/${id}`);
        const paymentData = response.data[0];
        console.log(response.data[0]);
        let data = dispatch(fetchPerPayment(paymentData)); // Dispatch the action with the fetched 
        console.log(data);
        return data.payload
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};



// Async action creator for post data
export const addPaymentAsync = (catData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/routes`, catData);
        const addedCategory = response.data;

        dispatch(addPayment(addedCategory)); // Add the category to Redux store
    } catch (error) {
        console.error("Error adding category:", error);
    }
};




// Async action creator for Edit data
export const editPaymentAsync = (id,paymentData) => async (dispatch) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/payment/${id}`, paymentData);
        const updatedpayment = response.data;

        dispatch(editPayment(updatedpayment)); // Add the payment to Redux store
    } catch (error) {
        console.error("Error adding payment:", error);
    }
};





// Delete payments

export const deletePaymentAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/payment/${id}`);
        dispatch(deletePayment(id)); // Delete the payment to Redux store
    } catch (error) {
        console.error("Error adding payment:", error);
    }
};


