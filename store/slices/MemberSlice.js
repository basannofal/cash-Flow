import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    member: [],
};

const MemberSlices = createSlice({
    name: 'member',
    initialState,
    reducers: {
        addMember: (state, action) => {
            state.member.push(action.payload);
            console.log(action.payload);
            return { member };
        },
        editMember: (state, action) => {
            // Implement editing logic
            state.member.push(action.payload);
            console.log(action.payload);
            return { member };
        },
        deleteMember: (state, action) => {
            return { member };
        },
        fetchMember: (state, action) => {
            return { ...state, member: action.payload }; // Replace the state with new data
        },
    },
})


export const { addMember, editMember, deleteMember, fetchMember } = MemberSlices.actions;
export default MemberSlices.reducer;



// Async action creator for fetch data
export const fetchMemberAsync = () => async (dispatch) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/member/routes`);
        const memberData = response.data;
        console.log(response.data);
        dispatch(fetchMember(memberData)); // Dispatch the action with the fetched data
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};


// Async action creator for post data
export const addMemberAsync = (catData) => async (dispatch) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/member/routes`, catData);
        const addedCategory = response.data;

        dispatch(addMember(addedCategory)); // Add the category to Redux store
    } catch (error) {
        console.error("Error adding category:", error);
    }
};


