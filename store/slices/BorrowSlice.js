import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./ErrorSlice";

const initialState = {
    borrow: [],
    perborrow: {},
    permemberborrow: [],
    totalborrowpayment : 0,
};

const BorrowSlices = createSlice({
    name: 'borrow',
    initialState,
    reducers: {
        addBorrow: (state, action) => {
            state.borrow.push(action.payload);
        },
        editBorrow: (state, action) => {
            const updatedIndex = state.borrow.findIndex(item => item.id === action.payload.id);
            if (updatedIndex !== -1) {
                state.borrow[updatedIndex] = action.payload;
            }
        },
        deleteBorrow: (state, action) => {
            state.borrow = state.borrow.filter(item => item.id !== action.payload);
        },
        fetchBorrow: (state, action) => {
            state.borrow = action.payload;
        },
        fetchPerBorrow: (state, action) => {
            state.perborrow = action.payload;
        },
        fetchPerMemberBorrow: (state, action) => {
            state.permemberborrow = action.payload;
        },
        totalborrowpayments: (state, action) => {
            state.totalborrowpayment =  action.payload;
        },
    },
})

export const { addBorrow, editBorrow, deleteBorrow, fetchBorrow, fetchPerBorrow, totalborrowpayments, fetchPerMemberBorrow } = BorrowSlices.actions;
export default BorrowSlices.reducer;

// Async action creator for fetch data
export const fetchBorrowAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrow/routes`);
        const borrowData = response.data;
        await dispatch(fetchBorrow(borrowData)); // Dispatch the action with the fetched data
        return borrowData
    } catch (error) {
        dispatch(setError({msg:"Borrow Payment Fetching Error", type :"error"}));
        throw error;
    }
};

// Async action creator for fetch PER borrow data
export const fetchPerBorrowAsync = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrow/${id}`);
        const borrowData = response.data[0];
        await dispatch(fetchPerBorrow(borrowData)); // Dispatch the action with the fetched data
        return borrowData
    } catch (error) {
        dispatch(setError({msg:"Error fetching per borrow data", type :"error"}));
        throw error;
    }
};


// Async action creator for fetch data
export const fetchPerMemberBorrowAsync = (mid) => async (dispatch) => {
    try {
        console.log("******CALLED**********");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrow/routes`);
        const paymentData = response.data;
        const filteredPaymentData = paymentData.filter(item => item.m_id  == mid);

        await dispatch(fetchPerMemberBorrow(filteredPaymentData));
        return paymentData
    } catch (error) {
        dispatch(setError({ msg: "Error fetching payments", type: "error" }));
        throw error;
    }
};



// Async action creator for post data
export const addBorrowAsync = (borrowData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/borrow/routes`, borrowData);
        const addedBorrow = response.data;
        dispatch(addBorrow(addedBorrow)); // Add the borrow to Redux store
        dispatch(setError({msg:"borrow Added Succesfully", type :"success"}));
    } catch (error) {
        dispatch(setError({msg:"Error adding borrow", type :"error"}));
        throw error;
    }
};

// Async action creator for Edit data
export const editBorrowAsync = (id, borrowData) => async (dispatch) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/borrow/${id}`, borrowData);
        const updatedBorrow = response.data;
        dispatch(editBorrow(updatedBorrow)); // Update the borrow in Redux store
        dispatch(setError({msg:"Borrow Edited Succesfully", type :"success"}));
    } catch (error) {
        dispatch(setError({msg:"Error editing borrow", type :"error"}));
        throw error;
    }
};

// Delete borrows
export const deleteBorrowAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/borrow/${id}`);
        dispatch(deleteBorrow(id)); // Delete the borrow from Redux store
        dispatch(setError({msg:"Borrow Deleted Succesfully", type :"success"}));
    } catch (error) {
        dispatch(setError({msg:"Error deleting borrow", type :"error"}));
        throw error;
    }
};




// sum of totalborrowpayment  
export const totalborrowpaymentAsync = (mid) => async (dispatch, getState) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrow/routes`);
        const data = response.data;
        const perPayments = data.filter((e) => e.m_id == mid);

        const totalAmount = perPayments.reduce((sum, payment) => sum + payment.amount, 0);
        dispatch(totalborrowpayments(totalAmount));
        return totalAmount;
    } catch (error) {
        dispatch(setError({ msg: "Error calculating total amount", type: "error" }));
        throw error;
    }
};