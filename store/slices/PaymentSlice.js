import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setError } from "./ErrorSlice";

const initialState = {
  payment: [],
  perpayment: [],
  permemberpayment: [],
  totalpayment: 0,
  totalfunds: 0,
};

const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    addPayment: (state, action) => {
      state.payment.push(action.payload);
    },
    editPayment: (state, action) => {
      // Implement editing logic here
      const editedPaymentIndex = state.payment.findIndex(
        (item) => item.id === action.payload.id
      );
      if (editedPaymentIndex !== -1) {
        state.payment[editedPaymentIndex] = action.payload;
      }
    },
    deletePayment: (state, action) => {
      state.payment = state.payment.filter(
        (item) => item.id !== action.payload
      );
    },
    fetchPayment: (state, action) => {
      state.payment = action.payload;
    },
    fetchPerPayment: (state, action) => {
      state.perpayment = action.payload;
    },
    fetchPerMemberPayment: (state, action) => {
      state.permemberpayment = action.payload;
    },
    totalpayments: (state, action) => {
      state.totalpayment = action.payload;
    },
    totalfunds: (state, action) => {
      state.totalfunds = action.payload;
    },
  },
});

export const {
  addPayment,
  editPayment,
  deletePayment,
  fetchPayment,
  fetchPerPayment,
  totalpayments,
  totalfunds,
  fetchPerMemberPayment,
} = PaymentSlice.actions;
export default PaymentSlice.reducer;

// Async action creator for fetch data
export const fetchPaymentAsync = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/routes`
    );
    const paymentData = response.data;
    await dispatch(fetchPayment(paymentData));
    return paymentData;
  } catch (error) {
    dispatch(setError({ msg: "Error fetching payments", type: "error" }));
    throw error;
  }
};

// Async action creator for fetch data
export const fetchPerMemberPaymentAsync = (mid) => async (dispatch) => {
  try {
    console.log("******CALLED**********");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/routes`
    );
    const paymentData = response.data;
    // console.log(response.data);
    const filteredPaymentData = paymentData.filter((item) => item.m_id == mid);

    await dispatch(fetchPerMemberPayment(filteredPaymentData));
    return paymentData;
  } catch (error) {
    dispatch(setError({ msg: "Error fetching payments", type: "error" }));
    throw error;
  }
};

// Async action creator for fetch PER payment data
export const fetchPerPaymentAsync = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/${id}`
    );
    const paymentData = response.data[0];
    await dispatch(fetchPerPayment(paymentData));
    return paymentData;
  } catch (error) {
    dispatch(setError({ msg: "Error fetching payment", type: "error" }));
    throw error;
  }
};

// Async action creator for post data
export const addPaymentAsync = (paymentData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/routes`,
      paymentData
    );
    const addedPayment = response.data;
    dispatch(addPayment(addedPayment));
    dispatch(setError({ msg: "Payment Added Successfully", type: "success" }));
  } catch (error) {
    dispatch(setError({ msg: "Error adding payment", type: "error" }));
    throw error;
  }
};

// Async action creator for Edit data
export const editPaymentAsync = (id, paymentData) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/${id}`,
      paymentData
    );
    const updatedPayment = response.data;
    dispatch(editPayment(updatedPayment));
    dispatch(
      setError({ msg: "Payment Updated Successfully", type: "success" })
    );
  } catch (error) {
    dispatch(setError({ msg: "Error editing payment", type: "error" }));
    throw error;
  }
};

// Delete payments
export const deletePaymentAsync = (id) => async (dispatch) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/payment/${id}`);
    dispatch(deletePayment(id));
    dispatch(
      setError({ msg: "Payment Deleted Successfully", type: "success" })
    );
  } catch (error) {
    dispatch(setError({ msg: "Error deleting payment", type: "error" }));
    throw error;
  }
};

// sum of perretunpayment
export const totalpaymentAsync = (mid) => async (dispatch, getState) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/routes`
    );
    const data = response.data;
    const perPayments = data.filter(
      (e) => e.m_id == mid && e.category_name != "lillah"
    );
    const perFunds = data.filter((e) => e.m_id == mid);
    const totalAmount = perPayments.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    const totalFunds = perFunds.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    dispatch(totalpayments(totalAmount));
    dispatch(totalfunds(totalFunds));
    return totalAmount, totalFunds;
  } catch (error) {
    dispatch(
      setError({ msg: "Error calculating total amount", type: "error" })
    );
    throw error;
  }
};
