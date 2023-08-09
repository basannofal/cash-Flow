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
            console.log(action.payload);
            return { category };
        },
        editCategory: (state, action) => {
            // Implement editing logic
            state.category.push(action.payload);
            console.log(action.payload);
            return { category };
        },
        deleteCategory: (state, action) => {
            return { category };
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/routes`);
        const categoryData = response.data;
        console.log(response.data);
        dispatch(fetchCategory(categoryData)); // Dispatch the action with the fetched data
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

// Async action creator for post data
export const addCategoryAsync = (catData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category/routes`, catData);
        const addedCategory = response.data;

        dispatch(addCategory(addedCategory)); // Add the category to Redux store
    } catch (error) {
        console.error("Error adding category:", error);
    }
};



// Async action creator for Edit data
export const editCategoryAsync = (id,catData) => async (dispatch) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, catData);
        const updatedCategory = response.data;

        dispatch(editCategory(updatedCategory)); // Add the category to Redux store
    } catch (error) {
        console.error("Error adding category:", error);
    }
};


export const deleteCategoryAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`);
        dispatch(deleteCategory(id)); // Add the category to Redux store
    } catch (error) {
        console.error("Error adding category:", error);
    }
};


