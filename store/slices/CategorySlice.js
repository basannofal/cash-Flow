import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
            // Implement editing logic
        },
        deleteCategory: (state, action) => {
            // Implement deletion logic
        },
        fetchCategory: (state, action) => {
            return { ...state, category: action.payload }; // Replace the state with new data
        },
    },
});

export const { addCategory, editCategory, deleteCategory, fetchCategory } = categorySlice.actions;
export default categorySlice.reducer;


// Async action creator for fetch data
export const fetchCategoryAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);
        const categoryData = response.data;
        dispatch(fetchCategory(categoryData)); // Dispatch the action with the fetched data
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

// Async action creator for post data
export const addCategoryAsync = (catData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category`, catData);
        const addedCategory = response.data;

        dispatch(addCategory(addedCategory)); // Add the category to Redux store
    } catch (error) {
        console.error("Error adding category:", error);
    }
};


