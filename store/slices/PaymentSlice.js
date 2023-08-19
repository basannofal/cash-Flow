import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    payment: [],
    perpayment: [],
};

const PaymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        addPayment: (state, action) => {
            state.payment.push(action.payload);
            console.log(action.payload);
        },
        editPayment: (state, action) => {
            // Implement editing logic here
            const editedPaymentIndex = state.payment.findIndex(item => item.id === action.payload.id);
            if (editedPaymentIndex !== -1) {
                state.payment[editedPaymentIndex] = action.payload;
                console.log(action.payload);
            }
        },
        deletePayment: (state, action) => {
            state.payment = state.payment.filter(item => item.id !== action.payload);
        },
        fetchPayment: (state, action) => {
            state.payment = action.payload;
        },
        fetchPerPayment: (state, action) => {
            state.perpayment = action.payload;
        },
    },
});

export const { addPayment, editPayment, deletePayment, fetchPayment, fetchPerPayment } = PaymentSlice.actions;
export default PaymentSlice.reducer;

// Async action creator for fetch data
export const fetchPaymentAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/routes`);
        const paymentData = response.data;
        console.log(response.data);
        await dispatch(fetchPayment(paymentData));
        return paymentData
    } catch (error) {
        dispatch(setError({ msg: "Error fetching payments", type: "error" }));
        throw error;
    }
};

// Async action creator for fetch PER payment data
export const fetchPerPaymentAsync = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/payment/${id}`);
        const paymentData = response.data[0];
        console.log(response.data[0]);
        await dispatch(fetchPerPayment(paymentData));
        return paymentData
    } catch (error) {
        dispatch(setError({ msg: "Error fetching payment", type: "error" }));
        throw error;
    }
};

// Async action creator for post data
export const addPaymentAsync = (paymentData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/routes`, paymentData);
        const addedPayment = response.data;
        dispatch(addPayment(addedPayment));
    } catch (error) {
        dispatch(setError({ msg: "Error adding payment", type: "error" }));
        throw error;
    }
};

// Async action creator for Edit data
export const editPaymentAsync = (id, paymentData) => async (dispatch) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/payment/${id}`, paymentData);
        const updatedPayment = response.data;
        dispatch(editPayment(updatedPayment));
    } catch (error) {
        dispatch(setError({ msg: "Error editing payment", type: "error" }));
        throw error;
    }
};

// Delete payments
export const deletePaymentAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/payment/${id}`);
        dispatch(deletePayment(id));
    } catch (error) {
        dispatch(setError({ msg: "Error deleting payment", type: "error" }));
        throw error;
    }
};
