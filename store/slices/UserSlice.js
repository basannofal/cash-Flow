import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./ErrorSlice";

const initialState = {
    user: [],
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user.push(action.payload);
        },
        editUser: (state, action) => {
            const { id, updatedUserData } = action.payload;
            const userIndex = state.user.findIndex(user => user.id === id);
            if (userIndex !== -1) {
                state.user[userIndex] = { ...state.user[userIndex], ...updatedUserData };
            }
        },
        deleteUser: (state, action) => {
            const idToDelete = action.payload;
            state.user = state.user.filter(user => user.id !== idToDelete);
        },
        fetchUser: (state, action) => {
            state.user = action.payload;
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
        await dispatch(fetchUser(userData)); // Dispatch the action with the fetched data
        return userData
    } catch (error) {
        dispatch(setError({ msg: "Error fetching users", type: "error" }));
        throw error;
    }
};

// Async action creator for post data
export const addUserAsync = (userData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/routes`, userData);
        const addedUser = response.data;

        dispatch(addUser(addedUser)); // Add the user to Redux store
        dispatch(setError({ msg: "User Added Successfully", type: "success" }));
    } catch (error) {
        dispatch(setError({ msg: "Error adding user", type: "error" }));
        throw error;
    }
};

// Async action creator for Edit data
export const editUserAsync = (id, updatedUserData) => async (dispatch) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, updatedUserData);
        const updatedUser = response.data;

        dispatch(editUser({ id, updatedUserData: updatedUser })); // Update the user in Redux store
        dispatch(setError({ msg: "User Edited Successfully", type: "success" }));
    } catch (error) {
        dispatch(setError({ msg: "Error editing user", type: "error" }));
        throw error;
    }
};

export const deleteUserAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
        dispatch(deleteUser(id)); // Delete the user from Redux store
        dispatch(setError({ msg: "User Deleted Successfully", type: "success" }));
    } catch (error) {
        dispatch(setError({ msg: "Error deleting user", type: "error" }));
        throw error;
    }
};
