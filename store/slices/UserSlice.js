import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: [],
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user.push(action.payload);
            console.log(action.payload);
            return { user };
        },
        editUser: (state, action) => {
            // Implement editing logic
            state.user.push(action.payload);
            console.log(action.payload);
            return { user };
        },
        deleteUser: (state, action) => {
            return { user };
        },
        fetchUser: (state, action) => {
            return { ...state, user: action.payload }; // Replace the state with new data
        },
    },
});

export const { addUser, editUser, deleteUser, fetchUser } = UserSlice.actions;
export default UserSlice.reducer;


// Async action creator for fetch data
export const fetchUserAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/routes`);
        const userData = response.data;
        console.log(response.data);
        dispatch(fetchUser(userData)); // Dispatch the action with the fetched data
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};

// Async action creator for post data
export const addUserAsync = (catData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/routes`, catData);
        const addedUser = response.data;

        dispatch(addUser(addedUser)); // Add the category to Redux store
    } catch (error) {
        console.error("Error adding category:", error);
    }
};



// Async action creator for Edit data
export const editUserAsync = (id,catData) => async (dispatch) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, catData);
        const updatedUser = response.data;

        dispatch(editUser(updatedUser)); // Add the category to Redux store
    } catch (error) {
        console.error("Error adding category:", error);
    }
};


export const deleteUserAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
        dispatch(deleteUser(id)); // Add the category to Redux store
    } catch (error) {
        console.error("Error adding category:", error);
    }
};


