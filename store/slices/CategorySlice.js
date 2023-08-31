import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { clearError, setError } from "./ErrorSlice";

const initialState = {
    category: [],
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addCategory: (state, action) => {
            state.category.push(action.payload);
        },
        editCategory: (state, action) => {
            const editedIndex = state.category.findIndex(item => item.id === action.payload.id);
            if (editedIndex !== -1) {
                state.category[editedIndex] = action.payload;
            }
        },
        deleteCategory: (state, action) => {
            state.category = state.category.filter(item => item.id !== action.payload);
        },
        fetchCategory: (state, action) => {
            state.category = action.payload; // Replace the state with new data
        },
    },
});

export const { addCategory, editCategory, deleteCategory, fetchCategory } = categorySlice.actions;
export default categorySlice.reducer;


// Async action creator for fetch data
export const fetchCategoryAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/routes`);
        const categoryData = response.data;
        console.log(response.data);
        dispatch(fetchCategory(categoryData)); // Dispatch the action with the fetched data
    } catch (error) {
        dispatch(setError({msg:"Category Fetching Error ", type :"error"}));
        throw error;
    }
};

// Async action creator for post data
export const addCategoryAsync = (catData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category/routes`, catData);
        const addedCategory = response.data;

        dispatch(addCategory(addedCategory)); // Add the category to Redux store
        await dispatch(setError({msg:"Category Added Successfully", type :"success"}));
    } catch (error) {
        dispatch(setError({msg:"Category Not Added ", type :"error"}));
        throw error;
    }
};



// Async action creator for Edit data
export const editCategoryAsync = (id,catData) => async (dispatch) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, catData);
        const updatedCategory = response.data;

        await dispatch(editCategory(updatedCategory)); // Add the category to Redux store
        dispatch(setError({msg:"Category Edited Successfully", type :"success"}));
    } catch (error) {
        dispatch(setError({msg:"Error In Category Edit", type :"error"}));
        throw error;
    }
};


export const deleteCategoryAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`);
        console.log(dispatch);
        dispatch(deleteCategory({ id })); // Add the category to Redux store
        dispatch(setError({msg:"Category Deleted Successfully", type :"success"}));
    } catch (error) {
        dispatch(setError({msg:"Category Use In Any Payment", type :"error"}));
        console.log(error);
        throw error;
    }
};


