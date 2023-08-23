import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./ErrorSlice";

const initialState = {
    member: [],
    permember: [],
};

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        addMember: (state, action) => {
            state.member.push(action.payload);
            console.log(action.payload);
        },
        editMember: (state, action) => {
            // Implement editing logic
            const editedIndex = state.member.findIndex(member => member.id === action.payload.id);
            if (editedIndex !== -1) {
                state.member[editedIndex] = action.payload;
                console.log(action.payload);
            }
        },
        deleteMember: (state, action) => {
            state.member = state.member.filter(member => member.id !== action.payload);
        },
        fetchMember: (state, action) => {
            state.member = action.payload;
        },
        fetchPerMember: (state, action) => {
            state.permember = action.payload;
        },
    },
});

export const { addMember, editMember, deleteMember, fetchMember, fetchPerMember } = memberSlice.actions;
export default memberSlice.reducer;

// Async action creator for fetch data
export const fetchMemberAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/member/routes`);
        const memberData = response.data;
        console.log(memberData);
        dispatch(fetchMember(memberData)); // Dispatch the action with the fetched data
    } catch (error) {
        dispatch(setError({ msg: "Error fetching members", type: "error" }));
        throw error;
    }
};

// Async action creator for fetch PER Member data
export const fetchPerMemberAsync = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/member/${id}`);
        const memberData = response.data[0];
        console.log(memberData);
        dispatch(fetchPerMember(memberData)); // Dispatch the action with the fetched data
        return memberData;
    } catch (error) {
        dispatch(setError({ msg: "Error fetching member", type: "error" }));
        throw error;
    }
};

// Async action creator for post data
export const addMemberAsync = (memberData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/member/routes`, memberData);
        const addedMember = response.data;
        dispatch(addMember(addedMember)); // Add the member to Redux store
        dispatch(setError({ msg: "Member Added Successfully", type: "success" }));
    } catch (error) {
        dispatch(setError({ msg: "Error adding member", type: "error" }));
        throw error;
    }
};

// Async action creator for Edit data
export const editMemberAsync = (id, memberData) => async (dispatch) => {
    try {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/member/${id}`, memberData);
        const updatedMember = response.data;
        dispatch(editMember(updatedMember)); // Update the member in Redux store
        dispatch(setError({ msg: "Member Updeted Successfully", type: "success" }));
    } catch (error) {
        dispatch(setError({ msg: "Error editing member", type: "error" }));
        throw error;
    }
};

// Async action creator for deleting member
export const deleteMemberAsync = (id) => async (dispatch) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/member/${id}`);
        dispatch(deleteMember(id)); // Delete the member from Redux store
        dispatch(setError({ msg: "Member Deleted Successfully", type: "success" }));
    } catch (error) {
        dispatch(setError({ msg: "Member Has Any Payment", type: "error" }));
        throw error;
    }
};
