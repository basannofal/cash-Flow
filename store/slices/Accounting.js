import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./ErrorSlice";

const initialState = {
  account: [],
};

const AccountingSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountingDetail: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { fetchAccountingDetail } = AccountingSlice.actions;
export default AccountingSlice.reducer;

// Async action creator for fetch PER payment data
export const fetchAccountingDetailAsync = (id) => async (dispatch) => {
  try {
    console.log("READ");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/accounting/${id}`
    );
    const AccountData = response.data;
    await dispatch(fetchAccountingDetail(AccountData));
    return AccountData;
  } catch (error) {
    dispatch(setError({ msg: "Error fetching Accounting", type: "error" }));
    throw error;
  }
};
