import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./ErrorSlice";

const initialState = {
    borrowdeposite: [],
    permemberborrowdeposite: [],
    perborrowdeposited : {},
    totalborrowdepositepayment : 0
};

const memberBorrowDepositeSlice = createSlice({
    name: 'borrowdeposite',
    initialState,
    reducers: {
        addBorrowDeposite: (state, action) => {
            state.borrowdeposite.push(action.payload);
            console.log(action.payload);
        },
        editBorrowDeposite: (state, action) => {
            // Implement editing logic
            const editedIndex = state.borrowdeposite.findIndex(borrowdeposite => borrowdeposite.id === action.payload.id);
            if (editedIndex !== -1) {
                state.borrowdeposite[editedIndex] = action.payload;
                console.log(action.payload);
            }
        },
        deleteBorrowDeposite: (state, action) => {
            state.borrowdeposite = state.borrowdeposite.filter(borrowdeposite => borrowdeposite.id !== action.payload);
        },
        fetchBorrowDiposite: (state, action) => {
            state.borrowdeposite = action.payload;
        },
        fetchPerMemberBorrowDeposite: (state, action) => {
            state.permemberborrowdeposite = action.payload;
        },
        totalborrowdeposite: (state, action) => {
            state.totalborrowdepositepayment =  action.payload;
        },
        fetchPerdepositedPayment: (state, action) => {
            state.perborrowdeposited =  action.payload;
        },
    },
});

export const { addBorrowDeposite, editBorrowDeposite, deleteBorrowDeposite, fetchBorrowDiposite, fetchPerMemberBorrowDeposite,fetchPerdepositedPayment, totalborrowdeposite } = memberBorrowDepositeSlice.actions;
export default memberBorrowDepositeSlice.reducer;

// Async action creator for fetch data
export const fetchBorrowDipositeAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrowdeposite/routes`);
        const borrowdepositeData = response.data;
        console.log(borrowdepositeData);
        dispatch(fetchBorrowDiposite(borrowdepositeData)); // Dispatch the action with the fetched data
    } catch (error) {
        dispatch(setError({ msg: "Error fetching Borrow Deposite", type: "error" }));
        throw error;
    }
};

// Async action creator for fetch PER borrowdeposite data
export const fetchPerMemberBorrowDepositeAsync = (id) => async (dispatch) => {
    try {
        console.log("This is id "+id);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrowdeposite/${id}`);
        const borrowdepositeData = response.data;
        console.log(borrowdepositeData);
        dispatch(fetchPerMemberBorrowDeposite(borrowdepositeData)); // Dispatch the action with the fetched data
        return borrowdepositeData;
    } catch (error) {
        dispatch(setError({ msg: "Error fetching Borrow Deposite", type: "error" }));
        throw error;
    }
};

// Async action creator for post data
export const addBorrowDepositeAsync = (borrowdepositeData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/borrowdeposite/routes`, borrowdepositeData);
        const addedborrowdeposite = response.data;
        dispatch(addBorrowDeposite(addedborrowdeposite)); // Add the borrowdeposite to Redux store
        dispatch(setError({ msg: "Borrow Deposite Added Successfully", type: "success" }));
    } catch (error) {
        dispatch(setError({ msg: "Error adding Borrow Deposite", type: "error" }));
        throw error;
    }
};

// Async action creator for Edit data
export const editBorrowDepositeAsync = (id, borrowdepositeData) => async (dispatch) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/borrowdeposite/${id}`, borrowdepositeData);
        const updatedborrowdeposite = response.data;
        dispatch(editBorrowDeposite(updatedborrowdeposite)); // Update the borrowdeposite in Redux store
        dispatch(setError({ msg: "Borrow Deposite Updeted Successfully", type: "success" }));
    } catch (error) {
        dispatch(setError({ msg: "Error editing borrowdeposite", type: "error" }));
        throw error;
    }
};

// Async action creator for deleting borrowdeposite
export const deleteBorrowDepositeAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/borrowdeposite/${id}`);
        dispatch(deleteBorrowDeposite(id)); // Delete the borrowdeposite from Redux store
        dispatch(setError({ msg: "Borrow Deposite Deleted Successfully", type: "success" }));
    } catch (error) {
        dispatch(setError({ msg: "Borrow Deposite Has Any Payment", type: "error" }));
        throw error;
    }
};







// sum of perretunpayment 
export const totalborrowdepositeAsync = (mid) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrowdeposite/${mid}`);
        const perDepositePayments = response.data
        console.log(response.data);
        const totalAmount = perDepositePayments.reduce((sum, payment) => sum + payment.amount, 0);
        dispatch(totalborrowdeposite(totalAmount));
        return totalAmount;
    } catch (error) {
        dispatch(setError({ msg: "Error calculating total amount", type: "error" }));
        throw error;
    }
};



// Async action creator for fetch data
export const fetchPerdepositedPaymentAsync = (id) => async (dispatch) => {
    try {
        console.log("******CALLED**********");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrowdeposite/routes`);
        const paymentData = response.data;
        const filteredPaymentData = paymentData.filter(item => item.id  == id);
        console.log(filteredPaymentData[0]);

        await dispatch(fetchPerdepositedPayment(filteredPaymentData[0]));
        return filteredPaymentData[0]
    } catch (error) {
        dispatch(setError({ msg: "Error fetching payments", type: "error" }));
        throw error;
    }
};