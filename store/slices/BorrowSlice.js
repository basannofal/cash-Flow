import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    borrow: [],
    perborrow : [],
};

const BorrowSlices = createSlice({
    name: 'borrow',
    initialState,
    reducers: {
        addBorrow: (state, action) => {
            state.borrow.push(action.payload);
            console.log(action.payload);
            return { borrow };
        },
        editBorrow: (state, action) => {
            // Implement editing logic
            state.borrow.push(action.payload);
            console.log(action.payload);
            return { borrow };
        },
        deleteBorrow: (state, action) => {
            return { borrow };
        },
        fetchBorrow: (state, action) => {
            return { ...state, borrow: action.payload }; // Replace the state with new data
        },
        fetchPerBorrow : (state, action) => {
            return {...state, perborrow: action.payload }; // Replace the state with new data
        },
    },
})


export const { addBorrow, editBorrow, deleteBorrow, fetchBorrow, fetchPerBorrow } = BorrowSlices.actions;
export default BorrowSlices.reducer;



// Async action creator for fetch data
export const fetchBorrowAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrow/routes`);
        const borrowData = response.data;
        console.log(response.data);
        dispatch(fetchBorrow(borrowData)); // Dispatch the action with the fetched data
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};




// Async action creator for fetch PER borrow data
export const fetchPerBorrowAsync = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/borrow/${id}`);
        const borrowData = response.data[0];
        console.log(response.data[0]);
        let data = dispatch(fetchPerBorrow(borrowData)); // Dispatch the action with the fetched 
        console.log(data);
        return data.payload
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};



// Async action creator for post data
export const addBorrowAsync = (borrowData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/borrow/routes`, borrowData);
        const addedBorrow = response.data;

        dispatch(addBorrow(addedBorrow)); // Add the category to Redux store
    } catch (error) {
        console.error("Error adding category:", error);
    }
};




// Async action creator for Edit data
export const editBorrowAsync = (id,borrowData) => async (dispatch) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/borrow/${id}`, borrowData);
        const updatedborrow = response.data;

        dispatch(editBorrow(updatedborrow)); // Add the borrow to Redux store
    } catch (error) {
        console.error("Error adding borrow:", error);
    }
};





// Delete borrows

export const deleteBorrowAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/borrow/${id}`);
        dispatch(deleteBorrow(id)); // Delete the borrow to Redux store
    } catch (error) {
        console.error("Error adding borrow:", error);
    }
};


